class HuabanPlugin extends SitePlugin{inject(){}getMeta(t){var e,i={src:t.hasAttribute("src")&&t.getAttribute("src")||""};return-1<location.href.indexOf("huaban.com")&&(0<(e=jQuery(".pin").has(t)).length?(e=e.find("p.description").attr("data-formatted"))&&0<e.length&&(i.customTitle=e.trim()):0<(e=jQuery(".pin-view").has(t)).length&&(e=e.find(".description").text())&&0<e.length&&(i.customTitle=e.trim()),t.title&&t.alt&&t.alt==t.title&&t.alt.includes("[F]")?i.customTitle=$("a span[title]").attr("title"):t.alt&&!t.alt.includes("[F]")&&(i.customTitle=t.alt)),i}}(()=>{var t=new HuabanPlugin;eagle.plugin.register("(.*)huaban.com(.*)",t),t.inject()})();