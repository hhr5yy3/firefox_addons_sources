// Create DOM Element from html string
function createElementFromHTML(htmlString) {
  // Create element
  var div = document.createElement("div");
  // Set html
  div.innerHTML = htmlString.trim();
  // Return first child
  return div.firstChild;
}

// Create initial on hover dialog
function createDialog() {
  //
  return createElementFromHTML(`<div class="what-font-dialog-wrapper"></div>`);
}

// Create popup on element click
function createPopup(target, style) {
  // Get target font family style
  const fontFamily = window.getComputedStyle(target).fontFamily;
  // Split string
  var words = fontFamily.split(/[,\s]+/);
  //
  return createElementFromHTML(`
	<div class="what-font-pop-up-wrapper">
		<div class="what-font-pop-up-title">
			<span class="what-font-popup-title-text">${target.nodeName} - ${words[0]}</span>
			<span class="what-font-popup-close">X</span>
		</div>
		<div class="what-font-pop-up-body" style="line-height: 140%">
			<div style="color: grey">Family</div>
			<div>${style.fontFamily}</div>
			<div class="what-font-pop-up-grid" style="padding-top: 10px">
				<div style="line-height: 140%">
					<div style="color: grey">Style</div>
					<div>${style.fontStyle}</div>
				</div>
				<div style="line-height: 140%">
					<div style="color: grey">Variant</div>
					<div>${style.fontVariant}</div>
				</div>
				<div style="line-height: 140%">
					<div style="color: grey">Weight</div>
					<div>${style.fontWeight}</div>
				</div>
			</div>
			<div class="what-font-pop-up-grid" style="padding-top: 5px">
				<div style="line-height: 140%">
					<div style="color: grey">Size</div>
					<div>${style.fontSize}</div>
				</div>
				<div style="line-height: 140%">
					<div style="color: grey">Line Height</div>
					<div>${style.lineHeight}</div>
				</div>
        <div></div>
			</div>
			<div style="border-bottom: 1px solid grey; padding-top: 5px; padding-bottom: 10px">
        <div style="line-height: 140%">
          <div style="color: grey">Color</div>
          <div style="display: flex; align-items: center">${style.color}<div class="what-font-pop-up-color" style="background-color: ${style.color}"></div></div>
        </div>
      </div>
      <div class="what-font-pop-up-footer" style="font-family: ${style.fontFamily};">
        AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
      </div>
		</div>
	</div>`);
}

// Create active flag element
function createCloseButton() {
  //
  return createElementFromHTML(
    `<div class="what-font-close-button"">Exit Font-Detect</div>`
  );
}

// Create HTML elements
let dialog = createDialog();
let closeButton = createCloseButton()

// Set extension flag
let isAddonEnabled = false;
// Listen for messages on extension click
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Check for active flag
  if (request.active) {
    // Toggle the extension functionality
    isAddonEnabled = !isAddonEnabled;
    // Perform actions based on the extension state (enable/disable)
    isAddonEnabled ? enableAddon() : disableAddon();
  }
});

// Function to enable extension functionality
function enableAddon() {
  // Add initial on hover dialog
  document.body.appendChild(dialog);
  // Add on mouse move event to track mouse position
  document.addEventListener("mousemove", mousemove);
  // Add mouse over event to display font style dialog
  document.addEventListener("mouseover", mouseover);
  // Add mouse leave event to hide font style dialog
  document.addEventListener("mouseout", mouseout);
  // Add on click event to display style popup
  document.addEventListener("click", onclick);
  
  //
  document.body.appendChild(closeButton);
  // 
  closeButton.onclick = () => disableAddon();
}

// Function to disable the add-on functionality
function disableAddon() {
  // Toggle the extension functionality
  isAddonEnabled = !isAddonEnabled;
  // Remove all event listeners
  document.removeEventListener("mousemove", mousemove);
  document.removeEventListener("mouseover", mouseover);
  document.removeEventListener("mouseout", mouseout);
  document.removeEventListener("click", onclick);
  // Find all popups
  let dialogWrapper = document.body.querySelectorAll(
    ".what-font-dialog-wrapper"
  );
  // Remove all popups
  Array.from(dialogWrapper, (item) => item.remove());
  // Find all popups
  let popupWrapper = document.body.querySelectorAll(
    ".what-font-pop-up-wrapper"
  );
  // Remove all popups
  Array.from(popupWrapper, (item) => item.remove());
  // Find close button
  let closeButton = document.body.querySelectorAll(".what-font-close-button");
  // Remove close button
  Array.from(closeButton, (item) => item.remove());
}

// Check element validity
function checkElement(event) {
  if (
    event.target.nodeName === "STRONG" ||
    event.target.nodeName === "SELECT" ||
    event.target.nodeName === "OPTION" ||
    event.target.nodeName === "SPAN" ||
    event.target.nodeName === "CODE" ||
    event.target.nodeName === "CITE" ||
    event.target.nodeName === "LI" ||
    event.target.nodeName === "EM" ||
    event.target.nodeName === "H1" ||
    event.target.nodeName === "H2" ||
    event.target.nodeName === "H3" ||
    event.target.nodeName === "H4" ||
    event.target.nodeName === "H5" ||
    event.target.nodeName === "H6" ||
    event.target.nodeName === "B" ||
    event.target.nodeName === "P" ||
    event.target.nodeName === "A" ||
    event.target.nodeName === "I"
  ) {
    return true;
  } else {
    return false;
  }
}

// On mouse moving set dialog positon
function mousemove(event) {
  // Set left position
  dialog.style.left = event.pageX + 10 + "px";
  // Set top position
  dialog.style.top = event.pageY + 10 + "px";
}

// On mouse over text display font family
function mouseover(event) {
  // Check for text element
  if (checkElement(event)) {
    // Get element font family
    const fontFamily = window.getComputedStyle(event.target).fontFamily;
    // Split font family string
    var words = fontFamily.split(/[,\s]+/);
    // Set first word of the string as dialog text content
    dialog.textContent = words[0];
    // Displat the dialog
    dialog.style.display = "block";
  }
}

// On mouse out text element hide dialog
function mouseout(event) {
  // Hide dialog element
  if (checkElement(event)) dialog.style.display = "none";
}

// On mouse element click
function onclick(event) {
  // Disable link click
  event.preventDefault();
  // Check for text element
  if (checkElement(event)) {
    // Get element style
    const style = window.getComputedStyle(event.target);
    // Create information popup
    let popup = createPopup(event.target, style);
    // Set left position
    popup.style.left = event.pageX + 10 + "px";
    // Set top position
    popup.style.top = event.pageY + 10 + "px";
    // Add to the body
    document.body.appendChild(popup);
  }
}

// Close add-on on escape button click
document.onkeydown = function (event) {
  // Create button
  let isEscape = false;
  // Get button press
  "key" in event
    ? (isEscape = event.key === "Escape" || event.key === "Esc")
    : (isEscape = event.keyCode === 27);
  // Close extension
  if (isEscape) disableAddon();
};
