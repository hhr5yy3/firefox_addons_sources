import"../../modulepreload-polyfill.js";import{j as $,k as tt,n as et,i as h,q as e,x as p,J as nt,v as B,p as C,w as t,f as a,e as N,o as U,A as S,C as it,S as st,M as v,u as ot,T as L,K as at,P as ct,Q as rt,z as lt,L as dt}from"../../arrow-down.js";var G=$("popup"),P=tt("popup",n=>G.postMessage(n));G.onMessage(P.handleMessage);var{sendMessage:y,onMessage:pt}=P;et(P);function _(n,s){const[i,o]=h.useState(n);return h.useEffect(()=>{s(o)},[]),[i,o]}const gt=e(B.div)`
  position: fixed;
  inset: 0;
  background-color: #00000099;
  display: grid;
  place-items: center;
`,ht=e(B.div)`
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #333;
  text-align: center;
`;e.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;e.div`
  font-size: 16px;
  text-align: center;
  margin-top: 9px;
`;const xt=e.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`,J=p`
  display: grid;
  place-items: center;
  width: 105px;
  height: 36px;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;

  &:active {
    box-shadow: none;
    transform: translateY(4px);
  }
`,ft=e.button`
  ${J}
  background-color: #8cc914;
  box-shadow: 0 4px 0 #69960f;
`,ut=e.button`
  ${J}
  background-color: #c9c9c9;
  box-shadow: 0 4px 0 #969696;
`,wt=e.textarea`
  margin-top: 8px;
  width: 220px;
  height: 92px;
  border-radius: 5px;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 8px;
  outline: none;
  resize: none;
  cursor: text;
  background-color: #f4f4f4;
  color: #666;
  border: 0px;
`,mt=e.select`
  color: #333;
  font-size: 16px;
  align-self: center;
  appearance: none;
  border: none;
  padding-right: 12px;
  background-image: url(${nt});
  background-repeat: no-repeat;
  background-position: right top 6px;
  cursor: pointer;
  max-width: 100px;
  overflow: hidden !important;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:focus,
  &:focus-visible {
    outline: none;
  }

  & > option {
    text-align: center;
  }
`;function At({plant:n,isPlanting:s,close:i,overlayOpacity:o,dialogTransform:c}){const[d]=_([],async r=>{const x=await C("tags");r(x)}),[u,l]=h.useState(n.tag),[w,m]=h.useState(n.note),k=async()=>{const r={...n,tag:u,note:w};s?await N({growingPlant:r}):await Promise.all([N({resultPlant:r}),U("plantRecords",x=>x.map(A=>A.plant.startTime===n.startTime?{...A,plant:{...A.plant,tag:u,note:w},syncStatus:"Pending"}:A))]),i()};return t.jsx(gt,{style:{opacity:o},children:t.jsxs(ht,{style:{transform:c},children:[t.jsx(mt,{value:u,onChange:({target:r})=>l(parseInt(r.value)),children:d.map(({tagId:r,title:x})=>t.jsx("option",{value:r,children:x},r))}),t.jsx(wt,{rows:6,cols:24,value:w,onChange:({target:r})=>m(r.value)}),t.jsxs(xt,{children:[t.jsx(ut,{onClick:i,children:a("main_edit_popup_cancel")}),t.jsx(ft,{onClick:k,children:a("main_edit_popup_btn")})]})]})})}const bt="data:image/png;base64,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",kt="/facebook-btn.svg",vt="/twitter-btn.svg",yt=e.div`
  margin-top: 19px;
  width: 175px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,R=e.img`
  width: 45px;
  height: 45px;
  cursor: pointer;
  transition: transform 150ms;

  &:hover {
    transform: scale(1.1);
  }
`;function jt({isSuccess:n,openPlantEditDialog:s}){const i=`https://www.forestapp.cc/sharings/planting_${n?"success":"failed"}`,o=`https://www.facebook.com/sharer/sharer.php?u=${i}`,d=`https://twitter.com/intent/tweet?text=${n?a("main_share_on_success"):a("main_share_on_failed")}&url=${i}`;return t.jsxs(yt,{children:[t.jsx(R,{src:bt,onClick:()=>s(!1)}),t.jsx(R,{src:vt,onClick:()=>S.tabs.create({url:d})}),t.jsx(R,{src:kt,onClick:()=>S.tabs.create({url:o})})]})}const St=n=>{const s=Math.floor(n/60);return(s<25?1:4)+s/5+5*Math.floor(Math.max(s-30,0)/30)},Q="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2022%2022'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:%23fff;}.cls-2{fill:%23bd9d00;}.cls-3{fill:%23ffda00;}.cls-4{fill:%23dbb700;}%3c/style%3e%3c/defs%3e%3cg%20id='profile'%3e%3cpath%20class='cls-1'%20d='M7.76,15.38a2,2,0,0,1-.2-.55,4,4,0,0,1-.1-1.42,3.12,3.12,0,0,1,.69-1.71,2.91,2.91,0,0,1,1.25-.84,4.33,4.33,0,0,1,1.24-.22,4.2,4.2,0,0,0-.59,1,1.45,1.45,0,0,0-.07.88.79.79,0,0,0,.44.44l.29.1.15,0s.12,0,.08-.09Z'/%3e%3cellipse%20class='cls-2'%20cx='11'%20cy='11.52'%20rx='8'%20ry='7.48'/%3e%3cellipse%20class='cls-3'%20cx='11'%20cy='10.48'%20rx='8'%20ry='7.48'/%3e%3cpath%20class='cls-4'%20d='M14.24,11.91A3.92,3.92,0,0,1,10.6,14.2,3.22,3.22,0,0,1,7.39,11c0-2.66,2.38-3.33,3.64-3.46S13,6.81,13,5.8A5.93,5.93,0,0,1,14.24,11.91Z'/%3e%3cpath%20class='cls-2'%20d='M8,11.5C8,8.84,10.43,8.17,11.68,8a2,2,0,0,0,2-1.43A7.41,7.41,0,0,0,13,5.8c0,1-.85,1.6-2,1.72S7.39,8.32,7.39,11A3.23,3.23,0,0,0,9,13.75,3.19,3.19,0,0,1,8,11.5Z'/%3e%3c/g%3e%3c/svg%3e",Bt=e(B.div)`
  position: fixed;
  inset: 0;
  background-color: #00000099;
  display: grid;
  place-items: center;
`,Tt=e(B.div)`
  width: ${n=>n.$forGuest?"244px":"230px"};
  padding: 18px 12px 20px;
  border-radius: 5px;
  color: #444;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`,Ct=e.div`
  font-size: 14px;
  padding: 0 10px;
  line-height: 20px;
  color: #666;
  text-align: center;
`,It=e.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`,V=e.button`
  width: 105px;
  height: 36px;
  line-height: 36px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:active {
    box-shadow: none;
    transform: translateY(4px);
  }

  &:focus {
    outline: none;
  }
`,Rt=e(V)`
  background-color: #c9c9c9;
  box-shadow: 0 4px 0 #888888;
`,Et=e(V)`
  background-color: #8dc925;
  box-shadow: 0 4px 0 #64a408;
`,Nt=e.div`
  color: #888;
  margin-top: 16px;
  font-size: 14px;
  line-height: 20px;
  text-decoration: underline;
  cursor: pointer;
`,Ut=e.div`
  height: 33px;
  line-height: 33px;
  font-weight: 500;
  font-size: 18px;
`,Pt=e.div`
  font-size: 20px;
  font-weight: bold;
  color: #444;
  display: flex;
  align-items: center;
  margin-top: 25px;
  align-self: center;
`,_t=e.img`
  width: 16px;
  height: 16px;
  position: relative;
  top: 4px;
  margin-left: 2px;
`,Mt=e.img`
  height: 30px;
  width: 30px;
`,Lt=e.div`
  margin-left: 8px;
  font-size: 20px;
  font-weight: bold;
`,Qt=e.div`
  margin-left: 4px;
  color: #f2c00d;
  font-size: 20px;
  font-weight: bold;
`,Dt=e.div`
  margin-top: 25px;
  border-radius: 5px;
  width: 90px;
  height: 32px;
  font-size: 16px;
  display: grid;
  place-items: center;
  color: #fff;
  background-color: #84caab;
  box-shadow: 0 3px 0 #498068;
  cursor: pointer;
`;function Ot({style:n,close:s}){const[i]=_({status:"Unknown",coins:0},async c=>{const d=await C("user");if(d===null){const x=await C("canShowNoAccountCTA");return c({status:x?"NoAccountCTA":"NoAccount",coins:0})}const{resultPlant:u,growingPlant:l}=await it(["resultPlant","growingPlant"]),w=l||u,m=Math.floor((new Date(w.endTime).getTime()-new Date(w.startTime).getTime())/1e3),{boostEndTime:k}=d,r=St(m);return k===null?c({status:"NoBoost",coins:r}):new Date(k)<new Date?c({status:"NoBoost",coins:r}):c({status:"Boost",coins:r})}),{status:o}=i;return o==="Unknown"||o==="NoAccount"?null:t.jsx(Bt,{onClick:({target:c,currentTarget:d})=>c===d&&s(),style:{opacity:n.opacity},children:t.jsx(Tt,{style:{transform:n.transform},$forGuest:o==="NoAccountCTA",children:o==="NoAccountCTA"?t.jsxs(t.Fragment,{children:[t.jsxs(Ct,{children:[a("main_grown_popup_guest_info_pre")," ",a("main_grown_popup_guest_info_link")," ",a("main_grown_popup_guest_info_post"),t.jsx(_t,{src:Q})]}),t.jsxs(It,{children:[t.jsx(Rt,{onClick:s,children:a("next_time")}),t.jsx(Et,{onClick:()=>{S.tabs.create({url:"https://forestapp.cc"}),s()},children:a("learn_more")})]}),t.jsx(Nt,{onClick:()=>{N({canShowNoAccountCTA:!1}),s()},children:a("main_grown_popup_guest_do_not_show_again")})]}):t.jsxs(t.Fragment,{children:[t.jsx(Ut,{children:a("main_grown_popup_user_reward_pre")}),t.jsxs(Pt,{children:[t.jsx(Mt,{src:Q}),t.jsx(Lt,{children:i.coins}),o==="Boost"&&t.jsxs(Qt,{children:["+",i.coins*2]})]}),t.jsx(Dt,{onClick:s,children:"OK"})]})})})}const W="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cg%20opacity='0.5'%3e%3cmask%20id='mask0'%20mask-type='alpha'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='32'%20height='32'%3e%3crect%20width='32'%20height='32'%20fill='url(%23pattern0)'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0)'%3e%3crect%20width='32'%20height='32'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cpattern%20id='pattern0'%20patternContentUnits='objectBoundingBox'%20width='1'%20height='1'%3e%3cuse%20xlink:href='%23image0'%20transform='scale(0.0166667)'/%3e%3c/pattern%3e%3cimage%20id='image0'%20width='60'%20height='60'%20xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAABYlAAAWJQFJUiTwAAABMUlEQVRoge3aMQ6CQBAF0I/xAN5Eq63x5tR03sQbYDCYEBOhcP/MZ3Z+QgHN8AK77GzopmlCSzk1pU1wA0lw9CQ4ehIcPc2BzwL38M44jhcAt895KWVg1JEAL9gZeF1d7hi13F/pH1haXMEb2Aerpht4B9uz6rqA97CllCertjnYEwtrsDcWlmAFLKzAKlhYgJWwYIPVsGCCFbFggVWxYICVsagNVseiJvgIWFR+wvJYVAbLY5GbeP/lu2mfn/iwjG2Z1AT3R0BXAy9jVR5ddQwfAV190lJHU2ZpZTTts6SKpn6HFdH0hYca2mSlpYQ2W1qqoE3X0gpo8+bBG+3SLXmi3drDPTSrrms/vIOmxH0DYANNicSOxwp9Xx2U5A/i0ZPg6Elw9CQ4ehIcPW2BAbwAfSTEaHhves4AAAAASUVORK5CYII='/%3e%3c/defs%3e%3c/svg%3e",Z="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cg%20opacity='0.5'%3e%3cmask%20id='mask0'%20mask-type='alpha'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='32'%20height='32'%3e%3crect%20width='32'%20height='32'%20fill='url(%23pattern0)'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0)'%3e%3crect%20width='32'%20height='32'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cpattern%20id='pattern0'%20patternContentUnits='objectBoundingBox'%20width='1'%20height='1'%3e%3cuse%20xlink:href='%23image0'%20transform='scale(0.0208333)'/%3e%3c/pattern%3e%3cimage%20id='image0'%20width='48'%20height='48'%20xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAABDklEQVRoge2ZMQ7CMAxFP4gDcBOYMpcbcGM6e6I34QZlyRCB1ErB/5tI/lKlZrH+U+zUcQ/rumJkHYd2nwB/oASIVgJEa3iAk1cgM5ua5bOU8vKKvSXPHXg0z2xmZ3+732Kl0EUF4QmwfKwlEJ4AUwSEG0AtWjmEaw1EQLgXsRqCcgopIWhfYhUEtZVQQNB7ITaEpJljQsi60T2I3rjSdnoLwszuPTGHvw9IB1s11+eaNq2WUsq1J6ZsB7bM17TqkgRgz/wvtzc6ANM82ABs82ACKMyDBaAyDwaA0jy8AdTm4QkQYR7OOyA3D2cAuXkQj1GJeXgOdwHcmnfZcDd/s0YrAaKVANFKgGiNDQDgDUqXnedodtK7AAAAAElFTkSuQmCC'/%3e%3c/defs%3e%3c/svg%3e",Yt=e.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);

  ${n=>n.$disabled&&p`
      pointer-events: none;
    `}

  &:hover > img {
    opacity: 1;
    visibility: visible;
  }
`,zt=e.div`
  font-size: 50px;
  font-weight: 500;
  width: 162px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  transform: scale(1);
`,D=e.img`
  width: 30px;
  height: 28px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: 300ms;
  transform: scale(1);
`;function Kt({timeInSeconds:n,canModify:s}){const i=o=>()=>{y(v.MODIFY_TARGET_DURATION,{method:o},"background")};return t.jsxs(Yt,{$disabled:s===!1,children:[t.jsx(D,{src:W,onClick:i("Decrease")}),t.jsx(zt,{children:st(n)}),t.jsx(D,{src:Z,onClick:i("Increase")})]})}const Ft="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:%23fff;}%3c/style%3e%3c/defs%3e%3cg%20id='_5'%20data-name='5'%3e%3crect%20class='cls-1'%20x='7.75'%20y='8.32'%20width='11.26'%20height='4.61'%20rx='0.57'%20transform='translate(-3.59%2012.57)%20rotate(-45)'/%3e%3cpath%20class='cls-1'%20d='M6.2,18.22a.34.34,0,0,1-.42-.42l.93-3.48a.35.35,0,0,1,.58-.15l2.54,2.54a.35.35,0,0,1-.15.58Z'/%3e%3c/g%3e%3c/svg%3e",Gt="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:none;stroke:%23fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}%3c/style%3e%3c/defs%3e%3cg%20id='_5'%20data-name='5'%3e%3cpath%20class='cls-1'%20d='M6.72,9.79h7.73a4,4,0,0,1,4,4h0a4,4,0,0,1-4,4H5.72'/%3e%3cpolyline%20class='cls-1'%20points='9.37%2013.53%205.63%209.79%209.37%206.06'/%3e%3c/g%3e%3c/svg%3e",Jt="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:none;stroke:%23fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.3px;}%3c/style%3e%3c/defs%3e%3cg%20id='_5'%20data-name='5'%3e%3cpolygon%20class='cls-1'%20points='18.92%2012.78%2018.92%2011.22%2016.8%2010.19%2016.67%209.89%2017.44%207.65%2016.35%206.56%2014.11%207.33%2013.81%207.2%2012.78%205.08%2011.22%205.08%2010.19%207.2%209.89%207.33%207.65%206.56%206.56%207.65%207.33%209.89%207.2%2010.19%205.08%2011.22%205.08%2012.78%207.2%2013.81%207.33%2014.11%206.56%2016.35%207.65%2017.44%209.89%2016.67%2010.19%2016.8%2011.22%2018.92%2012.78%2018.92%2013.81%2016.8%2014.11%2016.67%2016.35%2017.44%2017.44%2016.35%2016.67%2014.11%2016.8%2013.81%2018.92%2012.78'/%3e%3ccircle%20class='cls-1'%20cx='12'%20cy='12'%20r='2.53'/%3e%3c/g%3e%3c/svg%3e";async function Vt(n,s){const i=await S.tabs.query({url:["https://*/*","http://*/*"]}),o=[];return i.forEach(c=>{c.status!=="complete"||!c.id||o.push(y(n,s,{tabId:c.id,context:"content-script"}).catch(()=>{}))}),o}const Wt="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2030%2030'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:none;stroke:%23fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;}%3c/style%3e%3c/defs%3e%3cg%20id='_5'%20data-name='5'%3e%3cline%20class='cls-1'%20x1='6.5'%20y1='15'%20x2='23.5'%20y2='15'/%3e%3cline%20class='cls-1'%20x1='15'%20y1='6.5'%20x2='15'%20y2='23.5'/%3e%3c/g%3e%3c/svg%3e",Zt="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:none;stroke:%23fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}%3c/style%3e%3c/defs%3e%3cg%20id='_5'%20data-name='5'%3e%3cpolyline%20class='cls-1'%20points='5.58%2012.78%2010.01%2017.59%2018.41%207.23'/%3e%3c/g%3e%3c/svg%3e",Xt=e.div`
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 6px;
  padding-right: 6px;
`,O=e.div`
  position: relative;
  height: 100%;
`,Y=p`
  transform: translateY(-50%);
  top: 50%;
`,Ht=p`
  left: 50%;
  transform: translateX(-50%);
`,j=e.div`
  pointer-events: none;
  font-size: 14px;
  line-height: 20px;
  color: #666;
  background-color: #fff;
  border-radius: 6px;
  position: absolute;
  padding: 10px 12px;
  z-index: 10;
  transition: 300ms;
  opacity: 0;
  visibility: hidden;
  width: max-content;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ${({$dir:n})=>{switch(n){case"left":return p`
          ${Y}
          right: calc(100% + 12px);
        `;case"right":return p`
          ${Y}
          left: calc(100% + 12px);
        `;case"bottom":return p`
          ${Ht}
          width: 206px;
          top: calc(100% + 12px);
        `}}}

  // Arrow
  &:before {
    content: '';
    width: 12px;
    height: 12px;
    position: absolute;
    background-color: #fff;

    ${({$dir:n})=>{switch(n){case"left":return p`
            top: 50%;
            transform: translateY(-50%) rotate(45deg) skew(-5deg, -5deg);
            border-radius: 0 3px 0 0;
            left: calc(100% - 6px);
          `;case"right":return p`
            top: 50%;
            transform: translateY(-50%) rotate(45deg) skew(-5deg, -5deg);
            border-radius: 0 0 0 3px;
            right: calc(100% - 6px);
          `;case"bottom":return p`
            top: -6px;
            left: 50%;
            transform: translateX(-50%) rotate(45deg) skew(5deg, 5deg);
            border-radius: 3px 0 0 0;
          `}}}
  }
`,E=e.img`
  cursor: pointer;
  width: 32px;
  height: 32px;
  fill: #fff;
  transition: 100ms ease-out;

  &:hover {
    transform: scale(1.2);
  }

  &:hover + ${j} {
    visibility: visible;
    opacity: 1;
  }
`,z=e.div`
  width: 32px;
  height: 32px;
`,qt=e.button`
  height: 24px;
  border: 1px solid #fff;
  border-radius: 12.5px;
  background-color: transparent;
  color: #fff;
  font-size: 14px;
  padding-left: 12px;
  padding-right: 12px;
  position: relative;
  display: grid;
  place-items: center;
  cursor: pointer;

  ${({$disabled:n})=>n?p`
          background-color: rgba(0, 0, 0, 0.1);
          color: #fff;
          cursor: not-allowed;
          border: none;
        `:p`
          &:hover {
            background-color: #fff;
            color: #000;
          }
        `}

  &:hover > ${j} {
    visibility: visible;
    opacity: 1;
  }
`,$t=e.div`
  width: 32px;
  height: 32px;
  position: relative;
`,K=e(B.img)`
  position: absolute;
  inset: 0;

  ${({$hasToolTip:n=!1})=>n&&p`
      cursor: pointer;
      transition: 100ms ease-out;

      &:hover {
        transform: scale(1.2);
      }

      &:hover + ${j} {
        visibility: visible;
        opacity: 1;
      }
    `}
`;function te({isSiteInList:n,addSiteToList:s,siteBlockingMode:i}){const o=ot(n,{from:{opacity:0},enter:{opacity:1},leave:{opacity:0}});return t.jsxs($t,{onClick:s,children:[o((c,d)=>d?t.jsx(K,{style:c,src:Zt,alt:"Done"}):t.jsx(K,{style:c,src:Wt,alt:"Add",$hasToolTip:!0})),t.jsx(j,{$dir:"left",children:i==="Allow"?a("main_add_whitelist_tooltip"):a("main_add_blacklist_tooltip")})]})}function ee({backToIdle:n,inititalSiteList:s,initialSiteBlockingMode:i,plantingStatus:o,openPlantEditDialog:c}){const[d,u]=h.useState(s),[l,w]=h.useState(i),[m,k]=h.useState(null);h.useEffect(()=>{(async function(){const b=await L();k(d.some(I=>b.includes(I)))})()},[d]);const r=async()=>{const f=l==="Allow"?"Block":"Allow";w(f),Vt(v.UPDATE_CONTENT_SCRIPT_SITE_BLOCKING_MODE,f),U("siteBlockingMode",f);const b=await C(f==="Allow"?"allowList":"blockList");u(b)},x=async()=>{if(m)return;const f=await L(),b=[...d,f];u(b),U(l==="Allow"?"allowList":"blockList",b),y(v.OPTIONS_PAGE_REVALIDATE_SITE_LIST,{siteBlockingMode:l,siteList:b}).catch(()=>{})},A=()=>{if(o==="Started")return a("extension_cannot_edit");switch(l){case"Allow":return a("extension_whitelist_mode_hover");case"Block":return a("extension_blacklist_mode_hover")}};return t.jsxs(Xt,{children:[function(){switch(o){case"Idle":return t.jsxs(O,{children:[t.jsx(E,{src:Jt,onClick:()=>S.runtime.openOptionsPage()}),t.jsx(j,{$dir:"right",children:a("main_settings_tooltip")})]});case"Started":return t.jsxs(O,{children:[t.jsx(E,{src:Ft,onClick:()=>c(!0)}),t.jsx(j,{$dir:"right",children:a("main_edit_tooltip")})]});case"Succeeded":case"Failed":return t.jsx(E,{src:Gt,onClick:n})}}(),t.jsxs(qt,{$disabled:o==="Started",onClick:r,children:[l==="Block"&&a("extension_blacklist_mode"),l==="Allow"&&a("extension_whitelist_mode"),t.jsx(j,{$dir:"bottom",children:A()})]}),function(){return o==="Idle"?m===null?t.jsx(z,{}):t.jsx(te,{isSiteInList:m,addSiteToList:x,siteBlockingMode:l}):t.jsx(z,{})}()]})}const ne="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:%23ffffff;}.cls-1,.cls-2{stroke:%23ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}.cls-2{fill:none;}%3c/style%3e%3c/defs%3e%3cg%20id='_5'%20data-name='5'%3e%3crect%20class='cls-1'%20x='5.63'%20y='9.5'%20width='12.74'%20height='8.25'%20rx='1'/%3e%3cpath%20class='cls-2'%20d='M7.5,9.5a4.5,4.5,0,0,1,9,0'/%3e%3c/g%3e%3c/svg%3e",ie="/plant-ball.png",se=window.screenLeft<0||window.screenTop<0||window.screenLeft>window.screen.width||window.screenTop>window.screen.height,oe=at`
  0% {
    opacity: 1;
  }
  100% {
    opacity: .99;
  }
`,ae=ct`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    user-select: none;
  }

  input, textarea {
    user-select: auto;
  }

  html {
    // This fix the chrome bug:
    // https://stackoverflow.com/questions/56500742/why-is-my-google-chrome-extensions-popup-ui-laggy-on-external-monitors-but-not
    ${n=>n.isMac&&se&&p`
        animation: ${oe} 1s linear infinite;
      `}
  }
  
  body {
    margin: 0;
    padding: 5px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  button {
    cursor: pointer;
    border: none;
    appearance: none;
    
    :focus {
      outline: none;
    }
  }
`,ce=e.div`
  background-color: #51a387;
  color: #fff;
  width: 295px;
  height: 329px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 15px;
`,re=e.div`
  display: grid;
  place-items: center;
  height: 42px;
  line-height: 22px;
  font-size: 16px;
  margin-top: 11px;
  padding: 0 24px;
  text-align: center;
`,X=e.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({$disabled:n})=>n&&p`
      pointer-events: none;
    `}
`,le=e.div`
  background: url(${ie});
  background-position: center;
  background-repeat: no-repeat;
  height: 120px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({$isLocked:n})=>n?"not-allowed":"pointer"};
  position: relative;
`,de=e.img`
  width: 72px;
  height: 72px;
  margin-top: -25px;
  ${({$isLocked:n})=>n&&p`
      filter: brightness(0.4);
    `}
`,pe=e.img`
  width: 36px;
  height: 36px;
  position: absolute;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
`,F=e.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
  opacity: 0;
  transition-duration: 0.3s;
  margin: 0 4px;
  ${X}:hover & {
    opacity: 1;
  }
`;e.img`
  width: 100px;
  height: 100px;
`;e.div`
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 6px;
  padding-right: 6px;
`;e.img`
  /* fill: #fff; */

  :hover {
    transform: scale(1.2, 1.2);
    transition: all 0.1s ease-out;
  }
`;e.img`
  margin-left: auto;
  fill: #fff;
  width: 32px;
  height: 32px;
  :hover {
    transform: scale(1.2, 1.2);
    transition: all 0.1s ease-out;
  }
`;e(B.img)`
  margin-left: auto;
  fill: #fff;
  width: 32px;
  height: 32px;
`;e.div`
  margin-left: auto;
  width: 32px;
  height: 32px;
`;e.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  z-index: 5;
`;e.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #444444;
`;function ge(n){const[s]=_(!1,async g=>g((await S.runtime.getPlatformInfo()).os==="mac")),[i,o]=h.useState(n.plantingStatus),[c,d]=h.useState(n.timeRemaining),u=i==="Started",[l,w]=h.useState(n.plant),[m,k]=h.useState(0),r=lt(),x=dt();h.useEffect(()=>{i==="Succeeded"&&(x.off(),r.on())},[i]),h.useEffect(()=>{pt(v.UPDATE_VIEW,({data:g})=>{w(g.plant),d(g.timeRemaining),o(g.plantingStatus)})},[]);const A=async g=>{const T=await C(g?"growingPlant":"resultPlant");x.on(T)},f=g=>{y(v.START_PLANTING,{plantId:g},"background")},b=()=>{y(v.BACK_TO_IDLE,null,"background")},I=()=>{y(v.MODIFY_PLANT_INDEX,"Prev","background")},H=()=>{y(v.MODIFY_PLANT_INDEX,"Next","background")},q=()=>{switch(i){case"Idle":return a("main_top_description_ready");case"Succeeded":return a("main_top_description_grown");case"Failed":return a("main_top_description_failed");case"Started":return a(`main_message_growing_text_${m}`)}};return h.useLayoutEffect(()=>{c%10===0&&i==="Started"&&k(Math.floor(Math.random()*13))},[c,i]),t.jsxs(t.Fragment,{children:[t.jsx(ae,{isMac:s}),t.jsxs(ce,{children:[t.jsx(ee,{backToIdle:b,plantingStatus:i,inititalSiteList:n.siteList,initialSiteBlockingMode:n.siteBlockingMode,openPlantEditDialog:A}),t.jsx(re,{children:q()}),t.jsxs(X,{$disabled:i!=="Idle",children:[t.jsx(F,{src:W,onClick:I}),t.jsxs(le,{$isLocked:l.isLocked,...l.isLocked===!1&&{onClick:()=>f(l.id)},children:[t.jsx(de,{src:l.image,$isLocked:l.isLocked,onContextMenu:g=>g.preventDefault(),draggable:!1}),l.isLocked&&t.jsx(pe,{src:ne})]}),t.jsx(F,{src:Z,onClick:H})]}),(i==="Idle"||i==="Started")&&t.jsx(Kt,{canModify:i==="Idle",timeInSeconds:c}),(i==="Failed"||i==="Succeeded")&&t.jsx(jt,{isSuccess:i==="Succeeded",openPlantEditDialog:A}),r.trans((g,T)=>T&&t.jsx(Ot,{style:g,close:r.off})),x.trans(({opacity:g,transform:T},M)=>M&&t.jsx(At,{plant:M,isPlanting:u,close:x.off,dialogTransform:T,overlayOpacity:g}))]})]})}(async function(){const s=await y("GET_POPUP_PROPS",null,"background"),i=document.createElement("div");i.id="root",document.body.appendChild(i),rt(i).render(t.jsx(ge,{...s}))})();
