
var audio_input_tool = undefined;
var aLiterals = {};
var exist = true;
var mediaStreamSource;
var gumStream;
var segundosEnTotal = 5;
var definitionResult = true;
var peticionLanzada = false;
var glossaryArr = [];
var tabAnterior = "";

//Sintesis
var primerIntento = true;
var errorSintesia = false;
var posicionAudioArray = 0;
var reproducirAudio = false;


//Array de audios
var arrayDeLlamadas = [];
var audioArray = [];


//Normalización
var textoNormalizado = null;


function createToolbar(icon) {

	//Underline Colors
	let underlineBlue = "rgb(129 209 255)";
	let underlineYellow = "rgb(229, 255, 0)";
	let underlineGreen = "rgb(21, 255, 0)";
	let underlineRed = "rgb(255 127 127)";

	var divToolbar = document.getElementById("itzuliToolbar");

	if (divToolbar == null) {

		$.get(chrome.runtime.getURL('barra.html'), function (html_string) {

			var div = document.createElement("div");
			div.id = "itzuliToolbar";
			div.className = 'ui-widget-content mdc-top-app-bar';
			let html = html_string + "";
			html = html.replace("srcImageLogo", chrome.runtime.getURL("images/itzuli64.png"));

			div.innerHTML = html;

			let screenWidth = $(window).width();

			var st = div.style;
			st.top = "55px";
			if(screenWidth > 985){
				let left = (screenWidth - 985) / 2
				st.left = left + "px";
			}
			st.width = "985px";
			//st.color = "#1472a4;";
			st.position = "absolute";
			st.zIndex = "9999999";
			st.display = "inline-block";
			st.cursor = "context-menu";


			document.getElementsByTagName("body")[0].appendChild(div);


			$("#itzuliToolbar").draggable({ opacity: 0.5 });


			//Draggable only from icon
			//$("#itzuliToolbar").draggable({ handle: $("#icon"),opacity: 0.5 });
			


			//Proverbs
			$('#new_proverb').on('click', function () {
				new_proverb();
					
			});


			//Initialitate position of the toolbar
			var scrollTop = $(window).scrollTop();
			if (scrollTop == 0) {
				$("#itzuliToolbar").css({ "margin-top": "0px" });
			} else {
				$("#itzuliToolbar").css({ "margin-top": ($(window).scrollTop()) + "px" });
			}

			$(window).scroll(function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop == 0) {
					$("#itzuliToolbar").css({ "margin-top": "0px" });
				} else {
					$("#itzuliToolbar").css({ "margin-top": ($(window).scrollTop()) + "px" });
				}
			});

			$('#closeToolbar').on('click', function () {
				destroyToolbar();
			});


			$('#translate_tool').on('click', function () {
				
				if(reproducirAudio){
					posicionAudioArray--;
					if(audioArray[posicionAudioArray] != undefined){
						audioArray[posicionAudioArray].pause();
					}
					reproducirAudio = false;
				}
			
				createTranslate();

			});

			$('#dictionary_tool').on('click', function () {
				
				if(reproducirAudio){
					posicionAudioArray--;
					if(audioArray[posicionAudioArray] != undefined){
						audioArray[posicionAudioArray].pause();
					}
					reproducirAudio = false;
				}

				createDictionary();
			});

			$('#euskalterm_tool').on('click', function () {
				
				if(reproducirAudio){
					posicionAudioArray--;
					if(audioArray[posicionAudioArray] != undefined){
						audioArray[posicionAudioArray].pause();
					}
					reproducirAudio = false;
				}
				createEuskalterm();
			});

			$('#wikipedia_tool').on('click', function () {
				
				if(reproducirAudio){
					posicionAudioArray--;
					if(audioArray[posicionAudioArray] != undefined){
						audioArray[posicionAudioArray].pause();
					}
					reproducirAudio = false;
				}
				verTodosIdiomas();
				createWikipedia();	

			});

			$('#definition_tool').on('click', function () {
				
				if(reproducirAudio){
					posicionAudioArray--;
					if(audioArray[posicionAudioArray] != undefined){
						audioArray[posicionAudioArray].pause();
					}
					reproducirAudio = false;
				}
				verTodosIdiomas();
				createDefinition();	

			});

			$('#sinonimos_tool').on('click', function () {
				
				if(reproducirAudio){
					posicionAudioArray--;
					if(audioArray[posicionAudioArray] != undefined){
						audioArray[posicionAudioArray].pause();
					}
					reproducirAudio = false;
				}
				verTodosIdiomas();
				createSynonyms();	

			});

			$('#glosario_tool').on('click', function () {
				
				if(reproducirAudio){
					posicionAudioArray--;
					if(audioArray[posicionAudioArray] != undefined){
						audioArray[posicionAudioArray].pause();
					}
					reproducirAudio = false;
				}
				verTodosIdiomas();
				loadGlossary();	

			});
			

			$('#onlyText_tool').on('click', function () {
				
				if(reproducirAudio){
					posicionAudioArray--;
					if(audioArray[posicionAudioArray] != undefined){
						audioArray[posicionAudioArray].pause();
					}
					reproducirAudio = false;
				}
				verTodosIdiomas();
				onlyText();

			});

			
			$('#underline_blue').on('click', function () {
				underline(underlineBlue, "blue");
			});
			$('#underline_yellow').on('click', function () {
				underline(underlineYellow, "yellow");
			});
			$('#underline_green').on('click', function () {
				underline(underlineGreen, "green");
			});
			$('#underline_red').on('click', function () {
				underline(underlineRed, "red");
			});
			$('#underline_tool').on('click', function () {
				
				if(reproducirAudio){
					posicionAudioArray--;
					audioArray[posicionAudioArray].pause();
					reproducirAudio = false;
				}
				verTodosIdiomas();
				setCurrent("Resumen");
				viewUnderline();

			});


			$('#info_tool').on('click', function () {
				if(reproducirAudio){
					posicionAudioArray--;
					audioArray[posicionAudioArray].pause();
					reproducirAudio = false;
				}
				verTodosIdiomas();
				loadInfo();

			});


			$('#languagesToolbar').on('change', function () {

				let lang = $('#languagesToolbar').val();
				let originlang = lang.split("2")[0]
				let destlang = lang.split("2")[1];


				if(originlang == "de" || destlang == "de"){
					$("#translate_tool").attr("disabled","disabled");
					$('#translate_tool').attr('style', 'color: #a0a0a0 !important; cursor: context-menu;');
				}
				else{
					$("#translate_tool").removeAttr("disabled");
					$('#translate_tool').removeAttr('style');
				}

				if(originlang == "fr" || destlang == "fr"){
					$("#dictionary_tool").attr("disabled","disabled");
					$('#dictionary_tool').attr('style', 'color: #a0a0a0 !important; cursor: context-menu;');
				}
				else{
					$("#dictionary_tool").removeAttr("disabled");
					$('#dictionary_tool').removeAttr('style');
				}

				//Ocultar reproduccion audio segun idioma
				if(originlang != "eu" && originlang != "es"){
					//$("#play_input").hide();
					$("#recordAudio").hide();
				}
				else{
					$("#play_input").show();
					$("#recordAudio").show();
				}

				if(destlang != "eu" && destlang != "es"){
					//$("#play_output").hide();
				}
				else{
					$("#play_output").show();
				}

				//Mostrar distintas voces para euskera
				if(destlang != "eu"){
					$("#change_voice_outp").hide();
				}
				else{
					$("#change_voice_outp").show();
				}
				if(originlang != "eu"){
					$("#change_voice_inp").hide();
				}
				else{
					$("#change_voice_inp").show();
				}


			});
			
		
			loadInterfaceLiterals();
			new_proverb();

			setCurrent(icon);


			if(window.getSelection().toString().trim() != ""){
				createTranslate();
			}


		});

	}
	else{
		//destroyToolbar();
		if(window.getSelection().toString().trim() != ""){
			createTranslate();
		}
	}


}


function verTodosIdiomas(){
	$("#languagesToolbar option[data-lit='lit_eu_de'] ").show();
	$("#languagesToolbar option[data-lit='lit_de_eu']").show();
	$("#languagesToolbar option[data-lit='lit_eu_fr']").show();
	$("#languagesToolbar option[data-lit='lit_fr_eu']").show();

}


function ocultarIconosAudio(){

	let lang = $('#languagesToolbar').val();
	let originlang = lang.split("2")[0]
	let destlang = lang.split("2")[1];

	//Ocultar reproduccion audio segun idioma
	if(originlang != "eu" && originlang != "es"){
		//$("#play_input").hide();
		$("#recordAudio").hide();
	}
	else{
		$("#play_input").show();
		$("#recordAudio").show();
	}

	if(destlang != "eu" && destlang != "es"){
		//$("#play_output").hide();
	}
	else{
		$("#play_output").show();
	}

	//Mostrar distintas voces para euskera
	if(destlang != "eu"){
		$("#change_voice_outp").hide();
	}
	else{
		$("#change_voice_outp").show();
	}
	if(originlang != "eu"){
		$("#change_voice_inp").hide();
	}
	else{
		$("#change_voice_inp").show();
	}



}


function setCurrent(id){

	let svgArr = $("#itzuliToolbar path");

	for(let i=0; i<svgArr.length; i++){


		if(id=="Euskalterm"){
			$("#Euskalterm").attr("fill", "#2BB88B");
			$("#Euskalterm2").attr("fill", "#2BB88B");
			$("#Euskalterm3").attr('style', 'stroke: #2BB88B;');
			$("#Euskalterm").addClass("selectedButton");

			if(svgArr[i].id != ""){
				$("#" + svgArr[i].id).attr("fill", "#FFFFFF");
				$("#" + svgArr[i].id).removeClass("selectedButton");
			
			}
			
		}
		else{
			if(svgArr[i].id == id){

				$("#" + svgArr[i].id).attr("fill", "#2BB88B");
				$("#" + svgArr[i].id).addClass("selectedButton");
			}
			else{
				if(svgArr[i].id != ""){
					$("#" + svgArr[i].id).attr("fill", "#FFFFFF");
					$("#" + svgArr[i].id).removeClass("selectedButton");
					$("#Euskalterm3").removeAttr('style');
					$("#Euskalterm").removeClass("selectedButton");
				}
			
			}

		}


	}

}


function new_proverb(){

	chrome.runtime.sendMessage({ action: "new_proverb"}, function (response) {

		let textoeuskera = DOMPurify.sanitize(response.textoeuskera);
		let div = document.createElement("div");
		div.innerHTML =  textoeuskera;
		let textLenght = div.textContent.length;

		if(textLenght > 100){
			new_proverb();
		}
		else{
			$('#proverbText').html(textoeuskera);

			if( textoeuskera != null && textoeuskera.length > 107){
				$('#proverbText p').attr('style', 'padding-top: 0px !important;');
		
			}
			else{
				$('#proverbText p').removeAttr('style');
				
			}
			
			//$('#fuente').html(DOMPurify.sanitize(response.fuente));
			$('#nork').html(DOMPurify.sanitize(response.nork));
		}

	});


}




function createDictionary(word){

	if(!$('#content-dictionary').length){

		$.get(chrome.runtime.getURL('diccionario.html'), function (data) {

			if(!$('#itzuliToolbar2').length){
				createToolbar2();
			}
			setCurrent("Diccionario");
			let data_string = data.toString();
			data_string = data_string.replaceAll("lit_AddedGlossary", aLiterals.lit_AddedGlossary);
			data_string = data_string.replace("srcEuskalterm", chrome.runtime.getURL("images/euskalterm.png"));

			$('#itzuliToolbar2').html(data_string);
			$("#agregado").hide();

			$('#closeToolbar2').on('click', function () {
				destroyToolbar2();
			});

			chrome.storage.local.get(['fix'], function(result) {

				if(result.fix == "true"){
					$("#pinToolbar svg path").css("fill", "#a52424");
				}

			});

			$('#pinToolbar').on('click', function () {
				
				chrome.storage.local.get(['fix'], function(result) {
					if(result.fix != "true"){
						chrome.storage.local.set({"fix": "true" });
						$("#pinToolbar svg path").css("fill", "#a52424");
					}
					else{
						chrome.storage.local.set({"fix": "false" });
						$("#pinToolbar svg path").css("fill", "black");
					}

				});

			});

			$("#text_dictionary").on("input", function() {
				clearTimeout(window.debounceTimer);
				window.debounceTimer = setTimeout(function() {
					detectLanguage($('#text_dictionary').val());
				}, 1000);
			});


			$('#search_dictionary').on('focusin', function () {
				$("#Buscar-icon").attr("fill", "#2BB88B");
			});
			$('#search_dictionary').on('focusout', function () {
				$("#Buscar-icon").attr("fill", "#000000");
			});
			$('#search_dictionary').on('click', function () {

				if($('#text_dictionary').val()!=""){
					let lang = $('#languagesToolbar').val();
					dictionary(undefined,lang);
				}
			});
			

			$('#play_input').on('click', function () {
				reproducirAudio = true;
				contadorLlamadasSintesia = 0;
				let language = $("#languagesToolbar").val().split("2");
				let voiceEus = $("#change_voice_inp select").val();
				sintesia($("#text_dictionary").val(), language[0], "input",voiceEus);
			});

			$("#change_voice_inp select").change(function () {
				localStorage.setItem("localStorageVoice", $(this).val());
				
				let selected = $(this).find(":selected");
				$("#change_voice_inp select").find('option').css('font-weight', 'normal').text(function() {
					return $(this).text().replace(' \u2713', '');
				});
				
				selected.css({"font-weight": "bold"}).text(function() {
					return $(this).text() + ' \u2713';
				});

			});

			/*$('#play_output').on('click', function () {
				let text = document.getElementById('dictionary-translate').innerText;

				sintesia(text);

			});*/

			$('#recordAudio').on('click', function () {
				
				$("#recordAudio svg path").css("fill", "#2bb88b");
				inputID = "text_dictionary";
				segundosEnTotal = 5;
				transkripzioa();
			});

			$('#addToGlossary').on('focusin', function () {
				$("#Glosario-icon2").attr("fill", "#2BB88B");
			});
			$('#addToGlossary').on('focusout', function () {
				$("#Glosario-icon2").attr("fill", "#000000");
			});
			$('#addToGlossary').on('click', function () {

				let word = $('#text_dictionary').val().trim();
				if(word != "" &&  word.replaceAll(" ", "") != ""){
		
					saveInGlossary(word, $("#dictionary-translate").html(), false);
					$("#agregado").show();
					$("#agregado").addClass("agregado");

					$("#agregado").on("webkitAnimationEnd", function(){
						$("#agregado").css("display", "none");
					});

				}
				
			});
			
			$('#copy').on('focusin', function () {
				$("#Copiar-icon").attr("fill", "#2BB88B");
			});
			$('#copy').on('focusout', function () {
				$("#Copiar-icon").attr("fill", "#000000");
			});
			$('#copy').on('click', function () {
				window.getSelection()
				.selectAllChildren(
				  document.getElementById("dictionary-translate") 
				);
				document.execCommand("copy");
			});

			$('#download').on('focusin', function () {
				$("#Export").attr("fill", "#2BB88B");
			});
			$('#download').on('focusout', function () {
				$("#Export").attr("fill", "#000000");
			});
			$('#download').on('click', function () {
				generatePDF($("#dictionary-translate").html(), "dictionary");
			});

			$('#euskalterm').on('click', function () {
				let language = $("#languagesToolbar").val();
				createEuskalterm($('#text_dictionary').val(), language);
			});


			$("#itzuliToolbar2 ").draggable({ handle: $("#toolbarHeader"),opacity: 0.5 });

			ocultarIconosAudio();
			loadLiteals();

			chrome.storage.local.get(["historico"], (result) => {
				if (result.historico) {
					const localStorageHistoric = JSON.parse(result.historico);
					if (localStorageHistoric && localStorageHistoric.length > 0) {
						insertAccordion(localStorageHistoric);
					}
				}
			});
		});	

	}

	if((window.getSelection().toString().trim() != "") || (word != "")){
		dictionary(word, $("#languagesToolbar").val());
	}

}




function createEuskalterm(text, language){

	if(!$('#content-euskalterm').length){

		$.get(chrome.runtime.getURL('euskalterm.html'), function (data) {

			if(!$('#itzuliToolbar2').length){
				createToolbar2();
			}
			setCurrent("Euskalterm");
			let data_string = data.toString();
			data_string = data_string.replaceAll("lit_AddedGlossary", aLiterals.lit_AddedGlossary);
			data_string = data_string.replace("logo_euskalterm.png", chrome.runtime.getURL("images/logo_euskalterm.png"));
			$('#itzuliToolbar2').html(data_string);
			
			$("#agregado").hide();


			$('#play_input').on('click', function () {
				reproducirAudio = true;
				contadorLlamadasSintesia = 0;
				let language = $("#languagesToolbar").val().split("2");
				let voiceEus = $("#change_voice_inp select").val();
				sintesia($("#text_euskalterm").val(), language[0], "input", voiceEus);
			});

			$("#change_voice_inp select").change(function () {
				localStorage.setItem("localStorageVoice", $(this).val());
				
				let selected = $(this).find(":selected");
				$("#change_voice_inp select").find('option').css('font-weight', 'normal').text(function() {
					return $(this).text().replace(' \u2713', '');
				});
				
				selected.css({"font-weight": "bold"}).text(function() {
					return $(this).text() + ' \u2713';
				});

			});

			$("#text_euskalterm").on("input", function() {
				clearTimeout(window.debounceTimer);
				window.debounceTimer = setTimeout(function() {
					detectLanguage($('#text_euskalterm').val());
				}, 1000);
			});

			$('#recordAudio').on('click', function () {
				
				$("#recordAudio svg path").css("fill", "#2bb88b");
				inputID = "text_euskalterm";
				transkripzioa();
			});



			$('#closeToolbar2').on('click', function () {
				destroyToolbar2();
			});
			$('#search_euskalterm').on('focusin', function () {
				$("#Buscar-icon").attr("fill", "#2BB88B");
			});
			$('#search_euskalterm').on('focusout', function () {
				$("#Buscar-icon").attr("fill", "#000000");
			});
			$('#search_euskalterm').on('click', function () {
				euskaltermLemas();

			});


			$('#clean_euskalterm').on('focusin', function () {
				$("#Borrar-icon").attr("fill", "#2BB88B");
			});
			$('#clean_euskalterm').on('focusout', function () {
				$("#Borrar-icon").attr("fill", "#000000");
			});
			$('#clean_euskalterm').on('click', function () {
				$('#text_euskalterm').val("")
				$('#content_euskalterm').html("")
			});


			$('#addToGlossary').on('focusin', function () {
				$("#Glosario-icon2").attr("fill", "#2BB88B");
			});
			$('#addToGlossary').on('focusout', function () {
				$("#Glosario-icon2").attr("fill", "#000000");
			});
			$('#addToGlossary').on('click', function () {

				let word = $('#text_euskalterm').val().trim();

				let fichasAbiertas = $(".openFicha");
				if(fichasAbiertas.length > 0){
					for(let i=0;i<fichasAbiertas.length;i++){
						let clasif = $(fichasAbiertas[i]).find(".clasificacion");
						let clasifStr = clasif[0].textContent

						let ficha = $(fichasAbiertas[i]).find(".fitxa");

						saveInGlossary(word + " ("+clasifStr+")", ficha[0].innerHTML, false);
					}
				
					if(word != "" &&  word.replaceAll(" ", "") != ""){
			
						$("#agregado").show();
						$("#agregado").addClass("agregado");

						$("#agregado").on("webkitAnimationEnd", function(){
							$("#agregado").css("display", "none");
						});

					}
				}
			});


			$('#copy').on('focusin', function () {
				$("#Copiar-icon").attr("fill", "#2BB88B");
			});
			$('#copy').on('focusout', function () {
				$("#Copiar-icon").attr("fill", "#000000");
			});
			$('#copy').on('click', function () {

				let fichasAbiertas = $(".openFicha");
				if(fichasAbiertas.length > 0){
					window.getSelection().selectAllChildren(
						document.getElementsByClassName("openFicha")[0]
					);
					
					document.execCommand("copy");
				}
				
			});
	
	
	
			$('#download').on('focusin', function () {
				$("#Export").attr("fill", "#2BB88B");
			});
			$('#download').on('focusout', function () {
				$("#Export").attr("fill", "#000000");
			});
			$('#download').on('click', function () {
	
				let text = "<style> #pdfEuskalterm li{ list-style-type: none; margin-top: 10px;} .text-blue{ margin-right: 0.5rem !important; color: rgb(20, 114, 164) !important;} "+
					".text-decoration-none {text-decoration: none !important;} .text-black {color: black !important;} "+
					"#pdfEuskalterm .clasificacion{ margin-top: 40px; margin-bottom: 25px; font-size: 25px} "+
					"#pdfEuskalterm .fitxa {margin-left: 20px; margin-top: 50px; font-size:21px;} #pdfEuskalterm .hiztegiakUL{font-size: 16px;} </style>";
	
				let fichasAbiertas = $(".openFicha");
				if(fichasAbiertas.length > 0){
	
					for (let i=0;i<fichasAbiertas.length; i++){

						let fitxa = $(fichasAbiertas[i]).find(".fitxa"); 
						text += fitxa[0].outerHTML;

					}
					text = text.replaceAll("—", " ");
	
					generatePDF(text, "euskalterm");
	
				}
	
			});


			chrome.storage.local.get(['fix'], function(result) {

				if(result.fix == "true"){
					$("#pinToolbar svg path").css("fill", "#a52424");
				}

			});

			$('#pinToolbar').on('click', function () {
				
				chrome.storage.local.get(['fix'], function(result) {
					if(result.fix != "true"){
						chrome.storage.local.set({"fix": "true" });
						$("#pinToolbar svg path").css("fill", "#a52424");
					}
					else{
						chrome.storage.local.set({"fix": "false" });
						$("#pinToolbar svg path").css("fill", "black");
					}

				});

			});



			$("#itzuliToolbar2 ").draggable({ handle: $("#toolbarHeader"),opacity: 0.5 });
			
			euskaltermLemas(text, language);
			ocultarIconosAudio();
			loadLiteals();

		});

	}
	

}

function euskaltermLemas(text, language, numPag){

	var resultPage = 50;
	var lang =  localStorage.getItem("euskalterm-lang");
	var word = localStorage.getItem("text_" + aLiterals.lit_Euskalterm);

	if(tabAnterior != ""){
		word = localStorage.getItem("text_" + tabAnterior);
		lang = $('#languagesToolbar').val();
	}

	
	if(numPag == undefined){
		numPag = 0;

	}
	if(window.getSelection().toString().trim() != ""){
		word = window.getSelection().toString().trim();
		lang = $('#languagesToolbar').val();
	}
	
	if($('#text_euskalterm').val() != undefined && $('#text_euskalterm').val().trim() != ""){
		word = $('#text_euskalterm').val().trim();
		lang = $('#languagesToolbar').val();
	}
	else{
		$('#text_euskalterm').val(word)

	}

	if(text != undefined){
		word = text;
		$('#text_euskalterm').val(word);
	}
	if(language != undefined){
		lang = language;
	}

	if (word == "" || word == undefined) {
		return;
	}
	word = word.replaceAll("'","");
	word = word.replaceAll(".","");
	$('#languagesToolbar').val(lang);

	var originlang = lang.split("2")[0];

	localStorage.setItem("text_" + aLiterals.lit_Euskalterm, word);
	localStorage.setItem("euskalterm-lang", lang);
	chrome.runtime.sendMessage({ action: "euskaltermLemas", word: word, language: originlang, page: numPag }, function (response) {
	
		let linkWord = word.replaceAll("%","%25");
		let enlace = "https://www.euskadi.eus/app/euskal-terminologia-banku-publikoa-2/"+linkWord+"/kontsultatermino/"+linkWord+"/non-du/hizk-"+originlang+"/ter-on"
		$("#enlaceEuskalterm").attr("href", enlace);


		$('#content_euskalterm').html("");
		let list = document.createElement("div");
		list.className = "euskalterm-list";

		let data = response.euskaltermLemas;
		let numResult = response.numResult;
		let numPage = Math.ceil(numResult / resultPage);
		if(data != ""){

			$.each(data, function(){

				let listUl = document.createElement("ul");
				listUl.className = "euskalterm-item";

				let liIcon = document.createElement("li");
				liIcon.className = "";

				let liIconireki = document.createElement("img");
				liIconireki.className = "irekiFitxa";
				liIconireki.id = "irekiFitxa_" + this.termino.teid;
				liIconireki.src = chrome.runtime.getURL("images/euskaltermPlus.png");

				let liIconImgItxi = document.createElement("img");
				liIconImgItxi.className = "itxiFitxa";
				liIconImgItxi.style.display = "none";
				liIconImgItxi.id = "itxiFitxa_" + this.termino.teid;
				liIconImgItxi.src = chrome.runtime.getURL("images/euskaltermMinus.png");

				liIcon.appendChild(liIconireki);
				liIcon.appendChild(liIconImgItxi);


				let liZerrenda = document.createElement("li");
				liZerrenda.className = "zerrenda";
				liZerrenda.id = "zerrenda_" + this.termino.teid;

				let ulFitxa = document.createElement("ul");
				ulFitxa.className = "fitxa";
				ulFitxa.id = "fitxa_" + this.termino.teid;
				ulFitxa.style.display = "none";

				let ulLerroa = document.createElement("ul");
				ulLerroa.className = "euskalterm-item-ficha";
				ulLerroa.id = "lerroa_" + this.termino.teid;

				let ulLerroali = document.createElement("li");
				ulLerroali.style.width = "150px";
				ulLerroali.style.marginRight = "20px";
				ulLerroali.className = "text-blue";

				let ulLerroaliSpan = document.createElement("span");
				ulLerroaliSpan.innerHTML = DOMPurify.sanitize(this.sailkapena);

				ulLerroali.appendChild(ulLerroaliSpan);

				let ulLerroali2 = document.createElement("li");
				ulLerroali2.style.width = "285px";
				ulLerroali2.innerHTML = DOMPurify.sanitize(this.termino.tesarrera);


				ulLerroa.appendChild(ulLerroali);
				ulLerroa.appendChild(ulLerroali2);


				liZerrenda.appendChild(ulFitxa);
				liZerrenda.appendChild(ulLerroa);


				listUl.appendChild(liIcon);
				listUl.appendChild(liZerrenda);

				let hr = document.createElement("hr"); 
				list.appendChild(listUl);
				list.appendChild(hr);

			});

			$('#content_euskalterm').append(list);


			//Paginacion
			let pags = document.createElement("ul");
			pags.id = "zenbakitzea";

			let MAXPAGINAS = 10;
			


			//Pintar numeros listado
			let numAnt = 0;
			let pos = numPag + 1;
			let posIni = 1;
			let posFin = numPage;
			if(numPage > MAXPAGINAS){

				while(pos > 1){

					pos--;
					numAnt++;

				}
				if(numAnt > 3){
					posIni = numPag - 4;
					numAnt = 3;
				}
				else{
					posIni = numPag - numAnt;
				}
				
				posFin = posIni + MAXPAGINAS -1;


				if(posFin > numPage){
					posFin = numPage;
					posIni = posFin - MAXPAGINAS - 1 ;
				
				}
				
			}
			else{
				posIni = 0;

			}

			
			/*if(numPage > 1){

				$('#pageNumbers').append('\
					<div class="prev"> <img alt="prev" src="' + $.rup.APP_STATICS + '/images/flecha-cta-gris-izq.png"> </div>\
				');
				
				
				document.getElementsByClassName("prev")[0].addEventListener("click", function() {
					let num = parseInt(document.getElementsByClassName("numberSelect")[0].innerHTML);
					crearTarjetas(num - 1);
					eventoIndicador();
				});
			} */
			
			
			for (let y = posIni; y < posFin; y++){
					

				let pageNum = document.createElement("li");
				let pageNumSpan = document.createElement("span");
				pageNumSpan.innerHTML = y + 1;
				pageNumSpan.className = "page";
				
				if(y == numPag){
					pageNumSpan.className = "page active";

				}

				pageNum.appendChild(pageNumSpan);
				pags.appendChild(pageNum);

				}
			


			/*if(numPage > 1){

				$('#pageNumbers').append('\
					<div class="next"> <img alt="next" src="' + $.rup.APP_STATICS + '/images/flecha-cta-gris.png"> </div>\
				');
				
				document.getElementsByClassName("next")[0].addEventListener("click", function() {
					let num = parseInt(document.getElementsByClassName("numberSelect")[0].innerHTML);
					crearTarjetas(num + 1);
					eventoIndicador();
					
				});
			}   


			if(numPag == 1){
				$('.prev').hide();

			}

			if(numPag == numPage){
				$('.next').hide();
			}*/



			let numbers = $(".number");
			for (let i = 0; i < numbers.length; i++) {	
				numbers[i].onclick = function(e){
					
					numPagActual = numbers[i].innerText;
					pintarPagina(numPagActual);
					eventoIndicador();
				}
			}


			/*for(let i=1;i<=numPage;i++){
				let pageNum = document.createElement("li");
				let pageNumSpan = document.createElement("span");
				pageNumSpan.innerHTML = i;
				pageNumSpan.className = "page";
				
				if(i-1 == numPag){
					pageNumSpan.className = "page active";

				}

				pageNum.appendChild(pageNumSpan);
				pags.appendChild(pageNum);

			}*/

			$('#content_euskalterm').append(pags);


			$('.page').on('click', function (e) {
	
				let number = parseInt(e.target.innerText);
				let lang = $('#languagesToolbar').val();
				euskaltermLemas(word, lang, number-1);

			});

			//Fuente
			let fuente = document.createElement("p");
			fuente.id = "fuente_euskalterm";
			fuente.innerHTML = aLiterals.lit_fuenteEuskalterm;


			$('#content_euskalterm').append(fuente);


			$('.irekiFitxa').on('click', function (e) {
	
				let id =  e.target.id.split("_")[1];
				$("#irekiFitxa_" + id).hide();
				$("#itxiFitxa_" + id).show();
				$("#lerroa_" + id).hide();

				let text = $("#fitxa_" + id)[0].innerHTML;
				if(text.trim() == ""){
					euskalterm(id, lang);
					$("#zerrenda_" + id).addClass("openFicha");
				}
				else{
					$("#fitxa_" + id).show();
					$("#zerrenda_" + id).addClass("openFicha");

				}
	
			});

			$('.itxiFitxa').on('click', function (e) {
	
				let id =  e.target.id.split("_")[1];
				$("#irekiFitxa_" + id).show();
				$("#itxiFitxa_" + id).hide();
				$("#lerroa_" + id).show();
				$("#fitxa_" + id).hide();
				$("#zerrenda_" + id).removeClass("openFicha");
	
			});

		}
		else{
			let noResults = document.createElement("p");
			noResults.style.alignSelf = "center";
			noResults.style.marginTop = "40px";
			noResults.textContent = aLiterals.lit_noResults 

			$('#content_euskalterm').append(noResults);
			
		}

		
	});

	tabAnterior = aLiterals.lit_Euskalterm;
}






function euskalterm(id, language){

	chrome.runtime.sendMessage({ action: "euskalterm", idFicha: id, language: language }, function (response) {

		$("#details").html("");

		var data = response.euskalterm;
		var terminoak = document.createElement("div");
		var terminoakEU = document.createElement("div");
		var oharrak = document.createElement("div");
		var irudia = document.createElement("div");
		var ordainak = document.createElement("div");
		var hiztegiak = document.createElement("div");
		var kont = 0;

		//var sailkapenak = "";	
		var sailkapenak = document.createElement("div");
		$.each(data.sailkapenak, function(){

			let p = document.createElement("p");
			p.className = "text-blue my-0 clasificacion";
			p.innerHTML = DOMPurify.sanitize(this.saazalpeeu);
			sailkapenak.appendChild(p);

		})


		var kont = 0;
		let span2 = document.createElement("span");
		var infgramatikala = "";
		var oharraTerm = "";
		var terminoakarr = data.terminoakEU;
		$.each(terminoakarr, function(){
			kont ++;
			
			span2.innerHTML = DOMPurify.sanitize(this.tesarrera);
			
			//Informazio gramatikala
			if (this.infgramatikal.iglabur != undefined){
				infgramatikala = this.infgramatikal.iglabur + " ";
			}
				
			//Gehitu ponderazioa
			if (this.teponde==4 || (this.tehizkun == "eu" && this.teponde==3)){

				let sub = document.createElement("sub");
				sub.innerHTML = DOMPurify.sanitize(this.teponde);
				span2.appendChild(sub);

			}
			if (this.teponde==5){

				let sub = document.createElement("sub");
				sub.innerHTML = "(4)"
				let font = document.createElement("font");
				font.style.color = "#FFFFFF";
				font.style.fontWeight = "bold";
				font.style.backgroundColor = "#7DBE47";
				font.style.border = "1px solid #7DBE47"
				font.innerHTML = "Eu"

				sub.appendChild(font);
				span2.appendChild(sub);
			
			}
			
			oharraTerm = DOMPurify.sanitize(this.teoharra);
			//Oharra
			if (oharraTerm != ""){

				let li = document.createElement("li");
				li.className = "mt-3 ml-70 font-weight-bold text-black";
				li.innerHTML = "Oharra";

				let li2 = document.createElement("li");
				li2.className = "text-black ml-70";

				let p = document.createElement("p");
				p.className = "text-black ml-5 my-1";
				p.innerHTML = oharraTerm;

				li2.appendChild(p);
				oharrak.appendChild(li);
				oharrak.appendChild(li2);
				
			}


			let li = document.createElement("li");
			li.className = "ml-70 mt-2";

			let span = document.createElement("span");
			span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";

			if(kont == 1){
				span.innerHTML= "eu";
			}

			span2.className = "text-black";

			let span3 = document.createElement("span");
			span3.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";
			span3.innerHTML = DOMPurify.sanitize(infgramatikala);
			

			li.appendChild(span);
			li.appendChild(span2);
			li.appendChild(span3);
			
			terminoakEU.appendChild(li);

		});


		//Euskarazko definizioak
		var zerrendaDefinizioakEU = "";
		var definizioakEU = document.createElement("div");

		zerrendaDefinizioakEU = data.definizioakEU;

		$.each(zerrendaDefinizioakEU, function(){

			let p = document.createElement("p");
			p.className = "text-black ml-5 my-1";
			p.innerHTML = DOMPurify.sanitize(this.detestu);
			definizioakEU.appendChild(p);

		});


		//Gaztelaniazko definizioak
		var zerrendaDefinizioakES = "";
		var definizioakES = document.createElement("div");

		zerrendaDefinizioakES = data.definizioakES;

		$.each(zerrendaDefinizioakES, function(){
			if(this.detestu != ""){
				let li = document.createElement("li");
				li.className = "mt-3 ml-70 font-weight-bold text-black";
				li.textContent = "Definición:";
	
				let span = document.createElement("span");
				span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";
	
				li.appendChild(span);
	
	
				let li2 = document.createElement("li");
				li2.className = "ml-70";
	
				let p = document.createElement("p");
				p.className = "text-black ml-5 my-1";
				p.innerHTML = DOMPurify.sanitize(this.detestu);
	
				li2.appendChild(p);
	
				definizioakES.appendChild(li);
				definizioakES.appendChild(li2);
			}
			

		});


		//Frantsesezko definizioak
		var zerrendaDefinizioakFR = "";
		var definizioakFR = document.createElement("div");

		zerrendaDefinizioakFR = data.definizioakFR;

		$.each(zerrendaDefinizioakFR, function(){

			let li = document.createElement("li");
			li.className = "mt-3 ml-70 font-weight-bold text-black";
			li.textContent = "Definición:";

			let span = document.createElement("span");
			span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";

			li.appendChild(span);


			let li2 = document.createElement("li");
			li2.className = "ml-70";

			let p = document.createElement("p");
			p.className = "text-black ml-5 my-1";
			p.innerHTML = DOMPurify.sanitize(this.detestu);

			li2.appendChild(p);

			definizioakFR.appendChild(li);
			definizioakFR.appendChild(li2);

		});


		//Ingelesezko definizioak
		var zerrendaDefinizioakEN = "";
		var definizioakEN = document.createElement("div");
		
		zerrendaDefinizioakEN = data.definizioakEN;

		$.each(zerrendaDefinizioakEN, function(){

			let li = document.createElement("li");
			li.className = "mt-3 ml-70 font-weight-bold text-black";
			li.textContent = "Definición:";

			let span = document.createElement("span");
			span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";

			li.appendChild(span);


			let li2 = document.createElement("li");
			li2.className = "ml-70";

			let p = document.createElement("p");
			p.className = "text-black ml-5 my-1";
			p.innerHTML = DOMPurify.sanitize(this.detestu);

			li2.appendChild(p);

			definizioakEN.appendChild(li);
			definizioakEN.appendChild(li2);


		});


		//Alemanezko definizioak
		var zerrendaDefinizioakDE = "";
		var definizioakDE = document.createElement("div");

		zerrendaDefinizioakDE = data.definizioakDE;

		$.each(zerrendaDefinizioakDE, function(){

			let li = document.createElement("li");
			li.className = "mt-3 ml-70 font-weight-bold text-black";
			li.textContent = "Definición:";

			let span = document.createElement("span");
			span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";

			li.appendChild(span);


			let li2 = document.createElement("li");
			li2.className = "ml-70";

			let p = document.createElement("p");
			p.className = "text-black ml-5 my-1";
			p.innerHTML = DOMPurify.sanitize(this.detestu);

			li2.appendChild(p);

			definizioakDE.appendChild(li);
			definizioakDE.appendChild(li2);


		});


		//Latinezko definizioak
		var zerrendaDefinizioakLA = "";
		var definizioakLA = document.createElement("div");

		zerrendaDefinizioakLA = data.definizioakLA;

		$.each(zerrendaDefinizioakLA, function(){

			let li = document.createElement("li");
			li.className = "mt-3 ml-70 font-weight-bold text-black";
			li.textContent = "Definición:";

			let span = document.createElement("span");
			span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";

			li.appendChild(span);


			let li2 = document.createElement("li");
			li2.className = "ml-70";

			let p = document.createElement("p");
			p.className = "text-black ml-5 my-1";
			p.innerHTML = DOMPurify.sanitize(this.detestu);

			li2.appendChild(p);

			definizioakLA.appendChild(li);
			definizioakLA.appendChild(li2);


		});


		//Beste hizkuntzetako ordainak
		var oharra = document.createElement("div");
		kont = 0;
		terminoak = data.terminoakES;
		$.each(terminoak, function(){
			kont ++;
			//Informazio gramatikala
				
			let ordainakStr = document.createElement("li");
			ordainakStr.className = "ml-70 mt-2";
			
			let span = document.createElement("span");
			span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";

			if(kont >= 1){
				span.innerHTML = "es";
			}

			ordainakStr.appendChild(span);

			let span2 = document.createElement("span");
			span2.className = "text-black";

			if (this.infgramatikal.iglabur != undefined){
				span2.innerHTML = DOMPurify.sanitize(this.infgramatikal.iglabur) + " ";
			}	

			let a = document.createElement("a");
			a.className = "text-decoration-none";
			a.href = "#";
			//  a.setAttribute("onclick", "javascript:euskalterm(\"this.teid\")");

			let span3 = document.createElement("span");
			span3.className = "text-black";
			span3.innerHTML = DOMPurify.sanitize(this.tesarrera);

			a.appendChild(span3);
			ordainakStr.appendChild(a);

			ordainak.appendChild(ordainakStr);


			oharraTerm = DOMPurify.sanitize(this.teoharra);
			//Oharra
			if (oharraTerm != ""){
				
				let li = document.createElement("li");
				li.className = "mt-3 ml-70 font-weight-bold text-black";
				li.innerHTML = "Oharra";

				let li2 = document.createElement("li");
				li2.className = "text-black ml-70";
			
				let p = document.createElement("p");
				p.className = "text-black ml-5 my-1";
				p.innerHTML = oharraTerm;

				li2.appendChild(p);
				oharra.appendChild(li);
				oharra.appendChild(li2);

			}

		});
		ordainak.appendChild(definizioakES);
		ordainak.appendChild(oharra);




		oharra = document.createElement("div");
		kont = 0;
		terminoak = data.terminoakFR;
		$.each(terminoak, function(){
			kont ++;
			//Informazio gramatikala
			infgramatikala = "";
							
			let ordainakStr = document.createElement("li");
			ordainakStr.className = "ml-70 mt-2";
			
			let span = document.createElement("span");
			span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";

			if(kont >= 1){
				span.innerHTML = "fr";
			}

			ordainakStr.appendChild(span);

			let span2 = document.createElement("span");
			span2.className = "text-black";

			if (this.infgramatikal.iglabur != undefined){
				span2.innerHTML = DOMPurify.sanitize(this.infgramatikal.iglabur) + " ";
			}

			let a = document.createElement("a");
			a.className = "text-decoration-none";
			a.href = "#";
			//  a.setAttribute("onclick", "javascript:euskalterm(\"this.teid\")");

			let span3 = document.createElement("span");
			span3.className = "text-black";
			span3.innerHTML = DOMPurify.sanitize(this.tesarrera);

			a.appendChild(span3);
			ordainakStr.appendChild(a);

			ordainak.appendChild(ordainakStr);


			oharraTerm = DOMPurify.sanitize(this.teoharra);
			//Oharra
			if (oharraTerm != ""){
				
				let li = document.createElement("li");
				li.className = "mt-3 ml-70 font-weight-bold text-black";
				li.innerHTML = "Oharra";

				let li2 = document.createElement("li");
				li2.className = "text-black ml-70";
			
				let p = document.createElement("p");
				p.className = "text-black ml-5 my-1";
				p.innerHTML = oharraTerm;

				li2.appendChild(p);
				oharra.appendChild(li);
				oharra.appendChild(li2);
			}
		});

		ordainak.appendChild(definizioakFR);
		ordainak.appendChild(oharra);



		oharra = document.createElement("div");
		kont = 0;
		terminoak = data.terminoakEN;
		$.each(terminoak, function(){
			kont ++;
	
			let ordainakStr = document.createElement("li");
			ordainakStr.className = "ml-70 mt-2";
			
			let span = document.createElement("span");
			span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";

			if(kont >= 1){
				span.innerHTML = "en";
			}

			ordainakStr.appendChild(span);

			let span2 = document.createElement("span");
			span2.className = "text-black";

			if (this.infgramatikal.iglabur != undefined){
				span2.innerHTML = DOMPurify.sanitize(this.infgramatikal.iglabur) + " ";
			}

			let a = document.createElement("a");
			a.className = "text-decoration-none";
			a.href = "#";
			//  a.setAttribute("onclick", "javascript:euskalterm(\"this.teid\")");

			let span3 = document.createElement("span");
			span3.className = "text-black";
			span3.innerHTML = DOMPurify.sanitize(this.tesarrera);

			a.appendChild(span3);
			ordainakStr.appendChild(a);

			ordainak.appendChild(ordainakStr);


			oharraTerm = DOMPurify.sanitize(this.oharra);
			//Oharra
			if (oharraTerm != ""){
	
				let li = document.createElement("li");
				li.className = "mt-3 ml-70 font-weight-bold text-black";
				li.innerHTML = "Oharra";

				let li2 = document.createElement("li");
				li2.className = "text-black ml-70";
			
				let p = document.createElement("p");
				p.className = "text-black ml-5 my-1";
				p.innerHTML = oharraTerm;

				li2.appendChild(p);
				oharra.appendChild(li);
				oharra.appendChild(li2);

			}
		});
		ordainak.appendChild(definizioakEN);
		ordainak.appendChild(oharra);
	

		oharra = document.createElement("div");
		kont = 0;
		terminoak = data.terminoakDE;
		$.each(terminoak, function(){
			kont ++;
			//Informazio gramatikala
			let ordainakStr = document.createElement("li");
			ordainakStr.className = "ml-70 mt-2";
			
			let span = document.createElement("span");
			span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";

			if(kont >= 1){
				span.innerHTML = "de";
			}

			ordainakStr.appendChild(span);

			let span2 = document.createElement("span");
			span2.className = "text-black";

			if (this.infgramatikal.iglabur != undefined){
				span2.innerHTML = DOMPurify.sanitize(this.infgramatikal.iglabur) + " ";
			}

			let a = document.createElement("a");
			a.className = "text-decoration-none";
			a.href = "#";
			//  a.setAttribute("onclick", "javascript:euskalterm(\"this.teid\")");

			let span3 = document.createElement("span");
			span3.className = "text-black";
			span3.innerHTML = DOMPurify.sanitize(this.tesarrera);

			a.appendChild(span3);
			ordainakStr.appendChild(a);

			ordainak.appendChild(ordainakStr);


			oharraTerm = DOMPurify.sanitize(this.oharra);
			//Oharra
			if (oharraTerm != ""){
	
				let li = document.createElement("li");
				li.className = "mt-3 ml-70 font-weight-bold text-black";
				li.innerHTML = "Oharra";

				let li2 = document.createElement("li");
				li2.className = "text-black ml-70";
			
				let p = document.createElement("p");
				p.className = "text-black ml-5 my-1";
				p.innerHTML = oharraTerm;

				li2.appendChild(p);
				oharra.appendChild(li);
				oharra.appendChild(li2);

			}
		});	
		ordainak.appendChild(definizioakDE);
		ordainak.appendChild(oharra);


		oharra = document.createElement("div");
		kont = 0;
		terminoak = data.terminoakLA;
		$.each(terminoak, function(){
			kont ++;
			//Informazio gramatikala
			let ordainakStr = document.createElement("li");
			ordainakStr.className = "ml-70 mt-2";
			
			let span = document.createElement("span");
			span.className = "d-inline-block w-2 font-weight-bold text-blue mr-2";

			if(kont >= 1){
				span.innerHTML = "la";
			}

			ordainakStr.appendChild(span);

			let span2 = document.createElement("span");
			span2.className = "text-black";

			if (this.infgramatikal.iglabur != undefined){
				span2.innerHTML = DOMPurify.sanitize(this.infgramatikal.iglabur) + " ";
			}


			let a = document.createElement("a");
			a.className = "text-decoration-none";
			a.href = "#";
			//  a.setAttribute("onclick", "javascript:euskalterm(\"this.teid\")");

			let span3 = document.createElement("span");
			span3.className = "text-black";
			span3.innerHTML = DOMPurify.sanitize(this.tesarrera);

			a.appendChild(span3);
			ordainakStr.appendChild(a);

			ordainak.appendChild(ordainakStr);


			oharraTerm = DOMPurify.sanitize(this.teoharra);
			//Oharra
			if (oharraTerm != ""){
		
				let li = document.createElement("li");
				li.className = "mt-3 ml-70 font-weight-bold text-black";
				li.innerHTML = "Oharra";

				let li2 = document.createElement("li");
				li2.className = "text-black ml-70";
			
				let p = document.createElement("p");
				p.className = "text-black ml-5 my-1";
				p.innerHTML = oharraTerm;

				li2.appendChild(p);
				oharra.appendChild(li);
				oharra.appendChild(li2);

			}

		});
		ordainak.appendChild(definizioakLA);
		ordainak.appendChild(oharra);


		//Hiztegiak
		var hiztegia = data.hiztegiak;
		$.each(hiztegia, function(){


			let li = document.createElement("li");
			li.className = "mt-1 font-weight-bold text-black";
			li.innerHTML = "   ";


			if(this.hiazalpe != null){
				let span = document.createElement("span");
				span.innerHTML = "[" + DOMPurify.sanitize(this.hiazalpe) + "]";

				hiztegiak.appendChild(span);
			}
			if(data.kontzeptu.koalddata == null){
				let span = document.createElement("span");
				span.innerHTML = "[" + DOMPurify.sanitize(data.kontzeptu.kosordata.substring(0, 4)) + "]";

				hiztegiak.appendChild(span);

			}
			else{
				let span = document.createElement("span");
				span.innerHTML = "[" + DOMPurify.sanitize(data.kontzeptu.koalddata.substring(0, 4)) + "]";

				hiztegiak.appendChild(span);
			}


		});
		
		let result = document.createElement("div");

		let li = document.createElement("li");
		li.className = "mt-2 ml-70";
		li.appendChild(sailkapenak);

		result.appendChild(li);

		let li2 = document.createElement("li");
		li2.className = "mt-3";

		let ul = document.createElement("ul");
		ul.className = "mt-3";
		ul.innerHTML = terminoakEU.innerHTML.toString();

		li2.appendChild(ul);
		result.appendChild(li2);

		let li3 = document.createElement("li");
		li3.className = "definicion mt-3 ml-70 font-weight-bold text-black pl-3";


		if(definizioakEU.innerText != ""){
			li3.innerHTML = "Definición";

		}
		result.appendChild(li3);


		let li4 = document.createElement("li");
		li4.className = "ml-70";
		li4.appendChild(definizioakEU);

		result.appendChild(li4);
		result.appendChild(oharrak);
		result.appendChild(irudia);


		let li5 = document.createElement("li");
		li5.className = "mt-3 ml-70";
		li5.appendChild(ordainak);

		result.appendChild(li5);


		let li6 = document.createElement("li");
		li6.className = "mt-5 ml-70";

		let ul2 = document.createElement("ul");
		ul2.className = "hiztegiakUL text-black font-weight-bold";
		ul2.appendChild(hiztegiak);

		li6.appendChild(ul2);
		result.appendChild(li6);



		//$("#text_euskalterm").val(data.termino.tesarrera);
		localStorage.setItem("text_" + aLiterals.lit_Euskalterm, data.termino.tesarrera);
		$("#lerroa_" + id).hide();
		$('#fitxa_' + id).append(result);
		$('#fitxa_' + id).show();

		
	});


}



	


function createTranslate(lang, text){

	if(!$('#itzuliToolbar2 #text_input').length){

		$.get(chrome.runtime.getURL('traductor.html'), function (data) {

			if(!$('#itzuliToolbar2').length){
				createToolbar2();
			}
			setCurrent("Traductor");

			$('#itzuliToolbar2').html(data);


			$('#closeToolbar2').on('click', function () {
				destroyToolbar2();
			});

			chrome.storage.local.get(['fix'], function(result) {

				if(result.fix == "true"){
					$("#pinToolbar svg path").css("fill", "#a52424");
				}

			});

			$('#pinToolbar').on('click', function () {
				
				chrome.storage.local.get(['fix'], function(result) {
					if(result.fix != "true"){
						chrome.storage.local.set({"fix": "true" });
						$("#pinToolbar svg path").css("fill", "#a52424");
					}
					else{
						chrome.storage.local.set({"fix": "false" });
						$("#pinToolbar svg path").css("fill", "black");
					}

				});

			});



			$('#translate_tool2').on('click', function () {
				createTranslate();
			});

			$("#text_input").on("input", function() {
				clearTimeout(window.debounceTimer);
				window.debounceTimer = setTimeout(function() {
					detectLanguage($('#text_input').val());
				}, 1000);
			});


			$('#play_input').on('click', function () {
				reproducirAudio = true;
				contadorLlamadasSintesia = 0;
				let language = $("#languagesToolbar").val().split("2");
				let voiceEus = $("#change_voice_inp select").val();
				sintesia($('#itzuliToolbar2 #text_input').val(), language[0], "input", voiceEus);
			});

			$('#play_output').on('click', function () {
				reproducirAudio = true;
				contadorLlamadasSintesia = 0;
				let language = $("#languagesToolbar").val().split("2");
				let voiceEus = $("#change_voice_outp select").val();
				sintesia($('#text_output').val(), language[1], "output", voiceEus);
			});

			
			$("#change_voice_inp select").change(function () {
				localStorage.setItem("localStorageVoice", $(this).val());
				
				let selected = $(this).find(":selected");
				$("#change_voice_inp select").find('option').css('font-weight', 'normal').text(function() {
					return $(this).text().replace(' \u2713', '');
				});
				
				selected.css({"font-weight": "bold"}).text(function() {
					return $(this).text() + ' \u2713';
				});
			});

			$("#change_voice_outp select").change(function () {
				localStorage.setItem("localStorageVoice", $(this).val());
				
				let selected = $(this).find(":selected");
				$("#change_voice_outp select").find('option').css('font-weight', 'normal').text(function() {
					return $(this).text().replace(' \u2713', '');
				});
				
				selected.css({"font-weight": "bold"}).text(function() {
					return $(this).text() + ' \u2713';
				});
			});

			$('#recordAudio').on('click', function () {
				
				$("#recordAudio svg path").css("fill", "#2bb88b");
				inputID = "text_input";
				segundosEnTotal = 15;
				transkripzioa();
			});
			


			$('#delete').on('focusin', function () {
				$("#Borrar-icon").attr("fill", "#2BB88B");
			});
			$('#delete').on('focusout', function () {
				$("#Borrar-icon").attr("fill", "#000000");
			});
			$('#delete').on('click', function () {
				$('#itzuliToolbar2 #text_input').val("");
				$('#itzuliToolbar2 #text_output').val("");
			});


			$('#copyTranslated').on('focusin', function () {
				$("#Copiar-icon").attr("fill", "#2BB88B");
			});
			$('#copyTranslated').on('focusout', function () {
				$("#Copiar-icon").attr("fill", "#000000");
			});
			$('#copyTranslated').on('click', function () {
				var copyText = document.getElementById('text_output');
				copyText.select();
				copyText.setSelectionRange(0, 99999); /*For mobile devices*/
				document.execCommand("copy");
			});
			
			$('#download').on('focusin', function () {
				$("#Export").attr("fill", "#2BB88B");
			});
			$('#download').on('focusout', function () {
				$("#Export").attr("fill", "#000000");
			});
			$('#download').on('click', function () {
				generatePDF();
			});

			$("#itzuliToolbar2 ").draggable({ handle: $("#toolbarHeader"),opacity: 0.5 });

			ocultarIconosAudio();
			loadLiteals();
			createTranslate(lang, text);

		});	
	}
	else{
		$("#languagesToolbar option[data-lit='lit_eu_de'] ").hide();
		$("#languagesToolbar option[data-lit='lit_de_eu']").hide();
		$("#languagesToolbar option[data-lit='lit_eu_fr']").show();
		$("#languagesToolbar option[data-lit='lit_fr_eu']").show();

		var word = text;
		
		if(($('#itzuliToolbar2 #text_input').val().trim() != "") && $('#text_input').val().trim() != undefined){
			word = $('#itzuliToolbar2 #text_input').val();
		}

		if(window.getSelection().toString().trim() != ""){
			word = window.getSelection().toString().trim();
			window.getSelection().empty();
		}
		
		if(word != undefined && word.length > 4000){
			word = word.substring(0, 4000);

		}
		
		var words = ("" + word).split(' ');
		var words2 = ("" + word).split('\n');
		if (words == "undefined") { words = ""; }

		if(words.length > 0 && word != " "){

			if(sessionStorage.getItem("ac65a_languagesItzuli") != null){
				lang = sessionStorage.getItem("ac65a_languagesItzuli");
				sessionStorage.removeItem("ac65a_languagesItzuli")
			}

			if((lang == "") || (lang == undefined)){
				lang = $("#languagesToolbar").val();
			}

			var originlang = lang.split("2")[0];
			var destinylang = lang.split("2")[1];
			if(words.length < 4 && exist == true && originlang != 'fr' && destinylang != 'fr'){

				if(words2.length < 4){
					setCurrent("Diccionario");
					createDictionary(word);
				}
				else{
					exist = true;
					translate(lang, word);
				}
				
			}
			else{
				exist = true;
				translate(lang, word);
				
			}
		}
	}
	chrome.storage.local.get(["historico"], (result) => {
		if (result.historico) {
			const localStorageHistoric = JSON.parse(result.historico);
			if (localStorageHistoric && localStorageHistoric.length > 0) {
				insertAccordion(localStorageHistoric);
			}
		}
	});
}





function createWikipedia(){
	if($('#content_wikipedia').length){
		wikipedia();
	}
	else{
		
		$.get(chrome.runtime.getURL('wikipedia.html'), function (data) {

			if(!$('#itzuliToolbar2').length){
				createToolbar2();
			}
			setCurrent("Wikipedia");
			html = data.replace("logo_wikipedia.png", chrome.runtime.getURL("images/logo_wikipedia.png"));
			$('#itzuliToolbar2').html(html);
		
			$('#closeToolbar2').on('click', function () {
				destroyToolbar2();
			});


			chrome.storage.local.get(['fix'], function(result) {

				if(result.fix == "true"){
					$("#pinToolbar svg path").css("fill", "#a52424");
				}

			});

			$('#pinToolbar').on('click', function () {
				
				chrome.storage.local.get(['fix'], function(result) {
					if(result.fix != "true"){
						chrome.storage.local.set({"fix": "true" });
						$("#pinToolbar svg path").css("fill", "#a52424");
					}
					else{
						chrome.storage.local.set({"fix": "false" });
						$("#pinToolbar svg path").css("fill", "black");
					}

				});

			});

			$('#play_wikipedia').on('click', function () {
				contadorLlamadasSintesia = 0;
				reproducirAudio = true;
				let voiceEus = $("#change_voice_wikipedia select").val();
				sintesia($("#details-wikipedia").text().trim(), "eu", "wikipedia",voiceEus);
			});

		
			$("#change_voice_wikipedia select").change(function () {
				localStorage.setItem("localStorageVoice", $(this).val());
				
				let selected = $(this).find(":selected");
				$("#change_voice_wikipedia select").find('option').css('font-weight', 'normal').text(function() {
					return $(this).text().replace(' \u2713', '');
				});
				
				selected.css({"font-weight": "bold"}).text(function() {
					return $(this).text() + ' \u2713';
				});

			});



			$('#recordAudio').on('click', function () {
				
				$("#recordAudio svg path").css("fill", "#2bb88b");
				inputID = "text_wikipedia";
				transkripzioa();
			});


			$('#search_wikipedia').on('focusin', function () {
				$("#Buscar-icon").attr("fill", "#2BB88B");
			});
			$('#search_wikipedia').on('focusout', function () {
				$("#Buscar-icon").attr("fill", "#000000");
			});
			$('#search_wikipedia').on('click', function () {
				wikipedia();
			});


			$('#clean_wikipedia').on('focusin', function () {
				$("#Borrar-icon").attr("fill", "#2BB88B");
			});
			$('#clean_wikipedia').on('focusout', function () {
				$("#Borrar-icon").attr("fill", "#000000");
			});
			$('#clean_wikipedia').on('click', function () {
				$('#text_wikipedia').val("")
				$('#content_wikipedia').html("")
			});


			$('#translate').on('click', function () {
				setCurrent("Traductor");
	
				let texto = "";
	
				if(window.getSelection().toString().trim() != ""){
					texto = window.getSelection().toString().substring(0, 4000).trim();
				}
				else{
					texto = document.getElementById('details-wikipedia').innerText.substring(0, 4000);
				}
				
				createTranslate("eu2es", texto);
			});


			$('#copy').on('focusin', function () {
				$("#Copiar-icon").attr("fill", "#2BB88B");
			});
			$('#copy').on('focusout', function () {
				$("#Copiar-icon").attr("fill", "#000000");
			});
			$('#copy').on('click', function () {
				window.getSelection().selectAllChildren(
				  document.getElementById("details") 
				);
				document.execCommand("copy");
			});
			
			$('#download').on('focusin', function () {
				$("#Export").attr("fill", "#2BB88B");
			});
			$('#download').on('focusout', function () {
				$("#Export").attr("fill", "#000000");
			});
			$('#download').on('click', function () {

				if($('#titleWikipedia').length){
					let wikiHtml = $("#details").html();
					let posi = wikiHtml.indexOf("<a");
					let posf = wikiHtml.indexOf("</a>") + 4;
					let html1 = wikiHtml.substr(0, posi);
					let html2 = wikiHtml.substr(posf, wikiHtml.length);
					wikiHtml = html1 + html2;

					generatePDF(wikiHtml, "wikipedia");
				}
			
			});

			$("#itzuliToolbar2 ").draggable({ handle: $("#toolbarHeader"),opacity: 0.5 });

			loadLiteals();
			wikipedia();

		});	
		
	}
}



function createDefinition(){

	if($('#panel_definition').length){
		definition();
	}
	else{
		
		$.get(chrome.runtime.getURL('definicion.html'), function (data) {

			setCurrent("Definicion-icon");
			
			if(!$('#itzuliToolbar2').length){
				createToolbar2();
			}
			data = data.replaceAll("lit_AddedGlossary", aLiterals.lit_AddedGlossary);
			$('#itzuliToolbar2').html(data);

			$("#agregado").hide();

			$('#closeToolbar2').on('click', function () {
				destroyToolbar2();
			});


			chrome.storage.local.get(['fix'], function(result) {

				if(result.fix == "true"){
					$("#pinToolbar svg path").css("fill", "#a52424");
				}

			});

			$('#pinToolbar').on('click', function () {
				
				chrome.storage.local.get(['fix'], function(result) {
					if(result.fix != "true"){
						chrome.storage.local.set({"fix": "true" });
						$("#pinToolbar svg path").css("fill", "#a52424");
					}
					else{
						chrome.storage.local.set({"fix": "false" });
						$("#pinToolbar svg path").css("fill", "black");
					}

				});

			});

			$('#play_definition').on('click', function () {
				contadorLlamadasSintesia = 0;
				reproducirAudio = true;
				let text = $("#text_definition").val();
				/*let text = $("#content_definition").text();
				//BORRAR CAMPOS 'IZ' 
				text = text.trim().replace(/\s\s+/g, ' ');
				text = text.replaceAll("iz.","");
		
				if(!isNaN(text.charAt(0))){
					text = text.substring(1);

				}

				let pos1 = text.indexOf("(");
				let pos2 = text.indexOf(")");

				if(pos1 != -1 && pos2 != -1){
					text = text.substring(0, pos1) + text.substring(pos2 + 1, text.length);
				}*/
				let voiceEus = $("#change_voice_definition select").val();
				sintesia(text, "eu", "definition",voiceEus);
			});

			$("#change_voice_definition select").change(function () {
				localStorage.setItem("localStorageVoice", $(this).val());
				
				let selected = $(this).find(":selected");
				$("#change_voice_definition select").find('option').css('font-weight', 'normal').text(function() {
					return $(this).text().replace(' \u2713', '');
				});
				
				selected.css({"font-weight": "bold"}).text(function() {
					return $(this).text() + ' \u2713';
				});

			});

			$('#recordAudio').on('click', function () {
				$("#recordAudio svg path").css("fill", "#2bb88b");
				inputID = "text_definition";
				transkripzioa();
			});


			$('#search_definition').on('focusin', function () {
				$("#Buscar-icon").attr("fill", "#2BB88B");
			});
			$('#search_definition').on('focusout', function () {
				$("#Buscar-icon").attr("fill", "#000000");
			});
			$('#search_definition').on('click', function () {
				definition();
			});
			

			$('#clean_definition').on('focusin', function () {
				$("#Borrar-icon").attr("fill", "#2BB88B");
			});
			$('#clean_definition').on('focusout', function () {
				$("#Borrar-icon").attr("fill", "#000000");
			});
			$('#clean_definition').on('click', function () {
				$('#text_definition').val("");
				$('#panel_definition').html("");
			});



			$('#addToGlossary').on('focusin', function () {
				$("#Glosario-icon2").attr("fill", "#2BB88B");
			});
			$('#addToGlossary').on('focusout', function () {
				$("#Glosario-icon2").attr("fill", "#000000");
			});
			$('#addToGlossary').on('click', function () {

				let word = $('#text_definition').val().trim();
				let context = $("#content_definition").html();
				if(word != "" &&  word.replaceAll(" ", "") != "" && !context.includes("noResults")){
					
					saveInGlossary(word, context, false);
					$("#agregado").show();
					$("#agregado").addClass("agregado");

					$("#agregado").on("webkitAnimationEnd", function(){
						$("#agregado").css("display", "none");
					});
				}
				
			});


			$('#copy').on('focusin', function () {
				$("#Copiar-icon").attr("fill", "#2BB88B");
			});
			$('#copy').on('focusout', function () {
				$("#Copiar-icon").attr("fill", "#000000");
			});
			$('#copy').on('click', function () {
				window.getSelection()
				.selectAllChildren(
				  document.getElementById("content_definition") 
				);
				document.execCommand("copy");
			});
			
			$('#download').on('focusin', function () {
				$("#Export").attr("fill", "#2BB88B");
			});
			$('#download').on('focusout', function () {
				$("#Export").attr("fill", "#000000");
			});
			$('#download').on('click', function () {

				if($('#content_definition').length){
					generatePDF($("#content_definition").html(), "definition");
				}
			
			});



			$("#itzuliToolbar2 ").draggable({ handle: $("#toolbarHeader"),opacity: 0.5 });

			loadLiteals();
			definition();

		});

	
	}

}

function createSynonyms(){

	if($('#panel_synonyms').length){
		synonyms();
	}
	else{
		
		$.get(chrome.runtime.getURL('sinonimos.html'), function (data) {
			setCurrent("Sinonimo-icon");

			if(!$('#itzuliToolbar2').length){
				createToolbar2();
			}

			$('#itzuliToolbar2').html(data);


			$('#closeToolbar2').on('click', function () {
				destroyToolbar2();
			});


			chrome.storage.local.get(['fix'], function(result) {

				if(result.fix == "true"){
					$("#pinToolbar svg path").css("fill", "#a52424");
				}

			});

			$('#pinToolbar').on('click', function () {
				
				chrome.storage.local.get(['fix'], function(result) {
					if(result.fix != "true"){
						chrome.storage.local.set({"fix": "true" });
						$("#pinToolbar svg path").css("fill", "#a52424");
					}
					else{
						chrome.storage.local.set({"fix": "false" });
						$("#pinToolbar svg path").css("fill", "black");
					}

				});

			});

			$('#search_synonyms').on('focusin', function () {
				$("#Buscar-icon").attr("fill", "#2BB88B");
			});
			$('#search_synonyms').on('focusout', function () {
				$("#Buscar-icon").attr("fill", "#000000");
			});
			$('#search_synonyms').on('click', function () {
				synonyms();
			});
			

			$('#clean_synonyms').on('focusin', function () {
				$("#Borrar-icon").attr("fill", "#2BB88B");
			});
			$('#clean_synonyms').on('focusout', function () {
				$("#Borrar-icon").attr("fill", "#000000");
			});
			$('#clean_synonyms').on('click', function () {
				$('#text_synonyms').val("")
				$('#panel_synonyms').html("")
			});

			$('#recordAudio').on('click', function () {
				$("#recordAudio svg path").css("fill", "#2bb88b");
				inputID = "text_synonyms";
				segundosEnTotal = 5;
				transkripzioa();
			});

			$('#copy').on('focusin', function () {
				$("#Copiar-icon").attr("fill", "#2BB88B");
			});
			$('#copy').on('focusout', function () {
				$("#Copiar-icon").attr("fill", "#000000");
			});
			$('#copy').on('click', function () {
				window.getSelection()
				.selectAllChildren(
				  document.getElementById("content_synonyms") 
				);
				document.execCommand("copy");
			});
			
			$('#download').on('focusin', function () {
				$("#Export").attr("fill", "#2BB88B");
			});
			$('#download').on('focusout', function () {
				$("#Export").attr("fill", "#000000");
			});
			$('#download').on('click', function () {

				if($('#content_synonyms').length){

					let html = $("#content_synonyms").html().replaceAll("class=\"formaWord\"", "style='font-weight: bold; margin-top: 15px; margin-bottom: 0px;'" );
					html = html.replaceAll("class=\"synonyms\"","style=' color: #26bf75; text-decoration: none; '");
					html = html.replaceAll("class=\"euskalki\"","style='font-style: italic; color: grey;'");
					html = html.replaceAll("class=\"erabil\"","style='font-style: italic; color: grey;'");
					html = html.replaceAll("color: grey;'>","color: grey;'> &nbsp;&nbsp;&nbsp;");


					generatePDF(html, "synonyms");
				}
			
			});


			$("#itzuliToolbar2 ").draggable({ handle: $("#toolbarHeader"),opacity: 0.5 });

			ocultarIconosAudio();
			loadLiteals();
			synonyms();

		});

	
	}

}



function createToolbar2(){

	var div2 = document.createElement("div");
	div2.id = "itzuliToolbar2";
	div2.className = 'ui-widget-content mdc-top-app-bar';

	let screenWidth = $(window).width();

	var st2 = div2.style;
	st2.top = "205px";
	//st2.top = "125px";
	
	if(screenWidth > 985){
		let left = (screenWidth - 985) / 2
		st2.left = left + "px";
	}

	st2.width = "985px";
	st2.height = "530px";
	st2.color = "black";
	st2.position = "absolute";
	st2.zIndex = "9999999";
	st2.display = "inline-block";
	st2.backgroundColor = "white";
	st2.border = "5px solid rgb(27, 57, 127)";


	document.getElementsByTagName("body")[0].appendChild(div2);


	//$("#itzuliToolbar2 ").draggable({ opacity: 0.5 });


	//Initialitate position of the toolbar
	var scrollTop = $(window).scrollTop();
	if (scrollTop == 0) {
		$("#itzuliToolbar2 ").css({ "margin-top": "0px" });
	} else {
		$("#itzuliToolbar2 ").css({ "margin-top": ($(window).scrollTop()) + "px" });
	}

	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop();
		if (scrollTop == 0) {
			$("#itzuliToolbar2 ").css({ "margin-top": "0px" });
		} else {
			$("#itzuliToolbar2 ").css({ "margin-top": ($(window).scrollTop()) + "px" });
		}
	});



	//Cerrar la barra si hago click fuera
	$(document).mouseup(function(e) {
		var container = $("#itzuliToolbar2 ");
		var container2 = $("#itzuliToolbar");
	
		chrome.storage.local.get(['fix'], function(result) {
			if(result.fix != "true"){
				if (!container.is(e.target) && container.has(e.target).length === 0) {
					if (!container2.is(e.target) && container2.has(e.target).length === 0) {
						if(window.getSelection().toString().trim() == ""){
							$("#closeToolbar2").click();
						}
					}
				}
	
			}

		});


	});
	
}



function translate(lang, text){
	
	var word = text;
	var language = lang

	var originlang = language.split("2")[0];
	var destinylang = language.split("2")[1];

	$('#itzuliToolbar2 #text_input').val(word);

	if (originlang != 'de' && destinylang != 'de') {
		//$('#translate_tool').addClass("translation-blink-text");

		chrome.runtime.sendMessage({ action: "translation", word: word, language: language }, function (response) {
			$("#languagesToolbar").val(language);
			//$('#translate_tool').removeClass("translation-blink-text");
			$('#itzuliToolbar2 #text_input').val(word);
			$('#itzuliToolbar2 #text_output').val(response.data);

			guardarTraduccion(word,response.data);
		});

	}

	tabAnterior = "";
	
}



function dictionary(text, lang){
	
	$("#languagesToolbar option[data-lit='lit_eu_de'] ").show();
	$("#languagesToolbar option[data-lit='lit_de_eu']").show();
	$("#languagesToolbar option[data-lit='lit_eu_fr']").hide();
	$("#languagesToolbar option[data-lit='lit_fr_eu']").hide();

	var language = "es2eu";

	var storageLang =  localStorage.getItem("lang_dictionary");

	if(storageLang != undefined && storageLang != ""){
		language = storageLang;
	}

	var word = localStorage.getItem("text_" + aLiterals.lit_Dictionary);

	if(tabAnterior != ""){
		word = localStorage.getItem("text_" + tabAnterior);
		language = $('#languagesToolbar').val();
	}


	if($('#text_dictionary').val() != undefined){
		word = $('#text_dictionary').val();

		if((lang != "") || (lang != undefined)){
			language = lang ;
		}
	}
	

	if((text != undefined) && (text != "")){
		word = text;
		if((lang != "") || (lang != undefined)){
			language = lang ;
		}
	}
	if(window.getSelection().toString().trim() != ""){
		word = window.getSelection().toString().trim();
		window.getSelection().empty();

		if((lang != "") || (lang != undefined)){
			language = lang ;
		}
	}

	if (word == "" || word == undefined) {
		return;
	}


	$('#languagesToolbar').val(language);




	var words = ("" + word).split(' ');
	if (words == "undefined") { words = ""; }
	var originlang = language.split("2")[0];
	var destinylang = language.split("2")[1];
	word = word.replaceAll("'","");

	if ((words.length < 4 && words.length != 0 && originlang != 'fr' && destinylang != 'fr') || (originlang == 'de' || destinylang == 'de')) {

		chrome.runtime.sendMessage({ action: "dictionary", word: word, language: language }, function (response) {

			var respDicctionary = DOMPurify.sanitize(response.dataDictionary);

			$('#moreLang').html("");
			if(originlang == "eu"){
				let langEs = document.createElement("a");
				langEs.id = "eu2es";
				langEs.textContent = aLiterals.lit_es;

				let langEn = document.createElement("a");
				langEn.id = "eu2en";
				langEn.textContent = aLiterals.lit_en;

				let langDe = document.createElement("a");
				langDe.id = "eu2de";
				langDe.textContent = aLiterals.lit_de;


				if(destinylang == "es"){
					langEs.style.fontSize = "18px";
					langEs.style.fontWeight = "bold";
				}
				if(destinylang == "en"){
					langEn.style.fontSize = "18px";
					langEn.style.fontWeight = "bold";
				}
				if(destinylang == "de"){
					langDe.style.fontSize = "18px";
					langDe.style.fontWeight = "bold";
				}

				
				$('#moreLang').append(langEs);
				$('#moreLang').append(langEn);
				$('#moreLang').append(langDe);


				$('#eu2es').on('click', function (e) {
					e.preventDefault();
					dictionary(undefined, "eu2es");
				
				});
				$('#eu2en').on('click', function (e) {
					e.preventDefault();
					dictionary(undefined, "eu2en");
				
				});
				$('#eu2de').on('click', function (e) {
					e.preventDefault();
					dictionary(undefined, "eu2de");
				
				});

			}
			else{
				$('#moreLang').html("");
			}


			if (respDicctionary.length == 0) {
				if((originlang != 'de' && destinylang != 'de')){
					exist = false;	

					setCurrent("Traductor");
					createTranslate(language, word);
				}	
				$('#text_dictionary').val(word);
				$('#content-dictionary').html(aLiterals.lit_noResults);
			}
			else {

				localStorage.setItem("text_" + aLiterals.lit_Dictionary, word);
				localStorage.setItem("lang_dictionary", language);
				respDicctionary = respDicctionary.replaceAll("images/gezia_beltza.png", chrome.runtime.getURL("images/gezia_beltza.png"));
				respDicctionary = respDicctionary.replaceAll("images/gezia_txuria.png", chrome.runtime.getURL("images/gezia_txuria.png"));
				respDicctionary = respDicctionary.replaceAll("images/audio.gif", "");

				
				$('#text_dictionary').val(word);
				$('#content-dictionary').html("");

				
				let dictionaryTranslate = document.createElement("div");
				dictionaryTranslate.id = "dictionary-translate";
				dictionaryTranslate.innerHTML = respDicctionary;

				let dictionaryLema = document.createElement("div");
				dictionaryLema.id = "dictionary-lema";

				$('#content-dictionary').append(dictionaryLema);
				$('#content-dictionary').append(dictionaryTranslate);
				
				loadLemas(word, language);
				

			}
		});

	} 
	else{
		if((originlang != 'de' || destinylang != 'de')){
			exist = false;	
			setCurrent("Traductor");
			createTranslate(language, word);	
		}
	}
	
	tabAnterior = aLiterals.lit_Dictionary;

	chrome.runtime.sendMessage({ action: "translation", word: word, language: language }, function (response) {
		guardarTraduccion(word,response.data);
	});
}


function loadLemas(word, language){

	chrome.runtime.sendMessage({ action: "loadLemas", word: word, language: language }, function (response) {


		let data = DOMPurify.sanitize(response.lemas);
		let count = DOMPurify.sanitize(response.count);

		if(count != ""){
			let dictionaryLemaBtn = document.createElement("div");
			dictionaryLemaBtn.id = "dictionary-lema-btn";
			dictionaryLemaBtn.className = "dictionary-lema-btn";
			dictionaryLemaBtn.style.display = "block";
	
			let diccionaryLemaBtnShow = document.createElement("p");
			diccionaryLemaBtnShow.id = "dictionary-lema-btnshow";
			diccionaryLemaBtnShow.className = "dictionary-lema-btnshow";
	
	
			let diccionaryLemaMoreInfo = document.createElement("span");
			diccionaryLemaMoreInfo.className = "more-info";
			diccionaryLemaMoreInfo.textContent = count;
	
			let diccionaryLemaMoreInfoImg = document.createElement("img");
			diccionaryLemaMoreInfoImg.style.marginRight = "0px";
			diccionaryLemaMoreInfoImg.style.width = "20px";
			diccionaryLemaMoreInfoImg.style.height = "20px";
			diccionaryLemaMoreInfoImg.src = chrome.runtime.getURL("images/plus.png");
	
	
			let diccionaryLemaMoreInfoImgArrow = document.createElement("img");
			diccionaryLemaMoreInfoImgArrow.style.verticalAlign = "middle";
			diccionaryLemaMoreInfoImgArrow.style.marginLeft = "10%";
			diccionaryLemaMoreInfoImgArrow.style.marginBottom = "3px";
			diccionaryLemaMoreInfoImgArrow.style.marginRight = "0px";
			diccionaryLemaMoreInfoImgArrow.src = chrome.runtime.getURL("images/arrow-right.png");
			diccionaryLemaMoreInfoImgArrow.style.width = "20px";
			diccionaryLemaMoreInfoImgArrow.style.height = "20px";
	
			diccionaryLemaMoreInfo.appendChild(diccionaryLemaMoreInfoImg);
			diccionaryLemaBtnShow.appendChild(diccionaryLemaMoreInfo);
			diccionaryLemaBtnShow.appendChild(diccionaryLemaMoreInfoImgArrow);
	
			let diccionaryLemaBtnHide = document.createElement("p");
			diccionaryLemaBtnHide.id = "dictionary-lema-btnhide";
			diccionaryLemaBtnHide.className = "dictionary-lema-btnhide";
			diccionaryLemaBtnHide.style.display = "none";
			diccionaryLemaBtnHide.style.height = "30px";
	
	
			let diccionaryLemaArrowLeft = document.createElement("img");
			diccionaryLemaArrowLeft.style.float = "right";
			diccionaryLemaArrowLeft.style.width = "20px";
			diccionaryLemaArrowLeft.style.height = "20px";
			diccionaryLemaArrowLeft.src = chrome.runtime.getURL("images/arrow-left.png");
				
			diccionaryLemaBtnHide.appendChild(diccionaryLemaArrowLeft);
			dictionaryLemaBtn.appendChild(diccionaryLemaBtnShow);
			dictionaryLemaBtn.appendChild(diccionaryLemaBtnHide);
	
	
			let diccionaryLemaDatos = document.createElement("div");
			diccionaryLemaDatos.id = "dictionary-lema-datos";
			diccionaryLemaDatos.style.display = "none";
			diccionaryLemaDatos.innerHTML = data;
	
		
			$('#dictionary-lema').append(dictionaryLemaBtn);
			$('#dictionary-lema').append(diccionaryLemaDatos);
	
		}
		

		$('#dictionary-lema-btnshow').on('click', function () {
			$('#dictionary-lema-datos').show();	
			$('#dictionary-lema-btnshow').hide();
			$('#dictionary-lema-btnhide').show();	
			$('#dictionary-lema').css("width", "250px");
			$('#dictionary-translate').css("width", "94%");
			$('#dictionary-lema-btn').css("width", "30px");
			$('#dictionary-lema-btn').css("float", "right");
		});
		$('#dictionary-lema-btnhide').on('click', function () {
			$('#dictionary-lema-datos').hide();	
			$('#dictionary-lema-btnshow').show();
			$('#dictionary-lema-btnhide').hide();
			$('#dictionary-lema').css("width", "85px");
			$('#dictionary-translate').css("width", "94%");
			$('#dictionary-lema-btn').css("float", "");
			$('#dictionary-lema-btn').css("width", "");
		});


		$('.list-group-item').on('click', function (e) {

			let txt = $('#' + e.target.id).text();
			dictionary(txt, language);
		});
	});


}




function wikipedia(){
	
	var word = localStorage.getItem("text_" + aLiterals.lit_Wikipedia);

	if(tabAnterior != ""){
		word = localStorage.getItem("text_" + tabAnterior);
	}

	if(window.getSelection().toString().trim() != ""){
		word = window.getSelection().toString().trim();
	}
	
	if($('#text_wikipedia').val() != ""){
		word = $('#text_wikipedia').val();
	}

	if (word == "" || word == undefined) {
		return;
	}

	
	$('#text_wikipedia').val(word);
	var language = $("#languagesToolbar").val();

	localStorage.setItem("text_" + aLiterals.lit_Wikipedia, word);
	chrome.runtime.sendMessage({ action: "wikipedia", word: word, language: language}, function (response) {

		$('#content_wikipedia').html("");

		let arr = response.data;
		let resultsCont = response.count;
		var wikiResults = document.createElement("div");
		
		if(resultsCont != undefined){

			arr.forEach(value => {
					
				let wikiResult = document.createElement("div");
				wikiResult.id = "wikipedia_result_" + value.pageid;
				wikiResult.className = "list-group-item active";
				wikiResult.setAttribute("name", "wikipedia_result");
				wikiResult.textContent = value.title;

				wikiResults.appendChild(wikiResult);

			});

			let resultsWiki = document.createElement("div");
			resultsWiki.id = "results-wikipedia";

			let wikiButtons = document.createElement("div");
			wikiButtons.id = "results-wikipedia-buttons";
			wikiButtons.style.width = "5%";

			let wikiButton = document.createElement("div");
			wikiButton.id = "results-wikipedia-btn";
			wikiButton.className = "dictionary-lema-btn";

			let wikiButtonShow = document.createElement("p");
			wikiButtonShow.id = "results-wikipedia-btnshow";
			wikiButtonShow.className = "dictionary-lema-btnshow";
			wikiButtons.style.display = "block";
			wikiButton.style.marginTop = "12px";
			wikiButton.style.marginBottom = "15px";

			let wikiButtonMoreInfo = document.createElement("span");
			wikiButtonMoreInfo.className = "more-info";
			wikiButtonMoreInfo.textContent = resultsCont;

			let wikiButtonMoreInfoImg = document.createElement("img");
			wikiButtonMoreInfoImg.src = chrome.runtime.getURL("images/plus.png");
			wikiButtonMoreInfoImg.style.marginRight = "0px";
			wikiButtonMoreInfoImg.style.width = "20px";
			wikiButtonMoreInfoImg.style.height = "20px";

			let wikiButtonMoreInfoArrow = document.createElement("img");
			wikiButtonMoreInfoArrow.src = chrome.runtime.getURL("images/arrow-right.png");
			wikiButtonMoreInfoArrow.style.verticalAlign = "middle";
			wikiButtonMoreInfoArrow.style.marginLeft = "10%";
			wikiButtonMoreInfoArrow.style.marginBottom = "3px";
			wikiButtonMoreInfoArrow.style.marginRight = "0px";
			wikiButtonMoreInfoArrow.style.width = "20px";
			wikiButtonMoreInfoArrow.style.height = "20px";

			let wikiButtonHide = document.createElement("p");
			wikiButtonHide.id = "results-wikipedia-btnhide";
			wikiButtonHide.className = "dictionary-lema-btnhide";
			wikiButtonHide.style.display = "none";

			let wikiButtonMoreHideImg = document.createElement("img");
			wikiButtonMoreHideImg.src = chrome.runtime.getURL("images/arrow-left.png");
			wikiButtonMoreHideImg.style.marginLeft = "5px";
			wikiButtonMoreHideImg.style.width = "20px";
			wikiButtonMoreHideImg.style.height = "20px";

			let wikiDatos = document.createElement("div");
			wikiDatos.id = "results-wikipedia-datos";
			wikiDatos.style.display = "none";
			//Add content
			wikiDatos.append(wikiResults);

			let wikiDetails = document.createElement("div");
			wikiDetails.id = "details";

			wikiButtonMoreInfo.appendChild(wikiButtonMoreInfoImg);
			wikiButtonShow.appendChild(wikiButtonMoreInfo);
			wikiButtonShow.appendChild(wikiButtonMoreInfoArrow);
			wikiButton.appendChild(wikiButtonShow);
			wikiButtonHide.appendChild(wikiButtonMoreHideImg);
			wikiButton.appendChild(wikiButtonHide);

			wikiButtons.appendChild(wikiButton);

			resultsWiki.appendChild(wikiDatos)
			resultsWiki.appendChild(wikiButtons)
			$('#content_wikipedia').append(resultsWiki);
			$('#content_wikipedia').append(wikiDetails);

			$('#results-wikipedia-btnshow').on('click', function () {
				$('#results-wikipedia-datos').show();
				$('#results-wikipedia-btnshow').hide();
				$('#results-wikipedia-btnhide').show();
				$('#results-wikipedia-buttons').css("width", "5%");
				$('#dictionary-translate').css("width", "100%");
				$('#results-wikipedia-btn').css("float", "right");
				$('#results-wikipedia-btn').css("width", "100%");
			});

			$('#results-wikipedia-btnhide').on('click', function () {
				$('#results-wikipedia-datos').hide();
				$('#results-wikipedia-btnshow').show();
				$('#results-wikipedia-btnhide').hide();
				$('#results-wikipedia-buttons').css("width", "85px");
				$('#dictionary-translate').css("width", "100%");
				$('#results-wikipedia-btn').css("float", "");
				$('#results-wikipedia-btn').css("width", "");
			});


			
			$('[name=wikipedia_result]').on('click', function (e) {
				chrome.runtime.sendMessage({ action: "showDetail_wikipedia", word: $('#' + e.target.id).text()}, function (response) {
					
					$('#details').html("");
					let data = response.data;

					
					var text = JSON.stringify(data);
					var iniPageid = text.indexOf("pageid",0) + 8;
					var pageid = text.substring (iniPageid, text.indexOf(",", iniPageid));
					
					var showtext = DOMPurify.sanitize(data.query.pages[pageid].extract);
					showtext = showtext.replace (/<p><br><\/p>\n/g, "");
			
			
					let titleWikipedia = document.createElement("div");
					titleWikipedia.id = "titleWikipedia";

					let titleWikipediaH1 = document.createElement("h1");
					titleWikipediaH1.textContent =  data.query.pages[pageid].title;

					let titleWikipediaBr = document.createElement("br");

					titleWikipedia.appendChild(titleWikipediaH1);
					titleWikipedia.appendChild(titleWikipediaBr);


					let detailsWikipedia = document.createElement("div");
					detailsWikipedia.id = "details-wikipedia";
					detailsWikipedia.innerHTML = showtext;

					/*let detailsWikipediaBr = document.createElement("br");

					detailsWikipedia.appendChild(detailsWikipediaBr); */


					let footerWikipedia = document.createElement("div");
					footerWikipedia.id = "footer-wikipedia";

					let footerWikipediaCenterDiv = document.createElement("div");
					footerWikipediaCenterDiv.className = "centered-container";

					let footerWikipediaMoreInfo = document.createElement("a");
					footerWikipediaMoreInfo.className = "link link--arrowed";
					footerWikipediaMoreInfo.href = "https://eu.wikipedia.org/?curid=" + pageid;
					footerWikipediaMoreInfo.target = "_blank";
					footerWikipediaMoreInfo.textContent = aLiterals.lit_InfoWikipedia;


					var footer_wikipedia_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					footer_wikipedia_svg.classList.add("arrow-icon");
					footer_wikipedia_svg.setAttributeNS(null, 'viewBox', '0 0 32 15');
					footer_wikipedia_svg.setAttributeNS(null, 'height', '25');
					footer_wikipedia_svg.setAttributeNS(null, 'width', '25');

					var footer_wikipedia_svg_g = document.createElementNS("http://www.w3.org/2000/svg", "g");
					footer_wikipedia_svg_g.setAttributeNS(null, 'fill', 'none');
					footer_wikipedia_svg_g.setAttributeNS(null, 'stroke', '#1472a4');
					footer_wikipedia_svg_g.setAttributeNS(null, 'stroke-linejoin', 'round');
					footer_wikipedia_svg_g.setAttributeNS(null, 'stroke-miterlimit', '10');
					footer_wikipedia_svg_g.setAttributeNS(null, 'stroke-width', '1.5');

					var footer_wikipedia_svg_g_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
					footer_wikipedia_svg_g_path.classList.add("arrow-icon--arrow");
					footer_wikipedia_svg_g_path.setAttributeNS(null, 'd', 'M 16.14 9.93 L 22.21 16 l -6.07 6.07 M 8.23 16 h 13.98');

					footer_wikipedia_svg_g.appendChild(footer_wikipedia_svg_g_path);
					footer_wikipedia_svg.appendChild(footer_wikipedia_svg_g);
					footerWikipediaMoreInfo.appendChild(footer_wikipedia_svg);
					footerWikipediaCenterDiv.appendChild(footerWikipediaMoreInfo);

					footerWikipedia.appendChild(footerWikipediaCenterDiv);

					
					$('#footerWikipedia').append(titleWikipedia);
					$('#details').append(detailsWikipedia);
					$('#details').append(footerWikipedia);
					
					
					$('#results-wikipedia-btnhide').click();


				});

			
			});


			let btnshow = document.getElementById("results-wikipedia-btnshow");
			
			let equal = false;
			let elements = document.getElementsByClassName("list-group-item active");
			Array.prototype.forEach.call(elements, function(element) {

				if((element.innerHTML+"").toLowerCase() == word.toLowerCase()){
					equal = true;
					$('#'+element.id+"").click();
					
				}

			});

			if((!equal) && (btnshow != null)){

				$('#results-wikipedia-btnshow').click();
			}
		}
		else{
			let html = arr.query.pages;
			let keys = Object.keys(html);
			html = arr.query.pages[keys[0]].extract;
			$('#content_wikipedia').html(DOMPurify.sanitize(html));

		}

	});
	
	tabAnterior = aLiterals.lit_Wikipedia;
}




function definition(){

	var word = localStorage.getItem("text_" + aLiterals.lit_Definition);

	if(tabAnterior != ""){
		word = localStorage.getItem("text_" + tabAnterior);
	}

	if(window.getSelection().toString().trim() != ""){
		word = window.getSelection().toString().trim();

	}

	if($('#text_definition').val() != ""){
		word = $('#text_definition').val();

	}

	if (word == "" || word == undefined) {
		return;
	}

	
	$('#text_definition').val(word);
	var language = $("#languagesToolbar").val();

	localStorage.setItem("text_" + aLiterals.lit_Definition, word);
	word = word.toLocaleLowerCase();
	chrome.runtime.sendMessage({ action: "definition", word: word, language: language}, function (response) {

		$('#panel_definition').html("");

		let result = DOMPurify.sanitize(response.data);

		if(result.includes("noResults")){
			definitionResult = false;

		}
		else{
			definitionResult = true;

		}

		let content_definition =  document.createElement("div");
		content_definition.id = "content_definition";

		let fuente =  document.createElement("p");
		fuente.id = "fuente_definition";

		//if(!result.includes("noResults")){
			content_definition.innerHTML = result;
			fuente.innerHTML = aLiterals.lit_Fuente_Definition;
		//}
		
		
		content_definition.appendChild(fuente);

		$('#panel_definition').append(content_definition);
		

		//loadDefinitionLemas(word);
	});

	tabAnterior = aLiterals.lit_Definition;
}


function synonyms(){

	var word = localStorage.getItem("text_" + aLiterals.lit_Synonyms);

	if(tabAnterior != ""){
		word = localStorage.getItem("text_" + tabAnterior);
	}


	if(window.getSelection().toString().trim() != ""){
		word = window.getSelection().toString().trim();
	}

	if($('#text_synonyms').val() != ""){
		word = $('#text_synonyms').val();
	}

	if (word == "" || word == undefined) {
		return;
	}
	
	localStorage.setItem("text_" + aLiterals.lit_Synonyms, word);
	$('#text_synonyms').val(word);
	
	var language = $("#languagesToolbar").val();
	
	chrome.runtime.sendMessage({ action: "synonyms", word: word, language: language}, function (response) {
		$('#panel_synonyms').html("");
	
		let content_synonyms =  document.createElement("div");
		content_synonyms.id = "content_synonyms";
		content_synonyms.innerHTML = DOMPurify.sanitize(response.data);
		 
		$('#panel_synonyms').append(content_synonyms);


		//Fuente
		let fuente = document.createElement("p");
		fuente.id = "fuente_synonyms";
		fuente.innerHTML = aLiterals.lit_fuenteSynonyms;

		$('#panel_synonyms').append(fuente);
		
	});

	tabAnterior = aLiterals.lit_Synonyms;
}



function loadDefinitionLemas(word){

	chrome.runtime.sendMessage({ action: "loadDefinitionLemas", word: word}, function (response) {

		let data = DOMPurify.sanitize(response.data);
		let count = DOMPurify.sanitize(response.count);

		if(count != "0" && count != ""){


			let resultsDefinition = document.createElement("div");
			resultsDefinition.id = "results-definition";
	
			let resultsDefinitionButtons = document.createElement("div");
			resultsDefinitionButtons.id = "results-definition-buttons";
	
			let resultsDefinitionBtn = document.createElement("div");
			resultsDefinitionBtn.id = "results-definition-btn";
			resultsDefinitionBtn.className = "dictionary-lema-btn";
	
			let resultsDefinitionBtnShow = document.createElement("p");
			resultsDefinitionBtnShow.id = "results-definition-btnshow";
			resultsDefinitionBtnShow.className = "dictionary-lema-btnshow";
	
			let resultsDefinitionMoreInfo = document.createElement("span");
			resultsDefinitionMoreInfo.className = "more-info";
			resultsDefinitionMoreInfo.textContent = count;
	
			let resultsDefinitionMoreInfoImg = document.createElement("img");
			resultsDefinitionMoreInfoImg.style.marginRight = "0px";
			resultsDefinitionMoreInfoImg.style.width = "20px";
			resultsDefinitionMoreInfoImg.style.height = "20px";
			resultsDefinitionMoreInfoImg.src = chrome.runtime.getURL("images/plus.png");
	
	
			let resultsDefinitionMoreInfoImgArrow = document.createElement("img");
			resultsDefinitionMoreInfoImgArrow.style.verticalAlign = "middle";
			resultsDefinitionMoreInfoImgArrow.style.marginLeft = "10%";
			resultsDefinitionMoreInfoImgArrow.style.marginBottom = "3px";
			resultsDefinitionMoreInfoImgArrow.style.marginRight = "0px";
			resultsDefinitionMoreInfoImgArrow.src = chrome.runtime.getURL("images/arrow-right.png");
			resultsDefinitionMoreInfoImgArrow.style.width = "20px";
			resultsDefinitionMoreInfoImgArrow.style.height = "20px";

	
			resultsDefinitionMoreInfo.appendChild(resultsDefinitionMoreInfoImg);
			resultsDefinitionBtnShow.appendChild(resultsDefinitionMoreInfo);
			resultsDefinitionBtnShow.appendChild(resultsDefinitionMoreInfoImgArrow);
	
	
			let resultsDefinitionBtnHide = document.createElement("p");
			resultsDefinitionBtnHide.id = "results-definition-btnhide";
			resultsDefinitionBtnHide.className = "dictionary-lema-btnhide";
			resultsDefinitionBtnHide.style.display = "none";
			resultsDefinitionBtnHide.style.height = "16px";
	
			let resultsDefinitionMoreInfoImgArrowLeft = document.createElement("img");
			resultsDefinitionMoreInfoImgArrowLeft.style.float = "right";
			resultsDefinitionMoreInfoImgArrowLeft.style.width = "20px";
			resultsDefinitionMoreInfoImgArrowLeft.style.height = "20px";
			resultsDefinitionMoreInfoImgArrowLeft.src = chrome.runtime.getURL("images/arrow-left.png");
				
			resultsDefinitionBtnHide.appendChild(resultsDefinitionMoreInfoImgArrowLeft);
			resultsDefinitionBtn.appendChild(resultsDefinitionBtnShow);
			resultsDefinitionBtn.appendChild(resultsDefinitionBtnHide);
	
	
			let resultsDefinitionDatos = document.createElement("div");
			resultsDefinitionDatos.id = "results-definition-datos";
			resultsDefinitionDatos.style.display = "none";
			resultsDefinitionDatos.innerHTML = data;
	
		
			resultsDefinitionButtons.appendChild(resultsDefinitionBtn);
			resultsDefinition.appendChild(resultsDefinitionDatos);
			resultsDefinition.appendChild(resultsDefinitionButtons);
	
			if($("#results-definition-buttons").length){
				$("#results-definition-buttons").remove();
			}
	
			$('#content_definition').before(resultsDefinition);
	
	
			$('#results-definition-btnshow').on('click', function () {
				$('#results-definition-datos').show();
				$('#results-definition-btnshow').hide();
				$('#results-definition-btnhide').show();
				$('#results-definition-buttons').css("width", "5%");
				$('#dictionary-translate').css("width", "100%");
				$('#results-definition-btn').css("float", "right");
				$('#results-definition-btn').css("width", "100%");
			});
	
			$('#results-definition-btnhide').on('click', function () {
				$('#results-definition-datos').hide();
				$('#results-definition-btnshow').show();
				$('#results-definition-btnhide').hide();
				$('#results-definition-buttons').css("width", "85px");
				$('#dictionary-translate').css("width", "100%");
				$('#results-definition-btn').css("float", "");
				$('#results-definition-btn').css("width", "");
			});
	
			$('.list-group-item').on('click', function (e) {
	
				let txt = $('#' + e.target.id).text();
				$('#text_definition').val(txt);
				definition();
			});	
	
			let numLemas = $('.list-group-item').length;
	
			if(numLemas == 1 && definitionResult == false){
	
				$('.list-group-item')[0].click();
	
			}


		}
		else{
			let content_definition =  document.createElement("div");
			content_definition.id = "content_definition";
			content_definition.textContent = aLiterals.lit_noResults;

			let fuente =  document.createElement("p");
			fuente.id = "fuente_definition";
			fuente.innerHTML = aLiterals.lit_Fuente_Definition;
			
			content_definition.appendChild(fuente);
			$('#panel_definition').append(content_definition);
		}

	});

}




function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}



function loadInterfaceLiterals() {
	var navigatorLanguage = navigator.language.split("-")[0];
	var properties = "";
	properties = "/properties/properties_eu.inc";

	/*if (navigatorLanguage == "eu" || navigatorLanguage == "es" || navigatorLanguage == "fr" || navigatorLanguage == "en" || navigatorLanguage == "de") {
		properties = "/properties/properties_" + navigatorLanguage + ".inc";
	} else {
		properties = "/properties/properties_eu.inc";
	}*/

	$.getJSON(chrome.runtime.getURL(properties), function (data) {

		$.each(data, function (key, val) {
			aLiterals[key] = val;

			chrome.runtime.sendMessage({ action: "literals", literals: aLiterals}, function (response) {
			});

		});
		loadLiteals();
	});


	loadLanguageToolbar();
}



function loadLiteals(){

	$.each(aLiterals, function (key, val) {

		$('[data-lit=' + key + ']').each(function () {
			$(this).html(val);
		});
		$('[title=' + key + ']').each(function () {
			$(this).prop('title', val);
		});
	});


}



function destroyToolbar() {
	document.getElementsByTagName('body')[0].removeChild(document.getElementById('itzuliToolbar'));
	var toolbar = document.getElementById("itzuliToolbar2");

	if (toolbar != null) {
		destroyToolbar2();
	}

}



function destroyToolbar2() {
	setCurrent(" ");
	
	$("#itzuliToolbar2 ").remove();

}



function loadLanguageToolbar() {
	var localLanguage = document.getElementsByTagName("html")[0].getAttribute("lang");
	if(localLanguage != null && localLanguage.trim() != ""){
		localLanguage = localLanguage.split("-")[0];
		if (localLanguage != "eu") {
			$('#languagesToolbar').val(localLanguage + "2eu");
		} else {
			$('#languagesToolbar').val("eu2es");
		}
	}
	else {
		$('#languagesToolbar').val("es2eu");
	}

}



function saveInGlossary(text, definition, reload){

	let word = text;
	if((word == "") || (word == undefined)){
		word = window.getSelection().toString().trim().toLowerCase();
	}

	chrome.storage.local.get(['glossary'], function(result) {
		if(glossaryArr.length == 0){
			if(result.glossary != undefined){

				glossaryArr = JSON.parse(result.glossary);
	
			}
		}
		
		
		
		let exist = false;
		glossaryArr.forEach(element => {

			if(element["word"] == word){
			
				if(definition != undefined && definition != element["definition"]){
					element["definition"] = definition;
				}
				exist = true;
			}


		});

		if(!exist){

			let arr = {};
			arr["word"] = word.toLowerCase();

			if(definition == undefined){
				arr["definition"] = "";
			}
			else{
				arr["definition"] = definition;
			}
			
			glossaryArr.push(arr);

		}
		

		chrome.storage.local.set({"glossary": JSON.stringify(glossaryArr) });
		
		//Reload Page
		if(reload != false){
			loadGlossary();
		}
		
	});
	
}


function loadGlossary(search){
	
	if(!$('#itzuliToolbar2').length){
		createToolbar2();
	}

	$.get(chrome.runtime.getURL('glosario.html'), function (html_string) {

		$('#itzuliToolbar2').html(html_string);
		setCurrent("Glosario-icon");

		let glossary;

		chrome.storage.local.get(['glossary'], function(result) {
			if(result.glossary != undefined){
				glossary = JSON.parse(result.glossary);
		 
				let content = document.createElement("div")
				content.className = "content_glosario";
				let definitionDivs = document.createElement("div");

				let cont = 1;
				if(glossary != null && glossary.length > 0){
					glossary.forEach(element => {
						
						if(element["definition"] != "" ){
							
							let p = document.createElement("p");
							p.className = "glossaryWord hasDefinition";
							p.id = element["word"].replaceAll(" ", "_").replaceAll("(","-").replaceAll(")","-").replaceAll(",","");
							
							let text = element["word"];
							if(text.indexOf("(") != -1){
								text = text.substring(0, text.indexOf("("));
							}
							p.textContent = text.charAt(0).toUpperCase() + text.slice(1);

							let img = document.createElement("img");
							img.className = "glossaryImg";
							img.src = chrome.runtime.getURL("images/flecha-abajo.png"); 

							p.appendChild(img);
							content.appendChild(p);
						
						
							let definitionDiv = document.createElement("div");
							definitionDiv.className = "glossaryDefinition";
							definitionDiv.id = element["word"].replaceAll(" ", "_").replaceAll("(","-").replaceAll(")","-").replaceAll(",","") + "Definition";
							definitionDiv.style.display = "none";
							definitionDiv.innerHTML = DOMPurify.sanitize(element["definition"]);
							definitionDivs.appendChild(definitionDiv);
					
						
						}
						else{
							let p = document.createElement("p");
							p.className = "glossaryWord";
							p.textContent = element["word"].charAt(0).toUpperCase() + element["word"].slice(1);
							content.appendChild(p);

						}
							
						if(cont == 3){
							$('#content_glosario').append(content);
							$('#content_glosario').append(definitionDivs);
							content = document.createElement("div");
							content.className = "content_glosario";
							definitionDivs = document.createElement("div");


							cont = 0;
						}

						cont++;

					});

					if(cont != 0){
						$('#content_glosario').append(content);
						$('#content_glosario').append(definitionDivs);

					}


					let hasDefinitionElements = document.getElementsByClassName("hasDefinition");

					for(let e of hasDefinitionElements) {
						e.addEventListener("click", function() {
							
							if($("#" + e.id + "Definition").is(':visible')){
								$("#" + e.id + "Definition").hide();
								let img = $("#" + e.id ).find("img");
								img.attr("src", chrome.runtime.getURL("images/flecha-abajo.png")); 
							}
							else{
								$("#" + e.id + "Definition").show();
								let img = $("#" + e.id ).find("img");
								img.attr("src", chrome.runtime.getURL("images/flecha-arriba.png")); 
							}
							for(let i of hasDefinitionElements) {
								if(i.id != e.id){
									$("#" + i.id + "Definition").hide();
									let img = $("#" + i.id ).find("img");
									img.attr("src", chrome.runtime.getURL("images/flecha-abajo.png")); 
								}

							}
				
						});

					}
				
				}
			}
			
			if(search){
				searchInGlossary();

			}

		});


		$('#closeToolbar2').on('click', function () {
			destroyToolbar2();
		});


		chrome.storage.local.get(['fix'], function(result) {

			if(result.fix == "true"){
				$("#pinToolbar svg path").css("fill", "#a52424");
			}

		});

		$('#pinToolbar').on('click', function () {
			
			chrome.storage.local.get(['fix'], function(result) {
				if(result.fix != "true"){
					chrome.storage.local.set({"fix": "true" });
					$("#pinToolbar svg path").css("fill", "#a52424");
				}
				else{
					chrome.storage.local.set({"fix": "false" });
					$("#pinToolbar svg path").css("fill", "black");
				}

			});

		});

		$('#search_glosario').on('focusin', function () {
			$("#Buscar-icon").attr("fill", "#2BB88B");
		});
		$('#search_glosario').on('focusout', function () {
			$("#Buscar-icon").attr("fill", "#000000");
		});
		$('#search_glosario').on('click', function () {

			searchInGlossary();

		});


		$('#addToGlossary').on('focusin', function () {
			$("#Glosario-icon2").attr("fill", "#2BB88B");
		});
		$('#addToGlossary').on('focusout', function () {
			$("#Glosario-icon2").attr("fill", "#000000");
		});
		$('#addToGlossary').on('click', function () {

			let word = $('#text_glosario').val().trim();
			if(word != "" &&  word.replaceAll(" ", "") != ""){
				saveInGlossary(word);
			}
			
		});


		$('#clean_glosario').on('focusin', function () {
			$("#Borrar-icon").attr("fill", "#2BB88B");
		});
		$('#clean_glosario').on('focusout', function () {
			$("#Borrar-icon").attr("fill", "#000000");
		});
		$('#clean_glosario').on('click', function () {

			if (confirm(aLiterals.lit_Delete_Glossary)){
				glossaryArr = [];
				$('#content_glosario').html("");
				chrome.storage.local.clear(function() {
					let error = chrome.runtime.lastError;
					if (error) {
						console.log(error);
					}

				});
			}
			
		});
		

		$('#copy').on('focusin', function () {
			$("#Copiar-icon").attr("fill", "#2BB88B");
		});
		$('#copy').on('focusout', function () {
			$("#Copiar-icon").attr("fill", "#000000");
		});
		$('#copy').on('click', function () {
			window.getSelection()
			.selectAllChildren(
			  document.getElementById("content_glosario") 
			);
			document.execCommand("copy");
		});




		$('#download').on('focusin', function () {
			$("#Export").attr("fill", "#2BB88B");
		});
		$('#download').on('focusout', function () {
			$("#Export").attr("fill", "#000000");
		});
		$('#download').on('click', function () {

			let text = "<style> li{ list-style-type: none; margin-top: 10px;} .text-blue{ margin-right: 0.5rem !important; color: rgb(20, 114, 164) !important;}"+
				".text-decoration-none {text-decoration: none !important;}  .text-black {color: black !important;</style>";

			let elements = $('.glossaryWord');
			if(elements.length > 0){

				for (let i=0;i<elements.length; i++){
					if (elements[i].classList.contains("hasDefinition")){
						let definitionID = elements[i].id + "Definition";
						let elementDefinition = document.getElementById(definitionID);
		
						if(i > 0){
							text += "<h2 style='margin-top: 50px;font-size: 32px'>" + elements[i].innerText + "</h2> ";
						}else{
							text += "<h2 style='font-size: 32px'>" + elements[i].innerText + "</h2> ";
						}

						let def = elementDefinition.innerHTML.replaceAll("<h2>", "<h3>");
						def = def.replaceAll("</h2>", "</h3>");

						text += def ;
	
					}
					else{
						text += elements[i].innerText;
	
					}
				}
				text = text.replaceAll("—", " ");

				generatePDF(text, "glossary");

			}

		});


		$("#itzuliToolbar2 ").draggable({ handle: $("#toolbarHeader"), opacity: 0.5 });

		loadLiteals();

	});


}


function searchInGlossary(){

	if(!$('#itzuliToolbar2').length){
		createToolbar2();
		loadGlossary(true);
	}
	else{

		var word = window.getSelection().toString().trim();

		if (word == "" || word == undefined) {
	
			if($('#text_glosario').val() == ""){
				return;
			}
			else{
				word = $('#text_glosario').val().trim();
				
			}
	
		}
	
	
		$('#text_glosario').val(word);
		let elements = $('.glossaryWord');
		for (let i=0; i<elements.length; i++){
			if(word.toUpperCase() == elements[i].innerText.toUpperCase()){
				window.getSelection()
				.selectAllChildren(
					elements[i] 
				);
			}
				
		}
	
	}


}


function onlyText(){

	if(!$('#itzuliToolbar2').length){
		createToolbar2();
	}
	
	var elems = $("main h1, main h2, main h3, main h4, main h5, main h6, main p, main a, main em, main small, main li").not("#itzuliToolbar2 h1, #itzuliToolbar2 h2, #itzuliToolbar2 h3, #itzuliToolbar2 h4, #itzuliToolbar2 h5, #itzuliToolbar2 h6, #itzuliToolbar2 p, #itzuliToolbar2 em, #itzuliToolbar2 small, #itzuliToolbar2 li, #itzuliToolbar p");

	$.get(chrome.runtime.getURL('extraerTexto.html'), function (html_string) {

		$('#itzuliToolbar2').html(html_string);

		setCurrent("Extraer-texto-icon");
		
		var quill = new Quill('#onlyText_content', {
			theme: 'bubble'  // snow or 'bubble'
		});
		
		let div = document.createElement("div");

	
		let textAnt = "";
		for(let i=0;i<elems.length;i++){

			if(textAnt != elems[i].innerText){

				let txt = elems[i].innerText.replaceAll("“","'").replaceAll("”","'");
				if( txt.trim() != ""){
					if(elems[i].tagName == "LI" || elems[i].tagName == "A" ){
						let p = document.createElement("p");
						p.appendChild(document.createTextNode(txt));
						div.appendChild(p);
					}
					else{
						let tag = document.createElement(elems[i].tagName);
						tag.appendChild(document.createTextNode(txt));
						div.appendChild(tag);
					}
				}
		
			}
		
			textAnt = elems[i].innerText;
		}
	
		$('#onlyText_content').html(div);



		$('#closeToolbar2').on('click', function () {
			destroyToolbar2();
		});


		chrome.storage.local.get(['fix'], function(result) {

			if(result.fix == "true"){
				$("#pinToolbar svg path").css("fill", "#a52424");
			}

		});

		$('#pinToolbar').on('click', function () {
			
			chrome.storage.local.get(['fix'], function(result) {
				if(result.fix != "true"){
					chrome.storage.local.set({"fix": "true" });
					$("#pinToolbar svg path").css("fill", "#a52424");
				}
				else{
					chrome.storage.local.set({"fix": "false" });
					$("#pinToolbar svg path").css("fill", "black");
				}

			});

		});


		$('#play_onlyText').on('click', function () {
			let text = document.getElementById('onlyText_content').innerText;
			audio("onlyText", text);
		});

		$('#pause_onlyText').on('click', function () {
			audio_input_tool.pause();
			
			$('#play_onlyText').removeClass("noDisplay");
			$('#play_onlyText').prop('disabled', false);
			$('#pause_onlyText').addClass("noDisplay");
		});
		

		$('#translate').on('click', function () {
			setCurrent("Traductor");

			let texto = "";

			if(window.getSelection().toString().trim() != ""){
				texto = window.getSelection().toString().substring(0, 4000).trim();
			}
			else{
				texto = document.getElementById('onlyText_content').innerText.substring(0, 4000);
			}
			
			createTranslate(undefined, texto);
		});
		
		$('#copyOnlyText').on('focusin', function () {
			$("#Copiar-icon").attr("fill", "#2BB88B");
		});
		$('#copyOnlyText').on('focusout', function () {
			$("#Copiar-icon").attr("fill", "#000000");
		});
		$('#copyOnlyText').on('click', function () {

			window.getSelection().selectAllChildren(
					document.getElementById("onlyText_content") 
			);
			document.execCommand("copy");
		});

		$('#downloadOnlyText').on('focusin', function () {
			$("#Export").attr("fill", "#2BB88B");
		});
		$('#downloadOnlyText').on('focusout', function () {
			$("#Export").attr("fill", "#000000");
		});
		$('#downloadOnlyText').on('click', function () {
			generatePDF($("#onlyText_content")[0].innerHTML, "onlyText");

		});


		$("#itzuliToolbar2 ").draggable({ handle: $("#toolbarHeader"),opacity: 0.5 });

		loadLiteals();
	});


}


function underline(color, name){
	
	if($('#itzuliToolbar2').length && !$('#section-underline').length){
		destroyToolbar2();
	}


	if (name == "blue"){
		var blue = rangy.createClassApplier("underlineBlue", {
			tagNames: ["span", "a", "b", "img"]
		});

		blue.toggleSelection();
		$('.underlineBlue').css('background-color', color);
	}

	if (name == "yellow"){
		var yellow = rangy.createClassApplier("underlineYellow", {
			tagNames: ["span", "a", "b", "img"]
		});

		yellow.toggleSelection();
		$('.underlineYellow').css('background-color', color);
	}
	
	if (name == "green"){
		var green = rangy.createClassApplier("underlineGreen", {
			tagNames: ["span", "a", "b", "img"]
		});

		green.toggleSelection();
		$('.underlineGreen').css('background-color', color);
	}
	
	if (name == "red"){
		var red = rangy.createClassApplier("underlineRed", {
			tagNames: ["span", "a", "b", "img"]
		});

		red.toggleSelection();
		$('.underlineRed').css('background-color', color);
	}


}


function viewUnderline(){

	if(!$('#itzuliToolbar2').length){
		createToolbar2();
	}

	let blueElements = document.getElementsByClassName("underlineBlue");
	let yellowElements = document.getElementsByClassName("underlineYellow");
	let greenElements = document.getElementsByClassName("underlineGreen");
	let redElements = document.getElementsByClassName("underlineRed");

	$.get(chrome.runtime.getURL('subrayado.html'), function (html_string) {

		$('#itzuliToolbar2').html(html_string);


		if(blueElements.length > 0){

			let blueElementsDiv = document.createElement("div");
			let st = blueElementsDiv.style;
			st.marginBottom = "35px";

			for (let i=0; i<blueElements.length; i++){
				let p = document.createElement("p");
				p.appendChild(blueElements[i].cloneNode(true));
				blueElementsDiv.appendChild(p);
			}

			$('#underline_content').append(blueElementsDiv);

		}

		if(yellowElements.length > 0){

			let yellowElementsDiv = document.createElement("div");
			let st = yellowElementsDiv.style;
			st.marginBottom = "35px";

			for (let i=0; i<yellowElements.length; i++){
				let p = document.createElement("p");
				p.appendChild(yellowElements[i].cloneNode(true));
				yellowElementsDiv.appendChild(p);
			}

			$('#underline_content').append(yellowElementsDiv);

		}

		if(greenElements.length > 0){

			let greenElementsDiv = document.createElement("div");
			let st = greenElementsDiv.style;
			st.marginBottom = "35px";

			for (let i=0; i<greenElements.length; i++){
				let p = document.createElement("p");
				p.appendChild(greenElements[i].cloneNode(true));
				greenElementsDiv.appendChild(p);
			}

			$('#underline_content').append(greenElementsDiv);

		}

		if(redElements.length > 0){

			let redElementsDiv = document.createElement("div");
			let st = redElementsDiv.style;
			st.marginBottom = "35px";

			for (let i=0; i<redElements.length; i++){
				let p = document.createElement("p");
				p.appendChild(redElements[i].cloneNode(true));
				redElementsDiv.appendChild(p);
			}

			$('#underline_content').append(redElementsDiv);

		}

		$('#closeToolbar2').on('click', function () {
			destroyToolbar2();
		});


		chrome.storage.local.get(['fix'], function(result) {

			if(result.fix == "true"){
				$("#pinToolbar svg path").css("fill", "#a52424");
			}

		});

		$('#pinToolbar').on('click', function () {
			
			chrome.storage.local.get(['fix'], function(result) {
				if(result.fix != "true"){
					chrome.storage.local.set({"fix": "true" });
					$("#pinToolbar svg path").css("fill", "#a52424");
				}
				else{
					chrome.storage.local.set({"fix": "false" });
					$("#pinToolbar svg path").css("fill", "black");
				}

			});

		});

		$('#play_underline').on('click', function () {
			let text = document.getElementById('underline_content').innerText;
			audio("underline", text);
		});

		$('#pause_underline').on('click', function () {
			audio_input_tool.pause();
			
			$('#play_underline').removeClass("noDisplay");
			$('#play_underline').prop('disabled', false);
			$('#pause_underline').addClass("noDisplay");
		});
		

		$('#copyUnderlineText').on('focusin', function () {
			$("#Copiar-icon").attr("fill", "#2BB88B");
		});
		$('#copyUnderlineText').on('focusout', function () {
			$("#Copiar-icon").attr("fill", "#000000");
		});
		$('#copyUnderlineText').on('click', function () {
			window.getSelection()
			.selectAllChildren(
			  document.getElementById("underline_content") 
			);
			document.execCommand("copy");
		});

		$('#downloadUnderline').on('focusin', function () {
			$("#Export").attr("fill", "#2BB88B");
		});
		$('#downloadUnderline').on('focusout', function () {
			$("#Export").attr("fill", "#000000");
		});
		$('#downloadUnderline').on('click', function () {
			generatePDF($("#underline_content").html(), "underline");
		});


		$("#itzuliToolbar2 ").draggable({ handle: $("#toolbarHeader"),opacity: 0.5 });


		loadLiteals();
	});


}



function loadInfo(scrollTop, lang){

	if(!$('#itzuliToolbar2').length){
		createToolbar2();
	}

	$.get(chrome.runtime.getURL('informacion.html'), function (html_string) {

		$.each(aLiterals, function (key, val) {
			html_string = html_string.replace(key, val);

		});
		html_string = html_string.replaceAll("imgTraducir", chrome.runtime.getURL("images/imgTraducir.png"));
		html_string = html_string.replaceAll("iconoTraducir", chrome.runtime.getURL("images/iconoTraducir.png"));
		html_string = html_string.replaceAll("iconoTranslate", chrome.runtime.getURL("images/iconoTranslate.png"));
		html_string = html_string.replaceAll("iconoTranscriptor", chrome.runtime.getURL("images/iconoTranscriptor.png"));
		html_string = html_string.replaceAll("iconoSistesisVoz", chrome.runtime.getURL("images/iconoSistesisVoz.png"));
		html_string = html_string.replaceAll("iconoPapelera", chrome.runtime.getURL("images/iconoPapelera.png"));
		html_string = html_string.replaceAll("iconoWeb", chrome.runtime.getURL("images/iconoWeb.png"));
		html_string = html_string.replaceAll("iconoCopiar", chrome.runtime.getURL("images/iconoCopiar.png"));
		html_string = html_string.replaceAll("iconoDescargar", chrome.runtime.getURL("images/iconoDescargar.png"));
		html_string = html_string.replaceAll("imgDiccionario", chrome.runtime.getURL("images/imgDiccionario.png"));
		html_string = html_string.replaceAll("icoBuscar", chrome.runtime.getURL("images/icoBuscar.png"));
		html_string = html_string.replaceAll("icoGlosario", chrome.runtime.getURL("images/icoGlosario.png"));
		html_string = html_string.replaceAll("icoPalabrasCoincidentes", chrome.runtime.getURL("images/icoPalabrasCoincidentes.png"));
		html_string = html_string.replaceAll("icoCambiarDiccionario", chrome.runtime.getURL("images/icoCambiarDiccionario.png"));
		html_string = html_string.replaceAll("imgEuskalterm", chrome.runtime.getURL("images/imgEuskalterm.png"));
		html_string = html_string.replaceAll("imgWikipedia", chrome.runtime.getURL("images/imgWikipedia.png"));
		html_string = html_string.replaceAll("icoMasWikipedia", chrome.runtime.getURL("images/icoMasWikipedia.png"));
		html_string = html_string.replaceAll("imgDefiniciones", chrome.runtime.getURL("images/imgDefiniciones.png"));
		html_string = html_string.replaceAll("imgSinonimos", chrome.runtime.getURL("images/imgSinonimos.png"));
		html_string = html_string.replaceAll("imgGlosario", chrome.runtime.getURL("images/imgGlosario.png"));
		html_string = html_string.replaceAll("iconoImportar", chrome.runtime.getURL("images/iconoImportar.png"));
		html_string = html_string.replaceAll("imgExtraerTexto", chrome.runtime.getURL("images/imgExtraerTexto.png"));
		html_string = html_string.replaceAll("imgSubrayado", chrome.runtime.getURL("images/imgSubrayado.png"));
		html_string = html_string.replaceAll("icoVerSubrayados", chrome.runtime.getURL("images/icoVerSubrayados.png"));

		
		
		$('#itzuliToolbar2').html(html_string);
		document.getElementById("langEU").style.fontWeight = "bold";

		$('#closeToolbar2').on('click', function () {
			destroyToolbar2();
		});


		chrome.storage.local.get(['fix'], function(result) {

			if(result.fix == "true"){
				$("#pinToolbar svg path").css("fill", "#a52424");
			}

		});

		$('#pinToolbar').on('click', function () {
			
			chrome.storage.local.get(['fix'], function(result) {
				if(result.fix != "true"){
					chrome.storage.local.set({"fix": "true" });
					$("#pinToolbar svg path").css("fill", "#a52424");
				}
				else{
					chrome.storage.local.set({"fix": "false" });
					$("#pinToolbar svg path").css("fill", "black");
				}

			});

		});


		$('#langES').on('click', function () {
			var properties = "/properties/properties_es.inc";

			$.getJSON(chrome.runtime.getURL(properties), function (data) {
		
				$.each(data, function (key, val) {
					aLiterals[key] = val;
		
				});
				let scrollTop = $("#section-info").scrollTop();
				loadInfo(scrollTop, "ES");
				sessionStorage.setItem("infoLang","langES");
				loadInterfaceLiterals();
			});
		
		});

		$('#langEU').on('click', function () {
			var properties = "/properties/properties_eu.inc";

			
			$.getJSON(chrome.runtime.getURL(properties), function (data) {
		
				$.each(data, function (key, val) {
					aLiterals[key] = val;
		
				});
				let scrollTop = $("#section-info").scrollTop();
				loadInfo(scrollTop, "EU");
				sessionStorage.setItem("infoLang","langEU");
				loadInterfaceLiterals();
			});
		
		});


		if(scrollTop != null){
			$("#section-info").scrollTop(scrollTop + 30);

			if(lang == "EU"){
				document.getElementById("langEU").style.fontWeight = "bold";
				document.getElementById("langES").style.fontWeight = "unset";
			}
			else{
				document.getElementById("langES").style.fontWeight = "bold";
				document.getElementById("langEU").style.fontWeight = "unset";
			}
		
		}
		else{
			$('#langEU').click();
			
		}

		$("#itzuliToolbar2 ").draggable({ handle: $("#toolbarHeader"),opacity: 0.5 });

		loadLiteals();


		let top = $(window).scrollTop();

		let current = $(".selectedButton");
		if(current.length > 0){

			let id = current[0].id.split("-")[0] + "Info";

			window.location.href = "#" + id;
			$(window).scrollTop( top );

		}
		let top2 = $("#section-info").scrollTop();
		$("#section-info").scrollTop(top2 - 30);

		setCurrent("Info");
		
	});
	

}






function generatePDF(html, type){

	let pdfHtml = "";
	
	if((html == "") || (html == undefined)){
		let language = $("#languagesToolbar").val();

		var originlang = aLiterals["lit_" + language.split("2")[0]];
		var destinylang = aLiterals["lit_" + language.split("2")[1]];


		let div = document.createElement("div");

		let originLangTitle = document.createElement("h3");
		let stOr = originLangTitle.style;
		stOr.fontSize = "34px";
		stOr.marginBottom = "25px";
		originLangTitle.innerHTML = originlang;
		let origintext = document.createElement("p");
		origintext.innerHTML = $("#itzuliToolbar2 #text_input").val().replaceAll("“","'").replaceAll("”","'");


		let destinyLangTitle = document.createElement("h3");
		destinyLangTitle.innerHTML = destinylang;
		var st = destinyLangTitle.style;
		st.marginTop = "60px";
		st.fontSize = "34px";
		st.marginBottom = "25px";

		let destinytext = document.createElement("p");
		destinytext.innerHTML = $("#itzuliToolbar2 #text_output").val().replaceAll("“","'").replaceAll("”","'");



		div.appendChild(originLangTitle);
		div.appendChild(origintext);
		div.appendChild(destinyLangTitle);
		div.appendChild(destinytext);


		pdfHtml = "<div style='margin-left: 20px; margin-top: 50px; font-size:20px;'>" + div.innerHTML + "</div>";
	
	}
	else{

		//pdfHtml = "<div style='width:540px; '>" + html.trim() + "</div>";
		//pdfHtml = html.replaceAll("background-color","font-weight: bold; color" );
		html = html.replaceAll("<b>","<b style='font-weight: bold; margin-right: 5px;'>" );
		html = html.replaceAll("<h1>","<h1 style='font-size: 34px;'>" );
		html = html.replaceAll("background-color","font-weight: bold; color" );
		if(type != "euskalterm"){
			pdfHtml = "<div style='margin-left: 20px; margin-top: 50px; font-size:21px;'>" + html + "</div>";
		}
		else {
			pdfHtml = "<div id='pdfEuskalterm'>" + html + "</div>";
		}

		
	
		let cont = 45;
		//Blue
		while(pdfHtml.indexOf("(129, 209, 255)") != -1){

			let newColor = "(" + cont + ", 178, 255)";
			pdfHtml = pdfHtml.replace("(129, 209, 255)", newColor );

			cont ++;

		}

		
		//Yellow
		cont=0;
		while(pdfHtml.indexOf("(229, 255, 0)") != -1){

			let newColor = "(190, 210, " + cont + ")";
			pdfHtml = pdfHtml.replace("(229, 255, 0)", newColor );

			cont ++;

		}

		//Green
		cont = 0;
		while(pdfHtml.indexOf("(21, 255, 0)") != -1){

			let newColor = "(15, 200, " + cont + ")";
			pdfHtml = pdfHtml.replace("(21, 255, 0)", newColor );

			cont ++;

		}

		//Yellow
		cont = 62;
		while(pdfHtml.indexOf("(255, 127, 127)") != -1){

			let newColor = "(255, 62, " + cont + ")";
			pdfHtml = pdfHtml.replace("(255, 127, 127)", newColor );

			cont ++;

		}
	}

	window.html2canvas = html2canvas;

	window.DOMPurify = DOMPurify;
	var pdf = new jspdf.jsPDF('p', 'pt', 'a4');

	specialElementHandlers = {
		'#bypassme': function (element, renderer) {
			return true;
		}
	};
	margins = {
		top: 40,
		bottom: 45,
		left: 50,
		width: 500
	};

	pdf.html(pdfHtml, {
		callback: function (pdf) {
			if(type == undefined){
				pdf.save('Itzulpena.pdf');
			}
			else{
				if(type == "dictionary"){
					pdf.save('Hiztegia.pdf');
				}
				if(type == "euskalterm"){
					pdf.save('Euskalterm.pdf');
				}
				if(type == "wikipedia"){
					pdf.save('Wikipedia.pdf');
				}
				if(type == "onlyText"){
					pdf.save('Sinplifikatua.pdf');
				}
				if(type == "definition"){
					pdf.save('Definizioa.pdf');
				}
				if(type == "synonyms"){
					pdf.save('Sinonimoak.pdf');
				}
				if(type == "underline"){
					pdf.save('Azpimarratua.pdf');
				}
				if(type == "glossary"){
					pdf.save('Glosarioa.pdf');
				}

			}
		},
		autoPaging: "text",
		width: 500,
		windowWidth: 1000,
		margin: 45
	});


}




//Transcripcion, Audio


//GLOBAL
var none = "none";
var block = "block";

var audio_context;
var recorder;

var recorderInit = false;

//Mikel o Nerea
var voz = "mikel";
var vozEuskera = "nerea";
var vozIngles = "anne";
var vozFrances = "garazi";


//Tipo de llamada de audio (audio único o conjunto de audios)
var tipoAudio;

var firstAudio = true;

var snd = null;

var actual = true;

//timer
var timeOut;

var contadorPeticionesTranskripzioa = 0;
var contadorPeticionesSintesia = 0;

//Contador llamadas Sintesia
var contadorLlamadasSintesia = 0;

//Saber si se ha presionado el boton de parar los audios
var audioParado =  false;


//TRANSKRIPZIOA
function transkripzioa(){
	//Iniciamos o paramos grabación
	if($('#count-down-timer:visible').length == 0){
	
		try{
			initRecorderJS();

		}
		catch(e){
			$("#recordError").text(aLiterals.lit_recordError);
			$("#recordError").show();
			$("#recordAudio svg path").css("fill", "black");
			gumStream.getAudioTracks()[0].stop();
		}

	} else {
		clearTimeout(timeOut);
		stopRecording();
	}

}



//Inicializar recorderJS. Sirve para poder grabar audio.
function initRecorderJS(){ 
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
      window.URL = window.URL || window.webkitURL;
      if(audio_context == undefined) {
		audio_context = new AudioContext();
	  }
     
      //console.log('RecorderJS: Audio context funcionando!');
      //console.log('RecorderJS: Navigator.getUserMedia ' + (navigator.getUserMedia ? 'disponible.' : 'no disponible!'));
    } catch (e) {
      //console.log('RecorderJS: ERROR: Este navegador no permite grabar audio :(');
    }
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
	  
      //console.log('RecorderJS: ERROR: No hay audio de entrada: ' + e);
      recorderInit = false;
    });
}

//Inicializar User Media
function startUserMedia(stream) {

	gumStream = stream;
	mediaStreamSource = audio_context.createMediaStreamSource(stream);
	
	//console.log('RecorderJS: Media stream creado.');

	// Uncomment if you want the audio to feedback directly
	//input.connect(audio_context.destination);
	//__log('Input connected to audio context destination.');

	try{
		recorder = new Recorder(mediaStreamSource, {
			sampleRate: 16000,
		});
		//console.log('RecorderJS: RecorderJS inicializado!');

		recorderInit = true;
		startRecording();

	}
	catch(e){
		$("#recordError").text(aLiterals.lit_recordNotAvailable);
		$("#recordError").show();
		$("#recordAudio svg path").css("fill", "black");
		$("#recordAudio").prop("disabled", true);
		gumStream.getAudioTracks()[0].stop();
	}


}

//Empezar grabación
function startRecording() {
	$("#count-down-timer").css("display", "block");
	timerCountDown(segundosEnTotal);

	recorder.record();
	//console.log('RecorderJS: Iniciando grabacion. Grabando...');

	$("#error_box").css("display", "none");


	none = [block, block = none][0];
}

//Finalizar grabación
function stopRecording() {
	recorder.stop();
	//console.log('RecorderJS: Finalizando grabacion.');

	$('#count-down-timer').text(segundosEnTotal);
	$('#count-down-timer').css("display", "none");
	none = [block, block = none][0];
	gumStream.getAudioTracks()[0].stop();
	
	// create BLOB y mandarlo
	sendBlob();

	recorder.clear();

}

var xhr;
//Mandamos el base64 del audio a la API POST
function sendBlob() {
	//Peticiones
	contadorPeticionesTranskripzioa++;
	peticionEnprocesoTranskripzioa = true;

    recorder && recorder.exportWAV(function(blob) {
	 	var reader = new FileReader();
		reader.readAsDataURL(blob); 
		reader.onloadend = function() {
			//BLOB en base64
			let b64 = reader.result.replace(/^data:.+;base64,/, '');
			var url = "https://api.euskadi.eus/itzuli/commander/do";
			var json = '{"priority":1,"pipeline":"transkit-online_' + "eu" + '","input":"' + b64 + '"}';
			
			
			var language = $("#languagesToolbar").val().split("2");

			if(language[0] == "es"){
				json = '{"priority":1,"pipeline":"transkit-online_' + "es" + '","input":"' + b64 + '"}';
			}

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
						//console.log("TRANSKRIPZIOA: Estado: " + xhr.status);

						//Añadimos la respuesta al text_input
						if( xhr.responseText.substring(9, xhr.responseText.indexOf("\",\"")).trim() != "{}"){

							if(inputID == "text_input"){
								if(inputID == "text_input" && document.getElementById(inputID).value.trim() != ""){
									document.getElementById(inputID).value = document.getElementById(inputID).value + ". " + xhr.responseText;
								}
								else{
									document.getElementById(inputID).value = xhr.responseText;
								}
	
								$("#translate_tool2").click();
							}
							else{
								document.getElementById(inputID).value = xhr.responseText;
								let button = inputID.split("_")[1];
								if(button != null){
									$("#search_" + button).click();
								}
							}
						}
						
					} else {
						//Error
						$("#recordError").text(aLiterals.lit_recordError);
						$("#recordAudio svg path").css("fill", "black");
						$("#recordError").show();
						$("#recordError").addClass("agregado");

						$("#recordError").on("webkitAnimationEnd", function(){
							$("#recordError").css("display", "none");
						});
					}

					$("#recordAudio svg path").css("fill", "black");
					//Peticiones
					contadorPeticionesTranskripzioa--;

					if(contadorPeticionesTranskripzioa == 0) peticionEnprocesoTranskripzioa = false;
				}
			};
			try{
				xhr.send(json);
			}
			catch(e){
				$("#recordError").text(aLiterals.lit_recordError);
				$("#recordAudio svg path").css("fill", "black");
				$("#recordError").show();
				$("#recordError").addClass("agregado");

				$("#recordError").on("webkitAnimationEnd", function(){
					$("#recordError").css("display", "none");
				});
			}
		
		} 
    });
}



//Timer
function timerCountDown(time){
	timeOut = setTimeout(function () {
		time--;
		$('#count-down-timer').text(time);
		if(time!=0) timerCountDown(time);
		else stopRecording();
	}, 1000);
}



//-----------------------

//SINTESIA
function sintesia(text, lang, button, vozEus){

	var inputText = text;

	if(inputText.replace(/\s/g, "").length != 0) {
		//vtype == "imp" ? inputText = document.getElementById("text_input").value : inputText =$("#translation_text .jumbotron-text:nth-child(1) .row:eq(1) div").html();
		var language = $("#languagesToolbar").val().split("2");

		if(lang == undefined || lang == ""){
			lang = language[0];
		}

		vtype = button;

		var boton = "#play_" + vtype;
		if(!peticionLanzada){
			peticionEnProceso();
		}

		contadorLlamadasSintesia = 0;
		//$("#error_box").css("display", "none");
		if(inputText!=null && inputText!="" && !inputText.match(/^[\n+]*$/) && !inputText.match(/\r\n|\r/)){

			if($(boton + " svg g path:last-child").css('fill') == "rgb(0, 0, 0)"){
				
				$(boton + " path").css("fill", "#2bb88b");
				//Volvemos a inicializar las variables
				audioArray = [];
				arrayDeLlamadas = [];
				posicionAudioArray = 0;
				tipoAudio = false;
				firstAudio = true;
				audioParado = false;

				//Quitamos posibles comillas dobles a la cadena a enviar
				inputText = inputText.replace(/"/g,"");
				inputText = inputText.replaceAll(/<br>+/g,"<break time=\'0.50s\' />");
				inputText = inputText.replaceAll(/\n+/g,"<break time=\'0.50s\' />");

				//Normalización
				normalizacion(lang, inputText, vozEus, button);
				
			} else {
				//Paramos el audio - Hay que restar una posición. Hay que tener cuidado ya que podría no estar sonando ningún audio.
				posicionAudioArray--;

				if(!(typeof audioArray[posicionAudioArray] === 'undefined')) audioArray[posicionAudioArray].pause();
				
				//Para la finalizar la llamada recurrente en 'playAudioArray()'
				posicionAudioArray = arrayDeLlamadas.length;

				//Apagamos los botones
				$(boton + " path").css("fill", "rgb(0, 0, 0)");
				divToTextArea();

				//Quitamos el icono del reloj
				peticionEnprocesoSintesia = false;
				audioParado = true;
				
			}		
		} else {
			//console.log("-- SINTESIA: El usuario no ha introducido texto alguno --");
		}
	}
}

function llamadaSintesia(lang, inputText, vozEus, button){
	
	//console.log("-- Iniciando peticion SINTESIA -> Tipo: " + lang + ", Cadena: " + inputText + " --");

	let tipoVoz = voz;

	if(lang == "es"){
		tipoVoz = voz;
	}
	else{
		if(lang == "eu"){
			if(vozEus != null && vozEus != ""){
				tipoVoz = vozEus;
			}
			else{
				tipoVoz = vozEuskera;
			}
			
		}
		else{
			if(lang == "en"){
				tipoVoz = vozIngles;
			}
			else{
				if(lang == "fr"){
					tipoVoz = vozFrances;
				}
			}
		}
	}

	if(reproducirAudio){
		contadorPeticionesSintesia++;
		peticionEnprocesoSintesia = true;
		inputText = inputText.replaceAll("undefined","");
		chrome.runtime.sendMessage({ action: "sintesis", tipoVoz: tipoVoz, text: inputText }, function (response) {

			let b64 = response.data;

			//console.log("SINTESIA: peticion exitosa!");

			if(b64 != ""){
				snd = new Audio("data:audio/wav;base64," + b64);

				audioArray.push(snd);
				playAudio(lang, inputText, vozEus, button);
		
				if(!audioParado && !tipoAudio) contadorLlamadasSintesia++;
				if(!audioParado && !tipoAudio && !(typeof arrayDeLlamadas[contadorLlamadasSintesia] === 'undefined')){
					if(arrayDeLlamadas[contadorLlamadasSintesia]!=null && arrayDeLlamadas[contadorLlamadasSintesia].replace(/\s/g, '').length){ 
						
						
						/*if(arrayDeLlamadas[contadorLlamadasSintesia].length < 100 && contadorLlamadasSintesia < arrayDeLlamadas.length){

							let text = arrayDeLlamadas[contadorLlamadasSintesia];
							while(text.length < 200 && contadorLlamadasSintesia < arrayDeLlamadas.length){

								text += arrayDeLlamadas[contadorLlamadasSintesia + 1];
								contadorLlamadasSintesia++
							}
							delay(2000).then(() =>llamadaSintesia(lang, text, tipoVoz, button));
						}
						else{*/
							delay(2000).then(() =>llamadaSintesia(lang, arrayDeLlamadas[contadorLlamadasSintesia], tipoVoz, button));

						//}
						
					
					}
					else{
						//Borramos el null/vacio
						arrayDeLlamadas.splice(contadorLlamadasSintesia, 1); 
		
						//Evitar nulls/vacios
						for(contadorLlamadasSintesia;contadorLlamadasSintesia<arrayDeLlamadas.length;contadorLlamadasSintesia++){
							if(arrayDeLlamadas[contadorLlamadasSintesia]!=null && arrayDeLlamadas[contadorLlamadasSintesia].replace(/\s/g, '').length){ delay(2000).then(() =>llamadaSintesia(lang, arrayDeLlamadas[contadorLlamadasSintesia], tipoVoz, button)); break;}
							else{ arrayDeLlamadas.splice(contadorLlamadasSintesia, 1); contadorLlamadasSintesia--;}
						}
					}
				}

				//Peticiones
				contadorPeticionesSintesia--;
				if(contadorPeticionesSintesia == 0) peticionEnprocesoSintesia = false;

			}
			else {
				errorSintesia = true;
				//Paramos el audio - Hay que restar una posición. Hay que tener cuidado ya que podría no estar sonando ningún audio.
				posicionAudioArray--;

				if(!(typeof audioArray[posicionAudioArray] === 'undefined')) audioArray[posicionAudioArray].pause();
				
				//Para la finalizar la llamada recurrente en 'playAudioArray()'
				posicionAudioArray = arrayDeLlamadas.length;

				//Apagamos los botones
				var boton = "#play_" + vtype;
				$(boton + " path").css("fill", "rgb(0, 0, 0)");
				divToTextArea();

				//Quitamos el icono del reloj
				peticionEnprocesoSintesia = false;
				audioParado = true;


				//Mostrar aviso
				$("#recordError").text(aLiterals.lit_recordError);
				$("#recordError").show();
				$("#recordAudio svg path").css("fill", "black");
				$("#recordError").addClass("agregado");
		
				$("#recordError").on("webkitAnimationEnd", function(){
					$("#recordError").css("display", "none");
				});
			}

		});

	}

	
}

function normalizacion(lang, inputText, vozEus, button){
	//console.log("-- Iniciando peticion SINTESIA -> Tipo: " + vtype + ", Cadena: " + inputText + " --");
	
	let tipoVoz = voz;

	if(lang == "es"){
		tipoVoz = voz;
	}
	else{
		if(lang == "eu"){
			if(vozEus != null && vozEus != ""){
				tipoVoz = vozEus;
			}
			else{
				tipoVoz = vozEuskera;
			}
		}
		else{
			if(lang == "en"){
				tipoVoz = vozIngles;
			}
			else{
				if(lang == "fr"){
					tipoVoz = vozFrances;
				}
			}
		}
	}

	chrome.runtime.sendMessage({ action: "normalizacion", text: inputText, tipoVoz: tipoVoz}, function (response) {


		textoNormalizado = response.data;

		//console.log("SINTESIA: peticion exitosa!");

		if(textoNormalizado != ""){
			//Devolvemos el texto normalizado
			//console.log(textoNormalizado);
			textoNormalizado = textoNormalizado.replaceAll("\\u003c","<");
			textoNormalizado = textoNormalizado.replaceAll("\\u003e",">");
			textoNormalizado = textoNormalizado.replaceAll("\\","");
			textoNormalizado = textoNormalizado.replaceAll("=\"","='");
			textoNormalizado = textoNormalizado.replaceAll("\" ","'");
			textoNormalizado = textoNormalizado.replaceAll("\"","");

			textoNormalizado = textoNormalizado.trim();
		}
		else{
			//Error - devolvemos NULL y se enviará el texto original a sintetizar
			textoNormalizado = inputText;

		}

		

		inputText = replaceFirstAndLastBrackets(textoNormalizado);
		inputText = inputText.replace(/\r?\n/g, '\\n');
			
		//Si contiene line break o punto espacio
		let regex = /,\\n/;
		var match = regex.exec(inputText);

		if(match){
			let saltos = true;
			let i = 0;
			while (saltos){
				if(match && match.index != null){
					arrayDeLlamadas[i] = inputText.substring(0, match.index).replaceAll("\\n", "");
					inputText = inputText.substring(match.index+3,inputText.length);		
					match = regex.exec(inputText);
					i++;
				} else {
					arrayDeLlamadas[i] = inputText.replaceAll("\\n", "");
					//console.log(arrayDeLlamadas);
					saltos = false;
				}
			}

			//Recorremos el array generado y vamos llamando al servicio evitando los nulls/vacios
			//console.log(contadorLlamadasSintesia);
			for(contadorLlamadasSintesia=0;contadorLlamadasSintesia<arrayDeLlamadas.length;contadorLlamadasSintesia++){
				if(arrayDeLlamadas[contadorLlamadasSintesia]!=null && arrayDeLlamadas[contadorLlamadasSintesia].replace(/\s/g, '').length && !checkUnicoCaracter(arrayDeLlamadas[contadorLlamadasSintesia])){  
						delay(2000).then(() =>llamadaSintesia(lang, arrayDeLlamadas[contadorLlamadasSintesia], vozEus, button));					
					break;
				}
				else{ 
					arrayDeLlamadas.splice(contadorLlamadasSintesia, 1); 
					contadorLlamadasSintesia--;
				}
			}
		
		} else { //Caso que no contiene line break o punto espacio
			tipoAudio = true;
			inputText = inputText.replaceAll("\\n", "")
			delay(1000).then(() =>llamadaSintesia(lang, inputText, tipoVoz, button));
		}

	});

}



function playAudio(lang, inputText, vozEus, button){
	//Único audio o primer audio de cadena de audios
	if(reproducirAudio){
		if(tipoAudio || posicionAudioArray == 0){
			textAreaToDiv(lang, inputText, vozEus, button);
			toNegrita('fraseAudioNegri' + posicionAudioArray);
			audioArray[posicionAudioArray].play();


			/*audioArray[posicionAudioArray].addEventListener("timeupdate", function (event){
				let texto = $('#itzuliToolbar2 #text_input').val();
				let idPrueba = "ts3.525487";

				for (let i = 0 ; i< texto.length ; i++){
					var time = Number(idPrueba.slice(2));
					if(time <  event.target.currentTime){
						if (i>0){
							console.log(texto[i -1])
							texto[i -1].style.backgroundColor = "white";  
						} 
						else{
							console.log(texto[i])
							texto[i].style.backgroundColor = "red";  
						}
					
					}
				}
			});*/


			audioArray[posicionAudioArray].addEventListener("ended", function(){
				if(tipoAudio || arrayDeLlamadas.length == 1){
					$("#play_input svg path").css("fill", "black");
					$("#play_output svg path").css("fill", "black");
					$("#play_input svg path").css("fill", "black");
					$("#play_definition svg path").css("fill", "black");
					$("#play_wikipedia svg path").css("fill", "black");

					divToTextArea();
				} else {
					//Si hay lista de audios
					firstAudio = false;
					if(reproducirAudio){
						playAudioArray();
					}
				}
			});
			posicionAudioArray++;
		} else {
			//console.log("Esperar a que finalize el audio anterior");
			//console.log(audioArray);
			if(posicionAudioArray==1) actual = true;
		}

	}
	
}

function playAudioArray(){
	if(!(typeof audioArray[posicionAudioArray] === 'undefined') && actual){ 
		toNegrita('fraseAudioNegri' + posicionAudioArray);
		audioArray[posicionAudioArray].play();
		actual = false;

		audioArray[posicionAudioArray].addEventListener("ended", function(){
			actual = true;
			if(typeof audioArray[posicionAudioArray] === 'undefined' && (arrayDeLlamadas.length-posicionAudioArray <= 1)){

				$("#play_input svg path").css("fill", "black");
				$("#play_output svg path").css("fill", "black");
				$("#play_definition svg path").css("fill", "black");
				$("#play_wikipedia svg path").css("fill", "black");
				divToTextArea();
			} else {
				playAudioArray();
			}
		});
		posicionAudioArray++;
	} else actual = false;

	
	
	if (errorSintesia){
		$("#play_input svg path").css("fill", "black");
		$("#play_output svg path").css("fill", "black");
		$("#play_definition svg path").css("fill", "black");
		$("#play_wikipedia svg path").css("fill", "black");
	}
	else{
		if(arrayDeLlamadas.length-posicionAudioArray > 0){
			setTimeout(function () {
				playAudioArray();
			}, 1000);
		}

	}
}

//Cuando lo que responde es el diccionario, poner el botón de altavoz en la parte traducida deshabilitado
function peticionEnProceso(){

	peticionLanzada = true;
	//Relojito - Peticiones en espera - TRANSKRIPZIOA
	Object.defineProperty(this, 'peticionEnprocesoTranskripzioa', {
		get: function () { return myVar; },
		set: function (v) {
		  if(v==true) $("#clockRecorder").css("display", "block");
		  else $("#clockRecorder").css("display", "none");
		}
	  });

	//Relojito - Peticiones en espera - SINTESIA
	//Traducir - Arriba
	Object.defineProperty(this, 'peticionEnprocesoSintesia', {
		get: function () { return myVar; },
		set: function (v) {
			if(v==true) {
				if(vtype == "output"){
					$("#clockOutput").css("display", "block");
				}
				else{
					$("#clockInput").css("display", "block");
				}
			  
		  	}
		  	else {
				if(vtype == "output"){
					$("#clockOutput").css("display", "none");
			  	}
			  	else{
					$("#clockInput").css("display", "none");
			  	}
		
		  	}

		}
	  });

};


function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
  }


function checkUnicoCaracter(str){
	var regex = /^[^aeiouAEIOUyY0-9]+$/;
	if (typeof str !== 'undefined') {
	  str = str.substring(0, (str.indexOf("\\u003cbreak") != -1) ? str.indexOf("\\u003cbreak") : str.length);
	}
	return regex.test(str);
  }

function replaceFirstAndLastBrackets(str) {
	if (str.indexOf('[') !== -1 && str.indexOf(']') !== -1) {
	  const firstBracketIndex = str.indexOf('[');
	  const lastBracketIndex = str.lastIndexOf(']');
	  if (firstBracketIndex !== lastBracketIndex) {
		// Reemplazar primer corchete de apertura "[" por un " " 
		str = str.slice(0, firstBracketIndex) + ' ' + str.slice(firstBracketIndex + 1);
		// Reemplazar último corchete de cierre "]" por un " "
		str = str.slice(0, lastBracketIndex) + ' ' + str.slice(lastBracketIndex + 1);
	  }
	}
	return str;
  }



  function textAreaToDiv(lang, inputText, vozEus, button){

	var audioInput = $('#text_'+button);
	var output;
	var text;
	if(audioInput.length && (button == "input" || button == "output" || button == "wikipedia")){

		if(button == "input"){
			text = audioInput.val();
			output = $('#text_input_div');
			if (output.length === 0) {
				output = $('<div id="text_input_div"></div>').insertAfter(audioInput);
			}		
		}
		if(button == "output"){
			text = audioInput.val();
			output = $('#text_output_div');
			if (output.length === 0) {
			  output = $('<div id="text_output_div"></div>').insertAfter(audioInput);
			}
		}
		if(button == "wikipedia"){
			audioInput = $('#details-'+button);
			text = audioInput.text().trim();
			output = $('#text_wikipedia_div');
			if (output.length === 0) {
				output = $('<div id="text_wikipedia_div"></div>').insertAfter(audioInput);
			}
		}
	
	
		
		var sentences;
		if (vozEus === 'nerea' && lang !="es") {
		  sentences = text.split(/(?<=\.\s|\.\n)(?=\d|\p{Lu})/u);
		} else {
		  sentences = text.split(/(?<=\.\s|\.\n)/);
		}
	
		var html = '';
		var cont = 0;
		for (var i = 0; i < sentences.length; i++) {
		  var spans = sentences[i].split('\n');
	
		  for (var j = 0; j < spans.length; j++) {
			var spanText = spans[j].trim(); 
			if (spanText !== '') {
				let fraseAudioNegriID = 'fraseAudioNegri' + cont; 
				html += '<span id="' + fraseAudioNegriID + '">' + spanText + '</span> ';
				cont++;
			}
			if (j < spans.length - 1) {
			  html += '<br>';
			}
		  }
		}
	
		output.html(html); 
	
		audioInput.hide();
		output.show();
	}
	
}

function divToTextArea(){

	var audioInput = $('#text_input');
	var audioInput2 = $('#text_output');
	var audioInputWiki = $('#details-wikipedia');

	var input1 = $('#text_input_div');
	var input2 = $('#text_output_div');
	var inputWiki = $('#text_wikipedia_div');

	input1.remove();
	input2.remove();
	inputWiki.remove();

	audioInput.show();
	audioInput2.show();
	audioInputWiki.show();

	//Por si se ha llamado desde el SELECT de voces
	selectorVozSintesisImp=false;
	selectorVozSintesisTra=false;
}

function toNegrita(id) {
  $('[id^="fraseAudioNegri"]').css({
    'font-weight': '',
    'color': '',
    'background': '',
    'box-shadow': '',
  });
  
  $('#' + id).css({
    'font-weight': 'bold',
    'color': 'white',
    'background': 'rgb(27, 57, 127)',
    'box-shadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  });

  var container = $('#text_input_div');
  var scrollToElement = $('#' + id);

  // Verificar si el contenedor tiene la propiedad 'overflow-y' establecida en 'scroll' - Para que solo se realice en caso de scroll
  var hasScroll = container.css('overflow-y') === 'scroll';

  if (hasScroll) {
    var elementPosition = scrollToElement.position().top;
    container.animate({ scrollTop: container.scrollTop() + elementPosition }, 500);
  }
}



function detectLanguage(message) {
    const bodyContent = JSON.stringify({
        "text": message,
        "languages": [
            "es_ES",
            "eu_EU",
            "en_EN",
            "fr_FR"
        ]
    });
    fetch("https://api.euskadi.eus/itzuli/lid-textual/detect-language", {
        method: "POST",
        body: bodyContent
    })
    .then(response => {
      	detectLanguageFinished = true;
        return response.text();
    })
    .then(responseText => {
        const languageDetected = JSON.parse(responseText).detectedLanguage;
    
        if (languageDetected != null) {
            const languageCode = languageDetected.substring(0, 2).toLowerCase();
            
            const valorActual = $('#languagesToolbar').val();
			let nuevoValor = languageCode !== "eu" ? languageCode + "2eu" : "eu" + (valorActual.substr(valorActual.indexOf("2")) == "2eu" ? "2es" : valorActual.substr(valorActual.indexOf("2")));
            
            if (valorActual.includes("adm_")) {
                nuevoValor = (!nuevoValor.includes("en") && !nuevoValor.includes("fr")) ? "adm_" + nuevoValor : valorActual;
            }
    
            // Establece el nuevo valor en el elemento select
            $("#languagesToolbar").val(nuevoValor).trigger('change');
  
 			detectLanguageFinished = true;
        }
    })
    .catch(error => {
      	detectLanguageFinished = true;
        console.error("Error:", error);
    });
}

// Funcion que guarda el texto, su traduccion y el idioma en el chrome.storage.local
function guardarTraduccion(traducir, traduccion) {
    if (traducir && traduccion) {
        // Limpieza de las cadenas de entrada: eliminar espacios en blanco al principio y al final y capitalizar la primera letra
		traducir = traducir.trim().charAt(0).toUpperCase() + traducir.trim().slice(1);
		traduccion = traduccion.trim().charAt(0).toUpperCase() + traduccion.trim().slice(1);

        // Obtener el idioma seleccionado
        const idiomasDOM = document.getElementById("languagesToolbar");
        const idiomas = idiomasDOM.options[idiomasDOM.selectedIndex].text;

        // Crear un objeto de traducción
        const tradu = {
            "date": new Date().toLocaleString(),
            "translate": traducir,
            "translated": traduccion,
            "idiomas": idiomas,
        };

		// Declaración de la variable para el historial
		let arrHistorico=new Array();

		// Obtener el historial almacenado localmente
		chrome.storage.local.get(['historico'], (result) => {
			if (chrome.runtime.lastError) {
				console.error('Error al recuperar los datos:', chrome.runtime.lastError);
				return;
			}

			// Si existe un historial almacenado, analizarlo y asignarlo a la variable arrHistorico
			if (result.historico) {
				arrHistorico = JSON.parse(result.historico);
			}

			// Verificar si la traducción ya existe en el historial
			if (arrHistorico && !arrHistorico.some(item => item.idiomas === idiomas && item.translate.trim().toUpperCase() === traducir.toUpperCase())) {
				// Agregar la nueva traducción al historial
				arrHistorico.unshift(tradu);

				// Limitar el historial a 10 elementos
				if (arrHistorico.length > 10) {
					arrHistorico.pop();
				}
				
				// Guardar el historial actualizado en el almacenamiento local
				chrome.storage.local.set({ "historico": JSON.stringify(arrHistorico) });

				// Insertar el acordeón
				insertAccordion(arrHistorico);
			}
		});
    }
}

// Funcion que inserta el acordeon
function insertAccordion(arrHistorico) {
    borrarAccordion();

	if (arrHistorico.length != 0) {
		// Crear el texto del acordeón
		const accordiontxt = crearAccordion(arrHistorico);

		// Buscar los elementos con los IDs "result" y "section-dictionary"
		const divTranslator = document.getElementById("result");
		const sectionDictionary = document.getElementById("section-dictionary");
		
		if (divTranslator || sectionDictionary) {
			// Insertar el texto del acordeón después del elemento existente
			if (divTranslator) {
				$(accordiontxt).insertAfter(divTranslator);
				// Configurar la propiedad CSS para el elemento con el ID "contenidoTraductor"
				$("#contentTranslator").css("max-height", "94%");
				$("#contentTranslator").css("overflow-y", "scroll");
			} else if (sectionDictionary) {
				$(accordiontxt).insertAfter(sectionDictionary);
			}

			// Llamar a la función accionBtn con arrHistorico
			accionBtn(arrHistorico);

			loadInterfaceLiterals();
		}	
	}
}

// Funcion que borra el acordion
function borrarAccordion() {
	const accordion = document.getElementById("historicalAccordion");
	if (accordion) accordion.remove();
}

function crearAccordion(arrHistorico) {
	const iconBorrarTodo = `<svg class='red-svg' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='red' class='bi bi-trash3-fill' viewBox='0 0 16 16'><path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5'/></svg>`;
	const idioma = $("#languagesToolbar").val().substring(0,1);
	let textoHistorico = "Histórico";
	let textoBorrarTodo = "Borrar todo el historial"
	if(idioma === "eu"){
		textoHistorico = "Historikoa";
		textoBorrarTodo = "Historia osoa ezabatu";	
	}else if(idioma === "fr"){
		textoHistorico = "Historique";
		textoBorrarTodo = "Supprimer tout l'historique";
	}else if(idioma === "de"){
		textoHistorico = "Historisch";
		textoBorrarTodo = "Gesamten Verlauf löschen";
	}
	const iconBorrarTodo2 =`<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x' viewBox='0 0 16 16'><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708'/></svg>`;
	const iconBorrarTodo3 =`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>`;
	const divTranslator = document.getElementById("result");
	const paddingx = divTranslator ? "px-5" : "pt-5 w-50";
	const maxHeight = divTranslator ? "" : `style="overflow-y: scroll; max-height: 20em;"`;
	
	return `
	<section class="m-0 mb-3 p-2 ${paddingx} accordion" id="historicalAccordion">
		<div class="accordion">
			<div class="accordion-item border-0">
				<h2 class="accordion-header" id="header">
					<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsing" aria-expanded="false" aria-controls="collapsing">
						<strong><p class="mb-0" data-lit='lit_historical'>${textoHistorico}:</p></strong>
					</button>
				</h2>
				<div id="collapsing" class="accordion-collapse collapse show border border-black" aria-labelledby="header" data-bs-parent="#acordeon">
					<div class="accordion-body" ${maxHeight}>
						<div class="d-grid d-flex justify-content-end">
							<button id="btnBorrarTodos" title='lit_cleanAll' class="btn btn-light me-2 mb-2" type="button">${textoBorrarTodo} ${iconBorrarTodo}</button>
						</div>
						<div class="accordion" id="subAcordeon">
							${arrHistorico.map((element, num) => accordionInterno(num, element.translate, element.translated, element.date, element.idiomas)).join('')}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>`;
}

function accordionInterno(num, translate, translated, fecha, idiomas) {
    const iconPegar = `<?xml version="1.0" encoding="iso-8859-1"?> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <svg fill="white" height="20px" width="20px" style="transform: scale(0.85);margin: 0 !important;" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 488.4 488.4" xml:space="preserve"> <g> <g> <path style="fill: white;" d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"/> </g> </g> </svg>`;
	const iconBorrar = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <svg width="20px" height="20px" viewBox="2 2 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: scale(0.85);margin: 0 !important;"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"/> </svg>`;
	const iconCopy = '<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <svg width="20px" height="20px" onclick="copyTextHT(event);" style="cursor: pointer; margin-top: .5em;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"/><path fill="#000000" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"/></svg>';

	const idioma = $("#languagesToolbar").val().substring(0,1);
	let textoPegar = "Volver a traducir";
	let textoBorrar = "Eliminar esta búsqueda del historial"
	let textoCopy = "Copiar texto";

	if(idioma === "eu"){
		textoPegar = "Itzuli berriro";
		textoBorrar = "Ezabatu bilaketa hau historiatik"
		textoCopy = "Testua kopiatu";
	}else if(idioma === "fr"){
		textoPegar = "Traduire à nouveau";
		textoBorrar = "Supprimer cette recherche de l'historique"
		textoCopy = "Copier le texte";
	}else if(idioma === "de"){
		textoPegar = "Nochmals übersetzen";
		textoBorrar = "Löschen Sie diese Suche aus dem Verlauf"
		textoCopy = "Text kopieren";
	}

	let txtTranslate = translate;
	let txtTranslated = translated;

	const divTranslator = document.getElementById("result");
	const sectionDictionary = document.getElementById("section-dictionary");
	let colText=59;
	let colIcon=41;
	if (divTranslator) {
		colText=79;
		colIcon=21;
	} else if (sectionDictionary) {
	}

    const idi = idiomas.split('-');

	return`
    <hr style="margin: 1em 0">
    <div class="row">
		<div class="div-traducciones-bs" id="div-traducciones-bs${num}">
            <div class="p-traduccion-area-bs" style="border-right: 1px solid #dddddd;"><strong>${idi[0]}:</strong></br> <p class="p-traduccion-area-bs-p">${txtTranslate}</p><div class="iconCopyT" title="${textoCopy}">${iconCopy}</div></div>
            <div class="p-traduccion-area-bs"><strong>${idi[1]}:</strong></br> <p class="p-traduccion-area-bs-p">${txtTranslated}</p><div class="iconCopyT" title="${textoCopy}">${iconCopy}</div></div>
        </div>
		<div class="d-flex flex-column justify-content-center align-items-center" style="flex-direction: column !important; width: auto !important;">
			<div>
				<button id="btnBorrar${num}" class="btn btn-light mb-2" type="button" title="${textoBorrar}" style="cursor: pointer !important; padding: .15em !important; border: 1px solid #8e8e8e;border-radius: 4px;">
					${iconBorrar}
				</button>
			</div>
			<div>
				<button id="btnTradu${num}" class="btn btn-light buttonSearchTradu" type="button" title="${textoPegar}" style="cursor: pointer !important; padding: .15em !important; border: 1px solid #8e8e8e;border-radius: 4px;background: #2bb88b !important;">
					${iconPegar}
				</button>
			</div>
			<input id="date${num}" type="hidden" name="date" value="${fecha}">
			${modal(num, translate, translated, idiomas)}
    	</div>
    </div>`;
}

// Genera las ventanas modales de cada una de las traducciones
function modal(num, translate, translated, idiomas) {
    const iconCopiar="<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='250 0 30 500'><path d='M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z' /></svg>";
    const idi = idiomas.split('-');
    return`
    <div class="modal fade" id="btnModal${num}" tabindex="-1" aria-labelledby="btnModal${num}Label" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content w-100 p-0">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6 border-bottom"><strong>${idi[0]}:</strong></div>
                            <div class="col-6 border-bottom"><strong>${idi[1]}:</strong></div>
                            <div class="col-6 pt-3" id="translate${num}">${translate}</div>
                            <div class="col-6 pt-3 ms-auto" id="translated${num}">${translated}</div>
                            <div class="col-6 mt-3 mb-3">
                                <button class="btn btn-light" id="copiar-texto-translate${num}" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="bottom popover">
                                    ${iconCopiar} &nbsp;<span>Copiar</span>
                                </button>
                            </div>
                            <div class="col-6 ms-auto mt-3 mb-3">
                                <button class="btn btn-light" id="copiar-texto-translated${num}" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="bottom popover">
                                    ${iconCopiar} &nbsp;<span>Copiar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// Funcion para darle las acciones de los botones
function accionBtn(arrHistorico) {
	const divTranslator = document.getElementById("result");
	const sectionDictionary = document.getElementById("section-dictionary");
	const textInput = document.getElementById('text_input');
	const textOutput = document.getElementById('text_output');
	const textDictionary = document.getElementById('text_dictionary');

    arrHistorico.forEach((element, num) => {
        // Poner en el input el texto por traducir y el traducido
		const btnTradu = document.getElementById(`btnTradu${num}`);
		
		// Agrega el evento listener al botón
		btnTradu.addEventListener('click', function () {
			if (divTranslator) {
				textInput.value = element.translate;
				textOutput.value = element.translated;
			} else if (sectionDictionary) {
				textDictionary.value = element.translate;
			}
		});

        // Borrar seleccionado
		// Obtener el elemento con el ID correspondiente
		const idDate = document.getElementById(`date${num}`);
		// Agregar un evento al botón de borrar
		document.getElementById(`btnBorrar${num}`).addEventListener('click', function () {
			// Obtener el historial almacenado en la local storage
			chrome.storage.local.get(['historico'], (result) => {
				if (chrome.runtime.lastError) {
					console.error('Error al recuperar los datos:', chrome.runtime.lastError);
					return;
				}
				if (result.historico) {
					// Parsear el historial almacenado
					const itemBorrar = JSON.parse(result.historico);
					// Llamar a la función para borrar el elemento
					borrarElemento(itemBorrar, idDate.value);

					// Si el historial no está vacío, actualizar la local storage
					if (itemBorrar.length !== 0) {
						chrome.storage.local.set({ "historico": JSON.stringify(itemBorrar) });
					} else {
						// Si está vacío, eliminarlo de la local storage
						chrome.storage.local.remove("historico");
					}
				}
			});
		});

		const translationElement = document.getElementById(`div-traducciones-bs${num}`);
		if (translationElement) {
			translationElement.addEventListener('click', function () {
				toggleTranslation(translationElement);
			});
		}
    });

    // Borrar todos
    document.getElementById('btnBorrarTodos').addEventListener('click', function () {
		chrome.storage.local.remove("historico");
        borrarAccordion();
    });
}

//Borramos el elemento que nos han pasado
function borrarElemento(arrHistorico, elementToRemove) {
    const indexToRemove = arrHistorico.findIndex(item => item.date === elementToRemove);
    if (indexToRemove !== -1) arrHistorico.splice(indexToRemove, 1);
    insertAccordion(arrHistorico);
}
  
  function toggleTranslation(element) {
	const jumbotron = element.querySelector('.jumbotron');
	if (jumbotron) {
	  const style = window.getComputedStyle(jumbotron);
	  if (style.maxHeight === '78px') {
		jumbotron.style.setProperty('max-height', 'none', 'important');
	  } else {
		jumbotron.style.setProperty('max-height', '78px', 'important');
	  }
	} else {
	  const paragraphs = element.querySelectorAll('.p-traduccion-area-bs-p, .p-traduccion-area-bs-p-toggle');
	  paragraphs.forEach(p => {
		if (p.classList.contains('p-traduccion-area-bs-p')) {
		  p.classList.remove('p-traduccion-area-bs-p');
		  p.classList.add('p-traduccion-area-bs-p-toggle');
		} else {
		  p.classList.remove('p-traduccion-area-bs-p-toggle');
		  p.classList.add('p-traduccion-area-bs-p');
		}
	  });
	}
  }