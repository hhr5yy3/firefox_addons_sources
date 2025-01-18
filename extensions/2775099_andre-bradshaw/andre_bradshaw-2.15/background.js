chrome.runtime.onMessage.addListener((msg, sender, response) => {
    requestFromClientManager(msg).then(response);
    return true;
});
var cleanObject = (ob) => 
  Object.entries(ob).reduce((r, [k, v]) => {
    if( v != null && v != undefined && v !== "" && ( ['string','number','boolean','function','symbol'].some(opt=> typeof v == opt) || (typeof v == 'object' && ((Array.isArray(v) && v.length) || (Array.isArray(v) != true) ) ) ) ) { 
      r[k] = v; 
      return r;
    } else { 
     return r; 
    }
  }, {});
async function requestFromClientManager(msg){
    if(msg.cmd == 'getStreamDetailsFromStreamId') return await getStreamDetailsFromStreamId(msg.params);
    if(msg.cmd == 'getStreamDetailsFromVODdetails') return await getStreamDetailsFromVODdetails(msg.params);
    if(msg.cmd == 'getTSFilesFromM3u8') return await getTSFilesFromM3u8(msg.params);
    
    if(msg.cmd == 'getAvailableVODinfo') return await getAvailableVODinfo(msg.params);
    if(msg.cmd == 'getRecentStreamsFromStreamCharts') return await getRecentStreamsFromStreamCharts(msg.params);
    if(msg.cmd == 'getStreamInformation') return await getStreamInformation(msg.params);
    if(msg.cmd == 'getValidResolutions') return await getValidResolutions(msg.params);
    if(msg.cmd == 'getExactStreamStartTimeFromStreamchart') return await getExactStreamStartTimeFromStreamchart(msg.params);    
    if(msg.cmd == 'SHA1') return SHA1(msg.params)
}
var subArr = (r, n) => r.reduceRight((a,b,c,d) => [...a, d.splice(0,n)],[]);
const tryJSON = (s)=> {try{return JSON.parse(s)} catch(err){return null}};

async function fetchTexts(arr){
    let res = await Promise.all(arr.map(e => fetch(e)));
    return await Promise.all(res.map(async (e) => {
        let text = await e.text();
        return {
            text: text,
            url:e.url
        }
    }));    
}
function getHighestKey(ob){
    var nums = Object.keys(ob).map(d=> /^\d+/.exec(d)?.[0] ? /^\d+/.exec(d)?.[0] : 0 ).map(d=> parseInt(d));
    var largest = Math.max(...nums).toString();
    return Object.keys(ob).filter(i=> new RegExp(largest.toString()).test(i))[0];
}
function SHA1(msg) {    const rotate_left = (n,s)=> ( n<<s ) | (n>>>(32-s));    function cvt_hex(val) {        var str='';        var i, v;        for( i=7; i>=0; i-- ) {            v = (val>>>(i*4))&0x0f;            str += v.toString(16);        }        return str;    };    function Utf8Encode(string) {        string = string.replace(/\r\n/g,'\n');        var utftext = '';        for (var n = 0; n < string.length; n++) {            var c = string.charCodeAt(n);            if (c < 128) {                utftext += String.fromCharCode(c);            }            else if((c > 127) && (c < 2048)) {                utftext += String.fromCharCode((c >> 6) | 192);                utftext += String.fromCharCode((c & 63) | 128);            }            else {                utftext += String.fromCharCode((c >> 12) | 224);                utftext += String.fromCharCode(((c >> 6) & 63) | 128);                utftext += String.fromCharCode((c & 63) | 128);            }        }        return utftext;    };    var blockstart;    var i, j;    var W = new Array(80);    var H0 = 0x67452301;    var H1 = 0xEFCDAB89;    var H2 = 0x98BADCFE;    var H3 = 0x10325476;    var H4 = 0xC3D2E1F0;    var A, B, C, D, E;    var temp;    msg = Utf8Encode(msg);    var msg_len = msg.length;    var word_array = new Array();    for( i=0; i<msg_len-3; i+=4 ) {        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);        word_array.push( j );    }    switch( msg_len % 4 ) {        case 0:        i = 0x080000000;        break;        case 1:        i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;        break;        case 2:        i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;        break;        case 3:        i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8 | 0x80;        break;    }    word_array.push( i );    while( (word_array.length % 16) != 14 ) word_array.push( 0 );    word_array.push( msg_len>>>29 );    word_array.push( (msg_len<<3)&0x0ffffffff );    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);        A = H0;        B = H1;        C = H2;        D = H3;        E = H4;        for( i= 0; i<=19; i++ ) {            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;            E = D;            D = C;            C = rotate_left(B,30);            B = A;            A = temp;        }        for( i=20; i<=39; i++ ) {            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;            E = D;            D = C;            C = rotate_left(B,30);            B = A;            A = temp;        }        for( i=40; i<=59; i++ ) {            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;            E = D;            D = C;            C = rotate_left(B,30);            B = A;            A = temp;        }        for( i=60; i<=79; i++ ) {            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;            E = D;            D = C;            C = rotate_left(B,30);            B = A;            A = temp;        }        H0 = (H0 + A) & 0x0ffffffff;        H1 = (H1 + B) & 0x0ffffffff;        H2 = (H2 + C) & 0x0ffffffff;        H3 = (H3 + D) & 0x0ffffffff;        H4 = (H4 + E) & 0x0ffffffff;    }    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);    return temp.toLowerCase();}


async function getStreamInformation(params){
    var {device_id,client_id,oauth,vod_id,channel_login} = params;
    var res = await fetch("https://gql.twitch.tv/gql", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US",
            "authorization": oauth ? oauth : 'undefined',
            "client-id": client_id,
            "content-type": "text/plain;charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"106\", \"Microsoft Edge\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "cache-control": "no-cache"
        },
        "referrer": "https://www.twitch.tv/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `[{\"operationName\":\"UseLive\",\"variables\":{\"channelLogin\":\"${channel_login ? channel_login : ''}\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"639d5f11bfb8bf3053b424d9ef650d04c4ebb7d94711d644afb08fe9a0fad5d9\"}}}]`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    var d = await res.json();
    // console.log(['getStreamInformation',d]);
    let outob = {
        stream_id: d[0]?.data?.user?.stream?.id,
        timestamp: new Date(d[0]?.data?.user?.stream?.createdAt).getTime(),
        start_timestamp_seconds: d[0]?.data?.user?.stream?.createdAt ? Math.floor(new Date(d[0]?.data?.user?.stream?.createdAt).getTime()/1000) : null,
    };
    return {
        ...params,
        ...outob,
        ...{
            hash:SHA1(`${channel_login ? channel_login : login}_${outob.stream_id}_${outob.start_timestamp_seconds}`).slice(0,20)
        }
    }
}



async function getRecentStreamsFromStreamCharts(params){/* get 20 recent streams from streamcharts */
    var {channel_login} = params;
    var res = await fetch(`https://streamscharts.com/channels/${channel_login}/streams`);
    var text = await res.text();
    var text_blocks = text.match(/<tr[\s\S\n]+?<\/tr>/gi);
    var rows = text_blocks?.[0] ? Array.from(text_blocks)?.map(html=> {
        let atag = /<a href="https:\/\/streamscharts.com\/channels\/\w+\/streams[\s\S\n]+?<\/a>/i.exec(html)?.[0];
        let thumbnail = /<img src="(.+?)"/.exec(html)?.[1];
        let date_str = /LIVE<\/span>([\s\S\n]+?\d)<\/span>/i.exec(atag)?.[1] ? /LIVE<\/span>([\s\S\n]+?\d)<\/span>/i.exec(atag)?.[1]?.trim() : /<span class="text-sm font-bold">([\s\S\n]+?)<\/span>/.exec(atag)?.[1]?.trim();
        let target_date = /\d{4},\s+\d{2}:\d{2}/.test(date_str) ? new Date(date_str) : getAmbuiousDate(date_str);
        let stream_start_timestamp = target_date.getTime() + (-(target_date.getTimezoneOffset()*60000));
        let spans = atag?.match(/<span[\s+\S+\n]+?<\/span>/gi) ? Array.from(atag.match(/<span[\s+\S+\n]+?<\/span>/gi)).map(span=> span?.replace(/<span[\s+\S+\n]+?>/,'').replace(/<\/span>/,'').trim()) : [];
        let duration = /([\d\sh]+\d+[mh])[\s\S\n]{0,325}?<div class="t_p">/i.exec(html)?.[1]?.trim();
        return cleanObject({
            stream_id:/https:\/\/streamscharts.com\/channels\/\w+\/streams\/(\d+)/.exec(atag)?.[1],
            title:spans?.at(-1),
            timestamp:stream_start_timestamp,
            timestamp_seconds:Math.floor(stream_start_timestamp/1000),
            channel_login:channel_login,
            stream_start_date: new Date(stream_start_timestamp),
            date_str:date_str,
            thumbnail_url:thumbnail,
            duration:duration,
        })
    })?.filter(r=> r.stream_id) : [];
    return rows;
}



async function getAvailableVODinfo(params){/* retrieves the most recent available vods (up to 75)*/
    var {device_id,client_id,oauth,vod_id,channel_login} = params;
    let res = await fetch("https://gql.twitch.tv/gql", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US",
          "authorization": oauth,
          "client-id": client_id,
          "content-type": "text/plain;charset=UTF-8",
          "sec-ch-ua": "\"Microsoft Edge\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-device-id": device_id,
        },
        "referrer": "https://www.twitch.tv/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `[{\"operationName\":\"FilterableVideoTower_Videos\",\"variables\":{\"limit\":75,\"channelOwnerLogin\":\"${channel_login}\",\"broadcastType\":\"ARCHIVE\",\"videoSort\":\"TIME\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb\"}}}]`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    var d = await res.json()
    // console.log(d);
    let vods = d?.[0]?.data?.user?.videos?.edges?.map(r=> {
        let m3u8_path = /\w+\.cloudfront.net\/\w{20}_\w+_\d+_\d+(?=\/)/.exec(r?.node?.animatedPreviewURL)?.[0];
        let m3u8_tokens = (/(?<=\/)\w{20}_\w+_\d+_\d+(?=\/)/.exec(r?.node?.previewThumbnailURL)?.[0] || /(?<=\/)\w{20}_\w+_\d+_\d+(?=\/)/.exec(r?.node?.animatedPreviewURL)?.[0])?.split(/_/);
        let m3u8_server = /\w+(?=\.cloudfront.net\/\w{20}_\w+_\d+_\d+\/)/.exec(r?.node?.animatedPreviewURL)?.[0];
        return {
            vod_id:r.node?.id,
            timestamp:m3u8_tokens[3] ? m3u8_tokens[3] * 1000 : new Date(r.node?.publishedAt).getTime(),
            published_at:r.node?.publishedAt,
            title:r.node?.title,
            seconds:r.node?.lengthSeconds,
            animated_preview_url:r?.node?.animatedPreviewURL,
            view_count:r?.node?.viewCount,
            preview_url:r?.node?.previewThumbnailURL,
            m3u8_path:m3u8_path,
            m3u8_tokens:m3u8_tokens,
            stream_id: m3u8_tokens[2],
            hash: m3u8_tokens[0],
            stream_start_seconds: m3u8_tokens[3],
            m3u8_server:m3u8_server,
            midpath:`${m3u8_tokens[0]}_${channel_login}_${m3u8_tokens[2]}_${m3u8_tokens[3]}`,
            channel_login:channel_login
        }
    });
    return vods;
}

async function fetchStreamGuesses(params){
    var {extendby,stream_id,timestamp,channel_login} = params;
// console.log(['fetchStreamGuesses',params])
    // var data; 
    var server_ids = ['d2vjef5jvl6bfs', 'd1ymi26ma8va5x', 'd2e2de1etea730', 'dqrpb9wgowsf5', 'ds0h3roq6wcgc', 'd2nvs31859zcd8', 'd2aba1wr3818hz', 'd3c27h4odz752x', 'dgeft87wbj63p', 'd1m7jfoe9zdc1j', 'd3vd9lfkzbru3h', 'd1mhjrowxxagfy', 'ddacn6pr5v0tl', 'd3aqoihi2n8ty8'];
    // console.log(Array(Math.abs(extendby)).fill().map((_,i)=> extendby > 0 ? (i+1) : i+extendby));

    let biglist = extendby ? Array(Math.abs(extendby)).fill().map((_,i)=> extendby > 0 ? i : i+extendby)
    .map(i=> {
        var seconds = Math.floor(timestamp/1000) + i;
        let hash = SHA1(`${channel_login}_${stream_id}_${seconds}`).slice(0,20);
        return server_ids.map(id=> 
            `https://${id}.cloudfront.net/${hash}_${channel_login}_${stream_id}_${seconds}/chunked/index-dvr.m3u8`);
    }) : server_ids.map(id=>
        `https://${id}.cloudfront.net/${(SHA1(`${channel_login}_${stream_id}_${Math.floor(timestamp/1000)}`).slice(0,20))}_${channel_login}_${stream_id}_${Math.floor(timestamp/1000)}/chunked/index-dvr.m3u8`);
    let bulk_url_list = biglist.flat().flat();
    let chunked = subArr(bulk_url_list,40);
    // console.log(bulk_url_list)
    return await chunkedFetch(chunked);
    // return data;
}
async function chunkedFetch(chunked){
    // console.log(chunked);
    var data = {};
    for(let i=0; i<chunked.length; i++){
        let check_listed = await fetchTexts(chunked[i]);
        let filtered = check_listed?.filter(r=> /[\d\.]+,\n\d+(-\w+|\b)\.ts/.test(r.text))
        if(filtered?.[0]) {
            data = {
                ...parseTsfileInformation(filtered?.[0]?.text),
                ...{url:filtered?.[0].url}
            }
            if(data?.url){ break; }
        }
    }
    return data;
}
async function getStreamDetailsFromStreamId(params){
    var check1 = await fetchStreamGuesses({...params,...{extendby:0}});
    if(check1?.url) return check1;
    var check2 = await fetchStreamGuesses({...params,...{extendby:61}}); 
    if(check2?.url) return check2;
    var check3 = await fetchStreamGuesses({...params,...{extendby:-61}}); 
    if(check3?.url) return check3;
    // var check4 = await fetchStreamGuesses({...params,...{timestamp:(params.timestamp-60000),extendby:-60}}); 
    // if(check4?.url) return check4;
    // var check5 = await fetchStreamGuesses({...params,...{timestamp:(params.timestamp+60000),extendby:+60}}); 
    // if(check5?.url) return check5;
    else return null;
}

async function getStreamDetailsFromVODdetails(params){
    var {m3u8_server,m3u8_path,midpath} = params
    let server_ids = ['d2vjef5jvl6bfs', 'd1ymi26ma8va5x', 'd2e2de1etea730', 'dqrpb9wgowsf5', 'ds0h3roq6wcgc', 'd2nvs31859zcd8', 'd2aba1wr3818hz', 'd3c27h4odz752x', 'dgeft87wbj63p', 'd1m7jfoe9zdc1j', 'd3vd9lfkzbru3h', 'd1mhjrowxxagfy', 'ddacn6pr5v0tl', 'd3aqoihi2n8ty8'].filter(id=> id != m3u8_server);
    let check_listed = await fetchTexts([`https://${m3u8_path}/chunked/index-dvr.m3u8`])
    let filtered = check_listed?.filter(r=> /[\d\.]+,\n\d+(-\w+|\b)\.ts/.test(r.text))
    if(filtered?.[0]) {
        return {
            ...parseTsfileInformation(filtered?.[0]?.text),
            ...{url:filtered?.[0].url}
        }
    }else{
        let check_all = await fetchTexts(server_ids.map(id=> `https://${id}.cloudfront.net/${midpath}/chunked/index-dvr.m3u8`));
        let identified = check_all?.filter(r=> /[\d\.]+,\n\d+(-\w+|\b)\.ts/.test(r.text));
        if(identified?.[0]){
            return {
                ...parseTsfileInformation(identified?.[0]?.text),
                ...{url:identified?.[0].url}
            }
        }
    }

}

function parseTsfileInformation(text){
    let fragments = text.match(/[\d\.]+,\n\d+(-\w+|\b)\.ts/g)?.[0] ? Array.from(text.match(/[\d\.]+,\n\d+(-\w+|\b)\.ts/g)).map(r=> {
        return {
            i:/(\d+)[\.-\w]+ts/.exec(r)?.[1],
            path:/\d+[\.-\w]+ts/.exec(r)?.[0],
            s:/[\d\.]+/.exec(r)?.[0] ? parseFloat(/[\d\.]+/.exec(r)?.[0]) : 0
        }
    }) : [];
    return {
        total_seconds:/(?<=TOTAL-SECS:)[\d\.]+/.test(text) ? parseFloat(/(?<=TOTAL-SECS:)[\d\.]+/.exec(text)?.[0]) : 0,
        fragments:fragments,
        head_text:/^[\s\S\n]+?TOTAL-SECS:/.exec(text)?.[0],
        foot_text:/#EXT-X-ENDLIST[\s\S\n]+/.exec(text)?.[0],
    }
}

async function getValidResolutions(params){
    var {url} = params;
    var options = ["chunked","1080p60","720p60","720p30","480p30","360p30","160p30","audio_only"].map(opt=> url.replace(/\/\w+\/index-dvr.m3u8/,`/${opt}/index-dvr.m3u8`));
    let responses = await fetchTexts(options);
    let mapped = responses.map(opt=> {
        return {
            is_valid: /[\d\.]+,\n\d+(-\w+|\b)\.ts/.test(opt.text),
            key:/\w+(?=\/index-dvr\.m3u8)/.exec(opt.url)?.[0],
            url:opt.url,
        }
    }).filter(opt=> opt.is_valid).map(opt=> {return {[opt.key]:opt.url}})
    return mapped?.length ? mapped.reduce((a,b)=> {return {...a,...b}}) : null;
}

async function getTSFilesFromM3u8(params){
    let res = await fetchTexts([params.url]);
    return parseTsfileInformation(res?.[0]?.text);
}


function getTimestampFromDDMMYYTime(date_str){
    let ddmmyytttt = /(\d{2})-(\d{2})-(\d{4})\s+(\d{2}:\d.+)/.exec(date_str);
    let timestamp = new Date(`${ddmmyytttt[3]}-${ddmmyytttt[2]}-${ddmmyytttt[1]} ${ddmmyytttt[4]}`).getTime();
    // return timestamp
    return timestamp + (-(new Date(`${ddmmyytttt[3]}-${ddmmyytttt[2]}-${ddmmyytttt[1]} ${ddmmyytttt[4]}`).getTimezoneOffset()*60000))
}

async function getExactStreamStartTimeFromStreamchart(params){
    var {channel_login,stream_id} = params;
    var res = await fetch(`https://streamscharts.com/channels/${channel_login}/streams/${stream_id}`);
    var text = await res.text();
    var date_str = /<time[\s\S]+?datetime="(.+?)"/i.exec(text)?.[1];
    var titles = tryJSON(/Status&quot;.+?data&quot;:(\[{.+?\}\])/.exec(text)?.[1]?.replace(/&quot;/g,'"'))?.filter(r=> r.value)?.map(r=> r.value);
    
    // console.log(['getTimestampFromDDMMYYTime(date_str)',getTimestampFromDDMMYYTime(date_str)])
    return {titles:titles,timestamp:getTimestampFromDDMMYYTime(date_str)};
}

function getAmbuiousDate(date_string){
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var now = new Date();
    var now_year = now.getFullYear(), now_month_index = now.getMonth();
    let now_month = months[now_month_index];
    let target_month_index = months.findIndex(m=> new RegExp(m,'i').test(date_string));
    let target_month = months[target_month_index];
    if(now_month == 'Jan' && target_month_index > now_month_index){
        return new Date(`${date_string?.replace(/,/, ' '+(now_year-1)+',')}`)
    }else{
        return new Date(`${date_string?.replace(/,/, ' '+(now_year)+',')}`)
    }
}