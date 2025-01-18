// Listen for messages from the background script or popup
browser.runtime.onMessage.addListener((message) => {
    const actionType = message.action;
 
    // Only proceed if the action is to "include" the script
    if (actionType === "include") {
       // Check if the script with id 'xsrf' already exists on the page
       if (document.querySelector("#xsrf")) {
          return; // If it exists, exit early to prevent re-injection
       }
 
       // Create a new script element to inject
       const scriptElement = document.createElement("script");
       scriptElement.src = message.data.url; // URL to the script to inject
       scriptElement.id = "xsrf"; // Set a unique id to prevent duplicate injections
 
       // Append the script to the document body
       document.body.appendChild(scriptElement);
    }
 });
 