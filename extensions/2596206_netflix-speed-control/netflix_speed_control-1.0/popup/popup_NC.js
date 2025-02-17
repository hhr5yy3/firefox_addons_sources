/**
 * CSS to hide everything on the page,
 * except for elements that have the "NC-image" class.
 */
const hidePage = `body > :not(.NC-image) {
                    display: none;
                  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "NC" message to the content script in the active tab.
     */
    function NC(tabs) {
		var ClickedButton = e.target.textContent;
		browser.tabs.sendMessage(tabs[0].id, {
			command: "speed",
			speed: ClickedButton
		});
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
		console.error(`Error in Netflix Control: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "NC()"
     */
    if (e.target.classList.contains("beast")) {
		browser.tabs.query({active: true, currentWindow: true})
			.then(NC)
			.catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute Netflix Control content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/NC.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
