(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ 588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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



var TabPanel = props => {
  var {
    children,
    value,
    index
  } = props;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("div", {
    role: "tabpanel",
    hidden: value !== index,
    id: "wrapped-tabpanel-".concat(index),
    "aria-labelledby": "wrapped-tab-".concat(index)
  }, children);
};
/* harmony default export */ __webpack_exports__["default"] = (TabPanel);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvY29tcG9uZW50cy9PcHRpb25zL1RhYlBhbmVsLnRzeCJdLCJuYW1lcyI6WyJUYWJQYW5lbCIsInByb3BzIiwiY2hpbGRyZW4iLCJ2YWx1ZSIsImluZGV4IiwiX19fRW1vdGlvbkpTWCIsInJvbGUiLCJoaWRkZW4iLCJpZCIsImNvbmNhdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFMEI7QUFBQTtBQVExQixJQUFNQSxRQUFRLEdBQUlDLEtBQW9CLElBQUs7RUFDdkMsSUFBTTtJQUFDQyxRQUFRO0lBQUVDLEtBQUs7SUFBRUM7RUFBSyxDQUFDLEdBQUdILEtBQUs7RUFFdEMsT0FDSUksaUVBQUE7SUFDSUMsSUFBSSxFQUFDLFVBQVU7SUFDZkMsTUFBTSxFQUFFSixLQUFLLEtBQUtDLEtBQU07SUFDeEJJLEVBQUUsc0JBQUFDLE1BQUEsQ0FBc0JMLEtBQUssQ0FBRztJQUNoQyxrQ0FBQUssTUFBQSxDQUFnQ0wsS0FBSztFQUFHLEdBRXZDRixRQUFRLENBQ1A7QUFFZCxDQUFDO0FBRWNGLHVFQUFRLEUiLCJmaWxlIjoiMTYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDIyIFN1cmZib2FyZCBIb2xkaW5nIEIuVi4gPGh0dHBzOi8vd3d3LnN0YXJ0cGFnZS5jb20+XG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIFRhYlBhbmVsUHJvcHMge1xuICAgIGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlO1xuICAgIGluZGV4OiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbn1cblxuY29uc3QgVGFiUGFuZWwgPSAocHJvcHM6IFRhYlBhbmVsUHJvcHMpID0+IHtcbiAgICBjb25zdCB7Y2hpbGRyZW4sIHZhbHVlLCBpbmRleH0gPSBwcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiXG4gICAgICAgICAgICBoaWRkZW49e3ZhbHVlICE9PSBpbmRleH1cbiAgICAgICAgICAgIGlkPXtgd3JhcHBlZC10YWJwYW5lbC0ke2luZGV4fWB9XG4gICAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9e2B3cmFwcGVkLXRhYi0ke2luZGV4fWB9XG4gICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhYlBhbmVsO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==