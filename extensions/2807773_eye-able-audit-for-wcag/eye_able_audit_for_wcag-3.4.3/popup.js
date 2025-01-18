/**
 * The popup is used to do checks on one or multiple websites without the GUI on the website. Errors can be exported as JSON or CSV.
 */

let eyeAble_settings;
let eyeAble_wcag_rules;

function getMessage(name) {
  if (eyeAble_settings && eyeAble_settings.lang) {
    document.documentElement.lang = eyeAble_settings.lang;
    try {
      if (eyeAble_settings.lang === "de") {
        return eyeAbleAudit_de[name]["message"];
      } else if (eyeAble_settings.lang === "nl") {
        return eyeAbleAudit_nl[name]["message"];
      } else if (eyeAble_settings.lang === "es") {
        return eyeAbleAudit_es[name]["message"];
      } else if (eyeAble_settings.lang === "fr") {
        return eyeAbleAudit_ft[name]["message"];
      } else if (eyeAble_settings.lang === "it") {
        return eyeAbleAudit_it[name]["message"];
      } else if (eyeAble_settings.lang === "pl") {
        return eyeAbleAudit_pl[name]["message"];
      } else if (eyeAble_settings.lang === "pt") {
        return eyeAbleAudit_pt[name]["message"];
      } else if (eyeAble_settings.lang === "zh") {
        return eyeAbleAudit_zh[name]["message"];
      } else {
        return eyeAbleAudit_en[name]["message"];
      }
    } catch (e) {
      console.log("Error getting language", name, e);
      return chrome.i18n.getMessage(name);
    }
  } else {
  }
}

function initLang() {
  chrome.storage.local.get(["eyeAble_Settings"], function (result) {
    eyeAble_settings = result.eyeAble_Settings;

    if (eyeAble_settings && eyeAble_settings.lang) {
      document.documentElement.lang = eyeAble_settings.lang;
    } else {
      document.documentElement.lang = chrome.i18n.getUILanguage();
    }

    //special init for settings button
    let settingsBtn = document.getElementById("settingsImg");
    settingsBtn.alt = getMessage("licenseMenuTxt") + ". " + getMessage("newWindowTitle");
    settingsBtn.title = getMessage("licenseMenuTxt") + ". " + getMessage("newWindowTitle");

    //internationalization
    let texts = document.querySelectorAll("[eALangID]");
    for (let i = 0; i < texts.length; i++) {
      texts[i].textContent = getMessage(texts[i].getAttribute("ealangid"));
    }

    let elementsA = document.querySelectorAll("[eaAriaLangID]");
    for (let i = 0; i < elementsA.length; i++) {
      elementsA[i].setAttribute("aria-label", getMessage(elementsA[i].getAttribute("eaAriaLangID")));
    }

    //display current conformance target
    let target = "AA";
    if (eyeAble_settings && eyeAble_settings.conformanceTarget) {
        target = eyeAble_settings.conformanceTarget;
    }
    document.getElementById("conformanceTargetHintTxt").innerText = getMessage("conformanceTargetHintTxt") + " WCAG 2.2 " + target;
  });
}

initLang();

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("checkboxCrawl").addEventListener("click", showCrawlerOptions);
  document.getElementById("runChecks").addEventListener("click", preStartCheck);
  document.getElementById("pauseCheck").addEventListener("click", changePauseState);
  document.getElementById("continueCheck").addEventListener("click", changePauseState);
  document.getElementById("pdfReport").addEventListener("click", buildPDF);
  document.getElementById("pdfReportApi").addEventListener("click", pdfApiRequest);
  document.getElementById("longReportCSV").addEventListener("click", longCSVDownload);
  document.getElementById("shortReportCSV").addEventListener("click", shortCSVDownload);
  document.getElementById("excelShort").addEventListener("click", excelStyleShortData);
  document.getElementById("excelLong").addEventListener("click", excelStyleLongData);
  document.getElementById("urlSelect").addEventListener("change", selectWarning);
  document.getElementById("settingsImg").addEventListener("click", function () {
    chrome.runtime.sendMessage({greeting: "openLicensing"});
  });

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (params.test) {
    document.getElementById("domainsID").value = params.test;
  }

  document.getElementById("longReportJSON").addEventListener("click", function () {
    download("WCAG_Detailed_Report_" + urlWarning[0].url.replace("/", "").replace("https:", "") + ".json", JSON.stringify(detailedReport, null, 2));
  });
  document.getElementById("shortReportJSON").addEventListener("click", function () {
    download("WCAG_Short_Report_" + urlWarning[0].url.replace("/", "").replace("https:", "") + ".json", JSON.stringify(shortReport, null, 2));
  });
});

//download a file
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  console.log(element);

  element.click();

  document.body.removeChild(element);
}

//get those from the js on the website
let array = [];
let myChart;
let errorUrls = [];
let urlWarning;
let selectedWarningList;
let csvTest = "";

//globals for checker
let reportArray = [];
let globalReport;
let globalReportStringified;
let pausePressed = false;
let maxAchieved = false;
let temporarySave = {
  urlQueue: [],
  urlWarning: [],
  reportArray: [],
};

//measuring time between urls
let timeStart;

function resetGlobal() {
  //reset reportArray too
  reportArray = [];
  globalReport = {
    summary: {
      verdict: "", //final result in plain text
      severity: 0, //most critical error
      totalWarnings: 0,
      warningsPerSeverity: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      summaryPerPage: {
        example1: {
          totalWarnings: 0,
          warningsPerSeverity: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
          },
        },
      },
      crawlInfo: { start: "example1", deepness: 0 },
    },
    context: {}, //context from first site
    reports: [], //array with reports from every site
    rules: {},
    wcagChapter: {
      perceivable: {},
      operable: {},
      understandable: {},
      robust: {},
      bestPractice: {},
    },
  };
}

let tabLoadDelay = 2000; //wait for this amout of msec after a tab has loaded. Delay is needed for js to work.

function changePauseState() {
  let pauseButton = document.getElementById("pauseCheck");
  let continueButton = document.getElementById("continueCheck");

  if (!pausePressed) {
    pauseButton.disabled = true;
    pausePressed = true;
  } else {
    //check if user changed the maxSubDomain number
    let maxNumber = document.getElementById("maxSubDomain");
    if (maxNumber.value > temporarySave.urlWarning.length || maxNumber.value === "") {
      maxAchieved = false;
    }

    //continue check with temporary urlQue if maxAchieved is false
    if (!maxAchieved) {
      pauseButton.disabled = false;
      let startUrl = temporarySave.urlQueue[0].url;
      let urls = [startUrl];
      let urlQue = temporarySave.urlQueue;
      startCheck(urls, startUrl, urlQue);
      pauseButton.style.display = "block";
      continueButton.style.display = "none";
      pausePressed = false;
    } else {
      window.alert(getMessage("errorMaxNumberCrawled"));
    }
  }
}

function showCrawlerOptions() {
  let crawlCheck = document.getElementById("checkboxCrawl");
  let options = document.getElementById("crawlerOptions");
  if (crawlCheck.checked) {
    options.style.display = "flex";
  } else {
    options.style.display = "none";
  }
}

//preprocesses input urls for startcheck
function preStartCheck() {
  //reset temporarySave and globalReport
  temporarySave.urlQueue = [];
  temporarySave.urlWarning = [];
  temporarySave.reportArray = [];
  resetGlobal();

  //annouce start of check to screenreader
  document.getElementById("announcements").innerText = getMessage("startCrawlAnnouncement");


  //disable buttonpress
  let checkButton = document.getElementById("runChecks");
  checkButton.disabled = true;

  //get urls from the textarea
  let urlRaw = document.getElementById("domainsID").value;
  if (!urlRaw) {
    document.querySelector("#urlWarning").style.display = "block";
    return;
  }

  //split urls at comma
  let urls = urlRaw.split(",");

  //url preprocessing
  for (let i = 0; i < urls.length; i++) {
    urls[i] = urls[i].trim();
    if (!urls[i].includes("https://") && !urls[i].includes("http://")) {
      urls[i] = "https://" + urls[i];
    }
    // if (urls[i].slice(-1) !== "/") {
    //   urls[i] = urls[i] + "/";
    // }
  }
  //init base url for crawling with deepness 0
  let startUrl = urls[0];
  let urlQueue = [{ url: startUrl, deepness: 0 }];

  startCheck(urls, startUrl, urlQueue);
}

let activeTabId;

//run function on window close
window.onbeforeunload = function () {
  console.log(activeTabId);
  if(activeTabId) {

    chrome.tabs.remove(activeTabId, function() { console.log("Tab closed"); });
  }

}

//main function for crawling and checking process
function startCheck(urls, startUrl, urlQueue) {
  //timepoint for urlQueue
  timeStart = Date.now();
  //reset previous test
  resetCounter();
  resetSectionCounters();

  //reset maxAchieved
  maxAchieved = false;

  //remove selectionbar, direkt output, downloadsection and chart from previous tests
  removeElemFromSelector("urlSelect");
  document.getElementById("outputAndDownload").style.display = "none";
  document.getElementById("selectBlock").style.visibility = "hidden";
  document.getElementById("chartBlock").style.display = "none";

  //Main functional component for running crawler and checker
  //Check if user want site crawled and checked or only checked
  let checkBoxCrawler = document.getElementById("checkboxCrawl").checked;
  let crawlDeepness = document.getElementById("crawlDeepness").value;
  //this is the variable for the window that will open while sites and or subsites will be scanned
  let currentTabID;
  if (checkBoxCrawler) {
    //only enable pause function when crawler is used
    //enable pause button
    let pauseButton = document.getElementById("pauseCheck");
    pauseButton.style.display = "block";

    if (urls.length === 1) {
      //Default Crawldeepness
      if (!crawlDeepness || crawlDeepness < 1) {
        crawlDeepness = 1;
      }
      console.log(urls[0]);

      //reset Counter for warnings
      resetCounter();
      resetSectionCounters();

      // let startUrl = urls[0];
      // let urlQueue = [{ url: startUrl, deepness: 0 }];
      let nextUrl;

      //init found, warning and result lists
      let allUrls = [];
      urlWarning = [];
      let linksFromCrawler = [];

      //init boolean for the first site opening
      let windowCreated = false;

      //timeOut for sites not loading
      let timeOut = setTimeout(function () {
        console.log("Times up!");
      }, 20000);

      //main handle for recursivly process the filled queue
      function handleUrl() {
        //Check if queue is empty
        //console.log("queue length: ", urlQueue.length);
        if (urlQueue.length > 0) {
          //reset timeout
          clearTimeout(timeOut);
          timeOut = setTimeout(function () {
            console.log("Times up! Next Url: ", nextUrl);
            handleUrl();
          }, 20000);
          //Update visual Queue and loading circle
          let maxSubDomains = document.getElementById("maxSubDomain");
          let checkedNumb = Number(maxSubDomains.value);
          let resultLength = temporarySave.urlWarning.length;
          if(document.getElementById("queueLength").innerHTML !== (Math.min(urlQueue.length, checkedNumb-resultLength)).toFixed(0)) {
            document.getElementById("queueLength").innerHTML = (Math.min(urlQueue.length, checkedNumb-resultLength)).toFixed(0);
          }
          document.getElementById("loadingBlock").style.display = "contents";
          document.getElementById("loadingCircle").style.display = "contents";

          //remove skipError button
          document.getElementById("skipErrorBlock").style.display = "none";

          //reduce urlQueue by its first Element and save it in nextUrl
          //console.log("nexturl is first element of", JSON.parse(JSON.stringify(urlQueue)));
          nextUrl = urlQueue.shift();

          //check if deepness is not to high
          if (nextUrl.deepness <= crawlDeepness) {
            //First Time create new Window, then just tab update
            if (!windowCreated) {
              windowCreated = true;

              //get current tab id. then create new window with first url, then change focus to popup again
              chrome.windows.getCurrent(function (current) {
                chrome.windows.create(
                  {
                    url: nextUrl.url,
                    type: "popup",
                    height: 768,
                    width: 1366, //laptop proportions
                  },
                  () => {
                    chrome.tabs.query({ active: true }, (tabs) => {
                      for (let i = 0; i < tabs.length; i++) {
                        if (tabs[i].pendingUrl) {
                          currentTabID = tabs[i].id;
                          activeTabId = currentTabID;
                        }
                        //change back to popup window
                        chrome.windows.update(current.id, { focused: true });
                      }
                    });
                  }
                );
              });
            } else {
              //load new url in open tab and remove Listener from last tab
              chrome.tabs.update(currentTabID, { url: nextUrl.url }, () => {
                //check for status code errors

                chrome.tabs.onUpdated.removeListener(tabLaden);
              });
            }

            //call tabLaden, if new url is loaded in tab, then sendMessage to crawler.js and process response
            function tabLaden(tabId, changeInfo, tab) {
              if (tab.id === currentTabID && changeInfo.status === "complete") {
                currentTabID = tab.id;
                activeTabId = currentTabID;
                chrome.tabs.sendMessage(
                  tab.id,
                  {
                    greeting: "runCrawler",
                    urlObject: nextUrl,
                    urlQueue: urlQueue,
                    allUrls: allUrls,
                    startUrl: startUrl,
                    crawlDeepness: crawlDeepness,
                  },
                  (response) => {
                    if (!chrome.runtime.lastError) {
                      linksFromCrawler = response.linksCrawler;
                      allUrls = response.allUrls;
                      if (linksFromCrawler.length > 0) {
                        console.log("Neue Links: ", linksFromCrawler);
                      }

                      //Only add new Links to urlQueue, if deepness <= crawlDeepness
                      for (i = 0; i < response.linksCrawler.length; i++) {
                        if (linksFromCrawler[i].deepness <= crawlDeepness) {
                          urlQueue.push(linksFromCrawler[i]);
                        }
                      }
                      //Debug
                      console.log("urlQueue:", urlQueue, "und nextUrl: ", nextUrl);
                      //small timeout so that javascript code on the website can load
                      setTimeout(function () {
                        //run WCAG Check for loaded site
                        chrome.tabs.sendMessage(tab.id, { greeting: "runCheck" }, function (response) {
                          //add warning to the local variable temporarySave
                          console.log("Response", response);
                          try {
                            //push for temporary save
                            temporarySave.urlWarning.push({
                              url: tab.url,
                              warnings: response.result,
                            });
                            temporarySave.urlWarning = [...new Set(temporarySave.urlWarning)];

                            temporarySave.reportArray.push({
                              page: response.report.context.pageUrl,
                              report: response.report,
                            });
                            temporarySave.reportArray = [...new Set(temporarySave.reportArray)];

                            let resultLength = temporarySave.urlWarning.length;
                            let queLength = urlQueue.length;
                            //check if pause button was pressed
                            if (pausePressed) {
                              //save rest of urlQueue in temporary then set queue to zero
                              temporarySave.urlQueue = urlQueue;
                              urlQueue = [];
                              console.log("pause pressed, saved temporary:", temporarySave);
                            } else {
                              //update only if pause is not pressed
                              updateTimer(resultLength, queLength);
                            }

                            //check if maxSubDomains was achieved
                            let maxSubDomains = document.getElementById("maxSubDomain");
                            let checkedNumb = Number(maxSubDomains.value);
                            //check if maxSubDomain value is empty or not
                            let emptyInput = maxSubDomains.value.length === 0 ? true : false;

                            //check if resullenth is greater than max user input - 1 and exclude empty input case,
                            let maxNumberReached = resultLength >= checkedNumb ? true : false;
                            //console.log("debug numbers resultlenth, checkedNumb", resultLength, checkedNumb, emptyInput);

                            //only pause if emptyInput is not true and maxNumber is reached
                            if (!emptyInput && maxNumberReached) {
                              //save rest of urlQueue in temporary then set queue to zero
                              temporarySave.urlQueue = urlQueue;
                              urlQueue = [];
                              console.log("maxSubDomains achieved, rest of Queue:", temporarySave);
                              maxAchieved = true;
                              pausePressed = true;
                            }

                            handleUrl();
                          } catch (errorMessage) {
                            console.log("error", errorMessage);
                            errorUrls.push({
                              url: tab.url,
                              error: errorMessage,
                            });
                            handleUrl();
                          }
                        });
                      }, tabLoadDelay);
                    } else {
                      //Error from open Tab => Default Skip Page
                      console.log("error, site:", chrome.runtime.lastError, nextUrl);
                      document.getElementById("skipErrorBlock").style.display = "inline-block";
                      document.getElementById("skipError").addEventListener("click", () => {
                        console.log("Skipped Url: ", nextUrl.url);
                        handleUrl();
                        document.getElementById("skipErrorBlock").style.display = "none";
                      });
                    }
                  }
                );
              }
            }

            chrome.tabs.onUpdated.addListener(tabLaden);
          } else {
            //next Url in Queue
            handleUrl();
          }
        } else {
          //finish check
          //clear Timeout
          clearTimeout(timeOut);

          //close opened Tab
          chrome.tabs.remove(currentTabID);

          //remove loading circle and show finish or pause message
          let messageFeedback;
          if (maxAchieved) {
            messageFeedback = getMessage("crawlMaxAnnounce1") + temporarySave.urlQueue.length + getMessage("crawlMaxAnnounce2");
          } else if (pausePressed) {
            //pause was pressed
            messageFeedback = getMessage("crawlPausedAnnounce");
          } else {
            messageFeedback = getMessage("crawlFinishedAnnounce");
          }
          document.getElementById("announcements").innerText = getMessage("crawlFinishedAnnounce");

          document.getElementById("queueLength").innerHTML = messageFeedback; //TODO doesnt work at finish because it is hidden after the test is finished
          document.getElementById("loadingCircle").style.display = "none";

          //Show direct output
          document.getElementById("outputAndDownload").style.display = "inline-block";

          //build globalreport
          let preReportArray = JSON.parse(JSON.stringify(temporarySave.reportArray));
          buildGlobalReport(preReportArray, crawlDeepness, startUrl);

          //Fill found urls in Select Element
          fillSelector("urlSelect", temporarySave.urlWarning);
          document.getElementById("selectBlock").style.visibility = "visible";

          //Default stat update with all found Errors
          updateStats(temporarySave.urlWarning, "none");

          //update local variable for old functionality
          urlWarning = temporarySave.urlWarning;

          // //Listener for user selected urls
          // let elemForPreSelect = document.getElementById("urlSelect");
          // elemForPreSelect.addEventListener("change", selectWarning);

          //show error from Checker Urls in console
          if (errorUrls.length > 0) {
            console.log("Checker got error from these sites: ", errorUrls);
          }

          //remove pausebutton
          let pauseButton = document.getElementById("pauseCheck");
          pauseButton.style.display = "none";

          //enable checkbutton if pause is not pressed and maxAchieved is false
          let checkButton = document.getElementById("runChecks");
          if (!pausePressed && !maxAchieved) {
            checkButton.disabled = false;
          }

          //reset timeStart and remove timer
          timeStart = 0;
        }
      }
      handleUrl();
    } else {
      //warning more than one url to crawl
      window.alert(getMessage("errorMultipleUrls"));
    }
  } else {
    //Website check without crawling, list is allowed
    if (urls.length >= 1) {
      urlWarning = [];
      let urlCounter = 0;

      //hide warning results preTable
      document.querySelector("#urlWarning").style.display = "none";

      //Start visual Queue and loading circle
      let maxSubDomains = document.getElementById("maxSubDomain");
      let checkedNumb = Number(maxSubDomains.value);
      let resultLength = temporarySave.urlWarning.length;
      if(document.getElementById("queueLength").innerHTML !== (Math.min(urlQueue.length, checkedNumb-resultLength)).toFixed(0)) {
        document.getElementById("queueLength").innerHTML = (Math.min(urlQueue.length, checkedNumb-resultLength)).toFixed(0);
      }

      document.getElementById("loadingBlock").style.display = "contents";
      document.getElementById("loadingCircle").style.display = "contents";

      chrome.windows.getCurrent(function (current) {
        chrome.windows.create(
          {
            url: urls[0],
            type: "popup",
          },
          () => {
            chrome.tabs.query({ active: true }, (tabs) => {
              for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].pendingUrl) {
                  currentTabID = tabs[i].id;
                  activeTabId = tabs[i].id;
                }
                //change back to popup window
                chrome.windows.update(current.id, { focused: true });
              }
            });
          }
        );
      });

      function tabUpdate(tabId, changeInfo, tab) {
        // make sure the status is 'complete' and it's the right tab
        if (tab.id === currentTabID && changeInfo.status === "complete") {
          //tabId vs tab.id??
          setTimeout(function () {
            chrome.tabs.sendMessage(tab.id, { greeting: "runCheck" }, function (response) {
              //add warning to the local variable
              console.log(response);
              urlWarning.push({ url: tab.url, warnings: response.result });

              //report for pdf
              reportArray.push({
                page: response.report.context.pageUrl,
                report: response.report,
              });
              reportArray = [...new Set(reportArray)];

              urlCounter++;
              //check that urls are
              if (urlCounter < urls.length) {
                //Update visual Queue, loading circle
                if(document.getElementById("queueLength").innerHTML !== (urls.length - urlCounter).toFixed(0)){
                    document.getElementById("queueLength").innerHTML = (urls.length - urlCounter).toFixed(0);
                }
                lastUrl = urls[urlCounter];
                chrome.tabs.update(tab.id, { url: urls[urlCounter] });
              } else {
                //last element
                chrome.tabs.remove(tabId);
                chrome.tabs.onUpdated.removeListener(tabUpdate);
                //remove loading circle
                if(document.getElementById("queueLength").innerHTML !== getMessage("crawlFinishedAnnounce")){
                    document.getElementById("queueLength").innerHTML = getMessage("crawlFinishedAnnounce");
                }
                document.getElementById("loadingCircle").style.display = "none";

                document.getElementById("announcements").innerText = getMessage("crawlFinishedAnnounce");

                //Show direct output
                document.getElementById("outputAndDownload").style.display = "inline-block";

                //Fill found urls in Select Element
                fillSelector("urlSelect", urlWarning);
                document.getElementById("selectBlock").style.visibility = "visible";

                //build globalreport
                //change globalreport deepness to inputdeepness
                let preReportArray = JSON.parse(JSON.stringify(reportArray));
                buildGlobalReport(preReportArray, 0, urls[0]);

                //Default stat update with all found Errors
                updateStats(urlWarning, "none");

                // //Listener for user selected urls
                // let elemForPreSelect = document.getElementById("urlSelect");
                // elemForPreSelect.addEventListener("change", selectWarning);

                //enable checkbutton
                let checkButton = document.getElementById("runChecks");
                checkButton.disabled = false;
              }
            });
          }, tabLoadDelay);
        }
      }

      chrome.tabs.onUpdated.addListener(tabUpdate);
    }
  }
}

//update the estimated timer
function updateTimer(doneLength, restLength) {
  //in seconds
  let timeSinceStart = (Date.now() - timeStart) / 1000;
  let timeLeft = (timeSinceStart / doneLength) * restLength;

  let minutes = Math.floor(timeLeft / 60);
  let seconds = Math.floor(timeLeft % 60);

  //add 0 before singledigit minutes/seconds
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let timeElement = document.getElementById("estimateTime");
  timeElement.textContent = minutes + ":" + seconds;
}

//Fill found warnings into selector
function fillSelector(which, elemArray) {
  //get selected site
  let select = document.getElementById(which);

  //check if elemArray is array or just one element
  if (Array.isArray(elemArray)) {
    for (i = 0; i < elemArray.length; i++) {
      let el = document.createElement("option");
      el.textContent = elemArray[i].url;
      el.value = elemArray[i].url;
      select.appendChild(el);
    }
  } else {
    let preEl = document.createElement("option");
    preEl.textContent = elemArray;
    preEl.value = elemArray;
    select.appendChild(preEl);
  }
}

//Remove elements from select list for next test
function removeElemFromSelector(which) {
  var select = document.getElementById(which);
  for (let i = select.options.length - 1; i > 0; i--) {
    select.remove(i);
  }
}

//Select a specific site and show stats/doughnut-chart
function selectWarning() {
  //remove last result
  resetCounter();
  resetSectionCounters();
  let crawledUrl = document.getElementById("urlSelect").value;
  //show new results
  if (crawledUrl) {
    //show warning for selected url
    updateStats(urlWarning, crawledUrl);
  } else {
    //show all avaible warnings
    updateStats(urlWarning, "none");
  }
}

//update stats and call chartWarnings for doughnut-chart
function updateStats(combinedArray, selectedUrl) {
  selectedWarningList = [];
  console.log("Aus updateStats: ", combinedArray);
  //remove last chart
  if (myChart) {
    myChart.destroy();
  }
  let warningArray = [];
  if (selectedUrl === "none") {
    for (let i = 0; i < combinedArray.length; i++) {
      warningArray.push(combinedArray[i].warnings);
    }
    //flatten two dimensional array
    warningArray = [].concat.apply([], warningArray);
    //ChartWARNINGS
    chartWarnings(warningArray);
    selectedWarningList = warningArray;
  } else {
    //find warning for selectedUrl
    for (let i = 0; i < combinedArray.length; i++) {
      if (combinedArray[i].url === selectedUrl) {
        warningArray.push(combinedArray[i].warnings);
      }
    }
    warningArray = [].concat.apply([], warningArray);
    chartWarnings(warningArray);
    selectedWarningList = warningArray;
  }
  updateCounter(warningArray);
  updateSectionCounters(warningArray);

  //make continue button available if pause is pressed or maxSubdomains achieved
  let pauseButton = document.getElementById("pauseCheck");
  let continueButton = document.getElementById("continueCheck");
  if (pausePressed || maxAchieved) {
    pauseButton.style.display = "none";
    continueButton.style.display = "block";
  } else {
    //remove loadingBlock
    document.getElementById("loadingBlock").style.display = "none";
  }
}

//Display doughnut-chart
function chartWarnings(warningArray) {
  //Filter type from warningArray
  let categorizedArray = [];
  for (let i = 0; i < warningArray.length; i++) {
    categorizedArray.push(warningArray[i].type);
  }
  categorizedArray.sort();
  let firstEl = categorizedArray[0];
  let counter = 0;
  let numbOfArray = [];
  if (firstEl) {
    for (i = 0; i < categorizedArray.length; i++) {
      if (firstEl === categorizedArray[i]) {
        counter++;
      } else {
        numbOfArray.push({ type: firstEl, number: counter });
        firstEl = categorizedArray[i];
        counter = 1;
      }
      //If Site has only one Errortype:
      if (counter === categorizedArray.length) {
        numbOfArray.push({ type: firstEl, number: counter });
      }
    }
    //Datastructure warningArray: [{url: ddd, warnings: [array with warnings]}]
    document.getElementById("chartBlock").style.display = "inline-block";
    // console.log("chart warningarray: ", warningArray);
    // console.log("kategorisiert: ", categorizedArray);
    // console.log("gezählt: ", numbOfArray);
    const ctx = document.getElementById("chart").getContext("2d");
    const xlabels = numbOfArray.map((el) => el.type);
    const dataArray = numbOfArray.map((el) => el.number);

    //margin between legend and chart
    const legendMargin = {
      id: "legendMargin",
      afterInit(chart) {
        const fitValue = chart.legend.fit;
        chart.legend.fit = function fit() {
          fitValue.bind(chart.legend)();
          let width = (this.width += 100);
          return width;
        };
      },
    };
    myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: xlabels,
        datasets: [
          {
            label: "# of Errors",
            data: dataArray,
            backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)", "rgba(75, 192, 192, 0.5)", "rgba(153, 102, 255, 0.5)", "rgba(255, 159, 64, 0.5)", "rgba(232, 90, 204, 0.5)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)", "rgba(232, 90, 204, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "left",
            //rtl: true,
            labels: {
              color: "white",
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      plugins: [legendMargin],
    });
  } else {
    window.alert(getMessage("errorWarningsNotFound"));
  }
}

//define seperator
let sep = ";";

//Download CSV for selected Site
function shortCSVDownload() {
  let shortReportCsv = "";
  let topRow = getMessage("csvTopRow") + "\n";

  //get selected Site
  let crawledUrl = document.getElementById("urlSelect").value;

  if (crawledUrl) {
    shortReportCsv += buildSingleUrlShortCSV(urlWarning, crawledUrl);
  } else {
    //Alle Urls => Gesamtübersicht und einzelne Auflistung
    let memoryArray = [];
    let head = getMessage("csvHeadShort") + " \n\n";
    let headBody = getMessage("csvUrls") + " \n\n";
    let urlTable = "";
    for (let i = 0; i < urlWarning.length; i++) {
      urlTable += buildSingleUrlShortCSV(urlWarning, urlWarning[i].url) + "\n";
      //Alle Warnungen sammeln
      memoryArray = [...memoryArray, ...urlWarning[i].warnings];
    }

    let headTable = buildResultTableShort(topRow, memoryArray);
    shortReportCsv += head + headTable + "\n\n\n" + headBody + urlTable;
  }
  download("WCAG_Short_Report_" + urlWarning[0].url.replace("/", "").replace("https:", "") + ".csv", shortReportCsv);
}

function longCSVDownload() {
  //console.log(urlWarning);
  let longReportCsv = "";
  let crawledUrl = document.getElementById("urlSelect").value;
  let topRow = getMessage("csvTopRow") + "\n";

  if (crawledUrl) {
    //single site selected
    longReportCsv += buildSingleUrlLongCSV(urlWarning, crawledUrl);
  } else {
    //all Sites are selected
    let head = "";
    let headBody = getMessage("csvHeadLong") + " \n\n";
    let urlTable = "";

    //save all warnings
    let memoryArray = [];
    for (let i = 0; i < urlWarning.length; i++) {
      urlTable += buildSingleUrlLongCSV(urlWarning, urlWarning[i].url) + "\n";
      memoryArray = [...memoryArray, ...urlWarning[i].warnings];
    }

    let headTable = buildResultTableShort(topRow, memoryArray);
    // longReportCsv += head + headTable + "\n\n\n" + headBody + urlTable;
    longReportCsv += headBody + urlTable;
  }
  csvTest = longReportCsv;
  download("WCAG_Detailed_Report_" + urlWarning[0].url.replace("/", "").replace("https:", "") + ".csv", longReportCsv);
}

function buildSingleUrlLongCSV(array, filterUrl) {
  let returnString = "";
  //declare head rows and table
  let head = filterUrl + "\n";
  let bodyTableHead = "";
  let bodyTable = "";

  //save all warnings for specific url from urlWarnings
  let foundUrl = array.filter((el) => el.url === filterUrl);
  let warningArray = foundUrl[0].warnings;
  console.log(warningArray);

  //build tablehead
  bodyTableHead = getMessage("csvTopRowLong") + " \n";

  //build tablebody
  for (let i = 0; i < warningArray.length; i++) {
    let bodyTableRow = "";
    bodyTableRow = getDetails(warningArray[i]);
    bodyTable += bodyTableRow + "\n";
  }
  returnString += head + bodyTableHead + bodyTable;
  return returnString;
}

function buildSingleUrlShortCSV(array, filterUrl) {
  let csvRaw = "";
  let topRow = getMessage("csvTopRow") + "\n";
  //selected Url
  //build CSV-file (one selected Url)
  console.log(array, filterUrl);
  let urlWithWarnings = array.filter((el) => el.url === filterUrl);
  console.log(urlWithWarnings);

  //Kopfzeile und Tabellenkopf
  let headRow = filterUrl + "\n" + topRow;
  csvRaw = headRow;

  //Tabelleninhalt
  let bodyTable = "";
  //console.log(urlWithWarnings[0].warnings);
  let warningArray = urlWithWarnings[0].warnings;
  let typeWarnings = warningArray.map((el) => el.type);
  //console.log(warningArray);
  typeWarnings = [...new Set(typeWarnings)];
  console.log(warningArray);
  console.log(typeWarnings);

  //table body
  for (let i = 0; i < typeWarnings.length; i++) {
    //count appeareances from type in urlWithWarnings
    let filteredList = warningArray.filter((el) => el.type === typeWarnings[i]);
    let severityList = filteredList.map((el) => el.severity);
    let maxSev = Math.max(...severityList);
    let refrence = filteredList[0].refWCAG;
    let counter = filteredList.length;
    //console.log(counter, refrence, severityList, maxSev);
    let newRow = typeWarnings[i] + sep + refrence + sep + severityToText(maxSev) + sep + counter;
    console.log(newRow);
    bodyTable += newRow + "\n";
  }
  csvRaw += bodyTable;
  return csvRaw;
}

function buildResultTableShort(tableHead, allWarnings) {
  console.log(allWarnings);
  let headTable = tableHead;
  let typeWarnings = allWarnings.map((el) => el.type);
  typeWarnings = [...new Set(typeWarnings)];

  for (let i = 0; i < typeWarnings.length; i++) {
    let filteredList = allWarnings.filter((el) => el.type === typeWarnings[i]);
    let severityList = filteredList.map((el) => el.severity);
    let maxSev = Math.max(...severityList);
    let refrence = filteredList[0].refWCAG;
    let counter = filteredList.length;
    //console.log(counter, refrence, severityList, maxSev);
    let newRow = typeWarnings[i] + sep + refrence + sep + severityToText(maxSev) + sep + counter;
    //console.log(newRow);
    headTable += newRow + "\n";
  }

  return headTable;
}

function getDetails(dataObject) {
  //console.log('in longcsv', dataObject);
  //get the entry from dataObject for the specific categories in detailsArray
  //Input all Details to show in Table
  let detailsArray = ["type", "refWCAG", "severity", "content", "tip", "metaData"];
  let returnString = "";
  for (let i = 0; i < detailsArray.length; i++) {
    let stringForThisDetail = "";
    if (detailsArray[i] === "metaData") {
      //metaData case
      let html = dataObject.metaData.outerHtml;
      let textContent = dataObject.metaData.textContent;
      stringForThisDetail = remSep(html) + sep + remSep(textContent) + sep;
    } else if (detailsArray[i] === "severity") {
      //get right translation with
      let severity = severityToText(dataObject.outcome.severity);
      stringForThisDetail = severity + sep;
    } else {
      //general case
      stringForThisDetail = remSep(dataObject[detailsArray[i]]) + sep;
    }
    returnString += stringForThisDetail;
  }
  // console.log("Dataobject:", dataObject);
  // console.log("ReturnString:");
  // console.log(returnString);
  return returnString;
}

function remSep(string) {
  let returnString = "NO DATA";
  if (string) {
    //console.log("Vor Replace:", JSON.stringify(string));
    returnString = string.toString().replace(/\n/g, "");
    returnString = returnString.replace(/;/g, "");
    returnString = returnString.replace(/\t/g, "");
    //console.log("After Replace:", JSON.stringify(returnString));
  }
  return returnString;
}

//Excel functions:
async function excelStyleLongData() {
  let allWarnings = urlWarning;
  let filterUrl = document.getElementById("urlSelect").value;
  let color = "#04bfd2";
  let borderThickness = "thin";
  //definde headRow with categorys
  let headRow = [
    { value: getMessage("excel1"), fontWeight: "bold", backgroundColor: color }, // url
    { value: getMessage("excel2"), fontWeight: "bold", backgroundColor: color }, // Prüfschritt
    { value: getMessage("excel3"), fontWeight: "bold", backgroundColor: color }, // WCAG Ref
    { value: getMessage("excel4"), fontWeight: "bold", backgroundColor: color }, //Ergebnos
    { value: getMessage("excel5"), fontWeight: "bold", backgroundColor: color }, //Inhalt
    { value: getMessage("excel6"), fontWeight: "bold", backgroundColor: color }, //Tippp
    { value: getMessage("excel7"), fontWeight: "bold", backgroundColor: color }, //Text INhalt
    { value: getMessage("excel8"), fontWeight: "bold", backgroundColor: color }, //HTML-Element
  ];
  //define column wideness for excel file
  const columns = [{ width: 20 }, { width: 20 }, { width: 10 }, { width: 12 }, { width: 40 }, { width: 40 }, { width: 20 }, { width: 40 }];

  let finalArray = [];
  if (filterUrl) {
    //single url is selected
    //build headRow
    finalArray.push(headRow);

    //find warningObject for filterUrl
    let foundUrlObject = allWarnings.filter((el) => el.url === filterUrl);

    //build tableHead
    let warningTableHead = [
      { value: foundUrlObject[0].url, fontWeight: "bold", bottomBorderStyle: borderThickness },
      { value: "", bottomBorderStyle: borderThickness },
      { value: "", bottomBorderStyle: borderThickness },
      { value: "", bottomBorderStyle: borderThickness },
      { value: "", bottomBorderStyle: borderThickness },
      { value: "", bottomBorderStyle: borderThickness },
      { value: "", bottomBorderStyle: borderThickness },
      { value: "", bottomBorderStyle: borderThickness },
    ];
    finalArray.push(warningTableHead);

    //all warnings for filtered url
    let warningArray = foundUrlObject[0].warnings;

    //build warningTable with all warnings for filterUrl
    let warningTable = buildTableObjectLongData(warningArray);
    finalArray = [...finalArray, ...warningTable];

    //write and save file
    const blob = await writeXlsxFile(finalArray, {
      columns,
      sheet: "wcag_long_report",
    });
    saveAs(blob, "WCAG_Detailed_Report_" + urlWarning[0].url.replace("/", "").replace("https:", "") + ".xlsx");
  } else {
    //all found urls are selected => show short table with most common warnings
    let emptyRow = [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }];

    //if allWarnings includes a crawled list, we can show a short summation of most found errors
    if (isListCrawled(allWarnings)) {
      //head table block: structure = array of arrays
      let headTableBlock = buildHeadTableBlock(allWarnings);
      console.log("HeadTableBlock: ", headTableBlock);
      finalArray = [...finalArray, ...headTableBlock];
      finalArray.push(emptyRow);
    }

    //build headRow
    finalArray.push(headRow);

    //iterate through all urls
    for (let i = 0; i < allWarnings.length; i++) {
      //build tableblock for one site

      //start with table head
      let warningTableHead = [
        { value: allWarnings[i].url, fontWeight: "bold", bottomBorderStyle: borderThickness },
        { value: "", bottomBorderStyle: borderThickness },
        { value: "", bottomBorderStyle: borderThickness },
        { value: "", bottomBorderStyle: borderThickness },
        { value: "", bottomBorderStyle: borderThickness },
        { value: "", bottomBorderStyle: borderThickness },
        { value: "", bottomBorderStyle: borderThickness },
        { value: "", bottomBorderStyle: borderThickness },
      ];
      finalArray.push(warningTableHead);

      //now all warnings for specific i-th url
      let warningsToAdd = allWarnings[i].warnings;
      let tableblock = buildTableObjectLongData(warningsToAdd);
      finalArray = [...finalArray, ...tableblock];

      //push emptyrow for space between tableblocks
      finalArray.push(emptyRow);
    }
    console.log("EndTable:", finalArray);

    //write and save file
    const blob = await writeXlsxFile(finalArray, {
      columns,
      sheet: "wcag_long_report",
    });
    saveAs(blob, "WCAG_Detailed_Report_" + urlWarning[0].url.replace("/", "").replace("https:", "") + ".xlsx");
  }
}

//helper: check if sites from urlWarning are crawled or from different domains
function isListCrawled(urlWarning) {
  let firstUrl = urlWarning[0].url;
  let secondUrl;
  //get basic part of the url from "//" to first "/"
  let urlStringArray = firstUrl.split("//");
  let basicPart = urlStringArray[1].split("/")[0];
  if (urlWarning[1]) {
    //if second url is avaible
    secondUrl = urlWarning[1].url;
    if (secondUrl.includes(firstUrl) || firstUrl.includes(secondUrl)) {
      //crawled list normal case
      return true;
    } else if (secondUrl.includes(basicPart) && secondUrl !== firstUrl) {
      //sometimes firsturl has for example "/index.html", but subsides doesn't
      return true;
    } else {
      //not crawled list
      return false;
    }
  } else {
    //only one url
    return false;
  }
}

//helper: build head table block
function buildHeadTableBlock(allWarnings) {
  let tableBlock = [];
  let documentHead = [{ value: getMessage("excellongHead"), fontWeight: "bold" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }];
  tableBlock.push(documentHead);
  let color = "#eb568b";
  let headTableHead = [
    { value: getMessage("excel10"), fontWeight: "bold", backgroundColor: color },
    { value: getMessage("excel2"), fontWeight: "bold", backgroundColor: color },
    { value: getMessage("excel3"), fontWeight: "bold", backgroundColor: color },
    { value: getMessage("excel4"), fontWeight: "bold", backgroundColor: color },
    { value: getMessage("excel5"), backgroundColor: color },
    { value: getMessage("excel6"), backgroundColor: color },
    { value: getMessage("excel7"), backgroundColor: color },
    { value: getMessage("excel8"), backgroundColor: color },
  ];
  tableBlock.push(headTableHead);

  //get top n most common warnings and add to table
  console.log(allWarnings);
  //write allWarnings as array of error elements
  let listArray = [];
  for (let i in allWarnings) {
    allWarnings[i].warnings.forEach((el) => {
      listArray.push(el);
    });
  }
  //console.log("listarray", listArray);
  let topWarningsWC = mostRecognizedWarnings(listArray, 10);
  console.log("TopWArnings: ", topWarningsWC);

  for (let i = 0; i < topWarningsWC.length; i++) {
    if (topWarningsWC[i]) {
      let oneWarning = topWarningsWC[i].element;
      let backGround = severityToColor(oneWarning.severity);
      try {
        let headTableRow = [
          { value: topWarningsWC[i].counter, fontWeight: "bold" },
          { value: oneWarning.type, fontWeight: "bold" },
          { value: oneWarning.refWCAG, fontWeight: "bold" },
          { value: severityToText(oneWarning.outcome.severity), fontWeight: "bold", backgroundColor: backGround },
          { value: oneWarning.content },
          { value: oneWarning.tip },
          { value: remSepEx(oneWarning.metaData.textContent) },
          { value: remSepEx(oneWarning.metaData.outerHtml) },
          { value: " " },
        ];
        tableBlock.push(headTableRow);
      } catch (err) {
        console.log("Fehler: ", err);
        console.log("Element: ", oneWarning);
      }
    }
  }

  return tableBlock;
}

//helper: builds array for excelTable with warning Object
function buildTableObjectLongData(multipleWarnings) {
  //console.log("input:", multipleWarnings);
  let resultArray = [];
  for (let i = 0; i < multipleWarnings.length; i++) {
    //if severity 1 || 2 => yellow, 3 || 4 red, else green
    let backGround = severityToColor(multipleWarnings[i].severity);
    let rowArray = [
      { value: "" },
      { value: multipleWarnings[i].type, fontWeight: "bold" },
      { value: multipleWarnings[i].refWCAG, fontWeight: "bold" },
      { value: severityToText(multipleWarnings[i].outcome.severity), fontWeight: "bold", backgroundColor: backGround },
      { value: multipleWarnings[i].content },
      { value: multipleWarnings[i].tip },
      { value: remSepEx(multipleWarnings[i].metaData.textContent) },
      { value: remSepEx(multipleWarnings[i].metaData.outerHtml) },
      { value: " " },
    ];
    resultArray.push(rowArray);
    //console.log("Array:", i, " pushed: ", objectToAdd);
  }
  return resultArray;
}

async function excelStyleShortData() {
  let allWarnings = urlWarning;
  let filterUrl = document.getElementById("urlSelect").value;
  let color = "#04bfd2";
  let borderThickness = "thin";

  //define column wideness for excel file
  const columns = [{ width: 20 }, { width: 20 }, { width: 10 }, { width: 15 }, { width: 20 }];

  let finalArray = [];

  if (filterUrl) {
    //single url is selected
    //definde headRow with categorys
    let headRow = [
      { value: filterUrl, fontWeight: "bold", backgroundColor: color },
      { value: getMessage("excel2"), fontWeight: "bold", backgroundColor: color, align: "center" },
      { value: getMessage("excel3"), fontWeight: "bold", backgroundColor: color, align: "center" },
      { value: getMessage("excel9"), fontWeight: "bold", backgroundColor: color, align: "center" },
      { value: getMessage("excel10"), fontWeight: "bold", backgroundColor: color, align: "center" },
    ];
    //build headRow
    finalArray.push(headRow);

    //find warningObject for filterUrl
    let foundUrlObject = allWarnings.filter((el) => el.url === filterUrl);

    //build and add bodytable
    let tableBody = buildTableBodyShortData(foundUrlObject);
    finalArray = [...finalArray, ...tableBody];

    //write and save file
    const blob = await writeXlsxFile(finalArray, {
      columns,
      sheet: "wcag_short_report",
    });
    saveAs(blob, "WCAG_Short_Report_" + urlWarning[0].url.replace("/", "").replace("https:", "") + ".xlsx");
  } else {
    //all found urls are selected
    //iterate through all urls
    for (let i = 0; i < allWarnings.length; i++) {
      //build tableblock for one site
      //build headRow
      let headRow = [
        { value: allWarnings[i].url, fontWeight: "bold", backgroundColor: color },
        { value: getMessage("excel2"), fontWeight: "bold", backgroundColor: color, align: "center" },
        { value: getMessage("excel3"), fontWeight: "bold", backgroundColor: color, align: "center" },
        { value: getMessage("excel9"), fontWeight: "bold", backgroundColor: color, align: "center" },
        { value: getMessage("excel10"), fontWeight: "bold", backgroundColor: color, align: "center" },
      ];
      finalArray.push(headRow);

      //find warningObject for filterUrl
      let filterUrl = allWarnings[i].url;
      let foundUrlObject = allWarnings.filter((el) => el.url === filterUrl);

      //add builded Rows to finalArray
      let tableBody = buildTableBodyShortData(foundUrlObject);
      finalArray = [...finalArray, ...tableBody];
    }

    //write and save file
    const blob = await writeXlsxFile(finalArray, {
      columns,
      sheet: "wcag_short_report",
    });
    saveAs(blob, "WCAG_Short_Report_" + urlWarning[0].url.replace("/", "").replace("https:", "") + ".xlsx");
  }
}

//helper: builds array for excelTable with warning Object
function buildTableBodyShortData(foundUrlObject) {
  console.log("object: ", foundUrlObject);
  let returnArray = [];

  //get typeWarnings list and warnings for one Url out of Object
  let warningsOneUrl = foundUrlObject[0].warnings;
  let typeWarnings = warningsOneUrl.map((el) => el.type);
  typeWarnings = [...new Set(typeWarnings)];

  //head table body
  for (let i = 0; i < typeWarnings.length; i++) {
    //count appeareances from type in urlWithWarnings
    let filteredList = warningsOneUrl.filter((el) => el.type === typeWarnings[i]);
    let maxSeverity = 0;
    //find first maximum severity element
    for (let j = 0; j < filteredList.length; j++) {
      if (filteredList[j].severity > maxSeverity) {
        maxSeverity = filteredList[j].severity;
      }
    }
    //find first Element with severity level max for language description
    let maxSeverityElement = filteredList.find((el) => el.severity === maxSeverity);
    let maxSevDescription = severityToText(maxSeverityElement.outcome.severity);

    //if severity <= 2 => cell yellow, else red
    let backGround = severityToColor(maxSeverityElement.severity);

    //Count number of warnings with specific category
    let counter = filteredList.length;

    //build head table row
    let type = typeWarnings[i];
    let refrence = filteredList[0].refWCAG;
    let headTableRow = [{ value: "" }, { value: type }, { value: refrence }, { value: maxSevDescription, backgroundColor: backGround }, { value: counter }];
    //add head table row
    returnArray.push(headTableRow);
  }
  //add empty row
  let emptyRow = [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }];
  returnArray.push(emptyRow);

  return returnArray;
}

function remSepEx(string) {
  let returnString = " ";
  if (string) {
    //console.log("Vor Replace:", JSON.stringify(string));
    returnString = string.toString().replace(/\n/g, "");
    returnString = returnString.replace(/;/g, "");
    returnString = returnString.replace(/\t/g, "");
    //console.log("After Replace:", JSON.stringify(returnString));
  }
  return returnString;
}

function severityToColor(severity) {
  let backGround = "";
  if (severity > 2) {
    backGround = "#ff0000";
  } else if (severity === 2 || severity === 1) {
    backGround = "#ffff00";
  } else {
    backGround = "#00a933";
  }
  return backGround;
}

let shortReport;
let detailedReport;
let shortReportCSV = "";
let detailedReportCSV = "";
let csvSelektor = ";";

function updateSectionCounters(warningArray) {
  //console.log("updateSectionCounters", warningArray);
  let pageSource;
  let oneSite = true;
  if (warningArray[0]) {
    pageSource = warningArray[0].page;
    //check if its one url or all urls among the warningArray
    for (let warning of warningArray) {
      if (warning.page !== pageSource) {
        oneSite = false;
      }
    }
  }

  let wcagChap;
  //search the wcapChapter part specific for the chosen site or just use the full report if all pages are selected
  if (oneSite) {
    for (let report of globalReport.reportArray) {
      if (report.page === pageSource) {
        //console.log("specific site case");
        wcagChap = Object.assign({}, report.report.wcagChapter);
      }
    }
  } else {
    wcagChap = Object.assign({}, globalReport.wcagChapter);
    //console.log("globalcase");
  }
  //console.log("wcagChap with site", wcagChap, pageSource, oneSite);

  // console.log("wcagRuleInfos", wcagRuleInfos);

  //write the first line in the csv file
  let topRow = document.querySelector("#topLevelTable");
  for (let i = 0; i < topRow.children.length; i++) {
    if (!topRow.children[i].textContent) {
      continue;
    }
    //console.log(topRow.children[i]);
    shortReportCSV += topRow.children[i].textContent;
    if (i === topRow.children.length - 1) {
      shortReportCSV += "\n";
    } else {
      shortReportCSV += csvSelektor;
    }
  }

  //fill the resulttable in popup.html and for shortReportCSV
  let tableBody = document.getElementById("ruleResultsBody");
  for (let category in wcagChap) {
    for (let rule in wcagChap[category]) {
      let tableRow = tableBody.insertRow(0);
      let name;
      let wcagLvl;
      //sometimes error with loading rule language variables from wcagTest.js
      if (wcagRuleInfos[rule]) {
        name = wcagRuleInfos[rule].name;
        wcagLvl = wcagRuleInfos[rule].wcagLvl;
      } else {
        console.log("wcagRuleInfo at ", rule, " not defined");
      }
      let wcagRef = rule.toString();
      let wcagSeverity = wcagChap[category][rule].severity;
      let wcagResult = severityToText(wcagSeverity);
      let totalErrors = wcagChap[category][rule].totalErrors;

      if (wcagSeverity !== 0) {
        addCell(tableRow, name);
        switch (wcagLvl) {
          case "A":
            addHtmlCell(tableRow, '<img alt="" src="public/images/wcagLvlA.png"> <span class="sr_only">WCAG Level A</span>');
            break;
          case "AA":
            addHtmlCell(tableRow, '<img alt="" src="public/images/wcagLvlAA.png"> <span class="sr_only">WCAG Level AA</span>');
            break;
          case "AAA":
            addHtmlCell(tableRow, '<img alt="" src="public/images/wcagLvlAAA.png"> <span class="sr_only">WCAG Level AAA</span>');
            break;
          case "Best Practice":
            addHtmlCell(tableRow, '<img alt="" src="public/images/bestPractice.png"> <span class="sr_only">Best Practice</span>');
            break;
        }
        addCell(tableRow, wcagRef);
        addCell(tableRow, wcagResult);
        addCell(tableRow, totalErrors);
        tableBody.appendChild(tableRow);
      } else {
        tableRow.remove();
      }
      shortReportCSV += name + csvSelektor + wcagRef + csvSelektor + wcagResult + csvSelektor + totalErrors + "\n";
    }
  }
  //shortReport = activeRules;
  detailedReport = warningArray;

  //old functionality for short json report
  function levelToInt(level) {
    switch (level) {
      case getMessage("4Txt"):
        return 4;
      case getMessage("3Txt"):
        return 3;
      case getMessage("2Txt"):
        return 2;
      case getMessage("1Txt"):
        return 1;
      case getMessage("0Txt"):
        return 0;
    }
  }
  let activeRules = Object.assign({}, wcagRuleInfos);
  //set all to fullfilled
  for (let rule in activeRules) {
    activeRules[rule]["result"] = getMessage("0Txt");
    activeRules[rule]["counter"] = 0;
  }
  for (let i = 0; i < warningArray.length; i++) {
    //check if the warning is more severe than the current one
    for (let j = 0; j < warningArray[i].refWCAGArr.length; j++) {
      if (warningArray[i].severity > levelToInt(activeRules[warningArray[i].refWCAGArr[j]].result)) {
        activeRules[warningArray[i].refWCAGArr[j]].result = warningArray[i].outcome.verdict;
      }
      activeRules[warningArray[i].refWCAGArr[j]].counter++;
      if (activeRules[warningArray[i].refWCAG].manuelCheck) {
        activeRules[warningArray[i].refWCAG].result = getMessage("manualCheck");
      }
    }
  }
  shortReport = activeRules;
}

//helper for tableRow building
function addCell(tr, text) {
  const td = tr.insertCell();
  td.textContent = text;
  return td;
}

function addHtmlCell(tr, text) {
  const td = tr.insertCell();
  td.innerHTML = text;
  return td;
}

function severityToText(level) {
  switch (level) {
    case 4:
      return getMessage("4Txt");
    case 3:
      return getMessage("3Txt");
    case 2:
      return getMessage("2Txt");
    case 1:
      return getMessage("1Txt");
    case 0:
      return getMessage("0Txt");
  }
}

function resetSectionCounters() {
  let rows = document.getElementById("ruleResults").querySelectorAll("tr:not(#topLevelTable)");
  for (let i = 0; i < rows.length; i++) {
    rows[i].remove();
  }
}

function updateCounter(warningArray) {
  //console.log(warningArray.length);
  for (let i = 0; i < warningArray.length; i++) {
    switch (warningArray[i].severity) {
      case 4:
        document.getElementById("counter4").textContent = (parseInt(document.getElementById("counter4").textContent) + 1).toString();
        break;
      case 3:
        document.getElementById("counter3").textContent = (parseInt(document.getElementById("counter3").textContent) + 1).toString();
        break;
      case 2:
        document.getElementById("counter2").textContent = (parseInt(document.getElementById("counter2").textContent) + 1).toString();
        break;
      case 1:
        document.getElementById("counter1").textContent = (parseInt(document.getElementById("counter1").textContent) + 1).toString();
        break;
    }
  }
  document.getElementById("totalErrors").textContent = warningArray.length.toString();
}

function resetCounter() {
  console.log("reset");
  document.getElementById("counter4").textContent = "0";
  document.getElementById("counter3").textContent = "0";
  document.getElementById("counter2").textContent = "0";
  document.getElementById("counter1").textContent = "0";
  document.getElementById("totalErrors").textContent = "0";
}

function mostCommonError(globalRep, topN) {
  console.log("input mostCommon", globalRep, topN);
  //first change structure of rules Object: not url as elements but list of sources with attribute page
  let withPageArr = setPageToSrc(globalRep);
  //calculate #errorsources in a rule
  let countArr = countTotalErrors(withPageArr);
  //get top N Errors
  let topNArr = selectTopNErrors(countArr, topN);

  return topNArr;
}

function setPageToSrc(globalRep) {
  let returnArr = [];
  const rules = globalRep.rules;
  for (let rule in rules) {
    //create array with sources and page
    let sourceCount = [];
    //check for totalErrors on rule > 0
    if (rules[rule].outcome.totalErrors > 0) {
      let pageList = rules[rule].perPage;
      for (let page in pageList) {
        //check for totalErrors on page > 0
        if (pageList[page].totalErrors > 0) {
          let thisPageSources = pageList[page].sources;
          //append url to all error sources and append to sourceCount
          thisPageSources.forEach((pageSrc) => {
            sourceCount.push({ count: 1, url: page.toString(), src: pageSrc });
          });
        }
      }
    }
    returnArr[rule] = sourceCount;
  }
  return returnArr;
}

function countTotalErrors(arrWithRules) {
  //count all appareances of errors in a rules src array
  console.log("debug input countTotal", arrWithRules);
  let returnArr = arrWithRules;
  for (let ruleName in returnArr) {
    let counter = 0;
    //console.log("rule", rule);
    let ruleWithPages = returnArr[ruleName];
    for (let srcNumb in ruleWithPages) {
      let oneSrc = ruleWithPages[srcNumb].src;
      let htmlToCheck = oneSrc.metaData.outerHtml;
      if (htmlToCheck) {
        //search whole array for same outerhmtl
        for (let srcNumbDifferent in ruleWithPages) {
          if (ruleWithPages[srcNumbDifferent].src.metaData.outerHtml === htmlToCheck) {
            counter++;
            //if counter >= 2 remove found element
            if (counter > 1) {
              returnArr[ruleName].splice(srcNumbDifferent, 1);
            }
          }
        }
        //add attribute with counter
        //console.log("debug counterror in rulename ", ruleName, " with number ", srcNumb, " in ", ruleWithPages, ruleWithPages[srcNumb], counter);
        //check if element is not already removed
        if (ruleWithPages[srcNumb]) {
          ruleWithPages[srcNumb].count = counter;
          counter = 0;
          //console.log("debug counter", rule, oneSrc, counter);
        }
      }
    }
  }
  return returnArr;
}

function selectTopNErrors(countArr, topN) {
  console.log("debug input selectTopN", countArr, topN);
  let returnArr = [];
  //change structure: for every src element add attribute ruleRef
  let newStructureArr = [];
  for (let ruleName in countArr) {
    let srcList = countArr[ruleName];
    for (let src in srcList) {
      srcList[src]["ruleRef"] = ruleName;
      newStructureArr.push(srcList[src]);
    }
  }
  //sort to count
  newStructureArr.sort(function (a, b) {
    const x = a.count;
    const y = b.count;
    return x < y ? 1 : x > y ? -1 : 0;
  });

  //take first topN entries
  returnArr = newStructureArr.slice(0, topN);
  return returnArr;
}

function buildGlobalReport(inputArray, crawlDeepness, startUrl) {
  //construct global object
  //change globalreport deepness to inputdeepness
  globalReport.summary.crawlInfo.deepness = crawlDeepness;
  globalReport.summary.crawlInfo.start = startUrl;
  //console.log("inside buildGlobalReport", inputArray);
  if (inputArray.length !== 0) {
    //summary connect all page summarys
    globalReport.summary = {
      ...globalReport.summary,
      ...connectPageSummarys(JSON.parse(JSON.stringify(inputArray))),
    };
    //context from first site
    globalReport.context = inputArray[0].report.context;
    //summarize rules
    globalReport.rules = summarizeRules(JSON.parse(JSON.stringify(inputArray)));
    //summarize wcagChapter
    globalReport.wcagChapter = summarizeChapter(JSON.parse(JSON.stringify(inputArray)));
    //add report array
    globalReport.reportArray = filterReports(JSON.parse(JSON.stringify(inputArray)));
  }
  console.log("globalReport", globalReport);
  globalReportStringified = JSON.stringify(globalReport);
}

function connectPageSummarys(inputArray) {
  //console.log("inside connectPageSummarys", inputArray);
  let returnObj = {
    verdict: "",
    severity: 0,
    totalWarnings: 0,
    warningsPerSeverity: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    },
    summaryPerPage: {},
  };
  for (report of inputArray) {
    let summary = report.report.summary;
    if (summary.severity > returnObj.severity) {
      //more critival severity and verdict gets written into returnObj
      returnObj.severity = summary.severity;
      returnObj.verdict = summary.verdict;
    }
    //add totalWarnings count and warningsPerSeverity per page together
    returnObj.totalWarnings += summary.totalWarnings;
    Object.keys(returnObj.warningsPerSeverity).forEach(function (key, index) {
      returnObj.warningsPerSeverity[key] += summary.warningPerSeverity[key];
    });

    //add counters to summaryPerPage
    let objToAppend = {};
    objToAppend[report.page] = {
      totalWarnings: summary.totalWarnings,
      warningsPerSeverity: summary.warningPerSeverity,
    };
    returnObj.summaryPerPage = { ...returnObj.summaryPerPage, ...objToAppend };

    //add crawlerInfo
  }
  return returnObj;
}

function summarizeChapter(inputArray) {
  //console.log("input summarize", inputArray);
  let returnObj = {};
  let catArray = ["perceivable", "operable", "understandable", "robust", "bestPractice"];

  for (category of catArray) {
    let returnCategory = {};
    for (report of inputArray) {
      let chapterInfo = report.report.wcagChapter;
      let site = report.page;
      //iterate through all rules and add them or fill the sites into existing rules
      let newRulesList = chapterInfo[category];
      // let existingRulesList = returnObj[category];
      for (rule in newRulesList) {
        //check if rule is already in existingRuleList

        if (rule in returnCategory) {
          //case rule is already added => compare severity: if severity is >0 then add totalerrors
          //update errorReference
          let newRulesObj = newRulesList[rule];
          let errRefArr = newRulesObj.errorReferences;
          let objToAppend = {};
          objToAppend[site] = errRefArr;
          returnCategory[rule].errorReferences = {
            ...returnCategory[rule].errorReferences,
            ...objToAppend,
          };
          //update severity and verdict
          let newSev = newRulesObj.severity;
          let newVer = newRulesObj.verdict;

          if (returnCategory[rule].severity < newSev) {
            returnCategory[rule].severity = newSev;
            returnCategory[rule].verdict = newVer;
          }
          //update totalerrors
          returnCategory[rule].totalErrors += newRulesObj.totalErrors;

          // if (rule === "1.1" && newSev !== 0) {
          //   console.log("new Severity, new Verdict updated in rule: ", rule, newSev, newVer);
          //   console.log("totalErrors", returnCategory[rule].totalErrors);
          // }
        } else {
          //case rule is not yet added
          //console.log("rule not yet added: ", newRulesList[rule]);
          returnCategory[rule] = newRulesList[rule];
          //initiate errorReferences
          let objToAppend = {};
          objToAppend[site] = newRulesList[rule].errorReferences;
          returnCategory[rule].errorReferences = { ...objToAppend };
        }
      }
    }
    returnObj[category] = returnCategory;
  }
  //console.log("end summarize", returnObj);
  return returnObj;
}

function summarizeRules(inputArray) {
  //contain all rules
  let returnObj = inputArray[0].report.rules;
  // console.log("debug rules <3", returnObj);
  // console.log("debug inputArray", inputArray);
  for (rule in returnObj) {
    //add perPage empty object
    returnObj[rule] = { ...returnObj[rule], ...{ perPage: {} } };

    //count errors from subsites in this rule
    let totalErrInOneRule = 0;
    for (report of inputArray) {
      let site = report.page;
      let ruleObj = report.report.rules[rule];
      //console.log("debug blöd", ruleObj);
      //per Page
      let siteObjToAdd;
      //console.log("info for error: site, ruleObj", site, ruleObj);
      try {
        siteObjToAdd = {
          outcome: ruleObj.outcome,
          sources: ruleObj.sources,
          totalErrors: ruleObj.sources.length,
          //sources and totalIssues
        };
      } catch (error) {
        console.log("info for error: site, ruleObj", site, ruleObj);
        console.log(error);
        console.log("");
      }

      let objToAppend = {};
      objToAppend[site] = siteObjToAdd;
      returnObj[rule].perPage = { ...returnObj[rule].perPage, ...objToAppend };

      //worst outcome
      let newOutcome = ruleObj.outcome;
      if (returnObj[rule].outcome.severity < newOutcome.severity) {
        returnObj[rule].outcome = newOutcome;
      }

      //total Errors in this rule
      totalErrInOneRule += ruleObj.sources.length;
      // if (ruleObj.sources) {

      // } else {
      //   totalErrInOneRule = 0;
      // }
    }
    returnObj[rule].outcome = {
      ...returnObj[rule].outcome,
      ...{ totalErrors: totalErrInOneRule },
    };
    //delete sources
    delete returnObj[rule].sources;
  }
  //console.log("debug rules", returnObj);
  return returnObj;
}

function filterReports(inputArray) {
  //console.log("inside filterReports", inputArray);
  let returnObj = inputArray;
  for (rep of returnObj) {
    //remove context
    delete rep.report.context;
    for (rule in rep.report.rules) {
      //remove metaData
      delete rep.report.rules[rule].metaData;
      //remove refrences
      delete rep.report.rules[rule].references;
    }
    //remove metaData from wcagChapter
    for (category in rep.report.wcagChapter) {
      for (catRule in rep.report.wcagChapter[category]) {
        delete rep.report.wcagChapter[category][catRule].metaData;
      }
    }
  }
  //console.log("end filterReports", returnObj);
  return returnObj;
}

//PDF-Export
let pdfTabId;

async function pdfApiRequest() {
  //activate loading button
  let pdfButton = document.getElementById("pdfReportApi");
  let pdfButtonLoadingCircle = document.getElementById("loadingCirclePdf");
  pdfButton.disabled = true;
  pdfButtonLoadingCircle.style = "transform: translate(0px, -17px);";
  //pdf name conditional
  let pdfName = "fallBack.pdf";
  let urlName = globalReport.context.pageUrl.split("https://")[1];
  console.log("pdf Name", urlName);
  switch (globalReport.reportArray.length) {
    case 0:
      pdfName = "error.pdf";
      break;
    // case 1:
    //   pdfName = "singleSite.pdf";
    //   break;
    default:
      pdfName = "wcag_pdf_report_" + urlName + ".pdf";
  }

  //get language
  let lang = eyeAble_settings.lang;

  //data object
  const withLang = {
    language: lang,
    globalReport: globalReport,
  };
  const data = JSON.stringify(withLang);

  //fetch request
  //let url = "http://localhost:8080/pdf";
  let url = "https://auditpdfreportvv5ptm2k-pdf-report-c.functions.fnc.fr-par.scw.cloud/pdf";
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => {
      console.log("response-status", response.status);
      if (!response.ok) {
        window.alert("Api-Error: ", response.status, " Reload Extension");
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .then(() => {
      pdfButtonLoadingCircle.style = "display: none";
      pdfButton.disabled = false;
    });
}

function buildPDF() {
  //need delay for testscript.js to load in new tab
  openPDFHtml();
  setTimeout(msgPDFHtml, 300);
}

function openPDFHtml() {
  let urlToOpen = "pdf.html";
  let newUrlToOpen = "pdfReport.html";
  chrome.windows.getCurrent(function (current) {
    chrome.windows.create(
      {
        url: newUrlToOpen,
        type: "popup",
      },
      () => {
        chrome.tabs.query({ active: true }, (tabs) => {
          //console.log("tabs:", tabs);
          tabs.forEach((tab) => {
            if (tab.status === "loading") {
              pdfTabId = tab.id;
              //console.log("pdfTabId: ", pdfTabId);
            }
          });
        });
      }
    );
  });
}

function msgPDFHtml() {
  let categorizedWarning = sortWarning(selectedWarningList);
  console.log("categorized warnings:", categorizedWarning);
  let topNWarnings = mostRecognizedWarnings(selectedWarningList, 10);
  let newTopNWarnings = mostCommonError(globalReport, 10);
  //count warnings for every crawled Site
  let countWarnings = [];
  //console.log("urlWarning:", urlWarning);
  urlWarning.forEach((el) => {
    countWarnings.push({ url: el.url, warningCount: el.warnings.length });
  });
  // console.log("pdfID:", pdfTabId);

  chrome.tabs.sendMessage(
    pdfTabId,
    {
      greeting: "pdfHtml",
      categoryWarning: categorizedWarning,
      topN: topNWarnings,
      newTopN: newTopNWarnings,
      warningCount: countWarnings,
      globalReport: globalReport,
      lang: eyeAble_settings.lang,
    },
    (response) => {
      //after msg
      //page.pdf();
      console.log(response);
    }
  );
}

//build categorizedWarning for pdf output after urlWarning
function sortWarning(warningArray) {
  let categorizedWarning = [];
  console.log("Aus sortWarning(): ", warningArray);

  //categorize
  for (let j = 0; j < 5; j++) {
    let severityN = getAllWithSeverityN(warningArray, j);
    categorizedWarning.push(severityN);
  }

  //console.log(categorizedWarning);

  //sort by ref
  let sorted = [];
  for (let i = 0; i < categorizedWarning.length; i++) {
    //sort objects in specific severity array
    let temp = categorizedWarning[i].sort(compareRefs);
    //console.log("sorted:", temp);
    sorted.push(temp);
  }

  return sorted;
}

function getAllWithSeverityN(flatArray, n) {
  let returnArray = [];
  let unSorted = [];
  //find all appropriate warnings
  unSorted = flatArray.filter((el) => el.severity === n);

  //categorize types
  let typeWarnings = unSorted.map((el) => el.type);
  typeWarnings = [...new Set(typeWarnings)];

  for (let i = 0; i < typeWarnings.length; i++) {
    //find all warnings with type so and so with severity n
    let foundWarnings = [];
    unSorted.forEach((el) => {
      if (el.type === typeWarnings[i]) {
        foundWarnings.push(el);
      }
    });
    let elemToPush = { type: typeWarnings[i], ref: foundWarnings[0].refWCAG, warnings: foundWarnings };
    returnArray.push(elemToPush);
  }

  //console.log("getAllWithSeverity", returnArray);
  return returnArray;
}

function compareRefs(a, b) {
  let aRem = a.ref.replaceAll(".", "");
  let bRem = b.ref.replaceAll(".", "");
  if (aRem < bRem) {
    return -1;
  }
  if (aRem > bRem) {
    return 1;
  }
  return 0;
}

//find most often warnings from an array of errors
function mostRecognizedWarnings(warningArray, topN) {
  // console.log("Starte mit:", warningArray);

  let countElements = [];
  warningArray.forEach((el) => {
    countElements.push({ element: el, counter: 0 });
  });
  //console.log("debug arr", countElements);
  let countResults = [];
  for (let i = 0; i < countElements.length; i++) {
    let htmltoCheck;
    //check if outerhtml data is available
    if (countElements[i].element.metaData) {
      htmltoCheck = countElements[i].element.metaData.outerHtml;
    }

    //search whole array for appearance of same outerhtml
    let countAppear = 0;
    for (let j = 0; j < countElements.length; j++) {
      if (countElements[j].element.metaData && countElements[j].element.metaData.outerHtml === htmltoCheck) {
        countAppear++;
      }
    }
    countResults.push({ element: countElements[i].element, counter: countAppear });
  }

  //filter all elements with counter 1

  const result = countResults.filter((el) => el.counter > 1);
  // console.log("pureWarnings: ", pureWarnings);
  // console.log("countResult", countResults);
  console.log("result: ", result);

  let topNWarnings = getTopNWarnings(topN, result);
  console.log("Top", topN, "-Warnings: ", topNWarnings);
  return topNWarnings;
}

function getTopNWarnings(n, countWarnings) {
  let returnArray = [];
  let elemArray = countWarnings;
  for (let i = 0; i < n; i++) {
    let max = 0;
    let maxElement;
    for (j = 0; j < elemArray.length; j++) {
      if (elemArray[j].counter > max) {
        max = elemArray[j].counter;
        maxElement = elemArray[j];
      }
    }
    returnArray.push(maxElement);

    //remove maxElement from elemArray:
    elemArray = elemArray.filter((el) => el.counter !== max);

    //quit loop if elemArray is empty
    if (elemArray.length === 0) {
      return returnArray;
    }
  }
  return returnArray;
}

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

//Test feautures
let tabId;
document.getElementById("enableTestfeatures").addEventListener("click", toggleFeatures);
document.getElementById("openSiteButton").addEventListener("click", openSite);
document.getElementById("removeCssCheck").addEventListener("click", msgRemoveCss);
document.getElementById("buttonCheck").addEventListener("click", msgCheckButton);
document.getElementById("openPDFHtml").addEventListener("click", buildPDF);
document.getElementById("savePDFHtml").addEventListener("click", msgPDFHtml);
document.getElementById("testSort").addEventListener("click", sortWarning);
document.getElementById("mostCommon").addEventListener("click", mostRecognizedWarnings);

function toggleFeatures() {
  let toggle = document.getElementById("enableTestfeatures").checked;
  if (toggle) {
    document.getElementById("testFeatures").style.display = "inline-block";
  } else {
    document.getElementById("testFeatures").style.display = "none";
  }
}

function openSite() {
  let urlToOpen = document.getElementById("openSite").value;
  if (urlToOpen) {
    chrome.windows.getCurrent(function (current) {
      chrome.windows.create(
        {
          url: urlToOpen,
          type: "popup",
        },
        () => {
          chrome.tabs.query({ active: true }, (tabs) => {
            //console.log("tabs:", tabs);
            for (i = 0; i < tabs.length; i++) {
              if (tabs[i].pendingUrl) {
                tabId = tabs[i].id;
              }
              //change back to popup window
              // chrome.windows.update(current.id, { focused: true });
            }
          });
        }
      );
    });
  }
}

function msgRemoveCss() {
  let checked = document.getElementById("removeCssCheck").checked;

  chrome.tabs.sendMessage(tabId, { greeting: "removeCss", checkBox: checked }, (response) => {
    console.log(response);
  });
}

function msgCheckButton() {
  let allAxeUrls = [];
  chrome.tabs.sendMessage(tabId, { greeting: "checkButton" }, (response) => {
    console.log("Response Button:", response.button);
    allAxeUrls = response.button;
    // if (allAxeUrls) {
    //     getWCAGRefFromAxeList(allAxeUrls);
// }
  });
}

function buildPdf() {
  //sizes
  const pageWidth = 21,
    lineHeight = 1,
    margin = 0.5,
    maxLineWidth = pageWidth - margin * 2,
    fontSize = 18,
    ptsPerCm = 40,
    oneLineHeight = (fontSize * lineHeight) / ptsPerCm;

  const doc = new jsPDF({
    unit: "cm",
    lineHeight: lineHeight,
  });
  //font
  doc.setFont("helvetica", "normal");

  let y_coord = 0;
  let x_coord = margin;

  //add icon
  const img = new Image();
  let size_icon = 2.5;
  let x_coord_icon = pageWidth - margin - size_icon;
  img.src = "public/images/eye-able-logo.png";
  doc.addImage(img, "PNG", x_coord_icon, y_coord, size_icon, size_icon);

  //add text
  y_coord += margin + oneLineHeight;
  doc.text("Testausgabe mit Icon", x_coord, y_coord);

  //add startblock
  const titleBeginning = "Einleitung";
  doc.setFont("helvetica", "bold");
  y_coord += 2 * oneLineHeight;
  doc.text(titleBeginning, x_coord, y_coord);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  //textblock
  const textBeginning = "Hier kann die Einleitung und Erklärung zur PDF-Ausgabe stehen. Sie beschreibt, welche Informationen in diesem PDF zu finden sind.";
  //split string
  const textLines = doc.setFont("helvetica").setFontSize(fontSize).splitTextToSize(textBeginning, maxLineWidth);

  y_coord += y_coord + 3 * oneLineHeight;
  doc.text(textLines, x_coord, y_coord);
  return doc;
}

function downloadPdf() {
  //let doc = buildPdf();

  doc.save("test.pdf");
}

//end test new features
