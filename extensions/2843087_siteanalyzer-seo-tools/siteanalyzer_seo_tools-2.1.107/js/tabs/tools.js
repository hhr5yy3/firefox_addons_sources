const listOfTools = {};

function createToolLink(link) {
  const toolLink = document.createElement("a");
  toolLink.href = link.href;
  toolLink.innerHTML = link.title;
  toolLink.target = "_blank";
  toolLink.classList.add("tools-block__link");

  const toolIcon = document.createElement("img");
  const url = new URL(link.href);
  let host = url.host;
  const path = url.pathname;
  if (host === "site-analyzer.ru" && path === "/soft/position-meter/")
    host = "position-meter";
  if (host === "site-analyzer.ru" && path === "/articles/beget/")
    host = "beget";

  toolIcon.src = `/res/tools/${host}.png`;
  toolLink.prepend(toolIcon);

  return toolLink;
}

function renderToolsList() {
  const toolsContainer = document.querySelector("#tools-container");
  toolsContainer.innerHTML = "";

  api.storage.local.get("locale").then(({ locale }) => {
    const template = document.querySelector("template#tools-block");
    const localizedList = listOfTools[locale];
    localizedList.forEach((block) => {
      const toolsBlock = document.createElement("div");
      toolsBlock.innerHTML = template.innerHTML;
      toolsBlock.classList.add("tools-block");

      const title = toolsBlock.querySelector(".tools-block__title");
      title.setAttribute("data-translation", block.title);
      title.innerHTML = translate(block.title);

      const linksContainer = toolsBlock.querySelector(
        ".tools-block__links-container"
      );

      block.links.forEach((link) => {
        linksContainer.append(createToolLink(link));
      });

      toolsContainer.append(toolsBlock);
    });
  });
}

document.addEventListener("languageChanged", renderToolsList);

listOfTools["ru"] = [
  {
    title: "infoLinkExchanges",
    links: [
      { title: "SAPE", href: "https://sape.ru/r.609be23851.php" },
      { title: "GoGetLinks", href: "https://gogetlinks.net/?inv=my904t" },
      { title: "Miralinks", href: "https://miralinks.ru/from:234705" },
      { title: "Mainlink", href: "https://mainlink.ru/?partnerid=209152" },
      { title: "Форумок", href: "https://forumok.com/" },
    ],
  },
  {
    title: "infoConcurents",
    links: [
      { title: "Megaindex", href: "https://ru.megaindex.com/?from=2113" },
      { title: "Ahrefs", href: "https://ahrefs.com/" },
      { title: "SEMrush", href: "https://semrush.com/" },
      { title: "Majestic", href: "https://majestic.com/" },
      { title: "SimilarWeb", href: "https://similarweb.com/" },
    ],
  },
  {
    title: "infoWebmasters",
    links: [
      { title: "Яндекс Вебмастер", href: "https://webmaster.yandex.ru/" },
      {
        title: "Вебмастер Google",
        href: "https://search.google.com/search-console",
      },
      { title: "Bing Webmaster", href: "https://bing.com/toolbox/webmaster" },
      { title: "Яндекс Метрика", href: "https://metrika.yandex.ru/" },
      { title: "Google Analytics", href: "https://google.com/analytics/" },
    ],
  },
  {
    title: "infoKeywords",
    links: [
      { title: "Яндекс Вордстат", href: "https://wordstat.yandex.ru/" },
      {
        title: "Google Keyword Planner",
        href: "https://ads.google.com/intl/ru-RU/home/tools/keyword-planner/",
      },
      { title: "Букварикс", href: "https://bukvarix.com/" },
      { title: "Keys.so", href: "http://keys.so/ru/?p=15965" },
      { title: "Word Keeper", href: "https://word-keeper.ru/?r=413" },
      { title: "SpyWords", href: "https://spywords.ru/?partner=613074" },
    ],
  },
  {
    title: "infoSiteSpeed",
    links: [
      {
        title: "PageSpeed Insights",
        href: "https://developers.google.com/speed/pagespeed/insights/",
      },
      { title: "Gtmetrix", href: "https://gtmetrix.com/" },
      { title: "WebPagetest", href: "https://webpagetest.org/" },
    ],
  },
  {
    title: "infoSearchAPI",
    links: [
      { title: "XMLProxy", href: "https://xmlproxy.ru/?from=15489" },
      { title: "XMLRiver", href: "https://xmlriver.com/account/reg/?ref=287" },
      { title: "XMLStock", href: "https://xmlstock.com/?refid=9013" },
      { title: "SERPRiver", href: "https://serpriver.ru/" },
    ],
  },
  {
    title: "infoSitePos",
    links: [
      { title: "Топвизор", href: "https://topvisor.com/?inv=175283" },
      { title: "Megaindex", href: "https://ru.megaindex.com/?from=2113" },
      { title: "AllPositions", href: "http://allpositions.ru/redirect/58251" },
      {
        title: "PositionMeter",
        href: "https://site-analyzer.ru/soft/position-meter/",
      },
    ],
  },
  {
    title: "infoContent",
    links: [
      { title: "Главред", href: "https://glvrd.ru/" },
      {
        title: "Типограф Лебедева",
        href: "https://artlebedev.ru/tools/typograf/",
      },
      { title: "Тургенев", href: "https://turgenev.ashmanov.com/" },
    ],
  },
  {
    title: "hosting",
    links: [
      { title: "Beget", href: "https://site-analyzer.ru/articles/beget/" },
      { title: "Ruweb", href: "https://ruweb.net/?ref=144818" },
      { title: "Timeweb", href: "https://timeweb.com/ru/" },
      { title: "Reg.ru", href: "https://www.reg.ru/" },
    ],
  },
  {
    title: "infoOther",
    links: [
      { title: "ruCaptcha", href: "https://rucaptcha.com/" },
      { title: "Web Archive", href: "https://archive.org/web/web.php" },
      { title: "TEXT.RU", href: "https://text.ru/" },
      { title: "Google Trends", href: "https://trends.google.com/" },
      { title: "Validator W3", href: "https://validator.w3.org/" },
    ],
  },
];

listOfTools["en"] = [
  {
    title: "infoConcurents",
    links: [
      { title: "Ahrefs", href: "https://ahrefs.com/" },
      { title: "SEMrush", href: "https://semrush.com/" },
      { title: "Majestic", href: "https://majestic.com/" },
      { title: "SimilarWeb", href: "https://similarweb.com/" },
    ],
  },
  {
    title: "infoSiteSpeed",
    links: [
      {
        title: "PageSpeed Insights",
        href: "https://developers.google.com/speed/pagespeed/insights/",
      },
      { title: "Gtmetrix", href: "https://gtmetrix.com/" },
      { title: "WebPagetest", href: "https://webpagetest.org/" },
    ],
  },
  {
    title: "infoSearchAPI",
    links: [
      { title: "Zenserp", href: "https://zenserp.com/" },
      { title: "SerpApi", href: "https://serpapi.com/" },
      { title: "SERPHouse", href: "https://serphouse.com/" },
      { title: "Serpstack", href: "https://serpstack.com/" },
    ],
  },
  {
    title: "infoKeywords",
    links: [
      {
        title: "Google Keyword Planner",
        href: "https://ads.google.com/intl/en-EN/home/tools/keyword-planner/",
      },
      { title: "Ubersuggest", href: "https://neilpatel.com/ubersuggest/" },
      { title: "Keywords Everywhere", href: "https://keywordseverywhere.com/" },
      { title: "KWFinder", href: "https://kwfinder.com/" },
      { title: "Answer the Public", href: "https://answerthepublic.com/" },
      { title: "Also Asked", href: "https://alsoasked.com/" },
    ],
  },
  {
    title: "infoWebmasters",
    links: [
      {
        title: "Google Webmaster",
        href: "https://search.google.com/search-console",
      },
      { title: "Google Analytics", href: "https://google.com/analytics/" },
      { title: "Bing Webmaster", href: "https://bing.com/toolbox/webmaster" },
    ],
  },
  {
    title: "infoSitePos",
    links: [
      { title: "SERP Fox", href: "https://serpfox.com/" },
      { title: "Accuranker", href: "https://accuranker.com/" },
      { title: "Spyserp", href: "https://spyserp.com/" },
    ],
  },
  {
    title: "infoContent",
    links: [
      { title: "Clear Scope", href: "https://clearscope.io/" },
      { title: "Grammarly", href: "https://grammarly.com/" },
      { title: "Copywritely", href: "https://copywritely.com/" },
      { title: "Copyscape", href: "https://copyscape.com/" },
    ],
  },
  {
    title: "infoOther",
    links: [
      { title: "2captcha", href: "https://2captcha.com/" },
      { title: "Web Archive", href: "https://archive.org/web/web.php" },
      { title: "Google Trends", href: "https://trends.google.com/" },
      { title: "Validator W3", href: "https://validator.w3.org/" },
    ],
  },
];

listOfTools["es"] = listOfTools["en"];
listOfTools["uk"] = listOfTools["en"];
