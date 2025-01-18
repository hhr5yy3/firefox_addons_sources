"use strict";(globalThis.webpackChunk_eesel_app=globalThis.webpackChunk_eesel_app||[]).push([[924],{5924:(e,t,n)=>{n.r(t),n.d(t,{SettingsCommandCreateContainer:()=>k});var a=n(3974),l=n(30130),i=n(6844),m=n(79740),o=n(8330),c=n(24313),r=n(11930),s=n(36324),d=n(57334);const u=({onBackClick:e,onSubmit:t})=>l.createElement(l.Fragment,null,l.createElement(r.h4,null,l.createElement(s.xE,{onClick:e}),l.createElement(s.Dx,null,l.createElement("div",{style:{alignItems:"center",display:"inline-flex"}},"New command"))),l.createElement(s.VY,null,l.createElement(d.V,{onSubmit:t})));var C=n(94506);const p=m.Ps`
  mutation SettingsCommandCreateContainerCommandCreateMutation(
    $input: CommandInput!
  ) {
    commandCreate(input: $input) {
      code
      id
      name
      url
    }
  }
`,k=()=>{const e=(0,i.k6)(),[{refetch:t}]=(0,c.useSearch)(),n=l.useCallback((()=>{e.push("/settings/commands")}),[e]),{trackEvent:m}=(0,C.useAnalyticsListener)(),[r]=(0,o.D)(p,{onCompleted(){m("commandCreated")}}),s=l.useCallback((async n=>{var l,i,{id:m}=n,o=(0,a.__rest)(n,["id"]);const c=await r({variables:{input:o}});if(await t(),!(null===(i=null===(l=null==c?void 0:c.data)||void 0===l?void 0:l.commandCreate)||void 0===i?void 0:i.id))throw new Error("command not found");e.push(`/settings/commands/${c.data.commandCreate.id}/update`)}),[r,e,t]);return l.createElement(u,{onBackClick:n,onSubmit:s})}}}]);