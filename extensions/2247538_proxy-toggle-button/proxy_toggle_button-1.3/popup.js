// Close popup on click link
document.getElementsByTagName("a")[0].addEventListener("click", function(e){
	window.setTimeout(function() {
		window.close();
	}, 50);
});