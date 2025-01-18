import { stringToHash } from './library.js';
/**
 * Filee of methods for content data templates render
 */
import * as templates from './templates.js';

const createStyleSheetLinkElement = (path) => {
  const href = path.startsWith('http') ? path : browser.runtime.getURL(path);
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', href);
  return link;
};
const createJavaScriptElement = (path) => {
  const href = path.startsWith('http') ? path : browser.runtime.getURL(path);
  const script = document.createElement('script');
  script.setAttribute('type', 'module');
  script.setAttribute('src', href);
  return script;
};

/**
 *
 * @callback RenderMethod
 * @param {string} selector
 * @param {string=} contentId Unique DOM ID to avoid rendered duplicities
 *
 * @typedef {Object} RenderOptions
 * @property {boolean} useShadowDOM Protect content against surrounding world
 * @property {string[]} injectScripts List of hrefs to external or internal asset
 * @property {string[]} injectStyles List of hrefs to external or internal asset
 *
 * @param {string} content HTML content
 * @param {RenderOptions} options
 *
 * @returns {RenderMethod} Where to render given content
 */
export function render(
  content,
  { useShadowDOM, injectScripts = [], injectStyles = [] } = {}
) {
  const inject = (target) => {
    injectStyles.forEach((path) => {
      const link = createStyleSheetLinkElement(path);
      target.appendChild(link);
    });
    injectScripts.forEach((path) => {
      const script = createJavaScriptElement(path);
      target.appendChild(script);
    });
  };

  return ({ selector, append = false }, contentId) => {
    const target = document.querySelector(selector);

    if (append) {
      const container = document.createElement('div');
      container.innerHTML = content;
      target.appendChild(container);
      inject(target);
      return target;
    }

    if (!useShadowDOM) {
      target.innerHTML = content;
      inject(target);
      return target;
    }

    const container =
      document.querySelector(`#tipli-content-${contentId}`) ||
      document.createElement('div');
    container.setAttribute('id', `tipli-content-${contentId}`);
    const shadow = container.attachShadow({ mode: 'closed' });
    shadow.innerHTML = content;
    inject(shadow);
    target.appendChild(container);
    return [container, shadow];
  };
}

/**
 * Use data and render content,
 *  optionally can be rendered as shadow box not impacted by content styles and scripts
 *
 * @typedef {Object} RenderContentAppearance
 * @property {string} selector CSS selector to target where in DOM should be content rendered
 *
 * @typedef {Object} RenderContentParams
 * @property {string} contentType Name of content template
 * @property {Object} contentData Any data passed to template as its prop
 * @property {RenderContentAppearance} appearance Preferences to display content container
 *
 * @param {RenderContentParams} properties
 * @param {RenderOptions} options
 */
export function renderContent(
  { contentType, contentData, appearance } = {},
  options = { locale: 'cs' }
) {
  templates.init({ locale: options.locale });
  const content = templates[contentType](contentData);
  const contentId = stringToHash(contentType);
  return render(content, options)(appearance, contentId);
}
