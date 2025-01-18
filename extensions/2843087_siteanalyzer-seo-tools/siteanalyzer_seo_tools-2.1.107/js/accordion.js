function handleAccordions() {
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion__header");
    header.onclick = () => {
      accordion.classList.toggle("accordion--active");
    };
  });
}

document.addEventListener("DOMContentLoaded", handleAccordions);
document.addEventListener("AccordionsUpdate", handleAccordions);