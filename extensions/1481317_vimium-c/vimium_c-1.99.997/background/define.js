"use strict";"undefined"==typeof globalThis&&(window.globalThis=window),globalThis.__filename=null,(()=>{
let e={},l=e=>e.slice(e.lastIndexOf("/")+1).replace(".js",""),n=(e,l,n,o)=>{
n.bind(null,t,o).apply(null,l.slice(2).map(i))},i=n=>{n=l(n);let i=e[n]
;return i=i?i instanceof Promise?i.__esModule||(i.__esModule={}):i:e[n]={},i},t=([n],i)=>{
let o=l(n),s=e[o]||(e[o]=new Promise(e=>{let l=document,i=l.createElement("script");i.src=n,i.onload=()=>{e(),i.remove()
},(l.body||l.documentElement).appendChild(i)}));s instanceof Promise?s.then(()=>{t([n],i)}):i(s)}
;globalThis.define=(i,t)=>{let o=l(__filename||document.currentScript.src),s=e[o];if(s&&s instanceof Promise){
let l=s.then(()=>{e[o]=s,n(0,i,t,s)});s=l.__esModule=s.__esModule||{},e[o]=l}else n(0,i,t,s||(e[o]={}))}})();