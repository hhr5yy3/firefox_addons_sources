let globalRep;
let langRules;
let langWcagInfo;
let startUrl;
let lang;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === "pdfHtml") {
    //select correct language
    //let texts = document.querySelectorAll("[eALangID]");
    // for (let i = 0; i < texts.length; i++) {
    //     document.documentElement.lang = chrome.i18n.getUILanguage();
    //     texts[i].textContent = chrome.i18n.getMessage(texts[i].getAttribute("ealangid"));
    // }

    lang = request.lang;
    console.log("language test", lang);
    decideLangOfMetaInfo(lang);

    //set footer and header
    chooseHeadFooter(lang);

    //build PDF
    globalRep = request.globalReport;
    startUrl = globalRep.context.pageUrl.toString();
    mainPDF(globalRep.summary, globalRep.wcagChapter, globalRep);
    // buildPdfHtml(globalRep.context, globalRep.rules, globalRep.summary, globalRep.wcagChapter, request.newTopN);
    sendResponse({
      status: "everthing ok",
    });
  }
});

function chooseHeadFooter(ln) {
  let header = document.getElementById("pdfHeader");
  let footer = document.getElementById("pdfFooter");
  if (ln === "de") {
    header.src = "public/images/header_de_pdf.png";
    footer.src = "public/images/footer_de_pdf.png";
  } else {
    header.src = "public/images/header_en_pdf.png";
    footer.src = "public/images/footer_en_pdf.jpg";
  }
}

function mainPDF(summary, wcagChapter, global) {
  globalRep = global;
  const topNArr = mostCommonError(globalRep, 10);
  startUrl = globalRep.context.pageUrl;
  //change title
  console.log(globalRep);
  let titleName = document.getElementById('titleText');
  titleName.textContent = 'wcag_pdf_report_' + globalRep.context.pageUrl;

  buildPdfHtml(summary, wcagChapter, topNArr);
  // //print after pdf content is loaded
  window.setTimeout(() => {
    window.print();
  }, 2000);
}
function buildTableOfContents(wheretoAppend) {
  let list = document.createElement('ul');
  let point1 = document.createElement('li');
  let link1 = document.createElement('a');
  link1.href = '#testahrnehmbarkeit';
  link1.textContent = 'To perceivable';
  let point2 = document.createElement('li');
  let link2 = document.createElement('a');
  link2.href = '#bestPractice';
  link2.textContent = 'To best practice';

  point1.appendChild(link1);
  point2.appendChild(link2);

  list.append(point1, point2);

  wheretoAppend.appendChild(list);
}

function lang_getMessage(messageName) {
  if (lang) {
    try {
      if (lang === "de") {
        return eyeAbleAudit_de[messageName]["message"];
      } else {
        return eyeAbleAudit_en[messageName]["message"];
      }
    } catch (e) {
      console.log("Error getting language", messageName, e);
      return chrome.i18n.getMessage(messageName);
    }
  } else {
  }
}

function decideLangOfMetaInfo(lang) {
  if (lang === "de") {
    langRules = ea_rules_de;
    langWcagInfo = wcag_rules_de;
  } else {
    langRules = ea_rules_en;
    langWcagInfo = wcag_rules_en;
  }
  console.log("language files used: ", langRules, langWcagInfo);
}

function buildPdfHtml(summary, wcagChapter, topNArr) {
  //add html for title
  let titleTxt = lang_getMessage("pdfH1");
  let titleHtml = document.getElementById("titlePdf");
  //titleHtml.innerText = titleTxt;

  //build explanation
  let beginnNode = document.getElementById("beginnExplanation");
  let textBeginn = document.createElement("p");
  textBeginn.innerText = lang_getMessage("pdfExplanation");
  textBeginn.className = "explanationBeginn";
  beginnNode.appendChild(textBeginn);

  //build summary with context info, crawled url list and topNErrorTable
  let summaryNode = document.getElementById("summaryPdf");
  buildPreBlock(summaryNode, summary);

  buildTopNErrorTable(summaryNode, topNArr);

  let mainContentArr = document.getElementById("mainContent").querySelectorAll("div");
  //console.log("debug", mainContentArr);
  for (let category of mainContentArr) {
    // function for building category blocks
    // for every main category same structure
    //console.log("debug", category.id);
    buildMainCategory(category, wcagChapter);
  }

  //build endcard
  let endNode = document.getElementById("endContact");
  let textEnd = document.createElement("p");
  textEnd.innerHTML = lang_getMessage("pdfEnd") + '<a href="support@eye-able.com">support@eye-able.com</a>';
  textEnd.className = "explanationBeginn";
  endNode.appendChild(textEnd);
}

function mostCommonError(globalRep, topN) {
  //console.log("input mostCommon", globalRep, topN);
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
  //console.log("debug input countTotal", arrWithRules);
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
  //console.log("debug input selectTopN", countArr, topN);
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

function buildMainCategory(name, wcagChapter) {
  //get all rules for this category and display their metadata and all errors
  let catName = name.id;
  let catObject = wcagChapter[catName];
  //console.log("debug Parentnode, Catobject", name, wcagChapter, catObject);
  let catTitleNode = document.getElementById(catName);

  //create and insert h3 title
  let h3Title = document.createElement("h3");
  h3Title.innerText = lang_getMessage(name.id + "Txt");
  h3Title.className = "h3RuleHead";
  catTitleNode.appendChild(h3Title);

  for (let rule in catObject) {
    ////console.log("into rule", rule);
    buildRuleList(catTitleNode, rule, catObject[rule]);
  }
}

function buildRuleList(titleNode, ruleNumber, rulesObj) {
  //dont show rules with totalError = 0
  if (rulesObj.totalErrors > 0) {
    console.log('');
    console.log('titleNode, rule, rulesObj', titleNode, ruleNumber, rulesObj);

    //get all WcagInfo for this ruleNumber
    const infoObj = langWcagInfo[ruleNumber];

    //add title for rule
    let divNode = document.createElement("div");
    //divNode.className = "metaData_Rules";
    let ruleTitleNode = document.createElement("h4");
    ruleTitleNode.innerText = ruleNumber.toString() + " " + infoObj.name;
    ruleTitleNode.className = "h4CategoryHead";
    divNode.appendChild(ruleTitleNode);

    //insert div after h3 title
    titleNode.appendChild(divNode);

    //add unordered list with metadata of rule
    let liNodeInfos = [
      {
        keyWord: lang_getMessage("pdfMetaDataDescription"),
        content: infoObj.desc,
      },
      {
        keyWord: lang_getMessage("pdfMetaDataVerdict"),
        content: rulesObj.verdict,
      },
      {
        keyWord: lang_getMessage("pdfMetaDataTotalErrors"),
        content: rulesObj.totalErrors,
      },
      {
        keyWord: lang_getMessage("pdfMetaDataLink"),
        content: infoObj.urlWCAG,
      },
      { keyWord: lang_getMessage("pdfMetaDataFoundErrors"), content: "" },
    ];
    buildMetadataList(divNode, liNodeInfos, "h5", "h5TextBlock", "pInMainCatPreBlock");

    //add Table with specific found errors for one rule
    let refObj = rulesObj.errorReferences;
    buildErrorTable(divNode, refObj, ruleNumber);
  }
}

function buildMetadataList(wheretoAppend, liNodeInfos, formatPoints, classN, classP) {
  let ulNode = document.createElement("div");
  //fill list
  for (let info of liNodeInfos) {
    //check if content has anything
    let liNode = document.createElement("div");
    let liNodeKeyWord = document.createElement(formatPoints);
    liNodeKeyWord.style = "display:inline";
    liNodeKeyWord.innerText = info.keyWord + " ";
    let liNodeContent;
    //check if content is a link
    if (info.content.toString().substring(0, 5) === "https") {
      liNodeContent = document.createElement("a");
      liNodeContent.href = info.content;
      liNodeContent.textContent = info.content;
    } else {
      //normal text
      liNodeContent = document.createElement("p");
      liNodeContent.innerText = info.content;
    }
    liNodeContent.style.display = "inline";
    liNodeContent.className = classP;
    liNode.appendChild(liNodeKeyWord);
    liNode.appendChild(liNodeContent);
    ulNode.appendChild(liNode);
  }
  //append to div
  wheretoAppend.appendChild(ulNode);
  ulNode.className = classN;

  // let testNode = document.getElementById("testUmgebung");
  // testNode.appendChild(ulNode);
}

function buildErrorTable(wheretoAppend, refObj, ruleNumber) {
  //console.log("debug buildErrTab", refObj, ruleNumber);
  //create table and table head for warning Tables
  const tableHeadContents = [lang_getMessage("pdfTableHeadUrl"), lang_getMessage("pdfTableHeadCode"), lang_getMessage("pdfTableHeadVisual")];
  const possibleErrForWcagCat = langWcagInfo[ruleNumber].errors;
  ////console.log("debug langWCAGInfo", possibleErrForWcagCat);

  //memorize which rule refs are already printed in printedRefs and only print every metainfo for rules once
  const printedRefs = [];

  //table print yes or no?
  let tableShouldBePrinted = false;
  //console.log("debug buildErrorTable", ruleNumber, refObj, globalRep, possibleErrForWcagCat);
  //console.log("debug rule Data", possibleErrForWcagCat, langWcagInfo, langWcagInfo[ruleNumber], ruleNumber);
  for (let referenceObj in possibleErrForWcagCat) {
    //initialize table for error => in every error ref one table
    //loop through all EA refs in this category
    tableShouldBePrinted = false;
    const table = document.createElement("table"),
      tableHead = table.createTHead();

    addHeadRow(tableHead, tableHeadContents);
    table.appendChild(tableHead);
    const tableBody = table.createTBody();

    const refStr = possibleErrForWcagCat[referenceObj].reference.toString();
    //check if totalErrors in globalRep is not zero
    //console.log("refObj und refStr", referenceObj, refStr);

    if (globalRep.rules[refStr].outcome.severity > 0) {
      //loop though pages and create ruleinfo block and table with different pages for same ea ref
      for (let page in refObj) {
        ////console.log("into page", page, refObj[page]);
        //check if referenced errors include momentary refStr ruleref and check severity > 0
        if (refObj[page].includes(refStr)) {
          //find source list in globalrep rules
          const sourceInfoArr = globalRep.rules[refStr].perPage[page.toString()].sources;
          const severityThisPage = globalRep.rules[refStr].perPage[page.toString()].outcome.severity;
          //console.log("sourceArr", sourceInfoArr);
          if (sourceInfoArr.length > 0) {
            //check if array contains any sources
            const ruleMetaInfo = langRules[refStr];
            ////console.log("debug source", refObj[page], sourceInfoArr, ruleMetaInfo, printedRefs);
            if (!printedRefs.includes(refStr)) {
              //check for printedRefs
              printedRefs.push(refStr);
              buildRuleMetaInfo(wheretoAppend, refStr, ruleMetaInfo, "h5RuleHead");
            }
            for (let source of sourceInfoArr) {
              //get visualization from rules infos
              const whatVisualization = langRules[refStr].visualization;
              //console.log("debug visual", source, whatVisualization);
              buildErrorTableRow(tableBody, page.toString(), source, whatVisualization);
            }
            //sources are available => tableprint
            tableShouldBePrinted = true;
            ////console.log("---");
          } else if (severityThisPage > 0) {
            //special case: no sources but in best practice "errors" are still possible about page ...
            const ruleMetaInfo = langRules[refStr];
            if (!printedRefs.includes(refStr)) {
              //check for printedRefs
              printedRefs.push(refStr);
              buildRuleMetaInfo(wheretoAppend, refStr, ruleMetaInfo, "h5RuleHead");
            }
          }
        }
      }
      //add table to div element
      if (tableShouldBePrinted) {
        table.className = "content-table";
        wheretoAppend.appendChild(table);
        ////console.log("");
      }
    }
  }
}

function buildRuleMetaInfo(wheretoAppend, ruleId, ruleMetaInfo, classN) {
  //console.log("debug rule", wheretoAppend, ruleMetaInfo);
  const ruleCont = ruleMetaInfo.content;
  const ruleExpl = ruleMetaInfo;
  let h5Title = document.createElement("h5");
  h5Title.innerText = lang_getMessage("pdfMetaDataRule") + " " + ruleMetaInfo.content;
  wheretoAppend.appendChild(h5Title);
  h5Title.className = classN;

  //create infos for list of rules metainfo
  const metaInfoList = [
    {
      keyWord: lang_getMessage("pdfMetaDataExplanation"),
      content: ruleMetaInfo.explanation,
    },
    {
      keyWord: lang_getMessage("pdfMetaDataTip"),
      content: ruleMetaInfo.tip,
    },
    {
      keyWord: lang_getMessage("pdfMetaDataLink"),
      content: ruleMetaInfo.actRuleUrl,
    },
  ];
  //use the same building function as in the metainfo block for categorys
  buildMetadataList(wheretoAppend, metaInfoList, "h6", "h6TextBlock", "pInMainRuleBlocks");
}

function buildTopNErrorTable(wheretoAppend, topNArr) {
  console.log("debug input buildTopNErrorTable", wheretoAppend, topNArr);

  //create and insert h3 title
  let h3Title = document.createElement("h3");
  h3Title.innerText = lang_getMessage("pdfTop1") + " " + topNArr.length + " " + lang_getMessage("pdfTop2");
  h3Title.className = "h3RuleHead";
  wheretoAppend.appendChild(h3Title);

  let divNode = document.createElement("div");
  divNode.className = "topN";
  //create table with standard tablehead
  const tableHeadContents = ["1." + lang_getMessage("pdfTableHeadUrl"), lang_getMessage("pdfTableHeadCode"), lang_getMessage("pdfTableHeadCount"), lang_getMessage("pdfTableHeadErrorContent"), lang_getMessage("pdfTableHeadVisual")];
  const table = document.createElement("table"),
    tableHead = table.createTHead();

  addHeadRow(tableHead, tableHeadContents);
  table.appendChild(tableHead);
  const tableBody = table.createTBody();

  topNArr.forEach((errObj) => {
    //get visualization from rules infos
    const whatVisualization = langRules[errObj.ruleRef].visualization;
    //console.log("debug visual", source, whatVisualization);
    //console.log("test page", errObj.url);
    buildErrorTopNTableRow(tableBody, errObj.url.toString(), errObj, whatVisualization);
  });
  table.className = "content-table";
  divNode.appendChild(table);
  wheretoAppend.appendChild(divNode);
}

function buildPreBlock(wheretoAppend, summary) {
  let titleNode = document.createElement("h2");
  titleNode.innerText = lang_getMessage("pdfShortResults");
  let paraNode = document.createElement("p");
  let textToAdd = "";
  let startUrl = summary.crawlInfo.start;
  let deepness = summary.crawlInfo.deepness;
  let numberOfSites = Object.keys(summary.summaryPerPage).length;
  //console.log("debug preblock", numberOfSites, summary);

  //check if one site or multiple site has been checked
  if (numberOfSites > 1) {
    textToAdd =
      lang_getMessage("pdfResultStartPart") + "<strong>" + startUrl + "</strong>" + lang_getMessage("pdfResultPartPlural") + " " + deepness + lang_getMessage("pdfResultDatePart") + getDateAsString() + lang_getMessage("pdfResultEndPart");
  } else {
    textToAdd = lang_getMessage("pdfResultStartPart") + "<strong>" + startUrl + "</strong>" + lang_getMessage("pdfResultDatePart") + getDateAsString() + lang_getMessage("pdfResultEndPart");
  }
  paraNode.innerHTML = textToAdd;
  paraNode.className = "preBlockTextResult";

  //#errors for result and if sites are crawled show table with crawled sites
  let resultNode = document.createElement("p");
  resultNode.innerText = lang_getMessage("pdfResultPartOne") + summary.totalWarnings + lang_getMessage("pdfResultPartTwo") + summary.warningsPerSeverity[4] + lang_getMessage("pdfResultPartThree");
  resultNode.className = "numberOfErrors";

  wheretoAppend.append(titleNode, paraNode, resultNode);

  if (numberOfSites > 1) {
    buildCrawledTable(wheretoAppend, summary.summaryPerPage);
  }

  let mainTitleNode = document.createElement("h2");
  mainTitleNode.innerText = lang_getMessage("pdfMainResults");
  wheretoAppend.appendChild(mainTitleNode);
}

function buildCrawledTable(wheretoAppend, summaryObj) {
  //console.log("debug crawltable", wheretoAppend, summaryObj);
  //create table with standard tablehead
  const tableHeadContents = [lang_getMessage("pdfCrawlColumn1"), lang_getMessage("pdfTableHeadCount")];
  const table = document.createElement("table"),
    tableHead = table.createTHead(),
    tableHeadRow = tableHead.insertRow(0);
  addHeadRow(tableHeadRow, tableHeadContents);
  table.appendChild(tableHead);
  const tableBody = table.createTBody();

  for (let page in summaryObj) {
    let tableRow = tableBody.insertRow(0);

    addPageCell(tableRow, page, "smallTD");
    addTextCell(tableRow, summaryObj[page].totalWarnings, "smallTD");
  }
  table.className = "content-table";
  wheretoAppend.appendChild(table);
}

function buildErrorTableRow(tBody, page, source, visuaization) {
  let tableRow = tBody.insertRow(0);

  //add page cell
  addPageCell(tableRow, page, "td-truncate urlColumn");

  //add code cell
  let htmlCode = source.metaData.outerHtml;
  let xPath = source.xPath;
  if (htmlCode.length !== 0) {
    addCodeCell(tableRow, htmlCode.substring(0, 200), "codeColumn", xPath);
  }

  //add visualization  cell
  addVisualCell(tableRow, visuaization, source, "previewColumn");
  tBody.appendChild(tableRow);
}

function buildErrorTopNTableRow(tBody, page, sourceObj, visuaization) {
  let tableRow = tBody.insertRow(0);

  //add page cell
  addPageCell(tableRow, page, "td-truncate urlColumnTopN");

  //add code cell with substring
  let htmlCode = sourceObj.src.metaData.outerHtml;
  let xPath = sourceObj.src.xPath;
  if (htmlCode.length !== 0) {
    addCodeCell(tableRow, htmlCode.substring(0, 100), "codeColumnTopN", xPath);
  }
  //add count and ruleRef
  //get ruleRef title
  const errorContent = langRules[sourceObj.ruleRef].content;
  addTextCell(tableRow, sourceObj.count, "textColumnTopN");
  addTextCell(tableRow, errorContent, "errorContentColumnTopN");

  //add visualization  cell
  addVisualCell(tableRow, visuaization, sourceObj.src, "previewTopN");
  tBody.appendChild(tableRow);
}

function addPageCell(tr, url, className) {
  //cut url first if url is different from starturl
  const td = tr.insertCell();
  const linkUrl = document.createElement("a");
  linkUrl.href = url;

  //alternativtext: link to underpage + shortpage

  let splitUrl = startUrl;
  if (url !== startUrl) {
    splitUrl = url.split(startUrl)[1];
  }

  linkUrl.textContent = splitUrl ? splitUrl : url;
  linkUrl.title = lang_getMessage("altforLinks") + splitUrl;
  if (className) {
    td.className = className;
  }
  td.appendChild(linkUrl);
  //console.log("debug split", url, splitUrl);
}

function addCodeCell(row, codeString, className, xpath) {
  //sometimes the code gets cut off so you need to manually add a "">" to ensure highlighting
  let modifiedCode = codeString;
  if (codeString.slice(-1) !== ">") {
    modifiedCode += '">';
  }

  let codeContainer = document.createElement("div");
  codeContainer.className = "codeContainer";
  const cell = row.insertCell();
  let htmlString = '<code class="language-html" style="color: white; background: #272822;">' + Prism.highlight(modifiedCode, Prism.languages.html, "html") + "</code>\n";

  cell.className = className;
  //add xPath if xpath is not empty
  //console.log("debug xpath", xpath);
  if (xpath.length > 0) {
    const htmlString2 = '<p class="pathP">xPath: ' + xpath + "</p>";
    htmlString += htmlString2;
  }
  codeContainer.innerHTML = htmlString;
  cell.appendChild(codeContainer);
}

function addTextCell(row, text, className) {
  const cell = row.insertCell();
  cell.innerText = text;
  cell.className = className;
}

function addVisualCell(row, key, source, classname) {
  const cell = row.insertCell();
  cell.className = classname;
  //check if this element gets an special visuaization
  let childContainer = document.createElement("div");
  childContainer.className = "visContainer";
  let childToAppend;
  if (key !== "none") {
    switch (key) {
      case "image":
        let imageSrc = source.metaData.src;
        childToAppend = document.createElement("img");
        childToAppend.className = "visImage";
        if (imageSrc) {
          childToAppend.src = imageSrc;
          childToAppend.alt = lang_getMessage("extendedInfoVisualizationImgAlt");
        } else {
          //default image for empty sources
          childToAppend.src = "public/images/placeholder-image.png";
        }
        break;
      case "text":
        let text = source.metaData.textContent || source.metaData.innerText;
        childToAppend = document.createElement("span");
        if (text) {
          childToAppend.className = "visText";
          childToAppend.style.fontSize = source.metaData.styles.fontSize;
          childToAppend.style.fontWeight = source.metaData.styles.fontWeight;
          childToAppend.style.fontFamily = source.metaData.styles.fontFamily;
          childToAppend.innerText = text.substring(0, 100);
        } else {
        }
        break;
      case "headingJump":
        let textContent = source.metaData.textContent || source.metaData.innerText;
        childToAppend = document.createElement("div");
        if (textContent && source.metaData.headingOrder) {
          childToAppend.className = "visHeadingJump";
          let pOne = document.createElement("p");
          pOne.innerText =
            lang_getMessage("extendedHeading1") +
            " " +
            source.metaData.headingOrder.headingBefore +
            " " +
            lang_getMessage("extendedHeading2") +
            " " +
            source.metaData.headingOrder.headingCurrent +
            " " +
            lang_getMessage("extendedHeading3") +
            " " +
            source.metaData.headingOrder.headingCorrect;
          childToAppend.appendChild(pOne);
          let pTwo = document.createElement("span");
          pTwo.style.fontSize = source.metaData.styles.fontSize;
          pTwo.style.fontWeight = source.metaData.styles.fontWeight;
          pTwo.style.fontFamily = source.metaData.styles.fontFamily;
          pTwo.textContent = textContent.substring(0, 100);
          childToAppend.appendChild(pTwo);
        } else {
        }
        break;
      case "abbr":
        let textMain = source.metaData.textContent || source.metaData.innerText;
        childToAppend = document.createElement("div");
        if (textMain && source.metaData.abbr) {
          childToAppend.className = "visAbbr";
          let pOne = document.createElement("p");
          pOne.innerText = source.metaData.abbr;
          childToAppend.appendChild(pOne);

          let pTwo = document.createElement("span");
          pTwo.style.fontSize = source.metaData.styles.fontSize;
          pTwo.style.fontWeight = source.metaData.styles.fontWeight;
          pTwo.style.fontFamily = source.metaData.styles.fontFamily;
          pTwo.textContent = textMain.substring(0, 100);
          childToAppend.appendChild(pTwo);
        } else {
        }
        break;
      case "outerHtml":
        //dont"t show very long html as this is often to complicated and broken anyway
        childToAppend = document.createElement("div");
        childToAppend.className = "visOuterHtml";
        let outerHtmlSrc = source.metaData.outerHtml;
        // let outerHtmlChild = document.createElement("div");
        childToAppend.innerHTML = outerHtmlSrc;
        if (outerHtmlSrc.startsWith("<svg") || outerHtmlSrc.startsWith("<img")) {
          //special case: sometimes the key is tagged outerHtml but there are images inside
          let checkImage = childToAppend.querySelector("img");
          let imageChildToAdd = document.createElement("img");
          //check if src is empty or not
          let srcAttribute = "";
          if (checkImage) {
            srcAttribute = checkImage.getAttribute("src");
          } else {
            //console.log("case outerHtml no image found", checkImage);
          }
          if (srcAttribute.length > 0) {
            imageChildToAdd.src = srcAttribute;
          } else {
            imageChildToAdd.src = "public/images/placeholder-image.png";
          }
          imageChildToAdd.className = "visImage";
          childToAppend.innerHTML = "";
          childToAppend.appendChild(imageChildToAdd);
        } else if (outerHtmlSrc && outerHtmlSrc.length < 1200) {
          //normal case
          //console.log("normal case", outerHtmlSrc, outerHtmlSrc.length, source);
        } else {
          //console.log("special case", outerHtmlSrc, outerHtmlSrc.length, source);
          childToAppend.innerHTML = "";
        }

        break;
      case "contrast":
        let textContrast = source.metaData.textContent || source.metaData.innerText;
        childToAppend = document.createElement("div");
        if (!source.metaData.contrastRatios) {
          source.metaData["contrastRatios"] = {
            currentRatio: "4:1",
            minRatio: "3:1",
          };
        }
        if (textContrast) {
          let textColor = source.metaData.styles.color;
          let backColor = source.metaData.styles.background;
          if (parseFloat(source.metaData.contrastRatios.currentRatio.split(":")[0]) < 1.5) {
            //pick different colors or the text wont be visible
            textColor = "white";
            backColor = "black";
          }

          childToAppend.style.backgroundColor = backColor;
          childToAppend.style.borderRadius = "15px";
          let pOne = document.createElement("p");
          pOne.innerText = lang_getMessage("extendedContrast1") + " " + source.metaData.contrastRatios.currentRatio + " - " + lang_getMessage("extendedContrast2") + " " + source.metaData.contrastRatios.minRatio;
          pOne.className = "contrastInfoTxt";
          childToAppend.appendChild(pOne);

          let pTwo = document.createElement("p");
          pTwo.style.color = textColor;
          pTwo.style.fontSize = source.metaData.styles.fontSize;
          pTwo.style.fontWeight = source.metaData.styles.fontWeight;
          pTwo.style.fontFamily = source.metaData.styles.fontFamily;
          pTwo.style.paddingBottom = "10px";
          pTwo.innerText = textContrast.substring(0, 100);
          childToAppend.appendChild(pTwo);
        } else {
        }
        break;
      case "textWithExpected":
        childToAppend = document.createElement("div");
        if (source.metaData.expected) {
          let detected = source.metaData.expected.detected;
          let expected = source.metaData.expected.expected;
          let textColor = source.metaData.styles.color;
          let backColor = source.metaData.styles.background;
          let text = source.metaData.textContent || source.metaData.innerText;
          let background = source.metaData.styles.background;
          let color = source.metaData.styles.color;
          if (background === "image") {
            //images cant be displayed
            background = "white";
          }
          if (background === color) {
            console.log("test isColor", isColorDark(color));
            if (isColorDark(color)) {
              background = "white";
            } else {
              background = "black";
            }
          }
          console.log("textWithExpcec", source.metaData);
          childToAppend.style.backgroundColor = backColor;
          let pOne = document.createElement("p");
          pOne.innerText = lang_getMessage("extendedContrast1") + " " + detected + " - " + lang_getMessage("extendedContrast2") + " " + expected;
          childToAppend.appendChild(pOne);

          let pTwo = document.createElement("p");
          pTwo.style.color = textColor;
          pTwo.style.fontSize = source.metaData.styles.fontSize;
          pTwo.style.fontWeight = source.metaData.styles.fontWeight;
          pTwo.style.fontFamily = source.metaData.styles.fontFamily;
          pTwo.textContent = text.substring(0, 100);
          childToAppend.appendChild(pTwo);
        } else {
        }
        break;
      default:
        //do nothing
        childToAppend = document.createElement("div");

        break;
    }
  } else {
    //key is none
    childToAppend = document.createElement("div");
  }
  try {
    childContainer.appendChild(childToAppend);
  } catch (error) {
    console.log(error);
    console.log("in object with key", source, key);
    console.log("childToAppend", childToAppend);
    childContainer.appendChild(document.createElement("div"));
  }

  cell.appendChild(childContainer);
}

function addHeadRow(tr, content) {
  for (let i of content) {
    const th = document.createElement("th");
    th.textContent = i;
    tr.appendChild(th);
  }
}

// function addRowTextOnly(tr, content) {
//   for (i of content) {
//     addCell(tr, i);
//   }
// }

// helper function
function addCell(tr, text, className) {
  const td = tr.insertCell();
  td.textContent = text;
  if (className) {
    td.className = className;
  }

  return td;
}

function remSepEx(string) {
  let returnString = "";
  if (string) {
    //console.log("Vor Replace:", JSON.stringify(string));
    returnString = string.toString().replace(/\n/g, "");
    returnString = returnString.replace(/;/g, "");
    returnString = returnString.replace(/\t/g, "");
    //console.log("After Replace:", JSON.stringify(returnString));

    //final check if string has only multiple " " empty spaces
    let check = true;
    for (let i = 0; i < returnString.length; i++) {
      if (returnString[i] !== " ") {
        check = false;
      }
    }
    if (check) {
      returnString = "";
    }
  }
  return returnString;
}

function getDateAsString() {
  //date today as string
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let dayStr = day < 10 ? "0" + day.toString() : day.toString();
  let monthStr = month < 10 ? "0" + month.toString() : month.toString();
  return dayStr + "." + monthStr + "." + today.getFullYear();
}
