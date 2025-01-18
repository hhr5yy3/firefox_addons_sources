var host = window.location.host;

console.log(host)

if (host=="www.corriere.it") {
	console.log(">>>>>>>>>>>>>>>")

	async function unlock() {
		 const newArticle = await fetchArticle();
		 const toReplace = document.querySelector("html");
		 if (!toReplace) {
			 throw new Error("Cannot replace content");
		 }
		 document.querySelector("#pwl_overlay").remove();
		 document.querySelector("#pwl_vt").remove();
		 toReplace.replaceWith(newArticle);
		 return true;
	 }

	 async function fetchArticle() {
		 let url = document.location.origin + document.location.pathname;
		 url = url.replace("_preview.shtml", ".shtml");
		 const resp = await fetch(url, { credentials: "omit" });
		 const bytes = await resp.arrayBuffer();
		 const decoder = new TextDecoder("iso-8859-1");
		 const text = decoder.decode(bytes);
		 const domparser = new DOMParser();
		 const doc = domparser.parseFromString(text, "text/html");
		 doc
		   .querySelectorAll("img.lazy")
		   .forEach(elem =>
			 elem.replaceWith(elem.parentElement.querySelector("noscript img"))
		   );
		 return doc.querySelector("html");
	 }

	 var interval = setInterval(function() {
		 if (!document.querySelector("#pwl_vt")) {
		   return;
		 }
		 window.clearInterval(interval);
		 unlock()

	 },1000);

} else if (host=="www.lastampa.it"){
	async function run() {
		if (!document.getElementById("ph-paywall")) {
		  return;
		}
		const req = await fetch(document.location.href);
		const text = await req.text();
		const domparser = new DOMParser();
		const doc = domparser.parseFromString(text, "text/html");
		const newArticle = doc.querySelector("#article-body");
		const articleBody = document.getElementById("article-body");
		articleBody.replaceWith(newArticle);
		const banner = document.querySelector(".paywall-adagio");
		banner.remove();
	}  
	run()

} else if (host == "rep.repubblica.it") {
	var interval = setInterval(function() {
		var a = document.querySelector("news-app").shadowRoot.querySelector("news-article").shadowRoot.querySelector(".amp-doc-host").shadowRoot;
		if (a) {
			var uno = a.querySelector("[subscriptions-section=content-not-granted]");
			var due = a.querySelector(".paywall");
 
			if ( uno && due ) {
				clearInterval(interval);

				uno.style.display="none";
				due.removeAttribute("subscriptions-section");
			}
		}
	},1000);
} else if (host.endsWith(".gelocal.it")) {
	console.log("here: "+host)
	var interval = setInterval(function() {
		var uno=document.getElementsByClassName('entry_content');
		var due=document.getElementsByClassName('paywall-adagio');
	
		if (uno.length && due.length) {
			clearInterval(interval);
			for (var my_tmp of uno) {
				my_tmp.removeAttribute("hidden");
				my_tmp.removeAttribute("style");
			}
			for (var my_tmp of due) my_tmp.style.display="none";
		}
	},1000);
} else if (host == "www.corriereadriatico.it") {
	var interval = setInterval(function() {
		var uno=document.getElementsByClassName('paywall_login');
		var due=document.getElementsByClassName('paywall');
		var tre=document.getElementsByClassName('sfumatura_pay');
	
		if (uno.length && due.length && tre.length) {
			clearInterval(interval);
			for (var my_tmp of uno) my_tmp.style.display="none";
			for (var my_tmp of due) my_tmp.style.display="none";
			for (var my_tmp of tre) my_tmp.style.display="none";
		}
	},1000);
} else if (host == "ilmanifesto.it" ) {
	async function getRSS(url) {
		var xhr = new XMLHttpRequest();
		xhr.open( "GET", url, true ); 
		xhr.onload = function (e) {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var dict = [];
				var data = xhr.responseXML.getElementsByTagName("channel")[0];
				for (const my_data of data.getElementsByTagName("item")) {
					var linkraw = new URL(my_data.getElementsByTagName("link")[0].innerHTML);
					var newlink = 'https://ilmanifesto.it/read-offline/' + my_data.getElementsByTagName("guid")[0].innerHTML.match(/\d+/)[0] + '/' + linkraw.pathname.replace(/\//g,"") + '/pdf/';					
					dict.push({ key: linkraw, value: newlink });
				}
				for (var anchor of document.getElementsByTagName("a")) {
					for (var lnk of dict) {
						if (lnk.key == anchor.href) {
							anchor.href = DOMPurify.sanitize(lnk.value);
						}
					}
				}
			} 
		};
		xhr.onerror = function (e) {
			console.error(xhr.statusText);
		};
		xhr.send(null);
	}
	getRSS("https://ilmanifesto.it/feed");
	getRSS("https://ilmanifesto.it/sezioni/editoriale/feed");
	getRSS("https://ilmanifesto.it/sezioni/internzaionale/feed");
	getRSS("https://ilmanifesto.it/sezioni/politica/feed");
	getRSS("https://ilmanifesto.it/sezioni/europa/feed");
	getRSS("https://ilmanifesto.it/sezioni/linchiesta/feed");
	getRSS("https://ilmanifesto.it/sezioni/commenti/feed");
	getRSS("https://ilmanifesto.it/sezioni/rubriche/feed");
	getRSS("https://ilmanifesto.it/sezioni/italia/feed");
	getRSS("https://ilmanifesto.it/sezioni/economia/feed");
	getRSS("https://ilmanifesto.it/sezioni/lavoro/feed");
	getRSS("https://ilmanifesto.it/sezioni/scuola/feed");
	getRSS("https://ilmanifesto.it/sezioni/cultura/feed");
	getRSS("https://ilmanifesto.it/sezioni/lultima/feed");
	getRSS("https://ilmanifesto.it/sezioni/reportage/feed");
	getRSS("https://ilmanifesto.it/sezioni/alias/feed");
	getRSS("https://ilmanifesto.it/sezioni/extra-terrestre/feed/");

} else if (host == "www.lemonde.fr" ) {
	var interval = setInterval(function() {
		const hidden_section = document.getElementsByClassName('article__content--restricted-media')[0];
		if (hidden_section)
			hidden_section.classList.remove('article__content--restricted-media');
		const longform_article_restricted = document.getElementsByClassName('article__content--restricted')[0];	 
		if (longform_article_restricted)
			longform_article_restricted.classList.remove('article__content--restricted');   
		const longform_paywall = document.getElementsByClassName('paywall--longform')[0];	   
		if (longform_paywall) {
			longform_paywall.classList.remove('paywall--longform'); 
			clearInterval(interval);
		}
		const paywall = document.getElementById('js-paywall-content');
		const friend_paywall = document.getElementsByClassName('friend--paywall')[0];
		const cookie_banner = document.getElementById('cookie-banner');
		removeDOMElement(paywall, friend_paywall, cookie_banner);
	},1000);	
} else if (host == "www.leparisien.fr" ) {	

	window.removeEventListener('scroll', this.scrollListener);
	var interval = setInterval(function() {
		var uno=document.getElementsByClassName('sticky below_nav piano-paywall relative');
		var due=document.getElementsByClassName('content paywall-abo');
		
		console.log(uno.length, due.length)
		var removed = false
		if (uno.length && due.length) {
			for (var my_tmp of uno) {
				if (my_tmp.style.display != "none") removed = true;
				console.log(my_tmp.style.display)
				my_tmp.style.display="none";
			}
			for (var my_tmp of due) {
				if (my_tmp.style.filter != "none") removed = true;
				console.log(my_tmp.style.filter)
				my_tmp.style.filter="none";
			}
		if (! removed) clearInterval(interval);
		}
	},1000);




// 	window.removeEventListener('scroll', this.scrollListener);
// 	const paywall = document.querySelector('.relative.piano-paywall.below_nav.sticky');
// 	removeDOMElement(paywall);
// 	setTimeout(function () {
// 		const content = document.getElementsByClassName('content');
// 		for (const el of content) {
// 			el.removeAttribute('style');
// 		}
// 	}, 300);
//   
//   
// 	var interval = setInterval(function() {
// 		const paywall = document.querySelector('.relative.piano-paywall.below_nav.sticky');
// 		if (paywall) {
// 			paywall.style.display="none";		
// 			clearInterval(interval);
// 		}
// 		var content = document.getElementsByClassName('content');
// 		for (var i = 0; i < content.length; i++) {
// 			content[i].removeAttribute("style");
// 		}
// 		var content3 = document.getElementsByClassName('tag label abo');
// 		for (var i = 0; i < content3.length; i++) {
// 			content3[i].style.display="none";
// 		}
// 		var content2 = document.getElementsByClassName('navbar-right-content horizontal-list');
// 		for (var i = 0; i < content2.length; i++) {
// 			content2[i].style.display="none";
// 		}
// 
// 	},1000);
} else if (host == "legrandcontinent.eu") {
	var interval = setInterval(function() {
		var uno=document.getElementsByClassName('free paywall');
		if (uno.length ) {
			for (var my_tmp of uno) my_tmp.style.display="none";
			clearInterval(interval);
		}
	},1000);
}

function removeDOMElement (...elements) {
  for (const element of elements) {
    if (element) { element.remove(); }
  }
}
