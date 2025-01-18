/* commonCSV.js */

import {
  getGuidelineFilenameId,
  getRuleCategoryFilenameId,
  getScopeFilenameId
} from './constants.js';

import { sortRuleResults } from './sortUtils.js';

import { removeTags } from './utils.js';

// Get message strings from locale-specific messages.json file
const getMessage = browser.i18n.getMessage;
const getName    = browser.runtime.getManifest().name;
const getVersion = browser.runtime.getManifest().version;

const msg = {
  allRulesLabel             : getMessage('allRulesLabel'),
  csvDate                   : getMessage('csvDate'),
  csvNumberOfElementsWith   : getMessage('csvNumberOfElementsWith'),
  csvNumberOfRulesWith      : getMessage('csvNumberOfRulesWith'),
  csvPageTitle              : getMessage('csvPageTitle'),
  csvPageURL                : getMessage('csvPageURL'),
  csvTime                   : getMessage('csvTime'),
  csvResultValue            : getMessage('csvResultValue'),
  csvRuleset                : getMessage('csvRuleset'),
  csvSource                 : getMessage('csvSource'),
  csvGroupTitle             : getMessage('csvGroupTitle'),
  csvRuleId                 : getMessage('csvRuleId'),
  csvRuleSummary            : getMessage('csvRuleSummary'),
  csvSuccessCriteria        : getMessage('csvSuccessCriteria'),
  detailsActionLabel        : getMessage('detailsActionLabel'),
  extensionVersion          : getMessage('extensionVersion'),
  guidelineLabel            : getMessage('guidelineLabel'),
  hiddenLabel               : getMessage('hiddenLabel'),
  levelLabel                : getMessage('levelLabel'),
  manualChecksLabel         : getMessage('manualChecksLabel'),
  optionsRulesetStrictLabel : getMessage('optionsRulesetStrictLabel'),
  optionsRulesetTransLabel  : getMessage('optionsRulesetTransLabel'),
  passedLabel               : getMessage('passedLabel'),
  requiredLabel             : getMessage('requiredLabel'),
  requiredValue             : getMessage('requiredValue'),
  resultLabel               : getMessage('resultLabel'),
  ruleActionLabel           : getMessage('ruleActionLabel'),
  ruleAdditionalLabel       : getMessage('ruleAdditionalLabel'),
  ruleCategoryLabel         : getMessage('ruleCategoryLabel'),
  ruleScopeLabel            : getMessage('ruleScopeLabel'),
  ruleComplianceLabel       : getMessage('ruleComplianceLabel'),
  ruleDefinitionLabel       : getMessage('ruleDefinitionLabel'),
  rulePurposeLabel          : getMessage('rulePurposeLabel'),
  ruleScopeLabel            : getMessage('ruleScopeLabel'),
  ruleSCLabel               : getMessage('ruleSCLabel'),
  ruleTechniquesLabel       : getMessage('ruleTechniquesLabel'),
  ruleTargetLabel           : getMessage('ruleTargetLabel'),
  viewTitleSummaryLabel     : getMessage('viewTitleSummaryLabel'),
  violationsLabel           : getMessage('violationsLabel'),
  warningsLabel             : getMessage('warningsLabel'),

  // Labels for "Number of XXX with" in CVS files
  // Uses the Ids returned from getGuidelineLabelId and
  // getRuleCategoryId in constants.js
  allRulesLabel       : getMessage('csvSummary-allRulesLabel'),
  formsLabel          : getMessage('csvSummary-formsLabel'),
  g1_1                : getMessage('csvSummary-g1.1'),
  g1_2                : getMessage('csvSummary-g1.2'),
  g1_3                : getMessage('csvSummary-g1.3'),
  g1_4                : getMessage('csvSummary-g1.4'),
  g2_1                : getMessage('csvSummary-g2.1'),
  g2_2                : getMessage('csvSummary-g2.2'),
  g2_3                : getMessage('csvSummary-g2.3'),
  g2_4                : getMessage('csvSummary-g2.4'),
  g2_5                : getMessage('csvSummary-g2.5'),
  g3_1                : getMessage('csvSummary-g3.1'),
  g3_2                : getMessage('csvSummary-g3.2'),
  g3_3                : getMessage('csvSummary-g3.3'),
  g4_1                : getMessage('csvSummary-g4.1'),
  headingsLabel       : getMessage('csvSummary-headingsLabel'),
  imagesLabel         : getMessage('csvSummary-imagesLabel'),
  keyboardLabel       : getMessage('csvSummary-keyboardLabel'),
  landmarksLabel      : getMessage('csvSummary-landmarksLabel'),
  linksLabel          : getMessage('csvSummary-linksLabel'),
  siteNavigationLabel : getMessage('csvSummary-siteNavigationLabel'),
  stylesContentLabel  : getMessage('csvSummary-stylesContentLabel'),
  tablesLabel         : getMessage('csvSummary-tablesLabel'),
  timingLabel         : getMessage('csvSummary-timingLabel'),
  widgetsScriptsLabel : getMessage('csvSummary-widgetsScriptsLabel')
};

export class commonCSV {
  constructor() {
    this.ariaStrictRulesetLabel = msg.optionsRulesetStrictLabel;
    this.ariaTransRulesetLabel = msg.optionsRulesetTransLabel;
  }

  getRulesetTitle (rulesetId) {
    if (rulesetId === 'ARIA_STRICT') {
      return this.ariaStrictRulesetLabel;
    }
    return ariaTransRulesetLabel;
  }

  arrayToCSV (items, lines = 1) {
    let csv = '';
    items.forEach( (item, index) => {
      if (index !== 0) {
        csv += ',';
      }
      csv += '"' + cleanCSVItem(item) + '"';
    });

    for (let i = 0; i < lines; i += 1) {
      csv += '\n';
    }
    return csv;
  }

  getCSV (options, title, location, rulesetLabel) {
    let csv = '';
    csv += this.arrayToCSV([msg.csvPageTitle, title]);
    csv += this.arrayToCSV([msg.csvPageURL, location]);
    csv += this.arrayToCSV([msg.csvRuleset, rulesetLabel]);
    csv += this.arrayToCSV([msg.csvDate, getTodaysDate()]);
    csv += this.arrayToCSV([msg.csvTime, getTimeOfDay()]);
    csv += this.arrayToCSV([msg.csvSource, getName + ' ' + getVersion], 2);
    return csv;
  }

  getBlankRow () {
    return '\n';
  }

  getGroupTitle (title) {
    return this.arrayToCSV([msg.csvGroupTitle, title]);
  }

  getElementSummary (result) {
    let csv = '';
    csv += this.arrayToCSV([msg.csvNumberOfElementsWith]);
    csv += this.arrayToCSV([msg.violationsLabel, result.violations]);
    csv += this.arrayToCSV([msg.warningsLabel, result.warnings]);
    csv += this.arrayToCSV([msg.manualChecksLabel, result.manualChecks]);
    csv += this.arrayToCSV([msg.passedLabel, result.passed]);
    csv += this.arrayToCSV([msg.hiddenLabel, result.hidden], 2);
    return csv;;
  }

  getRuleSummary (result, msgId) {
    let csv = '';
    let m = msg[msgId];
    if ( m ) {
      csv += this.arrayToCSV([m]);
    } else {
      csv += this.arrayToCSV([msg.csvNumberOfRuleWith]);
    }
    csv += this.arrayToCSV([msg.violationsLabel, result.violations]);
    csv += this.arrayToCSV([msg.warningsLabel, result.warnings]);
    csv += this.arrayToCSV([msg.manualChecksLabel, result.manual_checks]);
    csv += this.arrayToCSV([msg.passedLabel, result.passed], 2);
    return csv;;
  }

  getRuleSummaryRowHeaders (label) {
    const headers = [];
    headers.push(label);
    headers.push(msg.violationsLabel);
    headers.push(msg.warningsLabel);
    headers.push(msg.manualChecksLabel);
    headers.push(msg.passedLabel);

    return this.arrayToCSV(headers);
  }

  getRuleSummaryRow (label, result) {
    const summ = [];
    summ.push(label);
    summ.push(result.violations);
    summ.push(result.warnings);
    summ.push(result.manual_checks);
    summ.push(result.passed);
    return this.arrayToCSV(summ);
  }

  getRuleResultsCSV (options, ruleResults, incRC=false, incGL=false, incSC=false) {
    const props = [];
    let csv = '\n';

    ruleResults = sortRuleResults(ruleResults);

    props.push(msg.csvRuleId);
    props.push(msg.csvRuleSummary);
    props.push(msg.resultLabel);
    props.push(msg.csvResultValue);
    props.push(msg.ruleScopeLabel);
    if (incRC) {
      props.push(msg.ruleCategoryLabel);
    }
    if (incGL) {
      props.push(msg.guidelineLabel);
    }
    if (incSC) {
      props.push(msg.ruleScopeLabel);
    }
    props.push(msg.csvSuccessCriteria);
    props.push(msg.levelLabel);
    props.push(msg.requiredLabel);
    props.push(msg.violationsLabel);
    props.push(msg.warningsLabel);
    props.push(msg.manualChecksLabel);
    props.push(msg.passedLabel);
    props.push(msg.hiddenLabel);
    csv += this.arrayToCSV(props);

    for (let i = 0; i < ruleResults.length; i += 1) {
      const values = [];
      let rr = ruleResults[i];
      if (options.resultsIncludePassNa ||
          (['', 'V', 'W', 'MC'].indexOf(rr.result) > 0)) {
        values.push(rr.ruleId.replace('_', ' '));
        values.push(removeTags(rr.summary));
        values.push(removeTags(rr.result));
        values.push(rr.resultValue);
        values.push(rr.scope);
        if (incRC) {
          values.push(rr.ruleCategory);
        }
        if (incGL) {
          values.push(rr.guideline);
        }
        values.push(rr.wcag);
        values.push(rr.level);
        values.push((rr.required ? msg.requiredValue : ''));
        values.push(rr.elemViolations);
        values.push(rr.elemWarnings);
        values.push(rr.elemManualChecks);
        values.push(rr.elemPassed);
        values.push(rr.elemHidden);

        csv += this.arrayToCSV(values);
      }
    }
    return csv;
  }

  contentCSV(label, info) {
    if (!info) return '';

    let i, item, values, csv = '';

    if (typeof info === 'string') {
      csv += this.arrayToCSV([label, info]);
    } else {
      if (info.length) {
        values = [label];
        for (i = 0; i < info.length; i += 1) {
          item = info[i];
          if (i !== 0) {
            values = [''];
          }
          if (typeof item === 'string') {
              values.push(item);
          } else {
            if (item.url) {
              values.push(item.title);
              values.push(item.url);
            } else {
              values.push(item.title);
            }
          }
          csv += this.arrayToCSV(values);
        }
      }
    }
    return csv;
  }

  getRuleTitle (ruleInfo) {
    let csv = '\n';
    csv += this.contentCSV(msg.csvRuleId,             ruleInfo.ruleId.replace('_', ' '));
    csv += this.contentCSV(msg.viewTitleSummaryLabel, removeTags(ruleInfo.summary));
    csv += this.contentCSV(msg.ruleDefinitionLabel,   removeTags(ruleInfo.definition));
    // get only primary Success Criteria, the first item in ruleInfo.sc array
    csv += this.contentCSV(msg.ruleSCLabel,           [ruleInfo.sc[0]]);
    csv += this.contentCSV(msg.ruleComplianceLabel,   ruleInfo.compliance);
    csv += this.contentCSV(msg.ruleScopeLabel,        ruleInfo.scope);
    return csv;
  }

  getDetailsActionCSV (ruleInfo) {
    let csv = '\n';
    csv += this.arrayToCSV([msg.detailsActionLabel]);
    csv += this.contentCSV(msg.csvRuleId,             ruleInfo.ruleId.replace('_', ' '));
    csv += this.contentCSV(msg.viewTitleSummaryLabel, ruleInfo.summary);
    csv += this.contentCSV(msg.ruleDefinitionLabel,   ruleInfo.definition);
    csv += this.contentCSV(msg.ruleScopeLabel,        ruleInfo.scope);
    csv += this.contentCSV(msg.ruleActionLabel,       ruleInfo.action);
    csv += this.contentCSV(msg.rulePurposeLabel,      ruleInfo.purpose);
    csv += this.contentCSV(msg.ruleTechniquesLabel,   ruleInfo.techniques);
    csv += this.contentCSV(msg.ruleTargetLabel,       ruleInfo.targets);
    csv += this.contentCSV(msg.levelLabel,            ruleInfo.compliance);
    csv += this.contentCSV(msg.csvSuccessCriteria,    ruleInfo.sc);
    csv += this.contentCSV(msg.ruleAdditionalLabel,   ruleInfo.additionalLinks);
    csv += '\n';

    return csv;
  }

}

function getTodaysDate () {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

function getTimeOfDay () {
  let today = new Date();
  let hh = today.getHours();
  let mm = today.getMinutes();
  let ss = today.getSeconds();
  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;
  return hh + ":" + mm + ':' + ss;
}

export function getExportFileName (fname, options, groupType, groupId, ruleId) {

  if (typeof groupType !== 'string') {
    groupType = 'rc';
  }

  if (typeof groupId !== 'number') {
    groupId = 1;
  }

  if (typeof ruleId !== 'string') {
    groupId = '';
  }

  // get group ID
  let date = '', time = '', dd, mm, yyyy, hh, ss, parts, ruleNum;
  if (groupType === 'gl') {
    groupId = getGuidelineFilenameId(groupId);
  } else {
    if (groupType === 'rc') {
      groupId = getRuleCategoryFilenameId(groupId);
    } else {
      groupId = getScopeFilenameId(groupId);
    }
  }

  // get today's date
  let today = new Date();
  if (options.includeDate) {
    date = '-' + getTodaysDate();
  }

  // get time of day
  if (options.includeTime) {
    hh = today.getHours();
    mm = today.getMinutes();
    ss = today.getSeconds();
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;
    time = '-' + hh + "h-" + mm + 'm-' + ss + 's';
  }

  // format rule id
  if (ruleId && typeof ruleId === 'string') {
    parts = ruleId.split('_');
    if (parts.length == 2) {
      ruleNum = parseInt(parts[1]);
      ruleNum = ruleNum < 10 ? '0' + ruleNum : ruleNum;
      ruleId = parts[0].toLowerCase() + '-' + ruleNum;
    }
  } else {
    ruleId = '';
  }

  fname = fname.replace('{date}', date);
  fname = fname.replace('{time}', time);
  fname = fname.replace('{group}', groupId);
  fname = fname.replace('{rule}', ruleId);

  if (options.filenamePrefix) {
    const prefixLen = options.filenamePrefix.length;
    if (options.filenamePrefix[prefixLen - 1] === '-') {
      fname = options.filenamePrefix + fname;
    } else {
      fname = options.filenamePrefix + '-' + fname;
    }
  }

  if (options.exportFormat === 'CSV') {
    fname += '.csv';
  }

  if (options.exportFormat === 'JSON') {
    fname += '.json';
  }

  return fname;
}

export function cleanCSVItem (item) {
  if (typeof item === 'number') {
    item = item.toString();
  } else {
    if (!item) {
      item = '';
    } else {
      if (typeof item !== 'string') {
        if (typeof item.toString === 'function') {
          item = item.toString();
        } else {
          item = ' ' + item;
          item = item.substring(1);
        }
      }
    }
  }
  // clean it for CSV
  item = item.trim().replaceAll('"', '""');
  return item;
}

