(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
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




var Toggle = _ref => {
  var {
    id,
    height,
    width,
    hexColor,
    checked = false,
    animate = true,
    onChange: _onChange
  } = _ref;
  var sliderDiameter = height * 0.75;
  var toggleCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* css */ "b"])(".switch{position:relative;display:inline-block;height:", height, "px;width:", width, "px;}.switch input{opacity:0;width:0;height:0;}.slider{background-color:#ced1dd;border-radius:", height, "px;cursor:pointer;inset:0;position:absolute;", animate && 'transition: 0.4s;', "}input:checked + .slider{background-color:", hexColor, ";}.slider:before{background-color:#ebecf7;border-radius:", sliderDiameter, "px;box-shadow:1px 2px 4px rgba(0,0,0,0.1);content:'';height:", sliderDiameter, "px;margin:calc(", sliderDiameter, "px / 6);position:absolute;width:", sliderDiameter, "px;", animate && 'transition: 0.4s;', "}input:checked + .slider:before{background-color:#ffffff;transform:translateX(", width - height, "px);};label:toggleCss;" + ( true ? "" : undefined));
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("div", {
    css: toggleCss
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("label", {
    className: "switch",
    htmlFor: id
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("input", {
    id: id,
    type: "checkbox",
    checked: checked
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ,
    onChange: event => {
      if (_onChange) {
        _onChange();
      }
    }
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("span", {
    className: "slider"
  })));
};
/* harmony default export */ __webpack_exports__["a"] = (Toggle);

/***/ }),

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

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function HiddenIcon (props) {
    return React.createElement("svg",props,[React.createElement("path",{"d":"M21.3302 2.26024C20.9849 1.90365 20.4324 1.90365 20.087 2.26024L16.9561 5.49327C13.0655 3.68657 8.92157 4.12636 4.97337 6.78886C2.0266 8.77385 0.242431 11.2699 0.173366 11.3769C-0.0568498 11.7097 -0.0568498 12.1614 0.196388 12.4942C1.86545 14.6099 3.6266 16.2621 5.41078 17.4151L2.64819 20.2678C2.30286 20.6243 2.30286 21.1949 2.64819 21.5633C2.82085 21.7416 3.03955 21.8367 3.26977 21.8367C3.49998 21.8367 3.71869 21.7416 3.89135 21.5633L21.3302 3.55583C21.6755 3.19924 21.6755 2.62871 21.3302 2.26024ZM9.81941 12.8746C9.69279 12.5774 9.62373 12.2565 9.62373 11.9118C9.62373 11.2581 9.86545 10.64 10.3144 10.1764C11.0165 9.45136 12.064 9.27307 12.9273 9.65342L9.81941 12.8746ZM14.2396 8.31029C12.6396 7.25242 10.4755 7.4426 9.08272 8.88082C8.29998 9.68908 7.87409 10.7588 7.87409 11.8999C7.87409 12.7319 8.1043 13.5283 8.5302 14.2058L6.7115 16.0838C5.12301 15.1329 3.55754 13.7304 2.0266 11.888C2.68272 11.1035 4.0525 9.58211 5.94027 8.31029C9.19783 6.11135 12.4439 5.6359 15.6093 6.88395L14.2396 8.31029Z","fill":"#CED1DD","key":0}),React.createElement("path",{"d":"M23.8043 11.3307C22.5957 9.79734 21.341 8.50175 20.0633 7.46766C19.6719 7.15862 19.1194 7.22993 18.8201 7.62217C18.5209 8.01442 18.5899 8.58495 18.9698 8.90588C19.9827 9.71414 20.9842 10.7363 21.9626 11.9131C21.3871 12.6144 20.259 13.8624 18.7281 15.0154C15.7813 17.2262 12.8115 18.0226 9.89928 17.3926C9.42734 17.2856 8.9554 17.6065 8.8518 18.0939C8.7482 18.5812 9.05899 19.0685 9.53093 19.1755C10.2906 19.3419 11.0504 19.4251 11.8216 19.4251C12.9727 19.4251 14.1468 19.2349 15.2978 18.8665C16.8173 18.3791 18.3367 17.5709 19.7986 16.4655C22.2619 14.5993 23.7353 12.543 23.8043 12.4598C24.0576 12.1151 24.0576 11.6635 23.8043 11.3307Z","fill":"#CED1DD","key":1}),React.createElement("defs",{"key":2},React.createElement("clipPath",{"id":"clip0"},React.createElement("rect",{"width":"24","height":"19.8261","fill":"white","transform":"translate(0 2)"})))]);
}

HiddenIcon.defaultProps = {"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none"};

module.exports = HiddenIcon;

HiddenIcon.default = HiddenIcon;


/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function ProtectionOn (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"8","cy":"8","r":"8","fill":"#29DDCC","key":0}),React.createElement("g",{"clipPath":"url(#clip0)","key":1},React.createElement("path",{"d":"M11.5 6.0038L10.0242 5L7.25806 8.61217L5.56452 7.45627L4.5 8.84791L7.66129 11V10.9924L7.66935 11L11.5 6.0038Z","fill":"#202945"})),React.createElement("defs",{"key":2},React.createElement("clipPath",{"id":"clip0"},React.createElement("rect",{"width":"7","height":"6","fill":"white","transform":"translate(4.5 5)"})))]);
}

ProtectionOn.defaultProps = {"width":"16","height":"16","viewBox":"0 0 16 16","fill":"none"};

module.exports = ProtectionOn;

ProtectionOn.default = ProtectionOn;


/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function ProtectionOff (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"8","cy":"8","r":"8","fill":"#EB5757","key":0}),React.createElement("path",{"d":"M7 4.5H9L8.73946 8.5H7.27586L7 4.5Z","fill":"white","key":1}),React.createElement("circle",{"cx":"8","cy":"10.5","r":"1","fill":"white","key":2})]);
}

ProtectionOff.defaultProps = {"width":"16","height":"16","viewBox":"0 0 16 16","fill":"none"};

module.exports = ProtectionOff;

ProtectionOff.default = ProtectionOff;


/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function ProtectionOffGray (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"8","cy":"8","r":"8","fill":"#7F869F","key":0}),React.createElement("path",{"d":"M7 4.5H9L8.73946 8.5H7.27586L7 4.5Z","fill":"white","key":1}),React.createElement("circle",{"cx":"8","cy":"10.5","r":"1","fill":"white","key":2})]);
}

ProtectionOffGray.defaultProps = {"width":"16","height":"16","viewBox":"0 0 16 16","fill":"none"};

module.exports = ProtectionOffGray;

ProtectionOffGray.default = ProtectionOffGray;


/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScore1 (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36","cy":"36","r":"28","fill":"#6573FF","key":0}),React.createElement("path",{"d":"M38.1832 24.5V46.3182H34.2308V28.3459H34.103L29 31.6058V27.9837L34.4226 24.5H38.1832Z","fill":"white","key":1}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72ZM36 68C53.6731 68 68 53.6731 68 36C68 18.3269 53.6731 4 36 4C18.3269 4 4 18.3269 4 36C4 53.6731 18.3269 68 36 68Z","fill":"#EBECF7","key":2}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M35.9286 71.9999L36 71.5V68C21.769 68 9.70765 58.7104 5.54926 45.8643L1.74292 47.0974C6.41415 61.5277 19.9498 71.9689 35.9286 71.9999Z","fill":"#EB5757","key":3})]);
}

PrivacyScore1.defaultProps = {"width":"72","height":"72","viewBox":"0 0 72 72","fill":"none"};

module.exports = PrivacyScore1;

PrivacyScore1.default = PrivacyScore1;


/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScore2 (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36","cy":"36","r":"28","fill":"#6573FF","key":0}),React.createElement("path",{"d":"M28.1278 46.6165V43.7614L35.7024 36.3359C36.4268 35.6044 37.0305 34.9545 37.5135 34.3864C37.9964 33.8182 38.3587 33.2678 38.6001 32.7351C38.8416 32.2024 38.9624 31.6342 38.9624 31.0305C38.9624 30.3416 38.8061 29.7521 38.4936 29.2621C38.1811 28.7649 37.7514 28.3814 37.2045 28.1115C36.6577 27.8416 36.0362 27.7067 35.3402 27.7067C34.6229 27.7067 33.9943 27.8558 33.4545 28.1541C32.9148 28.4453 32.4957 28.8608 32.1974 29.4006C31.9063 29.9403 31.7607 30.5831 31.7607 31.3288H28C28 29.9439 28.3161 28.7401 28.9482 27.7173C29.5803 26.6946 30.4503 25.9027 31.5582 25.3416C32.6733 24.7805 33.9517 24.5 35.3935 24.5C36.8565 24.5 38.142 24.7734 39.25 25.3203C40.358 25.8672 41.2173 26.6165 41.8281 27.5682C42.446 28.5199 42.755 29.6065 42.755 30.8281C42.755 31.6449 42.5987 32.4474 42.2862 33.2358C41.9737 34.0241 41.4233 34.8977 40.6349 35.8565C39.8537 36.8153 38.7564 37.9766 37.343 39.3402L33.5824 43.1648V43.3139H43.0852V46.6165H28.1278Z","fill":"white","key":1}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72ZM36 68C53.6731 68 68 53.6731 68 36C68 18.3269 53.6731 4 36 4C18.3269 4 4 18.3269 4 36C4 53.6731 18.3269 68 36 68Z","fill":"#EBECF7","key":2}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M35.9273 71.9999L36 71.7636V68C18.3269 68 4 53.6731 4 36C4 25.3374 9.21496 15.8928 17.2334 10.0777L14.9032 6.82617C5.87357 13.3672 0 23.9977 0 36C0 55.858 16.0785 71.9607 35.9273 71.9999Z","fill":"#F18B1F","key":3})]);
}

PrivacyScore2.defaultProps = {"width":"72","height":"72","viewBox":"0 0 72 72","fill":"none"};

module.exports = PrivacyScore2;

PrivacyScore2.default = PrivacyScore2;


/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScore3 (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36","cy":"36","r":"28","fill":"#6573FF","key":0}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72ZM36 68C53.6731 68 68 53.6731 68 36C68 18.3269 53.6731 4 36 4C18.3269 4 4 18.3269 4 36C4 53.6731 18.3269 68 36 68Z","fill":"#EBECF7","key":1}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M54.925 10.1934C49.6247 6.29987 43.0809 4 36 4C18.3269 4 4 18.3269 4 36C4 53.6731 18.3269 68 36 68V71.5002L35.889 71.9998C16.0578 71.94 0 55.8452 0 36C0 16.1177 16.1177 0 36 0C43.966 0 51.3277 2.58736 57.2906 6.96754L54.925 10.1934Z","fill":"#FFCF25","key":2}),React.createElement("path",{"d":"M36.0007 46.9148C34.4666 46.9148 33.103 46.652 31.9098 46.1264C30.7237 45.6009 29.7862 44.8693 29.0973 43.9318C28.4084 42.9943 28.0426 41.9112 28 40.6825H32.0057C32.0412 41.272 32.2365 41.7869 32.5916 42.2273C32.9467 42.6605 33.419 42.9979 34.0085 43.2393C34.598 43.4808 35.2585 43.6016 35.9901 43.6016C36.7713 43.6016 37.4638 43.4666 38.0675 43.1967C38.6712 42.9197 39.1435 42.5362 39.4844 42.0462C39.8253 41.5561 39.9922 40.9915 39.9851 40.3523C39.9922 39.6918 39.8217 39.1094 39.4737 38.6051C39.1257 38.1009 38.6214 37.7067 37.9609 37.4226C37.3075 37.1385 36.5192 36.9964 35.5959 36.9964H33.6676V33.9496H35.5959C36.3558 33.9496 37.0199 33.8182 37.5881 33.5554C38.1634 33.2926 38.6143 32.9233 38.9411 32.4474C39.2678 31.9645 39.4276 31.407 39.4205 30.7749C39.4276 30.157 39.2891 29.6207 39.005 29.1662C38.728 28.7045 38.3338 28.3459 37.8224 28.0902C37.3182 27.8345 36.7251 27.7067 36.0433 27.7067C35.3757 27.7067 34.7578 27.8274 34.1896 28.0689C33.6214 28.3104 33.1634 28.6548 32.8153 29.1023C32.4673 29.5426 32.2827 30.0682 32.2614 30.679H28.4581C28.4865 29.4574 28.8381 28.3849 29.5128 27.4616C30.1946 26.5313 31.1037 25.8068 32.2401 25.2884C33.3764 24.7628 34.6513 24.5 36.0646 24.5C37.5206 24.5 38.7848 24.7734 39.8572 25.3203C40.9368 25.8601 41.7713 26.5881 42.3608 27.5043C42.9503 28.4205 43.245 29.4325 43.245 30.5405C43.2521 31.7692 42.8899 32.799 42.1584 33.63C41.4339 34.4609 40.4822 35.0043 39.3033 35.2599V35.4304C40.8374 35.6435 42.0128 36.2116 42.8295 37.1349C43.6534 38.0511 44.0618 39.1911 44.0547 40.5547C44.0547 41.7763 43.7067 42.87 43.0107 43.8359C42.3217 44.7947 41.37 45.5476 40.1555 46.0945C38.9482 46.6413 37.5632 46.9148 36.0007 46.9148Z","fill":"white","key":3})]);
}

PrivacyScore3.defaultProps = {"width":"73","height":"72","viewBox":"0 0 73 72","fill":"none"};

module.exports = PrivacyScore3;

PrivacyScore3.default = PrivacyScore3;


/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScore4 (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36.7911","cy":"36","r":"28","fill":"#6573FF","key":0}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M36.7911 72C56.6734 72 72.7911 55.8823 72.7911 36C72.7911 16.1177 56.6734 0 36.7911 0C16.9089 0 0.791138 16.1177 0.791138 36C0.791138 55.8823 16.9089 72 36.7911 72ZM36.7911 68C54.4642 68 68.7911 53.6731 68.7911 36C68.7911 18.3269 54.4642 4 36.7911 4C19.118 4 4.79114 18.3269 4.79114 36C4.79114 53.6731 19.118 68 36.7911 68Z","fill":"#EBECF7","key":1}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M67.1185 46.2371C68.2031 43.0229 68.791 39.5801 68.791 36C68.791 18.3269 54.4641 4 36.791 4C19.1179 4 4.79102 18.3269 4.79102 36C4.79102 53.6034 19.0051 67.8869 36.582 67.9993V71.0009L36.333 71.9971C16.6618 71.7519 0.791016 55.7293 0.791016 36C0.791016 16.1177 16.9088 0 36.791 0C56.6733 0 72.791 16.1177 72.791 36C72.791 40.0039 72.1374 43.8551 70.931 47.4527L67.1185 46.2371Z","fill":"#A4D411","key":2}),React.createElement("path",{"d":"M26.791 42.2699V39.1271L36.0488 24.5H38.6696V28.9744H37.0716L30.8393 38.8501V39.0206H43.7619V42.2699H26.791ZM37.1994 46.3182V41.3111L37.242 39.9048V24.5H40.9707V46.3182H37.1994Z","fill":"white","key":3})]);
}

PrivacyScore4.defaultProps = {"width":"73","height":"72","viewBox":"0 0 73 72","fill":"none"};

module.exports = PrivacyScore4;

PrivacyScore4.default = PrivacyScore4;


/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScore5 (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36","cy":"36","r":"36","fill":"#29DDCC","key":0}),React.createElement("circle",{"cx":"36","cy":"36","r":"30","fill":"#6573FF","stroke":"white","strokeWidth":"4","key":1}),React.createElement("path",{"d":"M36.032 47.2983C34.6115 47.2983 33.3402 47.032 32.218 46.4993C31.0959 45.9595 30.2045 45.2209 29.544 44.2834C28.8906 43.3459 28.5426 42.2734 28.5 41.0661H32.3352C32.4062 41.9609 32.7933 42.6925 33.4964 43.2607C34.1996 43.8217 35.0447 44.1023 36.032 44.1023C36.8061 44.1023 37.495 43.9247 38.0987 43.5696C38.7024 43.2145 39.1783 42.7209 39.5263 42.0888C39.8743 41.4567 40.0447 40.7358 40.0376 39.9261C40.0447 39.1023 39.8707 38.3707 39.5156 37.7315C39.1605 37.0923 38.674 36.5916 38.0561 36.2294C37.4382 35.8601 36.728 35.6754 35.9254 35.6754C35.272 35.6683 34.6293 35.7891 33.9972 36.0376C33.3651 36.2862 32.8643 36.6129 32.495 37.0178L28.9261 36.4318L30.0661 25.1818H42.7223V28.4844H33.3366L32.7081 34.2692H32.8359C33.2408 33.7933 33.8125 33.3992 34.5511 33.0867C35.2898 32.7671 36.0994 32.6073 36.9801 32.6073C38.3011 32.6073 39.4801 32.9198 40.517 33.5448C41.554 34.1626 42.3707 35.0149 42.9673 36.1016C43.5639 37.1882 43.8622 38.4311 43.8622 39.8303C43.8622 41.272 43.5284 42.5575 42.8608 43.6868C42.2003 44.809 41.2805 45.6932 40.1016 46.3395C38.9297 46.9787 37.5732 47.2983 36.032 47.2983Z","fill":"white","key":2})]);
}

PrivacyScore5.defaultProps = {"width":"72","height":"72","viewBox":"0 0 72 72","fill":"none"};

module.exports = PrivacyScore5;

PrivacyScore5.default = PrivacyScore5;


/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScoreDisabled1 (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36","cy":"36","r":"28","fill":"#CED1DD","key":0}),React.createElement("path",{"d":"M38.1832 24.5V46.3182H34.2308V28.3459H34.103L29 31.6058V27.9837L34.4226 24.5H38.1832Z","fill":"white","key":1}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72ZM36 68C53.6731 68 68 53.6731 68 36C68 18.3269 53.6731 4 36 4C18.3269 4 4 18.3269 4 36C4 53.6731 18.3269 68 36 68Z","fill":"#FBFBFD","key":2}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M35.9286 71.9999L36 71.5V68C21.769 68 9.70765 58.7104 5.54926 45.8643L1.74292 47.0974C6.41415 61.5277 19.9498 71.9689 35.9286 71.9999Z","fill":"#CED1DD","key":3})]);
}

PrivacyScoreDisabled1.defaultProps = {"width":"72","height":"72","viewBox":"0 0 72 72","fill":"none"};

module.exports = PrivacyScoreDisabled1;

PrivacyScoreDisabled1.default = PrivacyScoreDisabled1;


/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScoreDisabled2 (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36","cy":"36","r":"28","fill":"#CED1DD","key":0}),React.createElement("path",{"d":"M28.1278 46.6165V43.7614L35.7024 36.3359C36.4268 35.6044 37.0305 34.9545 37.5135 34.3864C37.9964 33.8182 38.3587 33.2678 38.6001 32.7351C38.8416 32.2024 38.9624 31.6342 38.9624 31.0305C38.9624 30.3416 38.8061 29.7521 38.4936 29.2621C38.1811 28.7649 37.7514 28.3814 37.2045 28.1115C36.6577 27.8416 36.0362 27.7067 35.3402 27.7067C34.6229 27.7067 33.9943 27.8558 33.4545 28.1541C32.9148 28.4453 32.4957 28.8608 32.1974 29.4006C31.9063 29.9403 31.7607 30.5831 31.7607 31.3288H28C28 29.9439 28.3161 28.7401 28.9482 27.7173C29.5803 26.6946 30.4503 25.9027 31.5582 25.3416C32.6733 24.7805 33.9517 24.5 35.3935 24.5C36.8565 24.5 38.142 24.7734 39.25 25.3203C40.358 25.8672 41.2173 26.6165 41.8281 27.5682C42.446 28.5199 42.755 29.6065 42.755 30.8281C42.755 31.6449 42.5987 32.4474 42.2862 33.2358C41.9737 34.0241 41.4233 34.8977 40.6349 35.8565C39.8537 36.8153 38.7564 37.9766 37.343 39.3402L33.5824 43.1648V43.3139H43.0852V46.6165H28.1278Z","fill":"white","key":1}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72ZM36 68C53.6731 68 68 53.6731 68 36C68 18.3269 53.6731 4 36 4C18.3269 4 4 18.3269 4 36C4 53.6731 18.3269 68 36 68Z","fill":"#FBFBFD","key":2}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M35.9273 71.9999L36 71.7636V68C18.3269 68 4 53.6731 4 36C4 25.3374 9.21496 15.8928 17.2334 10.0777L14.9032 6.82617C5.87357 13.3672 0 23.9977 0 36C0 55.858 16.0785 71.9607 35.9273 71.9999Z","fill":"#CED1DD","key":3})]);
}

PrivacyScoreDisabled2.defaultProps = {"width":"72","height":"72","viewBox":"0 0 72 72","fill":"none"};

module.exports = PrivacyScoreDisabled2;

PrivacyScoreDisabled2.default = PrivacyScoreDisabled2;


/***/ }),

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScoreDisabled3 (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36","cy":"36","r":"28","fill":"#CED1DD","key":0}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72ZM36 68C53.6731 68 68 53.6731 68 36C68 18.3269 53.6731 4 36 4C18.3269 4 4 18.3269 4 36C4 53.6731 18.3269 68 36 68Z","fill":"#FBFBFD","key":1}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M54.925 10.1934C49.6247 6.29987 43.0809 4 36 4C18.3269 4 4 18.3269 4 36C4 53.6731 18.3269 68 36 68V71.5002L35.889 71.9998C16.0578 71.94 0 55.8452 0 36C0 16.1177 16.1177 0 36 0C43.966 0 51.3277 2.58736 57.2906 6.96754L54.925 10.1934Z","fill":"#CED1DD","key":2}),React.createElement("path",{"d":"M36.0007 46.9148C34.4666 46.9148 33.103 46.652 31.9098 46.1264C30.7237 45.6009 29.7862 44.8693 29.0973 43.9318C28.4084 42.9943 28.0426 41.9112 28 40.6825H32.0057C32.0412 41.272 32.2365 41.7869 32.5916 42.2273C32.9467 42.6605 33.419 42.9979 34.0085 43.2393C34.598 43.4808 35.2585 43.6016 35.9901 43.6016C36.7713 43.6016 37.4638 43.4666 38.0675 43.1967C38.6712 42.9197 39.1435 42.5362 39.4844 42.0462C39.8253 41.5561 39.9922 40.9915 39.9851 40.3523C39.9922 39.6918 39.8217 39.1094 39.4737 38.6051C39.1257 38.1009 38.6214 37.7067 37.9609 37.4226C37.3075 37.1385 36.5192 36.9964 35.5959 36.9964H33.6676V33.9496H35.5959C36.3558 33.9496 37.0199 33.8182 37.5881 33.5554C38.1634 33.2926 38.6143 32.9233 38.9411 32.4474C39.2678 31.9645 39.4276 31.407 39.4205 30.7749C39.4276 30.157 39.2891 29.6207 39.005 29.1662C38.728 28.7045 38.3338 28.3459 37.8224 28.0902C37.3182 27.8345 36.7251 27.7067 36.0433 27.7067C35.3757 27.7067 34.7578 27.8274 34.1896 28.0689C33.6214 28.3104 33.1634 28.6548 32.8153 29.1023C32.4673 29.5426 32.2827 30.0682 32.2614 30.679H28.4581C28.4865 29.4574 28.8381 28.3849 29.5128 27.4616C30.1946 26.5313 31.1037 25.8068 32.2401 25.2884C33.3764 24.7628 34.6513 24.5 36.0646 24.5C37.5206 24.5 38.7848 24.7734 39.8572 25.3203C40.9368 25.8601 41.7713 26.5881 42.3608 27.5043C42.9503 28.4205 43.245 29.4325 43.245 30.5405C43.2521 31.7692 42.8899 32.799 42.1584 33.63C41.4339 34.4609 40.4822 35.0043 39.3033 35.2599V35.4304C40.8374 35.6435 42.0128 36.2116 42.8295 37.1349C43.6534 38.0511 44.0618 39.1911 44.0547 40.5547C44.0547 41.7763 43.7067 42.87 43.0107 43.8359C42.3217 44.7947 41.37 45.5476 40.1555 46.0945C38.9482 46.6413 37.5632 46.9148 36.0007 46.9148Z","fill":"white","key":3})]);
}

PrivacyScoreDisabled3.defaultProps = {"width":"73","height":"72","viewBox":"0 0 73 72","fill":"none"};

module.exports = PrivacyScoreDisabled3;

PrivacyScoreDisabled3.default = PrivacyScoreDisabled3;


/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScoreDisabled4 (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36.7911","cy":"36","r":"28","fill":"#CED1DD","key":0}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M36.7911 72C56.6734 72 72.7911 55.8823 72.7911 36C72.7911 16.1177 56.6734 0 36.7911 0C16.9089 0 0.791138 16.1177 0.791138 36C0.791138 55.8823 16.9089 72 36.7911 72ZM36.7911 68C54.4642 68 68.7911 53.6731 68.7911 36C68.7911 18.3269 54.4642 4 36.7911 4C19.118 4 4.79114 18.3269 4.79114 36C4.79114 53.6731 19.118 68 36.7911 68Z","fill":"#FBFBFD","key":1}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M67.1185 46.2371C68.2031 43.0229 68.791 39.5801 68.791 36C68.791 18.3269 54.4641 4.00002 36.791 4.00002C19.1179 4.00002 4.79102 18.3269 4.79102 36C4.79102 53.6034 19.0051 67.8869 36.582 67.9993V71.0009L36.333 71.9972C16.6618 71.7519 0.791016 55.7294 0.791016 36C0.791016 16.1178 16.9088 1.52588e-05 36.791 1.52588e-05C56.6733 1.52588e-05 72.791 16.1178 72.791 36C72.791 40.0039 72.1374 43.8551 70.931 47.4527L67.1185 46.2371Z","fill":"#CED1DD","key":2}),React.createElement("path",{"d":"M26.791 42.2699V39.1271L36.0488 24.5H38.6696V28.9744H37.0716L30.8393 38.8501V39.0206H43.7619V42.2699H26.791ZM37.1994 46.3182V41.3111L37.242 39.9048V24.5H40.9707V46.3182H37.1994Z","fill":"white","key":3})]);
}

PrivacyScoreDisabled4.defaultProps = {"width":"73","height":"72","viewBox":"0 0 73 72","fill":"none"};

module.exports = PrivacyScoreDisabled4;

PrivacyScoreDisabled4.default = PrivacyScoreDisabled4;


/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScoreDisabled5 (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36.0001","cy":"36","r":"28","fill":"#CED1DD","key":0}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M36.0001 72C55.8824 72 72.0001 55.8823 72.0001 36C72.0001 16.1177 55.8824 0 36.0001 0C16.1179 0 0.00012207 16.1177 0.00012207 36C0.00012207 55.8823 16.1179 72 36.0001 72ZM36.0001 68C53.6732 68 68.0001 53.6731 68.0001 36C68.0001 18.3269 53.6732 4 36.0001 4C18.327 4 4.00012 18.3269 4.00012 36C4.00012 53.6731 18.327 68 36.0001 68Z","fill":"#CED1DD","key":1}),React.createElement("path",{"d":"M35.532 46.1165C34.1115 46.1165 32.8402 45.8501 31.718 45.3175C30.5959 44.7777 29.7045 44.0391 29.044 43.1016C28.3906 42.1641 28.0426 41.0916 28 39.8842H31.8352C31.9062 40.7791 32.2933 41.5107 32.9964 42.0788C33.6996 42.6399 34.5447 42.9205 35.532 42.9205C36.3061 42.9205 36.995 42.7429 37.5987 42.3878C38.2024 42.0327 38.6783 41.5391 39.0263 40.907C39.3743 40.2749 39.5447 39.554 39.5376 38.7443C39.5447 37.9205 39.3707 37.1889 39.0156 36.5497C38.6605 35.9105 38.174 35.4098 37.5561 35.0476C36.9382 34.6783 36.228 34.4936 35.4254 34.4936C34.772 34.4865 34.1293 34.6072 33.4972 34.8558C32.8651 35.1044 32.3643 35.4311 31.995 35.8359L28.4261 35.25L29.5661 24H42.2223V27.3026H32.8366L32.2081 33.0874H32.3359C32.7408 32.6115 33.3125 32.2173 34.0511 31.9048C34.7898 31.5852 35.5994 31.4254 36.4801 31.4254C37.8011 31.4254 38.9801 31.7379 40.017 32.3629C41.054 32.9808 41.8707 33.8331 42.4673 34.9197C43.0639 36.0064 43.3622 37.2493 43.3622 38.6484C43.3622 40.0902 43.0284 41.3757 42.3608 42.505C41.7003 43.6271 40.7805 44.5114 39.6016 45.1577C38.4297 45.7969 37.0732 46.1165 35.532 46.1165Z","fill":"white","key":2})]);
}

PrivacyScoreDisabled5.defaultProps = {"width":"72","height":"72","viewBox":"0 0 72 72","fill":"none"};

module.exports = PrivacyScoreDisabled5;

PrivacyScoreDisabled5.default = PrivacyScoreDisabled5;


/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

function PrivacyScoreNa (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"36","cy":"36","r":"28","fill":"#6573FF","key":0}),React.createElement("path",{"fillRule":"evenodd","clipRule":"evenodd","d":"M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72ZM36 68C53.6731 68 68 53.6731 68 36C68 18.3269 53.6731 4 36 4C18.3269 4 4 18.3269 4 36C4 53.6731 18.3269 68 36 68Z","fill":"#EBECF7","key":1}),React.createElement("path",{"d":"M33.2727 40.4588V40.0966C33.2798 38.8537 33.3899 37.8629 33.603 37.1243C33.8232 36.3857 34.1428 35.7891 34.5618 35.3345C34.9808 34.88 35.4851 34.468 36.0746 34.0987C36.5149 33.8146 36.9091 33.5199 37.2571 33.2145C37.6051 32.9091 37.8821 32.5717 38.0881 32.2024C38.294 31.826 38.397 31.407 38.397 30.9453C38.397 30.4553 38.2798 30.0256 38.0455 29.6562C37.8111 29.2869 37.495 29.0028 37.0973 28.804C36.7067 28.6051 36.2734 28.5057 35.7976 28.5057C35.3359 28.5057 34.8991 28.6087 34.4872 28.8146C34.0753 29.0135 33.7379 29.3118 33.4751 29.7095C33.2124 30.1001 33.0703 30.5866 33.049 31.169H28.7024C28.7379 29.7486 29.0788 28.5767 29.7251 27.6534C30.3714 26.723 31.2273 26.0305 32.2926 25.576C33.358 25.1143 34.5334 24.8835 35.8189 24.8835C37.2322 24.8835 38.4822 25.1179 39.5689 25.5866C40.6555 26.0483 41.5078 26.7195 42.1257 27.6001C42.7436 28.4808 43.0526 29.5426 43.0526 30.7855C43.0526 31.6165 42.9141 32.3551 42.6371 33.0014C42.3672 33.6406 41.9872 34.2088 41.4972 34.706C41.0071 35.196 40.4283 35.6399 39.7607 36.0376C39.1996 36.3714 38.7379 36.7195 38.3757 37.0817C38.0206 37.4439 37.7543 37.8629 37.5767 38.3388C37.4063 38.8146 37.3175 39.4006 37.3104 40.0966V40.4588H33.2727ZM35.3821 47.277C34.6719 47.277 34.0646 47.0284 33.5604 46.5312C33.0632 46.027 32.8182 45.4233 32.8253 44.7202C32.8182 44.0241 33.0632 43.4276 33.5604 42.9304C34.0646 42.4332 34.6719 42.1847 35.3821 42.1847C36.0568 42.1847 36.6499 42.4332 37.1612 42.9304C37.6726 43.4276 37.9318 44.0241 37.9389 44.7202C37.9318 45.1889 37.8075 45.6186 37.5661 46.0092C37.3317 46.3928 37.0227 46.7017 36.6392 46.9361C36.2557 47.1634 35.8366 47.277 35.3821 47.277Z","fill":"#2E39B3","key":2})]);
}

PrivacyScoreNa.defaultProps = {"width":"72","height":"72","viewBox":"0 0 72 72","fill":"none"};

module.exports = PrivacyScoreNa;

PrivacyScoreNa.default = PrivacyScoreNa;


/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@emotion/core/dist/core.browser.esm.js + 10 modules
var core_browser_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 24 modules
var es = __webpack_require__(94);

// EXTERNAL MODULE: ./src/privacy-search/utils/localization.ts
var localization = __webpack_require__(19);

// EXTERNAL MODULE: ./src/privacy-search/reducers/Screens.ts
var Screens = __webpack_require__(45);

// EXTERNAL MODULE: ./src/privacy-search/selectors/index.ts
var selectors = __webpack_require__(163);

// EXTERNAL MODULE: ./src/privacy-search/utils/display.ts
var display = __webpack_require__(421);

// CONCATENATED MODULE: ./src/privacy-search/components/Popup/Home/TrackerDisplay.tsx
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






var _ref =  true ? {
  name: "145uo23-trackerDisplayCss",
  styles: "align-items:center;background:#ffffff;border:1px solid #ebecf7;border-radius:4px;display:flex;flex-direction:column;height:87px;padding:24px 16px;position:relative;width:106px;margin-top:11px;;label:trackerDisplayCss;"
} : undefined;
var _ref2 =  true ? {
  name: "nsrf68-countCss",
  styles: "font-size:60px;font-weight:700;;label:countCss;"
} : undefined;
var _ref3 =  true ? {
  name: "vi1uy2-subtitleCss",
  styles: "font-size:14px;font-weight:600;;label:subtitleCss;"
} : undefined;
var TrackerDisplay = _ref4 => {
  var {
    blocked,
    count,
    subtitle
  } = _ref4;
  var trackerDisplayCss = _ref;
  var resolveTitleBgColor = () => {
    if (blocked) {
      return '#29DDCC';
    }
    if (count > 0) {
      return '#eb5757';
    }
    return '#7f869f';
  };
  var titleCss = /*#__PURE__*/Object(core_browser_esm["b" /* css */])("align-items:center;background:", resolveTitleBgColor(), ";border-radius:17px;color:", blocked ? '#202945' : '#ffffff', ";display:flex;font-size:14px;font-weight:600;height:22px;line-height:1;padding:0 12px;position:absolute;top:-11px;transition:0.4s;white-space:nowrap;;label:titleCss;" + ( true ? "" : undefined));
  var countCss = _ref2;
  var subtitleCss = _ref3;
  return Object(core_browser_esm["c" /* jsx */])("div", {
    css: trackerDisplayCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: titleCss
  }, blocked ? Object(localization["b" /* getMessage */])('popupHomeBlockedLabel') : Object(localization["b" /* getMessage */])('popupHomeNotBlockedLabel')), Object(core_browser_esm["c" /* jsx */])("div", {
    css: countCss
  }, Object(display["a" /* getDisplayCount */])({
    count
  })), Object(core_browser_esm["c" /* jsx */])("div", {
    css: subtitleCss
  }, subtitle));
};
// EXTERNAL MODULE: ./src/privacy-search/store.ts + 13 modules
var store = __webpack_require__(84);

// EXTERNAL MODULE: ./src/privacy-search/icons/hidden-icon.svg
var hidden_icon = __webpack_require__(482);
var hidden_icon_default = /*#__PURE__*/__webpack_require__.n(hidden_icon);

// CONCATENATED MODULE: ./src/privacy-search/components/Popup/Home/BottomPanel.tsx
function BottomPanel_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
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


var bottomPanelCss =  true ? {
  name: "19b7h2w-bottomPanelCss",
  styles: "height:232px;padding:12px;;label:bottomPanelCss;"
} : undefined;
var innerContainerCss =  true ? {
  name: "1qlp1hw-innerContainerCss",
  styles: "background:#fbfbfd;border:1px solid #ebecf7;border-radius:4px;display:flex;flex-wrap:wrap;height:200px;justify-content:space-between;padding:16px;;label:innerContainerCss;"
} : undefined;
var manageBtnCss =  true ? {
  name: "qmwges-manageBtnCss",
  styles: "background:#ffffff;border:1px solid #6573ff;border-radius:4px;color:#6573ff;cursor:pointer;font-size:14px;font-weight:500;height:38px;margin-top:auto;transition:0.4s;width:100%;&:focus{outline:none;}&:disabled{color:lightgray;cursor:initial;border:1px solid lightgray;};label:manageBtnCss;"
} : undefined;
var specialPageIcon =  true ? {
  name: "19qyi6-specialPageIcon",
  styles: "margin-bottom:14px;;label:specialPageIcon;"
} : undefined;
var specialPageDescriptionCss =  true ? {
  name: "16j8n8r-specialPageDescriptionCss",
  styles: "align-items:center;display:flex;flex-direction:column;font-size:14px;justify-content:center;padding:0 35px;line-height:18px;text-align:center;;label:specialPageDescriptionCss;"
} : undefined;
var BottomPanel = () => {
  var tabData = Object(es["c" /* useSelector */])(selectors["d" /* tabDataSelector */]);
  var {
    trackersBlocked,
    cookiesBlocked,
    isSpecialPage,
    isPrivacyEnabled
  } = tabData;
  var dispatch = Object(store["b" /* useAppDispatch */])();
  return Object(core_browser_esm["c" /* jsx */])("div", {
    css: bottomPanelCss
  }, Object(core_browser_esm["c" /* jsx */])("div", {
    css: innerContainerCss
  }, !isSpecialPage && Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(core_browser_esm["c" /* jsx */])(TrackerDisplay, {
    blocked: isPrivacyEnabled,
    count: trackersBlocked,
    subtitle: Object(localization["b" /* getMessage */])('popupHomeTrackersLabel')
  }), Object(core_browser_esm["c" /* jsx */])(TrackerDisplay, {
    blocked: isPrivacyEnabled,
    count: cookiesBlocked,
    subtitle: Object(localization["b" /* getMessage */])('popupHomeCookiesLabel')
  }), Object(core_browser_esm["c" /* jsx */])("button", {
    css: manageBtnCss,
    type: "submit",
    onClick: () => {
      dispatch(Screens["b" /* default */].actions.setActiveScreen(Screens["a" /* Screens */].ManageTrackers));
    },
    disabled: !isPrivacyEnabled || trackersBlocked === 0 && cookiesBlocked === 0
  }, Object(localization["b" /* getMessage */])('popupHomeManageTrackersBtn'))), isSpecialPage && Object(core_browser_esm["c" /* jsx */])("div", {
    css: specialPageDescriptionCss
  }, Object(core_browser_esm["c" /* jsx */])(hidden_icon_default.a, {
    css: specialPageIcon
  }), Object(localization["b" /* getMessage */])('popupHomeNACallout'))));
};
// EXTERNAL MODULE: ./src/privacy-search/icons/protection-on.svg
var protection_on = __webpack_require__(483);
var protection_on_default = /*#__PURE__*/__webpack_require__.n(protection_on);

// EXTERNAL MODULE: ./src/privacy-search/icons/protection-off.svg
var protection_off = __webpack_require__(484);
var protection_off_default = /*#__PURE__*/__webpack_require__.n(protection_off);

// EXTERNAL MODULE: ./src/privacy-search/icons/protection-off-gray.svg
var protection_off_gray = __webpack_require__(485);
var protection_off_gray_default = /*#__PURE__*/__webpack_require__.n(protection_off_gray);

// EXTERNAL MODULE: ./src/common/components/Toggle.tsx
var Toggle = __webpack_require__(404);

// CONCATENATED MODULE: ./src/privacy-search/components/Popup/Home/ProtectionToggleBar.tsx
function ProtectionToggleBar_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
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

// @ts-expect-error

// @ts-expect-error





var protectionToggleBarCss =  true ? {
  name: "7q31hu-protectionToggleBarCss",
  styles: "align-items:center;border-top:1px solid #ebecf7;border-bottom:1px solid #ebecf7;display:flex;height:46px;padding:0 12px;;label:protectionToggleBarCss;"
} : undefined;
var protectionIconCss =  true ? {
  name: "reuvw2-protectionIconCss",
  styles: "margin-right:8px;;label:protectionIconCss;"
} : undefined;
var protectionDescriptionCss =  true ? {
  name: "1kyvj95-protectionDescriptionCss",
  styles: "font-size:14px;> span{font-weight:600;};label:protectionDescriptionCss;"
} : undefined;
var ProtectionToggleBar_ref =  true ? {
  name: "jhj8f5-ProtectionToggleBar",
  styles: "margin-left:auto;;label:ProtectionToggleBar;"
} : undefined;
var ProtectionToggleBar = () => {
  var tabData = Object(es["c" /* useSelector */])(selectors["d" /* tabDataSelector */]);
  var {
    isPrivacyEnabled,
    isSpecialPage
  } = tabData;
  return Object(core_browser_esm["c" /* jsx */])("div", {
    css: protectionToggleBarCss
  }, isPrivacyEnabled && Object(core_browser_esm["c" /* jsx */])(protection_on_default.a, {
    css: protectionIconCss
  }), !isPrivacyEnabled && !isSpecialPage && Object(core_browser_esm["c" /* jsx */])(protection_off_default.a, {
    css: protectionIconCss
  }), !isPrivacyEnabled && isSpecialPage && Object(core_browser_esm["c" /* jsx */])(protection_off_gray_default.a, {
    css: protectionIconCss
  }), Object(core_browser_esm["c" /* jsx */])("div", {
    css: protectionDescriptionCss
  }, Object(localization["b" /* getMessage */])('popupHomeToggleLabel'), ' ', Object(core_browser_esm["c" /* jsx */])("span", null, isPrivacyEnabled ? Object(localization["b" /* getMessage */])('popupHomeToggleOn') : Object(localization["b" /* getMessage */])('popupHomeToggleOff'))), Object(core_browser_esm["c" /* jsx */])("div", {
    css: ProtectionToggleBar_ref
  }, Object(core_browser_esm["c" /* jsx */])(Toggle["a" /* default */], {
    id: "privacy-toggle",
    height: 24,
    width: 40,
    hexColor: "#6573ff",
    checked: isPrivacyEnabled,
    animate: false,
    onChange: () => {
      if (!isSpecialPage) {
        var togglePrivacy = isPrivacyEnabled ? 'deactivatePrivacy' : 'activatePrivacy';
        browser.runtime.sendMessage({
          message: togglePrivacy
        }).then(() => {
          browser.tabs.reload();
          window.close();
        });
      }
    }
  })));
};
// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-1.svg
var privacy_score_1 = __webpack_require__(486);
var privacy_score_1_default = /*#__PURE__*/__webpack_require__.n(privacy_score_1);

// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-2.svg
var privacy_score_2 = __webpack_require__(487);
var privacy_score_2_default = /*#__PURE__*/__webpack_require__.n(privacy_score_2);

// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-3.svg
var privacy_score_3 = __webpack_require__(488);
var privacy_score_3_default = /*#__PURE__*/__webpack_require__.n(privacy_score_3);

// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-4.svg
var privacy_score_4 = __webpack_require__(489);
var privacy_score_4_default = /*#__PURE__*/__webpack_require__.n(privacy_score_4);

// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-5.svg
var privacy_score_5 = __webpack_require__(490);
var privacy_score_5_default = /*#__PURE__*/__webpack_require__.n(privacy_score_5);

// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-disabled-1.svg
var privacy_score_disabled_1 = __webpack_require__(491);
var privacy_score_disabled_1_default = /*#__PURE__*/__webpack_require__.n(privacy_score_disabled_1);

// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-disabled-2.svg
var privacy_score_disabled_2 = __webpack_require__(492);
var privacy_score_disabled_2_default = /*#__PURE__*/__webpack_require__.n(privacy_score_disabled_2);

// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-disabled-3.svg
var privacy_score_disabled_3 = __webpack_require__(493);
var privacy_score_disabled_3_default = /*#__PURE__*/__webpack_require__.n(privacy_score_disabled_3);

// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-disabled-4.svg
var privacy_score_disabled_4 = __webpack_require__(494);
var privacy_score_disabled_4_default = /*#__PURE__*/__webpack_require__.n(privacy_score_disabled_4);

// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-disabled-5.svg
var privacy_score_disabled_5 = __webpack_require__(495);
var privacy_score_disabled_5_default = /*#__PURE__*/__webpack_require__.n(privacy_score_disabled_5);

// EXTERNAL MODULE: ./src/privacy-search/icons/privacy-score-na.svg
var privacy_score_na = __webpack_require__(496);
var privacy_score_na_default = /*#__PURE__*/__webpack_require__.n(privacy_score_na);

// CONCATENATED MODULE: ./src/privacy-search/components/Popup/Home/TopPanel.tsx
function TopPanel_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
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

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error



var topPanelCss =  true ? {
  name: "16y3fpj-topPanelCss",
  styles: "align-items:center;display:flex;height:100px;padding:12px;position:relative;;label:topPanelCss;"
} : undefined;
var summaryCss =  true ? {
  name: "1j6b6yg-summaryCss",
  styles: "display:flex;flex-direction:column;justify-content:space-between;padding:4px 0;;label:summaryCss;"
} : undefined;
var scoreCss =  true ? {
  name: "wy1nt5-scoreCss",
  styles: "font-size:14px;margin-bottom:5px;> span{font-weight:600;letter-spacing:2px;};label:scoreCss;"
} : undefined;
var domainCss =  true ? {
  name: "1s27053-domainCss",
  styles: "font-size:22px;font-weight:600;margin-bottom:8px;max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;;label:domainCss;"
} : undefined;
var scoreDescriptionCss =  true ? {
  name: "ol2ani-scoreDescriptionCss",
  styles: "color:#7f869f;font-size:13px;;label:scoreDescriptionCss;"
} : undefined;
var TopPanel_specialPageDescriptionCss =  true ? {
  name: "1oiagdo-specialPageDescriptionCss",
  styles: "color:#ced1dd;font-size:22px;font-weight:600;line-height:24px;white-space:pre-wrap;;label:specialPageDescriptionCss;"
} : undefined;
var TopPanel = () => {
  var tabData = Object(es["c" /* useSelector */])(selectors["d" /* tabDataSelector */]);
  var {
    isPrivacyEnabled,
    isSpecialPage,
    score,
    tld
  } = tabData;
  var scoreIconCss = /*#__PURE__*/Object(core_browser_esm["b" /* css */])("flex-shrink:0;margin-right:12px;opacity:", isPrivacyEnabled ? 1 : 0, ";transition:opacity 0.4s;;label:scoreIconCss;" + ( true ? "" : undefined));
  var scoreIconDisabledCss = /*#__PURE__*/Object(core_browser_esm["b" /* css */])("opacity:", isPrivacyEnabled ? 0 : 1, ";position:absolute;transition:opacity 0.4s;;label:scoreIconDisabledCss;" + ( true ? "" : undefined));
  return Object(core_browser_esm["c" /* jsx */])("div", {
    css: topPanelCss
  }, isSpecialPage && Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(core_browser_esm["c" /* jsx */])(privacy_score_na_default.a, {
    css: scoreIconCss
  }), " ", Object(core_browser_esm["c" /* jsx */])(privacy_score_na_default.a, {
    css: scoreIconDisabledCss
  })), score === 1 && Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(core_browser_esm["c" /* jsx */])(privacy_score_1_default.a, {
    css: scoreIconCss
  }), " ", Object(core_browser_esm["c" /* jsx */])(privacy_score_disabled_1_default.a, {
    css: scoreIconDisabledCss
  })), score === 2 && Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(core_browser_esm["c" /* jsx */])(privacy_score_2_default.a, {
    css: scoreIconCss
  }), " ", Object(core_browser_esm["c" /* jsx */])(privacy_score_disabled_2_default.a, {
    css: scoreIconDisabledCss
  })), score === 3 && Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(core_browser_esm["c" /* jsx */])(privacy_score_3_default.a, {
    css: scoreIconCss
  }), " ", Object(core_browser_esm["c" /* jsx */])(privacy_score_disabled_3_default.a, {
    css: scoreIconDisabledCss
  })), score === 4 && Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(core_browser_esm["c" /* jsx */])(privacy_score_4_default.a, {
    css: scoreIconCss
  }), " ", Object(core_browser_esm["c" /* jsx */])(privacy_score_disabled_4_default.a, {
    css: scoreIconDisabledCss
  })), score === 5 && Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(core_browser_esm["c" /* jsx */])(privacy_score_5_default.a, {
    css: scoreIconCss
  }), " ", Object(core_browser_esm["c" /* jsx */])(privacy_score_disabled_5_default.a, {
    css: scoreIconDisabledCss
  })), Object(core_browser_esm["c" /* jsx */])("div", {
    css: summaryCss
  }, !isSpecialPage && Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(core_browser_esm["c" /* jsx */])("div", {
    css: scoreCss
  }, Object(localization["b" /* getMessage */])('popupHomeScoreLabel'), ": ", Object(core_browser_esm["c" /* jsx */])("span", null, score, "/5")), Object(core_browser_esm["c" /* jsx */])("div", {
    css: domainCss
  }, tld), Object(core_browser_esm["c" /* jsx */])("div", {
    css: scoreDescriptionCss
  }, score === 5 && Object(localization["b" /* getMessage */])('popupHomeScoreFiveDescription'), score === 4 && Object(localization["b" /* getMessage */])('popupHomeScoreFourDescription'), score === 3 && Object(localization["b" /* getMessage */])('popupHomeScoreThreeDescription'), score === 2 && Object(localization["b" /* getMessage */])('popupHomeScoreTwoDescription'), score === 1 && Object(localization["b" /* getMessage */])('popupHomeScoreOneDescription'))), isSpecialPage && Object(core_browser_esm["c" /* jsx */])("div", {
    css: TopPanel_specialPageDescriptionCss
  }, Object(localization["b" /* getMessage */])('popupHomeScoreNA'))));
};
// CONCATENATED MODULE: ./src/privacy-search/components/Popup/Home/index.tsx
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






var Home = () => {
  return Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(core_browser_esm["c" /* jsx */])(TopPanel, null), Object(core_browser_esm["c" /* jsx */])(ProtectionToggleBar, null), Object(core_browser_esm["c" /* jsx */])(BottomPanel, null));
};
/* harmony default export */ var Popup_Home = __webpack_exports__["default"] = (Home);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NvbXBvbmVudHMvVG9nZ2xlLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvdXRpbHMvZGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvaGlkZGVuLWljb24uc3ZnIiwid2VicGFjazovLy8uL3NyYy9wcml2YWN5LXNlYXJjaC9pY29ucy9wcm90ZWN0aW9uLW9uLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJvdGVjdGlvbi1vZmYuc3ZnIiwid2VicGFjazovLy8uL3NyYy9wcml2YWN5LXNlYXJjaC9pY29ucy9wcm90ZWN0aW9uLW9mZi1ncmF5LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS0xLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS0yLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS0zLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS00LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS01LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS1kaXNhYmxlZC0xLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS1kaXNhYmxlZC0yLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS1kaXNhYmxlZC0zLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS1kaXNhYmxlZC00LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS1kaXNhYmxlZC01LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvaWNvbnMvcHJpdmFjeS1zY29yZS1uYS5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByaXZhY3ktc2VhcmNoL2NvbXBvbmVudHMvUG9wdXAvSG9tZS9UcmFja2VyRGlzcGxheS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByaXZhY3ktc2VhcmNoL2NvbXBvbmVudHMvUG9wdXAvSG9tZS9Cb3R0b21QYW5lbC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByaXZhY3ktc2VhcmNoL2NvbXBvbmVudHMvUG9wdXAvSG9tZS9Qcm90ZWN0aW9uVG9nZ2xlQmFyLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvY29tcG9uZW50cy9Qb3B1cC9Ib21lL1RvcFBhbmVsLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvY29tcG9uZW50cy9Qb3B1cC9Ib21lL2luZGV4LnRzeCJdLCJuYW1lcyI6WyJUb2dnbGUiLCJfcmVmIiwiaWQiLCJoZWlnaHQiLCJ3aWR0aCIsImhleENvbG9yIiwiY2hlY2tlZCIsImFuaW1hdGUiLCJvbkNoYW5nZSIsInNsaWRlckRpYW1ldGVyIiwidG9nZ2xlQ3NzIiwiY3NzIiwicHJvY2VzcyIsIl9fX0Vtb3Rpb25KU1giLCJjbGFzc05hbWUiLCJodG1sRm9yIiwidHlwZSIsImV2ZW50IiwiZ2V0RGlzcGxheUNvdW50IiwiY291bnQiLCJrU3RhcnQiLCJtU3RhcnQiLCJjb25jYXQiLCJNYXRoIiwiZmxvb3IiLCJuYW1lIiwic3R5bGVzIiwiX3JlZjIiLCJfcmVmMyIsIlRyYWNrZXJEaXNwbGF5IiwiX3JlZjQiLCJibG9ja2VkIiwic3VidGl0bGUiLCJ0cmFja2VyRGlzcGxheUNzcyIsInJlc29sdmVUaXRsZUJnQ29sb3IiLCJ0aXRsZUNzcyIsImNvdW50Q3NzIiwic3VidGl0bGVDc3MiLCJnZXRNZXNzYWdlIiwiYm90dG9tUGFuZWxDc3MiLCJpbm5lckNvbnRhaW5lckNzcyIsIm1hbmFnZUJ0bkNzcyIsInNwZWNpYWxQYWdlSWNvbiIsInNwZWNpYWxQYWdlRGVzY3JpcHRpb25Dc3MiLCJCb3R0b21QYW5lbCIsInRhYkRhdGEiLCJ1c2VTZWxlY3RvciIsInRhYkRhdGFTZWxlY3RvciIsInRyYWNrZXJzQmxvY2tlZCIsImNvb2tpZXNCbG9ja2VkIiwiaXNTcGVjaWFsUGFnZSIsImlzUHJpdmFjeUVuYWJsZWQiLCJkaXNwYXRjaCIsInVzZUFwcERpc3BhdGNoIiwiUmVhY3QiLCJGcmFnbWVudCIsIm9uQ2xpY2siLCJzY3JlZW5NYW5hZ2VtZW50U2xpY2UiLCJhY3Rpb25zIiwic2V0QWN0aXZlU2NyZWVuIiwiU2NyZWVucyIsIk1hbmFnZVRyYWNrZXJzIiwiZGlzYWJsZWQiLCJIaWRkZW5JY29uIiwicHJvdGVjdGlvblRvZ2dsZUJhckNzcyIsInByb3RlY3Rpb25JY29uQ3NzIiwicHJvdGVjdGlvbkRlc2NyaXB0aW9uQ3NzIiwiUHJvdGVjdGlvblRvZ2dsZUJhciIsIlByb3RlY3Rpb25PbiIsIlByb3RlY3Rpb25PZmYiLCJQcm90ZWN0aW9uT2ZmR3JheSIsInRvZ2dsZVByaXZhY3kiLCJicm93c2VyIiwicnVudGltZSIsInNlbmRNZXNzYWdlIiwibWVzc2FnZSIsInRoZW4iLCJ0YWJzIiwicmVsb2FkIiwid2luZG93IiwiY2xvc2UiLCJ0b3BQYW5lbENzcyIsInN1bW1hcnlDc3MiLCJzY29yZUNzcyIsImRvbWFpbkNzcyIsInNjb3JlRGVzY3JpcHRpb25Dc3MiLCJUb3BQYW5lbCIsInNjb3JlIiwidGxkIiwic2NvcmVJY29uQ3NzIiwic2NvcmVJY29uRGlzYWJsZWRDc3MiLCJQcml2YWN5U2NvcmVOQSIsIlByaXZhY3lTY29yZTEiLCJQcml2YWN5U2NvcmVEaXNhYmxlZDEiLCJQcml2YWN5U2NvcmUyIiwiUHJpdmFjeVNjb3JlRGlzYWJsZWQyIiwiUHJpdmFjeVNjb3JlMyIsIlByaXZhY3lTY29yZURpc2FibGVkMyIsIlByaXZhY3lTY29yZTQiLCJQcml2YWN5U2NvcmVEaXNhYmxlZDQiLCJQcml2YWN5U2NvcmU1IiwiUHJpdmFjeVNjb3JlRGlzYWJsZWQ1IiwiSG9tZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWdDO0FBQ0U7QUFBQTtBQVlsQyxJQUFNQSxNQUF1QixHQUFHQyxJQUFBLElBQThFO0VBQUEsSUFBN0U7SUFBQ0MsRUFBRTtJQUFFQyxNQUFNO0lBQUVDLEtBQUs7SUFBRUMsUUFBUTtJQUFFQyxPQUFPLEdBQUcsS0FBSztJQUFFQyxPQUFPLEdBQUcsSUFBSTtJQUFFQyxRQUFRLEVBQVJBO0VBQVEsQ0FBQyxHQUFBUCxJQUFBO0VBQ3JHLElBQU1RLGNBQWMsR0FBR04sTUFBTSxHQUFHLElBQUk7RUFFcEMsSUFBTU8sU0FBUyxnQkFBR0MsaUVBQUcsMkRBSUhSLE1BQU0sZUFDUEMsS0FBSyxtR0FXR0QsTUFBTSxrREFLckJJLE9BQU8sSUFBSSxtQkFBbUIsZ0RBSVpGLFFBQVEsOERBS1hJLGNBQWMsa0VBR3JCQSxjQUFjLHFCQUNUQSxjQUFjLHNDQUVwQkEsY0FBYyxTQUVyQkYsT0FBTyxJQUFJLG1CQUFtQixvRkFLUkgsS0FBSyxHQUFHRCxNQUFNLDhCQUFBUyxLQUFBLG1CQUU3QztFQUVELE9BQ0lDLGlFQUFBO0lBQUtGLEdBQUcsRUFBRUQ7RUFBVSxHQUNoQkcsaUVBQUE7SUFBT0MsU0FBUyxFQUFDLFFBQVE7SUFBQ0MsT0FBTyxFQUFFYjtFQUFHLEdBQ2xDVyxpRUFBQTtJQUNJWCxFQUFFLEVBQUVBLEVBQUc7SUFDUGMsSUFBSSxFQUFDLFVBQVU7SUFDZlYsT0FBTyxFQUFFQTtJQUNUO0lBQUE7SUFDQUUsUUFBUSxFQUFHUyxLQUEwQyxJ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QUtGLEdBQUcsRUFBRXlFO0VBQVUsR0FBRUksR0FBRyxDQUFPLEVBQ2hDM0UsdUNBQUE7SUFBS0YsR0FBRyxFQUFFMEU7RUFBb0IsR0FDekJFLEtBQUssS0FBSyxDQUFDLElBQUlqRCwwQ0FBVSxDQUFDLCtCQUErQixDQUFDLEVBQzFEaUQsS0FBSyxLQUFLLENBQUMsSUFBSWpELDBDQUFVLENBQUMsK0JBQStCLENBQUMsRUFDMURpRCxLQUFLLEtBQUssQ0FBQyxJQUFJakQsMENBQVUsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUMzRGlELEtBQUssS0FBSyxDQUFDLElBQUlqRCwwQ0FBVSxDQUFDLDhCQUE4QixDQUFDLEVBQ3pEaUQsS0FBSyxLQUFLLENBQUMsSUFBSWpELDBDQUFVLENBQUMsOEJBQThCLENBQUMsQ0FDeEQsQ0FFYixFQUNBWSxhQUFhLElBQUlyQyx1Q0FBQTtJQUFLRixHQUFHLEVBQUVnQyxrQ0FBeUJBO0VBQUMsR0FBRUwsMENBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFPLENBQzNGLENBQ0o7QUFFZCxDQUFDLEM7O0FDcktEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVnQztBQUVVO0FBQ2dCO0FBQ3RCO0FBQUE7QUFFcEMsSUFBTWdFLElBQVEsR0FBR0EsQ0FBQSxLQUFNO0VBQ25CLE9BQ0l6Rix1Q0FBQSxDQUFBeUMsZUFBQSxDQUFBQyxRQUFBLFFBQ0kxQyx1Q0FBQSxDQUFDeUUsUUFBUSxPQUFHLEVBQ1p6RSx1Q0FBQSxDQUFDc0QsbUJBQW1CLE9BQUcsRUFDdkJ0RCx1Q0FBQSxDQUFDK0IsV0FBVyxPQUFHLENBQ2hCO0FBRVgsQ0FBQztBQUVjMEQsb0ZBQUksRSIsImZpbGUiOiIxMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMjIgU3VyZmJvYXJkIEhvbGRpbmcgQi5WLiA8aHR0cHM6Ly93d3cuc3RhcnRwYWdlLmNvbT5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtGQ30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjc3N9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuXG50eXBlIFRvZ2dsZVByb3BzID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZXhDb2xvcjogc3RyaW5nO1xuICAgIGNoZWNrZWQ/OiBib29sZWFuO1xuICAgIGFuaW1hdGU/OiBib29sZWFuO1xuICAgIG9uQ2hhbmdlPzogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IFRvZ2dsZTogRkM8VG9nZ2xlUHJvcHM+ID0gKHtpZCwgaGVpZ2h0LCB3aWR0aCwgaGV4Q29sb3IsIGNoZWNrZWQgPSBmYWxzZSwgYW5pbWF0ZSA9IHRydWUsIG9uQ2hhbmdlfSkgPT4ge1xuICAgIGNvbnN0IHNsaWRlckRpYW1ldGVyID0gaGVpZ2h0ICogMC43NTtcblxuICAgIGNvbnN0IHRvZ2dsZUNzcyA9IGNzc2BcbiAgICAgICAgLnN3aXRjaCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICBoZWlnaHQ6ICR7aGVpZ2h0fXB4O1xuICAgICAgICAgICAgd2lkdGg6ICR7d2lkdGh9cHg7XG4gICAgICAgIH1cblxuICAgICAgICAuc3dpdGNoIGlucHV0IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgICB3aWR0aDogMDtcbiAgICAgICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zbGlkZXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2NlZDFkZDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6ICR7aGVpZ2h0fXB4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgaW5zZXQ6IDA7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG5cbiAgICAgICAgICAgICR7YW5pbWF0ZSAmJiAndHJhbnNpdGlvbjogMC40czsnfVxuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtoZXhDb2xvcn07XG4gICAgICAgIH1cblxuICAgICAgICAuc2xpZGVyOmJlZm9yZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWJlY2Y3O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogJHtzbGlkZXJEaWFtZXRlcn1weDtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDFweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgaGVpZ2h0OiAke3NsaWRlckRpYW1ldGVyfXB4O1xuICAgICAgICAgICAgbWFyZ2luOiBjYWxjKCR7c2xpZGVyRGlhbWV0ZXJ9cHggLyA2KTtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAke3NsaWRlckRpYW1ldGVyfXB4O1xuXG4gICAgICAgICAgICAke2FuaW1hdGUgJiYgJ3RyYW5zaXRpb246IDAuNHM7J31cbiAgICAgICAgfVxuXG4gICAgICAgIGlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7d2lkdGggLSBoZWlnaHR9cHgpO1xuICAgICAgICB9XG4gICAgYDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY3NzPXt0b2dnbGVDc3N9PlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInN3aXRjaFwiIGh0bWxGb3I9e2lkfT5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtjaGVja2VkfVxuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2xpZGVyXCIgLz5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb2dnbGU7XG4iLCIvKlxuICogQ29weXJpZ2h0IChDKSAyMDIyIFN1cmZib2FyZCBIb2xkaW5nIEIuVi4gPGh0dHBzOi8vd3d3LnN0YXJ0cGFnZS5jb20+XG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxudHlwZSBnZXREaXNwbGF5Q291bnRQcm9wcyA9IHtcbiAgICBjb3VudDogbnVtYmVyO1xuICAgIGtTdGFydD86IG51bWJlcjtcbiAgICBtU3RhcnQ/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RGlzcGxheUNvdW50ID0gKHtjb3VudCwga1N0YXJ0ID0gMTAwMCwgbVN0YXJ0ID0gMTAwMDAwMH06IGdldERpc3BsYXlDb3VudFByb3BzKSA9PiB7XG4gICAgLy8gRm9ybWF0IG1pbGxpb25zXG4gICAgaWYgKGNvdW50ID49IG1TdGFydCkge1xuICAgICAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihjb3VudCAvIDEwMDAwMDApfU1gO1xuICAgIH1cblxuICAgIC8vIEZvcm1hdCB0aG91c2FuZHNcbiAgICBpZiAoY291bnQgPj0ga1N0YXJ0KSB7XG4gICAgICAgIHJldHVybiBgJHtNYXRoLmZsb29yKGNvdW50IC8gMTAwMCl9a2A7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvdW50O1xufTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmZ1bmN0aW9uIEhpZGRlbkljb24gKHByb3BzKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIixwcm9wcyxbUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJkXCI6XCJNMjEuMzMwMiAyLjI2MDI0QzIwLjk4NDkgMS45MDM2NSAyMC40MzI0IDEuOTAzNjUgMjAuMDg3IDIuMjYwMjRMMTYuOTU2MSA1LjQ5MzI3QzEzLjA2NTUgMy42ODY1NyA4LjkyMTU3IDQuMTI2MzYgNC45NzMzNyA2Ljc4ODg2QzIuMDI2NiA4Ljc3Mzg1IDAuMjQyNDMxIDExLjI2OTkgMC4xNzMzNjYgMTEuMzc2OUMtMC4wNTY4NDk4IDExLjcwOTcgLTAuMDU2ODQ5OCAxMi4xNjE0IDAuMTk2Mzg4IDEyLjQ5NDJDMS44NjU0NSAxNC42MDk5IDMuNjI2NiAxNi4yNjIxIDUuNDEwNzggMTcuNDE1MUwyLjY0ODE5IDIwLjI2NzhDMi4zMDI4NiAyMC42MjQzIDIuMzAyODYgMjEuMTk0OSAyLjY0ODE5IDIxLjU2MzNDMi44MjA4NSAyMS43NDE2IDMuMDM5NTUgMjEuODM2NyAzLjI2OTc3IDIxLjgzNjdDMy40OTk5OCAyMS44MzY3IDMuNzE4NjkgMjEuNzQxNiAzLjg5MTM1IDIxLjU2MzNMMjEuMzMwMiAzLjU1NTgzQzIxLjY3NTUgMy4xOTkyNCAyMS42NzU1IDIuNjI4NzEgMjEuMzMwMiAyLjI2MDI0Wk05LjgxOTQxIDEyLjg3NDZDOS42OTI3OSAxMi41Nzc0IDkuNjIzNzMgMTIuMjU2NSA5LjYyMzczIDExLjkxMThDOS42MjM3MyAxMS4yNTgxIDkuODY1NDUgMTAuNjQgMTAuMzE0NCAxMC4xNzY0QzExLjAxNjUgOS40NTEzNiAxMi4wNjQgOS4yNzMwNyAxMi45MjczIDkuNjUzNDJMOS44MTk0MSAxMi44NzQ2Wk0xNC4yMzk2IDguMzEwMjlDMTIuNjM5NiA3LjI1MjQyIDEwLjQ3NTUgNy40NDI2IDkuMDgyNzIgOC44ODA4MkM4LjI5OTk4IDkuNjg5MDggNy44NzQwOSAxMC43NTg4IDcuODc0MDkgMTEuODk5OUM3Ljg3NDA5IDEyLjczMTkgOC4xMDQzIDEzLjUyODMgOC41MzAyIDE0LjIwNThMNi43MTE1IDE2LjA4MzhDNS4xMjMwMSAxNS4xMzI5IDMuNTU3NTQgMTMuNzMwNCAyLjAyNjYgMTEuODg4QzIuNjgyNzIgMTEuMTAzNSA0LjA1MjUgOS41ODIxMSA1Ljk0MDI3IDguMzEwMjlDOS4xOTc4MyA2LjExMTM1IDEyLjQ0MzkgNS42MzU5IDE1LjYwOTMgNi44ODM5NUwxNC4yMzk2IDguMzEwMjlaXCIsXCJmaWxsXCI6XCIjQ0VEMUREXCIsXCJrZXlcIjowfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJkXCI6XCJNMjMuODA0MyAxMS4zMzA3QzIyLjU5NTcgOS43OTczNCAyMS4zNDEgOC41MDE3NSAyMC4wNjMzIDcuNDY3NjZDMTkuNjcxOSA3LjE1ODYyIDE5LjExOTQgNy4yMjk5MyAxOC44MjAxIDcuNjIyMTdDMTguNTIwOSA4LjAxNDQyIDE4LjU4OTkgOC41ODQ5NSAxOC45Njk4IDguOTA1ODhDMTkuOTgyNyA5LjcxNDE0IDIwLjk4NDIgMTAuNzM2MyAyMS45NjI2IDExLjkxMzFDMjEuMzg3MSAxMi42MTQ0IDIwLjI1OSAxMy44NjI0IDE4LjcyODEgMTUuMDE1NEMxNS43ODEzIDE3LjIyNjIgMTIuODExNSAxOC4wMjI2IDkuODk5MjggMTcuMzkyNkM5LjQyNzM0IDE3LjI4NTYgOC45NTU0IDE3LjYwNjUgOC44NTE4IDE4LjA5MzlDOC43NDgyIDE4LjU4MTIgOS4wNTg5OSAxOS4wNjg1IDkuNTMwOTMgMTkuMTc1NUMxMC4yOTA2IDE5LjM0MTkgMTEuMDUwNCAxOS40MjUxIDExLjgyMTYgMTkuNDI1MUMxMi45NzI3IDE5LjQyNTEgMTQuMTQ2OCAxOS4yMzQ5IDE1LjI5NzggMTguODY2NUMxNi44MTczIDE4LjM3OTEgMTguMzM2NyAxNy41NzA5IDE5Ljc5ODYgMTYuNDY1NUMyMi4yNjE5IDE0LjU5OTMgMjMuNzM1MyAxMi41NDMgMjMuODA0MyAxMi40NTk4QzI0LjA1NzYgMTIuMTE1MSAyNC4wNTc2IDExLjY2MzUgMjMuODA0MyAxMS4zMzA3WlwiLFwiZmlsbFwiOlwiI0NFRDFERFwiLFwia2V5XCI6MX0pLFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkZWZzXCIse1wia2V5XCI6Mn0sUmVhY3QuY3JlYXRlRWxlbWVudChcImNsaXBQYXRoXCIse1wiaWRcIjpcImNsaXAwXCJ9LFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJyZWN0XCIse1wid2lkdGhcIjpcIjI0XCIsXCJoZWlnaHRcIjpcIjE5LjgyNjFcIixcImZpbGxcIjpcIndoaXRlXCIsXCJ0cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZSgwIDIpXCJ9KSkpXSk7XG59XG5cbkhpZGRlbkljb24uZGVmYXVsdFByb3BzID0ge1wid2lkdGhcIjpcIjI0XCIsXCJoZWlnaHRcIjpcIjI0XCIsXCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGlkZGVuSWNvbjtcblxuSGlkZGVuSWNvbi5kZWZhdWx0ID0gSGlkZGVuSWNvbjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmZ1bmN0aW9uIFByb3RlY3Rpb25PbiAocHJvcHMpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLHByb3BzLFtSZWFjdC5jcmVhdGVFbGVtZW50KFwiY2lyY2xlXCIse1wiY3hcIjpcIjhcIixcImN5XCI6XCI4XCIsXCJyXCI6XCI4XCIsXCJmaWxsXCI6XCIjMjlERENDXCIsXCJrZXlcIjowfSksUmVhY3QuY3JlYXRlRWxlbWVudChcImdcIix7XCJjbGlwUGF0aFwiOlwidXJsKCNjbGlwMClcIixcImtleVwiOjF9LFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse1wiZFwiOlwiTTExLjUgNi4wMDM4TDEwLjAyNDIgNUw3LjI1ODA2IDguNjEyMTdMNS41NjQ1MiA3LjQ1NjI3TDQuNSA4Ljg0NzkxTDcuNjYxMjkgMTFWMTAuOTkyNEw3LjY2OTM1IDExTDExLjUgNi4wMDM4WlwiLFwiZmlsbFwiOlwiIzIwMjk0NVwifSkpLFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkZWZzXCIse1wia2V5XCI6Mn0sUmVhY3QuY3JlYXRlRWxlbWVudChcImNsaXBQYXRoXCIse1wiaWRcIjpcImNsaXAwXCJ9LFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJyZWN0XCIse1wid2lkdGhcIjpcIjdcIixcImhlaWdodFwiOlwiNlwiLFwiZmlsbFwiOlwid2hpdGVcIixcInRyYW5zZm9ybVwiOlwidHJhbnNsYXRlKDQuNSA1KVwifSkpKV0pO1xufVxuXG5Qcm90ZWN0aW9uT24uZGVmYXVsdFByb3BzID0ge1wid2lkdGhcIjpcIjE2XCIsXCJoZWlnaHRcIjpcIjE2XCIsXCJ2aWV3Qm94XCI6XCIwIDAgMTYgMTZcIixcImZpbGxcIjpcIm5vbmVcIn07XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvdGVjdGlvbk9uO1xuXG5Qcm90ZWN0aW9uT24uZGVmYXVsdCA9IFByb3RlY3Rpb25PbjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmZ1bmN0aW9uIFByb3RlY3Rpb25PZmYgKHByb3BzKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIixwcm9wcyxbUmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLHtcImN4XCI6XCI4XCIsXCJjeVwiOlwiOFwiLFwiclwiOlwiOFwiLFwiZmlsbFwiOlwiI0VCNTc1N1wiLFwia2V5XCI6MH0pLFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse1wiZFwiOlwiTTcgNC41SDlMOC43Mzk0NiA4LjVINy4yNzU4Nkw3IDQuNVpcIixcImZpbGxcIjpcIndoaXRlXCIsXCJrZXlcIjoxfSksUmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLHtcImN4XCI6XCI4XCIsXCJjeVwiOlwiMTAuNVwiLFwiclwiOlwiMVwiLFwiZmlsbFwiOlwid2hpdGVcIixcImtleVwiOjJ9KV0pO1xufVxuXG5Qcm90ZWN0aW9uT2ZmLmRlZmF1bHRQcm9wcyA9IHtcIndpZHRoXCI6XCIxNlwiLFwiaGVpZ2h0XCI6XCIxNlwiLFwidmlld0JveFwiOlwiMCAwIDE2IDE2XCIsXCJmaWxsXCI6XCJub25lXCJ9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb3RlY3Rpb25PZmY7XG5cblByb3RlY3Rpb25PZmYuZGVmYXVsdCA9IFByb3RlY3Rpb25PZmY7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBQcm90ZWN0aW9uT2ZmR3JheSAocHJvcHMpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLHByb3BzLFtSZWFjdC5jcmVhdGVFbGVtZW50KFwiY2lyY2xlXCIse1wiY3hcIjpcIjhcIixcImN5XCI6XCI4XCIsXCJyXCI6XCI4XCIsXCJmaWxsXCI6XCIjN0Y4NjlGXCIsXCJrZXlcIjowfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJkXCI6XCJNNyA0LjVIOUw4LjczOTQ2IDguNUg3LjI3NTg2TDcgNC41WlwiLFwiZmlsbFwiOlwid2hpdGVcIixcImtleVwiOjF9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwiY2lyY2xlXCIse1wiY3hcIjpcIjhcIixcImN5XCI6XCIxMC41XCIsXCJyXCI6XCIxXCIsXCJmaWxsXCI6XCJ3aGl0ZVwiLFwia2V5XCI6Mn0pXSk7XG59XG5cblByb3RlY3Rpb25PZmZHcmF5LmRlZmF1bHRQcm9wcyA9IHtcIndpZHRoXCI6XCIxNlwiLFwiaGVpZ2h0XCI6XCIxNlwiLFwidmlld0JveFwiOlwiMCAwIDE2IDE2XCIsXCJmaWxsXCI6XCJub25lXCJ9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb3RlY3Rpb25PZmZHcmF5O1xuXG5Qcm90ZWN0aW9uT2ZmR3JheS5kZWZhdWx0ID0gUHJvdGVjdGlvbk9mZkdyYXk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBQcml2YWN5U2NvcmUxIChwcm9wcykge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIscHJvcHMsW1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjaXJjbGVcIix7XCJjeFwiOlwiMzZcIixcImN5XCI6XCIzNlwiLFwiclwiOlwiMjhcIixcImZpbGxcIjpcIiM2NTczRkZcIixcImtleVwiOjB9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtcImRcIjpcIk0zOC4xODMyIDI0LjVWNDYuMzE4MkgzNC4yMzA4VjI4LjM0NTlIMzQuMTAzTDI5IDMxLjYwNThWMjcuOTgzN0wzNC40MjI2IDI0LjVIMzguMTgzMlpcIixcImZpbGxcIjpcIndoaXRlXCIsXCJrZXlcIjoxfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJmaWxsUnVsZVwiOlwiZXZlbm9kZFwiLFwiY2xpcFJ1bGVcIjpcImV2ZW5vZGRcIixcImRcIjpcIk0zNiA3MkM1NS44ODIzIDcyIDcyIDU1Ljg4MjMgNzIgMzZDNzIgMTYuMTE3NyA1NS44ODIzIDAgMzYgMEMxNi4xMTc3IDAgMCAxNi4xMTc3IDAgMzZDMCA1NS44ODIzIDE2LjExNzcgNzIgMzYgNzJaTTM2IDY4QzUzLjY3MzEgNjggNjggNTMuNjczMSA2OCAzNkM2OCAxOC4zMjY5IDUzLjY3MzEgNCAzNiA0QzE4LjMyNjkgNCA0IDE4LjMyNjkgNCAzNkM0IDUzLjY3MzEgMTguMzI2OSA2OCAzNiA2OFpcIixcImZpbGxcIjpcIiNFQkVDRjdcIixcImtleVwiOjJ9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtcImZpbGxSdWxlXCI6XCJldmVub2RkXCIsXCJjbGlwUnVsZVwiOlwiZXZlbm9kZFwiLFwiZFwiOlwiTTM1LjkyODYgNzEuOTk5OUwzNiA3MS41VjY4QzIxLjc2OSA2OCA5LjcwNzY1IDU4LjcxMDQgNS41NDkyNiA0NS44NjQzTDEuNzQyOTIgNDcuMDk3NEM2LjQxNDE1IDYxLjUyNzcgMTkuOTQ5OCA3MS45Njg5IDM1LjkyODYgNzEuOTk5OVpcIixcImZpbGxcIjpcIiNFQjU3NTdcIixcImtleVwiOjN9KV0pO1xufVxuXG5Qcml2YWN5U2NvcmUxLmRlZmF1bHRQcm9wcyA9IHtcIndpZHRoXCI6XCI3MlwiLFwiaGVpZ2h0XCI6XCI3MlwiLFwidmlld0JveFwiOlwiMCAwIDcyIDcyXCIsXCJmaWxsXCI6XCJub25lXCJ9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByaXZhY3lTY29yZTE7XG5cblByaXZhY3lTY29yZTEuZGVmYXVsdCA9IFByaXZhY3lTY29yZTE7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBQcml2YWN5U2NvcmUyIChwcm9wcykge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIscHJvcHMsW1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjaXJjbGVcIix7XCJjeFwiOlwiMzZcIixcImN5XCI6XCIzNlwiLFwiclwiOlwiMjhcIixcImZpbGxcIjpcIiM2NTczRkZcIixcImtleVwiOjB9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtcImRcIjpcIk0yOC4xMjc4IDQ2LjYxNjVWNDMuNzYxNEwzNS43MDI0IDM2LjMzNTlDMzYuNDI2OCAzNS42MDQ0IDM3LjAzMDUgMzQuOTU0NSAzNy41MTM1IDM0LjM4NjRDMzcuOTk2NCAzMy44MTgyIDM4LjM1ODcgMzMuMjY3OCAzOC42MDAxIDMyLjczNTFDMzguODQxNiAzMi4yMDI0IDM4Ljk2MjQgMzEuNjM0MiAzOC45NjI0IDMxLjAzMDVDMzguOTYyNCAzMC4zNDE2IDM4LjgwNjEgMjkuNzUyMSAzOC40OTM2IDI5LjI2MjFDMzguMTgxMSAyOC43NjQ5IDM3Ljc1MTQgMjguMzgxNCAzNy4yMDQ1IDI4LjExMTVDMzYuNjU3NyAyNy44NDE2IDM2LjAzNjIgMjcuNzA2NyAzNS4zNDAyIDI3LjcwNjdDMzQuNjIyOSAyNy43MDY3IDMzLjk5NDMgMjcuODU1OCAzMy40NTQ1IDI4LjE1NDFDMzIuOTE0OCAyOC40NDUzIDMyLjQ5NTcgMjguODYwOCAzMi4xOTc0IDI5LjQwMDZDMzEuOTA2MyAyOS45NDAzIDMxLjc2MDcgMzAuNTgzMSAzMS43NjA3IDMxLjMyODhIMjhDMjggMjkuOTQzOSAyOC4zMTYxIDI4Ljc0MDEgMjguOTQ4MiAyNy43MTczQzI5LjU4MDMgMjYuNjk0NiAzMC40NTAzIDI1LjkwMjcgMzEuNTU4MiAyNS4zNDE2QzMyLjY3MzMgMjQuNzgwNSAzMy45NTE3IDI0LjUgMzUuMzkzNSAyNC41QzM2Ljg1NjUgMjQuNSAzOC4xNDIgMjQuNzczNCAzOS4yNSAyNS4zMjAzQzQwLjM1OCAyNS44NjcyIDQxLjIxNzMgMjYuNjE2NSA0MS44MjgxIDI3LjU2ODJDNDIuNDQ2IDI4LjUxOTkgNDIuNzU1IDI5LjYwNjUgNDIuNzU1IDMwLjgyODFDNDIuNzU1IDMxLjY0NDkgNDIuNTk4NyAzMi40NDc0IDQyLjI4NjIgMzMuMjM1OEM0MS45NzM3IDM0LjAyNDEgNDEuNDIzMyAzNC44OTc3IDQwLjYzNDkgMzUuODU2NUMzOS44NTM3IDM2LjgxNTMgMzguNzU2NCAzNy45NzY2IDM3LjM0MyAzOS4zNDAyTDMzLjU4MjQgNDMuMTY0OFY0My4zMTM5SDQzLjA4NTJWNDYuNjE2NUgyOC4xMjc4WlwiLFwiZmlsbFwiOlwid2hpdGVcIixcImtleVwiOjF9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtcImZpbGxSdWxlXCI6XCJldmVub2RkXCIsXCJjbGlwUnVsZVwiOlwiZXZlbm9kZFwiLFwiZFwiOlwiTTM2IDcyQzU1Ljg4MjMgNzIgNzIgNTUuODgyMyA3MiAzNkM3MiAxNi4xMTc3IDU1Ljg4MjMgMCAzNiAwQzE2LjExNzcgMCAwIDE2LjExNzcgMCAzNkMwIDU1Ljg4MjMgMTYuMTE3NyA3MiAzNiA3MlpNMzYgNjhDNTMuNjczMSA2OCA2OCA1My42NzMxIDY4IDM2QzY4IDE4LjMyNjkgNTMuNjczMSA0IDM2IDRDMTguMzI2OSA0IDQgMTguMzI2OSA0IDM2QzQgNTMuNjczMSAxOC4zMjY5IDY4IDM2IDY4WlwiLFwiZmlsbFwiOlwiI0VCRUNGN1wiLFwia2V5XCI6Mn0pLFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse1wiZmlsbFJ1bGVcIjpcImV2ZW5vZGRcIixcImNsaXBSdWxlXCI6XCJldmVub2RkXCIsXCJkXCI6XCJNMzUuOTI3MyA3MS45OTk5TDM2IDcxLjc2MzZWNjhDMTguMzI2OSA2OCA0IDUzLjY3MzEgNCAzNkM0IDI1LjMzNzQgOS4yMTQ5NiAxNS44OTI4IDE3LjIzMzQgMTAuMDc3N0wxNC45MDMyIDYuODI2MTdDNS44NzM1NyAxMy4zNjcyIDAgMjMuOTk3NyAwIDM2QzAgNTUuODU4IDE2LjA3ODUgNzEuOTYwNyAzNS45MjczIDcxLjk5OTlaXCIsXCJmaWxsXCI6XCIjRjE4QjFGXCIsXCJrZXlcIjozfSldKTtcbn1cblxuUHJpdmFjeVNjb3JlMi5kZWZhdWx0UHJvcHMgPSB7XCJ3aWR0aFwiOlwiNzJcIixcImhlaWdodFwiOlwiNzJcIixcInZpZXdCb3hcIjpcIjAgMCA3MiA3MlwiLFwiZmlsbFwiOlwibm9uZVwifTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcml2YWN5U2NvcmUyO1xuXG5Qcml2YWN5U2NvcmUyLmRlZmF1bHQgPSBQcml2YWN5U2NvcmUyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuZnVuY3Rpb24gUHJpdmFjeVNjb3JlMyAocHJvcHMpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLHByb3BzLFtSZWFjdC5jcmVhdGVFbGVtZW50KFwiY2lyY2xlXCIse1wiY3hcIjpcIjM2XCIsXCJjeVwiOlwiMzZcIixcInJcIjpcIjI4XCIsXCJmaWxsXCI6XCIjNjU3M0ZGXCIsXCJrZXlcIjowfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJmaWxsUnVsZVwiOlwiZXZlbm9kZFwiLFwiY2xpcFJ1bGVcIjpcImV2ZW5vZGRcIixcImRcIjpcIk0zNiA3MkM1NS44ODIzIDcyIDcyIDU1Ljg4MjMgNzIgMzZDNzIgMTYuMTE3NyA1NS44ODIzIDAgMzYgMEMxNi4xMTc3IDAgMCAxNi4xMTc3IDAgMzZDMCA1NS44ODIzIDE2LjExNzcgNzIgMzYgNzJaTTM2IDY4QzUzLjY3MzEgNjggNjggNTMuNjczMSA2OCAzNkM2OCAxOC4zMjY5IDUzLjY3MzEgNCAzNiA0QzE4LjMyNjkgNCA0IDE4LjMyNjkgNCAzNkM0IDUzLjY3MzEgMTguMzI2OSA2OCAzNiA2OFpcIixcImZpbGxcIjpcIiNFQkVDRjdcIixcImtleVwiOjF9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtcImZpbGxSdWxlXCI6XCJldmVub2RkXCIsXCJjbGlwUnVsZVwiOlwiZXZlbm9kZFwiLFwiZFwiOlwiTTU0LjkyNSAxMC4xOTM0QzQ5LjYyNDcgNi4yOTk4NyA0My4wODA5IDQgMzYgNEMxOC4zMjY5IDQgNCAxOC4zMjY5IDQgMzZDNCA1My42NzMxIDE4LjMyNjkgNjggMzYgNjhWNzEuNTAwMkwzNS44ODkgNzEuOTk5OEMxNi4wNTc4IDcxLjk0IDAgNTUuODQ1MiAwIDM2QzAgMTYuMTE3NyAxNi4xMTc3IDAgMzYgMEM0My45NjYgMCA1MS4zMjc3IDIuNTg3MzYgNTcuMjkwNiA2Ljk2NzU0TDU0LjkyNSAxMC4xOTM0WlwiLFwiZmlsbFwiOlwiI0ZGQ0YyNVwiLFwia2V5XCI6Mn0pLFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse1wiZFwiOlwiTTM2LjAwMDcgNDYuOTE0OEMzNC40NjY2IDQ2LjkxNDggMzMuMTAzIDQ2LjY1MiAzMS45MDk4IDQ2LjEyNjRDMzAuNzIzNyA0NS42MDA5IDI5Ljc4NjIgNDQuODY5MyAyOS4wOTczIDQzLjkzMThDMjguNDA4NCA0Mi45OTQzIDI4LjA0MjYgNDEuOTExMiAyOCA0MC42ODI1SDMyLjAwNTdDMzIuMDQxMiA0MS4yNzIgMzIuMjM2NSA0MS43ODY5IDMyLjU5MTYgNDIuMjI3M0MzMi45NDY3IDQyLjY2MDUgMzMuNDE5IDQyLjk5NzkgMzQuMDA4NSA0My4yMzkzQzM0LjU5OCA0My40ODA4IDM1LjI1ODUgNDMuNjAxNiAzNS45OTAxIDQzLjYwMTZDMzYuNzcxMyA0My42MDE2IDM3LjQ2MzggNDMuNDY2NiAzOC4wNjc1IDQzLjE5NjdDMzguNjcxMiA0Mi45MTk3IDM5LjE0MzUgNDIuNTM2MiAzOS40ODQ0IDQyLjA0NjJDMzkuODI1MyA0MS41NTYxIDM5Ljk5MjIgNDAuOTkxNSAzOS45ODUxIDQwLjM1MjNDMzkuOTkyMiAzOS42OTE4IDM5LjgyMTcgMzkuMTA5NCAzOS40NzM3IDM4LjYwNTFDMzkuMTI1NyAzOC4xMDA5IDM4LjYyMTQgMzcuNzA2NyAzNy45NjA5IDM3LjQyMjZDMzcuMzA3NSAzNy4xMzg1IDM2LjUxOTIgMzYuOTk2NCAzNS41OTU5IDM2Ljk5NjRIMzMuNjY3NlYzMy45NDk2SDM1LjU5NTlDMzYuMzU1OCAzMy45NDk2IDM3LjAxOTkgMzMuODE4MiAzNy41ODgxIDMzLjU1NTRDMzguMTYzNCAzMy4yOTI2IDM4LjYxNDMgMzIuOTIzMyAzOC45NDExIDMyLjQ0NzRDMzkuMjY3OCAzMS45NjQ1IDM5LjQyNzYgMzEuNDA3IDM5LjQyMDUgMzAuNzc0OUMzOS40Mjc2IDMwLjE1NyAzOS4yODkxIDI5LjYyMDcgMzkuMDA1IDI5LjE2NjJDMzguNzI4IDI4LjcwNDUgMzguMzMzOCAyOC4zNDU5IDM3LjgyMjQgMjguMDkwMkMzNy4zMTgyIDI3LjgzNDUgMzYuNzI1MSAyNy43MDY3IDM2LjA0MzMgMjcuNzA2N0MzNS4zNzU3IDI3LjcwNjcgMzQuNzU3OCAyNy44Mjc0IDM0LjE4OTYgMjguMDY4OUMzMy42MjE0IDI4LjMxMDQgMzMuMTYzNCAyOC42NTQ4IDMyLjgxNTMgMjkuMTAyM0MzMi40NjczIDI5LjU0MjYgMzIuMjgyNyAzMC4wNjgyIDMyLjI2MTQgMzAuNjc5SDI4LjQ1ODFDMjguNDg2NSAyOS40NTc0IDI4LjgzODEgMjguMzg0OSAyOS41MTI4IDI3LjQ2MTZDMzAuMTk0NiAyNi41MzEzIDMxLjEwMzcgMjUuODA2OCAzMi4yNDAxIDI1LjI4ODRDMzMuMzc2NCAyNC43NjI4IDM0LjY1MTMgMjQuNSAzNi4wNjQ2IDI0LjVDMzcuNTIwNiAyNC41IDM4Ljc4NDggMjQuNzczNCAzOS44NTcyIDI1LjMyMDNDNDAuOTM2OCAyNS44NjAxIDQxLjc3MTMgMjYuNTg4MSA0Mi4zNjA4IDI3LjUwNDNDNDIuOTUwMyAyOC40MjA1IDQzLjI0NSAyOS40MzI1IDQzLjI0NSAzMC41NDA1QzQzLjI1MjEgMzEuNzY5MiA0Mi44ODk5IDMyLjc5OSA0Mi4xNTg0IDMzLjYzQzQxLjQzMzkgMzQuNDYwOSA0MC40ODIyIDM1LjAwNDMgMzkuMzAzMyAzNS4yNTk5VjM1LjQzMDRDNDAuODM3NCAzNS42NDM1IDQyLjAxMjggMzYuMjExNiA0Mi44Mjk1IDM3LjEzNDlDNDMuNjUzNCAzOC4wNTExIDQ0LjA2MTggMzkuMTkxMSA0NC4wNTQ3IDQwLjU1NDdDNDQuMDU0NyA0MS43NzYzIDQzLjcwNjcgNDIuODcgNDMuMDEwNyA0My44MzU5QzQyLjMyMTcgNDQuNzk0NyA0MS4zNyA0NS41NDc2IDQwLjE1NTUgNDYuMDk0NUMzOC45NDgyIDQ2LjY0MTMgMzcuNTYzMiA0Ni45MTQ4IDM2LjAwMDcgNDYuOTE0OFpcIixcImZpbGxcIjpcIndoaXRlXCIsXCJrZXlcIjozfSldKTtcbn1cblxuUHJpdmFjeVNjb3JlMy5kZWZhdWx0UHJvcHMgPSB7XCJ3aWR0aFwiOlwiNzNcIixcImhlaWdodFwiOlwiNzJcIixcInZpZXdCb3hcIjpcIjAgMCA3MyA3MlwiLFwiZmlsbFwiOlwibm9uZVwifTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcml2YWN5U2NvcmUzO1xuXG5Qcml2YWN5U2NvcmUzLmRlZmF1bHQgPSBQcml2YWN5U2NvcmUzO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuZnVuY3Rpb24gUHJpdmFjeVNjb3JlNCAocHJvcHMpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLHByb3BzLFtSZWFjdC5jcmVhdGVFbGVtZW50KFwiY2lyY2xlXCIse1wiY3hcIjpcIjM2Ljc5MTFcIixcImN5XCI6XCIzNlwiLFwiclwiOlwiMjhcIixcImZpbGxcIjpcIiM2NTczRkZcIixcImtleVwiOjB9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtcImZpbGxSdWxlXCI6XCJldmVub2RkXCIsXCJjbGlwUnVsZVwiOlwiZXZlbm9kZFwiLFwiZFwiOlwiTTM2Ljc5MTEgNzJDNTYuNjczNCA3MiA3Mi43OTExIDU1Ljg4MjMgNzIuNzkxMSAzNkM3Mi43OTExIDE2LjExNzcgNTYuNjczNCAwIDM2Ljc5MTEgMEMxNi45MDg5IDAgMC43OTExMzggMTYuMTE3NyAwLjc5MTEzOCAzNkMwLjc5MTEzOCA1NS44ODIzIDE2LjkwODkgNzIgMzYuNzkxMSA3MlpNMzYuNzkxMSA2OEM1NC40NjQyIDY4IDY4Ljc5MTEgNTMuNjczMSA2OC43OTExIDM2QzY4Ljc5MTEgMTguMzI2OSA1NC40NjQyIDQgMzYuNzkxMSA0QzE5LjExOCA0IDQuNzkxMTQgMTguMzI2OSA0Ljc5MTE0IDM2QzQuNzkxMTQgNTMuNjczMSAxOS4xMTggNjggMzYuNzkxMSA2OFpcIixcImZpbGxcIjpcIiNFQkVDRjdcIixcImtleVwiOjF9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtcImZpbGxSdWxlXCI6XCJldmVub2RkXCIsXCJjbGlwUnVsZVwiOlwiZXZlbm9kZFwiLFwiZFwiOlwiTTY3LjExODUgNDYuMjM3MUM2OC4yMDMxIDQzLjAyMjkgNjguNzkxIDM5LjU4MDEgNjguNzkxIDM2QzY4Ljc5MSAxOC4zMjY5IDU0LjQ2NDEgNCAzNi43OTEgNEMxOS4xMTc5IDQgNC43OTEwMiAxOC4zMjY5IDQuNzkxMDIgMzZDNC43OTEwMiA1My42MDM0IDE5LjAwNTEgNjcuODg2OSAzNi41ODIgNjcuOTk5M1Y3MS4wMDA5TDM2LjMzMyA3MS45OTcxQzE2LjY2MTggNzEuNzUxOSAwLjc5MTAxNiA1NS43MjkzIDAuNzkxMDE2IDM2QzAuNzkxMDE2IDE2LjExNzcgMTYuOTA4OCAwIDM2Ljc5MSAwQzU2LjY3MzMgMCA3Mi43OTEgMTYuMTE3NyA3Mi43OTEgMzZDNzIuNzkxIDQwLjAwMzkgNzIuMTM3NCA0My44NTUxIDcwLjkzMSA0Ny40NTI3TDY3LjExODUgNDYuMjM3MVpcIixcImZpbGxcIjpcIiNBNEQ0MTFcIixcImtleVwiOjJ9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtcImRcIjpcIk0yNi43OTEgNDIuMjY5OVYzOS4xMjcxTDM2LjA0ODggMjQuNUgzOC42Njk2VjI4Ljk3NDRIMzcuMDcxNkwzMC44MzkzIDM4Ljg1MDFWMzkuMDIwNkg0My43NjE5VjQyLjI2OTlIMjYuNzkxWk0zNy4xOTk0IDQ2LjMxODJWNDEuMzExMUwzNy4yNDIgMzkuOTA0OFYyNC41SDQwLjk3MDdWNDYuMzE4MkgzNy4xOTk0WlwiLFwiZmlsbFwiOlwid2hpdGVcIixcImtleVwiOjN9KV0pO1xufVxuXG5Qcml2YWN5U2NvcmU0LmRlZmF1bHRQcm9wcyA9IHtcIndpZHRoXCI6XCI3M1wiLFwiaGVpZ2h0XCI6XCI3MlwiLFwidmlld0JveFwiOlwiMCAwIDczIDcyXCIsXCJmaWxsXCI6XCJub25lXCJ9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByaXZhY3lTY29yZTQ7XG5cblByaXZhY3lTY29yZTQuZGVmYXVsdCA9IFByaXZhY3lTY29yZTQ7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBQcml2YWN5U2NvcmU1IChwcm9wcykge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIscHJvcHMsW1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjaXJjbGVcIix7XCJjeFwiOlwiMzZcIixcImN5XCI6XCIzNlwiLFwiclwiOlwiMzZcIixcImZpbGxcIjpcIiMyOUREQ0NcIixcImtleVwiOjB9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwiY2lyY2xlXCIse1wiY3hcIjpcIjM2XCIsXCJjeVwiOlwiMzZcIixcInJcIjpcIjMwXCIsXCJmaWxsXCI6XCIjNjU3M0ZGXCIsXCJzdHJva2VcIjpcIndoaXRlXCIsXCJzdHJva2VXaWR0aFwiOlwiNFwiLFwia2V5XCI6MX0pLFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse1wiZFwiOlwiTTM2LjAzMiA0Ny4yOTgzQzM0LjYxMTUgNDcuMjk4MyAzMy4zNDAyIDQ3LjAzMiAzMi4yMTggNDYuNDk5M0MzMS4wOTU5IDQ1Ljk1OTUgMzAuMjA0NSA0NS4yMjA5IDI5LjU0NCA0NC4yODM0QzI4Ljg5MDYgNDMuMzQ1OSAyOC41NDI2IDQyLjI3MzQgMjguNSA0MS4wNjYxSDMyLjMzNTJDMzIuNDA2MiA0MS45NjA5IDMyLjc5MzMgNDIuNjkyNSAzMy40OTY0IDQzLjI2MDdDMzQuMTk5NiA0My44MjE3IDM1LjA0NDcgNDQuMTAyMyAzNi4wMzIgNDQuMTAyM0MzNi44MDYxIDQ0LjEwMjMgMzcuNDk1IDQzLjkyNDcgMzguMDk4NyA0My41Njk2QzM4LjcwMjQgNDMuMjE0NSAzOS4xNzgzIDQyLjcyMDkgMzkuNTI2MyA0Mi4wODg4QzM5Ljg3NDMgNDEuNDU2NyA0MC4wNDQ3IDQwLjczNTggNDAuMDM3NiAzOS45MjYxQzQwLjA0NDcgMzkuMTAyMyAzOS44NzA3IDM4LjM3MDcgMzkuNTE1NiAzNy43MzE1QzM5LjE2MDUgMzcuMDkyMyAzOC42NzQgMzYuNTkxNiAzOC4wNTYxIDM2LjIyOTRDMzcuNDM4MiAzNS44NjAxIDM2LjcyOCAzNS42NzU0IDM1LjkyNTQgMzUuNjc1NEMzNS4yNzIgMzUuNjY4MyAzNC42MjkzIDM1Ljc4OTEgMzMuOTk3MiAzNi4wMzc2QzMzLjM2NTEgMzYuMjg2MiAzMi44NjQzIDM2LjYxMjkgMzIuNDk1IDM3LjAxNzhMMjguOTI2MSAzNi40MzE4TDMwLjA2NjEgMjUuMTgxOEg0Mi43MjIzVjI4LjQ4NDRIMzMuMzM2NkwzMi43MDgxIDM0LjI2OTJIMzIuODM1OUMzMy4yNDA4IDMzLjc5MzMgMzMuODEyNSAzMy4zOTkyIDM0LjU1MTEgMzMuMDg2N0MzNS4yODk4IDMyLjc2NzEgMzYuMDk5NCAzMi42MDczIDM2Ljk4MDEgMzIuNjA3M0MzOC4zMDExIDMyLjYwNzMgMzkuNDgwMSAzMi45MTk4IDQwLjUxNyAzMy41NDQ4QzQxLjU1NCAzNC4xNjI2IDQyLjM3MDcgMzUuMDE0OSA0Mi45NjczIDM2LjEwMTZDNDMuNTYzOSAzNy4xODgyIDQzLjg2MjIgMzguNDMxMSA0My44NjIyIDM5LjgzMDNDNDMuODYyMiA0MS4yNzIgNDMuNTI4NCA0Mi41NTc1IDQyLjg2MDggNDMuNjg2OEM0Mi4yMDAzIDQ0LjgwOSA0MS4yODA1IDQ1LjY5MzIgNDAuMTAxNiA0Ni4zMzk1QzM4LjkyOTcgNDYuOTc4NyAzNy41NzMyIDQ3LjI5ODMgMzYuMDMyIDQ3LjI5ODNaXCIsXCJmaWxsXCI6XCJ3aGl0ZVwiLFwia2V5XCI6Mn0pXSk7XG59XG5cblByaXZhY3lTY29yZTUuZGVmYXVsdFByb3BzID0ge1wid2lkdGhcIjpcIjcyXCIsXCJoZWlnaHRcIjpcIjcyXCIsXCJ2aWV3Qm94XCI6XCIwIDAgNzIgNzJcIixcImZpbGxcIjpcIm5vbmVcIn07XG5cbm1vZHVsZS5leHBvcnRzID0gUHJpdmFjeVNjb3JlNTtcblxuUHJpdmFjeVNjb3JlNS5kZWZhdWx0ID0gUHJpdmFjeVNjb3JlNTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmZ1bmN0aW9uIFByaXZhY3lTY29yZURpc2FibGVkMSAocHJvcHMpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLHByb3BzLFtSZWFjdC5jcmVhdGVFbGVtZW50KFwiY2lyY2xlXCIse1wiY3hcIjpcIjM2XCIsXCJjeVwiOlwiMzZcIixcInJcIjpcIjI4XCIsXCJmaWxsXCI6XCIjQ0VEMUREXCIsXCJrZXlcIjowfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJkXCI6XCJNMzguMTgzMiAyNC41VjQ2LjMxODJIMzQuMjMwOFYyOC4zNDU5SDM0LjEwM0wyOSAzMS42MDU4VjI3Ljk4MzdMMzQuNDIyNiAyNC41SDM4LjE4MzJaXCIsXCJmaWxsXCI6XCJ3aGl0ZVwiLFwia2V5XCI6MX0pLFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse1wiZmlsbFJ1bGVcIjpcImV2ZW5vZGRcIixcImNsaXBSdWxlXCI6XCJldmVub2RkXCIsXCJkXCI6XCJNMzYgNzJDNTUuODgyMyA3MiA3MiA1NS44ODIzIDcyIDM2QzcyIDE2LjExNzcgNTUuODgyMyAwIDM2IDBDMTYuMTE3NyAwIDAgMTYuMTE3NyAwIDM2QzAgNTUuODgyMyAxNi4xMTc3IDcyIDM2IDcyWk0zNiA2OEM1My42NzMxIDY4IDY4IDUzLjY3MzEgNjggMzZDNjggMTguMzI2OSA1My42NzMxIDQgMzYgNEMxOC4zMjY5IDQgNCAxOC4zMjY5IDQgMzZDNCA1My42NzMxIDE4LjMyNjkgNjggMzYgNjhaXCIsXCJmaWxsXCI6XCIjRkJGQkZEXCIsXCJrZXlcIjoyfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJmaWxsUnVsZVwiOlwiZXZlbm9kZFwiLFwiY2xpcFJ1bGVcIjpcImV2ZW5vZGRcIixcImRcIjpcIk0zNS45Mjg2IDcxLjk5OTlMMzYgNzEuNVY2OEMyMS43NjkgNjggOS43MDc2NSA1OC43MTA0IDUuNTQ5MjYgNDUuODY0M0wxLjc0MjkyIDQ3LjA5NzRDNi40MTQxNSA2MS41Mjc3IDE5Ljk0OTggNzEuOTY4OSAzNS45Mjg2IDcxLjk5OTlaXCIsXCJmaWxsXCI6XCIjQ0VEMUREXCIsXCJrZXlcIjozfSldKTtcbn1cblxuUHJpdmFjeVNjb3JlRGlzYWJsZWQxLmRlZmF1bHRQcm9wcyA9IHtcIndpZHRoXCI6XCI3MlwiLFwiaGVpZ2h0XCI6XCI3MlwiLFwidmlld0JveFwiOlwiMCAwIDcyIDcyXCIsXCJmaWxsXCI6XCJub25lXCJ9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByaXZhY3lTY29yZURpc2FibGVkMTtcblxuUHJpdmFjeVNjb3JlRGlzYWJsZWQxLmRlZmF1bHQgPSBQcml2YWN5U2NvcmVEaXNhYmxlZDE7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBQcml2YWN5U2NvcmVEaXNhYmxlZDIgKHByb3BzKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIixwcm9wcyxbUmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLHtcImN4XCI6XCIzNlwiLFwiY3lcIjpcIjM2XCIsXCJyXCI6XCIyOFwiLFwiZmlsbFwiOlwiI0NFRDFERFwiLFwia2V5XCI6MH0pLFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse1wiZFwiOlwiTTI4LjEyNzggNDYuNjE2NVY0My43NjE0TDM1LjcwMjQgMzYuMzM1OUMzNi40MjY4IDM1LjYwNDQgMzcuMDMwNSAzNC45NTQ1IDM3LjUxMzUgMzQuMzg2NEMzNy45OTY0IDMzLjgxODIgMzguMzU4NyAzMy4yNjc4IDM4LjYwMDEgMzIuNzM1MUMzOC44NDE2IDMyLjIwMjQgMzguOTYyNCAzMS42MzQyIDM4Ljk2MjQgMzEuMDMwNUMzOC45NjI0IDMwLjM0MTYgMzguODA2MSAyOS43NTIxIDM4LjQ5MzYgMjkuMjYyMUMzOC4xODExIDI4Ljc2NDkgMzcuNzUxNCAyOC4zODE0IDM3LjIwNDUgMjguMTExNUMzNi42NTc3IDI3Ljg0MTYgMzYuMDM2MiAyNy43MDY3IDM1LjM0MDIgMjcuNzA2N0MzNC42MjI5IDI3LjcwNjcgMzMuOTk0MyAyNy44NTU4IDMzLjQ1NDUgMjguMTU0MUMzMi45MTQ4IDI4LjQ0NTMgMzIuNDk1NyAyOC44NjA4IDMyLjE5NzQgMjkuNDAwNkMzMS45MDYzIDI5Ljk0MDMgMzEuNzYwNyAzMC41ODMxIDMxLjc2MDcgMzEuMzI4OEgyOEMyOCAyOS45NDM5IDI4LjMxNjEgMjguNzQwMSAyOC45NDgyIDI3LjcxNzNDMjkuNTgwMyAyNi42OTQ2IDMwLjQ1MDMgMjUuOTAyNyAzMS41NTgyIDI1LjM0MTZDMzIuNjczMyAyNC43ODA1IDMzLjk1MTcgMjQuNSAzNS4zOTM1IDI0LjVDMzYuODU2NSAyNC41IDM4LjE0MiAyNC43NzM0IDM5LjI1IDI1LjMyMDNDNDAuMzU4IDI1Ljg2NzIgNDEuMjE3MyAyNi42MTY1IDQxLjgyODEgMjcuNTY4MkM0Mi40NDYgMjguNTE5OSA0Mi43NTUgMjkuNjA2NSA0Mi43NTUgMzAuODI4MUM0Mi43NTUgMzEuNjQ0OSA0Mi41OTg3IDMyLjQ0NzQgNDIuMjg2MiAzMy4yMzU4QzQxLjk3MzcgMzQuMDI0MSA0MS40MjMzIDM0Ljg5NzcgNDAuNjM0OSAzNS44NTY1QzM5Ljg1MzcgMzYuODE1MyAzOC43NTY0IDM3Ljk3NjYgMzcuMzQzIDM5LjM0MDJMMzMuNTgyNCA0My4xNjQ4VjQzLjMxMzlINDMuMDg1MlY0Ni42MTY1SDI4LjEyNzhaXCIsXCJmaWxsXCI6XCJ3aGl0ZVwiLFwia2V5XCI6MX0pLFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse1wiZmlsbFJ1bGVcIjpcImV2ZW5vZGRcIixcImNsaXBSdWxlXCI6XCJldmVub2RkXCIsXCJkXCI6XCJNMzYgNzJDNTUuODgyMyA3MiA3MiA1NS44ODIzIDcyIDM2QzcyIDE2LjExNzcgNTUuODgyMyAwIDM2IDBDMTYuMTE3NyAwIDAgMTYuMTE3NyAwIDM2QzAgNTUuODgyMyAxNi4xMTc3IDcyIDM2IDcyWk0zNiA2OEM1My42NzMxIDY4IDY4IDUzLjY3MzEgNjggMzZDNjggMTguMzI2OSA1My42NzMxIDQgMzYgNEMxOC4zMjY5IDQgNCAxOC4zMjY5IDQgMzZDNCA1My42NzMxIDE4LjMyNjkgNjggMzYgNjhaXCIsXCJmaWxsXCI6XCIjRkJGQkZEXCIsXCJrZXlcIjoyfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJmaWxsUnVsZVwiOlwiZXZlbm9kZFwiLFwiY2xpcFJ1bGVcIjpcImV2ZW5vZGRcIixcImRcIjpcIk0zNS45MjczIDcxLjk5OTlMMzYgNzEuNzYzNlY2OEMxOC4zMjY5IDY4IDQgNTMuNjczMSA0IDM2QzQgMjUuMzM3NCA5LjIxNDk2IDE1Ljg5MjggMTcuMjMzNCAxMC4wNzc3TDE0LjkwMzIgNi44MjYxN0M1Ljg3MzU3IDEzLjM2NzIgMCAyMy45OTc3IDAgMzZDMCA1NS44NTggMTYuMDc4NSA3MS45NjA3IDM1LjkyNzMgNzEuOTk5OVpcIixcImZpbGxcIjpcIiNDRUQxRERcIixcImtleVwiOjN9KV0pO1xufVxuXG5Qcml2YWN5U2NvcmVEaXNhYmxlZDIuZGVmYXVsdFByb3BzID0ge1wid2lkdGhcIjpcIjcyXCIsXCJoZWlnaHRcIjpcIjcyXCIsXCJ2aWV3Qm94XCI6XCIwIDAgNzIgNzJcIixcImZpbGxcIjpcIm5vbmVcIn07XG5cbm1vZHVsZS5leHBvcnRzID0gUHJpdmFjeVNjb3JlRGlzYWJsZWQyO1xuXG5Qcml2YWN5U2NvcmVEaXNhYmxlZDIuZGVmYXVsdCA9IFByaXZhY3lTY29yZURpc2FibGVkMjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmZ1bmN0aW9uIFByaXZhY3lTY29yZURpc2FibGVkMyAocHJvcHMpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLHByb3BzLFtSZWFjdC5jcmVhdGVFbGVtZW50KFwiY2lyY2xlXCIse1wiY3hcIjpcIjM2XCIsXCJjeVwiOlwiMzZcIixcInJcIjpcIjI4XCIsXCJmaWxsXCI6XCIjQ0VEMUREXCIsXCJrZXlcIjowfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJmaWxsUnVsZVwiOlwiZXZlbm9kZFwiLFwiY2xpcFJ1bGVcIjpcImV2ZW5vZGRcIixcImRcIjpcIk0zNiA3MkM1NS44ODIzIDcyIDcyIDU1Ljg4MjMgNzIgMzZDNzIgMTYuMTE3NyA1NS44ODIzIDAgMzYgMEMxNi4xMTc3IDAgMCAxNi4xMTc3IDAgMzZDMCA1NS44ODIzIDE2LjExNzcgNzIgMzYgNzJaTTM2IDY4QzUzLjY3MzEgNjggNjggNTMuNjczMSA2OCAzNkM2OCAxOC4zMjY5IDUzLjY3MzEgNCAzNiA0QzE4LjMyNjkgNCA0IDE4LjMyNjkgNCAzNkM0IDUzLjY3MzEgMTguMzI2OSA2OCAzNiA2OFpcIixcImZpbGxcIjpcIiNGQkZCRkRcIixcImtleVwiOjF9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtcImZpbGxSdWxlXCI6XCJldmVub2RkXCIsXCJjbGlwUnVsZVwiOlwiZXZlbm9kZFwiLFwiZFwiOlwiTTU0LjkyNSAxMC4xOTM0QzQ5LjYyNDcgNi4yOTk4NyA0My4wODA5IDQgMzYgNEMxOC4zMjY5IDQgNCAxOC4zMjY5IDQgMzZDNCA1My42NzMxIDE4LjMyNjkgNjggMzYgNjhWNzEuNTAwMkwzNS44ODkgNzEuOTk5OEMxNi4wNTc4IDcxLjk0IDAgNTUuODQ1MiAwIDM2QzAgMTYuMTE3NyAxNi4xMTc3IDAgMzYgMEM0My45NjYgMCA1MS4zMjc3IDIuNTg3MzYgNTcuMjkwNiA2Ljk2NzU0TDU0LjkyNSAxMC4xOTM0WlwiLFwiZmlsbFwiOlwiI0NFRDFERFwiLFwia2V5XCI6Mn0pLFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIse1wiZFwiOlwiTTM2LjAwMDcgNDYuOTE0OEMzNC40NjY2IDQ2LjkxNDggMzMuMTAzIDQ2LjY1MiAzMS45MDk4IDQ2LjEyNjRDMzAuNzIzNyA0NS42MDA5IDI5Ljc4NjIgNDQuODY5MyAyOS4wOTczIDQzLjkzMThDMjguNDA4NCA0Mi45OTQzIDI4LjA0MjYgNDEuOTExMiAyOCA0MC42ODI1SDMyLjAwNTdDMzIuMDQxMiA0MS4yNzIgMzIuMjM2NSA0MS43ODY5IDMyLjU5MTYgNDIuMjI3M0MzMi45NDY3IDQyLjY2MDUgMzMuNDE5IDQyLjk5NzkgMzQuMDA4NSA0My4yMzkzQzM0LjU5OCA0My40ODA4IDM1LjI1ODUgNDMuNjAxNiAzNS45OTAxIDQzLjYwMTZDMzYuNzcxMyA0My42MDE2IDM3LjQ2MzggNDMuNDY2NiAzOC4wNjc1IDQzLjE5NjdDMzguNjcxMiA0Mi45MTk3IDM5LjE0MzUgNDIuNTM2MiAzOS40ODQ0IDQyLjA0NjJDMzkuODI1MyA0MS41NTYxIDM5Ljk5MjIgNDAuOTkxNSAzOS45ODUxIDQwLjM1MjNDMzkuOTkyMiAzOS42OTE4IDM5LjgyMTcgMzkuMTA5NCAzOS40NzM3IDM4LjYwNTFDMzkuMTI1NyAzOC4xMDA5IDM4LjYyMTQgMzcuNzA2NyAzNy45NjA5IDM3LjQyMjZDMzcuMzA3NSAzNy4xMzg1IDM2LjUxOTIgMzYuOTk2NCAzNS41OTU5IDM2Ljk5NjRIMzMuNjY3NlYzMy45NDk2SDM1LjU5NTlDMzYuMzU1OCAzMy45NDk2IDM3LjAxOTkgMzMuODE4MiAzNy41ODgxIDMzLjU1NTRDMzguMTYzNCAzMy4yOTI2IDM4LjYxNDMgMzIuOTIzMyAzOC45NDExIDMyLjQ0NzRDMzkuMjY3OCAzMS45NjQ1IDM5LjQyNzYgMzEuNDA3IDM5LjQyMDUgMzAuNzc0OUMzOS40Mjc2IDMwLjE1NyAzOS4yODkxIDI5LjYyMDcgMzkuMDA1IDI5LjE2NjJDMzguNzI4IDI4LjcwNDUgMzguMzMzOCAyOC4zNDU5IDM3LjgyMjQgMjguMDkwMkMzNy4zMTgyIDI3LjgzNDUgMzYuNzI1MSAyNy43MDY3IDM2LjA0MzMgMjcuNzA2N0MzNS4zNzU3IDI3LjcwNjcgMzQuNzU3OCAyNy44Mjc0IDM0LjE4OTYgMjguMDY4OUMzMy42MjE0IDI4LjMxMDQgMzMuMTYzNCAyOC42NTQ4IDMyLjgxNTMgMjkuMTAyM0MzMi40NjczIDI5LjU0MjYgMzIuMjgyNyAzMC4wNjgyIDMyLjI2MTQgMzAuNjc5SDI4LjQ1ODFDMjguNDg2NSAyOS40NTc0IDI4LjgzODEgMjguMzg0OSAyOS41MTI4IDI3LjQ2MTZDMzAuMTk0NiAyNi41MzEzIDMxLjEwMzcgMjUuODA2OCAzMi4yNDAxIDI1LjI4ODRDMzMuMzc2NCAyNC43NjI4IDM0LjY1MTMgMjQuNSAzNi4wNjQ2IDI0LjVDMzcuNTIwNiAyNC41IDM4Ljc4NDggMjQuNzczNCAzOS44NTcyIDI1LjMyMDNDNDAuOTM2OCAyNS44NjAxIDQxLjc3MTMgMjYuNTg4MSA0Mi4zNjA4IDI3LjUwNDNDNDIuOTUwMyAyOC40MjA1IDQzLjI0NSAyOS40MzI1IDQzLjI0NSAzMC41NDA1QzQzLjI1MjEgMzEuNzY5MiA0Mi44ODk5IDMyLjc5OSA0Mi4xNTg0IDMzLjYzQzQxLjQzMzkgMzQuNDYwOSA0MC40ODIyIDM1LjAwNDMgMzkuMzAzMyAzNS4yNTk5VjM1LjQzMDRDNDAuODM3NCAzNS42NDM1IDQyLjAxMjggMzYuMjExNiA0Mi44Mjk1IDM3LjEzNDlDNDMuNjUzNCAzOC4wNTExIDQ0LjA2MTggMzkuMTkxMSA0NC4wNTQ3IDQwLjU1NDdDNDQuMDU0NyA0MS43NzYzIDQzLjcwNjcgNDIuODcgNDMuMDEwNyA0My44MzU5QzQyLjMyMTcgNDQuNzk0NyA0MS4zNyA0NS41NDc2IDQwLjE1NTUgNDYuMDk0NUMzOC45NDgyIDQ2LjY0MTMgMzcuNTYzMiA0Ni45MTQ4IDM2LjAwMDcgNDYuOTE0OFpcIixcImZpbGxcIjpcIndoaXRlXCIsXCJrZXlcIjozfSldKTtcbn1cblxuUHJpdmFjeVNjb3JlRGlzYWJsZWQzLmRlZmF1bHRQcm9wcyA9IHtcIndpZHRoXCI6XCI3M1wiLFwiaGVpZ2h0XCI6XCI3MlwiLFwidmlld0JveFwiOlwiMCAwIDczIDcyXCIsXCJmaWxsXCI6XCJub25lXCJ9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByaXZhY3lTY29yZURpc2FibGVkMztcblxuUHJpdmFjeVNjb3JlRGlzYWJsZWQzLmRlZmF1bHQgPSBQcml2YWN5U2NvcmVEaXNhYmxlZDM7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBQcml2YWN5U2NvcmVEaXNhYmxlZDQgKHByb3BzKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIixwcm9wcyxbUmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLHtcImN4XCI6XCIzNi43OTExXCIsXCJjeVwiOlwiMzZcIixcInJcIjpcIjI4XCIsXCJmaWxsXCI6XCIjQ0VEMUREXCIsXCJrZXlcIjowfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJmaWxsUnVsZVwiOlwiZXZlbm9kZFwiLFwiY2xpcFJ1bGVcIjpcImV2ZW5vZGRcIixcImRcIjpcIk0zNi43OTExIDcyQzU2LjY3MzQgNzIgNzIuNzkxMSA1NS44ODIzIDcyLjc5MTEgMzZDNzIuNzkxMSAxNi4xMTc3IDU2LjY3MzQgMCAzNi43OTExIDBDMTYuOTA4OSAwIDAuNzkxMTM4IDE2LjExNzcgMC43OTExMzggMzZDMC43OTExMzggNTUuODgyMyAxNi45MDg5IDcyIDM2Ljc5MTEgNzJaTTM2Ljc5MTEgNjhDNTQuNDY0MiA2OCA2OC43OTExIDUzLjY3MzEgNjguNzkxMSAzNkM2OC43OTExIDE4LjMyNjkgNTQuNDY0MiA0IDM2Ljc5MTEgNEMxOS4xMTggNCA0Ljc5MTE0IDE4LjMyNjkgNC43OTExNCAzNkM0Ljc5MTE0IDUzLjY3MzEgMTkuMTE4IDY4IDM2Ljc5MTEgNjhaXCIsXCJmaWxsXCI6XCIjRkJGQkZEXCIsXCJrZXlcIjoxfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJmaWxsUnVsZVwiOlwiZXZlbm9kZFwiLFwiY2xpcFJ1bGVcIjpcImV2ZW5vZGRcIixcImRcIjpcIk02Ny4xMTg1IDQ2LjIzNzFDNjguMjAzMSA0My4wMjI5IDY4Ljc5MSAzOS41ODAxIDY4Ljc5MSAzNkM2OC43OTEgMTguMzI2OSA1NC40NjQxIDQuMDAwMDIgMzYuNzkxIDQuMDAwMDJDMTkuMTE3OSA0LjAwMDAyIDQuNzkxMDIgMTguMzI2OSA0Ljc5MTAyIDM2QzQuNzkxMDIgNTMuNjAzNCAxOS4wMDUxIDY3Ljg4NjkgMzYuNTgyIDY3Ljk5OTNWNzEuMDAwOUwzNi4zMzMgNzEuOTk3MkMxNi42NjE4IDcxLjc1MTkgMC43OTEwMTYgNTUuNzI5NCAwLjc5MTAxNiAzNkMwLjc5MTAxNiAxNi4xMTc4IDE2LjkwODggMS41MjU4OGUtMDUgMzYuNzkxIDEuNTI1ODhlLTA1QzU2LjY3MzMgMS41MjU4OGUtMDUgNzIuNzkxIDE2LjExNzggNzIuNzkxIDM2QzcyLjc5MSA0MC4wMDM5IDcyLjEzNzQgNDMuODU1MSA3MC45MzEgNDcuNDUyN0w2Ny4xMTg1IDQ2LjIzNzFaXCIsXCJmaWxsXCI6XCIjQ0VEMUREXCIsXCJrZXlcIjoyfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJkXCI6XCJNMjYuNzkxIDQyLjI2OTlWMzkuMTI3MUwzNi4wNDg4IDI0LjVIMzguNjY5NlYyOC45NzQ0SDM3LjA3MTZMMzAuODM5MyAzOC44NTAxVjM5LjAyMDZINDMuNzYxOVY0Mi4yNjk5SDI2Ljc5MVpNMzcuMTk5NCA0Ni4zMTgyVjQxLjMxMTFMMzcuMjQyIDM5LjkwNDhWMjQuNUg0MC45NzA3VjQ2LjMxODJIMzcuMTk5NFpcIixcImZpbGxcIjpcIndoaXRlXCIsXCJrZXlcIjozfSldKTtcbn1cblxuUHJpdmFjeVNjb3JlRGlzYWJsZWQ0LmRlZmF1bHRQcm9wcyA9IHtcIndpZHRoXCI6XCI3M1wiLFwiaGVpZ2h0XCI6XCI3MlwiLFwidmlld0JveFwiOlwiMCAwIDczIDcyXCIsXCJmaWxsXCI6XCJub25lXCJ9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByaXZhY3lTY29yZURpc2FibGVkNDtcblxuUHJpdmFjeVNjb3JlRGlzYWJsZWQ0LmRlZmF1bHQgPSBQcml2YWN5U2NvcmVEaXNhYmxlZDQ7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBQcml2YWN5U2NvcmVEaXNhYmxlZDUgKHByb3BzKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIixwcm9wcyxbUmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLHtcImN4XCI6XCIzNi4wMDAxXCIsXCJjeVwiOlwiMzZcIixcInJcIjpcIjI4XCIsXCJmaWxsXCI6XCIjQ0VEMUREXCIsXCJrZXlcIjowfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJmaWxsUnVsZVwiOlwiZXZlbm9kZFwiLFwiY2xpcFJ1bGVcIjpcImV2ZW5vZGRcIixcImRcIjpcIk0zNi4wMDAxIDcyQzU1Ljg4MjQgNzIgNzIuMDAwMSA1NS44ODIzIDcyLjAwMDEgMzZDNzIuMDAwMSAxNi4xMTc3IDU1Ljg4MjQgMCAzNi4wMDAxIDBDMTYuMTE3OSAwIDAuMDAwMTIyMDcgMTYuMTE3NyAwLjAwMDEyMjA3IDM2QzAuMDAwMTIyMDcgNTUuODgyMyAxNi4xMTc5IDcyIDM2LjAwMDEgNzJaTTM2LjAwMDEgNjhDNTMuNjczMiA2OCA2OC4wMDAxIDUzLjY3MzEgNjguMDAwMSAzNkM2OC4wMDAxIDE4LjMyNjkgNTMuNjczMiA0IDM2LjAwMDEgNEMxOC4zMjcgNCA0LjAwMDEyIDE4LjMyNjkgNC4wMDAxMiAzNkM0LjAwMDEyIDUzLjY3MzEgMTguMzI3IDY4IDM2LjAwMDEgNjhaXCIsXCJmaWxsXCI6XCIjQ0VEMUREXCIsXCJrZXlcIjoxfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJkXCI6XCJNMzUuNTMyIDQ2LjExNjVDMzQuMTExNSA0Ni4xMTY1IDMyLjg0MDIgNDUuODUwMSAzMS43MTggNDUuMzE3NUMzMC41OTU5IDQ0Ljc3NzcgMjkuNzA0NSA0NC4wMzkxIDI5LjA0NCA0My4xMDE2QzI4LjM5MDYgNDIuMTY0MSAyOC4wNDI2IDQxLjA5MTYgMjggMzkuODg0MkgzMS44MzUyQzMxLjkwNjIgNDAuNzc5MSAzMi4yOTMzIDQxLjUxMDcgMzIuOTk2NCA0Mi4wNzg4QzMzLjY5OTYgNDIuNjM5OSAzNC41NDQ3IDQyLjkyMDUgMzUuNTMyIDQyLjkyMDVDMzYuMzA2MSA0Mi45MjA1IDM2Ljk5NSA0Mi43NDI5IDM3LjU5ODcgNDIuMzg3OEMzOC4yMDI0IDQyLjAzMjcgMzguNjc4MyA0MS41MzkxIDM5LjAyNjMgNDAuOTA3QzM5LjM3NDMgNDAuMjc0OSAzOS41NDQ3IDM5LjU1NCAzOS41Mzc2IDM4Ljc0NDNDMzkuNTQ0NyAzNy45MjA1IDM5LjM3MDcgMzcuMTg4OSAzOS4wMTU2IDM2LjU0OTdDMzguNjYwNSAzNS45MTA1IDM4LjE3NCAzNS40MDk4IDM3LjU1NjEgMzUuMDQ3NkMzNi45MzgyIDM0LjY3ODMgMzYuMjI4IDM0LjQ5MzYgMzUuNDI1NCAzNC40OTM2QzM0Ljc3MiAzNC40ODY1IDM0LjEyOTMgMzQuNjA3MiAzMy40OTcyIDM0Ljg1NThDMzIuODY1MSAzNS4xMDQ0IDMyLjM2NDMgMzUuNDMxMSAzMS45OTUgMzUuODM1OUwyOC40MjYxIDM1LjI1TDI5LjU2NjEgMjRINDIuMjIyM1YyNy4zMDI2SDMyLjgzNjZMMzIuMjA4MSAzMy4wODc0SDMyLjMzNTlDMzIuNzQwOCAzMi42MTE1IDMzLjMxMjUgMzIuMjE3MyAzNC4wNTExIDMxLjkwNDhDMzQuNzg5OCAzMS41ODUyIDM1LjU5OTQgMzEuNDI1NCAzNi40ODAxIDMxLjQyNTRDMzcuODAxMSAzMS40MjU0IDM4Ljk4MDEgMzEuNzM3OSA0MC4wMTcgMzIuMzYyOUM0MS4wNTQgMzIuOTgwOCA0MS44NzA3IDMzLjgzMzEgNDIuNDY3MyAzNC45MTk3QzQzLjA2MzkgMzYuMDA2NCA0My4zNjIyIDM3LjI0OTMgNDMuMzYyMiAzOC42NDg0QzQzLjM2MjIgNDAuMDkwMiA0My4wMjg0IDQxLjM3NTcgNDIuMzYwOCA0Mi41MDVDNDEuNzAwMyA0My42MjcxIDQwLjc4MDUgNDQuNTExNCAzOS42MDE2IDQ1LjE1NzdDMzguNDI5NyA0NS43OTY5IDM3LjA3MzIgNDYuMTE2NSAzNS41MzIgNDYuMTE2NVpcIixcImZpbGxcIjpcIndoaXRlXCIsXCJrZXlcIjoyfSldKTtcbn1cblxuUHJpdmFjeVNjb3JlRGlzYWJsZWQ1LmRlZmF1bHRQcm9wcyA9IHtcIndpZHRoXCI6XCI3MlwiLFwiaGVpZ2h0XCI6XCI3MlwiLFwidmlld0JveFwiOlwiMCAwIDcyIDcyXCIsXCJmaWxsXCI6XCJub25lXCJ9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByaXZhY3lTY29yZURpc2FibGVkNTtcblxuUHJpdmFjeVNjb3JlRGlzYWJsZWQ1LmRlZmF1bHQgPSBQcml2YWN5U2NvcmVEaXNhYmxlZDU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBQcml2YWN5U2NvcmVOYSAocHJvcHMpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLHByb3BzLFtSZWFjdC5jcmVhdGVFbGVtZW50KFwiY2lyY2xlXCIse1wiY3hcIjpcIjM2XCIsXCJjeVwiOlwiMzZcIixcInJcIjpcIjI4XCIsXCJmaWxsXCI6XCIjNjU3M0ZGXCIsXCJrZXlcIjowfSksUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIix7XCJmaWxsUnVsZVwiOlwiZXZlbm9kZFwiLFwiY2xpcFJ1bGVcIjpcImV2ZW5vZGRcIixcImRcIjpcIk0zNiA3MkM1NS44ODIzIDcyIDcyIDU1Ljg4MjMgNzIgMzZDNzIgMTYuMTE3NyA1NS44ODIzIDAgMzYgMEMxNi4xMTc3IDAgMCAxNi4xMTc3IDAgMzZDMCA1NS44ODIzIDE2LjExNzcgNzIgMzYgNzJaTTM2IDY4QzUzLjY3MzEgNjggNjggNTMuNjczMSA2OCAzNkM2OCAxOC4zMjY5IDUzLjY3MzEgNCAzNiA0QzE4LjMyNjkgNCA0IDE4LjMyNjkgNCAzNkM0IDUzLjY3MzEgMTguMzI2OSA2OCAzNiA2OFpcIixcImZpbGxcIjpcIiNFQkVDRjdcIixcImtleVwiOjF9KSxSZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLHtcImRcIjpcIk0zMy4yNzI3IDQwLjQ1ODhWNDAuMDk2NkMzMy4yNzk4IDM4Ljg1MzcgMzMuMzg5OSAzNy44NjI5IDMzLjYwMyAzNy4xMjQzQzMzLjgyMzIgMzYuMzg1NyAzNC4xNDI4IDM1Ljc4OTEgMzQuNTYxOCAzNS4zMzQ1QzM0Ljk4MDggMzQuODggMzUuNDg1MSAzNC40NjggMzYuMDc0NiAzNC4wOTg3QzM2LjUxNDkgMzMuODE0NiAzNi45MDkxIDMzLjUxOTkgMzcuMjU3MSAzMy4yMTQ1QzM3LjYwNTEgMzIuOTA5MSAzNy44ODIxIDMyLjU3MTcgMzguMDg4MSAzMi4yMDI0QzM4LjI5NCAzMS44MjYgMzguMzk3IDMxLjQwNyAzOC4zOTcgMzAuOTQ1M0MzOC4zOTcgMzAuNDU1MyAzOC4yNzk4IDMwLjAyNTYgMzguMDQ1NSAyOS42NTYyQzM3LjgxMTEgMjkuMjg2OSAzNy40OTUgMjkuMDAyOCAzNy4wOTczIDI4LjgwNEMzNi43MDY3IDI4LjYwNTEgMzYuMjczNCAyOC41MDU3IDM1Ljc5NzYgMjguNTA1N0MzNS4zMzU5IDI4LjUwNTcgMzQuODk5MSAyOC42MDg3IDM0LjQ4NzIgMjguODE0NkMzNC4wNzUzIDI5LjAxMzUgMzMuNzM3OSAyOS4zMTE4IDMzLjQ3NTEgMjkuNzA5NUMzMy4yMTI0IDMwLjEwMDEgMzMuMDcwMyAzMC41ODY2IDMzLjA0OSAzMS4xNjlIMjguNzAyNEMyOC43Mzc5IDI5Ljc0ODYgMjkuMDc4OCAyOC41NzY3IDI5LjcyNTEgMjcuNjUzNEMzMC4zNzE0IDI2LjcyMyAzMS4yMjczIDI2LjAzMDUgMzIuMjkyNiAyNS41NzZDMzMuMzU4IDI1LjExNDMgMzQuNTMzNCAyNC44ODM1IDM1LjgxODkgMjQuODgzNUMzNy4yMzIyIDI0Ljg4MzUgMzguNDgyMiAyNS4xMTc5IDM5LjU2ODkgMjUuNTg2NkM0MC42NTU1IDI2LjA0ODMgNDEuNTA3OCAyNi43MTk1IDQyLjEyNTcgMjcuNjAwMUM0Mi43NDM2IDI4LjQ4MDggNDMuMDUyNiAyOS41NDI2IDQzLjA1MjYgMzAuNzg1NUM0My4wNTI2IDMxLjYxNjUgNDIuOTE0MSAzMi4zNTUxIDQyLjYzNzEgMzMuMDAxNEM0Mi4zNjcyIDMzLjY0MDYgNDEuOTg3MiAzNC4yMDg4IDQxLjQ5NzIgMzQuNzA2QzQxLjAwNzEgMzUuMTk2IDQwLjQyODMgMzUuNjM5OSAzOS43NjA3IDM2LjAzNzZDMzkuMTk5NiAzNi4zNzE0IDM4LjczNzkgMzYuNzE5NSAzOC4zNzU3IDM3LjA4MTdDMzguMDIwNiAzNy40NDM5IDM3Ljc1NDMgMzcuODYyOSAzNy41NzY3IDM4LjMzODhDMzcuNDA2MyAzOC44MTQ2IDM3LjMxNzUgMzkuNDAwNiAzNy4zMTA0IDQwLjA5NjZWNDAuNDU4OEgzMy4yNzI3Wk0zNS4zODIxIDQ3LjI3N0MzNC42NzE5IDQ3LjI3NyAzNC4wNjQ2IDQ3LjAyODQgMzMuNTYwNCA0Ni41MzEyQzMzLjA2MzIgNDYuMDI3IDMyLjgxODIgNDUuNDIzMyAzMi44MjUzIDQ0LjcyMDJDMzIuODE4MiA0NC4wMjQxIDMzLjA2MzIgNDMuNDI3NiAzMy41NjA0IDQyLjkzMDRDMzQuMDY0NiA0Mi40MzMyIDM0LjY3MTkgNDIuMTg0NyAzNS4zODIxIDQyLjE4NDdDMzYuMDU2OCA0Mi4xODQ3IDM2LjY0OTkgNDIuNDMzMiAzNy4xNjEyIDQyLjkzMDRDMzcuNjcyNiA0My40Mjc2IDM3LjkzMTggNDQuMDI0MSAzNy45Mzg5IDQ0LjcyMDJDMzcuOTMxOCA0NS4xODg5IDM3LjgwNzUgNDUuNjE4NiAzNy41NjYxIDQ2LjAwOTJDMzcuMzMxNyA0Ni4zOTI4IDM3LjAyMjcgNDYuNzAxNyAzNi42MzkyIDQ2LjkzNjFDMzYuMjU1NyA0Ny4xNjM0IDM1LjgzNjYgNDcuMjc3IDM1LjM4MjEgNDcuMjc3WlwiLFwiZmlsbFwiOlwiIzJFMzlCM1wiLFwia2V5XCI6Mn0pXSk7XG59XG5cblByaXZhY3lTY29yZU5hLmRlZmF1bHRQcm9wcyA9IHtcIndpZHRoXCI6XCI3MlwiLFwiaGVpZ2h0XCI6XCI3MlwiLFwidmlld0JveFwiOlwiMCAwIDcyIDcyXCIsXCJmaWxsXCI6XCJub25lXCJ9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByaXZhY3lTY29yZU5hO1xuXG5Qcml2YWN5U2NvcmVOYS5kZWZhdWx0ID0gUHJpdmFjeVNjb3JlTmE7XG4iLCIvKlxuICogQ29weXJpZ2h0IChDKSAyMDIyIFN1cmZib2FyZCBIb2xkaW5nIEIuVi4gPGh0dHBzOi8vd3d3LnN0YXJ0cGFnZS5jb20+XG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7RkN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcblxuaW1wb3J0IHtnZXREaXNwbGF5Q291bnR9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2Rpc3BsYXknO1xuaW1wb3J0IHtnZXRNZXNzYWdlfSBmcm9tICcuLi8uLi8uLi91dGlscy9sb2NhbGl6YXRpb24nO1xuXG50eXBlIHRyYWNrZXJEaXNwbGF5UHJvcHMgPSB7XG4gICAgYmxvY2tlZDogYm9vbGVhbjtcbiAgICBjb3VudDogbnVtYmVyO1xuICAgIHN1YnRpdGxlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgVHJhY2tlckRpc3BsYXk6IEZDPHRyYWNrZXJEaXNwbGF5UHJvcHM+ID0gKHtibG9ja2VkLCBjb3VudCwgc3VidGl0bGV9KSA9PiB7XG4gICAgY29uc3QgdHJhY2tlckRpc3BsYXlDc3MgPSBjc3NgXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYmVjZjc7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgaGVpZ2h0OiA4N3B4O1xuICAgICAgICBwYWRkaW5nOiAyNHB4IDE2cHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDEwNnB4O1xuICAgICAgICBtYXJnaW4tdG9wOiAxMXB4O1xuICAgIGA7XG5cbiAgICBjb25zdCByZXNvbHZlVGl0bGVCZ0NvbG9yID0gKCkgPT4ge1xuICAgICAgICBpZiAoYmxvY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuICcjMjlERENDJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJyNlYjU3NTcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnIzdmODY5Zic7XG4gICAgfTtcblxuICAgIGNvbnN0IHRpdGxlQ3NzID0gY3NzYFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kOiAke3Jlc29sdmVUaXRsZUJnQ29sb3IoKX07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE3cHg7XG4gICAgICAgIGNvbG9yOiAke2Jsb2NrZWQgPyAnIzIwMjk0NScgOiAnI2ZmZmZmZid9O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGhlaWdodDogMjJweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgICAgIHBhZGRpbmc6IDAgMTJweDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IC0xMXB4O1xuICAgICAgICB0cmFuc2l0aW9uOiAwLjRzO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIGA7XG5cbiAgICBjb25zdCBjb3VudENzcyA9IGNzc2BcbiAgICAgICAgZm9udC1zaXplOiA2MHB4O1xuICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGA7XG5cbiAgICBjb25zdCBzdWJ0aXRsZUNzcyA9IGNzc2BcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17dHJhY2tlckRpc3BsYXlDc3N9PlxuICAgICAgICAgICAgPGRpdiBjc3M9e3RpdGxlQ3NzfT5cbiAgICAgICAgICAgICAgICB7YmxvY2tlZCA/IGdldE1lc3NhZ2UoJ3BvcHVwSG9tZUJsb2NrZWRMYWJlbCcpIDogZ2V0TWVzc2FnZSgncG9wdXBIb21lTm90QmxvY2tlZExhYmVsJyl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtjb3VudENzc30+e2dldERpc3BsYXlDb3VudCh7Y291bnR9KX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtzdWJ0aXRsZUNzc30+e3N1YnRpdGxlfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMjIgU3VyZmJvYXJkIEhvbGRpbmcgQi5WLiA8aHR0cHM6Ly93d3cuc3RhcnRwYWdlLmNvbT5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtGQ30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjc3N9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHt1c2VTZWxlY3Rvcn0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQge2dldE1lc3NhZ2V9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2xvY2FsaXphdGlvbic7XG5pbXBvcnQgc2NyZWVuTWFuYWdlbWVudFNsaWNlLCB7U2NyZWVuc30gZnJvbSAnLi4vLi4vLi4vcmVkdWNlcnMvU2NyZWVucyc7XG5pbXBvcnQge3RhYkRhdGFTZWxlY3Rvcn0gZnJvbSAnLi4vLi4vLi4vc2VsZWN0b3JzL2luZGV4JztcbmltcG9ydCB7VHJhY2tlckRpc3BsYXl9IGZyb20gJy4vVHJhY2tlckRpc3BsYXknO1xuaW1wb3J0IHt1c2VBcHBEaXNwYXRjaH0gZnJvbSAnLi4vLi4vLi4vc3RvcmUnO1xuXG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgSGlkZGVuSWNvbiBmcm9tICcuLi8uLi8uLi9pY29ucy9oaWRkZW4taWNvbi5zdmcnO1xuXG5jb25zdCBib3R0b21QYW5lbENzcyA9IGNzc2BcbiAgICBoZWlnaHQ6IDIzMnB4O1xuICAgIHBhZGRpbmc6IDEycHg7XG5gO1xuXG5jb25zdCBpbm5lckNvbnRhaW5lckNzcyA9IGNzc2BcbiAgICBiYWNrZ3JvdW5kOiAjZmJmYmZkO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYmVjZjc7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGhlaWdodDogMjAwcHg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmc6IDE2cHg7XG5gO1xuXG5jb25zdCBtYW5hZ2VCdG5Dc3MgPSBjc3NgXG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNjU3M2ZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBjb2xvcjogIzY1NzNmZjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgaGVpZ2h0OiAzOHB4O1xuICAgIG1hcmdpbi10b3A6IGF1dG87XG4gICAgdHJhbnNpdGlvbjogMC40cztcbiAgICB3aWR0aDogMTAwJTtcblxuICAgICY6Zm9jdXMge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgIH1cblxuICAgICY6ZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogbGlnaHRncmF5O1xuICAgICAgICBjdXJzb3I6IGluaXRpYWw7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgICB9XG5gO1xuXG5jb25zdCBzcGVjaWFsUGFnZUljb24gPSBjc3NgXG4gICAgbWFyZ2luLWJvdHRvbTogMTRweDtcbmA7XG5cbmNvbnN0IHNwZWNpYWxQYWdlRGVzY3JpcHRpb25Dc3MgPSBjc3NgXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHBhZGRpbmc6IDAgMzVweDtcbiAgICBsaW5lLWhlaWdodDogMThweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5gO1xuXG5leHBvcnQgY29uc3QgQm90dG9tUGFuZWw6IEZDID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkRhdGEgPSB1c2VTZWxlY3Rvcih0YWJEYXRhU2VsZWN0b3IpO1xuICAgIGNvbnN0IHt0cmFja2Vyc0Jsb2NrZWQsIGNvb2tpZXNCbG9ja2VkLCBpc1NwZWNpYWxQYWdlLCBpc1ByaXZhY3lFbmFibGVkfSA9IHRhYkRhdGE7XG5cbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZUFwcERpc3BhdGNoKCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17Ym90dG9tUGFuZWxDc3N9PlxuICAgICAgICAgICAgPGRpdiBjc3M9e2lubmVyQ29udGFpbmVyQ3NzfT5cbiAgICAgICAgICAgICAgICB7IWlzU3BlY2lhbFBhZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRyYWNrZXJEaXNwbGF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZD17aXNQcml2YWN5RW5hYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudD17dHJhY2tlcnNCbG9ja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtnZXRNZXNzYWdlKCdwb3B1cEhvbWVUcmFja2Vyc0xhYmVsJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRyYWNrZXJEaXNwbGF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZD17aXNQcml2YWN5RW5hYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudD17Y29va2llc0Jsb2NrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e2dldE1lc3NhZ2UoJ3BvcHVwSG9tZUNvb2tpZXNMYWJlbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e21hbmFnZUJ0bkNzc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNjcmVlbk1hbmFnZW1lbnRTbGljZS5hY3Rpb25zLnNldEFjdGl2ZVNjcmVlbihTY3JlZW5zLk1hbmFnZVRyYWNrZXJzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzUHJpdmFjeUVuYWJsZWQgfHwgKHRyYWNrZXJzQmxvY2tlZCA9PT0gMCAmJiBjb29raWVzQmxvY2tlZCA9PT0gMCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3BvcHVwSG9tZU1hbmFnZVRyYWNrZXJzQnRuJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7aXNTcGVjaWFsUGFnZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtzcGVjaWFsUGFnZURlc2NyaXB0aW9uQ3NzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIaWRkZW5JY29uIGNzcz17c3BlY2lhbFBhZ2VJY29ufSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3BvcHVwSG9tZU5BQ2FsbG91dCcpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuIiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBSZWFjdCwge0ZDfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQge3VzZVNlbGVjdG9yfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCBQcm90ZWN0aW9uT24gZnJvbSAnLi4vLi4vLi4vaWNvbnMvcHJvdGVjdGlvbi1vbi5zdmcnO1xuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IFByb3RlY3Rpb25PZmYgZnJvbSAnLi4vLi4vLi4vaWNvbnMvcHJvdGVjdGlvbi1vZmYuc3ZnJztcbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCBQcm90ZWN0aW9uT2ZmR3JheSBmcm9tICcuLi8uLi8uLi9pY29ucy9wcm90ZWN0aW9uLW9mZi1ncmF5LnN2Zyc7XG5cbmltcG9ydCB7Z2V0TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvbG9jYWxpemF0aW9uJztcbmltcG9ydCB7dGFiRGF0YVNlbGVjdG9yfSBmcm9tICcuLi8uLi8uLi9zZWxlY3RvcnMvaW5kZXgnO1xuaW1wb3J0IFRvZ2dsZSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vY29tcG9uZW50cy9Ub2dnbGUnO1xuXG5jb25zdCBwcm90ZWN0aW9uVG9nZ2xlQmFyQ3NzID0gY3NzYFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlYmVjZjc7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmVjZjc7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBoZWlnaHQ6IDQ2cHg7XG4gICAgcGFkZGluZzogMCAxMnB4O1xuYDtcblxuY29uc3QgcHJvdGVjdGlvbkljb25Dc3MgPSBjc3NgXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG5gO1xuXG5jb25zdCBwcm90ZWN0aW9uRGVzY3JpcHRpb25Dc3MgPSBjc3NgXG4gICAgZm9udC1zaXplOiAxNHB4O1xuXG4gICAgPiBzcGFuIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUHJvdGVjdGlvblRvZ2dsZUJhcjogRkMgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFiRGF0YSA9IHVzZVNlbGVjdG9yKHRhYkRhdGFTZWxlY3Rvcik7XG4gICAgY29uc3Qge2lzUHJpdmFjeUVuYWJsZWQsIGlzU3BlY2lhbFBhZ2V9ID0gdGFiRGF0YTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY3NzPXtwcm90ZWN0aW9uVG9nZ2xlQmFyQ3NzfT5cbiAgICAgICAgICAgIHtpc1ByaXZhY3lFbmFibGVkICYmIDxQcm90ZWN0aW9uT24gY3NzPXtwcm90ZWN0aW9uSWNvbkNzc30gLz59XG4gICAgICAgICAgICB7IWlzUHJpdmFjeUVuYWJsZWQgJiYgIWlzU3BlY2lhbFBhZ2UgJiYgPFByb3RlY3Rpb25PZmYgY3NzPXtwcm90ZWN0aW9uSWNvbkNzc30gLz59XG4gICAgICAgICAgICB7IWlzUHJpdmFjeUVuYWJsZWQgJiYgaXNTcGVjaWFsUGFnZSAmJiA8UHJvdGVjdGlvbk9mZkdyYXkgY3NzPXtwcm90ZWN0aW9uSWNvbkNzc30gLz59XG4gICAgICAgICAgICA8ZGl2IGNzcz17cHJvdGVjdGlvbkRlc2NyaXB0aW9uQ3NzfT5cbiAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgncG9wdXBIb21lVG9nZ2xlTGFiZWwnKX17JyAnfVxuICAgICAgICAgICAgICAgIDxzcGFuPntpc1ByaXZhY3lFbmFibGVkID8gZ2V0TWVzc2FnZSgncG9wdXBIb21lVG9nZ2xlT24nKSA6IGdldE1lc3NhZ2UoJ3BvcHVwSG9tZVRvZ2dsZU9mZicpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxUb2dnbGVcbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJwcml2YWN5LXRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodD17MjR9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXs0MH1cbiAgICAgICAgICAgICAgICAgICAgaGV4Q29sb3I9XCIjNjU3M2ZmXCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17aXNQcml2YWN5RW5hYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU3BlY2lhbFBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2dnbGVQcml2YWN5ID0gaXNQcml2YWN5RW5hYmxlZCA/ICdkZWFjdGl2YXRlUHJpdmFjeScgOiAnYWN0aXZhdGVQcml2YWN5JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe21lc3NhZ2U6IHRvZ2dsZVByaXZhY3l9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3Nlci50YWJzLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuIiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBSZWFjdCwge0ZDfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQge3VzZVNlbGVjdG9yfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7Z2V0TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvbG9jYWxpemF0aW9uJztcblxuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IFByaXZhY3lTY29yZTEgZnJvbSAnLi4vLi4vLi4vaWNvbnMvcHJpdmFjeS1zY29yZS0xLnN2Zyc7XG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgUHJpdmFjeVNjb3JlMiBmcm9tICcuLi8uLi8uLi9pY29ucy9wcml2YWN5LXNjb3JlLTIuc3ZnJztcbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCBQcml2YWN5U2NvcmUzIGZyb20gJy4uLy4uLy4uL2ljb25zL3ByaXZhY3ktc2NvcmUtMy5zdmcnO1xuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IFByaXZhY3lTY29yZTQgZnJvbSAnLi4vLi4vLi4vaWNvbnMvcHJpdmFjeS1zY29yZS00LnN2Zyc7XG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgUHJpdmFjeVNjb3JlNSBmcm9tICcuLi8uLi8uLi9pY29ucy9wcml2YWN5LXNjb3JlLTUuc3ZnJztcbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCBQcml2YWN5U2NvcmVEaXNhYmxlZDEgZnJvbSAnLi4vLi4vLi4vaWNvbnMvcHJpdmFjeS1zY29yZS1kaXNhYmxlZC0xLnN2Zyc7XG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgUHJpdmFjeVNjb3JlRGlzYWJsZWQyIGZyb20gJy4uLy4uLy4uL2ljb25zL3ByaXZhY3ktc2NvcmUtZGlzYWJsZWQtMi5zdmcnO1xuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IFByaXZhY3lTY29yZURpc2FibGVkMyBmcm9tICcuLi8uLi8uLi9pY29ucy9wcml2YWN5LXNjb3JlLWRpc2FibGVkLTMuc3ZnJztcbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCBQcml2YWN5U2NvcmVEaXNhYmxlZDQgZnJvbSAnLi4vLi4vLi4vaWNvbnMvcHJpdmFjeS1zY29yZS1kaXNhYmxlZC00LnN2Zyc7XG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgUHJpdmFjeVNjb3JlRGlzYWJsZWQ1IGZyb20gJy4uLy4uLy4uL2ljb25zL3ByaXZhY3ktc2NvcmUtZGlzYWJsZWQtNS5zdmcnO1xuLy8gQHRzLWV4cGVjdC1lcnJvclxuaW1wb3J0IFByaXZhY3lTY29yZU5BIGZyb20gJy4uLy4uLy4uL2ljb25zL3ByaXZhY3ktc2NvcmUtbmEuc3ZnJztcblxuaW1wb3J0IHt0YWJEYXRhU2VsZWN0b3J9IGZyb20gJy4uLy4uLy4uL3NlbGVjdG9ycy9pbmRleCc7XG5cbmNvbnN0IHRvcFBhbmVsQ3NzID0gY3NzYFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICAgIHBhZGRpbmc6IDEycHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuYDtcblxuY29uc3Qgc3VtbWFyeUNzcyA9IGNzc2BcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmc6IDRweCAwO1xuYDtcblxuY29uc3Qgc2NvcmVDc3MgPSBjc3NgXG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcblxuICAgID4gc3BhbiB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAycHg7XG4gICAgfVxuYDtcblxuY29uc3QgZG9tYWluQ3NzID0gY3NzYFxuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBtYXgtd2lkdGg6IDI0MHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IHNjb3JlRGVzY3JpcHRpb25Dc3MgPSBjc3NgXG4gICAgY29sb3I6ICM3Zjg2OWY7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuYDtcblxuY29uc3Qgc3BlY2lhbFBhZ2VEZXNjcmlwdGlvbkNzcyA9IGNzc2BcbiAgICBjb2xvcjogI2NlZDFkZDtcbiAgICBmb250LXNpemU6IDIycHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBsaW5lLWhlaWdodDogMjRweDtcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG5gO1xuXG5leHBvcnQgY29uc3QgVG9wUGFuZWw6IEZDID0gKCkgPT4ge1xuICAgIGNvbnN0IHRhYkRhdGEgPSB1c2VTZWxlY3Rvcih0YWJEYXRhU2VsZWN0b3IpO1xuICAgIGNvbnN0IHtpc1ByaXZhY3lFbmFibGVkLCBpc1NwZWNpYWxQYWdlLCBzY29yZSwgdGxkfSA9IHRhYkRhdGE7XG5cbiAgICBjb25zdCBzY29yZUljb25Dc3MgPSBjc3NgXG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gICAgICAgIG9wYWNpdHk6ICR7aXNQcml2YWN5RW5hYmxlZCA/IDEgOiAwfTtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjRzO1xuICAgIGA7XG5cbiAgICBjb25zdCBzY29yZUljb25EaXNhYmxlZENzcyA9IGNzc2BcbiAgICAgICAgb3BhY2l0eTogJHtpc1ByaXZhY3lFbmFibGVkID8gMCA6IDF9O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC40cztcbiAgICBgO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3RvcFBhbmVsQ3NzfT5cbiAgICAgICAgICAgIHtpc1NwZWNpYWxQYWdlICYmIChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8UHJpdmFjeVNjb3JlTkEgY3NzPXtzY29yZUljb25Dc3N9IC8+IDxQcml2YWN5U2NvcmVOQSBjc3M9e3Njb3JlSWNvbkRpc2FibGVkQ3NzfSAvPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtzY29yZSA9PT0gMSAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFByaXZhY3lTY29yZTEgY3NzPXtzY29yZUljb25Dc3N9IC8+IDxQcml2YWN5U2NvcmVEaXNhYmxlZDEgY3NzPXtzY29yZUljb25EaXNhYmxlZENzc30gLz5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7c2NvcmUgPT09IDIgJiYgKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxQcml2YWN5U2NvcmUyIGNzcz17c2NvcmVJY29uQ3NzfSAvPiA8UHJpdmFjeVNjb3JlRGlzYWJsZWQyIGNzcz17c2NvcmVJY29uRGlzYWJsZWRDc3N9IC8+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3Njb3JlID09PSAzICYmIChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8UHJpdmFjeVNjb3JlMyBjc3M9e3Njb3JlSWNvbkNzc30gLz4gPFByaXZhY3lTY29yZURpc2FibGVkMyBjc3M9e3Njb3JlSWNvbkRpc2FibGVkQ3NzfSAvPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtzY29yZSA9PT0gNCAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFByaXZhY3lTY29yZTQgY3NzPXtzY29yZUljb25Dc3N9IC8+IDxQcml2YWN5U2NvcmVEaXNhYmxlZDQgY3NzPXtzY29yZUljb25EaXNhYmxlZENzc30gLz5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7c2NvcmUgPT09IDUgJiYgKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxQcml2YWN5U2NvcmU1IGNzcz17c2NvcmVJY29uQ3NzfSAvPiA8UHJpdmFjeVNjb3JlRGlzYWJsZWQ1IGNzcz17c2NvcmVJY29uRGlzYWJsZWRDc3N9IC8+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjc3M9e3N1bW1hcnlDc3N9PlxuICAgICAgICAgICAgICAgIHshaXNTcGVjaWFsUGFnZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNzcz17c2NvcmVDc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdwb3B1cEhvbWVTY29yZUxhYmVsJyl9OiA8c3Bhbj57c2NvcmV9LzU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtkb21haW5Dc3N9Pnt0bGR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNzcz17c2NvcmVEZXNjcmlwdGlvbkNzc30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Njb3JlID09PSA1ICYmIGdldE1lc3NhZ2UoJ3BvcHVwSG9tZVNjb3JlRml2ZURlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Njb3JlID09PSA0ICYmIGdldE1lc3NhZ2UoJ3BvcHVwSG9tZVNjb3JlRm91ckRlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Njb3JlID09PSAzICYmIGdldE1lc3NhZ2UoJ3BvcHVwSG9tZVNjb3JlVGhyZWVEZXNjcmlwdGlvbicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzY29yZSA9PT0gMiAmJiBnZXRNZXNzYWdlKCdwb3B1cEhvbWVTY29yZVR3b0Rlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Njb3JlID09PSAxICYmIGdldE1lc3NhZ2UoJ3BvcHVwSG9tZVNjb3JlT25lRGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtpc1NwZWNpYWxQYWdlICYmIDxkaXYgY3NzPXtzcGVjaWFsUGFnZURlc2NyaXB0aW9uQ3NzfT57Z2V0TWVzc2FnZSgncG9wdXBIb21lU2NvcmVOQScpfTwvZGl2Pn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMjIgU3VyZmJvYXJkIEhvbGRpbmcgQi5WLiA8aHR0cHM6Ly93d3cuc3RhcnRwYWdlLmNvbT5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtGQ30gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQge0JvdHRvbVBhbmVsfSBmcm9tICcuL0JvdHRvbVBhbmVsJztcbmltcG9ydCB7UHJvdGVjdGlvblRvZ2dsZUJhcn0gZnJvbSAnLi9Qcm90ZWN0aW9uVG9nZ2xlQmFyJztcbmltcG9ydCB7VG9wUGFuZWx9IGZyb20gJy4vVG9wUGFuZWwnO1xuXG5jb25zdCBIb21lOiBGQyA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPFRvcFBhbmVsIC8+XG4gICAgICAgICAgICA8UHJvdGVjdGlvblRvZ2dsZUJhciAvPlxuICAgICAgICAgICAgPEJvdHRvbVBhbmVsIC8+XG4gICAgICAgIDwvPlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==