setTimeout(function(){
	var logo = document.getElementById('logo');
	if (! logo) { return; }
	var url = logo.getAttribute('href');
	logo.addEventListener("click", function(event) {
		window.open(logo.getAttribute('href'));
		event.preventDefault();
		event.stopPropagation();
	});
}, 2000);
