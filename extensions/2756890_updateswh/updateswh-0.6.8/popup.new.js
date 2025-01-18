if (chrome) {
    browser = chrome
}


document.getElementById("options").addEventListener("click",
    function () {
        browser.runtime.openOptionsPage()
    }
)

document.getElementById("homepage").addEventListener("click",
    function () {
        browser.tabs.create({
            url: "https://softwareheritage.org/browser-extensions/#UpdateSWH"
        })
    }
)


function addgitlab(url){
  browser.storage.local.get({
       gitlabs: null
   }, function (items) {
       browser.storage.local.set({
       gitlabs: items.gitlabs + '\n' + url // FIXME
       })
       })
}

function addgitea(url){
  browser.storage.local.get({
       giteas: null
   }, function (items) {
       browser.storage.local.set({
       giteas: items.giteas + '\n' + url // FIXME
	})
	})
 }


function getCurrentTabDomain() {
  var queryInfo = {
    active: true,
    lastFocusedWindow: true
      // currentWindow: true,
  }
    browser.tabs.query(queryInfo, function(tabs) {
	var url = tabs[0].url;
	console.log(url);
	return(url)
    })
}


document.getElementById("addgitlab").addEventListener("click",
      function () {
	  chrome.tabs.query(
	      {'active': true, 'lastFocusedWindow': true},
	      function (tabs) {
		  var url = tabs[0].url;	  
		  addgitlab(url);}
	  )
	// browser.tabs.update(0)
      }
)

document.getElementById("addgitea").addEventListener("click",
    function () {
        addgitea(getCurrentTabDomain());
	// browser.tabs.update(0)
    }
)
