"use strict";(globalThis.webpackChunk_eesel_app=globalThis.webpackChunk_eesel_app||[]).push([[896],{61495:(e,t,a)=>{a.d(t,{z:()=>o});var n=a(30130),l=a(17241),m=a(87395);const o=({command:e})=>{const t=n.useMemo((()=>Object.assign(Object.assign({},e),{getLogo:()=>l.FiZap})),[e]);return n.createElement(m.L,{entity:t})}},87395:(e,t,a)=>{a.d(t,{L:()=>o});var n=a(3974),l=a(30130),m=a(73081);const o=(0,a(35313).I)((e=>{var t,{entity:a,fallback:o=""}=e,i=(0,n.__rest)(e,["entity","fallback"]);const r=(e=>e.getName?e.getName():e.name?e.name:e.value?e.value:e.title||"")(a),c=(null===(t=a.getLogo)||void 0===t?void 0:t.call(a))||a.logo;return"string"!=typeof c?l.createElement(m.Icon,{"aria-label":r,component:c}):l.createElement("img",Object.assign({alt:r,src:c||o},i))}))},99387:(e,t,a)=>{a.d(t,{S:()=>i});var n=a(30130),l=a(21743),m=a(41473);const o=l.default.span`
  color: onBGSubtle;
  font-weight: 400;
`,i=({command:e})=>{const t=e.getArgumentList();return t?n.createElement(n.Fragment,null,n.createElement(m.x.span,{"aria-label":"title"},"/",e.name)," ",n.createElement(o,null,t.join(" "))):n.createElement(m.x.span,{"aria-label":"title"},"/",e.name)}},45896:(e,t,a)=>{a.r(t),a.d(t,{SettingsCommandUpdateContainer:()=>D});var n=a(3974),l=a(30130),m=a(79740),o=a(8330),i=a(17683),r=a(6844),c=a(74054),d=a(75278),s=a(24313),u=a(90232),p=a(63693),g=a(11930),C=a(36324),b=a(61495),E=a(99387),v=a(57334),k=a(41473);const h=({command:e,onBackClick:t,onRemoveClick:a,onSubmit:n})=>{const m=l.useMemo((()=>{const{code:t,id:a,name:n,url:l}=e.toJSON();return{code:t,id:a,name:n,url:l}}),[e]);return l.createElement(l.Fragment,null,l.createElement(g.h4,null,l.createElement(C.xE,{onClick:t}),l.createElement(C.Dx,null,l.createElement("div",{style:{alignItems:"center",display:"inline-flex"}},l.createElement(k.x.div,{mr:"1rem"},l.createElement(b.z,{command:e})),l.createElement(E.S,{command:e})))),l.createElement(C.VY,null,l.createElement(v.V,{initialValues:m,onRemoveClick:a,onSubmit:n})))},y=m.Ps`
  query SettingsCommandUpdateContainerQuery($id: ID!) {
    command(id: $id) {
      code
      id
      name
      url
    }
  }
`,S=m.Ps`
  mutation SettingsCommandUpdateContainerCommandUpdate(
    $id: ID!
    $input: CommandInput!
  ) {
    commandUpdate(id: $id, input: $input) {
      code
      id
      name
      url
    }
  }
`,f=m.Ps`
  mutation SettingsCommandUpdateContainerCommandDelete($id: ID!) {
    commandDelete(id: $id)
  }
`,D=()=>{const e=(0,r.k6)(),{id:t}=(0,r.UO)(),{data:{command:a}={},error:m,loading:g}=(0,i.useQuery)(y,{variables:{id:t}}),C=l.useMemo((()=>a?(0,c.f)(a):a),[a]),[{refetch:b}]=(0,s.useSearch)(),[E]=(0,o.D)(S,{onCompleted(){u.j("commandUpdated")}}),[v]=(0,o.D)(f,{onCompleted(){u.j("commandRemoved")}}),k=l.useCallback((async e=>{var{id:t}=e,a=(0,n.__rest)(e,["id"]);await E({variables:{id:t,input:a}}),await b()}),[b,E]),D=l.useCallback((async()=>{t&&(await v({variables:{id:t}}),await b()),e.push("/settings/commands")}),[v,e,t,b]),U=l.useCallback((()=>{e.push("/settings/commands")}),[e]);return g?l.createElement(d.a,null):m||!C?l.createElement(p.R,null):l.createElement(h,{command:C,onBackClick:U,onRemoveClick:D,onSubmit:k})}},63693:(e,t,a)=>{a.d(t,{R:()=>o});var n=a(30130),l=a(48248),m=a(36324);const o=({children:e})=>n.createElement(m.VY,{style:{paddingTop:"2rem"}},n.createElement(l.b,{color:"danger"},e||"An error has occured. Please try again later."))}}]);