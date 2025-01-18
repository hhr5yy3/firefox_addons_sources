/* Общие функции */

// Копирование в буфер обмена
function copy2clipboard(containerid) {
	if(document.selection) {
		var range = document.body.createTextRange();
		range.moveToElementText(document.getElementById(containerid));
		range.select().createTextRange();
		document.execCommand("Copy"); 
	} else if(window.getSelection) {
		var range = document.createRange();
		range.selectNode(document.getElementById(containerid));
		window.getSelection().addRange(range);
		document.execCommand("Copy");
	}
}

// Online переключение раскладки
function to_rus(str_lat_err) {
	var lat_str = "Q-W-E-R-T-Y-U-I-O-P-A-S-D-F-G-H-J-K-L-Z-X-C-V-B-N-M";
	var rus_str = "Й-Ц-У-К-Е-Н-Г-Ш-Щ-З-Ф-Ы-В-А-П-Р-О-Л-Д-Я-Ч-С-М-И-Т-Ь";
	var lat_str_exp_1 = (lat_str + "-" + lat_str.toLowerCase()+"-:-\\^-~-`-\\{-\\[-\\}-\\]-\"-'-<-,->-\\.-;-\\?-\\/-&-@-#-\\$").split("-");
	var rus_str_exp_1 = (rus_str + "-" + rus_str.toLowerCase()+"-Ж-:-Ё-ё-Х-х-Ъ-ъ-Э-э-Б-б-Ю-ю-ж-,-.-?-\"-№-;").split("-");
	var lat_str_exp_1_len = lat_str_exp_1.length;
	for(i=0; i<lat_str_exp_1_len; i++) {
		str_lat_err = str_lat_err.replace(new RegExp(lat_str_exp_1[i], 'g'), rus_str_exp_1[i]);
	}
	return str_lat_err;
}
	
function to_lat(str_rus_err) {
	var lat_str = "Q-W-E-R-T-Y-U-I-O-P-A-S-D-F-G-H-J-K-L-Z-X-C-V-B-N-M";
	var rus_str = "Й-Ц-У-К-Е-Н-Г-Ш-Щ-З-Ф-Ы-В-А-П-Р-О-Л-Д-Я-Ч-С-М-И-Т-Ь";
	var lat_str_exp_2 = (lat_str + "-" + lat_str.toLowerCase()+"-^-:-$-@-&-~-`-{-[-}-]-\"-'-<->-;-?-\/-.-,-#").split("-");
	var rus_str_exp_2 = (rus_str + "-" + rus_str.toLowerCase()+"-:-Ж-;-\"-\\?-Ё-ё-Х-х-Ъ-ъ-Э-э-Б-Ю-ж-,-\\.-ю-б-№").split("-");
	rus_str_exp_2_len = rus_str_exp_2.length;
	for(i=0; i<rus_str_exp_2_len; i++) {
		str_rus_err = str_rus_err.replace(new RegExp(rus_str_exp_2[i], 'g'), lat_str_exp_2[i]);
	}
	return str_rus_err;
}