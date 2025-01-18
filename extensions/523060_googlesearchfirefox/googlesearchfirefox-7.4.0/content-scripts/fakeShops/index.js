(()=>{let e=null,t=null;async function s(e){e.preventDefault(),n(),chrome.runtime.sendMessage({cmd:"CMD_ALLOW_FAKE_SHOP",bsInfo:t}).catch(e=>console.log(e))}function n(){e&&(e.style.display="none")}chrome.runtime.onMessage.addListener(function(o){if("CMD_SHOW_MODAL"===o.cmd){var a,d;a=o.bsInfo,d=o?.hidden,t=a,e&&!d?e.style.display="flex":function(t,o){var a;let d=document.createElement("div");d.id="ts-fs-modal",(e=document.createElement("div")).id="ts-fs-modal-overlay",d.innerHTML=(a=function(){let e=document.createElement("div");function t(t){return e.textContent=t,e.textContent}return{header:t(chrome.i18n.getMessage("p_fakeShop_header")),line1:t(chrome.i18n.getMessage("p_fakeShop_line1")),line2:t(chrome.i18n.getMessage("p_fakeShop_line2")),buttonLink:t(chrome.i18n.getMessage("p_invalidShop_button_link")),buttonText:t(chrome.i18n.getMessage("p_fakeShop_button")),footer:t(chrome.i18n.getMessage("p_fakeShop_footer"))}}(),`
            <div class="ts-fs-modal-background"></div>
            <div class="ts-fs-modal-header">
                ${a.header}
                <div class="ts-fs-modal-ico"></div>
            </div>

            <div class="ts-fs-modal-main">
                <div class="ts-fs-modal-section">
                    ${a.line1}
                </div>
                <div class="ts-fs-modal-section">
                    <div>${a.line2}</div>
                </div>

                <div class="ts-fs-modal-footer">
                    <div class="ts-fs-modal-footer-left">
                        <a id="ts-fs-modal-allow" class="ts-fs-modal-link" href="#">${a.footer}</a>
                    </div>
                    <div class="ts-fs-modal-footer-right">
                        <a class="ts-fs-modal-button" href="${a.buttonLink}" target="_blank">${a.buttonText}</a>
                    </div>
                </div>
            </div>
        `),o&&n(),e.appendChild(d),document.body.appendChild(e);let i=document.getElementById("ts-fs-modal-allow");i&&i.addEventListener("click",s)}(0,d)}})})();
