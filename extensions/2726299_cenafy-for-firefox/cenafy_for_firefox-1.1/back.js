var myUrl = browser.runtime.getURL("johncena.html");

function opener() {
    let x = Math.floor((Math.random() * 50) + 1);
    if (x === 5) {
	browser.tabs.create({
	    url: myUrl
	});
    }
}

browser.tabs.onCreated.addListener(opener);

