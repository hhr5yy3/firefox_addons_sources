function parseTable(tbody) {
  if (!tbody)
    throw new Error("Cannot parse table");
  const favorites = [];
  const courses = [];
  const tableRows = tbody.getElementsByTagName("tr");
  for (const row of tableRows) {
    const linkElement = row.getElementsByTagName("a")[0];
    if (!linkElement || !linkElement.href || !linkElement.textContent)
      continue;
    if (linkElement.textContent.trim().endsWith("[beendet]") || linkElement.textContent.trim().endsWith("[finished]"))
      continue;
    const c = {
      link: linkElement.href,
      name: linkElement.textContent
    };
    courses.push(c);
    if (row.getElementsByClassName("icon-star-filled").length > 0)
      favorites.push(c);
  }
  return {courses, favorites};
}
function parseList(previewContainer) {
  const courses = [];
  const favorites = [];
  const listItems = previewContainer.getElementsByClassName("content-preview");
  for (const item of listItems) {
    const linkElement = item.querySelector(".content-preview > a");
    const titleElement = item.querySelector(".content-preview-main .content-preview-title");
    if (!linkElement || !linkElement.href || !titleElement || !titleElement.textContent)
      continue;
    if (titleElement.textContent.trim().endsWith("[beendet]") || titleElement.textContent.trim().endsWith("[finished]"))
      continue;
    const c = {
      link: linkElement.href,
      name: titleElement.textContent
    };
    courses.push(c);
    if (item.getElementsByClassName("icon-star-filled").length > 0)
      favorites.push(c);
  }
  return {courses, favorites};
}
(async () => {
  const notification = await import(chrome.runtime.getURL("contentScripts/other/notification.js"));
  const mainFunction = async () => {
    if (window.location.pathname !== "/opal/auth/resource/courses" && window.location.pathname !== "/opal/auth/resource/favorites")
      return;
    const currentPage = window.location.pathname === "/opal/auth/resource/courses" ? "meine_kurse" : "favoriten";
    const pages = document.querySelectorAll("li.page").length;
    if (pages > 1) {
      document.getElementsByClassName("pager-showall")[0]?.click();
      return;
    }
    const tablePanel = document.getElementsByClassName("table-panel")[0];
    if (!tablePanel)
      return;
    const previewContainer = tablePanel.getElementsByClassName("content-preview-container")[0];
    const {courses, favorites} = previewContainer ? parseList(previewContainer) : parseTable(tablePanel.getElementsByTagName("tbody")[0]);
    if (courses.length === 0)
      return;
    courses.sort((a, b) => a.name.localeCompare(b.name));
    const {meine_kurse: currentCoursesStr, favoriten: currentFavouritesStr} = await chrome.storage.local.get(["meine_kurse", "favoriten"]);
    const parseJson = (input) => {
      try {
        return JSON.parse(input);
      } catch {
        return void 0;
      }
    };
    const currentCourses = parseJson(currentCoursesStr);
    const currentFavourites = parseJson(currentFavouritesStr);
    const firstTime = currentCourses === void 0;
    const arraysAreSame = (array1, array2) => {
      if (array1.length !== array2.length)
        return false;
      return array1.every((course) => {
        return !!array2.find((c) => c.name === course.name && c.link === course.link);
      });
    };
    const coursesChanged = currentPage === "meine_kurse" && !arraysAreSame(currentCourses || [], courses);
    const favouritesChanged = !arraysAreSame(currentFavourites || [], favorites);
    const updateObj = {};
    if (coursesChanged)
      updateObj.meine_kurse = JSON.stringify(courses);
    if (favouritesChanged)
      updateObj.favoriten = JSON.stringify(favorites);
    if (Object.keys(updateObj).length > 0) {
      await chrome.storage.local.set(updateObj);
    }
    if (firstTime && updateObj.meine_kurse) {
      notification.notify("Kurse wurden erfolgreich in TUfast gespeichert! Drücke jetzt <kbd>Alt</kbd> + <kbd>Q</kbd> um deine Kurse zu sehen!");
    } else if (coursesChanged || favouritesChanged) {
      notification.notify("Deine Kurse wurden erfolgreich in TUfast geupdatet!");
    }
  };
  const content = document.getElementsByClassName("content-container")[0];
  if (!content)
    return;
  new MutationObserver(mainFunction).observe(content, {subtree: true, childList: true});
  mainFunction();
})();
