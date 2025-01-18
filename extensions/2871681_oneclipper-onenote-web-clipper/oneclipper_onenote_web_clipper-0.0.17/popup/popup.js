var Y=Object.create;var M=Object.defineProperty;var Q=Object.getOwnPropertyDescriptor;var X=Object.getOwnPropertyNames;var ee=Object.getPrototypeOf,te=Object.prototype.hasOwnProperty;var oe=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ne=(t,e,o,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of X(e))!te.call(t,r)&&r!==o&&M(t,r,{get:()=>e[r],enumerable:!(n=Q(e,r))||n.enumerable});return t};var re=(t,e,o)=>(o=t!=null?Y(ee(t)):{},ne(e||!t||!t.__esModule?M(o,"default",{value:t,enumerable:!0}):o,t));var H=oe(E=>{globalThis.eId=document.getElementById.bind(document);globalThis.$on=(t,e,o)=>t.addEventListener(e,o);globalThis.$=(t,e)=>(e||document).querySelector(t);globalThis.fireEvent=(t,e,o)=>t.dispatchEvent(o?new CustomEvent(e,{detail:o}):new CustomEvent(e));globalThis.i18n=chrome.i18n.getMessage.bind(E);globalThis.setLang=t=>eId(t).textContent=chrome.i18n.getMessage(t);globalThis.getStore=chrome.storage.local.get.bind(chrome.storage.local);globalThis.setStore=chrome.storage.local.set.bind(chrome.storage.local);var p=eId("snackbar");globalThis.toast=(t,e)=>{p.className=e?"error":"",p.hidden=!1,p.innerText=t,setTimeout(()=>p.hidden=!0,5100)}});var At=re(H());var{version:ae,short_name:se,update_url:ie}=chrome.runtime.getManifest(),P=!ie;function h(t){if(P)return console.error(t);let e="https://bug-collector.noterail.workers.dev/collect-bug",o={id:1,extId:chrome.runtime.id,extName:se,extVersion:ae,message:t.message??t.reason,stack:t.stack,browserOs:navigator.userAgent,catchedAt:new Date().toISOString()},n=new Request(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});fetch(n).then(r=>r.text()).then(r=>console.log(r)).catch(r=>console.log(r))}if(!P){self.addEventListener("error",h),self.addEventListener("unhandledrejection",h);let t={apply:function(o,n,r){return h(r[0]),o.call(n,...r)}};console.error=new Proxy(console.error,t)}var b=chrome.tabs.query.bind(chrome.tabs),s=chrome.storage.sync.get.bind(chrome.storage.sync),c=chrome.storage.sync.set.bind(chrome.storage.sync),ye=chrome.storage.session.get.bind(chrome.storage.session),xe=chrome.storage.session.set.bind(chrome.storage.session);async function T(){let{createCropUI:t}=await import(chrome.runtime.getURL("/scripts/screenshot/crop-box.js")),e=await t();document.body.appendChild(e)}async function _(){let e=document.head.querySelector('meta[name="description"]')?.content||document.title,o=document.head.querySelector('meta[property="og:image"]')||document.head.querySelector('meta[name="twitter:image"]');return[e,o?.content]}var de=async()=>(await chrome.tabs.query({currentWindow:!0,active:!0}))[0];async function L(t){let e=(await s("oneAccounts")).oneAccounts??{},o=btoa(crypto.getRandomValues(new Uint8Array(16))),n=crypto.randomUUID(),r={name:"Account "+(Object.keys(e).length+1),SUN_RAY:n,OAT_KTC:o};e[t]=r,c({oneAccounts:e,openAccountId:t})}async function g(t,...e){let o=await de();if(o.url.startsWith("http"))try{return(await chrome.scripting.executeScript({target:{tabId:o.id},func:t,args:e}))[0].result}catch(n){console.warn(n)}}var V="https://cloud.oneclipper-firefox.noterail.co",d=class t extends HTMLDialogElement{constructor(){super()}static async oneNoteRedirect(){let e=(await chrome.tabs.query({active:!0,lastFocusedWindow:!0}))[0].index,{oneAccounts:o,openAccountId:n}=await s(["oneAccounts","openAccountId"]),r=o[n].SUN_RAY,a=`${V}/authorize/connect-one-note?r=${crypto.randomUUID()}&s=${r}&u=${n}&e=${chrome.runtime.id}`;chrome.tabs.create({url:a,index:e+1})}render(){return`<style>
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
		<button>Connect With Onenote</button>`}connectedCallback(){this.id="connect-onenote",this.innerHTML=this.render(),this.showModal(),this.lastElementChild.addEventListener("click",t.oneNoteRedirect),this.listenMsg()}listenMsg(){chrome.runtime.onMessage.addListener(e=>{e==="onenote-connected"&&(document.addEventListener("visibilitychange",()=>toast("onenote connected"),{once:!0}),this.remove())})}};customElements.define("connect-onenote",d,{extends:"dialog"});async function N(){let t=V+"/api/get-onenote-token",{oneAccounts:e,openAccountId:o}=await s(["oneAccounts","openAccountId"]);async function n(){let r=await fetch(t,{headers:{"User-Key":o}}),a=await r.text();return r.status===403&&a==="User doesn't exist"?!1:(e[o].UDI_TKN=crypto.randomUUID(),await c({oneAccounts:e}),toast("Please reopen popup after 1 min"),chrome.runtime.sendMessage("onenote-connected").catch(l=>console.error(l)),!0)}try{return await n()}catch{try{return await new Promise(a=>setTimeout(a,1e3)),await n()}catch(a){console.error(a)}}}var i=class extends HTMLDialogElement{constructor(){super()}render(){return`<svg
			version="1.1"
			id="L2"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			viewBox="0 0 100 100"
			enable-background="new 0 0 100 100"
			xml:space="preserve">
			<circle fill="none" stroke="#ff0000" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48" />
			<line
				fill="none"
				stroke-linecap="round"
				stroke="#ff0000"
				stroke-width="4"
				stroke-miterlimit="10"
				x1="50"
				y1="50"
				x2="85"
				y2="50.5">
				<animateTransform
					attributeName="transform"
					dur="2s"
					type="rotate"
					from="0 50 50"
					to="360 50 50"
					repeatCount="indefinite" />
			</line>
			<line
				fill="none"
				stroke-linecap="round"
				stroke="#ff0000"
				stroke-width="4"
				stroke-miterlimit="10"
				x1="50"
				y1="50"
				x2="49.5"
				y2="74">
				<animateTransform
					attributeName="transform"
					dur="15s"
					type="rotate"
					from="0 50 50"
					to="360 50 50"
					repeatCount="indefinite" />
			</line>
		</svg>`}connectedCallback(){document.getElementById("connect-onenote")||(this.id="progress-dialog",this.showModal(),this.innerHTML=this.render(),$on(document.body,"progresscompleted",()=>this.remove()))}};customElements.define("progress-dialog",i,{extends:"dialog"});var y=class extends HTMLElement{constructor(){super()}async addAccount(){await L(crypto.randomUUID()),d.oneNoteRedirect()}async updateAccountName(e,o){o.target.setAttribute("contenteditable","false");let n=o.target.textContent.trim(),{oneAccounts:r}=await s("oneAccounts");r[e].name=n,c({oneAccounts:r}),this.lastElementChild.togglePopover(),this.selectedElem.contains(o.target)&&(this.firstElementChild.value=n)}actions={edit:e=>{let o=e.firstElementChild;o.setAttribute("contenteditable","true"),o.focus(),getSelection().getRangeAt(0).selectNodeContents(o);let n=this.updateAccountName.bind(this,e.id),r=a=>{a.inputType==="insertParagraph"&&(this.updateAccountName(e.id,a),o.removeEventListener("beforeinput",r),o.removeEventListener("blur",n),a.preventDefault())};o.addEventListener("beforeinput",r),o.addEventListener("blur",n,{once:!0})},delete:async e=>{let{oneAccounts:o}=await s("oneAccounts");delete o[e.id],c({oneAccounts:o}),e.hasAttribute("selected")&&this.switchAccount(this.lastElementChild.firstElementChild),e.remove(),this.lastElementChild.togglePopover(),toast(i18n("account_removed"))}};async switchAccount(e){let o=e.firstElementChild.textContent.trim();this.firstElementChild.value=o,this.selectedElem=e,this.selectedElem.setAttribute("selected",""),await c({openAccountId:e.id}),toast(`Fetching ${o} notebooks...`),setTimeout(()=>document.body.appendChild(new i),3e3),chrome.runtime.sendMessage("closeSidePanel").catch(()=>{}),await chrome.runtime.sendMessage({msg:"switchAccount"}),location.reload()}onClick({target:e}){let o=e.closest("li"),n=e.closest("svg");if(n)return this.actions[n.getAttribute("class")](o);if(o.id==="add-account")return this.addAccount();o!==this.selectedElem&&(this.selectedElem.removeAttribute("selected"),this.lastElementChild.togglePopover(),this.switchAccount(o))}render(e,o){let n=Object.keys(e),r=(a,l)=>`<li id=${n[l]}>
					<span>${a.name}</span>
					<svg class="edit" viewBox="0 0 24 24"><path /></svg>
					<svg class="delete" viewBox="0 0 24 24"><path /></svg>
				</li>`;return`<input type="button" popovertarget="switch-account" value="${o}" /><svg class="chev-down" viewBox="0 0 24 24"><path /></svg>
			<menu id="switch-account" popover>
                ${Object.values(e).map(r).join("")}
                <li id="add-account">\u2795 Add account</li>
			</menu>`}async connectedCallback(){let{oneAccounts:e,openAccountId:o}=await s(["oneAccounts","openAccountId"]);this.innerHTML=this.render(e,e[o].name),this.selectedElem=document.getElementById(o),this.selectedElem.setAttribute("selected",""),$on(this.children[1],"click",()=>this.lastElementChild.showPopover()),$on(this.lastElementChild,"click",this.onClick.bind(this))}};customElements.define("account-switch",y);async function O(t,e){let o=t.currentTarget.firstElementChild;o.setAttribute("loading","");let[n]=await chrome.tabs.query({active:!0,currentWindow:!0}),[r,a]=await g(_),l=`<table style="background-color: #f5f5f5;">
        <tbody>
            <tr>
                <td><img src="${a??n.favIconUrl}" width="96"></td>
                <td><b>${n.title}</b> <br> <span>${r.slice(0,200)}</span> <br> <a href="${n.url}">${n.url}</a></td>
            </tr>
        </tbody>
    </table>`;try{let f=e==="new_page"?{htmlContent:l,sectionId:eId("sections").value,pageTitle:n.title}:{htmlContent:l,pageId:e},I=await chrome.runtime.sendMessage(f);if(o.removeAttribute("loading"),I.errCaused)return toast(I.errCaused,!0);toast(i18n("tab_link_inserted")),e==="new_page"||await setStore({lastPageId:e})}catch(f){console.error(f)}}async function x(){try{await browser.sidebarAction.open(),close()}catch(t){toast(t.message)}}async function R(t,e){let o={msg:"insert_pdf_file",srcUrl:t};e==="new_page"?o.sectionId=eId("sections").value:o.pageId=e;let n=await chrome.runtime.sendMessage(o);if(n.errCaused)return toast(n.errCaused,!0);toast(i18n("pdf_file_inserted")),e==="new_page"||await setStore({lastPageId:e})}async function B(t,e){let[o]=await b({currentWindow:!0,active:!0}),n=`<iframe data-original-src="${t}"/>`,r=e==="new_page"?{htmlContent:n,sectionId:eId("sections").value,pageTitle:o.title}:{htmlContent:n,pageId:e},a=await chrome.runtime.sendMessage(r);if(a.errCaused)return toast(a.errCaused,!0);toast(i18n("video_embeded")),e==="new_page"||await setStore({lastPageId:e})}async function S(){try{await g(T),close()}catch(t){console.error(t),toast(t.message,!0)}}async function m(t){try{let e=t==="auto"?"clip-article":"manual-clip-site";await me(`/scripts/clip-site/${e}.js`,e),close()}catch(e){console.error(e),toast(e.message,"error")}}async function me(t,e){let[o]=await chrome.tabs.query({active:!0,currentWindow:!0}),n={target:{tabId:o.id},files:[t]},r=async()=>await chrome.scripting.executeScript(n).catch(a=>console.warn(a));try{e?await chrome.tabs.sendMessage(o.id,e):r()}catch{r()}}async function U({target:t}){let e=t.value,{[e]:o}=await getStore([e]);o||(document.body.appendChild(new i),o=await chrome.runtime.sendMessage({msg:"switchNotebook",notebookId:e}),fireEvent(document.body,"progresscompleted")),setStore({openNotebook:e}),u(o),q(o[0].id)}async function D({currentTarget:t}){t.setAttribute("refreshing",""),toast("Refreshing...");let e=await chrome.runtime.sendMessage({msg:"getNoteBookList"});e&&k(e);let o=e[0].id,{[o]:n}=await getStore([o]);n&&u(n),t.removeAttribute("refreshing")}async function k(t){let e=eId("notebook");t?.forEach(n=>e.add(new Option(n.name.slice(0,39),n.id)));let{openNotebook:o}=await getStore("openNotebook");e.value=o}async function j({target:t}){let e=t.value;setStore({lastSectionId:e});let{[e]:o}=await getStore([e]);q(e,o)}async function v(){toast("Refreshing...");let{openNotebook:t}=await getStore("openNotebook"),e=await chrome.runtime.sendMessage({msg:"getNoteBookSections",notebookId:t});u(e)}async function u(t){if(!Array.isArray(t))return;let e=eId("sections");try{let o=new DocumentFragment;t?.forEach(r=>o.appendChild(new Option(r.name.slice(0,39),r.id))),e.replaceChildren(o);let{lastSectionId:n}=await getStore("lastSectionId");e.value=n??t[0].id}catch(o){console.error(o)}}async function q(t,e){if(e)w(e),chrome.runtime.sendMessage({msg:"replacePageCxtMenu",pages:e});else{document.body.appendChild(new i);let o=await chrome.runtime.sendMessage({msg:"getSectionPages",sectionId:t});fireEvent(document.body,"progresscompleted"),w(o),chrome.runtime.sendMessage({msg:"replacePageCxtMenu",pages:o})}}async function w(t){if(!Array.isArray(t))return;let e=new DocumentFragment;t?.forEach(r=>e.appendChild(new Option(r.title.slice(0,39),r.id)));let{lastPageId:o}=await getStore("lastPageId"),n=$('select[name="pages"]');n.replaceChildren(new Option(i18n("create_new_page"),"new_page"),e),n.value=o??t[0].id}setLang("bookmark_tab");setLang("capture_screenshot");setLang("clip_article");setLang("multi_select_text");setLang("open_side_panel");await s(["oneAccounts","openAccountId"]).then(async({oneAccounts:t,openAccountId:e})=>{t[e].UDI_TKN??(await N()||document.body.appendChild(new d))});var K=eId("notebook"),{notebooks:F,openNotebook:z}=await getStore(["notebooks","openNotebook"]);F&&k(F);$on(K,"change",U);$on(K.previousElementSibling,"click",D);var W=eId("sections");if(z){let t=z,{[t]:e}=await getStore([t]);e?u(e):v()}else document.body.appendChild(new i);$on(W,"change",j);$on(W.previousElementSibling,"click",v);var Z=eId("bookmark"),G=Z.previousElementSibling,{lastSectionId:C}=await getStore("lastSectionId");C&&getStore([C]).then(({[C]:t})=>t&&w(t));$on(Z,"click",t=>O(t,G.value));var ue=eId("screenshot");$on(ue,"click",S);var A=eId("clipArticle");$on(A,"click",m.bind(null,"auto"));var J=eId("multiSelect");$on(J,"click",m);var pe=eId("open_panel_btn");$on(pe,"click",x);chrome.tabs.query({active:!0,currentWindow:!0}).then(t=>{let e=t[0].url;if(e?.endsWith(".pdf")){J.style.display="none",A.style.display="none",A.previousElementSibling.style.display="none";let n=eId("save_pdf_btn");setTimeout(()=>o(n,R),10)}else if(e?.startsWith("https://www.youtube.com/watch?v=")){let n=eId("embed_video_btn");setTimeout(()=>o(n,B),10)}function o(n,r){let a=n.previousElementSibling;a.hidden=!1,a.append(...Array.prototype.map.call(G.children,l=>l.cloneNode(!0))),$on(n,"click",()=>r(e,a.value))}});chrome.runtime.onMessage.addListener((t,e,o)=>{if(t.msg==="deletePage"){let n=document.querySelectorAll(`option[value="${t.pageId}"]`);for(let r of n)r.remove();toast(i18n("selected_page_is_deleted"))}else t.msg==="notifyError"&&toast(t.error)});var he={KeyA:m.bind(null,"auto"),KeyM:m,KeyS:S,KeyW:x};function ge(t){(t.altKey||t.metaKey)&&he[t.code]?.()}document.body.addEventListener("keydown",ge);
