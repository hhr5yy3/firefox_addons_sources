var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, n = new Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "191dfc8d-036f-4cdd-9066-63aeb4fec21d", e._sentryDebugIdIdentifier = "sentry-dbid-191dfc8d-036f-4cdd-9066-63aeb4fec21d");
  } catch (e2) {
  }
}();
(function() {
  "use strict";
  var __vite_style__ = document.createElement("style");
  __vite_style__.textContent = `@charset "UTF-8";
.navbar-nav {
  --bs-navbar-hover-color: rgb(73, 73, 242);
  --bs-navbar-active-color: rgb(73, 73, 242);
}
@font-face {
  font-family: "Graphik";
  src: url("/assets/graphik-regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Graphik";
  src: url("/assets/graphik-medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "FK Grotesk";
  src: url("/assets/fk-grotesk-bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
.navbar-nav {
  --bs-navbar-hover-color: rgb(73, 73, 242);
  --bs-navbar-active-color: rgb(73, 73, 242);
}
.clickable {
  cursor: pointer;
}
.min-w-0 {
  min-width: 0;
}
:root,
[data-bs-theme=light] {
  --bs-blue: rgb(73, 73, 242);
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: rgb(219, 44, 73);
  --bs-orange: #fd7e14;
  --bs-yellow: rgb(255, 193, 7);
  --bs-green: rgb(40, 156, 92);
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-black: #000;
  --bs-white: #fff;
  --bs-gray: rgb(130, 130, 153);
  --bs-gray-dark: rgb(50, 50, 66);
  --bs-gray-100: rgb(240, 240, 245);
  --bs-gray-200: rgb(240, 240, 245);
  --bs-gray-300: rgb(184, 184, 204);
  --bs-gray-400: rgb(130, 130, 153);
  --bs-gray-500: rgb(130, 130, 153);
  --bs-gray-600: rgb(130, 130, 153);
  --bs-gray-700: rgb(50, 50, 66);
  --bs-gray-800: rgb(50, 50, 66);
  --bs-gray-900: rgb(27, 28, 38);
  --bs-primary: rgb(73, 73, 242);
  --bs-secondary: rgb(240, 240, 245);
  --bs-success: rgb(40, 156, 92);
  --bs-info: #0dcaf0;
  --bs-warning: rgb(255, 193, 7);
  --bs-danger: rgb(219, 44, 73);
  --bs-light: rgb(240, 240, 245);
  --bs-dark: rgb(27, 28, 38);
  --bs-primary-rgb: 73, 73, 242;
  --bs-secondary-rgb: 240, 240, 245;
  --bs-success-rgb: 40, 156, 92;
  --bs-info-rgb: 13, 202, 240;
  --bs-warning-rgb: 255, 193, 7;
  --bs-danger-rgb: 219, 44, 73;
  --bs-light-rgb: 240, 240, 245;
  --bs-dark-rgb: 27, 28, 38;
  --bs-primary-text-emphasis: #1d1d61;
  --bs-secondary-text-emphasis: #606062;
  --bs-success-text-emphasis: #103e25;
  --bs-info-text-emphasis: #055160;
  --bs-warning-text-emphasis: #664d03;
  --bs-danger-text-emphasis: #58121d;
  --bs-light-text-emphasis: rgb(50, 50, 66);
  --bs-dark-text-emphasis: rgb(50, 50, 66);
  --bs-primary-bg-subtle: #dbdbfc;
  --bs-secondary-bg-subtle: #fcfcfd;
  --bs-success-bg-subtle: #d4ebde;
  --bs-info-bg-subtle: #cff4fc;
  --bs-warning-bg-subtle: #fff3cd;
  --bs-danger-bg-subtle: #f8d5db;
  --bs-light-bg-subtle: #f8f8fa;
  --bs-dark-bg-subtle: rgb(130, 130, 153);
  --bs-primary-border-subtle: #b6b6fa;
  --bs-secondary-border-subtle: #f9f9fb;
  --bs-success-border-subtle: #a9d7be;
  --bs-info-border-subtle: #9eeaf9;
  --bs-warning-border-subtle: #ffe69c;
  --bs-danger-border-subtle: #f1abb6;
  --bs-light-border-subtle: rgb(240, 240, 245);
  --bs-dark-border-subtle: rgb(130, 130, 153);
  --bs-white-rgb: 255, 255, 255;
  --bs-black-rgb: 0, 0, 0;
  --bs-font-sans-serif: "Graphik";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
  --bs-body-font-family: var(--bs-font-sans-serif);
  --bs-body-font-size: 0.875rem;
  --bs-body-font-weight: 400;
  --bs-body-line-height: 1.3;
  --bs-body-color: rgb(50, 50, 66);
  --bs-body-color-rgb: 50, 50, 66;
  --bs-body-bg: #fff;
  --bs-body-bg-rgb: 255, 255, 255;
  --bs-emphasis-color: #000;
  --bs-emphasis-color-rgb: 0, 0, 0;
  --bs-secondary-color: rgba(50, 50, 66, 0.75);
  --bs-secondary-color-rgb: 50, 50, 66;
  --bs-secondary-bg: rgb(240, 240, 245);
  --bs-secondary-bg-rgb: 240, 240, 245;
  --bs-tertiary-color: rgba(50, 50, 66, 0.5);
  --bs-tertiary-color-rgb: 50, 50, 66;
  --bs-tertiary-bg: rgb(240, 240, 245);
  --bs-tertiary-bg-rgb: 240, 240, 245;
  --bs-heading-color: rgb(27, 28, 38);
  --bs-link-color: rgb(73, 73, 242);
  --bs-link-color-rgb: 73, 73, 242;
  --bs-link-decoration: none;
  --bs-link-hover-color: #3a3ac2;
  --bs-link-hover-color-rgb: 58, 58, 194;
  --bs-code-color: #d63384;
  --bs-highlight-bg: #fff3cd;
  --bs-border-width: 1px;
  --bs-border-style: solid;
  --bs-border-color: rgb(240, 240, 245);
  --bs-border-color-translucent: rgba(0, 0, 0, 0.175);
  --bs-border-radius: 8px;
  --bs-border-radius-sm: 4px;
  --bs-border-radius-lg: 12px;
  --bs-border-radius-xl: 1rem;
  --bs-border-radius-xxl: 2rem;
  --bs-border-radius-2xl: var(--bs-border-radius-xxl);
  --bs-border-radius-pill: 40px;
  --bs-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --bs-box-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --bs-box-shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.08);
  --bs-box-shadow-inset: inset 0 1px 2px rgba(0, 0, 0, 0.075);
  --bs-focus-ring-width: 0.25rem;
  --bs-focus-ring-opacity: 0.25;
  --bs-focus-ring-color: rgba(73, 73, 242, 0.25);
  --bs-form-valid-color: rgb(40, 156, 92);
  --bs-form-valid-border-color: rgb(40, 156, 92);
  --bs-form-invalid-color: rgb(219, 44, 73);
  --bs-form-invalid-border-color: rgb(219, 44, 73);
}
[data-bs-theme=dark] {
  color-scheme: dark;
  --bs-body-color: rgb(255, 255, 255);
  --bs-body-color-rgb: 255, 255, 255;
  --bs-body-bg: rgb(27, 28, 38);
  --bs-body-bg-rgb: 27, 28, 38;
  --bs-emphasis-color: #fff;
  --bs-emphasis-color-rgb: 255, 255, 255;
  --bs-secondary-color: rgba(255, 255, 255, 0.75);
  --bs-secondary-color-rgb: 255, 255, 255;
  --bs-secondary-bg: rgb(50, 50, 66);
  --bs-secondary-bg-rgb: 50, 50, 66;
  --bs-tertiary-color: rgba(255, 255, 255, 0.5);
  --bs-tertiary-color-rgb: 255, 255, 255;
  --bs-tertiary-bg: #272734;
  --bs-tertiary-bg-rgb: 39, 39, 52;
  --bs-primary-text-emphasis: #9292f7;
  --bs-secondary-text-emphasis: #f6f6f9;
  --bs-success-text-emphasis: #7ec49d;
  --bs-info-text-emphasis: #6edff6;
  --bs-warning-text-emphasis: #ffda6a;
  --bs-danger-text-emphasis: #e98092;
  --bs-light-text-emphasis: rgb(240, 240, 245);
  --bs-dark-text-emphasis: rgb(184, 184, 204);
  --bs-primary-bg-subtle: #0f0f30;
  --bs-secondary-bg-subtle: #303031;
  --bs-success-bg-subtle: #0c2f1c;
  --bs-info-bg-subtle: #032830;
  --bs-warning-bg-subtle: #4d3a02;
  --bs-danger-bg-subtle: #360b12;
  --bs-light-bg-subtle: rgb(50, 50, 66);
  --bs-dark-bg-subtle: #191921;
  --bs-primary-border-subtle: #2c2c91;
  --bs-secondary-border-subtle: #909093;
  --bs-success-border-subtle: rgba(40, 156, 92, 0.5);
  --bs-info-border-subtle: #087990;
  --bs-warning-border-subtle: rgba(77, 58, 2, 0.5);
  --bs-danger-border-subtle: rgba(219, 44, 73, 0.5);
  --bs-light-border-subtle: rgb(50, 50, 66);
  --bs-dark-border-subtle: rgb(50, 50, 66);
  --bs-heading-color: rgb(255, 255, 255);
  --bs-link-color: rgb(240, 240, 245);
  --bs-link-hover-color: rgb(240, 240, 245);
  --bs-link-color-rgb: 240, 240, 245;
  --bs-link-hover-color-rgb: 240, 240, 245;
  --bs-code-color: #e685b5;
  --bs-border-color: rgb(50, 50, 66);
  --bs-border-color-translucent: rgba(255, 255, 255, 0.15);
  --bs-form-valid-color: #7ec49d;
  --bs-form-valid-border-color: #7ec49d;
  --bs-form-invalid-color: #e98092;
  --bs-form-invalid-border-color: #e98092;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
@media (prefers-reduced-motion: no-preference) {
  :root {
    scroll-behavior: smooth;
  }
}
body {
  margin: 0;
  font-family: var(--bs-body-font-family);
  font-size: var(--bs-body-font-size);
  font-weight: var(--bs-body-font-weight);
  line-height: var(--bs-body-line-height);
  color: var(--bs-body-color);
  text-align: var(--bs-body-text-align);
  background-color: var(--bs-body-bg);
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
hr {
  margin: 16px 0;
  color: inherit;
  border: 0;
  border-top: var(--bs-border-width) solid;
  opacity: 0.25;
}
h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {
  margin-top: 0;
  margin-bottom: 8px;
  font-family: "FK Grotesk";
  font-weight: 700;
  line-height: 1.2;
  color: var(--bs-heading-color);
}
h1, .h1 {
  font-size: 1rem;
}
h2, .h2 {
  font-size: 1rem;
}
h3, .h3 {
  font-size: 0.875rem;
}
h4, .h4 {
  font-size: calc(1.25625rem + 0.075vw);
}
@media (min-width: 1200px) {
  h4, .h4 {
    font-size: 1.3125rem;
  }
}
h5, .h5 {
  font-size: 1.09375rem;
}
h6, .h6 {
  font-size: 0.875rem;
}
p {
  margin-top: 0;
  margin-bottom: 1rem;
}
abbr[title] {
  text-decoration: underline dotted;
  cursor: help;
  text-decoration-skip-ink: none;
}
address {
  margin-bottom: 1rem;
  font-style: normal;
  line-height: inherit;
}
ol,
ul {
  padding-left: 2rem;
}
ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}
ol ol,
ul ul,
ol ul,
ul ol {
  margin-bottom: 0;
}
dt {
  font-weight: 700;
}
dd {
  margin-bottom: 0.5rem;
  margin-left: 0;
}
blockquote {
  margin: 0 0 1rem;
}
b,
strong {
  font-weight: bolder;
}
small, .small {
  font-size: 0.875em;
}
mark, .mark {
  padding: 0.1875em;
  background-color: var(--bs-highlight-bg);
}
sub,
sup {
  position: relative;
  font-size: 0.75em;
  line-height: 0;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
a {
  color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
  text-decoration: none;
}
a:hover {
  --bs-link-color-rgb: var(--bs-link-hover-color-rgb);
}
a:not([href]):not([class]), a:not([href]):not([class]):hover {
  color: inherit;
  text-decoration: none;
}
pre,
code,
kbd,
samp {
  font-family: var(--bs-font-monospace);
  font-size: 1em;
}
pre {
  display: block;
  margin-top: 0;
  margin-bottom: 1rem;
  overflow: auto;
  font-size: 0.875em;
}
pre code {
  font-size: inherit;
  color: inherit;
  word-break: normal;
}
code {
  font-size: 0.875em;
  color: var(--bs-code-color);
  word-wrap: break-word;
}
a > code {
  color: inherit;
}
kbd {
  padding: 0.1875rem 0.375rem;
  font-size: 0.875em;
  color: var(--bs-body-bg);
  background-color: var(--bs-body-color);
  border-radius: 4px;
}
kbd kbd {
  padding: 0;
  font-size: 1em;
}
figure {
  margin: 0 0 1rem;
}
img,
svg {
  vertical-align: middle;
}
table {
  caption-side: bottom;
  border-collapse: collapse;
}
caption {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: var(--bs-secondary-color);
  text-align: left;
}
th {
  text-align: inherit;
  text-align: -webkit-match-parent;
}
thead,
tbody,
tfoot,
tr,
td,
th {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}
label {
  display: inline-block;
}
button {
  border-radius: 0;
}
button:focus:not(:focus-visible) {
  outline: 0;
}
input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
button,
select {
  text-transform: none;
}
[role=button] {
  cursor: pointer;
}
select {
  word-wrap: normal;
}
select:disabled {
  opacity: 1;
}
[list]:not([type=date]):not([type=datetime-local]):not([type=month]):not([type=week]):not([type=time])::-webkit-calendar-picker-indicator {
  display: none !important;
}
button,
[type=button],
[type=reset],
[type=submit] {
  -webkit-appearance: button;
}
button:not(:disabled),
[type=button]:not(:disabled),
[type=reset]:not(:disabled),
[type=submit]:not(:disabled) {
  cursor: pointer;
}
::-moz-focus-inner {
  padding: 0;
  border-style: none;
}
textarea {
  resize: vertical;
}
fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}
legend {
  float: left;
  width: 100%;
  padding: 0;
  margin-bottom: 0.5rem;
  font-size: calc(1.275rem + 0.3vw);
  line-height: inherit;
}
@media (min-width: 1200px) {
  legend {
    font-size: 1.5rem;
  }
}
legend + * {
  clear: left;
}
::-webkit-datetime-edit-fields-wrapper,
::-webkit-datetime-edit-text,
::-webkit-datetime-edit-minute,
::-webkit-datetime-edit-hour-field,
::-webkit-datetime-edit-day-field,
::-webkit-datetime-edit-month-field,
::-webkit-datetime-edit-year-field {
  padding: 0;
}
::-webkit-inner-spin-button {
  height: auto;
}
[type=search] {
  outline-offset: -2px;
  -webkit-appearance: textfield;
}
/* rtl:raw:
[type="tel"],
[type="url"],
[type="email"],
[type="number"] {
  direction: ltr;
}
*/
::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-color-swatch-wrapper {
  padding: 0;
}
::file-selector-button {
  font: inherit;
  -webkit-appearance: button;
}
output {
  display: inline-block;
}
iframe {
  border: 0;
}
summary {
  display: list-item;
  cursor: pointer;
}
progress {
  vertical-align: baseline;
}
[hidden] {
  display: none !important;
}
.lead {
  font-size: 1.09375rem;
  font-weight: 300;
}
.display-1 {
  font-size: calc(1.625rem + 4.5vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-1 {
    font-size: 5rem;
  }
}
.display-2 {
  font-size: calc(1.575rem + 3.9vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-2 {
    font-size: 4.5rem;
  }
}
.display-3 {
  font-size: calc(1.525rem + 3.3vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-3 {
    font-size: 4rem;
  }
}
.display-4 {
  font-size: calc(1.475rem + 2.7vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-4 {
    font-size: 3.5rem;
  }
}
.display-5 {
  font-size: calc(1.425rem + 2.1vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-5 {
    font-size: 3rem;
  }
}
.display-6 {
  font-size: calc(1.375rem + 1.5vw);
  font-weight: 300;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-6 {
    font-size: 2.5rem;
  }
}
.list-unstyled {
  padding-left: 0;
  list-style: none;
}
.list-inline {
  padding-left: 0;
  list-style: none;
}
.list-inline-item {
  display: inline-block;
}
.list-inline-item:not(:last-child) {
  margin-right: 0.5rem;
}
.initialism {
  font-size: 0.875em;
  text-transform: uppercase;
}
.blockquote {
  margin-bottom: 16px;
  font-size: 1.09375rem;
}
.blockquote > :last-child {
  margin-bottom: 0;
}
.blockquote-footer {
  margin-top: -16px;
  margin-bottom: 16px;
  font-size: 0.875em;
  color: rgb(130, 130, 153);
}
.blockquote-footer::before {
  content: "— ";
}
.container,
.container-fluid,
.container-xxl,
.container-xl,
.container-lg,
.container-md,
.container-sm {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 576px) {
  .container-sm, .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container-md, .container-sm, .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container-lg, .container-md, .container-sm, .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container-xl, .container-lg, .container-md, .container-sm, .container {
    max-width: 1140px;
  }
}
@media (min-width: 1400px) {
  .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
    max-width: 1320px;
  }
}
:root {
  --bs-breakpoint-xs: 0;
  --bs-breakpoint-sm: 576px;
  --bs-breakpoint-md: 768px;
  --bs-breakpoint-lg: 992px;
  --bs-breakpoint-xl: 1200px;
  --bs-breakpoint-xxl: 1400px;
}
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
}
.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-top: var(--bs-gutter-y);
}
.col {
  flex: 1 0 0%;
}
.row-cols-auto > * {
  flex: 0 0 auto;
  width: auto;
}
.row-cols-1 > * {
  flex: 0 0 auto;
  width: 100%;
}
.row-cols-2 > * {
  flex: 0 0 auto;
  width: 50%;
}
.row-cols-3 > * {
  flex: 0 0 auto;
  width: 33.3333333333%;
}
.row-cols-4 > * {
  flex: 0 0 auto;
  width: 25%;
}
.row-cols-5 > * {
  flex: 0 0 auto;
  width: 20%;
}
.row-cols-6 > * {
  flex: 0 0 auto;
  width: 16.6666666667%;
}
.col-auto {
  flex: 0 0 auto;
  width: auto;
}
.col-1 {
  flex: 0 0 auto;
  width: 8.33333333%;
}
.col-2 {
  flex: 0 0 auto;
  width: 16.66666667%;
}
.col-3 {
  flex: 0 0 auto;
  width: 25%;
}
.col-4 {
  flex: 0 0 auto;
  width: 33.33333333%;
}
.col-5 {
  flex: 0 0 auto;
  width: 41.66666667%;
}
.col-6 {
  flex: 0 0 auto;
  width: 50%;
}
.col-7 {
  flex: 0 0 auto;
  width: 58.33333333%;
}
.col-8 {
  flex: 0 0 auto;
  width: 66.66666667%;
}
.col-9 {
  flex: 0 0 auto;
  width: 75%;
}
.col-10 {
  flex: 0 0 auto;
  width: 83.33333333%;
}
.col-11 {
  flex: 0 0 auto;
  width: 91.66666667%;
}
.col-12 {
  flex: 0 0 auto;
  width: 100%;
}
.offset-1 {
  margin-left: 8.33333333%;
}
.offset-2 {
  margin-left: 16.66666667%;
}
.offset-3 {
  margin-left: 25%;
}
.offset-4 {
  margin-left: 33.33333333%;
}
.offset-5 {
  margin-left: 41.66666667%;
}
.offset-6 {
  margin-left: 50%;
}
.offset-7 {
  margin-left: 58.33333333%;
}
.offset-8 {
  margin-left: 66.66666667%;
}
.offset-9 {
  margin-left: 75%;
}
.offset-10 {
  margin-left: 83.33333333%;
}
.offset-11 {
  margin-left: 91.66666667%;
}
.g-0,
.gx-0 {
  --bs-gutter-x: 0;
}
.g-0,
.gy-0 {
  --bs-gutter-y: 0;
}
.g-1,
.gx-1 {
  --bs-gutter-x: 4px;
}
.g-1,
.gy-1 {
  --bs-gutter-y: 4px;
}
.g-2,
.gx-2 {
  --bs-gutter-x: 8px;
}
.g-2,
.gy-2 {
  --bs-gutter-y: 8px;
}
.g-3,
.gx-3 {
  --bs-gutter-x: 16px;
}
.g-3,
.gy-3 {
  --bs-gutter-y: 16px;
}
.g-4,
.gx-4 {
  --bs-gutter-x: 24px;
}
.g-4,
.gy-4 {
  --bs-gutter-y: 24px;
}
.g-5,
.gx-5 {
  --bs-gutter-x: 48px;
}
.g-5,
.gy-5 {
  --bs-gutter-y: 48px;
}
@media (min-width: 576px) {
  .col-sm {
    flex: 1 0 0%;
  }
  .row-cols-sm-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-sm-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-sm-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-sm-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-sm-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-sm-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-sm-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-sm-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-sm-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-sm-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-sm-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-sm-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-sm-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-sm-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-sm-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-sm-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-sm-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-sm-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-sm-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-sm-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .offset-sm-0 {
    margin-left: 0;
  }
  .offset-sm-1 {
    margin-left: 8.33333333%;
  }
  .offset-sm-2 {
    margin-left: 16.66666667%;
  }
  .offset-sm-3 {
    margin-left: 25%;
  }
  .offset-sm-4 {
    margin-left: 33.33333333%;
  }
  .offset-sm-5 {
    margin-left: 41.66666667%;
  }
  .offset-sm-6 {
    margin-left: 50%;
  }
  .offset-sm-7 {
    margin-left: 58.33333333%;
  }
  .offset-sm-8 {
    margin-left: 66.66666667%;
  }
  .offset-sm-9 {
    margin-left: 75%;
  }
  .offset-sm-10 {
    margin-left: 83.33333333%;
  }
  .offset-sm-11 {
    margin-left: 91.66666667%;
  }
  .g-sm-0,
  .gx-sm-0 {
    --bs-gutter-x: 0;
  }
  .g-sm-0,
  .gy-sm-0 {
    --bs-gutter-y: 0;
  }
  .g-sm-1,
  .gx-sm-1 {
    --bs-gutter-x: 4px;
  }
  .g-sm-1,
  .gy-sm-1 {
    --bs-gutter-y: 4px;
  }
  .g-sm-2,
  .gx-sm-2 {
    --bs-gutter-x: 8px;
  }
  .g-sm-2,
  .gy-sm-2 {
    --bs-gutter-y: 8px;
  }
  .g-sm-3,
  .gx-sm-3 {
    --bs-gutter-x: 16px;
  }
  .g-sm-3,
  .gy-sm-3 {
    --bs-gutter-y: 16px;
  }
  .g-sm-4,
  .gx-sm-4 {
    --bs-gutter-x: 24px;
  }
  .g-sm-4,
  .gy-sm-4 {
    --bs-gutter-y: 24px;
  }
  .g-sm-5,
  .gx-sm-5 {
    --bs-gutter-x: 48px;
  }
  .g-sm-5,
  .gy-sm-5 {
    --bs-gutter-y: 48px;
  }
}
@media (min-width: 768px) {
  .col-md {
    flex: 1 0 0%;
  }
  .row-cols-md-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-md-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-md-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-md-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-md-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-md-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-md-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-md-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-md-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-md-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-md-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-md-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-md-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-md-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-md-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-md-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-md-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-md-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-md-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-md-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .offset-md-0 {
    margin-left: 0;
  }
  .offset-md-1 {
    margin-left: 8.33333333%;
  }
  .offset-md-2 {
    margin-left: 16.66666667%;
  }
  .offset-md-3 {
    margin-left: 25%;
  }
  .offset-md-4 {
    margin-left: 33.33333333%;
  }
  .offset-md-5 {
    margin-left: 41.66666667%;
  }
  .offset-md-6 {
    margin-left: 50%;
  }
  .offset-md-7 {
    margin-left: 58.33333333%;
  }
  .offset-md-8 {
    margin-left: 66.66666667%;
  }
  .offset-md-9 {
    margin-left: 75%;
  }
  .offset-md-10 {
    margin-left: 83.33333333%;
  }
  .offset-md-11 {
    margin-left: 91.66666667%;
  }
  .g-md-0,
  .gx-md-0 {
    --bs-gutter-x: 0;
  }
  .g-md-0,
  .gy-md-0 {
    --bs-gutter-y: 0;
  }
  .g-md-1,
  .gx-md-1 {
    --bs-gutter-x: 4px;
  }
  .g-md-1,
  .gy-md-1 {
    --bs-gutter-y: 4px;
  }
  .g-md-2,
  .gx-md-2 {
    --bs-gutter-x: 8px;
  }
  .g-md-2,
  .gy-md-2 {
    --bs-gutter-y: 8px;
  }
  .g-md-3,
  .gx-md-3 {
    --bs-gutter-x: 16px;
  }
  .g-md-3,
  .gy-md-3 {
    --bs-gutter-y: 16px;
  }
  .g-md-4,
  .gx-md-4 {
    --bs-gutter-x: 24px;
  }
  .g-md-4,
  .gy-md-4 {
    --bs-gutter-y: 24px;
  }
  .g-md-5,
  .gx-md-5 {
    --bs-gutter-x: 48px;
  }
  .g-md-5,
  .gy-md-5 {
    --bs-gutter-y: 48px;
  }
}
@media (min-width: 992px) {
  .col-lg {
    flex: 1 0 0%;
  }
  .row-cols-lg-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-lg-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-lg-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-lg-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-lg-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-lg-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-lg-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-lg-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-lg-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-lg-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-lg-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-lg-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-lg-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-lg-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-lg-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-lg-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-lg-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-lg-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-lg-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-lg-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .offset-lg-0 {
    margin-left: 0;
  }
  .offset-lg-1 {
    margin-left: 8.33333333%;
  }
  .offset-lg-2 {
    margin-left: 16.66666667%;
  }
  .offset-lg-3 {
    margin-left: 25%;
  }
  .offset-lg-4 {
    margin-left: 33.33333333%;
  }
  .offset-lg-5 {
    margin-left: 41.66666667%;
  }
  .offset-lg-6 {
    margin-left: 50%;
  }
  .offset-lg-7 {
    margin-left: 58.33333333%;
  }
  .offset-lg-8 {
    margin-left: 66.66666667%;
  }
  .offset-lg-9 {
    margin-left: 75%;
  }
  .offset-lg-10 {
    margin-left: 83.33333333%;
  }
  .offset-lg-11 {
    margin-left: 91.66666667%;
  }
  .g-lg-0,
  .gx-lg-0 {
    --bs-gutter-x: 0;
  }
  .g-lg-0,
  .gy-lg-0 {
    --bs-gutter-y: 0;
  }
  .g-lg-1,
  .gx-lg-1 {
    --bs-gutter-x: 4px;
  }
  .g-lg-1,
  .gy-lg-1 {
    --bs-gutter-y: 4px;
  }
  .g-lg-2,
  .gx-lg-2 {
    --bs-gutter-x: 8px;
  }
  .g-lg-2,
  .gy-lg-2 {
    --bs-gutter-y: 8px;
  }
  .g-lg-3,
  .gx-lg-3 {
    --bs-gutter-x: 16px;
  }
  .g-lg-3,
  .gy-lg-3 {
    --bs-gutter-y: 16px;
  }
  .g-lg-4,
  .gx-lg-4 {
    --bs-gutter-x: 24px;
  }
  .g-lg-4,
  .gy-lg-4 {
    --bs-gutter-y: 24px;
  }
  .g-lg-5,
  .gx-lg-5 {
    --bs-gutter-x: 48px;
  }
  .g-lg-5,
  .gy-lg-5 {
    --bs-gutter-y: 48px;
  }
}
@media (min-width: 1200px) {
  .col-xl {
    flex: 1 0 0%;
  }
  .row-cols-xl-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-xl-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-xl-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-xl-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-xl-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-xl-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-xl-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-xl-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-xl-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-xl-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-xl-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-xl-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-xl-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-xl-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-xl-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-xl-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-xl-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-xl-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-xl-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-xl-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .offset-xl-0 {
    margin-left: 0;
  }
  .offset-xl-1 {
    margin-left: 8.33333333%;
  }
  .offset-xl-2 {
    margin-left: 16.66666667%;
  }
  .offset-xl-3 {
    margin-left: 25%;
  }
  .offset-xl-4 {
    margin-left: 33.33333333%;
  }
  .offset-xl-5 {
    margin-left: 41.66666667%;
  }
  .offset-xl-6 {
    margin-left: 50%;
  }
  .offset-xl-7 {
    margin-left: 58.33333333%;
  }
  .offset-xl-8 {
    margin-left: 66.66666667%;
  }
  .offset-xl-9 {
    margin-left: 75%;
  }
  .offset-xl-10 {
    margin-left: 83.33333333%;
  }
  .offset-xl-11 {
    margin-left: 91.66666667%;
  }
  .g-xl-0,
  .gx-xl-0 {
    --bs-gutter-x: 0;
  }
  .g-xl-0,
  .gy-xl-0 {
    --bs-gutter-y: 0;
  }
  .g-xl-1,
  .gx-xl-1 {
    --bs-gutter-x: 4px;
  }
  .g-xl-1,
  .gy-xl-1 {
    --bs-gutter-y: 4px;
  }
  .g-xl-2,
  .gx-xl-2 {
    --bs-gutter-x: 8px;
  }
  .g-xl-2,
  .gy-xl-2 {
    --bs-gutter-y: 8px;
  }
  .g-xl-3,
  .gx-xl-3 {
    --bs-gutter-x: 16px;
  }
  .g-xl-3,
  .gy-xl-3 {
    --bs-gutter-y: 16px;
  }
  .g-xl-4,
  .gx-xl-4 {
    --bs-gutter-x: 24px;
  }
  .g-xl-4,
  .gy-xl-4 {
    --bs-gutter-y: 24px;
  }
  .g-xl-5,
  .gx-xl-5 {
    --bs-gutter-x: 48px;
  }
  .g-xl-5,
  .gy-xl-5 {
    --bs-gutter-y: 48px;
  }
}
@media (min-width: 1400px) {
  .col-xxl {
    flex: 1 0 0%;
  }
  .row-cols-xxl-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-xxl-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-xxl-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-xxl-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-xxl-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-xxl-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-xxl-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-xxl-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-xxl-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-xxl-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-xxl-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-xxl-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-xxl-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-xxl-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-xxl-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-xxl-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-xxl-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-xxl-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-xxl-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-xxl-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .offset-xxl-0 {
    margin-left: 0;
  }
  .offset-xxl-1 {
    margin-left: 8.33333333%;
  }
  .offset-xxl-2 {
    margin-left: 16.66666667%;
  }
  .offset-xxl-3 {
    margin-left: 25%;
  }
  .offset-xxl-4 {
    margin-left: 33.33333333%;
  }
  .offset-xxl-5 {
    margin-left: 41.66666667%;
  }
  .offset-xxl-6 {
    margin-left: 50%;
  }
  .offset-xxl-7 {
    margin-left: 58.33333333%;
  }
  .offset-xxl-8 {
    margin-left: 66.66666667%;
  }
  .offset-xxl-9 {
    margin-left: 75%;
  }
  .offset-xxl-10 {
    margin-left: 83.33333333%;
  }
  .offset-xxl-11 {
    margin-left: 91.66666667%;
  }
  .g-xxl-0,
  .gx-xxl-0 {
    --bs-gutter-x: 0;
  }
  .g-xxl-0,
  .gy-xxl-0 {
    --bs-gutter-y: 0;
  }
  .g-xxl-1,
  .gx-xxl-1 {
    --bs-gutter-x: 4px;
  }
  .g-xxl-1,
  .gy-xxl-1 {
    --bs-gutter-y: 4px;
  }
  .g-xxl-2,
  .gx-xxl-2 {
    --bs-gutter-x: 8px;
  }
  .g-xxl-2,
  .gy-xxl-2 {
    --bs-gutter-y: 8px;
  }
  .g-xxl-3,
  .gx-xxl-3 {
    --bs-gutter-x: 16px;
  }
  .g-xxl-3,
  .gy-xxl-3 {
    --bs-gutter-y: 16px;
  }
  .g-xxl-4,
  .gx-xxl-4 {
    --bs-gutter-x: 24px;
  }
  .g-xxl-4,
  .gy-xxl-4 {
    --bs-gutter-y: 24px;
  }
  .g-xxl-5,
  .gx-xxl-5 {
    --bs-gutter-x: 48px;
  }
  .g-xxl-5,
  .gy-xxl-5 {
    --bs-gutter-y: 48px;
  }
}
.form-label {
  margin-bottom: 0.5rem;
}
.col-form-label {
  padding-top: calc(10px + var(--bs-border-width));
  padding-bottom: calc(10px + var(--bs-border-width));
  margin-bottom: 0;
  font-size: inherit;
  line-height: 1.3;
}
.col-form-label-lg {
  padding-top: calc(0.5rem + var(--bs-border-width));
  padding-bottom: calc(0.5rem + var(--bs-border-width));
  font-size: 1.09375rem;
}
.col-form-label-sm {
  padding-top: calc(0.25rem + var(--bs-border-width));
  padding-bottom: calc(0.25rem + var(--bs-border-width));
  font-size: 0.765625rem;
}
.form-text {
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-secondary-color);
}
.form-control {
  display: block;
  width: 100%;
  padding: 10px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--bs-body-color);
  background-color: rgb(240, 240, 245);
  background-clip: padding-box;
  border: var(--bs-border-width) solid rgb(240, 240, 245);
  appearance: none;
  border-radius: var(--bs-border-radius);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-control {
    transition: none;
  }
}
.form-control[type=file] {
  overflow: hidden;
}
.form-control[type=file]:not(:disabled):not([readonly]) {
  cursor: pointer;
}
.form-control:focus {
  color: var(--bs-body-color);
  background-color: rgb(240, 240, 245);
  border-color: #a4a4f9;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(73, 73, 242, 0.25);
}
.form-control::-webkit-date-and-time-value {
  min-width: 85px;
  height: 1.3em;
  margin: 0;
}
.form-control::-webkit-datetime-edit {
  display: block;
  padding: 0;
}
.form-control::placeholder {
  color: rgb(130, 130, 153);
  opacity: 1;
}
.form-control:disabled {
  background-color: var(--bs-secondary-bg);
  opacity: 1;
}
.form-control::file-selector-button {
  padding: 10px 12px;
  margin: -10px -12px;
  margin-inline-end: 12px;
  color: var(--bs-body-color);
  background-color: var(--bs-tertiary-bg);
  pointer-events: none;
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  border-inline-end-width: var(--bs-border-width);
  border-radius: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-control::file-selector-button {
    transition: none;
  }
}
.form-control:hover:not(:disabled):not([readonly])::file-selector-button {
  background-color: var(--bs-secondary-bg);
}
.form-control-plaintext {
  display: block;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 0;
  line-height: 1.3;
  color: var(--bs-body-color);
  background-color: transparent;
  border: solid transparent;
  border-width: var(--bs-border-width) 0;
}
.form-control-plaintext:focus {
  outline: 0;
}
.form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg {
  padding-right: 0;
  padding-left: 0;
}
.form-control-sm {
  min-height: calc(1.3em + 0.5rem + calc(var(--bs-border-width) * 2));
  padding: 0.25rem 0.5rem;
  font-size: 0.765625rem;
  border-radius: var(--bs-border-radius-sm);
}
.form-control-sm::file-selector-button {
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  margin-inline-end: 0.5rem;
}
.form-control-lg {
  min-height: calc(1.3em + 1rem + calc(var(--bs-border-width) * 2));
  padding: 0.5rem 1rem;
  font-size: 1.09375rem;
  border-radius: var(--bs-border-radius-lg);
}
.form-control-lg::file-selector-button {
  padding: 0.5rem 1rem;
  margin: -0.5rem -1rem;
  margin-inline-end: 1rem;
}
textarea.form-control {
  min-height: calc(1.3em + 20px + calc(var(--bs-border-width) * 2));
}
textarea.form-control-sm {
  min-height: calc(1.3em + 0.5rem + calc(var(--bs-border-width) * 2));
}
textarea.form-control-lg {
  min-height: calc(1.3em + 1rem + calc(var(--bs-border-width) * 2));
}
.form-control-color {
  width: 3rem;
  height: calc(1.3em + 20px + calc(var(--bs-border-width) * 2));
  padding: 10px;
}
.form-control-color:not(:disabled):not([readonly]) {
  cursor: pointer;
}
.form-control-color::-moz-color-swatch {
  border: 0 !important;
  border-radius: var(--bs-border-radius);
}
.form-control-color::-webkit-color-swatch {
  border: 0 !important;
  border-radius: var(--bs-border-radius);
}
.form-control-color.form-control-sm {
  height: calc(1.3em + 0.5rem + calc(var(--bs-border-width) * 2));
}
.form-control-color.form-control-lg {
  height: calc(1.3em + 1rem + calc(var(--bs-border-width) * 2));
}
.form-select {
  --bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgb%2850, 50, 66%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  display: block;
  width: 100%;
  padding: 10px 36px 10px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--bs-body-color);
  background-color: rgb(240, 240, 245);
  background-image: var(--bs-form-select-bg-img), var(--bs-form-select-bg-icon, none);
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px 12px;
  border: var(--bs-border-width) solid rgb(240, 240, 245);
  border-radius: var(--bs-border-radius);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  appearance: none;
}
@media (prefers-reduced-motion: reduce) {
  .form-select {
    transition: none;
  }
}
.form-select:focus {
  border-color: #a4a4f9;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(73, 73, 242, 0.25);
}
.form-select[multiple], .form-select[size]:not([size="1"]) {
  padding-right: 12px;
  background-image: none;
}
.form-select:disabled {
  background-color: var(--bs-secondary-bg);
}
.form-select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 var(--bs-body-color);
}
.form-select-sm {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  font-size: 0.765625rem;
  border-radius: var(--bs-border-radius-sm);
}
.form-select-lg {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  font-size: 1.09375rem;
  border-radius: var(--bs-border-radius-lg);
}
[data-bs-theme=dark] .form-select {
  --bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgb%28255, 255, 255%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
}
.form-check {
  display: block;
  min-height: 1.1375rem;
  padding-left: 1.5em;
  margin-bottom: 0.125rem;
}
.form-check .form-check-input {
  float: left;
  margin-left: -1.5em;
}
.form-check-reverse {
  padding-right: 1.5em;
  padding-left: 0;
  text-align: right;
}
.form-check-reverse .form-check-input {
  float: right;
  margin-right: -1.5em;
  margin-left: 0;
}
.form-check-input {
  --bs-form-check-bg: rgb(240, 240, 245);
  width: 1em;
  height: 1em;
  margin-top: 0.15em;
  vertical-align: top;
  background-color: var(--bs-form-check-bg);
  background-image: var(--bs-form-check-bg-image);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: var(--bs-border-width) solid var(--bs-border-color);
  appearance: none;
  print-color-adjust: exact;
}
.form-check-input[type=checkbox] {
  border-radius: 0.25em;
}
.form-check-input[type=radio] {
  border-radius: 50%;
}
.form-check-input:active {
  filter: brightness(90%);
}
.form-check-input:focus {
  border-color: #a4a4f9;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(73, 73, 242, 0.25);
}
.form-check-input:checked {
  background-color: rgb(73, 73, 242);
  border-color: rgb(73, 73, 242);
}
.form-check-input:checked[type=checkbox] {
  --bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
}
.form-check-input:checked[type=radio] {
  --bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
}
.form-check-input[type=checkbox]:indeterminate {
  background-color: rgb(73, 73, 242);
  border-color: rgb(73, 73, 242);
  --bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
}
.form-check-input:disabled {
  pointer-events: none;
  filter: none;
  opacity: 0.5;
}
.form-check-input[disabled] ~ .form-check-label, .form-check-input:disabled ~ .form-check-label {
  cursor: default;
  opacity: 0.5;
}
.form-switch {
  padding-left: 2.5em;
}
.form-switch .form-check-input {
  --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
  width: 2em;
  margin-left: -2.5em;
  background-image: var(--bs-form-switch-bg);
  background-position: left center;
  border-radius: 2em;
  transition: background-position 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-switch .form-check-input {
    transition: none;
  }
}
.form-switch .form-check-input:focus {
  --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23a4a4f9'/%3e%3c/svg%3e");
}
.form-switch .form-check-input:checked {
  background-position: right center;
  --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.form-switch.form-check-reverse {
  padding-right: 2.5em;
  padding-left: 0;
}
.form-switch.form-check-reverse .form-check-input {
  margin-right: -2.5em;
  margin-left: 0;
}
.form-check-inline {
  display: inline-block;
  margin-right: 1rem;
}
.btn-check {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}
.btn-check[disabled] + .btn, .btn-check:disabled + .btn {
  pointer-events: none;
  filter: none;
  opacity: 0.65;
}
[data-bs-theme=dark] .form-switch .form-check-input:not(:checked):not(:focus) {
  --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%28255, 255, 255, 0.25%29'/%3e%3c/svg%3e");
}
.form-range {
  width: 100%;
  height: 2rem;
  padding: 0;
  background-color: transparent;
  appearance: none;
}
.form-range:focus {
  outline: 0;
}
.form-range:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(73, 73, 242, 0.25);
}
.form-range:focus::-moz-range-thumb {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(73, 73, 242, 0.25);
}
.form-range::-moz-focus-outer {
  border: 0;
}
.form-range::-webkit-slider-thumb {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: -0.65rem;
  background-color: var(--bs-secondary-bg);
  border: 0.125rem solid var(--bs-primary);
  border-radius: 0.6rem;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  appearance: none;
}
@media (prefers-reduced-motion: reduce) {
  .form-range::-webkit-slider-thumb {
    transition: none;
  }
}
.form-range::-webkit-slider-thumb:active {
  background-color: #c8c8fb;
}
.form-range::-webkit-slider-runnable-track {
  width: 100%;
  height: 0.2rem;
  color: transparent;
  cursor: pointer;
  background-color: rgb(184, 184, 204);
  border-color: transparent;
  border-radius: 1rem;
}
.form-range::-moz-range-thumb {
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--bs-secondary-bg);
  border: 0.125rem solid var(--bs-primary);
  border-radius: 0.6rem;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  appearance: none;
}
@media (prefers-reduced-motion: reduce) {
  .form-range::-moz-range-thumb {
    transition: none;
  }
}
.form-range::-moz-range-thumb:active {
  background-color: #c8c8fb;
}
.form-range::-moz-range-track {
  width: 100%;
  height: 0.2rem;
  color: transparent;
  cursor: pointer;
  background-color: rgb(184, 184, 204);
  border-color: transparent;
  border-radius: 1rem;
}
.form-range:disabled {
  pointer-events: none;
}
.form-range:disabled::-webkit-slider-thumb {
  background-color: var(--bs-secondary-color);
}
.form-range:disabled::-moz-range-thumb {
  background-color: var(--bs-secondary-color);
}
.form-floating {
  position: relative;
}
.form-floating > .form-control,
.form-floating > .form-control-plaintext,
.form-floating > .form-select {
  height: calc(3.5rem + calc(var(--bs-border-width) * 2));
  min-height: calc(3.5rem + calc(var(--bs-border-width) * 2));
  line-height: 1.25;
}
.form-floating > label {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  padding: 1rem 12px;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  border: var(--bs-border-width) solid transparent;
  transform-origin: 0 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-floating > label {
    transition: none;
  }
}
.form-floating > .form-control,
.form-floating > .form-control-plaintext {
  padding: 1rem 12px;
}
.form-floating > .form-control::placeholder,
.form-floating > .form-control-plaintext::placeholder {
  color: transparent;
}
.form-floating > .form-control:focus, .form-floating > .form-control:not(:placeholder-shown),
.form-floating > .form-control-plaintext:focus,
.form-floating > .form-control-plaintext:not(:placeholder-shown) {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.form-floating > .form-control:-webkit-autofill,
.form-floating > .form-control-plaintext:-webkit-autofill {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.form-floating > .form-select {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label,
.form-floating > .form-control-plaintext ~ label,
.form-floating > .form-select ~ label {
  color: rgba(var(--bs-body-color-rgb), 0.65);
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
.form-floating > .form-control:focus ~ label::after,
.form-floating > .form-control:not(:placeholder-shown) ~ label::after,
.form-floating > .form-control-plaintext ~ label::after,
.form-floating > .form-select ~ label::after {
  position: absolute;
  inset: 1rem 6px;
  z-index: -1;
  height: 1.5em;
  content: "";
  background-color: rgb(240, 240, 245);
  border-radius: var(--bs-border-radius);
}
.form-floating > .form-control:-webkit-autofill ~ label {
  color: rgba(var(--bs-body-color-rgb), 0.65);
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
.form-floating > .form-control-plaintext ~ label {
  border-width: var(--bs-border-width) 0;
}
.form-floating > :disabled ~ label {
  color: rgb(130, 130, 153);
}
.form-floating > :disabled ~ label::after {
  background-color: var(--bs-secondary-bg);
}
.input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}
.input-group > .form-control,
.input-group > .form-select,
.input-group > .form-floating {
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
}
.input-group > .form-control:focus,
.input-group > .form-select:focus,
.input-group > .form-floating:focus-within {
  z-index: 5;
}
.input-group .btn {
  position: relative;
  z-index: 2;
}
.input-group .btn:focus {
  z-index: 5;
}
.input-group-text {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--bs-body-color);
  text-align: center;
  white-space: nowrap;
  background-color: var(--bs-tertiary-bg);
  border: var(--bs-border-width) solid rgb(240, 240, 245);
  border-radius: var(--bs-border-radius);
}
.input-group-lg > .form-control,
.input-group-lg > .form-select,
.input-group-lg > .input-group-text,
.input-group-lg > .btn {
  padding: 0.5rem 1rem;
  font-size: 1.09375rem;
  border-radius: var(--bs-border-radius-lg);
}
.input-group-sm > .form-control,
.input-group-sm > .form-select,
.input-group-sm > .input-group-text,
.input-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.765625rem;
  border-radius: var(--bs-border-radius-sm);
}
.input-group-lg > .form-select,
.input-group-sm > .form-select {
  padding-right: 48px;
}
.input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),
.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3),
.input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-control,
.input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-select {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group.has-validation > :nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),
.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4),
.input-group.has-validation > .form-floating:nth-last-child(n+3) > .form-control,
.input-group.has-validation > .form-floating:nth-last-child(n+3) > .form-select {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
  margin-left: calc(var(--bs-border-width) * -1);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.input-group > .form-floating:not(:first-child) > .form-control,
.input-group > .form-floating:not(:first-child) > .form-select {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.valid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-form-valid-color);
}
.valid-tooltip {
  position: absolute;
  top: 100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 4px 8px;
  margin-top: 0.1rem;
  font-size: 0.765625rem;
  color: #fff;
  background-color: var(--bs-success);
  border-radius: var(--bs-border-radius);
}
.was-validated :valid ~ .valid-feedback,
.was-validated :valid ~ .valid-tooltip,
.is-valid ~ .valid-feedback,
.is-valid ~ .valid-tooltip {
  display: block;
}
.was-validated .form-control:valid, .form-control.is-valid {
  border-color: var(--bs-form-valid-border-color);
  padding-right: calc(1.3em + 20px);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='rgb%2840, 156, 92%29' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.325em + 5px) center;
  background-size: calc(0.65em + 10px) calc(0.65em + 10px);
}
.was-validated .form-control:valid:focus, .form-control.is-valid:focus {
  border-color: var(--bs-form-valid-border-color);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25);
}
.was-validated textarea.form-control:valid, textarea.form-control.is-valid {
  padding-right: calc(1.3em + 20px);
  background-position: top calc(0.325em + 5px) right calc(0.325em + 5px);
}
.was-validated .form-select:valid, .form-select.is-valid {
  border-color: var(--bs-form-valid-border-color);
}
.was-validated .form-select:valid:not([multiple]):not([size]), .was-validated .form-select:valid:not([multiple])[size="1"], .form-select.is-valid:not([multiple]):not([size]), .form-select.is-valid:not([multiple])[size="1"] {
  --bs-form-select-bg-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='rgb%2840, 156, 92%29' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  padding-right: 66px;
  background-position: right 12px center, center right 36px;
  background-size: 16px 12px, calc(0.65em + 10px) calc(0.65em + 10px);
}
.was-validated .form-select:valid:focus, .form-select.is-valid:focus {
  border-color: var(--bs-form-valid-border-color);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25);
}
.was-validated .form-control-color:valid, .form-control-color.is-valid {
  width: calc(3rem + calc(1.3em + 20px));
}
.was-validated .form-check-input:valid, .form-check-input.is-valid {
  border-color: var(--bs-form-valid-border-color);
}
.was-validated .form-check-input:valid:checked, .form-check-input.is-valid:checked {
  background-color: var(--bs-form-valid-color);
}
.was-validated .form-check-input:valid:focus, .form-check-input.is-valid:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25);
}
.was-validated .form-check-input:valid ~ .form-check-label, .form-check-input.is-valid ~ .form-check-label {
  color: var(--bs-form-valid-color);
}
.form-check-inline .form-check-input ~ .valid-feedback {
  margin-left: 0.5em;
}
.was-validated .input-group > .form-control:not(:focus):valid, .input-group > .form-control:not(:focus).is-valid,
.was-validated .input-group > .form-select:not(:focus):valid,
.input-group > .form-select:not(:focus).is-valid,
.was-validated .input-group > .form-floating:not(:focus-within):valid,
.input-group > .form-floating:not(:focus-within).is-valid {
  z-index: 3;
}
.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-form-invalid-color);
}
.invalid-tooltip {
  position: absolute;
  top: 100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 4px 8px;
  margin-top: 0.1rem;
  font-size: 0.765625rem;
  color: #fff;
  background-color: var(--bs-danger);
  border-radius: var(--bs-border-radius);
}
.was-validated :invalid ~ .invalid-feedback,
.was-validated :invalid ~ .invalid-tooltip,
.is-invalid ~ .invalid-feedback,
.is-invalid ~ .invalid-tooltip {
  display: block;
}
.was-validated .form-control:invalid, .form-control.is-invalid {
  border-color: var(--bs-form-invalid-border-color);
  padding-right: calc(1.3em + 20px);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='rgb%28219, 44, 73%29'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='rgb%28219, 44, 73%29' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.325em + 5px) center;
  background-size: calc(0.65em + 10px) calc(0.65em + 10px);
}
.was-validated .form-control:invalid:focus, .form-control.is-invalid:focus {
  border-color: var(--bs-form-invalid-border-color);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25);
}
.was-validated textarea.form-control:invalid, textarea.form-control.is-invalid {
  padding-right: calc(1.3em + 20px);
  background-position: top calc(0.325em + 5px) right calc(0.325em + 5px);
}
.was-validated .form-select:invalid, .form-select.is-invalid {
  border-color: var(--bs-form-invalid-border-color);
}
.was-validated .form-select:invalid:not([multiple]):not([size]), .was-validated .form-select:invalid:not([multiple])[size="1"], .form-select.is-invalid:not([multiple]):not([size]), .form-select.is-invalid:not([multiple])[size="1"] {
  --bs-form-select-bg-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='rgb%28219, 44, 73%29'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='rgb%28219, 44, 73%29' stroke='none'/%3e%3c/svg%3e");
  padding-right: 66px;
  background-position: right 12px center, center right 36px;
  background-size: 16px 12px, calc(0.65em + 10px) calc(0.65em + 10px);
}
.was-validated .form-select:invalid:focus, .form-select.is-invalid:focus {
  border-color: var(--bs-form-invalid-border-color);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25);
}
.was-validated .form-control-color:invalid, .form-control-color.is-invalid {
  width: calc(3rem + calc(1.3em + 20px));
}
.was-validated .form-check-input:invalid, .form-check-input.is-invalid {
  border-color: var(--bs-form-invalid-border-color);
}
.was-validated .form-check-input:invalid:checked, .form-check-input.is-invalid:checked {
  background-color: var(--bs-form-invalid-color);
}
.was-validated .form-check-input:invalid:focus, .form-check-input.is-invalid:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25);
}
.was-validated .form-check-input:invalid ~ .form-check-label, .form-check-input.is-invalid ~ .form-check-label {
  color: var(--bs-form-invalid-color);
}
.form-check-inline .form-check-input ~ .invalid-feedback {
  margin-left: 0.5em;
}
.was-validated .input-group > .form-control:not(:focus):invalid, .input-group > .form-control:not(:focus).is-invalid,
.was-validated .input-group > .form-select:not(:focus):invalid,
.input-group > .form-select:not(:focus).is-invalid,
.was-validated .input-group > .form-floating:not(:focus-within):invalid,
.input-group > .form-floating:not(:focus-within).is-invalid {
  z-index: 4;
}
.btn {
  --bs-btn-padding-x: 12px;
  --bs-btn-padding-y: 10px;
  --bs-btn-font-family: ;
  --bs-btn-font-size: 0.875rem;
  --bs-btn-font-weight: 500;
  --bs-btn-line-height: 1.3;
  --bs-btn-color: var(--bs-body-color);
  --bs-btn-bg: transparent;
  --bs-btn-border-width: var(--bs-border-width);
  --bs-btn-border-color: transparent;
  --bs-btn-border-radius: var(--bs-border-radius);
  --bs-btn-hover-border-color: transparent;
  --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  --bs-btn-disabled-opacity: 0.65;
  --bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);
  display: inline-block;
  padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
  font-family: var(--bs-btn-font-family);
  font-size: var(--bs-btn-font-size);
  font-weight: var(--bs-btn-font-weight);
  line-height: var(--bs-btn-line-height);
  color: var(--bs-btn-color);
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
  border-radius: var(--bs-btn-border-radius);
  background-color: var(--bs-btn-bg);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
.btn:hover {
  color: var(--bs-btn-hover-color);
  background-color: var(--bs-btn-hover-bg);
  border-color: var(--bs-btn-hover-border-color);
}
.btn-check + .btn:hover {
  color: var(--bs-btn-color);
  background-color: var(--bs-btn-bg);
  border-color: var(--bs-btn-border-color);
}
.btn:focus-visible {
  color: var(--bs-btn-hover-color);
  background-color: var(--bs-btn-hover-bg);
  border-color: var(--bs-btn-hover-border-color);
  outline: 0;
  box-shadow: var(--bs-btn-focus-box-shadow);
}
.btn-check:focus-visible + .btn {
  border-color: var(--bs-btn-hover-border-color);
  outline: 0;
  box-shadow: var(--bs-btn-focus-box-shadow);
}
.btn-check:checked + .btn, :not(.btn-check) + .btn:active, .btn:first-child:active, .btn.active, .btn.show {
  color: var(--bs-btn-active-color);
  background-color: var(--bs-btn-active-bg);
  border-color: var(--bs-btn-active-border-color);
}
.btn-check:checked + .btn:focus-visible, :not(.btn-check) + .btn:active:focus-visible, .btn:first-child:active:focus-visible, .btn.active:focus-visible, .btn.show:focus-visible {
  box-shadow: var(--bs-btn-focus-box-shadow);
}
.btn:disabled, .btn.disabled, fieldset:disabled .btn {
  color: var(--bs-btn-disabled-color);
  pointer-events: none;
  background-color: var(--bs-btn-disabled-bg);
  border-color: var(--bs-btn-disabled-border-color);
  opacity: var(--bs-btn-disabled-opacity);
}
.btn-primary {
  --bs-btn-color: #fff;
  --bs-btn-bg: rgb(73, 73, 242);
  --bs-btn-border-color: rgb(73, 73, 242);
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #3e3ece;
  --bs-btn-hover-border-color: #3a3ac2;
  --bs-btn-focus-shadow-rgb: 100, 100, 244;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #3a3ac2;
  --bs-btn-active-border-color: #3737b6;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: rgb(73, 73, 242);
  --bs-btn-disabled-border-color: rgb(73, 73, 242);
}
.btn-secondary {
  --bs-btn-color: #000;
  --bs-btn-bg: rgb(240, 240, 245);
  --bs-btn-border-color: rgb(240, 240, 245);
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #f2f2f7;
  --bs-btn-hover-border-color: #f2f2f6;
  --bs-btn-focus-shadow-rgb: 204, 204, 208;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #f3f3f7;
  --bs-btn-active-border-color: #f2f2f6;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #000;
  --bs-btn-disabled-bg: rgb(240, 240, 245);
  --bs-btn-disabled-border-color: rgb(240, 240, 245);
}
.btn-success {
  --bs-btn-color: #fff;
  --bs-btn-bg: rgb(40, 156, 92);
  --bs-btn-border-color: rgb(40, 156, 92);
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #22854e;
  --bs-btn-hover-border-color: #207d4a;
  --bs-btn-focus-shadow-rgb: 72, 171, 116;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #207d4a;
  --bs-btn-active-border-color: #1e7545;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: rgb(40, 156, 92);
  --bs-btn-disabled-border-color: rgb(40, 156, 92);
}
.btn-info {
  --bs-btn-color: #000;
  --bs-btn-bg: #0dcaf0;
  --bs-btn-border-color: #0dcaf0;
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #31d2f2;
  --bs-btn-hover-border-color: #25cff2;
  --bs-btn-focus-shadow-rgb: 11, 172, 204;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #3dd5f3;
  --bs-btn-active-border-color: #25cff2;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #000;
  --bs-btn-disabled-bg: #0dcaf0;
  --bs-btn-disabled-border-color: #0dcaf0;
}
.btn-warning {
  --bs-btn-color: #000;
  --bs-btn-bg: rgb(255, 193, 7);
  --bs-btn-border-color: rgb(255, 193, 7);
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #ffca2c;
  --bs-btn-hover-border-color: #ffc720;
  --bs-btn-focus-shadow-rgb: 217, 164, 6;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #ffcd39;
  --bs-btn-active-border-color: #ffc720;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #000;
  --bs-btn-disabled-bg: rgb(255, 193, 7);
  --bs-btn-disabled-border-color: rgb(255, 193, 7);
}
.btn-danger {
  --bs-btn-color: #fff;
  --bs-btn-bg: rgb(219, 44, 73);
  --bs-btn-border-color: rgb(219, 44, 73);
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #ba253e;
  --bs-btn-hover-border-color: #af233a;
  --bs-btn-focus-shadow-rgb: 224, 76, 100;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #af233a;
  --bs-btn-active-border-color: #a42137;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: rgb(219, 44, 73);
  --bs-btn-disabled-border-color: rgb(219, 44, 73);
}
.btn-light {
  --bs-btn-color: #000;
  --bs-btn-bg: rgb(240, 240, 245);
  --bs-btn-border-color: rgb(240, 240, 245);
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #ccccd0;
  --bs-btn-hover-border-color: #c0c0c4;
  --bs-btn-focus-shadow-rgb: 204, 204, 208;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #c0c0c4;
  --bs-btn-active-border-color: #b4b4b8;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #000;
  --bs-btn-disabled-bg: rgb(240, 240, 245);
  --bs-btn-disabled-border-color: rgb(240, 240, 245);
}
.btn-dark {
  --bs-btn-color: #fff;
  --bs-btn-bg: rgb(27, 28, 38);
  --bs-btn-border-color: rgb(27, 28, 38);
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #3d3e47;
  --bs-btn-hover-border-color: #32333c;
  --bs-btn-focus-shadow-rgb: 61, 62, 71;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #494951;
  --bs-btn-active-border-color: #32333c;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: rgb(27, 28, 38);
  --bs-btn-disabled-border-color: rgb(27, 28, 38);
}
.btn-outline-primary {
  --bs-btn-color: rgb(73, 73, 242);
  --bs-btn-border-color: rgb(73, 73, 242);
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: rgb(73, 73, 242);
  --bs-btn-hover-border-color: rgb(73, 73, 242);
  --bs-btn-focus-shadow-rgb: 73, 73, 242;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: rgb(73, 73, 242);
  --bs-btn-active-border-color: rgb(73, 73, 242);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: rgb(73, 73, 242);
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: rgb(73, 73, 242);
  --bs-gradient: none;
}
.btn-outline-secondary {
  --bs-btn-color: rgb(240, 240, 245);
  --bs-btn-border-color: rgb(240, 240, 245);
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: rgb(240, 240, 245);
  --bs-btn-hover-border-color: rgb(240, 240, 245);
  --bs-btn-focus-shadow-rgb: 240, 240, 245;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: rgb(240, 240, 245);
  --bs-btn-active-border-color: rgb(240, 240, 245);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: rgb(240, 240, 245);
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: rgb(240, 240, 245);
  --bs-gradient: none;
}
.btn-outline-success {
  --bs-btn-color: rgb(40, 156, 92);
  --bs-btn-border-color: rgb(40, 156, 92);
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: rgb(40, 156, 92);
  --bs-btn-hover-border-color: rgb(40, 156, 92);
  --bs-btn-focus-shadow-rgb: 40, 156, 92;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: rgb(40, 156, 92);
  --bs-btn-active-border-color: rgb(40, 156, 92);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: rgb(40, 156, 92);
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: rgb(40, 156, 92);
  --bs-gradient: none;
}
.btn-outline-info {
  --bs-btn-color: #0dcaf0;
  --bs-btn-border-color: #0dcaf0;
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #0dcaf0;
  --bs-btn-hover-border-color: #0dcaf0;
  --bs-btn-focus-shadow-rgb: 13, 202, 240;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #0dcaf0;
  --bs-btn-active-border-color: #0dcaf0;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #0dcaf0;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #0dcaf0;
  --bs-gradient: none;
}
.btn-outline-warning {
  --bs-btn-color: rgb(255, 193, 7);
  --bs-btn-border-color: rgb(255, 193, 7);
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: rgb(255, 193, 7);
  --bs-btn-hover-border-color: rgb(255, 193, 7);
  --bs-btn-focus-shadow-rgb: 255, 193, 7;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: rgb(255, 193, 7);
  --bs-btn-active-border-color: rgb(255, 193, 7);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: rgb(255, 193, 7);
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: rgb(255, 193, 7);
  --bs-gradient: none;
}
.btn-outline-danger {
  --bs-btn-color: rgb(219, 44, 73);
  --bs-btn-border-color: rgb(219, 44, 73);
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: rgb(219, 44, 73);
  --bs-btn-hover-border-color: rgb(219, 44, 73);
  --bs-btn-focus-shadow-rgb: 219, 44, 73;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: rgb(219, 44, 73);
  --bs-btn-active-border-color: rgb(219, 44, 73);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: rgb(219, 44, 73);
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: rgb(219, 44, 73);
  --bs-gradient: none;
}
.btn-outline-light {
  --bs-btn-color: rgb(240, 240, 245);
  --bs-btn-border-color: rgb(240, 240, 245);
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: rgb(240, 240, 245);
  --bs-btn-hover-border-color: rgb(240, 240, 245);
  --bs-btn-focus-shadow-rgb: 240, 240, 245;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: rgb(240, 240, 245);
  --bs-btn-active-border-color: rgb(240, 240, 245);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: rgb(240, 240, 245);
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: rgb(240, 240, 245);
  --bs-gradient: none;
}
.btn-outline-dark {
  --bs-btn-color: rgb(27, 28, 38);
  --bs-btn-border-color: rgb(27, 28, 38);
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: rgb(27, 28, 38);
  --bs-btn-hover-border-color: rgb(27, 28, 38);
  --bs-btn-focus-shadow-rgb: 27, 28, 38;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: rgb(27, 28, 38);
  --bs-btn-active-border-color: rgb(27, 28, 38);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: rgb(27, 28, 38);
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: rgb(27, 28, 38);
  --bs-gradient: none;
}
.btn-link {
  --bs-btn-font-weight: 400;
  --bs-btn-color: var(--bs-link-color);
  --bs-btn-bg: transparent;
  --bs-btn-border-color: transparent;
  --bs-btn-hover-color: var(--bs-link-hover-color);
  --bs-btn-hover-border-color: transparent;
  --bs-btn-active-color: var(--bs-link-hover-color);
  --bs-btn-active-border-color: transparent;
  --bs-btn-disabled-color: rgb(130, 130, 153);
  --bs-btn-disabled-border-color: transparent;
  --bs-btn-box-shadow: 0 0 0 #000;
  --bs-btn-focus-shadow-rgb: 100, 100, 244;
  text-decoration: none;
}
.btn-link:focus-visible {
  color: var(--bs-btn-color);
}
.btn-link:hover {
  color: var(--bs-btn-hover-color);
}
.btn-lg {
  --bs-btn-padding-y: 0.5rem;
  --bs-btn-padding-x: 1rem;
  --bs-btn-font-size: 1.09375rem;
  --bs-btn-border-radius: var(--bs-border-radius-lg);
}
.btn-sm {
  --bs-btn-padding-y: 0.25rem;
  --bs-btn-padding-x: 0.5rem;
  --bs-btn-font-size: 0.765625rem;
  --bs-btn-border-radius: var(--bs-border-radius-sm);
}
.fade {
  transition: opacity 0.15s linear;
}
@media (prefers-reduced-motion: reduce) {
  .fade {
    transition: none;
  }
}
.fade:not(.show) {
  opacity: 0;
}
.collapse:not(.show) {
  display: none;
}
.collapsing {
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}
@media (prefers-reduced-motion: reduce) {
  .collapsing {
    transition: none;
  }
}
.collapsing.collapse-horizontal {
  width: 0;
  height: auto;
  transition: width 0.35s ease;
}
@media (prefers-reduced-motion: reduce) {
  .collapsing.collapse-horizontal {
    transition: none;
  }
}
.dropup,
.dropend,
.dropdown,
.dropstart,
.dropup-center,
.dropdown-center {
  position: relative;
}
.dropdown-toggle {
  white-space: nowrap;
}
.dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
}
.dropdown-toggle:empty::after {
  margin-left: 0;
}
.dropdown-menu {
  --bs-dropdown-zindex: 1000;
  --bs-dropdown-min-width: 10rem;
  --bs-dropdown-padding-x: 0;
  --bs-dropdown-padding-y: 0.5rem;
  --bs-dropdown-spacer: 0.125rem;
  --bs-dropdown-font-size: 0.875rem;
  --bs-dropdown-color: var(--bs-body-color);
  --bs-dropdown-bg: var(--bs-body-bg);
  --bs-dropdown-border-color: var(--bs-border-color-translucent);
  --bs-dropdown-border-radius: var(--bs-border-radius);
  --bs-dropdown-border-width: var(--bs-border-width);
  --bs-dropdown-inner-border-radius: calc(var(--bs-border-radius) - var(--bs-border-width));
  --bs-dropdown-divider-bg: var(--bs-border-color-translucent);
  --bs-dropdown-divider-margin-y: 8px;
  --bs-dropdown-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --bs-dropdown-link-color: var(--bs-body-color);
  --bs-dropdown-link-hover-color: var(--bs-body-color);
  --bs-dropdown-link-hover-bg: var(--bs-tertiary-bg);
  --bs-dropdown-link-active-color: var(--bs-dropdown-link-hover-color);
  --bs-dropdown-link-active-bg: var(--bs-dropdown-link-hover-bg);
  --bs-dropdown-link-disabled-color: var(--bs-tertiary-color);
  --bs-dropdown-item-padding-x: 16px;
  --bs-dropdown-item-padding-y: 11px;
  --bs-dropdown-header-color: rgb(130, 130, 153);
  --bs-dropdown-header-padding-x: 16px;
  --bs-dropdown-header-padding-y: 0.5rem;
  position: absolute;
  z-index: var(--bs-dropdown-zindex);
  display: none;
  min-width: var(--bs-dropdown-min-width);
  padding: var(--bs-dropdown-padding-y) var(--bs-dropdown-padding-x);
  margin: 0;
  font-size: var(--bs-dropdown-font-size);
  color: var(--bs-dropdown-color);
  text-align: left;
  list-style: none;
  background-color: var(--bs-dropdown-bg);
  background-clip: padding-box;
  border: var(--bs-dropdown-border-width) solid var(--bs-dropdown-border-color);
  border-radius: var(--bs-dropdown-border-radius);
}
.dropdown-menu[data-bs-popper] {
  top: 100%;
  left: 0;
  margin-top: var(--bs-dropdown-spacer);
}
.dropdown-menu-start {
  --bs-position: start;
}
.dropdown-menu-start[data-bs-popper] {
  right: auto;
  left: 0;
}
.dropdown-menu-end {
  --bs-position: end;
}
.dropdown-menu-end[data-bs-popper] {
  right: 0;
  left: auto;
}
@media (min-width: 576px) {
  .dropdown-menu-sm-start {
    --bs-position: start;
  }
  .dropdown-menu-sm-start[data-bs-popper] {
    right: auto;
    left: 0;
  }
  .dropdown-menu-sm-end {
    --bs-position: end;
  }
  .dropdown-menu-sm-end[data-bs-popper] {
    right: 0;
    left: auto;
  }
}
@media (min-width: 768px) {
  .dropdown-menu-md-start {
    --bs-position: start;
  }
  .dropdown-menu-md-start[data-bs-popper] {
    right: auto;
    left: 0;
  }
  .dropdown-menu-md-end {
    --bs-position: end;
  }
  .dropdown-menu-md-end[data-bs-popper] {
    right: 0;
    left: auto;
  }
}
@media (min-width: 992px) {
  .dropdown-menu-lg-start {
    --bs-position: start;
  }
  .dropdown-menu-lg-start[data-bs-popper] {
    right: auto;
    left: 0;
  }
  .dropdown-menu-lg-end {
    --bs-position: end;
  }
  .dropdown-menu-lg-end[data-bs-popper] {
    right: 0;
    left: auto;
  }
}
@media (min-width: 1200px) {
  .dropdown-menu-xl-start {
    --bs-position: start;
  }
  .dropdown-menu-xl-start[data-bs-popper] {
    right: auto;
    left: 0;
  }
  .dropdown-menu-xl-end {
    --bs-position: end;
  }
  .dropdown-menu-xl-end[data-bs-popper] {
    right: 0;
    left: auto;
  }
}
@media (min-width: 1400px) {
  .dropdown-menu-xxl-start {
    --bs-position: start;
  }
  .dropdown-menu-xxl-start[data-bs-popper] {
    right: auto;
    left: 0;
  }
  .dropdown-menu-xxl-end {
    --bs-position: end;
  }
  .dropdown-menu-xxl-end[data-bs-popper] {
    right: 0;
    left: auto;
  }
}
.dropup .dropdown-menu[data-bs-popper] {
  top: auto;
  bottom: 100%;
  margin-top: 0;
  margin-bottom: var(--bs-dropdown-spacer);
}
.dropup .dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0;
  border-right: 0.3em solid transparent;
  border-bottom: 0.3em solid;
  border-left: 0.3em solid transparent;
}
.dropup .dropdown-toggle:empty::after {
  margin-left: 0;
}
.dropend .dropdown-menu[data-bs-popper] {
  top: 0;
  right: auto;
  left: 100%;
  margin-top: 0;
  margin-left: var(--bs-dropdown-spacer);
}
.dropend .dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid transparent;
  border-right: 0;
  border-bottom: 0.3em solid transparent;
  border-left: 0.3em solid;
}
.dropend .dropdown-toggle:empty::after {
  margin-left: 0;
}
.dropend .dropdown-toggle::after {
  vertical-align: 0;
}
.dropstart .dropdown-menu[data-bs-popper] {
  top: 0;
  right: 100%;
  left: auto;
  margin-top: 0;
  margin-right: var(--bs-dropdown-spacer);
}
.dropstart .dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
}
.dropstart .dropdown-toggle::after {
  display: none;
}
.dropstart .dropdown-toggle::before {
  display: inline-block;
  margin-right: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid transparent;
  border-right: 0.3em solid;
  border-bottom: 0.3em solid transparent;
}
.dropstart .dropdown-toggle:empty::after {
  margin-left: 0;
}
.dropstart .dropdown-toggle::before {
  vertical-align: 0;
}
.dropdown-divider {
  height: 0;
  margin: var(--bs-dropdown-divider-margin-y) 0;
  overflow: hidden;
  border-top: 1px solid var(--bs-dropdown-divider-bg);
  opacity: 1;
}
.dropdown-item {
  display: block;
  width: 100%;
  padding: var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);
  clear: both;
  font-weight: 400;
  color: var(--bs-dropdown-link-color);
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  border-radius: var(--bs-dropdown-item-border-radius, 0);
}
.dropdown-item:hover, .dropdown-item:focus {
  color: var(--bs-dropdown-link-hover-color);
  background-color: var(--bs-dropdown-link-hover-bg);
}
.dropdown-item.active, .dropdown-item:active {
  color: var(--bs-dropdown-link-active-color);
  text-decoration: none;
  background-color: var(--bs-dropdown-link-active-bg);
}
.dropdown-item.disabled, .dropdown-item:disabled {
  color: var(--bs-dropdown-link-disabled-color);
  pointer-events: none;
  background-color: transparent;
}
.dropdown-menu.show {
  display: block;
}
.dropdown-header {
  display: block;
  padding: var(--bs-dropdown-header-padding-y) var(--bs-dropdown-header-padding-x);
  margin-bottom: 0;
  font-size: 0.765625rem;
  color: var(--bs-dropdown-header-color);
  white-space: nowrap;
}
.dropdown-item-text {
  display: block;
  padding: var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);
  color: var(--bs-dropdown-link-color);
}
.dropdown-menu-dark {
  --bs-dropdown-color: rgb(184, 184, 204);
  --bs-dropdown-bg: rgb(50, 50, 66);
  --bs-dropdown-border-color: var(--bs-border-color-translucent);
  --bs-dropdown-box-shadow: ;
  --bs-dropdown-link-color: rgb(184, 184, 204);
  --bs-dropdown-link-hover-color: #fff;
  --bs-dropdown-divider-bg: var(--bs-border-color-translucent);
  --bs-dropdown-link-hover-bg: rgba(255, 255, 255, 0.15);
  --bs-dropdown-link-active-color: var(--bs-dropdown-link-hover-color);
  --bs-dropdown-link-active-bg: var(--bs-dropdown-link-hover-bg);
  --bs-dropdown-link-disabled-color: rgb(130, 130, 153);
  --bs-dropdown-header-color: rgb(130, 130, 153);
}
.nav {
  --bs-nav-link-padding-x: 1rem;
  --bs-nav-link-padding-y: 0;
  --bs-nav-link-font-size: 1rem;
  --bs-nav-link-font-weight: 700;
  --bs-nav-link-color: var(--bs-link-color);
  --bs-nav-link-hover-color: var(--bs-link-hover-color);
  --bs-nav-link-disabled-color: var(--bs-secondary-color);
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.nav-link {
  display: block;
  padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
  font-size: var(--bs-nav-link-font-size);
  font-weight: var(--bs-nav-link-font-weight);
  color: var(--bs-nav-link-color);
  background: none;
  border: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .nav-link {
    transition: none;
  }
}
.nav-link:hover, .nav-link:focus {
  color: var(--bs-nav-link-hover-color);
}
.nav-link:focus-visible {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(73, 73, 242, 0.25);
}
.nav-link.disabled {
  color: var(--bs-nav-link-disabled-color);
  pointer-events: none;
  cursor: default;
}
.nav-tabs {
  --bs-nav-tabs-border-width: var(--bs-border-width);
  --bs-nav-tabs-border-color: var(--bs-border-color);
  --bs-nav-tabs-border-radius: var(--bs-border-radius);
  --bs-nav-tabs-link-hover-border-color: var(--bs-secondary-bg) var(--bs-secondary-bg) var(--bs-border-color);
  --bs-nav-tabs-link-active-color: var(--bs-emphasis-color);
  --bs-nav-tabs-link-active-bg: var(--bs-body-bg);
  --bs-nav-tabs-link-active-border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-body-bg);
  border-bottom: var(--bs-nav-tabs-border-width) solid var(--bs-nav-tabs-border-color);
}
.nav-tabs .nav-link {
  margin-bottom: calc(-1 * var(--bs-nav-tabs-border-width));
  border: var(--bs-nav-tabs-border-width) solid transparent;
  border-top-left-radius: var(--bs-nav-tabs-border-radius);
  border-top-right-radius: var(--bs-nav-tabs-border-radius);
}
.nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus {
  isolation: isolate;
  border-color: var(--bs-nav-tabs-link-hover-border-color);
}
.nav-tabs .nav-link.disabled, .nav-tabs .nav-link:disabled {
  color: var(--bs-nav-link-disabled-color);
  background-color: transparent;
  border-color: transparent;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: var(--bs-nav-tabs-link-active-color);
  background-color: var(--bs-nav-tabs-link-active-bg);
  border-color: var(--bs-nav-tabs-link-active-border-color);
}
.nav-tabs .dropdown-menu {
  margin-top: calc(-1 * var(--bs-nav-tabs-border-width));
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.nav-pills {
  --bs-nav-pills-border-radius: var(--bs-border-radius);
  --bs-nav-pills-link-active-color: #fff;
  --bs-nav-pills-link-active-bg: rgb(73, 73, 242);
}
.nav-pills .nav-link {
  border-radius: var(--bs-nav-pills-border-radius);
}
.nav-pills .nav-link:disabled {
  color: var(--bs-nav-link-disabled-color);
  background-color: transparent;
  border-color: transparent;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: var(--bs-nav-pills-link-active-color);
  background-color: var(--bs-nav-pills-link-active-bg);
}
.nav-underline {
  --bs-nav-underline-gap: 1rem;
  --bs-nav-underline-border-width: 0.125rem;
  --bs-nav-underline-link-active-color: var(--bs-emphasis-color);
  gap: var(--bs-nav-underline-gap);
}
.nav-underline .nav-link {
  padding-right: 0;
  padding-left: 0;
  border-bottom: var(--bs-nav-underline-border-width) solid transparent;
}
.nav-underline .nav-link:hover, .nav-underline .nav-link:focus {
  border-bottom-color: currentcolor;
}
.nav-underline .nav-link.active,
.nav-underline .show > .nav-link {
  font-weight: 700;
  color: var(--bs-nav-underline-link-active-color);
  border-bottom-color: currentcolor;
}
.nav-fill > .nav-link,
.nav-fill .nav-item {
  flex: 1 1 auto;
  text-align: center;
}
.nav-justified > .nav-link,
.nav-justified .nav-item {
  flex-basis: 0;
  flex-grow: 1;
  text-align: center;
}
.nav-fill .nav-item .nav-link,
.nav-justified .nav-item .nav-link {
  width: 100%;
}
.tab-content > .tab-pane {
  display: none;
}
.tab-content > .active {
  display: block;
}
.navbar {
  --bs-navbar-padding-x: 0;
  --bs-navbar-padding-y: 0;
  --bs-navbar-color: rgba(var(--bs-emphasis-color-rgb), 0.65);
  --bs-navbar-hover-color: rgba(var(--bs-emphasis-color-rgb), 0.8);
  --bs-navbar-disabled-color: rgba(var(--bs-emphasis-color-rgb), 0.3);
  --bs-navbar-active-color: rgba(var(--bs-emphasis-color-rgb), 1);
  --bs-navbar-brand-padding-y: -0.1421875rem;
  --bs-navbar-brand-margin-end: 1rem;
  --bs-navbar-brand-font-size: 1.09375rem;
  --bs-navbar-brand-color: rgba(var(--bs-emphasis-color-rgb), 1);
  --bs-navbar-brand-hover-color: rgba(var(--bs-emphasis-color-rgb), 1);
  --bs-navbar-nav-link-padding-x: 0.5rem;
  --bs-navbar-toggler-padding-y: 0.25rem;
  --bs-navbar-toggler-padding-x: 0.75rem;
  --bs-navbar-toggler-font-size: 1.09375rem;
  --bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2850, 50, 66, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  --bs-navbar-toggler-border-color: rgba(var(--bs-emphasis-color-rgb), 0.15);
  --bs-navbar-toggler-border-radius: var(--bs-border-radius);
  --bs-navbar-toggler-focus-width: 0.25rem;
  --bs-navbar-toggler-transition: box-shadow 0.15s ease-in-out;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: var(--bs-navbar-padding-y) var(--bs-navbar-padding-x);
}
.navbar > .container,
.navbar > .container-fluid,
.navbar > .container-sm,
.navbar > .container-md,
.navbar > .container-lg,
.navbar > .container-xl,
.navbar > .container-xxl {
  display: flex;
  flex-wrap: inherit;
  align-items: center;
  justify-content: space-between;
}
.navbar-brand {
  padding-top: var(--bs-navbar-brand-padding-y);
  padding-bottom: var(--bs-navbar-brand-padding-y);
  margin-right: var(--bs-navbar-brand-margin-end);
  font-size: var(--bs-navbar-brand-font-size);
  color: var(--bs-navbar-brand-color);
  white-space: nowrap;
}
.navbar-brand:hover, .navbar-brand:focus {
  color: var(--bs-navbar-brand-hover-color);
}
.navbar-nav {
  --bs-nav-link-padding-x: 0;
  --bs-nav-link-padding-y: 0;
  --bs-nav-link-font-size: 1rem;
  --bs-nav-link-font-weight: 700;
  --bs-nav-link-color: var(--bs-navbar-color);
  --bs-nav-link-hover-color: var(--bs-navbar-hover-color);
  --bs-nav-link-disabled-color: var(--bs-navbar-disabled-color);
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.navbar-nav .nav-link.active, .navbar-nav .nav-link.show {
  color: var(--bs-navbar-active-color);
}
.navbar-nav .dropdown-menu {
  position: static;
}
.navbar-text {
  padding-top: 0;
  padding-bottom: 0;
  color: var(--bs-navbar-color);
}
.navbar-text a,
.navbar-text a:hover,
.navbar-text a:focus {
  color: var(--bs-navbar-active-color);
}
.navbar-collapse {
  flex-basis: 100%;
  flex-grow: 1;
  align-items: center;
}
.navbar-toggler {
  padding: var(--bs-navbar-toggler-padding-y) var(--bs-navbar-toggler-padding-x);
  font-size: var(--bs-navbar-toggler-font-size);
  line-height: 1;
  color: var(--bs-navbar-color);
  background-color: transparent;
  border: var(--bs-border-width) solid var(--bs-navbar-toggler-border-color);
  border-radius: var(--bs-navbar-toggler-border-radius);
  transition: var(--bs-navbar-toggler-transition);
}
@media (prefers-reduced-motion: reduce) {
  .navbar-toggler {
    transition: none;
  }
}
.navbar-toggler:hover {
  text-decoration: none;
}
.navbar-toggler:focus {
  text-decoration: none;
  outline: 0;
  box-shadow: 0 0 0 var(--bs-navbar-toggler-focus-width);
}
.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  background-image: var(--bs-navbar-toggler-icon-bg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
.navbar-nav-scroll {
  max-height: var(--bs-scroll-height, 75vh);
  overflow-y: auto;
}
@media (min-width: 576px) {
  .navbar-expand-sm {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-sm .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-sm .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-sm .navbar-nav .nav-link {
    padding-right: var(--bs-navbar-nav-link-padding-x);
    padding-left: var(--bs-navbar-nav-link-padding-x);
  }
  .navbar-expand-sm .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand-sm .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-sm .navbar-toggler {
    display: none;
  }
  .navbar-expand-sm .offcanvas {
    position: static;
    z-index: auto;
    flex-grow: 1;
    width: auto !important;
    height: auto !important;
    visibility: visible !important;
    background-color: transparent !important;
    border: 0 !important;
    transform: none !important;
    transition: none;
  }
  .navbar-expand-sm .offcanvas .offcanvas-header {
    display: none;
  }
  .navbar-expand-sm .offcanvas .offcanvas-body {
    display: flex;
    flex-grow: 0;
    padding: 0;
    overflow-y: visible;
  }
}
@media (min-width: 768px) {
  .navbar-expand-md {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-md .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-md .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-md .navbar-nav .nav-link {
    padding-right: var(--bs-navbar-nav-link-padding-x);
    padding-left: var(--bs-navbar-nav-link-padding-x);
  }
  .navbar-expand-md .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand-md .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-md .navbar-toggler {
    display: none;
  }
  .navbar-expand-md .offcanvas {
    position: static;
    z-index: auto;
    flex-grow: 1;
    width: auto !important;
    height: auto !important;
    visibility: visible !important;
    background-color: transparent !important;
    border: 0 !important;
    transform: none !important;
    transition: none;
  }
  .navbar-expand-md .offcanvas .offcanvas-header {
    display: none;
  }
  .navbar-expand-md .offcanvas .offcanvas-body {
    display: flex;
    flex-grow: 0;
    padding: 0;
    overflow-y: visible;
  }
}
@media (min-width: 992px) {
  .navbar-expand-lg {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-lg .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-lg .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-lg .navbar-nav .nav-link {
    padding-right: var(--bs-navbar-nav-link-padding-x);
    padding-left: var(--bs-navbar-nav-link-padding-x);
  }
  .navbar-expand-lg .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand-lg .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-lg .navbar-toggler {
    display: none;
  }
  .navbar-expand-lg .offcanvas {
    position: static;
    z-index: auto;
    flex-grow: 1;
    width: auto !important;
    height: auto !important;
    visibility: visible !important;
    background-color: transparent !important;
    border: 0 !important;
    transform: none !important;
    transition: none;
  }
  .navbar-expand-lg .offcanvas .offcanvas-header {
    display: none;
  }
  .navbar-expand-lg .offcanvas .offcanvas-body {
    display: flex;
    flex-grow: 0;
    padding: 0;
    overflow-y: visible;
  }
}
@media (min-width: 1200px) {
  .navbar-expand-xl {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-xl .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-xl .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-xl .navbar-nav .nav-link {
    padding-right: var(--bs-navbar-nav-link-padding-x);
    padding-left: var(--bs-navbar-nav-link-padding-x);
  }
  .navbar-expand-xl .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand-xl .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-xl .navbar-toggler {
    display: none;
  }
  .navbar-expand-xl .offcanvas {
    position: static;
    z-index: auto;
    flex-grow: 1;
    width: auto !important;
    height: auto !important;
    visibility: visible !important;
    background-color: transparent !important;
    border: 0 !important;
    transform: none !important;
    transition: none;
  }
  .navbar-expand-xl .offcanvas .offcanvas-header {
    display: none;
  }
  .navbar-expand-xl .offcanvas .offcanvas-body {
    display: flex;
    flex-grow: 0;
    padding: 0;
    overflow-y: visible;
  }
}
@media (min-width: 1400px) {
  .navbar-expand-xxl {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-xxl .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-xxl .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-xxl .navbar-nav .nav-link {
    padding-right: var(--bs-navbar-nav-link-padding-x);
    padding-left: var(--bs-navbar-nav-link-padding-x);
  }
  .navbar-expand-xxl .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand-xxl .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-xxl .navbar-toggler {
    display: none;
  }
  .navbar-expand-xxl .offcanvas {
    position: static;
    z-index: auto;
    flex-grow: 1;
    width: auto !important;
    height: auto !important;
    visibility: visible !important;
    background-color: transparent !important;
    border: 0 !important;
    transform: none !important;
    transition: none;
  }
  .navbar-expand-xxl .offcanvas .offcanvas-header {
    display: none;
  }
  .navbar-expand-xxl .offcanvas .offcanvas-body {
    display: flex;
    flex-grow: 0;
    padding: 0;
    overflow-y: visible;
  }
}
.navbar-expand {
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.navbar-expand .navbar-nav {
  flex-direction: row;
}
.navbar-expand .navbar-nav .dropdown-menu {
  position: absolute;
}
.navbar-expand .navbar-nav .nav-link {
  padding-right: var(--bs-navbar-nav-link-padding-x);
  padding-left: var(--bs-navbar-nav-link-padding-x);
}
.navbar-expand .navbar-nav-scroll {
  overflow: visible;
}
.navbar-expand .navbar-collapse {
  display: flex !important;
  flex-basis: auto;
}
.navbar-expand .navbar-toggler {
  display: none;
}
.navbar-expand .offcanvas {
  position: static;
  z-index: auto;
  flex-grow: 1;
  width: auto !important;
  height: auto !important;
  visibility: visible !important;
  background-color: transparent !important;
  border: 0 !important;
  transform: none !important;
  transition: none;
}
.navbar-expand .offcanvas .offcanvas-header {
  display: none;
}
.navbar-expand .offcanvas .offcanvas-body {
  display: flex;
  flex-grow: 0;
  padding: 0;
  overflow-y: visible;
}
.navbar-dark,
.navbar[data-bs-theme=dark] {
  --bs-navbar-color: rgba(255, 255, 255, 0.55);
  --bs-navbar-hover-color: rgba(255, 255, 255, 0.75);
  --bs-navbar-disabled-color: rgba(255, 255, 255, 0.25);
  --bs-navbar-active-color: #fff;
  --bs-navbar-brand-color: #fff;
  --bs-navbar-brand-hover-color: #fff;
  --bs-navbar-toggler-border-color: rgba(255, 255, 255, 0.1);
  --bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
[data-bs-theme=dark] .navbar-toggler-icon {
  --bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
.badge {
  --bs-badge-padding-x: 0.375rem;
  --bs-badge-padding-y: 0.1875rem;
  --bs-badge-font-size: 0.875rem;
  --bs-badge-font-weight: 500;
  --bs-badge-color: rgb(50, 50, 66);
  --bs-badge-border-radius: 4px;
  display: inline-block;
  padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
  font-size: var(--bs-badge-font-size);
  font-weight: var(--bs-badge-font-weight);
  line-height: 1;
  color: var(--bs-badge-color);
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--bs-badge-border-radius);
}
.badge:empty {
  display: none;
}
.btn .badge {
  position: relative;
  top: -1px;
}
.alert {
  --bs-alert-bg: transparent;
  --bs-alert-padding-x: 16px;
  --bs-alert-padding-y: 16px;
  --bs-alert-margin-bottom: 1rem;
  --bs-alert-color: inherit;
  --bs-alert-border-color: transparent;
  --bs-alert-border: var(--bs-border-width) solid var(--bs-alert-border-color);
  --bs-alert-border-radius: var(--bs-border-radius);
  --bs-alert-link-color: inherit;
  position: relative;
  padding: var(--bs-alert-padding-y) var(--bs-alert-padding-x);
  margin-bottom: var(--bs-alert-margin-bottom);
  color: var(--bs-alert-color);
  background-color: var(--bs-alert-bg);
  border: var(--bs-alert-border);
  border-radius: var(--bs-alert-border-radius);
}
.alert-heading {
  color: inherit;
}
.alert-link {
  font-weight: 700;
  color: var(--bs-alert-link-color);
}
.alert-dismissible {
  padding-right: 48px;
}
.alert-dismissible .btn-close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  padding: 20px 16px;
}
.alert-primary {
  --bs-alert-color: var(--bs-primary-text-emphasis);
  --bs-alert-bg: var(--bs-primary-bg-subtle);
  --bs-alert-border-color: var(--bs-primary-border-subtle);
  --bs-alert-link-color: var(--bs-primary-text-emphasis);
}
.alert-secondary {
  --bs-alert-color: var(--bs-secondary-text-emphasis);
  --bs-alert-bg: var(--bs-secondary-bg-subtle);
  --bs-alert-border-color: var(--bs-secondary-border-subtle);
  --bs-alert-link-color: var(--bs-secondary-text-emphasis);
}
.alert-success {
  --bs-alert-color: var(--bs-success-text-emphasis);
  --bs-alert-bg: var(--bs-success-bg-subtle);
  --bs-alert-border-color: var(--bs-success-border-subtle);
  --bs-alert-link-color: var(--bs-success-text-emphasis);
}
.alert-info {
  --bs-alert-color: var(--bs-info-text-emphasis);
  --bs-alert-bg: var(--bs-info-bg-subtle);
  --bs-alert-border-color: var(--bs-info-border-subtle);
  --bs-alert-link-color: var(--bs-info-text-emphasis);
}
.alert-warning {
  --bs-alert-color: var(--bs-warning-text-emphasis);
  --bs-alert-bg: var(--bs-warning-bg-subtle);
  --bs-alert-border-color: var(--bs-warning-border-subtle);
  --bs-alert-link-color: var(--bs-warning-text-emphasis);
}
.alert-danger {
  --bs-alert-color: var(--bs-danger-text-emphasis);
  --bs-alert-bg: var(--bs-danger-bg-subtle);
  --bs-alert-border-color: var(--bs-danger-border-subtle);
  --bs-alert-link-color: var(--bs-danger-text-emphasis);
}
.alert-light {
  --bs-alert-color: var(--bs-light-text-emphasis);
  --bs-alert-bg: var(--bs-light-bg-subtle);
  --bs-alert-border-color: var(--bs-light-border-subtle);
  --bs-alert-link-color: var(--bs-light-text-emphasis);
}
.alert-dark {
  --bs-alert-color: var(--bs-dark-text-emphasis);
  --bs-alert-bg: var(--bs-dark-bg-subtle);
  --bs-alert-border-color: var(--bs-dark-border-subtle);
  --bs-alert-link-color: var(--bs-dark-text-emphasis);
}
@keyframes progress-bar-stripes {
  0% {
    background-position-x: 1rem;
  }
}
.progress,
.progress-stacked {
  --bs-progress-height: 1rem;
  --bs-progress-font-size: 0.65625rem;
  --bs-progress-bg: var(--bs-secondary-bg);
  --bs-progress-border-radius: var(--bs-border-radius);
  --bs-progress-box-shadow: var(--bs-box-shadow-inset);
  --bs-progress-bar-color: #fff;
  --bs-progress-bar-bg: rgb(73, 73, 242);
  --bs-progress-bar-transition: width 0.6s ease;
  display: flex;
  height: var(--bs-progress-height);
  overflow: hidden;
  font-size: var(--bs-progress-font-size);
  background-color: var(--bs-progress-bg);
  border-radius: var(--bs-progress-border-radius);
}
.progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: var(--bs-progress-bar-color);
  text-align: center;
  white-space: nowrap;
  background-color: var(--bs-progress-bar-bg);
  transition: var(--bs-progress-bar-transition);
}
@media (prefers-reduced-motion: reduce) {
  .progress-bar {
    transition: none;
  }
}
.progress-bar-striped {
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: var(--bs-progress-height) var(--bs-progress-height);
}
.progress-stacked > .progress {
  overflow: visible;
}
.progress-stacked > .progress > .progress-bar {
  width: 100%;
}
.progress-bar-animated {
  animation: 1s linear infinite progress-bar-stripes;
}
@media (prefers-reduced-motion: reduce) {
  .progress-bar-animated {
    animation: none;
  }
}
.list-group {
  --bs-list-group-color: var(--bs-body-color);
  --bs-list-group-bg: var(--bs-body-bg);
  --bs-list-group-border-color: var(--bs-border-color);
  --bs-list-group-border-width: var(--bs-border-width);
  --bs-list-group-border-radius: var(--bs-border-radius);
  --bs-list-group-item-padding-x: 16px;
  --bs-list-group-item-padding-y: 16px;
  --bs-list-group-action-color: var(--bs-secondary-color);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-tertiary-bg);
  --bs-list-group-action-active-color: var(--bs-body-color);
  --bs-list-group-action-active-bg: var(--bs-secondary-bg);
  --bs-list-group-disabled-color: var(--bs-secondary-color);
  --bs-list-group-disabled-bg: var(--bs-body-bg);
  --bs-list-group-active-color: #fff;
  --bs-list-group-active-bg: rgb(73, 73, 242);
  --bs-list-group-active-border-color: rgb(73, 73, 242);
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: var(--bs-list-group-border-radius);
}
.list-group-numbered {
  list-style-type: none;
  counter-reset: section;
}
.list-group-numbered > .list-group-item::before {
  content: counters(section, ".") ". ";
  counter-increment: section;
}
.list-group-item-action {
  width: 100%;
  color: var(--bs-list-group-action-color);
  text-align: inherit;
}
.list-group-item-action:hover, .list-group-item-action:focus {
  z-index: 1;
  color: var(--bs-list-group-action-hover-color);
  text-decoration: none;
  background-color: var(--bs-list-group-action-hover-bg);
}
.list-group-item-action:active {
  color: var(--bs-list-group-action-active-color);
  background-color: var(--bs-list-group-action-active-bg);
}
.list-group-item {
  position: relative;
  display: block;
  padding: var(--bs-list-group-item-padding-y) var(--bs-list-group-item-padding-x);
  color: var(--bs-list-group-color);
  background-color: var(--bs-list-group-bg);
  border: var(--bs-list-group-border-width) solid var(--bs-list-group-border-color);
}
.list-group-item:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.list-group-item:last-child {
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
}
.list-group-item.disabled, .list-group-item:disabled {
  color: var(--bs-list-group-disabled-color);
  pointer-events: none;
  background-color: var(--bs-list-group-disabled-bg);
}
.list-group-item.active {
  z-index: 2;
  color: var(--bs-list-group-active-color);
  background-color: var(--bs-list-group-active-bg);
  border-color: var(--bs-list-group-active-border-color);
}
.list-group-item + .list-group-item {
  border-top-width: 0;
}
.list-group-item + .list-group-item.active {
  margin-top: calc(-1 * var(--bs-list-group-border-width));
  border-top-width: var(--bs-list-group-border-width);
}
.list-group-horizontal {
  flex-direction: row;
}
.list-group-horizontal > .list-group-item:first-child:not(:last-child) {
  border-bottom-left-radius: var(--bs-list-group-border-radius);
  border-top-right-radius: 0;
}
.list-group-horizontal > .list-group-item:last-child:not(:first-child) {
  border-top-right-radius: var(--bs-list-group-border-radius);
  border-bottom-left-radius: 0;
}
.list-group-horizontal > .list-group-item.active {
  margin-top: 0;
}
.list-group-horizontal > .list-group-item + .list-group-item {
  border-top-width: var(--bs-list-group-border-width);
  border-left-width: 0;
}
.list-group-horizontal > .list-group-item + .list-group-item.active {
  margin-left: calc(-1 * var(--bs-list-group-border-width));
  border-left-width: var(--bs-list-group-border-width);
}
@media (min-width: 576px) {
  .list-group-horizontal-sm {
    flex-direction: row;
  }
  .list-group-horizontal-sm > .list-group-item:first-child:not(:last-child) {
    border-bottom-left-radius: var(--bs-list-group-border-radius);
    border-top-right-radius: 0;
  }
  .list-group-horizontal-sm > .list-group-item:last-child:not(:first-child) {
    border-top-right-radius: var(--bs-list-group-border-radius);
    border-bottom-left-radius: 0;
  }
  .list-group-horizontal-sm > .list-group-item.active {
    margin-top: 0;
  }
  .list-group-horizontal-sm > .list-group-item + .list-group-item {
    border-top-width: var(--bs-list-group-border-width);
    border-left-width: 0;
  }
  .list-group-horizontal-sm > .list-group-item + .list-group-item.active {
    margin-left: calc(-1 * var(--bs-list-group-border-width));
    border-left-width: var(--bs-list-group-border-width);
  }
}
@media (min-width: 768px) {
  .list-group-horizontal-md {
    flex-direction: row;
  }
  .list-group-horizontal-md > .list-group-item:first-child:not(:last-child) {
    border-bottom-left-radius: var(--bs-list-group-border-radius);
    border-top-right-radius: 0;
  }
  .list-group-horizontal-md > .list-group-item:last-child:not(:first-child) {
    border-top-right-radius: var(--bs-list-group-border-radius);
    border-bottom-left-radius: 0;
  }
  .list-group-horizontal-md > .list-group-item.active {
    margin-top: 0;
  }
  .list-group-horizontal-md > .list-group-item + .list-group-item {
    border-top-width: var(--bs-list-group-border-width);
    border-left-width: 0;
  }
  .list-group-horizontal-md > .list-group-item + .list-group-item.active {
    margin-left: calc(-1 * var(--bs-list-group-border-width));
    border-left-width: var(--bs-list-group-border-width);
  }
}
@media (min-width: 992px) {
  .list-group-horizontal-lg {
    flex-direction: row;
  }
  .list-group-horizontal-lg > .list-group-item:first-child:not(:last-child) {
    border-bottom-left-radius: var(--bs-list-group-border-radius);
    border-top-right-radius: 0;
  }
  .list-group-horizontal-lg > .list-group-item:last-child:not(:first-child) {
    border-top-right-radius: var(--bs-list-group-border-radius);
    border-bottom-left-radius: 0;
  }
  .list-group-horizontal-lg > .list-group-item.active {
    margin-top: 0;
  }
  .list-group-horizontal-lg > .list-group-item + .list-group-item {
    border-top-width: var(--bs-list-group-border-width);
    border-left-width: 0;
  }
  .list-group-horizontal-lg > .list-group-item + .list-group-item.active {
    margin-left: calc(-1 * var(--bs-list-group-border-width));
    border-left-width: var(--bs-list-group-border-width);
  }
}
@media (min-width: 1200px) {
  .list-group-horizontal-xl {
    flex-direction: row;
  }
  .list-group-horizontal-xl > .list-group-item:first-child:not(:last-child) {
    border-bottom-left-radius: var(--bs-list-group-border-radius);
    border-top-right-radius: 0;
  }
  .list-group-horizontal-xl > .list-group-item:last-child:not(:first-child) {
    border-top-right-radius: var(--bs-list-group-border-radius);
    border-bottom-left-radius: 0;
  }
  .list-group-horizontal-xl > .list-group-item.active {
    margin-top: 0;
  }
  .list-group-horizontal-xl > .list-group-item + .list-group-item {
    border-top-width: var(--bs-list-group-border-width);
    border-left-width: 0;
  }
  .list-group-horizontal-xl > .list-group-item + .list-group-item.active {
    margin-left: calc(-1 * var(--bs-list-group-border-width));
    border-left-width: var(--bs-list-group-border-width);
  }
}
@media (min-width: 1400px) {
  .list-group-horizontal-xxl {
    flex-direction: row;
  }
  .list-group-horizontal-xxl > .list-group-item:first-child:not(:last-child) {
    border-bottom-left-radius: var(--bs-list-group-border-radius);
    border-top-right-radius: 0;
  }
  .list-group-horizontal-xxl > .list-group-item:last-child:not(:first-child) {
    border-top-right-radius: var(--bs-list-group-border-radius);
    border-bottom-left-radius: 0;
  }
  .list-group-horizontal-xxl > .list-group-item.active {
    margin-top: 0;
  }
  .list-group-horizontal-xxl > .list-group-item + .list-group-item {
    border-top-width: var(--bs-list-group-border-width);
    border-left-width: 0;
  }
  .list-group-horizontal-xxl > .list-group-item + .list-group-item.active {
    margin-left: calc(-1 * var(--bs-list-group-border-width));
    border-left-width: var(--bs-list-group-border-width);
  }
}
.list-group-flush {
  border-radius: 0;
}
.list-group-flush > .list-group-item {
  border-width: 0 0 var(--bs-list-group-border-width);
}
.list-group-flush > .list-group-item:last-child {
  border-bottom-width: 0;
}
.list-group-item-primary {
  --bs-list-group-color: var(--bs-primary-text-emphasis);
  --bs-list-group-bg: var(--bs-primary-bg-subtle);
  --bs-list-group-border-color: var(--bs-primary-border-subtle);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-primary-border-subtle);
  --bs-list-group-action-active-color: var(--bs-emphasis-color);
  --bs-list-group-action-active-bg: var(--bs-primary-border-subtle);
  --bs-list-group-active-color: var(--bs-primary-bg-subtle);
  --bs-list-group-active-bg: var(--bs-primary-text-emphasis);
  --bs-list-group-active-border-color: var(--bs-primary-text-emphasis);
}
.list-group-item-secondary {
  --bs-list-group-color: var(--bs-secondary-text-emphasis);
  --bs-list-group-bg: var(--bs-secondary-bg-subtle);
  --bs-list-group-border-color: var(--bs-secondary-border-subtle);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-secondary-border-subtle);
  --bs-list-group-action-active-color: var(--bs-emphasis-color);
  --bs-list-group-action-active-bg: var(--bs-secondary-border-subtle);
  --bs-list-group-active-color: var(--bs-secondary-bg-subtle);
  --bs-list-group-active-bg: var(--bs-secondary-text-emphasis);
  --bs-list-group-active-border-color: var(--bs-secondary-text-emphasis);
}
.list-group-item-success {
  --bs-list-group-color: var(--bs-success-text-emphasis);
  --bs-list-group-bg: var(--bs-success-bg-subtle);
  --bs-list-group-border-color: var(--bs-success-border-subtle);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-success-border-subtle);
  --bs-list-group-action-active-color: var(--bs-emphasis-color);
  --bs-list-group-action-active-bg: var(--bs-success-border-subtle);
  --bs-list-group-active-color: var(--bs-success-bg-subtle);
  --bs-list-group-active-bg: var(--bs-success-text-emphasis);
  --bs-list-group-active-border-color: var(--bs-success-text-emphasis);
}
.list-group-item-info {
  --bs-list-group-color: var(--bs-info-text-emphasis);
  --bs-list-group-bg: var(--bs-info-bg-subtle);
  --bs-list-group-border-color: var(--bs-info-border-subtle);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-info-border-subtle);
  --bs-list-group-action-active-color: var(--bs-emphasis-color);
  --bs-list-group-action-active-bg: var(--bs-info-border-subtle);
  --bs-list-group-active-color: var(--bs-info-bg-subtle);
  --bs-list-group-active-bg: var(--bs-info-text-emphasis);
  --bs-list-group-active-border-color: var(--bs-info-text-emphasis);
}
.list-group-item-warning {
  --bs-list-group-color: var(--bs-warning-text-emphasis);
  --bs-list-group-bg: var(--bs-warning-bg-subtle);
  --bs-list-group-border-color: var(--bs-warning-border-subtle);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-warning-border-subtle);
  --bs-list-group-action-active-color: var(--bs-emphasis-color);
  --bs-list-group-action-active-bg: var(--bs-warning-border-subtle);
  --bs-list-group-active-color: var(--bs-warning-bg-subtle);
  --bs-list-group-active-bg: var(--bs-warning-text-emphasis);
  --bs-list-group-active-border-color: var(--bs-warning-text-emphasis);
}
.list-group-item-danger {
  --bs-list-group-color: var(--bs-danger-text-emphasis);
  --bs-list-group-bg: var(--bs-danger-bg-subtle);
  --bs-list-group-border-color: var(--bs-danger-border-subtle);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-danger-border-subtle);
  --bs-list-group-action-active-color: var(--bs-emphasis-color);
  --bs-list-group-action-active-bg: var(--bs-danger-border-subtle);
  --bs-list-group-active-color: var(--bs-danger-bg-subtle);
  --bs-list-group-active-bg: var(--bs-danger-text-emphasis);
  --bs-list-group-active-border-color: var(--bs-danger-text-emphasis);
}
.list-group-item-light {
  --bs-list-group-color: var(--bs-light-text-emphasis);
  --bs-list-group-bg: var(--bs-light-bg-subtle);
  --bs-list-group-border-color: var(--bs-light-border-subtle);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-light-border-subtle);
  --bs-list-group-action-active-color: var(--bs-emphasis-color);
  --bs-list-group-action-active-bg: var(--bs-light-border-subtle);
  --bs-list-group-active-color: var(--bs-light-bg-subtle);
  --bs-list-group-active-bg: var(--bs-light-text-emphasis);
  --bs-list-group-active-border-color: var(--bs-light-text-emphasis);
}
.list-group-item-dark {
  --bs-list-group-color: var(--bs-dark-text-emphasis);
  --bs-list-group-bg: var(--bs-dark-bg-subtle);
  --bs-list-group-border-color: var(--bs-dark-border-subtle);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-dark-border-subtle);
  --bs-list-group-action-active-color: var(--bs-emphasis-color);
  --bs-list-group-action-active-bg: var(--bs-dark-border-subtle);
  --bs-list-group-active-color: var(--bs-dark-bg-subtle);
  --bs-list-group-active-bg: var(--bs-dark-text-emphasis);
  --bs-list-group-active-border-color: var(--bs-dark-text-emphasis);
}
.spinner-grow,
.spinner-border {
  display: inline-block;
  width: var(--bs-spinner-width);
  height: var(--bs-spinner-height);
  vertical-align: var(--bs-spinner-vertical-align);
  border-radius: 50%;
  animation: var(--bs-spinner-animation-speed) linear infinite var(--bs-spinner-animation-name);
}
@keyframes spinner-border {
  to {
    transform: rotate(360deg) /* rtl:ignore */;
  }
}
.spinner-border {
  --bs-spinner-width: 2rem;
  --bs-spinner-height: 2rem;
  --bs-spinner-vertical-align: -0.125em;
  --bs-spinner-border-width: 0.25em;
  --bs-spinner-animation-speed: 0.75s;
  --bs-spinner-animation-name: spinner-border;
  border: var(--bs-spinner-border-width) solid currentcolor;
  border-right-color: transparent;
}
.spinner-border-sm {
  --bs-spinner-width: 1rem;
  --bs-spinner-height: 1rem;
  --bs-spinner-border-width: 0.2em;
}
@keyframes spinner-grow {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: none;
  }
}
.spinner-grow {
  --bs-spinner-width: 2rem;
  --bs-spinner-height: 2rem;
  --bs-spinner-vertical-align: -0.125em;
  --bs-spinner-animation-speed: 0.75s;
  --bs-spinner-animation-name: spinner-grow;
  background-color: currentcolor;
  opacity: 0;
}
.spinner-grow-sm {
  --bs-spinner-width: 1rem;
  --bs-spinner-height: 1rem;
}
@media (prefers-reduced-motion: reduce) {
  .spinner-border,
  .spinner-grow {
    --bs-spinner-animation-speed: 1.5s;
  }
}
.placeholder {
  display: inline-block;
  min-height: 1em;
  vertical-align: middle;
  cursor: wait;
  background-color: currentcolor;
  opacity: 1;
}
.placeholder.btn::before {
  display: inline-block;
  content: "";
}
.placeholder-xs {
  min-height: 0.6em;
}
.placeholder-sm {
  min-height: 0.8em;
}
.placeholder-lg {
  min-height: 1.2em;
}
.placeholder-glow .placeholder {
  animation: placeholder-glow 2s ease-in-out infinite;
}
@keyframes placeholder-glow {
  50% {
    opacity: 0.5;
  }
}
.placeholder-wave {
  mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.5) 75%, #000 95%);
  mask-size: 200% 100%;
  animation: placeholder-wave 2s linear infinite;
}
@keyframes placeholder-wave {
  100% {
    mask-position: -200% 0%;
  }
}
.clearfix::after {
  display: block;
  clear: both;
  content: "";
}
.text-bg-primary {
  color: #fff !important;
  background-color: RGBA(73, 73, 242, var(--bs-bg-opacity, 1)) !important;
}
.text-bg-secondary {
  color: #000 !important;
  background-color: RGBA(240, 240, 245, var(--bs-bg-opacity, 1)) !important;
}
.text-bg-success {
  color: #fff !important;
  background-color: RGBA(40, 156, 92, var(--bs-bg-opacity, 1)) !important;
}
.text-bg-info {
  color: #000 !important;
  background-color: RGBA(13, 202, 240, var(--bs-bg-opacity, 1)) !important;
}
.text-bg-warning {
  color: #000 !important;
  background-color: RGBA(255, 193, 7, var(--bs-bg-opacity, 1)) !important;
}
.text-bg-danger {
  color: #fff !important;
  background-color: RGBA(219, 44, 73, var(--bs-bg-opacity, 1)) !important;
}
.text-bg-light {
  color: #000 !important;
  background-color: RGBA(240, 240, 245, var(--bs-bg-opacity, 1)) !important;
}
.text-bg-dark {
  color: #fff !important;
  background-color: RGBA(27, 28, 38, var(--bs-bg-opacity, 1)) !important;
}
.link-primary {
  color: RGBA(var(--bs-primary-rgb), var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(var(--bs-primary-rgb), var(--bs-link-underline-opacity, 1)) !important;
}
.link-primary:hover, .link-primary:focus {
  color: RGBA(58, 58, 194, var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(58, 58, 194, var(--bs-link-underline-opacity, 1)) !important;
}
.link-secondary {
  color: RGBA(var(--bs-secondary-rgb), var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(var(--bs-secondary-rgb), var(--bs-link-underline-opacity, 1)) !important;
}
.link-secondary:hover, .link-secondary:focus {
  color: RGBA(243, 243, 247, var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(243, 243, 247, var(--bs-link-underline-opacity, 1)) !important;
}
.link-success {
  color: RGBA(var(--bs-success-rgb), var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(var(--bs-success-rgb), var(--bs-link-underline-opacity, 1)) !important;
}
.link-success:hover, .link-success:focus {
  color: RGBA(32, 125, 74, var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(32, 125, 74, var(--bs-link-underline-opacity, 1)) !important;
}
.link-info {
  color: RGBA(var(--bs-info-rgb), var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(var(--bs-info-rgb), var(--bs-link-underline-opacity, 1)) !important;
}
.link-info:hover, .link-info:focus {
  color: RGBA(61, 213, 243, var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(61, 213, 243, var(--bs-link-underline-opacity, 1)) !important;
}
.link-warning {
  color: RGBA(var(--bs-warning-rgb), var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(var(--bs-warning-rgb), var(--bs-link-underline-opacity, 1)) !important;
}
.link-warning:hover, .link-warning:focus {
  color: RGBA(255, 205, 57, var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(255, 205, 57, var(--bs-link-underline-opacity, 1)) !important;
}
.link-danger {
  color: RGBA(var(--bs-danger-rgb), var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(var(--bs-danger-rgb), var(--bs-link-underline-opacity, 1)) !important;
}
.link-danger:hover, .link-danger:focus {
  color: RGBA(175, 35, 58, var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(175, 35, 58, var(--bs-link-underline-opacity, 1)) !important;
}
.link-light {
  color: RGBA(var(--bs-light-rgb), var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(var(--bs-light-rgb), var(--bs-link-underline-opacity, 1)) !important;
}
.link-light:hover, .link-light:focus {
  color: RGBA(243, 243, 247, var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(243, 243, 247, var(--bs-link-underline-opacity, 1)) !important;
}
.link-dark {
  color: RGBA(var(--bs-dark-rgb), var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(var(--bs-dark-rgb), var(--bs-link-underline-opacity, 1)) !important;
}
.link-dark:hover, .link-dark:focus {
  color: RGBA(22, 22, 30, var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(22, 22, 30, var(--bs-link-underline-opacity, 1)) !important;
}
.link-body-emphasis {
  color: RGBA(var(--bs-emphasis-color-rgb), var(--bs-link-opacity, 1)) !important;
  text-decoration-color: RGBA(var(--bs-emphasis-color-rgb), var(--bs-link-underline-opacity, 1)) !important;
}
.link-body-emphasis:hover, .link-body-emphasis:focus {
  color: RGBA(var(--bs-emphasis-color-rgb), var(--bs-link-opacity, 0.75)) !important;
  text-decoration-color: RGBA(var(--bs-emphasis-color-rgb), var(--bs-link-underline-opacity, 0.75)) !important;
}
.focus-ring:focus {
  outline: 0;
  box-shadow: var(--bs-focus-ring-x, 0) var(--bs-focus-ring-y, 0) var(--bs-focus-ring-blur, 0) var(--bs-focus-ring-width) var(--bs-focus-ring-color);
}
.icon-link {
  display: inline-flex;
  gap: 0.375rem;
  align-items: center;
  text-decoration-color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 0.5));
  text-underline-offset: 0.25em;
  backface-visibility: hidden;
}
.icon-link > .bi {
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  fill: currentcolor;
  transition: 0.2s ease-in-out transform;
}
@media (prefers-reduced-motion: reduce) {
  .icon-link > .bi {
    transition: none;
  }
}
.icon-link-hover:hover > .bi, .icon-link-hover:focus-visible > .bi {
  transform: var(--bs-icon-link-transform, translate3d(0.25em, 0, 0));
}
.ratio {
  position: relative;
  width: 100%;
}
.ratio::before {
  display: block;
  padding-top: var(--bs-aspect-ratio);
  content: "";
}
.ratio > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.ratio-1x1 {
  --bs-aspect-ratio: 100%;
}
.ratio-4x3 {
  --bs-aspect-ratio: 75%;
}
.ratio-16x9 {
  --bs-aspect-ratio: 56.25%;
}
.ratio-21x9 {
  --bs-aspect-ratio: 42.8571428571%;
}
.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
.fixed-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
}
.sticky-top {
  position: sticky;
  top: 0;
  z-index: 1020;
}
.sticky-bottom {
  position: sticky;
  bottom: 0;
  z-index: 1020;
}
@media (min-width: 576px) {
  .sticky-sm-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  .sticky-sm-bottom {
    position: sticky;
    bottom: 0;
    z-index: 1020;
  }
}
@media (min-width: 768px) {
  .sticky-md-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  .sticky-md-bottom {
    position: sticky;
    bottom: 0;
    z-index: 1020;
  }
}
@media (min-width: 992px) {
  .sticky-lg-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  .sticky-lg-bottom {
    position: sticky;
    bottom: 0;
    z-index: 1020;
  }
}
@media (min-width: 1200px) {
  .sticky-xl-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  .sticky-xl-bottom {
    position: sticky;
    bottom: 0;
    z-index: 1020;
  }
}
@media (min-width: 1400px) {
  .sticky-xxl-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  .sticky-xxl-bottom {
    position: sticky;
    bottom: 0;
    z-index: 1020;
  }
}
.hstack {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
}
.vstack {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-self: stretch;
}
.visually-hidden,
.visually-hidden-focusable:not(:focus):not(:focus-within) {
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
.visually-hidden:not(caption),
.visually-hidden-focusable:not(:focus):not(:focus-within):not(caption) {
  position: absolute !important;
}
.stretched-link::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  content: "";
}
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vr {
  display: inline-block;
  align-self: stretch;
  width: 1px;
  min-height: 1em;
  background-color: currentcolor;
  opacity: 0.25;
}
.align-baseline {
  vertical-align: baseline !important;
}
.align-top {
  vertical-align: top !important;
}
.align-middle {
  vertical-align: middle !important;
}
.align-bottom {
  vertical-align: bottom !important;
}
.align-text-bottom {
  vertical-align: text-bottom !important;
}
.align-text-top {
  vertical-align: text-top !important;
}
.float-start {
  float: left !important;
}
.float-end {
  float: right !important;
}
.float-none {
  float: none !important;
}
.object-fit-contain {
  object-fit: contain !important;
}
.object-fit-cover {
  object-fit: cover !important;
}
.object-fit-fill {
  object-fit: fill !important;
}
.object-fit-scale {
  object-fit: scale-down !important;
}
.object-fit-none {
  object-fit: none !important;
}
.opacity-0 {
  opacity: 0 !important;
}
.opacity-25 {
  opacity: 0.25 !important;
}
.opacity-50 {
  opacity: 0.5 !important;
}
.opacity-75 {
  opacity: 0.75 !important;
}
.opacity-100 {
  opacity: 1 !important;
}
.overflow-auto {
  overflow: auto !important;
}
.overflow-hidden {
  overflow: hidden !important;
}
.overflow-visible {
  overflow: visible !important;
}
.overflow-scroll {
  overflow: scroll !important;
}
.overflow-x-auto {
  overflow-x: auto !important;
}
.overflow-x-hidden {
  overflow-x: hidden !important;
}
.overflow-x-visible {
  overflow-x: visible !important;
}
.overflow-x-scroll {
  overflow-x: scroll !important;
}
.overflow-y-auto {
  overflow-y: auto !important;
}
.overflow-y-hidden {
  overflow-y: hidden !important;
}
.overflow-y-visible {
  overflow-y: visible !important;
}
.overflow-y-scroll {
  overflow-y: scroll !important;
}
.d-inline {
  display: inline !important;
}
.d-inline-block {
  display: inline-block !important;
}
.d-block {
  display: block !important;
}
.d-grid {
  display: grid !important;
}
.d-inline-grid {
  display: inline-grid !important;
}
.d-table {
  display: table !important;
}
.d-table-row {
  display: table-row !important;
}
.d-table-cell {
  display: table-cell !important;
}
.d-flex {
  display: flex !important;
}
.d-inline-flex {
  display: inline-flex !important;
}
.d-none {
  display: none !important;
}
.shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}
.shadow-sm {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
}
.shadow-lg {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08) !important;
}
.shadow-none {
  box-shadow: none !important;
}
.focus-ring-primary {
  --bs-focus-ring-color: rgba(var(--bs-primary-rgb), var(--bs-focus-ring-opacity));
}
.focus-ring-secondary {
  --bs-focus-ring-color: rgba(var(--bs-secondary-rgb), var(--bs-focus-ring-opacity));
}
.focus-ring-success {
  --bs-focus-ring-color: rgba(var(--bs-success-rgb), var(--bs-focus-ring-opacity));
}
.focus-ring-info {
  --bs-focus-ring-color: rgba(var(--bs-info-rgb), var(--bs-focus-ring-opacity));
}
.focus-ring-warning {
  --bs-focus-ring-color: rgba(var(--bs-warning-rgb), var(--bs-focus-ring-opacity));
}
.focus-ring-danger {
  --bs-focus-ring-color: rgba(var(--bs-danger-rgb), var(--bs-focus-ring-opacity));
}
.focus-ring-light {
  --bs-focus-ring-color: rgba(var(--bs-light-rgb), var(--bs-focus-ring-opacity));
}
.focus-ring-dark {
  --bs-focus-ring-color: rgba(var(--bs-dark-rgb), var(--bs-focus-ring-opacity));
}
.position-static {
  position: static !important;
}
.position-relative {
  position: relative !important;
}
.position-absolute {
  position: absolute !important;
}
.position-fixed {
  position: fixed !important;
}
.position-sticky {
  position: sticky !important;
}
.top-0 {
  top: 0 !important;
}
.top-50 {
  top: 50% !important;
}
.top-100 {
  top: 100% !important;
}
.bottom-0 {
  bottom: 0 !important;
}
.bottom-50 {
  bottom: 50% !important;
}
.bottom-100 {
  bottom: 100% !important;
}
.start-0 {
  left: 0 !important;
}
.start-50 {
  left: 50% !important;
}
.start-100 {
  left: 100% !important;
}
.end-0 {
  right: 0 !important;
}
.end-50 {
  right: 50% !important;
}
.end-100 {
  right: 100% !important;
}
.translate-middle {
  transform: translate(-50%, -50%) !important;
}
.translate-middle-x {
  transform: translateX(-50%) !important;
}
.translate-middle-y {
  transform: translateY(-50%) !important;
}
.border {
  border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}
.border-0 {
  border: 0 !important;
}
.border-top {
  border-top: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}
.border-top-0 {
  border-top: 0 !important;
}
.border-end {
  border-right: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}
.border-end-0 {
  border-right: 0 !important;
}
.border-bottom {
  border-bottom: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}
.border-bottom-0 {
  border-bottom: 0 !important;
}
.border-start {
  border-left: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}
.border-start-0 {
  border-left: 0 !important;
}
.border-primary {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-primary-rgb), var(--bs-border-opacity)) !important;
}
.border-secondary {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-secondary-rgb), var(--bs-border-opacity)) !important;
}
.border-success {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-success-rgb), var(--bs-border-opacity)) !important;
}
.border-info {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-info-rgb), var(--bs-border-opacity)) !important;
}
.border-warning {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-warning-rgb), var(--bs-border-opacity)) !important;
}
.border-danger {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-danger-rgb), var(--bs-border-opacity)) !important;
}
.border-light {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-light-rgb), var(--bs-border-opacity)) !important;
}
.border-dark {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-dark-rgb), var(--bs-border-opacity)) !important;
}
.border-black {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-black-rgb), var(--bs-border-opacity)) !important;
}
.border-white {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-white-rgb), var(--bs-border-opacity)) !important;
}
.border-primary-subtle {
  border-color: var(--bs-primary-border-subtle) !important;
}
.border-secondary-subtle {
  border-color: var(--bs-secondary-border-subtle) !important;
}
.border-success-subtle {
  border-color: var(--bs-success-border-subtle) !important;
}
.border-info-subtle {
  border-color: var(--bs-info-border-subtle) !important;
}
.border-warning-subtle {
  border-color: var(--bs-warning-border-subtle) !important;
}
.border-danger-subtle {
  border-color: var(--bs-danger-border-subtle) !important;
}
.border-light-subtle {
  border-color: var(--bs-light-border-subtle) !important;
}
.border-dark-subtle {
  border-color: var(--bs-dark-border-subtle) !important;
}
.border-1 {
  border-width: 1px !important;
}
.border-2 {
  border-width: 2px !important;
}
.border-3 {
  border-width: 3px !important;
}
.border-4 {
  border-width: 4px !important;
}
.border-5 {
  border-width: 5px !important;
}
.border-opacity-10 {
  --bs-border-opacity: 0.1;
}
.border-opacity-25 {
  --bs-border-opacity: 0.25;
}
.border-opacity-50 {
  --bs-border-opacity: 0.5;
}
.border-opacity-75 {
  --bs-border-opacity: 0.75;
}
.border-opacity-100 {
  --bs-border-opacity: 1;
}
.w-25 {
  width: 25% !important;
}
.w-50 {
  width: 50% !important;
}
.w-75 {
  width: 75% !important;
}
.w-100 {
  width: 100% !important;
}
.w-auto {
  width: auto !important;
}
.mw-100 {
  max-width: 100% !important;
}
.vw-100 {
  width: 100vw !important;
}
.min-vw-100 {
  min-width: 100vw !important;
}
.h-25 {
  height: 25% !important;
}
.h-50 {
  height: 50% !important;
}
.h-75 {
  height: 75% !important;
}
.h-100 {
  height: 100% !important;
}
.h-auto {
  height: auto !important;
}
.mh-100 {
  max-height: 100% !important;
}
.vh-100 {
  height: 100vh !important;
}
.min-vh-100 {
  min-height: 100vh !important;
}
.flex-fill {
  flex: 1 1 auto !important;
}
.flex-row {
  flex-direction: row !important;
}
.flex-column {
  flex-direction: column !important;
}
.flex-row-reverse {
  flex-direction: row-reverse !important;
}
.flex-column-reverse {
  flex-direction: column-reverse !important;
}
.flex-grow-0 {
  flex-grow: 0 !important;
}
.flex-grow-1 {
  flex-grow: 1 !important;
}
.flex-shrink-0 {
  flex-shrink: 0 !important;
}
.flex-shrink-1 {
  flex-shrink: 1 !important;
}
.flex-wrap {
  flex-wrap: wrap !important;
}
.flex-nowrap {
  flex-wrap: nowrap !important;
}
.flex-wrap-reverse {
  flex-wrap: wrap-reverse !important;
}
.justify-content-start {
  justify-content: flex-start !important;
}
.justify-content-end {
  justify-content: flex-end !important;
}
.justify-content-center {
  justify-content: center !important;
}
.justify-content-between {
  justify-content: space-between !important;
}
.justify-content-around {
  justify-content: space-around !important;
}
.justify-content-evenly {
  justify-content: space-evenly !important;
}
.align-items-start {
  align-items: flex-start !important;
}
.align-items-end {
  align-items: flex-end !important;
}
.align-items-center {
  align-items: center !important;
}
.align-items-baseline {
  align-items: baseline !important;
}
.align-items-stretch {
  align-items: stretch !important;
}
.align-content-start {
  align-content: flex-start !important;
}
.align-content-end {
  align-content: flex-end !important;
}
.align-content-center {
  align-content: center !important;
}
.align-content-between {
  align-content: space-between !important;
}
.align-content-around {
  align-content: space-around !important;
}
.align-content-stretch {
  align-content: stretch !important;
}
.align-self-auto {
  align-self: auto !important;
}
.align-self-start {
  align-self: flex-start !important;
}
.align-self-end {
  align-self: flex-end !important;
}
.align-self-center {
  align-self: center !important;
}
.align-self-baseline {
  align-self: baseline !important;
}
.align-self-stretch {
  align-self: stretch !important;
}
.order-first {
  order: -1 !important;
}
.order-0 {
  order: 0 !important;
}
.order-1 {
  order: 1 !important;
}
.order-2 {
  order: 2 !important;
}
.order-3 {
  order: 3 !important;
}
.order-4 {
  order: 4 !important;
}
.order-5 {
  order: 5 !important;
}
.order-last {
  order: 6 !important;
}
.m-0 {
  margin: 0 !important;
}
.m-1 {
  margin: 4px !important;
}
.m-2 {
  margin: 8px !important;
}
.m-3 {
  margin: 16px !important;
}
.m-4 {
  margin: 24px !important;
}
.m-5 {
  margin: 48px !important;
}
.m-auto {
  margin: auto !important;
}
.mx-0 {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.mx-1 {
  margin-right: 4px !important;
  margin-left: 4px !important;
}
.mx-2 {
  margin-right: 8px !important;
  margin-left: 8px !important;
}
.mx-3 {
  margin-right: 16px !important;
  margin-left: 16px !important;
}
.mx-4 {
  margin-right: 24px !important;
  margin-left: 24px !important;
}
.mx-5 {
  margin-right: 48px !important;
  margin-left: 48px !important;
}
.mx-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}
.my-0 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.my-1 {
  margin-top: 4px !important;
  margin-bottom: 4px !important;
}
.my-2 {
  margin-top: 8px !important;
  margin-bottom: 8px !important;
}
.my-3 {
  margin-top: 16px !important;
  margin-bottom: 16px !important;
}
.my-4 {
  margin-top: 24px !important;
  margin-bottom: 24px !important;
}
.my-5 {
  margin-top: 48px !important;
  margin-bottom: 48px !important;
}
.my-auto {
  margin-top: auto !important;
  margin-bottom: auto !important;
}
.mt-0 {
  margin-top: 0 !important;
}
.mt-1 {
  margin-top: 4px !important;
}
.mt-2 {
  margin-top: 8px !important;
}
.mt-3 {
  margin-top: 16px !important;
}
.mt-4 {
  margin-top: 24px !important;
}
.mt-5 {
  margin-top: 48px !important;
}
.mt-auto {
  margin-top: auto !important;
}
.me-0 {
  margin-right: 0 !important;
}
.me-1 {
  margin-right: 4px !important;
}
.me-2 {
  margin-right: 8px !important;
}
.me-3 {
  margin-right: 16px !important;
}
.me-4 {
  margin-right: 24px !important;
}
.me-5 {
  margin-right: 48px !important;
}
.me-auto {
  margin-right: auto !important;
}
.mb-0 {
  margin-bottom: 0 !important;
}
.mb-1 {
  margin-bottom: 4px !important;
}
.mb-2 {
  margin-bottom: 8px !important;
}
.mb-3 {
  margin-bottom: 16px !important;
}
.mb-4 {
  margin-bottom: 24px !important;
}
.mb-5 {
  margin-bottom: 48px !important;
}
.mb-auto {
  margin-bottom: auto !important;
}
.ms-0 {
  margin-left: 0 !important;
}
.ms-1 {
  margin-left: 4px !important;
}
.ms-2 {
  margin-left: 8px !important;
}
.ms-3 {
  margin-left: 16px !important;
}
.ms-4 {
  margin-left: 24px !important;
}
.ms-5 {
  margin-left: 48px !important;
}
.ms-auto {
  margin-left: auto !important;
}
.p-0 {
  padding: 0 !important;
}
.p-1 {
  padding: 4px !important;
}
.p-2 {
  padding: 8px !important;
}
.p-3 {
  padding: 16px !important;
}
.p-4 {
  padding: 24px !important;
}
.p-5 {
  padding: 48px !important;
}
.px-0 {
  padding-right: 0 !important;
  padding-left: 0 !important;
}
.px-1 {
  padding-right: 4px !important;
  padding-left: 4px !important;
}
.px-2 {
  padding-right: 8px !important;
  padding-left: 8px !important;
}
.px-3 {
  padding-right: 16px !important;
  padding-left: 16px !important;
}
.px-4 {
  padding-right: 24px !important;
  padding-left: 24px !important;
}
.px-5 {
  padding-right: 48px !important;
  padding-left: 48px !important;
}
.py-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.py-1 {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}
.py-2 {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}
.py-3 {
  padding-top: 16px !important;
  padding-bottom: 16px !important;
}
.py-4 {
  padding-top: 24px !important;
  padding-bottom: 24px !important;
}
.py-5 {
  padding-top: 48px !important;
  padding-bottom: 48px !important;
}
.pt-0 {
  padding-top: 0 !important;
}
.pt-1 {
  padding-top: 4px !important;
}
.pt-2 {
  padding-top: 8px !important;
}
.pt-3 {
  padding-top: 16px !important;
}
.pt-4 {
  padding-top: 24px !important;
}
.pt-5 {
  padding-top: 48px !important;
}
.pe-0 {
  padding-right: 0 !important;
}
.pe-1 {
  padding-right: 4px !important;
}
.pe-2 {
  padding-right: 8px !important;
}
.pe-3 {
  padding-right: 16px !important;
}
.pe-4 {
  padding-right: 24px !important;
}
.pe-5 {
  padding-right: 48px !important;
}
.pb-0 {
  padding-bottom: 0 !important;
}
.pb-1 {
  padding-bottom: 4px !important;
}
.pb-2 {
  padding-bottom: 8px !important;
}
.pb-3 {
  padding-bottom: 16px !important;
}
.pb-4 {
  padding-bottom: 24px !important;
}
.pb-5 {
  padding-bottom: 48px !important;
}
.ps-0 {
  padding-left: 0 !important;
}
.ps-1 {
  padding-left: 4px !important;
}
.ps-2 {
  padding-left: 8px !important;
}
.ps-3 {
  padding-left: 16px !important;
}
.ps-4 {
  padding-left: 24px !important;
}
.ps-5 {
  padding-left: 48px !important;
}
.gap-0 {
  gap: 0 !important;
}
.gap-1 {
  gap: 4px !important;
}
.gap-2 {
  gap: 8px !important;
}
.gap-3 {
  gap: 16px !important;
}
.gap-4 {
  gap: 24px !important;
}
.gap-5 {
  gap: 48px !important;
}
.row-gap-0 {
  row-gap: 0 !important;
}
.row-gap-1 {
  row-gap: 4px !important;
}
.row-gap-2 {
  row-gap: 8px !important;
}
.row-gap-3 {
  row-gap: 16px !important;
}
.row-gap-4 {
  row-gap: 24px !important;
}
.row-gap-5 {
  row-gap: 48px !important;
}
.column-gap-0 {
  column-gap: 0 !important;
}
.column-gap-1 {
  column-gap: 4px !important;
}
.column-gap-2 {
  column-gap: 8px !important;
}
.column-gap-3 {
  column-gap: 16px !important;
}
.column-gap-4 {
  column-gap: 24px !important;
}
.column-gap-5 {
  column-gap: 48px !important;
}
.font-monospace {
  font-family: var(--bs-font-monospace) !important;
}
.fs-1 {
  font-size: 1rem !important;
}
.fs-2 {
  font-size: 1rem !important;
}
.fs-3 {
  font-size: 0.875rem !important;
}
.fs-4 {
  font-size: calc(1.25625rem + 0.075vw) !important;
}
.fs-5 {
  font-size: 1.09375rem !important;
}
.fs-6 {
  font-size: 0.875rem !important;
}
.fst-italic {
  font-style: italic !important;
}
.fst-normal {
  font-style: normal !important;
}
.fw-lighter {
  font-weight: lighter !important;
}
.fw-light {
  font-weight: 300 !important;
}
.fw-normal {
  font-weight: 400 !important;
}
.fw-medium {
  font-weight: 500 !important;
}
.fw-semibold {
  font-weight: 600 !important;
}
.fw-bold {
  font-weight: 700 !important;
}
.fw-bolder {
  font-weight: bolder !important;
}
.lh-1 {
  line-height: 1 !important;
}
.lh-sm {
  line-height: 1.25 !important;
}
.lh-base {
  line-height: 1.3 !important;
}
.lh-lg {
  line-height: 2 !important;
}
.text-start {
  text-align: left !important;
}
.text-end {
  text-align: right !important;
}
.text-center {
  text-align: center !important;
}
.text-decoration-none {
  text-decoration: none !important;
}
.text-decoration-underline {
  text-decoration: underline !important;
}
.text-decoration-line-through {
  text-decoration: line-through !important;
}
.text-lowercase {
  text-transform: lowercase !important;
}
.text-uppercase {
  text-transform: uppercase !important;
}
.text-capitalize {
  text-transform: capitalize !important;
}
.text-wrap {
  white-space: normal !important;
}
.text-nowrap {
  white-space: nowrap !important;
}
/* rtl:begin:remove */
.text-break {
  word-wrap: break-word !important;
  word-break: break-word !important;
}
/* rtl:end:remove */
.text-primary {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;
}
.text-secondary {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity)) !important;
}
.text-success {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-success-rgb), var(--bs-text-opacity)) !important;
}
.text-info {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-info-rgb), var(--bs-text-opacity)) !important;
}
.text-warning {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-warning-rgb), var(--bs-text-opacity)) !important;
}
.text-danger {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-danger-rgb), var(--bs-text-opacity)) !important;
}
.text-light {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-light-rgb), var(--bs-text-opacity)) !important;
}
.text-dark {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-dark-rgb), var(--bs-text-opacity)) !important;
}
.text-black {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-black-rgb), var(--bs-text-opacity)) !important;
}
.text-white {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-white-rgb), var(--bs-text-opacity)) !important;
}
.text-body {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-body-color-rgb), var(--bs-text-opacity)) !important;
}
.text-muted {
  --bs-text-opacity: 1;
  color: var(--bs-secondary-color) !important;
}
.text-black-50 {
  --bs-text-opacity: 1;
  color: rgba(0, 0, 0, 0.5) !important;
}
.text-white-50 {
  --bs-text-opacity: 1;
  color: rgba(255, 255, 255, 0.5) !important;
}
.text-body-secondary {
  --bs-text-opacity: 1;
  color: var(--bs-secondary-color) !important;
}
.text-body-tertiary {
  --bs-text-opacity: 1;
  color: var(--bs-tertiary-color) !important;
}
.text-body-emphasis {
  --bs-text-opacity: 1;
  color: var(--bs-emphasis-color) !important;
}
.text-reset {
  --bs-text-opacity: 1;
  color: inherit !important;
}
.text-opacity-25 {
  --bs-text-opacity: 0.25;
}
.text-opacity-50 {
  --bs-text-opacity: 0.5;
}
.text-opacity-75 {
  --bs-text-opacity: 0.75;
}
.text-opacity-100 {
  --bs-text-opacity: 1;
}
.text-primary-emphasis {
  color: var(--bs-primary-text-emphasis) !important;
}
.text-secondary-emphasis {
  color: var(--bs-secondary-text-emphasis) !important;
}
.text-success-emphasis {
  color: var(--bs-success-text-emphasis) !important;
}
.text-info-emphasis {
  color: var(--bs-info-text-emphasis) !important;
}
.text-warning-emphasis {
  color: var(--bs-warning-text-emphasis) !important;
}
.text-danger-emphasis {
  color: var(--bs-danger-text-emphasis) !important;
}
.text-light-emphasis {
  color: var(--bs-light-text-emphasis) !important;
}
.text-dark-emphasis {
  color: var(--bs-dark-text-emphasis) !important;
}
.link-opacity-10 {
  --bs-link-opacity: 0.1;
}
.link-opacity-10-hover:hover {
  --bs-link-opacity: 0.1;
}
.link-opacity-25 {
  --bs-link-opacity: 0.25;
}
.link-opacity-25-hover:hover {
  --bs-link-opacity: 0.25;
}
.link-opacity-50 {
  --bs-link-opacity: 0.5;
}
.link-opacity-50-hover:hover {
  --bs-link-opacity: 0.5;
}
.link-opacity-75 {
  --bs-link-opacity: 0.75;
}
.link-opacity-75-hover:hover {
  --bs-link-opacity: 0.75;
}
.link-opacity-100 {
  --bs-link-opacity: 1;
}
.link-opacity-100-hover:hover {
  --bs-link-opacity: 1;
}
.link-offset-1 {
  text-underline-offset: 0.125em !important;
}
.link-offset-1-hover:hover {
  text-underline-offset: 0.125em !important;
}
.link-offset-2 {
  text-underline-offset: 0.25em !important;
}
.link-offset-2-hover:hover {
  text-underline-offset: 0.25em !important;
}
.link-offset-3 {
  text-underline-offset: 0.375em !important;
}
.link-offset-3-hover:hover {
  text-underline-offset: 0.375em !important;
}
.link-underline-primary {
  --bs-link-underline-opacity: 1;
  text-decoration-color: rgba(var(--bs-primary-rgb), var(--bs-link-underline-opacity)) !important;
}
.link-underline-secondary {
  --bs-link-underline-opacity: 1;
  text-decoration-color: rgba(var(--bs-secondary-rgb), var(--bs-link-underline-opacity)) !important;
}
.link-underline-success {
  --bs-link-underline-opacity: 1;
  text-decoration-color: rgba(var(--bs-success-rgb), var(--bs-link-underline-opacity)) !important;
}
.link-underline-info {
  --bs-link-underline-opacity: 1;
  text-decoration-color: rgba(var(--bs-info-rgb), var(--bs-link-underline-opacity)) !important;
}
.link-underline-warning {
  --bs-link-underline-opacity: 1;
  text-decoration-color: rgba(var(--bs-warning-rgb), var(--bs-link-underline-opacity)) !important;
}
.link-underline-danger {
  --bs-link-underline-opacity: 1;
  text-decoration-color: rgba(var(--bs-danger-rgb), var(--bs-link-underline-opacity)) !important;
}
.link-underline-light {
  --bs-link-underline-opacity: 1;
  text-decoration-color: rgba(var(--bs-light-rgb), var(--bs-link-underline-opacity)) !important;
}
.link-underline-dark {
  --bs-link-underline-opacity: 1;
  text-decoration-color: rgba(var(--bs-dark-rgb), var(--bs-link-underline-opacity)) !important;
}
.link-underline {
  --bs-link-underline-opacity: 1;
  text-decoration-color: rgba(var(--bs-link-color-rgb), var(--bs-link-underline-opacity, 1)) !important;
}
.link-underline-opacity-0 {
  --bs-link-underline-opacity: 0;
}
.link-underline-opacity-0-hover:hover {
  --bs-link-underline-opacity: 0;
}
.link-underline-opacity-10 {
  --bs-link-underline-opacity: 0.1;
}
.link-underline-opacity-10-hover:hover {
  --bs-link-underline-opacity: 0.1;
}
.link-underline-opacity-25 {
  --bs-link-underline-opacity: 0.25;
}
.link-underline-opacity-25-hover:hover {
  --bs-link-underline-opacity: 0.25;
}
.link-underline-opacity-50 {
  --bs-link-underline-opacity: 0.5;
}
.link-underline-opacity-50-hover:hover {
  --bs-link-underline-opacity: 0.5;
}
.link-underline-opacity-75 {
  --bs-link-underline-opacity: 0.75;
}
.link-underline-opacity-75-hover:hover {
  --bs-link-underline-opacity: 0.75;
}
.link-underline-opacity-100 {
  --bs-link-underline-opacity: 1;
}
.link-underline-opacity-100-hover:hover {
  --bs-link-underline-opacity: 1;
}
.bg-primary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
}
.bg-secondary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-secondary-rgb), var(--bs-bg-opacity)) !important;
}
.bg-success {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-success-rgb), var(--bs-bg-opacity)) !important;
}
.bg-info {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-info-rgb), var(--bs-bg-opacity)) !important;
}
.bg-warning {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-warning-rgb), var(--bs-bg-opacity)) !important;
}
.bg-danger {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-danger-rgb), var(--bs-bg-opacity)) !important;
}
.bg-light {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) !important;
}
.bg-dark {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important;
}
.bg-black {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-black-rgb), var(--bs-bg-opacity)) !important;
}
.bg-white {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-white-rgb), var(--bs-bg-opacity)) !important;
}
.bg-body {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity)) !important;
}
.bg-transparent {
  --bs-bg-opacity: 1;
  background-color: transparent !important;
}
.bg-body-secondary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-secondary-bg-rgb), var(--bs-bg-opacity)) !important;
}
.bg-body-tertiary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity)) !important;
}
.bg-opacity-10 {
  --bs-bg-opacity: 0.1;
}
.bg-opacity-25 {
  --bs-bg-opacity: 0.25;
}
.bg-opacity-50 {
  --bs-bg-opacity: 0.5;
}
.bg-opacity-75 {
  --bs-bg-opacity: 0.75;
}
.bg-opacity-100 {
  --bs-bg-opacity: 1;
}
.bg-primary-subtle {
  background-color: var(--bs-primary-bg-subtle) !important;
}
.bg-secondary-subtle {
  background-color: var(--bs-secondary-bg-subtle) !important;
}
.bg-success-subtle {
  background-color: var(--bs-success-bg-subtle) !important;
}
.bg-info-subtle {
  background-color: var(--bs-info-bg-subtle) !important;
}
.bg-warning-subtle {
  background-color: var(--bs-warning-bg-subtle) !important;
}
.bg-danger-subtle {
  background-color: var(--bs-danger-bg-subtle) !important;
}
.bg-light-subtle {
  background-color: var(--bs-light-bg-subtle) !important;
}
.bg-dark-subtle {
  background-color: var(--bs-dark-bg-subtle) !important;
}
.bg-gradient {
  background-image: var(--bs-gradient) !important;
}
.user-select-all {
  user-select: all !important;
}
.user-select-auto {
  user-select: auto !important;
}
.user-select-none {
  user-select: none !important;
}
.pe-none {
  pointer-events: none !important;
}
.pe-auto {
  pointer-events: auto !important;
}
.rounded {
  border-radius: var(--bs-border-radius) !important;
}
.rounded-0 {
  border-radius: 0 !important;
}
.rounded-1 {
  border-radius: var(--bs-border-radius-sm) !important;
}
.rounded-2 {
  border-radius: var(--bs-border-radius) !important;
}
.rounded-3 {
  border-radius: var(--bs-border-radius-lg) !important;
}
.rounded-4 {
  border-radius: var(--bs-border-radius-xl) !important;
}
.rounded-5 {
  border-radius: var(--bs-border-radius-xxl) !important;
}
.rounded-circle {
  border-radius: 50% !important;
}
.rounded-pill {
  border-radius: var(--bs-border-radius-pill) !important;
}
.rounded-top {
  border-top-left-radius: var(--bs-border-radius) !important;
  border-top-right-radius: var(--bs-border-radius) !important;
}
.rounded-top-0 {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.rounded-top-1 {
  border-top-left-radius: var(--bs-border-radius-sm) !important;
  border-top-right-radius: var(--bs-border-radius-sm) !important;
}
.rounded-top-2 {
  border-top-left-radius: var(--bs-border-radius) !important;
  border-top-right-radius: var(--bs-border-radius) !important;
}
.rounded-top-3 {
  border-top-left-radius: var(--bs-border-radius-lg) !important;
  border-top-right-radius: var(--bs-border-radius-lg) !important;
}
.rounded-top-4 {
  border-top-left-radius: var(--bs-border-radius-xl) !important;
  border-top-right-radius: var(--bs-border-radius-xl) !important;
}
.rounded-top-5 {
  border-top-left-radius: var(--bs-border-radius-xxl) !important;
  border-top-right-radius: var(--bs-border-radius-xxl) !important;
}
.rounded-top-circle {
  border-top-left-radius: 50% !important;
  border-top-right-radius: 50% !important;
}
.rounded-top-pill {
  border-top-left-radius: var(--bs-border-radius-pill) !important;
  border-top-right-radius: var(--bs-border-radius-pill) !important;
}
.rounded-end {
  border-top-right-radius: var(--bs-border-radius) !important;
  border-bottom-right-radius: var(--bs-border-radius) !important;
}
.rounded-end-0 {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.rounded-end-1 {
  border-top-right-radius: var(--bs-border-radius-sm) !important;
  border-bottom-right-radius: var(--bs-border-radius-sm) !important;
}
.rounded-end-2 {
  border-top-right-radius: var(--bs-border-radius) !important;
  border-bottom-right-radius: var(--bs-border-radius) !important;
}
.rounded-end-3 {
  border-top-right-radius: var(--bs-border-radius-lg) !important;
  border-bottom-right-radius: var(--bs-border-radius-lg) !important;
}
.rounded-end-4 {
  border-top-right-radius: var(--bs-border-radius-xl) !important;
  border-bottom-right-radius: var(--bs-border-radius-xl) !important;
}
.rounded-end-5 {
  border-top-right-radius: var(--bs-border-radius-xxl) !important;
  border-bottom-right-radius: var(--bs-border-radius-xxl) !important;
}
.rounded-end-circle {
  border-top-right-radius: 50% !important;
  border-bottom-right-radius: 50% !important;
}
.rounded-end-pill {
  border-top-right-radius: var(--bs-border-radius-pill) !important;
  border-bottom-right-radius: var(--bs-border-radius-pill) !important;
}
.rounded-bottom {
  border-bottom-right-radius: var(--bs-border-radius) !important;
  border-bottom-left-radius: var(--bs-border-radius) !important;
}
.rounded-bottom-0 {
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
.rounded-bottom-1 {
  border-bottom-right-radius: var(--bs-border-radius-sm) !important;
  border-bottom-left-radius: var(--bs-border-radius-sm) !important;
}
.rounded-bottom-2 {
  border-bottom-right-radius: var(--bs-border-radius) !important;
  border-bottom-left-radius: var(--bs-border-radius) !important;
}
.rounded-bottom-3 {
  border-bottom-right-radius: var(--bs-border-radius-lg) !important;
  border-bottom-left-radius: var(--bs-border-radius-lg) !important;
}
.rounded-bottom-4 {
  border-bottom-right-radius: var(--bs-border-radius-xl) !important;
  border-bottom-left-radius: var(--bs-border-radius-xl) !important;
}
.rounded-bottom-5 {
  border-bottom-right-radius: var(--bs-border-radius-xxl) !important;
  border-bottom-left-radius: var(--bs-border-radius-xxl) !important;
}
.rounded-bottom-circle {
  border-bottom-right-radius: 50% !important;
  border-bottom-left-radius: 50% !important;
}
.rounded-bottom-pill {
  border-bottom-right-radius: var(--bs-border-radius-pill) !important;
  border-bottom-left-radius: var(--bs-border-radius-pill) !important;
}
.rounded-start {
  border-bottom-left-radius: var(--bs-border-radius) !important;
  border-top-left-radius: var(--bs-border-radius) !important;
}
.rounded-start-0 {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}
.rounded-start-1 {
  border-bottom-left-radius: var(--bs-border-radius-sm) !important;
  border-top-left-radius: var(--bs-border-radius-sm) !important;
}
.rounded-start-2 {
  border-bottom-left-radius: var(--bs-border-radius) !important;
  border-top-left-radius: var(--bs-border-radius) !important;
}
.rounded-start-3 {
  border-bottom-left-radius: var(--bs-border-radius-lg) !important;
  border-top-left-radius: var(--bs-border-radius-lg) !important;
}
.rounded-start-4 {
  border-bottom-left-radius: var(--bs-border-radius-xl) !important;
  border-top-left-radius: var(--bs-border-radius-xl) !important;
}
.rounded-start-5 {
  border-bottom-left-radius: var(--bs-border-radius-xxl) !important;
  border-top-left-radius: var(--bs-border-radius-xxl) !important;
}
.rounded-start-circle {
  border-bottom-left-radius: 50% !important;
  border-top-left-radius: 50% !important;
}
.rounded-start-pill {
  border-bottom-left-radius: var(--bs-border-radius-pill) !important;
  border-top-left-radius: var(--bs-border-radius-pill) !important;
}
.visible {
  visibility: visible !important;
}
.invisible {
  visibility: hidden !important;
}
.z-n1 {
  z-index: -1 !important;
}
.z-0 {
  z-index: 0 !important;
}
.z-1 {
  z-index: 1 !important;
}
.z-2 {
  z-index: 2 !important;
}
.z-3 {
  z-index: 3 !important;
}
@media (min-width: 576px) {
  .float-sm-start {
    float: left !important;
  }
  .float-sm-end {
    float: right !important;
  }
  .float-sm-none {
    float: none !important;
  }
  .object-fit-sm-contain {
    object-fit: contain !important;
  }
  .object-fit-sm-cover {
    object-fit: cover !important;
  }
  .object-fit-sm-fill {
    object-fit: fill !important;
  }
  .object-fit-sm-scale {
    object-fit: scale-down !important;
  }
  .object-fit-sm-none {
    object-fit: none !important;
  }
  .d-sm-inline {
    display: inline !important;
  }
  .d-sm-inline-block {
    display: inline-block !important;
  }
  .d-sm-block {
    display: block !important;
  }
  .d-sm-grid {
    display: grid !important;
  }
  .d-sm-inline-grid {
    display: inline-grid !important;
  }
  .d-sm-table {
    display: table !important;
  }
  .d-sm-table-row {
    display: table-row !important;
  }
  .d-sm-table-cell {
    display: table-cell !important;
  }
  .d-sm-flex {
    display: flex !important;
  }
  .d-sm-inline-flex {
    display: inline-flex !important;
  }
  .d-sm-none {
    display: none !important;
  }
  .flex-sm-fill {
    flex: 1 1 auto !important;
  }
  .flex-sm-row {
    flex-direction: row !important;
  }
  .flex-sm-column {
    flex-direction: column !important;
  }
  .flex-sm-row-reverse {
    flex-direction: row-reverse !important;
  }
  .flex-sm-column-reverse {
    flex-direction: column-reverse !important;
  }
  .flex-sm-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-sm-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-sm-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-sm-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-sm-wrap {
    flex-wrap: wrap !important;
  }
  .flex-sm-nowrap {
    flex-wrap: nowrap !important;
  }
  .flex-sm-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .justify-content-sm-start {
    justify-content: flex-start !important;
  }
  .justify-content-sm-end {
    justify-content: flex-end !important;
  }
  .justify-content-sm-center {
    justify-content: center !important;
  }
  .justify-content-sm-between {
    justify-content: space-between !important;
  }
  .justify-content-sm-around {
    justify-content: space-around !important;
  }
  .justify-content-sm-evenly {
    justify-content: space-evenly !important;
  }
  .align-items-sm-start {
    align-items: flex-start !important;
  }
  .align-items-sm-end {
    align-items: flex-end !important;
  }
  .align-items-sm-center {
    align-items: center !important;
  }
  .align-items-sm-baseline {
    align-items: baseline !important;
  }
  .align-items-sm-stretch {
    align-items: stretch !important;
  }
  .align-content-sm-start {
    align-content: flex-start !important;
  }
  .align-content-sm-end {
    align-content: flex-end !important;
  }
  .align-content-sm-center {
    align-content: center !important;
  }
  .align-content-sm-between {
    align-content: space-between !important;
  }
  .align-content-sm-around {
    align-content: space-around !important;
  }
  .align-content-sm-stretch {
    align-content: stretch !important;
  }
  .align-self-sm-auto {
    align-self: auto !important;
  }
  .align-self-sm-start {
    align-self: flex-start !important;
  }
  .align-self-sm-end {
    align-self: flex-end !important;
  }
  .align-self-sm-center {
    align-self: center !important;
  }
  .align-self-sm-baseline {
    align-self: baseline !important;
  }
  .align-self-sm-stretch {
    align-self: stretch !important;
  }
  .order-sm-first {
    order: -1 !important;
  }
  .order-sm-0 {
    order: 0 !important;
  }
  .order-sm-1 {
    order: 1 !important;
  }
  .order-sm-2 {
    order: 2 !important;
  }
  .order-sm-3 {
    order: 3 !important;
  }
  .order-sm-4 {
    order: 4 !important;
  }
  .order-sm-5 {
    order: 5 !important;
  }
  .order-sm-last {
    order: 6 !important;
  }
  .m-sm-0 {
    margin: 0 !important;
  }
  .m-sm-1 {
    margin: 4px !important;
  }
  .m-sm-2 {
    margin: 8px !important;
  }
  .m-sm-3 {
    margin: 16px !important;
  }
  .m-sm-4 {
    margin: 24px !important;
  }
  .m-sm-5 {
    margin: 48px !important;
  }
  .m-sm-auto {
    margin: auto !important;
  }
  .mx-sm-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .mx-sm-1 {
    margin-right: 4px !important;
    margin-left: 4px !important;
  }
  .mx-sm-2 {
    margin-right: 8px !important;
    margin-left: 8px !important;
  }
  .mx-sm-3 {
    margin-right: 16px !important;
    margin-left: 16px !important;
  }
  .mx-sm-4 {
    margin-right: 24px !important;
    margin-left: 24px !important;
  }
  .mx-sm-5 {
    margin-right: 48px !important;
    margin-left: 48px !important;
  }
  .mx-sm-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .my-sm-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .my-sm-1 {
    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }
  .my-sm-2 {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }
  .my-sm-3 {
    margin-top: 16px !important;
    margin-bottom: 16px !important;
  }
  .my-sm-4 {
    margin-top: 24px !important;
    margin-bottom: 24px !important;
  }
  .my-sm-5 {
    margin-top: 48px !important;
    margin-bottom: 48px !important;
  }
  .my-sm-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .mt-sm-0 {
    margin-top: 0 !important;
  }
  .mt-sm-1 {
    margin-top: 4px !important;
  }
  .mt-sm-2 {
    margin-top: 8px !important;
  }
  .mt-sm-3 {
    margin-top: 16px !important;
  }
  .mt-sm-4 {
    margin-top: 24px !important;
  }
  .mt-sm-5 {
    margin-top: 48px !important;
  }
  .mt-sm-auto {
    margin-top: auto !important;
  }
  .me-sm-0 {
    margin-right: 0 !important;
  }
  .me-sm-1 {
    margin-right: 4px !important;
  }
  .me-sm-2 {
    margin-right: 8px !important;
  }
  .me-sm-3 {
    margin-right: 16px !important;
  }
  .me-sm-4 {
    margin-right: 24px !important;
  }
  .me-sm-5 {
    margin-right: 48px !important;
  }
  .me-sm-auto {
    margin-right: auto !important;
  }
  .mb-sm-0 {
    margin-bottom: 0 !important;
  }
  .mb-sm-1 {
    margin-bottom: 4px !important;
  }
  .mb-sm-2 {
    margin-bottom: 8px !important;
  }
  .mb-sm-3 {
    margin-bottom: 16px !important;
  }
  .mb-sm-4 {
    margin-bottom: 24px !important;
  }
  .mb-sm-5 {
    margin-bottom: 48px !important;
  }
  .mb-sm-auto {
    margin-bottom: auto !important;
  }
  .ms-sm-0 {
    margin-left: 0 !important;
  }
  .ms-sm-1 {
    margin-left: 4px !important;
  }
  .ms-sm-2 {
    margin-left: 8px !important;
  }
  .ms-sm-3 {
    margin-left: 16px !important;
  }
  .ms-sm-4 {
    margin-left: 24px !important;
  }
  .ms-sm-5 {
    margin-left: 48px !important;
  }
  .ms-sm-auto {
    margin-left: auto !important;
  }
  .p-sm-0 {
    padding: 0 !important;
  }
  .p-sm-1 {
    padding: 4px !important;
  }
  .p-sm-2 {
    padding: 8px !important;
  }
  .p-sm-3 {
    padding: 16px !important;
  }
  .p-sm-4 {
    padding: 24px !important;
  }
  .p-sm-5 {
    padding: 48px !important;
  }
  .px-sm-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .px-sm-1 {
    padding-right: 4px !important;
    padding-left: 4px !important;
  }
  .px-sm-2 {
    padding-right: 8px !important;
    padding-left: 8px !important;
  }
  .px-sm-3 {
    padding-right: 16px !important;
    padding-left: 16px !important;
  }
  .px-sm-4 {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  .px-sm-5 {
    padding-right: 48px !important;
    padding-left: 48px !important;
  }
  .py-sm-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-sm-1 {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
  .py-sm-2 {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
  .py-sm-3 {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }
  .py-sm-4 {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }
  .py-sm-5 {
    padding-top: 48px !important;
    padding-bottom: 48px !important;
  }
  .pt-sm-0 {
    padding-top: 0 !important;
  }
  .pt-sm-1 {
    padding-top: 4px !important;
  }
  .pt-sm-2 {
    padding-top: 8px !important;
  }
  .pt-sm-3 {
    padding-top: 16px !important;
  }
  .pt-sm-4 {
    padding-top: 24px !important;
  }
  .pt-sm-5 {
    padding-top: 48px !important;
  }
  .pe-sm-0 {
    padding-right: 0 !important;
  }
  .pe-sm-1 {
    padding-right: 4px !important;
  }
  .pe-sm-2 {
    padding-right: 8px !important;
  }
  .pe-sm-3 {
    padding-right: 16px !important;
  }
  .pe-sm-4 {
    padding-right: 24px !important;
  }
  .pe-sm-5 {
    padding-right: 48px !important;
  }
  .pb-sm-0 {
    padding-bottom: 0 !important;
  }
  .pb-sm-1 {
    padding-bottom: 4px !important;
  }
  .pb-sm-2 {
    padding-bottom: 8px !important;
  }
  .pb-sm-3 {
    padding-bottom: 16px !important;
  }
  .pb-sm-4 {
    padding-bottom: 24px !important;
  }
  .pb-sm-5 {
    padding-bottom: 48px !important;
  }
  .ps-sm-0 {
    padding-left: 0 !important;
  }
  .ps-sm-1 {
    padding-left: 4px !important;
  }
  .ps-sm-2 {
    padding-left: 8px !important;
  }
  .ps-sm-3 {
    padding-left: 16px !important;
  }
  .ps-sm-4 {
    padding-left: 24px !important;
  }
  .ps-sm-5 {
    padding-left: 48px !important;
  }
  .gap-sm-0 {
    gap: 0 !important;
  }
  .gap-sm-1 {
    gap: 4px !important;
  }
  .gap-sm-2 {
    gap: 8px !important;
  }
  .gap-sm-3 {
    gap: 16px !important;
  }
  .gap-sm-4 {
    gap: 24px !important;
  }
  .gap-sm-5 {
    gap: 48px !important;
  }
  .row-gap-sm-0 {
    row-gap: 0 !important;
  }
  .row-gap-sm-1 {
    row-gap: 4px !important;
  }
  .row-gap-sm-2 {
    row-gap: 8px !important;
  }
  .row-gap-sm-3 {
    row-gap: 16px !important;
  }
  .row-gap-sm-4 {
    row-gap: 24px !important;
  }
  .row-gap-sm-5 {
    row-gap: 48px !important;
  }
  .column-gap-sm-0 {
    column-gap: 0 !important;
  }
  .column-gap-sm-1 {
    column-gap: 4px !important;
  }
  .column-gap-sm-2 {
    column-gap: 8px !important;
  }
  .column-gap-sm-3 {
    column-gap: 16px !important;
  }
  .column-gap-sm-4 {
    column-gap: 24px !important;
  }
  .column-gap-sm-5 {
    column-gap: 48px !important;
  }
  .text-sm-start {
    text-align: left !important;
  }
  .text-sm-end {
    text-align: right !important;
  }
  .text-sm-center {
    text-align: center !important;
  }
}
@media (min-width: 768px) {
  .float-md-start {
    float: left !important;
  }
  .float-md-end {
    float: right !important;
  }
  .float-md-none {
    float: none !important;
  }
  .object-fit-md-contain {
    object-fit: contain !important;
  }
  .object-fit-md-cover {
    object-fit: cover !important;
  }
  .object-fit-md-fill {
    object-fit: fill !important;
  }
  .object-fit-md-scale {
    object-fit: scale-down !important;
  }
  .object-fit-md-none {
    object-fit: none !important;
  }
  .d-md-inline {
    display: inline !important;
  }
  .d-md-inline-block {
    display: inline-block !important;
  }
  .d-md-block {
    display: block !important;
  }
  .d-md-grid {
    display: grid !important;
  }
  .d-md-inline-grid {
    display: inline-grid !important;
  }
  .d-md-table {
    display: table !important;
  }
  .d-md-table-row {
    display: table-row !important;
  }
  .d-md-table-cell {
    display: table-cell !important;
  }
  .d-md-flex {
    display: flex !important;
  }
  .d-md-inline-flex {
    display: inline-flex !important;
  }
  .d-md-none {
    display: none !important;
  }
  .flex-md-fill {
    flex: 1 1 auto !important;
  }
  .flex-md-row {
    flex-direction: row !important;
  }
  .flex-md-column {
    flex-direction: column !important;
  }
  .flex-md-row-reverse {
    flex-direction: row-reverse !important;
  }
  .flex-md-column-reverse {
    flex-direction: column-reverse !important;
  }
  .flex-md-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-md-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-md-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-md-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-md-wrap {
    flex-wrap: wrap !important;
  }
  .flex-md-nowrap {
    flex-wrap: nowrap !important;
  }
  .flex-md-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .justify-content-md-start {
    justify-content: flex-start !important;
  }
  .justify-content-md-end {
    justify-content: flex-end !important;
  }
  .justify-content-md-center {
    justify-content: center !important;
  }
  .justify-content-md-between {
    justify-content: space-between !important;
  }
  .justify-content-md-around {
    justify-content: space-around !important;
  }
  .justify-content-md-evenly {
    justify-content: space-evenly !important;
  }
  .align-items-md-start {
    align-items: flex-start !important;
  }
  .align-items-md-end {
    align-items: flex-end !important;
  }
  .align-items-md-center {
    align-items: center !important;
  }
  .align-items-md-baseline {
    align-items: baseline !important;
  }
  .align-items-md-stretch {
    align-items: stretch !important;
  }
  .align-content-md-start {
    align-content: flex-start !important;
  }
  .align-content-md-end {
    align-content: flex-end !important;
  }
  .align-content-md-center {
    align-content: center !important;
  }
  .align-content-md-between {
    align-content: space-between !important;
  }
  .align-content-md-around {
    align-content: space-around !important;
  }
  .align-content-md-stretch {
    align-content: stretch !important;
  }
  .align-self-md-auto {
    align-self: auto !important;
  }
  .align-self-md-start {
    align-self: flex-start !important;
  }
  .align-self-md-end {
    align-self: flex-end !important;
  }
  .align-self-md-center {
    align-self: center !important;
  }
  .align-self-md-baseline {
    align-self: baseline !important;
  }
  .align-self-md-stretch {
    align-self: stretch !important;
  }
  .order-md-first {
    order: -1 !important;
  }
  .order-md-0 {
    order: 0 !important;
  }
  .order-md-1 {
    order: 1 !important;
  }
  .order-md-2 {
    order: 2 !important;
  }
  .order-md-3 {
    order: 3 !important;
  }
  .order-md-4 {
    order: 4 !important;
  }
  .order-md-5 {
    order: 5 !important;
  }
  .order-md-last {
    order: 6 !important;
  }
  .m-md-0 {
    margin: 0 !important;
  }
  .m-md-1 {
    margin: 4px !important;
  }
  .m-md-2 {
    margin: 8px !important;
  }
  .m-md-3 {
    margin: 16px !important;
  }
  .m-md-4 {
    margin: 24px !important;
  }
  .m-md-5 {
    margin: 48px !important;
  }
  .m-md-auto {
    margin: auto !important;
  }
  .mx-md-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .mx-md-1 {
    margin-right: 4px !important;
    margin-left: 4px !important;
  }
  .mx-md-2 {
    margin-right: 8px !important;
    margin-left: 8px !important;
  }
  .mx-md-3 {
    margin-right: 16px !important;
    margin-left: 16px !important;
  }
  .mx-md-4 {
    margin-right: 24px !important;
    margin-left: 24px !important;
  }
  .mx-md-5 {
    margin-right: 48px !important;
    margin-left: 48px !important;
  }
  .mx-md-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .my-md-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .my-md-1 {
    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }
  .my-md-2 {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }
  .my-md-3 {
    margin-top: 16px !important;
    margin-bottom: 16px !important;
  }
  .my-md-4 {
    margin-top: 24px !important;
    margin-bottom: 24px !important;
  }
  .my-md-5 {
    margin-top: 48px !important;
    margin-bottom: 48px !important;
  }
  .my-md-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .mt-md-0 {
    margin-top: 0 !important;
  }
  .mt-md-1 {
    margin-top: 4px !important;
  }
  .mt-md-2 {
    margin-top: 8px !important;
  }
  .mt-md-3 {
    margin-top: 16px !important;
  }
  .mt-md-4 {
    margin-top: 24px !important;
  }
  .mt-md-5 {
    margin-top: 48px !important;
  }
  .mt-md-auto {
    margin-top: auto !important;
  }
  .me-md-0 {
    margin-right: 0 !important;
  }
  .me-md-1 {
    margin-right: 4px !important;
  }
  .me-md-2 {
    margin-right: 8px !important;
  }
  .me-md-3 {
    margin-right: 16px !important;
  }
  .me-md-4 {
    margin-right: 24px !important;
  }
  .me-md-5 {
    margin-right: 48px !important;
  }
  .me-md-auto {
    margin-right: auto !important;
  }
  .mb-md-0 {
    margin-bottom: 0 !important;
  }
  .mb-md-1 {
    margin-bottom: 4px !important;
  }
  .mb-md-2 {
    margin-bottom: 8px !important;
  }
  .mb-md-3 {
    margin-bottom: 16px !important;
  }
  .mb-md-4 {
    margin-bottom: 24px !important;
  }
  .mb-md-5 {
    margin-bottom: 48px !important;
  }
  .mb-md-auto {
    margin-bottom: auto !important;
  }
  .ms-md-0 {
    margin-left: 0 !important;
  }
  .ms-md-1 {
    margin-left: 4px !important;
  }
  .ms-md-2 {
    margin-left: 8px !important;
  }
  .ms-md-3 {
    margin-left: 16px !important;
  }
  .ms-md-4 {
    margin-left: 24px !important;
  }
  .ms-md-5 {
    margin-left: 48px !important;
  }
  .ms-md-auto {
    margin-left: auto !important;
  }
  .p-md-0 {
    padding: 0 !important;
  }
  .p-md-1 {
    padding: 4px !important;
  }
  .p-md-2 {
    padding: 8px !important;
  }
  .p-md-3 {
    padding: 16px !important;
  }
  .p-md-4 {
    padding: 24px !important;
  }
  .p-md-5 {
    padding: 48px !important;
  }
  .px-md-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .px-md-1 {
    padding-right: 4px !important;
    padding-left: 4px !important;
  }
  .px-md-2 {
    padding-right: 8px !important;
    padding-left: 8px !important;
  }
  .px-md-3 {
    padding-right: 16px !important;
    padding-left: 16px !important;
  }
  .px-md-4 {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  .px-md-5 {
    padding-right: 48px !important;
    padding-left: 48px !important;
  }
  .py-md-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-md-1 {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
  .py-md-2 {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
  .py-md-3 {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }
  .py-md-4 {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }
  .py-md-5 {
    padding-top: 48px !important;
    padding-bottom: 48px !important;
  }
  .pt-md-0 {
    padding-top: 0 !important;
  }
  .pt-md-1 {
    padding-top: 4px !important;
  }
  .pt-md-2 {
    padding-top: 8px !important;
  }
  .pt-md-3 {
    padding-top: 16px !important;
  }
  .pt-md-4 {
    padding-top: 24px !important;
  }
  .pt-md-5 {
    padding-top: 48px !important;
  }
  .pe-md-0 {
    padding-right: 0 !important;
  }
  .pe-md-1 {
    padding-right: 4px !important;
  }
  .pe-md-2 {
    padding-right: 8px !important;
  }
  .pe-md-3 {
    padding-right: 16px !important;
  }
  .pe-md-4 {
    padding-right: 24px !important;
  }
  .pe-md-5 {
    padding-right: 48px !important;
  }
  .pb-md-0 {
    padding-bottom: 0 !important;
  }
  .pb-md-1 {
    padding-bottom: 4px !important;
  }
  .pb-md-2 {
    padding-bottom: 8px !important;
  }
  .pb-md-3 {
    padding-bottom: 16px !important;
  }
  .pb-md-4 {
    padding-bottom: 24px !important;
  }
  .pb-md-5 {
    padding-bottom: 48px !important;
  }
  .ps-md-0 {
    padding-left: 0 !important;
  }
  .ps-md-1 {
    padding-left: 4px !important;
  }
  .ps-md-2 {
    padding-left: 8px !important;
  }
  .ps-md-3 {
    padding-left: 16px !important;
  }
  .ps-md-4 {
    padding-left: 24px !important;
  }
  .ps-md-5 {
    padding-left: 48px !important;
  }
  .gap-md-0 {
    gap: 0 !important;
  }
  .gap-md-1 {
    gap: 4px !important;
  }
  .gap-md-2 {
    gap: 8px !important;
  }
  .gap-md-3 {
    gap: 16px !important;
  }
  .gap-md-4 {
    gap: 24px !important;
  }
  .gap-md-5 {
    gap: 48px !important;
  }
  .row-gap-md-0 {
    row-gap: 0 !important;
  }
  .row-gap-md-1 {
    row-gap: 4px !important;
  }
  .row-gap-md-2 {
    row-gap: 8px !important;
  }
  .row-gap-md-3 {
    row-gap: 16px !important;
  }
  .row-gap-md-4 {
    row-gap: 24px !important;
  }
  .row-gap-md-5 {
    row-gap: 48px !important;
  }
  .column-gap-md-0 {
    column-gap: 0 !important;
  }
  .column-gap-md-1 {
    column-gap: 4px !important;
  }
  .column-gap-md-2 {
    column-gap: 8px !important;
  }
  .column-gap-md-3 {
    column-gap: 16px !important;
  }
  .column-gap-md-4 {
    column-gap: 24px !important;
  }
  .column-gap-md-5 {
    column-gap: 48px !important;
  }
  .text-md-start {
    text-align: left !important;
  }
  .text-md-end {
    text-align: right !important;
  }
  .text-md-center {
    text-align: center !important;
  }
}
@media (min-width: 992px) {
  .float-lg-start {
    float: left !important;
  }
  .float-lg-end {
    float: right !important;
  }
  .float-lg-none {
    float: none !important;
  }
  .object-fit-lg-contain {
    object-fit: contain !important;
  }
  .object-fit-lg-cover {
    object-fit: cover !important;
  }
  .object-fit-lg-fill {
    object-fit: fill !important;
  }
  .object-fit-lg-scale {
    object-fit: scale-down !important;
  }
  .object-fit-lg-none {
    object-fit: none !important;
  }
  .d-lg-inline {
    display: inline !important;
  }
  .d-lg-inline-block {
    display: inline-block !important;
  }
  .d-lg-block {
    display: block !important;
  }
  .d-lg-grid {
    display: grid !important;
  }
  .d-lg-inline-grid {
    display: inline-grid !important;
  }
  .d-lg-table {
    display: table !important;
  }
  .d-lg-table-row {
    display: table-row !important;
  }
  .d-lg-table-cell {
    display: table-cell !important;
  }
  .d-lg-flex {
    display: flex !important;
  }
  .d-lg-inline-flex {
    display: inline-flex !important;
  }
  .d-lg-none {
    display: none !important;
  }
  .flex-lg-fill {
    flex: 1 1 auto !important;
  }
  .flex-lg-row {
    flex-direction: row !important;
  }
  .flex-lg-column {
    flex-direction: column !important;
  }
  .flex-lg-row-reverse {
    flex-direction: row-reverse !important;
  }
  .flex-lg-column-reverse {
    flex-direction: column-reverse !important;
  }
  .flex-lg-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-lg-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-lg-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-lg-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-lg-wrap {
    flex-wrap: wrap !important;
  }
  .flex-lg-nowrap {
    flex-wrap: nowrap !important;
  }
  .flex-lg-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .justify-content-lg-start {
    justify-content: flex-start !important;
  }
  .justify-content-lg-end {
    justify-content: flex-end !important;
  }
  .justify-content-lg-center {
    justify-content: center !important;
  }
  .justify-content-lg-between {
    justify-content: space-between !important;
  }
  .justify-content-lg-around {
    justify-content: space-around !important;
  }
  .justify-content-lg-evenly {
    justify-content: space-evenly !important;
  }
  .align-items-lg-start {
    align-items: flex-start !important;
  }
  .align-items-lg-end {
    align-items: flex-end !important;
  }
  .align-items-lg-center {
    align-items: center !important;
  }
  .align-items-lg-baseline {
    align-items: baseline !important;
  }
  .align-items-lg-stretch {
    align-items: stretch !important;
  }
  .align-content-lg-start {
    align-content: flex-start !important;
  }
  .align-content-lg-end {
    align-content: flex-end !important;
  }
  .align-content-lg-center {
    align-content: center !important;
  }
  .align-content-lg-between {
    align-content: space-between !important;
  }
  .align-content-lg-around {
    align-content: space-around !important;
  }
  .align-content-lg-stretch {
    align-content: stretch !important;
  }
  .align-self-lg-auto {
    align-self: auto !important;
  }
  .align-self-lg-start {
    align-self: flex-start !important;
  }
  .align-self-lg-end {
    align-self: flex-end !important;
  }
  .align-self-lg-center {
    align-self: center !important;
  }
  .align-self-lg-baseline {
    align-self: baseline !important;
  }
  .align-self-lg-stretch {
    align-self: stretch !important;
  }
  .order-lg-first {
    order: -1 !important;
  }
  .order-lg-0 {
    order: 0 !important;
  }
  .order-lg-1 {
    order: 1 !important;
  }
  .order-lg-2 {
    order: 2 !important;
  }
  .order-lg-3 {
    order: 3 !important;
  }
  .order-lg-4 {
    order: 4 !important;
  }
  .order-lg-5 {
    order: 5 !important;
  }
  .order-lg-last {
    order: 6 !important;
  }
  .m-lg-0 {
    margin: 0 !important;
  }
  .m-lg-1 {
    margin: 4px !important;
  }
  .m-lg-2 {
    margin: 8px !important;
  }
  .m-lg-3 {
    margin: 16px !important;
  }
  .m-lg-4 {
    margin: 24px !important;
  }
  .m-lg-5 {
    margin: 48px !important;
  }
  .m-lg-auto {
    margin: auto !important;
  }
  .mx-lg-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .mx-lg-1 {
    margin-right: 4px !important;
    margin-left: 4px !important;
  }
  .mx-lg-2 {
    margin-right: 8px !important;
    margin-left: 8px !important;
  }
  .mx-lg-3 {
    margin-right: 16px !important;
    margin-left: 16px !important;
  }
  .mx-lg-4 {
    margin-right: 24px !important;
    margin-left: 24px !important;
  }
  .mx-lg-5 {
    margin-right: 48px !important;
    margin-left: 48px !important;
  }
  .mx-lg-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .my-lg-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .my-lg-1 {
    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }
  .my-lg-2 {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }
  .my-lg-3 {
    margin-top: 16px !important;
    margin-bottom: 16px !important;
  }
  .my-lg-4 {
    margin-top: 24px !important;
    margin-bottom: 24px !important;
  }
  .my-lg-5 {
    margin-top: 48px !important;
    margin-bottom: 48px !important;
  }
  .my-lg-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .mt-lg-0 {
    margin-top: 0 !important;
  }
  .mt-lg-1 {
    margin-top: 4px !important;
  }
  .mt-lg-2 {
    margin-top: 8px !important;
  }
  .mt-lg-3 {
    margin-top: 16px !important;
  }
  .mt-lg-4 {
    margin-top: 24px !important;
  }
  .mt-lg-5 {
    margin-top: 48px !important;
  }
  .mt-lg-auto {
    margin-top: auto !important;
  }
  .me-lg-0 {
    margin-right: 0 !important;
  }
  .me-lg-1 {
    margin-right: 4px !important;
  }
  .me-lg-2 {
    margin-right: 8px !important;
  }
  .me-lg-3 {
    margin-right: 16px !important;
  }
  .me-lg-4 {
    margin-right: 24px !important;
  }
  .me-lg-5 {
    margin-right: 48px !important;
  }
  .me-lg-auto {
    margin-right: auto !important;
  }
  .mb-lg-0 {
    margin-bottom: 0 !important;
  }
  .mb-lg-1 {
    margin-bottom: 4px !important;
  }
  .mb-lg-2 {
    margin-bottom: 8px !important;
  }
  .mb-lg-3 {
    margin-bottom: 16px !important;
  }
  .mb-lg-4 {
    margin-bottom: 24px !important;
  }
  .mb-lg-5 {
    margin-bottom: 48px !important;
  }
  .mb-lg-auto {
    margin-bottom: auto !important;
  }
  .ms-lg-0 {
    margin-left: 0 !important;
  }
  .ms-lg-1 {
    margin-left: 4px !important;
  }
  .ms-lg-2 {
    margin-left: 8px !important;
  }
  .ms-lg-3 {
    margin-left: 16px !important;
  }
  .ms-lg-4 {
    margin-left: 24px !important;
  }
  .ms-lg-5 {
    margin-left: 48px !important;
  }
  .ms-lg-auto {
    margin-left: auto !important;
  }
  .p-lg-0 {
    padding: 0 !important;
  }
  .p-lg-1 {
    padding: 4px !important;
  }
  .p-lg-2 {
    padding: 8px !important;
  }
  .p-lg-3 {
    padding: 16px !important;
  }
  .p-lg-4 {
    padding: 24px !important;
  }
  .p-lg-5 {
    padding: 48px !important;
  }
  .px-lg-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .px-lg-1 {
    padding-right: 4px !important;
    padding-left: 4px !important;
  }
  .px-lg-2 {
    padding-right: 8px !important;
    padding-left: 8px !important;
  }
  .px-lg-3 {
    padding-right: 16px !important;
    padding-left: 16px !important;
  }
  .px-lg-4 {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  .px-lg-5 {
    padding-right: 48px !important;
    padding-left: 48px !important;
  }
  .py-lg-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-lg-1 {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
  .py-lg-2 {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
  .py-lg-3 {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }
  .py-lg-4 {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }
  .py-lg-5 {
    padding-top: 48px !important;
    padding-bottom: 48px !important;
  }
  .pt-lg-0 {
    padding-top: 0 !important;
  }
  .pt-lg-1 {
    padding-top: 4px !important;
  }
  .pt-lg-2 {
    padding-top: 8px !important;
  }
  .pt-lg-3 {
    padding-top: 16px !important;
  }
  .pt-lg-4 {
    padding-top: 24px !important;
  }
  .pt-lg-5 {
    padding-top: 48px !important;
  }
  .pe-lg-0 {
    padding-right: 0 !important;
  }
  .pe-lg-1 {
    padding-right: 4px !important;
  }
  .pe-lg-2 {
    padding-right: 8px !important;
  }
  .pe-lg-3 {
    padding-right: 16px !important;
  }
  .pe-lg-4 {
    padding-right: 24px !important;
  }
  .pe-lg-5 {
    padding-right: 48px !important;
  }
  .pb-lg-0 {
    padding-bottom: 0 !important;
  }
  .pb-lg-1 {
    padding-bottom: 4px !important;
  }
  .pb-lg-2 {
    padding-bottom: 8px !important;
  }
  .pb-lg-3 {
    padding-bottom: 16px !important;
  }
  .pb-lg-4 {
    padding-bottom: 24px !important;
  }
  .pb-lg-5 {
    padding-bottom: 48px !important;
  }
  .ps-lg-0 {
    padding-left: 0 !important;
  }
  .ps-lg-1 {
    padding-left: 4px !important;
  }
  .ps-lg-2 {
    padding-left: 8px !important;
  }
  .ps-lg-3 {
    padding-left: 16px !important;
  }
  .ps-lg-4 {
    padding-left: 24px !important;
  }
  .ps-lg-5 {
    padding-left: 48px !important;
  }
  .gap-lg-0 {
    gap: 0 !important;
  }
  .gap-lg-1 {
    gap: 4px !important;
  }
  .gap-lg-2 {
    gap: 8px !important;
  }
  .gap-lg-3 {
    gap: 16px !important;
  }
  .gap-lg-4 {
    gap: 24px !important;
  }
  .gap-lg-5 {
    gap: 48px !important;
  }
  .row-gap-lg-0 {
    row-gap: 0 !important;
  }
  .row-gap-lg-1 {
    row-gap: 4px !important;
  }
  .row-gap-lg-2 {
    row-gap: 8px !important;
  }
  .row-gap-lg-3 {
    row-gap: 16px !important;
  }
  .row-gap-lg-4 {
    row-gap: 24px !important;
  }
  .row-gap-lg-5 {
    row-gap: 48px !important;
  }
  .column-gap-lg-0 {
    column-gap: 0 !important;
  }
  .column-gap-lg-1 {
    column-gap: 4px !important;
  }
  .column-gap-lg-2 {
    column-gap: 8px !important;
  }
  .column-gap-lg-3 {
    column-gap: 16px !important;
  }
  .column-gap-lg-4 {
    column-gap: 24px !important;
  }
  .column-gap-lg-5 {
    column-gap: 48px !important;
  }
  .text-lg-start {
    text-align: left !important;
  }
  .text-lg-end {
    text-align: right !important;
  }
  .text-lg-center {
    text-align: center !important;
  }
}
@media (min-width: 1200px) {
  .float-xl-start {
    float: left !important;
  }
  .float-xl-end {
    float: right !important;
  }
  .float-xl-none {
    float: none !important;
  }
  .object-fit-xl-contain {
    object-fit: contain !important;
  }
  .object-fit-xl-cover {
    object-fit: cover !important;
  }
  .object-fit-xl-fill {
    object-fit: fill !important;
  }
  .object-fit-xl-scale {
    object-fit: scale-down !important;
  }
  .object-fit-xl-none {
    object-fit: none !important;
  }
  .d-xl-inline {
    display: inline !important;
  }
  .d-xl-inline-block {
    display: inline-block !important;
  }
  .d-xl-block {
    display: block !important;
  }
  .d-xl-grid {
    display: grid !important;
  }
  .d-xl-inline-grid {
    display: inline-grid !important;
  }
  .d-xl-table {
    display: table !important;
  }
  .d-xl-table-row {
    display: table-row !important;
  }
  .d-xl-table-cell {
    display: table-cell !important;
  }
  .d-xl-flex {
    display: flex !important;
  }
  .d-xl-inline-flex {
    display: inline-flex !important;
  }
  .d-xl-none {
    display: none !important;
  }
  .flex-xl-fill {
    flex: 1 1 auto !important;
  }
  .flex-xl-row {
    flex-direction: row !important;
  }
  .flex-xl-column {
    flex-direction: column !important;
  }
  .flex-xl-row-reverse {
    flex-direction: row-reverse !important;
  }
  .flex-xl-column-reverse {
    flex-direction: column-reverse !important;
  }
  .flex-xl-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-xl-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-xl-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-xl-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-xl-wrap {
    flex-wrap: wrap !important;
  }
  .flex-xl-nowrap {
    flex-wrap: nowrap !important;
  }
  .flex-xl-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .justify-content-xl-start {
    justify-content: flex-start !important;
  }
  .justify-content-xl-end {
    justify-content: flex-end !important;
  }
  .justify-content-xl-center {
    justify-content: center !important;
  }
  .justify-content-xl-between {
    justify-content: space-between !important;
  }
  .justify-content-xl-around {
    justify-content: space-around !important;
  }
  .justify-content-xl-evenly {
    justify-content: space-evenly !important;
  }
  .align-items-xl-start {
    align-items: flex-start !important;
  }
  .align-items-xl-end {
    align-items: flex-end !important;
  }
  .align-items-xl-center {
    align-items: center !important;
  }
  .align-items-xl-baseline {
    align-items: baseline !important;
  }
  .align-items-xl-stretch {
    align-items: stretch !important;
  }
  .align-content-xl-start {
    align-content: flex-start !important;
  }
  .align-content-xl-end {
    align-content: flex-end !important;
  }
  .align-content-xl-center {
    align-content: center !important;
  }
  .align-content-xl-between {
    align-content: space-between !important;
  }
  .align-content-xl-around {
    align-content: space-around !important;
  }
  .align-content-xl-stretch {
    align-content: stretch !important;
  }
  .align-self-xl-auto {
    align-self: auto !important;
  }
  .align-self-xl-start {
    align-self: flex-start !important;
  }
  .align-self-xl-end {
    align-self: flex-end !important;
  }
  .align-self-xl-center {
    align-self: center !important;
  }
  .align-self-xl-baseline {
    align-self: baseline !important;
  }
  .align-self-xl-stretch {
    align-self: stretch !important;
  }
  .order-xl-first {
    order: -1 !important;
  }
  .order-xl-0 {
    order: 0 !important;
  }
  .order-xl-1 {
    order: 1 !important;
  }
  .order-xl-2 {
    order: 2 !important;
  }
  .order-xl-3 {
    order: 3 !important;
  }
  .order-xl-4 {
    order: 4 !important;
  }
  .order-xl-5 {
    order: 5 !important;
  }
  .order-xl-last {
    order: 6 !important;
  }
  .m-xl-0 {
    margin: 0 !important;
  }
  .m-xl-1 {
    margin: 4px !important;
  }
  .m-xl-2 {
    margin: 8px !important;
  }
  .m-xl-3 {
    margin: 16px !important;
  }
  .m-xl-4 {
    margin: 24px !important;
  }
  .m-xl-5 {
    margin: 48px !important;
  }
  .m-xl-auto {
    margin: auto !important;
  }
  .mx-xl-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .mx-xl-1 {
    margin-right: 4px !important;
    margin-left: 4px !important;
  }
  .mx-xl-2 {
    margin-right: 8px !important;
    margin-left: 8px !important;
  }
  .mx-xl-3 {
    margin-right: 16px !important;
    margin-left: 16px !important;
  }
  .mx-xl-4 {
    margin-right: 24px !important;
    margin-left: 24px !important;
  }
  .mx-xl-5 {
    margin-right: 48px !important;
    margin-left: 48px !important;
  }
  .mx-xl-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .my-xl-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .my-xl-1 {
    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }
  .my-xl-2 {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }
  .my-xl-3 {
    margin-top: 16px !important;
    margin-bottom: 16px !important;
  }
  .my-xl-4 {
    margin-top: 24px !important;
    margin-bottom: 24px !important;
  }
  .my-xl-5 {
    margin-top: 48px !important;
    margin-bottom: 48px !important;
  }
  .my-xl-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .mt-xl-0 {
    margin-top: 0 !important;
  }
  .mt-xl-1 {
    margin-top: 4px !important;
  }
  .mt-xl-2 {
    margin-top: 8px !important;
  }
  .mt-xl-3 {
    margin-top: 16px !important;
  }
  .mt-xl-4 {
    margin-top: 24px !important;
  }
  .mt-xl-5 {
    margin-top: 48px !important;
  }
  .mt-xl-auto {
    margin-top: auto !important;
  }
  .me-xl-0 {
    margin-right: 0 !important;
  }
  .me-xl-1 {
    margin-right: 4px !important;
  }
  .me-xl-2 {
    margin-right: 8px !important;
  }
  .me-xl-3 {
    margin-right: 16px !important;
  }
  .me-xl-4 {
    margin-right: 24px !important;
  }
  .me-xl-5 {
    margin-right: 48px !important;
  }
  .me-xl-auto {
    margin-right: auto !important;
  }
  .mb-xl-0 {
    margin-bottom: 0 !important;
  }
  .mb-xl-1 {
    margin-bottom: 4px !important;
  }
  .mb-xl-2 {
    margin-bottom: 8px !important;
  }
  .mb-xl-3 {
    margin-bottom: 16px !important;
  }
  .mb-xl-4 {
    margin-bottom: 24px !important;
  }
  .mb-xl-5 {
    margin-bottom: 48px !important;
  }
  .mb-xl-auto {
    margin-bottom: auto !important;
  }
  .ms-xl-0 {
    margin-left: 0 !important;
  }
  .ms-xl-1 {
    margin-left: 4px !important;
  }
  .ms-xl-2 {
    margin-left: 8px !important;
  }
  .ms-xl-3 {
    margin-left: 16px !important;
  }
  .ms-xl-4 {
    margin-left: 24px !important;
  }
  .ms-xl-5 {
    margin-left: 48px !important;
  }
  .ms-xl-auto {
    margin-left: auto !important;
  }
  .p-xl-0 {
    padding: 0 !important;
  }
  .p-xl-1 {
    padding: 4px !important;
  }
  .p-xl-2 {
    padding: 8px !important;
  }
  .p-xl-3 {
    padding: 16px !important;
  }
  .p-xl-4 {
    padding: 24px !important;
  }
  .p-xl-5 {
    padding: 48px !important;
  }
  .px-xl-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .px-xl-1 {
    padding-right: 4px !important;
    padding-left: 4px !important;
  }
  .px-xl-2 {
    padding-right: 8px !important;
    padding-left: 8px !important;
  }
  .px-xl-3 {
    padding-right: 16px !important;
    padding-left: 16px !important;
  }
  .px-xl-4 {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  .px-xl-5 {
    padding-right: 48px !important;
    padding-left: 48px !important;
  }
  .py-xl-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-xl-1 {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
  .py-xl-2 {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
  .py-xl-3 {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }
  .py-xl-4 {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }
  .py-xl-5 {
    padding-top: 48px !important;
    padding-bottom: 48px !important;
  }
  .pt-xl-0 {
    padding-top: 0 !important;
  }
  .pt-xl-1 {
    padding-top: 4px !important;
  }
  .pt-xl-2 {
    padding-top: 8px !important;
  }
  .pt-xl-3 {
    padding-top: 16px !important;
  }
  .pt-xl-4 {
    padding-top: 24px !important;
  }
  .pt-xl-5 {
    padding-top: 48px !important;
  }
  .pe-xl-0 {
    padding-right: 0 !important;
  }
  .pe-xl-1 {
    padding-right: 4px !important;
  }
  .pe-xl-2 {
    padding-right: 8px !important;
  }
  .pe-xl-3 {
    padding-right: 16px !important;
  }
  .pe-xl-4 {
    padding-right: 24px !important;
  }
  .pe-xl-5 {
    padding-right: 48px !important;
  }
  .pb-xl-0 {
    padding-bottom: 0 !important;
  }
  .pb-xl-1 {
    padding-bottom: 4px !important;
  }
  .pb-xl-2 {
    padding-bottom: 8px !important;
  }
  .pb-xl-3 {
    padding-bottom: 16px !important;
  }
  .pb-xl-4 {
    padding-bottom: 24px !important;
  }
  .pb-xl-5 {
    padding-bottom: 48px !important;
  }
  .ps-xl-0 {
    padding-left: 0 !important;
  }
  .ps-xl-1 {
    padding-left: 4px !important;
  }
  .ps-xl-2 {
    padding-left: 8px !important;
  }
  .ps-xl-3 {
    padding-left: 16px !important;
  }
  .ps-xl-4 {
    padding-left: 24px !important;
  }
  .ps-xl-5 {
    padding-left: 48px !important;
  }
  .gap-xl-0 {
    gap: 0 !important;
  }
  .gap-xl-1 {
    gap: 4px !important;
  }
  .gap-xl-2 {
    gap: 8px !important;
  }
  .gap-xl-3 {
    gap: 16px !important;
  }
  .gap-xl-4 {
    gap: 24px !important;
  }
  .gap-xl-5 {
    gap: 48px !important;
  }
  .row-gap-xl-0 {
    row-gap: 0 !important;
  }
  .row-gap-xl-1 {
    row-gap: 4px !important;
  }
  .row-gap-xl-2 {
    row-gap: 8px !important;
  }
  .row-gap-xl-3 {
    row-gap: 16px !important;
  }
  .row-gap-xl-4 {
    row-gap: 24px !important;
  }
  .row-gap-xl-5 {
    row-gap: 48px !important;
  }
  .column-gap-xl-0 {
    column-gap: 0 !important;
  }
  .column-gap-xl-1 {
    column-gap: 4px !important;
  }
  .column-gap-xl-2 {
    column-gap: 8px !important;
  }
  .column-gap-xl-3 {
    column-gap: 16px !important;
  }
  .column-gap-xl-4 {
    column-gap: 24px !important;
  }
  .column-gap-xl-5 {
    column-gap: 48px !important;
  }
  .text-xl-start {
    text-align: left !important;
  }
  .text-xl-end {
    text-align: right !important;
  }
  .text-xl-center {
    text-align: center !important;
  }
}
@media (min-width: 1400px) {
  .float-xxl-start {
    float: left !important;
  }
  .float-xxl-end {
    float: right !important;
  }
  .float-xxl-none {
    float: none !important;
  }
  .object-fit-xxl-contain {
    object-fit: contain !important;
  }
  .object-fit-xxl-cover {
    object-fit: cover !important;
  }
  .object-fit-xxl-fill {
    object-fit: fill !important;
  }
  .object-fit-xxl-scale {
    object-fit: scale-down !important;
  }
  .object-fit-xxl-none {
    object-fit: none !important;
  }
  .d-xxl-inline {
    display: inline !important;
  }
  .d-xxl-inline-block {
    display: inline-block !important;
  }
  .d-xxl-block {
    display: block !important;
  }
  .d-xxl-grid {
    display: grid !important;
  }
  .d-xxl-inline-grid {
    display: inline-grid !important;
  }
  .d-xxl-table {
    display: table !important;
  }
  .d-xxl-table-row {
    display: table-row !important;
  }
  .d-xxl-table-cell {
    display: table-cell !important;
  }
  .d-xxl-flex {
    display: flex !important;
  }
  .d-xxl-inline-flex {
    display: inline-flex !important;
  }
  .d-xxl-none {
    display: none !important;
  }
  .flex-xxl-fill {
    flex: 1 1 auto !important;
  }
  .flex-xxl-row {
    flex-direction: row !important;
  }
  .flex-xxl-column {
    flex-direction: column !important;
  }
  .flex-xxl-row-reverse {
    flex-direction: row-reverse !important;
  }
  .flex-xxl-column-reverse {
    flex-direction: column-reverse !important;
  }
  .flex-xxl-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-xxl-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-xxl-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-xxl-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-xxl-wrap {
    flex-wrap: wrap !important;
  }
  .flex-xxl-nowrap {
    flex-wrap: nowrap !important;
  }
  .flex-xxl-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .justify-content-xxl-start {
    justify-content: flex-start !important;
  }
  .justify-content-xxl-end {
    justify-content: flex-end !important;
  }
  .justify-content-xxl-center {
    justify-content: center !important;
  }
  .justify-content-xxl-between {
    justify-content: space-between !important;
  }
  .justify-content-xxl-around {
    justify-content: space-around !important;
  }
  .justify-content-xxl-evenly {
    justify-content: space-evenly !important;
  }
  .align-items-xxl-start {
    align-items: flex-start !important;
  }
  .align-items-xxl-end {
    align-items: flex-end !important;
  }
  .align-items-xxl-center {
    align-items: center !important;
  }
  .align-items-xxl-baseline {
    align-items: baseline !important;
  }
  .align-items-xxl-stretch {
    align-items: stretch !important;
  }
  .align-content-xxl-start {
    align-content: flex-start !important;
  }
  .align-content-xxl-end {
    align-content: flex-end !important;
  }
  .align-content-xxl-center {
    align-content: center !important;
  }
  .align-content-xxl-between {
    align-content: space-between !important;
  }
  .align-content-xxl-around {
    align-content: space-around !important;
  }
  .align-content-xxl-stretch {
    align-content: stretch !important;
  }
  .align-self-xxl-auto {
    align-self: auto !important;
  }
  .align-self-xxl-start {
    align-self: flex-start !important;
  }
  .align-self-xxl-end {
    align-self: flex-end !important;
  }
  .align-self-xxl-center {
    align-self: center !important;
  }
  .align-self-xxl-baseline {
    align-self: baseline !important;
  }
  .align-self-xxl-stretch {
    align-self: stretch !important;
  }
  .order-xxl-first {
    order: -1 !important;
  }
  .order-xxl-0 {
    order: 0 !important;
  }
  .order-xxl-1 {
    order: 1 !important;
  }
  .order-xxl-2 {
    order: 2 !important;
  }
  .order-xxl-3 {
    order: 3 !important;
  }
  .order-xxl-4 {
    order: 4 !important;
  }
  .order-xxl-5 {
    order: 5 !important;
  }
  .order-xxl-last {
    order: 6 !important;
  }
  .m-xxl-0 {
    margin: 0 !important;
  }
  .m-xxl-1 {
    margin: 4px !important;
  }
  .m-xxl-2 {
    margin: 8px !important;
  }
  .m-xxl-3 {
    margin: 16px !important;
  }
  .m-xxl-4 {
    margin: 24px !important;
  }
  .m-xxl-5 {
    margin: 48px !important;
  }
  .m-xxl-auto {
    margin: auto !important;
  }
  .mx-xxl-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .mx-xxl-1 {
    margin-right: 4px !important;
    margin-left: 4px !important;
  }
  .mx-xxl-2 {
    margin-right: 8px !important;
    margin-left: 8px !important;
  }
  .mx-xxl-3 {
    margin-right: 16px !important;
    margin-left: 16px !important;
  }
  .mx-xxl-4 {
    margin-right: 24px !important;
    margin-left: 24px !important;
  }
  .mx-xxl-5 {
    margin-right: 48px !important;
    margin-left: 48px !important;
  }
  .mx-xxl-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .my-xxl-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .my-xxl-1 {
    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }
  .my-xxl-2 {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }
  .my-xxl-3 {
    margin-top: 16px !important;
    margin-bottom: 16px !important;
  }
  .my-xxl-4 {
    margin-top: 24px !important;
    margin-bottom: 24px !important;
  }
  .my-xxl-5 {
    margin-top: 48px !important;
    margin-bottom: 48px !important;
  }
  .my-xxl-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .mt-xxl-0 {
    margin-top: 0 !important;
  }
  .mt-xxl-1 {
    margin-top: 4px !important;
  }
  .mt-xxl-2 {
    margin-top: 8px !important;
  }
  .mt-xxl-3 {
    margin-top: 16px !important;
  }
  .mt-xxl-4 {
    margin-top: 24px !important;
  }
  .mt-xxl-5 {
    margin-top: 48px !important;
  }
  .mt-xxl-auto {
    margin-top: auto !important;
  }
  .me-xxl-0 {
    margin-right: 0 !important;
  }
  .me-xxl-1 {
    margin-right: 4px !important;
  }
  .me-xxl-2 {
    margin-right: 8px !important;
  }
  .me-xxl-3 {
    margin-right: 16px !important;
  }
  .me-xxl-4 {
    margin-right: 24px !important;
  }
  .me-xxl-5 {
    margin-right: 48px !important;
  }
  .me-xxl-auto {
    margin-right: auto !important;
  }
  .mb-xxl-0 {
    margin-bottom: 0 !important;
  }
  .mb-xxl-1 {
    margin-bottom: 4px !important;
  }
  .mb-xxl-2 {
    margin-bottom: 8px !important;
  }
  .mb-xxl-3 {
    margin-bottom: 16px !important;
  }
  .mb-xxl-4 {
    margin-bottom: 24px !important;
  }
  .mb-xxl-5 {
    margin-bottom: 48px !important;
  }
  .mb-xxl-auto {
    margin-bottom: auto !important;
  }
  .ms-xxl-0 {
    margin-left: 0 !important;
  }
  .ms-xxl-1 {
    margin-left: 4px !important;
  }
  .ms-xxl-2 {
    margin-left: 8px !important;
  }
  .ms-xxl-3 {
    margin-left: 16px !important;
  }
  .ms-xxl-4 {
    margin-left: 24px !important;
  }
  .ms-xxl-5 {
    margin-left: 48px !important;
  }
  .ms-xxl-auto {
    margin-left: auto !important;
  }
  .p-xxl-0 {
    padding: 0 !important;
  }
  .p-xxl-1 {
    padding: 4px !important;
  }
  .p-xxl-2 {
    padding: 8px !important;
  }
  .p-xxl-3 {
    padding: 16px !important;
  }
  .p-xxl-4 {
    padding: 24px !important;
  }
  .p-xxl-5 {
    padding: 48px !important;
  }
  .px-xxl-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .px-xxl-1 {
    padding-right: 4px !important;
    padding-left: 4px !important;
  }
  .px-xxl-2 {
    padding-right: 8px !important;
    padding-left: 8px !important;
  }
  .px-xxl-3 {
    padding-right: 16px !important;
    padding-left: 16px !important;
  }
  .px-xxl-4 {
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
  .px-xxl-5 {
    padding-right: 48px !important;
    padding-left: 48px !important;
  }
  .py-xxl-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-xxl-1 {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
  .py-xxl-2 {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
  .py-xxl-3 {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }
  .py-xxl-4 {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }
  .py-xxl-5 {
    padding-top: 48px !important;
    padding-bottom: 48px !important;
  }
  .pt-xxl-0 {
    padding-top: 0 !important;
  }
  .pt-xxl-1 {
    padding-top: 4px !important;
  }
  .pt-xxl-2 {
    padding-top: 8px !important;
  }
  .pt-xxl-3 {
    padding-top: 16px !important;
  }
  .pt-xxl-4 {
    padding-top: 24px !important;
  }
  .pt-xxl-5 {
    padding-top: 48px !important;
  }
  .pe-xxl-0 {
    padding-right: 0 !important;
  }
  .pe-xxl-1 {
    padding-right: 4px !important;
  }
  .pe-xxl-2 {
    padding-right: 8px !important;
  }
  .pe-xxl-3 {
    padding-right: 16px !important;
  }
  .pe-xxl-4 {
    padding-right: 24px !important;
  }
  .pe-xxl-5 {
    padding-right: 48px !important;
  }
  .pb-xxl-0 {
    padding-bottom: 0 !important;
  }
  .pb-xxl-1 {
    padding-bottom: 4px !important;
  }
  .pb-xxl-2 {
    padding-bottom: 8px !important;
  }
  .pb-xxl-3 {
    padding-bottom: 16px !important;
  }
  .pb-xxl-4 {
    padding-bottom: 24px !important;
  }
  .pb-xxl-5 {
    padding-bottom: 48px !important;
  }
  .ps-xxl-0 {
    padding-left: 0 !important;
  }
  .ps-xxl-1 {
    padding-left: 4px !important;
  }
  .ps-xxl-2 {
    padding-left: 8px !important;
  }
  .ps-xxl-3 {
    padding-left: 16px !important;
  }
  .ps-xxl-4 {
    padding-left: 24px !important;
  }
  .ps-xxl-5 {
    padding-left: 48px !important;
  }
  .gap-xxl-0 {
    gap: 0 !important;
  }
  .gap-xxl-1 {
    gap: 4px !important;
  }
  .gap-xxl-2 {
    gap: 8px !important;
  }
  .gap-xxl-3 {
    gap: 16px !important;
  }
  .gap-xxl-4 {
    gap: 24px !important;
  }
  .gap-xxl-5 {
    gap: 48px !important;
  }
  .row-gap-xxl-0 {
    row-gap: 0 !important;
  }
  .row-gap-xxl-1 {
    row-gap: 4px !important;
  }
  .row-gap-xxl-2 {
    row-gap: 8px !important;
  }
  .row-gap-xxl-3 {
    row-gap: 16px !important;
  }
  .row-gap-xxl-4 {
    row-gap: 24px !important;
  }
  .row-gap-xxl-5 {
    row-gap: 48px !important;
  }
  .column-gap-xxl-0 {
    column-gap: 0 !important;
  }
  .column-gap-xxl-1 {
    column-gap: 4px !important;
  }
  .column-gap-xxl-2 {
    column-gap: 8px !important;
  }
  .column-gap-xxl-3 {
    column-gap: 16px !important;
  }
  .column-gap-xxl-4 {
    column-gap: 24px !important;
  }
  .column-gap-xxl-5 {
    column-gap: 48px !important;
  }
  .text-xxl-start {
    text-align: left !important;
  }
  .text-xxl-end {
    text-align: right !important;
  }
  .text-xxl-center {
    text-align: center !important;
  }
}
@media (min-width: 1200px) {
  .fs-4 {
    font-size: 1.3125rem !important;
  }
}
@media print {
  .d-print-inline {
    display: inline !important;
  }
  .d-print-inline-block {
    display: inline-block !important;
  }
  .d-print-block {
    display: block !important;
  }
  .d-print-grid {
    display: grid !important;
  }
  .d-print-inline-grid {
    display: inline-grid !important;
  }
  .d-print-table {
    display: table !important;
  }
  .d-print-table-row {
    display: table-row !important;
  }
  .d-print-table-cell {
    display: table-cell !important;
  }
  .d-print-flex {
    display: flex !important;
  }
  .d-print-inline-flex {
    display: inline-flex !important;
  }
  .d-print-none {
    display: none !important;
  }
}
html,
body {
  overflow: hidden;
  height: 500px;
}
html.interstitial,
html.interstitial body {
  height: 100vh;
}
#app {
  width: 366px;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  height: 100%;
}
.interstitial #app {
  width: unset;
}
@media only screen and (min-resolution: 2dppx) {
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
.alert-info {
  --bs-alert-color: rgb(73, 73, 242);
  --bs-info-text-emphasis: rgb(73, 73, 242);
  --bs-info-bg-subtle: rgba(73, 73, 242, 0.1);
  --bs-alert-border-color: var(--bs-info-bg-subtle) !important;
}
[data-bs-theme=dark] .alert-info {
  --bs-alert-color: var(--bs-primary-text-emphasis);
  --bs-alert-bg: var(--bs-primary-bg-subtle);
  --bs-alert-border-color: var(--bs-primary-border-subtle);
  --bs-alert-link-color: var(--bs-primary-text-emphasis);
}
.list-group {
  --bs-list-group-border-color: rgb(240, 240, 245);
}
[data-bs-theme=dark] .list-group {
  --bs-list-group-border-color: rgb(50, 50, 66);
  --bs-list-group-color: rgb(240, 240, 245);
}
[data-bs-theme=dark] .navbar-nav {
  --bs-navbar-hover-color: #fff;
  --bs-navbar-active-color: #fff;
  --bs-nav-link-color: rgb(130, 130, 153);
}
[data-bs-theme=dark] .shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}
[data-bs-theme=dark] .shadow-sm {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.08) !important;
}
[data-bs-theme=dark] .shadow-lg {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}
.placeholder {
  background-color: rgb(240, 240, 245) !important;
}
[data-bs-theme=dark] .placeholder {
  background-color: rgb(50, 50, 66) !important;
}
.toastify.alert {
  position: fixed;
  font-weight: 500;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  z-index: 2147483647;
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  cursor: pointer;
  text-align: center;
  padding: 10px;
}
.toastify.on {
  opacity: 1;
}
.toast-close {
  opacity: 0.4;
}
.toastify-top {
  top: -150px;
}
.toast-close {
  border: none;
  background: transparent;
  color: currentColor;
  line-height: normal;
  font-weight: normal;
  margin-left: 0.875rem;
}
.toastify-center {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  max-width: calc(100% - 48px);
}
[data-bs-theme=dark] .toastify.alert {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
[data-bs-theme=dark] .btn-secondary {
  --bs-btn-color: rgb(240, 240, 245);
  --bs-btn-bg: rgb(50, 50, 66);
  --bs-btn-border-color: rgb(50, 50, 66);
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #51515e;
  --bs-btn-hover-border-color: #474755;
  --bs-btn-focus-shadow-rgb: 79, 79, 93;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #5b5b68;
  --bs-btn-active-border-color: #474755;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: rgb(50, 50, 66);
  --bs-btn-disabled-border-color: rgb(50, 50, 66);
}
[data-bs-theme=dark] .form-control {
  background-color: rgb(50, 50, 66);
  color: rgb(255, 255, 255);
  border: var(--bs-border-width) solid rgb(50, 50, 66);
}.navbar-nav[data-v-d4bf3661] {
  --bs-navbar-hover-color: rgb(73, 73, 242);
  --bs-navbar-active-color: rgb(73, 73, 242);
}
.bg[data-v-d4bf3661] {
  fill: #fff;
}
.mask[data-v-d4bf3661] {
  fill: #000;
}
[data-bs-theme=dark] .bg[data-v-d4bf3661] {
  fill: #000;
}
[data-bs-theme=dark] .mask[data-v-d4bf3661] {
  fill: #fff;
}.navbar-nav[data-v-0e21acfd] {
  --bs-navbar-hover-color: rgb(73, 73, 242);
  --bs-navbar-active-color: rgb(73, 73, 242);
}
.btn-link[data-v-0e21acfd] {
  font-weight: 500;
}
.btn-icon[data-v-0e21acfd] {
  width: 40px;
  height: 40px;
  padding: 10px;
  border: none;
  color: var(--bs-btn-hover-color);
  line-height: 1;
}
.btn-icon.btn-sm[data-v-0e21acfd] {
  width: 24px;
  height: 24px;
  padding: 4px;
}
.btn-nav[data-v-0e21acfd] {
  color: rgb(130, 130, 153);
}
.btn-nav[data-v-0e21acfd]:hover {
  background-color: var(--bs-tertiary-bg);
}
[data-bs-theme=dark] .btn-nav[data-v-0e21acfd] {
  color: rgb(184, 184, 204);
  background-color: rgb(50, 50, 66);
}
[data-bs-theme=dark] .btn-nav[data-v-0e21acfd]:hover {
  background-color: #3a3a4d;
}.navbar-nav[data-v-869f8be5] {
  --bs-navbar-hover-color: rgb(73, 73, 242);
  --bs-navbar-active-color: rgb(73, 73, 242);
}
.policy-link[data-v-869f8be5] {
  color: rgb(130, 130, 153);
}
.policy-link a[data-v-869f8be5] {
  color: inherit;
}
.content[data-v-869f8be5] {
  max-width: 600px;
}
.content > h2[data-v-869f8be5] {
  font-size: 24px;
  margin: 16px 0;
  text-align: center;
}
.content > p[data-v-869f8be5] {
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 30px;
  text-align: center;
}
.optin-option[data-v-869f8be5] {
  border: 1px solid rgb(184, 184, 204);
  border-radius: 8px;
  margin-bottom: 10px;
}
.optin-header[data-v-869f8be5] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}
.optin-header span[data-v-869f8be5] {
  flex: 0 0 85%;
}
.optin-title[data-v-869f8be5] {
  font-weight: 500;
  color: var(--bs-body-color);
}
.optin-info[data-v-869f8be5] {
  border-top: 1px solid rgb(240, 240, 245);
  padding: 16px;
  color: rgb(130, 130, 153);
  line-height: 22px;
}.navbar-nav[data-v-98bc6a62] {
  --bs-navbar-hover-color: rgb(73, 73, 242);
  --bs-navbar-active-color: rgb(73, 73, 242);
}
.install-header[data-v-98bc6a62] {
  background: linear-gradient(90deg, #1b1c26 23%, #202040 80%, #1b1c26);
  display: block !important;
  border-bottom: 0 !important;
  margin: 0px !important;
  padding: 0px !important;
}
.header-content[data-v-98bc6a62] {
  text-align: center;
  padding-top: 50px;
}
.header-content h2[data-v-98bc6a62] {
  color: white;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
}
.header-content h2 span[data-v-98bc6a62] {
  color: rgb(212, 245, 196);
}
.header-content span.sub-heading[data-v-98bc6a62] {
  color: rgb(184, 184, 204);
  margin-bottom: 50px;
  font-weight: normal !important;
  font-size: 1rem;
}
.header-bg[data-v-98bc6a62] {
  background: url("/assets/install-header.svg") no-repeat;
  background-position: center;
  height: 58px;
}`;
  document.head.appendChild(__vite_style__);
  function makeMap(str, expectsLowerCase) {
    const map2 = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map2[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
  }
  function normalizeStyle(value) {
    if (isArray$1(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value)) {
      return value;
    } else if (isObject(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*.*?\*\//gs;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray$1(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
  const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
  const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function looseCompareArrays(a, b) {
    if (a.length !== b.length)
      return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i]);
    }
    return equal;
  }
  function looseEqual(a, b) {
    if (a === b)
      return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray$1(a);
    bValidType = isArray$1(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return String(a) === String(b);
  }
  function looseIndexOf(arr, val) {
    return arr.findIndex((item) => looseEqual(item, val));
  }
  const EMPTY_OBJ = Object.freeze({});
  const EMPTY_ARR = Object.freeze([]);
  const NOOP = () => {
  };
  const NO = () => false;
  const onRE = /^on[^a-z]/;
  const isOn = (key) => onRE.test(key);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray$1 = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](arg);
    }
  };
  const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      value
    });
  };
  const looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function warn$1(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
  }
  let activeEffectScope;
  class EffectScope {
    constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this.effects = [];
      this.cleanups = [];
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    get active() {
      return this._active;
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      } else {
        warn$1(`cannot run an inactive effect scope.`);
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      activeEffectScope = this;
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      activeEffectScope = this.parent;
    }
    stop(fromParent) {
      if (this._active) {
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
        this._active = false;
      }
    }
  }
  function effectScope(detached) {
    return new EffectScope(detached);
  }
  function recordEffectScope(effect, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  function onScopeDispose(fn) {
    if (activeEffectScope) {
      activeEffectScope.cleanups.push(fn);
    } else {
      warn$1(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
    }
  }
  const createDep = (effects) => {
    const dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
  };
  const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
  const newTracked = (dep) => (dep.n & trackOpBit) > 0;
  const initDepMarkers = ({ deps }) => {
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].w |= trackOpBit;
      }
    }
  };
  const finalizeDepMarkers = (effect) => {
    const { deps } = effect;
    if (deps.length) {
      let ptr = 0;
      for (let i = 0; i < deps.length; i++) {
        const dep = deps[i];
        if (wasTracked(dep) && !newTracked(dep)) {
          dep.delete(effect);
        } else {
          deps[ptr++] = dep;
        }
        dep.w &= ~trackOpBit;
        dep.n &= ~trackOpBit;
      }
      deps.length = ptr;
    }
  };
  const targetMap = /* @__PURE__ */ new WeakMap();
  let effectTrackDepth = 0;
  let trackOpBit = 1;
  const maxMarkerBits = 30;
  let activeEffect;
  const ITERATE_KEY = Symbol("iterate");
  const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
  class ReactiveEffect {
    constructor(fn, scheduler = null, scope) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this.parent = void 0;
      recordEffectScope(this, scope);
    }
    run() {
      if (!this.active) {
        return this.fn();
      }
      let parent = activeEffect;
      let lastShouldTrack = shouldTrack;
      while (parent) {
        if (parent === this) {
          return;
        }
        parent = parent.parent;
      }
      try {
        this.parent = activeEffect;
        activeEffect = this;
        shouldTrack = true;
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        activeEffect = this.parent;
        shouldTrack = lastShouldTrack;
        this.parent = void 0;
        if (this.deferStop) {
          this.stop();
        }
      }
    }
    stop() {
      if (activeEffect === this) {
        this.deferStop = true;
      } else if (this.active) {
        cleanupEffect(this);
        if (this.onStop) {
          this.onStop();
        }
        this.active = false;
      }
    }
  }
  function cleanupEffect(effect) {
    const { deps } = effect;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect);
      }
      deps.length = 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track$1(target, type, key) {
    if (shouldTrack && activeEffect) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = createDep());
      }
      const eventInfo = { effect: activeEffect, target, type, key };
      trackEffects(dep, eventInfo);
    }
  }
  function trackEffects(dep, debuggerEventExtraInfo) {
    let shouldTrack2 = false;
    if (effectTrackDepth <= maxMarkerBits) {
      if (!newTracked(dep)) {
        dep.n |= trackOpBit;
        shouldTrack2 = !wasTracked(dep);
      }
    } else {
      shouldTrack2 = !dep.has(activeEffect);
    }
    if (shouldTrack2) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (activeEffect.onTrack) {
        activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let deps = [];
    if (type === "clear") {
      deps = [...depsMap.values()];
    } else if (key === "length" && isArray$1(target)) {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newLength) {
          deps.push(dep);
        }
      });
    } else {
      if (key !== void 0) {
        deps.push(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray$1(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            deps.push(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray$1(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
    if (deps.length === 1) {
      if (deps[0]) {
        {
          triggerEffects(deps[0], eventInfo);
        }
      }
    } else {
      const effects = [];
      for (const dep of deps) {
        if (dep) {
          effects.push(...dep);
        }
      }
      {
        triggerEffects(createDep(effects), eventInfo);
      }
    }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
    const effects = isArray$1(dep) ? dep : [...dep];
    for (const effect of effects) {
      if (effect.computed) {
        triggerEffect(effect, debuggerEventExtraInfo);
      }
    }
    for (const effect of effects) {
      if (!effect.computed) {
        triggerEffect(effect, debuggerEventExtraInfo);
      }
    }
  }
  function triggerEffect(effect, debuggerEventExtraInfo) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
      }
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
  function getDepFromReactive(object, key) {
    var _a;
    return (_a = targetMap.get(object)) === null || _a === void 0 ? void 0 : _a.get(key);
  }
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  const get$1 = /* @__PURE__ */ createGetter();
  const shallowGet = /* @__PURE__ */ createGetter(false, true);
  const readonlyGet = /* @__PURE__ */ createGetter(true);
  const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
  const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track$1(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function hasOwnProperty(key) {
    const obj = toRaw(this);
    track$1(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  function createGetter(isReadonly2 = false, shallow = false) {
    return function get2(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return shallow;
      } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray$1(target);
      if (!isReadonly2) {
        if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track$1(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    };
  }
  const set$1 = /* @__PURE__ */ createSetter();
  const shallowSet = /* @__PURE__ */ createSetter(true);
  function createSetter(shallow = false) {
    return function set2(target, key, value, receiver) {
      let oldValue = target[key];
      if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
        return false;
      }
      if (!shallow) {
        if (!isShallow$1(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function has$1(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track$1(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track$1(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  const mutableHandlers = {
    get: get$1,
    set: set$1,
    deleteProperty,
    has: has$1,
    ownKeys
  };
  const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      {
        warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    },
    deleteProperty(target, key) {
      {
        warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
  };
  const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
  });
  const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
  });
  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function get(target, key, isReadonly2 = false, isShallow2 = false) {
    target = target[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (key !== rawKey) {
        track$1(rawTarget, "get", key);
      }
      track$1(rawTarget, "get", rawKey);
    }
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has(key, isReadonly2 = false) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (key !== rawKey) {
        track$1(rawTarget, "has", key);
      }
      track$1(rawTarget, "has", rawKey);
    }
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly2 = false) {
    target = target[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    !isReadonly2 && track$1(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$2(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get2.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get2 ? get2.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = isMap(target) ? new Map(target) : new Set(target);
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly2, isShallow2) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ];
      const rawTarget = toRaw(target);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track$1(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track$1(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get(this, key);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set: set$2,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set: set$2,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* TriggerOpTypes.ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* TriggerOpTypes.SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* TriggerOpTypes.DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* TriggerOpTypes.CLEAR */
      ),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* TriggerOpTypes.ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* TriggerOpTypes.SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* TriggerOpTypes.DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* TriggerOpTypes.CLEAR */
      ),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type = toRawType(target);
      console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value[
      "__v_skip"
      /* ReactiveFlags.SKIP */
    ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      {
        console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
    }
    if (target[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ] && !(isReadonly2 && target[
      "__v_isReactive"
      /* ReactiveFlags.IS_REACTIVE */
    ])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ]);
    }
    return !!(value && value[
      "__v_isReactive"
      /* ReactiveFlags.IS_REACTIVE */
    ]);
  }
  function isReadonly(value) {
    return !!(value && value[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ]);
  }
  function isShallow$1(value) {
    return !!(value && value[
      "__v_isShallow"
      /* ReactiveFlags.IS_SHALLOW */
    ]);
  }
  function isProxy(value) {
    return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
    const raw = observed && observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    def(value, "__v_skip", true);
    return value;
  }
  const toReactive = (value) => isObject(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject(value) ? readonly(value) : value;
  function trackRefValue(ref2) {
    if (shouldTrack && activeEffect) {
      ref2 = toRaw(ref2);
      {
        trackEffects(ref2.dep || (ref2.dep = createDep()), {
          target: ref2,
          type: "get",
          key: "value"
        });
      }
    }
  }
  function triggerRefValue(ref2, newVal) {
    ref2 = toRaw(ref2);
    const dep = ref2.dep;
    if (dep) {
      {
        triggerEffects(dep, {
          target: ref2,
          type: "set",
          key: "value",
          newValue: newVal
        });
      }
    }
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function ref(value) {
    return createRef(value, false);
  }
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, __v_isShallow) {
      this.__v_isShallow = __v_isShallow;
      this.dep = void 0;
      this.__v_isRef = true;
      this._rawValue = __v_isShallow ? value : toRaw(value);
      this._value = __v_isShallow ? value : toReactive(value);
    }
    get value() {
      trackRefValue(this);
      return this._value;
    }
    set value(newVal) {
      const useDirectValue = this.__v_isShallow || isShallow$1(newVal) || isReadonly(newVal);
      newVal = useDirectValue ? newVal : toRaw(newVal);
      if (hasChanged(newVal, this._rawValue)) {
        this._rawValue = newVal;
        this._value = useDirectValue ? newVal : toReactive(newVal);
        triggerRefValue(this, newVal);
      }
    }
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  function toRefs(object) {
    if (!isProxy(object)) {
      console.warn(`toRefs() expects a reactive object but received a plain one.`);
    }
    const ret = isArray$1(object) ? new Array(object.length) : {};
    for (const key in object) {
      ret[key] = toRef(object, key);
    }
    return ret;
  }
  class ObjectRefImpl {
    constructor(_object, _key, _defaultValue) {
      this._object = _object;
      this._key = _key;
      this._defaultValue = _defaultValue;
      this.__v_isRef = true;
    }
    get value() {
      const val = this._object[this._key];
      return val === void 0 ? this._defaultValue : val;
    }
    set value(newVal) {
      this._object[this._key] = newVal;
    }
    get dep() {
      return getDepFromReactive(toRaw(this._object), this._key);
    }
  }
  function toRef(object, key, defaultValue) {
    const val = object[key];
    return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
  }
  var _a$1;
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly2, isSSR) {
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this[_a$1] = false;
      this._dirty = true;
      this.effect = new ReactiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerRefValue(this);
        }
      });
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this[
        "__v_isReadonly"
        /* ReactiveFlags.IS_READONLY */
      ] = isReadonly2;
    }
    get value() {
      const self2 = toRaw(this);
      trackRefValue(self2);
      if (self2._dirty || !self2._cacheable) {
        self2._dirty = false;
        self2._value = self2.effect.run();
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
  }
  _a$1 = "__v_isReadonly";
  function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = () => {
        console.warn("Write operation failed: computed value is readonly");
      };
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    if (debugOptions && !isSSR) {
      cRef.effect.onTrack = debugOptions.onTrack;
      cRef.effect.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
  }
  const stack = [];
  function pushWarningContext(vnode) {
    stack.push(vnode);
  }
  function popWarningContext() {
    stack.pop();
  }
  function warn(msg, ...args) {
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(appWarnHandler, instance, 11, [
        msg + args.join(""),
        instance && instance.proxy,
        trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
        trace
      ]);
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && // avoid spamming console during tests
      true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open2 = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
    const close = `>` + postfix;
    return vnode.props ? [open2, ...formatProps(vnode.props), close] : [open2 + close];
  }
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (isRef(value)) {
      value = formatProp(key, toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  const ErrorTypeStrings = {
    [
      "sp"
      /* LifecycleHooks.SERVER_PREFETCH */
    ]: "serverPrefetch hook",
    [
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    ]: "beforeCreate hook",
    [
      "c"
      /* LifecycleHooks.CREATED */
    ]: "created hook",
    [
      "bm"
      /* LifecycleHooks.BEFORE_MOUNT */
    ]: "beforeMount hook",
    [
      "m"
      /* LifecycleHooks.MOUNTED */
    ]: "mounted hook",
    [
      "bu"
      /* LifecycleHooks.BEFORE_UPDATE */
    ]: "beforeUpdate hook",
    [
      "u"
      /* LifecycleHooks.UPDATED */
    ]: "updated",
    [
      "bum"
      /* LifecycleHooks.BEFORE_UNMOUNT */
    ]: "beforeUnmount hook",
    [
      "um"
      /* LifecycleHooks.UNMOUNTED */
    ]: "unmounted hook",
    [
      "a"
      /* LifecycleHooks.ACTIVATED */
    ]: "activated hook",
    [
      "da"
      /* LifecycleHooks.DEACTIVATED */
    ]: "deactivated hook",
    [
      "ec"
      /* LifecycleHooks.ERROR_CAPTURED */
    ]: "errorCaptured hook",
    [
      "rtc"
      /* LifecycleHooks.RENDER_TRACKED */
    ]: "renderTracked hook",
    [
      "rtg"
      /* LifecycleHooks.RENDER_TRIGGERED */
    ]: "renderTriggered hook",
    [
      0
      /* ErrorCodes.SETUP_FUNCTION */
    ]: "setup function",
    [
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ]: "render function",
    [
      2
      /* ErrorCodes.WATCH_GETTER */
    ]: "watcher getter",
    [
      3
      /* ErrorCodes.WATCH_CALLBACK */
    ]: "watcher callback",
    [
      4
      /* ErrorCodes.WATCH_CLEANUP */
    ]: "watcher cleanup function",
    [
      5
      /* ErrorCodes.NATIVE_EVENT_HANDLER */
    ]: "native event handler",
    [
      6
      /* ErrorCodes.COMPONENT_EVENT_HANDLER */
    ]: "component event handler",
    [
      7
      /* ErrorCodes.VNODE_HOOK */
    ]: "vnode hook",
    [
      8
      /* ErrorCodes.DIRECTIVE_HOOK */
    ]: "directive hook",
    [
      9
      /* ErrorCodes.TRANSITION_HOOK */
    ]: "transition hook",
    [
      10
      /* ErrorCodes.APP_ERROR_HANDLER */
    ]: "app errorHandler",
    [
      11
      /* ErrorCodes.APP_WARN_HANDLER */
    ]: "app warnHandler",
    [
      12
      /* ErrorCodes.FUNCTION_REF */
    ]: "ref function",
    [
      13
      /* ErrorCodes.ASYNC_COMPONENT_LOADER */
    ]: "async component loader",
    [
      14
      /* ErrorCodes.SCHEDULER */
    ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
  };
  function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
      res = args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
    return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = ErrorTypeStrings[type];
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      const appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev = true) {
    {
      const info = ErrorTypeStrings[type];
      if (contextVNode) {
        pushWarningContext(contextVNode);
      }
      warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
      if (contextVNode) {
        popWarningContext();
      }
      if (throwInDev) {
        throw err;
      } else {
        console.error(err);
      }
    }
  }
  let isFlushing = false;
  let isFlushPending = false;
  const queue = [];
  let flushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = /* @__PURE__ */ Promise.resolve();
  let currentFlushPromise = null;
  const RECURSION_LIMIT = 100;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJobId = getId(queue[middle]);
      middleJobId < id ? start = middle + 1 : end = middle;
    }
    return start;
  }
  function queueJob(job) {
    if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
      if (job.id == null) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(job.id), 0, job);
      }
      queueFlush();
    }
  }
  function queueFlush() {
    if (!isFlushing && !isFlushPending) {
      isFlushPending = true;
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function invalidateJob(job) {
    const i = queue.indexOf(job);
    if (i > flushIndex) {
      queue.splice(i, 1);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray$1(cb)) {
      if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
        pendingPostFlushCbs.push(cb);
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (; i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.pre) {
        if (checkRecursiveUpdates(seen, cb)) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        cb();
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)];
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      {
        seen = seen || /* @__PURE__ */ new Map();
      }
      activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
          continue;
        }
        activePostFlushCbs[postFlushIndex]();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? Infinity : job.id;
  const comparator = (a, b) => {
    const diff = getId(a) - getId(b);
    if (diff === 0) {
      if (a.pre && !b.pre)
        return -1;
      if (b.pre && !a.pre)
        return 1;
    }
    return diff;
  };
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    queue.sort(comparator);
    const check = (job) => checkRecursiveUpdates(seen, job);
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && job.active !== false) {
          if (check(job)) {
            continue;
          }
          callWithErrorHandling(
            job,
            null,
            14
            /* ErrorCodes.SCHEDULER */
          );
        }
      }
    } finally {
      flushIndex = 0;
      queue.length = 0;
      flushPostFlushCbs(seen);
      isFlushing = false;
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
      seen.set(fn, 1);
    } else {
      const count = seen.get(fn);
      if (count > RECURSION_LIMIT) {
        const instance = fn.ownerInstance;
        const componentName = instance && getComponentName(instance.type);
        warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
        return true;
      } else {
        seen.set(fn, count + 1);
      }
    }
  }
  let isHmrUpdating = false;
  const hmrDirtyComponents = /* @__PURE__ */ new Set();
  {
    getGlobalThis().__VUE_HMR_RUNTIME__ = {
      createRecord: tryWrap(createRecord),
      rerender: tryWrap(rerender),
      reload: tryWrap(reload)
    };
  }
  const map = /* @__PURE__ */ new Map();
  function registerHMR(instance) {
    const id = instance.type.__hmrId;
    let record = map.get(id);
    if (!record) {
      createRecord(id, instance.type);
      record = map.get(id);
    }
    record.instances.add(instance);
  }
  function unregisterHMR(instance) {
    map.get(instance.type.__hmrId).instances.delete(instance);
  }
  function createRecord(id, initialDef) {
    if (map.has(id)) {
      return false;
    }
    map.set(id, {
      initialDef: normalizeClassComponent(initialDef),
      instances: /* @__PURE__ */ new Set()
    });
    return true;
  }
  function normalizeClassComponent(component) {
    return isClassComponent(component) ? component.__vccOpts : component;
  }
  function rerender(id, newRender) {
    const record = map.get(id);
    if (!record) {
      return;
    }
    record.initialDef.render = newRender;
    [...record.instances].forEach((instance) => {
      if (newRender) {
        instance.render = newRender;
        normalizeClassComponent(instance.type).render = newRender;
      }
      instance.renderCache = [];
      isHmrUpdating = true;
      instance.update();
      isHmrUpdating = false;
    });
  }
  function reload(id, newComp) {
    const record = map.get(id);
    if (!record)
      return;
    newComp = normalizeClassComponent(newComp);
    updateComponentDef(record.initialDef, newComp);
    const instances = [...record.instances];
    for (const instance of instances) {
      const oldComp = normalizeClassComponent(instance.type);
      if (!hmrDirtyComponents.has(oldComp)) {
        if (oldComp !== record.initialDef) {
          updateComponentDef(oldComp, newComp);
        }
        hmrDirtyComponents.add(oldComp);
      }
      instance.appContext.optionsCache.delete(instance.type);
      if (instance.ceReload) {
        hmrDirtyComponents.add(oldComp);
        instance.ceReload(newComp.styles);
        hmrDirtyComponents.delete(oldComp);
      } else if (instance.parent) {
        queueJob(instance.parent.update);
      } else if (instance.appContext.reload) {
        instance.appContext.reload();
      } else if (typeof window !== "undefined") {
        window.location.reload();
      } else {
        console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
      }
    }
    queuePostFlushCb(() => {
      for (const instance of instances) {
        hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
      }
    });
  }
  function updateComponentDef(oldComp, newComp) {
    extend(oldComp, newComp);
    for (const key in oldComp) {
      if (key !== "__file" && !(key in newComp)) {
        delete oldComp[key];
      }
    }
  }
  function tryWrap(fn) {
    return (id, arg) => {
      try {
        return fn(id, arg);
      } catch (e) {
        console.error(e);
        console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
      }
    };
  }
  let devtools;
  let buffer = [];
  let devtoolsNotInstalled = false;
  function emit$1(event, ...args) {
    if (devtools) {
      devtools.emit(event, ...args);
    } else if (!devtoolsNotInstalled) {
      buffer.push({ event, args });
    }
  }
  function setDevtoolsHook(hook, target) {
    var _a, _b;
    devtools = hook;
    if (devtools) {
      devtools.enabled = true;
      buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
      buffer = [];
    } else if (
      // handle late devtools injection - only do this if we are in an actual
      // browser environment to avoid the timer handle stalling test runner exit
      // (#4815)
      typeof window !== "undefined" && // some envs mock window but not fully
      window.HTMLElement && // also exclude jsdom
      !((_b = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
    ) {
      const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
      replay.push((newHook) => {
        setDevtoolsHook(newHook, target);
      });
      setTimeout(() => {
        if (!devtools) {
          target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
          devtoolsNotInstalled = true;
          buffer = [];
        }
      }, 3e3);
    } else {
      devtoolsNotInstalled = true;
      buffer = [];
    }
  }
  function devtoolsInitApp(app2, version2) {
    emit$1("app:init", app2, version2, {
      Fragment,
      Text,
      Comment,
      Static
    });
  }
  function devtoolsUnmountApp(app2) {
    emit$1("app:unmount", app2);
  }
  const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:added"
    /* DevtoolsHooks.COMPONENT_ADDED */
  );
  const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:updated"
    /* DevtoolsHooks.COMPONENT_UPDATED */
  );
  const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:removed"
    /* DevtoolsHooks.COMPONENT_REMOVED */
  );
  const devtoolsComponentRemoved = (component) => {
    if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
    !devtools.cleanupBuffer(component)) {
      _devtoolsComponentRemoved(component);
    }
  };
  function createDevtoolsComponentHook(hook) {
    return (component) => {
      emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
    };
  }
  const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
    "perf:start"
    /* DevtoolsHooks.PERFORMANCE_START */
  );
  const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
    "perf:end"
    /* DevtoolsHooks.PERFORMANCE_END */
  );
  function createDevtoolsPerformanceHook(hook) {
    return (component, type, time) => {
      emit$1(hook, component.appContext.app, component.uid, component, type, time);
    };
  }
  function devtoolsComponentEmit(component, event, params) {
    emit$1("component:emit", component.appContext.app, component, event, params);
  }
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted)
      return;
    const props = instance.vnode.props || EMPTY_OBJ;
    {
      const { emitsOptions, propsOptions: [propsOptions] } = instance;
      if (emitsOptions) {
        if (!(event in emitsOptions) && true) {
          if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
            warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
          }
        } else {
          const validator = emitsOptions[event];
          if (isFunction(validator)) {
            const isValid = validator(...rawArgs);
            if (!isValid) {
              warn(`Invalid event arguments: event validation failed for event "${event}".`);
            }
          }
        }
      }
    }
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modelArg = isModelListener2 && event.slice(7);
    if (modelArg && modelArg in props) {
      const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
      const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
      if (trim) {
        args = rawArgs.map((a) => isString(a) ? a.trim() : a);
      }
      if (number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    {
      devtoolsComponentEmit(instance, event, args);
    }
    {
      const lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
        warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(handler, instance, 6, args);
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(onceHandler, instance, 6, args);
    }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, null);
      }
      return null;
    }
    if (isArray$1(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject(comp)) {
      cache.set(comp, normalized);
    }
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function pushScopeId(id) {
    currentScopeId = id;
  }
  function popScopeId() {
    currentScopeId = null;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx)
      return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      {
        devtoolsComponentUpdated(ctx);
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  let accessedAttrs = false;
  function markAttrsAccessed() {
    accessedAttrs = true;
  }
  function renderComponentRoot(instance) {
    const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data: data2, setupState, ctx, inheritAttrs } = instance;
    let result;
    let fallthroughAttrs;
    const prev = setCurrentRenderingInstance(instance);
    {
      accessedAttrs = false;
    }
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data2, ctx));
        fallthroughAttrs = attrs;
      } else {
        const render2 = Component;
        if (attrs === props) {
          markAttrsAccessed();
        }
        result = normalizeVNode(render2.length > 1 ? render2(props, true ? {
          get attrs() {
            markAttrsAccessed();
            return attrs;
          },
          slots,
          emit: emit2
        } : { attrs, slots, emit: emit2 }) : render2(
          props,
          null
          /* we know it doesn't need it */
        ));
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(
        err,
        instance,
        1
        /* ErrorCodes.RENDER_FUNCTION */
      );
      result = createVNode(Comment);
    }
    let root = result;
    let setRoot = void 0;
    if (result.patchFlag > 0 && result.patchFlag & 2048) {
      [root, setRoot] = getChildRoot(result);
    }
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
          }
          root = cloneVNode(root, fallthroughAttrs);
        } else if (!accessedAttrs && root.type !== Comment) {
          const allAttrs = Object.keys(attrs);
          const eventAttrs = [];
          const extraAttrs = [];
          for (let i = 0, l = allAttrs.length; i < l; i++) {
            const key = allAttrs[i];
            if (isOn(key)) {
              if (!isModelListener(key)) {
                eventAttrs.push(key[2].toLowerCase() + key.slice(3));
              }
            } else {
              extraAttrs.push(key);
            }
          }
          if (extraAttrs.length) {
            warn(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
          }
          if (eventAttrs.length) {
            warn(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
          }
        }
      }
    }
    if (vnode.dirs) {
      if (!isElementRoot(root)) {
        warn(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
      }
      root = cloneVNode(root);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      if (!isElementRoot(root)) {
        warn(`Component inside <Transition> renders non-element root node that cannot be animated.`);
      }
      root.transition = vnode.transition;
    }
    if (setRoot) {
      setRoot(root);
    } else {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  const getChildRoot = (vnode) => {
    const rawChildren = vnode.children;
    const dynamicChildren = vnode.dynamicChildren;
    const childRoot = filterSingleRoot(rawChildren);
    if (!childRoot) {
      return [vnode, void 0];
    }
    const index = rawChildren.indexOf(childRoot);
    const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    const setRoot = (updatedRoot) => {
      rawChildren[index] = updatedRoot;
      if (dynamicChildren) {
        if (dynamicIndex > -1) {
          dynamicChildren[dynamicIndex] = updatedRoot;
        } else if (updatedRoot.patchFlag > 0) {
          vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
        }
      }
    };
    return [normalizeVNode(childRoot), setRoot];
  };
  function filterSingleRoot(children) {
    let singleRoot;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (isVNode(child)) {
        if (child.type !== Comment || child.children === "v-if") {
          if (singleRoot) {
            return;
          } else {
            singleRoot = child;
          }
        }
      } else {
        return;
      }
    }
    return singleRoot;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  const isElementRoot = (vnode) => {
    return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if ((prevChildren || nextChildren) && isHmrUpdating) {
      return true;
    }
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function updateHOCHostEl({ vnode, parent }, el) {
    while (parent && parent.subTree === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    }
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray$1(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  function provide(key, value) {
    if (!currentInstance) {
      {
        warn(`provide() can only be used inside setup().`);
      }
    } else {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = currentInstance || currentRenderingInstance;
    if (instance) {
      const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
      } else {
        warn(`injection "${String(key)}" not found.`);
      }
    } else {
      warn(`inject() can only be used inside setup() or functional components.`);
    }
  }
  function watchEffect(effect, options) {
    return doWatch(effect, null, options);
  }
  const INITIAL_WATCHER_VALUE = {};
  function watch(source, cb, options) {
    if (!isFunction(cb)) {
      warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
    }
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
    if (!cb) {
      if (immediate !== void 0) {
        warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
      }
      if (deep !== void 0) {
        warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
      }
    }
    const warnInvalidSource = (s) => {
      warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
    };
    const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = isShallow$1(source);
    } else if (isReactive(source)) {
      getter = () => source;
      deep = true;
    } else if (isArray$1(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => isReactive(s) || isShallow$1(s));
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction(s)) {
          return callWithErrorHandling(
            s,
            instance,
            2
            /* ErrorCodes.WATCH_GETTER */
          );
        } else {
          warnInvalidSource(s);
        }
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = () => callWithErrorHandling(
          source,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        getter = () => {
          if (instance && instance.isUnmounted) {
            return;
          }
          if (cleanup) {
            cleanup();
          }
          return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
        };
      }
    } else {
      getter = NOOP;
      warnInvalidSource(source);
    }
    if (cb && deep) {
      const baseGetter = getter;
      getter = () => traverse(baseGetter());
    }
    let cleanup;
    let onCleanup = (fn) => {
      cleanup = effect.onStop = () => {
        callWithErrorHandling(
          fn,
          instance,
          4
          /* ErrorCodes.WATCH_CLEANUP */
        );
      };
    };
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      onCleanup = NOOP;
      if (!cb) {
        getter();
      } else if (immediate) {
        callWithAsyncErrorHandling(cb, instance, 3, [
          getter(),
          isMultiSource ? [] : void 0,
          onCleanup
        ]);
      }
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else {
        return NOOP;
      }
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = () => {
      if (!effect.active) {
        return;
      }
      if (cb) {
        const newValue = effect.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
          if (cleanup) {
            cleanup();
          }
          callWithAsyncErrorHandling(cb, instance, 3, [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            onCleanup
          ]);
          oldValue = newValue;
        }
      } else {
        effect.run();
      }
    };
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === "sync") {
      scheduler = job;
    } else if (flush === "post") {
      scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    } else {
      job.pre = true;
      if (instance)
        job.id = instance.uid;
      scheduler = () => queueJob(job);
    }
    const effect = new ReactiveEffect(getter, scheduler);
    {
      effect.onTrack = onTrack;
      effect.onTrigger = onTrigger;
    }
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = effect.run();
      }
    } else if (flush === "post") {
      queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
    } else {
      effect.run();
    }
    const unwatch = () => {
      effect.stop();
      if (instance && instance.scope) {
        remove(instance.scope.effects, effect);
      }
    };
    if (ssrCleanup)
      ssrCleanup.push(unwatch);
    return unwatch;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const cur = currentInstance;
    setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    if (cur) {
      setCurrentInstance(cur);
    } else {
      unsetCurrentInstance();
    }
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  function traverse(value, seen) {
    if (!isObject(value) || value[
      "__v_skip"
      /* ReactiveFlags.SKIP */
    ]) {
      return value;
    }
    seen = seen || /* @__PURE__ */ new Set();
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    if (isRef(value)) {
      traverse(value.value, seen);
    } else if (isArray$1(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, seen);
      });
    } else if (isPlainObject$1(value)) {
      for (const key in value) {
        traverse(value[key], seen);
      }
    }
    return value;
  }
  function useTransitionState() {
    const state = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    onMounted(() => {
      state.isMounted = true;
    });
    onBeforeUnmount(() => {
      state.isUnmounting = true;
    });
    return state;
  }
  const TransitionHookValidator = [Function, Array];
  const BaseTransitionImpl = {
    name: `BaseTransition`,
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      // enter
      onBeforeEnter: TransitionHookValidator,
      onEnter: TransitionHookValidator,
      onAfterEnter: TransitionHookValidator,
      onEnterCancelled: TransitionHookValidator,
      // leave
      onBeforeLeave: TransitionHookValidator,
      onLeave: TransitionHookValidator,
      onAfterLeave: TransitionHookValidator,
      onLeaveCancelled: TransitionHookValidator,
      // appear
      onBeforeAppear: TransitionHookValidator,
      onAppear: TransitionHookValidator,
      onAfterAppear: TransitionHookValidator,
      onAppearCancelled: TransitionHookValidator
    },
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state = useTransitionState();
      let prevTransitionKey;
      return () => {
        const children = slots.default && getTransitionRawChildren(slots.default(), true);
        if (!children || !children.length) {
          return;
        }
        let child = children[0];
        if (children.length > 1) {
          let hasFound = false;
          for (const c of children) {
            if (c.type !== Comment) {
              if (hasFound) {
                warn("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
                break;
              }
              child = c;
              hasFound = true;
            }
          }
        }
        const rawProps = toRaw(props);
        const { mode } = rawProps;
        if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
          warn(`invalid <transition> mode: ${mode}`);
        }
        if (state.isLeaving) {
          return emptyPlaceholder(child);
        }
        const innerChild = getKeepAliveChild(child);
        if (!innerChild) {
          return emptyPlaceholder(child);
        }
        const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
        setTransitionHooks(innerChild, enterHooks);
        const oldChild = instance.subTree;
        const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
        let transitionKeyChanged = false;
        const { getTransitionKey } = innerChild.type;
        if (getTransitionKey) {
          const key = getTransitionKey();
          if (prevTransitionKey === void 0) {
            prevTransitionKey = key;
          } else if (key !== prevTransitionKey) {
            prevTransitionKey = key;
            transitionKeyChanged = true;
          }
        }
        if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
          const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
          setTransitionHooks(oldInnerChild, leavingHooks);
          if (mode === "out-in") {
            state.isLeaving = true;
            leavingHooks.afterLeave = () => {
              state.isLeaving = false;
              if (instance.update.active !== false) {
                instance.update();
              }
            };
            return emptyPlaceholder(child);
          } else if (mode === "in-out" && innerChild.type !== Comment) {
            leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
              const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
              leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
              el._leaveCb = () => {
                earlyRemove();
                el._leaveCb = void 0;
                delete enterHooks.delayedLeave;
              };
              enterHooks.delayedLeave = delayedLeave;
            };
          }
        }
        return child;
      };
    }
  };
  const BaseTransition = BaseTransitionImpl;
  function getLeavingNodesForType(state, vnode) {
    const { leavingVNodes } = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
      leavingVNodesCache = /* @__PURE__ */ Object.create(null);
      leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
  }
  function resolveTransitionHooks(vnode, props, state, instance) {
    const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
    const key = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode);
    const callHook2 = (hook, args) => {
      hook && callWithAsyncErrorHandling(hook, instance, 9, args);
    };
    const callAsyncHook = (hook, args) => {
      const done = args[1];
      callHook2(hook, args);
      if (isArray$1(hook)) {
        if (hook.every((hook2) => hook2.length <= 1))
          done();
      } else if (hook.length <= 1) {
        done();
      }
    };
    const hooks = {
      mode,
      persisted,
      beforeEnter(el) {
        let hook = onBeforeEnter;
        if (!state.isMounted) {
          if (appear) {
            hook = onBeforeAppear || onBeforeEnter;
          } else {
            return;
          }
        }
        if (el._leaveCb) {
          el._leaveCb(
            true
            /* cancelled */
          );
        }
        const leavingVNode = leavingVNodesCache[key];
        if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
          leavingVNode.el._leaveCb();
        }
        callHook2(hook, [el]);
      },
      enter(el) {
        let hook = onEnter;
        let afterHook = onAfterEnter;
        let cancelHook = onEnterCancelled;
        if (!state.isMounted) {
          if (appear) {
            hook = onAppear || onEnter;
            afterHook = onAfterAppear || onAfterEnter;
            cancelHook = onAppearCancelled || onEnterCancelled;
          } else {
            return;
          }
        }
        let called = false;
        const done = el._enterCb = (cancelled) => {
          if (called)
            return;
          called = true;
          if (cancelled) {
            callHook2(cancelHook, [el]);
          } else {
            callHook2(afterHook, [el]);
          }
          if (hooks.delayedLeave) {
            hooks.delayedLeave();
          }
          el._enterCb = void 0;
        };
        if (hook) {
          callAsyncHook(hook, [el, done]);
        } else {
          done();
        }
      },
      leave(el, remove2) {
        const key2 = String(vnode.key);
        if (el._enterCb) {
          el._enterCb(
            true
            /* cancelled */
          );
        }
        if (state.isUnmounting) {
          return remove2();
        }
        callHook2(onBeforeLeave, [el]);
        let called = false;
        const done = el._leaveCb = (cancelled) => {
          if (called)
            return;
          called = true;
          remove2();
          if (cancelled) {
            callHook2(onLeaveCancelled, [el]);
          } else {
            callHook2(onAfterLeave, [el]);
          }
          el._leaveCb = void 0;
          if (leavingVNodesCache[key2] === vnode) {
            delete leavingVNodesCache[key2];
          }
        };
        leavingVNodesCache[key2] = vnode;
        if (onLeave) {
          callAsyncHook(onLeave, [el, done]);
        } else {
          done();
        }
      },
      clone(vnode2) {
        return resolveTransitionHooks(vnode2, props, state, instance);
      }
    };
    return hooks;
  }
  function emptyPlaceholder(vnode) {
    if (isKeepAlive(vnode)) {
      vnode = cloneVNode(vnode);
      vnode.children = null;
      return vnode;
    }
  }
  function getKeepAliveChild(vnode) {
    return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
  }
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  function getTransitionRawChildren(children, keepComment = false, parentKey) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
      if (child.type === Fragment) {
        if (child.patchFlag & 128)
          keyedFragmentCount++;
        ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
      } else if (keepComment || child.type !== Comment) {
        ret.push(key != null ? cloneVNode(child, { key }) : child);
      }
    }
    if (keyedFragmentCount > 1) {
      for (let i = 0; i < ret.length; i++) {
        ret[i].patchFlag = -2;
      }
    }
    return ret;
  }
  function defineComponent(options) {
    return isFunction(options) ? { setup: options, name: options.name } : options;
  }
  const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
      /* prepend */
    );
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        if (target.isUnmounted) {
          return;
        }
        pauseTracking();
        setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        unsetCurrentInstance();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    } else {
      const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
      warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
    }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => (
    // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
    (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
  );
  const onBeforeMount = createHook(
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  );
  const onMounted = createHook(
    "m"
    /* LifecycleHooks.MOUNTED */
  );
  const onBeforeUpdate = createHook(
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  );
  const onUpdated = createHook(
    "u"
    /* LifecycleHooks.UPDATED */
  );
  const onBeforeUnmount = createHook(
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  );
  const onUnmounted = createHook(
    "um"
    /* LifecycleHooks.UNMOUNTED */
  );
  const onServerPrefetch = createHook(
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  );
  const onRenderTriggered = createHook(
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  );
  const onRenderTracked = createHook(
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  );
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
      warn("Do not use built-in directive ids as custom directive id: " + name);
    }
  }
  function withDirectives(vnode, directives) {
    const internalInstance = currentRenderingInstance;
    if (internalInstance === null) {
      warn(`withDirectives can only be used inside render functions.`);
      return vnode;
    }
    const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
      if (dir) {
        if (isFunction(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  const NULL_DYNAMIC_COMPONENT = Symbol();
  function renderSlot(slots, name, props = {}, fallback, noSlotted) {
    if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
      if (name !== "default")
        props.name = name;
      return createVNode("slot", props, fallback && fallback());
    }
    let slot = slots[name];
    if (slot && slot.length > 1) {
      warn(`SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`);
      slot = () => [];
    }
    if (slot && slot._c) {
      slot._d = false;
    }
    openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props));
    const rendered = createBlock(
      Fragment,
      {
        key: props.key || // slot content array of a dynamic conditional slot may have a branch
        // key attached in the `createSlots` helper, respect that
        validSlotContent && validSlotContent.key || `_${name}`
      },
      validSlotContent || (fallback ? fallback() : []),
      validSlotContent && slots._ === 1 ? 64 : -2
      /* PatchFlags.BAIL */
    );
    if (!noSlotted && rendered.scopeId) {
      rendered.slotScopeIds = [rendered.scopeId + "-s"];
    }
    if (slot && slot._c) {
      slot._d = true;
    }
    return rendered;
  }
  function ensureValidVNode(vnodes) {
    return vnodes.some((child) => {
      if (!isVNode(child))
        return true;
      if (child.type === Comment)
        return false;
      if (child.type === Fragment && !ensureValidVNode(child.children))
        return false;
      return true;
    }) ? vnodes : null;
  }
  const getPublicInstance = (i) => {
    if (!i)
      return null;
    if (isStatefulComponent(i))
      return getExposeProxy(i) || i.proxy;
    return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
      $: (i) => i,
      $el: (i) => i.vnode.el,
      $data: (i) => i.data,
      $props: (i) => shallowReadonly(i.props),
      $attrs: (i) => shallowReadonly(i.attrs),
      $slots: (i) => shallowReadonly(i.slots),
      $refs: (i) => shallowReadonly(i.refs),
      $parent: (i) => getPublicInstance(i.parent),
      $root: (i) => getPublicInstance(i.root),
      $emit: (i) => i.emit,
      $options: (i) => resolveMergedOptions(i),
      $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
      $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
      $watch: (i) => instanceWatch.bind(i)
    })
  );
  const isReservedPrefix = (key) => key === "_" || key === "$";
  const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      const { ctx, setupState, data: data2, props, accessCache, type, appContext } = instance;
      if (key === "__isVue") {
        return true;
      }
      let normalizedProps;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data2[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key)) {
          accessCache[key] = 2;
          return data2[key];
        } else if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
        ) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track$1(instance, "get", key);
          markAttrsAccessed();
        }
        return publicGetter(instance);
      } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])
      ) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
      ) {
        {
          return globalProperties[key];
        }
      } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
      // to infinite warning loop
      key.indexOf("__v") !== 0)) {
        if (data2 !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data2, key)) {
          warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
        } else if (instance === currentRenderingInstance) {
          warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
        }
      }
    },
    set({ _: instance }, key, value) {
      const { data: data2, setupState, ctx } = instance;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
        warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
        return false;
      } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key)) {
        data2[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        warn(`Attempting to mutate prop "${key}". Props are readonly.`);
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
        return false;
      } else {
        if (key in instance.appContext.config.globalProperties) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            value
          });
        } else {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({ _: { data: data2, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
      let normalizedProps;
      return !!accessCache[key] || data2 !== EMPTY_OBJ && hasOwn(data2, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  {
    PublicInstanceProxyHandlers.ownKeys = (target) => {
      warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
      return Reflect.ownKeys(target);
    };
  }
  function createDevRenderContext(instance) {
    const target = {};
    Object.defineProperty(target, `_`, {
      configurable: true,
      enumerable: false,
      get: () => instance
    });
    Object.keys(publicPropertiesMap).forEach((key) => {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: false,
        get: () => publicPropertiesMap[key](instance),
        // intercepted by the proxy so no need for implementation,
        // but needed to prevent set errors
        set: NOOP
      });
    });
    return target;
  }
  function exposePropsOnRenderContext(instance) {
    const { ctx, propsOptions: [propsOptions] } = instance;
    if (propsOptions) {
      Object.keys(propsOptions).forEach((key) => {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => instance.props[key],
          set: NOOP
        });
      });
    }
  }
  function exposeSetupStateOnRenderContext(instance) {
    const { ctx, setupState } = instance;
    Object.keys(toRaw(setupState)).forEach((key) => {
      if (!setupState.__isScriptSetup) {
        if (isReservedPrefix(key[0])) {
          warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
          return;
        }
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => setupState[key],
          set: NOOP
        });
      }
    });
  }
  function createDuplicateChecker() {
    const cache = /* @__PURE__ */ Object.create(null);
    return (type, key) => {
      if (cache[key]) {
        warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
      } else {
        cache[key] = type;
      }
    };
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook(
        options.beforeCreate,
        instance,
        "bc"
        /* LifecycleHooks.BEFORE_CREATE */
      );
    }
    const {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = createDuplicateChecker();
    {
      const [propsOptions] = instance.propsOptions;
      if (propsOptions) {
        for (const key in propsOptions) {
          checkDuplicateProperties("Props", key);
        }
      }
    }
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction(methodHandler)) {
          {
            Object.defineProperty(ctx, key, {
              value: methodHandler.bind(publicThis),
              configurable: true,
              enumerable: true,
              writable: true
            });
          }
          {
            checkDuplicateProperties("Methods", key);
          }
        } else {
          warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
        }
      }
    }
    if (dataOptions) {
      if (!isFunction(dataOptions)) {
        warn(`The data option must be a function. Plain object usage is no longer supported.`);
      }
      const data2 = dataOptions.call(publicThis, publicThis);
      if (isPromise(data2)) {
        warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
      }
      if (!isObject(data2)) {
        warn(`data() should return an object.`);
      } else {
        instance.data = reactive(data2);
        {
          for (const key in data2) {
            checkDuplicateProperties("Data", key);
            if (!isReservedPrefix(key[0])) {
              Object.defineProperty(ctx, key, {
                configurable: true,
                enumerable: true,
                get: () => data2[key],
                set: NOOP
              });
            }
          }
        }
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        if (get2 === NOOP) {
          warn(`Computed property "${key}" has no getter.`);
        }
        const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
          warn(`Write operation failed: computed property "${key}" is readonly.`);
        };
        const c = computed({
          get: get2,
          set: set2
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v) => c.value = v
        });
        {
          checkDuplicateProperties("Computed", key);
        }
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook(
        created,
        instance,
        "c"
        /* LifecycleHooks.CREATED */
      );
    }
    function registerLifecycleHook(register, hook) {
      if (isArray$1(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray$1(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render && instance.render === NOOP) {
      instance.render = render;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components)
      instance.components = components;
    if (directives)
      instance.directives = directives;
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
    if (isArray$1(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject(opt)) {
        if ("default" in opt) {
          injected = inject(
            opt.from || key,
            opt.default,
            true
            /* treat default function as factory */
          );
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef(injected)) {
        if (unwrapRef) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => injected.value,
            set: (v) => injected.value = v
          });
        } else {
          {
            warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
          }
          ctx[key] = injected;
        }
      } else {
        ctx[key] = injected;
      }
      {
        checkDuplicateProperties("Inject", key);
      }
    }
  }
  function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx, publicThis, key) {
    const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
      const handler = ctx[raw];
      if (isFunction(handler)) {
        watch(getter, handler);
      } else {
        warn(`Invalid watch handler specified by key "${raw}"`, handler);
      }
    } else if (isFunction(raw)) {
      watch(getter, raw.bind(publicThis));
    } else if (isObject(raw)) {
      if (isArray$1(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(handler)) {
          watch(getter, handler, raw);
        } else {
          warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
        }
      }
    } else {
      warn(`Invalid watch option: "${key}"`, raw);
    }
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    if (isObject(base)) {
      cache.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach((m) => mergeOptions(to, m, strats, true));
    }
    for (const key in from) {
      if (asMixin && key === "expose") {
        warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
      } else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray$1(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
    if (!to)
      return from;
    if (!from)
      return to;
    const merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = {};
    def(attrs, InternalObjectKey, 1);
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    {
      validateProps(rawProps || {}, props, instance);
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function isInHmrContext(instance) {
    while (instance) {
      if (instance.type.__hmrId)
        return true;
      instance = instance.parent;
    }
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const { props, attrs, vnode: { patchFlag } } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(
                options,
                rawCurrentProps,
                camelizedKey,
                value,
                instance,
                false
                /* isAbsent */
              );
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || // for camelCase
        !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && // for camelCase
            (rawPrevProps[key] !== void 0 || // for kebab-case
            rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(
                options,
                rawCurrentProps,
                key,
                void 0,
                instance,
                true
                /* isAbsent */
              );
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance, "set", "$attrs");
    }
    {
      validateProps(rawProps || {}, props, instance);
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && isFunction(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(null, props);
            unsetCurrentInstance();
          }
        } else {
          value = defaultValue;
        }
      }
      if (opt[
        0
        /* BooleanFlags.shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
          /* BooleanFlags.shouldCastTrue */
        ] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys)
          needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray$1(raw)) {
      for (let i = 0; i < raw.length; i++) {
        if (!isString(raw[i])) {
          warn(`props must be strings when using array syntax.`, raw[i]);
        }
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      if (!isObject(raw)) {
        warn(`invalid props options`, raw);
      }
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
          if (prop) {
            const booleanIndex = getTypeIndex(Boolean, prop.type);
            const stringIndex = getTypeIndex(String, prop.type);
            prop[
              0
              /* BooleanFlags.shouldCast */
            ] = booleanIndex > -1;
            prop[
              1
              /* BooleanFlags.shouldCastTrue */
            ] = stringIndex < 0 || booleanIndex < stringIndex;
            if (booleanIndex > -1 || hasOwn(prop, "default")) {
              needCastKeys.push(normalizedKey);
            }
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject(comp)) {
      cache.set(comp, res);
    }
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$") {
      return true;
    } else {
      warn(`Invalid prop name: "${key}" is a reserved property.`);
    }
    return false;
  }
  function getType(ctor) {
    const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
    return match ? match[2] : ctor === null ? "null" : "";
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (isArray$1(expectedTypes)) {
      return expectedTypes.findIndex((t) => isSameType(t, type));
    } else if (isFunction(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
  }
  function validateProps(rawProps, props, instance) {
    const resolvedValues = toRaw(props);
    const options = instance.propsOptions[0];
    for (const key in options) {
      let opt = options[key];
      if (opt == null)
        continue;
      validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
    }
  }
  function validateProp(name, value, prop, isAbsent) {
    const { type, required, validator } = prop;
    if (required && isAbsent) {
      warn('Missing required prop: "' + name + '"');
      return;
    }
    if (value == null && !prop.required) {
      return;
    }
    if (type != null && type !== true) {
      let isValid = false;
      const types = isArray$1(type) ? type : [type];
      const expectedTypes = [];
      for (let i = 0; i < types.length && !isValid; i++) {
        const { valid, expectedType } = assertType(value, types[i]);
        expectedTypes.push(expectedType || "");
        isValid = valid;
      }
      if (!isValid) {
        warn(getInvalidTypeMessage(name, value, expectedTypes));
        return;
      }
    }
    if (validator && !validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".');
    }
  }
  const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
  function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (isSimpleType(expectedType)) {
      const t = typeof value;
      valid = t === expectedType.toLowerCase();
      if (!valid && t === "object") {
        valid = value instanceof type;
      }
    } else if (expectedType === "Object") {
      valid = isObject(value);
    } else if (expectedType === "Array") {
      valid = isArray$1(value);
    } else if (expectedType === "null") {
      valid = value === null;
    } else {
      valid = value instanceof type;
    }
    return {
      valid,
      expectedType
    };
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
    let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
      message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    if (isExplicable(receivedType)) {
      message += `with value ${receivedValue}.`;
    }
    return message;
  }
  function styleValue(value, type) {
    if (type === "String") {
      return `"${value}"`;
    } else if (type === "Number") {
      return `${Number(value)}`;
    } else {
      return `${value}`;
    }
  }
  function isExplicable(type) {
    const explicitTypes = ["string", "number", "boolean"];
    return explicitTypes.some((elem) => type.toLowerCase() === elem);
  }
  function isBoolean(...args) {
    return args.some((elem) => elem.toLowerCase() === "boolean");
  }
  const isInternalKey = (key) => key[0] === "_" || key === "$stable";
  const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (currentInstance) {
        warn(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
      }
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key))
        continue;
      const value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot(key, value, ctx);
      } else if (value != null) {
        {
          warn(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
        }
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance, children) => {
    if (!isKeepAlive(instance.vnode) && true) {
      warn(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
    }
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  const initSlots = (instance, children) => {
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        instance.slots = toRaw(children);
        def(children, "_", type);
      } else {
        normalizeObjectSlots(children, instance.slots = {});
      }
    } else {
      instance.slots = {};
      if (children) {
        normalizeVNodeSlots(instance, children);
      }
    }
    def(instance.slots, InternalObjectKey, 1);
  };
  const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (isHmrUpdating) {
          extend(slots, children);
        } else if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          extend(slots, children);
          if (!optimized && type === 1) {
            delete slots._;
          }
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
          delete slots[key];
        }
      }
    }
  };
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  let uid$1 = 0;
  function createAppAPI(render, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = Object.assign({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        warn(`root props passed to app.mount() must be an object.`);
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new Set();
      let isMounted = false;
      const app2 = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
          {
            warn(`app.config cannot be replaced. Modify individual options instead.`);
          }
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) {
            warn(`Plugin has already been applied to target app.`);
          } else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app2, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app2, ...options);
          } else {
            warn(`A plugin must either be a function or an object with an "install" function.`);
          }
          return app2;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            } else {
              warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
            }
          }
          return app2;
        },
        component(name, component) {
          {
            validateComponentName(name, context.config);
          }
          if (!component) {
            return context.components[name];
          }
          if (context.components[name]) {
            warn(`Component "${name}" has already been registered in target app.`);
          }
          context.components[name] = component;
          return app2;
        },
        directive(name, directive) {
          {
            validateDirectiveName(name);
          }
          if (!directive) {
            return context.directives[name];
          }
          if (context.directives[name]) {
            warn(`Directive "${name}" has already been registered in target app.`);
          }
          context.directives[name] = directive;
          return app2;
        },
        mount(rootContainer, isHydrate, isSVG) {
          if (!isMounted) {
            if (rootContainer.__vue_app__) {
              warn(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
            }
            const vnode = createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            {
              context.reload = () => {
                render(cloneVNode(vnode), rootContainer, isSVG);
              };
            }
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render(vnode, rootContainer, isSVG);
            }
            isMounted = true;
            app2._container = rootContainer;
            rootContainer.__vue_app__ = app2;
            {
              app2._instance = vnode.component;
              devtoolsInitApp(app2, version);
            }
            return getExposeProxy(vnode.component) || vnode.component.proxy;
          } else {
            warn(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
          }
        },
        unmount() {
          if (isMounted) {
            render(null, app2._container);
            {
              app2._instance = null;
              devtoolsUnmountApp(app2);
            }
            delete app2._container.__vue_app__;
          } else {
            warn(`Cannot unmount an app that is not mounted.`);
          }
        },
        provide(key, value) {
          if (key in context.provides) {
            warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
          }
          context.provides[key] = value;
          return app2;
        }
      };
      return app2;
    };
  }
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray$1(rawRef)) {
      rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref2 } = rawRef;
    if (!owner) {
      warn(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
      return;
    }
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    if (oldRef != null && oldRef !== ref2) {
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (hasOwn(setupState, oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }
    if (isFunction(ref2)) {
      callWithErrorHandling(ref2, owner, 12, [value, refs]);
    } else {
      const _isString = isString(ref2);
      const _isRef = isRef(ref2);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
            if (isUnmount) {
              isArray$1(existing) && remove(existing, refValue);
            } else {
              if (!isArray$1(existing)) {
                if (_isString) {
                  refs[ref2] = [refValue];
                  if (hasOwn(setupState, ref2)) {
                    setupState[ref2] = refs[ref2];
                  }
                } else {
                  ref2.value = [refValue];
                  if (rawRef.k)
                    refs[rawRef.k] = ref2.value;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref2] = value;
            if (hasOwn(setupState, ref2)) {
              setupState[ref2] = value;
            }
          } else if (_isRef) {
            ref2.value = value;
            if (rawRef.k)
              refs[rawRef.k] = value;
          } else {
            warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
          }
        };
        if (value) {
          doSet.id = -1;
          queuePostRenderEffect(doSet, parentSuspense);
        } else {
          doSet();
        }
      } else {
        warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
      }
    }
  }
  let supported$1;
  let perf$1;
  function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      perf$1.mark(`vue-${type}-${instance.uid}`);
    }
    {
      devtoolsPerfStart(instance, type, isSupported() ? perf$1.now() : Date.now());
    }
  }
  function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      const startTag = `vue-${type}-${instance.uid}`;
      const endTag = startTag + `:end`;
      perf$1.mark(endTag);
      perf$1.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
      perf$1.clearMarks(startTag);
      perf$1.clearMarks(endTag);
    }
    {
      devtoolsPerfEnd(instance, type, isSupported() ? perf$1.now() : Date.now());
    }
  }
  function isSupported() {
    if (supported$1 !== void 0) {
      return supported$1;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported$1 = true;
      perf$1 = window.performance;
    } else {
      supported$1 = false;
    }
    return supported$1;
  }
  function initFeatureFlags() {
    const needWarn = [];
    if (needWarn.length) {
      const multi = needWarn.length > 1;
      console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
    }
  }
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    {
      initFeatureFlags();
    }
    const target = getGlobalThis();
    target.__VUE__ = true;
    {
      setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
    }
    const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref2, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, isSVG);
          } else {
            patchStaticNode(n1, n2, container, isSVG);
          }
          break;
        case Fragment:
          processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          break;
        default:
          if (shapeFlag & 1) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 6) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 64) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else if (shapeFlag & 128) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else {
            warn("Invalid VNode type:", type, `(${typeof type})`);
          }
      }
      if (ref2 != null && parentComponent) {
        setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, isSVG) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
    };
    const patchStaticNode = (n1, n2, container, isSVG) => {
      if (n2.children !== n1.children) {
        const anchor = hostNextSibling(n1.anchor);
        removeStaticNode(n1);
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
      } else {
        n2.el = n1.el;
        n2.anchor = n1.anchor;
      }
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      isSVG = isSVG || n2.type === "svg";
      if (n1 == null) {
        mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { type, props, shapeFlag, transition, dirs } = vnode;
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      {
        Object.defineProperty(el, "__vnode", {
          value: vnode,
          enumerable: false
        });
        Object.defineProperty(el, "__vueParentComponent", {
          value: parentComponent,
          enumerable: false
        });
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
          subTree = filterSingleRoot(subTree.children) || subTree;
        }
        if (vnode === subTree) {
          const parentVNode = parentComponent.vnode;
          setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
      for (let i = start; i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (isHmrUpdating) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      const areChildrenSVG = isSVG && n2.type !== "foreignObject";
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
        if (parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        }
      } else if (!optimized) {
        patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, isSVG);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
      for (let i = 0; i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
          )
        );
        patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
      }
    };
    const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
        for (const key in newProps) {
          if (isReservedProp(key))
            continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (
        // #5523 dev root fragment may inherit directives
        isHmrUpdating || patchFlag & 2048
      ) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
          if (parentComponent && parentComponent.type.__hmrId) {
            traverseStaticChildren(n1, n2);
          } else if (
            // #2080 if the stable fragment has a key, it's a <template v-for> that may
            //  get moved around. Make sure all root level vnodes inherit el.
            // #2134 or if it's a component root, it may also get moved around
            // as the component is being moved.
            n2.key != null || parentComponent && n2 === parentComponent.subTree
          ) {
            traverseStaticChildren(
              n1,
              n2,
              true
              /* shallow */
            );
          }
        } else {
          patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
        } else {
          mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
      const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
      if (instance.type.__hmrId) {
        registerHMR(instance);
      }
      {
        pushWarningContext(initialVNode);
        startMeasure(instance, `mount`);
      }
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        {
          startMeasure(instance, `init`);
        }
        setupComponent(instance);
        {
          endMeasure(instance, `init`);
        }
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
        }
        return;
      }
      setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
      {
        popWarningContext();
        endMeasure(instance, `mount`);
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          {
            pushWarningContext(n2);
          }
          updateComponentPreRender(instance, n2, optimized);
          {
            popWarningContext();
          }
          return;
        } else {
          instance.next = n2;
          invalidateJob(instance.update);
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          if (el && hydrateNode) {
            const hydrateSubTree = () => {
              {
                startMeasure(instance, `render`);
              }
              instance.subTree = renderComponentRoot(instance);
              {
                endMeasure(instance, `render`);
              }
              {
                startMeasure(instance, `hydrate`);
              }
              hydrateNode(el, instance.subTree, instance, parentSuspense, null);
              {
                endMeasure(instance, `hydrate`);
              }
            };
            if (isAsyncWrapperVNode) {
              initialVNode.type.__asyncLoader().then(
                // note: we are moving the render call into an async callback,
                // which means it won't track dependencies - but it's ok because
                // a server-rendered async wrapper is already in resolved state
                // and it will never need to change.
                () => !instance.isUnmounted && hydrateSubTree()
              );
            } else {
              hydrateSubTree();
            }
          } else {
            {
              startMeasure(instance, `render`);
            }
            const subTree = instance.subTree = renderComponentRoot(instance);
            {
              endMeasure(instance, `render`);
            }
            {
              startMeasure(instance, `patch`);
            }
            patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
            {
              endMeasure(instance, `patch`);
            }
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          {
            devtoolsComponentAdded(instance);
          }
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          let originNext = next;
          let vnodeHook;
          {
            pushWarningContext(next || instance.vnode);
          }
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          {
            startMeasure(instance, `render`);
          }
          const nextTree = renderComponentRoot(instance);
          {
            endMeasure(instance, `render`);
          }
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          {
            startMeasure(instance, `patch`);
          }
          patch(
            prevTree,
            nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree),
            instance,
            parentSuspense,
            isSVG
          );
          {
            endMeasure(instance, `patch`);
          }
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
          }
          {
            devtoolsComponentUpdated(instance);
          }
          {
            popWarningContext();
          }
        }
      };
      const effect = instance.effect = new ReactiveEffect(
        componentUpdateFn,
        () => queueJob(update),
        instance.scope
        // track it in component's effect scope
      );
      const update = instance.update = () => effect.run();
      update.id = instance.uid;
      toggleRecurse(instance, true);
      {
        effect.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
        effect.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
        update.ownerInstance = instance;
      }
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs();
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
      if (oldLength > newLength) {
        unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
      } else {
        mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i = s2; i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            if (keyToNewIndexMap.has(nextChild.key)) {
              warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
            }
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++)
          newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(
                nextChild,
                container,
                anchor,
                2
                /* MoveType.REORDER */
              );
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove3 = () => hostInsert(el, container, anchor);
          const performLeave = () => {
            leave(el, () => {
              remove3();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove3, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
      if (ref2 != null) {
        setRef(ref2, null, parentSuspense, vnode, true);
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
        } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
          vnode.children.forEach((child) => {
            if (child.type === Comment) {
              hostRemove(child.el);
            } else {
              remove2(child);
            }
          });
        } else {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      if (instance.type.__hmrId) {
        unregisterHMR(instance);
      }
      const { bum, scope, update, subTree, um } = instance;
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (update) {
        update.active = false;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
        parentSuspense.deps--;
        if (parentSuspense.deps === 0) {
          parentSuspense.resolve();
        }
      }
      {
        devtoolsComponentRemoved(instance);
      }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      return hostNextSibling(vnode.anchor || vnode.el);
    };
    const render = (vnode, container, isSVG) => {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        patch(container._vnode || null, vnode, container, null, null, null, isSVG);
      }
      flushPreFlushCbs();
      flushPostFlushCbs();
      container._vnode = vnode;
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    let hydrateNode;
    if (createHydrationFns) {
      [hydrate, hydrateNode] = createHydrationFns(internals);
    }
    return {
      render,
      hydrate,
      createApp: createAppAPI(render, hydrate)
    };
  }
  function toggleRecurse({ effect, update }, allowed) {
    effect.allowRecurse = update.allowRecurse = allowed;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray$1(ch1) && isArray$1(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          c2.el = c1.el;
        }
        if (c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  const isTeleport = (type) => type.__isTeleport;
  const Fragment = Symbol("Fragment");
  const Text = Symbol("Text");
  const Comment = Symbol("Comment");
  const Static = Symbol("Static");
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value) {
    isBlockTreeEnabled += value;
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
      /* isBlock */
    ));
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
      /* isBlock: prevent a block from tracking itself */
    ));
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
      n1.shapeFlag &= ~256;
      n2.shapeFlag &= ~512;
      return false;
    }
    return n1.type === n2.type && n1.key === n2.key;
  }
  const createVNodeWithArgsTransform = (...args) => {
    return _createVNode(...args);
  };
  const InternalObjectKey = `__vInternal`;
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
    return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if (vnode.key !== vnode.key) {
      warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = createVNodeWithArgsTransform;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      if (!type) {
        warn(`Invalid vnode type when creating vnode: ${type}.`);
      }
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(
        type,
        props,
        true
        /* mergeRef: true */
      );
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag |= -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject(style)) {
        if (isProxy(style) && !isArray$1(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
    if (shapeFlag & 4 && isProxy(type)) {
      type = toRaw(type);
      warn(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
    }
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
  }
  function guardReactiveProps(props) {
    if (!props)
      return null;
    return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false) {
    const { props, ref: ref2, patchFlag, children } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref2,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children: patchFlag === -1 && isArray$1(children) ? children.map(deepCloneVNode) : children,
      target: vnode.target,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition: vnode.transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    return cloned;
  }
  function deepCloneVNode(vnode) {
    const cloned = cloneVNode(vnode);
    if (isArray$1(vnode.children)) {
      cloned.children = vnode.children.map(deepCloneVNode);
    }
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray$1(child)) {
      return createVNode(
        Fragment,
        null,
        // #3666, avoid reference pollution when reusing vnode
        child.slice()
      );
    } else if (typeof child === "object") {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray$1(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !(InternalObjectKey in children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new EffectScope(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      // suspense related
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    {
      instance.ctx = createDevRenderContext(instance);
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance;
  const setCurrentInstance = (instance) => {
    currentInstance = instance;
    instance.scope.on();
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    currentInstance = null;
  };
  const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
  function validateComponentName(name, config2) {
    const appIsNativeTag = config2.isNativeTag || NO;
    if (isBuiltInTag(name) || appIsNativeTag(name)) {
      warn("Do not use built-in or reserved HTML elements as component id: " + name);
    }
  }
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false) {
    isInSSRComponentSetup = isSSR;
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isInSSRComponentSetup = false;
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    var _a;
    const Component = instance.type;
    {
      if (Component.name) {
        validateComponentName(Component.name, instance.appContext.config);
      }
      if (Component.components) {
        const names = Object.keys(Component.components);
        for (let i = 0; i < names.length; i++) {
          validateComponentName(names[i], instance.appContext.config);
        }
      }
      if (Component.directives) {
        const names = Object.keys(Component.directives);
        for (let i = 0; i < names.length; i++) {
          validateDirectiveName(names[i]);
        }
      }
      if (Component.compilerOptions && isRuntimeOnly()) {
        warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
      }
    }
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    {
      exposePropsOnRenderContext(instance);
    }
    const { setup } = Component;
    if (setup) {
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      setCurrentInstance(instance);
      pauseTracking();
      const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
      resetTracking();
      unsetCurrentInstance();
      if (isPromise(setupResult)) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          }).catch((e) => {
            handleError(
              e,
              instance,
              0
              /* ErrorCodes.SETUP_FUNCTION */
            );
          });
        } else {
          instance.asyncDep = setupResult;
          if (!instance.suspense) {
            const name = (_a = Component.name) !== null && _a !== void 0 ? _a : "Anonymous";
            warn(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
          }
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      if (isVNode(setupResult)) {
        warn(`setup() should not return VNodes directly - return a render function instead.`);
      }
      {
        instance.devtoolsRawSetupState = setupResult;
      }
      instance.setupState = proxyRefs(setupResult);
      {
        exposeSetupStateOnRenderContext(instance);
      }
    } else if (setupResult !== void 0) {
      warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
    }
    finishComponentSetup(instance, isSSR);
  }
  let compile;
  const isRuntimeOnly = () => !compile;
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      if (!isSSR && compile && !Component.render) {
        const template = Component.template || resolveMergedOptions(instance).template;
        if (template) {
          {
            startMeasure(instance, `compile`);
          }
          const { isCustomElement, compilerOptions } = instance.appContext.config;
          const { delimiters, compilerOptions: componentCompilerOptions } = Component;
          const finalCompilerOptions = extend(extend({
            isCustomElement,
            delimiters
          }, compilerOptions), componentCompilerOptions);
          Component.render = compile(template, finalCompilerOptions);
          {
            endMeasure(instance, `compile`);
          }
        }
      }
      instance.render = Component.render || NOOP;
    }
    {
      setCurrentInstance(instance);
      pauseTracking();
      applyOptions(instance);
      resetTracking();
      unsetCurrentInstance();
    }
    if (!Component.render && instance.render === NOOP && !isSSR) {
      if (Component.template) {
        warn(
          `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
          /* should not happen */
        );
      } else {
        warn(`Component is missing template or render function.`);
      }
    }
  }
  function createAttrsProxy(instance) {
    return new Proxy(
      instance.attrs,
      {
        get(target, key) {
          markAttrsAccessed();
          track$1(instance, "get", "$attrs");
          return target[key];
        },
        set() {
          warn(`setupContext.attrs is readonly.`);
          return false;
        },
        deleteProperty() {
          warn(`setupContext.attrs is readonly.`);
          return false;
        }
      }
    );
  }
  function createSetupContext(instance) {
    const expose = (exposed) => {
      {
        if (instance.exposed) {
          warn(`expose() should be called only once per setup().`);
        }
        if (exposed != null) {
          let exposedType = typeof exposed;
          if (exposedType === "object") {
            if (isArray$1(exposed)) {
              exposedType = "array";
            } else if (isRef(exposed)) {
              exposedType = "ref";
            }
          }
          if (exposedType !== "object") {
            warn(`expose() should be passed a plain object, received ${exposedType}.`);
          }
        }
      }
      instance.exposed = exposed || {};
    };
    let attrs;
    {
      return Object.freeze({
        get attrs() {
          return attrs || (attrs = createAttrsProxy(instance));
        },
        get slots() {
          return shallowReadonly(instance.slots);
        },
        get emit() {
          return (event, ...args) => instance.emit(event, ...args);
        },
        expose
      });
    }
  }
  function getExposeProxy(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has(target, key) {
          return key in target || key in publicPropertiesMap;
        }
      }));
    }
  }
  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance && instance.parent) {
      const inferFromRegistry = (registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => {
    return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  };
  function h(type, propsOrChildren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  }
  const ssrContextKey = Symbol(`ssrContext`);
  const useSSRContext = () => {
    {
      const ctx = inject(ssrContextKey);
      if (!ctx) {
        warn(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
      }
      return ctx;
    }
  };
  function isShallow(value) {
    return !!(value && value[
      "__v_isShallow"
      /* ReactiveFlags.IS_SHALLOW */
    ]);
  }
  function initCustomFormatter() {
    if (typeof window === "undefined") {
      return;
    }
    const vueStyle = { style: "color:#3ba776" };
    const numberStyle = { style: "color:#0b1bc9" };
    const stringStyle = { style: "color:#b62e24" };
    const keywordStyle = { style: "color:#9d288c" };
    const formatter = {
      header(obj) {
        if (!isObject(obj)) {
          return null;
        }
        if (obj.__isVue) {
          return ["div", vueStyle, `VueInstance`];
        } else if (isRef(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, genRefFlag(obj)],
            "<",
            formatValue(obj.value),
            `>`
          ];
        } else if (isReactive(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
            "<",
            formatValue(obj),
            `>${isReadonly(obj) ? ` (readonly)` : ``}`
          ];
        } else if (isReadonly(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
            "<",
            formatValue(obj),
            ">"
          ];
        }
        return null;
      },
      hasBody(obj) {
        return obj && obj.__isVue;
      },
      body(obj) {
        if (obj && obj.__isVue) {
          return [
            "div",
            {},
            ...formatInstance(obj.$)
          ];
        }
      }
    };
    function formatInstance(instance) {
      const blocks = [];
      if (instance.type.props && instance.props) {
        blocks.push(createInstanceBlock("props", toRaw(instance.props)));
      }
      if (instance.setupState !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("setup", instance.setupState));
      }
      if (instance.data !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("data", toRaw(instance.data)));
      }
      const computed2 = extractKeys(instance, "computed");
      if (computed2) {
        blocks.push(createInstanceBlock("computed", computed2));
      }
      const injected = extractKeys(instance, "inject");
      if (injected) {
        blocks.push(createInstanceBlock("injected", injected));
      }
      blocks.push([
        "div",
        {},
        [
          "span",
          {
            style: keywordStyle.style + ";opacity:0.66"
          },
          "$ (internal): "
        ],
        ["object", { object: instance }]
      ]);
      return blocks;
    }
    function createInstanceBlock(type, target) {
      target = extend({}, target);
      if (!Object.keys(target).length) {
        return ["span", {}];
      }
      return [
        "div",
        { style: "line-height:1.25em;margin-bottom:0.6em" },
        [
          "div",
          {
            style: "color:#476582"
          },
          type
        ],
        [
          "div",
          {
            style: "padding-left:1.25em"
          },
          ...Object.keys(target).map((key) => {
            return [
              "div",
              {},
              ["span", keywordStyle, key + ": "],
              formatValue(target[key], false)
            ];
          })
        ]
      ];
    }
    function formatValue(v, asRaw = true) {
      if (typeof v === "number") {
        return ["span", numberStyle, v];
      } else if (typeof v === "string") {
        return ["span", stringStyle, JSON.stringify(v)];
      } else if (typeof v === "boolean") {
        return ["span", keywordStyle, v];
      } else if (isObject(v)) {
        return ["object", { object: asRaw ? toRaw(v) : v }];
      } else {
        return ["span", stringStyle, String(v)];
      }
    }
    function extractKeys(instance, type) {
      const Comp = instance.type;
      if (isFunction(Comp)) {
        return;
      }
      const extracted = {};
      for (const key in instance.ctx) {
        if (isKeyOfType(Comp, key, type)) {
          extracted[key] = instance.ctx[key];
        }
      }
      return extracted;
    }
    function isKeyOfType(Comp, key, type) {
      const opts = Comp[type];
      if (isArray$1(opts) && opts.includes(key) || isObject(opts) && key in opts) {
        return true;
      }
      if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
        return true;
      }
      if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
        return true;
      }
    }
    function genRefFlag(v) {
      if (isShallow(v)) {
        return `ShallowRef`;
      }
      if (v.effect) {
        return `ComputedRef`;
      }
      return `Ref`;
    }
    if (window.devtoolsFormatters) {
      window.devtoolsFormatters.push(formatter);
    } else {
      window.devtoolsFormatters = [formatter];
    }
  }
  const version = "3.2.47";
  const svgNS = "http://www.w3.org/2000/svg";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, isSVG, is, props) => {
      const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, isSVG, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling))
            break;
        }
      } else {
        templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
        const template = templateContainer.content;
        if (isSVG) {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  function patchClass(el, value, isSVG) {
    const transitionClasses = el._vtc;
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  function patchStyle(el, prev, next) {
    const style = el.style;
    const isCssString = isString(next);
    if (next && !isCssString) {
      if (prev && !isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
      for (const key in next) {
        setStyle(style, key, next[key]);
      }
    } else {
      const currentDisplay = style.display;
      if (isCssString) {
        if (prev !== next) {
          style.cssText = next;
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
      if ("_vod" in el) {
        style.display = currentDisplay;
      }
    }
  }
  const semicolonRE = /[^\\];\s*$/;
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray$1(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null)
        val = "";
      {
        if (semicolonRE.test(val)) {
          warn(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
        }
      }
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      const isBoolean2 = isSpecialBooleanAttr(key);
      if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, isBoolean2 ? "" : value);
      }
    }
  }
  function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === "innerHTML" || key === "textContent") {
      if (prevChildren) {
        unmountChildren(prevChildren, parentComponent, parentSuspense);
      }
      el[key] = value == null ? "" : value;
      return;
    }
    if (key === "value" && el.tagName !== "PROGRESS" && // custom elements may use _value internally
    !el.tagName.includes("-")) {
      el._value = value;
      const newValue = value == null ? "" : value;
      if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
      // textContent if no value attribute is present. And setting .value for
      // OPTION has no side effect
      el.tagName === "OPTION") {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
      if (!needRemove) {
        warn(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e);
      }
    }
    needRemove && el.removeAttribute(key);
  }
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el._vei || (el._vei = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(nextValue, instance);
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  let cachedNow = 0;
  const p = /* @__PURE__ */ Promise.resolve();
  const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray$1(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
    } else {
      return value;
    }
  }
  const nativeOnRE = /^on[a-z]/;
  const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && nativeOnRE.test(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (nativeOnRE.test(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
  const getModelAssigner = (vnode) => {
    const fn = vnode.props["onUpdate:modelValue"] || false;
    return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
  };
  const vModelCheckbox = {
    // #4096 array checkboxes need to be deep traversed
    deep: true,
    created(el, _, vnode) {
      el._assign = getModelAssigner(vnode);
      addEventListener(el, "change", () => {
        const modelValue = el._modelValue;
        const elementValue = getValue(el);
        const checked = el.checked;
        const assign2 = el._assign;
        if (isArray$1(modelValue)) {
          const index = looseIndexOf(modelValue, elementValue);
          const found = index !== -1;
          if (checked && !found) {
            assign2(modelValue.concat(elementValue));
          } else if (!checked && found) {
            const filtered = [...modelValue];
            filtered.splice(index, 1);
            assign2(filtered);
          }
        } else if (isSet(modelValue)) {
          const cloned = new Set(modelValue);
          if (checked) {
            cloned.add(elementValue);
          } else {
            cloned.delete(elementValue);
          }
          assign2(cloned);
        } else {
          assign2(getCheckboxValue(el, checked));
        }
      });
    },
    // set initial checked on mount to wait for true-value/false-value
    mounted: setChecked,
    beforeUpdate(el, binding, vnode) {
      el._assign = getModelAssigner(vnode);
      setChecked(el, binding, vnode);
    }
  };
  function setChecked(el, { value, oldValue }, vnode) {
    el._modelValue = value;
    if (isArray$1(value)) {
      el.checked = looseIndexOf(value, vnode.props.value) > -1;
    } else if (isSet(value)) {
      el.checked = value.has(vnode.props.value);
    } else if (value !== oldValue) {
      el.checked = looseEqual(value, getCheckboxValue(el, true));
    }
  }
  function getValue(el) {
    return "_value" in el ? el._value : el.value;
  }
  function getCheckboxValue(el, checked) {
    const key = checked ? "_trueValue" : "_falseValue";
    return key in el ? el[key] : checked;
  }
  const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = (...args) => {
    const app2 = ensureRenderer().createApp(...args);
    {
      injectNativeTagCheck(app2);
      injectCompilerOptionsCheck(app2);
    }
    const { mount } = app2;
    app2.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container)
        return;
      const component = app2._component;
      if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      container.innerHTML = "";
      const proxy = mount(container, false, container instanceof SVGElement);
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app2;
  };
  function injectNativeTagCheck(app2) {
    Object.defineProperty(app2.config, "isNativeTag", {
      value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
      writable: false
    });
  }
  function injectCompilerOptionsCheck(app2) {
    if (isRuntimeOnly()) {
      const isCustomElement = app2.config.isCustomElement;
      Object.defineProperty(app2.config, "isCustomElement", {
        get() {
          return isCustomElement;
        },
        set() {
          warn(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
        }
      });
      const compilerOptions = app2.config.compilerOptions;
      const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
      Object.defineProperty(app2.config, "compilerOptions", {
        get() {
          warn(msg);
          return compilerOptions;
        },
        set() {
          warn(msg);
        }
      });
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      const res = document.querySelector(container);
      if (!res) {
        warn(`Failed to mount app: mount target selector "${container}" returned null.`);
      }
      return res;
    }
    if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
      warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
    }
    return container;
  }
  function initDev() {
    {
      initCustomFormatter();
    }
  }
  {
    initDev();
  }
  const theme = "";
  var _global$1 = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  _global$1.SENTRY_RELEASE = { id: "79c15cbd481be54c222041b6a83787b513e98a67" };
  class Management {
    constructor(context) {
      __publicField(this, "context");
      this.context = context;
    }
    uninstall() {
      var _a;
      const options = {
        showConfirmDialog: true
      };
      return (_a = this.context) == null ? void 0 : _a.management.uninstallSelf(options);
    }
  }
  class Message {
    constructor(namepsace, context) {
      __publicField(this, "context");
      __publicField(this, "namespace");
      this.namespace = namepsace;
      this.context = context;
    }
    async send(message) {
      var _a, _b;
      const data2 = {
        ...message,
        from: this.namespace
      };
      return await ((_b = (_a = this.context) == null ? void 0 : _a.runtime) == null ? void 0 : _b.sendMessage(data2));
    }
    addListener(callback) {
      var _a, _b, _c;
      (_c = (_b = (_a = this.context) == null ? void 0 : _a.runtime) == null ? void 0 : _b.onMessage) == null ? void 0 : _c.addListener(callback);
    }
  }
  const UPDATE_KEY = "updatesViewed";
  const CONSENT_KEY = "dataConsentAgreed";
  const ACTIVITY_CONSENT_KEY = "activityConsentAgreed";
  class Storage {
    constructor(context) {
      __publicField(this, "context");
      this.context = context;
    }
    async set(items) {
      var _a;
      for (const key in items) {
        items[key] = JSON.stringify(items[key]);
      }
      if ((_a = this.context) == null ? void 0 : _a.storage) {
        await this.context.storage.local.set(items);
        return;
      }
      for (const key in items) {
        localStorage.setItem(key, items[key]);
      }
    }
    async get(keys) {
      var _a;
      let items = {};
      const includesDefaults = !!(keys && typeof keys !== "string" && !Array.isArray(keys));
      if ((_a = this.context) == null ? void 0 : _a.storage) {
        items = await this.context.storage.local.get(keys);
        for (const key in items) {
          if (typeof items[key] === "string") {
            items[key] = JSON.parse(items[key]);
          }
        }
        return items;
      }
      let iterableKeys = keys;
      if (typeof keys === "string") {
        iterableKeys = [keys];
      } else if (keys && !Array.isArray(keys)) {
        iterableKeys = Object.keys(keys);
      }
      if (!iterableKeys) {
        items = { ...localStorage };
      } else {
        iterableKeys.forEach((key) => {
          items[key] = localStorage.getItem(key);
          if (includesDefaults && !items[key]) {
            items[key] = keys[key];
          }
        });
      }
      for (const key in items) {
        if (typeof items[key] === "string") {
          items[key] = JSON.parse(items[key]);
        }
      }
      return items;
    }
    async remove(keys) {
      var _a;
      if ((_a = this.context) == null ? void 0 : _a.storage) {
        await this.context.storage.local.remove(keys);
        return;
      }
      const iterableKeys = Array.isArray(keys) ? keys : [keys];
      iterableKeys.forEach((key) => localStorage.removeItem(key));
    }
    async clear({ keepDeviceId = false } = {}) {
      var _a;
      const { deviceId } = await this.get("deviceId");
      const updates = await this.get(UPDATE_KEY);
      const dataConsent = await this.get(CONSENT_KEY);
      if ((_a = this.context) == null ? void 0 : _a.storage) {
        await this.context.storage.local.clear();
      } else {
        localStorage.clear();
      }
      if (deviceId && keepDeviceId) {
        await this.set({ deviceId });
      }
      if (updates[UPDATE_KEY]) {
        await this.set(updates);
      }
      if (dataConsent[CONSENT_KEY]) {
        await this.set(dataConsent);
      }
    }
  }
  class ExtensionApi {
    constructor(namespace) {
      __publicField(this, "_context");
      __publicField(this, "storage");
      __publicField(this, "message");
      __publicField(this, "management");
      var _a;
      if (typeof browser !== "undefined") {
        this._context = browser;
      } else if (typeof chrome !== "undefined") {
        this._context = chrome;
      }
      if (this._context) {
        (_a = this._context.runtime) == null ? void 0 : _a.connect();
      }
      this.storage = new Storage(this._context);
      this.message = new Message(namespace, this._context);
      this.management = new Management(this._context);
    }
    get context() {
      return this._context;
    }
    get popup() {
      var _a, _b, _c, _d, _e;
      if ((_b = (_a = this.context) == null ? void 0 : _a.extension) == null ? void 0 : _b.getViews) {
        return !!((_e = (_d = (_c = this.context) == null ? void 0 : _c.extension) == null ? void 0 : _d.getViews({ type: "popup" })) == null ? void 0 : _e.length);
      }
      return false;
    }
    getManifest() {
      if (!this.context) {
        return {};
      }
      return this.context.runtime.getManifest();
    }
    getURL(url) {
      var _a;
      if (!this.context) {
        return "";
      }
      return (_a = this.context.runtime) == null ? void 0 : _a.getURL(url);
    }
    async getBrowserInfo() {
      var _a, _b;
      if ((_b = (_a = this.context) == null ? void 0 : _a.runtime) == null ? void 0 : _b.getBrowserInfo) {
        return this.context.runtime.getBrowserInfo();
      }
      return {
        name: "",
        vendor: "",
        version: "",
        buildID: ""
      };
    }
    addListener(event, callback) {
      if (!this.context) {
        return;
      }
      this.context.runtime[event].addListener(callback);
    }
    addBrowserActionListener(callback) {
      if (!this.context) {
        return;
      }
      this.context.action.onClicked.addListener(callback);
    }
    async getCurrentTab() {
      if (!this.context || !this.context.tabs) {
        return;
      }
      const [tab] = await this.context.tabs.query({
        active: true,
        currentWindow: true
      });
      return tab;
    }
    addTabListener(listener) {
      var _a, _b;
      (_b = (_a = this.context) == null ? void 0 : _a.tabs) == null ? void 0 : _b.onUpdated.addListener(listener);
    }
  }
  const extensionApi = new ExtensionApi("app");
  const getTheme = async () => {
    return (await extensionApi.storage.get("theme")).theme || "auto";
  };
  const init = () => {
    getTheme().then(renderTheme);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => getTheme().then(renderTheme));
  };
  const renderTheme = (theme2) => {
    if ({}.STORYBOOK === "true") {
      return;
    }
    if (theme2 === "auto") {
      const osTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.setAttribute("data-bs-theme", osTheme);
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme2);
    }
  };
  init();
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$5 = {};
  const _hoisted_1$5 = { class: "py-3 px-4 border-bottom flex-shrink-0 d-flex align-items-center justify-content-between" };
  function _sfc_render$2(_ctx, _cache) {
    return openBlock(), createElementBlock("header", _hoisted_1$5, [
      renderSlot(_ctx.$slots, "default")
    ]);
  }
  const HeaderContent = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2], ["__file", "/home/runner/work/browser-extension/browser-extension/src/components/content/HeaderContent.vue"]]);
  const IconPrivacyLogo_vue_vue_type_style_index_0_scoped_d4bf3661_lang = "";
  const _sfc_main$4 = {};
  const _withScopeId$2 = (n) => (pushScopeId("data-v-d4bf3661"), n = n(), popScopeId(), n);
  const _hoisted_1$4 = {
    width: "80",
    height: "20",
    viewBox: "0 0 80 20",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_2$4 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode(
    "rect",
    {
      width: "80",
      height: "20",
      class: "bg"
    },
    null,
    -1
    /* HOISTED */
  ));
  const _hoisted_3$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode(
    "path",
    {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      class: "mask",
      d: "M80 0V20H0V0H80ZM59.7975 4.8C59.1102 4.8 58.4515 4.90739 57.8215 5.12217C57.1915 5.33695 56.6211 5.65435 56.1104 6.07436C55.5997 6.49438 55.1893 7.05519 54.879 7.75681C54.5688 8.45843 54.4137 9.24833 54.4137 10.1265C54.4137 10.9666 54.5688 11.7207 54.879 12.3889C55.1893 13.0571 55.6045 13.5917 56.1248 13.9926C56.645 14.3935 57.2201 14.699 57.8502 14.909C58.4802 15.119 59.1388 15.224 59.8261 15.224C60.8762 15.224 61.8451 15.0092 62.7328 14.5797V12.4748C62.1219 13.0285 61.2628 13.3053 60.1555 13.3053C59.7068 13.3053 59.2749 13.2409 58.8596 13.112C58.4444 12.9831 58.0673 12.7946 57.7285 12.5464C57.3896 12.2982 57.1199 11.9665 56.9194 11.5513C56.719 11.136 56.6188 10.6611 56.6188 10.1265C56.6188 9.00014 56.9648 8.14819 57.6569 7.57066C58.3489 6.99314 59.1818 6.70438 60.1555 6.70438C61.1482 6.70438 61.9835 6.96689 62.6612 7.49191V5.44434C61.8021 5.01478 60.8475 4.8 59.7975 4.8ZM10.7801 5.00046H7V15.0235H9.1478V11.7302H10.7801C13.663 11.7302 15.1044 10.6086 15.1044 8.36535C15.1044 6.12208 13.663 5.00046 10.7801 5.00046ZM21.6648 5.00046H17.5411V15.0235H19.6889V11.5155H21.2639L23.9701 15.0235H26.4473L23.4547 11.2434C24.9152 10.7757 25.6454 9.78291 25.6454 8.26512C25.6454 7.65419 25.5333 7.12917 25.3089 6.69007C25.0846 6.25096 24.7744 5.91209 24.3782 5.67344C23.9821 5.43479 23.5621 5.26297 23.1182 5.15797C22.6743 5.05296 22.1899 5.00046 21.6648 5.00046ZM30.8027 5.00046H28.6549V15.0235H30.8027V5.00046ZM35.4879 5.00046H33.1683L37.063 15.0235H39.268L43.177 5.00046H40.8574L38.1655 12.5035L35.4879 5.00046ZM49.4288 5.00046H47.1091L43.014 15.0235H45.2334L45.978 13.1478H50.5599L51.2902 15.0235H53.5096L49.4288 5.00046ZM66.68 5.00046H64.2602L68.1835 11.4725V15.0235H70.317V11.4725L74.226 5.00046H71.8061L69.2431 9.49653L66.68 5.00046ZM48.269 6.99076C48.3167 7.2485 48.3883 7.511 48.4837 7.77829L49.887 11.3723H46.6509L48.0399 7.77829C48.1353 7.54919 48.2117 7.28668 48.269 6.99076ZM10.8804 6.89053C12.2359 6.89053 12.9136 7.38213 12.9136 8.36535C12.9136 9.34857 12.2359 9.84018 10.8804 9.84018H9.1478V6.89053H10.8804ZM21.7651 6.89053C22.2615 6.89053 22.6671 7.00508 22.9822 7.23418C23.2972 7.46328 23.4547 7.82124 23.4547 8.30808C23.4547 8.78537 23.2948 9.14095 22.975 9.37482C22.6552 9.60869 22.2519 9.72563 21.7651 9.72563H19.6889V6.89053H21.7651Z"
    },
    null,
    -1
    /* HOISTED */
  ));
  const _hoisted_4$2 = [
    _hoisted_2$4,
    _hoisted_3$3
  ];
  function _sfc_render$1(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_4$2);
  }
  const PrivacyLogo = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__scopeId", "data-v-d4bf3661"], ["__file", "/home/runner/work/browser-extension/browser-extension/src/components/icons/IconPrivacyLogo.vue"]]);
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var collapseExports = {};
  var collapse = {
    get exports() {
      return collapseExports;
    },
    set exports(v) {
      collapseExports = v;
    }
  };
  var baseComponentExports = {};
  var baseComponent = {
    get exports() {
      return baseComponentExports;
    },
    set exports(v) {
      baseComponentExports = v;
    }
  };
  var dataExports = {};
  var data = {
    get exports() {
      return dataExports;
    },
    set exports(v) {
      dataExports = v;
    }
  };
  /*!
    * Bootstrap data.js v5.3.0 (https://getbootstrap.com/)
    * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
  var hasRequiredData;
  function requireData() {
    if (hasRequiredData)
      return dataExports;
    hasRequiredData = 1;
    (function(module, exports) {
      (function(global2, factory) {
        module.exports = factory();
      })(commonjsGlobal, function() {
        const elementMap = /* @__PURE__ */ new Map();
        const data2 = {
          set(element, key, instance) {
            if (!elementMap.has(element)) {
              elementMap.set(element, /* @__PURE__ */ new Map());
            }
            const instanceMap = elementMap.get(element);
            if (!instanceMap.has(key) && instanceMap.size !== 0) {
              console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
              return;
            }
            instanceMap.set(key, instance);
          },
          get(element, key) {
            if (elementMap.has(element)) {
              return elementMap.get(element).get(key) || null;
            }
            return null;
          },
          remove(element, key) {
            if (!elementMap.has(element)) {
              return;
            }
            const instanceMap = elementMap.get(element);
            instanceMap.delete(key);
            if (instanceMap.size === 0) {
              elementMap.delete(element);
            }
          }
        };
        return data2;
      });
    })(data);
    return dataExports;
  }
  var eventHandlerExports = {};
  var eventHandler = {
    get exports() {
      return eventHandlerExports;
    },
    set exports(v) {
      eventHandlerExports = v;
    }
  };
  var utilExports = {};
  var util = {
    get exports() {
      return utilExports;
    },
    set exports(v) {
      utilExports = v;
    }
  };
  /*!
    * Bootstrap index.js v5.3.0 (https://getbootstrap.com/)
    * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
  var hasRequiredUtil;
  function requireUtil() {
    if (hasRequiredUtil)
      return utilExports;
    hasRequiredUtil = 1;
    (function(module, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const MAX_UID = 1e6;
        const MILLISECONDS_MULTIPLIER = 1e3;
        const TRANSITION_END = "transitionend";
        const parseSelector = (selector) => {
          if (selector && window.CSS && window.CSS.escape) {
            selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
          }
          return selector;
        };
        const toType = (object) => {
          if (object === null || object === void 0) {
            return `${object}`;
          }
          return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getUID = (prefix) => {
          do {
            prefix += Math.floor(Math.random() * MAX_UID);
          } while (document.getElementById(prefix));
          return prefix;
        };
        const getTransitionDurationFromElement = (element) => {
          if (!element) {
            return 0;
          }
          let {
            transitionDuration,
            transitionDelay
          } = window.getComputedStyle(element);
          const floatTransitionDuration = Number.parseFloat(transitionDuration);
          const floatTransitionDelay = Number.parseFloat(transitionDelay);
          if (!floatTransitionDuration && !floatTransitionDelay) {
            return 0;
          }
          transitionDuration = transitionDuration.split(",")[0];
          transitionDelay = transitionDelay.split(",")[0];
          return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
        };
        const triggerTransitionEnd = (element) => {
          element.dispatchEvent(new Event(TRANSITION_END));
        };
        const isElement = (object) => {
          if (!object || typeof object !== "object") {
            return false;
          }
          if (typeof object.jquery !== "undefined") {
            object = object[0];
          }
          return typeof object.nodeType !== "undefined";
        };
        const getElement = (object) => {
          if (isElement(object)) {
            return object.jquery ? object[0] : object;
          }
          if (typeof object === "string" && object.length > 0) {
            return document.querySelector(parseSelector(object));
          }
          return null;
        };
        const isVisible = (element) => {
          if (!isElement(element) || element.getClientRects().length === 0) {
            return false;
          }
          const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
          const closedDetails = element.closest("details:not([open])");
          if (!closedDetails) {
            return elementIsVisible;
          }
          if (closedDetails !== element) {
            const summary = element.closest("summary");
            if (summary && summary.parentNode !== closedDetails) {
              return false;
            }
            if (summary === null) {
              return false;
            }
          }
          return elementIsVisible;
        };
        const isDisabled = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const findShadowRoot = (element) => {
          if (!document.documentElement.attachShadow) {
            return null;
          }
          if (typeof element.getRootNode === "function") {
            const root = element.getRootNode();
            return root instanceof ShadowRoot ? root : null;
          }
          if (element instanceof ShadowRoot) {
            return element;
          }
          if (!element.parentNode) {
            return null;
          }
          return findShadowRoot(element.parentNode);
        };
        const noop2 = () => {
        };
        const reflow = (element) => {
          element.offsetHeight;
        };
        const getjQuery = () => {
          if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return window.jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                for (const callback2 of DOMContentLoadedCallbacks) {
                  callback2();
                }
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const isRTL = () => document.documentElement.dir === "rtl";
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
          return typeof possibleCallback === "function" ? possibleCallback(...args) : defaultValue;
        };
        const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
          if (!waitForTransition) {
            execute(callback);
            return;
          }
          const durationPadding = 5;
          const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
          let called = false;
          const handler = ({
            target
          }) => {
            if (target !== transitionElement) {
              return;
            }
            called = true;
            transitionElement.removeEventListener(TRANSITION_END, handler);
            execute(callback);
          };
          transitionElement.addEventListener(TRANSITION_END, handler);
          setTimeout(() => {
            if (!called) {
              triggerTransitionEnd(transitionElement);
            }
          }, emulatedDuration);
        };
        const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
          const listLength = list.length;
          let index = list.indexOf(activeElement);
          if (index === -1) {
            return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
          }
          index += shouldGetNext ? 1 : -1;
          if (isCycleAllowed) {
            index = (index + listLength) % listLength;
          }
          return list[Math.max(0, Math.min(index, listLength - 1))];
        };
        exports2.defineJQueryPlugin = defineJQueryPlugin;
        exports2.execute = execute;
        exports2.executeAfterTransition = executeAfterTransition;
        exports2.findShadowRoot = findShadowRoot;
        exports2.getElement = getElement;
        exports2.getNextActiveElement = getNextActiveElement;
        exports2.getTransitionDurationFromElement = getTransitionDurationFromElement;
        exports2.getUID = getUID;
        exports2.getjQuery = getjQuery;
        exports2.isDisabled = isDisabled;
        exports2.isElement = isElement;
        exports2.isRTL = isRTL;
        exports2.isVisible = isVisible;
        exports2.noop = noop2;
        exports2.onDOMContentLoaded = onDOMContentLoaded;
        exports2.parseSelector = parseSelector;
        exports2.reflow = reflow;
        exports2.toType = toType;
        exports2.triggerTransitionEnd = triggerTransitionEnd;
        Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
      });
    })(util, utilExports);
    return utilExports;
  }
  /*!
    * Bootstrap event-handler.js v5.3.0 (https://getbootstrap.com/)
    * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
  var hasRequiredEventHandler;
  function requireEventHandler() {
    if (hasRequiredEventHandler)
      return eventHandlerExports;
    hasRequiredEventHandler = 1;
    (function(module, exports) {
      (function(global2, factory) {
        module.exports = factory(requireUtil());
      })(commonjsGlobal, function(index_js) {
        const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
        const stripNameRegex = /\..*/;
        const stripUidRegex = /::\d+$/;
        const eventRegistry = {};
        let uidEvent = 1;
        const customEvents = {
          mouseenter: "mouseover",
          mouseleave: "mouseout"
        };
        const nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
        function makeEventUid(element, uid2) {
          return uid2 && `${uid2}::${uidEvent++}` || element.uidEvent || uidEvent++;
        }
        function getElementEvents(element) {
          const uid2 = makeEventUid(element);
          element.uidEvent = uid2;
          eventRegistry[uid2] = eventRegistry[uid2] || {};
          return eventRegistry[uid2];
        }
        function bootstrapHandler(element, fn) {
          return function handler(event) {
            hydrateObj(event, {
              delegateTarget: element
            });
            if (handler.oneOff) {
              EventHandler.off(element, event.type, fn);
            }
            return fn.apply(element, [event]);
          };
        }
        function bootstrapDelegationHandler(element, selector, fn) {
          return function handler(event) {
            const domElements = element.querySelectorAll(selector);
            for (let {
              target
            } = event; target && target !== this; target = target.parentNode) {
              for (const domElement of domElements) {
                if (domElement !== target) {
                  continue;
                }
                hydrateObj(event, {
                  delegateTarget: target
                });
                if (handler.oneOff) {
                  EventHandler.off(element, event.type, selector, fn);
                }
                return fn.apply(target, [event]);
              }
            }
          };
        }
        function findHandler(events, callable, delegationSelector = null) {
          return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
        }
        function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
          const isDelegated = typeof handler === "string";
          const callable = isDelegated ? delegationFunction : handler || delegationFunction;
          let typeEvent = getTypeEvent(originalTypeEvent);
          if (!nativeEvents.has(typeEvent)) {
            typeEvent = originalTypeEvent;
          }
          return [isDelegated, callable, typeEvent];
        }
        function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
          if (typeof originalTypeEvent !== "string" || !element) {
            return;
          }
          let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
          if (originalTypeEvent in customEvents) {
            const wrapFunction = (fn2) => {
              return function(event) {
                if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                  return fn2.call(this, event);
                }
              };
            };
            callable = wrapFunction(callable);
          }
          const events = getElementEvents(element);
          const handlers = events[typeEvent] || (events[typeEvent] = {});
          const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
          if (previousFunction) {
            previousFunction.oneOff = previousFunction.oneOff && oneOff;
            return;
          }
          const uid2 = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
          const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
          fn.delegationSelector = isDelegated ? handler : null;
          fn.callable = callable;
          fn.oneOff = oneOff;
          fn.uidEvent = uid2;
          handlers[uid2] = fn;
          element.addEventListener(typeEvent, fn, isDelegated);
        }
        function removeHandler(element, events, typeEvent, handler, delegationSelector) {
          const fn = findHandler(events[typeEvent], handler, delegationSelector);
          if (!fn) {
            return;
          }
          element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
          delete events[typeEvent][fn.uidEvent];
        }
        function removeNamespacedHandlers(element, events, typeEvent, namespace) {
          const storeElementEvent = events[typeEvent] || {};
          for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
            if (handlerKey.includes(namespace)) {
              removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
            }
          }
        }
        function getTypeEvent(event) {
          event = event.replace(stripNameRegex, "");
          return customEvents[event] || event;
        }
        const EventHandler = {
          on(element, event, handler, delegationFunction) {
            addHandler(element, event, handler, delegationFunction, false);
          },
          one(element, event, handler, delegationFunction) {
            addHandler(element, event, handler, delegationFunction, true);
          },
          off(element, originalTypeEvent, handler, delegationFunction) {
            if (typeof originalTypeEvent !== "string" || !element) {
              return;
            }
            const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
            const inNamespace = typeEvent !== originalTypeEvent;
            const events = getElementEvents(element);
            const storeElementEvent = events[typeEvent] || {};
            const isNamespace = originalTypeEvent.startsWith(".");
            if (typeof callable !== "undefined") {
              if (!Object.keys(storeElementEvent).length) {
                return;
              }
              removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
              return;
            }
            if (isNamespace) {
              for (const elementEvent of Object.keys(events)) {
                removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
              }
            }
            for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
              const handlerKey = keyHandlers.replace(stripUidRegex, "");
              if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
                removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
              }
            }
          },
          trigger(element, event, args) {
            if (typeof event !== "string" || !element) {
              return null;
            }
            const $ = index_js.getjQuery();
            const typeEvent = getTypeEvent(event);
            const inNamespace = event !== typeEvent;
            let jQueryEvent = null;
            let bubbles = true;
            let nativeDispatch = true;
            let defaultPrevented = false;
            if (inNamespace && $) {
              jQueryEvent = $.Event(event, args);
              $(element).trigger(jQueryEvent);
              bubbles = !jQueryEvent.isPropagationStopped();
              nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
              defaultPrevented = jQueryEvent.isDefaultPrevented();
            }
            const evt = hydrateObj(new Event(event, {
              bubbles,
              cancelable: true
            }), args);
            if (defaultPrevented) {
              evt.preventDefault();
            }
            if (nativeDispatch) {
              element.dispatchEvent(evt);
            }
            if (evt.defaultPrevented && jQueryEvent) {
              jQueryEvent.preventDefault();
            }
            return evt;
          }
        };
        function hydrateObj(obj, meta = {}) {
          for (const [key, value] of Object.entries(meta)) {
            try {
              obj[key] = value;
            } catch (_unused) {
              Object.defineProperty(obj, key, {
                configurable: true,
                get() {
                  return value;
                }
              });
            }
          }
          return obj;
        }
        return EventHandler;
      });
    })(eventHandler);
    return eventHandlerExports;
  }
  var configExports = {};
  var config = {
    get exports() {
      return configExports;
    },
    set exports(v) {
      configExports = v;
    }
  };
  var manipulatorExports = {};
  var manipulator = {
    get exports() {
      return manipulatorExports;
    },
    set exports(v) {
      manipulatorExports = v;
    }
  };
  /*!
    * Bootstrap manipulator.js v5.3.0 (https://getbootstrap.com/)
    * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
  var hasRequiredManipulator;
  function requireManipulator() {
    if (hasRequiredManipulator)
      return manipulatorExports;
    hasRequiredManipulator = 1;
    (function(module, exports) {
      (function(global2, factory) {
        module.exports = factory();
      })(commonjsGlobal, function() {
        function normalizeData(value) {
          if (value === "true") {
            return true;
          }
          if (value === "false") {
            return false;
          }
          if (value === Number(value).toString()) {
            return Number(value);
          }
          if (value === "" || value === "null") {
            return null;
          }
          if (typeof value !== "string") {
            return value;
          }
          try {
            return JSON.parse(decodeURIComponent(value));
          } catch (_unused) {
            return value;
          }
        }
        function normalizeDataKey(key) {
          return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
        }
        const Manipulator = {
          setDataAttribute(element, key, value) {
            element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
          },
          removeDataAttribute(element, key) {
            element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
          },
          getDataAttributes(element) {
            if (!element) {
              return {};
            }
            const attributes = {};
            const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
            for (const key of bsKeys) {
              let pureKey = key.replace(/^bs/, "");
              pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
              attributes[pureKey] = normalizeData(element.dataset[key]);
            }
            return attributes;
          },
          getDataAttribute(element, key) {
            return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
          }
        };
        return Manipulator;
      });
    })(manipulator);
    return manipulatorExports;
  }
  /*!
    * Bootstrap config.js v5.3.0 (https://getbootstrap.com/)
    * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
  var hasRequiredConfig;
  function requireConfig() {
    if (hasRequiredConfig)
      return configExports;
    hasRequiredConfig = 1;
    (function(module, exports) {
      (function(global2, factory) {
        module.exports = factory(requireManipulator(), requireUtil());
      })(commonjsGlobal, function(Manipulator, index_js) {
        class Config {
          // Getters
          static get Default() {
            return {};
          }
          static get DefaultType() {
            return {};
          }
          static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!');
          }
          _getConfig(config2) {
            config2 = this._mergeConfigObj(config2);
            config2 = this._configAfterMerge(config2);
            this._typeCheckConfig(config2);
            return config2;
          }
          _configAfterMerge(config2) {
            return config2;
          }
          _mergeConfigObj(config2, element) {
            const jsonConfig = index_js.isElement(element) ? Manipulator.getDataAttribute(element, "config") : {};
            return {
              ...this.constructor.Default,
              ...typeof jsonConfig === "object" ? jsonConfig : {},
              ...index_js.isElement(element) ? Manipulator.getDataAttributes(element) : {},
              ...typeof config2 === "object" ? config2 : {}
            };
          }
          _typeCheckConfig(config2, configTypes = this.constructor.DefaultType) {
            for (const [property, expectedTypes] of Object.entries(configTypes)) {
              const value = config2[property];
              const valueType = index_js.isElement(value) ? "element" : index_js.toType(value);
              if (!new RegExp(expectedTypes).test(valueType)) {
                throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
              }
            }
          }
        }
        return Config;
      });
    })(config);
    return configExports;
  }
  /*!
    * Bootstrap base-component.js v5.3.0 (https://getbootstrap.com/)
    * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
  var hasRequiredBaseComponent;
  function requireBaseComponent() {
    if (hasRequiredBaseComponent)
      return baseComponentExports;
    hasRequiredBaseComponent = 1;
    (function(module, exports) {
      (function(global2, factory) {
        module.exports = factory(requireData(), requireEventHandler(), requireConfig(), requireUtil());
      })(commonjsGlobal, function(Data, EventHandler, Config, index_js) {
        const VERSION = "5.3.0";
        class BaseComponent extends Config {
          constructor(element, config2) {
            super();
            element = index_js.getElement(element);
            if (!element) {
              return;
            }
            this._element = element;
            this._config = this._getConfig(config2);
            Data.set(this._element, this.constructor.DATA_KEY, this);
          }
          // Public
          dispose() {
            Data.remove(this._element, this.constructor.DATA_KEY);
            EventHandler.off(this._element, this.constructor.EVENT_KEY);
            for (const propertyName of Object.getOwnPropertyNames(this)) {
              this[propertyName] = null;
            }
          }
          _queueCallback(callback, element, isAnimated = true) {
            index_js.executeAfterTransition(callback, element, isAnimated);
          }
          _getConfig(config2) {
            config2 = this._mergeConfigObj(config2, this._element);
            config2 = this._configAfterMerge(config2);
            this._typeCheckConfig(config2);
            return config2;
          }
          // Static
          static getInstance(element) {
            return Data.get(index_js.getElement(element), this.DATA_KEY);
          }
          static getOrCreateInstance(element, config2 = {}) {
            return this.getInstance(element) || new this(element, typeof config2 === "object" ? config2 : null);
          }
          static get VERSION() {
            return VERSION;
          }
          static get DATA_KEY() {
            return `bs.${this.NAME}`;
          }
          static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
          }
          static eventName(name) {
            return `${name}${this.EVENT_KEY}`;
          }
        }
        return BaseComponent;
      });
    })(baseComponent);
    return baseComponentExports;
  }
  var selectorEngineExports = {};
  var selectorEngine = {
    get exports() {
      return selectorEngineExports;
    },
    set exports(v) {
      selectorEngineExports = v;
    }
  };
  /*!
    * Bootstrap selector-engine.js v5.3.0 (https://getbootstrap.com/)
    * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
  var hasRequiredSelectorEngine;
  function requireSelectorEngine() {
    if (hasRequiredSelectorEngine)
      return selectorEngineExports;
    hasRequiredSelectorEngine = 1;
    (function(module, exports) {
      (function(global2, factory) {
        module.exports = factory(requireUtil());
      })(commonjsGlobal, function(index_js) {
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttribute = element.getAttribute("href");
            if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
              return null;
            }
            if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
              hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
            }
            selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
          }
          return index_js.parseSelector(selector);
        };
        const SelectorEngine = {
          find(selector, element = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
          },
          findOne(selector, element = document.documentElement) {
            return Element.prototype.querySelector.call(element, selector);
          },
          children(element, selector) {
            return [].concat(...element.children).filter((child) => child.matches(selector));
          },
          parents(element, selector) {
            const parents = [];
            let ancestor = element.parentNode.closest(selector);
            while (ancestor) {
              parents.push(ancestor);
              ancestor = ancestor.parentNode.closest(selector);
            }
            return parents;
          },
          prev(element, selector) {
            let previous = element.previousElementSibling;
            while (previous) {
              if (previous.matches(selector)) {
                return [previous];
              }
              previous = previous.previousElementSibling;
            }
            return [];
          },
          // TODO: this is now unused; remove later along with prev()
          next(element, selector) {
            let next = element.nextElementSibling;
            while (next) {
              if (next.matches(selector)) {
                return [next];
              }
              next = next.nextElementSibling;
            }
            return [];
          },
          focusableChildren(element) {
            const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
            return this.find(focusables, element).filter((el) => !index_js.isDisabled(el) && index_js.isVisible(el));
          },
          getSelectorFromElement(element) {
            const selector = getSelector(element);
            if (selector) {
              return SelectorEngine.findOne(selector) ? selector : null;
            }
            return null;
          },
          getElementFromSelector(element) {
            const selector = getSelector(element);
            return selector ? SelectorEngine.findOne(selector) : null;
          },
          getMultipleElementsFromSelector(element) {
            const selector = getSelector(element);
            return selector ? SelectorEngine.find(selector) : [];
          }
        };
        return SelectorEngine;
      });
    })(selectorEngine);
    return selectorEngineExports;
  }
  /*!
    * Bootstrap collapse.js v5.3.0 (https://getbootstrap.com/)
    * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    */
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory(requireBaseComponent(), requireEventHandler(), requireSelectorEngine(), requireUtil());
    })(commonjsGlobal, function(BaseComponent, EventHandler, SelectorEngine, index_js) {
      const NAME = "collapse";
      const DATA_KEY = "bs.collapse";
      const EVENT_KEY = `.${DATA_KEY}`;
      const DATA_API_KEY = ".data-api";
      const EVENT_SHOW = `show${EVENT_KEY}`;
      const EVENT_SHOWN = `shown${EVENT_KEY}`;
      const EVENT_HIDE = `hide${EVENT_KEY}`;
      const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
      const CLASS_NAME_SHOW = "show";
      const CLASS_NAME_COLLAPSE = "collapse";
      const CLASS_NAME_COLLAPSING = "collapsing";
      const CLASS_NAME_COLLAPSED = "collapsed";
      const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
      const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
      const WIDTH = "width";
      const HEIGHT = "height";
      const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
      const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
      const Default = {
        parent: null,
        toggle: true
      };
      const DefaultType = {
        parent: "(null|element)",
        toggle: "boolean"
      };
      class Collapse extends BaseComponent {
        constructor(element, config2) {
          super(element, config2);
          this._isTransitioning = false;
          this._triggerArray = [];
          const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE);
          for (const elem of toggleList) {
            const selector = SelectorEngine.getSelectorFromElement(elem);
            const filterElement = SelectorEngine.find(selector).filter((foundElement) => foundElement === this._element);
            if (selector !== null && filterElement.length) {
              this._triggerArray.push(elem);
            }
          }
          this._initializeChildren();
          if (!this._config.parent) {
            this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
          }
          if (this._config.toggle) {
            this.toggle();
          }
        }
        // Getters
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        // Public
        toggle() {
          if (this._isShown()) {
            this.hide();
          } else {
            this.show();
          }
        }
        show() {
          if (this._isTransitioning || this._isShown()) {
            return;
          }
          let activeChildren = [];
          if (this._config.parent) {
            activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element) => element !== this._element).map((element) => Collapse.getOrCreateInstance(element, {
              toggle: false
            }));
          }
          if (activeChildren.length && activeChildren[0]._isTransitioning) {
            return;
          }
          const startEvent = EventHandler.trigger(this._element, EVENT_SHOW);
          if (startEvent.defaultPrevented) {
            return;
          }
          for (const activeInstance of activeChildren) {
            activeInstance.hide();
          }
          const dimension = this._getDimension();
          this._element.classList.remove(CLASS_NAME_COLLAPSE);
          this._element.classList.add(CLASS_NAME_COLLAPSING);
          this._element.style[dimension] = 0;
          this._addAriaAndCollapsedClass(this._triggerArray, true);
          this._isTransitioning = true;
          const complete = () => {
            this._isTransitioning = false;
            this._element.classList.remove(CLASS_NAME_COLLAPSING);
            this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
            this._element.style[dimension] = "";
            EventHandler.trigger(this._element, EVENT_SHOWN);
          };
          const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
          const scrollSize = `scroll${capitalizedDimension}`;
          this._queueCallback(complete, this._element, true);
          this._element.style[dimension] = `${this._element[scrollSize]}px`;
        }
        hide() {
          if (this._isTransitioning || !this._isShown()) {
            return;
          }
          const startEvent = EventHandler.trigger(this._element, EVENT_HIDE);
          if (startEvent.defaultPrevented) {
            return;
          }
          const dimension = this._getDimension();
          this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
          index_js.reflow(this._element);
          this._element.classList.add(CLASS_NAME_COLLAPSING);
          this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
          for (const trigger2 of this._triggerArray) {
            const element = SelectorEngine.getElementFromSelector(trigger2);
            if (element && !this._isShown(element)) {
              this._addAriaAndCollapsedClass([trigger2], false);
            }
          }
          this._isTransitioning = true;
          const complete = () => {
            this._isTransitioning = false;
            this._element.classList.remove(CLASS_NAME_COLLAPSING);
            this._element.classList.add(CLASS_NAME_COLLAPSE);
            EventHandler.trigger(this._element, EVENT_HIDDEN);
          };
          this._element.style[dimension] = "";
          this._queueCallback(complete, this._element, true);
        }
        _isShown(element = this._element) {
          return element.classList.contains(CLASS_NAME_SHOW);
        }
        // Private
        _configAfterMerge(config2) {
          config2.toggle = Boolean(config2.toggle);
          config2.parent = index_js.getElement(config2.parent);
          return config2;
        }
        _getDimension() {
          return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
        }
        _initializeChildren() {
          if (!this._config.parent) {
            return;
          }
          const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);
          for (const element of children) {
            const selected = SelectorEngine.getElementFromSelector(element);
            if (selected) {
              this._addAriaAndCollapsedClass([element], this._isShown(selected));
            }
          }
        }
        _getFirstLevelChildren(selector) {
          const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
          return SelectorEngine.find(selector, this._config.parent).filter((element) => !children.includes(element));
        }
        _addAriaAndCollapsedClass(triggerArray, isOpen) {
          if (!triggerArray.length) {
            return;
          }
          for (const element of triggerArray) {
            element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
            element.setAttribute("aria-expanded", isOpen);
          }
        }
        // Static
        static jQueryInterface(config2) {
          const _config = {};
          if (typeof config2 === "string" && /show|hide/.test(config2)) {
            _config.toggle = false;
          }
          return this.each(function() {
            const data2 = Collapse.getOrCreateInstance(this, _config);
            if (typeof config2 === "string") {
              if (typeof data2[config2] === "undefined") {
                throw new TypeError(`No method named "${config2}"`);
              }
              data2[config2]();
            }
          });
        }
      }
      EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
          event.preventDefault();
        }
        for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
          Collapse.getOrCreateInstance(element, {
            toggle: false
          }).toggle();
        }
      });
      index_js.defineJQueryPlugin(Collapse);
      return Collapse;
    });
  })(collapse);
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data2 = JSON.parse(raw);
        Object.assign(currentSettings, data2);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * vue-router v4.2.5
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  const isBrowser = typeof window !== "undefined";
  const noop$1 = () => {
  };
  const isArray = Array.isArray;
  function isSameRouteRecord(a, b) {
    return (a.aliasOf || a) === (b.aliasOf || b);
  }
  function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length)
      return false;
    for (const key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b[key]))
        return false;
    }
    return true;
  }
  function isSameRouteLocationParamsValue(a, b) {
    return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a === b;
  }
  function isEquivalentArray(a, b) {
    return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
  }
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  var NavigationFailureType;
  (function(NavigationFailureType2) {
    NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
    NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
    NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
  })(NavigationFailureType || (NavigationFailureType = {}));
  const routerKey = Symbol("router");
  const routeLocationKey = Symbol("route location");
  function useLink(props) {
    const router = inject(routerKey);
    const currentRoute = inject(routeLocationKey);
    const route = computed(() => router.resolve(unref(props.to)));
    const activeRecordIndex = computed(() => {
      const { matched } = route.value;
      const { length } = matched;
      const routeMatched = matched[length - 1];
      const currentMatched = currentRoute.matched;
      if (!routeMatched || !currentMatched.length)
        return -1;
      const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
      if (index > -1)
        return index;
      const parentRecordPath = getOriginalPath(matched[length - 2]);
      return (
        // we are dealing with nested routes
        length > 1 && // if the parent and matched route have the same path, this link is
        // referring to the empty child. Or we currently are on a different
        // child of the same parent
        getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
        currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index
      );
    });
    const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
    const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e = {}) {
      if (guardEvent(e)) {
        return router[unref(props.replace) ? "replace" : "push"](
          unref(props.to)
          // avoid uncaught errors are they are logged anyway
        ).catch(noop$1);
      }
      return Promise.resolve();
    }
    if (isBrowser) {
      const instance = getCurrentInstance();
      if (instance) {
        const linkContextDevtools = {
          route: route.value,
          isActive: isActive.value,
          isExactActive: isExactActive.value
        };
        instance.__vrl_devtools = instance.__vrl_devtools || [];
        instance.__vrl_devtools.push(linkContextDevtools);
        watchEffect(() => {
          linkContextDevtools.route = route.value;
          linkContextDevtools.isActive = isActive.value;
          linkContextDevtools.isExactActive = isExactActive.value;
        }, { flush: "post" });
      }
    }
    return {
      route,
      href: computed(() => route.value.href),
      isActive,
      isExactActive,
      navigate
    };
  }
  const RouterLinkImpl = /* @__PURE__ */ defineComponent({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: {
        type: [String, Object],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      // inactiveClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      }
    },
    useLink,
    setup(props, { slots }) {
      const link = reactive(useLink(props));
      const { options } = inject(routerKey);
      const elClass = computed(() => ({
        [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
        // [getLinkClass(
        //   props.inactiveClass,
        //   options.linkInactiveClass,
        //   'router-link-inactive'
        // )]: !link.isExactActive,
        [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
      }));
      return () => {
        const children = slots.default && slots.default(link);
        return props.custom ? children : h("a", {
          "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
          href: link.href,
          // this would override user added attrs but Vue will still add
          // the listener, so we end up triggering both
          onClick: link.navigate,
          class: elClass.value
        }, children);
      };
    }
  });
  const RouterLink = RouterLinkImpl;
  function guardEvent(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
      return;
    if (e.defaultPrevented)
      return;
    if (e.button !== void 0 && e.button !== 0)
      return;
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const target = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target))
        return;
    }
    if (e.preventDefault)
      e.preventDefault();
    return true;
  }
  function includesParams(outer, inner) {
    for (const key in inner) {
      const innerValue = inner[key];
      const outerValue = outer[key];
      if (typeof innerValue === "string") {
        if (innerValue !== outerValue)
          return false;
      } else {
        if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
          return false;
      }
    }
    return true;
  }
  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
  }
  const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
  const _hoisted_1$3 = ["href"];
  const _hoisted_2$3 = ["title"];
  const _sfc_main$3 = /* @__PURE__ */ defineComponent({
    __name: "BaseButton",
    props: {
      variant: { type: String, required: false, default: "primary" },
      size: { type: String, required: false },
      to: { type: null, required: false },
      title: { type: String, required: false }
    },
    setup(__props, { expose }) {
      const props = __props;
      const element = ref(null);
      const externalHostRegex = /^https?:\/\//i;
      const isExternalLink = computed(
        () => externalHostRegex.test(props.to)
      );
      const href = computed(() => props.to);
      const classes = computed(() => {
        const classes2 = {
          btn: true,
          [`btn-${props.variant}`]: props.variant
        };
        if (props.size) {
          classes2[`btn-${props.size}`] = true;
        }
        if (props.variant === "nav") {
          classes2["btn-icon"] = true;
          classes2["rounded-2"] = true;
        }
        return classes2;
      });
      expose({ element });
      return (_ctx, _cache) => {
        return unref(isExternalLink) ? (openBlock(), createElementBlock("a", {
          key: 0,
          href: unref(href),
          class: normalizeClass(unref(classes)),
          target: "_blank",
          ref: (el) => element.value = el
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 10, _hoisted_1$3)) : __props.to ? (openBlock(), createBlock(unref(RouterLink), {
          key: 1,
          to: __props.to,
          class: normalizeClass(unref(classes)),
          ref: (el) => element.value = el
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["to", "class"])) : (openBlock(), createElementBlock("button", {
          key: 2,
          type: "button",
          title: props.title,
          class: normalizeClass(unref(classes)),
          ref: (el) => element.value = el
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 10, _hoisted_2$3));
      };
    }
  });
  const BaseButton_vue_vue_type_style_index_0_scoped_0e21acfd_lang = "";
  const BaseButton = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-0e21acfd"], ["__file", "/home/runner/work/browser-extension/browser-extension/src/components/BaseButton/BaseButton.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  /*!
    * pinia v2.0.30
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error2) {
    if (error2 instanceof Error && error2.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error2) {
      if (checkNotFocusedError(error2))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error2);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error2) {
      if (checkNotFocusedError(error2))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error2);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error2) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error2);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error2) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error2);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store2) {
    return isPinia(store2) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store2.$id,
      label: store2.$id
    };
  }
  function formatStoreForInspectorState(store2) {
    if (isPinia(store2)) {
      const storeNames = Array.from(store2._s.keys());
      const storeMap = store2._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store2.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store3 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store3._getters.reduce((getters, key) => {
              getters[key] = store3[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store2.$state).map((key) => ({
        editable: true,
        key,
        value: store2.$state[key]
      }))
    };
    if (store2._getters && store2._getters.length) {
      state.getters = store2._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store2[getterName]
      }));
    }
    if (store2._customProperties.size) {
      state.customProperties = Array.from(store2._customProperties).map((key) => ({
        editable: true,
        key,
        value: store2[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data2, event) => {
        data2.keys.push(event.key);
        data2.operations.push(event.type);
        data2.oldValue[event.key] = event.oldValue;
        data2.newValue[event.key] = event.newValue;
        return data2;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app2, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app: app2
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store2 = pinia._s.get(nodeId);
              if (!store2) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store2._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store2.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store2) => {
            payload.instanceData.state.push({
              type: getStoreType(store2.$id),
              key: "state",
              editable: true,
              value: store2._isOptionsAPI ? {
                _custom: {
                  value: toRaw(store2.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store2.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store2.$state).reduce((state, key) => {
                  state[key] = store2.$state[key];
                  return state;
                }, {})
              )
            });
            if (store2._getters && store2._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store2.$id),
                key: "getters",
                editable: false,
                value: store2._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store2[key];
                  } catch (error2) {
                    getters[key] = error2;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store2) => "$id" in store2 ? store2.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store2 = pinia._s.get(storeId);
          if (!store2) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store2, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app2, store2) {
    if (!componentStateTypes.includes(getStoreType(store2.$id))) {
      componentStateTypes.push(getStoreType(store2.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app: app2,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store2.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store2.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store2.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error2) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store2.$id),
                action: formatDisplay(name),
                args,
                error: error2
              },
              groupId
            }
          });
        });
      }, true);
      store2._customProperties.forEach((name) => {
        watch(() => unref(store2[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store2.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store2.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store2._hotUpdate;
      store2._hotUpdate = markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store2.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store2.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store2;
      store2.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store2.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store2.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store2, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = toRaw(store2)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store2[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store2, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app: app2, store: store2, options }) {
    if (store2.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store2._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store2,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store2._hotUpdate;
      toRaw(store2)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store2, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app2,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store2
    );
  }
  function createPinia() {
    const scope = effectScope(true);
    const state = scope.run(() => ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = markRaw({
      install(app2) {
        setActivePinia(pinia);
        {
          pinia._a = app2;
          app2.provide(piniaSymbol, pinia);
          app2.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app2, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && getCurrentScope()) {
      onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store2;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        toRefs(ref(state ? state() : {}).value)
      ) : toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = markRaw(computed(() => {
          setActivePinia(pinia);
          const store3 = pinia._s.get(id);
          return getters[name].call(store3, store3);
        }));
        return computedGetters;
      }, {}));
    }
    store2 = createSetupStore(id, setup, options, pinia, hot, true);
    store2.$reset = function $reset() {
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    };
    return store2;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store2._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = markRaw([]);
    let actionSubscriptions = markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    };
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store: store2,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store2, args);
        } catch (error2) {
          triggerSubscriptions(onErrorCallbackList, error2);
          throw error2;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error2) => {
            triggerSubscriptions(onErrorCallbackList, error2);
            return Promise.reject(error2);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store2 = reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: markRaw(/* @__PURE__ */ new Set())
          // devtools custom properties
        },
        partialStore
        // must be added later
        // setupStore
      )
    );
    pinia._s.set($id, store2);
    const setupStore = pinia._e.run(() => {
      scope = effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store2, setupStore);
      assign(toRaw(store2), setupStore);
    }
    Object.defineProperty(store2, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store2._hotUpdate = markRaw((newStore) => {
        store2._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store2.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store2.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store2, stateKey, toRef(newStore.$state, stateKey));
        });
        Object.keys(store2.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store2, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store2, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            computed(() => {
              setActivePinia(pinia);
              return getter.call(store2, store2);
            })
          ) : getter;
          set(store2, getterName, getterValue);
        }
        Object.keys(store2._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store2, key);
          }
        });
        Object.keys(store2._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store2, key);
          }
        });
        store2._hmrPayload = newStore._hmrPayload;
        store2._getters = newStore._getters;
        store2._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store2, p2, assign({ value: store2[p2] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store: store2,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store2._customProperties.add(key));
        assign(store2, extensions);
      } else {
        assign(store2, scope.run(() => extender({
          store: store2,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store2.$state && typeof store2.$state === "object" && typeof store2.$state.constructor === "function" && !store2.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store2.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store2.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store2;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
      const currentInstance2 = getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance2 && inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store2 = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance2 && currentInstance2.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance2.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store2;
      }
      return store2;
    }
    useStore.$id = id;
    return useStore;
  }
  let getRandomValues;
  const rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  const byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }
  const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  const native = {
    randomUUID
  };
  function v4(options, buf, offset) {
    if (native.randomUUID && !buf && !options) {
      return native.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  function removeEmptyParams(params = {}) {
    return Object.fromEntries(
      Object.entries(params || {}).filter(([, value]) => value !== void 0)
    );
  }
  const apiUrl = "https://app.privacy.com";
  class PrivacyApi {
    constructor(version2 = "1") {
      __publicField(this, "appVersion", "");
      __publicField(this, "apiVersion");
      __publicField(this, "baseURL");
      var _a;
      try {
        this.appVersion = ((_a = extensionApi.getManifest()) == null ? void 0 : _a.version) || this.appVersion;
      } catch (err) {
      }
      this.apiVersion = version2;
      this.baseURL = `${apiUrl}/api/v${version2}/extension`;
    }
    get(url, params, config2) {
      return this.request(url, "GET", config2, params);
    }
    post(url, data2, config2) {
      return this.request(url, "POST", config2, {}, data2);
    }
    patch(url, data2, config2) {
      return this.request(url, "PATCH", config2, {}, data2);
    }
    put(url, data2, config2) {
      return this.request(url, "PUT", config2, {}, data2);
    }
    delete(url, config2) {
      return this.request(url, "DELETE", config2, {});
    }
    // Wrap fetch to automatically include request headers
    // and to handle error responses
    async request(url, method, config2 = {}, params, body) {
      config2 = JSON.parse(JSON.stringify(config2));
      body = JSON.parse(JSON.stringify(body || {}));
      params = removeEmptyParams(params);
      await PrivacyApi.authTokenInterceptor(config2);
      await PrivacyApi.setSessionIdInterceptor(config2);
      PrivacyApi.setApiHeaders(config2);
      url = this.baseURL + url;
      return extensionApi.message.send({
        event: "sendApiRequest",
        payload: { url, method, params, body, config: config2 }
      }).then(PrivacyApi.responseInterceptor);
    }
    static async responseInterceptor(response) {
      var _a;
      if (response.ok) {
        return response;
      }
      const isLogin = (_a = response.url) == null ? void 0 : _a.endsWith("/auth/login");
      if (!isLogin && response.status === 401) {
        try {
          await extensionApi.storage.clear({ keepDeviceId: true });
        } catch (err) {
        } finally {
          window.location.assign(
            extensionApi.popup ? "/index.html" : "/interstitial.html"
          );
        }
        return response;
      }
      const errorData = response.data || { message: response.text };
      return Promise.reject(errorData);
    }
    static async authTokenInterceptor(config2) {
      try {
        const { token } = await extensionApi.storage.get("token");
        if (token) {
          config2.headers = {
            ...config2.headers,
            Authorization: `Bearer ${token}`
          };
        }
      } catch (err) {
      }
      return config2;
    }
    static async setSessionIdInterceptor(config2) {
      let sessionID;
      try {
        const { sessionID: session } = await extensionApi.storage.get(
          "sessionID"
        );
        sessionID = session;
      } catch (err) {
      }
      if (!sessionID) {
        sessionID = v4();
        try {
          await extensionApi.storage.set({ sessionID });
        } catch (err) {
        }
      }
      config2.headers = {
        ...config2.headers,
        sessionID
      };
      return config2;
    }
    static setApiHeaders(config2) {
      var _a;
      config2.headers = {
        "Content-Type": "application/json",
        "x-extension-id": "djEuMC4x",
        "x-extension-version": ((_a = extensionApi.getManifest()) == null ? void 0 : _a.version) || "",
        ...config2.headers
      };
      return config2;
    }
  }
  const v1Api = new PrivacyApi();
  new PrivacyApi("2");
  function isFirefox() {
    return navigator.userAgent.includes("Firefox") && navigator.userAgent.includes("rv:");
  }
  const setDataConsent = () => {
    return extensionApi.storage.set({
      [CONSENT_KEY]: true
    });
  };
  const hasActivityConsent = async () => {
    if (!isFirefox()) {
      return true;
    }
    const activityConsent = await extensionApi.storage.get(ACTIVITY_CONSENT_KEY) || {};
    return !!activityConsent[ACTIVITY_CONSENT_KEY];
  };
  const setActivityConsent = (value) => {
    return extensionApi.storage.set({
      [ACTIVITY_CONSENT_KEY]: value
    });
  };
  const EVENT_ROUTE = "/event";
  const EVENT_ENDPOINTS = {
    track: `${EVENT_ROUTE}/track`,
    log: `${EVENT_ROUTE}/log`,
    error: `${EVENT_ROUTE}/error`
  };
  const track = async (event) => {
    const activityConsent = await hasActivityConsent();
    if (!activityConsent) {
      return;
    }
    return v1Api.post(EVENT_ENDPOINTS.track, { event });
  };
  const log = (events) => {
    return recordLog(events, false);
  };
  const error = (events) => {
    return recordLog(events, true);
  };
  const recordLog = async (events, isError = false) => {
    const activityConsent = await hasActivityConsent();
    if (!activityConsent) {
      return;
    }
    const body = {
      events
    };
    if (isError) {
      return v1Api.post(EVENT_ENDPOINTS.error, body);
    } else {
      return v1Api.post(EVENT_ENDPOINTS.log, body);
    }
  };
  const useEventStore = defineStore("event", () => {
    async function track$12(event) {
      return track(event).catch(() => {
      });
    }
    async function log$1(data2) {
      return log(data2).catch(() => {
      });
    }
    async function error$1(data2) {
      return error(data2).catch(() => {
      });
    }
    function $reset() {
    }
    return { track: track$12, log: log$1, error: error$1, $reset };
  });
  var EXTENSION_EVENTS = /* @__PURE__ */ ((EXTENSION_EVENTS2) => {
    EXTENSION_EVENTS2["CONSENT_SHOWN"] = "Extension: Consent Shown";
    EXTENSION_EVENTS2["CONSENT_ACCEPTED"] = "Extension: Consent Accepted";
    EXTENSION_EVENTS2["CONSENT_DECLINED"] = "Extension: Consent Declined";
    EXTENSION_EVENTS2["CONSENT_DECLINE_CANCELLED"] = "Extension: Consent Decline Cancelled";
    EXTENSION_EVENTS2["OPENED"] = "Extension: Opened";
    EXTENSION_EVENTS2["DISMISSED"] = "Extension: Dismissed";
    EXTENSION_EVENTS2["SIGN_UP"] = "Extension: Sign Up";
    EXTENSION_EVENTS2["ACCOUNT_REDIRECT"] = "Extension: Account Redirect";
    EXTENSION_EVENTS2["CHECKOUT"] = "Extension: Checkout";
    EXTENSION_EVENTS2["DETECTED_CHECKOUT_FORM"] = "Extension: Detected Checkout Form";
    EXTENSION_EVENTS2["FILL_CHECKOUT"] = "Extension: Fill Checkout";
    EXTENSION_EVENTS2["FILL_CHECKOUT_NO_FORM"] = "Extension: Fill Checkout No Form Detected";
    EXTENSION_EVENTS2["FILL_CHECKOUT_INPUT_FORMAT"] = "Extension: Unable to Determine Input Field Format";
    return EXTENSION_EVENTS2;
  })(EXTENSION_EVENTS || {});
  const _sfc_main$2 = {};
  const _hoisted_1$2 = {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode(
    "path",
    {
      d: "M2 5L8 11L14 5",
      stroke: "currentColor",
      "stroke-width": "2"
    },
    null,
    -1
    /* HOISTED */
  );
  const _hoisted_3$2 = [
    _hoisted_2$2
  ];
  function _sfc_render(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
  }
  const IconChevronDown = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render], ["__file", "/home/runner/work/browser-extension/browser-extension/src/components/icons/IconChevronDown.vue"]]);
  const _withScopeId$1 = (n) => (pushScopeId("data-v-869f8be5"), n = n(), popScopeId(), n);
  const _hoisted_1$1 = { class: "content mx-auto" };
  const _hoisted_2$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
    "h2",
    null,
    "We're Committed to Your Privacy",
    -1
    /* HOISTED */
  ));
  const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
    "p",
    null,
    " We need your consent to access the following information which is only used for the purpose of providing you the best possible experience. ",
    -1
    /* HOISTED */
  ));
  const _hoisted_4$1 = { class: "optin-option mb-3" };
  const _hoisted_5 = {
    role: "button",
    class: "optin-header",
    "data-bs-toggle": "collapse",
    "aria-expanded": "false",
    href: "#device-info"
  };
  const _hoisted_6 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
    "span",
    { class: "optin-title" },
    "Device Information",
    -1
    /* HOISTED */
  ));
  const _hoisted_7 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
    "div",
    {
      class: "collapse",
      id: "device-info"
    },
    [
      /* @__PURE__ */ createBaseVNode("div", { class: "optin-info d-block" }, " We collect information about your device necessary to protect against fraud and comply with anti-money laundering obligations. This information helps us protect your account from fraudsters and comply with applicable laws. ")
    ],
    -1
    /* HOISTED */
  ));
  const _hoisted_8 = { class: "optin-option mb-3" };
  const _hoisted_9 = { class: "optin-header" };
  const _hoisted_10 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
    "span",
    {
      class: "optin-title",
      role: "button",
      "data-bs-toggle": "collapse",
      href: "#user-activity",
      "aria-expanded": "false"
    },
    " Activity & User Behavior ",
    -1
    /* HOISTED */
  ));
  const _hoisted_11 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
    "div",
    {
      class: "collapse",
      id: "user-activity"
    },
    [
      /* @__PURE__ */ createBaseVNode("div", { class: "optin-info" }, [
        /* @__PURE__ */ createBaseVNode("span", { class: "optin-title d-block mb-2" }, "Activity"),
        /* @__PURE__ */ createTextVNode(" When you create a card through the extension, we save the relevant URL you visit so that we can suggest the correct card(s) to autofill in the future, suggest merchant-specific card designs, and identify any card autofill errors that we want to fix. Importantly, we do not track any actions or collect URL information for sites where you do not use a Privacy Card. "),
        /* @__PURE__ */ createBaseVNode("span", { class: "optin-title d-block my-2" }, "User Behavior"),
        /* @__PURE__ */ createTextVNode(" We track which features you use so that we can understand how Privacy users engage with the product, which informs improvements and updates. ")
      ])
    ],
    -1
    /* HOISTED */
  ));
  const _hoisted_12 = { key: 0 };
  const _hoisted_13 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
    "div",
    {
      class: "alert alert-primary",
      role: "alert"
    },
    " If you choose not to share this information, your Privacy Add-on will have limited functionality. ",
    -1
    /* HOISTED */
  ));
  const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
    "p",
    null,
    "Features not supported without full consent",
    -1
    /* HOISTED */
  ));
  const _hoisted_15 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
    "ul",
    null,
    [
      /* @__PURE__ */ createBaseVNode("li", null, "Virtual card suggestions based on your active browser tab"),
      /* @__PURE__ */ createBaseVNode("li", null, "Autofill during checkout")
    ],
    -1
    /* HOISTED */
  ));
  const _hoisted_16 = [
    _hoisted_13,
    _hoisted_14,
    _hoisted_15
  ];
  const _hoisted_17 = { class: "actions d-flex justify-content-around border-bottom pt-2 pb-4 mb-4" };
  const _hoisted_18 = { key: 0 };
  const _hoisted_19 = { key: 1 };
  const _hoisted_20 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode(
    "div",
    { class: "policy-link" },
    [
      /* @__PURE__ */ createTextVNode(" Full details about the information we collect and what we do with it can be found in our "),
      /* @__PURE__ */ createBaseVNode("a", {
        href: "https://privacy.com/privacy-policy",
        class: "text-decoration-underline",
        target: "_blank",
        "data-test": "privacy-policy"
      }, " Privacy Policy ")
    ],
    -1
    /* HOISTED */
  ));
  const _sfc_main$1 = /* @__PURE__ */ defineComponent({
    __name: "DataConsent",
    emits: ["consent", "uninstall", "cancel"],
    setup(__props, { emit: emit2 }) {
      const eventStore = useEventStore();
      eventStore.track({ name: EXTENSION_EVENTS.CONSENT_SHOWN });
      const activityConsent = ref(true);
      const uninstall = async () => {
        emit2("uninstall");
        eventStore.track({ name: EXTENSION_EVENTS.CONSENT_DECLINED });
        const uninstall2 = await extensionApi.message.send({
          event: "uninstallExtension"
        });
        if (!uninstall2) {
          eventStore.track({ name: EXTENSION_EVENTS.CONSENT_DECLINE_CANCELLED });
        }
      };
      const consent = async () => {
        var _a, _b;
        if ((_a = extensionApi.context) == null ? void 0 : _a.permissions) {
          const approve = await ((_b = extensionApi.context) == null ? void 0 : _b.permissions.request({
            origins: ["<all_urls>"]
          }));
          if (!approve) {
            return;
          }
        }
        await setDataConsent();
        if (activityConsent.value) {
          await setActivityConsent(true);
        } else {
          await setActivityConsent(false);
        }
        eventStore.track({ name: EXTENSION_EVENTS.CONSENT_ACCEPTED });
        emit2("consent");
      };
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", null, [
          createBaseVNode("div", _hoisted_1$1, [
            _hoisted_2$1,
            _hoisted_3$1,
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5, [
                _hoisted_6,
                createVNode(IconChevronDown)
              ]),
              _hoisted_7
            ]),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                _hoisted_10,
                withDirectives(createBaseVNode(
                  "input",
                  {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => activityConsent.value = $event)
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vModelCheckbox, activityConsent.value]
                ]),
                createVNode(IconChevronDown, {
                  role: "button",
                  "data-bs-toggle": "collapse",
                  href: "#user-activity",
                  "aria-expanded": "false"
                })
              ]),
              _hoisted_11
            ]),
            !activityConsent.value ? (openBlock(), createElementBlock("div", _hoisted_12, _hoisted_16)) : createCommentVNode("v-if", true),
            createBaseVNode("div", _hoisted_17, [
              createVNode(BaseButton, {
                onClick: uninstall,
                variant: "secondary",
                "data-test": "uninstall",
                class: "w-50 me-2"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Uninstall ")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(BaseButton, {
                onClick: consent,
                "data-test": "consent",
                class: "w-50 ms-2"
              }, {
                default: withCtx(() => [
                  !activityConsent.value ? (openBlock(), createElementBlock("span", _hoisted_18, "Add without Autofill")) : (openBlock(), createElementBlock("span", _hoisted_19, "Allow"))
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _hoisted_20
          ])
        ]);
      };
    }
  });
  const DataConsent_vue_vue_type_style_index_0_scoped_869f8be5_lang = "";
  const DataConsent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-869f8be5"], ["__file", "/home/runner/work/browser-extension/browser-extension/src/components/DataConsent/DataConsent.vue"]]);
  var toastifyExports = {};
  var toastify = {
    get exports() {
      return toastifyExports;
    },
    set exports(v) {
      toastifyExports = v;
    }
  };
  /*!
   * Toastify js 1.12.0
   * https://github.com/apvarun/toastify-js
   * @license MIT licensed
   *
   * Copyright (C) 2018 Varun A P
   */
  (function(module) {
    (function(root, factory) {
      if (module.exports) {
        module.exports = factory();
      } else {
        root.Toastify = factory();
      }
    })(commonjsGlobal, function(global2) {
      var Toastify2 = function(options) {
        return new Toastify2.lib.init(options);
      }, version2 = "1.12.0";
      Toastify2.defaults = {
        oldestFirst: true,
        text: "Toastify is awesome!",
        node: void 0,
        duration: 3e3,
        selector: void 0,
        callback: function() {
        },
        destination: void 0,
        newWindow: false,
        close: false,
        gravity: "toastify-top",
        positionLeft: false,
        position: "",
        backgroundColor: "",
        avatar: "",
        className: "",
        stopOnFocus: true,
        onClick: function() {
        },
        offset: { x: 0, y: 0 },
        escapeMarkup: true,
        ariaLive: "polite",
        style: { background: "" }
      };
      Toastify2.lib = Toastify2.prototype = {
        toastify: version2,
        constructor: Toastify2,
        // Initializing the object with required parameters
        init: function(options) {
          if (!options) {
            options = {};
          }
          this.options = {};
          this.toastElement = null;
          this.options.text = options.text || Toastify2.defaults.text;
          this.options.node = options.node || Toastify2.defaults.node;
          this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify2.defaults.duration;
          this.options.selector = options.selector || Toastify2.defaults.selector;
          this.options.callback = options.callback || Toastify2.defaults.callback;
          this.options.destination = options.destination || Toastify2.defaults.destination;
          this.options.newWindow = options.newWindow || Toastify2.defaults.newWindow;
          this.options.close = options.close || Toastify2.defaults.close;
          this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify2.defaults.gravity;
          this.options.positionLeft = options.positionLeft || Toastify2.defaults.positionLeft;
          this.options.position = options.position || Toastify2.defaults.position;
          this.options.backgroundColor = options.backgroundColor || Toastify2.defaults.backgroundColor;
          this.options.avatar = options.avatar || Toastify2.defaults.avatar;
          this.options.className = options.className || Toastify2.defaults.className;
          this.options.stopOnFocus = options.stopOnFocus === void 0 ? Toastify2.defaults.stopOnFocus : options.stopOnFocus;
          this.options.onClick = options.onClick || Toastify2.defaults.onClick;
          this.options.offset = options.offset || Toastify2.defaults.offset;
          this.options.escapeMarkup = options.escapeMarkup !== void 0 ? options.escapeMarkup : Toastify2.defaults.escapeMarkup;
          this.options.ariaLive = options.ariaLive || Toastify2.defaults.ariaLive;
          this.options.style = options.style || Toastify2.defaults.style;
          if (options.backgroundColor) {
            this.options.style.background = options.backgroundColor;
          }
          return this;
        },
        // Building the DOM element
        buildToast: function() {
          if (!this.options) {
            throw "Toastify is not initialized";
          }
          var divElement = document.createElement("div");
          divElement.className = "toastify on " + this.options.className;
          if (!!this.options.position) {
            divElement.className += " toastify-" + this.options.position;
          } else {
            if (this.options.positionLeft === true) {
              divElement.className += " toastify-left";
              console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.");
            } else {
              divElement.className += " toastify-right";
            }
          }
          divElement.className += " " + this.options.gravity;
          if (this.options.backgroundColor) {
            console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
          }
          for (var property in this.options.style) {
            divElement.style[property] = this.options.style[property];
          }
          if (this.options.ariaLive) {
            divElement.setAttribute("aria-live", this.options.ariaLive);
          }
          if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
            divElement.appendChild(this.options.node);
          } else {
            if (this.options.escapeMarkup) {
              divElement.innerText = this.options.text;
            } else {
              divElement.innerHTML = this.options.text;
            }
            if (this.options.avatar !== "") {
              var avatarElement = document.createElement("img");
              avatarElement.src = this.options.avatar;
              avatarElement.className = "toastify-avatar";
              if (this.options.position == "left" || this.options.positionLeft === true) {
                divElement.appendChild(avatarElement);
              } else {
                divElement.insertAdjacentElement("afterbegin", avatarElement);
              }
            }
          }
          if (this.options.close === true) {
            var closeElement = document.createElement("button");
            closeElement.type = "button";
            closeElement.setAttribute("aria-label", "Close");
            closeElement.className = "toast-close";
            closeElement.innerHTML = "&#10006;";
            closeElement.addEventListener(
              "click",
              function(event) {
                event.stopPropagation();
                this.removeElement(this.toastElement);
                window.clearTimeout(this.toastElement.timeOutValue);
              }.bind(this)
            );
            var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
              divElement.insertAdjacentElement("afterbegin", closeElement);
            } else {
              divElement.appendChild(closeElement);
            }
          }
          if (this.options.stopOnFocus && this.options.duration > 0) {
            var self2 = this;
            divElement.addEventListener(
              "mouseover",
              function(event) {
                window.clearTimeout(divElement.timeOutValue);
              }
            );
            divElement.addEventListener(
              "mouseleave",
              function() {
                divElement.timeOutValue = window.setTimeout(
                  function() {
                    self2.removeElement(divElement);
                  },
                  self2.options.duration
                );
              }
            );
          }
          if (typeof this.options.destination !== "undefined") {
            divElement.addEventListener(
              "click",
              function(event) {
                event.stopPropagation();
                if (this.options.newWindow === true) {
                  window.open(this.options.destination, "_blank");
                } else {
                  window.location = this.options.destination;
                }
              }.bind(this)
            );
          }
          if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
            divElement.addEventListener(
              "click",
              function(event) {
                event.stopPropagation();
                this.options.onClick();
              }.bind(this)
            );
          }
          if (typeof this.options.offset === "object") {
            var x = getAxisOffsetAValue("x", this.options);
            var y = getAxisOffsetAValue("y", this.options);
            var xOffset = this.options.position == "left" ? x : "-" + x;
            var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;
            divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";
          }
          return divElement;
        },
        // Displaying the toast
        showToast: function() {
          this.toastElement = this.buildToast();
          var rootElement;
          if (typeof this.options.selector === "string") {
            rootElement = document.getElementById(this.options.selector);
          } else if (this.options.selector instanceof HTMLElement || typeof ShadowRoot !== "undefined" && this.options.selector instanceof ShadowRoot) {
            rootElement = this.options.selector;
          } else {
            rootElement = document.body;
          }
          if (!rootElement) {
            throw "Root element is not defined";
          }
          var elementToInsert = Toastify2.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
          rootElement.insertBefore(this.toastElement, elementToInsert);
          Toastify2.reposition();
          if (this.options.duration > 0) {
            this.toastElement.timeOutValue = window.setTimeout(
              function() {
                this.removeElement(this.toastElement);
              }.bind(this),
              this.options.duration
            );
          }
          return this;
        },
        hideToast: function() {
          if (this.toastElement.timeOutValue) {
            clearTimeout(this.toastElement.timeOutValue);
          }
          this.removeElement(this.toastElement);
        },
        // Removing the element from the DOM
        removeElement: function(toastElement) {
          toastElement.className = toastElement.className.replace(" on", "");
          window.setTimeout(
            function() {
              if (this.options.node && this.options.node.parentNode) {
                this.options.node.parentNode.removeChild(this.options.node);
              }
              if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement);
              }
              this.options.callback.call(toastElement);
              Toastify2.reposition();
            }.bind(this),
            400
          );
        }
      };
      Toastify2.reposition = function() {
        var topLeftOffsetSize = {
          top: 15,
          bottom: 15
        };
        var topRightOffsetSize = {
          top: 15,
          bottom: 15
        };
        var offsetSize = {
          top: 15,
          bottom: 15
        };
        var allToasts = document.getElementsByClassName("toastify");
        var classUsed;
        for (var i = 0; i < allToasts.length; i++) {
          if (containsClass(allToasts[i], "toastify-top") === true) {
            classUsed = "toastify-top";
          } else {
            classUsed = "toastify-bottom";
          }
          var height = allToasts[i].offsetHeight;
          classUsed = classUsed.substr(9, classUsed.length - 1);
          var offset = 15;
          var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
          if (width <= 360) {
            allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";
            offsetSize[classUsed] += height + offset;
          } else {
            if (containsClass(allToasts[i], "toastify-left") === true) {
              allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";
              topLeftOffsetSize[classUsed] += height + offset;
            } else {
              allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";
              topRightOffsetSize[classUsed] += height + offset;
            }
          }
        }
        return this;
      };
      function getAxisOffsetAValue(axis, options) {
        if (options.offset[axis]) {
          if (isNaN(options.offset[axis])) {
            return options.offset[axis];
          } else {
            return options.offset[axis] + "px";
          }
        }
        return "0px";
      }
      function containsClass(elem, yourClass) {
        if (!elem || typeof yourClass !== "string") {
          return false;
        } else if (elem.className && elem.className.trim().split(/\s+/gi).indexOf(yourClass) > -1) {
          return true;
        } else {
          return false;
        }
      }
      Toastify2.lib.init.prototype = Toastify2.lib;
      return Toastify2;
    });
  })(toastify);
  const Toastify = toastifyExports;
  function popupAlert(message, variant = "danger", options = {
    gravity: "bottom",
    style: {}
  }) {
    const toast = Toastify({
      text: message,
      className: `alert alert-${variant}`,
      duration: 1500,
      onClick: () => toast.hideToast(),
      gravity: options.gravity,
      style: options.style,
      position: "center"
    }).showToast();
  }
  const _withScopeId = (n) => (pushScopeId("data-v-98bc6a62"), n = n(), popScopeId(), n);
  const _hoisted_1 = { class: "p-2 text-center" };
  const _hoisted_2 = {
    href: "https://privacy.com",
    target: "_blank"
  };
  const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode(
    "div",
    { class: "header-content" },
    [
      /* @__PURE__ */ createBaseVNode("h2", null, [
        /* @__PURE__ */ createTextVNode(" Save time with the "),
        /* @__PURE__ */ createBaseVNode("span", null, "Privacy Add-on")
      ]),
      /* @__PURE__ */ createBaseVNode("span", { class: "sub-heading d-block" }, " Create and autofill Privacy Cards with our browser extension "),
      /* @__PURE__ */ createBaseVNode("div", { class: "header-bg" })
    ],
    -1
    /* HOISTED */
  ));
  const _hoisted_4 = { class: "my-3 p-3 w-25 mx-auto" };
  const _sfc_main = /* @__PURE__ */ defineComponent({
    __name: "PostInstall",
    setup(__props) {
      const consent = async () => {
        var _a, _b;
        popupAlert("Thank you for using Privacy!", "success", {
          gravity: "top",
          style: {
            width: "50%"
          }
        });
        const tab = await extensionApi.getCurrentTab();
        if (tab) {
          await new Promise((resolve) => setTimeout(resolve, 2e3));
          await ((_b = (_a = extensionApi.context) == null ? void 0 : _a.tabs) == null ? void 0 : _b.remove(tab.id));
        }
      };
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(
          Fragment,
          null,
          [
            createVNode(HeaderContent, { class: "install-header" }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1, [
                  createBaseVNode("a", _hoisted_2, [
                    createVNode(PrivacyLogo, { "aria-label": "Privacy" })
                  ])
                ]),
                _hoisted_3
              ]),
              _: 1
              /* STABLE */
            }),
            createBaseVNode("main", null, [
              createBaseVNode("section", _hoisted_4, [
                createVNode(DataConsent, { onConsent: consent })
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PostInstall_vue_vue_type_style_index_0_scoped_98bc6a62_lang = "";
  const Install = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-98bc6a62"], ["__file", "/home/runner/work/browser-extension/browser-extension/src/PostInstall.vue"]]);
  const store = createPinia();
  const allStores = /* @__PURE__ */ new Set();
  store.use(({ store: store2 }) => allStores.add(store2));
  const app = createApp(Install);
  app.use(store);
  app.mount("#content");
})();
//# sourceMappingURL=install.js.map
