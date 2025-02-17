globalThis.chrome = globalThis.browser;

import { compileTemplate } from './core.js';
import { getPlaceholder } from './utils.js';
import * as index from './helpers/index.js';
import * as methods from './methods.js';

const PLACEHOLDER = getPlaceholder();
const PLACEHOLDER_SVG = getPlaceholder("svg");
const PLACEHOLDER_LAYOUT = getPlaceholder("layout");

const templates = new Map();
function compile(parts, args, id, isSVG, isMsg) {
  function fn(host, target) {
    if (fn.useLayout) id += PLACEHOLDER_LAYOUT;

    let render = templates.get(id);
    if (!render) {
      render = compileTemplate(parts, isSVG, isMsg, fn.useLayout);
      templates.set(id, render);
    }

    if (fn.plugins) {
      return fn.plugins.reduce(
        (acc, plugin) => plugin(acc),
        () => render(host, target, args, fn.styleSheets),
      )(host, target);
    } else {
      return render(host, target, args, fn.styleSheets);
    }
  }

  return Object.assign(fn, methods);
}

function html(parts, ...args) {
  const id = parts.join(PLACEHOLDER);
  return compile(parts, args, id, false, false);
}

function svg(parts, ...args) {
  const id = parts.join(PLACEHOLDER) + PLACEHOLDER_SVG;
  return compile(parts, args, id, true, false);
}

Object.freeze(Object.assign(html, index));

export { compile, html, svg };
