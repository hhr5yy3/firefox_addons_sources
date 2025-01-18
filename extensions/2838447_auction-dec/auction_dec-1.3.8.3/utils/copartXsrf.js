(async () => {
    await waitForAppInit();
    injectCsrfToken();
 
    // Waits for the page's appInit object to be available
    async function waitForAppInit() {
       return new Promise((resolve) => {
          const interval = setInterval(() => {
             if (!window.appInit) return;
             clearInterval(interval);
             resolve();
          }, 100); // Check every 100 ms
       });
    }
 
    // Finds the #xsrf element and sets the CSRF token as its data attribute
    function injectCsrfToken() {
       const interval = setInterval(() => {
          const xsrfElement = document.querySelector("#xsrf");
          if (!xsrfElement) return;
 
          xsrfElement.setAttribute("data-xsrf", appInit.csrfToken);
          clearInterval(interval); // Stop once the token is set
       }, 1000); // Check every second
    }
 })();
 