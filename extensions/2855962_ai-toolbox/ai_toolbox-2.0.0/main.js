document.addEventListener("DOMContentLoaded", () => {
  // Get the toggle switch element
  const toggleSwitch = document.getElementById("open-in-new-tab");

  // Function to load the toggle state from local storage
  const loadToggleState = () => {
    const state = JSON.parse(localStorage.getItem("open-in-new-tab"));
    toggleSwitch.classList.toggle("active", state);
  };

  // Function to save the toggle state to local storage
  const saveToggleState = () => {
    localStorage.setItem("open-in-new-tab", toggleSwitch.classList.contains("active"));
  };

  // Add click event listener to the toggle switch
  toggleSwitch.addEventListener("click", () => {
    toggleSwitch.classList.toggle("active");
    saveToggleState();
  });

  // Function to handle clicks on list items and logo items
  const handleItemClick = (event) => {
    const item = event.currentTarget;
    const website = item.getAttribute("data-website");

    if (toggleSwitch.classList.contains("active")) {
      browser.tabs.create({ url: website }).catch(console.error);
    } else {
      browser.sidebarAction.open()
        .then(() => browser.sidebarAction.setPanel({ panel: website }))
        .catch(console.error);
    }
  };

  // Function to initialize clickable items
  const initializeClickableItems = () => {
    const listItems = document.querySelectorAll("li[data-website]");
    const logoItems = document.querySelectorAll(".logo-item");

    [...listItems, ...logoItems].forEach((item) => {
      item.addEventListener("click", handleItemClick);
    });
  };

  // Initialize
  loadToggleState();
  initializeClickableItems();
});