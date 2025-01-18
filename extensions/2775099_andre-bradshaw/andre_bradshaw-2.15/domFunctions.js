
const cn = (o,s)=>o ? o.getElementsByClassName(s) : null;
const tn = (o,s)=>o ? o.getElementsByTagName(s) : null;
const gi = (o,s)=>o ? o.getElementById(s) : null;
const ele = (t)=>document.createElement(t);
const attr = (o,k,v)=>o ? o.setAttribute(k, v) : false;
const a = (l,r)=>r.forEach(i=>attr(l, i[0], i[1]));

function inlineStyler(elm, css) {
    if (elm) {
        Object.entries(JSON.parse(css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g, '"').replace(/(?<=:\s*.+?);/g, '",').replace(/[a-zA-Z-]+(?=:)/g, k=>k.replace(/^\b/, '"').replace(/\b$/, '"')).replace(/\s*,\s*}/g, '}'))).forEach(kv=>{
            elm.style.setProperty([kv[0]], kv[1], 'important')
        }
        );
    }
}
function topZIndexer() {
    let n = new Date().getTime() / 1000000;
    let r = (n - Math.floor(n)) * 100000;
    return (Math.ceil(n + r) * 10);
}

function topIndexHover() {
    this.style.zIndex = topZIndexer();
}
function setHTMLCSS(style_id, css_text) {
    if (document.getElementById(`${style_id}_style`))
        document.getElementById(`${style_id}_style`).outerHTML = '';
    let csselm = ele('style');
    a(csselm, [['class', `${style_id}_style`]]);
    document.head.appendChild(csselm); 
    csselm.innerHTML = css_text;
}
function dragElement() {
    var el = this.parentElement.parentElement;
    el.style.zIndex = topZIndexer();
    var pos1 = 0
      , pos2 = 0
      , pos3 = 0
      , pos4 = 0;
    if (document.getElementById(this.id))
        document.getElementById(this.id).onmousedown = dragMouseDown;
    else
        this.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
        el.style.opacity = "0.85";
        el.style.transition = "opacity 700ms";
        el.style.zIndex = topZIndexer();
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        el.style.opacity = "1";
        el.style.zIndex = topZIndexer();
    }
}

function adjustElementSize(){
    let resize_elm_ids = this.getAttribute('data-resize-id').split(/,/);
    var cbod = document.getElementById(resize_elm_ids[0]);
    var tbod = document.getElementById(resize_elm_ids[1]);
    let tbod_css = atobJSON(tbod.getAttribute('data-css'))
    let header_pxs = cbod?.firstChild.style.gridTemplateColumns.split(/\s/).map(r=> /[\d\.]+/.exec(r)?.[0]).filter(r=> r).map(r=> parseFloat(r));
    let min_width = header_pxs?.length ? header_pxs.reduce((a,b)=> a+b)+60 : 120;
    var foot_height = 0;
    var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
    var width = cbod.getBoundingClientRect().width;
    var height = cbod.getBoundingClientRect().height;

    if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
    else this.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        let moved_width = (width - (pos3 - e.clientX))
        let main_width = moved_width < min_width ? min_width : moved_width;
        let main_height = ((height - (pos4 - e.clientY)) - (foot_height));
        inlineStyler(cbod,`{width: ${main_width}px;${ moved_width < min_width ? '' : ' height: '+main_height+'px; '}z-index: ${topZIndexer()};}`);
        if(tbod){
            inlineStyler(tbod,`{width: ${((main_width+tbod_css.width))}px;${ moved_width < min_width ? '' : ' height: '+(main_height+tbod_css.height)+'px;'}opacity: 0.5; transiation: opacity 100ms;}`);
        }
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        if(tbod) tbod.style.opacity = '1';
    }
}


async function createLoadingElement(params) {
    var {id, ref_elm, display_text} = params;
    if (document.getElementById(id)) document.getElementById(id).outerHTML = '';
    let loading_card_cont = ele('div');
    loading_card_cont.innerHTML = `<div><img id="loading207" ${/warning/.test(id) ? 'style="background:#d7496480; border-radius:50%;"' : ''} src="${icons.loading207}"></img></div>
    ${display_text ? `<div style="text-shadow: 1px 2px 3px #1c1c1c; height:0px; transform:translate(${/warning/.test(id) ? '0' : '22'}px,${/warning/.test(id) ? '-142' : '-112'}px);">` + display_text + '</div>' : ''}`;
    a(loading_card_cont, [['id', id], ['class', 'loading_card_cont']]);
    document.body.appendChild(loading_card_cont);
    
    let btn_rect = ref_elm ? ref_elm.getBoundingClientRect() : {left:300, top:300, height:300, width:300};

    inlineStyler(loading_card_cont, `{position:fixed; top:${btn_rect.top - 15}px; left:${btn_rect.left - 80}px; z-index:${topZIndexer()}; border-radius:50%; transition: all 300ms;}`);

    let loading_card_rect = loading_card_cont.getBoundingClientRect();
    if(loading_card_rect.left < 1){
        inlineStyler(loading_card_cont,`{left:${Math.abs(loading_card_rect.left)}px;}`);
    }
    if(/warning/.test(id)){
        inlineStyler(loading_card_cont,`{left:${Math.abs(window.innerWidth-loading_card_rect.width)/2}px;top:${Math.abs(window.innerHeight-loading_card_rect.height)/2}px;}`);
        await delay(5333)
        if (document.getElementById(id)) document.getElementById(id).outerHTML = '';
    }
    for(let i=0; i<200; i++){
        await delay(1000);
        if(document.getElementById(id)) inlineStyler(document.getElementById(id),`{z-index:${topZIndexer()};}`);
    }
}
function destroy(id){    if(gi(document,id)) gi(document,id).outerHTML = '';}