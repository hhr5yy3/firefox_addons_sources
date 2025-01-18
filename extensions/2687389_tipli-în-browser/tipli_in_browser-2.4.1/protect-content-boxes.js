
const MAX_INT = 2147483647;

function garantueNextSiblingsZIndex(max) {
  const boxes = document.querySelectorAll('[id^="tipli-content-"]');
  for (let box of boxes) {
    let sibling = box.nextElementSibling;
    while (sibling) {
      const z = parseInt(sibling.style.zIndex || '0');
      if (z >= max) {
        sibling.style.zIndex = max - 1;
        console.info('Tsc tc tss..', sibling);
      }
      sibling = sibling.nextElementSibling;
    }
  }
}

const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type !== 'childList') return;
    garantueNextSiblingsZIndex(MAX_INT);
  }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, { childList: true });

// const EXPIRE_PROTECTION_IN = 60 * 1000;
// setTimeout(() => { observer.disconnect() }, EXPIRE_PROTECTION_IN)