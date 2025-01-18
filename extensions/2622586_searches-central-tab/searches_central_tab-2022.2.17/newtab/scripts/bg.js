let html = document.querySelector('html');
let bgNumber = Math.floor(Math.random() * 11 + 1);
html.style.backgroundImage = `url(images/backgrounds/${bgNumber}.jpg)`;
html.style.backgroundSize = 'cover';
html.style.backgroundRepeat = 'no repeat';