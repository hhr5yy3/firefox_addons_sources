(function() {
  chrome.storage.local.get({
    background: {}
  }, storage => {
    const imageUrl = storage.background.imageUrl || './img/main-bg.jpg';
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = imageUrl;
    document.head.appendChild(preload);

    const style = document.createElement('style');
    style.classList.add('instant-image');
    style.textContent = '.user-background-image{background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + imageUrl + ')}';
    document.head.appendChild(style);
  });
})();