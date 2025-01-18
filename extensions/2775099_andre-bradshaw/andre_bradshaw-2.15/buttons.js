function createInitProgramBtn(){
    if(!gi(document,'init_program_btn')){
        let nav = document.getElementsByTagName('nav')?.[0];
        let search_bar = nav?.getElementsByTagName('div')?.[0] ? Array.from(nav?.getElementsByTagName('div')).filter(i=>i.getAttribute('data-a-target') == "nav-search-box")?.[0]?.parentElement?.parentElement : [];
        let main_nav = document.getElementById('main-nav');
        let init_program_btn = ele('img');
        a(init_program_btn, [['src', icons.clip1], ['id', 'init_program_btn']]);
        inlineStyler(init_program_btn, `{cursor:pointer; transform:scale(0.7,0.7) translate(5px,-1px);}`);
        if(isTwitchtv()) search_bar.parentElement.insertBefore(init_program_btn, search_bar);
        if(isTwitctracker()) main_nav.insertBefore(init_program_btn, main_nav.firstChild);
        init_program_btn.onclick = initBtnClicked;
        init_program_btn.onmouseenter = ()=> a(init_program_btn,[['src',icons.clip2]])
        init_program_btn.onmouseleave = ()=> a(init_program_btn,[['src',icons.clip1]])
        init_program_btn.onmouseover = ()=> {
            if(!gi(document,'app_options_cont')) buildMenuOptions(init_program_btn)
        };
        init_program_btn.ontouchstart = ()=> {
            if(!gi(document,'app_options_cont')) buildMenuOptions(init_program_btn)
        };
    }
    if (/twitch\.tv\/videos\/\d+/.test(currentUrl())) {
        if(!gi(document,'skip_sub_only_vod')){
            subOnlyVodBtn()
        }
    }
}

async function subOnlyVodBtn(){
    let sub_only = document.getElementsByClassName('content-overlay-gate__allow-pointers');
    if(sub_only?.length){
        sub_only[1].outerHTML = '';
        sub_only[0].innerHTML = `<div style="opacity:0.8; text-decoration: line-through;">${sub_only[0].innerText}</div><div style="height:8px;"></div><div>Just kidding</div>`;
        let view_vod_btn = ele('button');
        a(view_vod_btn,[['id','skip_sub_only_vod'],['class','content-overlay-gate__allow-pointers ScCoreButton-sc-1qn4ixc-0 ScCoreButtonPrimary-sc-1qn4ixc-1 ffyxRu dDxrgX']]);
        inlineStyler(view_vod_btn,`{cursor:pointer;}`);
        sub_only[0].parentElement.appendChild(view_vod_btn);
        view_vod_btn.innerHTML = `<div class="ScCoreButtonLabel-sc-lh1yxp-0 iiHmsB"><div data-a-target="tw-core-button-label-text" class="Layout-sc-nxg1ff-0 dWdTjI">Watch VOD</div></div>`;
        view_vod_btn.onclick = async ()=> {
            initBtnClicked();
            // let vod_builder_data = await getStreamDataFromTwitchVodPage(view_vod_btn);
            // buildVideoViewerHolder(vod_builder_data)
        }
    }
}

async function initBtnClicked(){
    // console.log('initBtnClicked')
    runProgram()
}


function removeMenuOptions(e){
    let elm = gi(document,'vod_menu_options');
    let rect = elm.getBoundingClientRect();
    if(!(e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom)){
        window.removeEventListener('click',removeMenuOptions);
        elm.outerHTML = '';
    }
}
