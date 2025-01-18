'use strict';

const view = {};
for (let e of document.querySelectorAll('[data-ctl]'))
  view[e.dataset.ctl] = e;

function bookmark() {
  browser.permissions.request({permissions:['bookmarks']}).then((res) => {
    if (!res) return;

    view.progress.textContent = '';
    view.completed.textContent = '';
    view.bookmark.disabled = true;
    const folder = 'Tab Sidebar ' + (new Date()).toLocaleString();
    view.message.textContent = 'Bookmarking to "' + folder + '"...';

    Promise.all([
      browser.bookmarks.create({title: folder}),
      browser.windows.getAll({populate: true})
    ]).then((values) => {
      const item = values[0];
      const windows = values[1];
      let n = 0;
      let ntabs = 0;
      for (let w of windows)
        ntabs += w.tabs.length;
      windows.reverse();
      for (let w of windows) {
        browser.bookmarks.create({
          parentId: item.id,
          index: 0,
          title: 'window ' + w.id,
        }).then((item) => {
          w.tabs.reverse();
          for (let tab of w.tabs) {
            browser.bookmarks.create({
              parentId: item.id,
              index: 0,
              title: tab.title,
              url: tab.url
            }).then(() => {
              n++;
              view.progress.textContent = 'Processing tabs: ' + n + '/' + ntabs;
              if (n === ntabs) {
                view.completed.textContent = 'Completed.'
                view.bookmark.disabled = false;
              }
            });
          }
        });
      }
    });
  });
}

function savecss() {
  browser.storage.local.set({css: view.css.value.trim()});
  view.savecss.disabled = true;
}

window.onbeforeunload = () => {
  browser.permissions.remove({permissions:['bookmarks']});
  return null;
};

view.bookmark.addEventListener('click', bookmark);

view.savecss.disabled = true;
if (!browser.commands.update) {
  view.key_activate_markertab.disabled = true;
  view.key_activate_markertab.parentNode.classList.add('disabled');
}

browser.storage.local.get(null).then((res) => {
  view.wheel_activate.checked = res.wheel_activate || false;
  view.wheel_activate.addEventListener('change',
      (ev) => browser.storage.local.set({wheel_activate: ev.target.checked})
  );

  view.key_activate_markertab.checked = res.key_activate_markertab || false;
  view.key_activate_markertab.addEventListener('change',
      (ev) => browser.storage.local.set({key_activate_markertab: ev.target.checked})
  );

  view.theme_default.checked = res.theme === 'default' || !res.theme;
  view.theme_default.addEventListener('change',
      (ev) => ev.target.checked && browser.storage.local.set({theme: 'default'})
  );

  view.theme_dark.checked = res.theme === 'dark';
  view.theme_dark.addEventListener('change',
      (ev) => ev.target.checked && browser.storage.local.set({theme: 'dark'})
  );

  view.css.value = res.css || '';
  view.css.addEventListener('input', () => { view.savecss.disabled = false; });
  view.savecss.addEventListener('click', savecss);
});
