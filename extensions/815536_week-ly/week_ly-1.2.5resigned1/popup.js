var Url = "https://raw.githubusercontent.com/codarrenvelvindron/Week-Ly/master/weeklyquote.json"
var xhr = new XMLHttpRequest();
xhr.open("GET", Url, true);
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		var json = JSON.parse(xhr.responseText);
		var i = Math.floor((Math.random() * 14) +1);  
		var quoteNew = json.quotestore.q[i].quote;  
		el1 = document.getElementById('quote');
		el1.textContent = quoteNew;
	  
		var authorNew=json.quotestore.q[i].author;	  
		el2 = document.getElementById('author');
		el2.textContent = '~~' + authorNew;
  }
}
xhr.send();