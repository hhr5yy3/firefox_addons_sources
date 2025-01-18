var activeWindow = -1;
var translation_result = "";
var count = "";
var fuente = fuente = "";
var nork = nork = "";
var parentWindow = null;
var contentTabId;
var aLiterals = {};
var numResult = 0;



var navigatorLanguage = navigator.language.split("-")[0];
var properties = "/properties/properties_eu.inc";
/*if (navigatorLanguage == "eu" || navigatorLanguage == "es" || navigatorLanguage == "fr" || navigatorLanguage == "en" || navigatorLanguage == "de") {
	properties = "/properties/properties_" + navigatorLanguage + ".inc";
} else {
	properties = "/properties/properties_eu.inc";
}*/

$.getJSON(properties, function (data) {
	var items = [];
	$.each(data, function (key, val) {
		aLiterals[key] = val;
	});


	

	//Create contextMenus
	//Traductor
	chrome.contextMenus.create({
		title: aLiterals.lit_Translate,
		contexts:["all"],
		onclick: function(info, tab) {
			
			chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
				parentWindow = tabs[0].id;
				chrome.tabs.executeScript(tabs[0].id, { code: `document.getElementsByTagName("html")[0].getAttribute("lang");` }, (result) => {
				
					let resul = result+"";
					resul = resul.split("-")[0];

					if (resul == 'eu' || resul == 'es' || resul == 'fr' || resul == 'en' || resul == 'de'){
						
						if(resul == "eu"){
							resul += "2es";
						}
						else{
							resul += "2eu";
						}
						chrome.tabs.executeScript(tabs[0].id, { code: `sessionStorage.setItem("ac65a_languagesItzuli", "`+resul+`");` }); 
	
					}
					
				});
			});
	
			//Open extension
			OpenTranslate();
	
		}
	});  
	

	
});



//click in the extension icon
chrome.browserAction.onClicked.addListener(function(tab) {
    openToolbar();
});



function openToolbar(){	

	chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
		
		chrome.tabs.executeScript(tabs[0].id, { code: `if(!$('#itzuliToolbar').length){createToolbar();}else{destroyToolbar();}`  });

	});
	/*var chkToolbar = localStorage.getItem('ac65a_toolbar');
	if (!chkToolbar) {  
		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			if (tabs[0].url.indexOf("chrome://extensions") == -1 && tabs[0].url.indexOf("chrome-extension") == -1 && tabs[0].url.indexOf("moz-extension") == -1){
				
				chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
					chrome.tabs.executeScript(tabs[0].id, { code: `createToolbar(); `  });
					
				});
				
			} 
		});
	}
	else{

		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			chrome.tabs.executeScript(tabs[0].id, { code: `destroyToolbar(); `  });
			localStorage.removeItem('ac65a_toolbar');
		});
	}*/
	  
}

function OpenDictionary(){	

	chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
		chrome.tabs.executeScript(tabs[0].id, { code: `if(!$('#itzuliToolbar').length){createToolbar("Diccionario");}`}, (result) => {

			chrome.tabs.executeScript(tabs[0].id, { code: `createDictionary();` }); 

		});
	  
	});

}

function OpenTranslate(){	

	chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
		chrome.tabs.executeScript(tabs[0].id, { code: `createToolbar();`}, (result) => {

			//chrome.tabs.executeScript(tabs[0].id, { code: `createTranslate(); `  });
			
		});
	  
	});

}






chrome.windows.onFocusChanged.addListener(function(window) {
    if (window != activeWindow && activeWindow != -1) {
	   try{
		 chrome.windows.remove(activeWindow);
	   } catch{}
	}
});

chrome.runtime.onConnect.addListener(function (port) {
  
    port.onMessage.addListener(function (msg) {
        if (port.name == "trdcr") {
            port.postMessage({ res: msg.traducir, lang: msg.idioma });
        }
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
		
		if (request.action == "literals") {
			aLiterals=request.literals;
		}

		var word = request.word;
		var language = request.language;
			
		if (request.action == "audio") {
			
			var audio_input_tool = undefined
			
			//replace doble mark
			word = word.replace(/\u2014/g, ",");
			
			var data = new FormData();
			data.append('testua', word);
			data.append('hizkuntza', language);
			data.append('gender', "F");
			data.append('speed', "100");
			data.append('response', "mp3");
			data.append('wrd', "false");
			data.append('withid', "0");

			var xhr = new XMLHttpRequest();
			xhr.responseType = 'arraybuffer';
			xhr.addEventListener("readystatechange", function() {
				if(this.readyState === 4) {

					var base64 = btoa(
						new Uint8Array(this.response)
						  .reduce((data, byte) => data + String.fromCharCode(byte), '')
					);

					var data = {
						data: base64,
						contentType: 'arraybuffer'
					};
					
					
					sendResponse({data: JSON.stringify(data)});
				}
			});
			
			xhr.open("POST", "https://api.euskadi.eus/tts/ahots_sintesia/ahots_sintesia_entzun/");
			xhr.send(data);
		}

		if (request.action == "new_proverb") {
			$.when(get_new_proverb()).done(function(){
				sendResponse ({textoeuskera: translation_result, fuente: fuente, nork: nork});
			});
		}

		if (request.action == "dictionary") {
			$.when(loadDictionary(word, language)).done(function(){
				sendResponse ({dataDictionary: translation_result});
			});
		}

		if (request.action == "euskaltermLemas") {
			let page = request.page;
			$.when(loadEuskaltermLemas(word, language, page)).done(function(){
				sendResponse ({euskaltermLemas: translation_result, numResult: numResult});
			});
		}

	
		if (request.action == "euskalterm") {
			let idFicha = request.idFicha;
			$.when(loadEuskalterm(idFicha, language)).done(function(){
				sendResponse ({euskalterm: translation_result});
			});
		}
		if (request.action == "loadLemas") {
			$.when(loadLemas(word, language)).done(function(){
				sendResponse ({lemas: translation_result, count: count});
			});
		}

		if (request.action == "translation") {
			$.when(doTranslate(word, language)).done(function(){
				sendResponse ({data: translation_result});
			});
		}

		if (request.action == "wikipedia") {
			$.when(wikipedia(word, language)).done(function(){
				sendResponse ({data: translation_result, count: count});
			});
		}

		if (request.action == "showDetail_wikipedia") {
			$.when(showDetail_wikipedia(word)).done(function(){
				sendResponse ({data: translation_result, count: count});
			});
		}
		
		if (request.action == "definition") {
			$.when(getDefinition(word)).done(function(){
				sendResponse ({data: translation_result});
			});
		}

		if (request.action == "loadDefinitionLemas") {
			$.when(loadDefinitionLemas(word)).done(function(){
				sendResponse ({data: translation_result, count: count});
			});
		}

		if (request.action == "synonyms") {
			$.when(getSynonyms(word)).done(function(){
				sendResponse ({data: translation_result});
			});
		}

		if (request.action == "normalizacion") {
			var tipoVoz = request.tipoVoz;
			var text = request.text;
			$.when(getNormalizacion(tipoVoz, text)).done(function(){
				sendResponse ({data: translation_result});
			});

		}

		if (request.action == "sintesis") {
			var tipoVoz = request.tipoVoz;
			var text = request.text;
			getSintesis(tipoVoz, text, sendResponse);
		}


		if (request.action == "transcripcion") {
			var tipoVoz = request.tipoVoz;
			var text = request.text;
			getTranscripcion(tipoVoz, text, sendResponse);
		}

		if (request.action == "destroytoolbar") {
			localStorage.removeItem('ac65a_toolbar');
		}

		return true;
    }
);




function loadEuskaltermLemas(word, language, page) {
	var dfd = $.Deferred();	

	var send = { language: language, orria: page, parametroak: word+"/non-has/hizk-"+language+"/ter-on" };
	
	fetch("https://www.euskadi.eus/ac36aEuskaltermWar/publiko/bilaketaBarra?R01HNoPortal=true", {
		method: 'POST',
		headers: {"extension" : chrome.runtime.id }, 
		body: JSON.stringify(send),
		cache: 'no-cache'
	})
	.then(function(res){ return res.json(); })
	.then(function(response){
		var result = response;  
	
		if (result == undefined || result.fitxaZerrenda.length == 0) {
			translation_result = "";
			numResult = "0";
		} else {	
			translation_result = result.fitxaZerrenda;
			numResult = result.guztira;

		}
		
		dfd.resolve();
	})
	.catch(function(error) {
		console.log(error);
	});

	return dfd.promise();


}

function loadEuskalterm(idFicha) {
	var dfd = $.Deferred();	

	fetch("https://www.euskadi.eus/ac36aEuskaltermWar/publiko/erakutsiFitxaZerrendan/" + idFicha, {
		method: 'GET',
		headers: {"extension" : chrome.runtime.id, "version" : aLiterals.version }, 
		cache: 'no-cache'
	})
	.then(function(res){ return res.json(); })
	.then(function(response){
		var result = "";

		if (response != undefined) {
			result = response;
		}
		
		if (result.length == 0) {
			translation_result = "";

		} else {
			translation_result = result;

		}
		
		dfd.resolve();

	})
	.catch(function(error) {
		console.log(error);
	});


	return dfd.promise();


}



/*
 * Load dictionary content for the selected word
 */
function loadDictionary(word, translation) {
	
    var methodname = "";
	var originlang = translation.split("2")[0];
	var destinylang = translation.split("2")[1];
	
	var dfd = $.Deferred();	
	
	if (originlang == "es" || destinylang == "es"){
		methodname = "getSpanishTranslation";
	} else if (originlang == "en" || destinylang == "en"){
		methodname = "getEnglishTranslation";
	} else if (originlang == "de" || destinylang == "de"){
		methodname = "getGermanTranslation";
	}
	
	var send = { "word": word, "originlang": originlang, "destinylang": destinylang };

	if (methodname!=""){
		fetch("https://itzuli.api.euskadi.eus/ac65aDictionaryWar/DictionaryWS/" + methodname, {
			method: "POST", 
			body: JSON.stringify(send),
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json; charset=utf-8' 
			}
		})
		.then(response => response.text())
		.then(function(response){
			var result = "";
			result = response.replace(/"/g, '');

			if (result.length == 0) {
				translation_result = "";
			} else {
				translation_result = result;
			}
			
			dfd.resolve();
		})
		.catch(function(error) {
			console.log(error);
		});
	}
	
	return dfd.promise();
}



function loadLemas(word, translation) {

	var dfd = $.Deferred();	
	var methodname = "";
	var originlang = translation.split("2")[0];
	var destinylang = translation.split("2")[1];
		
	if (originlang == "es" || destinylang == "es"){
		methodname = "getSpanishListWord";
	} else if (originlang == "en" || destinylang == "en"){
		methodname = "";
	} else if (originlang == "de" || destinylang == "de"){
		methodname = "getGermanListWord";
	}

	var send = { word: word, originlang: originlang, destinylang: destinylang };

	if (methodname!=""){
		fetch("https://itzuli.api.euskadi.eus/ac65aDictionaryWar/DictionaryWS/" + methodname, {
			method: "POST",
			headers: {"extension" : chrome.runtime.id },
			body: JSON.stringify(send),
			contentType: "application/json; charset=utf-8",
			cache: 'no-cache'
		})
		.then(function(res){ return res.json(); })
		.then(function(response){
			var result = response;  
			result = result.replace(/"/g, '');

			if (result != ""){
				var cont = (result.match(/list-group-item/g) || []).length;

				translation_result =  result;
				count = cont;

		
			}
			else{
				translation_result = "";
			}

			dfd.resolve();

		})
		.catch(function(error) {
			console.log(error);
		});
	}


	return dfd.promise();


}



/*
 * Translation request
 */
let masterkey = "";
let user_key = "";
let model_send = "generic_es2eu";
let host = "";
let model_send_elhuyar = "";
let model_send_euskalterm = "";
let result_elhuyarEs = "";
let result_elhuyarEu = "";


function doTranslate(word, language) {
	
	var dfd = $.Deferred();	
	setTranslationValues(language);
		

	var send = { mkey: masterkey, text: word, model: model_send };
	fetch("https://" + host + "/v2/translate", {
		method: 'POST',
		headers: {"extension" : chrome.runtime.id, "version" : aLiterals.version }, 
		body: JSON.stringify(send),
		cache: 'no-cache'
	})
	.then(function(res){ return res.json(); })
	.then(function(data){

		if (data != undefined && data != '' && data["errorCode"] == 0) {

			if (data["translation"] != null){
				translation_result = data["translation"];
			} else {
				stranslation_result = "";
			}	

			dfd.resolve();

		} else if (data != undefined && data != '' && data["errorCode"] != 0){
		
		}	
			
	})
	.catch(function(error) {
		console.log(error);
	});
	
  	return dfd.promise();
}

// Throw an error
function throw_error() {
  $("#status").val("Error");
}


/*
 * Set Values
 */
function setTranslationValues(language) {
	result_elhuyarEs = "La palabra que has consultado no"
	result_elhuyarEu = "Bilatu duzun hitza ez da hiztegian agertzen."
	masterkey = "8d9016025eb0a44215c7f69c2e10861d"

	if(language == "es2eu"){
		model_send = "generic_es2eu"
		model_send_elhuyar = "G"
		model_send_euskalterm = "es2eu"
		host = "api.euskadi.eus/itzuli/es2eu"
	} else if(language == "eu2es"){
		model_send = "generic_eu2es"
		model_send_elhuyar = "E"
		model_send_euskalterm = "eu2es"
		host = "api.euskadi.eus/itzuli/eu2es"
	} else if(language == "eu2fr"){
		model_send = "generic_eu2fr"
		model_send_elhuyar = ""
		model_send_euskalterm = "eu2fr"
		host = "api.euskadi.eus/itzuli/eu2fr"
	} else if(language == "fr2eu"){
		model_send = "generic_fr2eu"
		model_send_elhuyar = ""
		model_send_euskalterm = "fr2eu"
		host = "api.euskadi.eus/itzuli/fr2eu"
	} else if(language == "en2eu"){
		model_send = "generic_en2eu"
		model_send_elhuyar = ""
		model_send_euskalterm = "en2eu"
		host = "api.euskadi.eus/itzuli/en2eu"
	} else if(language == "eu2en"){
		model_send = "generic_eu2en"
		model_send_elhuyar = ""
		model_send_euskalterm = "eu2en"
		host = "api.euskadi.eus/itzuli/eu2en"
	} 
}



function wikipedia(word, language){

	var dfd = $.Deferred();	

	//Find the list of results that matches title with the selected word
	fetch("https://eu.wikipedia.org/w/api.php?action=query&list=search&srnamespace=0&format=json&srlimit=500&origin=*&srprop=sectiontitle&srsearch=intitle:" + word, {
		method: "GET",
		cache: 'no-cache'
	})
	.then(function(res){ return res.json(); })
	.then(function(data){

		if (data.query.search.length > 0){
			if (data.query.search.length == 1){
				showDetail_wikipedia(data.query.search[0].title);
			} else {
				let arr = data.query.search;
				translation_result = arr;
				count = data.query.search.length;

			}
		} else {
			translation_result = "<p class='noResults'>" + aLiterals.lit_noResults + "</p>";
			count = undefined;
		}
		dfd.resolve();

	})
	.catch(function(error) {
		console.log(error);
	});


	return dfd.promise();

}



function showDetail_wikipedia(text){

	var dfd = $.Deferred();	

	
	fetch( "https://eu.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exintro&format=json&titles=" + text, {
		method: "GET",
		cache: 'no-cache'
	})
	.then(function(res){ return res.json(); })
	.then(function(data){

		translation_result = data;

		dfd.resolve();
		
	})
	.catch(function(error) {
		console.log(error);
	});

	return dfd.promise();

}




function getDefinition(word){
	
	var dfd = $.Deferred();	
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Basic ZWotaXR6dWxpcGx1czpZNldQWnk4QXNuVXFvOQ==");
	
	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};
	
	//Primero lematizar
	fetch("https://itzuli.api.euskadi.eus/ac65aDefinitionWar/DefinitionWS/getLematizacion", {
		method: "POST",		 
		headers: {"extension" : chrome.runtime.id }, 
		body: JSON.stringify({word: word, originlang: "eu" }),
		cache: 'no-cache'
	})
	.then(function(res){ return res.text(); })
	.then(function(data){

		let wordLema = data.replace(/"/g, '');

		if(wordLema.trim() != ""){
			word = wordLema;
		}

		//Buscar Definicion
		fetch("https://www.euskaltzaindia.eus/api/public/v2/eh/search/"+ word, requestOptions)
		.then(function(res){ return res.json(); })
		.then(function(data){
			var result = data.docs;
			if(result.length > 0){

				let html = "";
				if(result.length > 1){
					for(let i=0; i<result.length; i++){
						html += result[i].html;
					}
				}
				else{
					html = result[0].html;
				}

				translation_result = html;
			}  
			else{
				translation_result = "<p class='noResults'>" + aLiterals.lit_noResults + "</p>";
			}
	
			dfd.resolve();
		})
		.catch(error => console.log('error', error));

	})
	.catch(function(error) {
		console.log(error);
	});

	return dfd.promise();

}



function getSynonyms(word){

	var dfd = $.Deferred();	

	fetch("https://itzuli.api.euskadi.eus/ac65aSynonymsWar/SynonymsWS/getSynonyms", {
		method: "POST",		  
		headers: {
			"extension" : chrome.runtime.id
		}, 
		body: JSON.stringify({forma: word}),
		cache: 'no-cache'
	})
	.then(function(res){ return res.text(); })
	.then(function(data){
		var result = data;  
		result = result.replace(/"/g, '');
		if (result != "" && result != " "){
			translation_result = result;

		}
		else{
			translation_result = "<p class='noResults'>" + aLiterals.lit_noResults + "</p>";
		
		}
		dfd.resolve();
	})
	.catch(function(error) {
		console.log(error);
	});


	return dfd.promise();

}




function loadDefinitionLemas(word) {

	var dfd = $.Deferred();	
	
	fetch( "https://itzuli.api.euskadi.eus/ac65aDefinitionWar/DefinitionWS/getDefinitionLema?word=" + word,{
		method: "POST",		  
		headers: {"extension" : chrome.runtime.id }, 
		//body: JSON.stringify({word: word}),
		cache: 'no-cache'
	})
	.then(function(res){ return res.json(); })
	.then(function(data){
		var result = data;  

		if (result != ""){
			let cont = (result.match(/list-group-item/g) || []).length;
			translation_result = result;
			count = cont;

		}
		else{
			translation_result = "";
			count = "0";
		}

		dfd.resolve();

	})
	.catch(function(error) {
		console.log(error);
		translation_result = "";
		count = "0";
		dfd.resolve();
	});
	

	return dfd.promise();


}



function get_new_proverb(){

	var dfd = $.Deferred();	

	fetch("https://itzuli.api.euskadi.eus/ac65aEsaerakZaharrakWar/EsaerakZaharrakWS/getEsaeraZaharra",{
		method: "POST",		
		headers: {"extension" : chrome.runtime.id }, 
		cache: 'no-cache'
	})
	.then(function(res){ return res.json(); })
	.then(function(response){

		if (response != ""){

			translation_result = response.textoeuskera;
			fuente = response.fuente;
			nork = response.nork;

		}
		else{
			translation_result = "" ;

		}
		
		dfd.resolve();
	})
	.catch(function(error) {
		console.log(error);
	});

	return dfd.promise();

}



function getNormalizacion(tipoVoz, text){

	var dfd = $.Deferred();	

	fetch("https://api.euskadi.eus/itzuli/commander/do", {
		method: "POST",	
		headers: {"extension" : chrome.runtime.id, "version" : aLiterals.version, "Content-Type": "application/json" }, 
		body: JSON.stringify({"priority": 1, "pipeline": "vicomtts_" + tipoVoz + "_norm", "input": text }),
		cache: 'no-cache',

	})
	.then(function(res){ return res.text(); })
	.then(function(data){

		if (data != "" && data.length > 0){
				
			translation_result = data;
			
		}
		else{
			translation_result = "" ;

		}
		dfd.resolve();
	})
	.catch(function(error) {
		console.log(error);
	});


	return dfd.promise();
}



function getSintesis(tipoVoz, text, sendResponse){

	var dfd = $.Deferred();	

	fetch("https://api.euskadi.eus/itzuli/commander/do",{
		method: "POST",	
		headers: {"extension" : chrome.runtime.id, "version" : aLiterals.version, "Content-Type": "application/json" }, 
		body: JSON.stringify({"priority": 1, "pipeline": "vicomtts_" + tipoVoz, "input": text }),
		cache: 'no-cache',

	})
	.then(function(res){ return res.blob(); })
	.then(function(data){

		if (data != "" && data.size > 0){

			var reader = new FileReader();

			//Cargar el Blob
			reader.onload = function () {
				//Quitamos el prefijo
				let b64 = reader.result.replace(/^data:.+;base64,/, '');
				
				translation_result = b64 ;

				sendResponse ({data: translation_result});
			};
	
			// Leer
			reader.readAsDataURL(data);
			
		}
		else{
			translation_result = "" ;

		}
		dfd.resolve();
	})
	.catch(function(error) {
		console.log(error);
	});

	return dfd.promise();
}





function getTranscripcion(tipoVoz, b64, sendResponse){

	var dfd = $.Deferred();	

	var xhr;

	var url = "https://api.euskadi.eus/itzuli/commander/do";
	var json = '{"priority":1,"pipeline":"transkit-online_' + tipoVoz + '","input":"' + b64 + '"}';


	//console.log(json);
	if( xhr == null){
		xhr = new XMLHttpRequest();
	}

	xhr.open("POST", url, true);

	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("extension", chrome.runtime.id);
	xhr.setRequestHeader("version", aLiterals.version);

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if(xhr.status == 200){

				//Añadimos la respuesta al text_input
				if( xhr.responseText.substring(9, xhr.responseText.indexOf("\",\"")).trim() != "{}"){

					sendResponse ({data: xhr.responseText});
					dfd.resolve();
					return dfd.promise();
				}
				
			} else {
				//Error
				sendResponse ({data: "error"});
				dfd.resolve();
				return dfd.promise();

			}
			
			
		}
	};
	try{
		xhr.send(json);
	}
	catch(e){
		sendResponse ({data: "error"});
		dfd.resolve();
		return dfd.promise();
	}



}