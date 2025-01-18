var textSample = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rutrum posuere mi eu maximus. Cras commodo vestibulum odio. Donec viverra auctor ex, at porta lorem fermentum et. Morbi tempus, felis quis dapibus varius, eros tortor interdum metus, eu ultrices libero turpis a elit. Maecenas sit amet pharetra nibh, eu posuere massa. Nulla aliquam felis sed arcu commodo, ut sagittis erat consectetur. Ut sagittis, enim ac dignissim consequat, dui diam auctor lectus, nec aliquam ligula neque vitae lectus. Quisque accumsan aliquet tincidunt. Vivamus elementum, nisi et dignissim pretium, lectus nisl semper ante, sit amet luctus risus libero eget augue. Donec imperdiet, dui at elementum porttitor, dui elit vestibulum erat, vel consectetur neque arcu vel turpis. Ut dapibus, massa sed gravida facilisis, enim leo volutpat nisi, sed consequat risus felis et sem. Praesent felis nibh, tempus ut pulvinar euismod, malesuada quis urna. Nulla condimentum, orci sed condimentum sagittis, erat nulla porta est, vitae facilisis enim enim vitae enim. Proin sagittis sodales auctor. Phasellus malesuada sagittis turpis, nec elementum nulla. Integer ornare volutpat bibendum. Aliquam eleifend, turpis ut tincidunt eleifend, massa tellus laoreet ipsum, quis pulvinar sem urna eu massa. Vestibulum porttitor dui justo, id varius est mattis ac. Donec nec nunc augue. Curabitur malesuada neque nec cursus iaculis. Donec faucibus sem sit amet malesuada luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus dictum tellus a venenatis. Vivamus hendrerit accumsan libero sed pharetra. Suspendisse neque est, sagittis sit amet neque eget, ultrices luctus sem. Fusce vitae viverra ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Quisque non nisl consectetur, tincidunt urna a, dictum lectus. Cras blandit felis at ipsum ullamcorper, ut luctus magna sodales. Vivamus congue placerat arcu ut tincidunt. Phasellus tincidunt enim massa, in eleifend libero malesuada eu. Ut bibendum, lorem luctus mollis vulputate, elit neque blandit nibh, non sodales ex lectus luctus lectus. Sed nisi sem, pellentesque non vehicula et, consequat nec magna. Suspendisse interdum tempus pretium. Sed quis tellus maximus, consectetur leo placerat, rutrum nibh. Nam pretium enim vel scelerisque eleifend. Nulla viverra nulla id nisl faucibus accumsan. Nullam sed dolor a magna maximus sodales nec at dui. Proin ultrices nulla urna, eget congue neque aliquet euismod. Phasellus quis viverra justo. Fusce mollis aliquam mauris, vitae interdum sem condimentum ac. Aliquam efficitur nisl in diam placerat iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras efficitur sagittis massa, in sollicitudin nunc rutrum vitae. Sed maximus tempor lectus, ultrices aliquam purus convallis vitae. Integer eu vestibulum augue, ut vulputate nisi. Sed aliquam eget tortor venenatis consectetur. Donec vulputate tincidunt lorem vitae consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rutrum posuere mi eu maximus. Cras commodo vestibulum odio. Donec viverra auctor ex, at porta lorem fermentum et. Morbi tempus, felis quis dapibus varius, eros tortor interdum metus, eu ultrices libero turpis a elit. Maecenas sit amet pharetra nibh, eu posuere massa. Nulla aliquam felis sed arcu commodo, ut sagittis erat consectetur. Ut sagittis, enim ac dignissim consequat, dui diam auctor lectus, nec aliquam ligula neque vitae lectus. Quisque accumsan aliquet tincidunt. Vivamus elementum, nisi et dignissim pretium, lectus nisl semper ante, sit amet luctus risus libero eget augue. Donec imperdiet, dui at elementum porttitor, dui elit vestibulum erat, vel consectetur neque arcu vel turpis. Ut dapibus, massa sed gravida facilisis, enim leo volutpat nisi, sed consequat risus felis et sem. Praesent felis nibh, tempus ut pulvinar euismod, malesuada quis urna. Nulla condimentum, orci sed condimentum sagittis, erat nulla porta est, vitae facilisis enim enim vitae enim. Proin sagittis sodales auctor. Phasellus malesuada sagittis turpis, nec elementum nulla. Integer ornare volutpat bibendum. Aliquam eleifend, turpis ut tincidunt eleifend, massa tellus laoreet ipsum, quis pulvinar sem urna eu massa. Vestibulum porttitor dui justo, id varius est mattis ac. Donec nec nunc augue. Curabitur malesuada neque nec cursus iaculis. Donec faucibus sem sit amet malesuada luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus dictum tellus a venenatis. Vivamus hendrerit accumsan libero sed pharetra. Suspendisse neque est, sagittis sit amet neque eget, ultrices luctus sem. Fusce vitae viverra ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Quisque non nisl consectetur, tincidunt urna a, dictum lectus. Cras blandit felis at ipsum ullamcorper, ut luctus magna sodales. Vivamus connguel.";

var length = 5000;
var text1Length, text2Length, text3Length;

var gettingItem = chrome.storage.local.get(["text1Length", "text2Length", "text3Length"], function (result) {
	text1Length = result.text1Length ? result.text1Length : 100;
	text2Length = result.text2Length ? result.text2Length : 200;
	text3Length = result.text3Length ? result.text3Length : 300;
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes.text1Length) {
		text1Length = changes.text1Length.newValue;
	}
	if (changes.text2Length) {
		text2Length = changes.text2Length.newValue;
	}
	if (changes.text3Length) {
		text3Length = changes.text3Length.newValue;
	}
});

function textFirstGenerate() {
	return textSample.substring(0, text1Length);
}

function textSecondGenerate() {
	return textSample.substring(0, text2Length);
}

function textThirdGenerate() {
	return textSample.substring(0, text3Length);
} 