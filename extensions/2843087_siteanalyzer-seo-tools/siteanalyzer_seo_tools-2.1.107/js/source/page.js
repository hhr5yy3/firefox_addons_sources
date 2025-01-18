const seoExtensionAPI = typeof browser !== "undefined" ? browser : chrome;

let data = {};
let isWholeFile;
let lineHeight = 0;
const listEl = document.querySelector("#list");
const sourceEl = document.querySelector("#srcview");
const codeEl = document.querySelector("#src code");
const draggable = document.querySelector("#drag");

const config = {
  beautify: true,
  tooltip: true,
  isredcount: true,
  colorize: true,
  caching: false,
  onclick: false,
  linenum: true,
  hilight: [
    "//www.google-analytics.com",
    "//ajax.googleapis.com",
    "//connect.facebook.net",
    "//widgets.twimg.com",
    "//platform.twitter.com",
  ],
};

const getConfig = (prop) => config?.[prop] ?? null;

let tabid;

window.addEventListener("load", function () {
  init();
});

const init = () => {
  tabid = parseInt(location.hash.slice(1));
  getPageData();
};

const getPageData = () => {
  if (seoExtensionAPI.tabs) {
    const showonclick = getConfig("onclick");
    seoExtensionAPI.tabs.sendMessage(tabid, { showonclick }, processData);
  }
};

function processData(res) {
  if (!res) {
    const err = seoExtensionAPI.runtime?.lastError;
    seoExtensionAPI.tabs.get(tabid, function (tab) {
      if (tab.status == "complete" && err) {
        codeEl.textContent =
          "Error: Access is denied to chrome:// and Chrome Store pages";
        return;
      }

      codeEl.textContent = "Page loading...";
      setTimeout(getPageData, 500);
    });
    return;
  } else if (res?.err) {
    document.body.classList.add("err");
    codeEl.textContent = res.err;
    return;
  }
  data = res;
  const url = getCleanUrl(res.url);
  document.title = "SRC " + url;

  const { js = [], css = [], json = [], other = [], html = [] } = data ?? {};
  const jsCount = js.length;
  const cssCount = css.length;
  const jsonCount = json.length;
  const otherCount = other.length;
  let jsInline = 0;
  let jsonInline = 0;
  let otherInline = 0;
  let cssInline = 0;
  let onClickCount = 0;

  for (let i = 0; i < html.length; i++) {
    const item = html[i];
    addItem("#htmllist", item, i);
    updateLiText(item);
  }

  for (let i = 0; i < jsCount; i++) {
    const item = js[i];
    addItem("#jslist", item, i);
    if (item.onclick) onClickCount += 1;
    else if (!item.src) jsInline += 1;
    updateLiText(item);
  }

  for (let i = 0; i < cssCount; i++) {
    const item = css[i];
    addItem("#csslist", item, i);
    if (!item.src) cssInline += 1;
    updateLiText(item);
  }

  for (let i = 0; i < jsonCount; i++) {
    const item = json[i];
    addItem("#jsonlist", item, i);
    if (item.onclick) onClickCount += 1;
    else if (!item.src) jsonInline += 1;
    updateLiText(item);
  }

  for (let i = 0; i < otherCount; i++) {
    const item = other[i];
    addItem("#otherlist", item, i);
    if (item.onclick) onClickCount += 1;
    else if (!item.src) otherInline += 1;
    updateLiText(item);
  }

  document.querySelector("#jstotal").innerHTML = jsCount - onClickCount;
  document.querySelector("#jsext").innerHTML =
    jsCount - onClickCount - jsInline;
  document.querySelector("#jsin").innerHTML = jsInline;
  document.querySelector("#csstotal").innerHTML = cssCount;
  document.querySelector("#cssext").innerHTML = cssCount - cssInline;
  document.querySelector("#cssin").innerHTML = cssInline;

  document.querySelector("#jsontotal").innerHTML = jsonCount;
  document.querySelector("#jsonext").innerHTML = jsonCount - jsonInline;
  document.querySelector("#jsonin").innerHTML = jsonInline;

  document.querySelector("#othertotal").innerHTML = otherCount;
  document.querySelector("#otherext").innerHTML = otherCount - otherInline;
  document.querySelector("#otherin").innerHTML = otherInline;

  codeEl.innerHTML = "<span>&nbsp;</span>";

  addHandlers();

  setTimeout(function () {
    const heightEl = codeEl.querySelector("span");
    if (heightEl) {
      lineHeight = heightEl.getBoundingClientRect().height;
    }
    document.querySelector("#htmllist li >a").click();
  }, 100);
}

const getCleanUrl = (url) => {
  if (url.startsWith("http://")) url = url.substr(7);
  else if (url.startsWith("https://")) url = url.substr(8);
  return url;
};

const addItem = (ol, item, index) => {
  const li = document.createElement("li");
  const { src, count, onclick, dynamic, inline = "" } = item ?? {};
  const a = document.createElement("a");
  const p = document.createElement("p");
  a.href = "#";
  if (src) {
    a.href = src;
    a.innerHTML = emphasizeName(src);
  } else if (count) {
    a.innerHTML = getCleanUrl(data.url);
  } else if (onclick) {
    a.innerHTML = `ONCLICK: <span>${inline.substr(0, 80)}</span>`;
  } else {
    a.innerHTML = `INLINE: <span>${inline.substr(0, 80)}</span>`;
  }

  li.append(a, p);

  if (!src) {
    li.classList.add("inline");
  }

  if (dynamic) li.classList.add("dynamic");
  if (src && configIsHilighted(src)) li.classList.add("hi");

  li.setAttribute("data-index", index);

  item.li = li;

  document.querySelector(ol).append(li);
};

const emphasizeName = (name) => {
  const url = getCleanUrl(name);
  const len = url.length;
  let i = url.lastIndexOf("/");
  let s;
  if (i === len - 1) {
    return url;
  } else if (i < 0) return "<b>" + url + "</b>";
  else return url.substr(0, i + 1) + "<b>&#8203;" + url.substr(i + 1) + "</b>";
};

const configIsHilighted = (url) => {
  var arr = getConfig("hilight");

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] && url.match(arr[i])) return true;
  }
  return false;
};

const updateLiText = (item, header) => {
  let s = "";
  if (item.src) {
    if (item.data != undefined)
      s = numberWithCommas(item.data.length) + " bytes";
  } else {
    s = numberWithCommas(item.inline.length) + " bytes";
  }

  if (item.imported) s += " <span class='dynamic'>@IMPORT</span>";
  else if (item.dynamic) s += " <span class='dynamic'>INJECTED</span>";

  if (item.count) {
    s += ", " + item.count + " nodes ";
  }

  if (header) {
    s += " <span class='cache'> " + header + "</span>";
  }

  item.li.querySelector("p").innerHTML = s;
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const addHandlers = () => {
  document.querySelectorAll("ol").forEach((list) => {
    list.querySelectorAll("a").forEach((a) => {
      const title = a.getAttribute("title");

      a.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (title) return;

        const li = a.closest("li");
        document.querySelectorAll("ol>li").forEach((item) => {
          item.classList.remove("sel");
        });
        li.classList.add("sel");

        isWholeFile = false;

        showSource(li);

        return false;
      });
    });
  });

  const beautify = document.querySelector("#beautify");
  beautify.addEventListener("click", () => {
    beautify.classList.toggle("sel");
    isWholeFile = false;
    showSource();
    return false;
  });

  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 66) {
      beautify.click();
    } else if (e.keyCode == 78) {
      document.body.classList.toggle("nolinenum");
      setTimeout(insertLineNumbers, 10);
    }
  });

  const css = getConfig("css");
  if (css) {
    const style = document.createElement("style");
    style.innerHTML = css;
    document.body.append(style);
  }

  if (getConfig("beautify")) {
    beautify.classList.add("sel");
  }

  if (getConfig("linenum")) document.body.classList.remove("nolinenum");
  else document.body.classList.add("nolinenum");

  window.addEventListener("scroll", () => {
    const top = window.scrollY;
    const bodyHeight = document.body.getBoundingClientRect().height;
    const windowHeight = window.innerHeight;
    if (top > 0 && bodyHeight <= windowHeight + top) {
      showSource(null, true);
    }
  });

  document.querySelector("#copy2clip").addEventListener("click", () => {
    document.body.classList.add("wait2");
    setTimeout(function () {
      const item = showSource(null, true);
      if (item) {
        const s = item.pretty || item.data || item.inline;
        copy2clipboard(s);
      }

      document.body.classList.remove("wait2");
    }, 10);

    return false;
  });

  draggable.addEventListener("mousedown", () => {
    const totalWidth = window.innerWidth;
    document.body.classList.add("rezizing");
    const resize = ({ clientX }) => {
      const newListWidth = (clientX / totalWidth) * 100;
      const newSourceWidth = 100 - newListWidth;

      listEl.style.width = `${newListWidth}%`;
      sourceEl.style.width = `${newSourceWidth}%`;
    };

    const stopResize = () => {
      window.removeEventListener("mousemove", resize);
      document.body.classList.remove("rezizing");
    };
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  });
};

const showSource = (el, showWholeFile) => {
  let li = el;
  if (!li) {
    li = document.querySelector("li.sel");
    if (!li) return;
  }

  const index = parseInt(li?.getAttribute("data-index") ?? -1);

  document.body.classList.remove("err");

  if (index < 0) return;

  let arr;
  const ol = li.closest("ol");
  let lang = "";
  const id = ol.getAttribute("id");
  if (id == "jslist") {
    arr = data.js;
    lang = "javascript";
  } else if (id == "htmllist") {
    arr = data.html;
    lang = "xml";
  } else if (id == "jsonlist") {
    arr = data.json;
    lang = "json";
  } else if (id == "otherlist") {
    arr = data.other;
    lang = "xml";
  } else {
    arr = data.css;
    lang = "css";
  }

  codeEl.classList.remove("language-javascript");
  codeEl.classList.remove("language-css");
  codeEl.classList.remove("language-xml");
  codeEl.classList.add("language-" + lang);

  const item = arr[index];

  if (item.src) {
    if (item.data != undefined) buildItem(item, lang, showWholeFile);
    else loadData(item);

    document.querySelector("#fname").innerHTML = item.src;
  } else {
    // inline node
    buildItem(item, lang, showWholeFile);
    document.querySelector("#fname").innerHTML = item.count
      ? `<a href="${data.url}" target="_blank" rel="noopener noreferrer">${data.url}</a>`
      : item.onclick
      ? "ONCLICK"
      : "INLINE";
  }

  if (!document.body.classList.contains("nolinenum")) {
    setTimeout(insertLineNumbers, 10);
  }

  return item;
};

const insertLineNumbers = () => {
  const numeredOl = document.querySelector("#src ol");
  numeredOl.innerHTML = "";
  const nums = [];

  const h = codeEl.getBoundingClientRect().height;
  const lineCount = !lineHeight ? 1 : h / lineHeight - 1;

  for (let i = 0; i < lineCount; i++) {
    nums.push(`<li style="height: ${lineHeight ?? 12}px;"></li>`);
  }

  numeredOl.innerHTML = nums.join("");
};

const buildItem = (item, lang, showWholeFile) => {
  if (isWholeFile) return;

  let s = item.data || item.inline;
  const MAX_SIZE = getConfig("limit_beauty") || 20000;

  if (!showWholeFile && s.length > MAX_SIZE) {
    s = s.substr(0, MAX_SIZE);
    isWholeFile = false;
  } else {
    isWholeFile = true;
  }

  const pos = window.scrollY;

  const onFinish = (txt) => {
    codeEl.innerHTML = txt;

    if (!isWholeFile) {
      const showMore = document.createElement("a");
      showMore.href = "#";
      showMore.setAttribute("id", "viewwhole");
      showMore.innerHTML = "View all";
      showMore.addEventListener("click", () => {
        showSource(null, true);
        return false;
      });
      codeEl.append("\n\n", showMore);
    }

    if (!showWholeFile) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, pos);
    }
  };

  if (document.querySelector("#beautify").classList.contains("sel")) {
    s = s.trim();
    if (lang.indexOf("css") >= 0) s = css_beautify(s);
    else if (lang.indexOf("xml") >= 0) s = html_beautify(s);
    else s = js_beautify(s);
  }

  item.pretty = s;

  if (getConfig("colorize")) {
    if (showWholeFile) document.body.classList.add("wait2");

    setTimeout(function () {
      hljs.configure({ classPrefix: "" });
      const result = hljs.highlight(lang, s, true);
      onFinish(hljs.fixMarkup(result.value));
      document.body.classList.remove("wait2");
    }, 10);
  } else {
    onFinish(s);
  }
};

const loadData = (item) => {
  document.body.classList.add("wait");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", item.src, true);

  xhr.onreadystatechange = function (event) {
    if (xhr.readyState == 4) {
      document.body.classList.remove("wait");

      if (xhr.status === 200) {
        // cache file content
        item.data = xhr.responseText;

        var header = null;
        if (getConfig("caching")) header = getCachingInfo(xhr);

        showSource();
        updateLiText(item, header);
      } else {
        document.body.classList.add("err");
        codeEl.innerHTML = "HTTP Error " + xhr.statu;
      }
    }
  };
  xhr.send(null);
};

const getCachingInfo = (xhr) => {
  let h = "Expires";
  let val = xhr.getResponseHeader(h);
  if (!val) {
    h = "Cache-Control";
    val = xhr.getResponseHeader(h);
  }
  if (!val) {
    h = "Age";
    val = xhr.getResponseHeader(h);
  }

  if (val) return h + ": " + val;
};

const copy2clipboard = (txt) => {
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state === "granted") {
      let blob = new Blob([txt], { type: "text/plain" });
      let item = new ClipboardItem({ "text/plain": blob });
      navigator.clipboard.write([item]).then(
        function () {
          console.debug("ok");
        },
        function (error) {
          console.error(error);
        }
      );
    } else {
      console.error("no permission");
    }
  });
};
