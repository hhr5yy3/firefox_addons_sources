import { d as defineComponent, c as computed, o as openBlock, a as createElementBlock, r as renderSlot, u as unref, b as createBaseVNode, e as createCommentVNode, m as mergeProps, i as inject } from '../common/runtime-core.esm-bundler-cd910230.js';

const YV = ["width", "height", "fill", "transform"], oz = {key: 0}, ez = ["stroke"], tz = ["stroke"], nz = {key: 1}, sz = ["stroke"], rz = ["stroke"], iz = {key: 2}, lz = /* @__PURE__ */ createBaseVNode("path", {d: "M221.7,133.7l-72,72A8.3,8.3,0,0,1,144,208a8.5,8.5,0,0,1-3.1-.6A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,4.9-7.4,8.4,8.4,0,0,1,8.8,1.7l72,72A8.1,8.1,0,0,1,221.7,133.7Z"}, null, -1), dz = [
  lz
], kz = {key: 3}, cz = ["stroke"], hz = ["stroke"], uz = {key: 4}, az = ["stroke"], _z = ["stroke"], pz = {key: 5}, yz = ["stroke"], $z = ["stroke"], wz = {
  name: "PhArrowRight"
}, OT1 = /* @__PURE__ */ defineComponent({
  ...wz,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", oz, [
        createBaseVNode("line", {
          x1: "40",
          y1: "128",
          x2: "216",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, ez),
        createBaseVNode("polyline", {
          points: "144 56 216 128 144 200",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, tz)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", nz, [
        createBaseVNode("line", {
          x1: "40",
          y1: "128",
          x2: "216",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, sz),
        createBaseVNode("polyline", {
          points: "144 56 216 128 144 200",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, rz)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", iz, dz)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", kz, [
        createBaseVNode("line", {
          x1: "40",
          y1: "128",
          x2: "216",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, cz),
        createBaseVNode("polyline", {
          points: "144 56 216 128 144 200",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, hz)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", uz, [
        createBaseVNode("line", {
          x1: "40",
          y1: "128",
          x2: "216",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, az),
        createBaseVNode("polyline", {
          points: "144 56 216 128 144 200",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, _z)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", pz, [
        createBaseVNode("line", {
          x1: "40",
          y1: "128",
          x2: "216",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, yz),
        createBaseVNode("polyline", {
          points: "144 56 216 128 144 200",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, $z)
      ])) : createCommentVNode("", true)
    ], 16, YV));
  }
}), HEo = ["width", "height", "fill", "transform"], AEo = {key: 0}, VEo = ["stroke"], zEo = ["stroke"], ZEo = {key: 1}, CEo = /* @__PURE__ */ createBaseVNode("polygon", {
  points: "56 48 136 128 56 208 56 48",
  opacity: "0.2"
}, null, -1), bEo = ["stroke"], LEo = ["stroke"], BEo = {key: 2}, PEo = /* @__PURE__ */ createBaseVNode("path", {d: "M221.7,122.3l-80-80a8.4,8.4,0,0,0-8.8-1.7A8,8,0,0,0,128,48v60.7L61.7,42.3a8.4,8.4,0,0,0-8.8-1.7A8,8,0,0,0,48,48V208a8,8,0,0,0,4.9,7.4,8.5,8.5,0,0,0,3.1.6,8.3,8.3,0,0,0,5.7-2.3L128,147.3V208a8,8,0,0,0,4.9,7.4,8.5,8.5,0,0,0,3.1.6,8.3,8.3,0,0,0,5.7-2.3l80-80A8.1,8.1,0,0,0,221.7,122.3Z"}, null, -1), WEo = [
  PEo
], NEo = {key: 3}, FEo = ["stroke"], TEo = ["stroke"], DEo = {key: 4}, REo = ["stroke"], UEo = ["stroke"], qEo = {key: 5}, GEo = ["stroke"], EEo = ["stroke"], OEo = {
  name: "PhCaretDoubleRight"
}, SU1 = /* @__PURE__ */ defineComponent({
  ...OEo,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", AEo, [
        createBaseVNode("polyline", {
          points: "56 48 136 128 56 208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, VEo),
        createBaseVNode("polyline", {
          points: "136 48 216 128 136 208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, zEo)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", ZEo, [
        CEo,
        createBaseVNode("polygon", {
          points: "56 48 136 128 56 208 56 48",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, bEo),
        createBaseVNode("polyline", {
          points: "136 48 216 128 136 208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, LEo)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", BEo, WEo)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", NEo, [
        createBaseVNode("polyline", {
          points: "56 48 136 128 56 208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, FEo),
        createBaseVNode("polyline", {
          points: "136 48 216 128 136 208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, TEo)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", DEo, [
        createBaseVNode("polyline", {
          points: "56 48 136 128 56 208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, REo),
        createBaseVNode("polyline", {
          points: "136 48 216 128 136 208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, UEo)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", qEo, [
        createBaseVNode("polyline", {
          points: "56 48 136 128 56 208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, GEo),
        createBaseVNode("polyline", {
          points: "136 48 216 128 136 208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, EEo)
      ])) : createCommentVNode("", true)
    ], 16, HEo));
  }
}), pOo = ["width", "height", "fill", "transform"], yOo = {key: 0}, $Oo = ["stroke"], wOo = {key: 1}, fOo = /* @__PURE__ */ createBaseVNode("polygon", {
  points: "208 96 128 176 48 96 208 96",
  opacity: "0.2"
}, null, -1), gOo = ["stroke"], xOo = {key: 2}, jOo = /* @__PURE__ */ createBaseVNode("path", {d: "M215.4,92.9A8,8,0,0,0,208,88H48a8,8,0,0,0-7.4,4.9,8.4,8.4,0,0,0,1.7,8.8l80,80a8.2,8.2,0,0,0,11.4,0l80-80A8.4,8.4,0,0,0,215.4,92.9Z"}, null, -1), mOo = [
  jOo
], MOo = {key: 3}, vOo = ["stroke"], SOo = {key: 4}, HOo = ["stroke"], AOo = {key: 5}, VOo = ["stroke"], zOo = {
  name: "PhCaretDown"
}, AU1 = /* @__PURE__ */ defineComponent({
  ...zOo,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", yOo, [
        createBaseVNode("polyline", {
          points: "208 96 128 176 48 96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, $Oo)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", wOo, [
        fOo,
        createBaseVNode("polygon", {
          points: "208 96 128 176 48 96 208 96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, gOo)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", xOo, mOo)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", MOo, [
        createBaseVNode("polyline", {
          points: "208 96 128 176 48 96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, vOo)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", SOo, [
        createBaseVNode("polyline", {
          points: "208 96 128 176 48 96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, HOo)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", AOo, [
        createBaseVNode("polyline", {
          points: "208 96 128 176 48 96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, VOo)
      ])) : createCommentVNode("", true)
    ], 16, pOo));
  }
}), EYo = ["width", "height", "fill", "transform"], OYo = {key: 0}, IYo = ["stroke"], KYo = ["stroke"], XYo = ["stroke"], JYo = ["stroke"], QYo = {key: 1}, YYo = /* @__PURE__ */ createBaseVNode("rect", {
  x: "156",
  y: "40",
  width: "56",
  height: "168",
  opacity: "0.2"
}, null, -1), ooe = ["stroke"], eoe = ["stroke"], toe = ["stroke"], noe = ["stroke"], soe = {key: 2}, roe = /* @__PURE__ */ createBaseVNode("path", {d: "M228,200h-8V40a8,8,0,0,0-8-8H156a8,8,0,0,0-8,8V80H100a8,8,0,0,0-8,8v40H44a8,8,0,0,0-8,8v64H28a8,8,0,0,0,0,16H228a8,8,0,0,0,0-16ZM108,96h40V200H108ZM52,144H92v56H52Z"}, null, -1), ioe = [
  roe
], loe = {key: 3}, doe = ["stroke"], koe = ["stroke"], coe = ["stroke"], hoe = ["stroke"], uoe = {key: 4}, aoe = ["stroke"], _oe = ["stroke"], poe = ["stroke"], yoe = ["stroke"], $oe = {key: 5}, woe = ["stroke"], foe = ["stroke"], goe = ["stroke"], xoe = ["stroke"], joe = {
  name: "PhChartBar"
}, UU1 = /* @__PURE__ */ defineComponent({
  ...joe,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", OYo, [
        createBaseVNode("line", {
          x1: "228",
          y1: "208",
          x2: "28",
          y2: "208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, IYo),
        createBaseVNode("polyline", {
          points: "100 208 100 88 156 88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, KYo),
        createBaseVNode("rect", {
          x: "156",
          y: "40",
          width: "56",
          height: "168",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, XYo),
        createBaseVNode("polyline", {
          points: "44 208 44 136 100 136",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, JYo)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", QYo, [
        YYo,
        createBaseVNode("line", {
          x1: "228",
          y1: "208",
          x2: "28",
          y2: "208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, ooe),
        createBaseVNode("polyline", {
          points: "100 208 100 88 156 88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, eoe),
        createBaseVNode("rect", {
          x: "156",
          y: "40",
          width: "56",
          height: "168",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, toe),
        createBaseVNode("polyline", {
          points: "44 208 44 136 100 136",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, noe)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", soe, ioe)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", loe, [
        createBaseVNode("line", {
          x1: "228",
          y1: "208",
          x2: "28",
          y2: "208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, doe),
        createBaseVNode("polyline", {
          points: "100 208 100 88 156 88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, koe),
        createBaseVNode("rect", {
          x: "156",
          y: "40",
          width: "56",
          height: "168",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, coe),
        createBaseVNode("polyline", {
          points: "44 208 44 136 100 136",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, hoe)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", uoe, [
        createBaseVNode("line", {
          x1: "228",
          y1: "208",
          x2: "28",
          y2: "208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, aoe),
        createBaseVNode("polyline", {
          points: "100 208 100 88 156 88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, _oe),
        createBaseVNode("rect", {
          x: "156",
          y: "40",
          width: "56",
          height: "168",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, poe),
        createBaseVNode("polyline", {
          points: "44 208 44 136 100 136",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, yoe)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", $oe, [
        createBaseVNode("polyline", {
          points: "44 208 44 136 100 136",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, woe),
        createBaseVNode("line", {
          x1: "228",
          y1: "208",
          x2: "28",
          y2: "208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, foe),
        createBaseVNode("polyline", {
          points: "100 208 100 88 156 88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, goe),
        createBaseVNode("rect", {
          x: "156",
          y: "40",
          width: "56",
          height: "168",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, xoe)
      ])) : createCommentVNode("", true)
    ], 16, EYo));
  }
}), m2e = ["width", "height", "fill", "transform"], M2e = {key: 0}, v2e = ["stroke"], S2e = {key: 1}, H2e = ["stroke"], A2e = {key: 2}, V2e = /* @__PURE__ */ createBaseVNode("path", {d: "M104,192a8.5,8.5,0,0,1-5.7-2.3l-56-56a8.1,8.1,0,0,1,11.4-11.4L104,172.7,210.3,66.3a8.1,8.1,0,0,1,11.4,11.4l-112,112A8.5,8.5,0,0,1,104,192Z"}, null, -1), z2e = [
  V2e
], Z2e = {key: 3}, C2e = ["stroke"], b2e = {key: 4}, L2e = ["stroke"], B2e = {key: 5}, P2e = ["stroke"], W2e = {
  name: "PhCheck"
}, cq1 = /* @__PURE__ */ defineComponent({
  ...W2e,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", M2e, [
        createBaseVNode("polyline", {
          points: "216 72 104 184 48 128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, v2e)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", S2e, [
        createBaseVNode("polyline", {
          points: "216 72 104 184 48 128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, H2e)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", A2e, z2e)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", Z2e, [
        createBaseVNode("polyline", {
          points: "216 72 104 184 48 128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, C2e)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", b2e, [
        createBaseVNode("polyline", {
          points: "216 72 104 184 48 128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, L2e)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", B2e, [
        createBaseVNode("polyline", {
          points: "216 72 104 184 48 128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, P2e)
      ])) : createCommentVNode("", true)
    ], 16, m2e));
  }
}), N2e = ["width", "height", "fill", "transform"], F2e = {key: 0}, T2e = ["stroke"], D2e = ["stroke"], R2e = {key: 1}, U2e = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "128",
  r: "96",
  opacity: "0.2"
}, null, -1), q2e = ["stroke"], G2e = ["stroke"], E2e = {key: 2}, O2e = /* @__PURE__ */ createBaseVNode("path", {d: "M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm49.5,85.8-58.6,56a8.1,8.1,0,0,1-5.6,2.2,7.7,7.7,0,0,1-5.5-2.2l-29.3-28a8,8,0,1,1,11-11.6l23.8,22.7,53.2-50.7a8,8,0,0,1,11,11.6Z"}, null, -1), I2e = [
  O2e
], K2e = {key: 3}, X2e = ["stroke"], J2e = ["stroke"], Q2e = {key: 4}, Y2e = ["stroke"], o0e = ["stroke"], e0e = {key: 5}, t0e = ["stroke"], n0e = ["stroke"], s0e = {
  name: "PhCheckCircle"
}, hq1 = /* @__PURE__ */ defineComponent({
  ...s0e,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", F2e, [
        createBaseVNode("polyline", {
          points: "172 104 113.3 160 84 132",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, T2e),
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, D2e)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", R2e, [
        U2e,
        createBaseVNode("polyline", {
          points: "172 104 113.3 160 84 132",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, q2e),
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, G2e)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", E2e, I2e)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", K2e, [
        createBaseVNode("polyline", {
          points: "172 104 113.3 160 84 132",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, X2e),
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, J2e)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", Q2e, [
        createBaseVNode("polyline", {
          points: "172 104 113.3 160 84 132",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Y2e),
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, o0e)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", e0e, [
        createBaseVNode("polyline", {
          points: "172 104 113.3 160 84 132",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, t0e),
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, n0e)
      ])) : createCommentVNode("", true)
    ], 16, N2e));
  }
}), eDe = ["width", "height", "fill", "transform"], tDe = {key: 0}, nDe = ["stroke"], sDe = ["stroke"], rDe = {key: 1}, iDe = /* @__PURE__ */ createBaseVNode("path", {
  d: "M38.2,48.5,96.4,203.7a8,8,0,0,0,15-.1l23.3-64.1a8.1,8.1,0,0,1,4.8-4.8l64.1-23.3a8,8,0,0,0,.1-15L48.5,38.2A8,8,0,0,0,38.2,48.5Z",
  opacity: "0.2"
}, null, -1), lDe = ["stroke"], dDe = ["stroke"], kDe = {key: 2}, cDe = /* @__PURE__ */ createBaseVNode("path", {d: "M150.5,139.2l55.9-20.3a16,16,0,0,0,.1-30L51.3,30.7A16,16,0,0,0,30.7,51.3h0L88.9,206.5a15.9,15.9,0,0,0,15,10.4h.1a15.9,15.9,0,0,0,14.9-10.5l20.3-55.9,63.1,63.2A8.5,8.5,0,0,0,208,216a8.3,8.3,0,0,0,5.7-2.3,8.1,8.1,0,0,0,0-11.4Z"}, null, -1), hDe = [
  cDe
], uDe = {key: 3}, aDe = ["stroke"], _De = ["stroke"], pDe = {key: 4}, yDe = ["stroke"], $De = ["stroke"], wDe = {key: 5}, fDe = ["stroke"], gDe = ["stroke"], xDe = {
  name: "PhCursor"
}, PG1 = /* @__PURE__ */ defineComponent({
  ...xDe,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", tDe, [
        createBaseVNode("path", {
          d: "M38.2,48.5,96.4,203.7a8,8,0,0,0,15-.1l23.3-64.1a8.1,8.1,0,0,1,4.8-4.8l64.1-23.3a8,8,0,0,0,.1-15L48.5,38.2A8,8,0,0,0,38.2,48.5Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, nDe),
        createBaseVNode("line", {
          x1: "136.6",
          y1: "136.6",
          x2: "208",
          y2: "208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, sDe)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", rDe, [
        iDe,
        createBaseVNode("path", {
          d: "M38.2,48.5,96.4,203.7a8,8,0,0,0,15-.1l23.3-64.1a8.1,8.1,0,0,1,4.8-4.8l64.1-23.3a8,8,0,0,0,.1-15L48.5,38.2A8,8,0,0,0,38.2,48.5Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, lDe),
        createBaseVNode("line", {
          x1: "136.6",
          y1: "136.6",
          x2: "208",
          y2: "208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, dDe)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", kDe, hDe)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", uDe, [
        createBaseVNode("path", {
          d: "M38.2,48.5,96.4,203.7a8,8,0,0,0,15-.1l23.3-64.1a8.1,8.1,0,0,1,4.8-4.8l64.1-23.3a8,8,0,0,0,.1-15L48.5,38.2A8,8,0,0,0,38.2,48.5Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, aDe),
        createBaseVNode("line", {
          x1: "136.6",
          y1: "136.6",
          x2: "208",
          y2: "208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, _De)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", pDe, [
        createBaseVNode("path", {
          d: "M38.2,48.5,96.4,203.7a8,8,0,0,0,15-.1l23.3-64.1a8.1,8.1,0,0,1,4.8-4.8l64.1-23.3a8,8,0,0,0,.1-15L48.5,38.2A8,8,0,0,0,38.2,48.5Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, yDe),
        createBaseVNode("line", {
          x1: "136.6",
          y1: "136.6",
          x2: "208",
          y2: "208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, $De)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", wDe, [
        createBaseVNode("path", {
          d: "M38.2,48.5,96.4,203.7a8,8,0,0,0,15-.1l23.3-64.1a8.1,8.1,0,0,1,4.8-4.8l64.1-23.3a8,8,0,0,0,.1-15L48.5,38.2A8,8,0,0,0,38.2,48.5Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, fDe),
        createBaseVNode("line", {
          x1: "136.6",
          y1: "136.6",
          x2: "208",
          y2: "208",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, gDe)
      ])) : createCommentVNode("", true)
    ], 16, eDe));
  }
}), g8t = ["width", "height", "fill", "transform"], x8t = {key: 0}, j8t = ["stroke"], m8t = ["stroke"], M8t = ["stroke"], v8t = ["stroke"], S8t = {key: 1}, H8t = /* @__PURE__ */ createBaseVNode("polygon", {
  points: "224 96 145.5 152 110.5 152 32 96 128 32 224 96",
  opacity: "0.2"
}, null, -1), A8t = ["stroke"], V8t = ["stroke"], z8t = ["stroke"], Z8t = ["stroke"], C8t = {key: 2}, b8t = /* @__PURE__ */ createBaseVNode("path", {d: "M228.4,89.3l-96-64a8.2,8.2,0,0,0-8.8,0l-96,64A7.9,7.9,0,0,0,24,96V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V96A7.9,7.9,0,0,0,228.4,89.3ZM96.7,152,40,192V111.5Zm16.4,8h29.8l56.6,40H56.5Zm46.2-8L216,111.5V192Z"}, null, -1), L8t = [
  b8t
], B8t = {key: 3}, P8t = ["stroke"], W8t = ["stroke"], N8t = ["stroke"], F8t = ["stroke"], T8t = {key: 4}, D8t = ["stroke"], R8t = ["stroke"], U8t = ["stroke"], q8t = ["stroke"], G8t = {key: 5}, E8t = ["stroke"], O8t = ["stroke"], I8t = ["stroke"], K8t = ["stroke"], X8t = {
  name: "PhEnvelopeOpen"
}, zE1 = /* @__PURE__ */ defineComponent({
  ...X8t,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", x8t, [
        createBaseVNode("path", {
          d: "M224,96V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V96l96-64Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, j8t),
        createBaseVNode("line", {
          x1: "110.5",
          y1: "152",
          x2: "34.5",
          y2: "205.7",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, m8t),
        createBaseVNode("line", {
          x1: "221.5",
          y1: "205.7",
          x2: "145.5",
          y2: "152",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, M8t),
        createBaseVNode("polyline", {
          points: "224 96 145.5 152 110.5 152 32 96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, v8t)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", S8t, [
        H8t,
        createBaseVNode("path", {
          d: "M32,96V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V96L128,32Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, A8t),
        createBaseVNode("line", {
          x1: "110.5",
          y1: "152",
          x2: "34.5",
          y2: "205.7",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, V8t),
        createBaseVNode("line", {
          x1: "221.5",
          y1: "205.7",
          x2: "145.5",
          y2: "152",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, z8t),
        createBaseVNode("polyline", {
          points: "224 96 145.5 152 110.5 152 32 96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Z8t)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", C8t, L8t)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", B8t, [
        createBaseVNode("path", {
          d: "M224,96V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V96l96-64Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, P8t),
        createBaseVNode("line", {
          x1: "110.5",
          y1: "152",
          x2: "34.5",
          y2: "205.7",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, W8t),
        createBaseVNode("line", {
          x1: "221.5",
          y1: "205.7",
          x2: "145.5",
          y2: "152",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, N8t),
        createBaseVNode("polyline", {
          points: "224 96 145.5 152 110.5 152 32 96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, F8t)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", T8t, [
        createBaseVNode("path", {
          d: "M224,96V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V96l96-64Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, D8t),
        createBaseVNode("line", {
          x1: "110.5",
          y1: "152",
          x2: "34.5",
          y2: "205.7",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, R8t),
        createBaseVNode("line", {
          x1: "221.5",
          y1: "205.7",
          x2: "145.5",
          y2: "152",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, U8t),
        createBaseVNode("polyline", {
          points: "224 96 145.5 152 110.5 152 32 96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, q8t)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", G8t, [
        createBaseVNode("path", {
          d: "M32,96V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V96L128,32Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, E8t),
        createBaseVNode("line", {
          x1: "110.5",
          y1: "152",
          x2: "34.5",
          y2: "205.7",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, O8t),
        createBaseVNode("line", {
          x1: "221.5",
          y1: "205.7",
          x2: "145.5",
          y2: "152",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, I8t),
        createBaseVNode("polyline", {
          points: "224 96 145.5 152 110.5 152 32 96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, K8t)
      ])) : createCommentVNode("", true)
    ], 16, g8t));
  }
}), Sln = ["width", "height", "fill", "transform"], Hln = {key: 0}, Aln = ["stroke"], Vln = ["stroke"], zln = ["stroke"], Zln = ["stroke"], Cln = ["stroke"], bln = {key: 1}, Lln = /* @__PURE__ */ createBaseVNode("path", {
  d: "M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z",
  opacity: "0.2"
}, null, -1), Bln = ["stroke"], Pln = ["stroke"], Wln = ["stroke"], Nln = ["stroke"], Fln = ["stroke"], Tln = {key: 2}, Dln = /* @__PURE__ */ createBaseVNode("path", {d: "M240,160v24a16,16,0,0,1-16,16H115.5a4,4,0,0,1-3.2-6.4L178,108a8.2,8.2,0,0,0-1.1-11.3A7.9,7.9,0,0,0,165.5,98L88.4,198.4a3.8,3.8,0,0,1-3.1,1.6H32a16,16,0,0,1-16-16V161.1a116.1,116.1,0,0,1,2.2-22.2L40.9,145l2.1.2a8,8,0,0,0,7.8-6.2,8.1,8.1,0,0,0-6-9.6l-22.4-6C37,82,74.9,51.5,120,48.3V71.7a8.2,8.2,0,0,0,7.5,8.3,8,8,0,0,0,8.5-8V48.3a111.5,111.5,0,0,1,71.1,32.4,112.7,112.7,0,0,1,26.8,42.6l-22.7,6.1a8.1,8.1,0,0,0-6,9.6,8,8,0,0,0,7.8,6.2l2.1-.2,22.9-6.2A114.5,114.5,0,0,1,240,160Z"}, null, -1), Rln = [
  Dln
], Uln = {key: 3}, qln = ["stroke"], Gln = ["stroke"], Eln = ["stroke"], Oln = ["stroke"], Iln = ["stroke"], Kln = {key: 4}, Xln = ["stroke"], Jln = ["stroke"], Qln = ["stroke"], Yln = ["stroke"], o2n = ["stroke"], e2n = {key: 5}, t2n = ["stroke"], n2n = ["stroke"], s2n = ["stroke"], r2n = ["stroke"], i2n = ["stroke"], l2n = {
  name: "PhGauge"
}, VI1 = /* @__PURE__ */ defineComponent({
  ...l2n,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", Hln, [
        createBaseVNode("path", {
          d: "M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Aln),
        createBaseVNode("line", {
          x1: "128",
          y1: "56",
          x2: "128",
          y2: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Vln),
        createBaseVNode("line", {
          x1: "27.5",
          y1: "133.1",
          x2: "58.5",
          y2: "141.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, zln),
        createBaseVNode("line", {
          x1: "228.5",
          y1: "133.1",
          x2: "197.5",
          y2: "141.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Zln),
        createBaseVNode("line", {
          x1: "103.4",
          y1: "192",
          x2: "171.8",
          y2: "102.9",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Cln)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", bln, [
        Lln,
        createBaseVNode("path", {
          d: "M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Bln),
        createBaseVNode("line", {
          x1: "128",
          y1: "56",
          x2: "128",
          y2: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Pln),
        createBaseVNode("line", {
          x1: "27.5",
          y1: "133.1",
          x2: "58.5",
          y2: "141.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Wln),
        createBaseVNode("line", {
          x1: "228.5",
          y1: "133.1",
          x2: "197.5",
          y2: "141.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Nln),
        createBaseVNode("line", {
          x1: "103.4",
          y1: "192",
          x2: "171.8",
          y2: "102.9",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Fln)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", Tln, Rln)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", Uln, [
        createBaseVNode("path", {
          d: "M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, qln),
        createBaseVNode("line", {
          x1: "128",
          y1: "56",
          x2: "128",
          y2: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Gln),
        createBaseVNode("line", {
          x1: "27.5",
          y1: "133.1",
          x2: "58.5",
          y2: "141.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Eln),
        createBaseVNode("line", {
          x1: "228.5",
          y1: "133.1",
          x2: "197.5",
          y2: "141.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Oln),
        createBaseVNode("line", {
          x1: "103.4",
          y1: "192",
          x2: "171.8",
          y2: "102.9",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Iln)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", Kln, [
        createBaseVNode("path", {
          d: "M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Xln),
        createBaseVNode("line", {
          x1: "128",
          y1: "56",
          x2: "128",
          y2: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Jln),
        createBaseVNode("line", {
          x1: "27.5",
          y1: "133.1",
          x2: "58.5",
          y2: "141.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Qln),
        createBaseVNode("line", {
          x1: "228.5",
          y1: "133.1",
          x2: "197.5",
          y2: "141.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Yln),
        createBaseVNode("line", {
          x1: "103.4",
          y1: "192",
          x2: "171.8",
          y2: "102.9",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, o2n)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", e2n, [
        createBaseVNode("path", {
          d: "M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, t2n),
        createBaseVNode("line", {
          x1: "128",
          y1: "56",
          x2: "128",
          y2: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, n2n),
        createBaseVNode("line", {
          x1: "27.5",
          y1: "133.1",
          x2: "58.5",
          y2: "141.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, s2n),
        createBaseVNode("line", {
          x1: "228.5",
          y1: "133.1",
          x2: "197.5",
          y2: "141.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, r2n),
        createBaseVNode("line", {
          x1: "103.4",
          y1: "192",
          x2: "171.8",
          y2: "102.9",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, i2n)
      ])) : createCommentVNode("", true)
    ], 16, Sln));
  }
}), Wyn = ["width", "height", "fill", "transform"], Nyn = {key: 0}, Fyn = ["stroke"], Tyn = {key: 1}, Dyn = ["stroke"], Ryn = {key: 2}, Uyn = /* @__PURE__ */ createBaseVNode("path", {d: "M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm0,184A80,80,0,1,1,184.6,71.4a8,8,0,0,1,0,11.3,7.9,7.9,0,0,1-11.3,0A64.1,64.1,0,1,0,191.5,136H128a8,8,0,0,1,0-16h72a8,8,0,0,1,8,8A80.1,80.1,0,0,1,128,208Z"}, null, -1), qyn = [
  Uyn
], Gyn = {key: 3}, Eyn = ["stroke"], Oyn = {key: 4}, Iyn = ["stroke"], Kyn = {key: 5}, Xyn = ["stroke"], Jyn = {
  name: "PhGoogleLogo"
}, tK1 = /* @__PURE__ */ defineComponent({
  ...Jyn,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", Nyn, [
        createBaseVNode("path", {
          d: "M128,128h88a88.1,88.1,0,1,1-25.8-62.2",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Fyn)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", Tyn, [
        createBaseVNode("path", {
          d: "M128,128h88a88.1,88.1,0,1,1-25.8-62.2",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Dyn)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", Ryn, qyn)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", Gyn, [
        createBaseVNode("path", {
          d: "M128,128h88a88.1,88.1,0,1,1-25.8-62.2",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Eyn)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", Oyn, [
        createBaseVNode("path", {
          d: "M128,128h88a88.1,88.1,0,1,1-25.8-62.2",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Iyn)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", Kyn, [
        createBaseVNode("path", {
          d: "M128,128h88a88.1,88.1,0,1,1-25.8-62.2",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Xyn)
      ])) : createCommentVNode("", true)
    ], 16, Wyn));
  }
}), Ars = ["width", "height", "fill", "transform"], Vrs = {key: 0}, zrs = ["stroke"], Zrs = ["stroke"], Crs = ["stroke"], brs = ["stroke"], Lrs = ["stroke"], Brs = ["stroke"], Prs = {key: 1}, Wrs = ["stroke"], Nrs = ["stroke"], Frs = ["stroke"], Trs = ["stroke"], Drs = ["stroke"], Rrs = ["stroke"], Urs = {key: 2}, qrs = /* @__PURE__ */ createBaseVNode("path", {d: "M88,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H96A8,8,0,0,1,88,64Zm128,56H96a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H96a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM56,56H40a8,8,0,0,0,0,16H56a8,8,0,0,0,0-16Zm0,64H40a8,8,0,0,0,0,16H56a8,8,0,0,0,0-16Zm0,64H40a8,8,0,0,0,0,16H56a8,8,0,0,0,0-16Z"}, null, -1), Grs = [
  qrs
], Ers = {key: 3}, Ors = ["stroke"], Irs = ["stroke"], Krs = ["stroke"], Xrs = ["stroke"], Jrs = ["stroke"], Qrs = ["stroke"], Yrs = {key: 4}, ois = ["stroke"], eis = ["stroke"], tis = ["stroke"], nis = ["stroke"], sis = ["stroke"], ris = ["stroke"], iis = {key: 5}, lis = ["stroke"], dis = ["stroke"], kis = ["stroke"], cis = ["stroke"], his = ["stroke"], uis = ["stroke"], ais = {
  name: "PhListDashes"
}, LX1 = /* @__PURE__ */ defineComponent({
  ...ais,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", Vrs, [
        createBaseVNode("line", {
          x1: "96",
          y1: "64",
          x2: "216",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, zrs),
        createBaseVNode("line", {
          x1: "96",
          y1: "128",
          x2: "216",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Zrs),
        createBaseVNode("line", {
          x1: "96",
          y1: "192",
          x2: "216",
          y2: "192",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Crs),
        createBaseVNode("line", {
          x1: "40",
          y1: "64",
          x2: "56",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, brs),
        createBaseVNode("line", {
          x1: "40",
          y1: "128",
          x2: "56",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Lrs),
        createBaseVNode("line", {
          x1: "40",
          y1: "192",
          x2: "56",
          y2: "192",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Brs)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", Prs, [
        createBaseVNode("line", {
          x1: "96",
          y1: "64",
          x2: "216",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Wrs),
        createBaseVNode("line", {
          x1: "96",
          y1: "128",
          x2: "216",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Nrs),
        createBaseVNode("line", {
          x1: "96",
          y1: "192",
          x2: "216",
          y2: "192",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Frs),
        createBaseVNode("line", {
          x1: "40",
          y1: "64",
          x2: "56",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Trs),
        createBaseVNode("line", {
          x1: "40",
          y1: "128",
          x2: "56",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Drs),
        createBaseVNode("line", {
          x1: "40",
          y1: "192",
          x2: "56",
          y2: "192",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Rrs)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", Urs, Grs)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", Ers, [
        createBaseVNode("line", {
          x1: "96",
          y1: "64",
          x2: "216",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Ors),
        createBaseVNode("line", {
          x1: "96",
          y1: "128",
          x2: "216",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Irs),
        createBaseVNode("line", {
          x1: "96",
          y1: "192",
          x2: "216",
          y2: "192",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Krs),
        createBaseVNode("line", {
          x1: "40",
          y1: "64",
          x2: "56",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Xrs),
        createBaseVNode("line", {
          x1: "40",
          y1: "128",
          x2: "56",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Jrs),
        createBaseVNode("line", {
          x1: "40",
          y1: "192",
          x2: "56",
          y2: "192",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Qrs)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", Yrs, [
        createBaseVNode("line", {
          x1: "96",
          y1: "64",
          x2: "216",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, ois),
        createBaseVNode("line", {
          x1: "96",
          y1: "128",
          x2: "216",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, eis),
        createBaseVNode("line", {
          x1: "96",
          y1: "192",
          x2: "216",
          y2: "192",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, tis),
        createBaseVNode("line", {
          x1: "40",
          y1: "64",
          x2: "56",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, nis),
        createBaseVNode("line", {
          x1: "40",
          y1: "128",
          x2: "56",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, sis),
        createBaseVNode("line", {
          x1: "40",
          y1: "192",
          x2: "56",
          y2: "192",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, ris)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", iis, [
        createBaseVNode("line", {
          x1: "96",
          y1: "64",
          x2: "216",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, lis),
        createBaseVNode("line", {
          x1: "96",
          y1: "128",
          x2: "216",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, dis),
        createBaseVNode("line", {
          x1: "96",
          y1: "192",
          x2: "216",
          y2: "192",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, kis),
        createBaseVNode("line", {
          x1: "40",
          y1: "64",
          x2: "56",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, cis),
        createBaseVNode("line", {
          x1: "40",
          y1: "128",
          x2: "56",
          y2: "128",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, his),
        createBaseVNode("line", {
          x1: "40",
          y1: "192",
          x2: "56",
          y2: "192",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, uis)
      ])) : createCommentVNode("", true)
    ], 16, Ars));
  }
}), tls = ["width", "height", "fill", "transform"], nls = {key: 0}, sls = ["stroke"], rls = ["stroke"], ils = ["stroke"], lls = ["stroke"], dls = {key: 1}, kls = /* @__PURE__ */ createBaseVNode("path", {
  d: "M208,88H48a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V96A8,8,0,0,0,208,88Zm-80,72a20,20,0,1,1,20-20A20,20,0,0,1,128,160Z",
  opacity: "0.2"
}, null, -1), cls = ["stroke"], hls = ["stroke"], uls = ["stroke"], als = ["stroke"], _ls = {key: 2}, pls = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "140",
  r: "12"
}, null, -1), yls = /* @__PURE__ */ createBaseVNode("path", {d: "M208,80H172V52a44,44,0,0,0-88,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-72,86.8V184a8,8,0,0,1-16,0V166.8a28,28,0,1,1,16,0ZM156,80H100V52a28,28,0,0,1,56,0Z"}, null, -1), $ls = [
  pls,
  yls
], wls = {key: 3}, fls = ["stroke"], gls = ["stroke"], xls = ["stroke"], jls = ["stroke"], mls = {key: 4}, Mls = ["stroke"], vls = ["stroke"], Sls = ["stroke"], Hls = ["stroke"], Als = {key: 5}, Vls = ["stroke"], zls = ["stroke"], Zls = ["stroke"], Cls = ["stroke"], bls = {
  name: "PhLockKey"
}, NX1 = /* @__PURE__ */ defineComponent({
  ...bls,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", nls, [
        createBaseVNode("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, sls),
        createBaseVNode("path", {
          d: "M92,88V52a36,36,0,0,1,72,0V88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, rls),
        createBaseVNode("circle", {
          cx: "128",
          cy: "144",
          r: "20",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, ils),
        createBaseVNode("line", {
          x1: "128",
          y1: "164",
          x2: "128",
          y2: "180",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, lls)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", dls, [
        kls,
        createBaseVNode("circle", {
          cx: "128",
          cy: "140",
          r: "20",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, cls),
        createBaseVNode("line", {
          x1: "128",
          y1: "160",
          x2: "128",
          y2: "184",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, hls),
        createBaseVNode("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, uls),
        createBaseVNode("path", {
          d: "M92,88V52a36,36,0,0,1,72,0V88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, als)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", _ls, $ls)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", wls, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "140",
          r: "20",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, fls),
        createBaseVNode("line", {
          x1: "128",
          y1: "160",
          x2: "128",
          y2: "184",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, gls),
        createBaseVNode("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, xls),
        createBaseVNode("path", {
          d: "M92,88V52a36,36,0,0,1,72,0V88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, jls)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", mls, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "140",
          r: "20",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Mls),
        createBaseVNode("line", {
          x1: "128",
          y1: "160",
          x2: "128",
          y2: "184",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, vls),
        createBaseVNode("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Sls),
        createBaseVNode("path", {
          d: "M92,88V52a36,36,0,0,1,72,0V88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Hls)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", Als, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "140",
          r: "20",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Vls),
        createBaseVNode("line", {
          x1: "128",
          y1: "160",
          x2: "128",
          y2: "184",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, zls),
        createBaseVNode("rect", {
          x: "40",
          y: "88",
          width: "176",
          height: "128",
          rx: "8",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Zls),
        createBaseVNode("path", {
          d: "M92,88V52a36,36,0,0,1,72,0V88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Cls)
      ])) : createCommentVNode("", true)
    ], 16, tls));
  }
}), tVs = ["width", "height", "fill", "transform"], nVs = {key: 0}, sVs = ["stroke"], rVs = ["stroke"], iVs = {key: 1}, lVs = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "196",
  cy: "60",
  r: "28",
  opacity: "0.2"
}, null, -1), dVs = ["stroke"], kVs = ["stroke"], cVs = {key: 2}, hVs = /* @__PURE__ */ createBaseVNode("path", {d: "M216,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V56A16,16,0,0,1,48,40h80a8,8,0,0,1,0,16H48V208H200V128a8,8,0,0,1,16,0ZM196,24a36,36,0,1,0,36,36A36,36,0,0,0,196,24Z"}, null, -1), uVs = [
  hVs
], aVs = {key: 3}, _Vs = ["stroke"], pVs = ["stroke"], yVs = {key: 4}, $Vs = ["stroke"], wVs = ["stroke"], fVs = {key: 5}, gVs = ["stroke"], xVs = ["stroke"], jVs = {
  name: "PhNotification"
}, DJ1 = /* @__PURE__ */ defineComponent({
  ...jVs,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", nVs, [
        createBaseVNode("path", {
          d: "M208,128v80a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h80",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, sVs),
        createBaseVNode("circle", {
          cx: "196",
          cy: "60",
          r: "28",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, rVs)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", iVs, [
        lVs,
        createBaseVNode("path", {
          d: "M208,128v80a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h80",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, dVs),
        createBaseVNode("circle", {
          cx: "196",
          cy: "60",
          r: "28",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, kVs)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", cVs, uVs)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", aVs, [
        createBaseVNode("path", {
          d: "M208,128v80a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h80",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, _Vs),
        createBaseVNode("circle", {
          cx: "196",
          cy: "60",
          r: "28",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, pVs)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", yVs, [
        createBaseVNode("path", {
          d: "M208,128v80a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h80",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, $Vs),
        createBaseVNode("circle", {
          cx: "196",
          cy: "60",
          r: "28",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, wVs)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", fVs, [
        createBaseVNode("path", {
          d: "M208,128v80a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h80",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, gVs),
        createBaseVNode("circle", {
          cx: "196",
          cy: "60",
          r: "28",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, xVs)
      ])) : createCommentVNode("", true)
    ], 16, tVs));
  }
}), QZr = ["width", "height", "fill", "transform"], YZr = {key: 0}, oCr = ["stroke"], eCr = ["stroke"], tCr = ["stroke"], nCr = ["stroke"], sCr = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "96",
  r: "16"
}, null, -1), rCr = {key: 1}, iCr = /* @__PURE__ */ createBaseVNode("path", {
  d: "M73.9,111.4h0L42.5,149a7.6,7.6,0,0,0-1.6,6.8l12.3,55.7A8,8,0,0,0,66,216l30-24C78.4,161.4,72.7,134.5,73.9,111.4Z",
  opacity: "0.2"
}, null, -1), lCr = /* @__PURE__ */ createBaseVNode("path", {
  d: "M181.5,110.7h0l31.4,37.7a7.6,7.6,0,0,1,1.6,6.8l-12.3,55.6a8,8,0,0,1-12.8,4.6l-30-24C177,160.7,182.7,133.8,181.5,110.7Z",
  opacity: "0.2"
}, null, -1), dCr = ["stroke"], kCr = ["stroke"], cCr = ["stroke"], hCr = ["stroke"], uCr = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "96",
  r: "12"
}, null, -1), aCr = {key: 2}, _Cr = /* @__PURE__ */ createBaseVNode("path", {d: "M144,216H112a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Z"}, null, -1), pCr = /* @__PURE__ */ createBaseVNode("path", {d: "M219.6,143.9l-30.2-36.3a125.4,125.4,0,0,0-8-34.9c-11.6-30.2-32.1-50-43.4-59.1a15.9,15.9,0,0,0-20-.1c-11.4,9.1-32.2,28.9-43.9,59.1A121.5,121.5,0,0,0,66,108.3L36.4,143.9A16.1,16.1,0,0,0,33,157.6l12.4,55.6a15.9,15.9,0,0,0,10.3,11.6,17,17,0,0,0,5.4.9,16,16,0,0,0,9.9-3.5L98.8,200h58.4L185,222.2a16,16,0,0,0,9.9,3.5,17,17,0,0,0,5.4-.9,15.9,15.9,0,0,0,10.3-11.6L223,157.6A16.1,16.1,0,0,0,219.6,143.9ZM61,209.7,48.7,154.1l17.9-21.5q3.5,28.1,19.1,57.4ZM128,108a12,12,0,1,1,12-12A12,12,0,0,1,128,108Zm67,101.7-24.8-19.8c10.4-19.7,16.6-39,18.8-57.8l18.3,22Z"}, null, -1), yCr = [
  _Cr,
  pCr
], $Cr = {key: 3}, wCr = ["stroke"], fCr = ["stroke"], gCr = ["stroke"], xCr = ["stroke"], jCr = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "96",
  r: "10"
}, null, -1), mCr = {key: 4}, MCr = ["stroke"], vCr = ["stroke"], SCr = ["stroke"], HCr = ["stroke"], ACr = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "96",
  r: "8"
}, null, -1), VCr = {key: 5}, zCr = ["stroke"], ZCr = ["stroke"], CCr = ["stroke"], bCr = ["stroke"], LCr = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "96",
  r: "12"
}, null, -1), BCr = {
  name: "PhRocket"
}, kol = /* @__PURE__ */ defineComponent({
  ...BCr,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", YZr, [
        createBaseVNode("line", {
          x1: "144",
          y1: "228",
          x2: "112",
          y2: "228",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, oCr),
        createBaseVNode("path", {
          d: "M123,19.8C104,35,40.5,95.8,96,192h64c54.4-96.2-8.2-156.9-27-172.2A7.8,7.8,0,0,0,123,19.8Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, eCr),
        createBaseVNode("path", {
          d: "M73.9,111.4,42.5,149a7.6,7.6,0,0,0-1.6,6.8l12.3,55.7A8,8,0,0,0,66,216l30-24",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, tCr),
        createBaseVNode("path", {
          d: "M181.5,110.6l32,38.4a7.6,7.6,0,0,1,1.6,6.8l-12.3,55.7A8,8,0,0,1,190,216l-30-24",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, nCr),
        sCr
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", rCr, [
        iCr,
        lCr,
        createBaseVNode("line", {
          x1: "144",
          y1: "224",
          x2: "112",
          y2: "224",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, dCr),
        createBaseVNode("path", {
          d: "M123,19.8C104,35,40.5,95.8,96,192h64c54.4-96.2-8.2-156.9-27-172.2A7.8,7.8,0,0,0,123,19.8Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, kCr),
        createBaseVNode("path", {
          d: "M73.9,111.4,42.5,149a7.6,7.6,0,0,0-1.6,6.8l12.3,55.7A8,8,0,0,0,66,216l30-24",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, cCr),
        createBaseVNode("path", {
          d: "M181.5,110.6l32,38.4a7.6,7.6,0,0,1,1.6,6.8l-12.3,55.7A8,8,0,0,1,190,216l-30-24",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, hCr),
        uCr
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", aCr, yCr)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", $Cr, [
        createBaseVNode("line", {
          x1: "144",
          y1: "224",
          x2: "112",
          y2: "224",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, wCr),
        createBaseVNode("path", {
          d: "M123,19.8C104,35,40.5,95.8,96,192h64c54.4-96.2-8.2-156.9-27-172.2A7.8,7.8,0,0,0,123,19.8Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, fCr),
        createBaseVNode("path", {
          d: "M73.9,111.4,42.5,149a7.6,7.6,0,0,0-1.6,6.8l12.3,55.7A8,8,0,0,0,66,216l30-24",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, gCr),
        createBaseVNode("path", {
          d: "M181.5,110.6l32,38.4a7.6,7.6,0,0,1,1.6,6.8l-12.3,55.7A8,8,0,0,1,190,216l-30-24",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, xCr),
        jCr
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", mCr, [
        createBaseVNode("line", {
          x1: "144",
          y1: "224",
          x2: "112",
          y2: "224",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, MCr),
        createBaseVNode("path", {
          d: "M123,19.8C104,35,40.5,95.8,96,192h64c54.4-96.2-8.2-156.9-27-172.2A7.8,7.8,0,0,0,123,19.8Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, vCr),
        createBaseVNode("path", {
          d: "M73.9,111.4,42.5,149a7.6,7.6,0,0,0-1.6,6.8l12.3,55.7A8,8,0,0,0,66,216l30-24",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, SCr),
        createBaseVNode("path", {
          d: "M181.5,110.6l32,38.4a7.6,7.6,0,0,1,1.6,6.8l-12.3,55.7A8,8,0,0,1,190,216l-30-24",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, HCr),
        ACr
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", VCr, [
        createBaseVNode("line", {
          x1: "144",
          y1: "224",
          x2: "112",
          y2: "224",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, zCr),
        createBaseVNode("path", {
          d: "M123,19.8C104,35,40.5,95.8,96,192h64c54.4-96.2-8.2-156.9-27-172.2A7.8,7.8,0,0,0,123,19.8Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, ZCr),
        createBaseVNode("path", {
          d: "M73.9,111.4,42.5,149a7.6,7.6,0,0,0-1.6,6.8l12.3,55.7A8,8,0,0,0,66,216l30-24",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, CCr),
        createBaseVNode("path", {
          d: "M181.5,110.6l32,38.4a7.6,7.6,0,0,1,1.6,6.8l-12.3,55.7A8,8,0,0,1,190,216l-30-24",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, bCr),
        LCr
      ])) : createCommentVNode("", true)
    ], 16, QZr));
  }
}), Mai = ["width", "height", "fill", "transform"], vai = {key: 0}, Sai = ["stroke"], Hai = ["stroke"], Aai = ["stroke"], Vai = ["stroke"], zai = ["stroke"], Zai = {key: 1}, Cai = /* @__PURE__ */ createBaseVNode("path", {
  d: "M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z",
  opacity: "0.2"
}, null, -1), bai = ["stroke"], Lai = ["stroke"], Bai = ["stroke"], Pai = ["stroke"], Wai = ["stroke"], Nai = {key: 2}, Fai = /* @__PURE__ */ createBaseVNode("path", {d: "M208.9,144a15.8,15.8,0,0,1-10.5,15l-52.2,19.2L127,230.4a16,16,0,0,1-30,0L77.8,178.2,25.6,159a16,16,0,0,1,0-30l52.2-19.2L97,57.6a16,16,0,0,1,30,0l19.2,52.2L198.4,129A15.8,15.8,0,0,1,208.9,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"}, null, -1), Tai = [
  Fai
], Dai = {key: 3}, Rai = ["stroke"], Uai = ["stroke"], qai = ["stroke"], Gai = ["stroke"], Eai = ["stroke"], Oai = {key: 4}, Iai = ["stroke"], Kai = ["stroke"], Xai = ["stroke"], Jai = ["stroke"], Qai = ["stroke"], Yai = {key: 5}, o_i = ["stroke"], e_i = ["stroke"], t_i = ["stroke"], n_i = ["stroke"], s_i = ["stroke"], r_i = {
  name: "PhSparkle"
}, jel = /* @__PURE__ */ defineComponent({
  ...r_i,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", vai, [
        createBaseVNode("path", {
          d: "M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Sai),
        createBaseVNode("line", {
          x1: "176",
          y1: "16",
          x2: "176",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Hai),
        createBaseVNode("line", {
          x1: "200",
          y1: "40",
          x2: "152",
          y2: "40",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Aai),
        createBaseVNode("line", {
          x1: "224",
          y1: "72",
          x2: "224",
          y2: "104",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Vai),
        createBaseVNode("line", {
          x1: "240",
          y1: "88",
          x2: "208",
          y2: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, zai)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", Zai, [
        Cai,
        createBaseVNode("path", {
          d: "M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, bai),
        createBaseVNode("line", {
          x1: "176",
          y1: "16",
          x2: "176",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Lai),
        createBaseVNode("line", {
          x1: "200",
          y1: "40",
          x2: "152",
          y2: "40",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Bai),
        createBaseVNode("line", {
          x1: "224",
          y1: "72",
          x2: "224",
          y2: "104",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Pai),
        createBaseVNode("line", {
          x1: "240",
          y1: "88",
          x2: "208",
          y2: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Wai)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", Nai, Tai)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", Dai, [
        createBaseVNode("path", {
          d: "M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Rai),
        createBaseVNode("line", {
          x1: "176",
          y1: "16",
          x2: "176",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Uai),
        createBaseVNode("line", {
          x1: "200",
          y1: "40",
          x2: "152",
          y2: "40",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, qai),
        createBaseVNode("line", {
          x1: "224",
          y1: "72",
          x2: "224",
          y2: "104",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Gai),
        createBaseVNode("line", {
          x1: "240",
          y1: "88",
          x2: "208",
          y2: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, Eai)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", Oai, [
        createBaseVNode("path", {
          d: "M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Iai),
        createBaseVNode("line", {
          x1: "176",
          y1: "16",
          x2: "176",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Kai),
        createBaseVNode("line", {
          x1: "200",
          y1: "40",
          x2: "152",
          y2: "40",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Xai),
        createBaseVNode("line", {
          x1: "224",
          y1: "72",
          x2: "224",
          y2: "104",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Jai),
        createBaseVNode("line", {
          x1: "240",
          y1: "88",
          x2: "208",
          y2: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, Qai)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", Yai, [
        createBaseVNode("path", {
          d: "M138.7,175.5l-19.2,52.1a8,8,0,0,1-15,0L85.3,175.5a8.1,8.1,0,0,0-4.8-4.8L28.4,151.5a8,8,0,0,1,0-15l52.1-19.2a8.1,8.1,0,0,0,4.8-4.8l19.2-52.1a8,8,0,0,1,15,0l19.2,52.1a8.1,8.1,0,0,0,4.8,4.8l52.1,19.2a8,8,0,0,1,0,15l-52.1,19.2A8.1,8.1,0,0,0,138.7,175.5Z",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, o_i),
        createBaseVNode("line", {
          x1: "176",
          y1: "16",
          x2: "176",
          y2: "64",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, e_i),
        createBaseVNode("line", {
          x1: "200",
          y1: "40",
          x2: "152",
          y2: "40",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, t_i),
        createBaseVNode("line", {
          x1: "224",
          y1: "72",
          x2: "224",
          y2: "104",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, n_i),
        createBaseVNode("line", {
          x1: "240",
          y1: "88",
          x2: "208",
          y2: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, s_i)
      ])) : createCommentVNode("", true)
    ], 16, Mai));
  }
}), Dt1 = ["width", "height", "fill", "transform"], Rt1 = {key: 0}, Ut1 = ["stroke"], qt1 = ["stroke"], Gt1 = ["stroke"], Et1 = {key: 1}, Ot1 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "128",
  r: "88",
  opacity: "0.2"
}, null, -1), It1 = ["stroke"], Kt1 = ["stroke"], Xt1 = ["stroke"], Jt1 = {key: 2}, Qt1 = /* @__PURE__ */ createBaseVNode("path", {d: "M104,16h48a8,8,0,0,0,0-16H104a8,8,0,0,0,0,16Z"}, null, -1), Yt1 = /* @__PURE__ */ createBaseVNode("path", {d: "M128,32a96,96,0,1,0,96,96A96.2,96.2,0,0,0,128,32Zm45.3,62.1-39.6,39.6a8.2,8.2,0,0,1-11.4,0,8.1,8.1,0,0,1,0-11.4l39.6-39.6a8.1,8.1,0,1,1,11.4,11.4Z"}, null, -1), on1 = [
  Qt1,
  Yt1
], en1 = {key: 3}, tn1 = ["stroke"], nn1 = ["stroke"], sn1 = ["stroke"], rn1 = {key: 4}, in1 = ["stroke"], ln1 = ["stroke"], dn1 = ["stroke"], kn1 = {key: 5}, cn1 = ["stroke"], hn1 = ["stroke"], un1 = ["stroke"], an1 = {
  name: "PhTimer"
}, enl = /* @__PURE__ */ defineComponent({
  ...an1,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", Rt1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "140",
          r: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Ut1),
        createBaseVNode("line", {
          x1: "128",
          y1: "140",
          x2: "161.9",
          y2: "106.1",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, qt1),
        createBaseVNode("line", {
          x1: "104",
          y1: "12",
          x2: "152",
          y2: "12",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, Gt1)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", Et1, [
        Ot1,
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-miterlimit": "10",
          "stroke-width": "16"
        }, null, 8, It1),
        createBaseVNode("line", {
          x1: "128",
          y1: "128",
          x2: "167.6",
          y2: "88.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Kt1),
        createBaseVNode("line", {
          x1: "104",
          y1: "8",
          x2: "152",
          y2: "8",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, Xt1)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", Jt1, on1)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", en1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, tn1),
        createBaseVNode("line", {
          x1: "128",
          y1: "128",
          x2: "167.6",
          y2: "88.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, nn1),
        createBaseVNode("line", {
          x1: "104",
          y1: "8",
          x2: "152",
          y2: "8",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, sn1)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", rn1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, in1),
        createBaseVNode("line", {
          x1: "128",
          y1: "128",
          x2: "167.6",
          y2: "88.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, ln1),
        createBaseVNode("line", {
          x1: "104",
          y1: "8",
          x2: "152",
          y2: "8",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, dn1)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", kn1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "88",
          fill: "none",
          stroke: unref(t),
          "stroke-miterlimit": "10",
          "stroke-width": "16"
        }, null, 8, cn1),
        createBaseVNode("line", {
          x1: "128",
          y1: "128",
          x2: "167.6",
          y2: "88.4",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, hn1),
        createBaseVNode("line", {
          x1: "104",
          y1: "8",
          x2: "152",
          y2: "8",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, un1)
      ])) : createCommentVNode("", true)
    ], 16, Dt1));
  }
}), eH1 = ["width", "height", "fill", "transform"], tH1 = {key: 0}, nH1 = ["stroke"], sH1 = ["stroke"], rH1 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "172",
  r: "16"
}, null, -1), iH1 = {key: 1}, lH1 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "128",
  r: "96",
  opacity: "0.2"
}, null, -1), dH1 = ["stroke"], kH1 = ["stroke"], cH1 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "172",
  r: "12"
}, null, -1), hH1 = {key: 2}, uH1 = /* @__PURE__ */ createBaseVNode("path", {d: "M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"}, null, -1), aH1 = [
  uH1
], _H1 = {key: 3}, pH1 = ["stroke"], yH1 = ["stroke"], $H1 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "172",
  r: "10"
}, null, -1), wH1 = {key: 4}, fH1 = ["stroke"], gH1 = ["stroke"], xH1 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "172",
  r: "8"
}, null, -1), jH1 = {key: 5}, mH1 = ["stroke"], MH1 = ["stroke"], vH1 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "172",
  r: "12"
}, null, -1), SH1 = {
  name: "PhWarningCircle"
}, rsl = /* @__PURE__ */ defineComponent({
  ...SH1,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", tH1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, nH1),
        createBaseVNode("line", {
          x1: "128",
          y1: "80",
          x2: "128",
          y2: "132",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, sH1),
        rH1
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", iH1, [
        lH1,
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-miterlimit": "10",
          "stroke-width": "16"
        }, null, 8, dH1),
        createBaseVNode("line", {
          x1: "128",
          y1: "80",
          x2: "128",
          y2: "136",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, kH1),
        cH1
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", hH1, aH1)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", _H1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, pH1),
        createBaseVNode("line", {
          x1: "128",
          y1: "80",
          x2: "128",
          y2: "136",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, yH1),
        $H1
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", wH1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, fH1),
        createBaseVNode("line", {
          x1: "128",
          y1: "80",
          x2: "128",
          y2: "136",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, gH1),
        xH1
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", jH1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-miterlimit": "10",
          "stroke-width": "16"
        }, null, 8, mH1),
        createBaseVNode("line", {
          x1: "128",
          y1: "80",
          x2: "128",
          y2: "136",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, MH1),
        vH1
      ])) : createCommentVNode("", true)
    ], 16, eH1));
  }
}), OP1 = ["width", "height", "fill", "transform"], IP1 = {key: 0}, KP1 = ["stroke"], XP1 = ["stroke"], JP1 = {key: 1}, QP1 = ["stroke"], YP1 = ["stroke"], oW1 = {key: 2}, eW1 = /* @__PURE__ */ createBaseVNode("path", {d: "M139.3,128l66.4-66.3a8.1,8.1,0,0,0-11.4-11.4L128,116.7,61.7,50.3A8.1,8.1,0,0,0,50.3,61.7L116.7,128,50.3,194.3a8.1,8.1,0,0,0,0,11.4,8.2,8.2,0,0,0,11.4,0L128,139.3l66.3,66.4a8.2,8.2,0,0,0,11.4,0,8.1,8.1,0,0,0,0-11.4Z"}, null, -1), tW1 = [
  eW1
], nW1 = {key: 3}, sW1 = ["stroke"], rW1 = ["stroke"], iW1 = {key: 4}, lW1 = ["stroke"], dW1 = ["stroke"], kW1 = {key: 5}, cW1 = ["stroke"], hW1 = ["stroke"], uW1 = {
  name: "PhX"
}, Ssl = /* @__PURE__ */ defineComponent({
  ...uW1,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", IP1, [
        createBaseVNode("line", {
          x1: "200",
          y1: "56",
          x2: "56",
          y2: "200",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, KP1),
        createBaseVNode("line", {
          x1: "200",
          y1: "200",
          x2: "56",
          y2: "56",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, XP1)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", JP1, [
        createBaseVNode("line", {
          x1: "200",
          y1: "56",
          x2: "56",
          y2: "200",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, QP1),
        createBaseVNode("line", {
          x1: "200",
          y1: "200",
          x2: "56",
          y2: "56",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, YP1)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", oW1, tW1)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", nW1, [
        createBaseVNode("line", {
          x1: "200",
          y1: "56",
          x2: "56",
          y2: "200",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, sW1),
        createBaseVNode("line", {
          x1: "200",
          y1: "200",
          x2: "56",
          y2: "56",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, rW1)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", iW1, [
        createBaseVNode("line", {
          x1: "200",
          y1: "56",
          x2: "56",
          y2: "200",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, lW1),
        createBaseVNode("line", {
          x1: "200",
          y1: "200",
          x2: "56",
          y2: "56",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, dW1)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", kW1, [
        createBaseVNode("line", {
          x1: "200",
          y1: "56",
          x2: "56",
          y2: "200",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, cW1),
        createBaseVNode("line", {
          x1: "200",
          y1: "200",
          x2: "56",
          y2: "56",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, hW1)
      ])) : createCommentVNode("", true)
    ], 16, OP1));
  }
}), aW1 = ["width", "height", "fill", "transform"], _W1 = {key: 0}, pW1 = ["stroke"], yW1 = ["stroke"], $W1 = ["stroke"], wW1 = {key: 1}, fW1 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "128",
  cy: "128",
  r: "96",
  opacity: "0.2"
}, null, -1), gW1 = ["stroke"], xW1 = ["stroke"], jW1 = ["stroke"], mW1 = {key: 2}, MW1 = /* @__PURE__ */ createBaseVNode("path", {d: "M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm37.7,130.3a8.1,8.1,0,0,1,0,11.4,8.2,8.2,0,0,1-11.4,0L128,139.3l-26.3,26.4a8.2,8.2,0,0,1-11.4,0,8.1,8.1,0,0,1,0-11.4L116.7,128,90.3,101.7a8.1,8.1,0,0,1,11.4-11.4L128,116.7l26.3-26.4a8.1,8.1,0,0,1,11.4,11.4L139.3,128Z"}, null, -1), vW1 = [
  MW1
], SW1 = {key: 3}, HW1 = ["stroke"], AW1 = ["stroke"], VW1 = ["stroke"], zW1 = {key: 4}, ZW1 = ["stroke"], CW1 = ["stroke"], bW1 = ["stroke"], LW1 = {key: 5}, BW1 = ["stroke"], PW1 = ["stroke"], WW1 = ["stroke"], NW1 = {
  name: "PhXCircle"
}, Hsl = /* @__PURE__ */ defineComponent({
  ...NW1,
  props: {
    weight: {
      type: String
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String
    },
    mirrored: {
      type: Boolean
    }
  },
  setup(h) {
    const l = h, u = inject("weight", "regular"), a = inject("size", "1em"), _ = inject("color", "currentColor"), p = inject("mirrored", false), i = computed(() => {
      var n;
      return (n = l.weight) != null ? n : u;
    }), c = computed(() => {
      var n;
      return (n = l.size) != null ? n : a;
    }), t = computed(() => {
      var n;
      return (n = l.color) != null ? n : _;
    }), y = computed(() => {
      var n;
      return ((n = l.mirrored) != null ? n : p) ? "scale(-1, 1)" : void 0;
    });
    return (n, x) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      width: unref(c),
      height: unref(c),
      fill: unref(t),
      transform: unref(y)
    }, n.$attrs), [
      renderSlot(n.$slots, "default"),
      unref(i) === "bold" ? (openBlock(), createElementBlock("g", _W1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, pW1),
        createBaseVNode("line", {
          x1: "160",
          y1: "96",
          x2: "96",
          y2: "160",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, yW1),
        createBaseVNode("line", {
          x1: "160",
          y1: "160",
          x2: "96",
          y2: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "24"
        }, null, 8, $W1)
      ])) : unref(i) === "duotone" ? (openBlock(), createElementBlock("g", wW1, [
        fW1,
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-miterlimit": "10",
          "stroke-width": "16"
        }, null, 8, gW1),
        createBaseVNode("line", {
          x1: "160",
          y1: "96",
          x2: "96",
          y2: "160",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, xW1),
        createBaseVNode("line", {
          x1: "160",
          y1: "160",
          x2: "96",
          y2: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, jW1)
      ])) : unref(i) === "fill" ? (openBlock(), createElementBlock("g", mW1, vW1)) : unref(i) === "light" ? (openBlock(), createElementBlock("g", SW1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, HW1),
        createBaseVNode("line", {
          x1: "160",
          y1: "96",
          x2: "96",
          y2: "160",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, AW1),
        createBaseVNode("line", {
          x1: "160",
          y1: "160",
          x2: "96",
          y2: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12"
        }, null, 8, VW1)
      ])) : unref(i) === "thin" ? (openBlock(), createElementBlock("g", zW1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, ZW1),
        createBaseVNode("line", {
          x1: "160",
          y1: "96",
          x2: "96",
          y2: "160",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, CW1),
        createBaseVNode("line", {
          x1: "160",
          y1: "160",
          x2: "96",
          y2: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "8"
        }, null, 8, bW1)
      ])) : unref(i) === "regular" ? (openBlock(), createElementBlock("g", LW1, [
        createBaseVNode("circle", {
          cx: "128",
          cy: "128",
          r: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-miterlimit": "10",
          "stroke-width": "16"
        }, null, 8, BW1),
        createBaseVNode("line", {
          x1: "160",
          y1: "96",
          x2: "96",
          y2: "160",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, PW1),
        createBaseVNode("line", {
          x1: "160",
          y1: "160",
          x2: "96",
          y2: "96",
          fill: "none",
          stroke: unref(t),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "16"
        }, null, 8, WW1)
      ])) : createCommentVNode("", true)
    ], 16, aW1));
  }
});

export { OT1 as PhArrowRight, SU1 as PhCaretDoubleRight, AU1 as PhCaretDown, UU1 as PhChartBar, cq1 as PhCheck, hq1 as PhCheckCircle, PG1 as PhCursor, zE1 as PhEnvelopeOpen, VI1 as PhGauge, tK1 as PhGoogleLogo, LX1 as PhListDashes, NX1 as PhLockKey, DJ1 as PhNotification, kol as PhRocket, jel as PhSparkle, enl as PhTimer, rsl as PhWarningCircle, Ssl as PhX, Hsl as PhXCircle };
