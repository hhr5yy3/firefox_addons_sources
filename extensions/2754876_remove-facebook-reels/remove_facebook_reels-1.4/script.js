const a = () => {
	var cssImgsIcons = document.querySelectorAll("[data-visualcompletion='css-img']");
	for(let i = 0; i < cssImgsIcons.length; i++){
		if(cssImgsIcons[i].nextSibling && cssImgsIcons[i].nextSibling.innerText === "Reels"){//"Reels and short videos"
			var el;
			try{
				el = cssImgsIcons[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
			} catch(e){
				console.error("no el")
			}
			if(el){
				el.style.display = "none";
				console.log("Hid!")
			}
		}
	}
}

a();

setInterval(() => a(), 1000)

const startReelsObserver = (elem) => {
	const observer = new MutationObserver((mutationList, observer) => {
		for(const mutation of mutationList) {
			if (mutation.type === 'childList') {
				console.warn('A child node has been added or removed.');
				a();
			}
			else console.warn("A child node has been added or removed.  another type!!", mutation.type);
		}
	});
	
	observer.observe(elem, { attributes: false, childList: true, subtree: false });
}

const observer = new MutationObserver((mutationList, observer) => {
    for(const mutation of mutationList) {
		console.warn("1");
		var h3s = document.getElementsByTagName("h3");
		var theOne;
		for(let i = 0; i < h3s.length; i++){
			if(h3s[i].innerHTML === "News Feed posts"){
				theOne = h3s[i]
				break
			}
		}
		if(theOne && theOne.nextSibling){
			console.warn("2");
			startReelsObserver(theOne.nextSibling);
			observer.disconnect();
			break;
		}
    }
});

// observer.observe(document.documentElement || document.body, { attributes: false, childList: true, subtree: true });


