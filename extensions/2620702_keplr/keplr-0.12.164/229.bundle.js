"use strict";(self.webpackChunk_keplr_wallet_extension=self.webpackChunk_keplr_wallet_extension||[]).push([[229],{71946:(e,t,r)=>{r(2784)},70218:(e,t,r)=>{r(2784)},71579:(e,t,r)=>{r(2784)},8092:(e,t,r)=>{r(2784)},23799:(e,t,r)=>{r(2784)},2712:(e,t,r)=>{r.d(t,{Ho:()=>n.H}),r(22673),r(85037),r(2784),r(71946),r(12208),r(9225),r(70218),r(74439),r(28932),r(71579),r(87094),r(90498),r(32344),r(23799),r(74939),r(12771),r(31712),r(91709),r(23495);var n=r(62509);r(61828),r(60983),r(77525),r(11569),r(86570),r(57929),r(55213),r(79908),r(70514),r(97619),r(96296),r(26715),r(5550),r(8092),r(44009),r(73740),r(72505),r(66026),r(24597),r(38546),r(12756),r(71841),r(11587),r(17825),r(50916),r(30477),r(38630),r(37458),r(3002),r(36161),r(70426),r(64388),r(48130)},12771:(e,t,r)=>{r(2784)},91709:(e,t,r)=>{r(2784)},23495:(e,t,r)=>{r(2784)},77525:(e,t,r)=>{r(2784)},79908:(e,t,r)=>{r(2784)},5550:(e,t,r)=>{r(2784)},41054:(e,t,r)=>{r.d(t,{sM:()=>i.sM,ae:()=>i.ae}),r(9171);var n=r(2784),i=r(53994);(0,n.forwardRef)(((e,t)=>n.createElement(i.ht,Object.assign({},e,{ref:t}))));var o=r(75868),a=r(66769);const s=n.createContext(null);(0,n.forwardRef)(((e,t)=>{var r,l;const u=(0,i.X5)(e,t),{stack:c}=u,g=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(e);i<n.length;i++)t.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]])}return r}(u,["stack"]),f=null===(r=u.topScene)||void 0===r?void 0:r.name,d=null===(l=u.topScene)||void 0===l?void 0:l.id,[h,F]=(0,n.useState)({}),m=(0,n.useMemo)((()=>{const t=new Map;return e.scenes.forEach((e=>{t.set(e.name,e.width)})),t}),[e.scenes.map((e=>[e.name,e.width])).map((e=>e[0]+"/"+e[1])).join(",")]),v=(()=>{if(d){const e=h[d];if(e&&!e.willDetach)return e.target}if(f){const e=m.get(f);if(e)return e}return"0"})(),w=(0,n.useRef)(v),y=(0,o.useSpringValue)(v,{config:a.a});(0,n.useEffect)((()=>{w.current!==v&&(y.start(v),w.current=v)}),[y,v]);const p=(0,n.useMemo)((()=>c.map((e=>Object.assign(Object.assign({},e),{sceneWidth:(()=>{const t=h[e.id];if(t)return t.anim;return m.get(e.name)||void 0})()})))),[m,h,c]),b=e=>{if(e){if(w.current!==e&&(y.start(e),w.current=e),d){const t=h[d];if(!t){const t=new o.SpringValue(v,{config:a.a});return F((r=>{const n=Object.assign({},r);return n[d]={target:e,anim:t,willDetach:!1},n})),void t.start(e)}if(t.target!==e)return F((r=>{const n=Object.assign({},r);return n[d]=Object.assign(Object.assign({},t),{target:e,willDetach:!1}),n})),void t.anim.start(e)}}else if(d){const e=h[d];if(e&&!e.willDetach){const t=f?m.get(f):void 0;t?(F((r=>{const n=Object.assign({},r);return n[d]=Object.assign(Object.assign({},e),{target:t,willDetach:!0}),n})),e.anim.start(t,{onRest:()=>{F((e=>{var t,r;if(!(null===(t=e[d])||void 0===t?void 0:t.willDetach))return e;const n=Object.assign({},e);return delete n[d],null===(r=e[d])||void 0===r||r.anim.stop(),n}))}})):F((e=>{var t;const r=Object.assign({},e);return delete r[d],null===(t=e[d])||void 0===t||t.anim.stop(),r}))}}},E=(0,n.useRef)(b);return E.current=b,n.createElement(s.Provider,{value:(0,n.useMemo)((()=>({setWidth:e=>{E.current(e)}})),[])},n.createElement(i.Tx,Object.assign({},e,g,{stack:p,width:y})))}))},96854:(e,t,r)=>{r.d(t,{b:()=>a,p:()=>i});var n=r(2784);const i=e=>{const t=(0,n.useRef)(null),r=(0,n.useRef)(e);r.current=e;const i=(0,n.useRef)(),[o]=(0,n.useState)((()=>new ResizeObserver((e=>{if(e.length>0){const t=e[0],n=(Array.isArray(t.borderBoxSize)?t.borderBoxSize[0]:t.borderBoxSize).blockSize;null!=i.current&&i.current===n||(r.current(n),i.current=n)}}))));return(0,n.useEffect)((()=>{if(t.current){const e=t.current;return o.observe(e,{}),()=>{o.unobserve(e)}}}),[o]),t};var o=r(75868);const a=(0,n.forwardRef)((({children:e,heightPx:t,width:r,transitionAlign:i},a)=>n.createElement(o.animated.div,{style:{position:"relative",overflow:"hidden",width:r,height:t.to((e=>e<0?"auto":`${e}px`)),flexShrink:0}},n.createElement(o.animated.div,{ref:a,style:{top:t.to((e=>e<0?0:"bottom"===i?"auto":"center"===i?"50%":0)),bottom:t.to((e=>e<0?"auto":"bottom"===i?"0":"auto")),transform:t.to((e=>e<0?"none":"center"===i?"translateY(-50%)":"none")),position:t.to((e=>e<0?"relative":"absolute")),left:t.to((e=>e<0?"auto":"0")),right:t.to((e=>e<0?"auto":"0"))}},e))))},19823:(e,t,r)=>{r.d(t,{bo:()=>o,sM:()=>a,y3:()=>i});var n=r(2784);const i=n.createContext(null),o=n.createContext(null),a=e=>{const t=n.useContext(o);if(!t)throw new Error("You have forgot to use SceneEventsProvider");t.setEvents(e)};n.createContext(null)},53994:(e,t,r)=>{r.d(t,{ht:()=>i.ht,Tx:()=>i.Tx,sM:()=>n.sM,ae:()=>a,X5:()=>i.X5});var n=r(19823),i=(r(35851),r(72131)),o=r(2784);const a=()=>{const e=(0,o.useContext)(n.y3);if(!e)throw new Error("Component is not under SceneTransition");return e}},13563:(e,t,r)=>{r.d(t,{Jh:()=>a,Y8:()=>i,of:()=>s,y8:()=>o});var n=r(2784);class i{constructor(){this.seq=0,this._registries=[],this.isDescendantAnimatingLast=null}registerRegistry(e){this.seq++;const t=this.seq.toString();return this._registries.push({key:t,value:e}),t}unregisterRegistry(e){const t=this._registries.findIndex((t=>t.key===e));t>=0&&this._registries.splice(t,1)}isDescendantAnimating(){for(const e of this._registries)if(e.value.isDescendantAnimatingWithSelf())return this.isDescendantAnimatingLast=!0,!0;return!(null==this.isDescendantAnimatingLast||!this.isDescendantAnimatingLast||(setTimeout((()=>{this.isDescendantAnimatingLast=null}),1),0))}isDescendantAnimatingWithSelf(){if(this.isAnimating())return!0;for(const e of this._registries)if(e.value.isAnimating())return!0;return!1}}class o extends i{constructor(e){super(),this.heightPx=e}isAnimating(){return this.heightPx.isAnimating}}const a=(0,n.createContext)(null),s=()=>(0,n.useContext)(a)},14832:(e,t,r)=>{r.d(t,{m:()=>o});var n=r(42178),i=r(25300);const o=(0,n.default)(i.i)`
  font-weight: 400;
  font-size: 1rem;
`},34715:(e,t,r)=>{var n=r(42178),i=r(25300);(0,n.default)(i.i)`
  font-weight: 400;
  font-size: 0.8125rem;
`},42280:(e,t,r)=>{var n=r(42178),i=r(25300);(0,n.default)(i.i)`
  font-weight: 500;
  font-size: 1rem;
`},18650:(e,t,r)=>{var n=r(42178),i=r(25300);(0,n.default)(i.i)`
  font-weight: 500;
  font-size: 0.875rem;
`},9458:(e,t,r)=>{var n=r(42178),i=r(25300);(0,n.default)(i.i)`
  font-weight: 500;
  font-size: 0.75rem;
`},17305:(e,t,r)=>{var n=r(42178),i=r(25300);(0,n.default)(i.i)`
  font-weight: 400;
  font-size: 0.75rem;
`},33219:(e,t,r)=>{var n=r(42178),i=r(25300);(0,n.default)(i.i)`
  font-weight: 600;
  font-size: 1.125rem;
`},61432:(e,t,r)=>{var n=r(42178),i=r(25300);(0,n.default)(i.i)`
  font-weight: 600;
  font-size: 0.875rem;
`},27977:(e,t,r)=>{var n=r(42178),i=r(25300);(0,n.default)(i.i)`
  font-weight: 500;
  font-size: 0.875rem;
`},34855:(e,t,r)=>{var n=r(42178),i=r(25300);(0,n.default)(i.i)`
  font-weight: 500;
  font-size: 0.8125rem;
`},74255:(e,t,r)=>{r.d(t,{nz:()=>s});var n=r(42178),i=r(21650),o=r(44800),a=r(69325);const s=n.css`
  @font-face {
    font-family: "Haffer";
    font-weight: 500;
    src: url(${i}) format("truetype");
  }

  @font-face {
    font-family: "Haffer";
    font-weight: 600;
    src: url(${o}) format("truetype");
  }
`;a.x},43:(e,t,r)=>{r.d(t,{IE:()=>s});var n=r(2784),i=(r(41054),r(22386)),o=(r(28432),r(4922));const a=n.createContext(null),s=()=>{const e=n.useContext(a);if(!e)throw new Error("You have forgot to use RegisterHeaderProvider");return e};r(27660);var l=r(35150),u=(r(95700),r(3645),r(42178));r(96624);const c=u.default.div`
  position: fixed;
  top: 2.75rem;
  right: 3.25rem;
  z-index: 1000;
`;(0,u.default)(o.d1)`
    color: ${l.VZ["gray-300"]};

    ${c}:hover & {
      color: ${l.VZ["gray-200"]};
    }
  `,(0,u.default)(i.x)`
    background-color: ${e=>"light"===e.theme.mode?l.VZ["gray-50"]:l.VZ["gray-500"]};

    ${c}:hover & {
      background-color: ${e=>"light"===e.theme.mode?l.VZ["gray-50"]:l.VZ["gray-400"]};
    }
  `,(0,u.default)(o.H2)`
    color: ${l.VZ["gray-300"]};

    ${c}:hover & {
      color: ${e=>"light"===e.theme.mode?l.VZ["gray-200"]:l.VZ["gray-100"]};
    }
  `},95700:(e,t,r)=>{r.d(t,{F5:()=>o.F});var n=r(22428),i=r(42178);(0,i.default)(n.i)`
  font-weight: 600;
  font-size: 3rem;
`;var o=r(63857);(0,i.default)(n.i)`
  font-weight: 600;
  font-size: 1.5rem;
`,(0,i.default)(n.i)`
  font-weight: 500;
  font-size: 1.25rem;
`},93043:(e,t,r)=>{r.d(t,{V:()=>n});const n={"blue-10":"#F6F8FF","blue-50":"#F0F3FF","blue-100":"#E4E9FF","blue-200":"#9DACF4","blue-300":"#566FEC","blue-400":"#2C4BE2","blue-500":"#1633C0","blue-600":"#112377","blue-700":"#09144D","blue-800":"#0A0314","platinum-10":"#EFF3F8","platinum-50":"#E9EEF5","platinum-100":"#CED5E1","platinum-200":"#95A1B4","platinum-300":"#566172","platinum-400":"#323C4A","platinum-500":"#252E3D","platinum-600":"#121924","platinum-700":"#0A101C","green-50":"#ECFDF6","green-100":"#DBF9EC","green-200":"#AAECD0","green-300":"#68EAB2","green-400":"#2DCE89","green-500":"#22AC71","green-600":"#136844","green-700":"#136844","green-800":"#0D2F21","red-50":"#FFF6F8","red-100":"#FFD8E0","red-200":"#FC91A6","red-300":"#FB486C","red-400":"#F0224B","red-500":"#A61F3A","red-600":"#771A2D","red-700":"#5B0A1A","red-800":"#290910","pink-50":"#FDF4F9","pink-100":"#FFE9F4","pink-200":"#FFCFE7","pink-300":"#F891C4","pink-400":"#FF6BB8","orange-50":"#FFF6F1","orange-100":"#FFE3D3","orange-200":"#FFAD80","orange-300":"#FC8441","orange-400":"#FA6410","orange-500":"#D7560E","orange-600":"#8F3A0A","orange-700":"#58270B","orange-800":"#2D1609","yellow-50":"#F8F2E3","yellow-100":"#F2E6C7","yellow-200":"#EDD18A","yellow-300":"#EBBF50","yellow-400":"#F0B622","yellow-500":"#D29C11","yellow-800":"#2F2611",white:"#FEFEFE","gray-10":"#F6F6F9","gray-50":"#F2F2F6","gray-100":"#DCDCE3","gray-200":"#ABABB5","gray-300":"#72747B","gray-400":"#404045","gray-450":"#353539","gray-500":"#2E2E32","gray-550":"#242428","gray-600":"#1D1D1F","gray-650":"#151517","gray-700":"#09090A",black:"#020202",transparent:"rgba(255,255,255,0)","light-gradient":"linear-gradient(90deg, #FCFAFF 2.44%, #FBFBFF 96.83%)","skeleton-layer-0":"#ECEBF1","skeleton-layer-1":"#F9F9FC"}}}]);