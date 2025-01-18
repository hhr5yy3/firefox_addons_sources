var scriptletGlobals = new Map();

{
  const config = {
    "load": function () {
      const scriptlets = document.documentElement.getAttribute("scriptlets");
      //
      if (scriptlets) {
        config.action(scriptlets);
        document.documentElement.removeAttribute("scriptlets");
      } else {
        config.observer = new MutationObserver(config.listener);
        config.observer.observe(document.documentElement, {"attributes": true});
      }
    },
    "listener": function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "attributes") {
          const scriptlets = mutation.target.getAttribute("scriptlets");
          //
          if (scriptlets) {
            config.action(scriptlets);
            config.observer.disconnect();
            mutation.target.removeAttribute("scriptlets");
          }
        }
      });
    },
    "action": function (scriptlets) {
      if (scriptlets) {
        import(scriptlets).then(module => {
          for (const scriptlet of module.builtinScriptlets) {
            //
            if (scriptlet.name === "adjust-setTimeout.js") {
              scriptlet.fn('[native code]', '17000', '0.001');
            }
            //
            if (scriptlet.name === "json-prune-xhr-response.js") {
              scriptlet.fn('playerAds adPlacements adSlots playerResponse.playerAds playerResponse.adPlacements playerResponse.adSlots [].playerResponse.adPlacements [].playerResponse.playerAds [].playerResponse.adSlots', '', 'propsToMatch', String.raw`/\/player(?:\?.+)?$/`);
            }
            //
            if (scriptlet.name === "remove-cache-storage-item.js") {
              scriptlet.fn('yt-appshell-assets', String.raw`/\/s\/desktop\/[0-9a-f]{8}\/(?:cs|j)sbin\//`); // extra
              scriptlet.fn('yt-appshell-assets', String.raw`/\/s\/player\/[0-9a-f]{8}\/(?:player_ias\.vflset\/|www-player\.css)/`); // extra
            }
            //
            if (scriptlet.name === "trusted-replace-xhr-response.js") {
              scriptlet.fn(String.raw`/"adPlacements.*?("adSlots"|"adBreakHeartbeatParams")/gms`, '$1', String.raw`/\/player(?:\?.+)?$/`);
              scriptlet.fn(String.raw`/"adPlacements.*?([A-Z]"\}|"\}{2,4})\}\],/`, '', String.raw`/playlist\?list=|\/player(?:\?.+)?$|watch\?[tv]=/`);
            }
            //
            if (scriptlet.name === "json-prune-fetch-response.js") {
              scriptlet.fn('playerAds adPlacements adSlots playerResponse.playerAds playerResponse.adPlacements playerResponse.adSlots [].playerResponse.adPlacements [].playerResponse.playerAds [].playerResponse.adSlots', '', 'propsToMatch', String.raw`/player?`);
              scriptlet.fn('reelWatchSequenceResponse.entries.[-].command.reelWatchEndpoint.adClientParams.isAd entries.[-].command.reelWatchEndpoint.adClientParams.isAd', '', 'propsToMatch', String.raw`url:/reel_watch_sequence?`);
              scriptlet.fn('playerAds adPlacements adSlots playerResponse.playerAds playerResponse.adPlacements playerResponse.adSlots', '', 'propsToMatch', String.raw`/playlist?`);
            }
            //
            if (scriptlet.name === "set-constant.js") {
              scriptlet.fn('yt.config_.EXPERIMENT_FLAGS.web_bind_fetch', 'false');
              //
              scriptlet.fn('playerResponse.adPlacements', 'undefined');
              scriptlet.fn('ytInitialPlayerResponse.adSlots', 'undefined');
              scriptlet.fn('ytInitialPlayerResponse.playerAds', 'undefined');
              scriptlet.fn('ytInitialPlayerResponse.adPlacements', 'undefined');
            }
            //
            if (scriptlet.name === "trusted-replace-node-text.js") {
              scriptlet.fn('script', '(function serverContract()', String.raw`/*START*/"YOUTUBE_PREMIUM_LOGO"!==ytInitialData?.topbar?.desktopTopbarRenderer?.logo?.topbarLogoRenderer?.iconImage?.iconType&&(location.href.startsWith("https://www.youtube.com/tv#/")||location.href.startsWith("https://www.youtube.com/embed/")||document.addEventListener("DOMContentLoaded",(function(){const t=()=>{const t=document.getElementById("movie_player");if(!t)return;if(!t.getStatsForNerds?.()?.debug_info?.startsWith?.("SSAP, AD"))return;const e=t.getProgressState?.();e&&e.duration>0&&(e.loaded<e.duration||e.duration-e.current>1)&&t.seekTo?.(e.duration)};t(),new MutationObserver((()=>{t()})).observe(document,{childList:!0,subtree:!0})})));(function serverContract()`, 'sedCount', '1');
            }
            //
            if (scriptlet.name === "trusted-replace-fetch-response.js") {
              scriptlet.fn(String.raw`/"adPlacements.*?([A-Z]"\}|"\}{2,4})\}\],/`, '', 'player?');
              scriptlet.fn(String.raw`/"adSlots.*?\}\}\],"adBreakHeartbeatParams/`, '"adBreakHeartbeatParams', 'player?');
              //
              if (typeof chrome !== 'undefined') {
                scriptlet.fn(String.raw`/(itag=.*?)"playerAds.*?\}\}\]\,/`, '$1', 'url:player?key='); // extra
                scriptlet.fn(String.raw`/(itag=.*?)"adSlots.*?\}\]\}\}\]\,/`, '$1', 'url:player?key='); // extra
                scriptlet.fn(String.raw`/(itag=.*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'url:player?key='); // extra
                scriptlet.fn(String.raw`/(trackingParam":"kx_fmPxh.*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'player?key='); // extra
                scriptlet.fn(String.raw`/(maxAgeSeconds.*?"loggedOut":[ft].*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'url:player?key='); // extra
                scriptlet.fn(String.raw`/"adPlacements.*?\/(aclk\?sa=L&ai=C[-_0-9A-Za-z]+__________|get_midroll_info\S+&token=ALH).*?"\}\}\}\]\,/`, '', 'url:player?key='); // extra
                scriptlet.fn(String.raw`/"adPlacements.*?\/(aclk\?sa=L&ai=C[-_0-9A-Za-z]+__________|get_midroll_info\S+&token=ALHj).*?"\}\}\}\]\,/`, '', 'url:player?key='); // extra
                scriptlet.fn(String.raw`/"adPlacements.*?\/(aclk\?sa=L&ai=C(?!3QQpfbUyZYWKL_)[-_0-9A-Za-z]+__________|get_midroll_info\S+&token=ALHj).*?"\}\}\}\]\,/`, '', 'url:player?key='); // extra
              }
              //
              scriptlet.fn(String.raw`/\"adSlots.*?\}\]\}\}\],/`, '', 'player?'); // extra
              scriptlet.fn(String.raw`/"adPlacements.*?([A-Z]"\}|"\}{2})\}\]\,/`, '', 'player?key='); // extra
              scriptlet.fn(String.raw`/(contextParams":"Q0F[A-Z]U.*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'player?key='); // extra
              scriptlet.fn(String.raw`/(contextParams":"Q0F[A-Z]U.*?)"adPlacements.*?([A-Z]"\}|"\}{2})\}\]\,/`, '$1', 'player?key='); // extra
              scriptlet.fn(String.raw`/(contextParams":"Q0F[A-Z]U.*?)"adPlacements.*?([^=]"\}\}|"\}\}\})\]\,/`, '$1', 'player?key='); // extra
              scriptlet.fn(String.raw`/((?:(?:&|%26)id(?:=|%3D)o-A[A-Z]|yt_live_broadcast).*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'player?key='); // extra
              scriptlet.fn(String.raw`/((?:(?:&|%26)id(?:=|%3D)o-A[A-Z]|yt_live_broadcast).*?)"adPlacements.*?([A-Z]"\}|"\}{2})\}\]\,/`, '$1', 'player?key='); // extra
              scriptlet.fn(String.raw`/((?:(?:&|%26)id(?:=|%3D)o-A[A-Z]|yt_live_broadcast).*?)"adPlacements.*?([^=]"\}\}|"\}\}\})\]\,/`, '$1', 'player?key='); // extra
              //
              scriptlet.fn(String.raw`/(source=.*?)"playerAds.*?\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(youtubei.*?)"playerAds.*?\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(GFEEDBACK.*?)"playerAds.*?\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/\"adPlacements.*?ytimg.*?\"\}\}\}\]\,/`, '', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(source=.*?)"adSlots.*?\}\]\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/\"playerAds.*?\}\}\]\,/`, '', 'url:player?key= method:/post/i'); // extra
              scriptlet.fn(String.raw`/(requiressl.*?)"playerAds.*?\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(youtubei.*?)"adSlots.*?\}\]\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(GFEEDBACK.*?)"adSlots.*?\}\]\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/\"adSlots.*?\}\]\}\}\]\,/`, '', 'url:player?key= method:/post/i'); // extra
              scriptlet.fn(String.raw`/(googlevideo.*?)"playerAds.*?\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(requiressl.*?)"adSlots.*?\}\]\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(source=.*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(googlevideo.*?)"adSlots.*?\}\]\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(videoplayback.*?)"playerAds.*?\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(youtubei.*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(GFEEDBACK.*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(videoplayback.*?)"adSlots.*?\}\]\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/\"playerAds.*?true.*?\}\}\]\,/`, '', 'url:player?key= method:/post/i'); // extra
              scriptlet.fn(String.raw`/\"adPlacements.*?\"\}\}\}\]\,/`, '', 'url:player?key= method:/post/i'); // extra
              scriptlet.fn(String.raw`/(requiressl.*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(googlevideo.*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/\"adSlots.*?true.*?\}\]\}\}\]\,/`, '', 'url:player?key= method:/post/i'); // extra
              scriptlet.fn(String.raw`/"playerAds.*?gutParams":\{"tag":"\\.*?\}\}\]\,/`, '', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/(videoplayback.*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/"adSlots.*?SLOT_TYPE_PLAYER_BYTES.*?\}\]\}\}\]\,/`, '', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/("mimeType":"[^"]{3,}".*?)"playerAds.*?\}\}\],/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/("mimeType":"[^"]{3,}".*?)"adSlots.*?\}\]\}\}\],/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/\"playerAds.*?\}\}\]\,/`, '', 'url:player?key= method:/post/i bodyUsed:true'); // extra
              scriptlet.fn(String.raw`/("lastModified":"[^"]{3}.*?)"playerAds.*?\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/\"adPlacements.*?true.*?\"\}\}\}\]\,/`, '', 'url:player?key= method:/post/i'); // extra
              scriptlet.fn(String.raw`/"adPlacements.*?AD_PLACEMENT_KIND_END.*?\"\}\}\}\]\,/`, '', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/\"playerAds.*?\"enabledEngageTypes\":\"\d.*?\}\}\]\,/`, '', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/"adPlacements.*?AD_PLACEMENT_KIND_START.*?"\}\}\}\]\,/`, '', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/("lastModified":"[^"]{3}.*?)"adSlots.*?\}\]\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/\"adSlots.*?\}\]\}\}\]\,/`, '', 'url:player?key= method:/post/i bodyUsed:true'); // extra
              scriptlet.fn(String.raw`/("mimeType":"[^"]{3,}".*?)"adPlacements.*?"\}\}\}\],/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/("lastModified":"[^"]{3}.*?)"adPlacements.*?"\}\}\}\]\,/`, '$1', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/\"adPlacements.*?\"\}\}\}\]\,/`, '', 'url:player?key= method:/post/i bodyUsed:true'); // extra
              scriptlet.fn(String.raw`/"adSlots.*?SLOT_TRIGGER_EVENT_BEFORE_CONTENT.*?\}\]\}\}\]\,/`, '', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/"playerAds.*?"enabledEngageTypes":"(\d{1,2},)+\d".*?\}\}\],/`, '', 'url:player?key='); // extra
              scriptlet.fn(String.raw`/"playerAds.*?"enabledEngageTypes":"(\d{1,2},){5}\d".*?\}\}\],/`, '', 'url:player?key='); // extra
            }
          }
        });
      }
    }
  };
  //
  config.load();
}
