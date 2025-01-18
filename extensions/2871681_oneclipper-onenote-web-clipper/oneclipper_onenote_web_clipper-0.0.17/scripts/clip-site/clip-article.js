var l=chrome.i18n.getMessage.bind(chrome.i18n),p=(n,t)=>(t||document.body).querySelector(n),m="https://www.youtube.com/watch?v=",y=document.createElement("style");y.innerHTML=`clipped-article-preview {
	display: block;
	width: 70%;
	position: fixed;
	left: 15%;
	top: 10%;
	z-index: 2000;
	padding-inline: 0.4em;
	padding-bottom: 0.4em;
}

:host([popover]){
	border: none;
}

clip-saver-bar {
	display: flex;
	flex-direction: row-reverse;

	& button:first-child {
		border: none;
		border-radius: 0 0.4em 0 0;
		padding: 0.2em 0.5em;
		font-size: 16px;
		color: white;
		background-color: rgb(0, 162, 255);
		cursor: pointer;
	}
}

clipped-article {
	color-scheme: light dark;
	display: block;
	max-height: 86vh;
	overflow-y: auto;
	padding-inline: 0.4em;
	background-color: light-dark(hsl(0, 0%, 100%),hsl(0, 0%, 22%));
	color: light-dark(hsl(0, 0%, 5%),#bdc1c6);
	box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
	border-radius: 0.5em 0 0.5em 0.5em;
	border: 4px solid rgb(132, 0, 255);
	scrollbar-width: thin;
	scrollbar-color: grey black;

	& img {
		max-height: 8lh;
		object-fit: contain;
	}

	& pre {
		margin-left: 1em;
		padding: 0.5em;
		background-color: rgb(33 33 33);
	}
}

#ai-summary-iframe{
	box-sizing: border-box;
	border: none;
	width: 100%;
	min-height: 70vh;
}

svg.clip-content {
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

output {
	min-width: 8em;
	width: max-content;
	background-color: #333;
	color: rgb(255, 208, 0);
	text-align: center;
	border-radius: 12px;
    padding: 4px 8px;
	position: fixed;
	z-index: 1000;
	inset-inline: 0;
	margin-inline: auto;
	bottom: 20px;
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
}`;document.head.appendChild(y);var A=chrome.runtime.id,u=class extends HTMLElement{constructor(){super()}markContent;getReverseDomain(t){return t.split(".").reverse().join(".")}getDate(){return new Date().toLocaleDateString("default",{dateStyle:"medium"}).replaceAll(" ","-")}async getPageTitle(){let t=new RegExp(/[\s:|?<>/~#^*\[\]]/g),i={date:this.getDate(),pageTitle:document.title.replaceAll(" ","-").replaceAll(t,"").slice(0,100),reverseDate:new Date().toISOString().slice(0,10),domain:location.host,reverseDomain:this.getReverseDomain(location.host)},{fileNameFormat:e}=await chrome.storage.sync.get("fileNameFormat");e||="date-pageTitle";for(let r in i)e=e.replace(r,i[r]);return e}async aiSummary(t){let{extOrigin:i}=await chrome.storage.local.get("extOrigin");try{if(!await chrome.runtime.sendMessage("chatGpt_permission"))return h(l("permission_denied"));this.markContent??=location.href?.startsWith(m)?await L():await new c().clipArticleAsMarkdown()}catch(e){chrome.runtime.sendMessage({error:{message:e.message,stack:e.stack}})}if(!this.markContent)return h(l("empty_content"));if(this.contentType==="full_page"&&location.href?.startsWith(m))return t.append(this.markContent);this.iFrame?this.iFrame.contentWindow.postMessage([this.contentType,this.markContent],i):(this.iFrame=document.createElement("iframe"),this.iFrame.id="ai-summary-iframe",this.iFrame.src=chrome.runtime.getURL("/scripts/clip-site/Summary/summary.html"),this.iFrame.onload=()=>{this.iFrame.contentWindow.postMessage([this.contentType,this.markContent],i)},t.replaceChildren(this.iFrame))}onContentTypeSwitch({target:t}){this.contentType=t.value,chrome.storage.sync.set({articleClipType:this.contentType});let i=this.querySelector("clipped-article");if(this.contentType==="full_page"){let e=new c().clipArticle();i.replaceChildren(e)}else this.aiSummary(i)}async clipArticle(t,i){t.currentTarget.firstElementChild.setAttribute("loading","");let e=await this.getPageTitle(),r=this.dbSelectElem.value;if(this.contentType==="full_page"){let o=i.innerHTML;await chrome.runtime.sendMessage({htmlContent:o,sectionId:r,pageTitle:e})}else this.iFrame.contentWindow.postMessage(["clipArticle",r,e],A),await new Promise(o=>setTimeout(o,3e3));h(l("article_clipped_to_onenote")),i.parentElement.remove(),setTimeout(()=>document.querySelector("clipped-article-preview").remove(),5100)}setSectionList(){chrome.storage.local.get("openNotebook").then(async({openNotebook:t})=>{if(!t)return;let i=[t,"lastSectionId"],{[t]:e,lastSectionId:r}=await chrome.storage.local.get(i);e.map(o=>this.dbSelectElem.add(new Option(o.name,o.id))),this.dbSelectElem.value=r})}render(){return`<clipped-article-preview>
				<clip-saver-bar>
					<button><svg viewBox="0 0 24 24" class="clip-content"><path /> </svg> ${l("clip_article")}</button>
					<select name="databases"></select>
					<select id="article_clip_type">
						<option value="full_page">Full page</option>
						<option value="summary">AI Summary</option>
						<option value="mindmap">AI Mindmap</option>
						<option value="highlight">AI Highlight</option>
					</select>
					<button class="close-btn">\u274C</button>
				</clip-saver-bar>
				<clipped-article contenteditable="true" spellcheck="false"></clipped-article>
			</clipped-article-preview>
			<output hidden></output>`}async connectedCallback(){this.setAttribute("popover","manual"),this.innerHTML=this.render(),this.dbSelectElem=this.querySelector("select"),this.setSectionList(),this.showPopover(),this.contentType=(await chrome.storage.sync.get("articleClipType")).articleClipType??"full_page";let t=this.querySelector("clipped-article"),i=this.querySelector("#article_clip_type");if(i.value=this.contentType,this.contentType==="full_page"&&!location.href?.startsWith(m)){let e=new c().clipArticle();t.appendChild(e)}else this.aiSummary(t);i.addEventListener("change",this.onContentTypeSwitch.bind(this)),this.querySelector("button").addEventListener("click",e=>this.clipArticle(e,t)),this.querySelector("button.close-btn").addEventListener("click",()=>this.remove())}},E=new Set(["AREA","BUTTON","SCRIPT","STYLE","IFRAME","svg","CANVAS","FOOTER","ASIDE","NAV","META","LINK","LEGEND","METER","LABEL","INPUT","TEXTAREA","SELECT","BUTTON","DATALIST","FORM","MENU","NOSCRIPT","EMBED","OBJECT","PROGRESS","SLOT","TEMPLATE"]),v=["comments","author","footer","sticky","banner","share","ignore","meta","nav","tags","subscribe","breadcrumb","rating","dropdown","feed","edit","related","newsletter","sponsor","promo","billboard","cta","toc","sidebar","toolbar"],x=new Set(["menu","menubar","menuitem","complementary","navigation","alert","alertdialog","dialog","presentation","progressbar","button","status","navigation","none","tablist","tab"]),c=class{constructor(){}getArticleRoot(){let t=new Set(["IMG","FIGURE","PICTURE","svg","CANVAS","VIDEO","STYLE","HEADER","NAV","SCRIPT","ASIDE","BLOCKQUOTE","P","FOOTER","H1","H2","H3","UL","OL","FORM","LI","A","TEXTAREA","INPUT","DL","DD","TABLE"]),i=new Set(["comments"]),e=innerWidth*.5,r=[];function o(w){function C(s){if(t.has(s.tagName)||s.childElementCount===0)return!1;for(let f of i)if(s.className?.toLowerCase()?.includes?.(f)||s.id?.toLowerCase()?.includes?.(f))return!1;return!0}let d=Array.prototype.filter.call(w.children,C);if(d.length===0)return;let g=Array.prototype.map.call(d,s=>s.offsetHeight),T=Math.max(...g),S=g.indexOf(T),a=d[S];a&&(a.offsetWidth<e||a.offsetHeight<r.at(-1)?.offsetHeight*.5||(r.push(a),a.childElementCount>0&&o(a)))}return o(p("main")??document.body),r.at(-1)??p("article")??p("main")??document.body}insertChildNodes(t,i){e:for(let e of t)if(e.nodeType===1){if(E.has(e.tagName)||e.tagName==="IMG"&&(e.width<50||e.src.startsWith("blob"))||e.hidden||e.ariaHidden==="true"||x.has(e.role)||e.style.display==="none")continue;for(let o of v)if(e.className.toLowerCase()?.includes?.(o)||e.id.toLowerCase()?.includes?.(o))continue e;let r=e.cloneNode();r.removeAttribute("style"),e.hasChildNodes()&&this.insertChildNodes(e.childNodes,r),i.appendChild(r)}else e.nodeType===3&&i.appendChild(e.cloneNode())}clipArticle(){let t=new DocumentFragment,i=this.getArticleRoot().children;return this.insertChildNodes(i,t),t}async clipArticleAsMarkdown(){let t=this.getArticleRoot(),i=chrome.runtime.getURL("scripts/clip-site/mark-serializer/mark-serializer.js"),{MarkdownSerializer:e}=await import(i);return new e().generate(t.childNodes)}};function h(n,t){let e=document.querySelector("clipped-article-preview").lastElementChild;e.className=t?"error":"",e.hidden=!1,e.textContent=n,setTimeout(()=>e.hidden=!0,5100)}function b(){let n=document.createElement("clipped-article-preview"),t=Object.getOwnPropertyDescriptors(u.prototype);Object.defineProperties(n,t),document.body.appendChild(n),n.connectedCallback()}b();async function L(){let n=document.getElementById("segments-container");n||(document.querySelectorAll("ytd-structured-description-content-renderer")[1].querySelector("button").click(),await new Promise(i=>setTimeout(i,1200))),n=document.getElementById("segments-container");let t=n.querySelectorAll("yt-formatted-string");return Array.prototype.map.call(t,i=>i.textContent).join(" ")}chrome.runtime.onMessage.addListener((n,t,i)=>{n==="clip-article"?(b(),i("clipping...")):n==="manual-clip-site"&&import(chrome.runtime.getURL("scripts/clip-site/manual-clip-site.js"))});
