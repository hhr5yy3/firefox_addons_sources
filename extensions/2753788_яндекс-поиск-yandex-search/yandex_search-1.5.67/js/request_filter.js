// @ts-check

(function() {

	const DEBUG = false;

	if (DEBUG) console.log("request_filter.js");


// @ts-ignore
let c = getCountryCode();

if (DEBUG) console.log("c = ", c);

///////////////////////
let countryReplace = [
	// USSR
	["RU", "ru", ""                   , ""], // Russia
	["UA", "ru", ""                   , ""], // Ukraine

	["BY", "by", "&uil=be" + "&lr=149", ""], // Belarussia

	["KZ", "kz", "&uil=kk" + "&lr=159", ""], // Kazakhstan	
	
	["AM", "ru", "&uil=hy" + "&lr=168", ""], // Armenia
	["AZ", "ru", "&uil=az" + "&lr=167", ""], // Azerbaijan
	["EE", "ru", "&uil=et" + "&lr=179", ""], // Estonia
	["GE", "ru", "&uil=ka" + "&lr=169", ""], // Georgia
	["KG", "ru", "&uil=ky" + "&lr=207", ""], // Kyrgyzstan
	["LT", "ru", "&uil=lt" + "&lr=117", ""], // Lithuania
	["LV", "ru", "&uil=lv" + "&lr=206", ""], // Latvia
	["MD", "ru",             "&lr=208", ""], // Moldova
	["TJ", "ru", "&uil=tg" + "&lr=209", ""], // Tajikistan
	["TM", "ru",             "&lr=170", ""], // Turkmenistan
	["UZ", "ru", "&uil=uz" + "&lr=171", ""], // Uzbekistan

	// TURKEY
	["TR", "com.tr", "&uil=tr" + "&lr=983", "&lang=tr,en,de,fr"], // Turkey

	// EURO
	["DE", "com", "&uil=de" + "&lr=96", "&lang=tr,en,de,fr"], // Germany
	["FR", "com", "&uil=fr" + "&lr=124", "&lang=tr,en,de,fr"], // France

	// ENGLISH
	["US", "com", "&uil=en" + "&lr=84", "&lang=en"], // US
	["CA", "com", "&uil=en" + "&lr=95", "&lang=en"], // Canada

	["AU", "com", "&uil=en" + "&lr=138", "&lang=en"], // Australia and Oceania

	["GB", "com", "&uil=en" + "&lr=102", "&lang=en"], // UK

	// OTHER
	["CN", "com", "&uil=zh" + "&lr=134", "&lang=tr,en,de,fr"], // China
	["JP", "com", "&uil=ja" + "&lr=137", "&lang=tr,en,de,fr"], // Japan

]

// EURO
let d = "com";
let s = "&uil=en" + "&lr=111";
let l = "&lang=tr,en,de,fr";


for (var i = 0; i < countryReplace.length; i++) {
	if (c == countryReplace[i][0]) {
		d = countryReplace[i][1];
		s = countryReplace[i][2];
		l = countryReplace[i][3];
		break;
	};  
}



function filter(requestDetails) { 
    if (DEBUG) console.log({requestDetails});
    if (DEBUG) console.log("webRequest.onBeforeRequest");
    //return { cancel: true };

    let str = requestDetails.url;

	str = str.replace(/(?<=\/yandex\.)[a-z]+/gm, d) + s + l;
	//str = "https://example.com/" + "COUNTRY=" + c + "&DOMAIN=" + d + "&PARAMETERS=" + s;
	if (DEBUG) console.log("str = ", str);
	// @ts-ignore
    //return { redirectUrl: chrome.runtime.getURL(str) }; // старая версия работала chrome.runtime.getURL, новая почему-то уже без этого, сразу строку
    return { redirectUrl: str };
};


// @ts-ignore
chrome.webRequest.onBeforeRequest.addListener(
	filter,
  
  {urls: [                
	"https://yandex.eu/*"
	], 
	types: ["main_frame", "sub_frame"]},
  ["blocking"]
);


}());