/*
*	PureVPN
*	by GZ systems Ltd.
*	Everyone is permitted to copy and distribute verbatim copies
*	of this document, but changing it is not allowed.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
*	copyright 2016 All Rights are Reserved.
*/

(function() {
  'use strict';
  var pVn = self.pVn = self.pVn || {};
  [].forEach.call(pVn.getDom("data-lang"), function(entry) {
    entry.innerHTML = pVn.i18n(entry.getAttribute("data-lang"));
  });
  [].forEach.call(pVn.getDom("data-lang-strict"), function(entry) {
    entry.innerHTML =
    pVn.i18n(
      entry.getAttribute("data-lang-strict")
    ) + entry.innerHTML;
  });
  [].forEach.call(pVn.getDom("data-lang-strict2"), function(entry) {
    entry.innerHTML += pVn.i18n(entry.getAttribute("data-lang-strict2"));
  });
  [].forEach.call(pVn.getDom("data-original-title"), function(entry) {
    entry.setAttribute(
      'data-original-title',
      pVn.i18n(entry.getAttribute("data-original-title"))
    );
  });

  [].forEach.call(pVn.getDom("data-lang-placeholder"), function(entry) {
    entry.setAttribute(
      'placeholder',
      pVn.i18n(entry.getAttribute("data-lang-placeholder"))
    );
  });
})();
