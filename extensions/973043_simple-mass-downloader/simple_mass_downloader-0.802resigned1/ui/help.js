

let isChrome = !!chrome.downloads.onDeterminingFilename;

if(isChrome){
	document.querySelectorAll(".chrome").forEach((x) => x.classList.remove("hidden"));

	document.getElementById("chrome-settings").addEventListener("click", () => {
		chrome.tabs.create({ url: "chrome://settings/?search=downloading" });
	});
}

let bkg, os, sep;
chrome.runtime.getBackgroundPage(function (value) {
	bkg = value;
	if (!bkg) {
		document.body.style.width = "300px";
		document.body.style.height = "40px";
		document.body.style.textAlign = "center";
		document.body.style.padding = "1rem";
		document.body.style.fontSize = "1rem";
		document.body.textContent = "Extension don't work in private browsing mode";
		return;
	}
	os = bkg.os;
	sep = bkg.sep;
	init();
});

function init(){
	let template_1 = document.getElementById("template-1");
	let popper_1 = new PopBuilder({
		content: template_1,
		handleSelector: "#attributes-info",
		relation: "bottom",
		tol: 5,
		align: "CC",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click"
	});
	popper_1.init();

}
