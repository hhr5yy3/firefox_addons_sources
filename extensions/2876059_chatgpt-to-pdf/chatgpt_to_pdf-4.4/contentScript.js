// Version 4.3 Firefox

let currentPageSize;
let addTableOfContent;
let landscapeMode;
let toRemoveLogo;
let onlyChatGPTResponses;
let activeMessageSelector = null;

function createSaveButton() {
  const buttonContainer = document.createElement("div");
  buttonContainer.style.position = "fixed";
  buttonContainer.style.top = "10px";
  buttonContainer.style.right = "180px";
  buttonContainer.style.zIndex = "1000000";
  buttonContainer.style.display = "flex";
  buttonContainer.style.alignItems = "center";

  const button = document.createElement("button");
  button.id = "save-html-button";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.padding = "6px 10px";
  button.style.backgroundColor = "#212121";
  button.style.color = "white";
  button.style.border = "1px solid #6CB4EE";
  button.style.borderRadius = "20px 0 0 20px";
  button.style.cursor = "pointer";
  button.style.fontSize = "14px";
  button.style.gap = "6px";
  button.style.borderRight = "none";

  const logoSvg = `
    <svg width="256px" height="256px" viewBox="-4 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FAF9F6" stroke-width="0.0004" transform="matrix(1, 0, 0, 1, 0, 0)">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="0.4"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M25.6686 26.0962C25.1812 26.2401 24.4656 26.2563 23.6984 26.145C22.875 26.0256 22.0351 25.7739 21.2096 25.403C22.6817 25.1888 23.8237 25.2548 24.8005 25.6009C25.0319 25.6829 25.412 25.9021 25.6686 26.0962ZM17.4552 24.7459C17.3953 24.7622 17.3363 24.7776 17.2776 24.7939C16.8815 24.9017 16.4961 25.0069 16.1247 25.1005L15.6239 25.2275C14.6165 25.4824 13.5865 25.7428 12.5692 26.0529C12.9558 25.1206 13.315 24.178 13.6667 23.2564C13.9271 22.5742 14.193 21.8773 14.468 21.1894C14.6075 21.4198 14.7531 21.6503 14.9046 21.8814C15.5948 22.9326 16.4624 23.9045 17.4552 24.7459ZM14.8927 14.2326C14.958 15.383 14.7098 16.4897 14.3457 17.5514C13.8972 16.2386 13.6882 14.7889 14.2489 13.6185C14.3927 13.3185 14.5105 13.1581 14.5869 13.0744C14.7049 13.2566 14.8601 13.6642 14.8927 14.2326ZM9.63347 28.8054C9.38148 29.2562 9.12426 29.6782 8.86063 30.0767C8.22442 31.0355 7.18393 32.0621 6.64941 32.0621C6.59681 32.0621 6.53316 32.0536 6.44015 31.9554C6.38028 31.8926 6.37069 31.8476 6.37359 31.7862C6.39161 31.4337 6.85867 30.8059 7.53527 30.2238C8.14939 29.6957 8.84352 29.2262 9.63347 28.8054ZM27.3706 26.1461C27.2889 24.9719 25.3123 24.2186 25.2928 24.2116C24.5287 23.9407 23.6986 23.8091 22.7552 23.8091C21.7453 23.8091 20.6565 23.9552 19.2582 24.2819C18.014 23.3999 16.9392 22.2957 16.1362 21.0733C15.7816 20.5332 15.4628 19.9941 15.1849 19.4675C15.8633 17.8454 16.4742 16.1013 16.3632 14.1479C16.2737 12.5816 15.5674 11.5295 14.6069 11.5295C13.948 11.5295 13.3807 12.0175 12.9194 12.9813C12.0965 14.6987 12.3128 16.8962 13.562 19.5184C13.1121 20.5751 12.6941 21.6706 12.2895 22.7311C11.7861 24.0498 11.2674 25.4103 10.6828 26.7045C9.04334 27.3532 7.69648 28.1399 6.57402 29.1057C5.8387 29.7373 4.95223 30.7028 4.90163 31.7107C4.87693 32.1854 5.03969 32.6207 5.37044 32.9695C5.72183 33.3398 6.16329 33.5348 6.6487 33.5354C8.25189 33.5354 9.79489 31.3327 10.0876 30.8909C10.6767 30.0029 11.2281 29.0124 11.7684 27.8699C13.1292 27.3781 14.5794 27.011 15.985 26.6562L16.4884 26.5283C16.8668 26.4321 17.2601 26.3257 17.6635 26.2153C18.0904 26.0999 18.5296 25.9802 18.976 25.8665C20.4193 26.7844 21.9714 27.3831 23.4851 27.6028C24.7601 27.7883 25.8924 27.6807 26.6589 27.2811C27.3486 26.9219 27.3866 26.3676 27.3706 26.1461ZM30.4755 36.2428C30.4755 38.3932 28.5802 38.5258 28.1978 38.5301H3.74486C1.60224 38.5301 1.47322 36.6218 1.46913 36.2428L1.46884 3.75642C1.46884 1.6039 3.36763 1.4734 3.74457 1.46908H20.263L20.2718 1.4778V7.92396C20.2718 9.21763 21.0539 11.6669 24.0158 11.6669H30.4203L30.4753 11.7218L30.4755 36.2428ZM28.9572 10.1976H24.0169C21.8749 10.1976 21.7453 8.29969 21.7424 7.92417V2.95307L28.9572 10.1976ZM31.9447 36.2428V11.1157L21.7424 0.871022V0.823357H21.6936L20.8742 0H3.74491C2.44954 0 0 0.785336 0 3.75711V36.2435C0 37.5427 0.782956 40 3.74491 40H28.2001C29.4952 39.9997 31.9447 39.2143 31.9447 36.2428Z" fill="#6CB4EE"></path>
      </g>
    </svg>
  `;

  const logo = document.createElement("span");
  logo.innerHTML = logoSvg;
  logo.style.display = "inline-flex";
  logo.style.alignItems = "center";
  logo.style.width = "20px";
  logo.style.height = "20px";

  button.appendChild(logo);
  const buttonText = document.createTextNode("Save as PDF");
  button.appendChild(buttonText);

  buttonContainer.appendChild(button);
  button.onmouseover = () => {
    if (!button.disabled) {
      button.style.backgroundColor = "#6CB4EE";
      button.style.color = "#FAF9F6";

      const svgElement = button.querySelector("svg path");
      if (svgElement) {
        svgElement.style.fill = "#FAF9F6";
        svgElement.style.stroke = "#FAF9F6";
      }
    } else {
      button.style.color = "#4CAF50";

      const svgElement = button.querySelector("svg path");
      if (svgElement) {
        svgElement.style.fill = "#4CAF50";
        svgElement.style.stroke = "#4CAF50";
      }
      button.style.border = "1px solid #4CAF50";
    }
  };

  button.onmouseout = () => {
    if (!button.disabled) {
      button.style.backgroundColor = "#212121";
      button.style.color = "white";
      logo.querySelector("svg").style.fill = "#6CB4EE";
      logo.querySelector("svg").style.stroke = "#6CB4EE";
    } else {
      button.style.color = "#4CAF50";
      logo.querySelector("svg").style.fill = "#4CAF50";
      logo.querySelector("svg").style.stroke = "#4CAF50";
      button.style.border = "1px solid #4CAF50";
    }
  };

  button.onclick = () => generatePDF();

  const dropdownToggle = document.createElement("button");
  dropdownToggle.innerHTML = "▼";
  dropdownToggle.style.padding = "6px 10px";
  dropdownToggle.style.backgroundColor = "#212121";
  dropdownToggle.style.color = "white";
  dropdownToggle.style.border = "1px solid #6CB4EE";
  dropdownToggle.style.borderRadius = "0 20px 20px 0";
  dropdownToggle.style.cursor = "pointer";
  dropdownToggle.style.fontSize = "14px";
  dropdownToggle.style.borderLeft = "none";
  dropdownToggle.onmouseover = () => {
    if (!button.disabled) {
      dropdownToggle.style.backgroundColor = "#6CB4EE";
      dropdownToggle.style.color = "#FAF9F6";
    }
  };
  dropdownToggle.onmouseout = () => {
    if (!button.disabled) {
      dropdownToggle.style.backgroundColor = "#212121";
      dropdownToggle.style.color = "white";
    }
  };
  dropdownToggle.onclick = toggleDropdown;

  buttonContainer.appendChild(dropdownToggle);

  const dropdown = document.createElement("div");
  dropdown.style.display = "none";
  dropdown.style.position = "absolute";
  dropdown.style.top = "40px";
  dropdown.style.right = "0";
  dropdown.style.backgroundColor = "#ffffff";
  dropdown.style.border = "1px solid #ddd";
  dropdown.style.borderRadius = "5px";
  dropdown.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
  dropdown.style.zIndex = "1000000";
  dropdown.style.minWidth = "200px";

  function createDropdownOption(text, clickHandler) {
    const option = document.createElement("button");
    option.innerHTML = text;
    option.style.padding = "10px";
    option.style.width = "100%";
    option.style.border = "none";
    option.style.backgroundColor = "white";
    option.style.cursor = "pointer";
    option.style.textAlign = "left";
    option.style.color = "#333";
    option.style.display = "block";
    option.style.borderBottom = "1px solid #f0f0f0";
    option.onmouseover = () => {
      option.style.backgroundColor = "#4CAF50";
      option.style.color = "white";
    };
    option.onmouseout = () => {
      option.style.backgroundColor = "white";
      option.style.color = "#333";
    };

    option.onclick = () => {
      clickHandler();
      dropdown.style.display = "none";
    };
    return option;
  }

  function createDivider() {
    const divider = document.createElement("div");
    divider.style.height = "2px";
    divider.style.backgroundColor = "#ddd";
    return divider;
  }

  function createPageSizePopup() {
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#212121";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    popup.style.zIndex = "1000000";
    popup.style.width = "300px";
    popup.style.color = "white";

    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.style.position = "absolute";
    closeButton.style.top = "5px";
    closeButton.style.right = "10px";
    closeButton.style.border = "none";
    closeButton.style.background = "none";
    closeButton.style.fontSize = "24px";
    closeButton.style.cursor = "pointer";
    closeButton.style.color = "white";
    closeButton.onclick = () => document.body.removeChild(popup);
    popup.appendChild(closeButton);

    const title = document.createElement("h2");
    title.textContent = "Select Page Size";
    title.style.marginTop = "5px";
    title.style.marginBottom = "15px";
    popup.appendChild(title);

    const sizes = ["A4", "Legal", "Letter"];

    browser.storage.local
      .get(["selectedPageSize"])
      .then((result) => {
        const currentSize = result.selectedPageSize || "letter";

        const currentSizeDisplay = document.createElement("p");
        currentSizeDisplay.textContent = `Current size: ${currentSize.toUpperCase()}`;
        currentSizeDisplay.style.marginBottom = "15px";
        popup.appendChild(currentSizeDisplay);

        sizes.forEach((size) => {
          const button = document.createElement("button");
          button.textContent = size;
          button.style.display = "block";
          button.style.width = "100%";
          button.style.padding = "10px";
          button.style.marginBottom = "10px";
          button.style.backgroundColor = size.toLowerCase() === currentSize ? "#6CB4EE" : "transparent";
          button.style.color = "white";
          button.style.border = "1px solid #6CB4EE";
          button.style.borderRadius = "3px";
          button.style.cursor = "pointer";

          button.onmouseover = () => {
            button.style.backgroundColor = size.toLowerCase() === currentSize ? "#5BA1D8" : "#6CB4EE";
          };

          button.onmouseout = () => {
            button.style.backgroundColor = size.toLowerCase() === currentSize ? "#6CB4EE" : "transparent";
          };

          button.onclick = () => {
            browser.storage.local.set({ selectedPageSize: size.toLowerCase() }).then(() => {
              document.body.removeChild(popup);
              const dropdown = document.querySelector("div[style*='position: absolute']");
              if (dropdown) {
                dropdown.style.display = "none";
              }
            });
          };

          button.setAttribute("data-size", size);
          popup.appendChild(button);
        });
      })
      .catch((error) => {
        console.error("Error fetching selectedPageSize:", error);
      });

    document.body.appendChild(popup);
  }

  const options = [
    { text: "✂️ Select Messages", handler: activateMessageSelector },
    { text: "🗂️ Change Page Size", handler: createPageSizePopup },
    {
      text: "⭐ Rate This Extension",
      handler: () => {
        window.open("https://addons.mozilla.org/en-US/firefox/addon/chatgpt-to-pdf/reviews", "_blank");
      },
    },
  ];

  options.forEach(({ text, handler }, index) => {
    const option = createDropdownOption(text, handler);
    dropdown.appendChild(option);

    if (index === 2) {
      const divider = createDivider();
      dropdown.appendChild(divider);
    }
  });

  async function createCheckboxOption(labelText, storageKey, currentValue, callback) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.padding = "10px";
    container.style.borderBottom = "1px solid #f0f0f0";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = currentValue;
    checkbox.style.marginRight = "6px";
    checkbox.style.outline = "none";
    checkbox.style.boxShadow = "none";
    checkbox.style.borderRadius = "4px";
    checkbox.style.accentColor = "green";

    const checkboxId = `checkbox-${storageKey}`;
    checkbox.id = checkboxId;

    checkbox.addEventListener("change", () => {
      callback(checkbox.checked);
      browser.storage.local
        .set({ [storageKey]: checkbox.checked })
        .then(() => {
          // console.log(`${storageKey} set to ${checkbox.checked}`);
        })
        .catch((error) => {
          console.error(`Error setting ${storageKey}:`, error);
        });
    });

    const label = document.createElement("label");
    label.textContent = labelText;
    label.style.color = "#333";
    label.style.cursor = "pointer";
    label.setAttribute("for", checkboxId);

    container.appendChild(checkbox);
    container.appendChild(label);

    return container;
  }

  browser.storage.local
    .get(["toRemoveLogo", "landscapeMode", "addTableOfContent", "onlyChatGPTResponses"])
    .then((result) => {
      toRemoveLogo = result.toRemoveLogo !== undefined ? result.toRemoveLogo : true;
      landscapeMode = result.landscapeMode !== undefined ? result.landscapeMode : false;
      addTableOfContent = result.addTableOfContent !== undefined ? result.addTableOfContent : true;
      onlyChatGPTResponses = result.onlyChatGPTResponses !== undefined ? result.onlyChatGPTResponses : false;

      Promise.all([
        createCheckboxOption("Remove Logo", "toRemoveLogo", toRemoveLogo, (value) => {
          toRemoveLogo = value;
        }),
        createCheckboxOption("Landscape Mode", "landscapeMode", landscapeMode, (value) => {
          landscapeMode = value;
        }),
        createCheckboxOption("Add Table of Content", "addTableOfContent", addTableOfContent, (value) => {
          addTableOfContent = value;
        }),
        createCheckboxOption("Only GPT Responses", "onlyChatGPTResponses", onlyChatGPTResponses, (value) => {
          onlyChatGPTResponses = value;
        }),
      ])
        .then((checkboxOptions) => {
          checkboxOptions.forEach((checkboxOption) => {
            dropdown.appendChild(checkboxOption);
          });
        })
        .catch((error) => {
          console.error("Error creating checkbox options:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching storage data:", error);
    });

  buttonContainer.appendChild(button);
  buttonContainer.appendChild(dropdownToggle);
  buttonContainer.appendChild(dropdown);
  document.body.appendChild(buttonContainer);

  document.addEventListener("click", (event) => {
    if (!buttonContainer.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });
}

function toggleDropdown(event) {
  event.stopPropagation();
  const dropdown = event.currentTarget.nextElementSibling;
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

function showLoadingIndicator(button) {
  button.disabled = true;
  button.style.backgroundColor = "#191919";
  button.style.cursor = "not-allowed";
  button.style.color = "#4CAF50";
  button.style.border = "1px solid #4CAF50";

  const dropdownToggle = button.nextElementSibling;
  if (dropdownToggle) {
    dropdownToggle.disabled = true;
    dropdownToggle.style.backgroundColor = "#4CAF50";
    dropdownToggle.style.cursor = "not-allowed";
    dropdownToggle.style.border = "1px solid #4CAF50";
  }

  const originalText = button.textContent;
  button.textContent = "";
  const spinner = document.createElement("span");
  spinner.style.border = "4px solid #f3f3f3";
  spinner.style.borderTop = "4px solid #4CAF50";
  spinner.style.borderRadius = "50%";
  spinner.style.width = "20px";
  spinner.style.height = "20px";
  spinner.style.display = "inline-block";
  spinner.style.marginLeft = "2px";
  spinner.style.verticalAlign = "middle";
  spinner.style.animation = "spin 1s linear infinite";

  button.appendChild(spinner);

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  const textSequence = ["Scanning", "Formatting", "Processing", "Almost Done!", "Large File", "Saving"];
  let index = 0;

  const textSpan = document.createElement("span");
  textSpan.textContent = textSequence[index];
  button.insertBefore(textSpan, spinner);

  const updateInterval = () => {
    index += 1;
    if (index < textSequence.length) {
      textSpan.textContent = textSequence[index];
    } else {
      clearInterval(textSequenceInterval);
      textSpan.textContent = originalText;
      spinner.style.display = "none";
    }
  };

  const textSequenceInterval = setInterval(() => {
    updateInterval();
    if (index === 3) {
      clearInterval(textSequenceInterval);
      setInterval(updateInterval, 12000);
    }
  }, 4500);

  button.textSequenceInterval = textSequenceInterval;
}

function resetButton(button) {
  button.innerHTML = "";
  const logoSvg = `
    <svg width="256px" height="256px" viewBox="-4 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FAF9F6" stroke-width="0.0004" transform="matrix(1, 0, 0, 1, 0, 0)">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="0.4"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M25.6686 26.0962C25.1812 26.2401 24.4656 26.2563 23.6984 26.145C22.875 26.0256 22.0351 25.7739 21.2096 25.403C22.6817 25.1888 23.8237 25.2548 24.8005 25.6009C25.0319 25.6829 25.412 25.9021 25.6686 26.0962ZM17.4552 24.7459C17.3953 24.7622 17.3363 24.7776 17.2776 24.7939C16.8815 24.9017 16.4961 25.0069 16.1247 25.1005L15.6239 25.2275C14.6165 25.4824 13.5865 25.7428 12.5692 26.0529C12.9558 25.1206 13.315 24.178 13.6667 23.2564C13.9271 22.5742 14.193 21.8773 14.468 21.1894C14.6075 21.4198 14.7531 21.6503 14.9046 21.8814C15.5948 22.9326 16.4624 23.9045 17.4552 24.7459ZM14.8927 14.2326C14.958 15.383 14.7098 16.4897 14.3457 17.5514C13.8972 16.2386 13.6882 14.7889 14.2489 13.6185C14.3927 13.3185 14.5105 13.1581 14.5869 13.0744C14.7049 13.2566 14.8601 13.6642 14.8927 14.2326ZM9.63347 28.8054C9.38148 29.2562 9.12426 29.6782 8.86063 30.0767C8.22442 31.0355 7.18393 32.0621 6.64941 32.0621C6.59681 32.0621 6.53316 32.0536 6.44015 31.9554C6.38028 31.8926 6.37069 31.8476 6.37359 31.7862C6.39161 31.4337 6.85867 30.8059 7.53527 30.2238C8.14939 29.6957 8.84352 29.2262 9.63347 28.8054ZM27.3706 26.1461C27.2889 24.9719 25.3123 24.2186 25.2928 24.2116C24.5287 23.9407 23.6986 23.8091 22.7552 23.8091C21.7453 23.8091 20.6565 23.9552 19.2582 24.2819C18.014 23.3999 16.9392 22.2957 16.1362 21.0733C15.7816 20.5332 15.4628 19.9941 15.1849 19.4675C15.8633 17.8454 16.4742 16.1013 16.3632 14.1479C16.2737 12.5816 15.5674 11.5295 14.6069 11.5295C13.948 11.5295 13.3807 12.0175 12.9194 12.9813C12.0965 14.6987 12.3128 16.8962 13.562 19.5184C13.1121 20.5751 12.6941 21.6706 12.2895 22.7311C11.7861 24.0498 11.2674 25.4103 10.6828 26.7045C9.04334 27.3532 7.69648 28.1399 6.57402 29.1057C5.8387 29.7373 4.95223 30.7028 4.90163 31.7107C4.87693 32.1854 5.03969 32.6207 5.37044 32.9695C5.72183 33.3398 6.16329 33.5348 6.6487 33.5354C8.25189 33.5354 9.79489 31.3327 10.0876 30.8909C10.6767 30.0029 11.2281 29.0124 11.7684 27.8699C13.1292 27.3781 14.5794 27.011 15.985 26.6562L16.4884 26.5283C16.8668 26.4321 17.2601 26.3257 17.6635 26.2153C18.0904 26.0999 18.5296 25.9802 18.976 25.8665C20.4193 26.7844 21.9714 27.3831 23.4851 27.6028C24.7601 27.7883 25.8924 27.6807 26.6589 27.2811C27.3486 26.9219 27.3866 26.3676 27.3706 26.1461ZM30.4755 36.2428C30.4755 38.3932 28.5802 38.5258 28.1978 38.5301H3.74486C1.60224 38.5301 1.47322 36.6218 1.46913 36.2428L1.46884 3.75642C1.46884 1.6039 3.36763 1.4734 3.74457 1.46908H20.263L20.2718 1.4778V7.92396C20.2718 9.21763 21.0539 11.6669 24.0158 11.6669H30.4203L30.4753 11.7218L30.4755 36.2428ZM28.9572 10.1976H24.0169C21.8749 10.1976 21.7453 8.29969 21.7424 7.92417V2.95307L28.9572 10.1976ZM31.9447 36.2428V11.1157L21.7424 0.871022V0.823357H21.6936L20.8742 0H3.74491C2.44954 0 0 0.785336 0 3.75711V36.2435C0 37.5427 0.782956 40 3.74491 40H28.2001C29.4952 39.9997 31.9447 39.2143 31.9447 36.2428Z" fill="#6CB4EE"></path>
      </g>
    </svg>
  `;

  const logo = document.createElement("span");
  logo.innerHTML = logoSvg;
  logo.style.display = "inline-flex";
  logo.style.alignItems = "center";
  logo.style.width = "20px";
  logo.style.height = "20px";

  const buttonText = document.createTextNode("Save as PDF");
  button.appendChild(logo);
  button.appendChild(buttonText);

  button.disabled = false;
  button.style.backgroundColor = "#212121";
  button.style.color = "white";
  button.style.cursor = "pointer";
  button.style.border = "1px solid #6CB4EE";

  button.onmouseover = () => {
    if (!button.disabled) {
      button.style.backgroundColor = "#6CB4EE";
      button.style.color = "#FAF9F6";

      const svgElement = button.querySelector("svg path");
      if (svgElement) {
        svgElement.style.fill = "#FAF9F6";
        svgElement.style.stroke = "#FAF9F6";
      }
    } else {
      button.style.color = "#4CAF50";

      const svgElement = button.querySelector("svg path");
      if (svgElement) {
        svgElement.style.fill = "#4CAF50";
        svgElement.style.stroke = "#4CAF50";
      }
      button.style.border = "1px solid #4CAF50";
    }
  };
  button.onmouseout = () => {
    if (!button.disabled) {
      button.style.backgroundColor = "#212121";
      button.style.color = "white";
      logo.querySelector("svg").style.fill = "#6CB4EE";
      logo.querySelector("svg").style.stroke = "#6CB4EE";
      button.style.border = "1px solid #6CB4EE";
    } else {
      button.style.color = "#4CAF50";
      logo.querySelector("svg").style.fill = "#4CAF50";
      logo.querySelector("svg").style.stroke = "#4CAF50";
      button.style.border = "1px solid #4CAF50";
    }
  };

  const dropdownToggle = button.nextElementSibling;
  if (dropdownToggle) {
    dropdownToggle.disabled = false;
    dropdownToggle.style.backgroundColor = "#212121";
    dropdownToggle.style.cursor = "pointer";
    dropdownToggle.style.border = "1px solid #6CB4EE";
  }

  if (button.textSequenceInterval) {
    clearInterval(button.textSequenceInterval);
  }
}

async function getEmbeddedStyles() {
  const styles = [];
  const styleSheets = Array.from(document.styleSheets);

  document.querySelectorAll("style").forEach((el) => {
    styles.push(el.innerHTML);
  });

  const stylesheetPromises = styleSheets.map(async (sheet) => {
    try {
      if (sheet.href) {
        const response = await fetch(sheet.href);
        if (response.ok) {
          const css = await response.text();
          styles.push(css);
        }
      } else {
        const cssRules = sheet.cssRules;
        for (let rule of cssRules) {
          styles.push(rule.cssText);
        }
      }
    } catch (e) {
      console.error("Error fetching stylesheet:", e);
    }
  });

  await Promise.all(stylesheetPromises);
  return styles.join("\n");
}

async function getShadowDOMStyles() {
  const styles = [];
  const elementsWithShadow = Array.from(document.querySelectorAll("*")).filter((el) => el.shadowRoot);

  for (let el of elementsWithShadow) {
    const shadowStyles = await getEmbeddedStylesFromShadowRoot(el.shadowRoot);
    styles.push(shadowStyles);
  }

  return styles.join("\n");
}

async function getEmbeddedStylesFromShadowRoot(shadowRoot) {
  const styles = [];
  const styleSheets = Array.from(shadowRoot.styleSheets);

  shadowRoot.querySelectorAll("style").forEach((el) => {
    styles.push(el.innerHTML);
  });

  const stylesheetPromises = styleSheets.map(async (sheet) => {
    try {
      if (sheet.href) {
        const response = await fetch(sheet.href);
        if (response.ok) {
          const css = await response.text();
          styles.push(css);
        }
      } else {
        const cssRules = sheet.cssRules;
        for (let rule of cssRules) {
          styles.push(rule.cssText);
        }
      }
    } catch (e) {
      console.error("Error fetching stylesheet from Shadow DOM:", e);
    }
  });

  await Promise.all(stylesheetPromises);
  return styles.join("\n");
}

function removeUnwantedElements() {
  const selectors = ["div.mt-1.flex.gap-3.empty\\:hidden.-ml-2"];

  const clonedBody = document.body.cloneNode(true);

  selectors.forEach((selector) => {
    clonedBody.querySelectorAll(selector).forEach((el) => {
      el.remove();
    });
  });

  clonedBody.querySelectorAll("br.ProseMirror-trailingBreak").forEach((br) => {
    br.remove();
  });

  clonedBody.querySelectorAll("div.popover").forEach((popoverDiv) => {
    popoverDiv.querySelectorAll("div").forEach((childDiv) => {
      if (childDiv.classList.contains("absolute")) {
        childDiv.remove();
      }
    });

    clonedBody.querySelectorAll("div").forEach((contentDiv) => {
      const computedStyle = window.getComputedStyle(contentDiv);
      if (computedStyle.paddingBottom !== "0px") {
        contentDiv.style.paddingBottom = "0";
      }
    });
  });

  clonedBody.querySelectorAll("div").forEach((div) => {
    if (div.classList.contains("popover")) {
      let currentDiv = div;

      while (currentDiv && !currentDiv.classList.contains("z-0")) {
        const parent = currentDiv.parentNode;
        const children = Array.from(currentDiv.children);

        children.forEach((child) => parent.insertBefore(child, currentDiv));

        currentDiv.remove();

        currentDiv = parent;

        if (!currentDiv || currentDiv.tagName.toLowerCase() !== "div") {
          break;
        }
      }
    }
  });

  return clonedBody;
}

function removeButtons(htmlContent, removeLogo = false) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  doc.querySelectorAll("button").forEach((button) => {
    const img = button.querySelector("img");
    if (img) {
      button.parentNode.replaceChild(img, button);
    } else {
      button.remove();
    }
  });

  if (removeLogo) {
    getLogoRemoved(doc);
  }

  return doc.documentElement.outerHTML;
}

async function initializePageSize() {
  try {
    const result = await browser.storage.local.get(["selectedPageSize", "addTableOfContent", "landscapeMode", "toRemoveLogo", "onlyChatGPTResponses"]);

    currentPageSize = result.selectedPageSize || "legal";
    addTableOfContent = result.addTableOfContent !== undefined ? result.addTableOfContent : true;
    landscapeMode = result.landscapeMode !== undefined ? result.landscapeMode : false;
    toRemoveLogo = result.toRemoveLogo !== undefined ? result.toRemoveLogo : true;
    onlyChatGPTResponses = result.onlyChatGPTResponses !== undefined ? result.onlyChatGPTResponses : false;
  } catch (error) {
    console.error("Error initializing page size and options:", error);
  }
}

function getLogoRemoved(doc) {
  doc.querySelectorAll("svg")?.forEach((svg) => {
    if (svg.querySelector("text") && svg.querySelector("text").textContent === "ChatGPT") {
      let parent = svg.parentElement;
      while (parent && parent.tagName !== "DIV") {
        parent = parent.parentElement;
      }
      if (parent) {
        parent.remove();
      } else {
        svg.remove();
      }
    }
  });

  doc.querySelectorAll(".flex-shrink-0.flex.flex-col.relative.items-end").forEach((el) => {
    el.remove();
  });
}

class MessageSelector {
  constructor() {
    this.selectedArticles = new Set();
    this.selectedChildren = new Set();
    this.excludedElements = new Set();
    this.confirmButton = null;
    this.cancelButton = null;
    this.toggleModeButton = null;
    this.buttonContainer = null;
    this.countDisplay = null;
    this.tooltip = null;
    this.currentMode = "select";

    this.floatingBox = null;

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.handleFloatingBoxItemClick = this.handleFloatingBoxItemClick.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
  }

  startSelection() {
    injectSelectionStyles();
    this.showTooltip("Click on any message to select. Press 'Escape' to cancel.");
    this.highlightSelectableElements();
    this.createConfirmationButtons();
    this.createFloatingBox();
    this.updateFloatingBox();
    this.addEventListeners();
  }

  highlightSelectableElements() {
    const main = document.querySelector("main");
    if (!main) {
      alert("Main element not found.");
      this.cleanup();
      return;
    }

    const articles = main.querySelectorAll("article");
    if (articles.length === 0) {
      alert("No messages found to select.");
      this.cleanup();
      return;
    }

    articles.forEach((article) => {
      this.makeElementSelectable(article);

      const descendants = article.querySelectorAll("*");
      descendants.forEach((descendant) => {
        this.makeElementSelectable(descendant);
      });
    });
  }

  makeElementSelectable(element) {
    if (element.dataset.selectable === "true") return;

    element.addEventListener("click", this.handleClick);
    element.addEventListener("mouseenter", this.handleMouseEnter);
    element.addEventListener("mouseleave", this.handleMouseLeave);

    element.dataset.selectable = "true";
  }

  createConfirmationButtons() {
    this.buttonContainer = document.createElement("div");
    this.buttonContainer.className = "message-selector-container";
    this.buttonContainer.style.position = "fixed";
    this.buttonContainer.style.bottom = "20px";
    this.buttonContainer.style.left = "50%";
    this.buttonContainer.style.transform = "translateX(-50%)";
    this.buttonContainer.style.zIndex = "1000000";
    this.buttonContainer.style.display = "flex";
    this.buttonContainer.style.flexDirection = "column";
    this.buttonContainer.style.gap = "10px";
    this.buttonContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    this.buttonContainer.style.padding = "10px 20px";
    this.buttonContainer.style.borderRadius = "8px";

    this.countDisplay = document.createElement("div");
    this.countDisplay.textContent = "Selected Messages: 0 | Excluded Messages: 0";
    this.countDisplay.style.textAlign = "center";
    this.countDisplay.style.alignItems = "center";
    this.countDisplay.style.color = "white";
    this.countDisplay.style.marginBottom = "10px";
    this.countDisplay.style.fontSize = "16px";
    this.countDisplay.style.fontWeight = "bold";
    this.buttonContainer.appendChild(this.countDisplay);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.style.display = "flex";
    buttonsDiv.style.gap = "10px";

    this.confirmButton = document.createElement("button");
    this.confirmButton.textContent = "Save Selected as PDF";
    this.confirmButton.style.padding = "10px 20px";
    this.confirmButton.style.backgroundColor = "#6CB4EE";
    this.confirmButton.style.color = "white";
    this.confirmButton.style.border = "none";
    this.confirmButton.style.borderRadius = "5px";
    this.confirmButton.style.cursor = "pointer";
    this.confirmButton.style.fontSize = "14px";
    this.confirmButton.style.fontWeight = "bold";
    this.confirmButton.onclick = () => this.generateSelectedPDF();

    this.cancelButton = document.createElement("button");
    this.cancelButton.textContent = "Cancel";
    this.cancelButton.style.padding = "10px 20px";
    this.cancelButton.style.backgroundColor = "#ff4d4d";
    this.cancelButton.style.color = "white";
    this.cancelButton.style.border = "none";
    this.cancelButton.style.borderRadius = "5px";
    this.cancelButton.style.cursor = "pointer";
    this.cancelButton.style.fontSize = "14px";
    this.cancelButton.style.fontWeight = "bold";
    this.cancelButton.onclick = () => this.cancelSelection();

    this.toggleModeButton = document.createElement("button");
    this.toggleModeButton.textContent = "Switch to Unselect Mode";
    this.toggleModeButton.style.padding = "10px 20px";
    this.toggleModeButton.style.backgroundColor = "#FFD700";
    this.toggleModeButton.style.color = "black";
    this.toggleModeButton.style.border = "none";
    this.toggleModeButton.style.borderRadius = "5px";
    this.toggleModeButton.style.cursor = "pointer";
    this.toggleModeButton.style.fontSize = "14px";
    this.toggleModeButton.style.fontWeight = "bold";
    this.toggleModeButton.onclick = this.toggleMode;

    buttonsDiv.appendChild(this.confirmButton);
    buttonsDiv.appendChild(this.cancelButton);
    buttonsDiv.appendChild(this.toggleModeButton);
    this.buttonContainer.appendChild(buttonsDiv);
    document.body.appendChild(this.buttonContainer);
  }

  toggleMode() {
    if (this.currentMode === "select") {
      if (this.selectedArticles.size === 0 && this.selectedChildren.size === 0) {
        alert("Select a message first to use deselect.");
        return;
      }
      this.currentMode = "unselect";
      this.toggleModeButton.textContent = "Switch to Select Mode";
      this.showTooltip("Unselect mode activated. Click on elements within selected messages to deselect them.");
    } else {
      this.currentMode = "select";
      this.toggleModeButton.textContent = "Switch to Unselect Mode";
      this.showTooltip("Select mode activated. Click on elements to include them.");
    }

    this.updateFloatingBox();
  }

  handleClick(event) {
    event.stopPropagation();
    const element = event.currentTarget;

    if (this.currentMode === "select") {
      if (element.tagName.toLowerCase() === "article") {
        if (this.selectedArticles.has(element)) {
          this.deselectArticle(element);
        } else {
          this.selectArticle(element);
        }
      } else {
        if (this.selectedChildren.has(element)) {
          this.deselectChild(element);
        } else {
          this.selectChild(element);
        }
      }
    } else if (this.currentMode === "unselect") {
      if (!this.isElementWithinSelected(element)) {
        alert("You can only deselect elements within selected messages.");
        return;
      }

      if (this.isElementExcluded(element)) {
        this.unexcludeElement(element);
      } else {
        this.excludeElement(element);
      }
    }

    this.updateCountDisplay();
    this.updateFloatingBox();

    if (this.selectedArticles.size === 0 && this.selectedChildren.size === 0 && this.currentMode === "unselect") {
      this.currentMode = "select";
      this.toggleModeButton.textContent = "Switch to Unselect Mode";
      this.showTooltip("No messages selected. Switched back to Select mode.");
      this.updateFloatingBox();
    }
  }

  handleMouseEnter(event) {
    const element = event.currentTarget;
    if (this.currentMode === "select") {
      if (!this.isAncestorSelected(element) && !this.isElementSelected(element)) {
        element.classList.add("message-selector-hover");
      }
    } else if (this.currentMode === "unselect") {
      if (!this.isElementExcluded(element) && this.isElementWithinSelected(element)) {
        element.classList.add("message-selector-exclude-hover");
      }
    }
  }

  handleMouseLeave(event) {
    const element = event.currentTarget;
    if (this.currentMode === "select") {
      if (!this.isElementSelected(element)) {
        element.classList.remove("message-selector-hover");
      }
    } else if (this.currentMode === "unselect") {
      if (!this.isElementExcluded(element) && this.isElementWithinSelected(element)) {
        element.classList.remove("message-selector-exclude-hover");
      }
    }
  }

  excludeElement(element) {
    this.excludedElements.add(element);
    element.classList.add("message-selector-excluded");

    if (this.selectedArticles.has(element)) {
      this.deselectArticle(element);
    }
    if (this.selectedChildren.has(element)) {
      this.deselectChild(element);
    }
  }

  unexcludeElement(element) {
    this.excludedElements.delete(element);
    element.classList.remove("message-selector-excluded");
  }

  isElementExcluded(element) {
    return this.excludedElements.has(element);
  }

  async generateSelectedPDF() {
    if (this.selectedArticles.size === 0 && this.selectedChildren.size === 0) {
      alert("Please select at least one message.");
      return;
    }

    this.confirmButton.disabled = true;
    this.confirmButton.textContent = "Saving...";
    this.confirmButton.style.backgroundColor = "#212121";
    this.confirmButton.style.cursor = "not-allowed";
    this.confirmButton.style.color = "#4CAF50";

    this.toggleModeButton.disabled = true;
    this.toggleModeButton.style.backgroundColor = "#A9A9A9";
    this.toggleModeButton.style.cursor = "not-allowed";
    this.toggleModeButton.style.color = "white";

    let selectedHTML = "";

    this.processedArticles = new Set();

    const combinedSet = new Set([...this.selectedArticles, ...this.selectedChildren]);

    combinedSet.forEach((element) => {
      if (this.excludedElements.has(element)) return;

      const hasArticleAncestor = [element, element.parentElement, element.parentElement?.parentElement].some((el) => el && el.tagName.toLowerCase() === "article");

      if (hasArticleAncestor) {
        const existingArticle = [element, element.parentElement, element.parentElement?.parentElement].find((el) => el && el.tagName.toLowerCase() === "article");
        if (existingArticle && !this.processedArticles.has(existingArticle)) {
          const clonedArticle = existingArticle.cloneNode(true);
          selectedHTML += clonedArticle.outerHTML;
          this.processedArticles.add(existingArticle);
        }
        return;
      } else {
        const parent1 = element.parentElement;
        const parent2 = parent1 ? parent1.parentElement : null;

        if (!parent1 || !parent2) {
          const articleWrapper = document.createElement("article");

          if (parent1) {
            const clonedParent1 = parent1.cloneNode(false);
            const clonedElement = element.cloneNode(true);
            clonedElement.classList.remove("message-selector-selected");
            clonedParent1.appendChild(clonedElement);
            articleWrapper.appendChild(clonedParent1);
          } else {
            const clonedElement = element.cloneNode(true);
            clonedElement.classList.remove("message-selector-selected");
            articleWrapper.appendChild(clonedElement);
          }

          const articleId = element.getAttribute("id") || `article-${Math.random().toString(36).substring(2, 9)}`;
          articleWrapper.id = articleId;

          selectedHTML += articleWrapper.outerHTML;
        } else {
          const clonedParent2 = parent2.cloneNode(false);
          const clonedParent1 = parent1.cloneNode(false);
          const clonedElement = element.cloneNode(true);

          clonedElement.classList.remove("message-selector-selected");

          clonedParent1.appendChild(clonedElement);
          clonedParent2.appendChild(clonedParent1);

          const articleWrapper = document.createElement("article");

          const articleId = clonedElement.getAttribute("id") || `article-${Math.random().toString(36).substring(2, 9)}`;
          articleWrapper.id = articleId;

          articleWrapper.appendChild(clonedParent2);

          selectedHTML += articleWrapper.outerHTML;
        }
      }
    });

    const sanitizedHTML = this.sanitizeSelectedHTML(selectedHTML);

    const finalHTML = `
      <html>
        <head>
          <style>
            body {
              padding-left: 20px;
              font-family: Arial, sans-serif;
            }
            ul, ol {
              padding-left: 20px;
            }
          </style>
        </head>
        <body>
          ${sanitizedHTML}
        </body>
      </html>
    `;

    try {
      await generatePDFFromSelected(finalHTML);

      this.cleanup();
      activeMessageSelector = null;
    } catch (error) {
      console.error("Error during PDF generation:", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      this.confirmButton.disabled = false;
      this.confirmButton.textContent = "Save Selected as PDF";
      this.confirmButton.style.backgroundColor = "#6CB4EE";
      this.confirmButton.style.cursor = "pointer";
    }
  }

  getElementPath(element) {
    if (element.id) {
      return `#${element.id}`;
    }
    let path = "";
    while (element && element.nodeType === Node.ELEMENT_NODE) {
      let selector = element.nodeName.toLowerCase();
      if (element.className) {
        selector += "." + Array.from(element.classList).join(".");
      }
      let sibling = element;
      let siblingIndex = 1;
      while ((sibling = sibling.previousElementSibling)) {
        if (sibling.nodeName.toLowerCase() === element.nodeName.toLowerCase()) {
          siblingIndex++;
        }
      }
      selector += `:nth-of-type(${siblingIndex})`;
      path = selector + (path ? " > " + path : "");
      element = element.parentElement;
    }
    return path;
  }

  isAncestorSelected(element) {
    let parent = element.parentElement;
    while (parent) {
      if (this.selectedArticles.has(parent) || this.selectedChildren.has(parent)) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }

  isElementSelected(element) {
    return this.selectedArticles.has(element) || this.selectedChildren.has(element);
  }

  isElementWithinSelected(element) {
    let parent = element;
    while (parent) {
      if (this.selectedArticles.has(parent) || this.selectedChildren.has(parent)) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }

  selectArticle(article) {
    this.selectedArticles.add(article);
    article.classList.add("message-selector-selected");

    this.removeSelectedDescendants(article);
  }

  deselectArticle(article) {
    this.selectedArticles.delete(article);
    article.classList.remove("message-selector-selected");
    article.style.setProperty("outline", "none", "important");
  }

  selectChild(child) {
    if (this.isAncestorSelected(child)) {
      alert("Already selected. If you want to select a particular message remove selection for the outer message first");
      return;
    }

    this.removeSelectedDescendants(child);

    this.selectedChildren.add(child);
    child.classList.add("message-selector-selected");
  }

  deselectChild(child) {
    this.selectedChildren.delete(child);
    child.classList.remove("message-selector-selected");
    child.style.setProperty("outline", "none", "important");
  }

  removeSelectedDescendants(element) {
    const descendants = element.querySelectorAll("*");
    descendants.forEach((descendant) => {
      if (this.selectedChildren.has(descendant)) {
        this.deselectChild(descendant);
      }
      if (this.selectedArticles.has(descendant)) {
        this.deselectArticle(descendant);
      }
      if (this.excludedElements.has(descendant)) {
        this.unexcludeElement(descendant);
      }
    });
  }

  updateCountDisplay() {
    if (this.countDisplay) {
      this.countDisplay.textContent = `Selected Messages: ${this.selectedArticles.size + this.selectedChildren.size} | Excluded Messages: ${this.excludedElements.size}`;
    }
  }

  addEventListeners() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.key === "Escape") {
      this.cancelSelection();
    }
  }

  cancelSelection() {
    this.cleanup();
    activeMessageSelector = null;
  }

  cleanup() {
    this.selectedArticles.forEach((article) => {
      article.classList.remove("message-selector-selected");
      article.style.removeProperty("outline");
    });
    this.selectedArticles.clear();

    this.selectedChildren.forEach((child) => {
      child.classList.remove("message-selector-selected");
      child.style.removeProperty("outline");
    });
    this.selectedChildren.clear();

    this.excludedElements.forEach((element) => {
      element.classList.remove("message-selector-excluded");
      element.style.removeProperty("outline");
    });
    this.excludedElements.clear();

    const main = document.querySelector("main");
    if (main) {
      const selectableElements = main.querySelectorAll("article, article *");
      selectableElements.forEach((element) => {
        element.removeEventListener("click", this.handleClick);
        element.removeEventListener("mouseenter", this.handleMouseEnter);
        element.removeEventListener("mouseleave", this.handleMouseLeave);
        element.removeAttribute("data-selectable");
        element.classList.remove("message-selector-hover", "message-selector-exclude-hover");
        element.style.removeProperty("outline");
        element.style.removeProperty("transition");
      });
    }

    if (this.buttonContainer && this.buttonContainer.parentElement) {
      this.buttonContainer.parentElement.removeChild(this.buttonContainer);
    }

    if (this.tooltip && this.tooltip.parentElement) {
      this.tooltip.parentElement.removeChild(this.tooltip);
    }

    this.removeFloatingBox();

    this.removeEventListeners();

    const injectedStyle = document.getElementById("message-selector-styles");
    if (injectedStyle && injectedStyle.parentElement) {
      injectedStyle.parentElement.removeChild(injectedStyle);
    }
    this.currentMode = "select";
  }

  showTooltip(message) {
    if (this.tooltip) {
      this.tooltip.parentElement.removeChild(this.tooltip);
    }
    this.tooltip = document.createElement("div");
    this.tooltip.className = "message-selector-tooltip";
    this.tooltip.textContent = message;
    document.body.appendChild(this.tooltip);

    setTimeout(() => {
      if (this.tooltip && this.tooltip.parentElement) {
        this.tooltip.parentElement.removeChild(this.tooltip);
      }
    }, 5000);
  }

  getClosestArticle(element) {
    return element.closest("article");
  }

  sanitizeSelectedHTML(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    doc.querySelectorAll(".message-selector-excluded").forEach((element) => {
      element.remove();
    });

    doc.querySelectorAll(".message-selector-selected, .message-selector-hover, .message-selector-excluded, .message-selector-exclude-hover").forEach((element) => {
      element.classList.remove("message-selector-selected", "message-selector-hover", "message-selector-excluded", "message-selector-exclude-hover");
    });

    return doc.body.innerHTML;
  }

  createFloatingBox() {
    this.floatingBox = document.createElement("div");
    this.floatingBox.className = "message-selector-floating-box";
    this.floatingBox.style.position = "fixed";
    this.floatingBox.style.top = "60px";
    this.floatingBox.style.right = "20px";
    this.floatingBox.style.width = "250px";
    this.floatingBox.style.maxHeight = "80vh";
    this.floatingBox.style.overflowY = "auto";
    this.floatingBox.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    this.floatingBox.style.border = "1px solid #ccc";
    this.floatingBox.style.borderRadius = "8px";
    this.floatingBox.style.padding = "10px";
    this.floatingBox.style.zIndex = "1000000";
    this.floatingBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    this.floatingBox.style.color = "black";

    const title = document.createElement("h4");
    title.textContent = "Selected/Excluded Elements";
    title.style.textAlign = "center";
    title.style.marginBottom = "10px";
    this.floatingBox.appendChild(title);

    const listContainer = document.createElement("ul");
    listContainer.style.listStyleType = "none";
    listContainer.style.padding = "0";
    listContainer.style.margin = "0";
    this.floatingBox.appendChild(listContainer);

    document.body.appendChild(this.floatingBox);
  }

  removeFloatingBox() {
    if (this.floatingBox && this.floatingBox.parentElement) {
      this.floatingBox.parentElement.removeChild(this.floatingBox);
    }
  }

  updateFloatingBox() {
    if (!this.floatingBox) return;

    const listContainer = this.floatingBox.querySelector("ul");
    listContainer.innerHTML = "";

    const createListItem = (element, type) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.style.marginBottom = "5px";
      li.style.padding = "5px";
      li.style.borderRadius = "4px";
      li.style.backgroundColor = type === "excluded" ? "#ffe6e6" : "#e6ffe6";
      li.style.color = "black";

      let textContent = element.textContent.trim().substring(0, 40);
      if (element.textContent.trim().length > 40) {
        textContent += "...";
      }

      const span = document.createElement("span");
      span.textContent = textContent;
      span.style.cursor = "pointer";
      span.style.flexGrow = "1";

      span.addEventListener("click", () => this.handleFloatingBoxItemClick(element));

      const removeBtn = document.createElement("span");
      removeBtn.textContent = "×";
      removeBtn.style.color = "red";
      removeBtn.style.cursor = "pointer";
      removeBtn.style.marginLeft = "10px";
      removeBtn.style.fontWeight = "bold";
      removeBtn.style.display = "none";

      li.addEventListener("mouseenter", () => {
        removeBtn.style.display = "inline";
      });
      li.addEventListener("mouseleave", () => {
        removeBtn.style.display = "none";
      });

      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleRemoveButtonClick(element);
      });

      li.appendChild(span);
      li.appendChild(removeBtn);

      return li;
    };

    this.selectedArticles.forEach((article) => {
      const listItem = createListItem(article, "selected");
      listContainer.appendChild(listItem);
    });

    this.selectedChildren.forEach((child) => {
      const listItem = createListItem(child, "selectedChild");
      listContainer.appendChild(listItem);
    });

    this.excludedElements.forEach((element) => {
      const listItem = createListItem(element, "excluded");
      listContainer.appendChild(listItem);
    });
  }

  handleFloatingBoxItemClick(element) {
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "center" });

    const originalOutline = element.style.outline;
    const originalTransition = element.style.transition;

    element.style.transition = "outline 0.3s ease-in-out";
    element.style.setProperty("outline", "4px solid yellow", "important");

    setTimeout(() => {
      element.style.setProperty("outline", originalOutline || "", "important");
      element.style.transition = originalTransition || "";
    }, 1000);
  }

  handleRemoveButtonClick(element) {
    if (this.selectedArticles.has(element)) {
      this.deselectArticle(element);
    } else if (this.selectedChildren.has(element)) {
      this.deselectChild(element);
    } else if (this.excludedElements.has(element)) {
      this.unexcludeElement(element);
    }

    this.updateCountDisplay();
    this.updateFloatingBox();

    element.style.setProperty("outline", "none", "important");

    if (this.selectedArticles.size === 0 && this.selectedChildren.size === 0 && this.currentMode === "unselect") {
      this.currentMode = "select";
      this.toggleModeButton.textContent = "Switch to Unselect Mode";
      this.showTooltip("No messages selected. Switched back to Select mode.");
      this.updateFloatingBox();
    }
  }
}

function injectSelectionStyles() {
  if (document.getElementById("message-selector-styles")) return;

  const style = document.createElement("style");
  style.id = "message-selector-styles";
  style.textContent = `
    .message-selector-selected {
      outline: 2px solid #6CB4EE !important;
      cursor: pointer;
    }
    .message-selector-excluded {
      outline: 2px solid #ff4d4d !important;
      cursor: pointer;
    }
    .message-selector-hover {
      outline: 3px dashed #6CB4EE;
      cursor: pointer;
    }
    .message-selector-exclude-hover {
      outline: 3px dashed #ff4d4d;
      cursor: pointer;
    }
    .message-selector-tooltip {
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #FFFFFF;
      color: #4CAF50;
      padding: 8px 12px;
      border-radius: 4px;
      z-index: 1000001;
      font-size: 14px;
      font-weight: bold;
    }
    /* Additional styles for the floating box */
    .message-selector-floating-box ul li:hover {
      background-color: #f0f0f0;
    }
    .message-selector-floating-box ul li span:first-child {
      max-width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .message-selector-floating-box ul li span:last-child {
      margin-left: 10px;
    }
  `;
  document.head.appendChild(style);
}

function activateMessageSelector() {
  if (activeMessageSelector) {
    activeMessageSelector.cleanup();
    activeMessageSelector = null;
    return;
  }

  const articles = document.querySelectorAll("article");
  if (articles.length === 0) {
    alert("No messages found to select.");
    return;
  }

  activeMessageSelector = new MessageSelector();
  activeMessageSelector.startSelection();
}

async function generatePDF() {
  await initializePageSize();

  const button = document.getElementById("save-html-button");
  if (!button) return;
  showLoadingIndicator(button);

  const modifiedBody = removeUnwantedElements();

  const mainElement = modifiedBody.querySelector("main");
  if (!mainElement) {
    alert("Main element not found.");
    resetButton(button);
    return;
  }

  const styles = await getEmbeddedStyles();
  const shadowStyles = await getShadowDOMStyles();
  const allStyles = `${styles}\n${shadowStyles}`;

  let htmlContent = mainElement.outerHTML;

  htmlContent = htmlContent.replace(/’/g, "'");

  htmlContent = removeButtons(htmlContent, toRemoveLogo);

  const titleElement = document.querySelector("head title");
  const title = titleElement ? titleElement.textContent.trim() : "Document";
  const currPageOrientation = landscapeMode ? "Landscape" : "Portrait";

  try {
    const response = await browser.runtime.sendMessage({
      action: "convertHTMLToPDF",
      data: {
        html: htmlContent,
        pageFormat: currentPageSize,
        pageOrientation: currPageOrientation,
        allStyles,
        onlyAiResponseNeeded: onlyChatGPTResponses,
        title,
        removeLogo: toRemoveLogo,
        toc: addTableOfContent,
      },
    });

    if (response.error) {
      throw new Error(response.error);
    } else {
      const pdfBlob = response.blob;
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const pdfLink = document.createElement("a");
      pdfLink.href = pdfUrl;
      pdfLink.download = `${title}.pdf`;
      document.body.appendChild(pdfLink);
      pdfLink.click();
      document.body.removeChild(pdfLink);

      URL.revokeObjectURL(pdfUrl);
    }
  } catch (error) {
    console.error("Error during PDF generation:", error);
    alert(`An error occurred: ${error.message}`);
  } finally {
    resetButton(button);
  }
}

async function generatePDFFromSelected(finalHTML) {
  await initializePageSize();

  const button = document.getElementById("save-html-button");
  if (!button) return;

  showLoadingIndicator(button);

  try {
    const styles = await getEmbeddedStyles();
    const shadowStyles = await getShadowDOMStyles();
    const allStyles = `${styles}\n${shadowStyles}`;

    let htmlContent = finalHTML;

    htmlContent = htmlContent.replace(/’/g, "'");

    htmlContent = removeButtons(htmlContent, toRemoveLogo);

    const titleElement = document.querySelector("head title");
    const title = titleElement ? titleElement.textContent.trim() : "Document";
    const currPageOrientation = landscapeMode ? "Landscape" : "Portrait";

    const response = await browser.runtime.sendMessage({
      action: "convertHTMLToPDF",
      data: {
        html: htmlContent,
        pageFormat: currentPageSize,
        pageOrientation: currPageOrientation,
        allStyles,
        onlyAiResponseNeeded: false,
        title,
        removeLogo: toRemoveLogo,
        toc: addTableOfContent,
      },
    });

    if (response.error) {
      throw new Error(response.error);
    } else {
      const pdfBlob = response.blob;
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const pdfLink = document.createElement("a");
      pdfLink.href = pdfUrl;
      pdfLink.download = `${title}.pdf`;
      document.body.appendChild(pdfLink);
      pdfLink.click();
      document.body.removeChild(pdfLink);

      URL.revokeObjectURL(pdfUrl);
    }
  } catch (error) {
    console.error("Error during PDF generation:", error);
    alert(`An error occurred: ${error.message}`);
  } finally {
    resetButton(button);
  }
}

window.addEventListener("load", async () => {
  await initializePageSize();
  createSaveButton();
});
