/*
 * File of pure JS Template literals used across extension to render data
 */
import marked from './vendor/marked.js';
import { initLocalization } from './resources.js';
import { LOCALE_TIPLI_URL, DEFAULT_LOCALE } from './environment.js';
import { classNames, localeUrlToTipliName } from './library.js';

marked.use({
  renderer: {
    link(href, title, text) {
      return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
    },
  },
});
const md = (s) => (s ? marked(s).replace(/<[\/]?p>/g, '') : '');
let l = initLocalization(DEFAULT_LOCALE);

export const init = ({ locale }) => {
  l = initLocalization(locale);
};

export const locale_date = (timestamp) => {
  const date = new Date(timestamp);
  return [date.toLocaleDateString(), date.toLocaleTimeString()].join(' ');
};

/** warning: eagerly evaluates both parts */
const iif = (expr, truePart, falsePart) => (expr ? truePart : falsePart);
const when = (expr, truePart) => iif(expr, truePart, '');

export const asset = (name) => browser.runtime.getURL(`assets/${name}`);

export const locale_home_url = (locale = 'cs') => LOCALE_TIPLI_URL[locale];

/** Icon color can be changed via `--icon-color` custom property */
export const terms_icon = ({ title, href }) => `
  <a class="terms-icon" href="${href}" title="${title}" target="_blank" rel="noopener noreferrer">
    <svg width="10" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 .156a4.844 4.844 0 10.001 9.69A4.844 4.844 0 005 .155zm0 8.75A3.904 3.904 0 011.094 5 3.905 3.905 0 015 1.094 3.905 3.905 0 018.906 5 3.904 3.904 0 015 8.906zm2.095-4.984c0 1.31-1.415 1.33-1.415 1.814v.123c0 .13-.105.235-.234.235h-.892a.234.234 0 01-.234-.235V5.69c0-.698.53-.977.93-1.201.342-.193.552-.323.552-.578 0-.337-.43-.56-.777-.56-.453 0-.662.214-.956.585a.235.235 0 01-.325.041L3.2 3.565a.235.235 0 01-.051-.32c.461-.677 1.05-1.058 1.964-1.058.959 0 1.982.749 1.982 1.735zM5.82 7.187a.821.821 0 01-1.64 0 .821.821 0 011.64 0z" fill="var(--icon-color,#9D9D9D)"/></svg>
  </a>
`;

export const tipli_logo = ({ locale } = {}, type = 'content-box') => `
  <a
    class="tipli-logo tipli-logo--${type}"
    href="${locale_home_url(locale)}"
    title="Tipli"
  >
    <img
      class="tipli-logo__image"
      src="${asset(`logo-${localeUrlToTipliName(LOCALE_TIPLI_URL[locale])}.png`)}"
      alt="Tipli"
    />
  </a>
`;

export const display_money = ({ balance, currency }, { locale }) => {
  return parseFloat(balance || 0).toLocaleString(locale, {
    style: 'currency',
    currency,
  });
};

export const reward_button = (buttonLabel = 'Label', buttonUrl, icon = '') =>
  `<a class="reward_button" href="${buttonUrl}">${icon} ${buttonLabel}</a>`;

const reward_deactivated = (buttonLabel, buttonUrl) => `
  <strong>${l('reward-deactivated')}</strong>
  ${reward_button(
    buttonLabel,
    buttonUrl,
    `<svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.01.188a5.793 5.793 0 014.005 1.61l.837-.838a.563.563 0 01.96.398V4.5c0 .31-.251.563-.562.563H8.108a.563.563 0 01-.398-.96l.979-.98a3.938 3.938 0 10-.096 5.84.28.28 0 01.383.013l.93.93c.114.114.109.3-.011.409A5.813 5.813 0 01.188 6 5.823 5.823 0 016.01.188z" fill="#fff"/></svg>`
  )}
`;

const reward_activated = () => `
  <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M4.077 11.157l-3.9-4.225a.689.689 0 010-.92l.849-.919a.568.568 0 01.848 0L4.501 7.94l5.628-6.096a.568.568 0 01.848 0l.849.92a.689.689 0 010 .919l-6.9 7.475a.568.568 0 01-.849 0z" fill="#fff"/></g><defs><clipPath id="clip0"><path fill="#fff" transform="translate(.001)" d="M0 0h12v13H0z"/></clipPath></defs></svg>
  <strong>${l('reward-activated')}</strong>
  <span class="reward-suffix">${l('reward-activated-suffix')}</span>
`;

const reward_state = (
  reward,
  { buttonLabel, buttonUrl, buttonLabelReactivation, deepUrl }
) => {
  const enhanceAboutDeepUrl = str => {
    if (!str || !deepUrl) return str;
    const url = new URL(str);
    url.searchParams.set('deepUrl', deepUrl);
    return url.href;
  }

  if (reward.deactivated) {
    return reward_deactivated(buttonLabelReactivation, enhanceAboutDeepUrl(buttonUrl));
  }
  if (reward.cashback) {
    return reward_activated();
  }
  return reward_button(buttonLabel, enhanceAboutDeepUrl(buttonUrl));
};

const reward_cashback = (
  { shop, reward } = {},
  targetType,
) => {
  return `
    <div class="${classNames('shop-reward-cashback', {
      [`shop-reward-cashback--${targetType}`]: targetType,
      [`shop-reward-cashback--activated`]: reward.cashback,
      [`shop-reward-cashback--deactivated`]: reward.deactivated,
    })}">
      <div class="shop-reward-cashback__reward">
        ${md(shop.reward)}
      ${when(
        shop.conditionsUrl,
        terms_icon({ title: l('show-terms'), href: shop.conditionsUrl })
      )}
        <span>${shop.rewardSuffix}</span>
      </div>
      <div class="${classNames('shop-reward-cashback__button', {
        [`shop-reward-cashback__button--activated`]: reward.cashback,
        [`shop-reward-cashback__button--deactivated`]: reward.deactivated,
      })}">
        ${reward_state(reward, shop)}
      </div>
    </div>
  `;
};

const reward_coupons = ({ shop }, targetType) => `
  <div class="${classNames('shop-reward-coupons', {
    [`shop-reward-coupons--${targetType}`]: targetType,
  })}">
    ${icon('coupon', 16)}
    ${md(shop.reward)}
    <span>${shop.rewardSuffix}</span>
  </div>
`;

const reward_notice = ({ shop }, targetType) => `
  <div class="${classNames('shop-reward-notice', {
    [`shop-reward-notice--${targetType}`]: targetType,
  })}">
    <div class="shop-reward-notice__notice">
      ${md(shop.notice)}
    </div>
  </div>
`;

export const shop_rewards = {
  cashback: reward_cashback,
  coupons: reward_coupons,
  notice: reward_notice,
};

export const control_icon = (type, size) => `
  <button
    class="control-icon"
    id="control-icon-${type}"
    data-control-type="${type}"
    aria-label="${l(type)}"
  >
    ${icon(type, size)}
  </button>
`;

export const sales_item = (context, reward) => sale => {
  if (!sales_types[sale.type]) return '';

  let title = sale.name || '';
  const maxLength = 46;

  if (context === 'popup' && title.length > maxLength) {
    title = title.substring(0, maxLength).trim() + '…';
  }

  const conditionsMaxLength = context === 'popup' ? 56 : 75;

  return `
    <div class="${classNames('sales-item', {
      [`sales-item--${context}`]: context,
      [`sales-item--activated`]: reward.coupons && !sale.isSimilar,
      [`sales-item--similar`]: sale.isSimilar,
    })}">
      <div class="sales-item__discount">${sale.reward || ''}</div>
      <div class="sales-item__title" title="${sale.name}">${title}</div>
      ${iif(
        sale.shopConditionsUrl,
        terms_icon({ href: sale.shopConditionsUrl, title: l('show-terms') }),
        `<i></i>`
      )}
      ${when(
        sale.shopConditionsText,
        `
          <div class="sales-item__shop-conditions-text">
            ${sale.shopConditionsText}
            ${iif(
              (sale.shopConditionsText || "").length > conditionsMaxLength,
              `<span class="sales-item__shop-conditions-text-more">&nbsp;...&nbsp;<strong>${l('more')}</strong></a>`, ""
            )}
          </div>`
      )}
      ${when(
        sale.isSimilar && context === 'content',
        `<div class="sales-item__cashback-reward">${sale.cashbackReward || ''}</div>`
      )}
      ${when(
        sale.isSimilar || context === 'popup',
        `
        <div class="sales-item__logo">
          <img alt="${sale.shopName}" src="${sale.shopLogoUrl}">
        </div>`
      )}
      <div class="sales-item__sticker">
        ${sales_types[sale.type](sale)}
      </div>
    </div>
  `;
};

const similar_items_header = (context) => `
  <div class="sales-item sales-item--${context} sales-item--header">
    ${l('similar-items-header')}
  </div>
`;

export const content_box = ({
  shop = {},
  sales = [],
  preferences = {},
  reward = {},
} = {}) => {
  const similarSales = sales.filter((x) => x.isSimilar);
  const shopSales = sales.filter((x) => !x.isSimilar);

  return `
    <div class="content-box">
      <div class="content-box__header">
        ${tipli_logo(preferences)}
        <div class="content-box__controls">
          ${control_icon('hide')}
          ${control_icon('close')}
        </div>
      </div>
      ${shop_rewards[shop.rewardType]({ reward, shop }, 'content')}
      ${when(
        sales.length,
        `<div class="content-box__coupons">
          ${shopSales.map(sales_item('content', reward)).join('\n')}
          ${when(similarSales.length, similar_items_header('content'))}
          ${similarSales
            .map(sales_item('content', { coupons: false }))
            .join('\n')}
        </div>`
      )}
      ${iif(
        shop.rewardType === 'notice' && !sales.length,
        `<div class="content-box__footer content-box__footer--solid-button">
          ${reward_button(l('more-sale-coupons'), shop.shopDetailUrl)}
        </div>`,
        `<div class="content-box__footer content-box__footer--sticky-link">
          <a href="${shop.shopDetailUrl}">${l('more-sale-coupons')}</a>
        </div>`
      )}
    </div>
  `;
};

export const icon = (type, size = 12) => `
  <img
    alt="${type}"
    class="${type} icon"
    src="${asset(`ic-${type}.svg`)}"
    width="${size}"
    height="${size}"
  />
`;

export const user_cashback = (user = {}, preferences = {}) => `
  ${l('cashback-state')}:
  <strong>${display_money(user, preferences)}</strong>
`;

const signed_in_user = (user, preferences, rewardsLinks) => `
  <a href="${rewardsLinks}" class="popup-header__cashback">
    ${user_cashback(user, preferences)}
  </a>
  <a href="${rewardsLinks}" class="popup-header__user">
    <img alt="" src="${asset('ic-account.svg')}" width="12" height="12" />
    <span class="popup-header__username">${user.name}</span>
  </a>
`;

const signed_out_user = (preferences, currentTabUrl, signInLink) => `
  <div class="popup-header__user">
    <img alt="" src="${asset('ic-account.svg')}" width="12" height="12" />
    <a href="${signInLink}">${l('sign-in')}</a>
  </div>
`;

const user_part = (user, preferences, currentTabUrl, tipliLinks = {}) => {
  if (user && !user.empty) {
    return signed_in_user(user, preferences, tipliLinks.transactions);
  }
  return signed_out_user(preferences, currentTabUrl, tipliLinks.signIn);
};

export const popup_header = ({
  user,
  preferences,
  tab: { url: currentTabUrl } = {},
  tipliLinks,
} = {}) => `
  <div class="popup-header">
    <div class="popup-header__logo">
      ${tipli_logo(preferences, 'popup-box')}
    </div>
    ${user_part(user, preferences, currentTabUrl, tipliLinks)}
  </div>
`;

export const popup_footer = ({ currentPageUrlBase = '' }) => `
  <nav>
    <a href="#content" class="content-link">
      <svg width="10" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.772 2.316L8.718.293A.507.507 0 008.278 0H1.72a.507.507 0 00-.44.293L.226 2.316c-.543 1.045-.061 2.498.955 2.664.073.012.148.018.222.018.481 0 .906-.254 1.198-.646.293.392.72.646 1.199.646.48 0 .905-.254 1.198-.646.292.392.719.646 1.198.646.48 0 .905-.254 1.198-.646.294.392.719.646 1.198.646.076 0 .15-.006.222-.018 1.02-.164 1.503-1.617.958-2.664zM8.595 5.625c-.162 0-.323-.03-.479-.074V7.5H1.882V5.55a1.81 1.81 0 01-.479.075c-.097 0-.196-.008-.292-.023a1.75 1.75 0 01-.266-.07v3.843c0 .346.232.625.52.625h7.272c.288 0 .52-.28.52-.625V5.531a1.421 1.421 0 01-.267.07 1.882 1.882 0 01-.295.024z" fill="var(--fill-color)"/></svg>
      ${l('shop')}
    </a>
    <a href="#search" class="search-link">
      <svg width="10" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.863 8.646L7.916 6.7a.468.468 0 00-.332-.136h-.318A4.062 4.062 0 100 4.063a4.062 4.062 0 006.563 3.203v.318c0 .125.048.244.136.332l1.947 1.947c.184.184.481.184.663 0l.552-.552a.471.471 0 00.002-.665zm-5.8-2.084c-1.381 0-2.5-1.117-2.5-2.5 0-1.38 1.117-2.5 2.5-2.5 1.38 0 2.5 1.118 2.5 2.5 0 1.381-1.118 2.5-2.5 2.5z" fill="var(--fill-color)"/></svg>
      ${l('search')}
    </a>
    <a href="options.html#${currentPageUrlBase}" target="_blank">
      <svg width="10" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.73 2.398l.28.154a.227.227 0 01.105.283 2.054 2.054 0 01-.363.602.25.25 0 01-.307.052l-.28-.153c-.156.129-.337.23-.534.298v.31c0 .112-.084.21-.202.228a2.29 2.29 0 01-.724 0 .236.236 0 01-.203-.229v-.31a1.704 1.704 0 01-.536-.297l-.279.153a.247.247 0 01-.307-.052 2.078 2.078 0 01-.363-.602.227.227 0 01.106-.283l.279-.154a1.6 1.6 0 010-.594l-.28-.154a.227.227 0 01-.105-.283C.103 1.146.227.943.38.765A.25.25 0 01.687.712l.28.154c.156-.13.337-.23.535-.298v-.31c0-.112.084-.21.2-.228.235-.038.481-.04.725 0a.236.236 0 01.204.229v.31c.197.067.378.168.535.297l.279-.154a.247.247 0 01.307.053c.154.178.277.382.363.602a.227.227 0 01-.106.283l-.279.154a1.6 1.6 0 010 .594zm-1.148.197c.578-.722-.28-1.545-1.032-.99-.58.722.28 1.545 1.032.99zm3.006 2.162l.328-.632a.48.48 0 01.568-.197c.473.167.906.495 1.285.799a.436.436 0 01.104.568l-.328.546c.267.3.48.648.619 1.029h.656c.227 0 .422.156.46.37a4.05 4.05 0 010 1.422.464.464 0 01-.46.375h-.656c-.14.381-.352.73-.62 1.03l.327.545c.113.188.07.43-.104.569-.379.303-.812.624-1.283.79a.48.48 0 01-.568-.196l-.328-.624a3.523 3.523 0 01-1.239 0l-.33.624a.475.475 0 01-.566.197c-.473-.167-.906-.488-1.285-.791a.436.436 0 01-.104-.569l.328-.545c-.267-.3-.48-.649-.619-1.03h-.658a.46.46 0 01-.46-.367 4.107 4.107 0 01-.001-1.425.464.464 0 01.46-.375h.657c.14-.38.352-.73.62-1.03l-.329-.545a.436.436 0 01.104-.568c.379-.304.812-.623 1.285-.79a.477.477 0 01.568.188l.328.632c.41-.073.83-.073 1.24 0zM6 6.962c-1.504-1.11-3.221.538-2.065 1.982C5.44 10.054 7.155 8.406 6 6.962zm3.568-4.564l.28.154a.227.227 0 01.105.283 2.054 2.054 0 01-.364.602.25.25 0 01-.306.052l-.28-.153c-.156.129-.337.23-.535.298v.31c0 .112-.084.21-.2.228a2.29 2.29 0 01-.725 0 .236.236 0 01-.204-.229v-.31a1.704 1.704 0 01-.535-.297l-.279.153a.247.247 0 01-.307-.052 2.078 2.078 0 01-.363-.602.227.227 0 01.106-.283l.279-.154a1.6 1.6 0 010-.594l-.28-.154a.227.227 0 01-.105-.283c.086-.221.21-.424.363-.602a.25.25 0 01.307-.053l.28.154c.156-.13.337-.23.534-.298v-.31c0-.112.084-.21.202-.228.234-.038.48-.04.724 0a.236.236 0 01.203.229v.31c.198.067.38.168.536.297l.279-.154a.247.247 0 01.306.053c.155.178.278.382.364.602a.227.227 0 01-.106.283l-.279.154a1.6 1.6 0 010 .594zm-1.15.197c.578-.722-.28-1.545-1.032-.99-.578.722.28 1.545 1.032.99z" fill="var(--fill-color)"/></svg>
      ${l('settings')}
    </a>
  </nav>
`;

export const options_form = ({
  preferences: {
    locale,
    scanSeznam,
    scanGoogle,
    scanHeureka,
    scanZbozi,
    blacklistedDomains = [],
  } = {},
  feedMeta = {},
  manifest = {},
} = {}) => `
  <h1 class="text-center mt-4 mb-5">
    ${tipli_logo({ locale }, 'options-page')}
  </h1>

  <form class="preferences-form container p-2">
    <h2>${l('main-settings')}</h2>

    <div class="mt-4 mb-3">
      <h4>${l('show-notifications-in-search')}</h4>
      ${options_form_serp('scanGoogle', scanGoogle)}
      ${when(locale === 'cs', options_form_serp('scanSeznam', scanSeznam))}
      ${when(
        ['cs', 'sk'].includes(locale),
        options_form_serp('scanHeureka', scanHeureka)
      )}
      ${when(locale === 'cs', options_form_serp('scanZbozi', scanZbozi))}
    </div>

    <h2 class="mt-4 mb-3">${l('advanced-settings')}</h2>

    <div class="mt-4 mb-5">
      <h4>${l('notifications')}</h4>
      <div class="mt-3 mb-3" id="domain-preferences">
        ${blacklistedDomains.map(domain_preference).join('\n')}
      </div>
      <div class="mt-3 mb-3 form-inline">
        <div class="form-group">
          <input
            name="blacklist-add-domain"
            placeholder="${l('blacklist-domain-example')}"
            class="form-control form-control-sm mr-2"
          />
          <button
            type="button"
            class="btn btn-primary btn-sm"
            data-click-action="blacklist-add-domain"
          >
            ${l('blacklist-add-domain')}
          </button>
        </div>
      </div>

    </div>

    <div class="mt-4 mb-3">
      <h4 class="mb-3">${l('locale')}</h4>
      <div class="row mb-2">
        <div class="col">
          <label for="locale-cs">
            <strong>Tipli.cz</strong> - ${l('lang-cs')}
          </label>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <div class="custom-control custom-radio">
            <input
              class="custom-control-input"
              id="locale-cs"
              type="radio"
              name="locale"
              value="cs"
              ${when(locale === 'cs', 'checked')}
            />
            <label class="custom-control-label" for="locale-cs"></label>
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <label for="locale-sk">
            <strong>Tipli.sk</strong> - ${l('lang-sk')}
          </label>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <div class="custom-control custom-radio">
            <input
              class="custom-control-input"
              id="locale-sk"
              type="radio"
              name="locale"
              value="sk"
              ${when(locale === 'sk', 'checked')}
            />
            <label class="custom-control-label" for="locale-sk"></label>
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <label for="locale-pl">
            <strong>Tipli.pl</strong> - ${l('lang-pl')}
          </label>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <div class="custom-control custom-radio">
            <input
              class="custom-control-input"
              id="locale-pl"
              type="radio"
              name="locale"
              value="pl"
              ${when(locale === 'pl', 'checked')}
            />
            <label class="custom-control-label" for="locale-pl"></label>
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <label for="locale-ro">
            <strong>Tipli.ro</strong> - ${l('lang-ro')}
          </label>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <div class="custom-control custom-radio">
            <input
              class="custom-control-input"
              id="locale-ro"
              type="radio"
              name="locale"
              value="ro"
              ${when(locale === 'ro', 'checked')}
            />
            <label class="custom-control-label" for="locale-ro"></label>
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <label for="locale-ro">
            <strong>Tiplino.hu</strong> - ${l('lang-hu')}
          </label>
        </div>
        <div class="col-1 d-flex justify-content-end">
          <div class="custom-control custom-radio">
            <input
              class="custom-control-input"
              id="locale-hu"
              type="radio"
              name="locale"
              value="hu"
              ${when(locale === 'hu', 'checked')}
            />
            <label class="custom-control-label" for="locale-hu"></label>
          </div>
        </div>
      </div>
    </div>

    <div class="row d-flex align-items-end">
      <div class="col">
        <p class="small mb-1">
          ${l('extension-version')}: ${manifest.version}
        </p>
        <p class="small mb-1">
          <a data-click-action="restore-extension" href="#">
            ${l('restore-extension')}
          </a>
        </p>
        <p class="small mb-1">
          ${l('shops-list-updated')}: <span id="feed-updated-at-info">${locale_date(feedMeta.loadedAt)}</span> -
          <a href="#" data-click-action="refresh-feed">${l('reload-feed')}</a>
        </p>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary" disabled="disabled">
          ${l('save-settings')}
        </button>
      </div>
  </form>
`;

export const options_form_serp = (type, checked) => {
  // TODO: Fix data structure or use localization
  const label = type.replace('scan', '').replace('Zbozi', 'Zboží');
  return `
    <div class="row align-items-center">
      <div class="col">
        <label for="type-${type}">${label}</label>
      </div>
      <div class="col-2 d-flex justify-content-end align-items-center">
        <label class="pure-material-switch">
          <input
            id="type-${type}"
            type="checkbox"
            name="${type}"
            ${when(checked, 'checked')}
          />
          <span></span>
        </label>
      </div>
    </div>
  `;
};

export const domain_preference = (
  { urlBase, closeContentBox, disableExtension, newIndex },
  index = ''
) => `
  <div class="row align-items-center" data-url-base="${urlBase}">
    <div class="col-3">
      <label class="mb-0 domain_preference__address">
        <input type="hidden" name="blacklistedDomains[${newIndex || index || 0}][urlBase]" value="${urlBase}"/>
        <span title="${urlBase}">${urlBase}</span>
      </label>
    </div>
    <div class="col-4">
      <label class="mb-0 pure-material-checkbox">
        <input
          type="checkbox"
          name="blacklistedDomains[${newIndex || index || 0}][closeContentBox]"
          ${when(closeContentBox, 'checked')}
        />
        <span>${l('hide-popup')}</span>
      </label>
    </div>
    <div class="col-4">
      <label class="mb-0 pure-material-checkbox">
        <input
          type="checkbox"
          name="blacklistedDomains[${newIndex || index || 0}][disableExtension]"
          ${when(disableExtension, 'checked')}
        />
        <span>${l('disable-extension')}</span>
      </label>
    </div>
    <div class="col-1">
      <button
        class="domain_preference__remove-button"
        title="${l('remove')}"
        type="button"
        data-click-action="blacklist-remove-domain"
        data-click-payload="${urlBase}"
      >
        ${icon('remove', 20)}
      </button>
    </div>
  </div>
`;

export const options_toast = ({ success = false, failure = false } = {}) => {
  if (success) {
    return `
      <div class="alert alert-success" role="alert" data-autohide="1600">
        ${success}
      </div>
    `;
  }
  if (failure) {
    return `
      <div class="alert alert-danger" role="alert" data-autohide="1600">
        ${failure}
      </div>
    `;
  }
  return '';
};

export const popup_disabled = () => `
  <div class="popup-content popup-content--disabled">
    <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 .469C6.975.469.469 6.975.469 15S6.975 29.531 15 29.531 29.531 23.025 29.531 15 23.025.469 15 .469zm7.623 6.907c3.835 3.835 4.102 9.697 1.212 13.807L8.817 6.165c4.113-2.892 9.974-2.621 13.806 1.211zM7.377 22.623C3.542 18.79 3.275 12.928 6.165 8.818l15.018 15.018c-4.113 2.892-9.974 2.621-13.807-1.212z" fill="#9D9D9D"/></svg>
    <h3>${l('popup-extension-disabled-header')}</h3>
    <p>${md(l('popup-extension-disabled-text'))}</p>
  </div>
`;

export const popup_content = ({ shop, reward, sales } = {}) => {
  const similarSales = sales.filter((x) => x.isSimilar);
  const shopSales = sales.filter((x) => !x.isSimilar);
  const hasItems = sales.length > 0;
  return `
    ${shop_rewards[shop.rewardType]({ shop, reward }, 'popup')}
    <div class="popup-content__coupons">
      ${when(
        !hasItems,
        `<div class="sales-item sales-item--popup sales-item--header">${l(
          'no-sale-items'
        )}</div>`
      )}
      ${shopSales.map(sales_item('popup', reward)).join('\n')}
      ${when(similarSales.length, similar_items_header('popup'))}
      ${similarSales
        .map(sales_item('popup', { coupons: false }))
        .join('\n')}
    </div>
  `;
};

export const sales_types = {
  coupon: ({ redirectUrl, code }) =>
    `<a class="coupon"
        href="${redirectUrl}"
        data-sticker-text="${l('coupon-get-code')}"
        data-sticker-done="${l('coupon-copied')}"
      >${code}</a>`,
  // sale: ({redirectUrl}) => `<a class="sale" href="${redirectUrl}">${l('sale-get-sale')}</a>`
};

export const banner = (i, url, imageUrl, name) => `
  <figure class="box-banners__banner" id="box-banner-${i}">
    <a href="${url}"><img src="${imageUrl}" alt="Tipli Banner" width="316" height="178"></a>
    <figcaption><a href="${url}">${name}</a></figcaption>
    <div class="box-banners__snapper"></div>
  </figure>
`;

const banner_navigation_item = (i) => `
  <li class="box-banners__navigation-item">
    <a class="box-banners__navigation-button"
       href="#box-banner-${i}"
      >${l('go-to-slide')} ${i}</a>
  </li>
`;

export const box_banners = (banners) => !banners.length ? '' : `
  <div class="box-banners">
    <div class="box-banners__viewport">
      ${banners
        .map(({ name, url, imageUrl }, i) => banner(i, url, imageUrl, name))
        .join('\n')}
    </div>
    <aside class="box-banners__navigation">
      <ol class="box-banners__navigation-list">
        ${banners.map((_, i) => banner_navigation_item(i)).join('\n')}
      </ol>
    </aside>
  </div>
`;

export const popup_search = ({ banners, shops, query }) => `
  <div class="popup-search"
    data-search-query="${when(query, encodeURIComponent(query))}">
    <div class="popup-search__banner">
      ${box_banners(banners)}
    </div>
    ${iif(
      shops.length,
      `<div class="popup-search__shops">${shops.map(shop_card).join('\n')}</div>`,
      `<div class="popup-search__no-results"><p>${l('no-search-results')}</p></div>`
    )}
  </div>
`;

export const shop_cashback = ({ reward, rewardSuffix }) => `
  <span class="shop-cashback">
    <span class="shop-cashback__reward">${md(reward)}</span><br />
    <span class="shop-cashback__suffix">${rewardSuffix}</span>
  </span>
`;

export const shop_card = ({
  name,
  logoUrl,
  redirectUrl,
  reward,
  rewardSuffix,
}) => `
  <a class="shop-card" href="${redirectUrl}" title="${name}">
    <div class="shop-card__image">
      <img src="${logoUrl}" alt="${name}">
    </div>
    <div class="shop-card__content">
      <h3 class="shop-card__title" title="${name}">${name}</h3>
      ${shop_cashback({ reward, rewardSuffix })}
    </div>
  </a>
`;
