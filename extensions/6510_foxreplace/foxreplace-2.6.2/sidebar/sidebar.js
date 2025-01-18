/** ***** BEGIN LICENSE BLOCK *****
 *
 *  Copyright (C) 2022 Marc Ruiz Altisent. All rights reserved.
 *
 *  This file is part of FoxReplace.
 *
 *  FoxReplace is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software
 *  Foundation, either version 3 of the License, or (at your option) any later version.
 *
 *  FoxReplace is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 *  A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along with FoxReplace. If not, see <http://www.gnu.org/licenses/>.
 *
 *  ***** END LICENSE BLOCK ***** */

function onLoad() {
  document.removeEventListener("DOMContentLoaded", onLoad);
  document.getElementById("form").addEventListener("submit", onSubmit);
}

function onUnload() {
  document.removeEventListener("unload", onUnload);
  document.getElementById("form").removeEventListener("submit", onSubmit);
}

function onSubmit(event) {
  event.preventDefault(); // we just want to get the values, we don't want to submit anything

  const formData = new FormData(document.getElementById('form'));
  const formValues = {};

  for (const [key, value] of formData) {
    formValues[key] = value;
  }
  // Checkbox values are returned as 'on' when checked and missing (thus undefined) when unchecked. This works well when converted to Boolean.

  const substitutionList = [
    new SubstitutionGroup(
      "",
      [],
      [new Substitution(formValues.input, formValues.output, formValues.caseSensitive, formValues.inputType, formValues.outputType)],
      formValues.html,
      true
    )
  ];
  browser.runtime.sendMessage({
    key: "replace",
    list: substitutionListToJSON(substitutionList)
  });
}

document.addEventListener("DOMContentLoaded", onLoad);
document.addEventListener("unload", onUnload);

(function toggleArbitraryCodeExecWarning() {

  const arbitraryCodeWarningClassList = document.getElementsByClassName("arbitrary-code-warning")[0].classList;

  document
    .getElementsByName("outputType")[0]
    .addEventListener("change", (e) => {

      const isOutputTypeFunction = (e.target.value == 1)
      if (isOutputTypeFunction) {
        arbitraryCodeWarningClassList.remove("d-none");
        arbitraryCodeWarningClassList.add("d-inline");
        return;
      }

      arbitraryCodeWarningClassList.remove("d-inline");
      arbitraryCodeWarningClassList.add("d-none");
    });

})();
