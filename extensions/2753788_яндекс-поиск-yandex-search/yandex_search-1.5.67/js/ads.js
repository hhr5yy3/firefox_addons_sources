// @ts-check

(function() {

  const DEBUG = false;


  if (DEBUG) console.log("ads.js");

  let ua = window.navigator.userAgent.toLowerCase();
  if (DEBUG) console.log("ua = ", ua);  
  if (ua.indexOf("linux") > -1) ua = "linux";

  let host = document.location.hostname;
  if (DEBUG) console.log("host", host);

  if (
    (host == "yandex.com")
    || (ua == "linux")
    ) 
  {
    sessionStorage.setItem("goodly-ad-block", "true");
    if (DEBUG) console.log("write >>> goodly-ad-block = true");
  } else {
    sessionStorage.setItem("goodly-ad-block", "false");
    if (DEBUG) console.log("write >>> goodly-ad-block = false");
  }


function main_function()
{


// Callback function to execute when mutations are observed
var callback = function (mutationsList, observer)  {

  mutationsList.forEach((mutation) => {
      
    if (DEBUG) console.log('Тип изменения: ' + mutation.type + '; Измененный элемент: ' + mutation.target);

      let str = '';
      let pos = -1;
    
      if (mutation.type === "childList") {

        mutation.addedNodes.forEach((node) => {

          // отслеживаю только узлы-элементы, другие (текстовые) пропускаю
          if (!(node instanceof HTMLElement)) return;

          if (node instanceof HTMLAnchorElement) {

            if (DEBUG) node.style.border = "10px solid yellow";

            str = unescape(decodeURI(node.getAttribute('href')));

          if (DEBUG) console.log('ADDED SOURCE === ', node.nodeType + ' ; ' + str);        



          if (
          ((str.startsWith('//')) && !(str.startsWith("//yandex.ru/images/")))
          || (str.startsWith('https://yabs.yandex.ru/'))
          || (str.startsWith('/products/search/')) 
          || (str.startsWith('/products/search?')) 
          || (str.startsWith('https://yandex.ru/products/'))
          || (str.startsWith('https://yandex.ru/products?'))
          || ((str.startsWith('https://yandex.ru/search/')) && !(str.startsWith("https://yandex.ru/search/?"))) // исключая ненайденные слова, у к-рых https://yandex.ru/search/?text=....
          || (str.startsWith('https://yandex.ru/an/count/'))
          /*
          || (str.startsWith('/search/')) 
          || (str.startsWith('/search?')) 
          */
          ) {

          observer.disconnect();


          if (DEBUG) node.style.border = "10px solid blue";
          if (DEBUG) console.log('*** AD *** ===== ', str);   
          
          let levels = 50;
          let parent = node;
          let article = false;
          for (let i = 0; i < levels; i++) {
            if (DEBUG) parent.setAttribute('level', String(i));

            if (parent.tagName == "ARTICLE") article = true;

              if (
              
              (parent.classList.contains('entity-search__ecom-offers'))  /* Предложения в Комбо справа */
              || ((parent.tagName == 'LI') /*&& (parent.parent.id="search-result")*/)           /* Основные карточки ИЗМЕНЕНО ПОД НОВУЮ ВЕРСИЮ САЙТА */
              || (parent.classList.contains('serp-item'))                /* Основная карусель, если не карточка, т.к. поднимаясь сначала встречу карточку, а у карусели её нет */
              ) { 
                parent.setAttribute('parent', 'this');
                parent.classList.add('goodly-ads-target');
                parent.setAttribute('goodly-ads-article', String(article));
                parent.setAttribute('goodly-ads-href', str);
                if (DEBUG) parent.style.border = "10px solid pink";
                if (str.startsWith('//')) node.setAttribute('href', "https:" + str);
                break;
              };
              if (parent != null) { parent = parent.parentElement; }
              if (parent instanceof HTMLBodyElement) { break; }
          };
            
          observer.observe(targetNode, config);
        }
      }

      
       
      

      });
    }
      
      


    })
  
  };
  
// Select the node that will be observed for mutations
var targetNode = document;

// Options for the observer (which mutations to observe)
var config =  { attributeFilter: ["href"], attributeOldValue: true,/* attributes: true,*/ childList: true, subtree: true };

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
// @ts-ignore
observer.observe(targetNode, config);


}



main_function();

}());