"use strict";(globalThis.webpackChunk_eesel_app=globalThis.webpackChunk_eesel_app||[]).push([[521],{96931:(e,r,o)=>{r.FP=r.NX=void 0;const t=o(3974),n=(0,t.__importDefault)(o(30130)),a=o(16280),l=o(49768),i=(0,t.__importDefault)(o(21743)),s=o(99724),d=o(41473),c=o(78042),u=o(13705),b=o(56858),g=o(68132),m=o(47049),f=(0,i.default)(s.DialogBackdrop)`
  align-items: flex-end;
  background-color: backdrop;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
`,p=(0,i.default)(n.default.forwardRef(((e,r)=>{var{maxWidth:o,duration:a}=e,l=(0,t.__rest)(e,["maxWidth","duration"]);return n.default.createElement(s.Dialog,Object.assign({ref:r},l))})))`
  height: calc(100% - 8rem);
  outline: none;
  position: relative;
  ${e=>e.duration&&`transition: transform ${e.duration||1}ms ease-in-out;`&&"&[data-enter] {\n      transform: translateY(0);\n    }\n    "}
  width: 100%;
  max-width: ${e=>e.maxWidth||"100%"};
`;(0,i.default)(s.DialogDisclosure)`
  background-color: transparent;
  outline: none;
  border: none;
  &:focus {
    outline: none;
  }
`,r.NX=s.useDialogState,r.FP=e=>{var{children:r,dialog:o,dialogLabel:i,dialogProps:s,intercomHidden:d=!1,maxWidth:x,onClose:y}=e,v=(0,t.__rest)(e,["children","dialog","dialogLabel","dialogProps","intercomHidden","maxWidth","onClose"]);const _=(0,m.useIsSSR)();(0,l.useUpdateEffect)((()=>{o.visible||o.animating||d&&(0,b.setStyle)(".intercom-launcher",{visibility:"visible"})}),[o,d]),(0,g.useIsomorphicLayoutEffect)((()=>{o.visible&&d&&(0,b.setStyle)(".intercom-launcher",{visibility:"hidden"})}),[o.visible,d]);const E=n.default.useCallback((()=>{y?y():o.hide()}),[y,o]),w=n.default.useCallback((e=>{"Escape"===e.key&&(e.stopPropagation(),E())}),[E]);return n.default.createElement(u.PageSheetProvider,{dialog:o},!_&&n.default.createElement(f,Object.assign({onMouseDown:E},o),n.default.createElement(p,Object.assign({"aria-label":i,duration:o.animated?Number(o.animated):void 0,hideOnClickOutside:!1,hideOnEsc:!1,id:"pagesheet",maxWidth:x,onKeyDown:w,onMouseDown:e=>e.stopPropagation(),tabIndex:0},o,s),n.default.createElement(h,Object.assign({backgroundColor:"bg",boxShadow:"sheet",display:"flex",flexDirection:"column",h:"100%",margin:"0 auto",overflowY:"scroll",position:"relative",w:"100%"},v),n.default.createElement(c.ButtonIcon,{"aria-label":"Close",backgroundColor:"transparent",component:a.FiX,onClick:E,position:"fixed",right:"0.75rem",top:"0.85rem",zIndex:2}),r))))};const h=(0,i.default)(d.x.div)`
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`},13705:(e,r,o)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.usePageSheet=r.PageSheetProvider=void 0;const t=(0,o(3974).__importDefault)(o(30130)),n=t.default.createContext(null);r.PageSheetProvider=({children:e,dialog:r})=>t.default.createElement(n.Provider,{value:r},e),r.usePageSheet=()=>t.default.useContext(n)},44235:(e,r,o)=>{o.d(r,{z:()=>b});var t=o(3974),n=o(30130),a=o(21743),l=o(41473);const i=n.forwardRef(((e,r)=>n.createElement(l.x.button,Object.assign({alignItems:"center",appearance:"none",border:"none",borderRadius:"0.25rem",cursor:{_:"pointer",disabled:"default"},display:"inline-flex",fontWeight:"500",justifyContent:"center",outline:{_:"none",focus:"none"},overflow:"hidden",padding:"0.5rem 1rem",ref:r,textOverflow:"ellipsis",transitionDuration:(window.navigator.webdriver?1:128)+"ms",transitionProperty:"background-color, color",transitionTimingFunction:"ease",type:"button",whiteSpace:"nowrap"},e)))),s=(0,a.default)(n.forwardRef(((e,r)=>{var{color:o="primary"}=e,a=(0,t.__rest)(e,["color"]);const l=Object.assign(Object.assign(Object.assign({backgroundColor:"transparent",borderStyle:"solid",borderWidth:"1px"},"primary"===o?{borderColor:{_:"primary",disabled:"onBGSubtle"},color:{_:"primary",disabled:"onBGSubtle"}}:{}),"danger"===o?{borderColor:{_:"error",disabled:"onBGSubtle"},color:{_:"error",disabled:"onBGSubtle"}}:{}),"text"===o?{borderColor:{_:"onBG",disabled:"onBGSubtle"},color:{_:"onBG",disabled:"onBGSubtle"}}:{});return n.createElement(i,Object.assign({ref:r},l,a))})))`
  ${e=>e.color&&"primary"!==e.color?null:a.css`
          &:focus:not(:disabled),
          &:hover:not(:disabled) {
            border-color: primary;
            color: primary;
          }
        `}

  ${e=>"danger"===e.color?a.css`
          &:focus:not(:disabled),
          &:hover:not(:disabled) {
            border-color: error;
            color: error;
          }
        `:null}

  ${e=>"text"===e.color?a.css`
          &:hover:not(:disabled) {
            border-color: primary;
          }
        `:null}
`,d=(0,a.default)(n.forwardRef(((e,r)=>{var{color:o="primary"}=e,a=(0,t.__rest)(e,["color"]);const l=Object.assign(Object.assign(Object.assign(Object.assign({},"primary"===o?{backgroundColor:{_:"primary",disabled:"grey"},color:{_:"onPrimary",disabled:"onBGSubtle"}}:{}),"danger"===o?{backgroundColor:{_:"error",disabled:"grey"},color:{_:"onError",disabled:"onBGSubtle"}}:{}),"text"===o?{backgroundColor:{_:"bg03",disabled:"grey"},color:{_:"onBG03",disabled:"onBGSubtle"}}:{}),"white"===o?{backgroundColor:{_:"bg",disabled:"grey"},color:{_:"onBG",disabled:"onBGSubtle"}}:{});return n.createElement(i,Object.assign({ref:r},l,a))})))`
  ${e=>e.color&&"primary"!==e.color?null:a.css`
          &:focus:not(:disabled),
          &:hover:not(:disabled) {
            background-color: primary;
          }
        `}

  ${e=>"danger"===e.color?a.css`
          &:focus:not(:disabled),
          &:hover:not(:disabled) {
            background-color: error;
          }
        `:null}

  ${e=>"text"===e.color?a.css`
          &:hover:not(:disabled) {
            background-color: onBG;
          }
        `:null}
`,c=(0,a.default)(n.forwardRef(((e,r)=>{var{color:o="primary"}=e,a=(0,t.__rest)(e,["color"]);const l=Object.assign(Object.assign(Object.assign(Object.assign({backgroundColor:"transparent",borderRadius:0},"primary"===o?{color:{_:"primary",disabled:"onBGSubtle"}}:{}),"danger"===o?{color:{_:"error",disabled:"onBGSubtle"}}:{}),"text"===o?{color:{_:"onBG",disabled:"onBGSubtle"}}:{}),"white"===o?{color:{_:"onBG03",disabled:"onBGSubtle"}}:{});return n.createElement(i,Object.assign({ref:r},l,a))})))`
  ${e=>e.color&&"primary"!==e.color?null:a.css`
          &:focus:not(:disabled),
          &:hover:not(:disabled) {
            color: primary;
          }
        `}

  ${e=>"danger"===e.color?a.css`
          &:focus:not(:disabled),
          &:hover:not(:disabled) {
            color: error;
          }
        `:null}

  ${e=>"text"===e.color?a.css`
          &:hover:not(:disabled) {
            color: onBG;
          }
        `:null}

  ${e=>"white"===e.color?a.css`
          &:hover:not(:disabled) {
            color: onBG03;
          }
        `:null}
`,u=(0,a.default)(n.forwardRef(((e,r)=>{var{color:o="primary"}=e,a=(0,t.__rest)(e,["color"]);const l=Object.assign(Object.assign(Object.assign({borderRadius:"0",borderStyle:"solid",borderWidth:"0 0 2px 0",paddingLeft:"0",paddingRight:"0"},"primary"===o?{borderColor:{_:"primary",disabled:"onBGSubtle"}}:{}),"danger"===o?{borderColor:{_:"error",disabled:"onBGSubtle"}}:{}),"text"===o?{borderColor:{_:"onBG",disabled:"onBGSubtle"}}:{});return n.createElement(c,Object.assign({color:o,ref:r},l,a))})))`
  ${e=>e.color&&"primary"!==e.color?null:a.css`
          &:focus:not(:disabled),
          &:hover:not(:disabled) {
            border-color: primary;
          }
        `}

  ${e=>"danger"===e.color?a.css`
          &:focus:not(:disabled),
          &:hover:not(:disabled) {
            border-color: error;
          }
        `:null}

  ${e=>"text"===e.color?a.css`
          &:hover:not(:disabled) {
            border-color: onBG;
          }
        `:null}
`,b=n.forwardRef(((e,r)=>{var{shape:o}=e,a=(0,t.__rest)(e,["shape"]);switch(o){case"bordered":return n.createElement(s,Object.assign({},a,{ref:r}));case"icon":return n.createElement(c,Object.assign({border:"none",borderRadius:"0.25rem",padding:"0.5rem",ref:r},a));case"text":return n.createElement(c,Object.assign({},a,{ref:r}));case"underlinedText":return n.createElement(u,Object.assign({},a,{ref:r}));default:return n.createElement(d,Object.assign({},a,{ref:r}))}}))},11930:(e,r,o)=>{o.d(r,{$_:()=>u,VY:()=>g,h4:()=>c});var t=o(30130),n=o(21743),a=o(92651),l=o(16280),i=o(41473),s=o(44235),d=o(35313);const c=n.default.header`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: 3 5;
  color: onBG;
  min-height: 4rem;
`,u=(n.default.div`
  flex-grow: 1;
`,n.default.footer`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  padding: 3 5;
  box-shadow: 0px -25px 25px ${(0,a.th)("colors.bg")};
  z-index: 1;
`),b=(0,d.I)(l.FiX),g=((0,n.default)((e=>t.createElement(s.z,Object.assign({"aria-label":"close the drawer"},e,{color:"text",shape:"icon"}),t.createElement(b,null))))`
  flex: 0;
  margin-right: -0.5rem;
  color: onBG;
`,e=>t.createElement(i.x.div,Object.assign({padding:"0 2rem"},e)))},8521:(e,r,o)=>{o.r(r),o.d(r,{Settings:()=>E});var t=o(30130),n=o(6844),a=o(49768),l=o(21743),i=o(40072),s=o(11930),d=o(35067),c=o(44586),u=o(23669),b=o(92651);const g=(0,l.default)(d.O)`
  background-color: bg;
  border: 0;
  color: onBG;
  cursor: pointer;
  font-weight: 600;
  margin-right: 4;
  outline: none;
  padding: 2 0;

  &[aria-selected='true'] {
    border-bottom: 2px solid ${(0,b.th)("colors.onBG")};
  }

  &:focus {
    outline: none;
  }
`,m=(0,l.default)(c.t)`
  margin-right: auto;
`,f=((0,l.default)(u.x)`
  display: flex;
  flex-direction: column;
  outline: none;
  overflow-y: auto;
  flex-grow: 1;
`,t.lazy((()=>o.e(439).then(o.bind(o,17439)).then((({SettingsCommandRouter:e})=>({default:e})))))),p=t.lazy((()=>o.e(482).then(o.bind(o,80482)).then((({SettingsPreferenceContainer:e})=>({default:e}))))),h=t.lazy((()=>o.e(457).then(o.bind(o,90457)).then((({SettingsAppRouter:e})=>({default:e}))))),x=l.default.div`
  display: flex;
  flex-direction: column;
  outline: none;
  overflow-y: auto;
  flex-grow: 1;
`,y=t.memo((()=>{const e=(0,n.TH)(),r=e.pathname.split("/").slice(0,3).join("/")||"/settings/apps",o=(0,i.x)({selectedId:r}),a=(0,n.k6)();return t.useEffect((()=>{o.selectedId&&o.selectedId!==r&&a.push(o.selectedId)}),[a,r,o.selectedId]),t.createElement(t.Fragment,null,["/settings/apps","/settings/commands","/settings/preferences"].includes(e.pathname)&&t.createElement(s.h4,null,t.createElement(m,Object.assign({"aria-label":"settings"},o),t.createElement(g,Object.assign({id:"/settings/apps"},o),"Apps"),t.createElement(g,Object.assign({id:"/settings/commands"},o),"Commands"),t.createElement(g,Object.assign({id:"/settings/preferences"},o),"Preferences"))),t.createElement(x,null,t.createElement(n.rs,{location:e},t.createElement(n.AW,{path:"/settings/commands"},t.createElement(t.Suspense,{fallback:null},t.createElement(f,null))),t.createElement(n.AW,{exact:!0,path:"/settings/preferences"},t.createElement(t.Suspense,{fallback:null},t.createElement(p,null))),t.createElement(n.AW,{path:"/settings/apps"},t.createElement(t.Suspense,{fallback:null},t.createElement(h,null))))))}));var v=o(96931);const _=window.navigator.webdriver?1:90,E=()=>{const e=(0,n.TH)(),r=(0,v.NX)({animated:_,modal:!0,visible:e.pathname.startsWith("/settings")}),o=(0,n.k6)();return(0,a.useUpdateEffect)((()=>{r.visible||r.animating||o.push("/")}),[r,o]),t.createElement(v.FP,{borderRadius:"1rem 1rem 0 0",dialog:r,dialogLabel:"settings",maxWidth:"75rem"},t.createElement(y,null))}}}]);