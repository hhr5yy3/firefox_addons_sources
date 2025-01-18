(function(){"use strict";const o=async t=>new Promise(e=>chrome.storage.local.get(t,n=>{n[t]?e(n[t]):e(null)})),a=async()=>{var s;const t=await o("captionSegmentStyles"),e=await o("captionWindowContainerStyles"),n=await o("captionWindowStyles");if((s=document.getElementById("better-yt-style"))==null||s.remove(),!t&&!e&&!n)return;const i=document.createElement("style");if(i.id="better-yt-style",document.head.appendChild(i),i.innerText=`${(t==null?void 0:t.length)>0?`.html5-video-player .ytp-caption-segment { ${t} }`:""} ${(e==null?void 0:e.length)>0?`.html5-video-player .ytp-caption-window-container { ${e} }`:""}	${(n==null?void 0:n.length)>0?`.html5-video-player .ytp-caption-window-bottom, .html5-video-player .ytp-caption-window-top { ${n} }`:""}`,await o("fontSizePref")){const l=parseInt(await o("fontSize"));i.innerText+=`
			#shorts-player .ytp-caption-segment {
				font-size: ${100+l}% !important;
			}

			#inline-preview-player .ytp-caption-segment {
				font-size: ${100+l/1.5}% !important;
			}`}};a(),chrome.runtime.onMessage.addListener(t=>{t.action==="updateSubtitles"&&a()})})();
