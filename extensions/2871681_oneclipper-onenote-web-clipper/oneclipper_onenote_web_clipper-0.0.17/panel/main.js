import{a as Y,b as Q,c as B,d as l,e as u,f as m,g as C}from"./chunk-I6BP2S5G.js";var j=Y(U=>{globalThis.eId=document.getElementById.bind(document);globalThis.$on=(n,e,t)=>n.addEventListener(e,t);globalThis.$=(n,e)=>(e||document).querySelector(n);globalThis.fireEvent=(n,e,t)=>n.dispatchEvent(t?new CustomEvent(e,{detail:t}):new CustomEvent(e));globalThis.i18n=chrome.i18n.getMessage.bind(U);globalThis.setLang=n=>eId(n).textContent=chrome.i18n.getMessage(n);globalThis.getStore=chrome.storage.local.get.bind(chrome.storage.local);globalThis.setStore=chrome.storage.local.set.bind(chrome.storage.local);var k=eId("snackbar");globalThis.toast=(n,e)=>{k.className=e?"error":"",k.hidden=!1,k.innerText=n,setTimeout(()=>k.hidden=!0,5100)}});var _t=Q(j());var{version:X,short_name:ee,update_url:te}=chrome.runtime.getManifest(),q=!te;function v(n){if(q)return console.error(n);let e="https://bug-collector.noterail.workers.dev/collect-bug",t={id:1,extId:chrome.runtime.id,extName:ee,extVersion:X,message:n.message??n.reason,stack:n.stack,browserOs:navigator.userAgent,catchedAt:new Date().toISOString()},r=new Request(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});fetch(r).then(o=>o.text()).then(o=>console.log(o)).catch(o=>console.log(o))}if(!q){self.addEventListener("error",v),self.addEventListener("unhandledrejection",v);let n={apply:function(t,r,o){return v(o[0]),t.call(r,...o)}};console.error=new Proxy(console.error,n)}var K=await(await fetch("/assets/icons.json")).json(),g=class extends HTMLElement{constructor(e){super(),e&&this.setAttribute("ico",e)}get checked(){return this._internals.states.has("checked")}set checked(e){e?this._internals.states.add("checked"):this._internals.states.delete("checked")}set ico(e){this.firstElementChild.innerHTML=K[e]}render(e){return`<svg  viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">${K[e]}</svg>`}connectedCallback(){this.innerHTML=this.render(this.getAttribute("ico")),this.hasAttribute("toggle")&&(this._internals=this.attachInternals(),this.addEventListener("click",this.#e.bind(this)))}#e(){this.checked=!this.checked,this.dispatchEvent(new Event("change"))}};customElements?.define("clip-icon",g);function ne(){let n=chrome.runtime.connect({name:location.host});n.onMessage.addListener(function(o){}),n.onDisconnect.addListener(()=>{document.body.removeEventListener("copy",r),document.body.removeEventListener("mousedown",t),document.body.removeEventListener("keydown",e)});function e(o){o.ctrlKey?o.code==="KeyZ"?n.postMessage({command:"Undo"}):o.code==="KeyY"&&n.postMessage({command:"Redo"}):(o.altKey||o.metaKey)&&o.code==="KeyH"&&(globalThis.markClipperHighlighter?.highlightSelected("#ffff00",!1),r(),getSelection().removeAllRanges())}function t(){n.postMessage({command:"saveCaret"})}async function r(){let o=getSelection();if(o.isCollapsed)return;let s=o.getRangeAt(0),i=(s.commonAncestorContainer.nodeType===1?s.commonAncestorContainer:s.commonAncestorContainer.parentElement).tagName.toLowerCase(),c=document.createElement(i);c.appendChild(s.cloneContents()),n.postMessage({command:"copied",htmlContent:c.outerHTML})}document.body.addEventListener("copy",r),document.body.addEventListener("mousedown",t),addEventListener("keydown",e),import(chrome.runtime.getURL("scripts/highlighter/Highlighter.js")),console.log("oneClipper script injected")}async function f(n,e){if(e.status==="complete")try{await chrome.scripting.executeScript({target:{tabId:n,allFrames:!0},func:ne})}catch(t){t.message==="Cannot access contents of the page. Extension manifest must request permission to access the respective host."&&(await chrome.permissions.request({origins:["<all_urls>"]})?f(n,e):alert("permission denied")),console.info(t)}}var S=class{constructor(e){this.id=e.id,this.title=e.title,this.path=""}};var A=class extends HTMLElement{constructor(){super()}showLinkBox(){let e=getSelection().getRangeAt(0).cloneRange(),t=this.lastElementChild;t.hidden=!1,t.firstElementChild.addEventListener("input",r);function r(){let o=t.firstElementChild.value,s=getSelection();s.setPosition(e.startContainer,e.startOffset),s.extend(e.endContainer,e.endOffset),document.execCommand("createLink",null,o),this.hidePopover()}}sendCommand({target:e}){let t=e.closest("clip-icon")?.getAttribute("ico");if(t){if(t==="link-plus")return this.showLinkBox();document.execCommand(t,null,"")}}render(){return`<clip-icon ico="bold"></clip-icon>
        <clip-icon ico="italic"></clip-icon>
        <clip-icon ico="underline"></clip-icon>
        <clip-icon ico="strikethrough"></clip-icon>
		<clip-icon ico="link-plus"></clip-icon>
        <link-box id="link-box" hidden><input type="url"></link-box>`}connectedCallback(){this.setAttribute("popover",""),$on(this,"pointerdown",this.sendCommand),this.innerHTML=this.render()}};customElements.define("format-popup",A);async function z(n,e){chrome.contextMenus.create({id:n,parentId:"oneNoteClip",title:e.slice(0,24),contexts:["selection","image","link"]},async()=>{if(chrome.runtime.lastError)return console.log(chrome.runtime.lastError.message);let t=(await getStore("cxtMenuIds")).cxtMenuIds??[];t.indexOf(n)===-1||t.push(n),await setStore({cxtMenuIds:t})})}async function F(n){chrome.contextMenus.remove(n,()=>chrome.runtime.lastError&&console.log(chrome.runtime.lastError))}var P="https://graph.microsoft.com/v1.0/me/onenote";async function N(n){let e=n.clone();try{let t=await fetch(n);if(t.ok)return await t.text();re(t,e)}catch(t){t.stack+=`
Request URL: ${n.url}`,L(t),console.error(t)}}async function re(n,e){if(n.status===401){let o=await D();return e.headers.set("Authorization","Bearer "+o),fetch(e).catch(s=>console.error(s))}let r=n.headers.get("content-type")==="application/json"?(await n.json()).error:await n.text();if(n.status===404&&r.code==="20102"){let o=new RegExp(/pages\/([^\/]+)/),s=e.url.match(o)?.[1];if(s){F(s);let{lastSectionId:a}=await getStore("lastSectionId");getStore([a]).then(({[a]:c})=>{let p=c.findIndex(M=>M.id===s);p===-1||c.splice(p,1),setStore({[a]:c})}),chrome.runtime.sendMessage({msg:"deletePage",pageId:s}).catch(()=>{});let i=(await B({active:!0,currentWindow:!0}))[0].id;return chrome.tabs.sendMessage(i,{msg:"deletePage",pageId:s}).catch(()=>{})}}n.status>=400&&(r.stack=`
Request url:${e.url}
code:${r.code}`,L(r))}async function D(){let n="https://cloud.oneclipper-firefox.noterail.co/api/get-onenote-token",e="https://oneclipper-deno.deno.dev/api/get-onenote-token",{oneAccounts:t,openAccountId:r}=await l(["oneAccounts","openAccountId"]),o=new Headers({"User-Key":r});try{await fetch(n,{method:"OPTIONS"})}catch{}async function s(){let i=await fetch(n,{headers:o}),c=await i.text();return i.ok&&await a(c),c}async function a(i){t[r].ONT_ACTK=i,t[r].refreshAt=Date.now()+3e6,await u({oneAccounts:t})}try{return await s()}catch{try{return await new Promise(c=>setTimeout(c,500)),await s()}catch(c){if(await new Promise(p=>setTimeout(p,200)),t[r].refreshAt>Date.now())return t[r].ONT_ACTK;console.error(c)}}}async function E(n){let{oneAccounts:e,openAccountId:t}=await l(["oneAccounts","openAccountId"]),{ONT_ACTK:r,refreshAt:o}=e[t],s=Date.now()<o?r:await D(),a=new Headers({Authorization:"Bearer "+s});return n&&a.append("Content-Type",n),a}async function se(n,e,t){e??=(await getStore("lastSectionId")).lastSectionId;let r=`${P}/sections/${e}/pages`,o=await E("text/html"),s=`<html>
		<head>
			<title>${t??new Date().toISOString()}</title>
			<meta name="created" content="${new Date().toISOString()}" />
		</head>
		<body>${n}</body>
  	</html>`,a=new Request(r,{method:"POST",headers:o,body:s}),i=await N(a);return i&&await ae(i,e)}async function ae(n,e){try{let t=JSON.parse(n),o={id:t.id,title:t.title,path:""},s=(await getStore([e]))[e]??[];return s.push(o),await setStore({[e]:s,lastPage:o,lastPageId:o.id}),z(o.id,o.title),o}catch(t){console.error(t)}}async function I(n,e){if(e==="createPage")return se(n);if(e||=(await getStore("lastPageId")).lastPageId,!e)throw new Error(i18n("pageId_is_missing"));setStore({lastPageId:e});let t=`${P}/pages/${e}/content`,r=await E("application/json"),o=[{target:"body",action:"append",content:n}],s=new Request(t,{method:"PATCH",headers:r,body:JSON.stringify(o)});return await N(s)}async function W(n,e,t){if(e||=(await getStore("lastPageId")).lastPageId,!e)throw new Error(i18n("pageId_is_missing"));let r=`${P}/pages/${e}/content`,o=await E(),s=[{target:"body",action:"append",content:n}],a=new Blob([JSON.stringify(s)],{type:"application/json"}),i=new FormData;i.append("Presentation",a),t.forEach((p,M)=>i.append(M,p));let c=new Request(r,{method:"PATCH",headers:o,body:i});return await N(c)}var ie=async()=>(await chrome.tabs.query({currentWindow:!0,active:!0}))[0];async function _(n,...e){let t=await ie();if(t.url.startsWith("http"))try{return(await chrome.scripting.executeScript({target:{tabId:t.id},func:n,args:e}))[0].result}catch(r){console.warn(r)}}async function L(n){n&&(await chrome.runtime.openOptionsPage(),await new Promise(e=>setTimeout(e,1e3)),chrome.runtime.sendMessage({msg:"reportBug",error:{message:n.message,stack:n.stack}}))}globalThis.formatPopup=$("format-popup");var b=class extends HTMLElement{constructor(){super(),this.linkUrls=[],this.attachments=new Map,this.images=new Map}connectedCallback(){this.setAttribute("contenteditable","true"),this.setAttribute("spellcheck","false"),$on(this,"pointerup",({clientX:e,clientY:t})=>{getSelection().isCollapsed||(formatPopup.style.top=t+"px",formatPopup.style.left=`min(67%, ${e}px)`,formatPopup.showPopover())}),$on(this,"beforeinput",e=>this.inputHandler[e.inputType]?.(e))}inputHandler={insertFromPaste:this.dropPasteHandler.bind(this),insertFromDrop:this.dropPasteHandler.bind(this)};async dropPasteHandler(e){let t=e.dataTransfer,r=new Set(t.types);if(r.has("Files")){let o=t.files[0];if(o.type.startsWith("image")){let s=r.has("text/uri-list")?t.getData("text/uri-list"):"name:"+Date.now();document.execCommand("insertImage",null,s),r.has("text/uri-list")||this.images.set(s,o),e.preventDefault()}}else if(r.has("text/uri-list")){let o=t.getData("text/uri-list");document.execCommand("createLink",null,o),e.preventDefault()}else{let s=e.dataTransfer.getData("text/html").replaceAll(/style=".+?"/g,"");e.preventDefault();let a=await chrome.permissions.contains({origins:["<all_urls>"]})?await _(ce):null,i=a?`<${a}>${s}</${a}>`:s;document.execCommand("insertHTML",null,i)}}};customElements.define("page-content",b);function ce(){let n=getSelection();if(n.isCollapsed)return;let e=n.getRangeAt(0);return(e.commonAncestorContainer.nodeType===1?e.commonAncestorContainer:e.commonAncestorContainer.parentElement).tagName.toLowerCase()}var w=class extends HTMLElement{constructor(e){super(),this.page=e}async closePage(){this.parentElement.remove();let{openPageStack:e}=await getStore("openPageStack");e=e.filter(t=>t.id!==this.page.id),setStore({openPageStack:e})}async appendContent(){toast(i18n("inserting"));let e=this.parentElement.lastElementChild;if(e.innerHTML)try{let t={htmlContent:e.innerHTML,pageId:this.page.id};e.images.size===0||(t.images=e.images);let r=await chrome.runtime.sendMessage(t);if(r.errCaused)return toast(r.errCaused,"error");e.textContent="",notify("Insert successfully")}catch(t){console.error(t),document.body.appendChild(new C(t))}}render(){return m`<clip-icon ico="page"></clip-icon>
			<div title="${this.page.title}">
				<span>${this.page.title}</span>
				<var>${this.page.path}</var>
			</div>
			<button title="Insert content into oneNote" @click=${this.appendContent.bind(this)}>
				${i18n("insert")}
			</button>
			<clip-icon class="close-btn" ico="close" @click=${this.closePage.bind(this)}></clip-icon>`}connectedCallback(){this.replaceChildren(this.render())}};customElements.define("page-toolbar",w);var d,h=class extends HTMLElement{constructor(e){super(),this.page=e}render(){let e=new w(this.page),t=new b;this.append(e,t),$on(e,"click",this.onPageSelected.bind(this))}connectedCallback(){this.render(),this.onPageSelected()}onPageSelected(){d?.removeAttribute("selected"),d=this,this.setAttribute("selected","")}disconnectedCallback(){this.focusedPage===this&&(this.focusedPage=null)}};customElements.define("page-card",h);var O=class extends HTMLElement{constructor(){super()}toggleCopy({currentTarget:e}){if(setStore({"enableCtrl+Copy":e.checked}),e.checked)chrome.tabs.onUpdated.addListener(f),chrome.tabs.query({active:!0,currentWindow:!0}).then(t=>f(t[0].id,{status:"complete"}));else{chrome.tabs.onUpdated.removeListener(f);for(let t of this.ports.values())t.disconnect();this.ports.clear()}}connectedCallback(){let e=new g("copy-off");e.setAttribute("toggle",""),e.title=i18n("ctrl_c_tooltip"),this.replaceChildren(e),this.setCopyPortListner(),$on(this.firstElementChild,"change",this.toggleCopy.bind(this)),getStore("enableCtrl+Copy").then(t=>{t["enableCtrl+Copy"]?this.toggleCopy({currentTarget:this.firstElementChild}):this.firstElementChild.checked=!1})}setCopyPortListner(){this.ports=new Map,chrome.runtime.onConnect.addListener(e=>{this.ports.set(e.sender.documentId,e),e.onMessage.addListener(t=>{if(t.command==="saveCaret"){let r=getSelection();return this.savedCaret={node:r.focusNode,offset:r.focusOffset}}this.savedCaret&&getSelection().setPosition(this.savedCaret.node,this.savedCaret.offset),t.command==="copied"?(d?.contains(this.savedCaret?.node)?document.execCommand("insertHTML",null,t.htmlContent):d?.lastElementChild.insertAdjacentHTML("beforeend",t.htmlContent),getSelection().collapseToEnd()):t.command==="Undo"?document.execCommand("undo"):t.command==="Redo"&&document.execCommand("redo")}),e.onDisconnect.addListener(()=>this.ports.delete(e.sender.documentId))})}};customElements.define("copy-listener",O);var G=new CSSStyleSheet;G.replace(`
#alert-toast {
	top: 2em;
	right: 0.5em;
	padding: 0;
	
}

@starting-style {
	#alert-toast:popover-open {
		translate: 110% 0;
	}
}

@scope(alert-toast) {
	:scope {
		height: 2em;
		border-radius: 6px;
		font-size: clamp(0.8rem, 1vw + 0.7rem, 1rem);
		transition: translate 600ms ease-out;
	}

	div {
		height: 100%;
		padding-left: 0.4em;
		color: white;
		display: flex;
		align-items: center;
		border-radius: 4px;

		& .notice-txt {
			text-wrap: nowrap;
			overflow: hidden;
			flex-grow: 1;
			margin-left: 0.5em;

			&+svg {
				align-self: start;
				inline-size: 1.1em;
			}
		}

		&.success {
			background-color: limegreen;
		}

		&.error {
			background-color: #ff2800;

			&>svg:first-child path {
				d: path("M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
					);
			}
		}
	}
}`);document.adoptedStyleSheets.push(G);var T=class extends HTMLElement{constructor(){super()}show=(e,t="success")=>{this.box.className=t,this.box.children[1].textContent=e,this.showPopover(),setTimeout(()=>this.hidePopover(),6100)};render(){return`<div>
				<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d='M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' /></svg>
				<span class="notice-txt"></span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
			</div>`}connectedCallback(){this.id="alert-toast",this.setAttribute("popover",""),this.innerHTML=this.render(),this.box=this.firstElementChild,this.box.lastElementChild.addEventListener("click",()=>this.hidePopover())}};customElements.define("alert-toast",T);var J=new T;document.body.appendChild(J);globalThis.notify=J.show;var H=class extends HTMLElement{constructor(){super()}async appendAllPagesContent(){toast(i18n("inserting"));let e=this.nextElementSibling.children,t=[];for(let r of e){if(!r.lastElementChild.hasChildNodes())continue;let o=r.lastElementChild,s=o.images.size===0?I(o.innerHTML,r.page.id):W(o.innerHTML,r.page.id,o.images);t.push(s),o.textContent=""}try{await Promise.all(t),this.nextElementSibling.replaceChildren(),notify(t.length+" notes inserted")}catch(r){console.error(r),document.body.appendChild(new C(r))}}async openNoteBookDrawer(){if(this.noteDrawer)return this.noteDrawer.showPopover();let{NoteDrawer:e}=await import("./note-drawer-3TMSF7VA.js");this.noteDrawer=new e,this.appendChild(this.noteDrawer)}render(){return m`<clip-icon
				ico="drawer"
				title="Open notebook drawer (Alt+B)"
				@click=${this.openNoteBookDrawer.bind(this)}></clip-icon>
			<span>oneClipper</span>
			<button title="Insert all pages (Ctrl+ Shift+ E)" @click=${this.appendAllPagesContent.bind(this)}>
				${i18n("insert_all")}
			</button>`}connectedCallback(){this.replaceChildren(this.render())}};customElements.define("top-bar",H);var y=class extends HTMLElement{constructor(e){super(),this.restoreFunc=e}restorePages(){this.restoreFunc(),this.remove()}render(){return m`<h3>${chrome.i18n.getMessage("restore_open_notes")}</h3>
			<p>Do you want to re-open previous opened notes?</p>
			<div class="confirm-action">
				<button class="outline-btn" @click=${this.remove.bind(this)}>${i18n("cancel")}</button>
				<button style="margin-left: 0.5em" @click=${this.restorePages.bind(this)}>${i18n("restore")}</button>
			</div>`}connectedCallback(){this.id="restore-page-dialog",this.setAttribute("popover",""),this.replaceChildren(this.render()),this.showPopover(),$on(this,"toggle",e=>e.newState==="closed"&&this.remove())}disconnectedCallback(){setStore({openPageStack:[]})}};customElements.define("restore-page-dialog",y);var R=class extends HTMLElement{constructor(){super()}async openPage({detail:e}){this.appendChild(new h(e));let t=(await getStore("openPageStack")).openPageStack??[];t.push(e),setStore({openPageStack:t})}connectedCallback(){$on(document.body,"openpage",this.openPage.bind(this)),addEventListener("keydown",this.keyShortcutListener.bind(this)),this.restoreOpenPages()}keyShortcutListener(e){if(e.code==="Escape")return this.replaceChildren(),setStore({openPageStack:[]});if(e.ctrlKey&&e.shiftKey&&e.code==="KeyE")return this.previousElementSibling.appendAllPagesContent();if(e.ctrlKey&&e.code==="KeyE")return d.firstElementChild.appendContent();!e.altKey&&!e.metaKey||(e.code==="KeyR"?this.restorePages(this.previousElementSibling.openPageStack):e.code==="KeyB"?this.previousElementSibling.openNoteBookDrawer():e.code==="KeyT"&&close())}async restorePages(e){if(e)for(let t of e)this.appendChild(new h(new S(t)))}async restoreOpenPages(){let e=(await getStore("openPageStack")).openPageStack;e?.length!==0&&document.body.appendChild(new y(this.restorePages.bind(this,e)))}};customElements.define("page-container",R);var Z="https://cloud.oneclipper-firefox.noterail.co",x=class n extends HTMLDialogElement{constructor(){super()}static async oneNoteRedirect(){let e=(await chrome.tabs.query({active:!0,lastFocusedWindow:!0}))[0].index,{oneAccounts:t,openAccountId:r}=await l(["oneAccounts","openAccountId"]),o=t[r].SUN_RAY,s=`${Z}/authorize/connect-one-note?r=${crypto.randomUUID()}&s=${o}&u=${r}&e=${chrome.runtime.id}`;chrome.tabs.create({url:s,index:e+1})}render(){return`<style>
			#connect-onenote {
				padding: 0;
				scrollbar-width: thin;
			
				& > * {
					padding-inline: 0.5em;
				}

				& img{
					padding-inline: 0;
				}

				& button{
					display: block;
					margin: 0.5em auto;
					padding: 0.5em;
					font-size: 1em;
				}
			}
		</style>
		<img src="https://live.staticflickr.com/65535/53744921859_2b122b4c26.jpg" alt="" style="width:100%"   />
			<h2>\u{1F510} ${i18n("connection_required")}</h2>
			<p>
				${i18n("give_access_to_oneclipper")}
			</p>

			<details>
				<summary>Privacy policy</summary>
				<ul>
					<li>${i18n("we_dont_read_any_files")}</li>
					<li>${i18n("we_dont_edit_any_files")}</li>
					<li>${i18n("we_dont_save_any_user_personal_info")}</li>
				</ul>
			</details>
			<details>
				<summary>One Note permission explain</summary>
				<ol>
					<li> <b>Create pages in your OneNote notebooks</b></li>
					<li> <b>View and modify your OneNote notebooks</b></li>
					<li> <b>View and modify OneNote notebooks</b> </li>
					<li> <b>Access your info anytime</b>: ${i18n("oAuth_token_expires_in_1hour")}</li>
				</ol>
			</details>
		<button>Connect With Onenote</button>`}connectedCallback(){this.id="connect-onenote",this.innerHTML=this.render(),this.showModal(),this.lastElementChild.addEventListener("click",n.oneNoteRedirect),this.listenMsg()}listenMsg(){chrome.runtime.onMessage.addListener(e=>{e==="onenote-connected"&&(document.addEventListener("visibilitychange",()=>toast("onenote connected"),{once:!0}),this.remove())})}};customElements.define("connect-onenote",x,{extends:"dialog"});async function V(){let n=Z+"/api/get-onenote-token",{oneAccounts:e,openAccountId:t}=await l(["oneAccounts","openAccountId"]);async function r(){let o=await fetch(n,{headers:{"User-Key":t}}),s=await o.text();return o.status===403&&s==="User doesn't exist"?!1:(e[t].UDI_TKN=crypto.randomUUID(),await u({oneAccounts:e}),toast("Please reopen popup after 1 min"),chrome.runtime.sendMessage("onenote-connected").catch(a=>console.error(a)),!0)}try{return await r()}catch{try{return await new Promise(s=>setTimeout(s,1e3)),await r()}catch(s){console.error(s)}}}await l(["oneAccounts","openAccountId"]).then(async({oneAccounts:n,openAccountId:e})=>{n[e].UDI_TKN??(await V()||document.body.appendChild(new x))});chrome.runtime.onMessage.addListener((n,e,t)=>{n.msg==="deletePage"?document.getElementById(n.pageId)?.remove():n.msg==="notifyError"?notify(n.error,"error"):n==="closeSidePanel"&&close()});
