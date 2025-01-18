var a=chrome.i18n.getMessage.bind(chrome.i18n),l;function d(t){let e=t.target;e===document.body||e.classList.contains("one-clipped")||e.parentElement.tagName==="CLIP-ARTICLE-BTN"||!e.innerText||(l=setTimeout(()=>{e.style.backgroundColor="var(--clip-content-bgc)",e.style.outline="1px dashed red"},200))}function m(t){l&&clearTimeout(l);let e=t.target;e===document.body||e.classList.contains("one-clipped")||e.parentElement.tagName==="CLIP-ARTICLE-BTN"||!e.innerText||(e.style.backgroundColor="unset",e.style.outline="none")}function p(t){let e=t.target;e.parentElement.tagName!=="CLIP-ARTICLE-BTN"&&(e.style.backgroundColor="var(--oc-selected-text)",e.classList.toggle("one-clipped"),n?.isConnected||v())}function g(){document.body.addEventListener("mouseout",m),document.body.addEventListener("mouseover",d),document.body.addEventListener("mousedown",p)}g();function b(t){document.body.removeEventListener("mouseout",m),document.body.removeEventListener("mouseover",d),document.body.removeEventListener("mousedown",p);let e=document.body.querySelectorAll(".one-clipped");for(let o of e)o.classList.remove("one-clipped"),o.style.backgroundColor="unset",o.style.outline="none";n.remove(),t?.stopImmediatePropagation()}async function L({currentTarget:t}){t.firstElementChild.setAttribute("loading","");let e=document.body.querySelectorAll(".one-clipped"),o=Array.prototype.map.call(e,r=>r.outerHTML).join(`
`),i=n.firstElementChild.value,C=i==="new_page"?{htmlContent:o,sectionId:(await chrome.storage.local.get("lastSectionId")).lastSectionId,pageTitle:document.title}:{htmlContent:o,pageId:i},u=await chrome.runtime.sendMessage(C);if(t.firstElementChild.removeAttribute("loading"),u.errCaused)return c(u.errCaused,"error");document.body.removeEventListener("mouseout",m),document.body.removeEventListener("mouseover",d),document.body.removeEventListener("mousedown",p);for(let r of e)r.classList.remove("one-clipped"),r.style.backgroundColor="unset",r.style.outline="none";n.remove(),c(a("selected_text_inserted"))}var n;async function v(){let{lastSectionId:t}=await chrome.storage.local.get("lastSectionId"),{[t]:e,lastPageId:o}=await chrome.storage.local.get([t,"lastPageId"]);n=document.createElement("clip-article-btn"),n.innerHTML=`<select name="pages">
				<option value="new_page">Create new page</option>
				${e?.map(i=>`<option value="${i.id}">${i.title.slice(0,24)}</option>`).join("")}
			</select>
			<span><svg viewBox="0 0 24 24" class="clip-content"><path /> </svg>${a("clip_selected")}</span>
			<svg viewBox="0 0 24 24" class="close-circle">
				<title>${a("cancel_selection")}</title>
			<path />
		</svg>`,document.body.appendChild(n),n.firstElementChild.value=o,n.children[1].addEventListener("click",L),n.lastElementChild.addEventListener("click",b)}chrome.runtime.onMessage.addListener((t,e,o)=>{t==="manual-clip-site"?(g(),o("clipping...")):t==="clip-article"?import(chrome.runtime.getURL("scripts/clip-site/clip-article.js")):t.msg==="deletePage"&&(document.querySelector(`option[value="${t.pageId}"]`)?.remove(),c(a("selected_page_is_deleted")))});var h=document.createElement("style");h.innerHTML=`:scope {
		--oc-selected-text: rgb(127 82 210);
		--clip-content-bgc:wheat;
	}
	
	@media (prefers-color-scheme: dark) {
		:scope {
			--clip-content-bgc:rgb(90, 90, 90);
		}
	}

	clip-article-btn {
		position: fixed;
		bottom: 1em;
		right: 1em;
		z-index: 1000;

		& select {
			width: 100%;
			border-radius: 0.4em 0.4em 0 0;
			background-color: light-dark(white,hsl(0, 0%, 20%));
		}

		& span {
			display: flex;
			border-radius: 0 0 0.4em 0.4em;
			padding: 0.2em 0.5em;
			font-size: 18px;
			color: white;
			background-color: rgb(132, 0, 255);
			box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
			cursor: pointer;
		}

		& svg.close-circle {
			height: 12px;
			width: 12px;
			position: absolute;
			right: -5px;
			bottom: -5px;
			background-color: #fff;
			border-radius: 50%;
			cursor: pointer;
			transition: scale 300ms ease-out;

			&:hover {
				scale: 1.5;
			}

			&.close-circle path {
				d: path(
					"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
				);
			}
		}

		& svg.clip-content {
			height: 24px;
			width: 24px;
			vertical-align: middle;
			
			& path {
				fill:red;
				d: path(
					"M19,3L13,9L15,11L22,4V3M12,12.5A0.5,0.5 0 0,1 11.5,12A0.5,0.5 0 0,1 12,11.5A0.5,0.5 0 0,1 12.5,12A0.5,0.5 0 0,1 12,12.5M6,20A2,2 0 0,1 4,18C4,16.89 4.9,16 6,16A2,2 0 0,1 8,18C8,19.11 7.1,20 6,20M6,8A2,2 0 0,1 4,6C4,4.89 4.9,4 6,4A2,2 0 0,1 8,6C8,7.11 7.1,8 6,8M9.64,7.64C9.87,7.14 10,6.59 10,6A4,4 0 0,0 6,2A4,4 0 0,0 2,6A4,4 0 0,0 6,10C6.59,10 7.14,9.87 7.64,9.64L10,12L7.64,14.36C7.14,14.13 6.59,14 6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22A4,4 0 0,0 10,18C10,17.41 9.87,16.86 9.64,16.36L12,14L19,21H22V20L9.64,7.64Z"
				);
			}

			&[loading] path {
				d: path(
					"M12 19C13.1 19 14 19.9 14 21S13.1 23 12 23 10 22.1 10 21 10.9 19 12 19M12 1C13.1 1 14 1.9 14 3S13.1 5 12 5 10 4.1 10 3 10.9 1 12 1M6 16C7.1 16 8 16.9 8 18S7.1 20 6 20 4 19.1 4 18 4.9 16 6 16M3 10C4.1 10 5 10.9 5 12S4.1 14 3 14 1 13.1 1 12 1.9 10 3 10M6 4C7.1 4 8 4.9 8 6S7.1 8 6 8 4 7.1 4 6 4.9 4 6 4M18 16C19.1 16 20 16.9 20 18S19.1 20 18 20 16 19.1 16 18 16.9 16 18 16M21 10C22.1 10 23 10.9 23 12S22.1 14 21 14 19 13.1 19 12 19.9 10 21 10M18 4C19.1 4 20 4.9 20 6S19.1 8 18 8 16 7.1 16 6 16.9 4 18 4Z"
				);
				transform-origin: center;
				animation: spin 1s linear infinite;
			}
		}
	}
	
	#snackbar {
		min-width: 8em;
		width: max-content;
		background-color: #333;
		color: rgb(255, 208, 0);
		text-align: center;
		border-radius: 12px;
		padding: 4px 8px;
		position: fixed;
		z-index: 1000;
		bottom: 20px;
		inset-inline: 0;
		margin-inline: auto;
		translate: 0 200%;
		animation: in-out 4s ease-out;

		&.error {
			top: 2em;
			bottom: unset;
			background-color: red;
			color: white;
			translate: 0 -200%;
		}
	}
	
	@keyframes in-out {
		10%,
		90% {
			translate: 0 0;
		}
	}
		
	@keyframes spin {
		from {
			rotate: 360deg;
		}

		to {
			rotate: 0deg;
		}
	}`;document.head.appendChild(h);var s=document.createElement("output");s.id="snackbar";document.body.appendChild(s);s.hidden=!0;function c(t,e){snackbar.className=e?"error":"",s.hidden=!1,s.textContent=t,setTimeout(()=>s.hidden=!0,5100)}
