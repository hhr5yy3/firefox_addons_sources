// loader.js

export function showLoader() {
  const loader = document.getElementById("load_cover");
  if (loader) {
    loader.classList.remove("hidden");
  } else {
    console.error("Loader element not found");
  }
}

export function hideLoader() {
  const loader = document.getElementById("load_cover");
  if (loader) {
    loader.classList.add("hidden");
  } else {
    console.error("Loader element not found");
  }
}

// Additional function to create the loader element if needed
export function createLoader(targetElement) {
  const loader = document.getElementById("load_cover");
  if (loader) {
    loader.remove();
  }

  const loaderHTML = ` <div id="load_cover">
  <div class="loaderInner">
    <div class="loader"></div>
    
  </div>
</div>`;

  const body = document.querySelector(targetElement);
  if (body) {
    body.insertAdjacentHTML("beforebegin", loaderHTML);
  } else {
    console.error("Body element not found");
  }
}
