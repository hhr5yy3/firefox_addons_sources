const modal = document.getElementById("rippleModal");

modal.addEventListener("click", e => {
    const target = e.target.closest("#close_icon");
    if (target) {
        trackLink(modal);
    }
});

modal.addEventListener("click", e => {
    const target = e.target.closest(".mixpanel-click");
    if (target) {
        trackLink(target);
    }
});

const scrolls = document.querySelectorAll(".mixpanel-scroll");
modal.addEventListener("scroll", e => {
    const target = e.target.closest(".mixpanel-scroll");
    if (target) {
        trackScroll(target);
    }
}, true);
