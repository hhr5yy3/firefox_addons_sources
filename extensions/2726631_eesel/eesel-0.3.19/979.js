"use strict";(globalThis.webpackChunk_eesel_app=globalThis.webpackChunk_eesel_app||[]).push([[979],{61495:(e,t,n)=>{n.d(t,{z:()=>o});var a=n(30130),l=n(17241),r=n(87395);const o=({command:e})=>{const t=a.useMemo((()=>Object.assign(Object.assign({},e),{getLogo:()=>l.FiZap})),[e]);return a.createElement(r.L,{entity:t})}},87395:(e,t,n)=>{n.d(t,{L:()=>o});var a=n(3974),l=n(30130),r=n(73081);const o=(0,n(35313).I)((e=>{var t,{entity:n,fallback:o=""}=e,c=(0,a.__rest)(e,["entity","fallback"]);const i=(e=>e.getName?e.getName():e.name?e.name:e.value?e.value:e.title||"")(n),m=(null===(t=n.getLogo)||void 0===t?void 0:t.call(n))||n.logo;return"string"!=typeof m?l.createElement(r.Icon,{"aria-label":i,component:m}):l.createElement("img",Object.assign({alt:i,src:m||o},c))}))},14400:(e,t,n)=>{n.d(t,{A:()=>s});var a=n(3974),l=n(30130),r=n(21743),o=n(30845),c=n(35313),i=n(44235);const m=(0,r.default)((0,c.I)(o.FiPlus))`
  margin-right: 0.75rem;
`,s=e=>{var{children:t}=e,n=(0,a.__rest)(e,["children"]);return l.createElement(i.z,Object.assign({color:"primary",display:"flex",px:"0",shape:"text"},n),l.createElement(m,null),t)}},99387:(e,t,n)=>{n.d(t,{S:()=>c});var a=n(30130),l=n(21743),r=n(41473);const o=l.default.span`
  color: onBGSubtle;
  font-weight: 400;
`,c=({command:e})=>{const t=e.getArgumentList();return t?a.createElement(a.Fragment,null,a.createElement(r.x.span,{"aria-label":"title"},"/",e.name)," ",a.createElement(o,null,t.join(" "))):a.createElement(r.x.span,{"aria-label":"title"},"/",e.name)}},29979:(e,t,n)=>{n.r(t),n.d(t,{SettingsCommandListContainer:()=>I});var a=n(30130),l=n(79740),r=n(17683),o=n(6844),c=n(12530),i=n(74054),m=n(75278),s=n(63693),d=n(21743),u=n(11930),f=n(36324),g=n(1141),p=n(61495),b=n(2510),x=n(94927),E=n(99387),h=n(14400);const C=d.default.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`,v=(0,d.default)(f.VY)`
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
`,y=({command:e,onClick:t,style:n})=>{const l=a.useCallback((()=>a.createElement(p.z,{command:e})),[e]),r=a.useCallback((()=>{null==t||t(e)}),[t,e]);return a.createElement(x._,{"aria-label":`edit ${e.name}`,logoComponent:l,onClick:r,style:n},a.createElement(E.S,{command:e}))},k=({commandList:e,isItemLoaded:t,itemCount:n,loadMoreItems:l,onCommandAddClick:r,onCommandClick:o})=>{const c=a.useCallback((({data:e,index:t,style:n})=>e[t]?a.createElement(y,{command:e[t],onClick:o,style:n}):null),[o]);return a.createElement(a.Fragment,null,a.createElement(v,null,a.createElement(C,null,a.createElement(g.Z,{isItemLoaded:t,itemCount:n,loadMoreItems:l},(({onItemsRendered:t,ref:l})=>a.createElement(b.U,{itemCount:n,itemData:e,onItemsRendered:t,ref:l},c))))),a.createElement(u.$_,null,a.createElement(h.A,{"aria-label":"new command",onClick:r},"New command")))},w=l.Ps`
  query SettingsCommandListContainerQuery($offset: Int) {
    commandList(offset: $offset) {
      edges {
        id
        name
        url
      }
      pageInfo {
        totalCount
      }
    }
  }
`,I=()=>{const e=(0,o.k6)(),{data:{commandList:{edges:t=[],pageInfo:{totalCount:n=0}={}}={}}={},error:l,fetchMore:d,loading:u}=(0,r.useQuery)(w,{fetchPolicy:"network-only",nextFetchPolicy:"cache-first",onError(e){(0,c.H)(e)},variables:{offset:0}}),f=a.useCallback((e=>Boolean(t[e])),[t]),g=a.useCallback((e=>{d({variables:{offset:e}})}),[d]),p=a.useMemo((()=>t.map((e=>(0,i.f)(e)))),[t]),b=a.useCallback((()=>{e.push("/settings/commands/add")}),[e]),x=a.useCallback((t=>{e.push(`/settings/commands/${t.id}/update`)}),[e]);return u?a.createElement(m.a,null):l?a.createElement(s.R,null):a.createElement(k,{commandList:p,isItemLoaded:f,itemCount:n,loadMoreItems:g,onCommandAddClick:b,onCommandClick:x})}},63693:(e,t,n)=>{n.d(t,{R:()=>o});var a=n(30130),l=n(48248),r=n(36324);const o=({children:e})=>a.createElement(r.VY,{style:{paddingTop:"2rem"}},a.createElement(l.b,{color:"danger"},e||"An error has occured. Please try again later."))},36324:(e,t,n)=>{n.d(t,{Dx:()=>u,VY:()=>f,xE:()=>d});var a=n(3974),l=n(30130),r=n(21743),o=n(14289),c=n(41473),i=n(11930),m=n(44235);const s=(0,n(35313).I)(o.FiChevronLeft),d=l.forwardRef(((e,t)=>l.createElement(m.z,Object.assign({alignItems:"center",color:"text",display:"flex",ml:"-0.5rem",ref:t,shape:"icon"},e),l.createElement(s,null)))),u=l.forwardRef(((e,t)=>{var{variant:n="centered"}=e,r=(0,a.__rest)(e,["variant"]);const o=Object.assign(Object.assign({flexGrow:1,fontSize:"1rem",fontWeight:600,margin:"0px 1rem 0px 0.5rem"},"centered"===n?{textAlign:"center"}:{}),"left"===n?{textAlign:"left"}:{});return l.createElement(c.x.h2,Object.assign({ref:t},o,r))})),f=(0,r.default)(i.VY)`
  flex-grow: 1;
  overflow-y: auto;
`},2510:(e,t,n)=>{n.d(t,{U:()=>o});var a=n(30130),l=n(41473),r=n(14168);const o=a.forwardRef(((e,t)=>a.createElement(l.x.div,{flexGrow:1},a.createElement(r.a,Object.assign({itemSize:51,ref:t,style:{paddingBottom:"1rem"}},e)))))},94927:(e,t,n)=>{n.d(t,{_:()=>u});var a=n(3974),l=n(30130),r=n(21743),o=n(87515),c=n(8615),i=n(41473),m=n(35313),s=n(44235);const d=(0,r.default)((0,m.I)(c.FiChevronRight))`
  color: onBGSubtle;
`,u=(0,r.default)(l.forwardRef(((e,t)=>{var{chevron:n=!0,children:r,logoComponent:c,separator:m=!0}=e,u=(0,a.__rest)(e,["chevron","children","logoComponent","separator"]);const f=(0,o.u)();return l.createElement(s.z,Object.assign({alignItems:"center",border:`solid 0px ${f.colors.border}`,borderBottomWidth:m?"1px":"0",color:"text",display:"flex",padding:"1rem 0",ref:t,shape:"text",w:"100%"},u),l.createElement(i.x.div,{alignItems:"center",display:"flex",flexGrow:{_:1},overflow:"hidden"},l.createElement(c,null),l.createElement(i.x.div,{alignItems:"baseline",display:"flex","flex-grow":"1",marginLeft:"0.75rem",overflow:"hidden",textAlign:"left",textOverflow:"ellipsis",whiteSpace:"nowrap"},r)),n&&l.createElement(d,null))})))`
  &:hover [aria-label='title'] {
    text-decoration: underline;
  }
`}}]);