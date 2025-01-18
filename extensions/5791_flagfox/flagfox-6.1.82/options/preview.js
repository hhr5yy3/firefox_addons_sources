"use strict";

const Flagfox = browser.extension.getBackgroundPage();  // NOTE: This fetches access to the global object for the background scripts (all praise the sync access!!!)

let countriesArray = null;

//BEGIN LOADING/UNLOADING *****************************************************
//{{{

window.addEventListener("load", function() {
    assert(!!parent, "Missing parent document. This page can only be loaded as a subdocument of the main config.html page.");

    Promise.all([
        Flagfox.getFullCountriesList(),
        Flagfox.loadPageI18N(document)
    ])
    .then(([list]) => {
        countriesArray = list.filter(([code]) => !no_unique_flag.has(code))  // Skip special entries and territories without their own flags (from flagsort.js)
                             .map(([code,name]) => ({ code, name, flagsrc : Flagfox.iconPath("flags/" + code.toLowerCase()) }));
        sortFlags();
    })
    .then(parent.onLightboxLoaded);

    disableContextMenu();

    addElementEventListener("sortFlags",   "change", (event => sortFlags(event.target.value)));
    addElementEventListener("closeButton", "click",  parent.closeLightbox);
});

defineLazyGetter(this, "countriesIndex", function() {  // Creates and caches index of country entries by code:  countriesIndex[code] = {code,name,flagsrc}
    let index = new Map();
    for (let entry of countriesArray)
        index.set(entry.code, entry);  // Just points to data sitting in countriesArray
    return index;
});

function updatePreview(sortedArray) {
    let newPreview = document.createElement("div");
    newPreview.setAttribute("id", "previewsetbox");
    for (let entry of sortedArray) {
        let image = document.createElement("img");
        image.setAttribute("id", "flag:" + entry.code);
        image.setAttribute("class", "previewicon");
        image.setAttribute("src", entry.flagsrc);
        image.setAttribute("title", entry.name + " (" + entry.code + ")");  // TODO: Add back AR, but with a less-imprecise measurement
        image.onclick = lookupCountry;
        newPreview.appendChild(image);
    }
    let previewBox = document.getElementById("preview");
    let currentPreview = document.getElementById("previewsetbox");
    previewBox.removeChild(currentPreview);
    previewBox.appendChild(newPreview);
}

//}}}
//BEGIN SORTING ***************************************************************
//{{{

function doRuntimeSort(p) {  // Processing the alphabetization is more than fast enough to not need a precache
    updatePreview(countriesArray.sort((a,b) => a[p].localeCompare(b[p])));  // Array.sort() reorders in-place
}

function loadPrecachedSort(list) {  // Convert pre-sorted list from flagsort.js to an array of country codes
    updatePreview(list.splitChunks(2).map(c => countriesIndex.get(c)));  // Array.map() creates a new array
}

// Sorting by code and name is done at runtime. Sorts by ratio and color are loaded from a previously generated file.
// mozIColorAnalyzer was used in older versions, but that isn't available to a WebExtension.
// Loading a precached sort is also faster and better color sorting options exist.
function sortFlags(order) {
    switch (order) {
        default:
        case "code":
            doRuntimeSort("code");  // Sort by codes doesn't vary with locale or change with flag updates
            return;
        case "name":
            doRuntimeSort("name");  // Will vary based on current locale used for strings
            return;
        case "ratio":
            loadPrecachedSort(flags_sorted_by_ratio);
            return;
        case "color":
            loadPrecachedSort(flags_sorted_by_color);  // Sorted by xyY colorspace coordinate, in reverse order (much better than RGB/HSL/CMY/etc. sort)
            return;
    }
}

//}}}
//BEGIN CLICK HANDLING ********************************************************
//{{{

function lookupCountry(event) {
    return Flagfox.lazyLoadPropertiesFile("countrynames").then(() => {
        const {template} = Flagfox.actions.getDefaultActionByName("Wikipedia: Country");
        const countryCode = event.target.id.suffixAfter(":");
        const countryName = Flagfox.getLoadedString(countryCode);
        const wikipediaURL = Flagfox.cleanTemplateAsURL(template,countryName);
        return Flagfox.openURL(wikipediaURL,"tabF");
    });
}

//}}}
