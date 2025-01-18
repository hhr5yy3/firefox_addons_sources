var getActiveTab = chrome.tabs.query({active: true, currentWindow: true});

let savee = document.getElementById("get");
savee.addEventListener("click", async () => {
getActiveTab.then((tabs) => {
tabURL = tabs[0].url;
window.open('https://savee.ru/ext.php?url=' + tabURL);
});
});

const element = document.getElementById('vk_item_signup');
document.getElementById('vkbutton').addEventListener(
  'click', () => {
    element.style.display = (element.style.display) ? '' : 'none';
  }
);

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://savee.ru/vext.txt');
xhr.send();
xhr.onload = function() {
  if (xhr.status == 200) { 
    if (xhr.response != 1.1) {
      let upext = document.getElementById('upext');
      upext.innerHTML = "<div class='upext'><a href='https://addons.mozilla.org/ru/firefox/addon/savee-%D1%81%D0%BA%D0%B0%D1%87%D0%B0%D1%82%D1%8C-%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/' target='_blank'>ОБНОВИТЬ РАСШИРЕНИЕ</a></div>";
    }
  }
};

getActiveTab.then((tabs) => {
let url = new URL(tabs[0].url);
let domain = url.hostname;
if (domain == 'oauth.vk.com') {
  document.getElementById('vkbutton').style.display = "none";
  document.getElementById('down').style.display = "none";
  let vkauth = document.getElementById('vklogin');
  let hash = url.hash.substring(1);
  vkauth.innerHTML = "Последний штрих &darr;<br/><div class='vkauth'><a href='https://new.savee.ru/set_token.php?" + hash + "'>Авторизоваться через ВК</a></div><p>Нажимая на кнопку, Вы принимаете <a href='https://savee.ru/privacy-policy' target='_blank'>политику конфиденциальности</a> <b>savee.ru</b></p>";
}
});

