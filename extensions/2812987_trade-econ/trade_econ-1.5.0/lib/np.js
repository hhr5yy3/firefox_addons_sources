const widgetIcon = $id('widgetIcon');
const widgetWindow = $id('widgetWindow');

const searchAndLogo = $id('searchAndLogoDiv');

const background = $id('content');

DISPLAY = {
  block: 'block',
  none: 'none',
};

background.addEventListener('click', e => {
  e.stopPropagation();

  widgetWindow.classList.add('fade');
  searchAndLogo.classList.remove('searchAndLogoDivAnim');

})

widgetIcon.addEventListener('click', e => {
  e.stopPropagation();

  widgetWindow.classList.toggle('fade');
  searchAndLogo.classList.toggle('searchAndLogoDivAnim');

});

// Searchbox
document
  .querySelector(".searchbox [type='reset']")
  .addEventListener('click', () =>
    this.parentNode.querySelector('input').focus()
  );

const searchBox = $id('searchBox');

searchBox.addEventListener('click', e => e.stopPropagation());


