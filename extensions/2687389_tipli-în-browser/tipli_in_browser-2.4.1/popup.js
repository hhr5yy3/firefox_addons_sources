import { getActiveTabOfCurrentWindow, sendBackgroundMessage } from './library.js';
import { renderContent } from './render.js';
import { MessageTypes } from './types.js';
import { debounce } from './vendor/throttle-debounce.js';
import {
  dispatchStickerClick,
  handleConditionsMoreTextClick,
  handleStickerClick,
  TipliEvents,
} from './eventHandlers.js';
import { initLocalization } from './resources.js';


(async () => {
  // Let the background known user just opened popups
  await sendBackgroundMessage(MessageTypes.POPUP_BOX_OPEN)

  // Request and render basic layout data
  sendBackgroundMessage(MessageTypes.BASIC_DATA_REQUEST).catch(console.error)
  const { payload: { user, preferences, tipliLinks } } = await sendBackgroundMessage(MessageTypes.BASIC_DATA_REQUEST);
  const tab = await getActiveTabOfCurrentWindow();

  const renderOptions = { locale: preferences.locale };

  renderContent(
    {
      contentType: 'popup_header',
      contentData: { user, preferences, tab, tipliLinks },
      appearance: { selector: 'header' },
    },
    renderOptions
  );

  renderContent(
    {
      contentType: 'popup_footer',
      contentData: { preferences, tab },
      appearance: { selector: 'footer' },
    },
    renderOptions
  );

  // Request and render page-relevant content data
  const { payload: contents } = await sendBackgroundMessage(MessageTypes.CONTENTS_REQUEST);
  contents.forEach(content => renderContent(content, renderOptions));

  // Make links able to open links in current tab
  handleRedirectionLinks(tab, window.close);

  // Make tab navigation
  handleTabNavigation();

  // Handle active coupons
  handleSalesItems();

  handleConditionsMoreText()

  handleCarousel();

  // Listen to search input change
  const renderSearch = async (search) => {
    // Re-render content on search query
    const { payload: contents } = await sendBackgroundMessage(MessageTypes.CONTENTS_REQUEST, { search });
    contents.forEach(content => renderContent(content, renderOptions));
  }
  handleSearch(renderSearch, preferences);
})();

function handleCarousel() {
  const banners = document.querySelector('.box-banners');
  if (!banners) return;
  const nav = banners.querySelector('.box-banners__navigation-list');
  const navItems = Array.from(
    nav.querySelectorAll('.box-banners__navigation-button')
  );
  let activeIndex = 0;
  function changeActiveNavItem() {
    for (let item of navItems) item.classList.remove('active');
    navItems[activeIndex].classList.add('active');
  }
  banners.addEventListener('animationiteration', (e) => {
    if (e.animationName !== 'tostart') return;
    activeIndex++;
    if (activeIndex === navItems.length) activeIndex = 0;
    changeActiveNavItem();
  });
  nav.addEventListener('click', (e) => {
    const { hash } = e.target;
    activeIndex = parseInt(hash[hash.length - 1]);
    changeActiveNavItem();
  });
  changeActiveNavItem();
}

function handleConditionsMoreText() {
  // listen for clicks on more text link in conditions text element
  for (let link of document.querySelectorAll(
    '.sales-item__shop-conditions-text-more'
  )) {
    link.addEventListener('click', handleConditionsMoreTextClick(link));
  }
}

function handleSalesItems() {
  // listen for custom event from child sticker with coupon code in event detail
  for (let item of document.querySelectorAll('.sales-item')) {
    item.addEventListener(TipliEvents.STICKER_CLICK, handleStickerClick(item));
  }
  // listen for clicks on active coupons, stops navigation to link and dispatches coupon code in custom event to parent
  for (let sticker of document.querySelectorAll(
    '.sales-item--activated .sales-item__sticker'
  )) {
    sticker.addEventListener('click', dispatchStickerClick(sticker));
  }
}

function handleRedirectionLinks(currentTab, callback) {
  // listen for clicks on external links, active coupons will not end up here, they are handled in sales items
  document.addEventListener('click', event => {
    const { target, href } = event.target;
    if (target !== '_blank' && href && href.startsWith('http')) {
      event.preventDefault();
      browser.tabs.update(currentTab.id, { url: href }, callback);
    }
  });
}

function handleTabNavigation() {
  const box = document.querySelector('.popup-box');
  let containers = Array.from(box.querySelectorAll('section article'));
  let tabLinks = Array.from(box.querySelectorAll('nav a'));

  const removeActiveClass = (element) => {
    if (element) element.classList.remove('active');
  };
  const addActiveClass = (element) => {
    if (element) element.classList.add('active');
  };
  const tabLinkToRouteName = (element) => {
    const [, route] = element.href.split('#');
    return route;
  };
  const addBoxRouteModifier = (route) => {
    const modifiers = Array.from(box.classList.values()).filter(
      (x) => x.indexOf('--') > -1
    );
    box.classList.remove(...modifiers);
    box.classList.add(`popup-box--${route}`);
  };

  // Remove not rendered containers and tab links
  containers.forEach((container) => {
    if (container.innerHTML) return;
    // No content, 👇
    container.remove(); // .. no container
    containers = containers.filter((x) => x !== container);

    const tabToRemove = tabLinks.find(
      (link) => container.id === tabLinkToRouteName(link)
    );
    tabLinks = tabLinks.filter((x) => x !== tabToRemove);
    tabToRemove.remove();
    // and no tab link 👆
  });

  // Mark very first container and tab link as active one
  addActiveClass(containers[0]);
  addActiveClass(tabLinks[0]);
  addBoxRouteModifier(tabLinkToRouteName(tabLinks[0]));

  // Handle click to navigation events
  tabLinks.forEach((linkElement) => {
    const route = tabLinkToRouteName(linkElement);
    if (!route) return; // ignore real links

    // listen to tab activation
    linkElement.addEventListener('click', () => {
      tabLinks.forEach(removeActiveClass);
      addActiveClass(linkElement);
      containers.forEach(removeActiveClass);
      addActiveClass(containers.find(({ id }) => route === id));
      addBoxRouteModifier(route);
    });
  });
}

function handleSearch(changeCallback, { locale }) {
  const searchInputElement = document.querySelector('input[type="search"]');
  const handleChange = ({ target: { value } }) => { changeCallback(value); }

  searchInputElement.addEventListener('input', debounce(600, handleChange));
  searchInputElement.addEventListener('change', handleChange);

  // Localize search placeholder
  const l = initLocalization(locale);
  searchInputElement.setAttribute('placeholder', l('search-placeholder'));


  // Restore cached user input
  const query = decodeDataText('data-search-query');
  if (query) searchInputElement.setAttribute('value', query);
}

function decodeDataText(attrName) {
  const element = document.querySelector(`[${attrName}]`);
  if (!element) return null;
  const data = element.getAttribute(attrName);
  if (!data) return null;
  return decodeURIComponent(data) || '';
}
