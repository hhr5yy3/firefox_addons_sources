import"./assets/modulepreload-polyfill.js";resizeTo(1,1);onload=()=>{var r,t;const a=window.location.search,e=new URLSearchParams(a),o=new Audio(e.get("src"));o.volume=Number((r=e.get("volume"))!=null?r:1),o.loop=!0,o.play(),setTimeout(close,Number((t=e.get("length"))!=null?t:1e3))};
//# sourceMappingURL=audio.js.map
