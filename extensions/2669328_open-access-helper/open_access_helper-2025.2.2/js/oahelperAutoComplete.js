document.addEventListener('DOMContentLoaded', () => {  
  // The autoComplete.js Engine instance creator
  const autoCompleteJS = new autoComplete({
    data: {
      src: async () => {
        try {
          // Loading placeholder text
          document
          .getElementById("autoComplete")
          .setAttribute("placeholder", "Loading...");
          // Fetch External Data Source
          const source = await fetch(
          "https://www.oahelper.org/institutes/acl.php", {
            headers: {
              "X-Token": "l6sNUJ3Knh",
            },
          }
          );
          const data = await source.json();
          // Post Loading placeholder text
          document
          .getElementById("autoComplete")
          .setAttribute("placeholder", autoCompleteJS.placeHolder);
          // Returns Fetched data
          return data.data;
        } catch (error) {
          return error;
        }
      },
      keys: ["institution", "domain"],
      cache: true,
      filter: (list) => {
        // Filter duplicates
        // incase of multiple data keys usage
        const filteredResults = Array.from(
        new Set(list.map((value) => value.match))
        ).map((food) => {
          return list.find((value) => value.match === food);
        });
        return filteredResults;
      }
    },
    placeHolder: "Find your institution, search by name or domain",
    resultsList: {
      element: (list, data) => {
        const info = document.createElement("p");
        if (data.results.length > 0) {
          info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
        } else {
          info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
        }
        list.prepend(info);
      },
      noResults: true,
      maxResults: 15,
      tabSelect: true
    },
    resultItem: {
      element: (item, data) => {
        // Modify Results Item Style
        item.style = "display: flex; justify-content: space-between;";
        // Modify Results Item Content
        item.innerHTML = `
        <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
          ${data.match}
        </span>
        <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; color: rgba(0,0,0,.2);">
          ${data.key}
        </span>`;
      },
      highlight: true
    },
    events: {
      input: {
        focus: () => {
          if (autoCompleteJS.input.value.length) {
            autoCompleteJS.start();
          }
        }
      }
    },
    searchEngine: 'strict'
  });



  autoCompleteJS.input.addEventListener("selection", function (event) {
    const feedback = event.detail;
    autoCompleteJS.input.blur();
    // Prepare User's Selected Value
    const selection = feedback.selection.value[feedback.selection.key];
    // Replace Input value with the selected value
    autoCompleteJS.input.value = selection;
    // Console log autoComplete data feedback
    //alert(feedback.selection.value.id);
    document.getElementById("selectedinstitute").setAttribute("institute", feedback.selection.value.id); 
    document.getElementById("selectedinstitute").innerHTML = `${feedback.selection.value.institution} (${feedback.selection.value.id})`;
    loadAndStoreSettingsById(feedback.selection.value.id);
  });
});