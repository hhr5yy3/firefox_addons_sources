// САМО-тур online бронирование

var OPERATOR_NAME = "Планета Travel";
var OPERATOR_SLETAT_ID = 31;

function extractBoardType(tds) {
	var board = colText(tds, [/питание/, /meal/, /харчування/]);
	if ( !board ) {
		board = tds[4].textContent; // в поисковике http://online.plantravel.ru/search_tour нет названия у колонки с питанием
	}
	return trim(board);
}
