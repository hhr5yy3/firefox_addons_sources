(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getDisplayCount; });
/*
 * Copyright (C) 2022 Surfboard Holding B.V. <https://www.startpage.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

var getDisplayCount = _ref => {
  var {
    count,
    kStart = 1000,
    mStart = 1000000
  } = _ref;
  // Format millions
  if (count >= mStart) {
    return "".concat(Math.floor(count / 1000000), "M");
  }

  // Format thousands
  if (count >= kStart) {
    return "".concat(Math.floor(count / 1000), "k");
  }
  return count;
};

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function GreenCheck (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"12","cy":"12","r":"12","fill":"#29DDCC","key":0}),React.createElement("g",{"clipPath":"url(#clip0)","key":1},React.createElement("path",{"d":"M17.25 9.0057L15.0363 7.5L10.8871 12.9183L8.34677 11.1844L6.75 13.2719L11.4919 16.5V16.4886L11.504 16.5L17.25 9.0057Z","fill":"#202945"})),React.createElement("defs",{"key":2},React.createElement("clipPath",{"id":"clip0"},React.createElement("rect",{"width":"10.5","height":"9","fill":"white","transform":"translate(6.75 7.5)"})))]);
}

GreenCheck.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none"};

module.exports = GreenCheck;

GreenCheck.default = GreenCheck;


/***/ }),

/***/ 592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(234);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/@emotion/core/dist/core.browser.esm.js + 10 modules
var core_browser_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/react-perfect-scrollbar/lib/index.js
var lib = __webpack_require__(474);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/react-perfect-scrollbar/dist/css/styles.css
var styles = __webpack_require__(475);
var styles_default = /*#__PURE__*/__webpack_require__.n(styles);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 24 modules
var es = __webpack_require__(94);

// EXTERNAL MODULE: ./src/privacy-search/utils/localization.ts
var localization = __webpack_require__(19);

// EXTERNAL MODULE: ./src/privacy-search/selectors/index.ts
var selectors = __webpack_require__(163);

// EXTERNAL MODULE: ./src/privacy-search/utils/display.ts
var display = __webpack_require__(421);

// EXTERNAL MODULE: ./src/privacy-search/icons/green-check.svg
var green_check = __webpack_require__(548);
var green_check_default = /*#__PURE__*/__webpack_require__.n(green_check);

// CONCATENATED MODULE: ./src/privacy-search/components/Popup/PrivacyReport/TotalDisplay.tsx
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/*
 * Copyright (C) 2022 Surfboard Holding B.V. <https://www.startpage.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */





// @ts-expect-error


var totalDisplayCss =  true ? {
  name: "89in1o-totalDisplayCss",
  styles: "align-items:center;background:#ffffff;border:1px solid #ebecf7;border-radius:4px;display:flex;flex-direction:column;height:70px;justify-content:space-between;line-height:1;margin-bottom:12px;padding:24px 23px;position:relative;text-align:center;width:112px;;label:totalDisplayCss;"
} : undefined;
var countCss =  true ? {
  name: "41pl3-countCss",
  styles: "font-size:46px;font-weight:600;;label:countCss;"
} : undefined;
var subtitleCss =  true ? {
  name: "vi1uy2-subtitleCss",
  styles: "font-size:14px;font-weight:600;;label:subtitleCss;"
} : undefined;
var checkmarkCss =  true ? {
  name: "1pgct0c-checkmarkCss",
  styles: "align-items:center;height:24px;width:24px;position:absolute;bottom:-12px;;label:checkmarkCss;"
} : undefined;
var TotalDisplay = _ref => {
  var {
    subtitle,
    count
  } = _ref;
  return Object(core_browser_esm["c" /* jsx */])("div", {
    css: totalDisplayCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: countCss
  }, Object(display["a" /* getDisplayCount */])({
    count,
    kStart: 10000
  })), Object(core_browser_esm["c" /* jsx */])("div", {
    css: subtitleCss
  }, subtitle), Object(core_browser_esm["c" /* jsx */])(green_check_default.a, {
    css: checkmarkCss
  }));
};
// CONCATENATED MODULE: ./src/privacy-search/components/Popup/PrivacyReport/CountsSummary.tsx
function CountsSummary_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/*
 * Copyright (C) 2022 Surfboard Holding B.V. <https://www.startpage.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */







var countsSummaryCss =  true ? {
  name: "1wwq802-countsSummaryCss",
  styles: "padding:16px 16px 0;;label:countsSummaryCss;"
} : undefined;
var innerContainerCss =  true ? {
  name: "1dujgs2-innerContainerCss",
  styles: "border:1px solid #ebecf7;border-radius:4px;background:#fbfbfd;padding:16px 7px;;label:innerContainerCss;"
} : undefined;
var titleCss =  true ? {
  name: "1owxzah-titleCss",
  styles: "color:#202945;font-weight:600;font-size:14px;line-height:16px;margin-bottom:12px;;label:titleCss;"
} : undefined;
var totalCountsCss =  true ? {
  name: "1e5zfsx-totalCountsCss",
  styles: "background:#fbfbfd;border-radius:4px;display:flex;height:132px;justify-content:space-between;;label:totalCountsCss;"
} : undefined;
var CountsSummary = () => {
  var metrics = Object(es["c" /* useSelector */])(selectors["a" /* metricsSelector */]);
  var blockedTrackerCount = metrics.blockedMajorTrackerCounts + metrics.blockedMinorTrackerCounts;
  return Object(core_browser_esm["c" /* jsx */])("div", {
    css: countsSummaryCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: innerContainerCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: titleCss
  }, Object(localization["b" /* getMessage */])('popupReportBlockedTitle')), Object(core_browser_esm["c" /* jsx */])("div", {
    css: totalCountsCss
  }, Object(core_browser_esm["c" /* jsx */])(TotalDisplay, {
    subtitle: Object(localization["b" /* getMessage */])('popupReportBlockedTrackersLabel'),
    count: blockedTrackerCount
  }), Object(core_browser_esm["c" /* jsx */])(TotalDisplay, {
    subtitle: Object(localization["b" /* getMessage */])('popupReportBlockedCookiesLabel'),
    count: metrics.blockedCookiesCounts
  }))));
};
// EXTERNAL MODULE: ./src/privacy-search/reducers/Metrics.ts
var Metrics = __webpack_require__(229);

// EXTERNAL MODULE: ./src/privacy-search/privacy tools/metrics.ts
var privacy_tools_metrics = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__(549);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.parse-int.js
var es_parse_int = __webpack_require__(187);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__(338);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__(477);

// EXTERNAL MODULE: ./node_modules/react-chartjs-2/dist/index.js
var dist = __webpack_require__(556);

// EXTERNAL MODULE: ./node_modules/chart.js/dist/chart.mjs + 1 modules
var chart = __webpack_require__(479);

// CONCATENATED MODULE: ./src/privacy-search/components/Popup/PrivacyReport/ScoreSummary.tsx






function ScoreSummary_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/*
 * Copyright (C) 2022 Surfboard Holding B.V. <https://www.startpage.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */


// https://www.chartjs.org/docs/latest/charts/doughnut.html - chartjs docs
// https://github.com/reactchartjs/react-chartjs-2#docs - docs for react wrapper for chartjs


// https://stackoverflow.com/a/70098543/5340646




// https://stackoverflow.com/a/70098543/5340646

chart["d" /* Chart */].register(chart["a" /* ArcElement */]);
var scoreSummaryCss =  true ? {
  name: "k8zgzn-scoreSummaryCss",
  styles: "padding:16px 16px 0;;label:scoreSummaryCss;"
} : undefined;
var ScoreSummary_innerContainerCss =  true ? {
  name: "1dujgs2-innerContainerCss",
  styles: "border:1px solid #ebecf7;border-radius:4px;background:#fbfbfd;padding:16px 7px;;label:innerContainerCss;"
} : undefined;
var ScoreSummary_titleCss =  true ? {
  name: "1owxzah-titleCss",
  styles: "color:#202945;font-weight:600;font-size:14px;line-height:16px;margin-bottom:12px;;label:titleCss;"
} : undefined;
var descriptionCss =  true ? {
  name: "feuagj-descriptionCss",
  styles: "color:#7f869f;font-size:14px;line-height:18px;margin-bottom:16px;;label:descriptionCss;"
} : undefined;
var chartContainerCss =  true ? {
  name: "c0jn3c-chartContainerCss",
  styles: "display:flex;;label:chartContainerCss;"
} : undefined;
var chartLegendCss =  true ? {
  name: "29vciz-chartLegendCss",
  styles: "display:flex;flex-direction:column;font-size:14px;justify-content:space-evenly;margin-left:12px;;label:chartLegendCss;"
} : undefined;
var scoreColors = {
  5: '#29DDCC',
  4: '#A4D411',
  3: '#FBC917',
  2: '#FF9839',
  1: '#EB5757'
};
var makeChartData = (scoreDistribution, totalScores) => {
  return Object.entries(scoreDistribution).filter(_ref2 => {
    var [score, val] = _ref2;
    return val > 0;
  }).map(_ref3 => {
    var [score, val] = _ref3;
    var value = totalScores !== 0 ? val / totalScores * 100 : 0;
    return {
      score,
      val: Math.round(value)
    };
  }).sort((a, b) => {
    return parseInt(b.score, 10) - parseInt(a.score, 10);
  });
};
var makeChartColors = (chartData, colors) => {
  return chartData.map(_ref4 => {
    var {
      score,
      val
    } = _ref4;
    if (val > 0) {
      return colors[score];
    }
    return '';
  }).filter(brush => brush);
};
var ScoreSummary_ref =  true ? {
  name: "1isxh66-ScoreSummary",
  styles: "align-items:center;display:flex;line-height:1;;label:ScoreSummary;"
} : undefined;
var ScoreSummary = () => {
  var metrics = Object(es["c" /* useSelector */])(selectors["a" /* metricsSelector */]);
  var {
    scoreDistribution
  } = metrics;
  var totalScores = Object.values(scoreDistribution).reduce((prev, next) => prev + next, 0);
  var chartData = makeChartData(scoreDistribution, totalScores);
  var chartColors = makeChartColors(chartData, scoreColors);
  var options = {
    legend: {
      display: false
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    tooltips: {
      enabled: false
    }
  };
  var data = {
    maintainAspectRatio: false,
    responsive: false,
    datasets: [{
      data: chartData.map(_ref5 => {
        var {
          val
        } = _ref5;
        return val;
      }),
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors
    }]
  };
  var descScores = Object.entries(scoreDistribution).map(s => s).sort((a, b) => {
    return parseInt(b[0], 10) - parseInt(a[0], 10);
  });
  return Object(core_browser_esm["c" /* jsx */])("div", {
    css: scoreSummaryCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: ScoreSummary_innerContainerCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: ScoreSummary_titleCss
  }, Object(localization["b" /* getMessage */])('popupReportScoreTitle')), Object(core_browser_esm["c" /* jsx */])("div", {
    css: descriptionCss
  }, Object(localization["b" /* getMessage */])('popupReportScoreDescription')), Object(core_browser_esm["c" /* jsx */])("div", {
    css: chartContainerCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    style: {
      height: '190px',
      width: '190px'
    }
  }, Object(core_browser_esm["c" /* jsx */])(dist["a" /* Doughnut */], {
    data: data,
    options: options
  })), Object(core_browser_esm["c" /* jsx */])("div", {
    css: chartLegendCss
  }, descScores.map(_ref6 => {
    var [score, count] = _ref6;
    var percent = totalScores !== 0 ? (count / totalScores * 100).toFixed() : 0;
    return Object(core_browser_esm["c" /* jsx */])("div", {
      css: ScoreSummary_ref
    }, Object(core_browser_esm["c" /* jsx */])("span", {
      css: /*#__PURE__*/Object(core_browser_esm["b" /* css */])("background:", scoreColors[score], ";border-radius:50%;height:14px;margin-right:8px;width:14px;;label:ScoreSummary;" + ( true ? "" : undefined))
    }), score, "\xA0:\xA0", Object(core_browser_esm["c" /* jsx */])("b", null, "".concat(percent, "%")));
  })))));
};
// CONCATENATED MODULE: ./src/privacy-search/components/Popup/PrivacyReport/TypesSummary.tsx

function TypesSummary_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/*
 * Copyright (C) 2022 Surfboard Holding B.V. <https://www.startpage.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */






var typesSummaryCss =  true ? {
  name: "1vr604d-typesSummaryCss",
  styles: "padding:16px 16px 0;;label:typesSummaryCss;"
} : undefined;
var TypesSummary_innerContainerCss =  true ? {
  name: "1dujgs2-innerContainerCss",
  styles: "border:1px solid #ebecf7;border-radius:4px;background:#fbfbfd;padding:16px 7px;;label:innerContainerCss;"
} : undefined;
var TypesSummary_titleCss =  true ? {
  name: "1owxzah-titleCss",
  styles: "color:#202945;font-weight:600;font-size:14px;line-height:16px;margin-bottom:12px;;label:titleCss;"
} : undefined;
var TypesSummary_descriptionCss =  true ? {
  name: "1q3lj7d-descriptionCss",
  styles: "color:#7f869f;font-size:14px;line-height:18px;margin-bottom:19px;;label:descriptionCss;"
} : undefined;
var trackerBarCss =  true ? {
  name: "bga08y-trackerBarCss",
  styles: "border-radius:8px;height:40px;margin-bottom:20px;overflow:hidden;position:relative;width:100%;;label:trackerBarCss;"
} : undefined;
var TypesSummary_ref =  true ? {
  name: "1v685qj-TypesSummary",
  styles: "display:flex;font-size:13.5px;justify-content:space-between;;label:TypesSummary;"
} : undefined;
var _ref2 =  true ? {
  name: "pt96dn-TypesSummary",
  styles: "display:flex;align-items:center;;label:TypesSummary;"
} : undefined;
var _ref3 =  true ? {
  name: "wlyweg-TypesSummary",
  styles: "background:#6573ff;border-radius:50%;display:block;height:14px;margin-right:4px;width:14px;;label:TypesSummary;"
} : undefined;
var _ref4 =  true ? {
  name: "pt96dn-TypesSummary",
  styles: "display:flex;align-items:center;;label:TypesSummary;"
} : undefined;
var _ref5 =  true ? {
  name: "i3z6ix-TypesSummary",
  styles: "background:#374677;border-radius:50%;display:block;height:14px;margin-right:4px;width:14px;;label:TypesSummary;"
} : undefined;
var TypesSummary = () => {
  var metrics = Object(es["c" /* useSelector */])(selectors["a" /* metricsSelector */]);
  var {
    blockedMajorTrackerCounts,
    blockedMinorTrackerCounts
  } = metrics;
  var blockedTrackerCount = blockedMajorTrackerCounts + blockedMinorTrackerCounts;
  var majorPercent = blockedTrackerCount !== 0 ? (blockedMajorTrackerCounts / blockedTrackerCount * 100).toFixed() : 0;
  var minorPercent = blockedTrackerCount !== 0 ? (blockedMinorTrackerCounts / blockedTrackerCount * 100).toFixed() : 0;
  var majorBarCss = /*#__PURE__*/Object(core_browser_esm["b" /* css */])("background:#6573ff;border-right:1px solid #fbfbfd;height:100%;left:0;margin-right:auto;position:absolute;top:0;width:", majorPercent, "%;z-index:1;;label:majorBarCss;" + ( true ? "" : undefined));
  var minorBarCss = /*#__PURE__*/Object(core_browser_esm["b" /* css */])("background:#374677;height:100%;margin-left:auto;position:absolute;right:0;top:0;width:", minorPercent, "%;;label:minorBarCss;" + ( true ? "" : undefined));
  return Object(core_browser_esm["c" /* jsx */])("div", {
    css: typesSummaryCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: TypesSummary_innerContainerCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: TypesSummary_titleCss
  }, Object(localization["b" /* getMessage */])('popupReportBreakdownTitle')), Object(core_browser_esm["c" /* jsx */])("div", {
    css: TypesSummary_descriptionCss
  }, Object(localization["b" /* getMessage */])('popupReportBreakdownDescription')), Object(core_browser_esm["c" /* jsx */])("div", {
    css: trackerBarCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: majorBarCss
  }), Object(core_browser_esm["c" /* jsx */])("div", {
    css: minorBarCss
  })), Object(core_browser_esm["c" /* jsx */])("div", {
    css: TypesSummary_ref
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: _ref2
  }, Object(core_browser_esm["c" /* jsx */])("span", {
    css: _ref3
  }), Object(localization["b" /* getMessage */])('popupReportBreakdownMajorLabel'), "\xA0:\xA0", Object(core_browser_esm["c" /* jsx */])("b", null, majorPercent, "%")), Object(core_browser_esm["c" /* jsx */])("div", {
    css: _ref4
  }, Object(core_browser_esm["c" /* jsx */])("span", {
    css: _ref5
  }), Object(localization["b" /* getMessage */])('popupReportBreakdownMinorLabel'), "\xA0:\xA0", Object(core_browser_esm["c" /* jsx */])("b", null, minorPercent, "%")))));
};
// CONCATENATED MODULE: ./src/privacy-search/components/Popup/PrivacyReport/index.tsx

function PrivacyReport_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/*
 * Copyright (C) 2022 Surfboard Holding B.V. <https://www.startpage.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */













var PrivacyReport_titleCss =  true ? {
  name: "ysslze-titleCss",
  styles: "border-bottom:1px solid #ebecf7;font-weight:600;font-size:22px;padding:16px;;label:titleCss;"
} : undefined;
var resetBtnCss =  true ? {
  name: "129x3hp-resetBtnCss",
  styles: "background:#ffffff;border:1px solid #6573ff;border-radius:4px;color:#6573ff;cursor:pointer;font-size:14px;font-weight:500;height:38px;margin-top:auto;transition:0.4s;width:100%;&:focus{outline:none;}&:disabled{color:lightgray;cursor:initial;border:1px solid lightgray;};label:resetBtnCss;"
} : undefined;
var disclaimerCss =  true ? {
  name: "14zdrm9-disclaimerCss",
  styles: "color:#7f869f;font-size:14px;line-height:18px;padding:16px 42px 24px;text-align:center;;label:disclaimerCss;"
} : undefined;
var PrivacyReport_ref =  true ? {
  name: "16fzzrj-PrivacyReport",
  styles: "padding:16px 16px 0;;label:PrivacyReport;"
} : undefined;
var PrivacyReport = () => {
  var metrics = Object(es["c" /* useSelector */])(selectors["a" /* metricsSelector */]);

  // TODO: Beef up this check (order of keys matters atm).
  var isInitialMetrics = Object.entries(metrics).toString() === Object.entries(Metrics["b" /* initialState */]).toString();
  return Object(core_browser_esm["c" /* jsx */])("div", {
    className: "privacy-report",
    css: /*#__PURE__*/Object(core_browser_esm["b" /* css */])(styles_default.a, ";label:PrivacyReport;" + ( true ? "" : undefined))
  }, Object(core_browser_esm["c" /* jsx */])(lib_default.a, {
    style: {
      height: '420px'
    }
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: PrivacyReport_titleCss
  }, Object(localization["b" /* getMessage */])('popupReportTitle')), Object(core_browser_esm["c" /* jsx */])(ScoreSummary, null), Object(core_browser_esm["c" /* jsx */])(CountsSummary, null), Object(core_browser_esm["c" /* jsx */])(TypesSummary, null), Object(core_browser_esm["c" /* jsx */])("div", {
    css: PrivacyReport_ref
  }, Object(core_browser_esm["c" /* jsx */])("button", {
    css: resetBtnCss,
    type: "submit",
    onClick: () => {
      Object(privacy_tools_metrics["d" /* resetMetrics */])();
    },
    disabled: isInitialMetrics
  }, Object(localization["b" /* getMessage */])('popupReportResetBtn'))), Object(core_browser_esm["c" /* jsx */])("div", {
    css: disclaimerCss
  }, Object(localization["b" /* getMessage */])('popupReportDisclaimer'))));
};
/* harmony default export */ var Popup_PrivacyReport = __webpack_exports__["default"] = (PrivacyReport);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvdXRpbHMvZGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvZ3JlZW4tY2hlY2suc3ZnIiwid2VicGFjazovLy8uL3NyYy9wcml2YWN5LXNlYXJjaC9jb21wb25lbnRzL1BvcHVwL1ByaXZhY3lSZXBvcnQvVG90YWxEaXNwbGF5LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvY29tcG9uZW50cy9Qb3B1cC9Qcml2YWN5UmVwb3J0L0NvdW50c1N1bW1hcnkudHN4Iiwid2VicGFjazovLy8uL3NyYy9wcml2YWN5LXNlYXJjaC9jb21wb25lbnRzL1BvcHVwL1ByaXZhY3lSZXBvcnQvU2NvcmVTdW1tYXJ5LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvY29tcG9uZW50cy9Qb3B1cC9Qcml2YWN5UmVwb3J0L1R5cGVzU3VtbWFyeS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByaXZhY3ktc2VhcmNoL2NvbXBvbmVudHMvUG9wdXAvUHJpdmFjeVJlcG9ydC9pbmRleC50c3giXSwibmFtZXMiOlsiZ2V0RGlzcGxheUNvdW50IiwiX3JlZiIsImNvdW50Iiwia1N0YXJ0IiwibVN0YXJ0IiwiY29uY2F0IiwiTWF0aCIsImZsb29yIiwidG90YWxEaXNwbGF5Q3NzIiwicHJvY2VzcyIsIm5hbWUiLCJzdHlsZXMiLCJjb3VudENzcyIsInN1YnRpdGxlQ3NzIiwiY2hlY2ttYXJrQ3NzIiwiVG90YWxEaXNwbGF5Iiwic3VidGl0bGUiLCJfX19FbW90aW9uSlNYIiwiY3NzIiwiR3JlZW5DaGVjayIsImNvdW50c1N1bW1hcnlDc3MiLCJpbm5lckNvbnRhaW5lckNzcyIsInRpdGxlQ3NzIiwidG90YWxDb3VudHNDc3MiLCJDb3VudHNTdW1tYXJ5IiwibWV0cmljcyIsInVzZVNlbGVjdG9yIiwibWV0cmljc1NlbGVjdG9yIiwiYmxvY2tlZFRyYWNrZXJDb3VudCIsImJsb2NrZWRNYWpvclRyYWNrZXJDb3VudHMiLCJibG9ja2VkTWlub3JUcmFja2VyQ291bnRzIiwiZ2V0TWVzc2FnZSIsImJsb2NrZWRDb29raWVzQ291bnRzIiwiQ2hhcnQiLCJyZWdpc3RlciIsIkFyY0VsZW1lbnQiLCJzY29yZVN1bW1hcnlDc3MiLCJkZXNjcmlwdGlvbkNzcyIsImNoYXJ0Q29udGFpbmVyQ3NzIiwiY2hhcnRMZWdlbmRDc3MiLCJzY29yZUNvbG9ycyIsIm1ha2VDaGFydERhdGEiLCJzY29yZURpc3RyaWJ1dGlvbiIsInRvdGFsU2NvcmVzIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbHRlciIsIl9yZWYyIiwic2NvcmUiLCJ2YWwiLCJtYXAiLCJfcmVmMyIsInZhbHVlIiwicm91bmQiLCJzb3J0IiwiYSIsImIiLCJwYXJzZUludCIsIm1ha2VDaGFydENvbG9ycyIsImNoYXJ0RGF0YSIsImNvbG9ycyIsIl9yZWY0IiwiYnJ1c2giLCJTY29yZVN1bW1hcnkiLCJ2YWx1ZXMiLCJyZWR1Y2UiLCJwcmV2IiwibmV4dCIsImNoYXJ0Q29sb3JzIiwib3B0aW9ucyIsImxlZ2VuZCIsImRpc3BsYXkiLCJlbGVtZW50cyIsImFyYyIsImJvcmRlcldpZHRoIiwidG9vbHRpcHMiLCJlbmFibGVkIiwiZGF0YSIsIm1haW50YWluQXNwZWN0UmF0aW8iLCJyZXNwb25zaXZlIiwiZGF0YXNldHMiLCJfcmVmNSIsImJhY2tncm91bmRDb2xvciIsImhvdmVyQmFja2dyb3VuZENvbG9yIiwiZGVzY1Njb3JlcyIsInMiLCJzdHlsZSIsImhlaWdodCIsIndpZHRoIiwiRG91Z2hudXQiLCJfcmVmNiIsInBlcmNlbnQiLCJ0b0ZpeGVkIiwidHlwZXNTdW1tYXJ5Q3NzIiwidHJhY2tlckJhckNzcyIsIlR5cGVzU3VtbWFyeSIsIm1ham9yUGVyY2VudCIsIm1pbm9yUGVyY2VudCIsIm1ham9yQmFyQ3NzIiwibWlub3JCYXJDc3MiLCJyZXNldEJ0bkNzcyIsImRpc2NsYWltZXJDc3MiLCJQcml2YWN5UmVwb3J0IiwiaXNJbml0aWFsTWV0cmljcyIsInRvU3RyaW5nIiwiaW5pdGlhbE1ldHJpY3MiLCJjbGFzc05hbWUiLCJzY3JvbGxiYXJTdHlsZSIsIlBlcmZlY3RTY3JvbGxiYXIiLCJ0eXBlIiwib25DbGljayIsInJlc2V0TWV0cmljcyIsImRpc2FibGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVFPLElBQU1BLGVBQWUsR0FBR0MsSUFBQSxJQUFvRTtFQUFBLElBQW5FO0lBQUNDLEtBQUs7SUFBRUMsTUFBTSxHQUFHLElBQUk7SUFBRUMsTUFBTSxHQUFHO0VBQTZCLENBQUMsR0FBQUgsSUFBQTtFQUMxRjtFQUNBLElBQUlDLEtBQUssSUFBSUUsTUFBTSxFQUFFO0lBQ2pCLFVBQUFDLE1BQUEsQ0FBVUMsSUFBSSxDQUFDQyxLQUFLLENBQUNMLEtBQUssR0FBRyxPQUFPLENBQUM7RUFDekM7O0VBRUE7RUFDQSxJQUFJQSxLQUFLLElBQUlDLE1BQU0sRUFBRTtJQUNqQixVQUFBRSxNQUFBLENBQVVDLElBQUksQ0FBQ0MsS0FBSyxDQUFDTCxLQUFLLEdBQUcsSUFBSSxDQUFDO0VBQ3RDO0VBRUEsT0FBT0EsS0FBSztBQUNoQixDQUFDLEM7Ozs7Ozs7QUNuQ0QsWUFBWSxtQkFBTyxDQUFDLENBQU87O0FBRTNCO0FBQ0EsMEVBQTBFLHNEQUFzRCwyQkFBMkIsaUNBQWlDLDZCQUE2Qiw2SUFBNkksK0JBQStCLFFBQVEsaUNBQWlDLGFBQWEsNkJBQTZCLDZFQUE2RTtBQUNyaUI7O0FBRUEsMkJBQTJCOztBQUUzQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QUFDLENBQU8sRUFDMURkLHVDQUFBLENBQUM4QyxZQUFZLE9BQUcsRUFDaEI5Qyx1Q0FBQSxDQUFDTyxhQUFhLE9BQUcsRUFDakJQLHVDQUFBLENBQUM4RSxZQUFZLE9BQUcsRUFDaEI5RSx1Q0FBQTtJQUNJQyxHQUFHLEVBQUFqQjtFQUVELEdBRUZnQix1Q0FBQTtJQUNJQyxHQUFHLEVBQUVrRixXQUFZO0lBQ2pCUyxJQUFJLEVBQUMsUUFBUTtJQUNiQyxPQUFPLEVBQUVBLENBQUEsS0FBTTtNQUNYQyxxREFBWSxFQUFFO0lBQ2xCLENBQUU7SUFDRkMsUUFBUSxFQUFFVDtFQUFpQixHQUUxQnhFLDBDQUFVLENBQUMscUJBQXFCLENBQUMsQ0FDN0IsQ0FDUCxFQUNOZCx1Q0FBQTtJQUFLQyxHQUFHLEVBQUVtRjtFQUFjLEdBQUV0RSwwQ0FBVSxDQUFDLHVCQUF1QixDQUFDLENBQU8sQ0FDckQsQ0FDakI7QUFFZCxDQUFDO0FBRWN1RSxzR0FBYSxFIiwiZmlsZSI6IjE1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbnR5cGUgZ2V0RGlzcGxheUNvdW50UHJvcHMgPSB7XG4gICAgY291bnQ6IG51bWJlcjtcbiAgICBrU3RhcnQ/OiBudW1iZXI7XG4gICAgbVN0YXJ0PzogbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERpc3BsYXlDb3VudCA9ICh7Y291bnQsIGtTdGFydCA9IDEwMDAsIG1TdGFydCA9IDEwMDAwMDB9OiBnZXREaXNwbGF5Q291bnRQcm9wcykgPT4ge1xuICAgIC8vIEZvcm1hdCBtaWxsaW9uc1xuICAgIGlmIChjb3VudCA+PSBtU3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIGAke01hdGguZmxvb3IoY291bnQgLyAxMDAwMDAwKX1NYDtcbiAgICB9XG5cbiAgICAvLyBGb3JtYXQgdGhvdXNhbmRzXG4gICAgaWYgKGNvdW50ID49IGtTdGFydCkge1xuICAgICAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihjb3VudCAvIDEwMDApfWtgO1xuICAgIH1cblxuICAgIHJldHVybiBjb3VudDtcbn07XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBHcmVlbkNoZWNrIChwcm9wcykge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIscHJvcHMsW1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjaXJjbGVcIix7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiMTJcIixcImZpbGxcIjpcIiMyOUREQ0NcIixcImtleVwiOjB9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwiZ1wiLHtcImNsaXBQYXRoXCI6XCJ1cmwoI2NsaXAwKVwiLFwia2V5XCI6MX0sUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJkXCI6XCJNMTcuMjUgOS4wMDU3TDE1LjAzNjMgNy41TDEwLjg4NzEgMTIuOTE4M0w4LjM0Njc3IDExLjE4NDRMNi43NSAxMy4yNzE5TDExLjQ5MTkgMTYuNVYxNi40ODg2TDExLjUwNCAxNi41TDE3LjI1IDkuMDA1N1pcIixcImZpbGxcIjpcIiMyMDI5NDVcIn0pKSxSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGVmc1wiLHtcImtleVwiOjJ9LFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjbGlwUGF0aFwiLHtcImlkXCI6XCJjbGlwMFwifSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicmVjdFwiLHtcIndpZHRoXCI6XCIxMC41XCIsXCJoZWlnaHRcIjpcIjlcIixcImZpbGxcIjpcIndoaXRlXCIsXCJ0cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZSg2Ljc1IDcuNSlcIn0pKSldKTtcbn1cblxuR3JlZW5DaGVjay5kZWZhdWx0UHJvcHMgPSB7XCJ3aWR0aFwiOlwiMjRcIixcImhlaWdodFwiOlwiMjRcIixcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwifTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmVlbkNoZWNrO1xuXG5HcmVlbkNoZWNrLmRlZmF1bHQgPSBHcmVlbkNoZWNrO1xuIiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBSZWFjdCwge0ZDfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5cbmltcG9ydCB7Z2V0RGlzcGxheUNvdW50fSBmcm9tICcuLi8uLi8uLi91dGlscy9kaXNwbGF5JztcblxuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IEdyZWVuQ2hlY2sgZnJvbSAnLi4vLi4vLi4vaWNvbnMvZ3JlZW4tY2hlY2suc3ZnJztcblxuY29uc3QgdG90YWxEaXNwbGF5Q3NzID0gY3NzYFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZWJlY2Y3O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgaGVpZ2h0OiA3MHB4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgIHBhZGRpbmc6IDI0cHggMjNweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdpZHRoOiAxMTJweDtcbmA7XG5cbmNvbnN0IGNvdW50Q3NzID0gY3NzYFxuICAgIGZvbnQtc2l6ZTogNDZweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuYDtcblxuY29uc3Qgc3VidGl0bGVDc3MgPSBjc3NgXG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG5gO1xuXG5jb25zdCBjaGVja21hcmtDc3MgPSBjc3NgXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gICAgd2lkdGg6IDI0cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogLTEycHg7XG5gO1xuXG50eXBlIFRvdGFsRGlzcGxheVByb3BzID0ge1xuICAgIHN1YnRpdGxlOiBzdHJpbmc7XG4gICAgY291bnQ6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBUb3RhbERpc3BsYXk6IEZDPFRvdGFsRGlzcGxheVByb3BzPiA9ICh7c3VidGl0bGUsIGNvdW50fSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY3NzPXt0b3RhbERpc3BsYXlDc3N9PlxuICAgICAgICAgICAgPGRpdiBjc3M9e2NvdW50Q3NzfT57Z2V0RGlzcGxheUNvdW50KHtjb3VudCwga1N0YXJ0OiAxMDAwMH0pfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjc3M9e3N1YnRpdGxlQ3NzfT57c3VidGl0bGV9PC9kaXY+XG4gICAgICAgICAgICA8R3JlZW5DaGVjayBjc3M9e2NoZWNrbWFya0Nzc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG4iLCIvKlxuICogQ29weXJpZ2h0IChDKSAyMDIyIFN1cmZib2FyZCBIb2xkaW5nIEIuVi4gPGh0dHBzOi8vd3d3LnN0YXJ0cGFnZS5jb20+XG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgUmVhY3QsIHtGQ30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjc3N9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHt1c2VTZWxlY3Rvcn0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQge2dldE1lc3NhZ2V9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2xvY2FsaXphdGlvbic7XG5pbXBvcnQge21ldHJpY3NTZWxlY3Rvcn0gZnJvbSAnLi4vLi4vLi4vc2VsZWN0b3JzL2luZGV4JztcbmltcG9ydCB7VG90YWxEaXNwbGF5fSBmcm9tICcuL1RvdGFsRGlzcGxheSc7XG5cbmNvbnN0IGNvdW50c1N1bW1hcnlDc3MgPSBjc3NgXG4gICAgcGFkZGluZzogMTZweCAxNnB4IDA7XG5gO1xuXG5jb25zdCBpbm5lckNvbnRhaW5lckNzcyA9IGNzc2BcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZWJlY2Y3O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBiYWNrZ3JvdW5kOiAjZmJmYmZkO1xuICAgIHBhZGRpbmc6IDE2cHggN3B4O1xuYDtcblxuY29uc3QgdGl0bGVDc3MgPSBjc3NgXG4gICAgY29sb3I6ICMyMDI5NDU7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbmA7XG5cbmNvbnN0IHRvdGFsQ291bnRzQ3NzID0gY3NzYFxuICAgIGJhY2tncm91bmQ6ICNmYmZiZmQ7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgaGVpZ2h0OiAxMzJweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5gO1xuXG5leHBvcnQgY29uc3QgQ291bnRzU3VtbWFyeTogRkMgPSAoKSA9PiB7XG4gICAgY29uc3QgbWV0cmljcyA9IHVzZVNlbGVjdG9yKG1ldHJpY3NTZWxlY3Rvcik7XG4gICAgY29uc3QgYmxvY2tlZFRyYWNrZXJDb3VudCA9IG1ldHJpY3MuYmxvY2tlZE1ham9yVHJhY2tlckNvdW50cyArIG1ldHJpY3MuYmxvY2tlZE1pbm9yVHJhY2tlckNvdW50cztcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY3NzPXtjb3VudHNTdW1tYXJ5Q3NzfT5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtpbm5lckNvbnRhaW5lckNzc30+XG4gICAgICAgICAgICAgICAgPGRpdiBjc3M9e3RpdGxlQ3NzfT57Z2V0TWVzc2FnZSgncG9wdXBSZXBvcnRCbG9ja2VkVGl0bGUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNzcz17dG90YWxDb3VudHNDc3N9PlxuICAgICAgICAgICAgICAgICAgICA8VG90YWxEaXNwbGF5XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17Z2V0TWVzc2FnZSgncG9wdXBSZXBvcnRCbG9ja2VkVHJhY2tlcnNMYWJlbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ9e2Jsb2NrZWRUcmFja2VyQ291bnR9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxUb3RhbERpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtnZXRNZXNzYWdlKCdwb3B1cFJlcG9ydEJsb2NrZWRDb29raWVzTGFiZWwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50PXttZXRyaWNzLmJsb2NrZWRDb29raWVzQ291bnRzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuIiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IFJlYWN0LCB7RkN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbi8vIGh0dHBzOi8vd3d3LmNoYXJ0anMub3JnL2RvY3MvbGF0ZXN0L2NoYXJ0cy9kb3VnaG51dC5odG1sIC0gY2hhcnRqcyBkb2NzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcmVhY3RjaGFydGpzL3JlYWN0LWNoYXJ0anMtMiNkb2NzIC0gZG9jcyBmb3IgcmVhY3Qgd3JhcHBlciBmb3IgY2hhcnRqc1xuaW1wb3J0IHtEb3VnaG51dH0gZnJvbSAncmVhY3QtY2hhcnRqcy0yJztcbmltcG9ydCB7dXNlU2VsZWN0b3J9IGZyb20gJ3JlYWN0LXJlZHV4Jztcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83MDA5ODU0My81MzQwNjQ2XG5pbXBvcnQge0NoYXJ0LCBBcmNFbGVtZW50fSBmcm9tICdjaGFydC5qcyc7XG5cbmltcG9ydCB7Z2V0TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvbG9jYWxpemF0aW9uJztcbmltcG9ydCB7bWV0cmljc1NlbGVjdG9yfSBmcm9tICcuLi8uLi8uLi9zZWxlY3RvcnMvaW5kZXgnO1xuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzAwOTg1NDMvNTM0MDY0NlxuQ2hhcnQucmVnaXN0ZXIoQXJjRWxlbWVudCk7XG5cbmNvbnN0IHNjb3JlU3VtbWFyeUNzcyA9IGNzc2BcbiAgICBwYWRkaW5nOiAxNnB4IDE2cHggMDtcbmA7XG5cbmNvbnN0IGlubmVyQ29udGFpbmVyQ3NzID0gY3NzYFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYmVjZjc7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJhY2tncm91bmQ6ICNmYmZiZmQ7XG4gICAgcGFkZGluZzogMTZweCA3cHg7XG5gO1xuXG5jb25zdCB0aXRsZUNzcyA9IGNzc2BcbiAgICBjb2xvcjogIzIwMjk0NTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuYDtcblxuY29uc3QgZGVzY3JpcHRpb25Dc3MgPSBjc3NgXG4gICAgY29sb3I6ICM3Zjg2OWY7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG5gO1xuXG5jb25zdCBjaGFydENvbnRhaW5lckNzcyA9IGNzc2BcbiAgICBkaXNwbGF5OiBmbGV4O1xuYDtcblxuY29uc3QgY2hhcnRMZWdlbmRDc3MgPSBjc3NgXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgICBtYXJnaW4tbGVmdDogMTJweDtcbmA7XG5cbnR5cGUgQ29sb3JNYXAgPSB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xufTtcblxudHlwZSBDaGFydERhdGEgPSB7c2NvcmU6IHN0cmluZzsgdmFsOiBudW1iZXJ9W107XG5cbnR5cGUgQ29sb3JzID0gc3RyaW5nW107XG5cbnR5cGUgQ2hhcnRKc09wdGlvbnMgPSB7XG4gICAgbGVnZW5kOiB7XG4gICAgICAgIGRpc3BsYXk6IGJvb2xlYW47XG4gICAgfTtcbiAgICBlbGVtZW50czoge1xuICAgICAgICBhcmM6IHtcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICB0b29sdGlwczoge1xuICAgICAgICBlbmFibGVkOiBib29sZWFuO1xuICAgIH07XG59O1xuXG50eXBlIENoYXJ0SnNEYXRhID0ge1xuICAgIG1haW50YWluQXNwZWN0UmF0aW86IGJvb2xlYW47XG4gICAgcmVzcG9uc2l2ZTogYm9vbGVhbjtcbiAgICBkYXRhc2V0czogW1xuICAgICAgICB7XG4gICAgICAgICAgICBkYXRhOiBudW1iZXJbXTtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogQ29sb3JzO1xuICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IENvbG9ycztcbiAgICAgICAgfVxuICAgIF07XG59O1xuXG5jb25zdCBzY29yZUNvbG9yczogQ29sb3JNYXAgPSB7XG4gICAgNTogJyMyOUREQ0MnLFxuICAgIDQ6ICcjQTRENDExJyxcbiAgICAzOiAnI0ZCQzkxNycsXG4gICAgMjogJyNGRjk4MzknLFxuICAgIDE6ICcjRUI1NzU3J1xufTtcblxuZXhwb3J0IGNvbnN0IG1ha2VDaGFydERhdGEgPSAoc2NvcmVEaXN0cmlidXRpb246IHtbc2NvcmU6IG51bWJlcl06IG51bWJlcn0sIHRvdGFsU2NvcmVzOiBudW1iZXIpOiBDaGFydERhdGEgPT4ge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhzY29yZURpc3RyaWJ1dGlvbilcbiAgICAgICAgLmZpbHRlcigoW3Njb3JlLCB2YWxdKSA9PiB2YWwgPiAwKVxuICAgICAgICAubWFwKChbc2NvcmUsIHZhbF0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdG90YWxTY29yZXMgIT09IDAgPyAodmFsIC8gdG90YWxTY29yZXMpICogMTAwIDogMDtcbiAgICAgICAgICAgIHJldHVybiB7c2NvcmUsIHZhbDogTWF0aC5yb3VuZCh2YWx1ZSl9O1xuICAgICAgICB9KVxuICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGIuc2NvcmUsIDEwKSAtIHBhcnNlSW50KGEuc2NvcmUsIDEwKTtcbiAgICAgICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgbWFrZUNoYXJ0Q29sb3JzID0gKGNoYXJ0RGF0YTogQ2hhcnREYXRhLCBjb2xvcnM6IENvbG9yTWFwKTogQ29sb3JzID0+IHtcbiAgICByZXR1cm4gY2hhcnREYXRhXG4gICAgICAgIC5tYXAoKHtzY29yZSwgdmFsfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3JzW3Njb3JlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoYnJ1c2gpID0+IGJydXNoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBTY29yZVN1bW1hcnk6IEZDID0gKCkgPT4ge1xuICAgIGNvbnN0IG1ldHJpY3MgPSB1c2VTZWxlY3RvcihtZXRyaWNzU2VsZWN0b3IpO1xuICAgIGNvbnN0IHtzY29yZURpc3RyaWJ1dGlvbn0gPSBtZXRyaWNzO1xuXG4gICAgY29uc3QgdG90YWxTY29yZXMgPSBPYmplY3QudmFsdWVzKHNjb3JlRGlzdHJpYnV0aW9uKS5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHByZXYgKyBuZXh0LCAwKTtcblxuICAgIGNvbnN0IGNoYXJ0RGF0YTogQ2hhcnREYXRhID0gbWFrZUNoYXJ0RGF0YShzY29yZURpc3RyaWJ1dGlvbiwgdG90YWxTY29yZXMpO1xuICAgIGNvbnN0IGNoYXJ0Q29sb3JzOiBDb2xvcnMgPSBtYWtlQ2hhcnRDb2xvcnMoY2hhcnREYXRhLCBzY29yZUNvbG9ycyk7XG5cbiAgICBjb25zdCBvcHRpb25zOiBDaGFydEpzT3B0aW9ucyA9IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgICAgYXJjOiB7XG4gICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdG9vbHRpcHM6IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZGF0YTogQ2hhcnRKc0RhdGEgPSB7XG4gICAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiBmYWxzZSxcbiAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkYXRhOiBjaGFydERhdGEubWFwKCh7dmFsfSkgPT4gdmFsKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNoYXJ0Q29sb3JzLFxuICAgICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBjaGFydENvbG9yc1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IGRlc2NTY29yZXMgPSBPYmplY3QuZW50cmllcyhzY29yZURpc3RyaWJ1dGlvbilcbiAgICAgICAgLm1hcCgocykgPT4gcylcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChiWzBdLCAxMCkgLSBwYXJzZUludChhWzBdLCAxMCk7XG4gICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3Njb3JlU3VtbWFyeUNzc30+XG4gICAgICAgICAgICA8ZGl2IGNzcz17aW5uZXJDb250YWluZXJDc3N9PlxuICAgICAgICAgICAgICAgIDxkaXYgY3NzPXt0aXRsZUNzc30+e2dldE1lc3NhZ2UoJ3BvcHVwUmVwb3J0U2NvcmVUaXRsZScpfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtkZXNjcmlwdGlvbkNzc30+e2dldE1lc3NhZ2UoJ3BvcHVwUmVwb3J0U2NvcmVEZXNjcmlwdGlvbicpfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtjaGFydENvbnRhaW5lckNzc30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICcxOTBweCcsIHdpZHRoOiAnMTkwcHgnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RG91Z2hudXQgZGF0YT17ZGF0YX0gb3B0aW9ucz17b3B0aW9uc30gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtjaGFydExlZ2VuZENzc30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVzY1Njb3Jlcy5tYXAoKFtzY29yZSwgY291bnRdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudCA9IHRvdGFsU2NvcmVzICE9PSAwID8gKChjb3VudCAvIHRvdGFsU2NvcmVzKSAqIDEwMCkudG9GaXhlZCgpIDogMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICR7c2NvcmVDb2xvcnNbc2NvcmVdfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE0cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTRweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzY29yZX0mbmJzcDs6Jm5ic3A7PGI+e2Ake3BlcmNlbnR9JWB9PC9iPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuIiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IFJlYWN0LCB7RkN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB7dXNlU2VsZWN0b3J9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHtnZXRNZXNzYWdlfSBmcm9tICcuLi8uLi8uLi91dGlscy9sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHttZXRyaWNzU2VsZWN0b3J9IGZyb20gJy4uLy4uLy4uL3NlbGVjdG9ycy9pbmRleCc7XG5cbmNvbnN0IHR5cGVzU3VtbWFyeUNzcyA9IGNzc2BcbiAgICBwYWRkaW5nOiAxNnB4IDE2cHggMDtcbmA7XG5cbmNvbnN0IGlubmVyQ29udGFpbmVyQ3NzID0gY3NzYFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYmVjZjc7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJhY2tncm91bmQ6ICNmYmZiZmQ7XG4gICAgcGFkZGluZzogMTZweCA3cHg7XG5gO1xuXG5jb25zdCB0aXRsZUNzcyA9IGNzc2BcbiAgICBjb2xvcjogIzIwMjk0NTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuYDtcblxuY29uc3QgZGVzY3JpcHRpb25Dc3MgPSBjc3NgXG4gICAgY29sb3I6ICM3Zjg2OWY7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDE5cHg7XG5gO1xuXG5jb25zdCB0cmFja2VyQmFyQ3NzID0gY3NzYFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB3aWR0aDogMTAwJTtcbmA7XG5cbmV4cG9ydCBjb25zdCBUeXBlc1N1bW1hcnk6IEZDID0gKCkgPT4ge1xuICAgIGNvbnN0IG1ldHJpY3MgPSB1c2VTZWxlY3RvcihtZXRyaWNzU2VsZWN0b3IpO1xuICAgIGNvbnN0IHtibG9ja2VkTWFqb3JUcmFja2VyQ291bnRzLCBibG9ja2VkTWlub3JUcmFja2VyQ291bnRzfSA9IG1ldHJpY3M7XG4gICAgY29uc3QgYmxvY2tlZFRyYWNrZXJDb3VudCA9IGJsb2NrZWRNYWpvclRyYWNrZXJDb3VudHMgKyBibG9ja2VkTWlub3JUcmFja2VyQ291bnRzO1xuXG4gICAgY29uc3QgbWFqb3JQZXJjZW50ID1cbiAgICAgICAgYmxvY2tlZFRyYWNrZXJDb3VudCAhPT0gMCA/ICgoYmxvY2tlZE1ham9yVHJhY2tlckNvdW50cyAvIGJsb2NrZWRUcmFja2VyQ291bnQpICogMTAwKS50b0ZpeGVkKCkgOiAwO1xuICAgIGNvbnN0IG1pbm9yUGVyY2VudCA9XG4gICAgICAgIGJsb2NrZWRUcmFja2VyQ291bnQgIT09IDAgPyAoKGJsb2NrZWRNaW5vclRyYWNrZXJDb3VudHMgLyBibG9ja2VkVHJhY2tlckNvdW50KSAqIDEwMCkudG9GaXhlZCgpIDogMDtcblxuICAgIGNvbnN0IG1ham9yQmFyQ3NzID0gY3NzYFxuICAgICAgICBiYWNrZ3JvdW5kOiAjNjU3M2ZmO1xuICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZmJmYmZkO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiAke21ham9yUGVyY2VudH0lO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgIGA7XG5cbiAgICBjb25zdCBtaW5vckJhckNzcyA9IGNzc2BcbiAgICAgICAgYmFja2dyb3VuZDogIzM3NDY3NztcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogJHttaW5vclBlcmNlbnR9JTtcbiAgICBgO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3R5cGVzU3VtbWFyeUNzc30+XG4gICAgICAgICAgICA8ZGl2IGNzcz17aW5uZXJDb250YWluZXJDc3N9PlxuICAgICAgICAgICAgICAgIDxkaXYgY3NzPXt0aXRsZUNzc30+e2dldE1lc3NhZ2UoJ3BvcHVwUmVwb3J0QnJlYWtkb3duVGl0bGUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNzcz17ZGVzY3JpcHRpb25Dc3N9PntnZXRNZXNzYWdlKCdwb3B1cFJlcG9ydEJyZWFrZG93bkRlc2NyaXB0aW9uJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjc3M9e3RyYWNrZXJCYXJDc3N9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNzcz17bWFqb3JCYXJDc3N9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY3NzPXttaW5vckJhckNzc30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTMuNXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzY1NzNmZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgncG9wdXBSZXBvcnRCcmVha2Rvd25NYWpvckxhYmVsJyl9Jm5ic3A7OiZuYnNwOzxiPnttYWpvclBlcmNlbnR9JTwvYj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMzNzQ2Nzc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTRweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3BvcHVwUmVwb3J0QnJlYWtkb3duTWlub3JMYWJlbCcpfSZuYnNwOzombmJzcDs8Yj57bWlub3JQZXJjZW50fSU8L2I+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuIiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IFJlYWN0LCB7RkN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBQZXJmZWN0U2Nyb2xsYmFyIGZyb20gJ3JlYWN0LXBlcmZlY3Qtc2Nyb2xsYmFyJztcbmltcG9ydCBzY3JvbGxiYXJTdHlsZSBmcm9tICdyZWFjdC1wZXJmZWN0LXNjcm9sbGJhci9kaXN0L2Nzcy9zdHlsZXMuY3NzJztcbmltcG9ydCB7dXNlU2VsZWN0b3J9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHtDb3VudHNTdW1tYXJ5fSBmcm9tICcuL0NvdW50c1N1bW1hcnknO1xuaW1wb3J0IHtnZXRNZXNzYWdlfSBmcm9tICcuLi8uLi8uLi91dGlscy9sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHtpbml0aWFsU3RhdGUgYXMgaW5pdGlhbE1ldHJpY3N9IGZyb20gJy4uLy4uLy4uL3JlZHVjZXJzL01ldHJpY3MnO1xuaW1wb3J0IHttZXRyaWNzU2VsZWN0b3J9IGZyb20gJy4uLy4uLy4uL3NlbGVjdG9ycy9pbmRleCc7XG5pbXBvcnQge3Jlc2V0TWV0cmljc30gZnJvbSAnLi4vLi4vLi4vcHJpdmFjeSB0b29scy9tZXRyaWNzJztcbmltcG9ydCB7U2NvcmVTdW1tYXJ5fSBmcm9tICcuL1Njb3JlU3VtbWFyeSc7XG5pbXBvcnQge1R5cGVzU3VtbWFyeX0gZnJvbSAnLi9UeXBlc1N1bW1hcnknO1xuXG5jb25zdCB0aXRsZUNzcyA9IGNzc2BcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ViZWNmNztcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBwYWRkaW5nOiAxNnB4O1xuYDtcblxuY29uc3QgcmVzZXRCdG5Dc3MgPSBjc3NgXG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNjU3M2ZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBjb2xvcjogIzY1NzNmZjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgaGVpZ2h0OiAzOHB4O1xuICAgIG1hcmdpbi10b3A6IGF1dG87XG4gICAgdHJhbnNpdGlvbjogMC40cztcbiAgICB3aWR0aDogMTAwJTtcblxuICAgICY6Zm9jdXMge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgIH1cblxuICAgICY6ZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogbGlnaHRncmF5O1xuICAgICAgICBjdXJzb3I6IGluaXRpYWw7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgICB9XG5gO1xuXG5jb25zdCBkaXNjbGFpbWVyQ3NzID0gY3NzYFxuICAgIGNvbG9yOiAjN2Y4NjlmO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBsaW5lLWhlaWdodDogMThweDtcbiAgICBwYWRkaW5nOiAxNnB4IDQycHggMjRweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5gO1xuXG5jb25zdCBQcml2YWN5UmVwb3J0OiBGQyA9ICgpID0+IHtcbiAgICBjb25zdCBtZXRyaWNzID0gdXNlU2VsZWN0b3IobWV0cmljc1NlbGVjdG9yKTtcblxuICAgIC8vIFRPRE86IEJlZWYgdXAgdGhpcyBjaGVjayAob3JkZXIgb2Yga2V5cyBtYXR0ZXJzIGF0bSkuXG4gICAgY29uc3QgaXNJbml0aWFsTWV0cmljcyA9IE9iamVjdC5lbnRyaWVzKG1ldHJpY3MpLnRvU3RyaW5nKCkgPT09IE9iamVjdC5lbnRyaWVzKGluaXRpYWxNZXRyaWNzKS50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJpdmFjeS1yZXBvcnRcIlxuICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgJHtzY3JvbGxiYXJTdHlsZX1cbiAgICAgICAgICAgIGB9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxQZXJmZWN0U2Nyb2xsYmFyIHN0eWxlPXt7aGVpZ2h0OiAnNDIwcHgnfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjc3M9e3RpdGxlQ3NzfT57Z2V0TWVzc2FnZSgncG9wdXBSZXBvcnRUaXRsZScpfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxTY29yZVN1bW1hcnkgLz5cbiAgICAgICAgICAgICAgICA8Q291bnRzU3VtbWFyeSAvPlxuICAgICAgICAgICAgICAgIDxUeXBlc1N1bW1hcnkgLz5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTZweCAxNnB4IDA7XG4gICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e3Jlc2V0QnRuQ3NzfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRNZXRyaWNzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzSW5pdGlhbE1ldHJpY3N9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdwb3B1cFJlcG9ydFJlc2V0QnRuJyl9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtkaXNjbGFpbWVyQ3NzfT57Z2V0TWVzc2FnZSgncG9wdXBSZXBvcnREaXNjbGFpbWVyJyl9PC9kaXY+XG4gICAgICAgICAgICA8L1BlcmZlY3RTY3JvbGxiYXI+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcml2YWN5UmVwb3J0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==