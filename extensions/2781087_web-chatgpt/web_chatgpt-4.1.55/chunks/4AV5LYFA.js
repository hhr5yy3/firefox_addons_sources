import {
  Link_default,
  material_exports
} from "./2FH7W2EF.js";
import {
  require_jsx_runtime
} from "./JCIZV2AT.js";
import {
  require_react
} from "./AMCWABVH.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/components/ProLink.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ProLink = (props) => {
  const { href, underline = "none", ...rest } = props;
  const ref = (0, import_react.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Link_default,
    {
      target: "_blank",
      ref,
      href: href != null ? href : "#",
      component: "a",
      underline,
      ...rest
    }
  );
};
var ProLink_default = ProLink;

export {
  ProLink_default
};
