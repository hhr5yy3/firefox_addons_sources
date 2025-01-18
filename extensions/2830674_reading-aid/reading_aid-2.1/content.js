// content.js

let options = { enableBackground: false, enableFont: false, cursorColor: '#FFA500', enableCursor: false, enableLineSpacing: false, enableWordSpacing: false };

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'updateOptions') {
    options = { ...options, ...request.options };

    if (options.enableBackground) {
      document.body.style.backgroundColor = '#fffacd'; // Light yellow background
    } else {
      document.body.style.backgroundColor = ''; // Reset background color
    }

    if (options.enableFont) {
      let font = 'OpenDyslexic, Arial, sans-serif';

      // Add italic style
      if (options.enableItalic) {
        font = 'OpenDyslexic-Italic, ' + font;
      }

      // Add bold style
      if (options.enableBold) {
        font = 'OpenDyslexic-Bold, ' + font;
      }

      document.body.style.fontFamily = font; // Use modified font style
    } else {
      document.body.style.fontFamily = ''; // Reset font family
    }

    // Change cursor based on the new enableCursor option
    if (options.enableCursor) {
      const rectangleWidth = 90; // Set the desired width for the colored rectangle
      const rectangleHeight = 30; // Set the desired height for the colored rectangle

      // Construct the SVG with the specified width, height, and color
      const svgData = `<svg xmlns='http://www.w3.org/2000/svg' width='${rectangleWidth}' height='${rectangleHeight}' fill='${options.cursorColor}'><rect width='${rectangleWidth}' height='${rectangleHeight}' fill-opacity='0.3'/></svg>`;

      document.body.style.cursor = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgData)}") ${rectangleWidth / 2} ${rectangleHeight / 2}, auto`;
    } else {
      document.body.style.cursor = ''; // Reset cursor
    }

    // Set line spacing
    if (options.enableLineSpacing) {
      document.body.style.lineHeight = '2.0'; // Set line spacing to 2.0
    } else {
      document.body.style.lineHeight = ''; // Reset line spacing
    }

    // Set word spacing
    if (options.enableWordSpacing) {
      document.body.style.wordSpacing = '0.3em'; // Set word spacing to 0.3em
    } else {
      document.body.style.wordSpacing = ''; // Reset word spacing
    }
  }
});


