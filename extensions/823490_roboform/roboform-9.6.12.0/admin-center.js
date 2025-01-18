// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[474],{55695:function(){},49245:function(a,b,c){"use strict";c.d(b,{
y:function(){return u}})
;var d=c(84117),e=c(55819),f=c(85557),g=c(87965),h=c(53166),i=c(24532),j=c(99196),k=c(31173),l=c(63956),m=c(97490),n=c(32105),o=c(78440),p=c(4153),q=c(69893),r=c(95399),s=c(73863),t=(c(13117),
c(91764)._);function u(a,b,c,u,v,w,x,y,z,A){const B=a,C=b,D=c,E=u,F=v,G=w,H=x,I=y,J=A,K=A.LocalizeString;let L=!1,M=null
;const N={};let O;const[P,Q]=(0,m.Uw)(""),[R,S]=(0,m.Uw)(1),[T,U]=(0,m.Uw)(null),V=(0,o.tG)()
;let W=!1,X=0,Y=0,Z=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0;const[aj,ak]=(0,m.Uw)(null),[al,am]=(0,m.Uw)(null),an=(0,
o.tG)();let ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0;const[ay,az]=(0,m.Uw)(null),[aA,aB]=(0,m.Uw)(null),aC=(0,o.tG)()
;let aD=!1,aE=0,aF=0,aG=0,aH=0,aI=0;const[aJ,aK]=(0,m.Uw)(!0),[aL,aM]=(0,m.Uw)(null),aN=(0,o.tG)(),[aO,aP]=(0,
m.Uw)(null),[aQ,aR]=(0,m.Uw)(null),[aS,aT]=(0,m.Uw)(0),aU=(0,o.tG)(),[aV,aW]=(0,m.Uw)(!0),aX=(0,o.tG)(),aY=(0,o.tG)()
;let aZ=null,a0=!0;return{Create:async function(){var a;return Q(null!==(a=await J.GetLanguageTag(null))&&void 0!==a?a:"en"),
O=t(n.J2,{always_visible:!1,class_name:"tab-view-dashboard tab-view hidden"},t("div",{className:"dashboard"},t("div",{
className:"cards-list"
},a2(),a4(),a6(),z.IsCurrentUserAdmin(null)&&a8(),z.IsCurrentUserAdmin(null)&&a9(),z.IsCurrentUserAdmin(null)&&ba()))),
J.onLanguageTagChange.Add(bh),O},OnAfterShow:function(){L||(a1(!1,!1,!1,!1),G.onEvent.Add(bf),H.onDataChanged.Add(bg),O.Init())
},OnBeforeHide:function(){M&&(M.Hide(0),M=null)},Focus:function(){},Dispose:function(){aY.Cancel(),V.Cancel(),an.Cancel(),
aC.Cancel(),aN.Cancel(),aU.Cancel(),aX.Cancel(),G.onEvent.Remove(bf),H.onDataChanged.Remove(bg),
J.onLanguageTagChange.Remove(bh),O.UnInit()}};function a1(a,b,c,e){const g=a||b||c;if(!L||g||e)try{
z.IsCurrentUserAdmin(null)&&(function(a){aX.Start((async b=>{await async function(a,b){
if(L&&!a||!z.IsCurrentUserAdmin(null))return;aZ=null;const c=await z.GetCompanyLicenseInfo(!1,b);if(!c.company)return
;let d="no-license";if(c.status)switch(d=c.status,d){case"active":if(c.expirationTime){const a=(0,
r.t2)(),b=Math.floor((c.expirationTime-a)/60/60/24);aZ=b>=30?"buymore":"renew"}else aZ="renew";break;case"expired":
case"trial-expired":case"trial":case"no-license":aZ="buy"}}(a,b),aW(!1)}))}(a),function(a){aN.Start((async b=>{
await async function(a,b){var c,d;if(L&&!a||!z.IsCurrentUserAdmin(null))return;aM(null)
;const e=await z.GetAccountInfo(!1,b),f=null!==(c=e.accountId)&&void 0!==c?c:"";if(!e.emailVerified)return;try{
const a=(await D.GetCompanyIntegrationSettings(f,b)).providers;if(!a||!a.length)return
;const c=null!==(d=a.find((a=>a.active)))&&void 0!==d?d:null;aM(c)}catch(g){(0,q.au)(g)}}(a,b),aK(!1)}))}(e),function(a){
aU.Start((async b=>{try{await async function(a,b){if(L&&!a||!z.IsCurrentUserAdmin(null))return;b.ThrowIfShouldStop()
;const c=await async function(a,b){var c,e,g,h;let i=0,j=0,k=0,l=0;const m=await B.GetCompanyMembers(a,b);for(const f of m){
const a=await(0,d.V1)(f.status,f.securityStats);a&&a.m_score&&(i+=null!==(c=a.m_logins)&&void 0!==c?c:0,
j+=a.m_score*(null!==(e=a.m_logins)&&void 0!==e?e:0))}const n=await C.GetCompanyGroups(a,b);for(const d of n){const a=await(0,
f.Mv)(d.securityStats);a&&a.m_score&&(k+=null!==(g=null==a?void 0:a.m_logins)&&void 0!==g?g:0,
l+=(null==a?void 0:a.m_score)*(null!==(h=null==a?void 0:a.m_logins)&&void 0!==h?h:0))}
const o=i+k,p=j+l,q=0!==o?Math.round(p/o):0;return q}(!1,b);aT(c)}(a,b)}catch(c){(0,q.au)(c)}}))}(g)),function(a){
V.Start((async b=>{try{await async function(a,b){var c;if(L&&!a)return;let e=[],f=[];const g=await z.GetAccountInfo(!1,b);if(I){
const a=await I.GetValue("ac-dashboard-cached-info",{}),b=a.companyUsersCount||1;S(b),a0=b<=d.jA,X=a.companyUsersBlocked||0,
Y=a.companyUsersInactive||0,Z=a.companyUsersInvited||0,aa=a.companyUsersSuspended||0,ab=a.companyUsersNotComplete||0,
ac=a.companyUsersScoreLow||0,ad=a.companyUsersCompromised||0,ae=a.companyUsers2FA||0,af=a.companyUsersScoreAverage||0,
ag=a.companyUsersAdmins||0,ah=a.companyUsersScoreGood||0,ai=a.companyUsersScoreExcellent||0,await m(X),await n(ab),await o(Z),
await p(Y),1===ag&&await q(ag,!0),await r(ac),await s(ad),await t(ae),ag>1&&await q(ag,!1),await u(aa),await v(af),await w(ah),
await x(ai),e.length>0&&U(e),f.length>0&&aP(f)}e=[],f=[];let h=await B.GetCompanyMembers(a,b),i=[];const k=new Set
;if(a0=h.length<=d.jA,X=0,Y=0,Z=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,!z.IsCurrentUserAdmin(null)){
i=(await C.GetCompanyGroups(a,b)).map((a=>a.id));for(const a of i){const c=(await E.GetSharedAccountRecipients2(a,!0,{
fields:"-mp,-sender,-status,-current,-serverOnly,-name,-isAdmin,-isManager,-accepted,-company,-accountInfo,-policies,-recipientEmail,-isNotComplete,-recipientName,-recipientAccessDate"
},b)).map((a=>a.accountId));if(h.filter((a=>c.includes(a.id))).forEach((a=>k.add(a.id))),!h.length)break}
h=h.filter((a=>k.has(a.id)||a.id===g.accountId))}S(h.length);for(const y of h){const a=(0,d.VK)(y);switch((0,d.lW)(a)){case 1:
X++;break;case 4:ab++;break;case 5:aa++;break;case 3:Y++;break;case 2:Z++}const b=await(0,d.sm)(a);if(b){switch((0,d.K$)(b)){
case 0:ac++;break;case 1:af++;break;case 2:ah++;break;case 3:ai++}}const e=await(0,
j.gP)(null!==(c=a.m_security_stats_blob_str)&&void 0!==c?c:"");e.cl&&e.cl>0&&ad++,a.m_isAdmin&&ag++}await m(X),await n(ab),
await o(Z),await p(Y),1===ag&&await q(ag,!0);await r(ac),await s(ad);const l=await z.GetCompanyPolicyValue("EnforceOTP",b)
;if(!l&&a0){for(const a of h){const c=(0,d.VK)(a),e=(0,d.lW)(c);if(2===e||4===e)continue
;1===(await B.GetAltAuthValue(c.m_id,e,b)).m_status&&ae++}await t(ae)}ag>1&&await q(ag,!1);async function m(a){a>0&&e.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_BlockedUsers_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersBlocked_Text"),m_value:a,m_onclick:()=>a3({m_status:[1],m_groups:i})})}
async function n(a){a>0&&e.push({m_get_name:()=>K("AdminCenter_DashboardTabView_NotCompleted_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersNotComplete_Text"),m_value:a,m_onclick:()=>a3({m_status:[4],m_groups:i})})}
async function o(a){a>0&&e.push({m_get_name:()=>K("AdminCenter_DashboardTabView_Invited_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersInvited_Text"),m_value:a,m_onclick:()=>a3({m_status:[2],m_groups:i})})}
async function p(a){a>0&&(e.push({m_get_name:()=>K("AdminCenter_DashboardTabView_Inactive_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersInactiveHint_Text"),m_value:a,m_onclick:()=>a3({m_status:[3],m_groups:i})}),
f.push({m_get_name:()=>K("AdminCenter_DashboardTabView_UsersInactive_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersInactiveHint_Text"),m_value:a,
m_onclick:()=>z.OpenReportsTabAndNavigateToSection("users",{m_status:[3]},null)}))}async function q(a,b){
!z.IsCurrentUserAdmin(null)||a<1||!b&&1===a||e.push({m_get_name:()=>K("AdminCenter_DashboardTabView_CompanyAdmins_Text"),
m_get_text:b?()=>K("AdminCenter_DashboardTabView_UsersAdmin_Text"):()=>K("AdminCenter_DashboardTabView_UsersAdmins_Text"),
m_value:a,m_onclick:()=>a3({m_role:[0],m_groups:i})})}async function r(a){a>0&&(e.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_LowScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersGroupsLowScore_Text"),m_value:a,m_onclick:()=>a3({m_score:[0],m_groups:i})
}),f.push({m_get_name:()=>K("AdminCenter_DashboardTabView_UsersLowScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersGroupsLowScore_Text"),m_value:a,
m_onclick:()=>z.OpenReportsTabAndNavigateToSection("users",{m_score:[0]},null)}))}async function s(a){a>0&&(e.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_Compromissed_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersCompromised_Text"),m_value:a,m_onclick:()=>a3({})}),f.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_UsersWithCompromissed_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersCompromised_Text"),m_value:a,
m_onclick:()=>z.OpenReportsTabAndNavigateToSection("users",{m_compromised:!0},null)}))}async function t(a){a>0&&(e.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_2StepVerification_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_Users2FA_Text"),m_value:a,m_onclick:()=>a3({m_2fa:[1]})}),f.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_Users2StepVerification_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_Users2FA_Text"),m_value:a,
m_onclick:()=>z.OpenReportsTabAndNavigateToSection("users",{m_2fa:[1]},null)}))}async function u(a){a>0&&e.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_SuspendedUsers_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersSuspended_Text"),m_value:a,m_onclick:()=>a3({m_status:[5],m_groups:i})})}
async function v(a){a>0&&(e.push({m_get_name:()=>K("AdminCenter_DashboardTabView_AverageScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersGroupsAverageScore_Text"),m_value:a,m_onclick:()=>a3({m_score:[1],m_groups:i
})}),f.push({m_get_name:()=>K("AdminCenter_DashboardTabView_UsersAverageScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersGroupsAverageScore_Text"),m_value:a,
m_onclick:()=>z.OpenReportsTabAndNavigateToSection("users",{m_score:[1]},null)}))}async function w(a){a>0&&e.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_GoodScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersGroupsGoodScore_Text"),m_value:a,m_onclick:()=>a3({m_score:[2],m_groups:i})
})}async function x(a){a>0&&e.push({m_get_name:()=>K("AdminCenter_DashboardTabView_ExcellentScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersExcellentScore_Text"),m_value:a,m_onclick:()=>a3({m_score:[3],m_groups:i})})
}await u(aa),await v(af),await w(ah),await x(ai),U(e),aP(f),N.companyUsersCount=h.length,N.companyUsersBlocked=X,
N.companyUsersInactive=Y,N.companyUsersInvited=Z,N.companyUsersSuspended=aa,N.companyUsersNotComplete=ab,
N.companyUsersScoreLow=ac,N.companyUsersCompromised=ad,N.companyUsers2FA=ae,N.companyUsersScoreAverage=af,
N.companyUsersAdmins=ag,N.companyUsersScoreGood=ah,N.companyUsersScoreExcellent=ai}(a,b)}catch(c){(0,q.au)(c),T(null)||(U([]),
aP([]))}finally{null!==al(null)&&null!==aA(null)&&(L=!0,I&&await I.SetValue("ac-dashboard-cached-info",N))}}))}(a),function(a){
an.Start((async b=>{try{await async function(a,b){var c,d,e,g,h,i,k,l,m,n,o,p,r;if(L&&!a)return;let s=[],t=[];if(I){
const a=await I.GetValue("ac-dashboard-cached-info",{}),b=null!==(c=a.companyGroupsCount)&&void 0!==c?c:0;0!==b&&ak(b),
ao=null!==(d=a.companyGroupsWithoutUser)&&void 0!==d?d:0,ap=null!==(e=a.companyGroupsWithoutData)&&void 0!==e?e:0,
aq=null!==(g=a.companyGroupsScoreLow)&&void 0!==g?g:0,ar=null!==(h=a.companyGroupsCompromised)&&void 0!==h?h:0,
as=null!==(i=a.companyGroupsWithRegularPermissions)&&void 0!==i?i:0,
at=null!==(k=a.companyGroupsWithSyncStorage)&&void 0!==k?k:0,au=null!==(l=a.companyGroupsWithoutManager)&&void 0!==l?l:0,
av=null!==(m=a.companyGroupsScoreAverage)&&void 0!==m?m:0,aw=null!==(n=a.companyGroupsScoreGood)&&void 0!==n?n:0,
ax=null!==(o=a.companyGroupsScoreExcellent)&&void 0!==o?o:0,await v(aq),await w(ar),await x(ao),await y(ap),await A(as),
await B(at),await D(au),await E(av),await F(aw),await G(ax),s.length>0&&am(s),t.length>0&&aR(t)}
const u=await C.GetCompanyGroups(a,b);ak(u.length),ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,s=[],t=[]
;for(const C of u){C.membersCount||ao++,C.serverOnly||at++,C.readOnly||as++,C.managersCount||au++;const a=await(0,
j.gP)(null!==(p=C.securityStats)&&void 0!==p?p:"");let c=null;if(void 0!==a.sp){
0===(a.loginsCount||0)+(a.bookmarksCount||0)+(a.contactsCount||0)+(a.identitiesCount||0)+(a.safenotesCount||0)&&ap++,
c=a.sp||null;(null!==(r=a.cl)&&void 0!==r?r:0)>0&&ar++}else try{const a=await z.GetGroupSecurityReport(`/${C.name}`,b)
;a.statistics.bookmarksCount||a.statistics.loginsCount||a.statistics.safenotesCount||a.statistics.contactsCount||a.statistics.identitiesCount||ap++,
a.compromised.length>0&&ar++,c=a.statistics.sp||null}catch(H){(0,q.au)(H)}if(c){switch((0,f.a_)(c)){case 0:aq++;break;case 1:
av++;break;case 2:aw++;break;case 3:ax++}}b.ThrowIfShouldStop()}async function v(a){a>0&&(s.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_LowScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersGroupsLowScore_Text"),m_value:a,m_onclick:()=>a5({m_score:[0]})}),t.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_GroupsLowScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersGroupsLowScore_Text"),m_value:a,
m_onclick:()=>z.OpenReportsTabAndNavigateToSection("groups",null,{m_score:[0]})}))}async function w(a){a>0&&s.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_Compromissed_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_GroupsCompromised_Text"),m_value:a,m_onclick:()=>a5({m_compromised:!0})})}
async function x(a){a>0&&s.push({m_get_name:()=>K("AdminCenter_DashboardTabView_WithoutUsers_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_GroupsWithoutUsers_Text"),m_value:a,m_onclick:()=>a5({m_without_users:!0})})}
async function y(a){a>0&&s.push({m_get_name:()=>K("AdminCenter_DashboardTabView_WithoutData_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_GroupsWithoutData_Text"),m_value:a,m_onclick:()=>a5({m_without_data:!0})})}
async function A(a){a>0&&s.push({m_get_name:()=>K("AdminCenter_DashboardTabView_RegularPermission_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_GroupsPermissions_Text"),m_value:a,m_onclick:()=>a5({m_permissions:[0]})})}
async function B(a){a>0&&s.push({m_get_name:()=>K("AdminCenter_DashboardTabView_SyncStorageType_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_GroupsStorageSync_Text"),m_value:a,m_onclick:()=>a5({m_storage:[1]})})}
async function D(a){a>0&&s.push({m_get_name:()=>K("AdminCenter_DashboardTabView_WithoutGroupManager_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_GroupsWithoutManager_Text"),m_value:a,m_onclick:()=>a5({m_without_manager:!0})})}
async function E(a){a>0&&(s.push({m_get_name:()=>K("AdminCenter_DashboardTabView_AverageScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersGroupsAverageScore_Text"),m_value:a,m_onclick:()=>a5({m_score:[1]})}),
t.push({m_get_name:()=>K("AdminCenter_DashboardTabView_GroupsAverageScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersGroupsAverageScore_Text"),m_value:a,
m_onclick:()=>z.OpenReportsTabAndNavigateToSection("groups",null,{m_score:[1]})}))}async function F(a){a>0&&s.push({
m_get_name:()=>K("AdminCenter_DashboardTabView_GoodScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_UsersGroupsGoodScore_Text"),m_value:a,m_onclick:()=>a5({m_score:[2]})})}
async function G(a){a>0&&s.push({m_get_name:()=>K("AdminCenter_DashboardTabView_ExcellentScore_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_GroupsExcellentScore_Text"),m_value:a,m_onclick:()=>a5({m_score:[3]})})}
await v(aq),await w(ar),await x(ao),await y(ap),await A(as),await B(at),await D(au),await E(av),await F(aw),await G(ax),am(s),
aR(t),N.companyGroupsWithoutUser=ao,N.companyGroupsWithoutData=ap,N.companyGroupsScoreLow=aq,N.companyGroupsCompromised=ar,
N.companyGroupsWithRegularPermissions=as,N.companyGroupsWithSyncStorage=at,N.companyGroupsWithoutManager=au,
N.companyGroupsScoreAverage=av,N.companyGroupsScoreGood=aw,N.companyGroupsScoreExcellent=ax}(a,b)}catch(c){(0,q.au)(c),
al(null)||(am([]),aR([]))}finally{null!==T(null)&&null!==aA(null)&&(L=!0,I&&await I.SetValue("ac-dashboard-cached-info",N))}}))
}(b),function(a){aC.Start((async b=>{try{await async function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,r,s;if(L&&!a)return
;b.ThrowIfShouldStop();let t=[];if(I){
const a=await I.GetValue("ac-dashboard-cached-info",{}),b=null!==(c=a.companyFilesCount)&&void 0!==c?c:0;0!==b&&az(b),
aE=null!==(d=a.companyLoginsWithCompromisedPwd)&&void 0!==d?d:0,aF=null!==(e=a.companyLoginsWithReusedPwd)&&void 0!==e?e:0,
aG=null!==(f=a.companyLoginsWithDuplicatedPwd)&&void 0!==f?f:0,aH=null!==(g=a.companyLoginsWeakPwd)&&void 0!==g?g:0,
aI=null!==(h=a.companyLoginsMediumPwd)&&void 0!==h?h:0,await v(aE),await w(aF),await x(aH),await y(aI),await A(aG),
t.length>0&&aB(t)}aE=0,aF=0,aG=0,aH=0,aI=0,t=[];let u=0;try{const a=await z.GetSecurityReport("",!0,b)
;u=(null!==(i=a.statistics.loginsCount)&&void 0!==i?i:0)+(null!==(j=a.statistics.bookmarksCount)&&void 0!==j?j:0)+(null!==(k=a.statistics.safenotesCount)&&void 0!==k?k:0)+(null!==(l=a.statistics.contactsCount)&&void 0!==l?l:0)+(null!==(m=a.statistics.identitiesCount)&&void 0!==m?m:0),
aE=null!==(n=a.statistics.cl)&&void 0!==n?n:0,aF=null!==(o=a.statistics.reused)&&void 0!==o?o:0,
aG=null!==(p=a.statistics.duplicates)&&void 0!==p?p:0,aH=null!==(r=a.statistics.weak)&&void 0!==r?r:0,
aI=null!==(s=a.statistics.medium)&&void 0!==s?s:0}catch(B){(0,q.au)(B)}if(az(u),0===u)return void aB([]);async function v(a){
a>0&&t.push({m_get_name:()=>K("AdminCenter_DashboardTabView_Compromissed_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_DataCompromised_Text"),m_value:a,m_onclick:()=>a7({m_compromised:!0})})}
async function w(a){a>0&&t.push({m_get_name:()=>K("AdminCenter_DashboardTabView_Reused_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_DataReused_Text"),m_value:a,m_onclick:()=>a7({m_reused:!0})})}
async function x(a){a>0&&t.push({m_get_name:()=>K("AdminCenter_DashboardTabView_WeakPwdStrength_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_DataWeakStrength_Text"),m_value:a,m_onclick:()=>a7({m_pwd_strength:[0]})})}
async function y(a){a>0&&t.push({m_get_name:()=>K("AdminCenter_DashboardTabView_MediumPwdStrength_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_DataMediumStrength_Text"),m_value:a,m_onclick:()=>a7({m_pwd_strength:[1]})})}
async function A(a){a>0&&t.push({m_get_name:()=>K("AdminCenter_DashboardTabView_Duplicated_Text"),
m_get_text:()=>K("AdminCenter_DashboardTabView_DataDuplicate_Text"),m_value:a,m_onclick:()=>a7({m_duplicated:!0})})}await v(aE),
await w(aF),await x(aH),await y(aI),await A(aG),aB(t),N.companyFilesCount=u,N.companyLoginsWithCompromisedPwd=aE,
N.companyLoginsWithReusedPwd=aF,N.companyLoginsWithDuplicatedPwd=aG,N.companyLoginsWeakPwd=aH,N.companyLoginsMediumPwd=aI}(a,b)
}catch(c){(0,q.au)(c),aA(null)||aB([])}finally{null!==T(null)&&null!==al(null)&&(L=!0,
I&&await I.SetValue("ac-dashboard-cached-info",N))}}))}(c)}catch(h){(0,q.au)(h)}}function a2(){return async d=>{
const e=P(d),f=R(d),g=T(d),h=null===g,i=z.IsCurrentUserAdmin(d);return t(bb,{disabled:h,class_name:"card-users",
show_loading_view:h},t(bc,{name:await K("AdminCenter_Users_Text"),
button_text:await K("AdminCenter_DashboardTabView_AddUser_Text"),on_title_click:a,on_button_click:b,on_button_mousedown:c,
show_button:i,disabled:h},t("span",{className:"card-value"},(0,s.Df)(f,e))),t(bd,{insights:g}))};function a(){
z.IsCurrentUserAdmin(null)?z.ShowUsersView(null):(0,l.D$)((async()=>{const a=(await C.GetCompanyGroups(!1,null)).map((a=>a.id))
;z.ShowUsersView({m_groups:a})}),(()=>()=>{}),null,null)}function b(a,b){b.stopPropagation(),0===b.button&&(W?(bi(),(0,
h.dq)(a)):function(a){bi();const b=a.getBoundingClientRect(),c=new DOMRect(b.left,b.bottom,0,0);function d(){(0,h.cT)(a),W=!0}
function e(){(0,h.dq)(a),W=!1}M=(0,g.Lj)(c,(()=>z.GetAddUserDropdownCommands()),{className:"with-triangle create-menu",onShow:d,
onHide:e},(function(b,c){return(0,p.TT)(O).style.width=(0,k.Md)(b),(0,p.TT)(O).style.height=(0,k.Md)(c),
a.getBoundingClientRect()}),((a,b)=>(0,o.fI)(a(b,(0,o.f4)(null,null,null)))))}(a))}function c(a){W&&a.stopPropagation()}}
function a3(a){z.ShowUsersView(a)}function a4(){return async c=>{
const d=P(c),e=aj(c),f=al(c),g=null===f,h=z.IsCurrentUserAdmin(c);return t(bb,{disabled:g,class_name:"card-groups",
show_loading_view:g},t(bc,{name:await K("AdminCenter_Groups_Text"),
button_text:await K("AdminCenter_DashboardTabView_AddGroup_Text"),on_title_click:a,on_button_click:b,show_button:h,disabled:g
},t("div",{className:"card-row"},e?t("span",{className:"card-value"},(0,s.Df)(e,d)):f?t("span",{className:"no-data"
},K("AdminCenter_DashboardTabView_NoGroupsAdded_Text")):null)),t(bd,{insights:f}))};function a(){z.ShowGroupsView(null)}
function b(a,b){b.stopPropagation(),0===b.button&&z.ShowCreateGroupDialog()}}function a5(a){z.ShowGroupsView(a)}function a6(){
return async d=>{const e=P(d),f=ay(d),g=aA(d),h=null===g;return t(bb,{disabled:h,class_name:"card-data",show_loading_view:h
},t(bc,{name:await K("AdminCenter_Data_Tab_Button_Text"),button_text:await K("AdminCenter_DashboardTabView_AddData_Text"),
on_title_click:a,on_button_click:b,on_button_mousedown:c,show_button:!0,disabled:h},t("div",{className:"card-row"},f?t("span",{
className:"card-value"},(0,s.Df)(f,e)):g?t("span",{className:"no-data"
},K("AdminCenter_DashboardTabView_NoDataAdded_Text")):null)),t(bd,{insights:g}))};function a(){z.ShowDataView(null)}
function b(a,b){b.stopPropagation(),0===b.button&&(aD?(bi(),(0,h.dq)(a)):function(a){bi()
;const b=a.getBoundingClientRect(),c=new DOMRect(b.left,b.bottom,0,0);function d(){(0,h.cT)(a),aD=!0}function e(){(0,h.dq)(a),
aD=!1}M=(0,g.Lj)(c,(()=>z.GetAddDataDropdownCommands(!1,null)),{className:"with-triangle create-menu",onShow:d,onHide:e
},(function(b,c){return(0,p.TT)(O).style.width=(0,k.Md)(b),(0,p.TT)(O).style.height=(0,k.Md)(c),a.getBoundingClientRect()
}),((a,b)=>(0,o.fI)(a(b,(0,o.f4)(null,null,null)))))}(a))}function c(a){aD&&a.stopPropagation()}}function a7(a){
z.ShowDataView(a)}function a8(){return async b=>{var c,d;P(b);const f=aJ(b),g=aL(b);return z.IsCurrentUserAdmin(b)?t(bb,{
disabled:f,class_name:"card-integration",show_loading_view:f},t(bc,{name:await K("AdminCenter_Integration_Tab_Button_Text"),
button_text:await K("AdminCenter_DashboardTabView_AddIntegration_Text"),
button_title:await K("AdminCenter_Integration_Tab_Button_Tip"),on_title_click:a,on_button_click:a,show_button:!g&&!f,disabled:f
},t("div",{className:"card-row"},g&&!f&&t("div",{className:"card-value value-with-image"},t("div",{
className:`provider-logo ${(0,e.pq)(null!==(c=g.type)&&void 0!==c?c:"")}`}),t("div",{className:"provider-name"},(0,
e.n)(null!==(d=g.type)&&void 0!==d?d:""))),!g&&!f&&t("span",{className:"no-data"
},K("AdminCenter_DashboardTabView_ProviderNotSet_Text")),t("div",{className:"flex-cell"}))),!f&&g&&t(be,{
title:await K("AdminCenter_DashboardTabView_SetupDetails_Text")},t("li",{className:"data-item not-clickable"},t("div",{
className:"name-and-value"},t("span",{className:"text"},K("AdminCenter_IntegrationView_Provisioning_Title_Text")),t("span",{
className:"value"
},g.provisioning&&g.provisioning.enable?K("AdminCenter_DashboardTabView_ActiveStatus_Text"):K("AdminCenter_DashboardTabView_ProviderNotSet_Text"))),t("div",{
className:"name-and-value"},t("span",{className:"text"},K("AdminCenter_DashboardTabView_LastSyncTime_Text")),t("span",{
className:"value"},async function(a){var b,c,d,e,f;let g=await K("AdminCenter_DashboardTabView_NA_Text");if(a.provisioning){
const h=null!==(b=await J.GetLanguageTag(null))&&void 0!==b?b:"en"
;"scim"===a.provisioning.type&&(null===(d=null===(c=a.provisioning.scim)||void 0===c?void 0:c.stats)||void 0===d?void 0:d.lastSyncedTime)?g=(0,
r.il)(a.provisioning.scim.stats.lastSyncedTime,h):"google"===a.provisioning.type&&(null===(f=null===(e=a.provisioning.google)||void 0===e?void 0:e.stats)||void 0===f?void 0:f.lastSyncedTime)&&(g=(0,
r.il)(a.provisioning.google.stats.lastSyncedTime,h))}return g}(g)))),t("li",{className:"data-item not-clickable"},t("div",{
className:"name-and-value"},t("span",{className:"text"},await K("AdminCenter_DashboardTabView_SSOIntegration_Text")),t("span",{
className:"value"
},g.sso&&g.sso.enable?K("AdminCenter_DashboardTabView_ActiveStatus_Text"):K("AdminCenter_DashboardTabView_ProviderNotSet_Text"))),t("div",{
className:"name-and-value"},t("span",{className:"text"},await K("AdminCenter_DashboardTabView_SSOAppliedTo_Text")),t("span",{
className:"value"},async function(a){var b;let c=await K("AdminCenter_DashboardTabView_NA_Text");if(a.sso&&a.sso.enable){
c=await K("AdminCenter_IntegrationView_SSO_Service_Active_For_No_One")
;if(await z.GetCompanyPolicyValue("UseSSOLogin",null))c=await K("AdminCenter_IntegrationView_SSO_Service_For_All_Label");else{
const a=await C.GetCompanyGroups(!1,null);for(const d of a){
if(""!==await z.GetGroupPolicyValue(null!==(b=d.policies)&&void 0!==b?b:"","UseSSOLogin")){
c=await K("AdminCenter_IntegrationView_SSO_Service_For_Select_Label");break}}}}return c}(g)))))):[]};function a(){
z.AddIntegration()}}function a9(){return async b=>{P(b);const c=aS(b),d=aO(b),e=aQ(b),f=[];d&&f.push(...d),e&&f.push(...e)
;const g=!d&&!e;return z.IsCurrentUserAdmin(b)?t(bb,{disabled:g,class_name:"card-reports",show_loading_view:g},t(bc,{
name:await K("AdminCenter_Reports_Tab_Button_Text"),button_text:await K("AdminCenter_DashboardTabView_AddData_Text"),
on_title_click:a,show_button:!1,disabled:g},null!==c&&!g&&t("div",{className:"score-chart"},t("div",{className:"values"
},t("span",{className:"text"},K("AdminCenter_ReportsTabView_CompanySecurityScore_Text")),t("span",{className:"value"
},c?async function(a){switch((0,i._W)(a)){case 3:return(0,s.bt)(await K("PassAud_GoodSafetyLevel_Tittle")," • ",(0,p.bf)(a))
;case 2:return(0,s.bt)(await K("PassAud_MediumSafetyLevel_Tittle")," • ",(0,p.bf)(a));case 1:return(0,
s.bt)(await K("PassAud_AverageSafetyLevel_Tittle")," • ",(0,p.bf)(a));case 0:return(0,
s.bt)(await K("PassAud_BadSafetyLevel_Tittle")," • ",(0,p.bf)(a))}}(c):"")),t("div",{className:"score-bar"},t("div",{
className:"bar"},c&&t("div",{className:"company-score",style:{left:`${(0,p.bf)(c)}%`}})),t("ul",{className:"delimeters-list"
},t("li",{className:"delimeter",title:await K("PassAud_BadSafetyLevel_Tittle")}),t("li",{className:"delimeter",
title:await K("PassAud_AverageSafetyLevel_Tittle")}),t("li",{className:"delimeter",
title:await K("PassAud_MediumSafetyLevel_Tittle")}),t("li",{className:"delimeter",
title:await K("PassAud_GoodSafetyLevel_Tittle")})))),null===c&&!g&&t("div",{className:"card-row"},t("span",{className:"no-data"
},K("AdminCenter_DashboardTabView_NoReportsYet_Text")))),t(bd,{insights:f})):[]};function a(){z.ShowReportsView(!0,null)}}
function ba(){return async e=>{P(e);const f=aV(e),g=z.GetLicenseInfo(e);return z.IsCurrentUserAdmin(e)?t(bb,{disabled:f,
class_name:"card-licenses",show_loading_view:f},t(bc,{name:await K("AdminCenter_DashboardTabView_Licenses_Text"),
button_text:await c(g),on_title_click:a,on_button_click:b,show_button:!f,disabled:f},!f&&t("div",{className:"score-chart"
},t("div",{className:"values"},t("span",{className:"text"},K("AdminCenter_SettingsView_LicensesUsed_Text")),t("span",{
className:"value"},function(a){var b,c,d,e
;const f=(0,s.Df)(null!==(c=null===(b=null==a?void 0:a.company)||void 0===b?void 0:b.numberOfUsers)&&void 0!==c?c:0,P(null)),g=(0,
s.Df)(null!==(e=null===(d=null==a?void 0:a.company)||void 0===d?void 0:d.numberOfLicenses)&&void 0!==e?e:30,P(null));return(0,
s.bt)(f,"/",g)}(g))),t("div",{className:"score-bar"},t("div",{className:"bar"},t("div",{className:"licenses-bar",style:{
width:d(g)}}))))),g&&!f&&t(be,{title:await K("AdminCenter_DashboardTabView_Details_Text")},t("li",{
className:"data-item not-clickable"},t("div",{className:"name-and-value"},t("span",{className:"text"
},K("AdminCenter_DashboardTabView_LicenseType_Text")),t("span",{className:"value"
},K("Options_LicenseType_Business_Text"))),t("div",{className:"name-and-value"},t("span",{className:"text"
},K("AdminCenter_DashboardTabView_Subscription_Text")),t("span",{className:"value"},async function(a){
if(!a||!a.status)return K("AdminCenter_DashboardTabView_NA_Text");switch(a.status){case"active":
return K("AdminCenter_DashboardTabView_ActiveStatus_Text");case"expired":
return K("AdminCenter_DashboardTabView_ExpiredStatus_Text");case"trial-expired":
return K("Options_LicenseStatus_ExpiredTrial_Text");case"trial":return K("Options_LicenseStatus_FreeTrial_Text")
;case"no-license":return K("Options_LicenseStatus_NoLicense_Text")}}(g)))),t("li",{className:"data-item not-clickable"
},t("div",{className:"name-and-value"},t("span",{className:"text"
},K("AdminCenter_DashboardTabView_ExpirationDate_Text")),t("span",{className:"value"},async function(a){var b,c
;let d=await K("AdminCenter_DashboardTabView_NA_Text");if(a&&a.expirationTime){
const e=null!==(b=a.expirationTime)&&void 0!==b?b:0,f=null!==(c=await J.GetLanguageTag(null))&&void 0!==c?c:"en";d=(0,r.fQ)(e,f)
}return d}(g))),t("div",{className:"name-and-value"},t("span",{className:"text"
},K("AdminCenter_DashboardTabView_LicensesAutoRenewal_Text")),t("span",{className:"value"
},g.autopay?K("AdminCenter_On_Text"):K("AdminCenter_Off_Text")))))):[]};function a(){(0,
o.fI)(z.ShowCompanySettingsView("license"))}function b(a,b){b.stopPropagation(),aZ&&aY.Start((async a=>{
await F.OpenPaymentPage({action:(0,p.TT)(aZ)},a)}))}async function c(a){if(!a||!a.status)return K("AdminCenter_BuyNow_Text")
;switch(a.status){case"active":if(a.expirationTime){const b=(0,r.t2)(),c=Math.floor((a.expirationTime-b)/60/60/24)
;return K(c>=30?"AdminCenter_SettingsView_BuyMore_Text":"AdminCenter_SettingsView_RenewNow_Text")}
return K("AdminCenter_SettingsView_RenewNow_Text");case"expired":case"trial-expired":case"trial":case"no-license":
return K("AdminCenter_BuyNow_Text")}}function d(a){var b,c,d,e;if(!a)return"0"
;const f=null!==(c=null===(b=null==a?void 0:a.company)||void 0===b?void 0:b.numberOfUsers)&&void 0!==c?c:0,g=null!==(e=null===(d=null==a?void 0:a.company)||void 0===d?void 0:d.numberOfLicenses)&&void 0!==e?e:30,h=Math.floor(f/g*100)||1
;return`${(0,p.bf)(h)}%`}}function bb(a,b){const c=a.class_name?`card ${a.class_name}`:"card";return t("div",{
className:a.disabled?`${c} disabled`:c},b,a.show_loading_view&&t("div",{className:"loading-view"},t("div",{
className:"action-progress-overlay-circle size48"})))}function bc(a,b){var c;let d;return t("div",{
className:"title-with-button",onclick:a.disabled?null:a.on_title_click},t("div",{className:"card-row"},t("div",{
className:"card-name"},a.name),t("div",{className:"flex-cell"}),a.show_button?d=t("button",{className:"card-button",
onclick:b=>function(b,c){if(a.disabled||!a.on_button_click)return;a.on_button_click(b,c)}(d,b),
onmousedown:a.disabled||!a.on_button_mousedown?null:a.on_button_mousedown,
title:null!==(c=a.button_title)&&void 0!==c?c:a.button_text},a.button_text):t("div",{className:"empty-cell"})),b)}
function bd(a){const b=a.insights;return t(n.J2,{always_visible:!1,view_initialized:null!==b},t("div",{className:"list"
},t("div",{className:b&&b.length>0?"list-info":"list-info hidden"},t("span",{className:"title"
},K("AdminCenter_DashboardTabView_UsefulInsights_Text")),b&&t("ul",{className:"list-items"},b.map((function(a){return t("li",{
className:"data-item",onclick:a.m_onclick},t("div",{className:"name-and-description"},t("span",{className:"text name"
},a.m_get_name()),t("span",{className:"text description"},a.m_get_text())),t("div",{className:"value"},t("span",{
className:"text"},(0,s.Df)(a.m_value,P(null))),t("div",{className:"arrow-icon"})))}))))))}function be(a,b){return t("div",{
className:"list-info"},t("span",{className:"title"},a.title),t("ul",{className:"list-items"},b))}function bf(a){
let b=!1,c=!1,d=!1,e=!1;for(const f of a)switch(f.event){case 0:case 2:case 1:b=!0,c=!0;break;case 3:case 4:c=!0;break;case 6:
case 7:case 8:c=!0,d=!0;break;case 9:e=!0}(b||c||d||e)&&a1(b,c,d,e)}function bg(a){let b=!1,c=!1
;for(const d of a)switch(d.event){case 5:case 8:case 7:case 6:b=!0,c=!0;break;case 10:L=!1,aY.Cancel(),V.Cancel(),an.Cancel(),
aC.Cancel(),aN.Cancel(),aU.Cancel(),aX.Cancel(),G.onEvent.Remove(bf),H.onDataChanged.Remove(bg)}(b||c)&&a1(!1,b,c,!1)}
function bh(){(0,o.fI)((async()=>{var a;Q(null!==(a=await J.GetLanguageTag(null))&&void 0!==a?a:"en")})())}function bi(){
M&&(M.Hide(),M=null)}}},38136:function(a,b,c){"use strict";c.d(b,{H:function(){return n}})
;var d=c(85557),e=c(78749),f=c(4234),g=c(32130),h=c(60026),i=c(71644),j=c(54811),k=c(78440),l=c(69893),m=c(73863);c(13117)
;function n(a,b,c,n,o,p){const q=a,r=b,s=c,t=n,u=o,v=p;let w="",x="",y=!1,z=null,A=null;const B=(0,k.h1)(),C=(0,k.h1)();return{
Init:function(a,b,c){w=a,x=b,y=c},Clear:function(){B.Cancel(),C.Cancel(),z=null,A=null},GetCompanyGroups:D,
GetSortedAndFilteredGroupsList:async function(a,b,c){var f,g,h;let j=[...a];const k=new Map;if(b.m_search&&b.m_search.m_query){
const a=b.m_search;j=j.filter((b=>{const c=(0,i.zR)(a.m_query,b.name,!1,!1,!1,!1,!1,!1)
;return!!c.matches.length&&(a.m_results_map.set(b.id,c.matches),k.set(b.id,c.rank),!0)}))}
b.m_without_users&&(j=j.filter((a=>!(a.membersCount&&a.membersCount>0))))
;b.m_without_manager&&(j=j.filter((a=>!(a.managersCount&&a.managersCount>0))));if(b.m_created){const a=b.m_created
;j=j.filter((b=>b.createdTime&&(0,d.qS)(b.createdTime,a)))}
if(b.m_storage&&b.m_storage.length&&(!b.m_storage.includes(0)||!b.m_storage.includes(1))){const a=b.m_storage
;j=j.filter((b=>a.includes(0)?!0===b.serverOnly:!b.serverOnly))}
if(b.m_permissions&&b.m_permissions.length&&(!b.m_permissions.includes(0)||!b.m_permissions.includes(1))){
const a=b.m_permissions;j=j.filter((b=>a.includes(0)?!b.readOnly:!0===b.readOnly))}if(b.m_score&&b.m_score.length){
const a=b.m_score;for(let b=j.length-1;b>=0;b--){const c=await(0,d.g4)(j[b].securityStats)
;null!==c?c<=d.L7?a.includes(0)||j.splice(b,1):c<=d._3?a.includes(1)||j.splice(b,1):c<=d.ee?a.includes(2)||j.splice(b,1):a.includes(3)||j.splice(b,1):j.splice(b,1)
}}if(b.m_without_data)for(let e=j.length-1;e>=0;e--){await(0,d.NH)(j[e])>0&&j.splice(e,1)}
if(b.m_compromised&&v)for(let i=j.length-1;i>=0;i--){const a=j[i];if(!await(0,d.NH)(a)){j.splice(i,1);continue}
const b=(await F(a.id,c)).filter((a=>1===a.m_item_info.type));if(!b.length){j.splice(i,1);continue}let f=!1
;for(const d of b)if(f=await(0,e.e7)(d,v,c),f)break;f||j.splice(i,1)}if(b.m_sort){const a=b.m_sort
;if(0===a.m_sort_by)j.sort(((b,c)=>a.m_asc?b.name.localeCompare(c.name):c.name.localeCompare(b.name)));else if(4===a.m_sort_by)j.sort(((b,c)=>a.m_asc?(c.membersCount||0)-(b.membersCount||0):(b.membersCount||0)-(c.membersCount||0)));else if(5===a.m_sort_by){
const b=new Map;for(const a of j){const c=await(0,d.NH)(a);b.set(a.id,c)}j.sort(((c,d)=>{var e,f
;const g=null!==(e=b.get(c.id))&&void 0!==e?e:0,h=null!==(f=b.get(d.id))&&void 0!==f?f:0;return a.m_asc?h-g:g-h}))
}else if(2===a.m_sort_by)j.sort(((b,c)=>{const d=b.serverOnly?1:0,e=c.serverOnly?1:0;return a.m_asc?e-d:d-e
}));else if(3===a.m_sort_by)j.sort(((b,c)=>{const d=b.readOnly?1:0,e=c.readOnly?1:0;return a.m_asc?e-d:d-e
}));else if(6===a.m_sort_by){const b=new Map;for(const a of j){const c=null!==(g=await(0,
d.g4)(null!==(f=a.securityStats)&&void 0!==f?f:""))&&void 0!==g?g:0;b.set(a.id,c)}j.sort(((c,d)=>{var e,f
;const g=null!==(e=b.get(c.id))&&void 0!==e?e:0,h=null!==(f=b.get(d.id))&&void 0!==f?f:0;return a.m_asc?h-g:g-h}))
}else k.size>0&&(null===(h=b.m_search)||void 0===h?void 0:h.m_query)?j.sort(((a,b)=>{var c,d
;const e=null!==(c=k.get(a.id))&&void 0!==c?c:0;return(null!==(d=k.get(b.id))&&void 0!==d?d:0)-e
})):j.sort(((b,c)=>a.m_asc?b.name.localeCompare(c.name):c.name.localeCompare(b.name)))
}else j.sort(((a,b)=>a.name.localeCompare(b.name)));return j},GetReceivedAccounts:E,UpdateReceivedAccounts:async function(a){
await E(!0,a)},GetGroupDataItemsListWithoutFolders:F,GetGroupInfoFromPath:async function(a){
const b=(await D(!1,null)).find((b=>b.name===(0,f.em)(a)));if(!b)throw(0,l.ZU)(l.V2,"Shared folder is not found")
;const c=await(0,d.NH)(b);return(0,d.wj)(b,c)},RenameGroup:async function(a,b,c){try{
const d=(await E(!1,c)).find((b=>b.accountInfo.accountId===a));if(!d)throw(0,l.ZU)(l.V2,"Shared folder is not found")
;const e="/"+d.title;if(""===d.title)throw(0,l.ZU)(l.V2,"Shared folder is not found");await t.RenameSharedFolder(e,b,c),(0,
k.fI)(u.SyncInBackground(c))}catch(d){(0,l.au)(d)}},GetGroupsMapFromGroupsList:G,
GetSelectedUsersCommonGroupsToAdd:async function(a,b){let c=[],d=!0;const e=await D(!1,b);for(const f of a){
null==b||b.ThrowIfShouldStop();let a=await q.GetMemberGroups(f.m_id,null,b);if(a=a.filter((a=>!a.disabled)),
e.length===a.length){c=[];break}if(d)c=e.filter((b=>!a.some((a=>a.accountId===b.id)))),
d=!1;else if(c=c.filter((b=>!a.some((a=>a.accountId===b.id)))),!c.length)break}return c},
GetSelectedUsersCommonGroupsToDelete:async function(a,b){const c=[],d=G(await D(!1,b),"id");for(const e of a){
if(null==b||b.ThrowIfShouldStop(),!y&&(e.m_isAdmin||e.m_id===x))return[];const a=await q.GetMemberGroups(e.m_id,null,b)
;if("number"==typeof a)throw(0,l.ZU)(l.V2,"The return value shouldn't be a number");for(const b of a){if(b.disabled)continue
;const a=d.get(b.accountId);a&&!c.some((a=>a.id===b.accountId))&&c.push(a)}}return c}};async function D(a,b){if(!w)throw(0,
l.ZU)(l.VH,"AdminCenterGroupsData is not initialized, provide Company ID");return z&&!a||(z=await B.Execute({action:async a=>{
let b=await q.GetCompanyGroups(w,a);return b=b.filter((a=>a.name.toLowerCase()!==d.DC.toLowerCase()&&(!!y||a.isManager))),[...b]
}},b)),z}async function E(a,b){return A&&!a||(A=await C.Execute({
action:async a=>[...await r.ListOwnedAndManagedReceivedAccounts(a)]},b)),A}async function F(a,b){
const c=(await r.ListOwnedAndManagedReceivedAccounts(b)).find((b=>b.accountInfo.accountId===a));let d=""
;if(c)d="/"+c.accountInfo.name;else{const c=(await D(!1,b)).find((b=>b.id===a));c&&(d="/"+c.name)}if(""===d)return[];const e=[]
;return await(0,j.s_)(s,(async a=>{if(8!==a.type&&(!(0,f.Rf)(a.type)||4===a.type))return;if(8===a.type)return;let c;try{
c=await s.GetFile(a.path,"utf16",b)}catch(n){return void(0,l.au)(n)}if(!c)return;let d=null;try{d=JSON.parse(c)}catch(n){
return void(0,l.au)(n)}if(!d)return;const i=(0,f.hF)(a.path),j=(0,g.m6)(d,i);if(!j)return;a.path=(0,m.$b)(a.path,h.ZD)||a.path
;const k={m_item_info:a,m_item:j};e.push(k)}),{path:d,parts:103,deep:!0},b),e}function G(a,b){const c=new Map
;for(const d of a)c.set("id"===b?d.id:d.name,d);return c}}},33094:function(a,b,c){"use strict";c.d(b,{W9:function(){return n},
lY:function(){return m},zs:function(){return o}})
;var d=c(46721),e=c(4153),f=c(40868),g=c(32105),h=c(63956),i=c(78440),j=c(69893),k=(c(13117),c(97490)),l=c(91764)._
;function m(a,b,c,m){const n=m.LocalizeString,o=b,p=c;let q=null;return{Create:async function(b,c){const[m,r]=(0,
k.Uw)(null),[s,t]=(0,k.Uw)(!0),[u,v]=(0,k.Uw)("");let w,x=null,y=null;return l("div",{className:"content"},l("div",{
className:"select-file-section"},l("span",{className:"title"
},await n("AdminCenter_UsersTabView_ImportUsers_CSV_File")),l("div",{className:"file-browse"},l("button",{className:"button",
onclick:function(){(0,h.PQ)((async()=>{if(x=await(0,h.tf)([".csv"]),!x)return void v("");const c=y?y.GetValue():"",g=await(0,
f.At)((0,e.TT)(x)),i=await(0,d.Ib)(g,c,p)
;v(x.name),i.users.length>a?B(await n("AdminCenter_UsersTabView_ImportUsers_No_Licenses_Text",[i.users.length.toString()]),{
action:()=>{b(null)},text:await n("AdminCenter_SettingsView_BuyMore_Text")}):B("",null)}),C,0,null,(a=>{(0,j.au)(a),(0,
j.r5)(a,j.kd)||B((0,j.EB)(a),null)}))}},await n("AdminCenter_UsersTabView_ImportUsers_SelectFile")),(a=>{const b=u(a)
;return b?l("span",{className:"selected-file-name loaded"},b):l("span",{className:"selected-file-name"
},n("AdminCenter_UsersTabView_ImportUsers_FileNotSelected"))}))),l("div",{className:"error-text large"},(a=>{const b=m(a);if(b){
const{text:a,link:c}=b,d=[l("fragment",null,a)];return c&&d.push(l("span",{className:"error-action",onclick:c.action},c.text)),d
}return[]})),l("div",{className:"instructions"},l("p",{className:"text"
},await n("AdminCenter_UsersTabView_ImportUsers_DescrCharsColOrder")),l("ul",{className:"columns-order-list"},l("li",{
className:"item"},l("span",{className:"title"
},await n("AdminCenter_UsersTabView_ImportUsers_OperType_Title")),` ${await n("AdminCenter_UsersTabView_ImportUsers_OperType_Text")}`),l("li",{
className:"item"},l("span",{className:"title"
},await n("AdminCenter_UsersTabView_ImportUsers_UserName_Title")),` ${await n("AdminCenter_UsersTabView_ImportUsers_UserName_Text")}`),l("li",{
className:"item"},l("span",{className:"title"
},await n("AdminCenter_Email_Title")),` ${await n("AdminCenter_UsersTabView_ImportUsers_Email_Text")}`),l("li",{className:"item"
},l("span",{className:"title"
},await n("AdminCenter_UsersTabView_ImportUsers_GroupName_Title")),` ${await n("AdminCenter_UsersTabView_ImportUsers_GroupName_Text")}`)),l("p",{
className:"text description"},await n("AdminCenter_UsersTabView_ImportUsers_DescrDelimeter")),l("p",{className:"example"
},l("span",{className:"title"},await n("AdminCenter_UsersTabView_ImportUsers_Example_Title")),l("span",{className:"text"
},`${await n("AdminCenter_UsersTabView_ImportUsers_Example1_Text")}`,l("br",null),`${await n("AdminCenter_UsersTabView_ImportUsers_Example2_Text")}`,l("br",null),`${await n("AdminCenter_UsersTabView_ImportUsers_Example3_Text")}`))),l("div",{
className:"send-email-section"},w=l(g.b_,{className:"send-email-checkbox",
text:await n("AdminCenter_UsersTabView_ImportUsers_SendInstructions"),checked:!0}),l("span",{className:"uncheck-text"
},await n("AdminCenter_UsersTabView_ImportUsers_UnckeckInstructions"))),o&&l("div",{className:"set-password"},y=(0,g.ap)({
title:await n("AdminCenter_UsersTabView_ImportUsers_Pwd_Placeholder"),maxLength:80}),l("span",{className:"note-text"
},await n("AdminCenter_UsersTabView_ImportUsers_Pwd_Text"))),l("div",{className:"buttons-bar"},l("button",{className:"button",
onclick:()=>c((0,j.JS)())},await n("Cmd_Cancel_Flat")),(a=>{const b=s(a),c=!u(a),d=m(a),e=b||c||d;return l("button",{
className:e?"button default-button disabled":"button default-button",onclick:e?null:z},n("AdminCenter_DialogButton_Import"))})))
;function z(){s(null)||(q=(0,i.YZ)({action:A}),(0,h.PQ)((async()=>{await(null==q?void 0:q.Execute(null))}),C,0,null,(a=>{(0,
j.au)(a),(0,j.r5)(a,j.kd)||B((0,j.EB)(a),null)})))}async function A(a){const c=y?y.GetValue():"",g=await(0,f.At)((0,
e.TT)(x)),h=await(0,d.Ib)(g,c,p);null==a||a.ThrowIfShouldStop();const i=[...h.groups];h.users.forEach((a=>{
a.groups&&a.groups.forEach((a=>{i.some((b=>b.name.toLowerCase()===a.name.toLowerCase()))||i.push({name:a.name})}))}))
;const j=w.GetChecked();b({m_users:h.users,m_groups:i,m_options:{sendNotifyEmail:j},m_csv_errors:h.errors})}function B(a,b){
r(a?{text:a,link:b}:null)}function C(){return t(!0),()=>t(!1)}},OnAfterShow:function(){},OnBeforeHide:function(){},
Focus:function(){},Dispose:function(){null==q||q.Cancel()}}}function n(a,b,c,d,e){const f=d.LocalizeString,j=c;let k=null
;const m={Create:async function(c,d){let m,n,o,p;let q=!0;const r=l("div",{className:"content"},m=l("div",{className:"wait-text"
},await f("AdminCenter_UsersTabView_ImportUsers_Progress_Text")),n=l("div",{className:"import-failed-text hidden"
},await f("AdminCenter_UsersTabView_ImportUsers_Failed_Text")),o=l(g.Zq,{gradient:!0}),l("div",{className:"buttons-bar"
},p=l("div",{className:"button default-button hidden disabled",onclick:function(){if(q)return;c(null)}
},await f("Cmd_Close_Flat"))));return function(){0===a.m_users.length?t():s()}(),r;function s(){(0,h.SE)(n),(0,h.SE)(p),(0,
h.aZ)(p),q=!0,(0,h.l5)(m),(0,h.l5)(o),k=(0,i.YZ)({action:async d=>{await async function(d){
const e=0!==a.m_groups.length?await j.ImportCompanyGroups(b,a.m_groups,!0,d):[];null==d||d.ThrowIfShouldStop()
;const f=[...a.m_users];f.map((a=>(a.groups&&a.groups.map((a=>{var b,c
;for(const d of e)if(a.name.toLowerCase()===d.name.toLowerCase()){a.name=d.name,
a.password=null!==(b=d.password)&&void 0!==b?b:"",a.id=null!==(c=d.id)&&void 0!==c?c:"";break}return a})),a)))
;const g=await j.ImportCompanyMembers(b,f,a.m_options,d);null==d||d.ThrowIfShouldStop()
;const h=g.filter((a=>a.existsBefore||a.joinedBefore||a.error)),i=g.filter((a=>!a.existsBefore&&!a.joinedBefore&&!a.error)),k=e.filter((a=>!(a.existsBefore||a.error))),l=e.filter((a=>void 0!==a.error))
;if(0===i.length&&0===k.length)return void t();c({m_users_created:i,m_users_failed:h,m_groups_created:k,m_groups_failed:l,
m_csv_errors:a.m_csv_errors})}(d)}}),(0,i.fI)(k.Execute(e))}function t(){(0,h.SE)(m),(0,h.SE)(o),(0,h.l5)(n),(0,h.r9)(p),(0,
h.l5)(p),q=!1}},OnAfterShow:function(){},OnBeforeHide:function(){},Focus:function(){},Dispose:function(){null==k||k.Cancel()}}
;return m}function o(a,b){const c=b.LocalizeString;return{Create:async function(b,d){
const f=await c("AdminCenter_UsersTabView_ImportUsers_UsersAdded_Text",[(0,
e.bf)(a.m_users_created.length)]),g=a.m_users_failed.length+a.m_csv_errors.filter((a=>1===a.type)).length,h=a.m_groups_failed.length+a.m_csv_errors.filter((a=>2===a.type)).length,i=await c("AdminCenter_UsersTabView_ImportUsers_UsersError_Text",[(0,
e.bf)(g)]),j=await c("AdminCenter_UsersTabView_ImportUsers_GroupsCreated_Text",[(0,
e.bf)(a.m_groups_created.length)]),k=await c("AdminCenter_UsersTabView_ImportUsers_GroupsError_Text",[(0,e.bf)(h)])
;return l("div",{className:"content"},l("span",{className:"title"
},await c("AdminCenter_UsersTabView_ImportUsers_Success_Title")),l("ul",{className:"info-list"
},0!==a.m_users_created.length?l("li",{className:"info"},l("div",{className:"ok-icon"}),l("div",{className:"text"
}," ",f," ")):null,0!==g?l("li",{className:"info"},l("div",{className:"fail-icon"}),l("div",{className:"text"
}," ",i," ")):null,0!==a.m_groups_created.length?l("li",{className:"info"},l("div",{className:"ok-icon"}),l("div",{
className:"text"}," ",j," ")):null,0!==h?l("li",{className:"info"},l("div",{className:"fail-icon"}),l("div",{className:"text"
}," ",k," ")):null),l("div",{className:"buttons-bar"},l("button",{className:"button default-button",onclick:()=>b()
},await c("Cmd_Close_Flat"))))},OnAfterShow:function(){},OnBeforeHide:function(){},Focus:function(){},Dispose:function(){}}}},
54019:function(a,b,c){"use strict";c.d(b,{y:function(){return i}});var d=c(55819),e=c(4153),f=c(73863),g=c(63956),h=c(91764)._
;async function i({localization:a,provider:b,ad_connector:c,on_disable:i,on_go_back:j}){var k,l,m,n,o,p;const q=a.LocalizeString
;let r,s,t=await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Period_Manual");if(null==c?void 0:c.adSyncSettings){
const a=c.adSyncSettings;if(a.periodicSyncEnabled&&a.syncPeriod){
const b=await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Period_Unit");t=`${a.syncPeriod} ${b}`}}const u=h("div",{
className:"provider-view"},h("div",{className:"back-section ad-connector"},h("div",null,h("div",{
className:b.active?"icon icon-back hidden":"icon icon-back",onclick:j}),h("div",{className:(0,f.bt)("icon"," ",(0,d.pq)((0,
e.TT)(b.type)))}),h("div",{className:"text"},(0,d.n)((0,e.TT)(b.type))," "),h("div",{className:"icon icon-info hidden",
title:await q("AdminCenter_IntegrationView_Remove_Provisioning_Tooltip")})),h("a",{className:"button default-button",
href:"https://www.roboform.com/tools/RoboFormADConnectorSetup.zip"
},await q("AdminCenter_IntegrationView_AD_Connector_Download_Button"))),h("div",{className:"tab-views"},h("div",{
className:"tab-view-scim tab-view"},r=h("div",{className:"status-section-wrapper hidden"},h("div",{className:"info-message"
},h("div",{className:"icon"}),b.active?h((function(){return h("div",{className:"description"
},q("AdminCenter_IntegrationView_AD_Connector_Description_Text"))}),null):h((function(){return h("div",{className:"description"
},q("AdminCenter_IntegrationView_AD_Connector_Setup_Text")," ",h("a",{className:"link",target:"_blank",
href:"https://help.roboform.com/hc/en-us/articles/115003728831-Active-Directory-Integration"
},q("AdminCenter_IntegrationView_AD_Connector_Setup_Link")),".")}),null)),h("div",{className:"status-section"},h("div",{
className:"status-row"},h("div",{className:"title"
},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status"),":"),h("div",{className:"icon-text"},h("div",{
className:"icon status-not-complete"}),h("div",{className:"text status"
},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Not_Connected")))))),s=h("div",{
className:"status-section-wrapper hidden"},h("div",{className:"info-message"},h("div",{className:"icon"}),h("div",{
className:"description"},await q("AdminCenter_IntegrationView_AD_Connector_Description_Text"))),h("div",{
className:"status-section"},h("div",{className:"status-row"},h("div",{className:"title"
},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status"),":"),h("div",{className:"icon-text"},h("div",{
className:"icon status-complete"}),h("div",{className:"text status"
},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Connected"))),h("div",{className:"text"
},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Last"),":"),h("button",{
className:"button warning-button aligned-right",onclick:()=>i(b)
},await q("AdminCenter_IntegrationView_AD_Connector_Disable_Button"))),h("div",{className:"status-row"},h("div",{
className:"title"},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Client"),":"),h("div",{className:"text"
},null==c?void 0:c.accountName)),h("div",{className:"status-row"},h("div",{className:"title"
},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Location"),":"),h("div",{className:"text"
},null==c?void 0:c.computer)),h("div",{className:"status-row"},h("div",{className:"title"
},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_CDomain"),":"),h("div",{className:"text"
},null===(k=null==c?void 0:c.adSyncSettings)||void 0===k?void 0:k.adDomain)),h("div",{className:"status-row"},h("div",{
className:"title"},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Period"),":"),h("div",{className:"text"
},t))),h("div",{className:"devider"}),h("div",{className:"sync-section"},h("div",{className:"sync-text"
},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Groups")),h("ul",null,null===(m=null===(l=null==c?void 0:c.adSyncSettings)||void 0===l?void 0:l.filters)||void 0===m?void 0:m.map((a=>h("li",null,a))))),h("div",{
className:"devider"}),h("div",{className:"sync-section"},h("div",{className:"sync-text"
},await q("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Rules")),h("ul",null,null===(o=null===(n=null==c?void 0:c.adSyncSettings)||void 0===n?void 0:n.syncRules)||void 0===o?void 0:o.map((({name:a,value:b})=>h("li",null,h("div",null,a,h("span",null,b)))))))))))
;return(null===(p=b.provisioning)||void 0===p?void 0:p.enable)?((0,g.SE)(r),(0,g.l5)(s)):((0,g.SE)(s),(0,g.l5)(r)),u}},
55819:function(a,b,c){"use strict";c.d(b,{n:function(){return v},pq:function(){return u},ug:function(){return t}})
;var d=c(54019),e=c(30045),f=c(30651),g=c(98266),h=c(89369),i=c(97490),j=c(32105),k=c(63956),l=c(73863),m=c(40868),n=c(4153),o=c(13113),p=c(69893),q=c(78440),r=(c(13117),
c(95399)),s=c(91764)._;function t(a,b,c,t,w,x,y){const z=a,A=b,B=c,C=t,D=x,E=x.LocalizeString;let F=!0;const G=w,H=(0,
q.tG)(),I=12e4;let J="",K=null;const[L,M]=(0,i.Uw)(!1),[N,O]=(0,i.Uw)(""),[P,Q]=(0,i.Uw)("");let R,S;const[T,U]=(0,
i.Uw)(null),[V,W]=(0,i.Uw)([]),[X,Y]=(0,i.Uw)(null),[Z,aa]=(0,i.Uw)([]),[ab,ac]=(0,i.Uw)(!1),[ad,ae]=(0,i.Uw)(!1),af=(0,
q.tG)(),ag=(0,q.tG)(),ah=(0,h.fA)();let ai=new Map,aj="",ak="",al="",am="",an="",ao="",ap="",aq="";const ar={
Create:async function(){var a;return Q(null!==(a=await D.GetLanguageTag(null))&&void 0!==a?a:"en"),await(0,i.Mj)((async a=>{
P(a),ak=await E("AdminCenter_Email_Empty_Error"),aj=await E("AdminCenter_IntegrationView_ADConnector_Warning"),
al=await E("AdminCenter_IntegrationView_SSO_ApplicationID_Azure_Text"),
am=await E("AdminCenter_IntegrationView_SSO_OIDC_Azure_URL_Text"),an=await E("AdminCenter_IntegrationView_SSO_ClientID_Text"),
ao=await E("AdminCenter_IntegrationView_SSO_OIDC_URL_Text"),ap=await E("AdminCenter_IntegrationView_SSO_ApplicationID_Text"),
aq=await E("AdminCenter_IntegrationView_SSO_OIDC_PingOne_URL_Text"),ai=new Map([["azure",{app_id:al,oidc:am,
scim_help_link:"https://help.roboform.com/hc/en-us/articles/19684686751373-SCIM-provisioning-integration-with-Azure-AD",
sso_help_link:"https://help.roboform.com/hc/en-us/articles/24498839018125-SSO-integration-with-Azure-Entra"}],["okta",{
app_id:an,oidc:ao,
scim_help_link:"https://help.roboform.com/hc/en-us/articles/19678853231373-SCIM-provisioning-integration-with-Okta",
sso_help_link:"https://help.roboform.com/hc/en-us/articles/24498914651533-SSO-integration-with-Okta"}],["google-workspace",{
app_id:ap,oidc:ao}],["pingone",{app_id:an,oidc:aq,
scim_help_link:"https://help.roboform.com/hc/en-us/articles/28265182933005-SCIM-provisioning-integration-with-Ping-Identity",
sso_help_link:"https://help.roboform.com/hc/en-us/articles/24498944458637-SSO-integration-with-Ping-Identity"}],["onelogin",{
app_id:ap,oidc:ao,
scim_help_link:"https://help.roboform.com/hc/en-us/articles/19712942735885-SCIM-provisioning-integration-with-OneLogin",
sso_help_link:"https://help.roboform.com/hc/en-us/articles/24498999502989-SSO-integration-with-Onelogin"}],["custom",{app_id:ap,
oidc:ao}]])})),K=s(j.J2,{always_visible:!1,class_name:"tab-view-integration tab-view hidden"},s("div",{
className:"integration-container"},(a=>L(a)?s("div",{className:"loading-view"},s("div",{
className:"action-progress-overlay-circle size48"})):N(a)?s("div",{className:"error-text"},N(a)):ad(a)?async function(a){
if(P(a),!V(a).length)return s(at,null);const b=function(a){const b=V(a).find((a=>a.active));if(b)return b;if(X(a))return X(a)
;return null}(a);if(b)return async function(a){switch(a.type){case"google-workspace":return async function(a){let b
;const c=a.provisioning&&!a.provisioning.hidden,d=a.sso&&!a.sso.hidden,e=c?0:1,[f,g]=(0,i.Uw)(e),h=s("div",{
className:"provider-view"},s("div",{className:"back-section"},s("div",{className:"icon icon-back",onclick:az}),s("div",{
className:(0,l.bt)("icon"," ",u("google-workspace"))}),s("div",{className:"text"},v("google-workspace")," "),s("div",{
className:"icon icon-info hidden",title:await E("AdminCenter_IntegrationView_Remove_Provisioning_Tooltip")
})),(async a=>s("div",{className:"tab-selector"},c&&s(aC,{label:E("AdminCenter_IntegrationView_SCIM_Title_Text"),
selected:0===f(a),onClick:()=>g(0)}),d&&s(aC,{label:E("AdminCenter_IntegrationView_SSO_Title_Text"),selected:1===f(a),
onClick:()=>g(1)}))),s("div",{className:"tab-views"},(async b=>0===f(b)?s(j,null):s("div",{className:"tab-view-sso tab-view"
},s("div",{className:"info-message"},s("div",{className:"icon"}),s("div",{className:"description"
},E("AdminCenter_IntegrationView_SSO_Setup_Info_Description_Text"),aD(a,"sso"))),s("div",{className:"appid-section"},s("div",{
className:"input-title"},await E("AdminCenter_IntegrationView_SSO_ApplicationID_Text")),s("div",{className:"input-copy-section"
},s("input",{type:"text",disabled:!0,value:await E("AdminCenter_IntegrationView_SSO_ApplicationID_Text"),autocomplete:"off",
autocorrect:"off",autocapitalize:"off",spellcheck:!1}))),s("div",{className:"oidc-section"},s("div",{className:"input-title"
},await E("AdminCenter_IntegrationView_SSO_OIDC_URL_Text")),s("div",{className:"input-copy-section"},s("input",{type:"text",
disabled:!0,value:await E("AdminCenter_IntegrationView_SSO_OIDC_URL_Text"),autocomplete:"off",autocorrect:"off",
autocapitalize:"off",spellcheck:!1}))),s("button",{className:"button default-button disabled"
},await E("AdminCenter_EditorButton_Apply"))))));return h;async function j(){var c;return s("div",{
className:"tab-view-scim tab-view"},(null===(c=a.provisioning)||void 0===c?void 0:c.enable)?s(e,null):s(d,null))
;async function d(){const[c,d]=(0,i.Uw)(!0),[e,f]=(0,i.Uw)("");return s("div",{className:"setup-section"},s("div",{
className:"info-message"},s("div",{className:"icon"}),s("div",{className:"description"
},await E("AdminCenter_IntegrationView_Google_Provisioning_Info_Text")," ",s("a",{className:"link",target:"_blank",
href:"https://help.roboform.com/hc/en-us/sections/206666427-Administrator-Toolkit"
},E("AdminCenter_IntegrationView_Google_Provisioning_Info_Link")),".")),s("div",{className:"server-section"},s("div",{
className:"input-title"},await E("AdminCenter_IntegrationView_Google_Admin_Email_Text")),s("div",{className:"input-copy-section"
},b=s("input",{type:"text",disabled:!1,value:"",autocomplete:"off",
placeholder:await E("AdminCenter_IntegrationView_Google_Admin_Email_Text"),autocorrect:"off",autocapitalize:"off",spellcheck:!1,
oninput:g})),(a=>e(a)?s("div",{className:"error-text"},e(a)):[])),s("div",{className:"token-section"},s("div",{
className:"input-title"},await E("AdminCenter_IntegrationView_Google_Account_Key_Text")),s("button",{className:"button",
onclick:h},await E("AdminCenter_IntegrationView_Google_Upload_JSON_Text"))),(a=>{const b=c(a);return s("button",{
className:b?"button default-button disabled":"button default-button",onclick:b?null:l},E("AdminCenter_EditorButton_Apply"))}))
;function g(){f("");const a=b.value.trim();d(""===a)}function h(){(0,q.fI)(j())}async function j(){const a=await(0,
k.tf)([".json"]);if(!a)return;const b=await(0,m.wv)(a);try{JSON.parse(b),f("")}catch(c){f((0,p.EB)(c))}}function l(){f("")
;const c=b.value;if(!c)return f(ak),void d(!0);const e=(0,o.MA)(c);if(!e.ok)return f(e.description||"Invalid Email"),void d(!0)
;(0,k.PQ)((async()=>{var b;const d=(0,q.f4)(null,null,null),e={active:!0,provisioning:{type:"google",enable:!0,google:{email:c}}
};(null==a?void 0:a.id)?e.id=null==a?void 0:a.id:e.idpId=null==a?void 0:a.idpId
;const g=(await z.UpdateCompanyIntegrationSettings(S,[e],d)).providers.find((a=>a.active));if(g){
const a=await E("AdminCenter_IntegrationView_AddProvisioning_Notification",[v(null!==(b=g.type)&&void 0!==b?b:"")])
;y.ShowNotification(a,null,null);const c={event:9};C.onEvent.CallAllSync([c])}else f("Setup Google provisioning failed")
}),(()=>(d(!0),()=>{d(!1)})),0,null,(a=>f((0,p.EB)(a))))}}async function e(){return s("div",{className:"remove-section"
},s("div",{className:"status-section"},s("div",{className:"text status"
},await E("AdminCenter_IntegrationView_Provisioning_Status_Text")),s("div",{className:"icon-text"},s("div",{
className:"icon status-complete"}),s("div",{className:"text status"
},await E("AdminCenter_UsersTabView_UserStatus_Active_Text"))),s("div",{className:"flex-cell"}),s("div",{className:"text"
},await E("AdminCenter_IntegrationView_AD_Connector_Sync_Status_Last"),":"),s("div",{className:"flex-cell"}),s("button",{
className:"button warning-button"},await E("AdminCenter_IntegrationView_Remove_Provisioning_Button"))),s("div",{
className:"info-message"},s("div",{className:"icon"}),s("div",{className:"description"
},await E("AdminCenter_IntegrationView_Remove_Provisioning_Text"))))}}}(a);case"ad-connector":return(0,d.y)({localization:D,
provider:a,ad_connector:R,on_disable:ax,on_go_back:az});default:return async function(a){const b=a.type||"";let c,d
;const f=a.provisioning&&!a.provisioning.hidden,h=a.sso&&!a.sso.hidden,m=f?0:1,[t,w]=(0,i.Uw)(m),x=!1,[A,B]=(0,
i.Uw)(""),[F,L]=(0,
i.Uw)([]),M=await E("AdminCenter_IntegrationView_SSO_Service_For_No_One_Label"),N=await E("AdminCenter_IntegrationView_SSO_Service_For_No_One_Text"),O=await E("AdminCenter_IntegrationView_SSO_Service_For_All_Label"),P=await E("AdminCenter_IntegrationView_SSO_Service_For_All_Text"),Q=await E("AdminCenter_IntegrationView_SSO_Service_For_Select_Label"),R=await E("AdminCenter_IntegrationView_SSO_Service_For_Select_Text"),U=await E("AdminCenter_IntegrationView_SSO_Group_Select_Dialog_Text"),V=await E("AdminCenter_IntegrationView_SSO_Group_Select_Search_Placeholder"),W=[{
value:0,label:M,description:N},{value:1,label:O,description:P},{value:2,label:Q,description:R}],X=new Map,Y=s("div",{
className:"provider-view"},s("div",{className:"back-section"},c=s("button",{
className:(null==a?void 0:a.active)?"icon icon-back hidden":"icon icon-back",onclick:az}),s("div",{className:(0,
l.bt)("icon"," ",u(b))}),s("div",{className:"text"},v(b)," "),d=s("div",{className:"icon icon-info hidden",
title:await E("AdminCenter_IntegrationView_Remove_Provisioning_Tooltip")})),(async a=>s("div",{className:"tab-selector"
},f&&s(aC,{label:E("AdminCenter_IntegrationView_SCIM_Title_Text"),selected:0===t(a),onClick:()=>w(0)}),h&&s(aC,{
label:E("AdminCenter_IntegrationView_SSO_Title_Text"),selected:1===t(a),onClick:()=>w(1)}))),s("div",{className:"tab-views"
},(a=>1===t(a)?s(ac,null):s(ad,null))));function ac(){var b;return s("div",{className:"tab-view-sso"
},(null===(b=a.sso)||void 0===b?void 0:b.enable)?s(aK,null):s(aM,null))}function ad(){var b;return s("div",{
className:"tab-view-scim tab-view"},(null===(b=a.provisioning)||void 0===b?void 0:b.enable)?s(af,null):s(ae,null))}
function ae(){var b,c
;const d=(null===(c=null===(b=a.provisioning)||void 0===b?void 0:b.scim)||void 0===c?void 0:c.serverUrl)||"";return s("div",{
className:"setup-section"},s("div",{className:"info-message"},s("div",{className:"icon"}),s("div",{className:"description"
},E("AdminCenter_IntegrationView_SCIM_Info_Description_Text"),aD(a,"scim"))),s("div",{className:"server-section"},s("div",{
className:"input-title"},E("AdminCenter_IntegrationView_SCIM_ServerUrl_Text")),s("div",{className:"input-copy-section"
},s("input",{type:"text",disabled:!0,value:d,autocomplete:"off",autocorrect:"off",autocapitalize:"off",spellcheck:!1
}),s("button",{className:"button",disabled:!d,onclick:()=>al(d)},E("Editor_Cmd_Copy_Flat")))),s("div",{className:"token-section"
},s("div",{className:"input-title"},E("AdminCenter_IntegrationView_SCIM_Token_Text")),s("div",{className:"input-copy-section"
},(async a=>[s("input",{type:"text",disabled:!0,placeholder:"Generate New Token",value:A(a),autocomplete:"off",
autocorrect:"off",autocapitalize:"off",spellcheck:!1}),s("button",{className:"button "+(A(a)?"":"disabled"),onclick:am
},E("Editor_Cmd_Copy_Flat"))])),s("button",{className:"button default-button",onclick:ar
},E("AdminCenter_IntegrationView_SCIM_Token_Generate_Text"))),(async a=>A(a)?s("div",{className:"info-message"},s("div",{
className:"icon"}),s("div",{className:"description"},E("AdminCenter_IntegrationView_After_Token_Generated_Text"))):[]))}
function af(){return s("div",{className:"remove-section"},ag(),s("div",{className:"status-section"},s("div",{
className:"text status"},E("AdminCenter_IntegrationView_Provisioning_Status_Text")),s("div",{className:"icon-text"},s("div",{
className:"icon status-complete"}),s("div",{className:"text status"
},E("AdminCenter_UsersTabView_UserStatus_Active_Text"))),s("div",{className:"flex-cell"}),s("div",{className:"text"
},ak()),s("div",{className:"flex-cell"}),s("button",{className:"button warning-button",onclick:as
},E("AdminCenter_IntegrationView_Remove_Provisioning_Button"))),s("div",{className:"info-message"},s("div",{className:"icon"
}),s("div",{className:"description"},E("AdminCenter_IntegrationView_Remove_Provisioning_Text"))))}function ag(){
return async a=>{const b=T(a);let c="";return(null==b?void 0:b.warnings)&&b.warnings.length>0&&b.warnings.forEach((a=>{
"ad-connector-active"===a.code?c=aj:"not-enough-licenses"===a.code&&(c=a.message||"")})),c?s("div",{
className:"info-message warning hidden"},s("div",{className:"icon"}),s("div",{className:"description"})):[]}}
async function ak(){var b,c,d,e,f;let g=await E("AdminCenter_DashboardTabView_NA_Text");if(a.provisioning){
const h=null!==(b=await D.GetLanguageTag(null))&&void 0!==b?b:"en"
;"scim"===a.provisioning.type&&(null===(d=null===(c=a.provisioning.scim)||void 0===c?void 0:c.stats)||void 0===d?void 0:d.lastSyncedTime)?g=(0,
r.il)(a.provisioning.scim.stats.lastSyncedTime,h):"google"===a.provisioning.type&&(null===(f=null===(e=a.provisioning.google)||void 0===e?void 0:e.stats)||void 0===f?void 0:f.lastSyncedTime)&&(g=(0,
r.il)(a.provisioning.google.stats.lastSyncedTime,h))}return E("AdminCenter_DashboardTabView_LastSyncTimeWithValue_Text",[g])}
return(0,q.fI)((0,i.Mj)((async a=>{const b=[];for(const c of Z(a)){
const a=(await aF(c.policies)).find((a=>"UseSSOLogin"===a.m_name));"1"===(null==a?void 0:a.m_value)&&b.push(c)}L(b)}))),Y
;function al(a){x||(0,q.fI)(G.WriteText(a))}function am(){A(null)&&(0,q.fI)(an(A(null),I))}async function an(a,b){
await G.WriteText(a),J=a,b&&aq(b)}function aq(a){H.Start((async b=>{await(0,q.Gu)(a,b);let c="";try{c=await G.ReadText()
}catch(d){}if(J===c||!c)try{await G.WriteText(" "),J=""}catch(d){}}))}function ar(){(0,k.PQ)((async()=>{var b,e,f;const g=(0,
q.f4)(null,null,null),h={active:!0,provisioning:{type:"scim",enable:!0,scim:{generateNewToken:!0}}}
;(null==a?void 0:a.id)?h.id=null==a?void 0:a.id:h.idpId=null==a?void 0:a.idpId
;const i=(await z.UpdateCompanyIntegrationSettings(S,[h],g)).providers.find((a=>a.active));if(i){
const a=(null===(e=null===(b=i.provisioning)||void 0===b?void 0:b.scim)||void 0===e?void 0:e.token)||"";(0,k.SE)(c),(0,k.l5)(d),
B(a);const g=await E("AdminCenter_IntegrationView_AddProvisioning_Notification",[v(null!==(f=i.type)&&void 0!==f?f:"")])
;y.ShowNotification(g,null,null);const h={event:9};C.onEvent.CallAllSync([h])}else aI("Generate token failed")
}),(()=>()=>{}),0,null,(a=>aI((0,p.EB)(a))))}function as(){(0,k.PQ)((async()=>{var b;if(await async function(){const a=(0,
g.Sw)((0,
n.TT)(K),(0,g.p)((0,g.dK)("dialog-modal",await E("AdminCenter_IntegrationView_Remove_Provisioning_Button"),null),(()=>(0,
e._3)((async(a,b)=>s("div",{className:"content"},s("div",{className:"confirmation-text"
},await E("AdminCenter_IntegrationView_Remove_Provisioning_Text")),s("div",{className:"buttons-bar"},s("button",{
className:"button",onclick:()=>{b((0,p.JS)())}},await E("Cmd_Cancel_Flat")),s("button",{className:"button default-button",
onclick:()=>a(!0)},await E("Options_Devices_RemoveDevice_RemoveButton_Text")))))))));return y.ShowModalDialog(a,null)}()){
const c=(0,q.f4)(null,null,null),d={active:!1,id:null==a?void 0:a.id,provisioning:{type:"scim",enable:!1}}
;a.sso&&a.sso.enable&&(d.active=!0),await z.UpdateCompanyIntegrationSettings(S,[d],c)
;const e=await E("AdminCenter_IntegrationView_RemoveProvisioning_Notification",[v(null!==(b=a.type)&&void 0!==b?b:"")])
;y.ShowNotification(e,null,null);const f={event:9};C.onEvent.CallAllSync([f]),await av(!1,c)}}),(()=>()=>{}),0,null,(a=>aI((0,
p.EB)(a))))}function at(a){async function b(){const a=(0,g.Sw)((0,n.TT)(K),(0,g.p)((0,
g.dK)("dialog-modal",await E("AdminCenter_IntegrationView_SSO_Activate_SSO_button"),null),(()=>(0,e._3)((async(a,b)=>s("div",{
className:"content"},s("div",{className:"confirmation-text"
},await E("AdminCenter_IntegrationView_SSO_Activate_SSO_Dialog_Text")),s("div",{className:"buttons-bar"},s("button",{
className:"button",onclick:()=>{b((0,p.JS)())}},await E("Cmd_Cancel_Flat")),s("button",{className:"button default-button",
onclick:()=>a(!0)},await E("AdminCenter_IntegrationView_SSO_Activate_SSO_button")))))))));return y.ShowModalDialog(a,null)}(0,
k.PQ)((async()=>{if(await b())try{aH(),await a()}finally{aG()}}),(()=>()=>{}),0,null,(a=>aI((0,p.EB)(a))))}
async function au(b,c){const d={active:!0,sso:{enable:!0,type:"oidc",oidc:{clientId:{default:b},config:{url:c}}}}
;(null==a?void 0:a.id)?d.id=null==a?void 0:a.id:d.idpId=null==a?void 0:a.idpId,
await z.UpdateCompanyIntegrationSettings(S,[d],null),C.onEvent.CallAllSync([{event:9}])}async function aw(a,b){
0===a&&(await ax([]),await aE(!1)),1===a&&(await aE(!0),await ax([])),2===a&&(await aE(!1),b&&await ax(b))}async function ax(a){
const b=new Set(a.map((a=>a.id))),c=50,d=[],e=Z(null);for(let g=0;g<e.length;g+=c)d.push(e.slice(g,g+c))
;for(const g of d)await Promise.all(g.map((async a=>{const c=b.has(a.id);await aA(a,c)})))
;const f=await y.GetCompanyGroups(!0,null);aa([...f]),C.onEvent.CallAllSync([{event:9}])}async function aA(a,b){
const c=await aF(a.policies),d=c.find((a=>"UseSSOLogin"===a.m_name)),e="1"===(null==d?void 0:d.m_value);if(!b&&!d)return
;if(b===e)return;const f=c.filter((a=>"UseSSOLogin"!==a.m_name));b&&f.push({m_name:"UseSSOLogin",m_section:"[CONFIG]",
m_value:"1"});const g=await ah.Save(f);await y.UploadGroupPolicies(a.id,g,null)}async function aE(a){
const b=(await y.GetCompanyInfo(!1,null)).policies||"";let c=await ah.Parse(b);const d=c.length
;if(c=c.filter((a=>"UseSSOLogin"!==a.m_name)),a&&c.push({m_name:"UseSSOLogin",m_section:"[CONFIG]",m_value:"1"}),d!==c.length){
const a=await ah.Save(c);await y.UploadCompanyPolicies(a,null)}await aB()}async function aF(a){return a?ah.Parse(a):[]}
function aJ(){async function b(){
const a=(0,g.Sw)((0,n.TT)(K),(0,g.p)((0,g.dK)("dialog-modal",await E("AdminCenter_IntegrationView_SSO_Remove_SSO_Title"),null),(()=>(0,
e._3)((async(a,b)=>s("div",{className:"content"},s("div",{className:"confirmation-text"
},await E("AdminCenter_IntegrationView_SSO_Remove_SSO_Description_Text")),s("div",{className:"buttons-bar"},s("button",{
className:"button",onclick:()=>{b((0,p.JS)())}},await E("Cmd_Cancel_Flat")),s("button",{className:"button warning-button",
onclick:()=>a(!0)},await E("AdminCenter_IntegrationView_SSO_Remove_SSO_button")))))))));return y.ShowModalDialog(a,null)}(0,
k.PQ)((async()=>{var c;const d=(0,q.f4)(null,null,null);if(!await b())return;const e={
active:(null===(c=a.provisioning)||void 0===c?void 0:c.enable)||!1,sso:{enable:!1}}
;(null==a?void 0:a.id)?e.id=null==a?void 0:a.id:e.idpId=null==a?void 0:a.idpId,
await z.UpdateCompanyIntegrationSettings(S,[e],null);const f=await E("AdminCenter_IntegrationView_RemoveSSO_Notification")
;y.ShowNotification(f,null,null);const g={event:9};C.onEvent.CallAllSync([g]),await av(!1,d)}),(()=>()=>{}),0,null,(a=>aI((0,
p.EB)(a))))}function aK(){const[b,c]=(0,i.Uw)(0);return s("div",null,(async a=>{if(0===b(a)){return[await d()]}return[await e()]
}));async function d(){var b,d,e,f,g,h;return s("div",{className:"tab-view status-section-wrapper"},s("div",{
className:"info-message"},s("div",{className:"icon"}),s("div",{className:"description"
},await E("AdminCenter_IntegrationView_SSO_Description_Text"))),s("div",{className:"status-section"},s("div",{
className:"status-row"},s("div",{className:"title"},await E("AdminCenter_IntegrationView_SSO_Status_Text"),":"),s("div",{
className:"icon-text"},s("div",{className:"icon status-complete"}),s("div",{className:"text status"
},await E("AdminCenter_UsersTabView_UserStatus_Active_Text"))),s("div",null),s("button",{
className:"button warning-button aligned-right",onclick:aJ
},await E("AdminCenter_IntegrationView_AD_Connector_Disable_Button"))),s("div",{className:"status-row"},s("div",{
className:"title"},await E("AdminCenter_IntegrationView_SSO_ApplicationID_Text"),":"),s("div",{className:"text span-full"
},null===(e=null===(d=null===(b=a.sso)||void 0===b?void 0:b.oidc)||void 0===d?void 0:d.clientId)||void 0===e?void 0:e.default)),s("div",{
className:"status-row"},s("div",{className:"title"},await E("AdminCenter_IntegrationView_SSO_OIDC_URL_Text"),":"),s("div",{
className:"text span-full"
},null===(h=null===(g=null===(f=a.sso)||void 0===f?void 0:f.oidc)||void 0===g?void 0:g.config)||void 0===h?void 0:h.url))),s("div",{
className:"select-groups-wrapper"},(async a=>{
if(F(a).length>0&&!ab(a))return[s("p",null,await E("AdminCenter_IntegrationView_SSO_Service_Active_For_Groups"),":"),s("ul",{
className:0===F(a).length?"hidden":""},F(a).map((a=>s("li",null,a.name))))]
;let b=await E("AdminCenter_IntegrationView_SSO_Service_Active_For_No_One")
;return ab(a)&&(b=await E("AdminCenter_IntegrationView_SSO_Service_Active_For_All")),
[s("p",null,await E("AdminCenter_IntegrationView_SSO_Service_Active_For"),": ",s("strong",null,b))]}),s("button",{
onclick:()=>c(1)},await E("AdminCenter_IntegrationView_SSO_Change_Service_Assigment"))))}async function e(){const[a,b]=(0,
i.Uw)(null),d=F(null);return s("div",{className:"tab-view sso-setup-view"},s("div",{className:"tab-title"
},await E("AdminCenter_IntegrationView_SSO_Sync_Settings_View_Title")),s("p",{className:"sso-groups-text"
},await E("AdminCenter_IntegrationView_SSO_Service_Active_For_Text"),":"),s(aN,{onGroupSelectionChange:b,
selected_placeholder_groups:d,initialy_selected_group_selector_type:aL()}),s("div",{className:"tab-action-bar"},(async b=>{
const c=e(a(b),F(b));return[s("button",{className:"button default-button "+(c?"":"disabled"),onclick:g
},await E("AdminCenter_IntegrationView_SSO_Activate_SSO_button"))]})));function e(a,b){if(null===a)return!1;const c=aL()
;return 0===c?ab(null)||b.length>0:1===c?!ab(null):!f(a,b)}function f(a,b){
return a===b||null!==a&&null!==b&&(a.length===b.length&&a.every((a=>b.includes(a))))}function g(){const b=aL();at((async()=>{
await aw(b,a(null));const d=await E("AdminCenter_IntegrationView_SSO_Updated_Notification");y.ShowNotification(d,null,null),c(0)
}))}}}function aL(){for(const[a,b]of X)if(b.IsChecked())return a;return F(null).length>0&&!ab(null)?2:ab(null)?1:0}
function aM(){var b,c,d,e,f,g
;const[h,j]=(0,i.Uw)(0),[k,l]=(0,i.Uw)((null===(d=null===(c=null===(b=a.sso)||void 0===b?void 0:b.oidc)||void 0===c?void 0:c.clientId)||void 0===d?void 0:d.default)||""),[m,n]=(0,
i.Uw)((null===(g=null===(f=null===(e=a.sso)||void 0===e?void 0:e.oidc)||void 0===f?void 0:f.config)||void 0===g?void 0:g.url)||"")
;return s("div",{className:"tab-view"},(async a=>{if(0===h(a)){return[await p()]}return[await r()]}));async function p(){
var b,c,d,e,f,g;const[h,p]=(0,i.Uw)("");(0,q.fI)((0,i.Mj)((async a=>{m(a),p("")})))
;const r=await E("AdminCenter_IntegrationView_SSO_OIDC_URL_Error_Text");function t(){const a=(0,o.vN)(m(null))
;a&&a.m_host?j(1):p(r)}const u=null!==(b=a.type)&&void 0!==b?b:"custom",w=ai.get(u);return s("div",{className:"sso-setup-view"
},s("div",{className:"tab-title"
},E("AdminCenter_IntegrationView_SSO_Setup_First_Step_View_Title",[v(null!==(c=a.type)&&void 0!==c?c:"")])),s("div",{
className:"info-message"},s("div",{className:"icon"}),s("div",{className:"description"
},E("AdminCenter_IntegrationView_SSO_Setup_Info_Description_Text"),aD(a,"sso"))),s("div",{className:"sso-setup-inputs"
},s("div",{className:"appid-section"},s("div",{className:"input-title"
},null!==(d=null==w?void 0:w.app_id)&&void 0!==d?d:ap),s("div",{className:"input-sso"},s("input",{type:"text",value:k(null),
placeholder:null!==(e=null==w?void 0:w.app_id)&&void 0!==e?e:ap,autocomplete:"off",autocorrect:"off",autocapitalize:"off",
spellcheck:!1,onkeyup:a=>ay(a,l)}))),s("div",{className:"oidc-section"},s("div",{className:"input-title"
},null!==(f=null==w?void 0:w.oidc)&&void 0!==f?f:ao),s("div",{className:"input-sso"},s("input",{type:"text",value:m(null),
placeholder:null!==(g=null==w?void 0:w.oidc)&&void 0!==g?g:ao,autocomplete:"off",autocorrect:"off",autocapitalize:"off",
spellcheck:!1,onkeyup:a=>ay(a,n)}),(a=>{const b=h(a);return b?[s("p",{className:"input-error-message"},b)]:[]})))),s("div",{
className:"tab-action-bar"},(async a=>{const b=Boolean(k(a)&&m(a));return s("button",{
className:"button default-button "+(b?"":"disabled"),disabled:!b,onclick:b?t:null},await E("AdminCenter_Next_Text"))})))}
async function r(){const[b,c]=(0,i.Uw)(null);return s("div",{className:"sso-setup-view"},s("div",{className:"tab-title"
},await E("AdminCenter_IntegrationView_SSO_Setup_Second_Step_View_Title")),s("div",{className:"info-message"},s("div",{
className:"icon"}),s("div",{className:"description"
},await E("AdminCenter_IntegrationView_SSO_Second_Step_Description_Text"))),s("p",{className:"sso-groups-text"
},await E("AdminCenter_IntegrationView_SSO_Service_Active_For_Text"),":"),s(aN,{onGroupSelectionChange:c}),s("div",{
className:"tab-action-bar"},s("button",{className:"button",onclick:()=>j(0)
},await E("AdminCenter_Back_Text")),(async a=>[s("button",{className:"button default-button "+(null===b(a)?"disabled":""),
disabled:null===b(a),onclick:d},await E("AdminCenter_IntegrationView_SSO_Activate_SSO_button"))])));function d(){at((async()=>{
var c;const d=aL();await au(k(null),m(null)),await aw(d,b(null))
;const e=await E("AdminCenter_IntegrationView_AddSSO_Notification",[v(null!==(c=a.type)&&void 0!==c?c:"")])
;y.ShowNotification(e,null,null);const f=(0,q.f4)(null,null,null);await av(!1,f)}))}}}
function aN({selected_placeholder_groups:a,initialy_selected_group_selector_type:b,onGroupSelectionChange:c}){const[d,e]=(0,
i.Uw)(b||0),[f,g]=(0,i.Uw)(a||[]);return(0,q.fI)((0,i.Mj)((async a=>{
if(2===d(a))return 0===f(a).length?void c(null):void c(f(a));1!==d(a)?c([]):c(Z(a))}))),s("div",null,aO(W,d(null),e),(async a=>{
if(2===d(a)){const b=f(a).length>0;return[s("div",{className:"select-groups-wrapper margin-left"
},b&&s("ul",null,f(a).map((a=>s("li",null,a.name)))),s("button",{onclick:h
},await E("AdminCenter_IntegrationView_SSO_Service_Select_Groups")))]}return[]}));function h(){(0,k.D$)((async()=>{let b=f(null)
;function c(a){g(a)}0===b.length&&a&&(b=a),await y.ShowSelectGroupsForSSO(Z(null),b,{fields:[{key:"name",
label:await E("AdminCenter_Name_Text"),sortable:!0}],translations:{text:U,search_placeholder:V,
cancel_btn:await E("Cmd_Cancel_Flat"),ok_btn:await E("AdminCenter_EditorButton_Apply")},on_ok_callback:c},null)
}),(()=>()=>{}),0,null)}}function aO(a,b,c){return X.clear(),s("div",{className:"radio-wrapper"},a.map((a=>{let c
;const e=s("div",{className:"radio-option"},c=s(j.a,{text:a.label,checked:a.value===b,onchange:()=>d(a.value)}),s("span",{
className:"description"},a.description));return X.set(a.value,c),e})));function d(a){const b=X.get(a)
;b&&!(null==b?void 0:b.IsChecked())&&(X.forEach((a=>{a.SetChecked(!1)})),b.SetChecked(!0),c(a))}}}(a)}}(b);return s(au,null)
}(a):s(as,null)))),D.onLanguageTagChange.Add(aF),K},OnAfterShow:function(){F?(F=!1,af.Start((async a=>{await av(!0,a)})),
null==K||K.Init()):ag.Start((async a=>{await aA(a)}))},OnBeforeHide:function(){},Focus:function(){},Dispose:function(){
af.Cancel(),null==K||K.UnInit(),D.onLanguageTagChange.Remove(aF)}};return(0,q.fI)((0,i.Mj)((async a=>{const b=T(a)
;W(b?function(a){if(!a||!a.providers||0===a.providers.length)return[];const b=a.providers,c=[];for(const d of b){
if(!d.type||!aw(d.type))continue;if(d.hidden)continue;const a=d.provisioning&&!d.provisioning.hidden,b=d.sso&&!d.sso.hidden
;(a||b)&&c.push(d)}return c}(b):[])}))),ar;function as(){return s("div",{className:"verify-email-section"},s("div",{
className:"text"},E("AdminCenter_IntegrationView_Verify_Email_Error")),s("button",{className:"button default-button",onclick:aE
},E("AdminCenter_IntegrationView_Verify_Email_Text")))}function at(){return s("div",{className:"no-providers-view hidden"
},E("AdminCenter_IntegrationView_Empty_Providers_list"))}function au(){return s("div",{className:"main-view"},s("div",{
className:"choose-section"},s("div",{className:"icon"}),s("div",{className:"text"
},E("AdminCenter_IntegrationView_ChooseProvider_Text"))),s("div",{className:"provider-selector"
},(async a=>V(a).map((a=>function(a){const b=a.type||"",c=s("div",{className:"provider-button",onclick:()=>d(a)},s("div",{
className:(0,l.bt)("icon"," ",u(b))}),s("div",{className:"flex-cell"}),s("div",{className:"text"},v(b)));return c;function d(a){
Y(a)}}(a))))))}async function av(a,b){aH(),U(null);const c=await y.GetAccountInfo(a,b);if(ae(Boolean(c.emailVerified)),!S){
if(!c.companies||!c.companies.length){aG();return void aI(await E("AdminCenter_No_Company_for_current_Admin_Text"))}
const a=c.companies[0].companyId||"";if(!a){aG();return void aI(await E("AdminCenter_Company_ID_Undefined"))}S=a}
if(c.emailVerified){try{const a=await z.GetCompanyIntegrationSettings(S,b),c=await async function(){const a={id:999,
type:"ad-connector",provisioning:{enable:!1}};try{const c=await z.GetADConnectorData(b);if(R=JSON.parse(c),R.reset)return a
;a.provisioning={enable:!0},a.active=!0}catch(c){}return a}();a.providers||(a.providers=[]),a.providers.push(c),U(a)}catch(d){
aG(),aI((0,p.EB)(d))}await aA(b),aG()}else aG()}function aw(a){switch(a){case"azure":case"okta":case"google-workspace":
case"pingone":case"onelogin":case"custom":case"ad-connector":return!0;default:return!1}}function ax(a){(0,k.PQ)((async()=>{var b
;if(await async function(){const a=R.computer||"",b=R.accountName||"",c=(0,g.Sw)((0,n.TT)(K),(0,g.p)((0,
g.dK)("dialog-modal",await E("AdminCenter_IntegrationView_Disable_ADConnector_Dialog_Title"),null),(()=>(0,
e._3)((async(c,d)=>s("div",{className:"content"},s("div",{className:"confirmation-text"
},await E("AdminCenter_IntegrationView_Disable_ADConnector_Dialog_Body",[a,b])),s("div",{className:"buttons-bar"},s("button",{
className:"button",onclick:()=>{d((0,p.JS)())}},await E("Cmd_Cancel_Flat")),s("button",{className:"button warning-button",
onclick:()=>c(!0)},await E("Options_Devices_DisableDevice_DisableButton_Text")))))))));return y.ShowModalDialog(c,null)}()){
const c=(0,q.f4)(null,null,null);aH();try{const d=Object.assign(Object.assign({},R),{reset:!0}),e=JSON.stringify(d)
;await z.PutADConnectorData(e,c)
;const f=await E("AdminCenter_IntegrationView_RemoveProvisioning_Notification",[v(null!==(b=a.type)&&void 0!==b?b:"")])
;y.ShowNotification(f,null,null),C.onEvent.CallAllSync([{event:9}])}finally{await av(!1,c)}}}),(()=>()=>{}),0,null,(a=>aI((0,
p.EB)(a))))}function ay(a,b){if(a.target){b(a.target.value)}}function az(){Y(null)}async function aA(a){
const b=await y.GetCompanyGroups(!1,a);aa([...b]),await aB()}async function aB(){
const a=(await y.GetCompanyInfo(!1,null)).policies||"",b=(await ah.Parse(a)).find((a=>"UseSSOLogin"===a.m_name))
;ac("1"===(null==b?void 0:b.m_value)||!1)}function aC({label:a,onClick:b,selected:c}){return s("button",{
className:"tab-button "+(c?"selected":""),onclick:()=>b()},s("span",{className:"text"},a))}function aD(a,b){var c
;const d=null!==(c=a.type)&&void 0!==c?c:"custom",e=ai.get(d);if(e){const a="sso"===b?e.sso_help_link:e.scim_help_link
;return s("span",null," ",s("a",{className:"link",target:"_blank",href:a
},E("AdminCenter_IntegrationView_Description_HelpCenter_Link")),".")}return s("fragment",null)}function aE(){(0,
k.PQ)((async()=>{const a=(0,q.f4)(null,null,null),b=(await A.GetRoboFormAccountInfo(a)).email||"";if(!b)return aG(),
void aI("Account email is empty or undefined");await B.SendVerificationCode("","email",b,a),await async function(a,b){
const c=(0,g.Sw)((0,n.TT)(K),(0,g.p)((0,g.dK)("dialog-modal verify-account-data verify-account-email","",null),(()=>(0,
f.z7)(a,D,{VerifyCode:b}))));return y.ShowModalDialog(c,null)}(b,(async(a,c)=>{await B.UpdateAccountInfo({email:b,
verificationCode:a},c)})),await av(!0,a)}),(()=>()=>{}),0,null,(a=>aI((0,p.EB)(a))))}function aF(){(0,q.fI)((async()=>{var a
;Q(null!==(a=await D.GetLanguageTag(null))&&void 0!==a?a:"en")})())}function aG(){M(!1)}function aH(){M(!0),O("")}
function aI(a){O(a)}}function u(a){switch(a){case"azure":return"icon-azure";case"okta":return"icon-okta";case"google-workspace":
return"icon-google";case"pingone":return"icon-ping";case"onelogin":return"icon-onelogin";case"custom":default:
return"icon-custom";case"ad-connector":return"icon-activedir"}}function v(a){switch(a){case"azure":return"Microsoft Entra ID"
;case"okta":return"Okta";case"google-workspace":return"Google Workspace / G Suite";case"pingone":return"Ping Identity"
;case"onelogin":return"OneLogin";case"custom":return"Custom";case"ad-connector":return"On-prem Active Directory";default:
return"Unknown provider"}}},29526:function(a,b,c){"use strict";c.d(b,{M:function(){return m}})
;var d=c(32105),e=c(63956),f=c(97490),g=c(78440),h=c(95399),i=c(69893),j=c(88262),k=c(4153),l=(c(13117),c(91764)._)
;function m(a,b,c,m,n){const o=a,p=b,q=c,r=n.LocalizeString,s=m.IsCurrentUserAdmin(null),[t,u]=(0,f.Uw)(!1);let v;return{
Create:async function(){return v=l(d.J2,{always_visible:!1,class_name:"no-license-view"},l("div",{className:"no-license"
},s?w():x(),(a=>l("div",{className:t(a)?"loading-view":"loading-view hidden"},l("div",{
className:"action-progress-overlay-circle size48"}))))),v},OnAfterShow:function(){v.Init()},OnBeforeHide:function(){},
Focus:function(){},Dispose:function(){v.UnInit()}};function w(){const[a,b]=(0,f.Uw)(!0),[c,s]=(0,f.Uw)("");let t,v
;return async b=>{const e=m.GetLicenseInfo(b);return l("div",{className:"sheet-container"},l("div",{className:"info"},l("div",{
className:"icon"}),l("span",{className:"text"},r("AdminCenter_NoLicense_Admin_Text"))),l("ul",{className:"license-info"
},l("li",{className:"info"},l("span",{className:"title"},r("AdminCenter_SettingsView_LicenseType_Text")),l("span",{
className:"value"},r("Options_LicenseType_Business_Text"))),l("li",{className:"info"},l("div",{
className:"licenses-count-wrapper"},l("div",{className:"licenses-count"},l("span",{className:"licenses-count-value"
},function(a){var b,c,d,e;if(!a)return""
;const f=null!==(c=null===(b=null==a?void 0:a.company)||void 0===b?void 0:b.numberOfUsers)&&void 0!==c?c:0,g=null!==(e=null===(d=null==a?void 0:a.company)||void 0===d?void 0:d.numberOfLicenses)&&void 0!==e?e:0
;return`${(0,k.bf)(f)}/${(0,k.bf)(g)}`}(e)),l("span",{className:"licenses-count-text"
},r("AdminCenter_SettingsView_LicensesUsed_Text"))),l("div",{className:"licenses-count-bar"},l("div",{
className:"licenses-count-active-bar",style:{width:`${(0,k.bf)(w(e))}%`}})))),l("li",{className:"info"},l("span",{
className:"title"},r("AdminCenter_SettingsView_LicenseStatus_Text")),l("span",{className:"value"},function(a){if(!a)return""
;switch(a.status){case"active":return r("Options_LicenseStatus_ActiveSubscription_Text");case"expired":
return r("Options_LicenseStatus_ExpiredSubscription_Text");case"trial-expired":default:
return r("Options_LicenseStatus_ExpiredTrial_Text");case"trial":return r("Options_LicenseStatus_FreeTrial_Text")
;case"no-license":return r("Options_LicenseStatus_NoLicense_Text")}}(e))),l("li",{className:"info"},l("span",{className:"title"
},r("AdminCenter_SettingsView_ExpirationDate_Text")),l("div",{className:"flex-cell"}),l("span",{
className:"value expiration-date"},async function(a){var b,c;if(!a)return""
;const d=null!==(b=a.expirationTime)&&void 0!==b?b:0,e=null!==(c=await n.GetLanguageTag(null))&&void 0!==c?c:"en";return(0,
h.fQ)(d,e)}(e)),l("button",{className:"button default-button",onclick:x},r("AdminCenter_BuyNow_Text"))),function(a){
if(!a)return!1;switch(a.status){case"expired":case"trial-expired":return!0;default:return!1}}(e)&&l("li",{
className:"info activate-account"},l("span",{className:"title"},r("AdminCenter_NoLicense_ActivateAccount_Text")),l("div",{
className:"form"},t=l(d.ap,{className:"order-id",title:await r("AdminCenter_NoLicense_OrderId_Text"),oninput:z}),v=l(d.ap,{
className:"order-name",title:await r("AdminCenter_NoLicense_OrderName_Text"),oninput:z}),(b=>{const c=a(b);return l("button",{
className:c?"button disabled":"button",onclick:c?null:y,disabled:c},r("AdminCenter_NoLicense_Submit_Text"))})),(a=>{const b=c(a)
;return l("div",{className:""!==b?"error-text":"error-text hidden"},b)}))))};function w(a){var b,c,d,e;if(!a)return 0
;const f=null!==(c=null===(b=null==a?void 0:a.company)||void 0===b?void 0:b.numberOfUsers)&&void 0!==c?c:0,g=null!==(e=null===(d=null==a?void 0:a.company)||void 0===d?void 0:d.numberOfLicenses)&&void 0!==e?e:0
;return g?Math.floor(f/g*100)||1:0}function x(){const a=(0,g.f4)(null,null,null);(0,g.fI)(o.OpenPaymentPage({action:"buy"},a))}
function y(){(0,e.PQ)((async()=>{const a=(0,g.f4)(null,null,null),b=t.GetValue().trim(),c=v.GetValue().trim()
;if(b.replace(/[^0-9]/g,"").length!==b.length||10!==b.length)throw(0,
i.ZU)(i.V2,await r("AdminCenter_NoLicense_ActivateAccount_Error",[b]));await p.ActivateRFBusinessLicense({orderId:b,orderName:c
},a);m.ShowNotification(await r("AdminCenter_SettingsView_LicenseActivation_Notification"),null,null),q.onEvent.CallAllSync([{
event:11}])}),(()=>(b(!0),t.Enable(!1),v.Enable(!1),()=>{b(!1),t.Enable(!0),v.Enable(!0)})),300,(()=>(u(!0),()=>{u(!1)})),(a=>{
var b,c;if((0,i.au)(a),(0,j.dW)(a)){
const d=null===(c=null===(b=a.httpResponse)||void 0===b?void 0:b.bodyAsValue)||void 0===c?void 0:c.errorMessage
;s("string"==typeof d?d:(0,i.EB)(a))}else s((0,i.EB)(a))}))}function z(){const a=t.GetValue().trim(),d=v.GetValue().trim()
;b(""===a||""===d),""!==c(null)&&s("")}}function x(){return l("div",{className:"sheet-container"},l("div",{className:"info"
},l("div",{className:"icon"}),l("span",{className:"text"},r("AdminCenter_NoLicense_GroupManager_Text"))))}}},
67310:function(a,b,c){"use strict";c.d(b,{N:function(){return G}})
;var d=c(84117),e=c(53166),f=c(98266),g=c(12072),h=c(30651),i=c(37694),j=c(3566),k=c(30045),l=c(47333),m=c(63306),n=c(83382),o=c(54811),p=c(94652),q=c(12131),r=c(31173),s=c(65852),t=c(63956),u=c(32105),v=c(97490),w=c(40868),x=c(78440),y=c(69893),z=c(4153),A=c(95399),B=c(73863),C=c(13113),D=c(88262),E=(c(13117),
c(84224)),F=c(91764)._;function G(a,b,c,G,J,K,L,M,N,O,P,Q,R,S,T){
const U=a,V=b,W=c,X=G,Y=J,Z=K,aa=L,ab=M,ac=N,ad=O,ae=T,af=P,ag=Q,ah=R,ai=ae.LocalizeString;let aj,ak,al=null
;const am=ad.GetSettingsTab(null),[an,ao]=(0,v.Uw)(am),[ap,aq]=(0,v.Q_)(null,"",(async function(){
return await Z.GetValue("LocalizationFile","")})),[ar,as]=(0,v.Uw)(!1),[at,au]=(0,v.Uw)(!1),[av,aw]=(0,v.Uw)(!1);let ax=null
;const ay=(0,x.tG)(),az=(0,x.tG)(),aA=5e5,aB=2,aC=39,aD=60,aE=2;let aF;return{Create:async function(){return await(0,
v.Mj)((async a=>{const b=ad.GetSettingsTab(a);b!==an(null)&&ao(b)})),ak=F("div",{className:"settings-view"
},F(aH,null),aj=F("div",{className:"settings-inner-view"},F(aI,null),F(aJ,null)),(a=>av(a)?F("div",{className:"loading-view"
},F("div",{className:"action-progress-overlay-circle size48"})):[])),(0,x.C)(aG),ak},OnAfterShow:aG,OnBeforeHide:function(){},
Focus:function(){},Dispose:function(){ay.Cancel(),az.Cancel(),null==al||al.UnInit()}};function aG(){ar(null)||(as(!0),
null==al||al.Init())}function aH(){return F("div",{className:"navigation settings-navigation"},(async b=>{ap(b);const c=an(b)
;return F("div",{className:"tab-selector settings-tab-selector"},F("span",{className:"settings-title"
},ai("AdminCenter_Settings_Text")),F(e.Dg,{iconClass:"icon-settings-general",isActive:"general"===c,onClick:()=>a("general")
},await ai("AdminCenter_Settings_Tab_General_Text")),F(e.Dg,{iconClass:"icon-settings-account",isActive:"account"===c,
onClick:()=>a("account")},await ai("AdminCenter_Settings_Tab_Account_Text")),F(e.Dg,{iconClass:"icon-settings-license",
isActive:"license"===c,onClick:()=>a("license")},await ai("AdminCenter_Settings_Tab_LicenseBilling_Text")))}));function a(a){
at(null)||a===an(null)||ad.SetState({m_view:"settings",m_tab:a},!0,!1)}}function aI(){return F("div",{
className:"buttons-bar button-with-title"},(async b=>{ap(b);const c=an(b);return[F("span",{className:"settings-subtitle"
},"general"===c?await ai("AdminCenter_Settings_Tab_General_Text"):"account"===c?await ai("AdminCenter_Settings_Tab_Account_Text"):await ai("AdminCenter_Settings_Tab_LicenseBilling_Text")),F(e.$n,{
type:"primary",onClick:a},ai("Cmd_Done_Flat"))]}));function a(){S.CloseCompanySettingsView()}}function aJ(){return al=F(u.J2,{
always_visible:!1},F("div",{className:"sheets-container"},F(aK,null),F(aS,null),F(aX,null)))}function aK(){
return F("fragment",null,(a=>{S.GetLanguageTag(a);const b=an(a),c=S.IsCurrentUserAdmin(a);return"general"!==b?[]:F("div",{
className:"sheet"},F(aL,{is_admin:c}),c&&F(aM,null),F(aN,null),F(aO,null),F(aP,null),F(aQ,null),F(aR,null))}))}function aL(a){
const[b,c]=(0,v.Uw)(!1),[d,e]=(0,v.Uw)(""),f=a.is_admin;let g=!1,h=null;return F("div",{className:"setting"},F("span",{
className:"setting-title"},ai("AdminCenter_SettingsView_CompanyName_Title")),(async a=>{var c;if(b(a))return[]
;const d=S.GetCompanyInfo(a),e=null!==(c=null==d?void 0:d.name)&&void 0!==c?c:await ai("AdminCenter_DashboardTabView_NA_Text")
;return F("div",{className:"setting-value settings-name"},d&&F("span",{className:"name"},e),f&&F("button",{
className:"edit-icon",title:await ai("Cmd_Edit_Flat"),onclick:d?i:null}))}),(async a=>{var c;const i=b(a);if(!i||!f)return[]
;const m=S.GetCompanyInfo(a),n=null!==(c=null==m?void 0:m.name)&&void 0!==c?c:await ai("AdminCenter_DashboardTabView_NA_Text")
;return i&&!g&&(0,x.C)((()=>{null==h||h.Focus()})),F("div",{className:"name-edit-pane"},h=(0,u.ap)({
title:await ai("AdminCenter_SettingsView_CompanyName_Title"),className:"company-name-edit-box",value:n,oninput:k,
onblur:()=>function(a){if(!h||d(null))return void j();!function(a){var b;if(!a)return;const c=(0,
z.TT)(h).GetValue().trim(),d=null!==(b=a.name)&&void 0!==b?b:"";if(d===c)return void j();(0,t.PQ)((async()=>{
const a=await async function(a){if(a.length>aD){
return await ai("AdminCenter_SettingsView_Name_TooLongError_Text",[await ai("AdminCenter_SettingsView_CompanyName_Title"),(0,
z.bf)(aD)])}if(a.length<aE){
return await ai("AdminCenter_SettingsView_Name_TooShortError_Text",[await ai("AdminCenter_SettingsView_CompanyName_Title"),(0,
z.bf)(aE)])}if(/[\u0000-\u001f]/g.test(a)){
return await ai("AdminCenter_SettingsView_Name_Invalid_Text",[await ai("AdminCenter_SettingsView_CompanyName_Title")])}
if(/[*?"<>|\\/]/g.test(a)){
return await ai("AdminCenter_SettingsView_Name_InvalidChars_Text",[await ai("AdminCenter_SettingsView_CompanyName_Title"),'*?"<>|\\/'])
}return null}(c);if(a)return null==h||h.SetErrorState(),null==h||h.Focus(),void e(a)
;if(await S.ShowConfirmationDialog(await ai("AdminCenter_SaveChanges_Text"),await ai("AdminCenter_SettingsView_CompanyNameChange_Warning",[d,c]),await ai("AdminCenter_ConfirmationDialog_DontSave"),await ai("AdminCenter_SaveChanges_Text"))){
j();const a=(0,x.f4)(null,null,null);try{await V.UpdateCompanyProperties(ag,{name:c},a)}catch(b){throw b}
S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null),await S.UpdateCompanyInfo(a)}else j()
}),(()=>(g=!0,()=>{g=!1})),0,null,(a=>{(0,y.au)(a),S.ShowNotification((0,y.EB)(a),null,2)}))}(a)}(m),onkeypress:l
}),(a=>F("div",{className:"error-text"},d(a))))}));function i(){g||c(!0)}function j(){e(""),c(!1)}function k(){e(""),
null==h||h.RemoveErrorState()}function l(a){a.key===E.U.Enter&&(null==h||h.Blur()),a.key===E.U.Escape&&j()}}function aM(){
const[a,b]=(0,v.Uw)(""),[c,d]=(0,v.Uw)(!1),[f,g]=(0,v.Uw)("");return F("div",{className:"setting"},F("span",{
className:"setting-title"},ai("AdminCenter_SettingsView_CompanyLogo_Title")),(async b=>{
const d=S.GetCompanyInfo(b),g=a(b),i=f(b),j=await async function(a){var b
;const c=null!==(b=null==a?void 0:a.logo)&&void 0!==b?b:"";if(c){const a=(0,w.fI)(c);return await(0,w.Z$)(a)}return""
}(d),k=function(a){if(""===a)return null;const b=function(a){var b;if(""===a)return"";const c=a.replace(/[<>]/g,"")
;let d=c.split(" ");if(d.length<2)return"";d=d.slice(1);for(const e of d){const a=e.split("=");if("src"===a[0]){
let c=null!==(b=a[1])&&void 0!==b?b:"";return""===c?"":(c=c.replace(/"/g,"").trim(),c)}}return""}(a);if(""===b)return null
;const c=new Image;return c.src=b,c}(j);return F("div",{className:"setting-value settings-logo"},F("div",{
className:j?"company-logo has-logo":"company-logo"
},null!=k?k:await ai("AdminCenter_SettingsView_CompanyLogo_Title")),(async a=>{const b=c(a)||!d;return""!==j?F("button",{
className:b?"edit-icon disabled":"edit-icon",onclick:b?null:()=>h(d),title:await ai("AdminCenter_SettingsView_EditLogo_Tip")
}):F(e.$n,{type:"secondary",disabled:b,onClick:()=>h((0,z.TT)(d)),tooltip:await ai("AdminCenter_SettingsView_ChooseFile_Tip")
},await ai("AdminCenter_SettingsView_ChooseFile_Title"))}),""===j&&F("span",{className:"file-description"
},await ai("AdminCenter_SettingsView_MaxSize_Title")),""!==i?F("span",{className:"file-load-result error"},i):""!==g?F("span",{
className:"file-load-result"},g):null)}));function h(a){ay.Start((async c=>{await async function(a,c){var e;d(!0);try{
if(ax=await(0,t.tf)([".jpeg",".jpg",".png"]),!ax)return void g("");if(ax.size>=aA){
const a=await ai("AdminCenter_SettingsView_LoadLogoError_Text");throw(0,y.ZU)(y.V2,a)}g("");const d=await async function(a){
const b=await(0,w.At)((0,z.TT)(a)),c=await(0,w.n1)(b),d=new Image;return d.src=`data:${a.type};base64,${c}`,d.outerHTML}((0,
z.TT)(ax));await async function(a,b,c){const d=await(0,w.zN)(a),e=await(0,w.n1)(d);if(b===e)return
;await V.UpdateCompanyProperties(ag,{logo:e},c)}(d,null!==(e=a.logo)&&void 0!==e?e:"",c),b(ax.name),
await S.UpdateCompanyInfo(c),S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null)}catch(f){(0,
y.r5)(f,y.kd)||g((0,y.EB)(f))}finally{d(!1)}}(a,c)}))}}function aN(){return F("div",{className:"setting setting-with-toggle"
},F("span",{className:"setting-title"},ai("AdminCenter_SettingsView_DarkTheme_Title")),(a=>F(u.Ig,{
checked:"dark"===S.GetColorTheme(a),onchange:S.UpdateColorTheme})))}function aO(){const[a,b]=(0,v.Q_)(null,2,(async function(){
return Z.GetValue("UserAvatarColorType",2)})),[c,d]=(0,v.Q_)(null,"#2979FF",(async function(){
return await Z.GetValue("UserAvatarHexColorType","#2979FF")}));return F("div",{className:"setting"},F("span",{
className:"setting-title"},ai("AdminCenter_SettingsView_UserAvatarColor_Title")),(async b=>{const f=a(b),g=c(b);return F("div",{
className:"radio-group"},F(u.a,{text:await ai("AdminCenter_SettingsView_Color_AccountStatusColors_Text"),
title:await ai("AdminCenter_SettingsView_Color_AccountStatusColors_Text"),checked:1===f,onchange:()=>e(1)}),F(u.a,{
text:await ai("AdminCenter_SettingsView_Color_SecurityScoreColors_Text"),
title:await ai("AdminCenter_SettingsView_Color_SecurityScoreColors_Text"),checked:2===f,onchange:()=>e(2)}),F(u.a,{
text:await ai("AdminCenter_SettingsView_Color_UserInitials_Text"),
title:await ai("AdminCenter_SettingsView_Color_UserInitials_Text"),checked:3===f,onchange:()=>e(3)}),F("div",{
className:"radio-button-with-color-change"},F(u.a,{text:await ai("AdminCenter_SettingsView_Color_OneForAll_Text"),
title:await ai("AdminCenter_SettingsView_Color_OneForAll_Text"),checked:4===f,onchange:()=>e(4)}),F("div",{
className:4===f?"colors-buttons-bar":"colors-buttons-bar disabled"
},["#2979FF","#31A629","#838789","#F0483F","#FFC509","#9AC73A","#7869C7","#00A2E8"].map((b=>F("div",{
className:b===g?"color-btn active":"color-btn",style:{backgroundColor:`${b}`},onclick:()=>function(b){
if(c(null)===b||4!==a(null))return;d(b),(0,x.fI)((async()=>{await Y.SetValue("UserAvatarHexColorType",b),
S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null)})())}(b)}))))))}));function e(c){
a(null)!==c&&(b(c),(0,x.fI)((async()=>{await Y.SetValue("UserAvatarColorType",c),
S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null)})()))}}function aP(){const[a,b]=(0,
v.Q_)(null,1,(async function(){return Z.GetValue("GroupAvatarColorType",1)})),[c,d]=(0,v.Q_)(null,"#2979FF",(async function(){
return await Z.GetValue("GroupAvatarHexColorType","#2979FF")}));return F("div",{className:"setting"},F("span",{
className:"setting-title"},ai("AdminCenter_SettingsView_GroupAvatarColor_Title")),(async b=>{const f=a(b),g=c(b)
;return F("div",{className:"radio-group"},F(u.a,{text:await ai("AdminCenter_SettingsView_Color_SecurityScoreColors_Text"),
title:await ai("AdminCenter_SettingsView_Color_SecurityScoreColors_Text"),checked:1===f,onchange:()=>e(1)}),F(u.a,{
text:await ai("AdminCenter_SettingsView_Color_GroupNameInitials_Text"),
title:await ai("AdminCenter_SettingsView_Color_GroupNameInitials_Text"),checked:2===f,onchange:()=>e(2)}),F("div",{
className:"radio-button-with-color-change"},F(u.a,{text:await ai("AdminCenter_SettingsView_Color_OneForAll_Text"),
title:await ai("AdminCenter_SettingsView_Color_OneForAll_Text"),checked:3===f,onchange:()=>e(3)}),F("div",{
className:3===f?"colors-buttons-bar":"colors-buttons-bar disabled"
},["#2979FF","#31A629","#838789","#F0483F","#FFC509","#9AC73A","#7869C7","#00A2E8"].map((b=>F("div",{
className:b===g?"color-btn active":"color-btn",style:{backgroundColor:`${b}`},onclick:()=>function(b){
if(c(null)===b||3!==a(null))return;d(b),(0,x.fI)((async()=>{await Y.SetValue("GroupAvatarHexColorType",b),
S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null)})())}(b)}))))))}));function e(c){
a(null)!==c&&(b(c),(0,x.fI)((async()=>{await Y.SetValue("GroupAvatarColorType",c),
S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null)})()))}}function aQ(){const[a,b]=(0,v.Uw)(!0)
;return F("div",{className:"setting"},(async b=>{const e=ap(b),f=a(b);return F("div",{className:"title-with-select"},F("span",{
className:"setting-title"},ai("AdminCenter_SettingsView_Language_Title")),(0,u.l6)(e,f,await async function(){
return aF=new Map([["",await ai("Options_Language_DefaultOption",[await c()])],...H]),aF}(),d,{
ariaLabel:ai("AdminCenter_SettingsView_Language_Title"),seamlessDropdown:!0}))}),F("span",{className:"select-description"
},ai("AdminCenter_SettingsView_LanguageSelect_Text")));async function c(){var a,b;const c=(0,r.Jy)(),d=(0,n.YW)(c)
;return null!==(b=null===(a=H.find((a=>(0,n.p3)(a[0])===d)))||void 0===a?void 0:a[1])&&void 0!==b?b:""}function d(a){(0,
t.PQ)((async()=>{var c,d;const e=ap(null),f=null!==(c=aF.get(e))&&void 0!==c?c:"",g=null!==(d=aF.get(a))&&void 0!==d?d:""
;if(f===g)return;const h=(await ai("InterfaceLanguage_Warning",[f,g])).split("\n").map((a=>F("span",{className:"text-part"},a)))
;if(await S.ShowConfirmationDialog(await ai("AdminCenter_SaveChanges_Text"),F("div",{className:"confirmation-text"
},h),await ai("AdminCenter_ConfirmationDialog_DontSave"),await ai("AdminCenter_SaveChanges_Text"))){const b=(0,
x.f4)(null,null,null);await ae.SetLanguageTag((0,n.p3)(null!=a?a:"en"),b),await Y.SetValue("LocalizationFile",null!=a?a:"en"),
aq(a),S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null)}else b(!0)}),(()=>(b(!1),()=>{b(!0)
})),0,null,(a=>{(0,y.au)(a),S.ShowNotification((0,y.EB)(a),null,2)}))}}function aR(){const[a,b]=(0,v.Uw)(-1*(0,A.M1)())
;return(0,x.fI)((0,v.Mj)((async a=>{if(ar(a)){const a=await async function(){return Z.GetValue("TimeZone",-1*(0,A.M1)())}();b(a)
}}))),F("div",{className:"setting"},(b=>{const e=a(b);return F("div",{className:"title-with-select"},F("span",{
className:"setting-title"},ai("AdminCenter_SettingsView_TimeZone_Title")),(0,u.l6)(e,!0,function(){const a=[]
;for(const b of I)a.push([b,c(b)]);return new Map(a)}(),d,{ariaLabel:ai("AdminCenter_SettingsView_TimeZone_Title"),
seamlessDropdown:!0}))}));function c(a){if(0===a)return"GMT";let b,c,d;return a>=0?(b="+",c=(0,z.bf)((0,z.Qj)(a/60)),d=(0,
z.bf)(a%60)):(b="-",c=(0,z.bf)(-1*(0,z.Qj)(a/60)),d=(0,z.bf)(a%60*-1)),1===c.length&&(c="0"+c),1===d.length&&(d="0"+d),
`GMT${b}${(0,z.bf)(c)}:${d}`}function d(c){a(null)!==c&&(b(c),(0,x.fI)((async()=>{await Y.SetValue("TimeZone",c),
S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null)})()))}}function aS(){
return F("fragment",null,(async a=>{S.GetLanguageTag(a);if("account"!==an(a))return[]
;const b=S.GetAccountInfo(a),c=S.IsCurrentUserAdmin(a),d=function(a,b){
return!!(b&&a&&a.company&&a.company.canRevertToConsumer&&void 0!==a.company.numberOfUsers&&a.company.numberOfUsers<=1)
}(S.GetLicenseInfo(a),c);return F("div",{className:"sheet"},F(aT,{account_info:b,is_admin:c}),F(aU,{account_info:b,is_admin:c
}),F(aV,null),d&&F(aW,null))}))}function aT(a){const[b,c]=(0,v.Uw)(!1),[f,g]=(0,v.Uw)(""),h=a.account_info,i=a.is_admin
;let k=!1,l=null;return F("div",{className:"setting"},F("span",{className:"setting-title"
},ai("AdminCenter_SettingsView_FirstAndLastName_Text")),(async a=>{var c
;const g=null!==(c=null==h?void 0:h.name)&&void 0!==c?c:"",j=b(a);j&&!k&&(0,x.C)((()=>{null==l||l.Focus()}));const n=(0,
d.QT)(g)||"NA";return F("div",{className:"first-last-name-container"},F("div",{className:s(g)},F("span",{
className:"name-icon-text"},n)),!j&&F("div",{className:"setting-value settings-name"},F("span",{className:"name"
},g),i&&F("button",{className:"edit-icon",title:await ai("Cmd_Edit_Flat"),onclick:m})),i&&j&&F("div",{
className:"first-lastname-edit-pane"},l=(0,u.ap)({title:await ai("AdminCenter_SettingsView_FirstAndLastName_Text"),
className:"first-lastname-name-edit-box",value:g,oninput:o,onblur:q,onkeypress:p}),(a=>F("div",{className:"error-text"
},f(a)))),F(e.$n,{type:"secondary",onClick:r,className:"settings-button"},await ai("Cmd_Logoff_Flat")))}));function m(){k||c(!0)
}function n(){g(""),c(!1)}function o(){g(""),null==l||l.RemoveErrorState()}function p(a){a.key===E.U.Enter&&(null==l||l.Blur()),
a.key===E.U.Escape&&n()}function q(){l&&!f(null)?function(){if(!h)return;let a=(0,z.TT)(l).GetValue().trim()
;if(h.name===a)return void n();(0,t.PQ)((async()=>{var b;const c=(0,x.f4)(null,null,null);if(a=(0,B.Gt)(a),
!a)return null==l||l.SetErrorState(),null==l||l.Focus(),void g(await ai("AdminCenter_FullName_Empty_Error"))
;const d=await async function(a){if(a.length>aC){
return await ai("AdminCenter_SettingsView_Name_TooLongError_Text",[await ai("AdminCenter_SettingsView_FirstAndLastName_Text"),(0,
z.bf)(aC)])}if(a.length<aB){
return await ai("AdminCenter_SettingsView_Name_TooShortError_Text",[await ai("AdminCenter_SettingsView_FirstAndLastName_Text"),(0,
z.bf)(aB)])}if(/[*?"<>|\\/]/g.test(a)){
return await ai("AdminCenter_SettingsView_Name_InvalidChars_Text",[await ai("AdminCenter_Name_Text"),'*?"<>|\\/'])}return null
}(a);if(d)return null==l||l.SetErrorState(),null==l||l.Focus(),void g(d);n(),await U.UpdateAccountInfo({accountId:h.accountId,
name:a},c),aa.onEvent.CallAllSync([{event:1,id:[null!==(b=h.accountId)&&void 0!==b?b:""]}]),
S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null)}),(()=>(k=!0,()=>{k=!1})),0,null,(a=>{(0,
y.au)(a),S.ShowNotification((0,y.EB)(a),null,2)}))}():n()}function r(){S.LogoutAction()}function s(a){
return""===a?"first-last-name-icon":`first-last-name-icon ${(0,j.dy)(a)}`}}function aU(a){const[b,c]=(0,
v.Uw)(!1),d=a.account_info,g=a.is_admin;return F("div",{className:"setting"},F("span",{className:"setting-title"
},ai("AdminCenter_Email_Title")),(async a=>{var c,e
;const f=null!==(c=null==d?void 0:d.email)&&void 0!==c?c:"",h=null!==(e=null==d?void 0:d.emailVerified)&&void 0!==e&&e,k=b(a)
;return F("div",{className:"email-container"},F("div",{className:"setting-value settings-email"},F("span",{className:"name"
},f),g&&F("button",{className:"edit-icon",title:await ai("Cmd_Edit_Flat"),onclick:k?null:i})),f&&!h&&d&&F("div",{
className:"account-email-not-verified"},F("div",{className:"account-email-not-verified-button",onclick:k?null:j},F("div",{
className:"info-icon"}),F("div",{className:"account-email-not-verified-text"
},await ai("Options_Account_VerifyEmail_Button_Text"))),F("div",{className:"tooltip-section"
},await ai("Options_Account_VerifyEmailTooltip_Text"))))}));function i(){d&&(0,t.PQ)((async()=>{var a,b;const c=(0,
x.f4)(null,null,null),g=await async function(a,b){let c;const d=(0,f.Sw)(ak,(0,f.p)((0,
f.dK)("dialog-modal ask-new-account-email",ai("AdminCenter_SettingsView_ChangeEmail_Text"),null),(()=>({Create:async(d,f)=>{
const[g,h]=(0,v.Uw)(!0),[i,j]=(0,v.Uw)(""),k=await ai("RFOError_EmailSendingFailed");return F("div",{className:"content"
},F("span",{className:"enter-email-text"},await ai("AdminCenter_SettingsView_EnterValidEmail_Text")),F("div",{
className:"email-edit-pane"},c=(0,u.ap)({title:await ai("AdminCenter_Email_Title"),className:"company-email-edit-box",value:a,
oninput:l,onkeypress:a=>m(a)}),(a=>F("div",{className:"error-text"},i(a)))),F("div",{className:"buttons-bar"},F(e.$n,{
type:"secondary",onClick:()=>f(y.kd)},await ai("Cmd_Cancel_Flat")),(a=>F(e.$n,{type:"primary",onClick:n,disabled:g(a)
},ai("Cmd_Next_Flat")))));function l(){const b=c.GetValue().trim();(0,z.RA)(a,b)||!b?h(!0):h(!1),c.RemoveErrorState(),
""!==i(null)&&j("")}function m(a){a.stopPropagation(),a.key===E.U.Enter&&n(),a.key===E.U.Escape&&c.Blur()}function n(){(0,
t.PQ)((async()=>{const a=c.GetValue().trim(),e=await o(a);if(e)throw(0,y.ZU)(y.V2,e)
;await U.SendVerificationCode("","email",a,b),d(a)}),(()=>(h(!0),()=>{h(!1)})),0,null,(a=>{(0,y.au)(a),c.SetErrorState(),
c.Focus(),(0,p.vr)(a)?j(k):j((0,y.EB)(a))}))}async function o(a){var b;if(!a)return ai("AdminCenter_Email_Empty_Error")
;const c=(0,C.MA)(a);return c.ok?null:null!==(b=c.description)&&void 0!==b?b:"Error"}},OnAfterShow:()=>{},OnBeforeHide:()=>{},
Focus:()=>{null==c||c.Focus()},Dispose:()=>{}}))));return S.ShowModalDialog(d,b)}(null!==(a=d.email)&&void 0!==a?a:"",c)
;await k(g,(async(a,b)=>{await U.UpdateAccountInfo({email:g,verificationCode:a},b)})),aa.onEvent.CallAllSync([{event:1,
id:[null!==(b=d.accountId)&&void 0!==b?b:""]
}]),S.ShowNotification(await ai("AdminCenter_SettingsView_EmailChanged_Text"),null,null)}),(()=>(c(!0),()=>{c(!1)
})),0,null,(a=>{(0,y.au)(a),(0,y.r5)(a,y.kd)}))}function j(){d&&(0,t.PQ)((async()=>{var a,b
;const c=null!==(a=d.email)&&void 0!==a?a:"",e=(0,x.f4)(null,null,null);await U.SendVerificationCode("","email",c,e),
await k(c,(async(a,b)=>{await U.UpdateAccountInfo({email:c,verificationCode:a},b)})),aa.onEvent.CallAllSync([{event:1,
id:[null!==(b=d.accountId)&&void 0!==b?b:""]
}]),S.ShowNotification(await ai("Options_Account_AccountDataIsVerifiedDialog_Email_Text"),null,null)}),(()=>(c(!0),()=>{c(!1)
})),0,null,(a=>{(0,y.r5)(a,y.kd)||((0,y.au)(a),S.ShowNotification((0,y.EB)(a),null,2))}))}async function k(a,b){const c=(0,
f.Sw)(ak,(0,f.p)((0,f.dK)("dialog-modal verify-account-data verify-account-email","",null),(()=>(0,h.z7)(a,ae,{VerifyCode:b}))))
;return S.ShowModalDialog(c,null)}}function aV(){const[a]=(0,v.Q_)(null,!1,(async function(){var a
;const b=S.GetAccountInfo(null),c=await ac.Parse(null!==(a=null==b?void 0:b.policies)&&void 0!==a?a:"")
;return!!c.find((a=>"DisableChangeMasterPassword"===a.m_name))})),[b,d]=(0,v.Uw)(!1);return F("div",{className:"setting"
},(async c=>{const d=b(c),f=a(c),g=d||f;return[F("div",{className:"setting-title-with-description"},F("div",{
className:"setting-title"},F("span",{className:f?"title disabled":"title"
},ai("AdminCenter_SettingsView_ChangeMP_Text")),f&&F("div",{className:"blocked-icon",
title:await ai("Options_ManagedByPolicy_Text")})),F("p",{className:f?"setting-description disabled":"setting-description"
},ai("AdminCenter_SettingsView_ChangeMP_Description"))),F(e.$n,{type:"secondary",className:"settings-button change-mp-button",
onClick:h,disabled:g},ai("AdminCenter_SettingsView_ChangePassword_Text"))]}));function h(){(0,t.PQ)((async()=>{const a=(0,
x.f4)(null,null,null);if(ah){const b=await async function(a){const b=await W.GetRFOnlineUserId(),d=(0,f.Sw)(ak,(0,f.p)((0,
f.dK)("dialog-modal change-mp-dialog enter-old-mp",ai("MasterPass_Title3"),null),(()=>(0,
i.cx)("login-dialog content",!1,null,!1,{GetAccountDisplayInfo:async()=>({userId:b.userId,serverTitle:b.serverUrl&&(0,
l.sU)(b.serverUrl)||""}),OnLogin:async(a,b)=>{if(!await c.IsMasterPassword(a,b))throw(0,
q.rb)(1,await ai("MasterPassword_Error2"));return a},onForgotPassword:null,onChangeAccount:null},T,af))))
;return S.ShowModalDialog(d,a)}(a),d=await async function(a,b){const c=await async function(a){const b=(0,
o.q6)(),c=await S.GetCompanyPoliciesValues(["MasterPasswordMinLength","MasterPasswordMinNonNumChars","MasterPasswordMinUpperCaseChars","MasterPasswordMinLowerCaseChars","MasterPasswordMinDigitChars"],a),d={
minLength:(0,z.fB)(c.MasterPasswordMinLength||b.minLength),maxLength:b.maxLength,minNonNumChars:(0,
z.fB)(c.MasterPasswordMinNonNumChars||b.minNonNumChars),
minUpperCaseChars:(0,z.fB)(c.MasterPasswordMinUpperCaseChars||b.minUpperCaseChars),minLowerCaseChars:(0,
z.fB)(c.MasterPasswordMinLowerCaseChars||b.minLowerCaseChars),
minDigitChars:(0,z.fB)(c.MasterPasswordMinDigitChars||b.minDigitChars)};return d}(b),d=(0,f.Sw)(ak,(0,f.p)((0,
f.dK)("dialog-modal change-mp-dialog enter-new-mp",ai("MasterPass_Title3"),null),(()=>(0,
g.rm)("change-master-password-dialog",ae,a,c,{IsPasswordCompromised:async(a,b)=>{if(!ab)return!1
;const c=await ab.GetUpdateUserDataBreaches({password:a},null,b);return!(!c||0===c.m_breaches.length)},
WasNewMasterPasswordAlreadyUsed:async(a,b,c)=>{const d=Number(await S.GetCompanyPolicyValue("EnforceMPHistory",c))
;if(!d)return!1;try{return await W.WasNewMasterPasswordAlreadyUsed(a,b,d,c)}catch(e){if((0,q.tM)(e,9)||(0,q.tM)(e,7))return!1
;throw e}},OnChangeMasterPassword:async(a,b,c,d)=>{await U.ChangeAccountPassword(a,b,c),S.CloseCompanySettingsView(),d(a)}}))))
;return S.ShowModalDialog(d,b)}(b,a);await async function(a,b){const c=(0,f.Sw)(ak,(0,f.p)((0,
f.dK)("dialog-modal change-master-password-successfull-modal-dialog change-mp-dialog",ai("MasterPass_Title3"),null),(()=>(0,
g.Dn)("change-master-password-successfull-dialog content",ae,a,{OnDone:async(a,b)=>{b()}}))));return S.ShowModalDialog(c,b)
}(d,a)}else await G.OpenChangeMasterPasswordDialog()}),(()=>(d(!0),()=>{d(!1)})),0,null,(a=>{(0,y.au)(a),(0,
y.r5)(a,y.kd)||S.ShowNotification((0,y.EB)(a),null,2)}))}}function aW(){const[a,b]=(0,v.Uw)(!1);return F("div",{
className:"setting"},(b=>F(e.$n,{type:"secondary",className:"revert-button",onClick:c,disabled:a(b)
},ai("AdminCenter_SettingsView_DeleteBusinessTrial_Text"))));function c(){(0,t.PQ)((async()=>{
await S.ShowConfirmationDialog(await ai("Options_RevertToConsumer_Text"),await ai("Options_RevertToConsumer_Warning_Text"),await ai("Options_No"),await ai("Options_Yes"))&&(await V.DeleteCompany(ag,null),
(0,x.fI)((async()=>{await G.OpenStartPage({startPage:(0,s.vj)()}),window.close()})()))}),(()=>(au(!0),b(!0),(0,t.aZ)(aj),()=>{
au(!1),b(!1),(0,t.r9)(aj)})),300,(()=>(aw(!0),()=>{aw(!1)})),(a=>{(0,y.au)(a),(0,y.r5)(a,y.kd)||S.ShowNotification((0,
y.EB)(a),null,2)}))}}function aX(){return F("fragment",null,(async a=>{S.GetLanguageTag(a)
;const b=an(a),c=S.GetLicenseInfo(a),d=S.IsCurrentUserAdmin(a);if("license"!==b)return[]
;const e=(null==c?void 0:c.status)?c.status:"no-license";return F("div",{className:"sheet"},F(aY,null),d&&c&&F(aZ,{
license_info:c}),c&&F(a0,{license_status:e}),d&&c&&F(a1,{license_info:c
}),d&&c&&("trial"===e||"trial-expired"===e)&&F(a2,null),d&&c&&((null==c?void 0:c.autopay)||(null==c?void 0:c.canEnableAutopay))&&F(a3,{
license_info:c}),d&&(null==c?void 0:c.autopay)&&F(a4,{license_info:c}))}))}function aY(){return F("div",{
className:"setting single-row-setting"},F("span",{className:"setting-title"
},ai("AdminCenter_SettingsView_LicenseType_Text")),F("span",{className:"setting-value"
},ai("Options_LicenseType_Business_Text")))}function aZ(a){var b,c,d,f;const[g,h]=(0,
v.Uw)(!1),i=a.license_info,j=null!==(c=null===(b=null==i?void 0:i.company)||void 0===b?void 0:b.numberOfLicenses)&&void 0!==c?c:0,k=null!==(f=null===(d=null==i?void 0:i.company)||void 0===d?void 0:d.numberOfUsers)&&void 0!==f?f:0,l=(null==i?void 0:i.status)?i.status:"no-license",m=(0,
B.bt)((0,B.Df)(k,S.GetLanguageTag(null)),"/",(0,B.Df)(j,S.GetLanguageTag(null))),n=j?Math.floor(k/j*100)||1:0;return F("div",{
className:"setting single-row-setting"},F("div",{className:"licenses-count-wrapper"},F("div",{className:"licenses-count"
},F("span",{className:"licenses-count-value"},m),F("span",{className:"licenses-count-text"
},ai("AdminCenter_SettingsView_LicensesUsed_Text"))),F("div",{className:"licenses-count-bar"},F("div",{
className:"licenses-count-active-bar",style:{width:`${(0,z.bf)(n)}%`}}))),(a=>F(e.$n,{type:"special",onClick:()=>function(a){(0,
t.D$)((async()=>{const b=function(a){switch(a){case"active":case"expired":return"buymore";default:return"buy"}}(a)
;await X.OpenPaymentPage({action:b},(0,x.f4)(null,null,null))}),(()=>(h(!0),()=>{h(!1)})),0,null)}(l),disabled:g(a)
},function(a){switch(a){case"active":case"expired":return ai("AdminCenter_SettingsView_BuyMore_Text");default:
return ai("AdminCenter_BuyNow_Text")}}(l))))}function a0(a){const b=a.license_status;return F("div",{
className:"setting single-row-setting"},F("span",{className:"setting-title"
},ai("AdminCenter_SettingsView_LicenseStatus_Text")),F("span",{className:"setting-value"},function(a){switch(a){case"active":
return ai("Options_LicenseStatus_ActiveSubscription_Text");case"expired":
return ai("Options_LicenseStatus_ExpiredSubscription_Text");case"trial-expired":
return ai("Options_LicenseStatus_ExpiredTrial_Text");case"trial":default:return ai("Options_LicenseStatus_FreeTrial_Text")
;case"no-license":return ai("Options_LicenseStatus_NoLicense_Text")}}(b)))}function a1(a){const[b,c]=(0,
v.Uw)(!1),d=a.license_info,f=(null==d?void 0:d.status)?d.status:"no-license",g="trial"!==f&&"trial-expired"!==f;return F("div",{
className:"setting single-row-setting"},F("span",{className:"setting-title"
},ai("AdminCenter_SettingsView_ExpirationDate_Text")),F("div",{className:"flex-cell"}),F("span",{
className:"setting-value expiration-date"},function(a){if(!a)return"";return(0,A.fQ)(a,S.GetLanguageTag(null))
}(d.expirationTime)),g&&(a=>F(e.$n,{type:"secondary",className:"settings-renew-button",onClick:h,disabled:b(a)
},ai("AdminCenter_SettingsView_RenewNow_Text"))));function h(){(0,t.D$)((async()=>{await X.OpenPaymentPage({action:"renew"},(0,
x.f4)(null,null,null))}),(()=>(c(!0),()=>{c(!1)})),null,null)}}function a2(){const[a,b]=(0,v.Uw)(!0),[c,d]=(0,v.Uw)("");let f,g
;return F("div",{className:"setting activate-account"},F("span",{className:"title"
},ai("AdminCenter_NoLicense_ActivateAccount_Text")),F("div",{className:"form"},f=F(u.ap,{className:"order-id",
title:ai("AdminCenter_NoLicense_OrderId_Text"),oninput:h}),g=F(u.ap,{className:"order-name",
title:ai("AdminCenter_NoLicense_OrderName_Text"),oninput:h}),(b=>F(e.$n,{type:"secondary",onClick:i,disabled:a(b)
},ai("AdminCenter_NoLicense_Submit_Text")))),(a=>{const b=c(a);return b?F("div",{className:"error-text"},b):[]}));function h(){
const a=f.GetValue().trim(),e=g.GetValue().trim();b(""===a||""===e),""!==c(null)&&d("")}function i(){(0,t.PQ)((async()=>{
const a=(0,x.f4)(null,null,null),b=f.GetValue().trim(),c=g.GetValue().trim()
;if(b.replace(/[^0-9]/g,"").length!==b.length||10!==b.length)throw(0,
y.ZU)(y.V2,await ai("AdminCenter_NoLicense_ActivateAccount_Error",[b]));await U.ActivateRFBusinessLicense({orderId:b,orderName:c
},a);S.ShowNotification(await ai("AdminCenter_SettingsView_LicenseActivation_Notification"),null,null),
await S.UpdateLicenseInfo(a),aa.onEvent.CallAllSync([{event:11}])}),(()=>(au(!0),b(!0),f.Enable(!1),g.Enable(!1),()=>{au(!1),
b(!1),f.Enable(!0),g.Enable(!0)})),300,(()=>(aw(!0),()=>{aw(!1)})),(a=>{var b,c;if((0,y.au)(a),(0,D.dW)(a)){
const e=null===(c=null===(b=a.httpResponse)||void 0===b?void 0:b.bodyAsValue)||void 0===c?void 0:c.errorMessage
;d("string"==typeof e?e:(0,y.EB)(a))}else d((0,y.EB)(a))}))}}async function a3(b){var c,d,g;const h=b.license_info;let i
;const l=!!h.autopay,m=null===(c=h.autopay)||void 0===c?void 0:c.lastErrorMessage,n=h.autopay?"iTunes"!==h.autopay.type:!m,o=null===(d=h.autopay)||void 0===d?void 0:d.nextPaymentDate,p=null===(g=h.autopay)||void 0===g?void 0:g.nextPaymentAmount,q=o?(0,
A.fQ)(o,S.GetLanguageTag(null)):null,r=p?p.replace(/&euro;/g,"€").replace(/&pound;/g,"£").replace(/&yen;/g,"¥"):null
;return F("div",{className:"setting setting-with-button auto-renewal"},F("div",{className:"title-and-text"},F("span",{
className:"setting-title"},ai("Options_AutoRenew_Text")),l&&F("div",{className:"text-wrapper"},q&&F("div",{className:"text"},(0,
j.ND)(await ai("Options_AutoRenewStatus_BillingDate_Text"),[()=>F("span",{className:"text-bold"
},q)],(a=>F("span",null,a)))),r&&F("div",{className:"text"
},(0,j.ND)(await ai("Options_AutoRenewStatus_BillingAmount_Text"),[()=>F("span",{className:"text-bold"
},r)],(a=>F("span",null,a))))),!l&&m&&F("div",{className:"text error"},m)),i=F(u.Ig,{checked:l,enable:n,onchange:function(){
az.Start((async b=>{try{const d=await async function(b){const[c,d]=(0,v.Uw)(!1),g=(0,f.Sw)(ak,(0,f.p)((0,
f.dK)("dialog-modal autorenew-confirmation",ai("Options_AutoRenew_SwitchConfirmation_Title"),null),(()=>(0,k._3)((async(f,g)=>{
const h=i.IsChecked(),k=!h,l=k?await ai("Options_AutoRenew_SwitchConfirmation_Off_Question_Text",["%1"]):await ai("Options_AutoRenew_SwitchConfirmation_On_Question_Text",["%1"]),m=await ai("Options_AutoRenew_SwitchConfirmation_BusinessLicense_Text")
;return F("div",{className:"content"},F("div",{className:"text"},(0,j.ND)(l,[()=>F("span",{className:"text-bold"
},m)],(a=>F("span",null,a)))),k&&F("div",{className:"warning"},F("div",{className:"warning-icon"}),F("div",{
className:"switch-warning-text"},await ai("Options_AutoRenew_SwitchConfirmation_TurnOff_RefundWarning_Text"))),F("div",{
className:"buttons-bar"},F(e.$n,{type:"secondary",onClick:()=>g((0,y.JS)())
},k?await ai("Options_AutoRenew_SwitchConfirmation_KeepOn_Text"):await ai("Options_AutoRenew_SwitchConfirmation_KeepOff_Text")),(a=>F(e.$n,{
type:"primary",onClick:n,disabled:c(a)
},ai(k?"Options_AutoRenew_SwitchConfirmation_TurnOff_Text":"Options_AutoRenew_SwitchConfirmation_TurnOn_Text")))));function n(){
(0,t.PQ)((async()=>{await a.UpdateLicenseAutoRenew(h,b),f(!0)}),(()=>(d(!0),()=>{d(!1)})),0,null,g)}})))))
;return S.ShowModalDialog(g,b)}(b);if(d){S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null);try{
await S.UpdateLicenseInfo(b)}catch(c){(0,y.au)(c),S.ShowNotification((0,y.EB)(c),null,2)}}}catch(c){(0,y.r5)(c,y.kd)||((0,
y.au)(c),S.ShowNotification((0,y.EB)(c),null,2));const a=i.IsChecked();i.SetChecked(!a)}}))}}))}function a4(a){
const b=a.license_info,c=(0,z.TT)(b.autopay),[d,g]=(0,v.Uw)(!1);return F("div",{className:"setting payment-info"},F("div",{
className:"title-and-text"},F("span",{className:"setting-title"},ai("Options_PaymentInfo_Text")),F("div",{
className:"text-wrapper"},c.cardNumberTail&&F("div",{className:"card-info"},c.cardType&&"unknown"!==c.cardType?F("div",{
className:`card-logo ${c.cardType}`}):null,F("span",{className:"card-number"},"****"+c.cardNumberTail)))),(a=>{const b=d(a)
;return"Stripe"!==c.type?[]:F(e.$n,{type:"secondary",onClick:h,disabled:b},ai("Options_PaymentInfo_UpdateBillingInfo_Text"))}))
;function h(){(0,t.PQ)((async()=>{const a=(0,x.f4)(null,null,null);await async function(a){const b=(0,f.Sw)(ak,(0,f.p)((0,
f.dK)("dialog-modal billing-info-dialog",ai("Options_PaymentInfo_UpdateBillingInfo_Text"),null),(a=>(0,m.W)(U,ae,a))))
;return S.ShowModalDialog(b,a)}(a),S.ShowNotification(await ai("Notification_SettingsChanges_Saved_Text"),null,null),
await S.UpdateLicenseInfo(a)}),(()=>(g(!0),()=>{g(!1)})),0,null,(a=>{(0,y.au)(a),(0,y.r5)(a,y.kd)||S.ShowNotification((0,
y.EB)(a),null,2)}))}}}
const H=[["en-english","English"],["id-Indonesian","Bahasa Indonesia (Indonesian)"],["cz-Czech","Česky (Czech)"],["dk-Danish","Dansk (Danish)"],["de-German","Deutsch (German)"],["at-German","Deutsch - Österreich (Austrian German)"],["es-Spanish","Español (Spanish)"],["fr-French","Français (French)"],["hr-Croatian","Hrvatski (Croatian)"],["it-Italian","Italiano (Italian)"],["lt-Lithuanian","Lietuvių (Lithuanian)"],["hu-Hungarian","Magyar (Hungarian)"],["nl-Dutch","Nederlands (Dutch)"],["no-Norwegian","Norsk (Norwegian)"],["pl-Polish","Polski (Polish)"],["br-Brasilian","Português Brasileiro (Portuguese-BR)"],["pt-Portuguese","Português Portugal (Portuguese-PT)"],["sk-Slovak","Slovenčina (Slovak)"],["sb-Serbian","Srpski (Serbian-Latin)"],["fi-Finnish","Suomi (Finnish)"],["se-Swedish","Svenska (Swedish)"],["tr-Turkish","Türkçe (Turkish)"],["el-Greek","Ελληνικά (Greek)"],["ru-Russian","Русский (Russian)"],["sc-Serbian","Српски (Serbian-Cyrillic)"],["ua-Ukrainian","Українська (Ukrainian)"],["hy-Armenian","Հայերեն (Armenian)"],["he-Hebrew","עברית (Hebrew)"],["ar-Arabic","العربية (Arabic)"],["fa-Persian","فارسي (Persian)"],["hi-Hindi","हिंदी (Hindi)"],["kr-Korean","한국어 (Korean)"],["jp-Japanese","日本語 (Japanese)"],["zh-Chinese","正體中文 (Traditional Chinese)"],["cn-Chinese","简体中文 (Simplified Chinese)"]],I=[-720,-660,-600,-540,-480,-420,-360,-300,-270,-240,-210,-180,-120,-60,0,60,120,180,210,240,270,300,330,345,360,390,420,480,510,540,570,600,660,720,780,840]
},29224:function(a,b,c){"use strict";c.d(b,{F:function(){return g}});var d=c(97490),e=c(13113),f=c(4153);function g(a){const b=a
;let c=null,g=null;const[h,i]=(0,d.Uw)("dashboard"),[j,k]=(0,d.Uw)("dashboard"),[l,m]=(0,d.Uw)(v(null)),[n,o]=(0,d.Uw)(w(null))
;return{Init:function(){c=t(),i(c.m_view),p(c.m_view)},UnInit:function(){window.removeEventListener("hashchange",s)},
AddOnHashChangeListener:function(a){g=a,window.addEventListener("hashchange",s)},GetState:r,SetState:function(a,d,g){if((0,
f.XM)(c,a))return;if(i(a.m_view,u),p(a.m_view),q(a),c=Object.assign({},a),d){const d={};b&&(d[b]=!0),d["ac-view"]=a.m_view,
c.m_id&&(d.id=c.m_id),c.m_query&&(d.query=c.m_query),c.m_tab&&(d.tab=c.m_tab);const f=(0,e.HT)(d)
;g?window.history.replaceState(c,`RoboForm Admin Center - ${a.m_view}`,`#${f}`):window.history.pushState(c,`RoboForm Admin Center - ${a.m_view}`,`#${f}`)
}},GetActiveView:h,GetActiveTab:j,GetUserTab:function(){const a=r();switch(a.m_tab){case"groups":case"files":case"security":
case"devices":case"activity":case"account":case"policies":return a.m_tab;default:return"groups"}},GetGroupTab:function(){
const a=r();switch(a.m_tab){case"details":case"users":case"files":case"security":case"backups":case"policies":return a.m_tab
;default:return"users"}},GetReportsTab:function(a){const b=r();switch(b.m_tab){case"company":case"users":case"groups":
return b.m_tab;default:return a?"company":"users"}},GetSettingsTab:l,GetPoliciesTab:n};function p(a){switch(a){case"dashboard":
case"users":case"groups":case"data":case"policies":case"integration":case"reports":k(a);break;case"user-details":k("users")
;break;case"group-details":k("groups")}}function q(a){switch(a.m_view){case"settings":m(v(a),b);break;case"policies":o(w(a),b)}
function b(a,b){return a===b}}function r(){return c||t()}function s(){const a=t();g&&g(a)}function t(){const a=(0,e._V)((0,
e.R2)(location.hash)),b=function(a){switch(a){case"dashboard":case"users":case"groups":case"data":case"policies":
case"integration":case"reports":case"settings":case"user-details":case"group-details":case"search":return a;default:
return"dashboard"}}((0,e.h0)(a,"ac-view")),c=(0,e.h0)(a,"id"),d=(0,e.h0)(a,"tab"),f=(0,e.h0)(a,"query"),g={m_view:b}
;return""!==c&&(g.m_id=c),""!==d&&(g.m_tab=d),""!==f&&(g.m_query=f),g}function u(a,b){return a===b}function v(a){
const b=null!=a?a:r();switch(b.m_tab){case"account":case"general":case"license":return b.m_tab;default:return"general"}}
function w(a){const b=null!=a?a:r();switch(b.m_tab){case"security-and-access":case"roboform-data":case"user-settings":
return b.m_tab;default:return"security-and-access"}}}},83768:function(a,b,c){"use strict";c.d(b,{H:function(){return h}})
;var d=c(84117),e=c(71644),f=c(78440),g=c(69893);c(13117);function h(a,b,c,h){const i=a,j=b,k=c,l=h.LocalizeString
;let m="",n=null;const o=new Map,p=(0,f.h1)();return{Init:function(a){m=a},Clear:function(){p.Cancel(),n=null,o.clear()},
GetCompanyMembers:async function(a,b){if(!m)throw(0,g.ZU)(g.VH,"AdminCenterUsersData is not initialized, provide Company ID")
;n&&!a||(n=await p.Execute({action:async a=>{o.clear();let b=await i.GetCompanyMembers(m,{doPost:!0,
fields:"+accessDate, +securityStats, +isManager, +created"},a);if("number"==typeof b)throw(0,
g.ZU)(g.V2,"Wrong users list format: returned value is number");return b=b.filter((a=>{var b
;return(null===(b=a.name)||void 0===b?void 0:b.toLowerCase())!==d.Ho.toLowerCase()})),[...b]}},b));return n},
GetSortedAndFilteredUsersList:async function(a,b,c){var f;let g=[...a];const h=new Map;if(b.m_search&&b.m_search.m_query){
const a=b.m_search;g=g.filter((b=>{var c;if(0===a.m_target){const c=(0,e.zR)(a.m_query,b.name||b.email,!1,!1,!1,!1,!1,!1)
;return!!c.matches.length&&(a.m_results_map.set(b.id,c.matches),h.set(b.id,c.rank),!0)}if(1===a.m_target){const c=(0,
e.zR)(a.m_query,b.email,!1,!1,!1,!1,!1,!1);return!!c.matches.length&&(a.m_results_map.set(b.id,c.matches),h.set(b.id,c.rank),!0)
}{const d=(0,e.zR)(a.m_query,`${null!==(c=b.name)&&void 0!==c?c:b.email} ${b.email}`,!1,!1,!1,!1,!1,!1)
;return!!d.matches.length&&(a.m_results_map.set(b.id,d.matches),h.set(b.id,d.rank),!0)}}))}if(b.m_role&&b.m_role.length){
const a=b.m_role;g=g.filter((b=>b.isAdmin?a.includes(0):b.isManager?a.includes(1):a.includes(2)))}
if(b.m_status&&b.m_status.length){const a=b.m_status;g=g.filter((b=>{if(b.disabled)return a.includes(1)
;if(b.suspended)return a.includes(5);if(2===b.status&&b.isNotComplete)return a.includes(4)
;if(0===b.status&&b.isNotComplete)return a.includes(2);if(1===b.status){if(a.includes(6))return!0
;if(a.includes(0)&&b.accessDate&&(0,d.e0)(b.accessDate,d.g1))return!0;if(a.includes(3)&&b.accessDate&&!(0,
d.e0)(b.accessDate,d.g1))return!0}
return!!(a.includes(0)&&b.accessDate&&(0,d.e0)(b.accessDate,d.g1))||!(!a.includes(3)||!b.accessDate||(0,
d.e0)(b.accessDate,d.g1))}))}if(b.m_inactive){const a=b.m_inactive;g=g.filter((b=>b.accessDate&&!(0,d.e0)(b.accessDate,a)))}
if(b.m_added){const a=b.m_added;g=g.filter((b=>b.created&&(0,d.IW)(b.created,a)))}if(b.m_score&&b.m_score.length){
const a=b.m_score;for(let b=g.length-1;b>=0;b--){const c=g[b],e=await(0,d.sm)((0,d.VK)(c))
;e?e<=d.jo?a.includes(0)||g.splice(b,1):e<=d.EZ?a.includes(1)||g.splice(b,1):e<=d._j?a.includes(2)||g.splice(b,1):a.includes(3)||g.splice(b,1):g.splice(b,1)
}}if(b.m_2fa&&b.m_2fa.length){const a=b.m_2fa;for(let b=g.length-1;b>=0;b--){const e=g[b],f=(0,d.VK)(e),h=(0,d.lW)(f)
;if(2===h||4===h){a.includes(2)||g.splice(b,1);continue}const i=await q(f.m_id,h,c);a.includes(i.m_status)||g.splice(b,1)}}
if(b.m_groups&&b.m_groups.length){const a=new Set,d=b.m_groups;for(const b of d){(await k.GetSharedAccountRecipients2(b,!0,{
fields:"-mp,-sender,-status,-current,-serverOnly,-name,-isAdmin,-isManager,-accepted,-company,-accountInfo,-policies,-recipientEmail,-isNotComplete,-recipientName,-recipientAccessDate"
},c)).forEach((b=>a.add(b.accountId)))}g=g.filter((b=>a.has(b.id)))}if(b.m_sort){const a=b.m_sort
;if(0===a.m_sort_by)g.sort(((b,c)=>{const d=b.name||b.email,e=c.name||c.email
;return a.m_asc?d.localeCompare(e):e.localeCompare(d)
}));else if(3===a.m_sort_by)g.sort(((b,c)=>a.m_asc?b.email.localeCompare(c.email):c.email.localeCompare(b.email)));else if(4===a.m_sort_by)g.sort(((b,c)=>{
const e=(0,d.lW)((0,d.VK)(b)),f=(0,d.lW)((0,d.VK)(c));return a.m_asc?e-f:f-e}));else if(5===a.m_sort_by)g.sort(((b,c)=>{
var d,e,f,g
;return a.m_asc?(null!==(d=c.created)&&void 0!==d?d:0)-(null!==(e=b.created)&&void 0!==e?e:0):(null!==(f=b.created)&&void 0!==f?f:0)-(null!==(g=c.created)&&void 0!==g?g:0)
}));else if(6===a.m_sort_by){const b=new Map;for(const a of g){const c=await(0,d.sm)((0,d.VK)(a));b.set(a.id,null!=c?c:0)}
g.sort(((c,d)=>{var e,f;const g=null!==(e=b.get(c.id))&&void 0!==e?e:0,h=null!==(f=b.get(d.id))&&void 0!==f?f:0
;return a.m_asc?h-g:g-h}))}else 1===a.m_sort_by?g.sort(((b,c)=>{
const d=parseInt(b.accessDate||"0"),e=parseInt(c.accessDate||"0");return a.m_asc?e-d:d-e
})):h.size>0&&(null===(f=b.m_search)||void 0===f?void 0:f.m_query)?g.sort(((a,b)=>{var c,d
;const e=null!==(c=h.get(a.id))&&void 0!==c?c:0;return(null!==(d=h.get(b.id))&&void 0!==d?d:0)-e})):g.sort(((b,c)=>{
const d=b.name||b.email,e=c.name||c.email;return a.m_asc?d.localeCompare(e):e.localeCompare(d)}))}else g.sort(((a,b)=>{
const c=a.name||a.email,d=b.name||b.email;return c.localeCompare(d)}));return g},GetMemberGroupsCount:async function(a,b){
const c=await i.GetMemberGroups(a,null,b)
;if("number"==typeof c)throw(0,g.ZU)(g.V2,"The return value should be a number. Other type returned.")
;return c.filter((a=>a.company&&!a.disabled)).length},GetAltAuthValue:q,AddUsersToGroups:async function(a,b,c,d){
await i.AddMemberToGroup(a,b,c,d)},RemoveUsersFromGroups:async function(a,b,c){await i.RemoveMemberFromGroup(a,b,c)}}
;async function q(a,b,c){let d=o.get(a);if(d)return d;if(2===b||4===b)return d={m_status:2,
m_text:await l("AdminCenter_UsersTabView_AltAuth_Email_Text"),m_tooltip:await l("AdminCenter_UsersTabView_AltAuth_Email_Tip")},
o.set(a,d),d;try{switch((await j.GetAccountInfo(a,c)).altAuth){case"email":d={m_status:2,
m_text:await l("AdminCenter_UsersTabView_AltAuth_Email_Text"),m_tooltip:await l("AdminCenter_UsersTabView_AltAuth_Email_Tip")}
;break;case"sms":d={m_status:4,m_text:await l("AdminCenter_UsersTabView_AltAuth_Sms_Text"),
m_tooltip:await l("AdminCenter_UsersTabView_AltAuth_Sms_Tip")};break;case"totp":d={m_status:3,
m_text:await l("AdminCenter_UsersTabView_AltAuth_GoogleAuth_Text"),
m_tooltip:await l("AdminCenter_UsersTabView_AltAuth_GoogleAuth_Tip")};break;default:d={m_status:1,
m_text:await l("AdminCenter_UsersTabView_AltAuth_Off_Text"),m_tooltip:""}}return o.set(a,d),d}catch(e){return{m_status:1,
m_text:await l("AdminCenter_UsersTabView_AltAuth_Off_Text"),m_tooltip:""}}}}},28376:function(a,b,c){"use strict";c.d(b,{
G:function(){return an}})
;var d=c(1151),e=c(29224),f=c(6998),g=c(84117),h=c(85557),i=c(33094),j=c(73549),k=c(60215),l=c(90655),m=c(78749),n=c(67310),o=c(55819),p=c(24532),q=c(49245),r=c(45655),s=c(78220),t=c(29526),u=c(53166),v=c(83768),w=c(38136),x=c(30045),y=c(98266),z=c(47333),A=c(87965),B=c(3566),C=c(93075),D=c(38221),E=c(19365),F=c(83645),G=c(4234),H=c(89369),I=c(71644),J=c(54811),K=c(12131),L=c(78949),M=c(71796),N=c(88579),O=c(25807),P=c(99196),Q=c(21253),R=c(70346),S=c(79997),T=c(79999),U=c(84479),V=c(31173),W=c(66423),X=c(97490),Y=c(63956),Z=c(32105),aa=c(97514),ab=c(88262),ac=c(40371),ad=c(40868),ae=c(73863),af=c(78440),ag=c(13113),ah=c(4153),ai=c(95399),aj=c(70026),ak=c(69893),al=(c(13117),
c(84224)),am=c(91764)._;function an(a,b,c,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az,aA,aB,aC,aD,aE,aF,aG,aH,aI){
const aJ=aw,aK=aJ.LocalizeString,aL=aE,aM=aF,aN=c,aO=aq,aP=aw,aQ=az,aR=ar,aS=as,aT=at,aU=au,aV=av,aW=ap,aX=an,aY=ao,aZ=b,a0=aC,a1=aG,a2=aH,a3=aI,a4=a
;a4.onDataChanged.Add(fN);const a5=function(){const a={onEvent:(0,ac.dU)(),onUsersViewShown:(0,ac.dU)(),onGroupsViewShown:(0,
ac.dU)(),onDataViewShown:(0,ac.dU)(),onReportsViewShown:(0,ac.dU)(),onPoliciesViewShown:(0,ac.dU)(),onUserDeviceShown:(0,
ac.dU)(),onInitSearchPane:(0,ac.dU)(),onClearSearchResults:(0,ac.dU)(),onUpdateSearchResults:(0,ac.dU)(),
onSearchResultsNavigation:(0,ac.dU)()};return a}();a5.onEvent.Add(fM);const[a6,a7]=(0,X.Uw)(!1),[a8,a9]=(0,
X.Uw)("light"),[ba,bb]=(0,X.Uw)("en"),bc=aD,bd=(0,aj.t)(),be=(0,M.P4)({GetServerTemplates:async function(){var a
;const b=`rf-templates.json?vvv=${(0,aa.RD)()}`,c={};return null!==(a=await bd.GetData(b,{maxAgeSec:86400,default:c,
onGetData:async a=>(0,ab.$)(b,a,aF)}))&&void 0!==a?a:c},GetEnterpriseTemplates:fH,GetCustomTemplates:fJ,
GetDisableCommonTemplates:async function(){
const a=await d2(!1,null),b=(await bj.Parse(a.policies||"")).find((a=>"DisableCommonTemplates"===a.m_name));return!!b}}),bf=(0,
M.EV)({GetEnabledTemplates:fH,GetCustomTemplates:fJ,SaveCustomTemplates:async function(a,b,c){var d,e,f,g;const h=await d2(!1,c)
;if(null===a&&null===b)return;let i=await bj.Parse(h.policies||"");null!==a&&(i=i.filter((a=>"AllRfTemplates"!==a.m_name)),
a&&i.push({m_name:"AllRfTemplates",
m_section:null!==(e=null===(d=H.gX.AllRfTemplates)||void 0===d?void 0:d.m_section)&&void 0!==e?e:"[CONFIG]",m_value:a}))
;null!==b&&(i=i.filter((a=>"RfTemplates"!==a.m_name)),b&&i.push({m_name:"RfTemplates",
m_section:null!==(g=null===(f=H.gX.RfTemplates)||void 0===f?void 0:f.m_section)&&void 0!==g?g:"[CONFIG]",m_value:b}))
;const j=await bj.Save(i);await aX.UploadCompanyPolicies(bw,j,c),await d2(!0,c)}},aJ);let bg=ay,bh=ax;const bi=(0,
C._)(aZ,aM),bj=(0,H.fA)(),bk=(0,e.F)(aQ);bk.Init();let bl=null;const[bm,bn]=(0,X.Uw)(null),[bo,bp]=(0,X.Uw)(null),[bq,br]=(0,
X.Q_)(null,null,(()=>e1(!1,(0,af.f4)(null,null,null)))),[bs,bt]=(0,X.Q_)(null,null,e3),[bu,bv]=(0,X.Uw)(!1);(0,af.fI)((0,
X.Mj)((async a=>{const b=bq(a)?"buymore":await e3(null);bt(b)})));let bw,bx,by=!1;const bz=(0,af.h1)(),bA=(0,af.h1)(),bB=(0,
af.h1)(),bC=(0,af.E5)(),bD=(0,af.tG)(),bE=(0,af.tG)(),bF=(0,af.tG)(),bG=(0,af.tG)(),bH=(0,W.S)(),bI=(0,af.tG)(),bJ=12e4
;let bK="";const bL=(0,T.AZ)(aM),bM=(0,J.I9)(a4,aZ,aN,aB,aJ),bN=500;let bO,bP,bQ=null;const[bR,bS]=(0,X.Uw)(!0),[bT,bU]=(0,
X.Uw)(null),[bV,bW]=(0,X.Uw)(null),[bX,bY]=(0,X.Uw)(!1),[bZ,b0]=(0,X.Uw)(!1);let b1=null,b2=null,b3=null;const[b4,b5]=(0,
X.Uw)(!1);let b6=!1,b7=null;const b8=new Map,b9=new Map;let ca,cb;const cc=(0,v.H)(aX,aN,aY,aJ);let cd,ce;const cf=(0,
w.H)(aX,aW,a4,aY,aO,bg);let cg,ch;const[ci,cj]=(0,X.Uw)(null);let ck,cl;const cm=(0,ah.kA)();let cn,co=null;const cp=(0,af.h1)()
;let cq,cr,cs,ct,cu,cv,cw=null;const cx=(0,af.tG)();let cy,cz,cA,cB=null;const cC=(0,af.tG)(),cD=(0,af.tG)();let cE,cF,cG=null
;const cH=(0,af.tG)();let cI,cJ,cK,cL=null,cM=0,cN=null,cO=!1,cP=!1,cQ=null,cR=null,cS=null,cT=null
;const cU=1170,cV=500,cW=630,cX=800,cY=5;let cZ,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,da,db,dc,dd,de,df,dg=null
;window.addEventListener("resize",(()=>{fy()}),!0);return{Create:async function(){var a
;a9(await bc.GetValue("StartPage.Theme",(0,
D.Cj)())),await(0,z.sJ)(aR,aJ,!0),bb(null!==(a=await aJ.GetLanguageTag(null))&&void 0!==a?a:"en"),await e7((0,
af.f4)(null,null,null)),await di(),await dj(),cc.Init(bw),cf.Init(bw,bx,bu(null)),await(0,X.Mj)((async a=>{ba(a),
c1=await aK("PassAud_PwdStrengthWeak"),c2=await aK("PassAud_PwdStrengthMedium"),c3=await aK("PassAud_PwdStrengthGood"),
c4=await aK("PassAud_PwdStrengthStrong"),c5=await aK("PassAud_GoodSafetyLevel_Tittle"),
c6=await aK("PassAud_MediumSafetyLevel_Tittle"),c7=await aK("PassAud_AverageSafetyLevel_Tittle"),
c8=await aK("PassAud_BadSafetyLevel_Tittle"),c9=await aK("AdminCenter_UserTabView_NotAvailable_Text"),
da=await aK("AdminCenter_UsersTabView_UserStatus_Active_Text"),db=await aK("AdminCenter_UsersTabView_UserStatus_Blocked_Text"),
dc=await aK("AdminCenter_UsersTabView_UserStatus_Invited_Text"),
dd=await aK("AdminCenter_UsersTabView_UserStatus_NotComplete_Text"),
de=await aK("AdminCenter_UsersTabView_UserStatus_Suspended_Text"),
df=await aK("AdminCenter_UsersTabView_UserStatus_Inactive_Text"),c0=await aK("Cmd_Delete_Flat"),cZ=await aK("HomeFolder")})),
ca=await dq(),cd=await du(),cg=await dY(),ck=await el(),cq=await eU(),cu=await eX(),bu(null)&&(cs=await async function(){
return ct=(0,o.ug)(aX,aZ,aN,a5,bH,aJ,{GetCompanyInfo:d2,GetAccountInfo:dn,GetCompanyGroups:cf.GetCompanyGroups,
GetGroupPolicyValue:fK,ShowModalDialog:fA,ShowNotification:fE,ShowSelectGroupsForSSO:dS,UploadCompanyPolicies:d0,
UploadGroupPolicies:d1}),ct.Create()}());const b=bk.GetActiveView(null);bQ=am("div",{
className:"dark"===a8(null)?"admin-center-view dark-theme":"admin-center-view light-theme",onclick:fx},bO=am("div",{
className:"settings"===b?"main-view settings-shown hidden":"main-view hidden"},b3=am(dk,null),b2=am("main",{
className:"main-section"},am(dl,null),b7=am("div",{className:"tab-views"},ca,cd,cg,ck,cq,bu(null)&&cs,cu,cz=am("section",{
className:"tab-view-search tab-view hidden"}),dm(),cE=am("section",{className:"tab-view tab-view-details hidden"
}),cI=am("section",{className:"tab-view tab-view-details hidden"}),cy=am("section",{
className:"tab-view tab-view-no-license hidden"})))),(a=>bR(a)?am("div",{className:"loading-view"},am("div",{
className:"action-progress-overlay-circle size64"})):[]),cN=am("div",{className:"edit-pane closed"},am("div",{
className:"resize-handle",onmousedown:fe})),cS=am(B.Eg,null),bP=am("div",{className:"logout-view hidden"
},await aK("AdminCenter_LoginToRoboForm_Text"))),b8.set("dashboard",ca),b8.set("users",cd),b8.set("groups",cg),
b8.set("data",ck),b8.set("policies",cq),b8.set("reports",cu),b8.set("search",cz),b8.set("user-details",cE),
b8.set("group-details",cI),b8.set("license-expired",cy),b9.set("dashboard",cb),b9.set("users",ce),b9.set("groups",ch),
b9.set("data",cl),b9.set("policies",cr),b9.set("reports",cv),bu(null)&&(b8.set("integration",cs),b9.set("integration",ct))
;return bQ},OnAfterShow:function(){var a;dh(),(0,af.fI)(async function(){if(!bu(null))return
;if(!a0||!await a0.GetValue("ShowCompanyOnboarding",!1))return;const a=await d2(!1,null);if(!a.trial)return;try{
await async function(){return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal onboarding-dialog","",null),(()=>(0,
x._3)((async(a,b)=>{
const c="https://help.roboform.com/hc/en-us/articles/28270326572941-New-User-Onboarding",d="https://help.roboform.com/hc/en-us/articles/115002550891-Group-Management",e="https://help.roboform.com/hc/en-us/articles/115004516567-Assigning-RoboForm-Files-to-Groups-Sharing",f="https://help.roboform.com/hc/en-us/articles/28270326572941-New-User-Onboarding#h_01JAGF2GMMEND7E6PZESK30BKY",g="https://help.roboform.com/hc/categories/8261143060493-Getting-Started"
;return am("div",{className:"content"},am("span",{className:"title"},await aK("AdminCenter_Onboarding_Title")),a2&&am("span",{
className:"text"},(0,B.ND)(await aK("AdminCenter_Onboarding_Install_Text"),[()=>am("a",{href:"#",className:"link",onclick:i
},aK("AdminCenter_Onboarding_Install_Link"))],(a=>am("span",null,a)))),am("span",{className:"text bold-text"
},await aK("AdminCenter_Onboarding_Text")),am("ul",{className:"links-list"},am("li",{className:"item"},am("a",{href:c,
className:"link",target:"_blank"},await aK("AdminCenter_Onboarding_AddUsers_Text"))),am("li",{className:"item"},am("a",{href:d,
className:"link",target:"_blank"},await aK("AdminCenter_Onboarding_AddGroups_Text"))),am("li",{className:"item"},am("a",{href:f,
className:"link",target:"_blank"},await aK("AdminCenter_Onboarding_Integration_Text"))),am("li",{className:"item"},am("a",{
href:e,className:"link",target:"_blank"},await aK("AdminCenter_Onboarding_AddData_Text")))),am("span",{className:"text"},(0,
B.ND)(await aK("AdminCenter_Onboarding_More_Text"),[()=>am("a",{href:g,className:"link",target:"_blank"
},aK("AdminCenter_Onboarding_More_Link"))],(a=>am("span",null,a)))),am("span",{className:"text"},(0,
B.ND)(await aK("AdminCenter_Onboarding_Support_Text"),[()=>am("span",{className:"link",onclick:h
},aK("AdminCenter_Onboarding_Support_Link"))],(a=>am("span",null,a)))),am("span",{className:"text"
},await aK("AdminCenter_Onboarding_Signature_Text")));function h(){(0,af.fI)(aO.ContactSupport({reportType:"ContactSupport"
},null))}function i(){const a=(0,V.m)(),b=`${window.location.origin+window.location.pathname}#instruction-browser=${a}`
;window.location.replace(b),window.location.reload()}}))))),null)}()}catch(b){(0,
ak.r5)(b,ak.kd)&&a0&&await a0.SetValue("ShowCompanyOnboarding",!1)}}()),(0,ah.TT)(b7).oncontextmenu=function(){return!1},
bk.AddOnHashChangeListener(dp),null===(a=aZ.onSyncSucceeded)||void 0===a||a.Add(fO),aJ.onLanguageTagChange.Add(fP)},
OnBeforeHide:function(){fb(),(0,ah.TT)(cS).Hide(),(0,ah.TT)(b7).oncontextmenu=null},Focus:function(){},Dispose:function(){var a
;cc.Clear(),cf.Clear(),null==cT||cT.Cancel(),cT=null,cD.Cancel(),cH.Cancel(),cC.Cancel(),bI.Cancel(),bz.Cancel(),bA.Cancel(),
bB.Cancel(),cp.Cancel(),bD.Cancel(),bE.Cancel(),bG.Cancel(),bC.Cancel(),a5.onEvent.Remove(fM),a4.onDataChanged.Remove(fN),
null===(a=aZ.onSyncSucceeded)||void 0===a||a.Remove(fO),aJ.onLanguageTagChange.Remove(fP),bk.UnInit()}};function dh(){by=!0,
bS(!1),(0,Y.SE)(bP),(0,Y.l5)(bO),document.body.classList.remove("dark-theme"),a6(null)&&bk.SetState({m_view:"license-expired"
},!0,!0),dp(bk.GetState()),e9(),fy(),by?((0,Y.SE)(bP),(0,Y.l5)(bO)):(0,af.fI)((async()=>{await fd(),fh(),(0,Y.SE)(bO),(0,
Y.l5)(bP),bS(!1),e4(),await aO.ShowLoginUI(null)})())}async function di(){if(!bg)try{const a=(0,R.v)(aw);await a.Init()
;const b=(0,Q.o)();await b.Init(a,a4),bg=b}catch(a){(0,ak.au)(a)}}async function dj(){if(!bh){const a=(0,S.N)(aw)
;await a.Init(),bh=a}}function dk(){return am("header",{className:"page-header"},function(){return async b=>{const c=a6(b)
;return am("a",{className:c?"header-logo disabled":"header-logo",onclick:b=>a(b,c),href:"#",title:"RoboForm"})};function a(a,b){
a.preventDefault(),b||("settings"===bk.GetActiveView(null)&&e0(),dr("dashboard"))}}(),function(){let a;return am("div",{
className:"search-query"},(async g=>{const h=bT(g),i=a6(g);return null!==h&&(0,af.C)((()=>null==a?void 0:a.focus())),am("div",{
className:"search-box dropdown-handler"},a=am("input",{type:"text",id:"main-search-input",className:"main-search-input",
placeholder:await aK("AdminCenter_Search_Placeholder"),value:null!=h?h:"",disabled:i,spellcheck:!1,onfocus:i?null:b,
oninput:i?null:c,onkeydown:i?null:d,onblur:i?null:e}),am("div",{className:"search-loop-icon"}),h&&(a=>am("div",{
className:"search-results-counter"},(0,ah.bf)(bV(a)))),h&&am("div",{className:"search-clear-query-icon",onclick:f}))}))
;function b(){e4()}function c(){cC.Start((async b=>{await(0,af.Gu)(bN,b,!1);const c=(0,ah.TT)(a).value.trim()
;if(!c)return bU(""),void fq();c!==bT(null)&&(bU(c),await fo(c,!0))}))}function d(a){switch(a.key){case al.U.ArrowUp:
case al.U.ArrowDown:case al.U.Enter:a.preventDefault(),a5.onSearchResultsNavigation.CallAllSync(a);break;case al.U.Escape:fq()}}
function e(){const a=bT(null);""===a&&null!==a&&bU(null)}function f(){fq()}}(),am("div",{className:"flex-cell"}),function(){
let a,b;return b1=am("div",{className:"fade-in-screen"}),async b=>{var e;const f=a6(b),j=bm(b),k=bo(b),l=c(bs(b));bX(b)&&l?(0,
Y.l5)(l):l&&(0,Y.SE)(l);let m=(null==j?void 0:j.name)||"Company",n="account-email",o=null;if(j&&j.logo){const a=(0,
ad.fI)(j.logo);o=await(0,ad.Z$)(a),m="",n=(0,ae.bt)(n," ","has-logo")}const p=(0,
g.QT)((null==k?void 0:k.name)||(null==j?void 0:j.name)||""),q=k?`initials round ${(0,
B.dy)(k.name||(null==j?void 0:j.name)||"")}`:"initials bg-color-default-blue";return am("div",{className:"account-view noselect"
},a=am("button",{className:f?"account-box dropdown-handler disabled":"account-box dropdown-handler",onclick:f?null:d,disabled:f
},am("div",{className:n,title:j?m:""},null!==(e=i(o))&&void 0!==e?e:m),am("div",{className:q},p)),l,h(),b1)};function c(a){
let c=bu(null);c&&"buy"!==a&&(c=!1);let d=!1;return am("div",{className:"account-menu dropdown-menu popup-menu hidden"
},(a=>am("div",{className:"item",onclick:e},am("div",{className:"icon icon-theme"}),am("span",{className:"text"
},aK("StartPage_DarkMode")),am("div",{className:"submenu-flexy-space"}),am(Z.Ig,{checked:"dark"===a8(a),onchange:()=>e
}))),am("div",{className:"item",onclick:g},am("div",{className:"icon icon-startpage"}),am("span",{className:"text"
},aK("AdminCenter_OpenStartPage"))),am("div",{className:"item",onclick:h},am("div",{className:"icon icon-settings"}),am("span",{
className:"text"},aK("Cmd_Settings_Flat"))),am("hr",{className:"separator"}),c&&am("div",{className:"item",onclick:i},am("div",{
className:"icon icon-upgrade"}),am("span",{className:"text highlight text-bold"},aK("AdminCenter_BuyNow_Text"))),b=am("div",{
className:"item submenu-item",onclick:j},am("div",{className:"icon icon-left icon-help"}),am("span",{className:"text"
},aK("Cmd_Help_Flat")),am("div",{className:"submenu-flexy-space"}),am("div",{className:"submenu-icon"})),am("hr",{
className:"separator"}),am("div",{className:"item",onclick:f},am("div",{className:"icon icon-logout"}),am("span",{
className:"text"},aK("Cmd_Logoff_Flat"))));function e(a){a.stopPropagation(),e6()}function g(){e4(),(0,
af.fI)(aO.OpenStartPage(null))}function h(){e4(),"settings"!==bk.GetActiveView(null)&&(0,af.fI)(eZ("general"))}function i(){
d||(e4(),(0,Y.D$)((async()=>{await aO.OpenPaymentPage({action:"buy"},null)}),(()=>(d=!0,()=>{d=!1})),null,null))}function j(a){
a.stopPropagation(),bZ(null)?b0(!1):k()}function k(){b0(!0)}}function d(a){bX(null)?e4():e(),a.stopPropagation()}function e(){
null==b1||b1.classList.add("fade-in"),bY(!0)}function f(){e4(),e5()}function h(){return a=>{const b=bZ(a),g=b?f():"0px"
;return am("div",{className:"account-menu help-submenu dropdown-menu popup-menu "+(b?"":"hidden"),style:{top:g}},am("div",{
className:"item",onclick:c},am("span",{className:"text"},aK("Cmd_Help_HelpCenter_Key"))),am("div",{className:"item",onclick:d
},am("span",{className:"text"},aK("Cmd_Help_ContactSupport_Key"))),am("hr",{className:"separator"}),am("div",{className:"item",
onclick:e},am("span",{className:"text"},aK("AdminCenter_About_Text"))))};function c(){(0,af.fI)(aP.OpenUrl({url:z.RS,newTab:!0,
reuseExisting:!1},null)),e4()}function d(){(0,af.fI)(aO.ContactSupport({reportType:"ContactSupport"},null)),e4()}function e(){
e4(),(0,af.fI)(g())}function f(){const c=b.getBoundingClientRect(),d=a.getBoundingClientRect();return(0,
V.Md)(c.y-d.y+c.height-4)}async function g(){return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal about-dialog",await aK("AboutPage_Title"),null),(()=>(0,x._3)((async(a,b)=>{
const c="Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.",d=(0,E.U)(),e=await aK("About_Version2"),f=(0,aa.KZ)()
;return am("div",{className:"content"},am("div",{className:"text"},e),am("div",{className:"text hint selectable"},d),am("div",{
className:"text hint selectable"},f),am("div",{className:"link-section"},am("a",{className:"roboform-link",href:z.l$,
target:"_blank"},"www.roboform.com"),am("span",{className:"hint-text copyright-text"},c)),am("div",{className:"buttons-bar"
},am("button",{className:"button default-button",onclick:()=>a()},await aK("Cmd_Ok_Flat"))))}))))),null)}}function i(a){
if(!a)return null;let b=a;b.startsWith("<")&&(b=b.substring(1)),b.endsWith(">")&&(b=b.substring(0,b.length-1));const c=new Map
;b.split(" ").forEach((a=>{const[b,d]=a.split("=");c.set(b,d)}));const d=c.get("src");if(!d)return null;const e=new Image
;return e.src=d.replace(/"/g,""),e}}())}function dl(){return am("aside",{className:"navigation",onmouseenter:a,
onmouseleave:function(){if(!b6)return;null==bQ||bQ.classList.remove("navigation-hovered")},onclick:a},function(){let a
;return async d=>{ba(d);const e=b4(d),f=a6(d);let g="button default-button";return f&&(g=(0,ae.bt)(g," ","disabled")),e&&(g=(0,
ae.bt)(g," ","selected")),am("div",{className:"create-container"},a=am("button",{className:g,title:await aK("Cmd_New_Flat"),
onclick:f?null:a=>b(a,e),onmousedown:f?null:a=>c(a,e),disabled:f},am("div",{className:"create-plus-icon"}),am("span",{
className:"text"},await aK("Cmd_New_Flat"))))};function b(b,c){if(c)fb(),b5(!1);else{
const b=a.getBoundingClientRect(),c=new DOMRect(b.left,b.bottom,0,0);d(a,c)}}function c(a,b){b&&a.stopPropagation()}
function d(a,b){function c(){b5(!0)}function d(){b5(!1)}fb(),dg=(0,A.Lj)(b,bu(null)?()=>e(null):()=>f(null),{
className:"with-triangle create-menu",onShow:c,onHide:d},(function(b,c){return(0,ah.TT)(bQ).style.width=(0,V.Md)(b),(0,
ah.TT)(bQ).style.height=(0,V.Md)(c),a.getBoundingClientRect()}),((a,b)=>(0,af.fI)(a(b,(0,af.f4)(null,null,null)))))}
async function e(a){const b=[];return b.push({title:await aK("AdminCenter_Role_User_Text"),imageClass:"cmd-user-icon",
type:"submenu",submenu:await dA()}),b.push({title:await aK("AdminCenter_Group_Text"),imageClass:"cmd-group-icon",
onCommand:async(a,b)=>{eb()}}),b.push({title:await aK("AdminCenter_Data_Tab_Button_Text"),imageClass:"cmd-data-icon",
type:"submenu",submenu:await et(!1,a)}),b}async function f(a){return et(!1,a)}}(),function(){return async d=>{
const e=bk.GetActiveTab(d),f=a6(d),g=bu(d);return am("nav",{className:"tab-selector unselectable",
oncontextmenu:a=>a.preventDefault()
},["dashboard","users","groups","data","policies","integration","reports"].map((async d=>g||"integration"!==d?am(u.Dg,{
iconClass:a(d),isActive:e===d,onClick:()=>dr(d),tooltip:await c(d),disabled:f},b(d)):am("fragment",null))),am("div",{
className:"flex-cell"}))};function a(a){switch(a){case"dashboard":return"icon-dashboard";case"users":return"icon-users"
;case"groups":return"icon-groups";case"data":return"icon-data";case"policies":return"icon-policies";case"integration":
return"icon-integration";case"reports":return"icon-reports";default:return""}}async function b(a){switch(a){case"dashboard":
return aK("AdminCenter_Dashboard_Text");case"users":return aK("AdminCenter_Users_Text");case"groups":
return aK("AdminCenter_Groups_Text");case"data":return aK("AdminCenter_Data_Tab_Button_Text");case"policies":
return aK("AdminCenter_Policies_Tab_Button_Text");case"integration":return aK("AdminCenter_Integration_Tab_Button_Text")
;case"reports":return aK("AdminCenter_Reports_Tab_Button_Text");default:return""}}async function c(a){switch(a){case"dashboard":
return aK("AdminCenter_Dashboard_Tab_Button_Tip");case"users":return aK("AdminCenter_Users_Tab_Button_Tip");case"groups":
return aK("AdminCenter_Groups_Tab_Button_Tip");case"data":return aK("AdminCenter_Data_Tab_Button_Tip");case"policies":
return aK("AdminCenter_Policies_Tab_Button_Tip");case"integration":return aK("AdminCenter_Integration_Tab_Button_Tip")
;case"reports":return aK("AdminCenter_Reports_Tab_Button_Tip");default:return""}}}(),function(){return async c=>{
if(!bu(c))return[];const d=a6(c),e=bq(c),f=e?await e3(null):"buymore";return"buymore"===f||d?[]:am("div",{
className:"upgrade-message flex-row"},am("div",{className:"content flex-cell"},am("div",{className:"message"},am("div",{
className:"icon"}),am("span",null,(0,ae.SI)(await aK("UpgradeMessage_RoboFormEnterpriseTrialExpires"),"%1").before),am("span",{
className:"date"},(0,ai.Io)((null==e?void 0:e.expirationTime)||0,ba(c))),am("span",null,(0,
ae.SI)(await aK("UpgradeMessage_RoboFormEnterpriseTrialExpires"),"%1").after)),am("div",{className:"links-row flex-row"
},am("a",{className:"learn-more link",href:"#",onclick:a},await aK("UpgradeMessage_LearnMore")),am("div",{
className:"links-separator"}),am("a",{className:"upgrade link",href:"#",onclick:a=>b(a,f)
},"expired"===(null==e?void 0:e.status)?await aK("AdminCenter_SettingsView_RenewNow_Text"):await aK("AdminCenter_BuyNow_Text")))))
};function a(a){a.preventDefault(),(0,Y.PQ)((async()=>{await aP.OpenUrl({url:z.Nd,newTab:!0,reuseExisting:!0},null)
}),(()=>()=>{}),0,null,(a=>{(0,ak.au)(a),(0,ak.r5)(a,ak.kd)||fE((0,z.Qo)(a),null,2)}))}function b(a,b){a.preventDefault(),(0,
Y.PQ)((async()=>{const a=(0,af.f4)(null,null,null);await aq.OpenPaymentPage({action:b},a)}),(()=>()=>{}),0,null,(a=>{(0,
ak.au)(a),(0,ak.r5)(a,ak.kd)||fE((0,z.Qo)(a),5,2)}))}}(),function(){
const a="https://www.roboform.com/license",b="https://www.roboform.com/privacy-policy",c="https://help.roboform.com/hc/categories/203879687-RoboForm-for-Business"
;return am("div",{className:"copyright"},am("span",{className:"text"},aK("AdminCenter_Copyright_Text")),am("div",{
className:"links"},am("a",{href:a,target:"_blank",className:"link"
},aK("AdminCenter_LicenseAgreement_Text")),am("span",null," - "),am("a",{href:b,target:"_blank",className:"link"
},aK("AdminCenter_PrivacyPolicy_Text")),am("span",null," - "),am("a",{href:c,target:"_blank",className:"link"
},aK("Cmd_Help_HelpCenter_Flat"))))}());function a(){b6&&(null==bQ||bQ.classList.add("navigation-hovered"))}}function dm(){
return async a=>"settings"!==bk.GetActiveView(a)?(cw&&(null==bO||bO.classList.remove("settings-shown"),null==cw||cw.Dispose(),
cw=null),[]):(cw=(0,n.N)(aN,aX,aZ,aO,aS,aR,a5,bg,bj,bk,bH,bw,a1,{GetAccountInfo:bo,GetCompanyInfo:bm,GetLicenseInfo:bq,
CloseCompanySettingsView:e0,GetCompanyPolicyValue:fF,GetCompanyPoliciesValues:fG,GetColorTheme:a8,GetLanguageTag:ba,
IsCurrentUserAdmin:bu,LogoutAction:e5,ShowNotification:fE,ShowModalDialog:fA,ShowConfirmationDialog:ej,UpdateCompanyInfo:e8,
UpdateColorTheme:e6,UpdateLicenseInfo:e2},aJ),by&&bO.classList.add("settings-shown"),am("section",{
className:"tab-view tab-view-settings"},cw.Create()))}async function dn(a,b){return bl&&!a||(bl=await bA.Execute({
action:async a=>{var b;let c=null;return bx||(c=await aZ.GetRoboFormAccountInfo(a),bx=null!==(b=c.accountId)&&void 0!==b?b:""),
c=await aN.GetAccountInfo(bx,a),c}},b),bp(bl)),bl}function dp(a){if(a6(null))return bk.SetState({m_view:"license-expired"
},!0,!0),void dt();"settings"===bk.GetActiveView(null)&&"settings"!==a.m_view&&e0(),
"search"===bk.GetActiveView(null)&&"search"!==a.m_view&&fq(),(0,af.fI)((async()=>{switch(a.m_view){case"dashboard":ds(!1);break
;case"users":dv(!1);break;case"groups":dZ(!1);break;case"data":em(!1);break;case"policies":{let b=null
;"security-and-access"!==a.m_tab&&"roboform-data"!==a.m_tab&&"user-settings"!==a.m_tab||(b=a.m_tab),eV(!1,b);break}
case"integration":eW(!1);break;case"reports":{let b=null
;"company"!==a.m_tab&&"users"!==a.m_tab&&"groups"!==a.m_tab||(b=a.m_tab),bu(null)||"company"!==b||(b="groups"),eY(!1,b||null)
;break}case"settings":{let b=a6(null)?"license":"general"
;"license"!==a.m_tab&&"general"!==a.m_tab&&"account"!==a.m_tab||(b=a.m_tab),await eZ(b);break}case"user-details":if(a.m_id){
const b=(await cc.GetCompanyMembers(!1,(0,af.f4)(null,null,null))).find((b=>b.id===a.m_id));if(b){let c="groups"
;"groups"!==a.m_tab&&"files"!==a.m_tab&&"security"!==a.m_tab&&"devices"!==a.m_tab&&"activity"!==a.m_tab&&"account"!==a.m_tab&&"policies"!==a.m_tab||(c=a.m_tab),
dW((0,g.VK)(b),c)}else dv(!0)}else dv(!0);break;case"group-details":if(a.m_id){const b=(await cf.GetCompanyGroups(!1,(0,
af.f4)(null,null,null))).find((b=>b.id===a.m_id));if(b){let c="users"
;"users"!==a.m_tab&&"details"!==a.m_tab&&"files"!==a.m_tab&&"backups"!==a.m_tab&&"security"!==a.m_tab&&"policies"!==a.m_tab||(c=a.m_tab),
eg((0,h.wj)(b,await(0,h.NH)(b)),c)}else dZ(!0)}else dZ(!0);break;case"search":a.m_query?(bU(a.m_query),
await fo(a.m_query,!1)):ds(!1);break;case"license-expired":a6(null)?dt():ds(!1)}})())}async function dq(){return cb=(0,
q.y)(cc,cf,aX,aY,aO,a5,a4,a0,{AddIntegration:()=>dr("integration"),GetAccountInfo:dn,GetSecurityReport:eS,
GetAddDataDropdownCommands:et,GetAddUserDropdownCommands:dA,GetCompanyPolicyValue:fF,GetCompanyLicenseInfo:e1,GetLicenseInfo:bq,
GetGroupPolicyValue:fK,GetGroupSecurityReport:eR,IsCurrentUserAdmin:bu,OpenReportsTabAndNavigateToSection:fw,ShowUsersView:fs,
ShowGroupsView:ft,ShowDataView:fu,ShowReportsView:eY,ShowCreateGroupDialog:eb,ShowCompanySettingsView:eZ},aJ),cb.Create()}
function dr(a){if(by&&bk.GetActiveView(null)!==a)switch(a){case"dashboard":ds(!0);break;case"users":dv(!0);break;case"groups":
dZ(!0);break;case"data":em(!0);break;case"policies":eV(!0,null);break;case"integration":eW(!0);break;case"reports":eY(!0,null)}}
function ds(a){"dashboard"!==bk.GetActiveView(null)&&(bk.SetState({m_view:"dashboard"},a,!1),cb.OnAfterShow(),e9())}
function dt(){cB||cx.Start((async()=>{cB=(0,t.M)(aO,aN,a5,{GetLicenseInfo:bq,IsCurrentUserAdmin:bu,ShowNotification:fE},aJ)
;const a=await cB.Create();cy.appendChild(a),cB.OnAfterShow()}))}async function du(){return ce=(0,l.q$)(cc,cf,aR,aS,aZ,a5,bx,{
CreateUserDialog:dI,GetListOfCommandsForUser:dB,GetLanguageTag:ba,IsCurrentUserAdmin:bu,IsRemoveFromGroupShown:dG,
ShowUserMainView:dW,ShowModalDialog:fA,ShowNotification:fE,ShowAddUsersToGroupsDialog:dQ,ShowRemoveUsersFromGroupsDialog:dP,
ShowDeleteUserDialog:dJ,ShowSuspendUserDialog:dK,ShowRestoreUserDialog:dL,ShowResendToUserSetupInstructionsDialog:dH},aJ),
ce.Create()}function dv(a){"users"!==bk.GetActiveView(null)&&(bk.SetState({m_view:"users"},a,!1),ce.OnAfterShow(),e9())}
function dw(a,b){switch(a){case 0:return da;case 1:return db;case 2:return dc;case 4:return dd;case 5:return de;case 3:
return b?df:da;default:return"unknown user status"}}function dx(a){return a>g._j?c5:a>g.EZ?c6:a>g.jo?c7:c8}function dy(a){
switch((0,L.AY)(a)){case 4:return c4;case 3:return c3;case 2:return c2;case 1:case 0:return c1;default:return c9}}
function dz(a){return bx===a}async function dA(){const a=[];return a.push({
title:await aK("AdminCenter_UsersTabView_CreateUser_Title_Text"),imageClass:"cmd-create-user-icon",onCommand:async(a,b)=>{
await dI(b)}}),a.push("separator"),a.push({title:await aK("AdminCenter_UsersTabView_ImportUsers_Title_Text"),
imageClass:"cmd-import-users-icon",onCommand:async(a,b)=>{var c,d,e,f
;const g=await e1(!1,b),h=null!==(d=null===(c=null==g?void 0:g.company)||void 0===c?void 0:c.numberOfUsers)&&void 0!==d?d:0,j=(null!==(f=null===(e=null==g?void 0:g.company)||void 0===e?void 0:e.numberOfLicenses)&&void 0!==f?f:30)-h
;if(await fL(b))return void await ei(b);const k=await async function(a,b){return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal import-users-dialog",await aK("AdminCenter_UsersTabView_ImportUsers_Title_Text"),null),(()=>(0,
i.lY)(a,a3,aL,aJ)))),b)}(j,b);if(null!==k){if(k){const a=await async function(a,b){const c=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal users-import-progress-dialog",await aK("AdminCenter_UsersTabView_ImportUsers_Title_Text"),null),(b=>(0,
i.W9)(a,bw,aX,aJ,b))));return fA(c,b)}(k,b);if(a){const b=[];if(a.m_users_created.length>0){
const c=a.m_users_created.filter((a=>a.accountId)).map((a=>(0,ah.TT)(a.accountId)));b.push({event:0,id:c})}
if(a.m_groups_created.length>0){const c=a.m_groups_created.filter((a=>a.id)).map((a=>(0,ah.TT)(a.id)));b.push({event:6,id:c})}
b.length&&a5.onEvent.CallAllSync(b),await async function(a){const b=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal users-import-report-dialog",await aK("AdminCenter_UsersTabView_ImportUsers_Title_Text"),null),(()=>(0,
i.zs)(a,aJ))));return fA(b,null)}(a)}}}else await aO.OpenPaymentPage({action:"buymore"},b)}}),a.push({
title:await aK("AdminCenter_Integration_Tab_Button_Text"),imageClass:"cmd-integration-icon",onCommand:async(a,b)=>{eW(!0)}}),
a.push({title:await aK("AdminCenter_UsersTabView_JoinUser_Title_Text"),imageClass:"cmd-join-user-icon",onCommand:async(a,b)=>{
if(await fL(b))return void await ei(b);const c=await async function(a){const b=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal join-user-dialog",await aK("AdminCenter_UsersTabView_JoinUser_Title_Text"),null),(a=>(0,g.JJ)(bw,aX,aJ,a))))
;return fA(b,a)}(b);c&&(a5.onEvent.CallAllSync([{event:0}]),fE(await aK("Notification_User_Invited_Text",[c]),null,null))}}),a}
async function dB(a){const b=[],c=(0,af.f4)(null,null,null),d=bu(null);let e=!1
;const f=await aX.GetMemberGroups(a.m_id,1,c),h="number"==typeof f?f:f.length,i=await async function(a,b){
const c=await cf.GetCompanyGroups(!1,b);if(c.length===a)return!1;return!0}(h,c),j=dF(h),k=j&&(d||a.m_id!==bx&&!a.m_isAdmin)
;return await dD(a,b),(d||i||k)&&b.push("separator"),i&&(await async function(a,b){b.push({
title:await aK("AdminCenter_AddToGroups_Text"),imageClass:"cmd-add-user-to-group-icon",onCommand:async(b,c)=>{await dR(a,c)}})
}(a,b),e=!!d),k&&(await async function(a,b){b.push({title:await aK("AdminCenter_UsersTabView_RemoveFromGroups_Button_Text"),
imageClass:"cmd-remove-user-from-group-icon",onCommand:async(b,c)=>{await async function(a,b){const c=await async function(a,b){
const c=await aK("AdminCenter_GroupsTabView_Permissions_Regular_Text"),d=await aK("AdminCenter_GroupsTabView_Permissions_Limited_Text"),e=await aK("AdminCenter_Role_Admin_Text"),f=await aK("AdminCenter_GroupsTabView_StorageType_Server_Text"),g=await aK("AdminCenter_GroupsTabView_StorageType_Synced_Text"),h={
translations:{text:await aK("AdminCenter_UsersTabView_AddUserToGroup_SingleUser_Text",[a.m_name||a.m_email]),
search_placeholder:await aK("AdminCenter_Search_By_Name_Placeholder"),cancel_btn:await aK("Cmd_Cancel_Flat"),
ok_btn:await aK("AdminCenter_Remove_Text")},fields:[{key:"name",label:await aK("AdminCenter_Group_Name_Text"),sortable:!0,
width_multiplier:2},{label:await aK("AdminCenter_GroupsTabView_Storage_Text"),key:i,muted:!0},{
label:await aK("AdminCenter_GroupsTabView_Permissions_Text"),key:j,muted:!0}],allow_initial:!0,on_ok_callback:l};function i(a){
return a.serverOnly?f:g}function j(b){return a.m_isAdmin?e:b.readOnly?d:c}return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal user-add-remove-groups-dialog dialog-with-list",await aK("AdminCenter_UsersTabView_RemoveFromGroup_Button_Text"),null),(()=>(0,
s.F)(k,[],h,aJ)))),b);async function k(){
const c=await cf.GetCompanyGroups(!1,b),d=(await aX.GetMemberGroups(a.m_id,null,b)).filter((a=>!a.disabled))
;return c.filter((a=>d.some((b=>b.accountId===a.id))))}async function l(c){const d=c.map((a=>a.id))
;await cc.RemoveUsersFromGroups([a.m_id],d,b)}}(a,b);if(c.length>0)return a5.onEvent.CallAllSync([{event:4,
id:[a.m_id,...c.map((a=>a.id))]}]),fE(await aK("Notification_Users_Delete_From_Groups_Text"),null,null),!0;return!1}(a,c)}})
}(a,b),e=!0,e=!!d),d||j?(e&&b.push("separator"),e=!1,d&&(0,g.FG)(a)&&(await async function(a,b){b.push({
title:await aK("AdminCenter_UsersTabView_ResendInvitation_Text"),imageClass:"cmd-resend-instructions-icon",
onCommand:async(b,c)=>{await async function(a,b){const c=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal",await aK("AdminCenter_UsersTabView_ResendInvitation_Text"),null),(b=>(0,g.LF)(a,bw,aX,aJ,b))))
;return fA(c,b)}(a,c)}})}(a,b),e=!0),d&&(0,g.fH)(a)&&(await async function(a,b){b.push({
title:await aK("AdminCenter_ResendUserInstructions_Text"),imageClass:"cmd-resend-instructions-icon",onCommand:async(b,c)=>{
await dH([a],c)}})}(a,b),e=!0),d&&(0,g.AX)(a)&&(a.m_suspended?await async function(a,b){b.push({
title:await aK("AdminCenter_SuspendUser_Restore_Text"),imageClass:"cmd-user-restore-icon",onCommand:async(b,c)=>{await dL([a],c)
}})}(a,b):await async function(a,b){b.push({title:await aK("AdminCenter_SuspendUser_Suspend_Text"),
imageClass:"cmd-user-suspend-icon",onCommand:async(b,c)=>{await dK([a])}})}(a,b),e=!0),(0,
g.Kn)(a)&&d&&(await async function(a,b){b.push({title:await aK("AdminCenter_UnblockUser_Unblock_Text"),
imageClass:"cmd-user-unblock-icon",onCommand:async(b,c)=>{await dM(a,c)}})}(a,b),e=!0),
a.m_is_not_complete||dz(a.m_id)||!bu(null)||(await async function(a,b){b.push({
title:await aK("AdminCenter_UsersTabView_ResetMasterPassword_Text"),imageClass:"cmd-reset-password-icon",onCommand:async(b,c)=>{
if(!await ej(await aK("AdminCenter_UsersTabView_ResetMasterPassword_Text"),await aK("AdminCenter_UserTabView_ResetMPConfirmation_Text"),await aK("Cmd_Cancel_Flat"),await aK("AdminCenter_UserTabView_ResetPassword_Button_Text")))return
;const d=await aX.SendResetMasterPasswordEmail(a.m_id,c);if(d.success){
fE(await aK("AdminCenter_UserTabView_SuccessfulResetMPLinkSent_Text",[a.m_email]),null,null)
}else fE(d.errorMessage||await aK("AdminCenter_UserTabView_ErrorResetMPLinkSent_Text"),null,2)}})}(a,b),e=!0),
!d||a.m_is_not_complete||dz(a.m_id)||(await async function(a,b){b.push({title:await aK("AdminCenter_ConvertToPersonal_Text"),
imageClass:"cmd-convert-to-personal-icon",onCommand:async(b,c)=>{await dO(a,c)}})}(a,b),e=!0),
d&&!(a.m_is_not_complete||a.m_suspended||dz(a.m_id))&&(await async function(a,b){b.push({
title:a.m_isAdmin?await aK("AdminCenter_MakeAsAdmin_RevokeAdmin_Text"):await aK("AdminCenter_MakeAsAdmin_MakeAdmin_Text"),
imageClass:"cmd-make-admin-icon",onCommand:async(b,c)=>{await dN(a,c)}})}(a,b),e=!0),d&&!dz(a.m_id)&&(e&&b.push("separator"),
b.push({title:c0,imageClass:"cmd-delete-icon",onCommand:async(b,c)=>{await dJ([a],c)}})),b):b}async function dC(a,b,c){
const d=[];return await dE(a,b,d),d.push("separator"),c&&(await ea(b,a,c,d),d.push("separator")),await dD(a,d),d}
async function dD(a,b){b.push({title:await aK("AdminCenter_UsersTabView_UserDetails_Text"),imageClass:"cmd-user-details",
onCommand:async()=>{dW(a,"groups")}})}async function dE(a,b,c){c.push({
title:await aK("AdminCenter_UsersTabView_RemoveFromGroup_Button_Text"),imageClass:"cmd-remove-user-from-group-icon",
onCommand:async(c,d)=>{await dT(a,[b],d)}})}function dF(a){return a>0}async function dG(a,b){for(const c of a){
if(null==b||b.ThrowIfShouldStop(),!bu(null)&&(c.m_isAdmin||c.m_id===bx))return!1;let a=await aX.GetMemberGroups(c.m_id,null,b)
;if("number"==typeof a)throw(0,ak.ZU)(ak.V2,"The return value shouldn't be a number");if(a=a.filter((a=>!a.disabled)),
a.length>0)return!0}return!1}async function dH(a,b){if(await async function(a,b){const c=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal",await aK("AdminCenter_ResendUserInstructions_Text"),null),(b=>(0,g.lK)(a,aX,aJ,aL,b))));return fA(c,b)
}(a,b)){
return fE(1===a.length?await aK("Notification_User_ResendInstructions_Text",[a[0].m_name||a[0].m_email]):await aK("Notification_Users_ResendInstructions_Text",[a.length.toString()]),null,null),
!0}return!1}async function dI(a){if(await fL(a))return void await ei(a);const b=await async function(a){const b=(0,y.Sw)((0,
ah.TT)(bQ),(0,
y.p)((0,y.dK)("dialog-modal create-user-dialog",await aK("AdminCenter_UsersTabView_CreateUser_Title_Text"),null),(a=>(0,
g.R9)(bw,aX,aJ,aL,a))));return fA(b,a)}(a);if(b){a5.onEvent.CallAllSync([{event:0}]),
fE(await aK("Notification_User_Created_Text",[b]),null,null);const c=await aX.GetCompanyMembers(bw,{doPost:!0,filter:b,
fields:"+accessDate, +securityStats, +isManager"},a);if("number"!=typeof c&&c[0]){dW((0,g.VK)(c[0]),"groups")}}}
async function dJ(a,b){const c=await async function(a,b){const c=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal delete-user-dialog",await aK("Cmd_Delete_Flat"),null),(b=>(0,g.Mh)(a,bw,aX,aJ,b))));return fA(c,b)}(a,b)
;if(c){a5.onEvent.CallAllSync([{event:2}])
;fE(1===a.length?await aK("Notification_User_Deleted_Text",[a[0].m_name||a[0].m_email]):await aK("Notification_Users_Deleted_Text",[a.length.toString()]),null,null)
}return c}async function dK(a){if(await async function(a){const b=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal suspend-user-dialog",await aK("AdminCenter_SuspendUser_Suspend_Text"),null),(b=>(0,g.pw)(a,aX,aJ,b))))
;return fA(b,null)}(a)){a5.onEvent.CallAllSync([{event:1,id:a.map((a=>a.m_id))}])
;return fE(1===a.length?await aK("Notification_User_AccountSuspend_Text",[a[0].m_name||a[0].m_email]):await aK("Notification_Users_AccountSuspend_Text",[a.length.toString()]),null,null),
!0}return!1}async function dL(a,b){if(await async function(a,b){const c=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal",await aK("AdminCenter_SuspendUser_Restore_Text"),null),(b=>(0,g.Po)(a,aX,aJ,b))));return fA(c,b)}(a,b)){
a5.onEvent.CallAllSync([{event:1,id:a.map((a=>a.m_id))}])
;return fE(1===a.length?await aK("Notification_User_AccountRestore_Text",[a[0].m_name||a[0].m_email]):await aK("Notification_Users_AccountRestore_Text",[a.length.toString()]),null,null),
!0}return!1}async function dM(a,b){return!!await async function(a,b){const c=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal",await aK("AdminCenter_UnblockUser_Unblock_Text"),null),(b=>(0,g.$$)(a,aX,aJ,b))));return fA(c,b)
}(a,b)&&(a5.onEvent.CallAllSync([{event:1,id:[a.m_id]
}]),fE(await aK("Notification_User_AccountUnblock_Text",[a.m_name||a.m_email]),null,null),!0)}async function dN(a,b){
return!!await async function(a,b){
const c=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal make-user-admin-dialog",a.m_isAdmin?aK("AdminCenter_MakeAsAdmin_RevokeAdmin_Text"):aK("AdminCenter_MakeAsAdmin_MakeAdmin_Text"),null),(b=>(0,
g.dv)(a,bw,aX,aJ,b))));return fA(c,b)}(a,b)&&(a5.onEvent.CallAllSync([{event:1,id:[a.m_id]}]),!0)}async function dO(a,b){
return!!await async function(a,b){
const c=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal convert-to-personal-dialog",await aK("AdminCenter_ConvertToPersonal_Text"),null),(b=>(0,
g.n8)(a,bw,aX,aJ,b))));return fA(c,b)}(a,b)&&(a5.onEvent.CallAllSync([{event:2}]),
fE(await aK("Notification_User_ConvertToPersonal_Text",[a.m_name||a.m_email]),null,null),!0)}async function dP(a,b){
const c=await async function(a,b){
const c=await aK("AdminCenter_GroupsTabView_Permissions_Regular_Text"),d=await aK("AdminCenter_GroupsTabView_Permissions_Limited_Text"),e=await aK("AdminCenter_GroupsTabView_StorageType_Server_Text"),f=await aK("AdminCenter_GroupsTabView_StorageType_Synced_Text"),g={
translations:{text:await aK("AdminCenter_UsersTabView_RemoveUsersFromGroups_Warning",[a.length.toString()]),
search_placeholder:await aK("AdminCenter_Search_By_Name_Placeholder"),cancel_btn:await aK("Cmd_Cancel_Flat"),
ok_btn:await aK("AdminCenter_UsersTabView_RemoveFromGroup_Button_Text")},fields:[{label:await aK("AdminCenter_Group_Name_Text"),
sortable:!0,key:h,width_multiplier:2},{label:await aK("AdminCenter_GroupsTabView_Storage_Text"),key:i,muted:!0},{
label:await aK("AdminCenter_GroupsTabView_Permissions_Text"),key:j,muted:!0}],allow_initial:!0,on_ok_callback:l};function h(a){
return a.name}function i(a){return a.serverOnly?e:f}function j(a){return a.readOnly?d:c}const k=(0,y.Sw)((0,ah.TT)(bQ),(0,
y.p)((0,
y.dK)("dialog-modal user-add-remove-groups-dialog dialog-with-list",await aK("AdminCenter_UsersTabView_RemoveUsersFromGroups_Title_Text"),null),(()=>(0,
s.F)(b,[],g,aJ))));return fA(k,null);async function l(b){const c=a.map((a=>a.m_id)),d=b.map((a=>a.id))
;await cc.RemoveUsersFromGroups(c,d,null)}}(a,b);return c.length>0&&(a5.onEvent.CallAllSync([{event:4,
id:[...a.map((a=>a.m_id)),...c.map((a=>a.id))]}]),fE(await aK("Notification_Users_Delete_From_Groups_Text"),null,null),!0)}
async function dQ(a,b,c){return!!await async function(a,b,c){
const d=await aK("AdminCenter_GroupsTabView_Permissions_Regular_Text"),e=await aK("AdminCenter_GroupsTabView_Permissions_Limited_Text"),f=await aK("AdminCenter_GroupsTabView_StorageType_Server_Text"),g=await aK("AdminCenter_GroupsTabView_StorageType_Synced_Text"),h={
translations:{text:await aK("AdminCenter_UsersTabView_AddUsersToGroups_Warning",[a.length.toString()]),
search_placeholder:await aK("AdminCenter_Search_By_Name_Placeholder"),cancel_btn:await aK("Cmd_Cancel_Flat"),
ok_btn:await aK("AdminCenter_AddToGroup_Text")},fields:[{key:"name",label:await aK("AdminCenter_Group_Name_Text"),sortable:!0,
width_multiplier:2},{label:await aK("AdminCenter_GroupsTabView_Storage_Text"),key:i,muted:!0},{
label:await aK("AdminCenter_GroupsTabView_Permissions_Text"),key:j,muted:!0}],allow_initial:!0,on_ok_callback:l};function i(a){
return a.serverOnly?f:g}function j(a){return a.readOnly?e:d}const k=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal user-add-remove-groups-dialog dialog-with-list",await aK("AdminCenter_AddUsersToGroups_Text"),null),(()=>(0,
s.F)((()=>b),[],h,aJ))));return fA(k,c);async function l(b){const d=a.map((a=>a.m_id)),e=b.map((a=>a.id))
;await cc.AddUsersToGroups(d,e,{serverOnly:null,readOnly:null,showPasswords:null,manager:!1},c)}
}(a,b,c)&&(a5.onEvent.CallAllSync([{event:3,id:[...a.map((a=>a.m_id)),...b.map((a=>a.id))]}]),
fE(await aK("Notification_Users_Added_To_Groups_Text"),null,null),!0)}async function dR(a,b){const c=await async function(a,b){
const c=await aK("AdminCenter_GroupsTabView_Permissions_Regular_Text"),d=await aK("AdminCenter_GroupsTabView_Permissions_Limited_Text"),e=await aK("AdminCenter_Role_Admin_Text"),f=await aK("AdminCenter_GroupsTabView_StorageType_Server_Text"),g=await aK("AdminCenter_GroupsTabView_StorageType_Synced_Text"),h={
translations:{text:await aK("AdminCenter_UsersTabView_AddUserToGroup_SingleUser_Text",[a.m_name||a.m_email]),
search_placeholder:await aK("AdminCenter_Search_By_Name_Placeholder"),cancel_btn:await aK("Cmd_Cancel_Flat"),
ok_btn:await aK("AdminCenter_Add_Button_Text")},fields:[{key:"name",label:await aK("AdminCenter_Group_Name_Text"),sortable:!0,
width_multiplier:2},{label:await aK("AdminCenter_GroupsTabView_Storage_Text"),key:i,muted:!0},{
label:await aK("AdminCenter_GroupsTabView_Permissions_Text"),key:j,muted:!0}],allow_initial:!0,on_ok_callback:k};function i(a){
return a.serverOnly?f:g}function j(b){return a.m_isAdmin?e:b.readOnly?d:c}return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal user-add-remove-groups-dialog dialog-with-list",await aK("AdminCenter_AddToGroup_Text"),null),(()=>(0,
s.F)(l,[],h,aJ)))),b);async function k(c){const d=c.map((a=>a.id));await cc.AddUsersToGroups([a.m_id],d,{serverOnly:null,
readOnly:null,showPasswords:null,manager:!1},b)}async function l(){
const c=await cf.GetCompanyGroups(!1,b),d=(await aX.GetMemberGroups(a.m_id,null,b)).filter((a=>!a.disabled))
;return c.filter((a=>!d.some((b=>b.accountId===a.id))))}}(a,b);return!!c.length&&(a5.onEvent.CallAllSync([{event:3,
id:[a.m_id,...c.map((a=>a.id))]}]),fE(await aK("Notification_Users_Added_To_Groups_Text"),null,null),!0)}
async function dS(a,b,c,d){return async function(a,b,c,d){const e=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal user-add-remove-groups-dialog dialog-with-list",await aK("AdminCenter_IntegrationView_SSO_Group_Select_Dialog_Title"),null),(()=>(0,
s.F)((()=>a),b,c,aJ))));return fA(e,d)}(a,b,c,d)}async function dT(a,b,c){return!!await async function(a,b,c){
const d=b.length>1?await aK("AdminCenter_UsersTabView_RemoveFromGroups_Button_Text"):await aK("AdminCenter_UsersTabView_RemoveFromGroup_Button_Text"),e=(0,
y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal exclude-single-user-modal",d,null),(c=>(0,g.v_)(a,b,aJ,{
RemoveUsersFromGroups:cc.RemoveUsersFromGroups},c))));return fA(e,c)}(a,b,c)&&(a5.onEvent.CallAllSync([{event:4,
id:[a.m_id,...b.map((a=>a.m_id))]}]),fE(await aK("Notification_Users_Delete_From_Groups_Text"),null,null),!0)}
async function dU(a,b,c){return!!await async function(a,b,c){const d=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal",await aK("AdminCenter_UsersTabView_RemoveFromGroup_Button_Text"),null),(c=>(0,h.jA)(b,a,aJ,{
RemoveUsersFromGroups:cc.RemoveUsersFromGroups},c))));return fA(d,c)}(a,b,c)&&(a5.onEvent.CallAllSync([{event:4,
id:[b.m_id,...a.map((a=>a.m_id))]}]),fE(await aK("Notification_Users_Delete_From_Groups_Text"),null,null),!0)}
async function dV(a,c){
const d=aJ.LocalizeString,e=(0,G.em)(a.path),f=a.sharedGroup||!1,g=a.received||!1,h=await aR.GetValue("AccountCompanyAdmin",!1),i=await aR.GetValue("AccountEnterprise",!1),j=h&&!g,k=function(a,b,c,d,e,f){
let g=null,h=[],i=null
;return(0,F.Tu)(!a.sharedFolder,b.is_admin,b.is_group,b.disable_outside_sharing,b.converting_to_group,b.is_enterprise_user,b.logged_in_user_id,f,e,(0,
ah.TT)(bQ),{GetItemInfo:()=>a,GetSharedAccountInfo:()=>g,GetSharedAccountRecipients:()=>h,GetSharedAccountCreator:()=>i,
GetKnownRecipients:async()=>b.is_group||b.disable_outside_sharing?j():c.GetKnownRecipients(null),OnLoad:async()=>{
a.sharedFolder&&await k()},OnChangeRecipientPermission:async(b,d)=>{async function e(b,d){const f={manager:4===d,readOnly:2===d,
showPasswords:2!==d};try{await c.GrantSharedFolder(a.path,b,f,null)}catch(g){if((0,ak.r5)(g,ak.m))return void await e(b,d)
;throw g}}await e(b,d)},OnAddRecipient:async(b,d,e)=>{const f={manager:4===d,readOnly:2===d,showPasswords:2!==d,
inviteIfDoesntExist:e};await c.GrantSharedFolder(a.path,b,f,null),await k()},OnRemoveRecipient:async b=>{
await c.RevokeSharedFolder(a.path,b,null),await k()},OnShareExistingFolder:async d=>{await c.ShareExistingFolder((0,
G.XE)(d,!0),null),a=Object.assign(Object.assign({},a),{granted:!0,sharedFolder:!0,sharedGroup:b.converting_to_group})},
OnStopSharingForAll:async()=>{await c.StopSharingFolder(a.path,null)},OnReject:async b=>{
await c.RejectSharedFolder(a.path,null),b()},OnDelete:async b=>{await c.DeleteSharedFolder(a.path,null),b()},
GetSharingStatusDescription:m});async function j(){
const a=await c.GetKnownRecipients(null),b=(await e.GetRoboFormAccountInfo(null)).companies,f=b&&b.length>0?b[0]:null
;if(!f||!f.companyId)return a;const g=await d.GetCompanyMembers(f.companyId,{doPost:!0},null);if(!g||!(0,ah.QS)(g))return a
;return a.filter((a=>g.find((b=>b.id===a.accountId))))}async function k(){try{await l()}catch(a){if((0,
ak.r5)(a,ak.m))return void await k();throw a}}async function l(){
const b=await c.GetSharedFolderInfoAndRecipients(a.path,!0,null);g=b.info,h=b.recipients;const d=h.findIndex((a=>a.current))
;if(d>0){const a=h.splice(d,1)[0];h.unshift(a)}for(const a of h)if(a.isCreator){i=a;break}}async function m(a){
const b=f.LocalizeString,c=await n(a),d=await b("SharedFolderSettings_Folder");switch(c){case 4:
return b("SharedFolderSettings_Consumer_Creator_Description",[d]);case 5:
return b("SharedFolderSettings_Consumer_FullControl_Description",[d]);case 6:
return b("SharedFolderSettings_Consumer_ReadWrite_Description",[d]);case 7:
return b("SharedFolderSettings_Consumer_LoginOnly_Description",[d])}return Promise.resolve("")}async function n(a){
if(a.sharedFolder){const b=await o(a),c=await aZ.GetRFOnlineUserId(),d=null!==b&&null!==c&&b===c.userId;if(a.granted&&d)return 4
;if(a.granted)return 5;if(a.readOnly)return 7;if(a.received)return 6}return 11}async function o(a){const b=a.path,d=(0,G.hF)(b)
;let e=null;try{if(8===d){const a=await c.GetSharedFolderRecipients(b,!0,null)
;for(const b of a)if(b.isCreator&&b.recipientEmail){e=b.recipientEmail;break}}}catch(f){}return e}}(a,{converting_to_group:j,
disable_outside_sharing:await aV.GetValue("DisableSharingOutsideCompany",!1),is_admin:h,is_enterprise_user:i,is_group:f,
logged_in_user_id:(await b.GetRFOnlineUserId()).userId,m_view_element:(0,ah.TT)(bQ)
},aY,aX,aZ,aJ),l=f||j?d("SharedFolderSettings_Group_WindowTitle",[e]):a.sharedFolder?d("StartPage_Sharing_SharedFolder_Dialog_Title",[e]):d("StartPage_Sharing_ShareFolder_Dialog_Title",[e])
;return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("rf-sharing-dialog rf-sharing-folder rf-modal-dialog",l,null),(()=>k))),c)}
function dW(a,b){if(a.m_id===cF&&"user-details"===bk.GetActiveView(null)&&bk.GetState().m_id===a.m_id&&cG)return bk.SetState({
m_view:"user-details",m_id:cF,m_tab:b},!1,!1),void cG.OnAfterShow();cD.Start((async c=>{
const d=await aX.GetMemberGroups(a.m_id,1,c)
;if(!bu(null)&&!dF(d))return void fE(await aK("AdminCenter_UserTabView_NotGroupMember_Text",[a.m_name||a.m_email]),null,0);(0,
Y.rK)(cE),dX(),cF=a.m_id,"search"===bk.GetActiveView(null)&&fp(),bk.SetState({m_view:"user-details",m_id:cF,m_tab:b},!0,!1),
cG=(0,g.eH)(a,bw,bx,cc,cf,aX,aN,a4,bg,aZ,a5,aR,bk,aJ,{GetAccountInfo:dn,GetCompanyInfo:d2,GetTextByPasswordStrength:dy,
GetTextByUserStatusValue:dw,GetDataItemPasswordStrength:eQ,GetListOfCommandsForRfItem:ez,GetListOfCommandsForGroup:d3,
GetSortedAndFilteredDataList:en,IsCurrentUserAdmin:bu,ShowUsersTab:dv,ShowCreateGroupDialog:eb,
ShowAddSingleUserToGroupsDialog:dR,ShowExcludeUserFromGroupsConfirmation:dT,ShowGroupMainView:eg,
ShowDataViewModeInDetailsPane:fj,ShowRightDetailsPanel:fc,HideViewInRightPanel:fg,ShowDeleteRfItemDialog:eq,
ShowMoveCloneRfItemDialog:ep,ShowMakeRevokeAsAdminDialog:dN,ShowSuspendUserDialog:dK,ShowRestoreUserDialog:dL,
ShowConvertToPersonalUserDialog:dO,ShowDeleteUserDialog:dJ,ShowResendInstructionslUserDialog:dH,
ShowUnblockUserDialogAndUpdateView:dM,SetLoginLogoImageBackgroundUrl:fC,ShowNotification:fE,ShowModalDialog:fA,ShowSetPolicy:fv,
ShowConfirmationDialog:ej});const e=await cG.Create();cE.appendChild(e),cG.OnAfterShow(),fa()}))}function dX(){cF="",
cG&&(cG.Dispose(),cG=null)}async function dY(){return ch=(0,d.Md)(cf,aR,aS,a4,aZ,a5,{GetCompanyPoliciesValues:fG,
GetListOfCommandsForGroup:d3,GetLanguageTag:ba,IsCurrentUserAdmin:bu,ShowAddGroupDialog:ee,ShowGroupMainView:eg,
ShowDeleteGroupDialog:ec,ShowNotification:fE,ShowModalDialog:fA},aJ),ch.Create()}function dZ(a){
"groups"!==bk.GetActiveView(null)&&(bk.SetState({m_view:"groups"},a,!1),ch.OnAfterShow(),e9())}async function d0(a,b){
await aX.UploadCompanyPolicies(bw,a,b),await d2(!0,b)}async function d1(a,b,c){await aX.UploadGroupPolicies(a,b,c)}
async function d2(a,b){let c=bm(null);return c&&!a||(c=await bz.Execute({action:async a=>aX.GetCompanyInfo(a)},b),bn(c)),c}
async function d3(a,b,c){const d=[],e=bu(null);return await d4(a,d),d.push("separator"),await async function(a,b){b.push({
title:await aK("AdminCenter_AddUsers_Text"),imageClass:"cmd-add-to-group",onCommand:async(b,c)=>{await ed(a,c)}})}(a,d),
d.push("separator"),b&&c&&(await ea(a,b,c,d),d.push("separator")),e&&!b&&(await d8(a,d),d.push("separator")),
b?await dE(b,a,d):await d5(a,d),e&&!b&&(d.push("separator"),await d9(a,d)),d}async function d4(a,b){b.push({
title:await aK("AdminCenter_GroupsTabView_GroupDetails_Text"),imageClass:"cmd-open-file-location-icon",onCommand:async(b,c)=>{
eg(a,"users")}})}async function d5(a,b){b.push({title:await aK("AdminCenter_GroupsTabView_Group_Settings_Text"),
imageClass:"cmd-group-settings-icon",onCommand:async(b,c)=>{eg(a,"details")}})}async function d6(a,b){b.push({
title:await aK("Cmd_NewFolder_Title"),imageClass:"cmd-folder-icon",onCommand:async(b,c)=>{const d=await ev(a,c)
;d&&fE(await aK("StartPage_Editor_ItemCreated",[d]),cY,null)}})}async function d7(a,b){b.push({
title:await aK("StartPage_Cmd_SharingSettings"),imageClass:"cmd-sharing-settings-icon",onCommand:async(b,c)=>{await dV(a,c)}})}
async function d8(a,b){b.push({title:await aK("Cmd_Rename_Flat"),imageClass:"cmd-rename-icon",onCommand:async()=>{
await async function(a){const b=await ef(a);b&&(a5.onEvent.CallAllSync([{event:8,id:[a.m_id]}]),
fE(await aK("Notification_Item_Renamed_Text",[a.m_name,b]),null,null))}(a)}})}async function d9(a,b){b.push({title:c0,
imageClass:"cmd-delete-icon",onCommand:async()=>{await ec([a])}})}async function ea(a,b,c,d){d.push({
title:await aK("AdminCenter_UsersTabView_UserPermissions_Text"),imageClass:"cmd-edit-permissions-icon",onCommand:async(d,e)=>{
await async function(a,b,c,d){
const e=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal edit-permissions",await aK("AdminCenter_UsersTabView_EditPermissions_Text"),null),(d=>(0,
g.HX)(b,a,c,aX,aJ,d))));return fA(e,d)}(a,b,c,e)&&a5.onEvent.CallAllSync([{event:1,id:[b.m_id,a.m_id]}])}})}function eb(){(0,
Y.PQ)((async()=>{const a=await ee();a&&(eg(a,"users"),fE(await aK("Notification_Group_Created_Text",[a.m_name]),cY,null),
a5.onEvent.CallAllSync([{event:6}]))}),(()=>((0,Y.aZ)((0,ah.TT)(b7)),()=>{(0,Y.r9)((0,ah.TT)(b7))})),0,null,(a=>()=>{}))}
async function ec(a){const b=await async function(a){return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal",await aK("AdminCenter_DeleteFile_Text",[""]),null),(b=>(0,h.ER)(a,aX,aJ,b)))),null)}(a);if(b){(0,
af.fI)(aO.SyncInBackground(null)),a5.onEvent.CallAllSync([{event:7,id:[...a.map((a=>a.m_id))]}])
;fE(1===a.length?await aK("Notification_Group_Deleted_Text",[a[0].m_name]):await aK("Notification_Groups_Deleted_Text",[(0,
ah.bf)(a.length)]),null,null)}return b}async function ed(a,b){const c=await async function(a,b){const c={fields:[{key:"name",
label:await aK("Options_Account_Name_Text"),sortable:!0},{key:"email",label:await aK("Options_Account_Email_Text"),muted:!0}],
translations:{text:await aK("AdminCenter_UsersTabView_AddUsersToGroup_SingleUser_Text",[a.m_name]),
search_placeholder:await aK("AdminCenter_Search_By_NameEmail_Placeholder"),cancel_btn:await aK("Cmd_Cancel_Flat"),
ok_btn:await aK("AdminCenter_Add_Button_Text")},on_ok_callback:d};async function d(c){const d=c.map((a=>a.id))
;await cc.AddUsersToGroups(d,[a.m_id],{serverOnly:null,readOnly:null,showPasswords:null,manager:!1},b)}async function e(){
const c=(await aY.GetSharedAccountRecipients2(a.m_id,!1,{fields:"-mp,-sender,-company,-accountInfo,-policies"
},b)).filter((a=>!a.disabled));return(await cc.GetCompanyMembers(!1,b)).filter((a=>!c.some((b=>b.accountId===a.id))))}
return fA((0,
y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal group-add-users-dialog dialog-with-list",await aK("AdminCenter_AddUsersToSingleGroup_Text"),null),(()=>(0,
s.F)(e,[],c,aJ)))),b)}(a,b);return c.length>0&&(a5.onEvent.CallAllSync([{event:3,id:[a.m_id,...c.map((a=>a.id))]}]),
fE(await aK("Notification_Users_Added_To_Groups_Text"),null,null),!0)}async function ee(){return fA((0,y.Sw)((0,ah.TT)(bQ),(0,
y.p)((0,y.dK)("dialog-modal create-group-dialog",aK("AdminCenter_GroupsTabView_CreateGroup_Title_Text"),null),(a=>(0,
h.xq)(bw,aX,aO,aJ,{GetCompanyGroups:cf.GetCompanyGroups,GetCompanyPoliciesValues:fG},a)))),null)}async function ef(a){
return fA((0,
y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal rename-group-dialog",await aK("AdminCenter_RenameTo_Text"),null),(b=>(0,
h.DI)(a,aO,aJ,{RenameGroup:cf.RenameGroup},b)))),null)}function eg(a,b){
if(a.m_id===cJ&&"group-details"===bk.GetActiveView(null)&&bk.GetState().m_id===a.m_id&&cL)return bk.SetState({
m_view:"group-details",m_id:cJ,m_tab:b},!1,!1),void cL.OnAfterShow();cH.Start((async()=>{(0,Y.rK)(cI),eh(),cJ=a.m_id,
"search"===bk.GetActiveView(null)&&fp(),bk.SetState({m_view:"group-details",m_id:cJ,m_tab:b},!0,!1),cL=(0,
h.m4)(a,cf,cc,aX,aY,aW,a4,bg,aT,a5,aR,bk,bw,bx,{GetAccountInfo:dn,GetListOfCommandsForUser:dC,GetListOfCommandsForRfItem:ez,
GetCompanyInfo:d2,GetCompanyPoliciesValues:fG,GetGroupPolicyValue:fK,GetDataItemPasswordStrength:eQ,GetGroupSecurityReport:eR,
GetTextByPasswordStrength:dy,GetSortedAndFilteredDataList:en,GetAddDataDropdownCommands:et,GetLanguageTag:ba,
IsCurrentUserAdmin:bu,OpenDataTabFolder:eM,SetLoginLogoImageBackgroundUrl:fC,ShowGroupsTab:dZ,ShowUserMainView:dW,
ShowExcludeUsersFromGroupConfirmation:dU,ShowAddUsersToSingleGroupDialog:ed,ShowDataViewModeInDetailsPane:fj,
ShowDeleteRfItemDialog:eq,ShowMoveCloneRfItemDialog:ep,ShowDeleteGroupDialog:ec,ShowModalDialog:fA,ShowNotification:fE,
ShowSetPolicy:fv,ShowRenameGroupDialog:ef},aJ);const c=await cL.Create();cI.appendChild(c),cL.OnAfterShow(),fa()}))}
function eh(){cJ="",cL&&(cL.Dispose(),cL=null)}async function ei(a){
const b=await aK("AdminCenter_UsersTabView_BuyLicenses_Dialog_Text"),c=await aK("Options_LicenseCompanyInfo_UpgradeBusinessLicense_Button_Text"),d=(0,
y.Sw)((0,
ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal but-licenses-dialog",await aK("AdminCenter_UsersTabView_BuyLicenses_Dialog_Title"),null),(()=>(0,
x._3)((async(a,d)=>am("div",{className:"content"},am("div",{className:"confirmation-text"},am("span",{className:"text-part"
},b)),am("div",{className:"buttons-bar"},am("div",{className:"button default-button",onclick:()=>a(!0)},c))))))))
;await fA(d,a)&&await aO.OpenPaymentPage({action:"buymore"},a)}async function ej(a,b,c,d){return fA((0,y.Sw)((0,ah.TT)(bQ),(0,
y.p)((0,y.dK)("dialog-modal",a,{onCancel:(a,b)=>a(!1),onEscape:(a,b)=>a(!1),onClickOutside:null}),(()=>(0,
x._3)((async(a,e)=>am("div",{className:"content"},"string"==typeof b?am("div",{className:"confirmation-text"},b):b,am("div",{
className:"buttons-bar"},am("button",{className:"button",onclick:()=>a(!1)},c),am("button",{className:"button default-button",
onclick:()=>a(!0)},d)))))))),null)}async function ek(a){
const b=await aK("AdminCenter_ErrorDialog_Title"),c=await aK("StartPage_DialogButton_Ok");return fA((0,y.Sw)((0,ah.TT)(bQ),(0,
y.p)((0,y.dK)("dialog-modal",b,null),(()=>(0,x._3)((async(b,d)=>am("div",{className:"content"},am("div",{
className:"confirmation-text"},a),am("div",{className:"buttons-bar"},am("button",{className:"button default-button",
onclick:()=>b()},c)))))))),null)}async function el(){return cl=(0,r.S2)(a4,aV,aP,bg,aR,aS,aU,aA,a5,{GetDataItemsList:eo,
GetSortedAndFilteredDataList:en,GetAddDataDropdownCommands:et,GetCompanyGroups:cf.GetCompanyGroups,GetDataListCurrentFolder:ci,
GetListOfCommandsForRfItem:ez,GetDataItemPasswordStrength:eQ,GetTextByPasswordStrength:dy,GetLanguageTag:ba,
SetDataListCurrentFolder:cj,ShowCreateLoginDialog:eu,ShowDataViewModeInDetailsPane:fj,ShowAddMoveCloneRfItemDialog:ep,
ShowDeleteRfItemDialog:eq,SetLoginLogoImageBackgroundUrl:fC,ShowNotification:fE,ShowModalDialog:fA},aJ),cl.Create()}
function em(a){"data"!==bk.GetActiveView(null)&&(bk.SetState({m_view:"data"},a,!1),cl.OnAfterShow(),e9())}
async function en(a,b,c){var d;let e=[...a];const f=new Map;if(b.m_search&&b.m_search.m_query){const a=b.m_search
;e=e.filter((b=>{if(9===b.type)return!1;const c=(0,G.em)(b.path),d=(0,I.zR)(a.m_query,c,!1,!0,!1,!1,!1,!1)
;return!!d.matches.length&&(a.m_results_map.set(b.path,d.matches),f.set(b.path,d.rank),!0)}))}
if(b.m_shared&&b.m_shared.length>0&&!ci(null)){const a=b.m_shared,d=await async function(a,b){
return co&&!a||(co=await cp.Execute({action:async a=>await aN.GetReceivedItems(bx,a)},b)),co}(!1,c);let f=[...d.accounts]
;a.includes(0)&&!a.includes(1)&&(f=f.filter((a=>a.sender===bx))),
a.includes(1)&&!a.includes(0)&&(f=f.filter((a=>a.sender!==bx))),
e=e.filter((b=>8===b.type?f.some((a=>`/${a.name}`===b.path)):a.includes(1)?b.sharedFile&&b.received:b.sharedFile&&b.granted))}
if(b.m_group&&b.m_group.length>0){if(b.m_pwd_strength&&b.m_pwd_strength.length>0||b.m_file_type&&b.m_file_type.length>0)return[]
;const a=b.m_group,c=await cf.GetCompanyGroups(!1,null),d=cf.GetGroupsMapFromGroupsList(c,"name");e=e.filter((b=>{
if(!b.sharedFolder||!b.sharedGroup)return!1;const c=(0,G.em)(b.path),e=d.get(c);return!!e&&a.includes(e.id)}))}
b.m_pwd_strength&&b.m_pwd_strength.length>0&&(e=e.filter((a=>!(!a.sharedGroup&&a.readOnly&&a.sharedFolder))));let g=[],h=[]
;if(b.m_reused||b.m_duplicated){const a=await eS("",!1,c);if(g=a.reused.map((a=>a.items.map((a=>a.itemInfo.path)))).flat(1),
h=a.duplicates.map((a=>a.items.map((a=>a.itemInfo.path)))).flat(1),b.m_reused&&!g.length)return[]
;if(b.m_duplicated&&!h.length)return[]}
if(b.m_file_type&&b.m_file_type.length>0||b.m_pwd_strength&&b.m_pwd_strength.length>0||b.m_compromised||b.m_reused||b.m_duplicated||b.m_created||b.m_modified)for(let j=e.length-1;j>=0;j--){
const a=e[j];if(8!==a.type){if(b.m_pwd_strength&&b.m_pwd_strength.length>0){if(1!==a.type){e.splice(j,1);continue}
const c=await eO(a);if(null===c){e.splice(j,1);continue}if(!b.m_pwd_strength.includes((0,u.MB)(c))){e.splice(j,1);continue}}
if(b.m_file_type&&b.m_file_type.length>0&&!b.m_file_type.includes(a.type)){e.splice(j,1);continue}if(b.m_compromised&&bg){
if(1!==a.type){e.splice(j,1);continue}const b=await a4.GetDataItem(a.path,4,null,c);if(!await(0,m.e7)({m_item:b,m_item_info:a
},bg,c)){e.splice(j,1);continue}}if(b.m_reused){if(1!==a.type){e.splice(j,1);continue}if(!g.includes(a.path)){e.splice(j,1)
;continue}}if(b.m_duplicated){if(1!==a.type||!h.length){e.splice(j,1);continue}if(!h.includes(a.path)){e.splice(j,1);continue}}
if(b.m_created){const c=24*b.m_created*60*60,d=(0,ai.t2)();if(!a.cre||d-a.cre>c){e.splice(j,1);continue}}if(b.m_modified){
const c=24*b.m_modified*60*60,d=(0,ai.t2)();if(!a.mod||d-a.mod>c){e.splice(j,1);continue}}}else{if(!await i(a)){e.splice(j,1)
;continue}}}if(b.m_sort){const a=b.m_sort;0===a.m_sort_by?a.m_without_folders?e.sort(((b,c)=>{const d=(0,G.em)(b.path),e=(0,
G.em)(c.path);return a.m_asc?d.localeCompare(e):e.localeCompare(d)})):e.sort(((b,c)=>(0,
m.cj)(b,c,a.m_asc))):f.size>0&&(null===(d=b.m_search)||void 0===d?void 0:d.m_query)?e.sort(((a,b)=>{var c,d
;const e=null!==(c=f.get(a.path))&&void 0!==c?c:0;return(null!==(d=f.get(b.path))&&void 0!==d?d:0)-e
})):a.m_without_folders?e.sort(((b,c)=>{const d=(0,G.em)(b.path),e=(0,G.em)(c.path)
;return a.m_asc?d.localeCompare(e):e.localeCompare(d)})):e.sort(((b,c)=>(0,m.cj)(b,c,a.m_asc)))}else e.sort(((a,b)=>(0,
m.cj)(a,b,!0)));async function i(a){var d,e;try{const f=await eo(a,63,c);if(!f.length)return!1
;const j=f.filter((a=>b.m_pwd_strength&&b.m_pwd_strength.length>0||b.m_compromised||b.m_reused||b.m_duplicated?1===a.type:!!(b.m_file_type&&b.m_file_type.length>0||b.m_created||b.m_modified)&&8!==a.type)),k=f.filter((a=>8===a.type))
;if(!j.length&&!k.length)return!1
;let l=!(b.m_pwd_strength&&b.m_pwd_strength.length>0),n=!(b.m_file_type&&b.m_file_type.length>0),o=!b.m_compromised;bg||(o=!1)
;let p=!b.m_reused,q=!b.m_duplicated,r=!b.m_created,s=!b.m_modified;for(let i=0;i<j.length;i++){const f=j[i]
;if(b.m_reused&&!p&&g.includes(f.path)&&(p=!0),b.m_duplicated&&!q&&h.includes(f.path)&&(q=!0),
b.m_pwd_strength&&b.m_pwd_strength.length>0&&!l){const a=await eO(f);if(null===a)continue;b.m_pwd_strength.includes((0,
u.MB)(a))&&(l=!0)}if(b.m_created&&!r){const a=24*b.m_created*60*60;(0,ai.t2)()-(null!==(d=f.cre)&&void 0!==d?d:0)<=a&&(r=!0)}
if(b.m_modified&&!s){const a=24*b.m_modified*60*60;(0,ai.t2)()-(null!==(e=f.mod)&&void 0!==e?e:0)<=a&&(s=!0)}
if(b.m_compromised&&!o&&bg){const b=await a4.GetDataItem(f.path,4,null,c);await(0,m.e7)({m_item:b,m_item_info:a},bg,c)&&(o=!0)}
if(b.m_file_type&&b.m_file_type.length>0&&!n&&b.m_file_type.includes(f.type)&&(n=!0),l&&o&&n&&p&&q&&r&&s)return!0}
for(let a=0;a<k.length;a++){const b=k[a];if(await i(b))return!0}return!1}catch(f){return(0,ak.au)(f),!1}}return e}
async function eo(a,b,c){var d;let e=await a4.List(null!==(d=null==a?void 0:a.path)&&void 0!==d?d:"",b,c)
;return a||(e=e.filter((a=>(0,G.em)(a.path).toLowerCase()!==h.DC.toLowerCase()))),e}async function ep(a,b,c){
const d=await async function(a,b,c){
const d=1===b?await aK("AdminCenter_MoveTo_Text"):2===b?await aK("AdminCenter_CloneTo_Text"):await aK("AdminCenter_AddToGroup_Text"),e=(0,
y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal move-clone-file-dialog",d,null),(c=>(0,m.bM)(a,b,d,a4,{ShowNotification:fE,
ShowConfirmationDialog:ej},aJ,c))));return fA(e,c)}(a,b,c);if(d.m_all_succeded)return await er(d,b),!0
;const e=d.m_result.filter((a=>!0===a.m_succeded));return await es(d,b),e.length>0}async function eq(a){
const b=await async function(a){
return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal",await aK("AdminCenter_DeleteFile_Text",[""]),null),(b=>(0,
m.kh)(a,a4,aJ,b)))),null)}(a);if(b.m_all_succeded)return await er(b,0),!0;const c=b.m_result.filter((a=>!0===a.m_succeded))
;return await es(b,0),c.length>0}async function er(a,b){var c;const d=(0,G.em)(null!==(c=a.m_target_path)&&void 0!==c?c:"")
;if(1===a.m_result.length){const c=a.m_result[0],e=(0,G.em)(c.m_item_info.path)
;fE(0===b?await aK("Notification_File_Deleted_Text",[e]):2===b?await aK("Notification_File_Cloned_Text",[e]):1===b?await aK("Notification_File_Moved_Text",[e]):await aK("Notification_File_Added_Text",[e,d]),cY,null)
}else{
fE(0===b?await aK("Notification_Items_Deleted_Text",[(0,ah.bf)(a.m_result.length)]):2===b?await aK("Notification_Items_Cloned_Text",[(0,
ah.bf)(a.m_result.length)]):1===b?await aK("Notification_Items_Moved_Text",[(0,
ah.bf)(a.m_result.length)]):await aK("Notification_Items_Added_Text",[(0,ah.bf)(a.m_result.length),d]),cY,null)}}
async function es(a,b){const c=a.m_result.filter((a=>!0===a.m_succeded)),d=a.m_result.filter((a=>!1===a.m_succeded))
;return fA((0,
y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal report-dialog",await aK("AdminCenter_Action_Report_Text"),null),(()=>({
Create:async(e,f)=>{const g=0===b?await aK("StartPage_Delete_Multiselect_Notification",[(0,
ah.bf)(c.length)]):1===b?await aK("StartPage_Move_Multiselect_Notificaton",[(0,
ah.bf)(c.length),a.m_target_path||cZ]):await aK("StartPage_Clone_Multiselect_Notificaton",[(0,
ah.bf)(c.length),a.m_target_path||cZ]),h=0===b?await aK("StartPage_Delete_Multiselect_Error",[(0,
ah.bf)(d.length)]):1===b?await aK("StartPage_Move_Multiselect_Error",[(0,
ah.bf)(d.length)]):await aK("StartPage_Clone_Multiselect_Error",[(0,ah.bf)(d.length)]);return am("div",{className:"content"
},am("div",{className:"succeded-text"},g),am("div",{className:"failed-text-main"},h),am("div",{className:"failed-details-list"
},d.map((a=>am("div",{className:"failed-text-detail"},a.m_error||"Error")))),am("div",{className:"buttons-bar"},am("div",{
className:"button default-button",onclick:()=>{e()}},await aK("Cmd_Ok_Flat"))))},OnAfterShow:()=>{},OnBeforeHide:()=>{},
Focus:()=>{},Dispose:()=>{}})))),null)}async function et(a,b){const c=[],d=bu(null);let e=null;if(!d){const a=await dn(!1,null)
;e=await bj.Parse(a.policies||"")}a||(c.push({title:await aK("RoboformType_Folder"),imageClass:"cmd-create-folder-icon",
onCommand:async(a,b)=>{const c=await ev(null,b);c&&fE(await aK("StartPage_Editor_ItemCreated",[c]),cY,null)}}),
c.push("separator"));let g=!0;if(!d&&e){
const a=e.find((a=>"DisableCreateLogins"===a.m_name)),b=e.find((a=>"DisableCreateAppLogins"===a.m_name));g=!a||!b}g&&c.push({
title:await aK("RoboformType_Login"),imageClass:"cmd-create-login-icon",onCommand:async(a,c)=>{eu(b)}});let h=!0;if(!d&&e){
h=!e.find((a=>"DisableCreateBookmarks"===a.m_name))}h&&c.push({title:await aK("RoboformType_Bookmark"),
imageClass:"cmd-create-bookmark-icon",onCommand:async(a,c)=>{const d=await async function(a){const b=(0,y.Sw)((0,ah.TT)(bQ),(0,
y.p)((0,
y.dK)("dialog-modal create-bookmark-dialog",await aK("AdminCenter_GroupsTabView_CreateNewBookmark_Title_Text"),null),(()=>(0,
m.ag)(a||ci(null)||{path:"",type:8},a4,aJ,{ShowItemRewriteConfirmationDialog:ex,GetImageAndSetToDialogHeader:fB,
GetMatchingPasscards:eN}))));return fA(b,null)}(b);d&&fE(await aK("StartPage_Editor_ItemCreated",[d]),cY,null)}});let i=!0
;if(!d&&e){i=!e.find((a=>"DisableCreateSafenotes"===a.m_name))}i&&c.push({title:await aK("RoboformType_Safenote"),
imageClass:"cmd-create-safenote-icon",onCommand:async(a,b)=>{let c=ci(null);c||(c={path:"",type:8}),await fj(c,{},!0)}})
;let j=!0;if(!d&&e){j=!e.find((a=>"DisableCreateIdentities"===a.m_name))}j&&c.push({title:await aK("RoboformType_Identity"),
imageClass:"cmd-create-identity-icon",onCommand:async(a,c)=>{const d=await async function(a){const b=await(0,f.ow)(),c=(0,
y.Sw)((0,
ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal create-identity-contact-dialog",await aK("AdminCenter_GroupsTabView_CreateNewIdentity_Title_Text"),null),(()=>{
let c=a?Object.assign({},a):null;return c||(c="data"===bk.GetActiveView(null)&&ci(null)||{path:"",type:8}),
b.CreateIdentityView(c,a4,bL,!0,aJ)})));return fA(c,null)}(b);await fn(d.m_item_info,d.m_item)}});let k=!0;if(!d&&e){
k=!e.find((a=>"DisableCreateContacts"===a.m_name))}return k&&c.push({title:await aK("RoboformType_Contact"),
imageClass:"cmd-create-contact-icon",onCommand:async(a,c)=>{const d=await async function(a){const b=await(0,f.ow)(),c=(0,
y.Sw)((0,
ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal create-identity-contact-dialog",await aK("AdminCenter_GroupsTabView_CreateNewContact_Title_Text"),null),(()=>{
let c=a?Object.assign({},a):null;return c||(c="data"===bk.GetActiveView(null)&&ci(null)||{path:"",type:8}),
b.CreateContactView(c,a4,bL,!0,aJ)})));return fA(c,null)}(b);await fn(d.m_item_info,d.m_item)}}),c}function eu(a){(0,
af.fI)((async()=>{const b=await async function(){return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal login-templates-dialog",await aK("AdminCenter_GroupsTabView_CreateNewLogin_Title_Text"),null),(()=>(0,
m.eo)(bi,{GetLoginTemplates:ey},aJ)))),null)}();if(b){const c=await async function(a,b){const c=(0,y.Sw)((0,ah.TT)(bQ),(0,
y.p)((0,y.dK)("dialog-modal create-login-dialog",await aK("AdminCenter_GroupsTabView_CreateNewLogin_Title_Text"),null),(()=>(0,
m.ns)(a,b||ci(null)||{path:"",type:8},a4,aJ,{ShowItemRewriteConfirmationDialog:ex,GetImageAndSetToDialogHeader:fB,
GetMatchingPasscards:eN}))));return fA(c,null)}(b,a);c?fE(await aK("StartPage_Editor_ItemCreated",[c]),cY,null):eu(a)}})())}
async function ev(a,b){const c=a||ci(null);return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal create-folder-dialog",aK("AdminCenter_GroupsTabView_CreateNewFolder_Title_Text"),null),(()=>{
const a="data"===bk.GetActiveView(null)&&c||{path:"",type:8};return(0,m.kD)(a,a4,aJ,b)}))),null)}async function ew(a){
const b=a?await aK("AdminCenter_PoliciesTabView_EditLoginTemplate"):await aK("AdminCenter_PoliciesTabView_CreateLoginTemplate")
;return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal create-login-template-dialog",b,null),(b=>(0,m.zF)(bf,a,aJ,{
GetImageAndSetToDialogHeader:fB},b)))),null)}async function ex(a){return fA((0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,
y.dK)("dialog-modal",await aK("AdminCenter_Confirm_Overwrite_Text"),null),(()=>(0,x._3)((async(b,c)=>am("div",{
className:"content"},am("div",{className:"confirmation-text"},a),am("div",{className:"buttons-bar"},am("div",{
className:"button",onclick:()=>b(!1)},await aK("Options_No")),am("div",{className:"button default-button",onclick:()=>b(!0)
},await aK("Options_Yes"))))))))),null)}async function ey(){
return cn||(cn=await be.GetListOfKnownLoginsThatCanBeCreated("v8",bw),cn)}async function ez(a){switch(a.type){case 3:case 4:
case 1:return async function(a,b){const c=[],d=a.error&&(0,K.tM)(a.error,4),e=!a.sharedGroup&&a.readOnly&&a.sharedFolder
;let f=a.gotoUrl;if(!f){f=(await a4.GetDataItem(a.path,1,null,null)).m_goto_url}const g=!!f&&!(0,N.HB)(f||""),h=f&&(0,V.oK)(f)
;let i=!1;e||!g||b||h||(await async function(a,b){b.push({title:await aK("Cmd_Login_Flat"),imageClass:"cmd-login-icon",
onCommand:async(b,c)=>{await aO.GoFillSubmit({navigate:!0,path:a.path,submit:!0,newTab:!0},null)}})}(a,c),
await async function(a,b){b.push({title:await aK("Cmd_GoFill_Flat"),imageClass:"cmd-gofill-icon",onCommand:async(b,c)=>{
await aO.GoFillSubmit({navigate:!0,path:a.path,submit:!1,newTab:!0},null)}})}(a,c),await async function(a,b){b.push({
title:await aK("Cmd_Goto_Flat"),imageClass:"cmd-goto-icon",onCommand:async(b,c)=>{await aO.GoTo(a.path,{newTab:!0})}})}(a,c),
i=!0);let j=!1;if(d||4===a.type);else if(!e&&!b){const b=await a4.GetDataItem(a.path,4,null,null);if(b){const a=(0,
m.iK)(b,U.Df),d=(0,m.iK)(b,U.Aq);(a||d)&&i&&c.push("separator"),a&&(c.push({title:await aK("AdminCenter_CopyUsername_Text"),
imageClass:"cmd-copy-icon",onCommand:async(b,c)=>{await fD(a,bJ),fE(await aK("Notification_Username_Copied_Text"),null,null)}}),
j=!0),d&&(c.push({title:await aK("AdminCenter_CopyPassword_Text"),imageClass:"cmd-copy-icon",disabled:!1,onCommand:async(a,b)=>{
await fD(d,bJ),fE(await aK("Notification_Password_Copied_Text"),null,null)}}),j=!0)}}e||(j&&c.push("separator"),await eE(a,c),
j&&c.push("separator"),b||d||await eF(a,c),a.readOnly||b||d||await eG(a,c),b||await eH(a,c),await eI(a,c),await eJ(a,c),
await eK(a,c));return c}(a,!1);case 2:return async function(a,b){const c=[],d=a.error&&(0,
K.tM)(a.error,4),e=!a.sharedGroup&&a.readOnly&&a.sharedFolder;let f=a.gotoUrl;if(!f){
const b=await a4.GetDataItem(a.path,1,null,null);f=b.m_goto_url}const g=!!f&&!(0,N.HB)(f||""),h=f&&(0,V.oK)(f);g&&!b&&(c.push({
title:await aK("Cmd_Goto_Flat"),imageClass:"cmd-goto-icon",onCommand:async(b,c)=>{d?fE((0,
z.Qo)(a.error),5,2):h?fE(await aK("CannotOpenUrlForSecurityReasons"),5,2):(0,af.fI)(aP.OpenUrl({url:f,newTab:!0},null))}}),
e||c.push("separator"));!f||e||b||(c.push({title:await aK("Cmd_Copy_URL_Flat"),imageClass:"cmd-copy-icon",
onCommand:async(a,b)=>{await fD(f,bJ);fE(await aK("Notification_URL_Copied_Text"),null,null)}}),c.push("separator"),
await eE(a,c),c.push("separator"));e||(b||d||await eF(a,c),a.readOnly||b||d||await eG(a,c),b||await eH(a,c),await eI(a,c),
await eJ(a,c),await eK(a,c));return c}(a,!1);case 5:case 6:return async function(a,b){
const c=[],d=!a.sharedGroup&&a.readOnly&&a.sharedFolder;d||(await eE(a,c),c.push("separator"),b||(await eF(a,c),await eH(a,c)),
await eI(a,c),await eJ(a,c),5===a.type&&await eL(a,c),await eK(a,c));return c}(a,!1);case 7:return async function(a,b){
const c=!a.sharedGroup&&a.readOnly&&a.sharedFolder,d=[];c||(await eE(a,d),d.push("separator"));b||await eF(a,d)
;c||(b||await eH(a,d),await eI(a,d),await eJ(a,d),await eK(a,d));return d}(a,!1);case 8:{
const b=a.path.split("/").filter((a=>""!==a)).length>1;if(a.sharedFolder&&a.sharedGroup&&!b){
return d3(await cf.GetGroupInfoFromPath(a.path),null,null)}return async function(a){
const b=[],c=a.readOnly&&a.sharedFolder,d=a.sharedGroup||!1,e=a.sharedFolder||!1,f=(0,ag.Y0)(a.path),g=""===f;if(d){if(g){
const c=await cf.GetGroupInfoFromPath(a.path);await d4(c,b),b.push("separator"),await d6(a,b),await d8(c,b),await d9(c,b),
b.push("separator"),await d5(c,b)}else await d6(a,b),await eH(a,b),await eK(a,b);return b}if(e)return c?g?(await eH(a,b),
await d7(a,b),b):b:(await d6(a,b),await eH(a,b),g||await eK(a,b),b.push("separator"),await d7(a,b),b);return await d6(a,b),
await eH(a,b),await eK(a,b),b}(a)}default:throw(0,ak.Lh)()}}async function eA(a,b){const c=[];return c.push({
title:await aK("Cmd_Rename_Flat"),imageClass:"admin-center-view cmd-rename-icon",onCommand:async()=>b()}),await eI(a,c),
await eJ(a,c),await eK(a,c),c}async function eB(a,b){const c=[];return c.push({title:await aK("Cmd_Rename_Flat"),
imageClass:"admin-center-view cmd-rename-icon",onCommand:async()=>b()}),await eI(a,c),await eJ(a,c),await eK(a,c),c}
async function eC(a,b){const c=[];return c.push({title:await aK("Cmd_Rename_Flat"),
imageClass:"admin-center-view cmd-rename-icon",onCommand:async()=>b()}),await eI(a,c),await eJ(a,c),5===a.type&&await eL(a,c),
await eK(a,c),c}async function eD(a,b,c){const d=[];return d.push({title:await aK("Cmd_Rename_Flat"),
imageClass:"admin-center-view cmd-rename-icon",onCommand:async()=>c()}),b||(await eI(a,d),await eJ(a,d),await eK(a,d)),d}
async function eE(a,b){b.push({title:await aK("AdminCenter_AddToGroup_Text"),imageClass:"cmd-add-icon",onCommand:async(b,c)=>{
await ep([a],3,c)}})}async function eF(a,b){b.push({title:await aK("Cmd_View_Flat"),imageClass:"cmd-view-icon",disabled:!1,
onCommand:async(b,c)=>{if(7===a.type||2===a.type||1===a.type||5===a.type||6===a.type){
const b=await a4.GetDataItem(a.path,4,null,c);await fj(a,b,!1)}}})}async function eG(a,b){b.push({
title:await aK("Cmd_Edit_Flat"),imageClass:"cmd-edit-icon",disabled:2!==a.type&&1!==a.type,onCommand:async(b,c)=>{
if(2===a.type||1===a.type){const b=await a4.GetDataItem(a.path,4,null,c);await fl(a,b,!0)}}})}async function eH(a,b){b.push({
title:await aK("Cmd_Rename_Flat"),imageClass:"cmd-rename-icon",onCommand:async(b,c)=>{const d=await async function(a,b){
const c=(0,y.Sw)((0,ah.TT)(bQ),(0,y.p)((0,y.dK)("dialog-modal",await aK("AdminCenter_RenameTo_Text"),null),(()=>(0,
m.ps)(a,a4,aY,aJ,b))));return fA(c,null)}(a,c);d&&fE(await aK("Notification_Item_Renamed_Text",[(0,G.em)(a.path),d]),cY,null)}})
}async function eI(a,b){b.push({title:await aK("Cmd_Move_Flat"),imageClass:"cmd-move-icon",onCommand:async(b,c)=>{
await ep([a],1,c)}})}async function eJ(a,b){b.push({title:await aK("Cmd_Clone_Flat"),imageClass:"cmd-clone-icon",
onCommand:async(b,c)=>{await ep([a],2,c)}})}async function eK(a,b){b.push({title:c0,imageClass:"cmd-delete-icon",
onCommand:async(b,c)=>{await eq([a])}})}async function eL(a,b){b.push({title:await aK("AdminCenter_CopyAllFields_Text"),
imageClass:"cmd-copy-icon",onCommand:async(b,c)=>{const d=await a4.GetDataItem(a.path,4,null,c);try{const a=await(0,
G._1)(d,bL,aJ);await fD(a,bJ);fE(await aK("Notification_Identity_Fields_Copyied_Text"),null,null)}catch(e){fE((0,z.Qo)(e),5,2)}}
})}function eM(a){cj(a),em(!1)}async function eN(a,b,c,d){
const e=Array.isArray(a)?a:[a],f=void 0===(c=c||{}).matchLevelMin?0:c.matchLevelMin,g=void 0===c.matchLevelMax?21:c.matchLevelMax,h=await aZ.GetDomainMatch(),i=(0,
O.x3)();for(const[k,l]of e.entries()){const a=(0,N.dy)(l);if(!a)continue;const c=(0,N.WW)(l),e=(0,ag.MI)(c);if(!e)continue
;const m=c.m_host||"",n=await j(e,b,d),o=0===k;for(const b of n)switch(b.type){case 3:case 2:if(b.gotoUrl){const c=(0,
N.dy)(b.gotoUrl);if(c){const d=(0,O.QM)(c,a,m,h);d>=f&&d<=g&&i.AddMatch({path:b.path,level:d,isMainFrame:o})}}break;default:
if(b.matchUrl){const c=(0,N.dy)(b.matchUrl);if(c){const d=(0,O.QM)(c,a,m,h);if(d>=f&&d<=g){i.AddMatch({path:b.path,level:d,
isMainFrame:o});continue}}}}}return i.GetUnsortedMatches();async function j(a,b,c){const d=await bC.Execute({action:async c=>{
try{const d=await aZ.GetDomainMatch();let e=await async function(a,b,c,d){const e=[],f=bu(null)?66:2;return await(0,
J.s_)(a4,(async f=>{if(d&&await d.YieldToUI(50),0!==b&&b!==f.type)return;let g;switch(f.type){case 3:case 2:g=f.gotoUrl;break
;default:g=f.matchUrl}g&&(0,O.xv)(g,a,c)&&e.push(f)}),{path:"",parts:f,deep:!0},d),e}(a,0,d,c)
;return 0!==b&&(e=e.filter((a=>a.type===b))),e}catch(d){return(0,ak.au)(d),[]}}},c);return d}}async function eO(a){
return eQ(await a4.GetDataItem(a.path,4,null,null))}async function eP(a){try{return(await(0,
ah.TT)(bh).GetUpdatePasswordStrengthInfo(a,null)).strength}catch(b){return null}}async function eQ(a){if(!a)return null
;const b=(0,m.iK)(a,U.Aq);return b?eP(b):null}async function eR(a,b){const c=await eT(b);return await(0,
P.bG)(a,a4,c,aT.GetAllDataItemsWhereSecurityWarningIsDisabled,bg,!1,b)}async function eS(a,b,c){const d=await eT(c)
;return await(0,P.ME)(a,a4,d,aT.GetAllDataItemsWhereSecurityWarningIsDisabled,bg,!1,bu(null),b,c)}async function eT(a){
return cm.GetOnce((async()=>(0,L.v5)(await(0,ab.$)("pwd-dict.json",a,aM))))}async function eU(){return cr=(0,
k.iX)(bw,bf,a0,a5,bk,{GetAccountInfo:dn,GetCompanyInfo:d2,GetCompanyGroups:cf.GetCompanyGroups,GetCustomTemplates:fI,
GetLanguage:ba,IsCurrentUserAdmin:bu,ShowNotification:fE,ShowCreateOrChangeLoginTemplateDialog:ew,
SetLoginLogoImageBackgroundUrl:fC,ShowModalDialog:fA,UploadCompanyPolicies:d0,UploadGroupPolicies:d1,ShowConfirmationDialog:ej
},aJ),cr.Create()}function eV(a,b){"policies"===bk.GetActiveView(null)&&bk.GetState().m_tab===b||(bk.SetState({
m_view:"policies",m_tab:b||"security-and-access"},a,!1),cr.OnAfterShow(),e9())}function eW(a){
bu(null)&&"integration"!==bk.GetActiveView(null)&&(bk.SetState({m_view:"integration"},a,!1),e9())}async function eX(){
return cv=(0,p.n5)(cc,cf,aY,aO,bg,a5,aR,aS,bk,{GetAccountInfo:dn,GetTextBySecurityScoreValue:dx,GetTextByUserStatusValue:dw,
GetLicenseInfo:e1,GetListOfCommandsForGroup:d3,GetListOfCommandsForUser:dB,GetCompanyPolicyValue:fF,IsCurrentUserAdmin:bu,
IsRemoveFromGroupShown:dG,ShowDeleteUserDialog:dJ,ShowSuspendUserDialog:dK,ShowRestoreUserDialog:dL,
ShowRemoveUsersFromGroupsDialog:dP,ShowAddUsersToGroupsDialog:dQ,ShowDeleteGroupDialog:ec,
ShowResendToUserSetupInstructionsDialog:dH,ShowModalDialog:fA,ShowUserMainView:dW,ShowGroupMainView:eg,ShowNotification:fE},aJ),
cv.Create()}function eY(a,b){"reports"===bk.GetActiveView(null)&&bk.GetState().m_tab===b||(bk.SetState({m_view:"reports",
m_tab:b||(bu(null)?"company":"groups")},a,!1),cv.OnAfterShow(),e9())}async function eZ(a){cP&&(await fd(),fh()),bk.SetState({
m_view:"settings",m_tab:a},null===cw,!1),e9()}function e0(){const a=bk.GetActiveTab(null);bk.SetState({m_view:a},!0,!1),e9()}
async function e1(a,b){if(!bq(null)||a){const a=await bB.Execute({action:async a=>aN.GetLicenseInfo(a)},b);br(a)}return(0,
ah.TT)(bq(null))}async function e2(a){await e1(!0,a)}async function e3(a){const b=await e1(!1,a)
;return"trial"===b.status||"trial-expired"===b.status?"buy":"expired"===b.status?"renew":"buymore"}function e4(){
null==b1||b1.classList.remove("fade-in"),b0(!1),bY(!1)}function e5(){(0,af.fI)(aZ.Logoff(null))}function e6(){
const a="light"===a8(null)?"dark":"light";"dark"===a?(null==bQ||bQ.classList.add("dark-theme"),
null==bQ||bQ.classList.remove("light-theme")):(null==bQ||bQ.classList.add("light-theme"),
null==bQ||bQ.classList.remove("dark-theme")),a9(a),(0,af.fI)(bc.SetValue("StartPage.Theme",a))}async function e7(a){var b;try{
await d2(!0,a);const c=await dn(!0,a),d=c.companies&&c.companies[0];if(!d)throw(0,
ak.ZU)(ak.V2,"Unexpected: there is no company for current Admin");bw=d.companyId||"",bx=c.accountId||"",
a7(!!c.enterpriseLicenseExpired),bv(null!==(b=d.isAdmin)&&void 0!==b&&b),d.isAdmin||function(){if(bu(null))return
;bG.Start((async a=>{try{const b=await aX.GetMemberGroups(bx,null,a);if(!Array.isArray(b))throw(0,
ak.ZU)(ak.V2,"Wrong data format");if(!b.some((a=>a.isManager&&a.company)))throw(0,
ak.ZU)(ak.V2,"User is not manager of any Group")}catch(b){(0,ak.au)(b),await aO.OpenStartPage(null),aQ||window.close()}}))}()
}catch(c){(0,ak.au)(c),await aO.OpenStartPage(null),aQ||window.close()}}async function e8(a){const b=await d2(!0,a);bn(b)}
function e9(){"search"!==bk.GetActiveView(null)&&fp(),dX(),eh(),fa()}function fa(){b8.forEach(Y.SE)
;const a=bk.GetActiveView(null),b=b8.get(a);b&&(0,Y.l5)(b);const c=b9.get(a);c&&c.OnAfterShow()}function fb(){dg&&(dg.Hide(),
dg=null)}function fc(a){fi(),(0,ah.TT)(cN).classList.add("visible"),(0,ah.TT)(cN).classList.remove("closed"),cO=!0,fy(),(0,
ah.TT)(bQ).classList.add("edit-pane-shown"),cN&&(cQ=am("div",null,a),cN.appendChild(cQ),cP=!0,cQ.focus())}async function fd(){
cO&&(cK="",(0,ah.TT)(cN).classList.add("closed"),(0,ah.TT)(bQ).classList.remove("edit-pane-shown"),(0,
ah.TT)(b3).style.removeProperty("width"),(0,ah.TT)(b2).style.removeProperty("width"),(0,
ah.TT)(cN).style.removeProperty("width"),(0,Y.l5)((0,ah.TT)(b2)),(0,Y.l5)((0,ah.TT)(b3)),(0,Y.l5)((0,ah.TT)(bO)),cO=!1,fy(),
await(0,af.Gu)(cV,null),(0,ah.TT)(cN).classList.remove("visible"))}function fe(a){function b(a){a.preventDefault()
;const b=function(a){let b=Math.max(cW,a);return b=Math.min(b,window.innerWidth-cX),b=Math.max(b,cW),b
}(window.innerWidth-a.clientX);(0,ah.TT)(cN).style.width=(0,V.Md)(b),fy()}cO&&(a.preventDefault(),
document.body.style.cursor="e-resize",document.addEventListener("mousemove",b),document.addEventListener("mouseup",(()=>{
document.body.style.cursor="",document.removeEventListener("mousemove",b)})))}async function ff(a,b){cM=b,
cO&&cR&&(cR.OnBeforeHide(),cR.Dispose()),cR=a,fc(await cR.Create((function(){(0,af.fI)((async()=>{await fd(),fh()})())
}),(function(a){(0,ak.r5)(a,ak.kd)?(0,af.fI)((async()=>{await fd(),fh()})()):fE((0,ak.EB)(a),null,2)}))),cR.OnAfterShow(),
await(0,af.Gu)(cV,null),cR.Focus()}function fg(){fi(),(0,af.fI)(fd())}function fh(){cO||(cP&&cR&&(cR.OnBeforeHide(),
cR.Dispose(),cR=null),fi(),cM=0)}function fi(){cQ?cN&&cQ&&(cN.removeChild(cQ),cP=!1,cQ=null):cP=!1}async function fj(a,b,c){
if(c||7===a.type||1===a.type||2===a.type||5===a.type||6===a.type)if(cK=a.path,7===a.type||c){const d=(await(0,
f.fH)()).SafenoteEditorView(c?null:a,c?null:b,c?a:null,a4,au,aO,ci(null),"data"===bk.GetActiveView(null),!0,!1,aJ,{
ShowNotification:fE,ShowConfirmationDialog:ej,ShowErrorDialog:ek,ShowModalDialog:fA,GetSafenoteCommands:eD,
CopyTextToClipboard:fD,OnCreate:async a=>{const b=await a4.GetDataItem(a.path,4,null,null);await fj(a,b,!1)}});await ff(d,5)
}else if(1!==a.type)if(2!==a.type)5!==a.type&&6!==a.type||await fk(a,b,"","");else{const c=(await(0,
f.Aj)()).BookmarkViewerView(a,b,bi,aP,a4,au,aO,!0,!1,aJ,bH,{ShowNotification:fE,ShowConfirmationDialog:ej,ShowErrorDialog:ek,
GetBookmarkCommands:eB,ShowDataEditModeInDetailsPane:fl});await ff(c,2)}else{const c=(await(0,
f.Rj)()).LoginViewerView(a,b,bi,aP,a4,au,aO,(0,ah.TT)(bh),aT,bg,!0,a2,!1,aJ,bH,{ShowNotification:fE,ShowConfirmationDialog:ej,
ShowErrorDialog:ek,GetLoginCommands:eA,GetDataLoginPasswordStrength:eP,GetTextByPasswordStrength:dy,
ShowDataEditModeInDetailsPane:fl,CopyTextToClipboardWithAutoClear:fD});await ff(c,1)}}async function fk(a,b,c,d){
const e=(await(0,f.ow)()).IdentityViewerView(a,b,c,d,a4,au,bL,bM,aO,!1,!1,aJ,{ShowNotification:fE,ShowConfirmationDialog:ej,
ShowErrorDialog:ek,GetIdentityCommands:eC,ShowDataEditModeInDetailsPane:fm,CopyTextToClipboardWithAutoClear:fD,OnRename:()=>{},
OnViewInNewTab:()=>{}}),g=5===a.type?4:3;await ff(e,g)}async function fl(a,b,c){if(2===a.type||1===a.type)if(cK=a.path,
2!==a.type){if(1===a.type){const d=(await(0,f.Rj)()).LoginEditorView(a,b,c,bi,a4,au,aP,!1,aJ,bH,{ShowNotification:fE,
ShowConfirmationDialog:ej,ShowErrorDialog:ek,ShowDataViewModeInDetailsPane:fj});await ff(d,1)}}else{const d=(await(0,
f.Aj)()).BookmarkEditorView(a,b,c,bi,a4,au,!1,{ShowNotification:fE,ShowConfirmationDialog:ej,ShowErrorDialog:ek,
ShowDataViewModeInDetailsPane:fj},aJ);await ff(d,2)}}async function fm(a,b,c,d){const e=(await(0,
f.ow)()).IdentityEditorView(a,b,c,d,!1,a4,au,bL,bM,!1,aJ,{ShowNotification:fE,ShowConfirmationDialog:ej,ShowErrorDialog:ek,
ShowDataViewModeInDetailsPane:fk,OnRename:()=>{}});await ff(e,4)}async function fn(a,b){cK=a.path;let c="",d=""
;if(b.m_groups.length&&b.m_groups[0]){const a=b.m_groups[0]
;c=a.m_name,a.m_instances.length&&a.m_instances[0]&&(d=a.m_instances[0].m_name)}const e=(await(0,
f.ow)()).IdentityEditorView(a,b,c||"Person",d||"Main",!0,a4,au,bL,bM,!1,aJ,{ShowNotification:fE,ShowConfirmationDialog:ej,
ShowErrorDialog:ek,ShowDataViewModeInDetailsPane:fk,OnRename:()=>{}}),g=5===a.type?4:3;await ff(e,g)}async function fo(a,b){
"search"!==bk.GetActiveView(null)?bk.SetState({m_view:"search",m_query:a},b,!1):bk.SetState({m_view:"search",m_query:a},b,!0),
e9(),await async function(){null==cA||cA.Dispose(),(0,Y.rK)(cz),dX(),eh(),cA=(0,j.k)(cc,cf,aR,a5,a4,bx,{
GetListOfCommandsForRfItem:ez,GetListOfCommandsForGroup:d3,GetListOfCommandsForUser:dB,GetDataLoginPasswordStrength:eO,
GetSortedAndFilteredDataList:en,GetLanguageTag:ba,IsCurrentUserAdmin:bu,IsRemoveFromGroupShown:dG,
SetLoginLogoImageBackgroundUrl:fC,ShowDeleteRfItemDialog:eq,ShowMoveCloneRfItemDialog:ep,ShowRemoveUsersFromGroupsDialog:dP,
ShowAddUsersToGroupsDialog:dQ,ShowSuspendUserDialog:dK,ShowRestoreUserDialog:dL,ShowResendToUserSetupInstructionsDialog:dH,
ShowDeleteUserDialog:dJ,ShowDeleteGroupDialog:ec,ShowGroupMainView:eg,ShowUserMainView:dW,ShowDataViewModeInDetailsPane:fj,
ShowSearchedPolicy:fv,UpdateSearchInputResultsCounter:fr},aJ);const a=await cA.Create();cz.appendChild(a),cA.OnAfterShow()}(),
a5.onInitSearchPane.CallAllSync(),a5.onUpdateSearchResults.CallAllSync(a)}function fp(){bU(null),bW(null),
a5.onClearSearchResults.CallAllSync(),cC.Cancel()}function fq(){bU(null);const a=bk.GetActiveTab(null);bk.SetState({m_view:a
},!0,!1),e9()}function fr(a){bW(a)}function fs(a){dv(!0),a5.onUsersViewShown.CallAllSync(a)}function ft(a){dZ(!0),
a5.onGroupsViewShown.CallAllSync(a)}function fu(a){em(!0),a5.onDataViewShown.CallAllSync(a)}function fv(a,b,c){eV(!0,b),
a5.onPoliciesViewShown.CallAllSync(a,b,c)}function fw(a,b,c){eY(!0,a),a5.onReportsViewShown.CallAllSync(a,b,c)}function fx(a){
(function(a){if(fz(a,".dropdown-handler")||fz(a,".dropdown-menu"))return!0;return!1})(a.target)||e4()}function fy(){let a=0
;cO&&(a=(0,V.i7)((0,ah.TT)(cN).style.width),a||(a=cW)),function(a){if(0===a)(0,Y.l5)((0,ah.TT)(bO)),(0,
ah.TT)(cN).style.removeProperty("width")}(a);const b=window.innerWidth-a<=cU
;b!==b6&&(b?(null==bQ||bQ.classList.add("left-collapsed"),b6=!0):(null==bQ||bQ.classList.remove("left-collapsed"),
null==bQ||bQ.classList.remove("navigation-hovered"),b6=!1))}function fz(a,b){return a.matches(b)?a:function(a,b){
let c=a.parentElement;for(;c;){if(c.matches(b))return c;c=c.parentElement}return null}(a,b)}async function fA(a,b){cT=a;try{
return await a.Execute(b)}finally{cT=null}}async function fB(a,b){let c=bi.GetImagesByUrl(a);if(!c)try{
await bi.LoadImagesByUrl(a,"","imgLogo"),c=bi.GetImagesByUrl(a)}catch(e){}function d(a,b){const c=(0,
ah.TT)(bQ).querySelector(`.${a}`);if(!c)return;const d=(0,ah.TT)(c).querySelector(".header"),e=d.querySelector(".logo")
;if(e&&d.removeChild(e),d.classList.remove("doc-image"),d.classList.remove("has-own-background"),b&&b.url){const a=am("div",{
className:"logo"});let c="rgba(41, 121, 255, 0.04)";if(b.background){
(0,Y.Un)(b.background)?d.classList.add("has-own-background","dark"):d.classList.add("has-own-background"),c=b.background}
d.classList.add("doc-image"),a.style.backgroundImage=`url("${b.url}")`,d.style.background=`${c}`,d.appendChild(a)
}else d.style.background=""}d(b,c?c.imgLogo:null)}async function fC(a,b){if(!a)return;const c=await async function(a){
if(!a)return null;let b=bi.GetImagesByUrl(a);if(b){if(!b.img16)try{await bi.LoadImagesByUrl(a,"","img16"),b=bi.GetImagesByUrl(a)
}catch(c){}}else try{await bi.LoadImagesByUrl(a,"","img16"),b=bi.GetImagesByUrl(a)}catch(c){}if(b){const a=b.img16
;if(a&&a.url)return`url("${a.url}")`}return null}(a);c&&(b.className="icon",b.style.backgroundImage=c)}async function fD(a,b){
await bH.WriteText(a),bK=a,b&&function(a){bI.Start((async b=>{await(0,af.Gu)(a,b);let c="";try{c=await bH.ReadText()}catch(d){}
if(bK===c||!c)try{await bH.WriteText(" "),bK=""}catch(d){}}))}(b)}function fE(a,b,c){(0,ah.TT)(cS).Show(a,b,c)}
async function fF(a,b){const c=await d2(!1,b),d=(await bj.Parse(c.policies||"")).find((b=>b.m_name===a));return d?d.m_value:""}
async function fG(a,b){const c=await d2(!1,b),d=await bj.Parse(c.policies||""),e={};return a.forEach((a=>{
const b=d.find((b=>b.m_name===a)),c=b?b.m_value:"";e[a]=c})),e}async function fH(){
const a=await d2(!1,null),b=(await bj.Parse(a.policies||"")).find((a=>"RfTemplates"===a.m_name)),c=b?b.m_value:"";return(0,
M.mG)(c)}async function fI(){const a=await d2(!1,null),b=(await bj.Parse(a.policies||"")).find((a=>"AllRfTemplates"===a.m_name))
;return b?b.m_value:""}async function fJ(){const a=await fI();return(0,M.mG)(a)}async function fK(a,b){if(!a)return""
;const c=(await bj.Parse(a)).find((a=>a.m_name===b));return c?c.m_value:""}async function fL(a){var b,c,d,e
;const f=await e1(!1,a)
;return(null!==(c=null===(b=null==f?void 0:f.company)||void 0===b?void 0:b.numberOfUsers)&&void 0!==c?c:0)>=(null!==(e=null===(d=null==f?void 0:f.company)||void 0===d?void 0:d.numberOfLicenses)&&void 0!==e?e:30)
}function fM(a){let b=!1,c=!1,d=!1,e=!1,f=!1,g=!1,h=!1,i=!1,j=!1;for(const k of a)switch(k.event){case 11:(0,af.fI)((async()=>{
i=!0,bk.SetState({m_view:"settings",m_tab:"license"},!0,!0),dh()})());break;case 0:b=!0,c=!0,i=!0;break;case 2:c=!0,e=!0,f=!0,
i=!0;break;case 3:case 4:e=!0;break;case 1:c=!0,e=!0,k.id&&k.id.includes(bx)&&(j=!0);break;case 6:case 8:e=!0,d=!0;break;case 7:
e=!0,g=!0,d=!0;break;case 10:h=!0}bD.Start((async a=>{if(await dn(j,a),await cc.GetCompanyMembers(c,a),
c&&b&&"user-details"!==bk.GetActiveView(null)&&dr("users"),await cf.GetCompanyGroups(e,a),f&&cG&&cF){
(await cc.GetCompanyMembers(!1,a)).some((a=>a.id===cF))||(bk.SetState({m_view:"users"},!0,!0),e9())}if(g&&cL&&cJ){
(await cf.GetCompanyGroups(!1,a)).some((a=>a.id===cJ))||(bk.SetState({m_view:"groups"},!0,!0),e9())}
d&&await cf.UpdateReceivedAccounts(a),h&&await async function(a){await dn(!0,a)}(a),i&&await e2(a)}))}function fN(a){var b,c,d
;let e=!1,f=!1,g=!1,h=!1;for(const i of a){switch(i.event){case 5:e=!0,8!==i.type&&i.path&&(f=!0),8===i.type&&i.path&&(f=!0)
;break;case 7:e=!0,8===i.type&&i.path?((0,G.QC)(i.path,(null===(b=ci(null))||void 0===b?void 0:b.path)||"")&&cj({type:8,path:""
}),cK&&(0,G.QC)(i.path,cK)&&(g=!0),f=!0):cK&&cK===i.path&&(g=!0);break;case 8:e=!0,8===i.type&&i.path?((0,
G.QC)(i.path,(null===(c=ci(null))||void 0===c?void 0:c.path)||"")&&cj({type:8,path:""}),cK&&(0,
G.QC)(i.path,cK)&&(i.to&&i.to.path?cK=cK.replace(i.path,i.to.path):g=!0)):cK&&cK===i.path&&!(null===(d=i.to)||void 0===d?void 0:d.path)&&(i.to&&i.to.path?cK=i.to.path:g=!0)
;break;case 3:(0,af.fI)((async()=>{bv(await aR.GetValue("AccountCompanyAdmin",!1)),dh()})());break;case 10:aQ?(0,af.fI)(j()):(0,
af.fI)(k());break;case 1:case 11:h=!0}async function j(){const a=await d2(!1,null),b={command:"open-admin-center",options:{
view:bk.GetActiveView(null),companyCreatedTime:a.createdTime}},c=JSON.stringify(b),d=await(0,ad.zN)(c),e=await(0,
ad.n1)(d),f=`${window.location.origin+window.location.pathname}#init-data=${encodeURIComponent(e)}`;window.location.replace(f),
window.location.reload()}async function k(){await aO.ShowLoginUI(null),window.close()}}(f||e||g||h)&&bE.Start((async a=>{var b
;if(h&&await cf.UpdateReceivedAccounts(a),f&&await cf.GetCompanyGroups(!0,a),"search"===bk.GetActiveView(null)&&!h){
const a=null!==(b=bT(null))&&void 0!==b?b:"";""!==a&&a5.onUpdateSearchResults.CallAllSync(a)}
!g||1!==cM&&2!==cM&&5!==cM&&4!==cM&&3!==cM||(await fd(),fh(),cM=0)}))}function fO(a){
const b=a.syncParts.some((a=>a.localChanges.some((a=>1===a.type))||a.serverChanges.some((a=>1===a.type)))),c=b||a.syncParts.some((a=>a.localChanges.length>0||a.serverChanges.length>0))
;if(b||c){const a=bk.GetActiveView(null);bF.Start((async d=>{"groups"!==a&&await cf.GetCompanyGroups(c,d),
"users"!==a&&await cc.GetCompanyMembers(b,d)}))}}function fP(){(0,af.fI)((async()=>{var a
;bb(null!==(a=await aJ.GetLanguageTag(null))&&void 0!==a?a:"en")})())}}},8512:function(a,b,c){"use strict"
;var d=c(18101),e=c(28376),f=(c(55695),c(60954)),g=c(53895),h=c(5971),i=c(95250),j=c(52965),k=c(5197),l=c(78440),m=c(4153)
;c(13117);(0,l.uT)(async function(){const a=(0,h.pW)(),b=(0,g.x)(a);try{await b.Init(null);const c=await(0,f.y)(b),g=await(0,
d.c)(b,c.options),h=(0,i.Bq)(a),l=(0,i.d7)(a),n=b.storage,o=b.storage,p=(0,e.G)(c.data,c.service,(0,m.TT)(c.rfo),(0,
m.TT)(c.enterprise),c.sharing,c.backups,c.commands,c.options,c.settings,c.securityWarningsManager,c.usageInfo,c.policies,b,null,null,null,await h.GetPlatformOS(),l,n,o,(0,
j.c)(),(0,k.T)(),g.IsStandalone(),!1,!1),q=await p.Create();document.body.appendChild(q),p.OnAfterShow(),p.Focus()}catch(c){}
}(),"admin-center:Initialize")},89808:function(a,b,c){"use strict";c.d(b,{A:function(){return d}});const d={version:"9.6.12.0"}
},44974:function(){},49701:function(){},29165:function(){}},function(a){a.O(0,[612],(function(){return b=8512,a(a.s=b);var b}))
;a.O()}]);