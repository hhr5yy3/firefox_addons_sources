const currentUrl = window.location.href;
url = new URL(currentUrl);
domain = url.hostname;
if (domain == 'oauth.vk.com') {
let hash = window.location.hash.substring(1);
let div = document.createElement('div');
div.innerHTML = "<center><div class='vkauth'><a href='https://new.savee.ru/set_token.php?" + hash + "'>Авторизоваться через ВК</a></div><p>Нажимая на кнопку, Вы принимаете <a href='https://savee.ru/privacy-policy' target='_blank'>политику конфиденциальности</a> <b>savee.ru</b></p></center>";
document.body.append(div);
}