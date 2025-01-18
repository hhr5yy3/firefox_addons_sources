function changeResolutionSelection() {
    Array.from(document.getElementsByClassName('res_option')).forEach(elm=>{
        elm.className = 'res_option unchecked';
    });
    this.className = 'res_option checked';
    updateVideoViewerResolution()
}


// buildVideoSourceFromTSInformation({fragments,total_seconds,head_text,foot_text,url,extendby}) 

async function updateVideoViewerResolution() {
    let video_viewer_cont = document.getElementById('video_viewer_cont');
    let video_elm = video_viewer_cont?.getElementsByTagName('video')?.[0];
    if (video_elm) {
        let jdat = atobJSON(video_viewer_cont.getAttribute('data-stream-btoa'));
        attachVideoSource(jdat,video_elm,false);
    }
}


// async function buildResizableContainer()


function pausePlayingAdVideo(){
    let twitch_vid_elm = Array.from(document.getElementsByTagName('video')).filter(r=>!/pop_out_video/.test(r.className))?.[0];
    if(Array.from(document.querySelectorAll('div span')).filter(elm=> elm.getAttribute('data-a-target') == 'video-ad-label')?.[0] && !twitch_vid_elm.paused ) twitch_vid_elm.pause();
}

async function buildVideoViewer(params) {
    // console.log(params)
    var {channel_login,timestamp,original_title,title} = params;
    const main_width = (window.innerWidth * 0.7);
    const half_main_width = Math.floor(main_width / 2);
    const left_alignment = Math.floor((window.innerWidth - main_width) / 2);
    var resolution_options = Object.entries(params?.valid_resolutions)

    pausePlayingAdVideo()    
    if (gi(document, 'video_viewer_cont'))
    gi(document, 'video_viewer_cont').outerHTML = '';
    let cont = ele('div');
    // delete params.ts_files;
    a(cont, [['id', 'video_viewer_cont'], ['data-stream-btoa', btoaJSON(params)]]);
    inlineStyler(cont, `{position: fixed; top: 5px; width: ${main_width}px; left:5px; z-index: ${topZIndexer()}; background: ${head_color}; border-radius: 0.4em; border: 2px solid ${purple_2}; box-shadow:0px 4px 4px 8px rgba(0,0,0,0.6);}`);//box-shadow:0 4px 8px rgba(0,0,0,.4),0 0px 4px rgba(0,0,0,.4);
    document.body.appendChild(cont);
    cont.onmouseover = topIndexHover;

    let header = document.createElement('div');
    cont.appendChild(header);
    inlineStyler(header, `{padding: 4px; display: grid; grid-template-columns: 28px 1fr 30px 132px 30px; grid-gap:8px; background: linear-gradient(to top left, transparent, transparent, transparent, ${purple_2}); user-select: none;}`);

    let cls_btn = document.createElement('div');
    cls_btn.innerHTML = icons.close;
    header.appendChild(cls_btn);
    inlineStyler(cls_btn, `{transform: translate(0px,2px) scale(1.4,1.4); cursor: pointer;}`);
    cls_btn.onclick = ()=>{ document.getElementById(`video_viewer_cont`).outerHTML = ''; };

    let mover = document.createElement('div');
    inlineStyler(mover, `{text-align: left; cursor: move; padding:4px; font-size:1.2em;}`);
    header.appendChild(mover);
    mover.onmouseover = dragElement;
    mover.innerText = params?.is_live ? `${channel_login} Live` : timestamp ? `${channel_login} Stream From ${timestamp ? dateString((typeof timestamp == 'string' ? parseInt((timestamp*1000)) : timestamp)) : ''}` : '';

    let dl_btn = ele('div');
    inlineStyler(dl_btn, `{cursor:pointer; background:transparent; border-radius:0.4em; height:30px;}`);
    a(dl_btn,[['id','download_ui_btn']]);
    header.appendChild(dl_btn);
    dl_btn.innerHTML = icons.dl_svg;
    dl_btn.onclick = initDownloadVODUI;

    let rate_cont = ele('div');
    header.appendChild(rate_cont);
    let rate_label = ele('div');
    a(rate_label, [['id', 'rate_label'], ['title', 'set video speed']]);
    rate_cont.appendChild(rate_label);
    inlineStyler(rate_label, `{text-align:center;}`);
    rate_label.innerText = '1x';

    let vid_rate = ele('input');
    a(vid_rate, [['id', 'vid_rate'], ['type', 'range'], ['min', '-9'], ['max', '20'], ['value', '0'], ['title', 'set video speed']]);
    rate_cont.appendChild(vid_rate);
    vid_rate.onchange = getPlaybackRate;
    vid_rate.onmousemove = getPlaybackRate;
    vid_rate.onmouseleave = getPlaybackRate;

    let pip = ele('div');
    a(pip, [['title', 'pop out video']]);
    inlineStyler(pip, `{cursor:pointer; background:transparent; border-radius:0.4em; height:30px;}`);
    pip.innerHTML = icons.pip_svg;
    header.appendChild(pip);
    pip.onclick = ()=>{
        if (document.pictureInPictureElement) document.exitPictureInPicture()
        else document.getElementById('video_viewer_cont').getElementsByTagName('video')[0].requestPictureInPicture();
    }

    let tbody = document.createElement('div');
    cont.appendChild(tbody);

    var video = document.createElement('video');
    tbody.appendChild(video);
    a(video, [['data-css',btoaJSON({height:-80,width:-5})],['controls', ''], ['autoplay', ''], ['webkit-playsinline', ''], ['playsinline', ''], ['class', 'pop_out_video'],['id','pop-out-video-elm']]);
    inlineStyler(video, `{border-radius: 0.4em; width:${(main_width) - 20}px;}`);

    let footer = ele('div');
    cont.appendChild(footer);
    inlineStyler(footer, `{display:grid; grid-template-columns: ${(resolution_options.map(kv=>(kv[0].replace(/p\d+|_only/g,'').length * 9))).reduce((a,b)=>a + b)}px 1fr ${params?.is_live ? '90px ' : ''}22px; grid-gap:0px; background: linear-gradient(to bottom right, transparent, transparent, transparent, ${purple_2}); user-select: none;}`);
    // display: grid; grid-template-columns: 28px ${(resolution_options.map(kv=>(kv[0].replace(/p\d+|_only/g,'').length * 9))).reduce((a,b)=>a + b)}px 1fr 132px 30px; grid-gap:8px;
    
    let res_opt_cont = ele('div');
    inlineStyler(res_opt_cont, `{display:grid; grid-template-columns: ${resolution_options.map(kv=>`${((kv[0].replace(/p\d+|_only/g,'').length * 8))}px `).reduce((a,b)=>a + b)}; grid-gap:4px;}`);
    footer.appendChild(res_opt_cont); 
    let current_res_selection = document.getElementsByClassName('res_option checked')[0]?.getAttribute('data-res_option')
    resolution_options.forEach(kv=>{
        let res_option = ele('div');
        a(res_option, [['class', `res_option ${(kv[0] == current_res_selection ? 'checked' : 'unchecked')}`], ['data-res_option', kv[0]],['title',kv[0]]]);
        inlineStyler(res_option, `{font-size:0.7em;}`);
        res_option.innerText = kv[0] == 'chunked' ? 'source' : kv[0] == 'audio_only' ? 'audio' : kv[0].replace(/p\d+/g,'');
        res_opt_cont.appendChild(res_option);
        res_option.onclick = changeResolutionSelection;
    });

    if (!document.getElementsByClassName('res_option checked')?.length) {
        Array.from(document.getElementsByClassName('res_option')).filter(elm=>elm.getAttribute('data-res_option') == 'chunked')[0].setAttribute('class', 'res_option checked');
    }
    let titles = original_title || title ? unqHsh([original_title, title].filter(t=>t), {}).reduce((a,b)=>a + '<br>' + b) : '';
    // footer.innerHTML = `<div style="text-align:center;">${}</div>`;
    let footer_label = ele('div');
    inlineStyler(footer_label, `{cursor:move; text-align:center;}`);
    footer.appendChild(footer_label);
    footer_label.onmouseover = dragElement;
    footer_label.innerHTML = titles;

    if(params?.is_live){
        let livestream_time = ele('div');
        a(livestream_time,[['id','livestream_time']]);
        inlineStyler(livestream_time, `{cursor:move; text-align:center;}`);
        footer.appendChild(livestream_time);
        livestream_time.innerText = getLivestreamTime();
        livestream_time.onmouseover = dragElement;
    }

    let foot_resizer = ele('div');
    a(foot_resizer,[['data-resize-id','video_viewer_cont,pop-out-video-elm'],['id','video-foot_resizer']]);
    inlineStyler(foot_resizer,`{width:22px; height: 22px; cursor:nw-resize;}`)
    footer.appendChild(foot_resizer);
    foot_resizer.innerHTML = icons.resize;
    foot_resizer.onmouseover = adjustElementSize;

    await attachVideoSource(params,video,true);
    video.onmousemove = ifMutedSegmentShowAsMuted;
    if(params?.is_live){
        let current_stream_time = document.getElementsByClassName('live-time')[0] ? getTimeValueFromInputString(document.getElementsByClassName('live-time')[0].innerText) : null;
        video.currentTime = (current_stream_time - 55);
        video.playbackRate = 2;
        rate_label.innerText = '2x';
        vid_rate.value = '10'
    }
}/* buildVideoViewer */


const getLivestreamTime = ()=> document.getElementsByClassName('live-time')?.[0]?.innerText
async function attachVideoSource(params,video,is_initial_build){
    var res_key = document.getElementsByClassName('res_option checked')[0]?.getAttribute('data-res_option') || 'chunked';
    // let live_stream_information = await getStreamInformation();
    var last_time_viewed = video.currentTime;
    // console.log(['video.volume',video.volume])
    var volume = Array.from(document.getElementsByTagName('video')).filter(r=>!/pop_out_video/.test(r.className))?.[0]?.volume;
    var url = params.valid_resolutions[res_key];
    video.src = url;
    var enc = new TextEncoder("utf-8");
    if(params?.is_live){
        let current_stream_time = document.getElementsByClassName('live-time')[0] ? getTimeValueFromInputString(document.getElementsByClassName('live-time')[0].innerText) : null;
        let source_text = buildVideoSourceFromTSInformation({...params,...{url:url,extendby:(current_stream_time-params?.total_seconds)+10}});
        // console.log(['extends',((current_stream_time-params?.total_seconds)+10)]);
        hls.loadSource(URL.createObjectURL(new Blob([enc.encode(source_text)])));
        if(is_initial_build){
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, ()=>{
                video.volume = volume || 0.5;
                video.ontimeupdate = updateLiveStreamViewer;
            });
        }
        if (last_time_viewed) video.currentTime = last_time_viewed;
        getPlaybackRate();
    }else{
        let source_text = buildVideoSourceFromTSInformation({...params,...{url:url}});
        hls.loadSource(
            URL.createObjectURL(new Blob([enc.encode(source_text)]))
        );
        if(is_initial_build){
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, ()=>{
                video.volume = volume || 0.5;
                video.ontimeupdate = updateLiveStreamViewer;
            });
        }
        if (last_time_viewed) video.currentTime = last_time_viewed;
        getPlaybackRate()
    }
    return true;
}/* attachVideoSource */

function buildVideoSourceFromTSInformation(params){
    var {fragments,total_seconds,head_text,foot_text,url,extendby} = params;
    var force2Point = (n)=> /\.\d\d\d/.test(`${n}`) ? `${n}` : /\.\d\d\b/.test(`${n}`) ? `${n}0` : /\.\d\b/.test(`${n}`) ? `${n}00` : `${n}.000`;
    let mid = fragments.map(f=> `#EXTINF:${force2Point(f.s)},\n${url?.replace(/[\w-]+\.m3u8$/, f.path.replace(/unmuted/,'muted'))}\n`).reduce((a,b)=> a+b);
    let extended = extendby && (extendby/10) > 0 ? Array(Math.ceil(extendby/10)).fill().map((_,i)=> `#EXTINF:10.000,\n${url?.replace(/[\w-]+?\.m3u8$/, `${fragments.length+(i)}.ts`)}\n`).reduce((a,b)=> a+b) : '';
    return `${head_text}${total_seconds}\n${mid}${extended}${foot_text}`
}


function getPlaybackRate(){
    let video_viewer_cont = document.getElementById('video_viewer_cont');
    let video_elm = video_viewer_cont?.getElementsByTagName('video')?.[0];
    let vid_rate = document.getElementById('vid_rate');
    let rate_label = document.getElementById('rate_label');
    let play_rate = (vid_rate.value < 0 ? 0 : 1) + (vid_rate.value < 0 ? Math.round((1 - (Math.abs(vid_rate.value) / 10)) * 100) / 100 : ((vid_rate.value) / 10))
    video_elm.playbackRate = play_rate;
    rate_label.innerText = play_rate + 'x';
}


async function updateLiveStreamViewer() {
    let video_viewer_cont = document.getElementById('video_viewer_cont');
    let video = video_viewer_cont?.getElementsByTagName('video')?.[0];
    let twitch_vid_elm = Array.from(document.getElementsByTagName('video')).filter(r=>!/pop_out_video/.test(r.className))?.[0];
    var last_time_viewed = video.currentTime;
    let current_stream_time = document.getElementsByClassName('live-time')[0] ? getTimeValueFromInputString(document.getElementsByClassName('live-time')[0].innerText) : null;
    
    if(gi(document,'livestream_time')) gi(document,'livestream_time').innerHTML = `<span title="stream delay" style="transform:translate(-9px,2px); font-size:0.72em; color:#fa3e3e">${Math.round(last_time_viewed - current_stream_time)}</span><span>${getLivestreamTime()}</span>`;

    let params = atobJSON(video_viewer_cont.getAttribute('data-stream-btoa'));
    let {total_seconds} = params;
    var res_key = document.getElementsByClassName('res_option checked')[0]?.getAttribute('data-res_option') || 'chunked';
    // var volume = video.volume || 0.4;
    var url = params.valid_resolutions[res_key];    
    if (video && !isNaN(video.duration) && ((video?.currentTime + 2) >= video.duration)){

        // console.log(['current_stream_time',current_stream_time]);
        var enc = new TextEncoder("utf-8");
        let source_text = buildVideoSourceFromTSInformation({
            ...params,
            ...{url:url,extendby:(current_stream_time-total_seconds)+10}
        });
        // console.log(['source_text',source_text]);
        hls.loadSource(URL.createObjectURL(new Blob([enc.encode(source_text)])));
        // video.volume = volume;
        video.currentTime = last_time_viewed;
    }
    if (twitch_vid_elm && video && !twitch_vid_elm?.paused && !video.paused) twitch_vid_elm.pause()
}


async function initDownloadVODUI(){
    if(gi(document,'download_selection_btn')){
        // gi(document,'download_ui_btn')
        downloadSelectedVod()
    }else{
        let video_viewer_cont = document.getElementById('video_viewer_cont');
        let video_elm = video_viewer_cont.getElementsByTagName('video')?.[0];
        let params = atobJSON(video_viewer_cont.getAttribute('data-stream-btoa'));
        var res_key = document.getElementsByClassName('res_option checked')[0]?.getAttribute('data-res_option') || 'chunked';
    
        var vid_rect = atobJSON(video_elm.getAttribute('data-css'));
        inlineStyler(video_viewer_cont,`{height:${video_viewer_cont.getBoundingClientRect().height/2}px;}`);
        inlineStyler(video_elm,`{height:${(video_elm.getBoundingClientRect().height/2)+(vid_rect.height/2)}px;}`);

        let video_viewer_cont_rect = video_viewer_cont.getBoundingClientRect();
        let download_container = ele('div');
        a(download_container,[['id','download_container']]);
        inlineStyler(download_container,`{background:${head_color}; border-radius: 0.4em; box-shadow:0px 4px 4px 8px rgba(0,0,0,0.6); position:fixed; top:${video_viewer_cont_rect.bottom+30}px; left:${video_viewer_cont_rect.left}px; width:${window.innerWidth * 0.72}px; z-index:${topZIndexer()};}`);//height:20px;
        document.body.appendChild(download_container);
        download_container.onmouseover = topIndexHover;

        let header = document.createElement('div');
        download_container.appendChild(header);
        inlineStyler(header, `{padding: 4px; display: grid; grid-template-columns: 28px 1fr 28px; grid-gap:8px; background: linear-gradient(to top left, transparent, transparent, transparent, ${purple_2}); user-select: none;}`);
    
        let cls_btn = document.createElement('div');
        cls_btn.innerHTML = icons.close;
        header.appendChild(cls_btn);
        inlineStyler(cls_btn, `{transform: translate(0px,2px) scale(1.4,1.4); cursor: pointer;}`);
        cls_btn.onclick = ()=>{
            document.getElementById(`download_container`).outerHTML = '';
        };
    
        let mover = document.createElement('div');
        inlineStyler(mover, `{text-align: center; cursor: move; padding:4px; font-size:1.2em;}`);
        // mover.innerText = `Recent ${/(?<=tv\/)\w+/.exec(document.getElementsByClassName('channel-info-content')?.[0]?.getElementsByTagName('a')?.[1]?.href)?.[0]} Streams`;
        header.appendChild(mover);
        mover.onmouseover = dragElement;

        let progress_bar = document.createElement('div');
        a(progress_bar, [['id', 'dl_progress_bar_cont']]);
        inlineStyler(progress_bar, `{padding: 8px;}`);
        download_container.appendChild(progress_bar);
        
        let dl_cont = ele('div');
        download_container.appendChild(dl_cont);

    
        if(params?.valid_resolutions[res_key]){
            
            var ts_files = await getTSFilesFromM3u8({url:params?.valid_resolutions[res_key]})
            // console.log(ts_files);
            let current_stream_time = document.getElementsByClassName('live-time')[0] ? getTimeValueFromInputString(document.getElementsByClassName('live-time')[0].innerText) : null;
    
            if(ts_files?.total_seconds){
                if(gi(document,'dualslider_widget')) gi(document,'dualslider_widget').outerHTML = '';
                var min_max = {
                    min: 0,
                    max: params?.is_live ? Math.ceil(current_stream_time/10) : Math.ceil(ts_files?.total_seconds/10),
                };
                var range_dimensions = {
                    bar_height: 14,
                    ball_width: 12,
                    ball_height: 32,
                    container_padding: 44,
                }
                dualRangeSelector({
                    ...range_dimensions,
                    ...{
                        add_background_color:head_color,
                        ball_radius: '0.2em',
                        ball_bg_color: `#772ce8`,
                        bar_bg_color: `#772ce8`,
                        bar_bg_color_alt: `#472ce840`,
                        type: 'number',
                        id: 'dualslider_widget',
                        displayStringTranslation: (n)=>parseTimeOffset((n < min_max.min ? min_max.min : n > min_max.max ? min_max.max * 10 : (Math.floor(n) * 10))),
                        displayNumberTranslation: (s)=>getTimeValueFromInputString(s) / 10,
                        validateInput: (s)=>/\d+h\d+m\d+s/i.test(s),
                        parent_element: dl_cont,
                        parent_element_left: ((dl_cont.getBoundingClientRect()).left),
                        selection_text_suffix: ' selected',
                    },
                    ...min_max
                });
                await delay(332);
                let slider_rect = document.getElementById('dualslider_widget').getBoundingClientRect();
                inlineStyler(dl_cont,`{height:${slider_rect.height+40}px;}`);
            
                let run_download_btn = ele('div');
                dl_cont.appendChild(run_download_btn);//video_viewer_cont
                a(run_download_btn, [['class', 'dl_btn'],['id','download_selection_btn']]);
                inlineStyler(run_download_btn,`{float:right; cursor:pointer; background:${head_color}; transform: translate(0px,${slider_rect.height -20}px);}`);
                run_download_btn.innerText = 'Download VOD Selection';
                run_download_btn.onclick = downloadSelectedVod;
                inlineStyler(run_download_btn,`{transform: translate(-${(slider_rect.width/2) - (run_download_btn.getBoundingClientRect().width/2)}px,${slider_rect.height -20}px);}`);
            }
        }
    }
}
function addFragments(fragments,extendby){
    let extentions = extendby && Math.ceil(extendby/10) ? Array(Math.ceil(extendby/10)).fill().map((_,i)=> fragments.length+i) : [];
    return [
        ...fragments,
        ...extentions.map(n=> { return { i:`${n}`, path:`${n}.ts`, s:10 } })
    ]
}
async function downloadSelectedVod(){
    destroy('download_selection_btn');
    let video_viewer_cont = document.getElementById('video_viewer_cont');
    let params = atobJSON(video_viewer_cont.getAttribute('data-stream-btoa'));
    let resolutions = ['1080', '720', '480', '360', '160', 'Audio Only'];
    var res_key = document.getElementsByClassName('res_option checked')[0]?.getAttribute('data-res_option') || 'chunked';
    let res_multiplier = /source|chunked/.test(res_key) ? 0
    : document.getElementsByClassName('res_option checked')[0] ? resolutions.findIndex(r=>new RegExp('\\b' + r,'i').test(res_key)) : 0;

    let url = params?.valid_resolutions[res_key];
    if(url){
        var ts_files = await getTSFilesFromM3u8({url:url});
        let range_values = Array.from(document.getElementsByClassName('slider_label')).map(elm=>getTimeValueFromInputString(elm.value) / 10).sort((a,b)=>a < b ? -1 : 0);
        let start_range_v = range_values[0];
        let end_range_v = range_values[1];
        let download_range = addFragments(ts_files?.fragments).slice(start_range_v, end_range_v); //
        // (
        //     end_range_v ? (end_range_v-ts_files?.fragments?.length)
        // )
        let chop_num = /audio/i.test(res_key) ? download_range.length : (250 * (res_multiplier > 0 ? (res_multiplier + 1) : 1));
        let chopped_range = subArr(download_range, chop_num);
        for (let ii = 0; ii < chopped_range.length; ii++) {
            await downloadVideoRange({
                range_values:range_values,
                chopped_range:chopped_range[ii],
                total_segments:(end_range_v - start_range_v),
                chop_index:ii,
                chop_num:chop_num,
                url:url,
            });
        }
    }
}

const download_times = [];

const getTimeRemaining = (remaining,total_segments)=>{
    let total = download_times.filter(t=>t ? t : 100).reduce((a,b)=>a + b);
    let avg_duration = total / download_times.length;
    let total_time = (total_segments * avg_duration);
    return total_time * (1 - remaining);
}

const getElapsedTime = ()=>download_times.reduce((a,b)=>a + b)

async function downloadVideoRange(params){
    var failed_records = [];
    var {range_values,chopped_range,total_segments, chop_index, chop_num, url} = params;
    var res_key = document.getElementsByClassName('res_option checked')[0]?.getAttribute('data-res_option') || 'chunked';
    let blobs = [];
    let num_chops = Math.ceil(total_segments / chop_num);
    for (let i = 0; i < chopped_range.length; i++) {
        let current_segment_index = (chop_index * chop_num) + (i + 1);
        let percent_of_total = current_segment_index / total_segments;
        let display_percent_of_total = Math.ceil((percent_of_total) * 10000) / 100 === Infinity ? 0.01 : Math.ceil((percent_of_total) * 10000) / 100;
        let display_percent_of_range = Math.ceil(((i + 1) / chopped_range.length) * 10000) / 100;
        let total_background_img = `padding: 4px; border-radius: 0.4em; background-image: linear-gradient(to right, ${purple_1} 0%, ${purple_1} ${Math.round(display_percent_of_total)}%, ${purple_4} ${Math.round(display_percent_of_total)}%, ${purple_4} 100%);`
        let range_background_img = `padding: 4px; border-radius: 0.4em; background-image: linear-gradient(to right, ${purple_1} 0%, ${purple_1} ${Math.round(display_percent_of_range)}%, ${purple_4} ${Math.round(display_percent_of_range)}%, ${purple_4} 100%);`
        let record = chopped_range[i];
        // .replace(/(\d{3}p\d{0,2}|chunked)\/.+?m3u8/,'chunked/')
        let starting_time = new Date().getTime();
        let ts_url = url.replace(/index-dvr\.m3u8/, '') + record.path.replace(/-unmuted\.ts/g, '-muted.ts');
        let blob = await getDownloadableArrayBuffer(ts_url);
        let ending_time = new Date().getTime();
        download_times.push((ending_time - starting_time));

        let elapsed_time = getElapsedTime();
        let ms_remaining = getTimeRemaining(percent_of_total, total_segments);
        let remaining_minutes = Math.round((((ms_remaining) / 1000) / 60) * 100) / 100;
        if (blob) blobs.push(blob);
        if(gi(document, 'dl_progress_bar_cont')){
            if(!blob){
                failed_records.push(record)
            }
            gi(document, 'dl_progress_bar_cont').innerHTML = `<div style="display:grid; grid-template-rows: 1fr 1fr 1fr 1fr; grid-gap:6px;">
            <div><span style="color:#fa3e3e; padding: 4px;">Do NOT close this tab.</span><span> Refresh the tab to stop and start over.</span></div>
            ${num_chops > 1 ? '<div style="padding: 4px;">download chopped into ' + num_chops + ' parts</div>' : '<div style="padding: 4px;">downloading ' + parseTimeOffset((chopped_range.at(-1).i * 10) - (chopped_range[0].i * 10)) + ' segment. Approximate minutes remaning: ' + remaining_minutes + '</div>'}
            ${(failed_records.length) ? '<div>'+(failed_records.length ) + 'segments failed to download</div>' : ''}
            <div style="${range_background_img} display:grid; grid-template-columns: 45px 25px 90px 25px 90px; grid-gap:2px;">
                <div>${display_percent_of_range}%</div>
                <div> of </div>
                <div>${parseTimeOffset(chopped_range[0].i * 10)}</div>
                <div> to </div>
                <div>${parseTimeOffset(chopped_range.at(-1).i * 10)}</div>
            </div>
            ${num_chops > 1 ? '<div style="' + total_background_img + ' display:grid; grid-template-columns: 45px 25px 90px 25px 90px; grid-gap:2px;"><div>' + display_percent_of_total + '%</div><div> of </div><div>' + parseTimeOffset(range_values[0] * 10) + '</div><div> to </div><div>' + parseTimeOffset(range_values[1] * 10) + '</div></div>' : ''}
        </div>`;
        }
    }
    if(gi(document, 'dl_progress_bar_cont')) gi(document, 'dl_progress_bar_cont').innerHTML = `<div>download ${blobs?.length ? 'complete' : 'failed. No valid segments available.'}</div><div>${failed_records?.length ? 'approximately '+(failed_records.length) + ' of ' + (total_segments) +' segments failed to download' : ''}</div>`;
    console.log(['blobs',blobs])
    if(blobs.length){
        let current_time_range = parseTimeOffset(chopped_range[0].i * 10) + ' to ' + parseTimeOffset((chopped_range.at(-1).i * 10) + chopped_range.at(-1).s);
        let m3u8_tokens = (/(?<=\/)\w{20}_\w+_\d+_\d+(?=\/)/.exec(url)?.[0] || /(?<=\/)\w{20}_\w+_\d+_\d+(?=\/)/.exec(url)?.[0])?.split(/_/);
        let filename = `${current_time_range} ${m3u8_tokens[1]} ${dateString(parseInt(m3u8_tokens[3])*1000)}${/audio/.test(res_key) ? '.wav' : '.mp4'}`;
        let blob_dl = /audio/.test(res_key) ? new Blob(blobs,{
            type: 'audio/vnd.wave;codec=0'
        }) : new Blob(blobs,{
            type: 'video/MP2T'
        });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob_dl);
        link.download = filename;
        link.click();
    } else {
        console.log(['failed to download'])
    }
}





















async function buildMenuOptions(ref_elm){
    // let ref_elm_rect;
    if(gi(document,'vod_menu_options')) {
        gi(document,'vod_menu_options').outerHTML = '';
        window.removeEventListener('click',removeMenuOptions);
    }
    window.addEventListener('click',removeMenuOptions);
    let ref_rect = ref_elm.getBoundingClientRect();
    let channel_login = /(?<=tv\/)\w+/.exec(document.getElementsByClassName('channel-info-content')?.[0]?.getElementsByTagName('a')?.[1]?.href)?.[0];
    let cont = ele('div');
    a(cont,[['id','vod_menu_options']]);
    document.body.appendChild(cont);
    inlineStyler(cont,`{padding:12px; background: ${head_color}; position:fixed; left:${ref_rect.left+ref_rect.width}px; top:${ref_rect.top}px; z-index:${topZIndexer()}; border-radius:0.2em;box-shadow:0 4px 8px rgba(0,0,0,.4),0 0px 4px rgba(0,0,0,.4);}`);//#4d0045
    let is_stream_page = getLiveTimeFromDOM() && !/twitch\.tv\/\w+\/(settings|directory|\/u\/)/.test(currentUrl()) && /twitch\.tv\/\w+($|\?)/.test(currentUrl())
    let is_vod_page = /twitch\.tv\/videos\/\d+/.test(currentUrl())

    cont.innerHTML = `
    ${is_vod_page ? '<div class="hover_opt" id="getStreamDataFromTwitchVodPage"style="box-shadow:0 4px 8px rgba(0,0,0,.4),0 0px 4px rgba(0,0,0,.4); display:grid; grid-template-columns: 22px 1fr; grid-gap:8px;"><img style="height:22px; width:22px;" src="'+icons.clip2+'"></img><div>View/Download this VOD without Ads</div></div>' : ''}
    ${is_stream_page ? '<div id="getLiveStreamInformation" class="hover_opt" style="box-shadow:0 4px 8px rgba(0,0,0,.4),0 0px 4px rgba(0,0,0,.4); display:grid; grid-template-columns: 22px 1fr; grid-gap:8px;"><img style="height:22px; width:22px;" src="'+icons.clip2+'"></img><div>View/Download Stream without Ads</div></div>' : ''}
    
    <div style="height:22px;"></div>

    ${channel_login ? '<div style="box-shadow:0 4px 8px rgba(0,0,0,.4),0 0px 4px rgba(0,0,0,.4); display:grid; grid-template-columns: 22px 1fr; grid-gap:8px;" class="hover_opt" id="show_previous_stream_options"><div>'+icons.streams+'</div><div>Get 20 Most Recent Streams</div></div>' : ''}

    <div style="height:22px;"></div>
    <div title="go to twitchtracker.com to get the stream link" style="background:transparent; box-shadow: #0d0b0f 1px 2px 1px 0px inset, #b290ae -1px -0px 0px 0px inset; padding:4px;">
        <div style="color:#b290ae; font-size: 1.4em; text-align:center;">Get VOD with Twitchtracker Link</div>
        <img id="vod_fromtwitchtracker_icon" for="getVODfromTwitchTracker" class="hover_opt" style="height:38px; width:38px;" src="${icons.clip2}"></img>
        <input style="padding:2px; border-radius:0.2em; background:transparent; box-shadow: #0d0b0f 2px 4px 1px 0px inset, #b290ae -1px -1px 1px 0px inset; outline: none; color: #b290ae; font-size: 1.1em;" id="getVODfromTwitchTracker" placeholder="twitchtracker.com/sourcingsupport/streams/46938664237"></input>
    </div>`;


    let vod_btn = gi(document,'getStreamDataFromTwitchVodPage'); 
    if(vod_btn) vod_btn.onclick = async ()=>{
        // let vod_builder_data = await getStreamDataFromTwitchVodPage(vod_btn);
        // buildVideoViewerHolder(vod_builder_data)
        runProgram()
    }

    let stream_btn = gi(document,'getLiveStreamInformation'); 
    if(stream_btn) stream_btn.onclick = async ()=>{
        // let stream_builder_information = await getLiveStreamInformation(stream_btn);
        // buildVideoViewerHolder(stream_builder_information)
        runProgram()
    }    

    let show_previous_stream_options = gi(document,'show_previous_stream_options');
    if(show_previous_stream_options) {
        show_previous_stream_options.onclick = async ()=> {
            let recent_streams = await getRecentStreamChartsData();
            // console.log(['recent_streams',recent_streams])
            let recent_vods = await getAvailableVODinfo();
            // console.log(['recent_vods',recent_vods])
            let marked_streams = markNukedStreams(recent_streams, recent_vods);
            buildRecentStreamsOption(marked_streams);
        };
    }
    // 

    let tw_input = gi(document,'getVODfromTwitchTracker');
    let vod_fromtwitchtracker_icon = gi(document,'vod_fromtwitchtracker_icon');
    inlineStyler(tw_input,`{transform:translate(0px,${tw_input.getBoundingClientRect().height/3}px); width:${tw_input.parentElement.getBoundingClientRect().width - tw_input.parentElement.getElementsByTagName('img')[0].getBoundingClientRect().width}px;}`);
    vod_fromtwitchtracker_icon.onclick = async ()=> {
        let params = {channel_login:/\/(\w+)\/streams\/(\d+)/.exec(tw_input.value)?.[1],stream_id:/\/(\w+)\/streams\/(\d+)/.exec(tw_input.value)?.[2]}        
        if(params?.stream_id) {
            let stream_details = await getVODfromTwitchTracker(params);
            // console.log(stream_details);
            buildVideoViewer(stream_details);
        }
    }
    tw_input.onkeyup = async (e)=> {
        let params = {channel_login:/\/(\w+)\/streams\/(\d+)/.exec(tw_input.value)?.[1],stream_id:/\/(\w+)\/streams\/(\d+)/.exec(tw_input.value)?.[2]}
        if(/enter/i.test(e.key) && params?.stream_id) {
            let stream_details = await getVODfromTwitchTracker(params);
            // console.log(stream_details);
            buildVideoViewer(stream_details);
        }
    }
    // cont.onmouseleave = ()=> {cont.outerHTML = '';}
}


async function buildRecentStreamsOption(marked_streams) {
    const main_width = (window.innerWidth * 0.7);
    const half_main_width = Math.floor(main_width / 2);
    const left_alignment = Math.floor((window.innerWidth - main_width) / 2);
    
    if (gi(document, 'recent_streams_container')) gi(document, 'recent_streams_container').outerHTML = '';
    let cont = ele('div');
    a(cont, [['id', 'recent_streams_container']]);
    inlineStyler(cont, `{position: fixed; top: 80px; height: ${(window.innerHeight * 0.8)}px; width: ${main_width}px; left:${left_alignment}px; z-index: ${topZIndexer()}; background: ${head_color}; border-radius: 0.4em; border: 2px solid ${purple_2};}`);
    document.body.appendChild(cont);
    cont.onmouseover = topIndexHover;

    let header = document.createElement('div');
    cont.appendChild(header);
    inlineStyler(header, `{padding: 4px; display: grid; grid-template-columns: 28px 1fr 28px; grid-gap:8px; background: linear-gradient(to top left, transparent, transparent, transparent, ${purple_2}); user-select: none;}`);

    let cls_btn = document.createElement('div');
    cls_btn.innerHTML = icons.close;
    header.appendChild(cls_btn);
    inlineStyler(cls_btn, `{transform: translate(0px,2px) scale(1.4,1.4); cursor: pointer;}`);
    cls_btn.onclick = ()=>{
        document.getElementById(`recent_streams_container`).outerHTML = '';
    };

    let mover = document.createElement('div');
    inlineStyler(mover, `{text-align: center; cursor: move; padding:4px; font-size:1.2em;}`);
    mover.innerText = `Recent ${/(?<=tv\/)\w+/.exec(document.getElementsByClassName('channel-info-content')?.[0]?.getElementsByTagName('a')?.[1]?.href)?.[0]} Streams`;
    header.appendChild(mover);
    mover.onmouseover = dragElement;

    let tbody = document.createElement('div');
    cont.appendChild(tbody);
    let tbod_offset = -((header.getBoundingClientRect().height+16));
    // console.log(['tbod_offset',tbod_offset]);
    a(tbody, [['id', 'recent_streams_tbody'],['data-css',btoaJSON({height:tbod_offset,width:-4})]]);
    inlineStyler(tbody, `{padding: 8px; display:grid; grid-template-rows: ; grid-gap:8px; height:${(window.innerHeight * 0.8) + tbod_offset}px; overflow:auto;}`);

    let stream_cards_cont = ele('div');
    a(stream_cards_cont, [['id', 'stream_cards_cont']]);
    tbody.appendChild(stream_cards_cont);

    marked_streams.forEach((r,i)=>{
        let row = ele('div');
        a(row, [['data-stream-btoa', btoaJSON(r)], ['class', `stream_download_options ${i}_recent_stream`]]);
        stream_cards_cont.appendChild(row);
        row.onclick = async ()=> {
            let dd = r;
            let stream_details = await getVODfromTwitchTracker(dd);
            // console.log(stream_details);
            if(stream_details) buildVideoViewer(stream_details);
            
        };

        let titles = unqHsh([(r?.original_title ? r?.original_title : ''), (r?.title ? r?.title : '')], {});
        row.innerHTML = `
        <div style="cursor: pointer; display:grid; grid-template-columns:42px 80px 120px 90px 1fr; grid-gap:6px;">
            <div>${r?.is_nuked ? '☢' : '📼'}</div>
            <div style="height:45px; overflow:hidden;">${r?.animated_preview_url ? '<img class="preview_img" src="' + r?.animated_preview_url + '"></img>' : ''}</div>
            <div>${r?.timestamp ? dateString(r?.timestamp) : ''}</div>
            <div>${r?.duration ? r?.duration : ''}</div>
            <div style="display:grid; grid-template-rows:1fr 1fr; grid-gap:4px;">
                <div>${titles[0] ? titles[0] : ''}</div>
                <div>${titles[1] ? titles[1] : ''}</div>
            </div>
        </img>            
        `;
    });
    let footer = ele('div');
    cont.appendChild(footer);
    inlineStyler(footer, `{display:grid; grid-template-columns:1fr 12px; grid-gap:0px; background: linear-gradient(to bottom right, transparent, transparent, transparent, ${purple_2}); user-select: none;}`);
    // let titles = original_title || title ? unqHsh([original_title,title].filter(t=> t),{}).reduce((a,b)=> a+'<br>'+b) : '';
    let footer_label = ele('div');
    inlineStyler(footer_label, `{cursor:move; text-align:center; width:100%; height: 12px;}`);
    footer.appendChild(footer_label);
    footer_label.onmouseover = dragElement;

    let foot_resizer = ele('div');
    a(foot_resizer,[['data-resize-id','recent_streams_container,recent_streams_tbody'],['id','recent_stream-foot_resizer']]);
    inlineStyler(foot_resizer,`{width:12px; height: 12px; cursor:nw-resize;}`)
    footer.appendChild(foot_resizer);
    foot_resizer.innerHTML = icons.resize;
    foot_resizer.onmouseover = adjustElementSize;

}















function chopSequence(logs, key) {
    let next_logs = [[logs[0]]];
    for (let i = 1; i < logs.length; i++) {
        let l1 = key ? logs[i][key] : logs[i];
        let l2 = key ? logs[(i - 1)][key] + 1 : logs[(i - 1)] + 1;
        if (l1 == l2)
            next_logs.at(-1).push(logs[i]);
        else
            next_logs.push([logs[i]])
    }
    return next_logs;
}
var muted_seconds;
function ifMutedSegmentShowAsMuted() {
    //total_seconds
    // for(let i=0; i<total_seconds; i++){
    if (document.getElementById('video_viewer_cont')) {
        let video_current_time = Math.round(document.getElementById('video_viewer_cont').getElementsByTagName('video')[0].currentTime / 10) * 10;
        let duration = document.getElementById('video_viewer_cont').getElementsByTagName('video')[0].duration;
        if (muted_seconds?.some(s=>s == video_current_time)) {
            // if(document.getElementById('audio_muted')) document.getElementById('audio_muted').outerHTML = '';
            if (document.getElementById('audio_muted')) {
                document.getElementById('skip_to_unmuted').innerText = 'Skip To Unmuted';
            } else {
                let video_elm = document.getElementById('video_viewer_cont').getElementsByTagName('video')?.[0];
                let video_elm_rect = video_elm.getBoundingClientRect();
                let audio_muted = document.createElement('div');
                audio_muted.setAttribute('style', `transform:translate(${(document.getElementById('video_viewer_cont').getBoundingClientRect().width - video_elm_rect.width) / 2}px,${video_elm_rect.height * 0.2}px); position:absolute; width: ${video_elm_rect.width}px; height:${video_elm_rect.height * 0.4}px; top:${video_elm_rect.top}px;`);
                audio_muted.setAttribute('id', 'audio_muted');
                audio_muted.innerHTML = `<div style="text-shadow: 2px 3px 4px #1c1c1c; transform:translate(0px,${(video_elm_rect.height * 0.4) / 3}px); text-align:center; font-size: 2em; color: #4287f5;">Audio Muted From Server</div>`;
                document.getElementById('video_viewer_cont').appendChild(audio_muted);

                let skip_to_unmuted = document.createElement('div');
                let sequenced_muted_seconds = chopSequence(muted_seconds.map(s=>s / 10));
                let sequence_i = sequenced_muted_seconds.findIndex(i=>i.indexOf(Math.round(document.getElementById('video_viewer_cont').getElementsByTagName('video')[0].currentTime / 10)) >= 0)
                let next = sequenced_muted_seconds[sequence_i].at(-1);
                skip_to_unmuted.innerHTML = `<div id="skip_to_unmuted" style="width: 280px; padding:6px; cursor: pointer; transform:translate(${(video_elm_rect.width / 2) - (140)}px,${(video_elm_rect.height * 0.4) / 2}px); text-align:center; font-size: 2em; background: #f542b955; border-radius: 1em; color: #ffffff;">Skip To Unmuted</div>`;
                skip_to_unmuted.onclick = ()=>{
                    if (next)
                        document.getElementById('video_viewer_cont').getElementsByTagName('video')[0].currentTime = (next * 10) + 9;
                    if (document.getElementById('audio_muted'))
                        document.getElementById('audio_muted').outerHTML = '';
                }
                audio_muted.appendChild(skip_to_unmuted);
            }
        } else {
            if (document.getElementById('audio_muted')) document.getElementById('audio_muted').outerHTML = '';
        }
    }
}