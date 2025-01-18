// Система подбра туров "Megatec Мастер-WEB"

window.OPERATOR_NAME = "НЕВСКИЕ СЕЗОНЫ";
window.MIN_COLS_COUNT = 9;
window.showTopHotelsRating = true;

function extractHotelUrl(tds) {
   const tr = tds[0][0].closest('tr');
   return getNodeProperty(tr.querySelector('a[id$="hlSpo"]'), null, 'href');
}
