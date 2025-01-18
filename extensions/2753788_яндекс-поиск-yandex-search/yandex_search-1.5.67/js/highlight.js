// @ts-check

(function() {

  const DEBUG = false;

  // Очистка от подсветки совпадений поисковых слов
  const boldRegEx = /(\<b\>)|(\<\/b\>)/gi;
  ///

  // подсветка сепараторов
  // Roboto Condenced кроме
  // - Spacing Modified Letters
  // - Combining Diacritical Marks
  // - Greek
  //   (General Puctuation, только кроме Prime засечек)
  const separatorRegEx = /[\"\(\)\/\\\[\]'‘’“”‛‟‹›«»←→⇐⇒◀▶◁▷◂▸◃▹◄►✓✔❛❜❝❞⟦⟧]/gi; 
  const separatorMinusRegEx = /\s[-‐‑‒–—―]{1,}\s/gi;
  const separatorColonRegEx = /\s{0,1}[:‣]{1,}\s/gi;
  const separatorVerticalRegEx = /\s{0,1}[\|‖｜]{1,}\s{0,1}/gi;
  const separatorDotRegEx = /\s{0,1}[•·○●・]{1,}\s{0,1}/gi;
  // подстветка кириллицы
  const markingRegEx = /([-‐‑‒–—―]{0,}|(,\s){0,}|(\.\s){0,}|(\?\s){0,})[а-яА-ЯёЁ]{1,}[а-яА-ЯёЁ-‐‑‒–—―\s\.,\!]{0,}\.{0,3}\?{0,1}\!{0,1}/gi; 
  // подсветка цифр
  const digitRegEx = /[0-9]{1,}([0-9\.,:]{0,}[0-9]{1,}){0,}/gi; 
  

function inject_selector(selector, sizeMax)
{


        for(let element of document.querySelectorAll(selector)) {
                  let text = "";

              let sp = element;
              let div = element.querySelector('div');
              if (div != null) sp = div;

                  text = sp.innerHTML;
                  sp.innerHTML = text.replace(boldRegEx, ""); 

                  text = sp.innerHTML;
                  sp.innerHTML = text.replace(separatorRegEx, (match) => {
                    return '<span class="separator">' + match + '</span>';
                  });                

                  text = sp.innerHTML;
                  sp.innerHTML = text.replace(separatorMinusRegEx, (match) => {
                    return '<span class="separator">' + ' ― ' + '</span>';
                  });                   

                  text = sp.innerHTML;
                  sp.innerHTML = text.replace(separatorColonRegEx, (match) => {
                    return '<span class="separator">' + ' ⁞ ' + '</span>';
                  });                   

                  text = sp.innerHTML;
                  sp.innerHTML = text.replace(separatorVerticalRegEx, (match) => {
                    return '<span class="separator">' + ' ‖ ' + '</span>';
                  });                   

                  text = sp.innerHTML;
                  sp.innerHTML = text.replace(markingRegEx, (match) => {
                    return '<span class="marking">' + match + '</span>';
                  });

                  text = sp.innerHTML;
                  sp.innerHTML = text.replace(digitRegEx, (match) => {
                    return '<span class="digit">' + match + '</span>';
                  });



              
            }// Конец подсветки            
          }


        
      

function inject_selector_list()
{
	//inject_selector('a', 32); // Test
	
	inject_selector('ul#search-result > li .OrganicTitle a.Link span', 48); // Основные карточки в ленте и рекламные блоки по 6 объявлений
	inject_selector('div.serp-item .OrganicTitle a.Link span', 48); // Рекламный горизонтальный блок в самом верху

	//inject_selector('div.serp-item article a.Link', 48); // Рекламная карусель вверху (главная похоже) - перенес в ads_start.js
    /*
	inject_selector('.RzdJxc a', 32);  // Вставка "Videos" в ленте
	inject_selector('g-section-with-header g-link a', 32); // Вставка Твиттер в ленте
	inject_selector('g-section-with-header .HCUNre a', 32); // Вставка Top Stories в ленте

	inject_selector('.DhN8Cf > a', 64); // Вставка видео
    */

}


function main_function()
{
    console.log('highlight.js');
	let search = document.querySelector('#search-result')
	if (search) {
		inject_selector_list();
	}
}


main_function();

}());