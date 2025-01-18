(async() => {

  // Some initial configuration
  window._RIPPLE_CMS_URL = "https://cms.ripplesuicideprevention.com";
  // window._RIPPLE_CMS_URL = "http://localhost:3000";
  // window._RIPPLE_CMS_URL = "https://staging.ripplesuicideprevention.com";

  // Import our other scripts
  const queries = await import(chrome.runtime.getURL("js/queries.js"));
  const rippleStorage = await import(chrome.runtime.getURL("js/storage.js"));
  const utils = await import(chrome.runtime.getURL("js/utils.js"));

  let userId;
  let cmsHTML;
  let breathingInterval;
  let breathingCount = 1;

  let videosBlocked = false;
  let alreadyLoadedData;
  let extension = chrome.runtime.getManifest();
  /**
   * Listen for events where the CSP is violated. We may need
   * to adjust the extension logic in some instances if things
   * are blocked
   **/
  document.addEventListener("securitypolicyviolation", (e) => {
    if (e.violatedDirective === "media-src") {
      videosBlocked = true;
    }
  });

  // Make sure we've got a "user id" setup
  rippleStorage.loadUserId(id => userId = id);

  const executeExtension = async (trigger = {locales: 'en'}) => {

    if (!domainParts.includes("youtube") || domainParts.includes("youtube") && !alreadyLoadedData){
      utils.injectCode(chrome.runtime.getURL("js/mixpanel.js"));
    }
    const locales = trigger.locales;
    const requestParams = { manifest: 3 };
    // If we only have a single matching locale, then we'll
    // use that as the trigger language. If however we've 
    // matched mulitple, then we won't send a locale in the
    // request, and instead allow the server to determine this
    // automatically based on the browsers Accepted-Language
    // header.
    if (locales.length === 1) {
      requestParams.locale = locales[0];
    }

    const urlParamString = new URLSearchParams(requestParams).toString();
    const res = await fetch(`${window._RIPPLE_CMS_URL}/extension?${urlParamString}`)
    const resJson = await res.json();

    cmsHTML = resJson.html;
    const emergencyServices = resJson.emergency_services;

    const breatheResponse = await fetch(chrome.runtime.getURL("html/breathe.html"));
    let breatheHtml = await breatheResponse.text();
    breatheHtml = breatheHtml.replace(/{{EMERGENCY_TEXT}}/, emergencyServices);

    utils.appendHtml(breatheHtml);
    
    document.body.setAttribute("data-user-id", userId);
    document.body.setAttribute("data-version", extension.version);
    document.body.setAttribute("data-from-url", trigger.matched_by);
    document.body.setAttribute("data-search-string", trigger.searchStringData);
    document.body.setAttribute("data-search-digest", trigger.searchDigestData);

    if (!domainParts.includes("youtube") || domainParts.includes("youtube") && !alreadyLoadedData){
      utils.injectCode(chrome.runtime.getURL("js/ripple_analytics.js"));
    }

    // Start updating the breathing exercise, refreshing
    // every 1 second
    breathingInterval = setInterval(updateBreathing, 1500)
  };

  const registerModalEvents = () => {
    const rippleModal = document.getElementById("rippleModal");

    rippleModal.addEventListener("click", async (e) => {
      const clicked = e.target;
      const languagePicker = rippleModal.getElementsByClassName("languages")[0];
      let target;

      if ((target = clicked.closest(".pre-defined-video"))) {
        if (!videosBlocked) {
          e.preventDefault();
          const modal = document.getElementById(`${target.id}_modal`);
          modal.style.display = "flex";
        }
      } else if ((target = clicked.closest(".modal-close"))) {
        e.preventDefault();
        
        const preview = target.getAttribute("data-preview");
        const modal = document.getElementById(`${preview}_modal`);
        const video = document.getElementById(`${preview}_video_player`);

        video?.pause();
        modal.style.display = "none";
      } else if (languagePicker?.contains(e.target)) {
        e.preventDefault();

        target = clicked.closest("a");
        const anchor = target.closest("a");
        const languageParams = anchor.getAttribute("href");
        const res = await fetch(`${window._RIPPLE_CMS_URL}/extension${languageParams}`)
        const resJson = await res.json();

        cmsHTML = resJson.html;
        document.querySelector(".ripple-modal-content-first").innerHTML = cmsHTML;
      }
    });

    rippleModal.addEventListener("click", async (e) => {
        const target = e.target.closest("#close_icon");
        if (target) {

            var parentDiv = rippleModal.parentNode;
            parentDiv.removeChild(rippleModal);

            const domain = window.location.hostname;
            const domainElements = domain.split(".");

            if (domainElements.includes("bing") || domainElements.includes("duckduckgo")) {
                document.querySelector("html").style.overflow = "auto";
            } else {
                document.querySelector("body").style.overflow = "auto";
            }

        }
    });
  };

  const sleepModalEvents = () => {
    const domain = window.location.hostname;
    const domain_elements = domain.split(".");
    if (domain_elements.includes("bing") || domain_elements.includes("duckduckgo")){
        document.querySelector("html").style.overflow = "hidden";
    }else{
        document.querySelector("body").style.overflow = "hidden";
    }

    const sleepModal = document.getElementById("rippleSleepModal");

    // Set sleepTimer and close modal
    const confirmSleepModal = document.getElementById("confirmSleep");
    confirmSleepModal.addEventListener("click", async (e) => {
      var option = document.getElementById("rippleSleepTimer").value;
      if(option == ""){
        alert("Please select a option and then confirm.")
      }else if(option == "1 day"){
        var result;
        result = new Date();
        result.setHours( result.getHours() + 24 );
        chrome.storage.local.set({ RippleSleep: result.toString() });
      }else if(option == "1 week"){
        var result;
        result = new Date();
        result.setHours( result.getHours() + (24*7) );
        chrome.storage.local.set({ RippleSleep: result.toString() });
      }else if(option == "1 month"){
        var result;
        result = new Date();
        result.setMonth( result.getMonth() + 1 );
        chrome.storage.local.set({ RippleSleep: result.toString() });
      }

      var parentDiv = sleepModal.parentNode;
      parentDiv.removeChild(sleepModal);

      if (domain_elements.includes("bing") || domain_elements.includes("duckduckgo")){
          document.querySelector("html").style.overflow = "auto";
      }else{
          document.querySelector("body").style.overflow = "auto";
      }
    });

    // Clear sleeptimer and close modal
    const cancelSleepTimer = document.getElementById("cancelSleep");
    cancelSleepTimer.addEventListener("click", async (e) => {

      var parentDiv = sleepModal.parentNode;
      parentDiv.removeChild(sleepModal);
      rippleStorage.clearSleepExpiration();

      if (domain_elements.includes("bing") || domain_elements.includes("duckduckgo")){
          document.querySelector("html").style.overflow = "auto";
      }else{
          document.querySelector("body").style.overflow = "auto";
      }
    });
  }

  const updateBreathing = () => {
    breathingCount++;

    if (breathingCount === 2) {
      utils.setBreathingCounter("2");
    } else if (breathingCount === 3) {
      utils.setBreathingCounter("1");
    } else if (breathingCount === 4) {
      utils.setBreathingCounter("3");
      utils.setBreathingText("Hold");
    } else if (breathingCount === 5) {
      utils.setBreathingCounter("2");
    } else if (breathingCount === 6) {
      utils.setBreathingCounter("1");
    } else if (breathingCount === 7) {
      utils.setBreathingCounter("3");
      utils.setBreathingText("And breathe out through your mouth");
    } else if (breathingCount === 8) {
      utils.setBreathingCounter("2");
    } else if (breathingCount === 9) {
      utils.setBreathingCounter("1");
    } else if (breathingCount === 10) {
      clearInterval(breathingInterval);

      breathingCount = 1;
      document.querySelector(".ripple-modal-content-first").innerHTML = cmsHTML;

      if (!domainParts.includes("youtube") || domainParts.includes("youtube") && !alreadyLoadedData){
        utils.injectCode(chrome.runtime.getURL("js/cms_script.js"));
      }
      registerModalEvents();
    }
  }

  const matchTiggers = async (searchTerm) => {
    const matchingTrigger = await queries.matchingTrigger(searchTerm, rippleStorage.getTriggers());
    if (matchingTrigger.match) {
        executeExtension(matchingTrigger);
    }
  }

  const contentLoaded = async (alreadyLoaded = false) => {
    // Make sure we've got refreshed trigger words
    alreadyLoadedData = alreadyLoaded;
    rippleStorage.refreshTriggers().then(async () => {
        const searchTerm = queries.getSearchTerm();
        /**
       * Retrieve the date that the sleep mode expires if
       * present
       **/
        const items = await new Promise(resolve => {
            chrome.storage.local.get("RippleSleep", items => {
                resolve(items);
            });
        });
        const sleepExpiration = items.RippleSleep;
        if (utils.isSleepCommand(searchTerm)) {
            // Present a modal to "sleep" the ripple extension
            const response = await fetch(chrome.runtime.getURL("html/sleep.html"));
            const modalContent = await response.text();

            utils.appendHtml(modalContent);
            sleepModalEvents();
        } else if (sleepExpiration === null || sleepExpiration === undefined || new Date(sleepExpiration) < new Date()) {
            // Clear the expiration from local storage
            if (sleepExpiration) rippleStorage.clearSleepExpiration();

            if (searchEngineLoad() == "post-load" && !alreadyLoadedData){
              async function executeAfterPageLoad() {
                // Wait for the 'load' event before executing the code
                await new Promise(resolve => {
                    window.addEventListener('load', resolve);
                });

                matchTiggers(searchTerm);
              }

              // Call the function to execute the code after the page load
              executeAfterPageLoad();
            }else{
              matchTiggers(searchTerm);
            }
        }
    });
  }

  const searchEngineLoad = () => {
    const domain = window.location.hostname;
    const domainParts = domain.split(".");

    if (domainParts.includes("google")) return "pre-load";
    if (domainParts.includes("yahoo")) return "pre-load";
    if (domainParts.includes("duckduckgo")) return "post-load";
    if (domainParts.includes("bing")) return "pre-load";
    if (domainParts.includes("ask")) return "post-load";
    if (domainParts.includes("ecosia")) return "pre-load";
    if (domainParts.includes("youtube")) return "post-load";
  }

  const domain = window.location.hostname;
  const domainParts = domain.split(".");

  if (domainParts.includes("youtube")) {

    const observeTitleChanges = () => {
      // Select the target node
      const titleTarget = document.querySelector('title');
      if (!titleTarget) {
        //The node we need does not exist yet.
        //Wait 500ms and try again
        window.setTimeout(observeTitleChanges, 500);
        return;
      }

      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(async function(_mutation) {
          // Handle mutation (page load)
          await contentLoaded(true);
        });
      });

      // Configuration of the observer:
      const config = { childList: true };

      // Start observing the target node for configured mutations
      observer.observe(titleTarget, config);
    } 

    observeTitleChanges();
  }

  if (document.readyState !== "loading") {
    await contentLoaded();
  } else {
    document.addEventListener("DOMContentLoaded", contentLoaded);
  }

})();
