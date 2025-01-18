'use strict';

function insert (node) {
  let items = Array.from(node.querySelectorAll('.soundActions'));
  if (items.length === 0) {
    items = Array.from(document.querySelectorAll('.soundActions'));
  }

  items.filter(i => i && i.dataset.isdready !== 'true' && i.querySelector('.sc-button-download') === null)
  .forEach(item => {
    let group = item.querySelector('.sc-button-group');
    if (group) {
      // only element type that works on list without item get played on click event
      let button = document.createElement('a');
      let cls = (function () {
        let button = group.querySelector('.sc-button-like');
        if (button) {
          return Array.from(button.classList)
            .filter(c => c !== 'sc-button-responsive')
            .concat('isdownloader-button').join(' ');
        }
        else {
          return 'sc-button sc-button-small sc-button-download isdownloader-button';
        }
      })();
      button.setAttribute('class', cls);
      button.setAttribute('title', 'Prepare Download');
      button.textContent = 'Prepare';
      button.dataset.cmd = 'prepare';
      group.appendChild(button);
      item.dataset.isdready = true;
    }
  });
}

function observe (elem) {
  let cname = elem.className;

  if (!(/(CANVAS|DIV|LI)/.test(elem.tagName))) {
    return;
  }
  if (cname) {
    if (/(g\-box\-full|soundList__item|trackList|soundBadgeList__item)/i.test(cname)) {
      insert(elem);
    }
  }
}

// create an observer instance
var observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => Array.from(mutation.addedNodes).forEach(node => observe(node)));
});

document.addEventListener('DOMContentLoaded', () => observer.observe(document.body, {
  attributes: false,
  childList: true,
  subtree: true,
  characterData: false
}));
