let vol_label = document.getElementById('vol_label');
let vol_range = document.getElementById('vol_range');
let reset_btn = document.getElementById('reset');

const update_ui = () => {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { id: 2 }, (response) => {
      if (response) {
        localStorage.setItem(
          'tabsVolList',
          JSON.stringify([[tabs[0].id, response]])
        );
      } else {
        localStorage.setItem('tabsVolList', JSON.stringify([[tabs[0].id, 1]]));
      }

      let saved_tabs = localStorage.getItem('tabsVolList');

      console.log(saved_tabs);

      if (saved_tabs) {
        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          JSON.parse(saved_tabs).forEach((tab) => {
            if (tab[0] == tabs[0].id) {
              vol_label.innerHTML = '' + (Number(tab[1]) * 100).toFixed() + '%';
              vol_range.value = tab[1];
              return;
            }
          });
        });
      }
    });
  });
};

update_ui();

const set_tabs_volumes = (tabId, vol) => {
  console.log(vol);
  let tabs = localStorage.getItem('tabsVolList');

  console.log(tabs);

  if (tabs) {
    tabs = JSON.parse(tabs);
    let changed = false;
    tabs.forEach((tab) => {
      if (tab[0] == tabId) {
        tab[1] = vol;
        changed = true;
        localStorage.setItem('tabsVolList', JSON.stringify(tabs));
      }
    });

    if (!changed) {
      tabs.push([tabId, vol]);
      localStorage.setItem('tabsVolList', JSON.stringify(tabs));
    }
    return;
  }

  localStorage.setItem('tabsVolList', JSON.stringify([[tabId, vol]]));
};

function changeVolume(volume) {
  vol_label.innerHTML = '' + (Number(volume) * 100).toFixed() + '%';

  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(
      tabs[0].id,
      { id: 1, message: volume },
      (response) => {
        if (response == 'ok') {
          set_tabs_volumes(tabs[0].id, volume);
          update_ui();
        }
      }
    );
  });
}

function main() {
  vol_range.addEventListener(
    'change',
    () => changeVolume(vol_range.value),
    false
  );

  reset_btn.addEventListener('click', () => changeVolume(1));

  const rate = document.getElementById('rate');
  rate.addEventListener('click', function () {
    window.open('https://volumebooster.io', '_blank');
  });
}

main();
