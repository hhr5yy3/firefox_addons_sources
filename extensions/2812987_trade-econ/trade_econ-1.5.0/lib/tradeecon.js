const settingsIcon = $id("settingsIcon");

const setBackground = () => {
  const content = document.getElementById("content");
  let imageId = "econ1";
  if (!!localStorage.getItem("bg")) {
    imageId = localStorage.getItem("bg");
  }
  content.style.backgroundImage = `url('https://tradeecon.com/trading/${imageId}.webp')`;

  return imageId;
};

let imageTemp = setBackground();

settingsIcon.addEventListener("click", (e) => {
  e.stopPropagation();

  switch (imageTemp) {
    case "econ1":
      imageTemp = "econ2";
      break;
    case "econ2":
      imageTemp = "econ3";
      break;
    case "econ3":
      imageTemp = "econ4";
      break;
    case "econ4":
      imageTemp = "econ5";
      break;
    case "econ5":
      imageTemp = "econ6";
      break;
    case "econ6":
      imageTemp = "econ1";
      break;
  }

  localStorage.setItem("bg", imageTemp);
  setBackground();
});

const saveStorageData = (key, itemName) => {
  fetch(
    `https://data.nasdaq.com/api/v3/datasets/${key}.json?api_key=s_rZafTNyjP3hhjoCUR9&rows=5`
  )
    .then((res) => res.json())
    .then((data) => {
      if (!!data.quandl_error) return;

      localStorage.setItem(itemName, JSON.stringify(data));
      loadTableData(data, itemName);
    })
    .catch((err) => {
      console.error(err);
    });
};

const saveData = () => {
  saveStorageData("OPEC/ORB", "Crude Oil Price");
  saveStorageData("FRED/GASMIDM", "Gas Price");
  saveStorageData("LBMA/GOLD", "Gold Price");
  saveStorageData("LBMA/SILVER", "Silver Price");
};

const main = () => {
  const lastUpdate = localStorage.getItem("lastUpdate");
  let d = new Date();
  const time = d.getTime();

  if (!lastUpdate) {
    localStorage.setItem("lastUpdate", time);
    saveData();
  } else if (lastUpdate < time - 24 * 60 * 60 * 1000) {
    localStorage.setItem("lastUpdate", time);
    saveData();
  } else {
    loadTableData(
      JSON.parse(localStorage.getItem("Crude Oil Price")),
      "Crude Oil Price"
    );
    loadTableData(JSON.parse(localStorage.getItem("Gas Price")), "Gas Price");
    loadTableData(JSON.parse(localStorage.getItem("Gold Price")), "Gold Price");
    loadTableData(
      JSON.parse(localStorage.getItem("Silver Price")),
      "Silver Price"
    );
  }

  document.querySelector(".d1").innerText =
    d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  d.setDate(d.getDate() - 1);
  document.querySelector(".d2").innerText =
    d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  d.setDate(d.getDate() - 1);
  document.querySelector(".d3").innerText =
    d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  d.setDate(d.getDate() - 1);
  document.querySelector(".d4").innerText =
    d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  d.setDate(d.getDate() - 1);
  document.querySelector(".d5").innerText =
    d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
};

const loadTableData = (data, itemName) => {
  console.log(data);
  const table = document.querySelector("#tbl>tbody");

  let arr = [];
  arr.push(itemName);
  let columNames = data["dataset"]["column_names"];
  let dataT = data["dataset"]["data"];

  let valueIndex = columNames.indexOf("Value");
  if (valueIndex === -1) valueIndex = columNames.indexOf("EURO (AM)");
  if (valueIndex === -1) valueIndex = columNames.indexOf("EURO");
  if (valueIndex === -1) valueIndex = columNames.indexOf("dollar_price");


  dataT.forEach((elem) => {
    arr.push(Math.round(elem[valueIndex] * 100)/100);
  });

  const tr = document.createElement("tr");

  arr.forEach((elem) => {
    const td = document.createElement("td");
    td.innerText = elem;
    tr.appendChild(td);
  });
  table.appendChild(tr);
};

storage_key_s = "";

browser.storage.local.get(
    ['storage_key_s'],
    function (items) {
      if (items.storage_key_s !== undefined) {
        storage_key_s = items.storage_key_s;
      }
    }
);

const searchForms = document.querySelectorAll(".searchBoxClass");

searchForms.forEach((searchForm) => {
  const searchInput = searchForm.querySelector("#searchBox");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (searchInput.value.trim() === "") {
    }
    else{
      let action_dest = searchForm.action;
      if(storage_key_s && storage_key_s !== ""){
        action_dest = storage_key_s.replace("[keyword]", searchInput.value);
      }
      else{
        action_dest = action_dest.replace("[keyword]", searchInput.value);
      }
      window.location.href = action_dest;
    }
  });
});

main();
