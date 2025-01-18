function renderCriteriaBadges() {
  /** @type {HTMLElement[]} */
  const badges = document.querySelectorAll("[data-criteria]");
  badges.forEach((badge) => {
    badge.classList = "criteria";
    const min = Number(badge.getAttribute("data-criteria-min"));
    const max = Number(badge.getAttribute("data-criteria-max"));
    const range = Number(badge.getAttribute("data-criteria-range")) || 0;
    const rangeMin = Number(badge.getAttribute("data-criteria-range-min")) || 0;
    const rangeMax = Number(badge.getAttribute("data-criteria-range-max")) || 0;
    const value = Number(badge.innerText);

    if (between(value, min, max)) {
      badge.classList.add("criteria--good");
    } else if (between(value, min - range - rangeMin, max + range + rangeMax)) {
      badge.classList.add("criteria--bad");
    } else {
      badge.classList.add("criteria--critical");
    }
  });
}

document.addEventListener("RenderCriteriaBadges", () => renderCriteriaBadges());
