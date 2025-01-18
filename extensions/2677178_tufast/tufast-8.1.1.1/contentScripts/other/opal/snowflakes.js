(async () => {
  if (new Date().getMonth() !== 11)
    return;
  const {flakeState} = await chrome.storage.local.get(["flakeState"]);
  const snowflakeSettings = {
    container: void 0,
    switch: void 0,
    currentState: flakeState
  };
  if (typeof snowflakeSettings.currentState !== "boolean")
    snowflakeSettings.currentState = true;
  function removeFlakes() {
    if (!snowflakeSettings.container)
      return;
    try {
      const sf = document.getElementById("snowflakes");
      if (sf)
        document.body.removeChild(sf);
      snowflakeSettings.container = void 0;
    } catch (e) {
    }
  }
  function insertFlakes() {
    if (snowflakeSettings.container)
      return;
    snowflakeSettings.container = document.createElement("div");
    snowflakeSettings.container.classList.add("snowflakes");
    snowflakeSettings.container.id = "snowflakes";
    snowflakeSettings.container.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 12; i++) {
      const flake = document.createElement("div");
      flake.className = "snowflake";
      flake.innerText = "❅";
      snowflakeSettings.container.appendChild(flake);
    }
    document.body.prepend(snowflakeSettings.container);
  }
  async function flakesSwitchOnClick(e) {
    snowflakeSettings.currentState = !snowflakeSettings.currentState;
    await chrome.storage.local.set({flakeState: snowflakeSettings.currentState});
    if (snowflakeSettings.currentState) {
      e.target.style.color = "black";
      insertFlakes();
    } else {
      e.target.style.color = "grey";
      removeFlakes();
    }
  }
  const flakeSwitch = document.createElement("h1");
  flakeSwitch.id = "flakeSwitch";
  flakeSwitch.title = "Click me. Winter powered by TUfast.";
  flakeSwitch.style.color = snowflakeSettings.currentState ? "black" : "grey";
  flakeSwitch.textContent = "❅";
  flakeSwitch.addEventListener("click", flakesSwitchOnClick);
  document.getElementsByClassName("page-header")[0]?.appendChild(flakeSwitch);
  snowflakeSettings.currentState ? insertFlakes() : removeFlakes();
})();
