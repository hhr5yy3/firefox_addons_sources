/**
 * @typedef {Object} ImageInfo
 * @property {number} id
 * @property {string} src
 * @property {string} alt
 * @property {string} title
 * @property {number} width
 * @property {number} height
 * @property {boolean} [ok]
 * @property {number} [status]
 * @property {string} [type]
 * @property {number} [size]
 */

/** @type {ImageInfo[]} */
const imagesStorage = [];

const emptyData = () =>
  `<span data-translation="empty">${translate("empty")}</span>`;

const getSeparatorElement = () => {
  const separator = document.createElement("span");
  separator.innerHTML = " | ";

  return separator;
};

const getImageInfoLoader = () => {
  return '<img src="./res/loader.gif" class="loader">';
};

/**
 * @param {string} src
 * @returns {string}
 */
function formatImageSrc(src) {
  if (src.length < 120) return src;

  const start = src.substring(0, 60);
  const end = src.substring(src.length - 60);

  return `${start}…${end}`;
}

/**
 * @param {ImageInfo} image
 * @returns {HTMLElement}
 */
function generateImageElement(image) {
  const imageElement =
    document.querySelector(`#${image.id}`) || document.createElement("div");
  imageElement.classList.add("image-item");
  imageElement.id = image.id;
  imageElement.innerHTML = "";

  const imageWrapperLink = document.createElement("a");
  imageWrapperLink.href = image.src;
  imageWrapperLink.title = image.title;
  imageWrapperLink.target = "_blank";
  imageWrapperLink.classList.add("image-item__link-wrapper");

  const imagePreview = document.createElement("img");
  imagePreview.classList.add("image-item__preview");
  imagePreview.setAttribute(
    "src",
    image.ok ? image.src : "./res/image-not-found.png"
  );
  imagePreview.setAttribute("alt", image.alt);
  imagePreview.setAttribute("title", image.title);

  imageWrapperLink.append(imagePreview);
  imageElement.append(imageWrapperLink);

  const imageInfo = document.createElement("div");
  imageInfo.classList.add("image-item__info");

  const imageLink = document.createElement("div");
  imageLink.classList.add("image-item__link");

  const formattedSrc = formatImageSrc(image.src);
  imageLink.innerHTML = `<a href="${image.src}" target="_blank">${formattedSrc}</a>`;

  imageInfo.append(imageLink);

  const status = document.createElement("span");
  status.setAttribute("data-translation", "imageStatus");
  status.innerHTML = `${translate("imageStatus")}: ${
    image.status ?? getImageInfoLoader()
  }`;

  const type = document.createElement("span");
  type.setAttribute("data-translation", "imageType");
  type.innerHTML = `${translate("imageType")}: ${
    image.type ?? getImageInfoLoader()
  }`;

  const weight = document.createElement("span");
  weight.setAttribute("data-translation", "imageWeight");
  weight.innerHTML = `${translate("imageWeight")}: ${
    image.size !== null ? image.size + ` <span data-translation="kb">${translate("kb")}</span>` : getImageInfoLoader()
  }`;

  const sizes = document.createElement("span");
  sizes.innerHTML = `WxH: ${image.width}x${image.height}`;

  const blobInfo = document.createElement("div");
  blobInfo.append(
    status,
    getSeparatorElement(),
    type,
    getSeparatorElement(),
    weight,
    getSeparatorElement(),
    sizes
  );

  imageInfo.append(blobInfo);

  const title = image.title || emptyData();
  const imageTitle = document.createElement("div");
  imageTitle.innerHTML = `<span>Title:</span> ${title}`;

  const alt = image.alt || emptyData();
  const imageAlt = document.createElement("div");
  imageAlt.innerHTML = `<span>Alt:</span> ${alt}`;

  imageInfo.append(imageTitle, imageAlt);
  imageElement.append(imageInfo);

  return imageElement;
}

function renderImages(filter = null) {
  const imagesList = document.querySelector(".images-list");
  imagesList.innerHTML = "";

  const imagesWithoutAlt = imagesStorage.filter((image) => !image.alt);
  const imagesWithoutTitle = imagesStorage.filter((image) => !image.title);

  print("images-all-count", imagesStorage.length);
  print("images-without-alt", imagesWithoutAlt.length);
  print("images-without-title", imagesWithoutTitle.length);
  print("images-size-all-count", imagesStorage.length);

  /** @type {ImageInfo[]} */
  let imagesForRender;
  switch (filter) {
    case "all":
      imagesForRender = imagesStorage;
      break;
    case "alt":
      imagesForRender = imagesStorage.filter((image) => !image.alt);
      break;
    case "title":
      imagesForRender = imagesStorage.filter((image) => !image.title);
      break;
    case "404":
      imagesForRender = imagesStorage.filter((image) => !image.ok);
      break;
    case "size":
      imagesForRender = [...imagesStorage];
      imagesForRender.sort((a, b) => b.size - a.size);
      break;
    default:
      imagesForRender = imagesStorage;
      break;
  }

  const imagesWithoutOk = [];
  imagesForRender.forEach((image) => {
    imagesList.append(generateImageElement(image));
    getImageInfo(image).then((image) => {
      generateImageElement(image);
      if (!image.ok) {
        imagesWithoutOk.push(image);
        print("images-not-found", imagesWithoutOk.length);
      }
    });
  });
}

async function getImageInfo(image) {
  if (image.status) return image;

  const response = await fetch(image.src, {
    signal: AbortSignal.timeout(5000),
  }).catch(() => null);

  image.ok = response?.ok || false;

  if (!response || !response.ok) {
    image.status = response?.status || 500;
    image.size = 0;
    image.type = emptyData();

    return image;
  }

  image.status = response.status;

  const blob = await response.blob();

  const type = blob.type;
  const weightKb = (blob.size / 1024).toFixed(2);

  image.size = weightKb;
  image.type = type;

  return image;
}

function getAllImages() {
  return executeOnActiveTab(() => {
    const images = Array.from(document.querySelectorAll("img"));

    return images.map((image, index) => ({
      id: `image-${index}`,
      src: image.src,
      alt: image.alt,
      title: image.title,
      width: image.naturalWidth,
      height: image.naturalHeight,
    }));
  });
}

function exportAllImagesToCSV() {
  if (!imagesStorage.length) return;

  const rowsFormatted = imagesStorage.map((image) => [
    image.src,
    image.alt,
    image.title,
    image.status,
    clearHTML(image.type),
    image.size,
    `${image.width}x${image.height}`,
  ]);

  rowsFormatted.unshift([
    translate("Src"),
    translate("Alt"),
    translate("Title"),
    translate("imageStatus"),
    translate("imageType"),
    translate("imageWeight") + ` <span data-translation="kb">${translate("kb")}</span>`,
    translate("WxH"),
  ]);

  rowsFormatted.push([]);
  rowsFormatted.push(['Created by SiteAnalyzer SEO Tools']);

  let csvContent =
    "data:text/csv;charset=utf-8,\uFEFF" +
    rowsFormatted.map((e) => e.join(";")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.hidden = true;
  document.body.appendChild(link);

  executeOnActiveTab(() => {
    return location.hostname;
  }).then((hostname) => {
    link.setAttribute(
      "download",
      `${punycode.ToUnicode(hostname)}_export_images.csv`
    );
    link.click();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getAllImages().then((images) => {
    images.forEach((image) => imagesStorage.push(image));

    const imagesWithoutAlt = imagesStorage.filter((image) => !image.alt);
    const imagesWithoutTitle = imagesStorage.filter((image) => !image.title);

    print("images-all-count", imagesStorage.length);
    print("images-without-alt", imagesWithoutAlt.length);
    print("images-without-title", imagesWithoutTitle.length);
    print("images-size-all-count", imagesStorage.length);
  });

  document
    .querySelector("#export-images-to-csv-button")
    .addEventListener("click", () => {
      exportAllImagesToCSV();
    });
});

document.addEventListener("ImagesTabOpened", () => {
  renderImages();

  /** @type {HTMLElement[]} */
  const filterButtons = document.querySelectorAll("[data-images-filter]");

  filterButtons.forEach((button) => {
    button.onclick = () => {
      filterButtons.forEach((b) => b.classList.remove("item--selected"));
      button.classList.add("item--selected");
      const filter = button.getAttribute("data-images-filter");
      renderImages(filter);
    };
  });
});
