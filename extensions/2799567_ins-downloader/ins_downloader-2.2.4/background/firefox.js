"use strict";
(() => {
  // src/constants.ts
  var CONFIG_LIST = [
    "setting_show_open_in_new_tab_icon",
    "setting_enable_threads",
    "setting_enable_video_controls",
    "setting_format_replace_jpeg_with_jpg",
    "setting_format_use_hash_id"
  ];

  // src/background/fn.ts
  async function saveHighlights(jsonData) {
    if (Array.isArray(jsonData.data?.xdt_api__v1__feed__reels_media__connection?.edges)) {
      const data = jsonData.data.xdt_api__v1__feed__reels_media__connection.edges.map((i) => i.node);
      const { highlights_data } = await chrome.storage.local.get(["highlights_data"]);
      const newMap = new Map(highlights_data);
      data.forEach((i) => newMap.set(i.id, i));
      await chrome.storage.local.set({ highlights_data: [...newMap] });
      saveStoriesToLocal(data);
    }
  }
  async function saveReels(jsonData) {
    if (Array.isArray(jsonData.data?.xdt_api__v1__clips__home__connection_v2?.edges)) {
      const data = jsonData.data.xdt_api__v1__clips__home__connection_v2.edges.map((i) => i.node.media);
      const { reels_edges_data } = await chrome.storage.local.get(["reels_edges_data"]);
      const newMap = new Map(reels_edges_data);
      data.forEach((i) => newMap.set(i.code, i));
      await chrome.storage.local.set({ reels_edges_data: [...newMap] });
    }
  }
  async function saveProfileReel(jsonData) {
    if (Array.isArray(jsonData.data?.xdt_api__v1__clips__user__connection_v2?.edges)) {
      const data = jsonData.data.xdt_api__v1__clips__user__connection_v2.edges.map((i) => i.node.media);
      const { profile_reels_edges_data } = await chrome.storage.local.get(["profile_reels_edges_data"]);
      const newMap = new Map(profile_reels_edges_data);
      data.forEach((i) => newMap.set(i.code, i));
      await chrome.storage.local.set({ profile_reels_edges_data: [...newMap] });
    }
  }
  async function saveStories(jsonData) {
    if (Array.isArray(jsonData.data?.xdt_api__v1__feed__reels_media?.reels_media)) {
      const data = jsonData.data.xdt_api__v1__feed__reels_media.reels_media;
      saveStoriesToLocal(data);
    }
  }
  async function saveStoriesToLocal(data) {
    const { stories_reels_media } = await chrome.storage.local.get(["stories_reels_media"]);
    const newMap = new Map(stories_reels_media);
    data.forEach((i) => newMap.set(i.id, i));
    await chrome.storage.local.set({ stories_reels_media: [...newMap] });
  }

  // src/background/firefox.ts
  browser.runtime.onInstalled.addListener(async () => {
    const result = await chrome.storage.sync.get(CONFIG_LIST);
    CONFIG_LIST.forEach((i) => {
      if (result[i] === void 0) {
        browser.storage.sync.set({
          [i]: true
        });
      }
    });
  });
  browser.runtime.onStartup.addListener(() => {
    browser.storage.local.set({ stories_user_ids: [], id_to_username_map: [] });
  });
  async function listenInstagram(details, jsonData) {
    switch (details.url) {
      case "https://www.instagram.com/api/graphql":
        saveStories(jsonData);
        break;
      case "https://www.instagram.com/graphql/query":
        saveHighlights(jsonData);
        saveReels(jsonData);
        saveStories(jsonData);
        saveProfileReel(jsonData);
        break;
      default:
        if (details.url.startsWith("https://www.instagram.com/api/v1/feed/reels_media/?reel_ids=")) {
          const { reels, reels_media } = await browser.storage.local.get(["reels", "reels_media"]);
          const newArr = (reels_media || []).filter(
            (i) => !jsonData.reels_media.find((j) => j.id === i.id)
          );
          await browser.storage.local.set({
            reels: Object.assign({}, reels, jsonData.reels),
            reels_media: [...newArr, ...jsonData.reels_media]
          });
        }
        break;
    }
  }
  function findValueByKey(obj, key) {
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        if (property === key) {
          return obj[property];
        } else if (typeof obj[property] === "object") {
          const result = findValueByKey(obj[property], key);
          if (result !== void 0) {
            return result;
          }
        }
      }
    }
  }
  async function listenThreads(details, jsonData) {
    async function addThreads(data) {
      const { threads } = await browser.storage.local.get(["threads"]);
      const newMap = new Map(threads);
      for (const item of data) {
        const code = item?.post?.code;
        if (code) {
          newMap.set(code, item);
        }
      }
      await browser.storage.local.set({ threads: Array.from(newMap) });
    }
    if (details.url === "https://www.threads.net/api/graphql") {
      if (Array.isArray(jsonData.data?.feedData?.edges)) {
        const data = jsonData.data.feedData.edges.map((i) => i.node?.text_post_app_thread?.thread_items || i.node?.thread_items || i.text_post_app_thread?.thread_items).flat();
        await addThreads(data);
      }
      if (Array.isArray(jsonData.data?.mediaData?.edges)) {
        const data = jsonData.data.mediaData.edges.map((i) => i.node.thread_items).flat();
        await addThreads(data);
      }
      if (Array.isArray(jsonData.data?.data?.edges)) {
        const data = jsonData.data.data.edges.map((i) => i.node.thread_items).flat();
        await addThreads(data);
      }
      if (typeof jsonData.data?.replyPost === "object") {
        await addThreads([jsonData.data.replyPost]);
      }
      if (Array.isArray(jsonData.data?.searchResults?.edges)) {
        const data = jsonData.data.searchResults.edges.map((i) => i.node.thread.thread_items).flat();
        await addThreads(data);
      }
    }
    if (details.url === "https://www.threads.net/ajax/route-definition/") {
      const result = findValueByKey(jsonData, "searchResults");
      if (result && Array.isArray(result.edges)) {
        await addThreads(result.edges.map((i) => i.node.thread.thread_items).flat());
      }
    }
  }
  function listener(details) {
    const filter = browser.webRequest.filterResponseData(details.requestId);
    const decoder = new TextDecoder("utf-8");
    const encoder = new TextEncoder();
    const data = [];
    filter.ondata = (event) => {
      data.push(event.data);
    };
    filter.onstop = async () => {
      let str = "";
      if (data.length === 1) {
        str = decoder.decode(data[0]);
      } else {
        for (let i = 0; i < data.length; i++) {
          const stream = i !== data.length - 1;
          str += decoder.decode(data[i], { stream });
        }
      }
      try {
        const jsonData = JSON.parse(str);
        listenInstagram(details, jsonData);
        listenThreads(details, jsonData);
      } catch {
        try {
          if (details.url === "https://www.instagram.com/ajax/bulk-route-definitions/") {
            const {
              payload: { payloads }
            } = JSON.parse(str.split(/\s*for\s+\(;;\);\s*/)[1]);
            const { stories_user_ids, id_to_username_map } = await browser.storage.local.get(["stories_user_ids", "id_to_username_map"]);
            const nameToId = new Map(stories_user_ids);
            const idToName = new Map(id_to_username_map);
            for (const [key, value] of Object.entries(payloads)) {
              if (key.startsWith("/stories/")) {
                const { rootView } = value.result.exports;
                nameToId.set(key.split("/")[2], rootView.props.user_id);
                idToName.set(rootView.props.user_id, key.split("/")[2]);
              }
            }
            browser.storage.local.set({ stories_user_ids: Array.from(nameToId), id_to_username_map: Array.from(idToName) });
          }
          if (details.url === "https://www.threads.net/ajax/route-definition/" && str.includes("searchResults")) {
            str.split(/\s*for\s+\(;;\);\s*/).filter((_) => _).map((i) => listenThreads(details, JSON.parse(i)));
          }
        } catch {
        }
      }
      filter.write(encoder.encode(str));
      filter.close();
    };
  }
  browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      try {
        const { method, url } = details;
        const { pathname } = new URL(url);
        if (method === "GET" && pathname.startsWith("/api/v1/feed/user/") && pathname.endsWith("/username/")) {
          listener(details);
        }
        if (method === "GET" && url.startsWith("https://www.instagram.com/api/v1/feed/reels_media/?reel_ids=")) {
          listener(details);
        }
        if (method === "POST" && url === "https://www.instagram.com/api/graphql") {
          listener(details);
        }
        if (method === "POST" && url === "https://www.instagram.com/graphql/query") {
          listener(details);
        }
        if (method === "POST" && url === "https://www.instagram.com/ajax/bulk-route-definitions/") {
          listener(details);
        }
        if (method === "POST" && url === "https://www.threads.net/api/graphql") {
          listener(details);
        }
        if (method === "POST" && url === "https://www.threads.net/ajax/route-definition/") {
          listener(details);
        }
      } catch {
      }
    },
    { urls: ["https://www.instagram.com/*", "https://www.threads.net/*"] },
    ["blocking"]
  );
  browser.runtime.onInstalled.addListener(async () => {
    if (!await browser.permissions.contains({
      origins: ["https://www.instagram.com/*", "https://www.threads.net/*"]
    })) {
      await browser.runtime.openOptionsPage();
    }
  });
  browser.runtime.onMessage.addListener((message, sender) => {
    console.log(message, sender);
    const { type, data } = message;
    if (type === "open_url") {
      browser.tabs.create({ url: data, index: sender.tab.index + 1 });
    }
  });
})();
