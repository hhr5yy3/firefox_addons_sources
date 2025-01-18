"use strict";(globalThis.webpackChunk_eesel_app=globalThis.webpackChunk_eesel_app||[]).push([[196],{83226:(e,t)=>{t.E=void 0,t.E=e=>{try{const{hostname:t,protocol:a}=new URL(e);return"https:"===a&&"chrome.google.com"!==t}catch(e){return!1}}},87395:(e,t,a)=>{a.d(t,{L:()=>o});var n=a(3974),r=a(30130),l=a(73081);const o=(0,a(35313).I)((e=>{var t,{entity:a,fallback:o=""}=e,i=(0,n.__rest)(e,["entity","fallback"]);const s=(e=>e.getName?e.getName():e.name?e.name:e.value?e.value:e.title||"")(a),c=(null===(t=a.getLogo)||void 0===t?void 0:t.call(a))||a.logo;return"string"!=typeof c?r.createElement(l.Icon,{"aria-label":s,component:c}):r.createElement("img",Object.assign({alt:s,src:c||o},i))}))},89677:(e,t,a)=>{a.d(t,{P:()=>o});var n=a(30130),r=a(41473),l=a(49864);const o=({isCurrentPage:e,app:t,variant:a})=>n.createElement(n.Fragment,null,n.createElement(r.x.span,{"aria-label":"title"},t.name),"url"===a&&n.createElement(n.Fragment,null,n.createElement(r.x.span,{color:"onBGSubtle",flexGrow:{_:1},fontSize:"3",marginLeft:"2"},t instanceof l.ManagedApp?t.getURL().replace(/^https?:\/\//,""):t.getHostname()),e&&n.createElement(r.x.span,{color:"secondary",fontSize:"3",overflow:"hidden",paddingLeft:"1rem",textOverflow:"ellipsis"},"based on current page"),t.activatedAt?n.createElement(r.x.span,{color:"onBG",fontSize:"3",opacity:.5,overflow:"hidden",paddingLeft:"1rem",textOverflow:"ellipsis"},"already added"):null))},3196:(e,t,a)=>{a.r(t),a.d(t,{SettingsAppAddContainer:()=>V});var n=a(30130),r=a(79740),l=a(8330),o=a(6844),i=a(17683),s=a(83226),c=a(49864),d=a(71291),u=a(26275),p=a(17622),m=a(97879),g=a(75278),f=a(63693),v=a(21743),b=a(13705),h=a(48248),E=a(11930),x=a(36324),C=a(3974),y=a(54221),w=a(87395),k=a(2510),A=a(94927),L=a(89677);const S=n.createContext(-1),P=n.memo((({disabled:e,onClick:t,app:a,selected:r,style:l})=>{const o=n.useRef(null),i=n.useCallback((()=>n.createElement(w.L,{entity:a})),[a]);n.useEffect((()=>{var e;r&&(null===(e=o.current)||void 0===e||e.scrollIntoView(!1))}),[r]);const s=n.useCallback((()=>{t(a)}),[t,a]);return n.createElement(A._,{"aria-label":"addAppFromSuggestion",backgroundColor:r?"highlight":"transparent",borderRadius:"1rem",chevron:!1,disabled:e,logoComponent:i,onClick:s,opacity:a.activatedAt?.5:1,px:"1rem",ref:o,separator:!1,style:l},n.createElement(L.P,{app:a,isCurrentPage:void 0!==a.isCurrentPage&&a.isCurrentPage,variant:"url"}))})),_=e=>{var{index:t}=e,a=(0,C.__rest)(e,["index"]);const r=n.useContext(S);return n.createElement(P,Object.assign({selected:r===t},a))},I=({disabled:e,onClick:t,appList:a})=>{const r=n.useCallback(((e,t)=>t[e].id),[]),l=n.useCallback((({data:a,index:r,style:l})=>{const o=a[r];return n.createElement(_,{app:o,"aria-label":"select app",disabled:e,index:r,onClick:t,style:l})}),[e,t]);return n.createElement(k.U,{itemCount:a.length,itemData:a,itemKey:r},l)},R=v.default.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`,O=v.default.div`
  display: flex;
  padding: 2 0;
`,U=(0,v.default)(y.Input)`
  flex-grow: 1;
`,D=({disabled:e,focused:t,onChange:a,appList:r=[]})=>{const[l,o]=n.useState(""),[i,s]=n.useState(-1),c=n.useMemo((()=>{const e=l.trim().toLocaleLowerCase();return e?r.filter((t=>{var a;if(t.getHostname().includes(e)||e.includes(t.getHostname()))return!0;const n=null===(a=t.name)||void 0===a?void 0:a.toLowerCase();return n&&(n.includes(e)||e.includes(n))})):r}),[l,r]);n.useEffect((()=>{s(-1)}),[l]);const d=n.useCallback((t=>{if(!e)switch(t.key){case"ArrowDown":t.preventDefault(),s((e=>e<c.length-1?e+1:e));break;case"ArrowUp":t.preventDefault(),s((e=>e>-1?e-1:-1));break;case"Enter":t.preventDefault(),c[i]&&(null==a||a(c[i]))}return null}),[e,c,a,i]),u=n.useCallback((()=>{s(-1)}),[]),p=n.useCallback((e=>{o(e.target.value)}),[]),m=n.useCallback((e=>{null==a||a(e)}),[a]);return n.createElement(R,null,n.createElement(O,null,n.createElement(U,{disabled:e,focused:t,onChange:p,onFocus:u,onKeyDown:d,placeholder:"Search an app from history...",value:l})),n.createElement(S.Provider,{value:i},n.createElement(I,{appList:c,disabled:e,onClick:m})))},j=v.default.div`
  align-items: center;
  display: flex;
  height: 100%;
  text-align: center;
`,B=({onBackClick:e,onSubmit:t,appList:a})=>{const r=(0,b.usePageSheet)(),[l,o]=n.useState(!1),[i,s]=n.useState(null),c=(0,n.useCallback)((async e=>{o(!0);try{t&&await t(e)}catch(e){s(new Error("An error has occured, please try again.")),o(!1)}}),[t]);return r?n.createElement(n.Fragment,null,n.createElement(E.h4,null,n.createElement(x.xE,{onClick:e}),n.createElement(x.Dx,null,"New app")),n.createElement(x.VY,{style:{paddingBottom:"2rem"}},a.length?n.createElement(n.Fragment,null,i&&n.createElement(h.b,{color:"danger"},i.message),n.createElement(D,{appList:a,disabled:l,focused:!r.animating,onChange:c})):n.createElement(j,null,"It looks like you haven’t done much work yet. Start browsing around and eesel will suggest apps to add based on your history."))):null};var F=a(89389),z=a(94506);const G=r.Ps`
  query SettingsAppAddContainer {
    currentPage {
      title
      url
    }

    appList(activated: true) {
      activatedAt
      id
      logo
      name
      order
      ruleList
      type
    }

    suggestedAppList {
      id
      logo
      name
      ruleList
      type
    }
  }
`,$=r.Ps`
  mutation SettingsAppAddContainerProductAddMutation($input: AppAddInput!) {
    appAdd(input: $input) {
      order
      id
      logo
      ruleList
      type
    }
  }
`,M=r.Ps`
  mutation SettingsAppAddContainerUserUpdateMutation($input: UserInput!) {
    userUpdate(input: $input) {
      activity {
        appAddCount
      }
      id
    }
  }
`,V=()=>{const e=(0,o.k6)(),{data:{currentPage:t,appList:a=[],suggestedAppList:r=[]}={},error:v,loading:b}=(0,i.useQuery)(G),[h]=(0,l.D)($,{awaitRefetchQueries:!0,refetchQueries:[{query:p.Vx}]}),[E]=(0,l.D)(M),x=n.useMemo((()=>{const e=[...r.map((e=>(0,F.r)(e))),...a.map((e=>(0,F.r)(e)))];if(!t||!(0,s.E)(t.url))return e;const n=e.findIndex((e=>e.isTrackingURL(t.url)));return n<0?e:[Object.assign(e[n],{isCurrentPage:!0}),...e.slice(0,n),...e.slice(n+1)]}),[t,a,r]),C=!(0,d.O)()&&window.parent.location.href.includes("#/onboarding/no-document");n.useEffect((()=>{C&&(0,m._P)("/onboarding-add-product")}),[C]),(0,u.m)((()=>{C&&(0,m._P)("/onboarding-add-product")}));const{trackEvent:y}=(0,z.useAnalyticsListener)(),w=n.useCallback((async({ruleList:t})=>{const a=await h({variables:{input:{ruleList:t}}}).then((({data:e})=>(null==e?void 0:e.appAdd)?(0,F.r)(e.appAdd):null));a&&(await E({variables:{input:{activity:{appAddCount:"+1"}}}}),y("appAdded",{managedApp:a instanceof c.ManagedApp,ruleList:t}),C&&(0,m._P)(`/onboarding-app-added?hostname=${encodeURIComponent(a.getHostname())}`),e.push(`/settings/apps/${a.id}`))}),[h,e,C,y,E]),k=n.useCallback((()=>{e.push("/settings/apps")}),[e]);return b?n.createElement(g.a,null):v?n.createElement(f.R,null):n.createElement(B,{appList:x,onBackClick:k,onSubmit:w})}},63693:(e,t,a)=>{a.d(t,{R:()=>o});var n=a(30130),r=a(48248),l=a(36324);const o=({children:e})=>n.createElement(l.VY,{style:{paddingTop:"2rem"}},n.createElement(r.b,{color:"danger"},e||"An error has occured. Please try again later."))},36324:(e,t,a)=>{a.d(t,{Dx:()=>p,VY:()=>m,xE:()=>u});var n=a(3974),r=a(30130),l=a(21743),o=a(14289),i=a(41473),s=a(11930),c=a(44235);const d=(0,a(35313).I)(o.FiChevronLeft),u=r.forwardRef(((e,t)=>r.createElement(c.z,Object.assign({alignItems:"center",color:"text",display:"flex",ml:"-0.5rem",ref:t,shape:"icon"},e),r.createElement(d,null)))),p=r.forwardRef(((e,t)=>{var{variant:a="centered"}=e,l=(0,n.__rest)(e,["variant"]);const o=Object.assign(Object.assign({flexGrow:1,fontSize:"1rem",fontWeight:600,margin:"0px 1rem 0px 0.5rem"},"centered"===a?{textAlign:"center"}:{}),"left"===a?{textAlign:"left"}:{});return r.createElement(i.x.h2,Object.assign({ref:t},o,l))})),m=(0,l.default)(s.VY)`
  flex-grow: 1;
  overflow-y: auto;
`},2510:(e,t,a)=>{a.d(t,{U:()=>o});var n=a(30130),r=a(41473),l=a(14168);const o=n.forwardRef(((e,t)=>n.createElement(r.x.div,{flexGrow:1},n.createElement(l.a,Object.assign({itemSize:51,ref:t,style:{paddingBottom:"1rem"}},e)))))},94927:(e,t,a)=>{a.d(t,{_:()=>p});var n=a(3974),r=a(30130),l=a(21743),o=a(87515),i=a(8615),s=a(41473),c=a(35313),d=a(44235);const u=(0,l.default)((0,c.I)(i.FiChevronRight))`
  color: onBGSubtle;
`,p=(0,l.default)(r.forwardRef(((e,t)=>{var{chevron:a=!0,children:l,logoComponent:i,separator:c=!0}=e,p=(0,n.__rest)(e,["chevron","children","logoComponent","separator"]);const m=(0,o.u)();return r.createElement(d.z,Object.assign({alignItems:"center",border:`solid 0px ${m.colors.border}`,borderBottomWidth:c?"1px":"0",color:"text",display:"flex",padding:"1rem 0",ref:t,shape:"text",w:"100%"},p),r.createElement(s.x.div,{alignItems:"center",display:"flex",flexGrow:{_:1},overflow:"hidden"},r.createElement(i,null),r.createElement(s.x.div,{alignItems:"baseline",display:"flex","flex-grow":"1",marginLeft:"0.75rem",overflow:"hidden",textAlign:"left",textOverflow:"ellipsis",whiteSpace:"nowrap"},l)),a&&r.createElement(u,null))})))`
  &:hover [aria-label='title'] {
    text-decoration: underline;
  }
`}}]);