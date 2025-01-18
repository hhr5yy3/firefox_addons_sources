const cmsPatterns = {
  "Amiro CMS": [
    "/amiro_sys_css.php?",
    "/amiro_sys_js.php?",
    "-= Amiro.CMS © =-",
    "Работает на Amiro.CMS",
  ],
  Bitrix: ["/bitrix/templates/", "/bitrix/js/", "/bitrix/admin/"],
  "Celena System": [
    "/app/tpl/system/js/celena.js",
    "/app/tpl/system/js",
    "/app/tpl/system/css",
  ],
  "Concrete CMS": ["/concrete/js/", "concrete5 - 5.", "/concrete/css/"],
  Contao: ["This website is powered by Contao Open Source CMS", "tl_files"],
  "CMS Made Simple": ["Released under the GPL - http://cmsmadesimple"],
  "CMS.S3": ["megacounter_key"],
  Craftum: [
    '<meta name="generator" content="Craftum CMS">',
    "<meta name='generator' content='Craftum CMS'>",
    "https://cdn.craftum.com/css/",
  ],
  "Danneo CMS": ["Danneo Русская CMS", 'content="CMS Danneo'],
  "DataLife Engine": [
    "DataLife Engine",
    "/engine/",
    "index.php?do=lostpassword",
    "/engine/ajax/dle_ajax.js",
    "/engine/opensearch.php",
    "/index.php?do=feedback",
    "/index.php?do=rules",
    "/?do=lastcomments",
  ],
  Drupal: [
    "Drupal.settings",
    "misc/drupal.js",
    "drupal_alter_by_ref",
    "/sites/default/files/css/css_",
    "/sites/all/files/css/css_",
  ],
  Ektron: [
    "EktronClientManager",
    "Ektron.PBSettings",
    "ektron.modal.css",
    "Ektron/Ektron.WebForms.js",
    "EktronSiteDataJS",
    "/Workarea/java/ektron.js",
    "Amend the paths to reflect the ektron system",
  ],
  HostCMS: ["/hostcmsfiles/"],
  InSales: [
    "InSales.formatMoney",
    ".html(InSales.formatMoney",
    "Insales.money_format",
  ],
  InstantCMS: ["InstantCMS"],
  "Joomla!": [
    "/css/template_css.css",
    "Joomla! 1.5 - Open Source Content Management",
    "/templates/system/css/system.css",
    "Joomla! - the dynamic portal engine and content management system",
    "/templates/system/css/system.css",
    "/media/system/js/caption.js",
    "/templates/system/css/general.css",
  ],
  Kentico: [
    "CMSListMenuLI",
    "CMSListMenuUL",
    "Lvl2CMSListMenuLI",
    "/CMSPages/GetResource.ashx",
  ],
  LiveStreet: ["LIVESTREET_SECURITY_KEY"],
  Magento: ["cms-index-index"],
  "MaxSite CMS": [
    "/application/maxsite/shared/",
    "/application/maxsite/templates/",
    "/application/maxsite/common/",
    "/application/maxsite/plugins/",
  ],
  MODx: [
    "/assets/styles.css",
    "/assets/templates/",
    "/assets/css/lightbox.css",
    "/assets/styles.css",
    "assets/templates/design/",
    "assets/images/",
    "/assets/components",
  ],
  NetCat: ["/netcat_template/", "/netcat_files/"],
  "OpenCart (ocStore)": [
    "catalog/view/theme/default/stylesheet/stylesheet.css",
    "index.php?route=account/account",
    "index.php?route=account/login",
    "index.php?route=account/simpleregister",
  ],
  phpBB: ["phpBB style name:", "The phpBB Group"],
  PrestaShop: [
    "/themes/PRS",
    "/themes/prestashop/cache/",
    "/themes/prestashop/",
    'meta name="generator" content="PrestaShop"',
  ],
  "Simpla CMS": [
    "design/default/css/main.css",
    "design/default/images/favicon.ico",
    "tooltip='section' section_id=",
  ],
  Shopify: [
    "Shopify.theme",
    "Shopify.routes",
    "/shopifycloud/shopify/",
    "shopify-section",
  ],
  TextPattern: ["/textpattern/index.php"],
  Tilda: ["static.tildacdn.com", "typo3temp/"],
  "TYPO 3": ["This website is powered by TYPO3", "typo3temp/"],
  uCoz: [
    "cms-index-index",
    "U1BFOOTER1Z",
    "U1DRIGHTER1Z",
    "U1CLEFTER1",
    "U1AHEADER1Z",
    "U1TRAKA1Z",
  ],
  "UMI CMS": [
    "umi:element-id=",
    "umi:field-name=",
    "umi:method=",
    "umi:module=",
  ],
  vBulletin: [
    "vbulletin_css",
    "vbulletin_important.css",
    "clientscript/vbulletin_read_marker.js",
    "Powered by vBulletin",
    "Main vBulletin Javascript Initialization",
  ],
  WebAsyst: [
    "/published/SC/",
    "/published/publicdata/",
    "aux_page=",
    "auxpages_navigation",
    "auxpage_",
    "?show_aux_page=",
  ],
  Weebly: [
    "Weebly.Commerce = Weebly.Commerce",
    "Weebly.setup_rpc",
    "editmysite.com/js/site/main.js",
    "editmysite.com/css/sites.css",
    "editmysite.com/editor/libraries",
    "?show_aux_page=",
  ],
  Wix: [
    "X-Wix-Published-Version",
    "X-Wix-Renderer-Server",
    "X-Wix-Meta-Site-Id",
  ],
  WordPress: ["/wp-includes/", "/wp-content/", "/wp-admin/", "/wp-login/"],
};

const cmsLinks = {
  "Amiro CMS": ["amiro.ru"],
  Bitrix: ["1c-bitrix.ru"],
  "Celena System": ["celena.io"],
  "Concrete CMS": ["concrete5russia.ru"],
  Contao: ["contao.org"],
  "CMS Made Simple": ["cmsmadesimple.ru"],
  "CMS.S3": ["cms-megagroup.ru"],
  "Craftum": ["craftum.com"],
  "Danneo CMS": ["danneo.ru"],
  "DataLife Engine": ["dle-news.ru"],
  Drupal: ["drupal.org"],
  Ektron: ["episerver.com/cms/"],
  HostCMS: ["hostcms.ru"],
  InSales: ["insales.ru"],
  InstantCMS: ["instantcms.ru"],
  "Joomla!": ["joomla.org"],
  Kentico: ["kentico.com"],
  LiveStreet: ["livestreet.ru"],
  Magento: ["magento.com"],
  "MaxSite CMS": ["max-3000.com"],
  MODx: ["modx.ru"],
  NetCat: ["netcat.ru"],
  "OpenCart (ocStore)": ["opencart.com"],
  phpBB: ["phpbb.com"],
  PrestaShop: ["prestashop.com"],
  "Simpla CMS": ["simplacms.ru"],
  Shopify: ["shopify.com"],
  TextPattern: ["textpattern.ru"],
  Tilda: ["tilda.cc"],
  "TYPO 3": ["typo3.ru"],
  uCoz: ["ucoz.ru"],
  "UMI CMS": ["umi-cms.ru"],
  vBulletin: ["vbulletin.com"],
  WebAsyst: ["webasyst.ru"],
  Weebly: ["weebly.com"],
  Wix: ["wix.com"],
  WordPress: ["wordpress.org"],
};

/**
 * @param {string} html
 */
async function findCMS(html) {
  const patternKeys = Object.keys(cmsPatterns);

  for (const key of patternKeys) {
    let found = false;
    cmsPatterns[key]?.forEach((pattern) => {
      if (html.includes(pattern)) {
        found = true;
      }
    });
    if (found) {
      return { title: key, link: `https://${cmsLinks[key]}` };
    }
  }

  return null;
}
