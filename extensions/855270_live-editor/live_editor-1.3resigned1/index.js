
var html = document.getElementById('html');
var css  = document.getElementById('css');
var output = document.getElementById('output');

var outputDoc  = output.contentDocument;
var outputBody = output.contentDocument.body;
var outputHead = output.contentDocument.head;

var outputStyle = document.createElement('style');

html.oninput = function(){
	//Modifying the HTML output
	outputBody.innerHTML = html.value;
}

css.oninput = function() {
	var newCSS = document.createTextNode(css.value);

	//Selecting the html to modify
	outputStyle.innerHTML = "";
	outputHead.innerHTML = "";

	//Modifying the existing output
	outputStyle.appendChild(newCSS);
  	outputHead.appendChild(outputStyle);
}
