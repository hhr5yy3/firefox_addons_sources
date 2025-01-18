var xe=Object.defineProperty;var be=(p,e,t)=>e in p?xe(p,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):p[e]=t;var k=(p,e,t)=>be(p,typeof e!="symbol"?e+"":e,t);import{b as we,o as ye,c as Se,a as ee,i as Ae,e as q}from"./storeTypes-CGrbvTi_.js";import{b as ve}from"./gift-DYdWkef2.js";function Z(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let R=Z();function oe(p){R=p}const $={exec:()=>null};function f(p,e=""){let t=typeof p=="string"?p:p.source;const r={replace:(i,n)=>{let s=typeof n=="string"?n:n.source;return s=s.replace(b.caret,"$1"),t=t.replace(i,s),r},getRegex:()=>new RegExp(t,e)};return r}const b={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:p=>new RegExp(`^( {0,3}${p})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:p=>new RegExp(`^ {0,${Math.min(3,p-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:p=>new RegExp(`^ {0,${Math.min(3,p-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:p=>new RegExp(`^ {0,${Math.min(3,p-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:p=>new RegExp(`^ {0,${Math.min(3,p-1)}}#`),htmlBeginRegex:p=>new RegExp(`^ {0,${Math.min(3,p-1)}}<(?:[a-z].*>|!--)`,"i")},Re=/^(?:[ \t]*(?:\n|$))+/,ze=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ce=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,P=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Te=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ae=/(?:[*+-]|\d{1,9}[.)])/,le=f(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,ae).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),G=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,$e=/^[^\n]+/,H=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Be=f(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",H).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Pe=f(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ae).getRegex(),L="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",j=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ie=f("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",j).replace("tag",L).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ce=f(G).replace("hr",P).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",L).getRegex(),_e=f(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ce).getRegex(),U={blockquote:_e,code:ze,def:Be,fences:Ce,heading:Te,hr:P,html:Ie,lheading:le,list:Pe,newline:Re,paragraph:ce,table:$,text:$e},te=f("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",P).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",L).getRegex(),De={...U,table:te,paragraph:f(G).replace("hr",P).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",te).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",L).getRegex()},Fe={...U,html:f(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",j).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:$,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:f(G).replace("hr",P).replace("heading",` *#{1,6} *[^
]`).replace("lheading",le).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Le=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ee=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,pe=/^( {2,}|\\)\n(?!\s*$)/,Ne=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,E=/[\p{P}\p{S}]/u,W=/[\s\p{P}\p{S}]/u,he=/[^\s\p{P}\p{S}]/u,Me=f(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,W).getRegex(),de=/(?!~)[\p{P}\p{S}]/u,qe=/(?!~)[\s\p{P}\p{S}]/u,Oe=/(?:[^\s\p{P}\p{S}]|~)/u,Ze=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,ue=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ge=f(ue,"u").replace(/punct/g,E).getRegex(),He=f(ue,"u").replace(/punct/g,de).getRegex(),ge="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",je=f(ge,"gu").replace(/notPunctSpace/g,he).replace(/punctSpace/g,W).replace(/punct/g,E).getRegex(),Ue=f(ge,"gu").replace(/notPunctSpace/g,Oe).replace(/punctSpace/g,qe).replace(/punct/g,de).getRegex(),We=f("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,he).replace(/punctSpace/g,W).replace(/punct/g,E).getRegex(),Qe=f(/\\(punct)/,"gu").replace(/punct/g,E).getRegex(),Ve=f(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Xe=f(j).replace("(?:-->|$)","-->").getRegex(),Je=f("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Xe).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),_=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Ke=f(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",_).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),fe=f(/^!?\[(label)\]\[(ref)\]/).replace("label",_).replace("ref",H).getRegex(),ke=f(/^!?\[(ref)\](?:\[\])?/).replace("ref",H).getRegex(),Ye=f("reflink|nolink(?!\\()","g").replace("reflink",fe).replace("nolink",ke).getRegex(),Q={_backpedal:$,anyPunctuation:Qe,autolink:Ve,blockSkip:Ze,br:pe,code:Ee,del:$,emStrongLDelim:Ge,emStrongRDelimAst:je,emStrongRDelimUnd:We,escape:Le,link:Ke,nolink:ke,punctuation:Me,reflink:fe,reflinkSearch:Ye,tag:Je,text:Ne,url:$},et={...Q,link:f(/^!?\[(label)\]\((.*?)\)/).replace("label",_).getRegex(),reflink:f(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",_).getRegex()},O={...Q,emStrongRDelimAst:Ue,emStrongLDelim:He,url:f(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},tt={...O,br:f(pe).replace("{2,}","*").getRegex(),text:f(O.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},I={normal:U,gfm:De,pedantic:Fe},C={normal:Q,gfm:O,breaks:tt,pedantic:et},rt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},re=p=>rt[p];function A(p,e){if(e){if(b.escapeTest.test(p))return p.replace(b.escapeReplace,re)}else if(b.escapeTestNoEncode.test(p))return p.replace(b.escapeReplaceNoEncode,re);return p}function ne(p){try{p=encodeURI(p).replace(b.percentDecode,"%")}catch{return null}return p}function ie(p,e){var n;const t=p.replace(b.findPipe,(s,o,c)=>{let a=!1,l=o;for(;--l>=0&&c[l]==="\\";)a=!a;return a?"|":" |"}),r=t.split(b.splitPipe);let i=0;if(r[0].trim()||r.shift(),r.length>0&&!((n=r.at(-1))!=null&&n.trim())&&r.pop(),e)if(r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;i<r.length;i++)r[i]=r[i].trim().replace(b.slashPipe,"|");return r}function T(p,e,t){const r=p.length;if(r===0)return"";let i=0;for(;i<r&&p.charAt(r-i-1)===e;)i++;return p.slice(0,r-i)}function nt(p,e){if(p.indexOf(e[1])===-1)return-1;let t=0;for(let r=0;r<p.length;r++)if(p[r]==="\\")r++;else if(p[r]===e[0])t++;else if(p[r]===e[1]&&(t--,t<0))return r;return-1}function se(p,e,t,r,i){const n=e.href,s=e.title||null,o=p[1].replace(i.other.outputLinkReplace,"$1");if(p[0].charAt(0)!=="!"){r.state.inLink=!0;const c={type:"link",raw:t,href:n,title:s,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,c}return{type:"image",raw:t,href:n,title:s,text:o}}function it(p,e,t){const r=p.match(t.other.indentCodeCompensation);if(r===null)return e;const i=r[1];return e.split(`
`).map(n=>{const s=n.match(t.other.beginningSpace);if(s===null)return n;const[o]=s;return o.length>=i.length?n.slice(i.length):n}).join(`
`)}class D{constructor(e){k(this,"options");k(this,"rules");k(this,"lexer");this.options=e||R}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:T(r,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const r=t[0],i=it(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){const i=T(r,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(r=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:T(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let r=T(t[0],`
`).split(`
`),i="",n="";const s=[];for(;r.length>0;){let o=!1;const c=[];let a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))c.push(r[a]),o=!0;else if(!o)c.push(r[a]);else break;r=r.slice(a);const l=c.join(`
`),h=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${l}`:l,n=n?`${n}
${h}`:h;const d=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,s,!0),this.lexer.state.top=d,r.length===0)break;const u=s.at(-1);if((u==null?void 0:u.type)==="code")break;if((u==null?void 0:u.type)==="blockquote"){const x=u,m=x.raw+`
`+r.join(`
`),w=this.blockquote(m);s[s.length-1]=w,i=i.substring(0,i.length-x.raw.length)+w.raw,n=n.substring(0,n.length-x.text.length)+w.text;break}else if((u==null?void 0:u.type)==="list"){const x=u,m=x.raw+`
`+r.join(`
`),w=this.list(m);s[s.length-1]=w,i=i.substring(0,i.length-u.raw.length)+w.raw,n=n.substring(0,n.length-x.raw.length)+w.raw,r=m.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:s,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim();const i=r.length>1,n={type:"list",raw:"",ordered:i,start:i?+r.slice(0,-1):"",loose:!1,items:[]};r=i?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=i?r:"[*+-]");const s=this.rules.other.listItemRegex(r);let o=!1;for(;e;){let a=!1,l="",h="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let d=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),u=e.split(`
`,1)[0],x=!d.trim(),m=0;if(this.options.pedantic?(m=2,h=d.trimStart()):x?m=t[1].length+1:(m=t[2].search(this.rules.other.nonSpaceChar),m=m>4?1:m,h=d.slice(m),m+=t[1].length),x&&this.rules.other.blankLine.test(u)&&(l+=u+`
`,e=e.substring(u.length+1),a=!0),!a){const N=this.rules.other.nextBulletRegex(m),J=this.rules.other.hrRegex(m),K=this.rules.other.fencesBeginRegex(m),Y=this.rules.other.headingBeginRegex(m),me=this.rules.other.htmlBeginRegex(m);for(;e;){const M=e.split(`
`,1)[0];let z;if(u=M,this.options.pedantic?(u=u.replace(this.rules.other.listReplaceNesting,"  "),z=u):z=u.replace(this.rules.other.tabCharGlobal,"    "),K.test(u)||Y.test(u)||me.test(u)||N.test(u)||J.test(u))break;if(z.search(this.rules.other.nonSpaceChar)>=m||!u.trim())h+=`
`+z.slice(m);else{if(x||d.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(d)||Y.test(d)||J.test(d))break;h+=`
`+u}!x&&!u.trim()&&(x=!0),l+=M+`
`,e=e.substring(M.length+1),d=z.slice(m)}}n.loose||(o?n.loose=!0:this.rules.other.doubleBlankLine.test(l)&&(o=!0));let w=null,X;this.options.gfm&&(w=this.rules.other.listIsTask.exec(h),w&&(X=w[0]!=="[ ] ",h=h.replace(this.rules.other.listReplaceTask,""))),n.items.push({type:"list_item",raw:l,task:!!w,checked:X,loose:!1,text:h,tokens:[]}),n.raw+=l}const c=n.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let a=0;a<n.items.length;a++)if(this.lexer.state.top=!1,n.items[a].tokens=this.lexer.blockTokens(n.items[a].text,[]),!n.loose){const l=n.items[a].tokens.filter(d=>d.type==="space"),h=l.length>0&&l.some(d=>this.rules.other.anyLine.test(d.raw));n.loose=h}if(n.loose)for(let a=0;a<n.items.length;a++)n.items[a].loose=!0;return n}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:i,title:n}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const r=ie(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===i.length){for(const c of i)this.rules.other.tableAlignRight.test(c)?s.align.push("right"):this.rules.other.tableAlignCenter.test(c)?s.align.push("center"):this.rules.other.tableAlignLeft.test(c)?s.align.push("left"):s.align.push(null);for(let c=0;c<r.length;c++)s.header.push({text:r[c],tokens:this.lexer.inline(r[c]),header:!0,align:s.align[c]});for(const c of n)s.rows.push(ie(c,s.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:s.align[l]})));return s}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;const s=T(r.slice(0,-1),"\\");if((r.length-s.length)%2===0)return}else{const s=nt(t[2],"()");if(s>-1){const c=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,c).trim(),t[3]=""}}let i=t[2],n="";if(this.options.pedantic){const s=this.rules.other.pedanticHrefTitle.exec(i);s&&(i=s[1],n=s[3])}else n=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?i=i.slice(1):i=i.slice(1,-1)),se(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){const i=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=t[i.toLowerCase()];if(!n){const s=r[0].charAt(0);return{type:"text",raw:s,text:s}}return se(r,n,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&r.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!r||this.rules.inline.punctuation.exec(r)){const s=[...i[0]].length-1;let o,c,a=s,l=0;const h=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+s);(i=h.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(c=[...o].length,i[3]||i[4]){a+=c;continue}else if((i[5]||i[6])&&s%3&&!((s+c)%3)){l+=c;continue}if(a-=c,a>0)continue;c=Math.min(c,c+a+l);const d=[...i[0]][0].length,u=e.slice(0,s+i.index+d+c);if(Math.min(s,c)%2){const m=u.slice(1,-1);return{type:"em",raw:u,text:m,tokens:this.lexer.inlineTokens(m)}}const x=u.slice(2,-2);return{type:"strong",raw:u,text:x,tokens:this.lexer.inlineTokens(x)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(r),n=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return i&&n&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let r,i;return t[2]==="@"?(r=t[1],i="mailto:"+r):(r=t[1],i=r),{type:"link",raw:t[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}url(e){var r;let t;if(t=this.rules.inline.url.exec(e)){let i,n;if(t[2]==="@")i=t[0],n="mailto:"+i;else{let s;do s=t[0],t[0]=((r=this.rules.inline._backpedal.exec(t[0]))==null?void 0:r[0])??"";while(s!==t[0]);i=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:i,href:n,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}}class y{constructor(e){k(this,"tokens");k(this,"options");k(this,"state");k(this,"tokenizer");k(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||R,this.options.tokenizer=this.options.tokenizer||new D,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={other:b,block:I.normal,inline:C.normal};this.options.pedantic?(t.block=I.pedantic,t.inline=C.pedantic):this.options.gfm&&(t.block=I.gfm,this.options.breaks?t.inline=C.breaks:t.inline=C.gfm),this.tokenizer.rules=t}static get rules(){return{block:I,inline:C}}static lex(e,t){return new y(t).lex(e)}static lexInline(e,t){return new y(t).inlineTokens(e)}lex(e){e=e.replace(b.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const r=this.inlineQueue[t];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],r=!1){var i,n,s;for(this.options.pedantic&&(e=e.replace(b.tabCharGlobal,"    ").replace(b.spaceLine,""));e;){let o;if((n=(i=this.options.extensions)==null?void 0:i.block)!=null&&n.some(a=>(o=a.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.space(e)){e=e.substring(o.raw.length);const a=t.at(-1);o.raw.length===1&&a!==void 0?a.raw+=`
`:t.push(o);continue}if(o=this.tokenizer.code(e)){e=e.substring(o.raw.length);const a=t.at(-1);(a==null?void 0:a.type)==="paragraph"||(a==null?void 0:a.type)==="text"?(a.raw+=`
`+o.raw,a.text+=`
`+o.text,this.inlineQueue.at(-1).src=a.text):t.push(o);continue}if(o=this.tokenizer.fences(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.heading(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.hr(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.blockquote(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.list(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.html(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.def(e)){e=e.substring(o.raw.length);const a=t.at(-1);(a==null?void 0:a.type)==="paragraph"||(a==null?void 0:a.type)==="text"?(a.raw+=`
`+o.raw,a.text+=`
`+o.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.lheading(e)){e=e.substring(o.raw.length),t.push(o);continue}let c=e;if((s=this.options.extensions)!=null&&s.startBlock){let a=1/0;const l=e.slice(1);let h;this.options.extensions.startBlock.forEach(d=>{h=d.call({lexer:this},l),typeof h=="number"&&h>=0&&(a=Math.min(a,h))}),a<1/0&&a>=0&&(c=e.substring(0,a+1))}if(this.state.top&&(o=this.tokenizer.paragraph(c))){const a=t.at(-1);r&&(a==null?void 0:a.type)==="paragraph"?(a.raw+=`
`+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(o),r=c.length!==e.length,e=e.substring(o.raw.length);continue}if(o=this.tokenizer.text(e)){e=e.substring(o.raw.length);const a=t.at(-1);(a==null?void 0:a.type)==="text"?(a.raw+=`
`+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(o);continue}if(e){const a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){var o,c,a;let r=e,i=null;if(this.tokens.links){const l=Object.keys(this.tokens.links);if(l.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,i.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let n=!1,s="";for(;e;){n||(s=""),n=!1;let l;if((c=(o=this.options.extensions)==null?void 0:o.inline)!=null&&c.some(d=>(l=d.call({lexer:this},e,t))?(e=e.substring(l.raw.length),t.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);const d=t.at(-1);l.type==="text"&&(d==null?void 0:d.type)==="text"?(d.raw+=l.raw,d.text+=l.text):t.push(l);continue}if(l=this.tokenizer.emStrong(e,r,s)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.del(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),t.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),t.push(l);continue}let h=e;if((a=this.options.extensions)!=null&&a.startInline){let d=1/0;const u=e.slice(1);let x;this.options.extensions.startInline.forEach(m=>{x=m.call({lexer:this},u),typeof x=="number"&&x>=0&&(d=Math.min(d,x))}),d<1/0&&d>=0&&(h=e.substring(0,d+1))}if(l=this.tokenizer.inlineText(h)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(s=l.raw.slice(-1)),n=!0;const d=t.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=l.raw,d.text+=l.text):t.push(l);continue}if(e){const d="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return t}}class F{constructor(e){k(this,"options");k(this,"parser");this.options=e||R}space(e){return""}code({text:e,lang:t,escaped:r}){var s;const i=(s=(t||"").match(b.notSpaceStart))==null?void 0:s[0],n=e.replace(b.endingNewline,"")+`
`;return i?'<pre><code class="language-'+A(i)+'">'+(r?n:A(n,!0))+`</code></pre>
`:"<pre><code>"+(r?n:A(n,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,r=e.start;let i="";for(let o=0;o<e.items.length;o++){const c=e.items[o];i+=this.listitem(c)}const n=t?"ol":"ul",s=t&&r!==1?' start="'+r+'"':"";return"<"+n+s+`>
`+i+"</"+n+`>
`}listitem(e){var r;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((r=e.tokens[0])==null?void 0:r.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+A(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let n=0;n<e.header.length;n++)r+=this.tablecell(e.header[n]);t+=this.tablerow({text:r});let i="";for(let n=0;n<e.rows.length;n++){const s=e.rows[n];r="";for(let o=0;o<s.length;o++)r+=this.tablecell(s[o]);i+=this.tablerow({text:r})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${A(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){const i=this.parser.parseInline(r),n=ne(e);if(n===null)return i;e=n;let s='<a href="'+e+'"';return t&&(s+=' title="'+A(t)+'"'),s+=">"+i+"</a>",s}image({href:e,title:t,text:r}){const i=ne(e);if(i===null)return A(r);e=i;let n=`<img src="${e}" alt="${r}"`;return t&&(n+=` title="${A(t)}"`),n+=">",n}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:A(e.text)}}class V{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}}class S{constructor(e){k(this,"options");k(this,"renderer");k(this,"textRenderer");this.options=e||R,this.options.renderer=this.options.renderer||new F,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new V}static parse(e,t){return new S(t).parse(e)}static parseInline(e,t){return new S(t).parseInline(e)}parse(e,t=!0){var i,n;let r="";for(let s=0;s<e.length;s++){const o=e[s];if((n=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&n[o.type]){const a=o,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){r+=l||"";continue}}const c=o;switch(c.type){case"space":{r+=this.renderer.space(c);continue}case"hr":{r+=this.renderer.hr(c);continue}case"heading":{r+=this.renderer.heading(c);continue}case"code":{r+=this.renderer.code(c);continue}case"table":{r+=this.renderer.table(c);continue}case"blockquote":{r+=this.renderer.blockquote(c);continue}case"list":{r+=this.renderer.list(c);continue}case"html":{r+=this.renderer.html(c);continue}case"paragraph":{r+=this.renderer.paragraph(c);continue}case"text":{let a=c,l=this.renderer.text(a);for(;s+1<e.length&&e[s+1].type==="text";)a=e[++s],l+=`
`+this.renderer.text(a);t?r+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):r+=l;continue}default:{const a='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(e,t=this.renderer){var i,n;let r="";for(let s=0;s<e.length;s++){const o=e[s];if((n=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&n[o.type]){const a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=a||"";continue}}const c=o;switch(c.type){case"escape":{r+=t.text(c);break}case"html":{r+=t.html(c);break}case"link":{r+=t.link(c);break}case"image":{r+=t.image(c);break}case"strong":{r+=t.strong(c);break}case"em":{r+=t.em(c);break}case"codespan":{r+=t.codespan(c);break}case"br":{r+=t.br(c);break}case"del":{r+=t.del(c);break}case"text":{r+=t.text(c);break}default:{const a='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}}class B{constructor(e){k(this,"options");k(this,"block");this.options=e||R}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?y.lex:y.lexInline}provideParser(){return this.block?S.parse:S.parseInline}}k(B,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class st{constructor(...e){k(this,"defaults",Z());k(this,"options",this.setOptions);k(this,"parse",this.parseMarkdown(!0));k(this,"parseInline",this.parseMarkdown(!1));k(this,"Parser",S);k(this,"Renderer",F);k(this,"TextRenderer",V);k(this,"Lexer",y);k(this,"Tokenizer",D);k(this,"Hooks",B);this.use(...e)}walkTokens(e,t){var i,n;let r=[];for(const s of e)switch(r=r.concat(t.call(this,s)),s.type){case"table":{const o=s;for(const c of o.header)r=r.concat(this.walkTokens(c.tokens,t));for(const c of o.rows)for(const a of c)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{const o=s;r=r.concat(this.walkTokens(o.items,t));break}default:{const o=s;(n=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&n[o.type]?this.defaults.extensions.childTokens[o.type].forEach(c=>{const a=o[c].flat(1/0);r=r.concat(this.walkTokens(a,t))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,t)))}}return r}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{const i={...r};if(i.async=this.defaults.async||i.async||!1,r.extensions&&(r.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){const s=t.renderers[n.name];s?t.renderers[n.name]=function(...o){let c=n.renderer.apply(this,o);return c===!1&&(c=s.apply(this,o)),c}:t.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const s=t[n.level];s?s.unshift(n.tokenizer):t[n.level]=[n.tokenizer],n.start&&(n.level==="block"?t.startBlock?t.startBlock.push(n.start):t.startBlock=[n.start]:n.level==="inline"&&(t.startInline?t.startInline.push(n.start):t.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(t.childTokens[n.name]=n.childTokens)}),i.extensions=t),r.renderer){const n=this.defaults.renderer||new F(this.defaults);for(const s in r.renderer){if(!(s in n))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;const o=s,c=r.renderer[o],a=n[o];n[o]=(...l)=>{let h=c.apply(n,l);return h===!1&&(h=a.apply(n,l)),h||""}}i.renderer=n}if(r.tokenizer){const n=this.defaults.tokenizer||new D(this.defaults);for(const s in r.tokenizer){if(!(s in n))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;const o=s,c=r.tokenizer[o],a=n[o];n[o]=(...l)=>{let h=c.apply(n,l);return h===!1&&(h=a.apply(n,l)),h}}i.tokenizer=n}if(r.hooks){const n=this.defaults.hooks||new B;for(const s in r.hooks){if(!(s in n))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;const o=s,c=r.hooks[o],a=n[o];B.passThroughHooks.has(s)?n[o]=l=>{if(this.defaults.async)return Promise.resolve(c.call(n,l)).then(d=>a.call(n,d));const h=c.call(n,l);return a.call(n,h)}:n[o]=(...l)=>{let h=c.apply(n,l);return h===!1&&(h=a.apply(n,l)),h}}i.hooks=n}if(r.walkTokens){const n=this.defaults.walkTokens,s=r.walkTokens;i.walkTokens=function(o){let c=[];return c.push(s.call(this,o)),n&&(c=c.concat(n.call(this,o))),c}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return y.lex(e,t??this.defaults)}parser(e,t){return S.parse(e,t??this.defaults)}parseMarkdown(e){return(r,i)=>{const n={...i},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof r>"u"||r===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof r!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"));s.hooks&&(s.hooks.options=s,s.hooks.block=e);const c=s.hooks?s.hooks.provideLexer():e?y.lex:y.lexInline,a=s.hooks?s.hooks.provideParser():e?S.parse:S.parseInline;if(s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(r):r).then(l=>c(l,s)).then(l=>s.hooks?s.hooks.processAllTokens(l):l).then(l=>s.walkTokens?Promise.all(this.walkTokens(l,s.walkTokens)).then(()=>l):l).then(l=>a(l,s)).then(l=>s.hooks?s.hooks.postprocess(l):l).catch(o);try{s.hooks&&(r=s.hooks.preprocess(r));let l=c(r,s);s.hooks&&(l=s.hooks.processAllTokens(l)),s.walkTokens&&this.walkTokens(l,s.walkTokens);let h=a(l,s);return s.hooks&&(h=s.hooks.postprocess(h)),h}catch(l){return o(l)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+A(r.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(r);throw r}}}const v=new st;function g(p,e){return v.parse(p,e)}g.options=g.setOptions=function(p){return v.setOptions(p),g.defaults=v.defaults,oe(g.defaults),g};g.getDefaults=Z;g.defaults=R;g.use=function(...p){return v.use(...p),g.defaults=v.defaults,oe(g.defaults),g};g.walkTokens=function(p,e){return v.walkTokens(p,e)};g.parseInline=v.parseInline;g.Parser=S;g.parser=S.parse;g.Renderer=F;g.TextRenderer=V;g.Lexer=y;g.lexer=y.lex;g.Tokenizer=D;g.Hooks=B;g.parse=g;g.options;g.setOptions;g.use;g.walkTokens;g.parseInline;S.parse;y.lex;const ot=["innerHTML"],at=we({__name:"Changelog",setup(p){const e="1.1.59",t=`# Changelog\r
\r
## 1.1.59\r
\r
- fix crunchyroll release calendar bug, because of new storage\r
\r
## 1.1.58\r
\r
- BUG: fixed skip intro amazon loop\r
\r
## 1.1.57\r
\r
- fixed bug in Crunchyroll Release Calendar\r
- Amazon,Disney skipCredits now not triggered if last episode\r
\r
## 1.1.56\r
\r
- Netflix skip Credits immediately not after draining animation\r
- Fixed browser action color back to red on chrome.\r
- Netflix: fixed scroll on Volume button to change volume\r
\r
## 1.1.55\r
\r
- Fixed Crunchyroll big picture, auto pick profile, because of change website\r
- Fixed Disney auto play on fullscreen\r
- Mayor Migration to VUE3 instead of native js, verified all functions working on pc.\r
\r
## 1.1.54\r
\r
- Added release year optionally.\r
\r
## 1.1.53\r
\r
- Prime wont load Ratings for Live tv\r
- Prime fixed TMDB title card on chrome.\r
- TMDB ratings added media_type to query, like movie e.g., because shows with same name but different type\r
\r
## 1.1.52\r
\r
- Disney improved ad skip\r
- Disney fixed Bug first ad is not skipped\r
- TMDB refresh new movie ratings every day\r
- Netflix wrong TMDB ratings for movies with dash\r
\r
## 1.1.51\r
\r
- implemented GarbageCollection for DBcache, which deletes ratings older than 30 days\r
\r
## 1.1.48\r
\r
- Removed section Extras from TMDB ratings on Disney+\r
\r
## 1.1.47\r
\r
- TMDB show low votes ratings in grey\r
- Improved TMDB correct lang\r
- Fixed, Disney TMDB rating postions and more accurate title extraction\r
- Better prime TMDB title extraction\r
- Removed Search, Suggested Page from Ratings\r
\r
## 1.1.46\r
\r
- Linked TMDB website when click on rating\r
\r
## 1.1.45\r
\r
- Fix Disney bug: Remove "Continue watching after ad" text when ad is not running.\r
\r
## 1.1.44\r
\r
- On Amazon.com fixed: Speedslider not showing up on dv-player-fullscreen\r
- On Amazon.com fixed: Not skipping ads longer than 150 seconds\r
\r
## 1.1.43\r
\r
- Netflix Toolbar gets higher bug fixed\r
\r
## 1.1.42\r
\r
- BUG: Popup not working on edge and chrome\r
\r
## 1.1.41\r
\r
- Block Disney Ads\r
\r
## 1.1.40\r
\r
- Netflix pause ad not getting removed when no video on screen\r
- Change the volume if you scroll on the volume icon\r
\r
## 1.1.39\r
\r
- fixed Netflix Ads\r
\r
## 1.1.38\r
\r
- Better mobile Popup layout\r
- Ratings: do not include ratings with vote count lower than 80\r
- Crunchyroll: Do not filter premiers not in queue on calendar\r
- Crunchyroll: Filter Japanese Audio in Dub also on calendar\r
- Amazon: Remove background hue on pause again\r
\r
## 1.1.37\r
\r
- Removed subtitle styling, since unnecessary\r
\r
## 1.1.36\r
\r
- Added double Click to hotstar\r
- Disney fix: Watch Credits\r
\r
## 1.1.35\r
## Added Translations for:\r
\r
- French\r
- Spanish\r
- Portuguese\r
- Italian\r
- Japanese\r
- Polish\r
- Swedish\r
- Chinese\r
- Korean\r
- Turkish\r
\r
## 1.1.34\r
\r
- Amazon close Fullscreen on original close buttons\r
\r
## 1.1.33\r
\r
- Separated the Speedslider from the subtitle setting on user request.\r
- Fixed Amazon double click to Fullscreen.\r
\r
## 1.1.32\r
\r
- Added Crunchyroll big video player mod.\r
- Disable the numpad on Crunchyroll.\r
- Added maximize on doubleclick\r
- Popup UI changed\r
\r
## 1.1.29\r
\r
- Fixed Prime filter paid movies.\r
- Fixed Prime Continue Watching position.\r
\r
## 1.1.28\r
\r
- Fixed hotstar crash/skip intro bug.\r
\r
## 1.1.27\r
\r
- Amazon changed video position and broke hole extension on prime video.\r
\r
## 1.1.26\r
\r
- Fixed ratings error\r
\r
## 1.1.25\r
\r
- Better ratings title recognition and more card types on Disney, Netflix, Prime Video\r
\r
## 1.1.24\r
\r
- Better ratings title recognition and more card types on Disney, Netflix, Prime Video\r
\r
## 1.1.23\r
\r
- Added Disney Self ad skip\r
- Added button translations\r
\r
## 1.1.22\r
\r
- Fixed settings error\r
\r
## 1.1.18-19\r
\r
- Profile Pick not working the same in deployed version\r
\r
## 1.1.17\r
\r
- Forgot to add Crunchyroll Profile Auto pick to settings\r
\r
## 1.1.16\r
\r
- Added Crunchyroll Profile Auto pick\r
- fixed Settings bug\r
- improved DBCache storage access\r
\r
## 1.1.15\r
\r
- Added three color Scale to ratings.\r
\r
## 1.1.13\r
\r
- HBO fixed watch credits on HBO movies.\r
\r
## 1.1.12\r
\r
- Removes Netflix pause ads\r
\r
## 1.1.11\r
\r
- Fixed Disney TMDB rating\r
- Filter duplicates removed, since now unnecessary on Disney\r
\r
## 1.1.10\r
\r
- Fixed Prime video skip intro loop bug\r
- Fixed Prime video watch intro button\r
\r
## 1.1.9\r
\r
- Disney new zealand skip credits bug\r
\r
## 1.1.8\r
\r
- Fix hotstar skip Credits bug\r
\r
## 1.1.7\r
\r
- Crunchyroll ReleaseCalendar if no show yet fixed\r
\r
## 1.1.6\r
\r
- Crunchyroll: now put release schedule in current weeks release calendar(queued no dub only)\r
\r
## 1.1.4\r
\r
- PT_BR better Translation\r
- Changed donation link\r
\r
## 1.1.3\r
\r
- Added HBO max streaming service\r
- TBMD ratings show N/A if no rating available and ? if not found. And if you inspect the ratings label you can see the found movie title\r
- minor function improvements\r
\r
## 1.1.2\r
\r
- Filter duplicate shows on disney (optional)\r
- fixed Crunchyroll dub bug\r
- fixed Extension context invalidated error.\r
- code optimization (closest function)\r
\r
## 1.1.1\r
\r
- added optional tabs permission because of misleading permission text on chrome\r
\r
## 1.1.0\r
\r
- Fixed default page on install\r
\r
## 1.0.99\r
\r
- Fixed Intro skipped to fast on Crunchyroll, if the audio is dubbed\r
\r
## 1.0.98\r
\r
- Improved Popup UI\r
- Improved Shared Settings on Extended Settings\r
\r
## 1.0.97\r
\r
- Fixed Continue postion on amazon prime\r
- Changed Speed indicator position\r
\r
## 1.0.96\r
\r
- Fixed new Amazon Ad-indicator\r
\r
## 1.0.95\r
\r
- Fixed Netflix ad skip, since adTime css class changed\r
\r
## 1.0.94\r
\r
- Forgot to add starplus permission\r
\r
## 1.0.93\r
\r
- Remove Xray over amazon prime videos\r
- Fix bug zoom in on settings on about:addons\r
- Prime video hover now transparent\r
\r
## 1.0.92\r
\r
- Disney go to home button bug on Chrome\r
\r
## 1.0.91\r
\r
- Added Disney go to Home button\r
- Disney changed skip Credits button. Issue fixed\r
- Starplus mobile site now working\r
\r
## 1.0.90\r
\r
- Fix Disney video player redesign, video functions wont work\r
\r
## 1.0.89\r
\r
- Added disney Starplus compatibility\r
\r
## 1.0.88\r
\r
- Fixed bug in navigation buttons in extended settings\r
- Fixed html in settings\r
\r
## 1.0.87\r
\r
- Improved Settings style\r
- Fixed settings bug with scrollbar\r
\r
## 1.0.86\r
\r
- Disney when going to next episode remain in full screen\r
- Fix bug Amazon Continue Watching position\r
\r
## 1.0.85\r
\r
- Disney original intro skipped\r
\r
## 1.0.83\r
\r
- Better TMDB accuracy\r
- Prime Video Ad UI change: Skip ad fixed\r
\r
## 1.0.82\r
\r
- Prime Video Ad UI change: Skip ad fixed\r
\r
## 1.0.81\r
\r
- Fixed paused AD on Netflix\r
- Open current Weekday on Cr Release Calendar\r
\r
## 1.0.80\r
\r
- Added TMDB ratings to Prime Video\r
- Better title filter for TMDB\r
- On extension update no more Error Context invalidated errors\r
\r
## 1.0.79\r
\r
- Fixed Prime Video Credits skip will crash page\r
\r
## 1.0.78\r
\r
- Mute Netflix Ad skip\r
- Add Feature to Prime: move continue watching to the top\r
\r
## 1.0.77\r
\r
- Automatically use desktop mode on firefox/chrome mobile\r
- Various mobile improvements\r
\r
## 1.0.74\r
\r
- Released for Firefox on Android\r
\r
## 1.0.73\r
\r
- Fixed umlauts for Netflix auto profile pick\r
\r
## 1.0.72\r
\r
- Added epilepsy option\r
- fixed disney intro/recap bug\r
\r
## 1.0.70\r
\r
- added Crunchyroll Gobackbutton from Intro\r
- fix Crunchyroll Release calendar BUG when switch off function\r
- less API calls to TMDB only refresh unknown daily\r
- better remove old settings\r
\r
## 1.0.69\r
\r
- Improved subtitles of Amazon and Disney\r
\r
## 1.0.67\r
\r
- added Crunchyroll startPlayOnFullScreen\r
- fixed bug Crunchyroll ReleaseCalendar removedDub on load\r
- Changed 1x to 1.0x on Sliders\r
- Some language changes on pt_br\r
\r
## 1.0.66\r
\r
- added Streaming Service Crunchyroll\r
- fixed Netflix SpeedSlider was conflicting with netflix ad Skip\r
- added Portuguese (BR) as a Language\r
- simplified Code substantially(min. 600 LOC less)\r
\r
## 1.0.65\r
\r
- fixed Netflix SpeedSlider was conflicting with netflix ad Skip\r
- added Portuguese (BR) as a Language\r
- simplified Code substantially(600 LOC less)\r
\r
## 1.0.64\r
\r
- added TMDB to Hotstar\r
\r
## 1.0.63\r
\r
- less TMDB calls on disney: bugfix for each works different on chrome\r
\r
## 1.0.62\r
\r
- fixed Netflix ad skip: skips too far\r
- added IMDB rating to Disney\r
- replaced justWatch APi to themoviedb API since justWatch api no longer working\r
- removed addStreamingLinks since justWatch api no longer working\r
\r
## 1.0.59\r
\r
- Added IMDB rating on Amazon Prime and Netflix\r
\r
## 1.0.56,57\r
\r
- Improved Freevee Ad skip\r
\r
## 1.0.56\r
\r
- Improved shared settings\r
- Made Watch Credits inverse of Skip Credits\r
- Fixed UI\r
\r
## 1.0.55\r
\r
- added Always Watch Credits feature\r
- fixed Shared Features Switches\r
\r
## 1.0.53\r
\r
- Fixed chrome pop-up wrong width\r
\r
## 1.0.52\r
\r
- Fixed Amazon Prime skip Credits\r
\r
## 1.0.51\r
\r
- Fixed Netflix Ad skip due to changed css classes of Netflix\r
\r
## 1.0.50\r
\r
- Fixed amazon speedslider due to changed layout of amazon\r
- Fixed Amazon Freevee ad skip bug if ad length divisible by 20\r
\r
## 1.0.49\r
\r
- Added Speedslider min,max,step options\r
- Added Language: Macedonian\r
- Edge: Netflix Ad bug fixed\r
- Hotstar: Skip Ad,Recap,Credits fixed\r
\r
## 1.0.48\r
\r
- Changed name to Streaming enhanced\r
- Added German Locale\r
- Refreshed descriptions\r
\r
## 1.0.47\r
\r
- Added Disney Plus Hotstar\r
- Fixed Netflix and Disney Speedsliders\r
\r
## 1.0.46\r
\r
- Added Disney Plus\r
- Changed speed slider design on Amazon\r
- Changed skip Recap definition since it is also skipped on amazon and disney\r
- Added Netflix SpeedSlider\r
\r
## 1.0.45\r
\r
- Added Addon Install Page\r
- Changed some UI\r
\r
## 1.0.44\r
\r
- Improved Freevee Ad skip by stopping 0.1s before ad is over instead of 1s\r
\r
## 1.0.43\r
\r
- Changed speed slider to 2X max\r
\r
## 1.0.42\r
\r
- Added Icons to Settings and changed Design\r
- Added Statistics description\r
\r
## 1.0.41\r
\r
- Added back Individual options for shared options on the Settings page\r
\r
## 1.0.40\r
\r
- displayed shared skip ads incorrectly\r
\r
## 1.0.38\r
\r
- Confirm reset addon\r
- Added title to Settings page\r
- Changed button designs\r
\r
## 1.0.37\r
\r
- Fixed Chrome scroll bug in settings\r
- Fixed floating settings button bug in popup\r
\r
## 1.0.36\r
\r
- Now starts playing the video automatically if Fullscreen is opened\r
- Combined shared Settings from Amazon prime and Netflix\r
- Mayor settings layout overhaul\r
\r
## 1.0.35\r
\r
- Faster automatic profile pick on Netflix\r
- Bugfix: did not filter paid films on Category pages on Amazon\r
- Won't filter paid films in shop, since it doesn't make sense there (Amazon)\r
\r
## 1.0.34\r
\r
- does not open settings on update anymore\r
\r
## 1.0.33\r
\r
- Fixed infinite loading issue with higher delay of 150 ms\r
\r
## 1.0.32\r
\r
- Fixed blank page bug on amazon prime with remove paid content feature\r
- Show netflix profile picture in settings since name may be similar\r
\r
## 1.0.31\r
\r
- fixed auto click on profile on the profile manage page\r
\r
## 1.0.30\r
\r
- Automatically choosing last used Netflix Profile\r
- Fixed arrow direction on settings page\r
- Fixed various console errors\r
\r
## 1.0.29\r
\r
- proper Netflix Ad skip\r
\r
## 1.0.28\r
\r
- Fast Forwarding Ads on Netflix by 2X\r
- automatic opening of the settings when the extension is updated/installed\r
\r
## 1.0.27\r
\r
- fixed Amazon enable/disable all button (speed slider and filter paid content were forgotten)\r
\r
## 1.0.26\r
\r
- filter Paid Content on Amazon, like Films and series\r
\r
## 1.0.25\r
\r
- changed the Amazon credit auto skip: It will now only skip if it is the same season in the same series.\r
- changed Freevee Ad skip: Changed it to Interval, which fixes these bugs:\r
- parts of the actual video were also skipped\r
- sometimes Freevee ad was not skipped\r
\r
## 1.0.24\r
\r
- fixed issue of infinite loading on Freevee ad skip if it is longer than 90s\r
\r
## 1.0.22\r
\r
- fixed opened setting popups bug\r
- fixed vw warning on slider\r
- fixed warning if slider cannot be removed\r
\r
## 1.0.21\r
\r
- remove annoying background hue from amazon when mouse over on video\r
\r
## 1.0.20\r
\r
- added button to hide speed slider\r
\r
## 1.0.19\r
\r
- added a video speed slider to amazon prime video\r
\r
## 1.0.18\r
\r
- fixed bug not skipping ad between episodes\r
\r
## 1.0.17\r
\r
- fixed bug of forwarding into an ad won't skip it anymore\r
\r
## 1.0.16\r
\r
- implemented a go back button for Amazon, if the user wants to watch the intro\r
- fixed the infinite loading on freevee on first launch of a film\r
\r
## 1.0.15\r
\r
- fixed: self ad skips disabling subtitles\r
- fixed: self ad skips infinite loading on initial watching of series\r
\r
## 1.0.14\r
\r
- Fixed: not showing subtitles when self ad skipped\r
\r
## 1.0.12\r
\r
- Bugfix: if Amazon self ad is skipped, subtitles disappear\r
- improved performance since function gets returned if found button.\r
\r
## 1.0.11\r
\r
- fixed bug when badge is not reset properly when pressing reset button\r
\r
## 1.0.10\r
\r
- added Segments skipped statistic\r
- added Add-on Badges that show on the icon when something is skipped.\r
- fixed bug where the statistics are overridden if you have multiple instances of the add-on running\r
- improved self ad skipping logic\r
- removed unnecessary URL permission which use primevideo.com\r
\r
## 1.0.9\r
\r
- improved Amazon Intro skipping\r
- Added Addon Statistics: Ad , Intro, Recap time skipped\r
- added Importing and Exporting of Settings in the Settings page\r
\r
## 1.0.8\r
\r
- the Individual settings are now opened automatically in the settings page\r
- bug fixed: if there is an version update with a new setting, it wont show that the new setting is activated, although it is.\r
- removed unnecessary , function () {} and {settings:settings}\r
\r
## 1.0.7\r
\r
- improved addon Settings page to include disable all amazon/netflix button and dropdown to decrease menu size\r
- fixed bug: freevee ad skipping may crash the site on first opening, now doesn't skip too often\r
\r
## 1.0.6\r
\r
- Added Amazon Freevee ad skipping\r
- better mutation observing => less computation\r
\r
## 1.0.5\r
\r
- synchronize the settings across accounts\r
- bug fixed where ad is skipped when the infobar is not shown yet(misclicks)\r
\r
## 1.0.4\r
\r
- Updated the check if it is a video on Amazon to check the title and the url\r
- Updated the skip Recap to also check for skip-preplay, which is a different button\r
- removed error in console.logs\r
\r
## 1.0.0\r
\r
- Initial Release\r
\r
          `;return(r,i)=>(ye(),Se("div",null,[ee("p",null,"Version: "+Ae(q(e)),1),ee("div",{class:"prose changelog",innerHTML:q(g)(q(t))},null,8,ot)]))}}),ht=ve(at,[["__scopeId","data-v-de9c9617"]]);export{ht as default};
