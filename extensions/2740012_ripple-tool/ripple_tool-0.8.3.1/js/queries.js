const SEARCH_PARAM_OVERRIDES = {
  yahoo: "p",
  youtube: "search_query"
};

const DID_YOU_MEAN_LINK_TARGETS = {
  google: "omnient-visibility-control a",
  yahoo: "a.fc-denim",
  ask: ".spell-check-result-link[data-testid='link-button']",
  bing: "#sp_requery a",
  duckduckgo: "[data-testid='spelling-message'] a",
  ecosia: ".query-correction__corrected a",
  youtube: "a.yt-search-query-correction"
}

/**
 * Retrieves the search term from the URL params,
 * and cleans it for internal usage
 **/
export const getSearchTerm = (urlString = window.location.href) => {
  const searchParam = SEARCH_PARAM_OVERRIDES[searchEngine()] || "q";
  const url = new URL(urlString, window.location.origin);
  const searchTerm = url.searchParams.get(searchParam) || "";
  const result = searchTerm
  .trim()
  .toLowerCase()
  .replace(/\s+/g, " ")
  .replace(/[?#-.()<>+=/_* %$@!/\’"]/g, "")
  .split(" ")
  .filter(Boolean);

  return {
    result: result,
    searchTerm: searchTerm.trim().toLowerCase()
  };
}

export const matchingTrigger = async (searchTerm, triggers) =>{
  const searchTermString = searchTerm['result'].join(" ").toLowerCase();
  const searchTermDigest = await digestMessage(searchTermString);
  let locales = triggers[searchTermDigest];

  if (locales) {
    return {
      match: true,
      matched_by: true,
      searchStringData: searchTerm['searchTerm'],
      searchDigestData: searchTermDigest,
      locales
    };
  }

  // The search term itself didn't match, so we'll check if there
  // is a link to show other results
  const didYouMeanLink = document.querySelector(DID_YOU_MEAN_LINK_TARGETS[searchEngine()]);
  if (didYouMeanLink) {
    const href = didYouMeanLink.getAttribute("href");
    const correctedSearchTerm = getSearchTerm(href);
    const correctedSearchTermDigest = await digestMessage(correctedSearchTerm['result'].join(" ").toLowerCase());
    locales = triggers[correctedSearchTermDigest];

    return { 
      match: !!locales,
      matched_by: false,
      searchStringData: correctedSearchTerm['searchTerm'],
      searchDigestData: correctedSearchTermDigest,
      locales
    };
  }

  return { match: false };
}

const searchEngine = () => {
  const domain = window.location.hostname;
  const domainParts = domain.split(".");

  if (domainParts.includes("google")) return "google";
  if (domainParts.includes("yahoo")) return "yahoo";
  if (domainParts.includes("duckduckgo")) return "duckduckgo";
  if (domainParts.includes("bing")) return "bing";
  if (domainParts.includes("ask")) return "ask";
  if (domainParts.includes("ecosia")) return "ecosia";
  if (domainParts.includes("youtube")) return "youtube";
}

const digestMessage = async message => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message.toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  return hex;
}
