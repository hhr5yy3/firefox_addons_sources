var g=document.body.scrollWidth,y=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),H={top:({pageY:t})=>{o.style.borderTopWidth=t+"px"},right:({pageX:t})=>{o.style.borderRightWidth=g-t+"px"},bottom:({pageY:t})=>{o.style.borderBottomWidth=y-t+"px"},left:({pageX:t})=>{o.style.borderLeftWidth=t+"px"},"top-left":({pageX:t,pageY:e})=>{o.style.borderTopWidth=e+"px",o.style.borderLeftWidth=t+"px"},"top-right":({pageX:t,pageY:e})=>{o.style.borderRightWidth=g-t+"px",o.style.borderTopWidth=e+"px"},"bottom-left":({pageX:t,pageY:e})=>{o.style.borderBottomWidth=y-e+"px",o.style.borderLeftWidth=t+"px"},"bottom-right":({pageX:t,pageY:e})=>{o.style.borderRightWidth=g-t+"px",o.style.borderBottomWidth=y-e+"px"},"view-box":({pageX:t,pageY:e})=>{o.style.borderTopWidth=W-(b-e)+"px",o.style.borderBottomWidth=C+(b-e)+"px",o.style.borderRightWidth=E+(f-t)+"px",o.style.borderLeftWidth=S-(f-t)+"px"}};function v(t){let e=H[t];i(document.body,"mousemove",e),i(o.firstElementChild,"mousedown",x),p(window,"mouseup",()=>{document.body.removeEventListener("mousemove",e),o.style.cursor="default",o.lastElementChild.hidden=!1})}var b,f,W,E,C,S;function x({target:t,pageX:e,pageY:s}){b=s,f=e,W=+o.style.borderTopWidth.slice(-0,-2),E=+o.style.borderRightWidth.slice(-0,-2),C=+o.style.borderBottomWidth.slice(-0,-2),S=+o.style.borderLeftWidth.slice(-0,-2),v(t.className)}function M({currentTarget:t}){let e=o.firstElementChild,s=e.getBoundingClientRect(),r=innerHeight,c=s.height<=r;if(s.y<0&&e.scrollIntoView(),!c){let d=document.querySelector("header");n(d)||n(d.firstElementChild);let a=document.querySelector("nav");n(a)||n(a.firstElementChild);let h=document.querySelector("aside");n(h)||n(h.firstElementChild)}let l=e.getBoundingClientRect(),$={x:l.x+2,y:l.y,width:l.width-2,height:l.height};o.hidden=!0;let B=t.nextElementSibling.value;setTimeout(async()=>{function d(m){m.msg==="scroll"?scrollBy({top:m.top,behavior:"instant"}):m.msg==="deletePage"&&(document.querySelector(`option[value="${m.pageId}"]`)?.remove(),u(chrome.i18n.getMessage("selected_page_is_deleted")))}chrome.runtime.onMessage.addListener(d);let a=document.title,h={msg:"captureShot",coordinate:$,screenHeight:r,withinViewPort:c,pageId:B,pageTitle:a},w=await chrome.runtime.sendMessage(h);if(w.errCaused)return u(w.errCaused,"error");u(chrome.i18n.getMessage("screenshot_inserted")),u("screenshot inserted"),setTimeout(()=>document.querySelector("shot-cropper")?.remove(),8e3),chrome.runtime.onMessage.removeListener(d)},5)}function n(t){if(!t)return!0;let s=t.computedStyleMap().get("position").toString()==="static";return s||(t.style.position="static"),!s}function u(t,e){let s=o.nextElementSibling;s.className=e?"error":"",s.hidden=!1,s.textContent=t,setTimeout(()=>s.hidden=!0,5100)}var L=document.createElement("link");L.rel="stylesheet";L.href=chrome.runtime.getURL("/scripts/screenshot/shot-cropper.css");document.head.appendChild(L);var i=(t,e,s)=>t.addEventListener(e,s),p=(t,e,s)=>t.addEventListener(e,s,{once:!0});function R(t){return`<article class="overlay">
			<div class="view-box">
				<span class="top-left"></span>
				<span class="top-right"></span>
				<span class="bottom-left"></span>
				<span class="bottom-right"></span>
				<var class="left"></var>
				<var class="top"></var>
				<var class="right"></var>
				<var class="bottom"></var>
			</div>
			<div class="crop-action-wrapper" hidden>
				<div class="crop-action">
					<button class="capture">${chrome.i18n.getMessage("capture")}</button>
					<select>
						<option value="createPage">${chrome.i18n.getMessage("create_new_page")}</option>
						${t.map(e=>`<option value="${e.id}">${e.title}</option>`).join("")}
					</select>
					<button>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path fill="red" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
						</svg>
					</button>
				</div>
			</div>
		</article>
		<output hidden></output>`}async function V(){let{lastSectionId:t}=await chrome.storage.local.get("lastSectionId"),{[t]:e,lastPageId:s}=await chrome.storage.local.get([t,"lastPageId"]),r=document.createElement("shot-cropper");return r.innerHTML=R(e??[]),k(),T(r),r.querySelector("select").value=s,r}var o;function T(t){let e=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);o=t.firstElementChild,o.style.bottom=innerHeight-e+"px",o.style.borderBottomWidth=e+"px",o.style.cursor="crosshair"}function I({pageX:t,pageY:e}){let s=document.body.offsetWidth-t,r=document.body.scrollHeight;o.style.borderWidth=`${e}px ${s}px ${r}px ${t}px`;let c=o.firstElementChild;c.style.visibility="visible",i(c,"mousedown",x),v("bottom-right")}function k(){p(document.body,"mousedown",I),p(document.body,"mouseup",P)}function P(){getSelection().collapseToEnd();let t=o.lastElementChild.firstElementChild;i(t.firstElementChild,"click",M),i(t.lastElementChild,"click",()=>o.remove())}export{i as $on,p as $onO,V as createCropUI,o as overLay};
