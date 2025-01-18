LavaPack.loadBundle([[6159,{"../../../shared/constants/transaction":5159,"../../../shared/lib/metamask-controller-utils":5165,"../../../shared/lib/transactions-controller-utils":5172,"../../../shared/modules/Numeric":5174,"../../../shared/modules/string-utils":5199,"../../../shared/modules/transaction.utils":5201,"../../store/actions":6824,"./confirm-tx.util":6141,"./util":6162,loglevel:4485},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.getAssetDetails=async function(e,t,n,r){var d,p,f;const h=(0,o.parseStandardTokenTransactionData)(n);if(!h)throw new Error("Unable to detect valid token data");let g=(null===(d=I(h))||void 0===d?void 0:d.toString())??(0,u.getTokenValueParam)(h);const m=w(h);let y;if(null!=r&&r.length&&g){const t=r.find((({address:t,tokenId:n})=>(0,s.isEqualCaseInsensitive)(e,t)&&n===g));if(t&&(t.name||t.symbol))return{toAddress:m,...t}}try{y=await(0,a.getTokenStandardAndDetails)(e,t,g)}catch(e){return i.default.warn(e),{toAddress:m,tokenId:g}}const v=(0,u.getTokenValueParam)(h),b=null===(p=y)||void 0===p?void 0:p.decimals,T=h&&v&&b&&(0,l.calcTokenAmount)(v,b).toString(10),_=b&&Number(null==b?void 0:b.toString(10));(null===(f=y)||void 0===f?void 0:f.standard)===c.TokenStandard.ERC20&&(g=undefined);return{tokenAmount:T,toAddress:m,decimals:_,tokenId:g,...y}},n.getSymbolAndDecimalsAndName=T,n.getTokenAddressParam=w,n.getTokenApprovedParam=function(e={}){var t;return null==e||null===(t=e.args)||void 0===t?void 0:t._approved},n.getTokenFiatAmount=function(e,t,n,r,i,a=!0,s=!1){if(t<=0||!e||r===undefined)return undefined;const o=new d.Numeric(e,10).times(new d.Numeric(t,10)).toString();let c,u=new d.Numeric(r,10);i!==n.toUpperCase()&&o&&(u=u.applyConversionRate(o));u=u.round(2).toString(),c=s?(0,f.formatCurrency)(u,n):a?`${(0,f.formatCurrency)(u,n)} ${n.toUpperCase()}`:u;return c},n.getTokenIdParam=I,n.getTokenMetadata=m,n.tokenInfoGetter=function(){const e={};return async(t,n)=>(e[t]||(e[t]=await T(t,n)),e[t])};var r,i=(r=e("loglevel"))&&r.__esModule?r:{default:r},a=e("../../store/actions"),s=e("../../../shared/modules/string-utils"),o=e("../../../shared/modules/transaction.utils"),c=e("../../../shared/constants/transaction"),u=e("../../../shared/lib/metamask-controller-utils"),l=e("../../../shared/lib/transactions-controller-utils"),d=e("../../../shared/modules/Numeric"),p=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=h(t);if(n&&n.has(e))return n.get(e);var r={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=i?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=e[a]}return r.default=e,n&&n.set(e,r),r}(e("./util")),f=e("./confirm-tx.util");function h(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(h=function(e){return e?n:t})(e)}const g="";function m(e,t){return e&&t[e.toLowerCase()]}async function y(e,t){let n=await async function(e){const t=p.getContractAtAddress(e);try{return(await t.symbol())[0]}catch(t){return i.default.warn(`symbol() call for token at address ${e} resulted in error:`,t),undefined}}(e);if(!n){const r=m(e,t);r&&(n=r.symbol)}return n}async function v(e,t){let n=await async function(e){const t=p.getContractAtAddress(e);try{const[e]=await t.name();return e}catch(t){return i.default.warn(`name() call for token at address ${e} resulted in error:`,t),undefined}}(e);if(!n){const r=m(e,t);r&&(n=r.name)}return n}async function b(e,t){let n=await async function(e){const t=p.getContractAtAddress(e);try{const e=(await t.decimals())[0];return null==e?void 0:e.toString()}catch(t){return i.default.warn(`decimals() call for token at address ${e} resulted in error:`,t),undefined}}(e);if(!n||"0"===n){const i=m(e,t);var r;if(i)n=null===(r=i.decimals)||void 0===r?void 0:r.toString()}return n}async function T(e,t){let n,r,a;try{const i=(await Promise.allSettled([y(e,t),b(e,t),v(e,t)])).filter((e=>"fulfilled"===e.status)).map((e=>e.value));[n,r,a]=i}catch(t){i.default.warn(`symbol() and decimal() and name() calls for token at address ${e} resulted in error:`,t)}return{symbol:n||g,decimals:r,name:a}}function w(e={}){var t,n,r;const i=(null==e||null===(t=e.args)||void 0===t?void 0:t._to)||(null==e||null===(n=e.args)||void 0===n?void 0:n.to)||(null==e||null===(r=e.args)||void 0===r?void 0:r[0]);return null==i?void 0:i.toString().toLowerCase()}function I(e={}){var t,n;return(null==e||null===(t=e.args)||void 0===t||null===(t=t._tokenId)||void 0===t?void 0:t.toString())??(null==e||null===(n=e.args)||void 0===n||null===(n=n.id)||void 0===n?void 0:n.toString())}}}},{package:"$root$",file:"ui/helpers/utils/token-util.js"}],[616,{"./_version":606,"@ethersproject/hash":519,"@ethersproject/logger":534,"@ethersproject/properties":540},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.Wordlist=n.logger=void 0;var r=e("@ethersproject/hash"),i=e("@ethersproject/properties"),a=e("@ethersproject/logger"),s=e("./_version");n.logger=new a.Logger(s.version);var o=function(){function e(t){var r=this.constructor;n.logger.checkAbstract(r,e),(0,i.defineReadOnly)(this,"locale",t)}return e.prototype.split=function(e){return e.toLowerCase().split(/ +/g)},e.prototype.join=function(e){return e.join(" ")},e.check=function(e){for(var t=[],n=0;n<2048;n++){var i=e.getWord(n);if(n!==e.getWordIndex(i))return"0x";t.push(i)}return(0,r.id)(t.join("\n")+"\n")},e.register=function(e,t){t||(t=e.locale)},e}();n.Wordlist=o}}},{package:"ethers>@ethersproject/wordlists",file:"node_modules/@ethersproject/wordlists/lib/wordlist.js"}],[6160,{"../../../app/scripts/lib/util":130,"../../../shared/constants/transaction":5159,"../../../shared/modules/contract-utils":5178,"@metamask/controller-utils":1218,"@metamask/transaction-controller":2737},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.getFourBytePrefix=function(e=""){const t=(0,a.addHexPrefix)(e);return t.slice(0,10)},n.getLatestSubmittedTxWithNonce=function(e=[],t="0x0"){if(!e.length)return{};return e.reduce(((e,n)=>{const{submittedTime:r,txParams:{nonce:i}={}}=n;return i===t?e.submittedTime?r>e.submittedTime?n:e:n:e}),{})},n.getStatusKey=function(e){const{txReceipt:{status:t}={},type:n,status:r}=e;if("0x0"===t)return i.TransactionStatus.failed;if(r===i.TransactionStatus.confirmed&&n===i.TransactionType.cancel)return s.TransactionGroupStatus.cancelled;return e.status},n.getTransactionTypeTitle=function(e,t,n="ETH"){switch(t){case i.TransactionType.tokenMethodTransfer:return e("transfer");case i.TransactionType.tokenMethodTransferFrom:return e("transferFrom");case i.TransactionType.tokenMethodSafeTransferFrom:return e("safeTransferFrom");case i.TransactionType.tokenMethodApprove:return e("approve");case i.TransactionType.tokenMethodSetApprovalForAll:return e("setApprovalForAll");case i.TransactionType.tokenMethodIncreaseAllowance:return e("approveIncreaseAllowance");case i.TransactionType.simpleSend:return e("sendingNativeAsset",[n]);case i.TransactionType.contractInteraction:return e("contractInteraction");case i.TransactionType.deployContract:return e("contractDeployment");case i.TransactionType.swap:return e("swap");case i.TransactionType.swapAndSend:return e("swapAndSend");case i.TransactionType.swapApproval:return e("swapApproval");default:throw new Error(`Unrecognized transaction type: ${t}`)}},n.isLegacyTransaction=function(e){return(null==e?void 0:e.type)===i.TransactionEnvelopeType.legacy},n.isNFTAssetStandard=void 0,n.isSmartContractAddress=async function(e){const{isContractAddress:t}=await(0,o.readAddressAsContract)(global.eth,e);return t},n.isTokenMethodAction=function(e){return[i.TransactionType.tokenMethodTransfer,i.TransactionType.tokenMethodApprove,i.TransactionType.tokenMethodSetApprovalForAll,i.TransactionType.tokenMethodTransferFrom,i.TransactionType.tokenMethodSafeTransferFrom,i.TransactionType.tokenMethodIncreaseAllowance].includes(e)};var r=e("@metamask/controller-utils"),i=e("@metamask/transaction-controller"),a=e("../../../app/scripts/lib/util"),s=e("../../../shared/constants/transaction"),o=e("../../../shared/modules/contract-utils");n.isNFTAssetStandard=e=>e===r.ERC1155||e===r.ERC721}}},{package:"$root$",file:"ui/helpers/utils/transactions.util.js"}],[6161,{"./util":6162,loglevel:4485},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,t,n,r,s,o){i.default.debug("tx-helper called with params:"),i.default.debug({unapprovedTxs:e,personalMsgs:t,decryptMsgs:n,encryptionPublicKeyMsgs:r,typedMessages:s,chainId:o});const c=o?(0,a.valuesFor)(e).filter((e=>e.chainId===o)):(0,a.valuesFor)(e),u=(0,a.valuesFor)(t),l=(0,a.valuesFor)(n),d=(0,a.valuesFor)(r),p=(0,a.valuesFor)(s),f=c.concat(u).concat(l).concat(d).concat(p).sort(((e,t)=>e.time-t.time));return i.default.debug(`tx helper found ${c.length} unapproved txs`),i.default.debug(`tx helper found ${u.length} unsigned personal messages`),i.default.debug(`tx helper found ${l.length} decrypt requests`),i.default.debug(`tx helper found ${d.length} encryptionPublicKey requests`),i.default.debug(`tx helper found ${p.length} unsigned typed messages`),f};var r,i=(r=e("loglevel"))&&r.__esModule?r:{default:r},a=e("./util")}}},{package:"$root$",file:"ui/helpers/utils/tx-helper.ts"}],[6162,{"../../../app/scripts/lib/multichain/address":82,"../../../shared/constants/labels":5139,"../../../shared/constants/network":5145,"../../../shared/modules/Numeric":5174,"../../../shared/modules/conversion.utils":5179,"../../../shared/modules/error":5181,"../../../shared/modules/hexstring-utils":5185,"../../../shared/modules/string-utils":5199,"../constants/common":6112,"../constants/routes":6120,"@metamask/assets-controllers":1175,"@metamask/snaps-rpc-methods":2452,"@metamask/snaps-utils":2655,"@metamask/utils":2862,"bignumber.js":3561,bowser:3620,buffer:3657,"ethereumjs-util":3894,"human-standard-token-abi":4282,lodash:4479,luxon:4487,"punycode/punycode":4685},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){Object.defineProperty(n,"__esModule",{value:!0}),n.IS_FLASK=void 0,n.addressSummary=function(e,t=10,n=4,r=!0){if(!e)return"";let i=(0,_.normalizeSafeAddress)(e);r||(i=(0,m.stripHexPrefix)(i));return i?`${i.slice(0,t)}...${i.slice(i.length-n)}`:"..."},n.bnGreaterThan=function(e,t){if(null===e||e===undefined||null===t||t===undefined)return null;return new a.default(e,10).gt(t,10)},n.bnGreaterThanEqualTo=function(e,t){if(null===e||e===undefined||null===t||t===undefined)return null;return new a.default(e,10).gte(t,10)},n.bnLessThan=function(e,t){if(null===e||e===undefined||null===t||t===undefined)return null;return new a.default(e,10).lt(t,10)},n.bnLessThanEqualTo=function(e,t){if(null===e||e===undefined||null===t||t===undefined)return null;return new a.default(e,10).lte(t,10)},n.checkExistingAddresses=function(e,t=[]){if(!e)return!1;return t.some((t=>t.address.toLowerCase()===e.toLowerCase()))},n.checkTokenIdExists=void 0,n.clearClipboard=function(){window.navigator.clipboard.writeText("")},n.fetchTokenExchangeRates=void 0,n.formatBalance=function(e,t,n=!0,r="ETH"){const i=n?A(e):e.split("."),a=i[0];let s=i[1],o="None";if(t===undefined)if("0"===a){if("0"!==s){const e=s.match(/^0*(.{2})/u);e&&(s=e[0]),o=`0.${s} ${r}`}}else o=`${a}.${s.slice(0,3)} ${r}`;else s+=Array(t).join("0"),o=`${a}.${s.slice(0,t)} ${r}`;return o},n.formatDate=function(e,t="M/d/y 'at' T"){if(!e)return"";return o.DateTime.fromMillis(e).toFormat(t)},n.formatDateWithSuffix=function(e){const t=o.DateTime.fromMillis(1e3*e),{day:n}=t,r=function(e){if(e>3&&e<21)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}(n);return t.toFormat(`MMM d'${r}', yyyy`)},n.formatDateWithYearContext=function(e,t="MMM d",n="MMM d, y"){if(!e)return"";const r=o.DateTime.fromMillis(e),i=o.DateTime.local();return r.toFormat(i.year===r.year?t:n)},n.formatUTCDateFromUnixTimestamp=void 0,n.getAccountByAddress=function(e=[],t){return e.find((({address:e})=>e===t))},n.getAssetImageURL=async function(e,t){if(!e||"string"!=typeof e)return"";if(t&&e.startsWith("ipfs://"))try{return await(0,c.getFormattedIpfsUrl)(t,e,!0)}catch(e){return(0,g.logErrorWithMessage)(e),""}return e},n.getCalculatedTokenAmount1dAgo=n.getAvatarFallbackLetter=void 0,n.getContractAtAddress=function(e){return global.eth.contract(i.default).at(e)},n.getFilteredSnapPermissions=n.getDedupedSnaps=void 0,n.getIsBrowserDeprecated=function(e=l.default.getParser(window.navigator.userAgent)){return e.satisfies(b.OUTDATED_BROWSER_VERSIONS)??!1},n.getNetworkNameFromProviderType=void 0,n.getRandomFileName=function(){let e="";const t=[..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"],n=Math.floor(7*Math.random()+6);for(let r=0;r<n;r++)e+=t[Math.floor(Math.random()*t.length)];return e},n.getSnapRoute=n.getSnapName=void 0,n.getURL=O,n.getURLHost=function(e){var t;return(null===(t=O(e))||void 0===t?void 0:t.host)||""},n.getURLHostName=function(e){var t;return(null===(t=O(e))||void 0===t?void 0:t.hostname)||""},n.isAbleToExportAccount=n.hexToText=void 0,n.isDefaultMetaMaskChain=function(e){if(!e||e===h.CHAIN_IDS.MAINNET||e===h.CHAIN_IDS.LINEA_MAINNET||e===h.CHAIN_IDS.GOERLI||e===h.CHAIN_IDS.SEPOLIA||e===h.CHAIN_IDS.LINEA_GOERLI||e===h.CHAIN_IDS.LINEA_SEPOLIA||e===h.CHAIN_IDS.LOCALHOST)return!0;return!1},n.isExtensionUrl=function(e){const t=["chrome-extension:","moz-extension:"];if("string"==typeof e)for(const n of t)if(e.startsWith(n))return!0;if(null!=e&&e.protocol)return t.includes(e.protocol);return!1},n.isNullish=function(e){return null===e||e===undefined},n.isOriginContractAddress=function(e,t){if(!e||!t)return!1;return e.toLowerCase()===t.toLowerCase()},n.isValidDomainName=function(e){return null!==r.default.toASCII(e).toLowerCase().match(/^(?:[a-z0-9](?:[-a-z0-9]*[a-z0-9])?\.)+[a-z0-9][-a-z0-9]*[a-z0-9]$/u)},n.numericBalance=k,n.parseBalance=A,n.roundToDecimalPlacesRemovingExtraZeroes=function(e,t){if(e===undefined||null===e)return"";return new v.Numeric(new v.Numeric(e,10).toFixed(t),10).toNumber()},n.sanitizeString=n.sanitizeMessage=void 0,n.shortenAddress=function(e=""){return D(e,{truncatedCharLimit:y.TRUNCATED_NAME_CHAR_LIMIT,truncatedStartChars:y.TRUNCATED_ADDRESS_START_CHARS,truncatedEndChars:y.TRUNCATED_ADDRESS_END_CHARS,skipCharacterInEnd:!1})},n.shortenString=D,n.sortSelectedInternalAccounts=function(e){return e.sort(((e,t)=>(t.metadata.lastSelected??0)-(e.metadata.lastSelected??0)))},n.stripHttpSchemes=function(e){return e.replace(/^https?:\/\//u,"")},n.stripHttpsScheme=R,n.stripHttpsSchemeWithoutPort=function(e){if(O(e).port)return e;return R(e)},n.toHumanReadableTime=n.stripOneLayerofNesting=void 0,n.valuesFor=function(e){if(!e)return[];return Object.keys(e).map((function(t){return e[t]}))};var r=S(e("punycode/punycode")),i=S(e("human-standard-token-abi")),a=S(e("bignumber.js")),s=C(e("ethereumjs-util")),o=e("luxon"),c=e("@metamask/assets-controllers"),u=C(e("lodash")),l=S(e("bowser")),d=e("@metamask/snaps-rpc-methods"),p=e("@metamask/snaps-utils"),f=e("@metamask/utils"),h=e("../../../shared/constants/network"),g=e("../../../shared/modules/error"),m=e("../../../shared/modules/hexstring-utils"),y=e("../../../shared/constants/labels"),v=e("../../../shared/modules/Numeric"),b=e("../constants/common"),T=e("../../../shared/modules/string-utils"),w=e("../../../shared/modules/conversion.utils"),I=e("../constants/routes"),_=e("../../../app/scripts/lib/multichain/address");function E(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(E=function(e){return e?n:t})(e)}function C(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=E(t);if(n&&n.has(e))return n.get(e);var r={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=i?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=e[a]}return r.default=e,n&&n.set(e,r),r}function S(e){return e&&e.__esModule?e:{default:e}}function k(e){if(!e)return new s.BN(0,16);const t=(0,m.stripHexPrefix)(e);return new s.BN(t,16)}function A(e){let t;const n=k(e),r=n.toString(),i=r.length>18?r.slice(0,r.length-18):"0";return t=`000000000000000000${n}`.slice(-18).replace(/0+$/u,""),""===t&&(t="0"),[i,t]}function D(e="",{truncatedCharLimit:t,truncatedStartChars:n,truncatedEndChars:r,skipCharacterInEnd:i}={truncatedCharLimit:y.TRUNCATED_NAME_CHAR_LIMIT,truncatedStartChars:y.TRUNCATED_ADDRESS_START_CHARS,truncatedEndChars:y.TRUNCATED_ADDRESS_END_CHARS,skipCharacterInEnd:!1}){return e.length<t?e:`${e.slice(0,n)}...${i?"":e.slice(-r)}`}function R(e){return e.replace(/^https:\/\//u,"")}function O(e){try{return new URL(e)}catch(e){return""}}n.formatUTCDateFromUnixTimestamp=e=>e?o.DateTime.fromSeconds(e).toUTC().toFormat("dd LLLL yyyy, HH:mm"):e;n.toHumanReadableTime=(e,t)=>{if(t===undefined||null===t)return"";const n=Math.ceil(t/1e3);return n<=90?e("gasTimingSecondsShort",[n]):n<=5400?e("gasTimingMinutesShort",[Math.ceil(n/60)]):e("gasTimingHoursShort",[Math.ceil(n/3600)])};const N=(()=>{const e=Array.from(new Array(32)).map(((e,t)=>"int"+8*(t+1))),t=Array.from(new Array(32)).map(((e,t)=>"uint"+8*(t+1))),n=Array.from(new Array(32)).map(((e,t)=>`bytes${t+1}`)),r=Array.from(new Array(32)).map(((e,t)=>"fixed"+8*(t+1))),i=Array.from(new Array(32)).map(((e,t)=>"ufixed"+8*(t+1))),a=Array.from(new Array(80)).map(((e,t)=>r.map((e=>`${e}x${t+1}`)))),s=Array.from(new Array(80)).map(((e,t)=>i.map((e=>`${e}x${t+1}`))));return["bool","address","string","bytes","int","uint","fixed","ufixed",...e,...t,...n,...a.flat(),...s.flat()]})(),P=e=>e.replace(/\[(\d*)\]/u,"");n.stripOneLayerofNesting=P;const M=(e,t,n)=>{if(!n)throw new Error("Invalid types definition");const r=t&&null!==t.match(/\[[[0-9]*\]*/u);var i;if(r)return{value:e.map((e=>M(e,P(t),n))),type:t};if(i=t,N.includes(i))return{value:e,type:t};const a=r?(e=>e.replace(/\[[[0-9]*\]*/gu,""))(t):t,s=n[a];if(!s)throw new Error("Invalid primary type definition");const o={};return Object.keys(e).forEach((t=>{const r=Object.values(s).find((e=>e.name===t));r&&(o[t]=M(e[t],r.type,n))})),{value:o,type:t}};n.sanitizeMessage=M;n.getSnapName=e=>t=>{var n;return(null===(n=e[t])||void 0===n?void 0:n.name)??(0,p.stripSnapPrefix)(t)};n.getSnapRoute=e=>`${I.SNAPS_VIEW_ROUTE}/${encodeURIComponent(e)}`;n.getDedupedSnaps=(e,t)=>{var n,r;const i=null==e||null===(n=e.permissions)||void 0===n?void 0:n[d.WALLET_SNAP_PERMISSION_KEY],a=null==i?void 0:i.caveats[0].value,s=null==t||null===(r=t[d.WALLET_SNAP_PERMISSION_KEY])||void 0===r?void 0:r.caveats[0].value;if(!(0,f.isObject)(s)&&a)return Object.keys(a);const o=a?Object.keys(a):[],c=s?Object.keys(s):[],u=o.filter((e=>!c.includes(e)));return u.length>0?u:o};n.IS_FLASK=!1;n.sanitizeString=e=>{if(!e)return e;if(!u.isString(e))return e;return e.replace(/\u202E/giu,"\\u202E")};n.getNetworkNameFromProviderType=e=>e===h.NETWORK_TYPES.RPC?"":e;n.isAbleToExportAccount=(e="")=>!e.includes("Hardware")&&!e.includes("Snap");n.checkTokenIdExists=(e,t,n)=>{const r=(0,f.isStrictHexString)(t);let i=t;r&&(i=(0,w.hexToDecimal)(t));const a=(0,m.toChecksumHexAddress)(e);if(n[a]){const e=n[a];return u.some(e.nfts,(e=>e.address===a&&((0,T.isEqualCaseInsensitive)(e.tokenId,t)||(0,T.isEqualCaseInsensitive)(e.tokenId,i.toString()))))}return!1};n.fetchTokenExchangeRates=async(e,t,n)=>{try{return await(0,c.fetchTokenContractExchangeRates)({tokenPricesService:new c.CodefiTokenPricesServiceV2,nativeCurrency:e,tokenAddresses:t,chainId:n})}catch(e){return{}}};n.hexToText=e=>{if(!e)return e;try{const n=(0,m.stripHexPrefix)(e),r=t.from(n,"hex");return 32===r.length?e:r.toString("utf8")}catch(t){return e}};n.getAvatarFallbackLetter=e=>{var t;return(null==e||null===(t=e.match(/[a-z0-9]/iu))||void 0===t?void 0:t[0])??"?"};n.getFilteredSnapPermissions=(e,t=Infinity,n=3)=>{const r=e.filter((e=>e.weight<=t));if(n&&r.length<n){const i=e.filter((e=>e.weight>t));return r.concat(i.slice(0,n-r.length))}return r};n.getCalculatedTokenAmount1dAgo=(e,t)=>t!==undefined&&e?e/(1+t/100):e??0}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"$root$",file:"ui/helpers/utils/util.js"}],[617,{"./lang-cz":608,"./lang-en":609,"./lang-es":610,"./lang-fr":611,"./lang-it":612,"./lang-ja":613,"./lang-ko":614,"./lang-zh":615},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.wordlists=void 0;var r=e("./lang-cz"),i=e("./lang-en"),a=e("./lang-es"),s=e("./lang-fr"),o=e("./lang-ja"),c=e("./lang-ko"),u=e("./lang-it"),l=e("./lang-zh");n.wordlists={cz:r.langCz,en:i.langEn,es:a.langEs,fr:s.langFr,it:u.langIt,ja:o.langJa,ko:c.langKo,zh:l.langZhCn,zh_cn:l.langZhCn,zh_tw:l.langZhTw}}}},{package:"ethers>@ethersproject/wordlists",file:"node_modules/@ethersproject/wordlists/lib/wordlists.js"}],[618,{"@firebase/component":619,"@firebase/logger":621,"@firebase/util":624,idb:4284},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"FirebaseError",{enumerable:!0,get:function(){return a.FirebaseError}}),n._DEFAULT_ENTRY_NAME=n.SDK_VERSION=void 0,n._addComponent=m,n._addOrOverwriteComponent=function(e,t){e.container.addOrOverwriteComponent(t)},n._apps=void 0,n._clearComponents=function(){g.clear()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n._components=void 0,n._getProvider=v,n._isFirebaseApp=b,n._isFirebaseServerApp=function(e){return e.settings!==undefined},n._registerComponent=y,n._removeServiceInstance=function(e,t,n=d){v(e,t).clearInstance(n)},n._serverApps=void 0,n.deleteApp=C,n.getApp=function(e=d){const t=f.get(e);if(!t&&e===d&&(0,a.getDefaultAppConfig)())return E();if(!t)throw w.create("no-app",{appName:e});return t},n.getApps=function(){return Array.from(f.values())},n.initializeApp=E,n.initializeServerApp=function(e,t){if((0,a.isBrowser)())throw w.create("invalid-server-app-environment");t.automaticDataCollectionEnabled===undefined&&(t.automaticDataCollectionEnabled=!1);let n;n=b(e)?e.options:e;const i=Object.assign(Object.assign({},t),n);i.releaseOnDeref!==undefined&&delete i.releaseOnDeref;if(t.releaseOnDeref!==undefined&&"undefined"==typeof FinalizationRegistry)throw w.create("finalization-registry-not-supported",{});const s=""+(c=JSON.stringify(i),[...c].reduce(((e,t)=>Math.imul(31,e)+t.charCodeAt(0)|0),0)),o=h.get(s);var c;if(o)return o.incRefCount(t.releaseOnDeref),o;const u=new r.ComponentContainer(s);for(const e of g.values())u.addComponent(e);const l=new _(n,t,s,u);return h.set(s,l),l},n.onLog=function(e,t){if(null!==e&&"function"!=typeof e)throw w.create("invalid-log-argument");(0,i.setUserLogHandler)(e,t)},n.registerVersion=S,n.setLogLevel=function(e){(0,i.setLogLevel)(e)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;var r=e("@firebase/component"),i=e("@firebase/logger"),a=e("@firebase/util"),s=e("idb");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class o{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const c="@firebase/app",u="0.10.1",l=new i.Logger("@firebase/app"),d=n._DEFAULT_ENTRY_NAME="[DEFAULT]",p={[c]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},f=n._apps=new Map,h=n._serverApps=new Map,g=n._components=new Map;function m(e,t){try{e.container.addComponent(t)}catch(n){l.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function y(e){const t=e.name;if(g.has(t))return l.debug(`There were multiple attempts to register component ${t}.`),!1;g.set(t,e);for(const t of f.values())m(t,e);for(const t of h.values())m(t,e);return!0}function v(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function b(e){return e.options!==undefined}const T={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},w=new a.ErrorFactory("app","Firebase",T);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class I{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r.Component("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw w.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _ extends I{constructor(e,t,n,r){const i=t.automaticDataCollectionEnabled!==undefined&&t.automaticDataCollectionEnabled,a={name:n,automaticDataCollectionEnabled:i};if(e.apiKey!==undefined)super(e,a,r);else{super(e.options,a,r)}this._serverConfig=Object.assign({automaticDataCollectionEnabled:i},t),this._finalizationRegistry=new FinalizationRegistry((()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=undefined,t.releaseOnDeref=undefined,S(c,u,"serverapp")}toJSON(){return undefined}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==undefined&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){C(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw w.create("server-app-deleted")}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.SDK_VERSION="10.11.0";function E(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const i=Object.assign({name:d,automaticDataCollectionEnabled:!1},t),s=i.name;if("string"!=typeof s||!s)throw w.create("bad-app-name",{appName:String(s)});if(n||(n=(0,a.getDefaultAppConfig)()),!n)throw w.create("no-options");const o=f.get(s);if(o){if((0,a.deepEqual)(n,o.options)&&(0,a.deepEqual)(i,o.config))return o;throw w.create("duplicate-app",{appName:s})}const c=new r.ComponentContainer(s);for(const e of g.values())c.addComponent(e);const u=new I(n,i,c);return f.set(s,u),u}async function C(e){let t=!1;const n=e.name;if(f.has(n))t=!0,f.delete(n);else if(h.has(n)){e.decRefCount()<=0&&(h.delete(n),t=!0)}t&&(await Promise.all(e.container.getProviders().map((e=>e.delete()))),e.isDeleted=!0)}function S(e,t,n){var i;let a=null!==(i=p[e])&&void 0!==i?i:e;n&&(a+=`-${n}`);const s=a.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const e=[`Unable to register library "${a}" with version "${t}":`];return s&&e.push(`library name "${a}" contains illegal characters (whitespace or "/")`),s&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void l.warn(e.join(" "))}y(new r.Component(`${a}-version`,(()=>({library:a,version:t})),"VERSION"))}const k="firebase-heartbeat-database",A=1,D="firebase-heartbeat-store";let R=null;function O(){return R||(R=(0,s.openDB)(k,A,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(D)}catch(e){console.warn(e)}}}).catch((e=>{throw w.create("idb-open",{originalErrorMessage:e.message})}))),R}async function N(e,t){try{const n=(await O()).transaction(D,"readwrite"),r=n.objectStore(D);await r.put(t,P(e)),await n.done}catch(e){if(e instanceof a.FirebaseError)l.warn(e.message);else{const t=w.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});l.warn(t.message)}}}function P(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new F(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){var e,t;const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=x();if((null!=(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||(this._heartbeatsCache=await this._heartbeatsCachePromise,null!=(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)))&&this._heartbeatsCache.lastSentHeartbeatDate!==r&&!this._heartbeatsCache.heartbeats.some((e=>e.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=x(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){const n=[];let r=e.slice();for(const i of e){const e=n.find((e=>e.agent===i.agent));if(e){if(e.dates.push(i.date),j(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),j(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=(0,a.base64urlEncodeWithoutPadding)(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}}function x(){return(new Date).toISOString().substring(0,10)}class F{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,a.isIndexedDBAvailable)()&&(0,a.validateIndexedDBOpenable)().then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await O()).transaction(D),n=await t.objectStore(D).get(P(e));return await t.done,n}catch(e){if(e instanceof a.FirebaseError)l.warn(e.message);else{const t=w.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});l.warn(t.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return N(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return N(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function j(e){return(0,a.base64urlEncodeWithoutPadding)(JSON.stringify({version:2,heartbeats:e})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var B;B="",y(new r.Component("platform-logger",(e=>new o(e)),"PRIVATE")),y(new r.Component("heartbeat",(e=>new M(e)),"PRIVATE")),S(c,u,B),S(c,u,"esm2017"),S("fire-js","")}}},{package:"@metamask/notification-services-controller>firebase>@firebase/app",file:"node_modules/@firebase/app/dist/esm/index.esm2017.js"}],[619,{"@firebase/util":624},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.Provider=n.ComponentContainer=n.Component=void 0;var r=e("@firebase/util");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.Component=class{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};const i="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r.Deferred;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:i})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=i){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e=i){return this.instances.has(e)}getOptions(e=i){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(r)}return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);const a=this.instances.get(r);return a&&e(a,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===i?undefined:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}var r;return n||null}normalizeInstanceIdentifier(e=i){return this.component?this.component.multipleInstances?e:i:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}n.Provider=a;n.ComponentContainer=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new a(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}}}},{package:"@metamask/notification-services-controller>firebase>@firebase/app>@firebase/component",file:"node_modules/@firebase/component/dist/esm/index.esm2017.js"}],[6193,{"../contexts/i18n":6078,react:4880},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.useI18nContext=function(){return(0,r.useContext)(i.I18nContext)};var r=e("react"),i=e("../contexts/i18n")}}},{package:"$root$",file:"ui/hooks/useI18nContext.js"}],[620,{"@firebase/app":618,"@firebase/component":619,"@firebase/util":624,idb:4284},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.deleteInstallations=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e){const{appConfig:t}=e,n=await H(t,(e=>e&&0===e.registrationStatus?undefined:e));if(n){if(1===n.registrationStatus)throw g.create("delete-pending-registration");if(2===n.registrationStatus){if(!navigator.onLine)throw g.create("app-offline");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
await async function(e,t){const n=function(e,{fid:t}){return`${y(e)}/${t}`}(e,t),r=w(e,t),i={method:"DELETE",headers:r},a=await I((()=>fetch(n,i)));if(!a.ok)throw await b("Delete Installation",a)}(t,n),await U(t)}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getId=Q,n.getInstallations=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e=(0,r.getApp)()){return(0,r._getProvider)(e,"installations").getImmediate()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getToken=J,n.onIdChange=function(e,t){const{appConfig:n}=e;return function(e,t){N();const n=k(e);let r=A.get(n);r||(r=new Set,A.set(n,r));r.add(t)}(n,t),()=>{!function(e,t){const n=k(e),r=A.get(n);if(!r)return;r.delete(t),0===r.size&&A.delete(n);P()}(n,t)}};var r=e("@firebase/app"),i=e("@firebase/component"),a=e("@firebase/util"),s=e("idb");const o="@firebase/installations",c="0.6.6",u=1e4,l=`w:${c}`,d="FIS_v2",p="https://firebaseinstallations.googleapis.com/v1",f=36e5,h={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},g=new a.ErrorFactory("installations","Installations",h);function m(e){return e instanceof a.FirebaseError&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y({projectId:e}){return`${p}/projects/${e}/installations`}function v(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function b(e,t){const n=(await t.json()).error;return g.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function T({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function w(e,{refreshToken:t}){const n=T(e);return n.append("Authorization",function(e){return`${d} ${e}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)),n}async function I(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _(e){return new Promise((t=>{setTimeout(t,e)}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const E=/^[cdef][\w-]{21}$/,C="";function S(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return E.test(t)?t:C}catch(e){return C}}function k(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A=new Map;function D(e,t){const n=k(e);R(n,t),function(e,t){const n=N();n&&n.postMessage({key:e,fid:t});P()}(n,t)}function R(e,t){const n=A.get(e);if(n)for(const e of n)e(t)}let O=null;function N(){return!O&&"BroadcastChannel"in self&&(O=new BroadcastChannel("[Firebase] FID Change"),O.onmessage=e=>{R(e.data.key,e.data.fid)}),O}function P(){0===A.size&&O&&(O.close(),O=null)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M="firebase-installations-database",x=1,F="firebase-installations-store";let j=null;function B(){return j||(j=(0,s.openDB)(M,x,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(F)}})),j}async function L(e,t){const n=k(e),r=(await B()).transaction(F,"readwrite"),i=r.objectStore(F),a=await i.get(n);return await i.put(t,n),await r.done,a&&a.fid===t.fid||D(e,t.fid),t}async function U(e){const t=k(e),n=(await B()).transaction(F,"readwrite");await n.objectStore(F).delete(t),await n.done}async function H(e,t){const n=k(e),r=(await B()).transaction(F,"readwrite"),i=r.objectStore(F),a=await i.get(n),s=t(a);return s===undefined?await i.delete(n):await i.put(s,n),await r.done,!s||a&&a.fid===s.fid||D(e,s.fid),s}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K(e){let t;const n=await H(e.appConfig,(n=>{const r=function(e){const t=e||{fid:S(),registrationStatus:0};return G(t)}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(g.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=y(e),i=T(e),a=t.getImmediate({optional:!0});if(a){const e=await a.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const s={fid:n,authVersion:d,appId:e.appId,sdkVersion:l},o={method:"POST",headers:i,body:JSON.stringify(s)},c=await I((()=>fetch(r,o)));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:v(e.authToken)}}throw await b("Create Installation",c)}(e,t);return L(e.appConfig,n)}catch(n){throw m(n)&&409===n.customData.serverCode?await U(e.appConfig):await L(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:q(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}));return n.fid===C?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function q(e){let t=await $(e.appConfig);for(;1===t.registrationStatus;)await _(100),t=await $(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await K(e);return n||t}return t}function $(e){return H(e,(e=>{if(!e)throw g.create("installation-not-found");return G(e)}))}function G(e){return 1===(t=e).registrationStatus&&t.registrationTime+u<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}async function W({appConfig:e,heartbeatServiceProvider:t},n){const r=function(e,{fid:t}){return`${y(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,n),i=w(e,n),a=t.getImmediate({optional:!0});if(a){const e=await a.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const s={installation:{sdkVersion:l,appId:e.appId}},o={method:"POST",headers:i,body:JSON.stringify(s)},c=await I((()=>fetch(r,o)));if(c.ok){return v(await c.json())}throw await b("Generate Auth Token",c)}async function V(e,t=!1){let n;const r=await H(e.appConfig,(r=>{if(!Y(r))throw g.create("not-registered");const i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+f}(e)}(i))return r;if(1===i.requestStatus)return n=async function(e,t){let n=await z(e.appConfig);for(;1===n.authToken.requestStatus;)await _(100),n=await z(e.appConfig);const r=n.authToken;return 0===r.requestStatus?V(e,t):r}(e,t),r;{if(!navigator.onLine)throw g.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=async function(e,t){try{const n=await W(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await L(e.appConfig,r),n}catch(n){if(!m(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await L(e.appConfig,n)}else await U(e.appConfig);throw n}}(e,t),t}}));return n?await n:r.authToken}function z(e){return H(e,(e=>{if(!Y(e))throw g.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+u<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}))}function Y(e){return e!==undefined&&2===e.registrationStatus}async function Q(e){const t=e,{installationEntry:n,registrationPromise:r}=await K(t);return r?r.catch(console.error):V(t).catch(console.error),n.fid}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await K(e);t&&await t}(n);return(await V(n,t)).token}function X(e){return g.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z="installations",ee=e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw X("App Configuration");if(!e.name)throw X("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw X(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:(0,r._getProvider)(t,"heartbeat"),_delete:()=>Promise.resolve()}},te=e=>{const t=e.getProvider("app").getImmediate(),n=(0,r._getProvider)(t,Z).getImmediate();return{getId:()=>Q(n),getToken:e=>J(n,e)}};(0,r._registerComponent)(new i.Component(Z,ee,"PUBLIC")),(0,r._registerComponent)(new i.Component("installations-internal",te,"PRIVATE")),(0,r.registerVersion)(o,c),(0,r.registerVersion)(o,c,"esm2017")}}},{package:"@metamask/notification-services-controller>firebase>@firebase/installations",file:"node_modules/@firebase/installations/dist/esm/index.esm2017.js"}],[621,{tslib:5016},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var r,i,a=e("tslib"),s=[];
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.LogLevel=void 0,(i=n.LogLevel||(n.LogLevel={}))[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT";var o={debug:n.LogLevel.DEBUG,verbose:n.LogLevel.VERBOSE,info:n.LogLevel.INFO,warn:n.LogLevel.WARN,error:n.LogLevel.ERROR,silent:n.LogLevel.SILENT},c=n.LogLevel.INFO,u=((r={})[n.LogLevel.DEBUG]="log",r[n.LogLevel.VERBOSE]="log",r[n.LogLevel.INFO]="info",r[n.LogLevel.WARN]="warn",r[n.LogLevel.ERROR]="error",r),l=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(t<e.logLevel)){var i=(new Date).toISOString(),s=u[t];if(!s)throw new Error("Attempted to log a message with an invalid logType (value: ".concat(t,")"));console[s].apply(console,a.__spreadArray(["[".concat(i,"]  ").concat(e.name,":")],n,!1))}},d=function(){function e(e){this.name=e,this._logLevel=c,this._logHandler=l,this._userLogHandler=null,s.push(this)}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in n.LogLevel))throw new TypeError('Invalid value "'.concat(e,'" assigned to `logLevel`'));this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?o[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a.__spreadArray([this,n.LogLevel.DEBUG],e,!1)),this._logHandler.apply(this,a.__spreadArray([this,n.LogLevel.DEBUG],e,!1))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a.__spreadArray([this,n.LogLevel.VERBOSE],e,!1)),this._logHandler.apply(this,a.__spreadArray([this,n.LogLevel.VERBOSE],e,!1))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a.__spreadArray([this,n.LogLevel.INFO],e,!1)),this._logHandler.apply(this,a.__spreadArray([this,n.LogLevel.INFO],e,!1))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a.__spreadArray([this,n.LogLevel.WARN],e,!1)),this._logHandler.apply(this,a.__spreadArray([this,n.LogLevel.WARN],e,!1))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a.__spreadArray([this,n.LogLevel.ERROR],e,!1)),this._logHandler.apply(this,a.__spreadArray([this,n.LogLevel.ERROR],e,!1))},e}();n.Logger=d,n.setLogLevel=function(e){s.forEach((function(t){t.setLogLevel(e)}))},n.setUserLogHandler=function(e,t){for(var r=function(r){var i=null;t&&t.level&&(i=o[t.level]),r.userLogHandler=null===e?null:function(t,r){for(var a=[],s=2;s<arguments.length;s++)a[s-2]=arguments[s];var o=a.map((function(e){if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}})).filter((function(e){return e})).join(" ");r>=(null!=i?i:t.logLevel)&&e({level:n.LogLevel[r].toLowerCase(),message:o,args:a,type:t.name})}},i=0,a=s;i<a.length;i++){r(a[i])}}}}},{package:"@metamask/notification-services-controller>firebase>@firebase/app>@firebase/logger",file:"node_modules/@firebase/logger/dist/index.cjs.js"}],[622,{"@firebase/app":618,"@firebase/component":619,"@firebase/installations":620,"@firebase/util":624,idb:4284},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.deleteToken=function(e){
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e){if(!navigator)throw R.create("only-available-in-window");e.swRegistration||await K(e);return async function(e){const t=await S(e.firebaseDependencies);t&&(await O(e.firebaseDependencies,t.token),await async function(e){const t=A(e),n=(await C()).transaction(_,"readwrite");await n.objectStore(_).delete(t),await n.done}(e.firebaseDependencies));const n=await e.swRegistration.pushManager.getSubscription();if(n)return n.unsubscribe();return!0}(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e=(0,a.getModularInstance)(e))},n.getMessaging=
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e=(0,s.getApp)()){return Q().then((e=>{if(!e)throw R.create("unsupported-browser")}),(e=>{throw R.create("indexed-db-unsupported")})),(0,s._getProvider)((0,a.getModularInstance)(e),"messaging").getImmediate()},n.getToken=async function(e,t){return q(e=(0,a.getModularInstance)(e),t)},n.isSupported=Q,n.onMessage=function(e,t){return function(e,t){if(!navigator)throw R.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}(e=(0,a.getModularInstance)(e),t)},e("@firebase/installations");var r=e("@firebase/component"),i=e("idb"),a=e("@firebase/util"),s=e("@firebase/app");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const o="/firebase-messaging-sw.js",c="/firebase-cloud-messaging-push-scope",u="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",l="https://fcmregistrations.googleapis.com/v1",d="google.c.a.c_id",p="google.c.a.c_l",f="google.c.a.ts";var h,g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function m(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function y(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;++e)r[e]=n.charCodeAt(e);return r}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(h||(h={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(g||(g={}));const v="fcm_token_details_db",b=5,T="fcm_token_object_Store";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const w="firebase-messaging-database",I=1,_="firebase-messaging-store";let E=null;function C(){return E||(E=(0,i.openDB)(w,I,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(_)}})),E}async function S(e){const t=A(e),n=await C(),r=await n.transaction(_).objectStore(_).get(t);if(r)return r;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map((e=>e.name));if(!e.includes(v))return null}let t=null;return(await(0,i.openDB)(v,b,{upgrade:async(n,r,i,a)=>{var s;if(r<2)return;if(!n.objectStoreNames.contains(T))return;const o=a.objectStore(T),c=await o.index("fcmSenderId").get(e);if(await o.clear(),c)if(2===r){const e=c;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:null!==(s=e.createTime)&&void 0!==s?s:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:m(e.vapidKey)}}}else if(3===r){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:m(e.auth),p256dh:m(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:m(e.vapidKey)}}}else if(4===r){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:m(e.auth),p256dh:m(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:m(e.vapidKey)}}}}})).close(),await(0,i.deleteDB)(v),await(0,i.deleteDB)("fcm_vapid_details_db"),await(0,i.deleteDB)("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await k(e,t),t}}async function k(e,t){const n=A(e),r=(await C()).transaction(_,"readwrite");return await r.objectStore(_).put(t,n),await r.done,t}function A({appConfig:e}){return e.appId}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},R=new a.ErrorFactory("messaging","Messaging",D);async function O(e,t){const n={method:"DELETE",headers:await P(e)};try{const r=await fetch(`${N(e.appConfig)}/${t}`,n),i=await r.json();if(i.error){const e=i.error.message;throw R.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw R.create("token-unsubscribe-failed",{errorInfo:null==e?void 0:e.toString()})}}function N({projectId:e}){return`${l}/projects/${e}/registrations`}async function P({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function M({p256dh:e,auth:t,endpoint:n,vapidKey:r}){const i={web:{endpoint:n,auth:t,p256dh:e}};return r!==u&&(i.web.applicationPubKey=r),i}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x=6048e5;async function F(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:y(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:m(t.getKey("auth")),p256dh:m(t.getKey("p256dh"))},r=await S(e.firebaseDependencies);if(r){if(function(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,a=t.p256dh===e.p256dh;return n&&r&&i&&a}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r.subscriptionOptions,n))return Date.now()>=r.createTime+x?async function(e,t){try{const n=await async function(e,t){const n=await P(e),r=M(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let a;try{const n=await fetch(`${N(e.appConfig)}/${t.token}`,i);a=await n.json()}catch(e){throw R.create("token-update-failed",{errorInfo:null==e?void 0:e.toString()})}if(a.error){const e=a.error.message;throw R.create("token-update-failed",{errorInfo:e})}if(!a.token)throw R.create("token-update-no-token");return a.token}(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await k(e.firebaseDependencies,r),n}catch(e){throw e}}(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await O(e.firebaseDependencies,r.token)}catch(e){console.warn(e)}return j(e.firebaseDependencies,n)}return j(e.firebaseDependencies,n)}async function j(e,t){const n=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */await async function(e,t){const n=await P(e),r=M(t),i={method:"POST",headers:n,body:JSON.stringify(r)};let a;try{const t=await fetch(N(e.appConfig),i);a=await t.json()}catch(e){throw R.create("token-subscribe-failed",{errorInfo:null==e?void 0:e.toString()})}if(a.error){const e=a.error.message;throw R.create("token-subscribe-failed",{errorInfo:e})}if(!a.token)throw R.create("token-subscribe-no-token");return a.token}(e,t),r={token:n,createTime:Date.now(),subscriptionOptions:t};return await k(e,r),r.token}function B(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const a=t.notification.icon;a&&(e.notification.icon=a)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){var n,r,i,a,s;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};const o=null!==(i=null===(r=t.fcmOptions)||void 0===r?void 0:r.link)&&void 0!==i?i:null===(a=t.notification)||void 0===a?void 0:a.click_action;o&&(e.fcmOptions.link=o);const c=null===(s=t.fcmOptions)||void 0===s?void 0:s.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t,e),t}function L(e,t){const n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));return n.join("")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(e){return R.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
L("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),L("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class H{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=function(e){if(!e||!e.options)throw U("App Configuration Object");if(!e.name)throw U("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const e of t)if(!n[e])throw U(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K(e){try{e.swRegistration=await navigator.serviceWorker.register(o,{scope:c}),e.swRegistration.update().catch((()=>{}))}catch(e){throw R.create("failed-service-worker-registration",{browserErrorMessage:null==e?void 0:e.message})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function q(e,t){if(!navigator)throw R.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw R.create("permission-blocked");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=u)}(e,null==t?void 0:t.vapidKey),await async function(e,t){if(t||e.swRegistration||await K(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw R.create("invalid-sw-registration");e.swRegistration=t}}(e,null==t?void 0:t.serviceWorkerRegistration),F(e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $(e,t,n){const r=function(e){switch(e){case g.NOTIFICATION_CLICKED:return"notification_open";case g.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[d],message_name:n[p],message_time:n[f],message_device_time:Math.floor(Date.now()/1e3)})}async function G(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===g.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(B(n)):e.onMessageHandler.next(B(n)));const r=n.data;var i;"object"==typeof(i=r)&&i&&d in i&&"1"===r["google.c.a.e"]&&await $(e,n.messageType,r)}const W="@firebase/messaging",V="0.12.8",z=e=>{const t=new H(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",(e=>G(t,e))),t},Y=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>q(t,e)}};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Q(){try{await(0,a.validateIndexedDBOpenable)()}catch(e){return!1}return"undefined"!=typeof window&&(0,a.isIndexedDBAvailable)()&&(0,a.areCookiesEnabled)()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}(0,s._registerComponent)(new r.Component("messaging",z,"PUBLIC")),(0,s._registerComponent)(new r.Component("messaging-internal",Y,"PRIVATE")),(0,s.registerVersion)(W,V),(0,s.registerVersion)(W,V,"esm2017")}}},{package:"@metamask/notification-services-controller>firebase>@firebase/messaging",file:"node_modules/@firebase/messaging/dist/esm/index.esm2017.js"}],[623,{"@firebase/app":618,"@firebase/component":619,"@firebase/installations":620,"@firebase/util":624,idb:4284,tslib:5016},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),e("@firebase/installations");var r,i,a=e("@firebase/component"),s=e("tslib"),o=e("idb"),c=e("@firebase/util"),u=e("@firebase/app"),l="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",d="https://fcmregistrations.googleapis.com/v1",p="FCM_MSG",f="google.c.a.c_id",h=3,g=1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function m(e){var t=new Uint8Array(e);return btoa(String.fromCharCode.apply(String,s.__spreadArray([],s.__read(t),!1))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function y(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length),i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(r||(r={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(i||(i={}));var v="fcm_token_details_db",b=5,T="fcm_token_object_Store";function w(e){return s.__awaiter(this,void 0,void 0,(function(){var t,n,r,i=this;return s.__generator(this,(function(a){switch(a.label){case 0:return"databases"in indexedDB?[4,indexedDB.databases()]:[3,2];case 1:if(t=a.sent(),n=t.map((function(e){return e.name})),!n.includes(v))return[2,null];a.label=2;case 2:return r=null,[4,o.openDB(v,b,{upgrade:function(t,n,a,o){return s.__awaiter(i,void 0,void 0,(function(){var i,a,c,u;return s.__generator(this,(function(s){switch(s.label){case 0:return n<2?[2]:t.objectStoreNames.contains(T)?[4,(i=o.objectStore(T)).index("fcmSenderId").get(e)]:[2];case 1:return a=s.sent(),[4,i.clear()];case 2:if(s.sent(),!a)return[2];if(2===n){if(!(c=a).auth||!c.p256dh||!c.endpoint)return[2];r={token:c.fcmToken,createTime:null!==(u=c.createTime)&&void 0!==u?u:Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:"string"==typeof c.vapidKey?c.vapidKey:m(c.vapidKey)}}}else(3===n||4===n)&&(r={token:(c=a).fcmToken,createTime:c.createTime,subscriptionOptions:{auth:m(c.auth),p256dh:m(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:m(c.vapidKey)}});return[2]}}))}))}})];case 3:return a.sent().close(),[4,o.deleteDB(v)];case 4:return a.sent(),[4,o.deleteDB("fcm_vapid_details_db")];case 5:return a.sent(),[4,o.deleteDB("undefined")];case 6:return a.sent(),[2,I(r)?r:null]}}))}))}function I(e){if(!e||!e.subscriptionOptions)return!1;var t=e.subscriptionOptions;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _,E="firebase-messaging-database",C=1,S="firebase-messaging-store",k=null;function A(){return k||(k=o.openDB(E,C,{upgrade:function(e,t){if(0===t)e.createObjectStore(S)}})),k}function D(e){return s.__awaiter(this,void 0,void 0,(function(){var t,n,r;return s.__generator(this,(function(i){switch(i.label){case 0:return t=N(e),[4,A()];case 1:return[4,i.sent().transaction(S).objectStore(S).get(t)];case 2:return(n=i.sent())?[2,n]:[3,3];case 3:return[4,w(e.appConfig.senderId)];case 4:return(r=i.sent())?[4,R(e,r)]:[3,6];case 5:return i.sent(),[2,r];case 6:return[2]}}))}))}function R(e,t){return s.__awaiter(this,void 0,void 0,(function(){var n,r,i;return s.__generator(this,(function(a){switch(a.label){case 0:return n=N(e),[4,A()];case 1:return r=a.sent(),[4,(i=r.transaction(S,"readwrite")).objectStore(S).put(t,n)];case 2:return a.sent(),[4,i.done];case 3:return a.sent(),[2,t]}}))}))}function O(e){return s.__awaiter(this,void 0,void 0,(function(){var t,n,r;return s.__generator(this,(function(i){switch(i.label){case 0:return t=N(e),[4,A()];case 1:return n=i.sent(),[4,(r=n.transaction(S,"readwrite")).objectStore(S).delete(t)];case 2:return i.sent(),[4,r.done];case 3:return i.sent(),[2]}}))}))}function N(e){return e.appConfig.appId}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var P=((_={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',_["only-available-in-window"]="This method is available in a Window context.",_["only-available-in-sw"]="This method is available in a service worker context.",_["permission-default"]="The notification permission was not granted and dismissed instead.",_["permission-blocked"]="The notification permission was not granted and blocked instead.",_["unsupported-browser"]="This browser doesn't support the API's required to use the Firebase SDK.",_["indexed-db-unsupported"]="This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",_["failed-service-worker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",_["token-subscribe-failed"]="A problem occurred while subscribing the user to FCM: {$errorInfo}",_["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",_["token-unsubscribe-failed"]="A problem occurred while unsubscribing the user from FCM: {$errorInfo}",_["token-update-failed"]="A problem occurred while updating the user from FCM: {$errorInfo}",_["token-update-no-token"]="FCM returned no token when updating the user to push.",_["use-sw-after-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",_["invalid-sw-registration"]="The input to useServiceWorker() must be a ServiceWorkerRegistration.",_["invalid-bg-handler"]="The input to setBackgroundMessageHandler() must be a function.",_["invalid-vapid-key"]="The public VAPID key must be a string.",_["use-vapid-key-after-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",_),M=new c.ErrorFactory("messaging","Messaging",P);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function x(e,t){return s.__awaiter(this,void 0,void 0,(function(){var n,r,i,a,o,c;return s.__generator(this,(function(s){switch(s.label){case 0:return[4,L(e)];case 1:n=s.sent(),r=U(t),i={method:"POST",headers:n,body:JSON.stringify(r)},s.label=2;case 2:return s.trys.push([2,5,,6]),[4,fetch(B(e.appConfig),i)];case 3:return[4,s.sent().json()];case 4:return a=s.sent(),[3,6];case 5:throw o=s.sent(),M.create("token-subscribe-failed",{errorInfo:null==o?void 0:o.toString()});case 6:if(a.error)throw c=a.error.message,M.create("token-subscribe-failed",{errorInfo:c});if(!a.token)throw M.create("token-subscribe-no-token");return[2,a.token]}}))}))}function F(e,t){return s.__awaiter(this,void 0,void 0,(function(){var n,r,i,a,o,c;return s.__generator(this,(function(s){switch(s.label){case 0:return[4,L(e)];case 1:n=s.sent(),r=U(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)},s.label=2;case 2:return s.trys.push([2,5,,6]),[4,fetch("".concat(B(e.appConfig),"/").concat(t.token),i)];case 3:return[4,s.sent().json()];case 4:return a=s.sent(),[3,6];case 5:throw o=s.sent(),M.create("token-update-failed",{errorInfo:null==o?void 0:o.toString()});case 6:if(a.error)throw c=a.error.message,M.create("token-update-failed",{errorInfo:c});if(!a.token)throw M.create("token-update-no-token");return[2,a.token]}}))}))}function j(e,t){return s.__awaiter(this,void 0,void 0,(function(){var n,r,i,a,o;return s.__generator(this,(function(s){switch(s.label){case 0:return[4,L(e)];case 1:n=s.sent(),r={method:"DELETE",headers:n},s.label=2;case 2:return s.trys.push([2,5,,6]),[4,fetch("".concat(B(e.appConfig),"/").concat(t),r)];case 3:return[4,s.sent().json()];case 4:if((i=s.sent()).error)throw a=i.error.message,M.create("token-unsubscribe-failed",{errorInfo:a});return[3,6];case 5:throw o=s.sent(),M.create("token-unsubscribe-failed",{errorInfo:null==o?void 0:o.toString()});case 6:return[2]}}))}))}function B(e){var t=e.projectId;return"".concat(d,"/projects/").concat(t,"/registrations")}function L(e){var t=e.appConfig,n=e.installations;return s.__awaiter(this,void 0,void 0,(function(){var e;return s.__generator(this,(function(r){switch(r.label){case 0:return[4,n.getToken()];case 1:return e=r.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":"FIS ".concat(e)})]}}))}))}function U(e){var t=e.p256dh,n=e.auth,r=e.endpoint,i=e.vapidKey,a={web:{endpoint:r,auth:n,p256dh:t}};return i!==l&&(a.web.applicationPubKey=i),a}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H=6048e5;function K(e){return s.__awaiter(this,void 0,void 0,(function(){var t,n,r,i;return s.__generator(this,(function(a){switch(a.label){case 0:return[4,W(e.swRegistration,e.vapidKey)];case 1:return t=a.sent(),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:m(t.getKey("auth")),p256dh:m(t.getKey("p256dh"))},[4,D(e.firebaseDependencies)];case 2:return(r=a.sent())?[3,3]:[2,G(e.firebaseDependencies,n)];case 3:if(s=r.subscriptionOptions,c=(o=n).vapidKey===s.vapidKey,u=o.endpoint===s.endpoint,l=o.auth===s.auth,d=o.p256dh===s.p256dh,c&&u&&l&&d)return[3,8];a.label=4;case 4:return a.trys.push([4,6,,7]),[4,j(e.firebaseDependencies,r.token)];case 5:return a.sent(),[3,7];case 6:return i=a.sent(),console.warn(i),[3,7];case 7:return[2,G(e.firebaseDependencies,n)];case 8:return Date.now()>=r.createTime+H?[2,$(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n})]:[2,r.token];case 9:return[2]}var s,o,c,u,l,d;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}))}))}function q(e){return s.__awaiter(this,void 0,void 0,(function(){var t,n;return s.__generator(this,(function(r){switch(r.label){case 0:return[4,D(e.firebaseDependencies)];case 1:return(t=r.sent())?[4,j(e.firebaseDependencies,t.token)]:[3,4];case 2:return r.sent(),[4,O(e.firebaseDependencies)];case 3:r.sent(),r.label=4;case 4:return[4,e.swRegistration.pushManager.getSubscription()];case 5:return(n=r.sent())?[2,n.unsubscribe()]:[2,!0]}}))}))}function $(e,t){return s.__awaiter(this,void 0,void 0,(function(){var n,r;return s.__generator(this,(function(i){switch(i.label){case 0:return i.trys.push([0,3,,4]),[4,F(e.firebaseDependencies,t)];case 1:return n=i.sent(),r=s.__assign(s.__assign({},t),{token:n,createTime:Date.now()}),[4,R(e.firebaseDependencies,r)];case 2:return i.sent(),[2,n];case 3:throw i.sent();case 4:return[2]}}))}))}function G(e,t){return s.__awaiter(this,void 0,void 0,(function(){var n,r;return s.__generator(this,(function(i){switch(i.label){case 0:return[4,x(e,t)];case 1:return n=i.sent(),r={token:n,createTime:Date.now(),subscriptionOptions:t},[4,R(e,r)];case 2:return i.sent(),[2,r.token]}}))}))}function W(e,t){return s.__awaiter(this,void 0,void 0,(function(){var n;return s.__generator(this,(function(r){switch(r.label){case 0:return[4,e.pushManager.getSubscription()];case 1:return(n=r.sent())?[2,n]:[2,e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:y(t)})]}}))}))}function V(e,t){return s.__awaiter(this,void 0,void 0,(function(){var n,r,i;return s.__generator(this,(function(a){switch(a.label){case 0:return r=z,i=[t],[4,e.firebaseDependencies.installations.getId()];case 1:return n=r.apply(void 0,i.concat([a.sent()])),function(e,t,n){var r={};r.event_time_ms=Math.floor(Date.now()).toString(),r.source_extension_json_proto3=JSON.stringify(t),!n||(r.compliance_data=function(e){var t={privacy_context:{prequest:{origin_associated_product_id:e}}};return t}(n));e.logEvents.push(r)}(e,n,t.productId),[2]}}))}))}function z(e,t){var n,i,a={};return e.from&&(a.project_number=e.from),e.fcmMessageId&&(a.message_id=e.fcmMessageId),a.instance_id=t,e.notification?a.message_type=r.DISPLAY_NOTIFICATION.toString():a.message_type=r.DATA_MESSAGE.toString(),a.sdk_platform=h.toString(),a.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),e.collapse_key&&(a.collapse_key=e.collapse_key),a.event=g.toString(),(null===(n=e.fcmOptions)||void 0===n?void 0:n.analytics_label)&&(a.analytics_label=null===(i=e.fcmOptions)||void 0===i?void 0:i.analytics_label),a}function Y(e,t){for(var n=[],r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));return n.join("")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(e){var t,n;return s.__awaiter(this,void 0,void 0,(function(){var r,a,o,c,u;return s.__generator(this,(function(s){switch(s.label){case 0:return(r=null===(n=null===(t=e.notification)||void 0===t?void 0:t.data)||void 0===n?void 0:n[p])?e.action?[2]:(e.stopImmediatePropagation(),e.notification.close(),a=function(e){var t,n,r,i=null!==(n=null===(t=e.fcmOptions)||void 0===t?void 0:t.link)&&void 0!==n?n:null===(r=e.notification)||void 0===r?void 0:r.click_action;if(i)return i;return a=e.data,"object"==typeof a&&a&&f in a?self.location.origin:null;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var a;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r),a?(o=new URL(a,self.location.href),c=new URL(self.location.origin),o.host!==c.host?[2]:[4,X(o)]):[2]):[2];case 1:return(u=s.sent())?[3,4]:[4,self.clients.openWindow(a)];case 2:return u=s.sent(),[4,(l=3e3,new Promise((function(e){setTimeout(e,l)})))];case 3:return s.sent(),[3,6];case 4:return[4,u.focus()];case 5:u=s.sent(),s.label=6;case 6:return u?(r.messageType=i.NOTIFICATION_CLICKED,r.isFirebaseMessaging=!0,[2,u.postMessage(r)]):[2]}var l;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}))}))}function J(e){var t,n=s.__assign({},e.notification);return n.data=((t={})[p]=e,t),n}function X(e){return s.__awaiter(this,void 0,void 0,(function(){var t,n,r,i,a,o,c;return s.__generator(this,(function(u){switch(u.label){case 0:return[4,ee()];case 1:t=u.sent();try{for(n=s.__values(t),r=n.next();!r.done;r=n.next())if(i=r.value,a=new URL(i.url,self.location.href),e.host===a.host)return[2,i]}catch(e){o={error:e}}finally{try{r&&!r.done&&(c=n.return)&&c.call(n)}finally{if(o)throw o.error}}return[2,null]}}))}))}function Z(e,t){var n,r;t.isFirebaseMessaging=!0,t.messageType=i.PUSH_RECEIVED;try{for(var a=s.__values(e),o=a.next();!o.done;o=a.next()){o.value.postMessage(t)}}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}}function ee(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function te(e){var t,n=e.actions,r=Notification.maxActions;return n&&r&&n.length>r&&console.warn("This browser only supports ".concat(r," actions. The remaining actions will not be displayed.")),self.registration.showNotification(null!==(t=e.title)&&void 0!==t?t:"",e)}function ne(e){return M.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Y("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),Y("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");var re=function(){function e(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;var r=function(e){var t,n;if(!e||!e.options)throw ne("App Configuration Object");if(!e.name)throw ne("App Name");var r=e.options;try{for(var i=s.__values(["projectId","apiKey","appId","messagingSenderId"]),a=i.next();!a.done;a=i.next()){var o=a.value;if(!r[o])throw ne(o)}}catch(e){t={error:e}}finally{try{a&&!a.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}return{appName:e.name,projectId:r.projectId,apiKey:r.apiKey,appId:r.appId,senderId:r.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}return e.prototype._delete=function(){return Promise.resolve()},e}(),ie=function(e){var t=new re(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return self.addEventListener("push",(function(e){e.waitUntil(function(e,t){return s.__awaiter(this,void 0,void 0,(function(){var n,r,i;return s.__generator(this,(function(a){switch(a.label){case 0:return n=function(e){var t=e.data;if(!t)return null;try{return t.json()}catch(e){return null}}(e),n?t.deliveryMetricsExportedToBigQueryEnabled?[4,V(t,n)]:[3,2]:[2];case 1:a.sent(),a.label=2;case 2:return[4,ee()];case 3:return function(e){return e.some((function(e){return"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")}))}(r=a.sent())?[2,Z(r,n)]:n.notification?[4,te(J(n))]:[3,5];case 4:a.sent(),a.label=5;case 5:return t?t.onBackgroundMessageHandler?(i=function(e){var t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(t.notification){e.notification={};var n=t.notification.title;n&&(e.notification.title=n);var r=t.notification.body;r&&(e.notification.body=r);var i=t.notification.image;i&&(e.notification.image=i);var a=t.notification.icon;a&&(e.notification.icon=a)}}(t,e),function(e,t){t.data&&(e.data=t.data)}(t,e),function(e,t){var n,r,i,a,s;if(t.fcmOptions||(null===(n=t.notification)||void 0===n?void 0:n.click_action)){e.fcmOptions={};var o=null!==(i=null===(r=t.fcmOptions)||void 0===r?void 0:r.link)&&void 0!==i?i:null===(a=t.notification)||void 0===a?void 0:a.click_action;o&&(e.fcmOptions.link=o);var c=null===(s=t.fcmOptions)||void 0===s?void 0:s.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}}(t,e),t}(n),"function"!=typeof t.onBackgroundMessageHandler?[3,7]:[4,t.onBackgroundMessageHandler(i)]):[3,8]:[2];case 6:return a.sent(),[3,8];case 7:t.onBackgroundMessageHandler.next(i),a.label=8;case 8:return[2]}}))}))}(e,t))})),self.addEventListener("pushsubscriptionchange",(function(e){e.waitUntil(function(e,t){var n,r;return s.__awaiter(this,void 0,void 0,(function(){var i;return s.__generator(this,(function(a){switch(a.label){case 0:return e.newSubscription?[3,2]:[4,q(t)];case 1:case 5:return a.sent(),[2];case 2:return[4,D(t.firebaseDependencies)];case 3:return i=a.sent(),[4,q(t)];case 4:return a.sent(),t.vapidKey=null!==(r=null===(n=null==i?void 0:i.subscriptionOptions)||void 0===n?void 0:n.vapidKey)&&void 0!==r?r:l,[4,K(t)]}}))}))}(e,t))})),self.addEventListener("notificationclick",(function(e){e.waitUntil(Q(e))})),t};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ae(){return s.__awaiter(this,void 0,void 0,(function(){var e;return s.__generator(this,(function(t){switch(t.label){case 0:return(e=c.isIndexedDBAvailable())?[4,c.validateIndexedDBOpenable()]:[3,2];case 1:e=t.sent(),t.label=2;case 2:return[2,e&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")]}}))}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */u._registerComponent(new a.Component("messaging-sw",ie,"PUBLIC")),n.experimentalSetDeliveryMetricsExportedToBigQueryEnabled=function(e,t){
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return function(e,t){e.deliveryMetricsExportedToBigQueryEnabled=t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e=c.getModularInstance(e),t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getMessaging=function(e){return void 0===e&&(e=u.getApp()),ae().then((function(e){if(!e)throw M.create("unsupported-browser")}),(function(e){throw M.create("indexed-db-unsupported")})),u._getProvider(c.getModularInstance(e),"messaging-sw").getImmediate()},n.isSupported=ae,n.onBackgroundMessage=function(e,t){return function(e,t){if(self.document!==undefined)throw M.create("only-available-in-sw");return e.onBackgroundMessageHandler=t,function(){e.onBackgroundMessageHandler=null}}(e=c.getModularInstance(e),t)}}}},{package:"@metamask/notification-services-controller>firebase>@firebase/messaging",file:"node_modules/@firebase/messaging/dist/index.sw.cjs"}],[624,{_process:4622},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(e){(function(){Object.defineProperty(n,"__esModule",{value:!0}),n.Sha1=n.RANDOM_FACTOR=n.MAX_VALUE_MILLIS=n.FirebaseError=n.ErrorFactory=n.Deferred=n.DecodeBase64StringError=n.CONSTANTS=void 0,n.areCookiesEnabled=function(){if("undefined"==typeof navigator||!navigator.cookieEnabled)return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.assertionError=n.assert=void 0,n.async=function(e,t){return(...n)=>{Promise.resolve(!0).then((()=>{e(...n)})).catch((e=>{t&&t(e)}))}},n.base64urlEncodeWithoutPadding=n.base64Encode=n.base64Decode=n.base64=void 0,n.calculateBackoffMillis=function(e,t=k,n=A){const r=t*Math.pow(n,e),i=Math.round(R*r*(Math.random()-.5)*2);return Math.min(D,r+i)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.contains=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.createMockUserToken=function(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[u(JSON.stringify({alg:"none",type:"JWT"})),u(JSON.stringify(a)),""].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.createSubscribe=function(e,t){const n=new E(e,t);return n.subscribe.bind(n)},n.decode=void 0,n.deepCopy=function(e){return d(undefined,e)},n.deepEqual=function e(t,n){if(t===n)return!0;const r=Object.keys(t),i=Object.keys(n);for(const a of r){if(!i.includes(a))return!1;const r=t[a],s=n[a];if(_(r)&&_(s)){if(!e(r,s))return!1}else if(r!==s)return!1}for(const e of i)if(!r.includes(e))return!1;return!0},n.deepExtend=d,n.errorPrefix=S,n.extractQuerystring=function(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:undefined)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getExperimentalSetting=n.getDefaults=n.getDefaultEmulatorHostnameAndPort=n.getDefaultEmulatorHost=n.getDefaultAppConfig=void 0,n.getGlobal=p,n.getModularInstance=
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){return e&&e._delegate?e._delegate:e},n.getUA=m,n.isAdmin=void 0,n.isBrowser=function(){return"object"==typeof self&&self.self===self},n.isBrowserExtension=function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:undefined;return"object"==typeof e&&e.id!==undefined},n.isElectron=function(){return m().indexOf("Electron/")>=0},n.isEmpty=function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0},n.isIE=function(){const e=m();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0},n.isIndexedDBAvailable=function(){try{return"object"==typeof indexedDB}catch(e){return!1}},n.isMobileCordova=function(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(m())},n.isNode=y,n.isNodeSdk=function(){return!0===t.NODE_CLIENT||!0===t.NODE_ADMIN},n.isReactNative=function(){return"object"==typeof navigator&&"ReactNative"===navigator.product},n.isSafari=function(){return!y()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")},n.isUWP=function(){return m().indexOf("MSAppHost/")>=0},n.issuedAtTime=n.isValidTimestamp=n.isValidFormat=void 0,n.jsonEval=w,n.map=function(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r},n.ordinal=function(e){if(!Number.isFinite(e))return`${e}`;return e+function(e){e=Math.abs(e);const t=e%100;if(t>=10&&t<=20)return"th";const n=e%10;if(1===n)return"st";if(2===n)return"nd";if(3===n)return"rd";return"th"}(e)},n.promiseWithTimeout=
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t=2e3){const n=new g;return setTimeout((()=>n.reject("timeout!")),t),e.then(n.resolve,n.reject),n.promise}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.querystring=function(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""},n.querystringDecode=function(e){const t={},n=e.replace(/^\?/,"").split("&");return n.forEach((e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}})),t},n.safeGet=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:undefined},n.stringToByteArray=n.stringLength=void 0,n.stringify=function(e){return JSON.stringify(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.validateArgCount=n.uuidv4=void 0,n.validateCallback=function(e,t,n,r){if(r&&!n)return;if("function"!=typeof n)throw new Error(S(e,t)+"must be a valid function.")},n.validateContextObject=function(e,t,n,r){if(r&&!n)return;if("object"!=typeof n||null===n)throw new Error(S(e,t)+"must be a valid context object.")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.validateIndexedDBOpenable=function(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))},n.validateNamespace=function(e,t,n){if(n&&!t)return;if("string"!=typeof t)throw new Error(S(e,"namespace")+"must be a valid firebase namespace.")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const t=n.CONSTANTS={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},r=function(e,t){if(!e)throw i(t)};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.assert=r;const i=function(e){return new Error("Firebase Database ("+t.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.assertionError=i;const a=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},s=n.base64={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){const i=e[t],a=t+1<e.length,s=a?e[t+1]:0,o=t+2<e.length,c=o?e[t+2]:0,u=i>>2,l=(3&i)<<4|s>>4;let d=(15&s)<<2|c>>6,p=63&c;o||(p=64,a||(d=64)),r.push(n[u],n[l],n[d],n[p])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(a(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const a=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&a)}else if(i>239&&i<365){const a=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(a>>10)),t[r++]=String.fromCharCode(56320+(1023&a))}else{const a=e[n++],s=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&a)<<6|63&s)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){const i=n[e.charAt(t++)],a=t<e.length?n[e.charAt(t)]:0;++t;const s=t<e.length?n[e.charAt(t)]:64;++t;const c=t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==a||null==s||null==c)throw new o;const u=i<<2|a>>4;if(r.push(u),64!==s){const e=a<<4&240|s>>2;if(r.push(e),64!==c){const e=s<<6&192|c;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class o extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}n.DecodeBase64StringError=o;const c=function(e){const t=a(e);return s.encodeByteArray(t,!0)};n.base64Encode=c;const u=function(e){return c(e).replace(/\./g,"")};n.base64urlEncodeWithoutPadding=u;const l=function(e){try{return s.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:e===undefined&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=d(e[n],t[n]));return e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function p(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.base64Decode=l;const f=()=>{try{return p().__FIREBASE_DEFAULTS__||(()=>{if(void 0===e||void 0===e.env)return})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&l(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}};n.getDefaults=f;const h=e=>{var t,n;return null===(n=null===(t=f())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]};n.getDefaultEmulatorHost=h;n.getDefaultEmulatorHostnameAndPort=e=>{const t=h(e);if(!t)return undefined;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]};n.getDefaultAppConfig=()=>{var e;return null===(e=f())||void 0===e?void 0:e.config};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.getExperimentalSetting=e=>{var t;return null===(t=f())||void 0===t?void 0:t[`_${e}`]};class g{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function y(){var e;const t=null===(e=f())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(e){return!1}}n.Deferred=g;class v extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,v.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,b.prototype.create)}}n.FirebaseError=v;class b{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?function(e,t){return e.replace(T,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(i,n):"Error",s=`${this.serviceName}: ${a} (${r}).`;return new v(r,s,n)}}n.ErrorFactory=b;const T=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w(e){return JSON.parse(e)}const I=function(e){let t={},n={},r={},i="";try{const a=e.split(".");t=w(l(a[0])||""),n=w(l(a[1])||""),i=a[2],r=n.d||{},delete n.d}catch(e){}return{header:t,claims:n,data:r,signature:i}};n.decode=I;n.isValidTimestamp=function(e){const t=I(e).claims,n=Math.floor((new Date).getTime()/1e3);let r=0,i=0;return"object"==typeof t&&(t.hasOwnProperty("nbf")?r=t.nbf:t.hasOwnProperty("iat")&&(r=t.iat),i=t.hasOwnProperty("exp")?t.exp:r+86400),!!n&&!!r&&!!i&&n>=r&&n<=i};n.issuedAtTime=function(e){const t=I(e).claims;return"object"==typeof t&&t.hasOwnProperty("iat")?t.iat:null};n.isValidFormat=function(e){const t=I(e).claims;return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")};function _(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.isAdmin=function(e){const t=I(e).claims;return"object"==typeof t&&!0===t.admin};n.Sha1=class{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"==typeof e)for(let r=0;r<16;r++)n[r]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let r=0;r<16;r++)n[r]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){const t=n[e-3]^n[e-8]^n[e-14]^n[e-16];n[e]=4294967295&(t<<1|t>>>31)}let r,i,a=this.chain_[0],s=this.chain_[1],o=this.chain_[2],c=this.chain_[3],u=this.chain_[4];for(let e=0;e<80;e++){e<40?e<20?(r=c^s&(o^c),i=1518500249):(r=s^o^c,i=1859775393):e<60?(r=s&o|c&(s|o),i=2400959708):(r=s^o^c,i=3395469782);const t=(a<<5|a>>>27)+r+u+i+n[e]&4294967295;u=c,c=o,o=4294967295&(s<<30|s>>>2),s=a,a=t}this.chain_[0]=this.chain_[0]+a&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(null==e)return;t===undefined&&(t=e.length);const n=t-this.blockSize;let r=0;const i=this.buf_;let a=this.inbuf_;for(;r<t;){if(0===a)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"==typeof e){for(;r<t;)if(i[a]=e.charCodeAt(r),++a,++r,a===this.blockSize){this.compress_(i),a=0;break}}else for(;r<t;)if(i[a]=e[r],++a,++r,a===this.blockSize){this.compress_(i),a=0;break}}this.inbuf_=a,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let t=0;t<5;t++)for(let r=24;r>=0;r-=8)e[n]=this.chain_[t]>>r&255,++n;return e}};class E{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((()=>{e(this)})).catch((e=>{this.error(e)}))}next(e){this.forEachObserver((t=>{t.next(e)}))}error(e){this.forEachObserver((t=>{t.error(e)})),this.close(e)}complete(){this.forEachObserver((e=>{e.complete()})),this.close()}subscribe(e,t,n){let r;if(e===undefined&&t===undefined&&n===undefined)throw new Error("Missing Observer.");r=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},r.next===undefined&&(r.next=C),r.error===undefined&&(r.error=C),r.complete===undefined&&(r.complete=C);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}})),this.observers.push(r),i}unsubscribeOne(e){this.observers!==undefined&&this.observers[e]!==undefined&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&this.onNoObservers!==undefined&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then((()=>{if(this.observers!==undefined&&this.observers[e]!==undefined)try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))}close(e){this.finalized||(this.finalized=!0,e!==undefined&&(this.finalError=e),this.task.then((()=>{this.observers=undefined,this.onNoObservers=undefined})))}}function C(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(e,t){return`${e} failed: ${t} argument `}n.validateArgCount=function(e,t,n,r){let i;if(r<t?i="at least "+t:r>n&&(i=0===n?"none":"no more than "+n),i){throw new Error(e+" failed: Was called with "+r+(1===r?" argument.":" arguments.")+" Expects "+i+".")}};n.stringToByteArray=function(e){const t=[];let n=0;for(let i=0;i<e.length;i++){let a=e.charCodeAt(i);if(a>=55296&&a<=56319){const t=a-55296;i++,r(i<e.length,"Surrogate pair missing trail surrogate.");a=65536+(t<<10)+(e.charCodeAt(i)-56320)}a<128?t[n++]=a:a<2048?(t[n++]=a>>6|192,t[n++]=63&a|128):a<65536?(t[n++]=a>>12|224,t[n++]=a>>6&63|128,t[n++]=63&a|128):(t[n++]=a>>18|240,t[n++]=a>>12&63|128,t[n++]=a>>6&63|128,t[n++]=63&a|128)}return t};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.stringLength=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.uuidv4=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(e=>{const t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))};const k=1e3,A=2,D=n.MAX_VALUE_MILLIS=144e5,R=n.RANDOM_FACTOR=.5}).call(this)}).call(this,e("_process"))}}},{package:"@metamask/notification-services-controller>firebase>@firebase/util",file:"node_modules/@firebase/util/dist/index.esm2017.js"}],[625,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n){var r=Math.floor(n()*e.prob.length);return t[n()<e.prob[r]?r:e.alias[r]]};n.default=function(e,t,n){if(void 0===n&&(n=Math.random),!Array.isArray(e))throw new Error("Probabilities must be an array.");if(0===e.length)throw new Error("Probabilities array must not be empty.");var i=e.length,a=null!=t?t:Array.from({length:i},(function(e,t){return t})),s=function(e,t){var n=e.reduce((function(t,n){if(n<0)throw new Error("Probability must be a positive: p["+e.indexOf(n)+"]="+n);return t+n}),0);if(0===n)throw new Error("Probability sum must be greater than zero.");for(var r=e.map((function(e){return e*t/n})),i={prob:new Array(t),alias:new Array(t)},a=[],s=[],o=t-1;o>=0;o--)r[o]<1?a.push(o):s.push(o);for(;a.length>0&&s.length>0;){var c=a.pop(),u=s.pop();i.prob[c]=r[c],i.alias[c]=u,r[u]=r[u]+r[c]-1,r[u]<1?a.push(u):s.push(u)}for(;s.length>0;)i.prob[s.pop()]=1;for(;a.length>0;)i.prob[a.pop()]=1;return i}(e,i);return{next:function(e){return void 0===e&&(e=1),function(e,t,n,i){if(void 0===i&&(i=1),1===i)return r(e,t,n);for(var a=[],s=0;s<i;s++)a.push(r(e,t,n));return a}(s,a,n,e)}}}}}},{package:"@ngraveio/bc-ur>@keystonehq/alias-sampling",file:"node_modules/@keystonehq/alias-sampling/dist/cjs/index.js"}],[630,{"@ethereumjs/util":468,"@keystonehq/bc-ur-registry":652,buffer:3657,hdkey:4274,uuid:5062},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){Object.defineProperty(n,"__esModule",{value:!0});var r,i=e("@keystonehq/bc-ur-registry"),a=e("uuid"),s=(r=e("hdkey"))&&"object"==typeof r&&"default"in r?r.default:r,o=e("@ethereumjs/util");const c={ETH_SIGN_REQUEST:new i.RegistryType("eth-sign-request",401),ETH_SIGNATURE:new i.RegistryType("eth-signature",402),ETH_NFT_ITEM:new i.RegistryType("eth-nft-item",403)},{decodeToDataItem:u,RegistryTypes:l}=i.extend;var d,p;!function(e){e[e.requestId=1]="requestId",e[e.signData=2]="signData",e[e.dataType=3]="dataType",e[e.chainId=4]="chainId",e[e.derivationPath=5]="derivationPath",e[e.address=6]="address",e[e.origin=7]="origin"}(d||(d={})),(p=n.DataType||(n.DataType={}))[p.transaction=1]="transaction",p[p.typedData=2]="typedData",p[p.personalMessage=3]="personalMessage",p[p.typedTransaction=4]="typedTransaction";class f extends i.RegistryItem{constructor(e){super(),this.getRegistryType=()=>c.ETH_SIGN_REQUEST,this.getRequestId=()=>this.requestId,this.getSignData=()=>this.signData,this.getDataType=()=>this.dataType,this.getChainId=()=>this.chainId,this.getDerivationPath=()=>this.derivationPath.getPath(),this.getSourceFingerprint=()=>this.derivationPath.getSourceFingerprint(),this.getSignRequestAddress=()=>this.address,this.getOrigin=()=>this.origin,this.toDataItem=()=>{const e={};this.requestId&&(e[d.requestId]=new i.DataItem(this.requestId,l.UUID.getTag())),this.address&&(e[d.address]=this.address),this.chainId&&(e[d.chainId]=Number(this.chainId)),this.origin&&(e[d.origin]=this.origin),e[d.signData]=this.signData,e[d.dataType]=this.dataType;const t=this.derivationPath.toDataItem();return t.setTag(this.derivationPath.getRegistryType().getTag()),e[d.derivationPath]=t,new i.DataItem(e)},this.requestId=e.requestId,this.signData=e.signData,this.dataType=e.dataType,this.chainId=e.chainId,this.derivationPath=e.derivationPath,this.address=e.address,this.origin=e.origin}static constructETHRequest(e,n,r,s,o,c,u,l){const d=r.replace(/[m|M]\//,"").split("/"),p=new i.CryptoKeypath(d.map((e=>{const t=parseInt(e.replace("'",""));let n=!1;return e.endsWith("'")&&(n=!0),new i.PathComponent({index:t,hardened:n})})),t.from(s,"hex"));return new f({requestId:o?t.from(a.parse(o)):undefined,signData:e,dataType:n,derivationPath:p,chainId:c,address:u?t.from(u.replace("0x",""),"hex"):undefined,origin:l||undefined})}}f.fromDataItem=e=>{const t=e.getData(),n=t[d.signData],r=t[d.dataType],a=i.CryptoKeypath.fromDataItem(t[d.derivationPath]),s=t[d.chainId]?t[d.chainId]:undefined,o=t[d.address]?t[d.address]:undefined,c=t[d.requestId]?t[d.requestId].getData():undefined,u=t[d.origin]?t[d.origin]:undefined;return new f({requestId:c,signData:n,dataType:r,chainId:s,derivationPath:a,address:o,origin:u})},f.fromCBOR=e=>{const t=u(e);return f.fromDataItem(t)};const{RegistryTypes:h,decodeToDataItem:g}=i.extend;var m;!function(e){e[e.requestId=1]="requestId",e[e.signature=2]="signature",e[e.origin=3]="origin"}(m||(m={}));class y extends i.RegistryItem{constructor(e,t,n){super(),this.getRegistryType=()=>c.ETH_SIGNATURE,this.getRequestId=()=>this.requestId,this.getSignature=()=>this.signature,this.getOrigin=()=>this.origin,this.toDataItem=()=>{const e={};return this.requestId&&(e[m.requestId]=new i.DataItem(this.requestId,h.UUID.getTag())),this.origin&&(e[m.origin]=this.origin),e[m.signature]=this.signature,new i.DataItem(e)},this.signature=e,this.requestId=t,this.origin=n}}y.fromDataItem=e=>{const t=e.getData(),n=t[m.signature],r=t[m.requestId]?t[m.requestId].getData():undefined;return new y(n,r,t[m.origin])},y.fromCBOR=e=>{const t=g(e);return y.fromDataItem(t)};const{decodeToDataItem:v}=i.extend;var b;!function(e){e[e.chainId=1]="chainId",e[e.contractAddress=2]="contractAddress",e[e.contractName=3]="contractName",e[e.name=4]="name",e[e.mediaData=5]="mediaData"}(b||(b={}));class T extends i.RegistryItem{constructor(e){super(),this.getRegistryType=()=>c.ETH_NFT_ITEM,this.getChainId=()=>this.chainId,this.getName=()=>this.name,this.getmediaData=()=>this.mediaData,this.getContractAddress=()=>this.contractAddress,this.getContractName=()=>this.contractName,this.toDataItem=()=>{const e={};return e[b.chainId]=this.chainId,e[b.name]=this.name,e[b.contractAddress]=this.contractAddress,e[b.contractName]=this.contractName,e[b.mediaData]=this.mediaData,new i.DataItem(e)},this.chainId=e.chainId,this.name=e.name,this.contractAddress=e.contractAddress,this.contractName=e.contractName,this.mediaData=e.mediaData}static constructETHNFTItem(e,t,n,r,i){return new T({chainId:e,contractAddress:t,contractName:n,mediaData:i,name:r})}}T.fromDataItem=e=>{const t=e.getData(),n=t[b.chainId],r=t[b.name],i=t[b.mediaData],a=t[b.contractAddress],s=t[b.contractName];return new T({chainId:n,name:r,contractAddress:a,contractName:s,mediaData:i})},T.fromCBOR=e=>{const t=v(e);return T.fromDataItem(t)};const w=(e,t)=>{const n=s.fromExtendedKey(e).derive(t),r="0x"+o.publicToAddress(n.publicKey,!0).toString("hex");return o.toChecksumAddress(r)};i.patchTags(Object.values(c).filter((e=>!!e.getTag())).map((e=>e.getTag()))),Object.keys(i).forEach((function(e){"default"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return i[e]}})})),n.ETHNFTItem=T,n.ETHSignature=y,n.EthSignRequest=f,n.findHDPathFromAddress=(e,t,n,r)=>{for(let i=0;i<n;i++){const n=w(t,`M/0/${i}`);if(e.toLowerCase()==n.toLowerCase())return`${r}/0/${i}`}return null},n.generateAddressFromXpub=w}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/bc-ur-registry-eth",file:"node_modules/@keystonehq/bc-ur-registry-eth/dist/bc-ur-registry-eth.cjs.development.js"}],[631,{"@ethereumjs/util":468,"@keystonehq/bc-ur-registry":652,buffer:3657,hdkey:4274,uuid:5062},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){Object.defineProperty(n,"__esModule",{value:!0});var r,i=e("@keystonehq/bc-ur-registry"),a=e("uuid"),s=(r=e("hdkey"))&&"object"==typeof r&&"default"in r?r.default:r,o=e("@ethereumjs/util");const c={ETH_SIGN_REQUEST:new i.RegistryType("eth-sign-request",401),ETH_SIGNATURE:new i.RegistryType("eth-signature",402),ETH_NFT_ITEM:new i.RegistryType("eth-nft-item",403)},{decodeToDataItem:u,RegistryTypes:l}=i.extend;var d,p;!function(e){e[e.requestId=1]="requestId",e[e.signData=2]="signData",e[e.dataType=3]="dataType",e[e.chainId=4]="chainId",e[e.derivationPath=5]="derivationPath",e[e.address=6]="address",e[e.origin=7]="origin"}(d||(d={})),(p=n.DataType||(n.DataType={}))[p.transaction=1]="transaction",p[p.typedData=2]="typedData",p[p.personalMessage=3]="personalMessage",p[p.typedTransaction=4]="typedTransaction";class f extends i.RegistryItem{constructor(e){super(),this.getRegistryType=()=>c.ETH_SIGN_REQUEST,this.getRequestId=()=>this.requestId,this.getSignData=()=>this.signData,this.getDataType=()=>this.dataType,this.getChainId=()=>this.chainId,this.getDerivationPath=()=>this.derivationPath.getPath(),this.getSourceFingerprint=()=>this.derivationPath.getSourceFingerprint(),this.getSignRequestAddress=()=>this.address,this.getOrigin=()=>this.origin,this.toDataItem=()=>{const e={};this.requestId&&(e[d.requestId]=new i.DataItem(this.requestId,l.UUID.getTag())),this.address&&(e[d.address]=this.address),this.chainId&&(e[d.chainId]=Number(this.chainId)),this.origin&&(e[d.origin]=this.origin),e[d.signData]=this.signData,e[d.dataType]=this.dataType;const t=this.derivationPath.toDataItem();return t.setTag(this.derivationPath.getRegistryType().getTag()),e[d.derivationPath]=t,new i.DataItem(e)},this.requestId=e.requestId,this.signData=e.signData,this.dataType=e.dataType,this.chainId=e.chainId,this.derivationPath=e.derivationPath,this.address=e.address,this.origin=e.origin}static constructETHRequest(e,n,r,s,o,c,u,l){const d=r.replace(/[m|M]\//,"").split("/"),p=new i.CryptoKeypath(d.map((e=>{const t=parseInt(e.replace("'",""));let n=!1;return e.endsWith("'")&&(n=!0),new i.PathComponent({index:t,hardened:n})})),t.from(s,"hex"));return new f({requestId:o?t.from(a.parse(o)):void 0,signData:e,dataType:n,derivationPath:p,chainId:c,address:u?t.from(u.replace("0x",""),"hex"):void 0,origin:l||void 0})}}f.fromDataItem=e=>{const t=e.getData(),n=t[d.signData],r=t[d.dataType],a=i.CryptoKeypath.fromDataItem(t[d.derivationPath]),s=t[d.chainId]?t[d.chainId]:void 0,o=t[d.address]?t[d.address]:void 0,c=t[d.requestId]?t[d.requestId].getData():void 0;return new f({requestId:c,signData:n,dataType:r,chainId:s,derivationPath:a,address:o,origin:t[d.origin]?t[d.origin]:void 0})},f.fromCBOR=e=>{const t=u(e);return f.fromDataItem(t)};const{RegistryTypes:h,decodeToDataItem:g}=i.extend;var m;!function(e){e[e.requestId=1]="requestId",e[e.signature=2]="signature",e[e.origin=3]="origin"}(m||(m={}));class y extends i.RegistryItem{constructor(e,t,n){super(),this.getRegistryType=()=>c.ETH_SIGNATURE,this.getRequestId=()=>this.requestId,this.getSignature=()=>this.signature,this.getOrigin=()=>this.origin,this.toDataItem=()=>{const e={};return this.requestId&&(e[m.requestId]=new i.DataItem(this.requestId,h.UUID.getTag())),this.origin&&(e[m.origin]=this.origin),e[m.signature]=this.signature,new i.DataItem(e)},this.signature=e,this.requestId=t,this.origin=n}}y.fromDataItem=e=>{const t=e.getData(),n=t[m.signature],r=t[m.requestId]?t[m.requestId].getData():void 0;return new y(n,r,t[m.origin])},y.fromCBOR=e=>{const t=g(e);return y.fromDataItem(t)};const{decodeToDataItem:v}=i.extend;var b;!function(e){e[e.chainId=1]="chainId",e[e.contractAddress=2]="contractAddress",e[e.contractName=3]="contractName",e[e.name=4]="name",e[e.mediaData=5]="mediaData"}(b||(b={}));class T extends i.RegistryItem{constructor(e){super(),this.getRegistryType=()=>c.ETH_NFT_ITEM,this.getChainId=()=>this.chainId,this.getName=()=>this.name,this.getmediaData=()=>this.mediaData,this.getContractAddress=()=>this.contractAddress,this.getContractName=()=>this.contractName,this.toDataItem=()=>{const e={};return e[b.chainId]=this.chainId,e[b.name]=this.name,e[b.contractAddress]=this.contractAddress,e[b.contractName]=this.contractName,e[b.mediaData]=this.mediaData,new i.DataItem(e)},this.chainId=e.chainId,this.name=e.name,this.contractAddress=e.contractAddress,this.contractName=e.contractName,this.mediaData=e.mediaData}static constructETHNFTItem(e,t,n,r,i){return new T({chainId:e,contractAddress:t,contractName:n,mediaData:i,name:r})}}T.fromDataItem=e=>{const t=e.getData();return new T({chainId:t[b.chainId],name:t[b.name],contractAddress:t[b.contractAddress],contractName:t[b.contractName],mediaData:t[b.mediaData]})},T.fromCBOR=e=>{const t=v(e);return T.fromDataItem(t)};const w=(e,t)=>{const n=s.fromExtendedKey(e).derive(t),r="0x"+o.publicToAddress(n.publicKey,!0).toString("hex");return o.toChecksumAddress(r)};i.patchTags(Object.values(c).filter((e=>!!e.getTag())).map((e=>e.getTag()))),Object.keys(i).forEach((function(e){"default"!==e&&Object.defineProperty(n,e,{enumerable:!0,get:function(){return i[e]}})})),n.ETHNFTItem=T,n.ETHSignature=y,n.EthSignRequest=f,n.findHDPathFromAddress=(e,t,n,r)=>{for(let i=0;i<n;i++){const n=w(t,"M/0/"+i);if(e.toLowerCase()==n.toLowerCase())return`${r}/0/${i}`}return null},n.generateAddressFromXpub=w}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/bc-ur-registry-eth",file:"node_modules/@keystonehq/bc-ur-registry-eth/dist/bc-ur-registry-eth.cjs.production.min.js"}],[632,{"./bc-ur-registry-eth.cjs.development.js":630,"./bc-ur-registry-eth.cjs.production.min.js":631},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){t.exports=e("./bc-ur-registry-eth.cjs.production.min.js")}}},{package:"@keystonehq/bc-ur-registry-eth",file:"node_modules/@keystonehq/bc-ur-registry-eth/dist/index.js"}],[633,{"./RegistryItem":644,"./RegistryType":645,"./lib":655},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.Bytes=void 0;const r=e("./lib"),i=e("./RegistryItem"),a=e("./RegistryType");class s extends i.RegistryItem{constructor(e){super(),this.bytes=e,this.getRegistryType=()=>a.RegistryTypes.BYTES,this.getData=()=>this.bytes,this.toDataItem=()=>new r.DataItem(this.bytes)}}n.Bytes=s,s.fromDataItem=e=>{const t=e.getData();if(!t)throw new Error(`#[ur-registry][Bytes][fn.fromDataItem]: decoded [dataItem][#data] is undefined: ${e}`);return new s(t)},s.fromCBOR=e=>{const t=(0,r.decodeToDataItem)(e);return s.fromDataItem(t)}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/Bytes.js"}],[634,{".":652,"./RegistryItem":644,"./RegistryType":645,"./lib":655,buffer:3657},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){Object.defineProperty(n,"__esModule",{value:!0}),n.CryptoAccount=void 0;const r=e("."),i=e("./lib"),a=e("./RegistryItem"),s=e("./RegistryType");var o;!function(e){e[e.masterFingerprint=1]="masterFingerprint",e[e.outputDescriptors=2]="outputDescriptors"}(o||(o={}));class c extends a.RegistryItem{constructor(e,t){super(),this.masterFingerprint=e,this.outputDescriptors=t,this.getRegistryType=()=>s.RegistryTypes.CRYPTO_ACCOUNT,this.getMasterFingerprint=()=>this.masterFingerprint,this.getOutputDescriptors=()=>this.outputDescriptors,this.toDataItem=()=>{const e={};return this.masterFingerprint&&(e[o.masterFingerprint]=this.masterFingerprint.readUInt32BE(0)),this.outputDescriptors&&(e[o.outputDescriptors]=this.outputDescriptors.map((e=>e.toDataItem()))),new i.DataItem(e)}}}n.CryptoAccount=c,c.fromDataItem=e=>{const n=e.getData(),i=t.alloc(4),a=n[o.masterFingerprint];a&&i.writeUInt32BE(a,0);const s=n[o.outputDescriptors].map((e=>r.CryptoOutput.fromDataItem(e)));return new c(i,s)},c.fromCBOR=e=>{const t=(0,i.decodeToDataItem)(e);return c.fromDataItem(t)}}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/CryptoAccount.js"}],[635,{"./RegistryItem":644,"./RegistryType":645,"./lib":655},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.CryptoCoinInfo=n.Network=n.Type=void 0;const r=e("./lib"),i=e("./RegistryItem"),a=e("./RegistryType");var s,o,c;!function(e){e.type="1",e.network="2"}(s||(s={})),function(e){e[e.bitcoin=0]="bitcoin"}(o=n.Type||(n.Type={})),function(e){e[e.mainnet=0]="mainnet",e[e.testnet=1]="testnet"}(c=n.Network||(n.Network={}));class u extends i.RegistryItem{constructor(e,t){super(),this.type=e,this.network=t,this.getRegistryType=()=>a.RegistryTypes.CRYPTO_COIN_INFO,this.getType=()=>this.type||o.bitcoin,this.getNetwork=()=>this.network||c.mainnet,this.toDataItem=()=>{const e={};return this.type&&(e[s.type]=this.type),this.network&&(e[s.network]=this.network),new r.DataItem(e)}}}n.CryptoCoinInfo=u,u.fromDataItem=e=>{const t=e.getData(),n=t[s.type],r=t[s.network];return new u(n,r)},u.fromCBOR=e=>{const t=(0,r.decodeToDataItem)(e);return u.fromDataItem(t)}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/CryptoCoinInfo.js"}],[636,{"./RegistryItem":644,"./RegistryType":645,"./lib":655},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.CryptoECKey=void 0;const r=e("./lib"),i=e("./RegistryItem"),a=e("./RegistryType");var s;!function(e){e[e.curve=1]="curve",e[e.private=2]="private",e[e.data=3]="data"}(s||(s={}));class o extends i.RegistryItem{constructor(e){super(),this.isECKey=()=>!0,this.getCurve=()=>this.curve||0,this.isPrivateKey=()=>this.privateKey||!1,this.getData=()=>this.data,this.getRegistryType=()=>a.RegistryTypes.CRYPTO_ECKEY,this.toDataItem=()=>{const e={};return this.curve&&(e[s.curve]=this.curve),this.privateKey!==undefined&&(e[s.private]=this.privateKey),e[s.data]=this.data,new r.DataItem(e)},this.getOutputDescriptorContent=()=>this.data.toString("hex"),this.data=e.data,this.curve=e.curve,this.privateKey=e.privateKey||undefined}}n.CryptoECKey=o,o.fromDataItem=e=>{const t=e.getData(),n=t[s.curve],r=t[s.private],i=t[s.data];if(!i)throw new Error(`#[ur-registry][CryptoECKey][fn.fromDataItem]: decoded [dataItem][#data.data] is undefined: ${e}`);return new o({data:i,curve:n,privateKey:r})},o.fromCBOR=e=>{const t=(0,r.decodeToDataItem)(e);return o.fromDataItem(t)}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/CryptoECKey.js"}],[637,{"./CryptoCoinInfo":635,"./CryptoKeypath":638,"./RegistryItem":644,"./RegistryType":645,"./lib":655,bs58check:3661,buffer:3657},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){Object.defineProperty(n,"__esModule",{value:!0}),n.CryptoHDKey=void 0;const r=e("bs58check"),i=e("./CryptoCoinInfo"),a=e("./CryptoKeypath"),s=e("./lib"),o=e("./RegistryItem"),c=e("./RegistryType");var u;!function(e){e[e.is_master=1]="is_master",e[e.is_private=2]="is_private",e[e.key_data=3]="key_data",e[e.chain_code=4]="chain_code",e[e.use_info=5]="use_info",e[e.origin=6]="origin",e[e.children=7]="children",e[e.parent_fingerprint=8]="parent_fingerprint",e[e.name=9]="name",e[e.note=10]="note"}(u||(u={}));class l extends o.RegistryItem{constructor(e){super(),this.isECKey=()=>!1,this.getKey=()=>this.key,this.getChainCode=()=>this.chainCode,this.isMaster=()=>this.master,this.isPrivateKey=()=>!!this.privateKey,this.getUseInfo=()=>this.useInfo,this.getOrigin=()=>this.origin,this.getChildren=()=>this.children,this.getParentFingerprint=()=>this.parentFingerprint,this.getName=()=>this.name,this.getNote=()=>this.note,this.getBip32Key=()=>{var e,n,i;let a,s,o=0,c=t.alloc(4).fill(0);if(this.isMaster())a=t.from("0488ADE4","hex"),s=0,o=0;else{s=(null===(e=this.getOrigin())||void 0===e?void 0:e.getComponents().length)||(null===(n=this.getOrigin())||void 0===n?void 0:n.getDepth());const r=null===(i=this.getOrigin())||void 0===i?void 0:i.getComponents(),u=r[r.length-1];u&&(o=u.isHardened()?u.getIndex()+2147483648:u.getIndex(),this.getParentFingerprint()&&(c=this.getParentFingerprint())),a=this.isPrivateKey()?t.from("0488ADE4","hex"):t.from("0488B21E","hex")}const u=t.alloc(1);u.writeUInt8(s,0);const l=t.alloc(4);l.writeUInt32BE(o,0);const d=this.getChainCode(),p=this.getKey();return(0,r.encode)(t.concat([a,u,c,l,d,p]))},this.getRegistryType=()=>c.RegistryTypes.CRYPTO_HDKEY,this.getOutputDescriptorContent=()=>{var e,t,n,r,i,a,s;let o="";return this.getOrigin()&&(null===(e=this.getOrigin())||void 0===e?void 0:e.getSourceFingerprint())&&(null===(t=this.getOrigin())||void 0===t?void 0:t.getPath())&&(o+=`${null===(r=null===(n=this.getOrigin())||void 0===n?void 0:n.getSourceFingerprint())||void 0===r?void 0:r.toString("hex")}/${null===(i=this.getOrigin())||void 0===i?void 0:i.getPath()}`),o+=this.getBip32Key(),this.getChildren()&&(null===(a=this.getChildren())||void 0===a?void 0:a.getPath())&&(o+=`/${null===(s=this.getChildren())||void 0===s?void 0:s.getPath()}`),o},this.setupMasterKey=e=>{this.master=!0,this.key=e.key,this.chainCode=e.chainCode},this.setupDeriveKey=e=>{this.master=!1,this.privateKey=e.isPrivateKey,this.key=e.key,this.chainCode=e.chainCode,this.useInfo=e.useInfo,this.origin=e.origin,this.children=e.children,this.parentFingerprint=e.parentFingerprint,this.name=e.name,this.note=e.note},this.toDataItem=()=>{const e={};if(this.master)e[u.is_master]=!0,e[u.key_data]=this.key,e[u.chain_code]=this.chainCode;else{if(this.privateKey!==undefined&&(e[u.is_private]=this.privateKey),e[u.key_data]=this.key,this.chainCode&&(e[u.chain_code]=this.chainCode),this.useInfo){const t=this.useInfo.toDataItem();t.setTag(this.useInfo.getRegistryType().getTag()),e[u.use_info]=t}if(this.origin){const t=this.origin.toDataItem();t.setTag(this.origin.getRegistryType().getTag()),e[u.origin]=t}if(this.children){const t=this.children.toDataItem();t.setTag(this.children.getRegistryType().getTag()),e[u.children]=t}this.parentFingerprint&&(e[u.parent_fingerprint]=this.parentFingerprint.readUInt32BE(0)),this.name!==undefined&&(e[u.name]=this.name),this.note!==undefined&&(e[u.note]=this.note)}return new s.DataItem(e)},e.isMaster?this.setupMasterKey(e):this.setupDeriveKey(e)}}n.CryptoHDKey=l,l.fromDataItem=e=>{const n=e.getData(),r=!!n[u.is_master],s=n[u.is_private],o=n[u.key_data],c=n[u.chain_code],d=n[u.use_info]?i.CryptoCoinInfo.fromDataItem(n[u.use_info]):undefined,p=n[u.origin]?a.CryptoKeypath.fromDataItem(n[u.origin]):undefined,f=n[u.children]?a.CryptoKeypath.fromDataItem(n[u.children]):undefined,h=n[u.parent_fingerprint];let g=undefined;h&&(g=t.alloc(4),g.writeUInt32BE(h,0));const m=n[u.name],y=n[u.note];return new l({isMaster:r,isPrivateKey:s,key:o,chainCode:c,useInfo:d,origin:p,children:f,parentFingerprint:g,name:m,note:y})},l.fromCBOR=e=>{const t=(0,s.decodeToDataItem)(e);return l.fromDataItem(t)}}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/CryptoHDKey.js"}],[638,{"./PathComponent":643,"./RegistryItem":644,"./RegistryType":645,"./lib":655,buffer:3657},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){Object.defineProperty(n,"__esModule",{value:!0}),n.CryptoKeypath=void 0;const r=e("./lib"),i=e("./PathComponent"),a=e("./RegistryItem"),s=e("./RegistryType");var o;!function(e){e[e.components=1]="components",e[e.source_fingerprint=2]="source_fingerprint",e[e.depth=3]="depth"}(o||(o={}));class c extends a.RegistryItem{constructor(e=[],t,n){super(),this.components=e,this.sourceFingerprint=t,this.depth=n,this.getRegistryType=()=>s.RegistryTypes.CRYPTO_KEYPATH,this.getPath=()=>{if(0===this.components.length)return undefined;return this.components.map((e=>`${e.isWildcard()?"*":e.getIndex()}${e.isHardened()?"'":""}`)).join("/")},this.getComponents=()=>this.components,this.getSourceFingerprint=()=>this.sourceFingerprint,this.getDepth=()=>this.depth,this.toDataItem=()=>{const e={},t=[];return this.components&&this.components.forEach((e=>{e.isWildcard()?t.push([]):t.push(e.getIndex()),t.push(e.isHardened())})),e[o.components]=t,this.sourceFingerprint&&(e[o.source_fingerprint]=this.sourceFingerprint.readUInt32BE(0)),this.depth!==undefined&&(e[o.depth]=this.depth),new r.DataItem(e)}}}n.CryptoKeypath=c,c.fromDataItem=e=>{const n=e.getData(),r=[],a=n[o.components];if(a)for(let e=0;e<a.length;e+=2){const t=a[e+1],n=a[e];"number"==typeof n?r.push(new i.PathComponent({index:n,hardened:t})):r.push(new i.PathComponent({hardened:t}))}const s=n[o.source_fingerprint];let u;s&&(u=t.alloc(4),u.writeUInt32BE(s,0));const l=n[o.depth];return new c(r,u,l)},c.fromCBOR=e=>{const t=(0,r.decodeToDataItem)(e);return c.fromDataItem(t)}}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/CryptoKeypath.js"}],[639,{"./CryptoECKey":636,"./CryptoHDKey":637,"./MultiKey":642,"./RegistryItem":644,"./RegistryType":645,"./ScriptExpression":646,"./lib":655},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.CryptoOutput=void 0;const r=e("./CryptoECKey"),i=e("./CryptoHDKey"),a=e("./lib"),s=e("./MultiKey"),o=e("./RegistryItem"),c=e("./RegistryType"),u=e("./ScriptExpression");class l extends o.RegistryItem{constructor(e,t){super(),this.scriptExpressions=e,this.cryptoKey=t,this.getRegistryType=()=>c.RegistryTypes.CRYPTO_OUTPUT,this.getCryptoKey=()=>this.cryptoKey,this.getHDKey=()=>this.cryptoKey instanceof i.CryptoHDKey?this.cryptoKey:undefined,this.getECKey=()=>this.cryptoKey instanceof r.CryptoECKey?this.cryptoKey:undefined,this.getMultiKey=()=>this.cryptoKey instanceof s.MultiKey?this.cryptoKey:undefined,this.getScriptExpressions=()=>this.scriptExpressions,this._toOutputDescriptor=e=>e>=this.scriptExpressions.length?this.cryptoKey.getOutputDescriptorContent():`${this.scriptExpressions[e].getExpression()}(${this._toOutputDescriptor(e+1)})`,this.toString=()=>this._toOutputDescriptor(0),this.toDataItem=()=>{let e=this.cryptoKey.toDataItem();(this.cryptoKey instanceof r.CryptoECKey||this.cryptoKey instanceof i.CryptoHDKey)&&e.setTag(this.cryptoKey.getRegistryType().getTag());return[...this.scriptExpressions].reverse().forEach((t=>{const n=t.getTag();e.getTag()===undefined?e.setTag(n):e=new a.DataItem(e,n)})),e}}}n.CryptoOutput=l,l.fromDataItem=e=>{const t=[];let n=e;for(;;){let e=n.getTag();const r=u.ScriptExpression.fromTag(e);if(!r)break;if(t.push(r),!(n.getData()instanceof a.DataItem))break;n=n.getData(),e=n.getTag()}const o=t.length;if(o>0&&(t[o-1].getExpression()===u.ScriptExpressions.MULTISIG.getExpression()||t[o-1].getExpression()===u.ScriptExpressions.SORTED_MULTISIG.getExpression())){const e=s.MultiKey.fromDataItem(n);return new l(t,e)}if(n.getTag()===c.RegistryTypes.CRYPTO_HDKEY.getTag()){const e=i.CryptoHDKey.fromDataItem(n);return new l(t,e)}{const e=r.CryptoECKey.fromDataItem(n);return new l(t,e)}},l.fromCBOR=e=>{const t=(0,a.decodeToDataItem)(e);return l.fromDataItem(t)}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/CryptoOutput.js"}],[640,{"./RegistryItem":644,"./RegistryType":645,"./lib":655},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.CryptoPSBT=void 0;const r=e("./lib"),i=e("./RegistryItem"),a=e("./RegistryType");class s extends i.RegistryItem{constructor(e){super(),this.psbt=e,this.getRegistryType=()=>a.RegistryTypes.CRYPTO_PSBT,this.getPSBT=()=>this.psbt,this.toDataItem=()=>new r.DataItem(this.psbt)}}n.CryptoPSBT=s,s.fromDataItem=e=>{const t=e.getData();if(!t)throw new Error(`#[ur-registry][CryptoPSBT][fn.fromDataItem]: decoded [dataItem][#data] is undefined: ${e}`);return new s(t)},s.fromCBOR=e=>{const t=(0,r.decodeToDataItem)(e);return s.fromDataItem(t)}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/CryptoPSBT.js"}],[641,{"..":652,"../RegistryType":645,"../errors":647,"@ngraveio/bc-ur":2880},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.URRegistryDecoder=void 0;const r=e("@ngraveio/bc-ur"),i=e(".."),a=e("../RegistryType"),s=e("../errors");class o extends r.URDecoder{constructor(){super(...arguments),this.resultRegistryType=()=>{const e=this.resultUR();switch(e.type){case a.RegistryTypes.BYTES.getType():return i.Bytes.fromCBOR(e.cbor);case a.RegistryTypes.CRYPTO_HDKEY.getType():return i.CryptoHDKey.fromCBOR(e.cbor);case a.RegistryTypes.CRYPTO_KEYPATH.getType():return i.CryptoKeypath.fromCBOR(e.cbor);case a.RegistryTypes.CRYPTO_COIN_INFO.getType():return i.CryptoCoinInfo.fromCBOR(e.cbor);case a.RegistryTypes.CRYPTO_ECKEY.getType():return i.CryptoECKey.fromCBOR(e.cbor);case a.RegistryTypes.CRYPTO_OUTPUT.getType():return i.CryptoOutput.fromCBOR(e.cbor);case a.RegistryTypes.CRYPTO_PSBT.getType():return i.CryptoPSBT.fromCBOR(e.cbor);case a.RegistryTypes.CRYPTO_ACCOUNT.getType():return i.CryptoAccount.fromCBOR(e.cbor);default:throw new s.UnknownURTypeError(`#[ur-registry][Decoder][fn.resultRegistryType]: registry type ${e.type} is not supported now`)}}}}n.URRegistryDecoder=o}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/Decoder/index.js"}],[642,{"./CryptoECKey":636,"./CryptoHDKey":637,"./RegistryItem":644,"./RegistryType":645,"./lib/DataItem":653},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.MultiKey=void 0;const r=e("./CryptoECKey"),i=e("./CryptoHDKey"),a=e("./lib/DataItem"),s=e("./RegistryItem"),o=e("./RegistryType");var c;!function(e){e[e.threshold=1]="threshold",e[e.keys=2]="keys"}(c||(c={}));class u extends s.RegistryItem{constructor(e,t){super(),this.threshold=e,this.keys=t,this.getThreshold=()=>this.threshold,this.getKeys=()=>this.keys,this.toDataItem=()=>{const e={};e[c.threshold]=this.threshold;const t=this.keys.map((e=>{const t=e.toDataItem();return t.setTag(e.getRegistryType().getTag()),t}));return e[c.keys]=t,new a.DataItem(e)},this.getOutputDescriptorContent=()=>[this.getThreshold(),this.keys.map((e=>e.getOutputDescriptorContent())).join(",")].join(",")}}n.MultiKey=u,u.fromDataItem=e=>{const t=e.getData(),n=t[c.threshold],a=t[c.keys],s=[];return a.forEach((e=>{e.getTag()===o.RegistryTypes.CRYPTO_HDKEY.getTag()?s.push(i.CryptoHDKey.fromDataItem(e)):e.getTag()===o.RegistryTypes.CRYPTO_ECKEY.getTag()&&s.push(r.CryptoECKey.fromDataItem(e))})),new u(n,s)}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/MultiKey.js"}],[643,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.PathComponent=void 0;class r{constructor(e){if(this.getIndex=()=>this.index,this.isWildcard=()=>this.wildcard,this.isHardened=()=>this.hardened,this.index=e.index,this.hardened=e.hardened,this.index!==undefined?this.wildcard=!1:this.wildcard=!0,this.index&&this.index&r.HARDENED_BIT)throw new Error(`#[ur-registry][PathComponent][fn.constructor]: Invalid index ${this.index} - most significant bit cannot be set`)}}n.PathComponent=r,r.HARDENED_BIT=2147483648}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/PathComponent.js"}],[644,{"./lib":655,"@ngraveio/bc-ur":2880},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.RegistryItem=void 0;const r=e("@ngraveio/bc-ur"),i=e("./lib");n.RegistryItem=class{constructor(){this.toCBOR=()=>{if(this.toDataItem()===undefined)throw new Error(`#[ur-registry][RegistryItem][fn.toCBOR]: registry ${this.getRegistryType()}'s method toDataItem returns undefined`);return(0,i.encodeDataItem)(this.toDataItem())},this.toUR=()=>new r.UR(this.toCBOR(),this.getRegistryType().getType()),this.toUREncoder=(e,t,n)=>{const i=this.toUR();return new r.UREncoder(i,e,t,n)}}}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/RegistryItem.js"}],[645,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.RegistryTypes=n.RegistryType=void 0;class r{constructor(e,t){this.type=e,this.tag=t,this.getTag=()=>this.tag,this.getType=()=>this.type}}n.RegistryType=r,n.RegistryTypes={UUID:new r("uuid",37),BYTES:new r("bytes",undefined),CRYPTO_HDKEY:new r("crypto-hdkey",303),CRYPTO_KEYPATH:new r("crypto-keypath",304),CRYPTO_COIN_INFO:new r("crypto-coin-info",305),CRYPTO_ECKEY:new r("crypto-eckey",306),CRYPTO_OUTPUT:new r("crypto-output",308),CRYPTO_PSBT:new r("crypto-psbt",310),CRYPTO_ACCOUNT:new r("crypto-account",311),CRYPTO_MULTI_ACCOUNTS:new r("crypto-multi-accounts",1103),QR_HARDWARE_CALL:new r("qr-hardware-call",1201),KEY_DERIVATION_CALL:new r("key-derivation-call",1301),KEY_DERIVATION_SCHEMA:new r("key-derivation-schema",1302)}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/RegistryType.js"}],[646,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.ScriptExpressions=n.ScriptExpression=void 0;class r{constructor(e,t){this.tag=e,this.expression=t,this.getTag=()=>this.tag,this.getExpression=()=>this.expression}}n.ScriptExpression=r,r.fromTag=e=>Object.values(n.ScriptExpressions).find((t=>t.getTag()===e)),n.ScriptExpressions={SCRIPT_HASH:new r(400,"sh"),WITNESS_SCRIPT_HASH:new r(401,"wsh"),PUBLIC_KEY:new r(402,"pk"),PUBLIC_KEY_HASH:new r(403,"pkh"),WITNESS_PUBLIC_KEY_HASH:new r(404,"wpkh"),COMBO:new r(405,"combo"),MULTISIG:new r(406,"multi"),SORTED_MULTISIG:new r(407,"sortedmulti"),ADDRESS:new r(307,"addr"),RAW_SCRIPT:new r(408,"raw")}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/ScriptExpression.js"}],[647,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.UnknownURTypeError=void 0;class r extends Error{constructor(e){super(e)}}n.UnknownURTypeError=r}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/errors/index.js"}],[648,{"../CryptoHDKey":637,"../RegistryItem":644,"../RegistryType":645,"../lib":655,buffer:3657},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(t){(function(){Object.defineProperty(n,"__esModule",{value:!0}),n.CryptoMultiAccounts=void 0;const r=e("../RegistryType"),i=e("../CryptoHDKey"),a=e("../RegistryItem"),s=e("../lib");var o;!function(e){e[e.masterFingerprint=1]="masterFingerprint",e[e.keys=2]="keys",e[e.device=3]="device",e[e.deviceId=4]="deviceId",e[e.version=5]="version"}(o||(o={}));class c extends a.RegistryItem{constructor(e,t,n,i,a){super(),this.masterFingerprint=e,this.keys=t,this.device=n,this.deviceId=i,this.version=a,this.getRegistryType=()=>r.RegistryTypes.CRYPTO_MULTI_ACCOUNTS,this.getMasterFingerprint=()=>this.masterFingerprint,this.getKeys=()=>this.keys,this.getDevice=()=>this.device,this.getDeviceId=()=>this.deviceId,this.getVersion=()=>this.version,this.toDataItem=()=>{const e={};return this.masterFingerprint&&(e[o.masterFingerprint]=this.masterFingerprint.readUInt32BE(0)),this.keys&&(e[o.keys]=this.keys.map((e=>{const t=e.toDataItem();return t.setTag(e.getRegistryType().getTag()),t}))),this.device&&(e[o.device]=this.device),this.deviceId&&(e[o.deviceId]=this.deviceId),this.version&&(e[o.version]=this.version),new s.DataItem(e)}}}n.CryptoMultiAccounts=c,c.fromDataItem=e=>{const n=e.getData(),r=t.alloc(4),a=n[o.masterFingerprint];a&&r.writeUInt32BE(a,0);const s=n[o.keys].map((e=>i.CryptoHDKey.fromDataItem(e))),u=n[o.device],l=n[o.deviceId],d=n[o.version];return new c(r,s,u,l,d)},c.fromCBOR=e=>{const t=(0,s.decodeToDataItem)(e);return c.fromDataItem(t)}}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/extended/CryptoMultiAccounts.js"}],[649,{"../CryptoKeypath":638,"../RegistryItem":644,"../RegistryType":645,"../lib":655},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.KeyDerivationSchema=n.DerivationAlgorithm=n.Curve=void 0;const r=e("../RegistryType"),i=e("../RegistryItem"),a=e("../lib"),s=e("../CryptoKeypath");var o,c,u;!function(e){e[e.keyPath=1]="keyPath",e[e.curve=2]="curve",e[e.algo=3]="algo"}(o||(o={})),function(e){e[e.secp256k1=0]="secp256k1",e[e.ed25519=1]="ed25519"}(c=n.Curve||(n.Curve={})),function(e){e[e.slip10=0]="slip10",e[e.bip32ed25519=1]="bip32ed25519"}(u=n.DerivationAlgorithm||(n.DerivationAlgorithm={}));class l extends i.RegistryItem{constructor(e,t=c.secp256k1,n=u.slip10){super(),this.keypath=e,this.curve=t,this.algo=n,this.getRegistryType=()=>r.RegistryTypes.KEY_DERIVATION_SCHEMA,this.getKeypath=()=>this.keypath,this.getCurve=()=>this.curve,this.getAlgo=()=>this.algo,this.toDataItem=()=>{const e={},t=this.getKeypath().toDataItem();return t.setTag(this.getKeypath().getRegistryType().getTag()),e[o.keyPath]=t,e[o.curve]=this.curve,e[o.algo]=this.algo,new a.DataItem(e)}}}n.KeyDerivationSchema=l,l.fromDataItem=e=>{const t=e.getData(),n=s.CryptoKeypath.fromDataItem(t[o.keyPath]),r=t[o.curve],i=t[o.algo];return new l(n,r,i)},l.fromCBOR=e=>{const t=(0,a.decodeToDataItem)(e);return l.fromDataItem(t)}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/extended/DerivationSchema.js"}],[6495,{"../../../components/component-library":5671,"../../../helpers/constants/design-system":6114,"./util":6518,"@metamask/controller-utils":1218},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.ResultTemplate=void 0;var r=e("@metamask/controller-utils"),i=e("../../../components/component-library"),a=e("../../../helpers/constants/design-system"),s=e("./util");function o(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function c(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,u(e,t,"set"),n),n}function u(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}var l=new WeakMap,d=new WeakSet;function p(e,t){const{error:n,header:o,icon:c,message:d,title:p}=e,f=function(e,t){return t.get?t.get.call(e):t.value}(h=this,u(h,l,"get"))===r.ApprovalType.ResultSuccess;var h;return[...(0,s.processHeader)(o)??[],{key:"container",element:"Box",props:{flexDirection:a.FlexDirection.Column,alignItems:a.AlignItems.center,height:a.BlockSize.Full,padding:4},children:[{key:"content",element:"Box",props:{flexDirection:a.FlexDirection.Column,alignItems:a.AlignItems.center,justifyContent:a.JustifyContent.center,height:a.BlockSize.Full,style:{alignSelf:a.AlignItems.stretch}},children:[null===c?undefined:{key:"icon",element:"AvatarIcon",props:{iconName:c??(f?i.IconName.Confirmation:i.IconName.Warning),size:i.IconSize.Xl,iconProps:{size:i.IconSize.Xl},color:f?a.IconColor.successDefault:a.IconColor.errorDefault,backgroundColor:f?a.BackgroundColor.successMuted:a.BackgroundColor.errorMuted},children:"Icon"},null===p?undefined:{key:"title",element:"Typography",props:{variant:a.TypographyVariant.H3,fontWeight:a.FontWeight.Bold},children:p??t(f?"resultPageSuccess":"resultPageError")},{key:"message",element:"Box",props:{alignItems:a.AlignItems.center,textAlign:a.TextAlign.Center,flexDirection:a.FlexDirection.Column,width:a.BlockSize.Full},children:f?(0,s.processString)(d,t("resultPageSuccessDefaultMessage")):(0,s.processError)(n,t("resultPageErrorDefaultMessage"))}]}]}]}n.ResultTemplate=class{constructor(e){var t,n;o(t=this,n=d),n.add(t),function(e,t,n){o(e,t),t.set(e,n)}(this,l,{writable:!0,value:void 0}),c(this,l,e)}getValues(e,t,n){return{content:function(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}(this,d,p).call(this,e.requestData||{},t),submitText:t("ok"),onSubmit:()=>n.resolvePendingApproval(e.id,e.requestData),networkDisplay:!1}}}}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/ResultTemplate.ts"}],[650,{"../RegistryItem":644,"../RegistryType":645,"../lib":655,"./DerivationSchema":649},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.KeyDerivation=void 0;const r=e("../RegistryType"),i=e("../RegistryItem"),a=e("../lib"),s=e("./DerivationSchema");var o;!function(e){e[e.schemas=1]="schemas"}(o||(o={}));class c extends i.RegistryItem{constructor(e){super(),this.schemas=e,this.getRegistryType=()=>r.RegistryTypes.KEY_DERIVATION_CALL,this.getSchemas=()=>this.schemas,this.toDataItem=()=>{const e={};return e[o.schemas]=this.schemas.map((e=>{const t=e.toDataItem();return t.setTag(e.getRegistryType().getTag()),t})),new a.DataItem(e)}}}n.KeyDerivation=c,c.fromDataItem=e=>{const t=e.getData()[o.schemas].map((e=>s.KeyDerivationSchema.fromDataItem(e)));return new c(t)},c.fromCBOR=e=>{const t=(0,a.decodeToDataItem)(e);return c.fromDataItem(t)}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/extended/KeyDerivation.js"}],[6504,{"../../../../../shared/constants/network":5145,"../../../../../shared/modules/rpc.utils":5192,"../../../../components/component-library":5671,"../../../../helpers/constants/design-system":6114,"../../../../helpers/constants/routes":6120,"../../../../helpers/constants/zendesk-url":6127,"../../utils/confirm":6579,"@metamask/network-controller":1743,"@metamask/rpc-errors":2159,react:4880},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("@metamask/rpc-errors"),i=p(e("react")),a=e("@metamask/network-controller"),s=e("../../../../../shared/constants/network"),o=e("../../../../helpers/constants/design-system"),c=e("../../../../helpers/constants/routes"),u=p(e("../../../../helpers/constants/zendesk-url")),l=e("../../../../../shared/modules/rpc.utils"),d=(e("../../../../components/component-library"),e("../../utils/confirm"));function p(e){return e&&e.__esModule?e:{default:e}}const f={id:"UNRECOGNIZED_CHAIN",severity:o.Severity.Warning,content:{element:"span",children:{element:"MetaMaskTranslation",props:{translationKey:"unrecognizedChain"}}}},h={id:"SAFE_CHAIN_LIST_PROVIDER_ERROR",severity:o.Severity.Warning,content:{element:"span",children:{element:"MetaMaskTranslation",props:{translationKey:"errorGettingSafeChainList"}}}},g={id:"MISMATCHED_CHAIN_RECOMMENDATION",severity:o.Severity.Warning,content:{element:"span",children:{element:"MetaMaskTranslation",props:{translationKey:"mismatchedChainRecommendation",variables:[{element:"a",key:"mismatchedChainLink",props:{href:u.default.VERIFY_CUSTOM_NETWORK,target:"__blank",tabIndex:0},children:{element:"MetaMaskTranslation",props:{translationKey:"mismatchedChainLinkText"}}}]}}}},m={id:"DEPRECATED_CHAIN_ALERT",severity:o.Severity.Warning,content:{element:"span",children:{element:"MetaMaskTranslation",props:{translationKey:"deprecatedNetwork"}}}},y={id:"MISMATCHED_NETWORK_NAME",severity:o.Severity.Warning,content:{element:"span",children:{element:"MetaMaskTranslation",props:{translationKey:"mismatchedNetworkName"}}}},v={id:"MISMATCHED_NETWORK_SYMBOL",severity:o.Severity.Danger,content:{element:"span",children:{element:"MetaMaskTranslation",props:{translationKey:"mismatchedNetworkSymbol"}}}},b={id:"MISMATCHED_NETWORK_RPC",severity:o.Severity.Danger,content:{element:"span",children:{element:"MetaMaskTranslation",props:{translationKey:"mismatchedRpcUrl"}}}},T={id:"MISMATCHED_NETWORK_RPC_CHAIN_ID",severity:o.Severity.Danger,content:{element:"span",children:{element:"MetaMaskTranslation",props:{translationKey:"mismatchedRpcChainId"}}}},w={id:"ERROR_CONNECTING_TO_RPC",severity:o.Severity.Danger,content:{element:"span",children:{element:"MetaMaskTranslation",props:{translationKey:"errorWhileConnectingToRPC"}}}};const I={getAlerts:async function(e,t){const n=[];if("metamask"===e.origin&&Boolean(t.matchedChain))return[];if(t.matchedChain){var r,i,a,o;(null===(r=t.matchedChain.name)||void 0===r?void 0:r.toLowerCase())!==e.requestData.chainName.toLowerCase()&&n.push(y),(null===(i=t.matchedChain.nativeCurrency)||void 0===i||null===(i=i.symbol)||void 0===i?void 0:i.toLowerCase())!==(null===(a=e.requestData.ticker)||void 0===a?void 0:a.toLowerCase())&&n.push(v);const{origin:c}=new URL(e.requestData.rpcUrl);null!==(o=t.matchedChain.rpc)&&void 0!==o&&o.map((e=>new URL(e).origin)).includes(c)||n.push(b),s.DEPRECATED_NETWORKS.includes(e.requestData.chainId)&&n.push(m)}return!t.matchedChain&&t.useSafeChainsListValidation&&(t.providerError?n.push(h):n.push(f)),n.length&&n.push(g),n},getValues:function(e,t,n,p,f){var h;const g="metamask"===e.origin,m=e.requestData.rpcUrl;let y,v;return y=g?t("wantToAddThisNetwork"):f.existingNetworkConfiguration?t("updateNetworkConfirmationTitle",[f.existingNetworkConfiguration.name]):t("addEthereumChainConfirmationTitle"),v=f.existingNetworkConfiguration?t("updateEthereumChainConfirmationDescription"):t("addEthereumChainConfirmationDescription"),{content:[{hide:!g,element:"Box",key:"network-box",props:{textAlign:o.TextAlign.Center,display:o.Display.Flex,justifyContent:o.JustifyContent.center,marginTop:4,marginBottom:2},children:[{element:"Chip",key:"network-chip",props:{label:e.requestData.chainName,backgroundColor:o.BackgroundColor.backgroundAlternative,leftIconUrl:e.requestData.imageUrl}}]},"",{element:"Typography",key:"title",children:y,props:{variant:o.TypographyVariant.H3,align:"center",fontWeight:"bold",boxProps:{margin:[0,0,4]}}},{element:"Typography",key:"description",children:v,props:{variant:o.TypographyVariant.H7,align:"center",boxProps:{margin:g?[0,8,4]:[0,0,4]}}},{element:"Typography",key:"only-add-networks-you-trust",children:[{element:"b",key:"bolded-text",props:{style:{display:g&&"-webkit-box"}},children:[`${t("addEthereumChainConfirmationRisks")} `,{hide:!g,element:"Tooltip",key:"tooltip-info",props:{position:"bottom",interactive:!0,trigger:"mouseenter",html:i.default.createElement("div",{style:{width:"180px",margin:"16px",textAlign:"left"}},t("someNetworksMayPoseSecurity")," ",i.default.createElement("a",{key:"zendesk_page_link",href:u.default.UNKNOWN_NETWORK,rel:"noreferrer",target:"_blank",style:{color:"var(--color-primary-default)"}},t("learnMoreUpperCase")))},children:[{element:"i",key:"info-circle",props:{className:"fas fa-info-circle",style:{marginLeft:"4px",color:"var(--color-icon-default)"}}}]}]},{element:"MetaMaskTranslation",key:"learn-about-risks",props:{translationKey:"addEthereumChainConfirmationRisksLearnMore",variables:[{element:"a",children:t("addEthereumChainConfirmationRisksLearnMoreLink"),key:"addEthereumChainConfirmationRisksLearnMoreLink",props:{href:u.default.USER_GUIDE_CUSTOM_NETWORKS,target:"__blank"}}]}}],props:{variant:o.TypographyVariant.H7,boxProps:{margin:g?[0,8]:0,display:o.Display.Flex,flexDirection:o.FlexDirection.Column,alignItems:o.AlignItems.center}}},{element:"TruncatedDefinitionList",key:"network-details",props:{title:t("networkDetails"),tooltips:{[t("currencySymbol")]:t("currencySymbolDefinition"),[t("networkURL")]:t("networkURLDefinition"),[t("chainId")]:t("chainIdDefinition"),[t("networkName")]:t("networkNameDefinition"),[t("blockExplorerUrl")]:t("blockExplorerUrlDefinition")},warnings:{[t("networkURL")]:(0,d.isValidASCIIURL)(m)?undefined:t("networkUrlErrorWarning",[(0,d.toPunycodeURL)(m)]),[t("currencySymbol")]:f.currencySymbolWarning},dictionary:{[t("currencySymbol")]:e.requestData.ticker,[t("networkURL")]:null!==(h=m.toLowerCase())&&void 0!==h&&h.includes(`/v3/${s.infuraProjectId}`)?m.replace(`/v3/${s.infuraProjectId}`,"").toLowerCase():m.toLowerCase(),[t("chainId")]:parseInt(e.requestData.chainId,16),[t("networkName")]:e.requestData.chainName,[t("blockExplorerUrl")]:e.requestData.rpcPrefs.blockExplorerUrl},prefaceKeys:[t("networkName"),t("networkURL"),t("chainId"),t("currencySymbol")]}}],cancelText:t("cancel"),submitText:t("approveButtonText"),loadingText:t("addingCustomNetwork"),onSubmit:async()=>{let t;try{t=await(0,l.jsonRpcRequest)(m,"eth_chainId")}catch(e){return console.error(`Request for method 'eth_chainId on ${m} failed`),[w]}if(e.requestData.chainId!==t)return console.error(`Chain ID returned by RPC URL ${m} does not match ${t}`),[T];if(await n.resolvePendingApproval(e.id,e.requestData),g){const t=e.requestData.rpcPrefs.blockExplorerUrl,r=await n.addNetwork({chainId:e.requestData.chainId,name:e.requestData.chainName,nativeCurrency:e.requestData.ticker,blockExplorerUrls:t?[t]:[],defaultBlockExplorerUrlIndex:t?0:undefined,defaultRpcEndpointIndex:0,rpcEndpoints:[{url:e.requestData.rpcUrl,type:a.RpcEndpointType.Custom}]});await n.setNewNetworkAdded({networkConfigurationId:r.rpcEndpoints[0].networkClientId,nickname:e.requestData.chainName}),p.push(c.DEFAULT_ROUTE)}return[]},onCancel:()=>n.rejectPendingApproval(e.id,r.providerErrors.userRejectedRequest().serialize()),networkDisplay:!g}},getState:function(e){return 1===parseInt(e.requestData.chainId,16)?{useWarningModal:!0}:{}}};n.default=I}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/add-ethereum-chain.js"}],[6505,{"../../../../../shared/constants/metametrics":5141},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("../../../../../shared/constants/metametrics");const i={getValues:function(e,t,n,i,a,s){const{origin:o,snapName:c,requestData:u}=e,{snapSuggestedAccountName:l}=u,{trackEvent:d}=s,p=e=>{d({event:e,category:r.MetaMetricsEventCategory.Accounts,properties:{account_type:r.MetaMetricsEventAccountType.Snap,snap_id:o,snap_name:c}})};return{content:[{element:"CreateNamedSnapAccount",key:"create-named-snap-account",props:{onActionComplete:async t=>{t.success?(p(r.MetaMetricsEventName.AddSnapAccountConfirmed),n.resolvePendingApproval(e.id,t)):(p(r.MetaMetricsEventName.AddSnapAccountCanceled),n.resolvePendingApproval(e.id,!1))},snapSuggestedAccountName:l}}],loadingText:t("addingAccount"),hideSubmitButton:!0,onLoad:()=>p(r.MetaMetricsEventName.AddSnapAccountViewed)}}};n.default=i}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/create-named-snap-account.js"}],[6506,{"../../../../../shared/constants/metametrics":5141},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("../../../../../shared/constants/metametrics");const i={getValues:function(e,t,n,i,a,s){const{origin:o,snapName:c}=e,{trackEvent:u}=s,l=e=>{u({event:e,category:r.MetaMetricsEventCategory.Accounts,properties:{account_type:r.MetaMetricsEventAccountType.Snap,snap_id:o,snap_name:c}})},d=()=>{l(r.MetaMetricsEventName.AddSnapAccountCanceled),n.resolvePendingApproval(e.id,!1)};return{content:[{element:"CreateSnapAccount",key:"create-snap-account",props:{snapId:o,snapName:c,onCancel:d}}],cancelText:t("cancel"),submitText:t("create"),onLoad:()=>l(r.MetaMetricsEventName.AddSnapAccountViewed),onSubmit:()=>{l(r.MetaMetricsEventName.AddSnapAccountConfirmed),n.resolvePendingApproval(e.id,!0)},onCancel:d}}};n.default=i}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/create-snap-account.js"}],[6507,{"../ResultTemplate":6495,"@metamask/controller-utils":1218},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("@metamask/controller-utils");const i=new(e("../ResultTemplate").ResultTemplate)(r.ApprovalType.ResultError),a={getValues:i.getValues.bind(i)};n.default=a}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/error.js"}],[6508,{"../../../../../shared/constants/app":5129,"../../../../store/actions":6824,"./add-ethereum-chain":6504,"./create-named-snap-account":6505,"./create-snap-account":6506,"./error":6507,"./remove-snap-account":6509,"./smart-transaction-status-page":6510,"./snap-account-redirect":6511,"./snaps/snap-alert/snap-alert":6512,"./snaps/snap-confirmation/snap-confirmation":6513,"./snaps/snap-default/snap-default":6514,"./snaps/snap-prompt/snap-prompt":6515,"./success":6516,"./switch-ethereum-chain":6517,"@metamask/controller-utils":1218,lodash:4479},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.TEMPLATED_CONFIRMATION_APPROVAL_TYPES=n.PRIORITY_APPROVAL_TEMPLATE_TYPES=void 0,n.getTemplateAlerts=async function(e,t){var n;const r=null===(n=w[e.type])||void 0===n?void 0:n.getAlerts,i=r?await r(e,t):[];if(!Array.isArray(i))throw new Error(`Template alerts must be an array, received: ${i}`);if(i.some((e=>(null==e?void 0:e.id)===undefined)))throw new Error(`Template alert entries must be objects with an id key. Received: ${i}`);return i},n.getTemplateState=async function(e){var t;const n=(null===(t=w[e.type])||void 0===t?void 0:t.getState)??_,r=await n(e);if("object"!=typeof r||Array.isArray(r))throw new Error(`Template state must be an object, received: ${r}`);if(null===r||r===undefined)return{};return r},n.getTemplateValues=function(e,t,n,i,s,o){var c;const u=null===(c=w[e.type])||void 0===c?void 0:c.getValues;if(!u)throw new Error(`MESSAGE_TYPE: '${e.type}' is not specified in approval templates`);const l=function(e){return{rejectPendingApproval:(...t)=>e((0,a.rejectPendingApproval)(...t)),resolvePendingApproval:(...t)=>e((0,a.resolvePendingApproval)(...t)),addNetwork:(...t)=>e((0,a.addNetwork)(...t)),setNewNetworkAdded:(...t)=>e((0,a.setNewNetworkAdded)(...t)),deleteInterface:(...t)=>e((0,a.deleteInterface)(...t))}}(n),d=u(e,t,l,i,s,o),p=(0,r.omit)(d,I),f=(0,r.pick)(d,I);if(p.length>0)throw new Error(`Received extraneous keys from ${e.type}.getValues. These keys are not passed to the confirmation page: ${Object.keys(p)}`);return f};var r=e("lodash"),i=e("@metamask/controller-utils"),a=e("../../../../store/actions"),s=e("../../../../../shared/constants/app"),o=T(e("./smart-transaction-status-page")),c=T(e("./create-snap-account")),u=T(e("./remove-snap-account")),l=T(e("./snap-account-redirect")),d=T(e("./create-named-snap-account")),p=T(e("./add-ethereum-chain")),f=T(e("./switch-ethereum-chain")),h=T(e("./success")),g=T(e("./error")),m=T(e("./snaps/snap-alert/snap-alert")),y=T(e("./snaps/snap-confirmation/snap-confirmation")),v=T(e("./snaps/snap-prompt/snap-prompt")),b=T(e("./snaps/snap-default/snap-default"));function T(e){return e&&e.__esModule?e:{default:e}}n.PRIORITY_APPROVAL_TEMPLATE_TYPES=[s.SMART_TRANSACTION_CONFIRMATION_TYPES.showSmartTransactionStatusPage];const w={[i.ApprovalType.AddEthereumChain]:p.default,[i.ApprovalType.SwitchEthereumChain]:f.default,[i.ApprovalType.ResultSuccess]:h.default,[i.ApprovalType.ResultError]:g.default,[s.SMART_TRANSACTION_CONFIRMATION_TYPES.showSmartTransactionStatusPage]:o.default,[i.ApprovalType.SnapDialogAlert]:m.default,[i.ApprovalType.SnapDialogConfirmation]:y.default,[i.ApprovalType.SnapDialogPrompt]:v.default,[i.ApprovalType.SnapDialogDefault]:b.default,[s.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.confirmAccountCreation]:c.default,[s.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.confirmAccountRemoval]:u.default,[s.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.showNameSnapAccount]:d.default,[s.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.showSnapAccountRedirect]:l.default},I=(n.TEMPLATED_CONFIRMATION_APPROVAL_TYPES=Object.keys(w),["cancelText","content","onLoad","onCancel","onSubmit","networkDisplay","submitText","loadingText","hideSubmitButton"]);async function _(){return{}}}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/index.js"}],[6509,{"../../../../../shared/constants/metametrics":5141},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("../../../../../shared/constants/metametrics");const i={getValues:function(e,t,n,i,a,s){const{origin:o,snapName:c}=e,{publicAddress:u}=e.requestData,{trackEvent:l}=s,d=e=>{l({event:e,category:r.MetaMetricsEventCategory.Accounts,properties:{account_type:r.MetaMetricsEventAccountType.Snap,snap_id:o,snap_name:c}})},p=()=>{d(r.MetaMetricsEventName.RemoveSnapAccountCanceled),n.resolvePendingApproval(e.id,!1)};return{content:[{element:"RemoveSnapAccount",key:"remove-snap-account",props:{snapId:o,snapName:c,publicAddress:u,onCancel:p}}],cancelText:t("cancel"),submitText:t("remove"),onLoad:()=>d(r.MetaMetricsEventName.RemoveSnapAccountViewed),onSubmit:()=>{d(r.MetaMetricsEventName.RemoveSnapAccountConfirmed),n.resolvePendingApproval(e.id,!0)},onCancel:p}}};n.default=i}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/remove-snap-account.js"}],[651,{"../RegistryItem":644,"../RegistryType":645,"../lib":655,"./KeyDerivation":650},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.QRHardwareCall=n.QRHardwareCallType=void 0;const r=e("../RegistryType"),i=e("../RegistryItem"),a=e("../lib"),s=e("./KeyDerivation");var o,c;!function(e){e[e.type=1]="type",e[e.params=2]="params",e[e.origin=3]="origin"}(o||(o={})),function(e){e[e.KeyDerivation=0]="KeyDerivation"}(c=n.QRHardwareCallType||(n.QRHardwareCallType={}));class u extends i.RegistryItem{constructor(e,t,n){super(),this.type=e,this.params=t,this.origin=n,this.getRegistryType=()=>r.RegistryTypes.QR_HARDWARE_CALL,this.getType=()=>this.type,this.getParams=()=>this.params,this.getOrigin=()=>this.origin,this.toDataItem=()=>{const e={};e[o.type]=this.type;const t=this.params.toDataItem();return t.setTag(this.params.getRegistryType().getTag()),e[o.params]=t,this.origin&&(e[o.origin]=this.origin),new a.DataItem(e)}}}n.QRHardwareCall=u,u.fromDataItem=e=>{const t=e.getData(),n=t[o.type]||c.KeyDerivation;let r;if(n===c.KeyDerivation)r=s.KeyDerivation.fromDataItem(t[o.params]);const i=t[o.origin];return new u(n,r,i)},u.fromCBOR=e=>{const t=(0,a.decodeToDataItem)(e);return u.fromDataItem(t)}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/extended/QRHardwareCall.js"}],[6510,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;const r={getValues:function(e,t,n,r){const{id:i,requestState:a}=e;return{content:[{element:"SmartTransactionStatusPage",key:"smart-transaction-status-page",props:{requestState:a,onCloseExtension:()=>{n.resolvePendingApproval(i,!0)},onViewActivity:()=>{n.resolvePendingApproval(i,!0)}}}],hideSubmitButton:!0}}};n.default=r}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/smart-transaction-status-page.js"}],[6511,{"../../../../../shared/constants/metametrics":5141},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("../../../../../shared/constants/metametrics");const i={getValues:function(e,t,n,i,a,s){const{origin:o,snapName:c}=e,{url:u,message:l,isBlockedUrl:d}=e.requestData,{trackEvent:p}=s,f=e=>{p({event:e,category:r.MetaMetricsEventCategory.Transactions,properties:{account_type:r.MetaMetricsEventAccountType.Snap,snap_id:o,snap_name:c}})},h=r=>u!==undefined&&null!==u&&u.length>0&&!1===d?{submitText:t("goToSite"),onSubmit:()=>{f(r),n.resolvePendingApproval(e.id,!0)}}:{};return{content:[{element:"SnapAccountRedirect",key:"snap-account-redirect",props:{url:u,message:l,snapId:o,snapName:c,isBlockedUrl:d,...h(r.MetaMetricsEventName.SnapAccountTransactionFinalizeRedirectSnapUrlClicked)}}],cancelText:t("close"),onLoad:()=>f(r.MetaMetricsEventName.SnapAccountTransactionFinalizeViewed),onCancel:()=>{f(r.MetaMetricsEventName.SnapAccountTransactionFinalizeClosed),n.resolvePendingApproval(e.id,!1)},...h(r.MetaMetricsEventName.SnapAccountTransactionFinalizeRedirectGoToSiteClicked)}}};n.default=i}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/snap-account-redirect.js"}],[6512,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;const r={getValues:function(e,t,n){const{requestData:{id:r}}=e;return{submitText:t("ok").toUpperCase(),onSubmit:()=>{n.resolvePendingApproval(e.id,null),n.deleteInterface(r)}}}};n.default=r}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/snaps/snap-alert/snap-alert.js"}],[6513,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;const r={getValues:function(e,t,n){const{requestData:{id:r}}=e;return{cancelText:t("reject"),submitText:t("approveButtonText"),onSubmit:()=>{n.resolvePendingApproval(e.id,!0),n.deleteInterface(r)},onCancel:()=>{n.resolvePendingApproval(e.id,!1),n.deleteInterface(r)}}}};n.default=r}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/snaps/snap-confirmation/snap-confirmation.js"}],[6514,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;const r={getValues:function(e,t,n){const{requestData:{id:r}}=e;return{onCancel:()=>{n.resolvePendingApproval(e.id,null),n.deleteInterface(r)}}}};n.default=r}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/snaps/snap-default/snap-default.js"}],[6515,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;const r={getValues:function(e,t,n){const{requestData:{id:r}}=e;return{cancelText:t("cancel"),submitText:t("submit"),onSubmit:t=>{n.resolvePendingApproval(e.id,t),n.deleteInterface(r)},onCancel:()=>{n.resolvePendingApproval(e.id,null),n.deleteInterface(r)}}}};n.default=r}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/snaps/snap-prompt/snap-prompt.js"}],[6516,{"../ResultTemplate":6495,"@metamask/controller-utils":1218},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("@metamask/controller-utils");const i=new(e("../ResultTemplate").ResultTemplate)(r.ApprovalType.ResultSuccess),a={getValues:i.getValues.bind(i)};n.default=a}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/success.js"}],[6517,{"../../../../helpers/constants/design-system":6114,"@metamask/rpc-errors":2159},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("@metamask/rpc-errors"),i=e("../../../../helpers/constants/design-system");const a={id:"PENDING_TX_DROP_NOTICE",severity:i.SEVERITIES.WARNING,content:{element:"span",children:{element:"MetaMaskTranslation",props:{translationKey:"switchingNetworksCancelsPendingConfirmations"}}}};const s={getAlerts:async function(e,t){const n=[];return t.unapprovedTxsCount>0&&n.push(a),n},getValues:function(e,t,n){return{content:[{element:"Typography",key:"title",children:t("switchEthereumChainConfirmationTitle"),props:{variant:i.TypographyVariant.H3,align:"center",fontWeight:"normal",boxProps:{margin:[0,0,2],padding:[0,4,0,4]}}},{element:"Typography",key:"description",children:t("switchEthereumChainConfirmationDescription"),props:{variant:i.TypographyVariant.H7,color:i.TextColor.textAlternative,align:"center",boxProps:{padding:[0,4,0,4]}}},{element:"Box",key:"status-box",props:{justifyContent:i.JustifyContent.center},children:{element:"ConfirmationNetworkSwitch",key:"network-being-switched",props:{toNetwork:e.requestData.toNetworkConfiguration,fromNetwork:e.requestData.fromNetworkConfiguration}}}],cancelText:t("cancel"),submitText:t("switchNetwork"),onSubmit:()=>n.resolvePendingApproval(e.id,e.requestData.toNetworkConfiguration),onCancel:()=>n.rejectPendingApproval(e.id,r.providerErrors.userRejectedRequest().serialize()),networkDisplay:!0}}};n.default=s}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/templates/switch-ethereum-chain.js"}],[6518,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){function r(e){return e===undefined?undefined:"string"==typeof e?e:Array.isArray(e)?e.map(r):{key:e.key,element:e.name,props:e.properties,children:r(e.children)}}Object.defineProperty(n,"__esModule",{value:!0}),n.processError=function(e,t){const n=r(e)||t;if("string"!=typeof n)return n;return{key:"error",element:"ActionableMessage",props:{type:"danger",message:n}}},n.processHeader=function(e){return r(e)},n.processString=function(e,t){const n=r(e)||t;if("string"!=typeof n)return n;return i=n,function(e,t,n){let r=0,i=0;const a=Array.from(e.matchAll(t)),s=[];for(const t of a){const a=e.substring(r,t.index);a.length&&s.push(a);const o=n(t[1],i);s.push(o),r=t.index+t[0].length,i+=1}const o=e.substring(r);return o.length&&s.push(o),s}(i,/\*\*(.+?)\*\*/gu,((e,t)=>({key:`bold-${t}`,element:"b",children:e})));var i}}}},{package:"$root$",file:"ui/pages/confirmations/confirmation/util.ts"}],[6519,{"../../../../shared/constants/network":5145},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.TypedSignSignaturePrimaryTypes=n.TYPED_SIGNATURE_VERSIONS=n.SPENDING_CAP_UNLIMITED_MSG=n.IGNORE_GAS_LIMIT_CHAIN_IDS=void 0;var r=e("../../../../shared/constants/network");n.IGNORE_GAS_LIMIT_CHAIN_IDS=[r.CHAINLIST_CHAIN_IDS_MAP.MANTLE],n.TYPED_SIGNATURE_VERSIONS={V1:"V1",V3:"V3",V4:"V4"},n.SPENDING_CAP_UNLIMITED_MSG="UNLIMITED MESSAGE",n.TypedSignSignaturePrimaryTypes={PERMIT:"Permit",ORDER:"Order"}}}},{package:"$root$",file:"ui/pages/confirmations/constants/index.ts"}],[652,{"./Bytes":633,"./CryptoAccount":634,"./CryptoCoinInfo":635,"./CryptoECKey":636,"./CryptoHDKey":637,"./CryptoKeypath":638,"./CryptoOutput":639,"./CryptoPSBT":640,"./Decoder":641,"./MultiKey":642,"./PathComponent":643,"./RegistryItem":644,"./RegistryType":645,"./ScriptExpression":646,"./errors":647,"./extended/CryptoMultiAccounts":648,"./extended/DerivationSchema":649,"./extended/KeyDerivation":650,"./extended/QRHardwareCall":651,"./lib":655,"./patchCBOR":656,"./types":657,"./utils":658,"buffer/":3664,tslib:5016},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.Buffer=n.extend=n.PathComponent=n.ScriptExpressions=n.MultiKey=n.CryptoPSBT=n.CryptoOutput=n.CryptoECKey=n.CryptoCoinInfoNetwork=n.CryptoCoinInfoType=n.CryptoCoinInfo=n.CryptoKeypath=n.CryptoMultiAccounts=n.CryptoHDKey=n.CryptoAccount=n.Bytes=n.URRegistryDecoder=n.DataItem=void 0;const r=e("tslib");e("./patchCBOR");const i=e("buffer/");Object.defineProperty(n,"Buffer",{enumerable:!0,get:function(){return i.Buffer}});const a=e("./CryptoHDKey");Object.defineProperty(n,"CryptoHDKey",{enumerable:!0,get:function(){return a.CryptoHDKey}});const s=e("./CryptoKeypath");Object.defineProperty(n,"CryptoKeypath",{enumerable:!0,get:function(){return s.CryptoKeypath}});const o=e("./CryptoCoinInfo");Object.defineProperty(n,"CryptoCoinInfo",{enumerable:!0,get:function(){return o.CryptoCoinInfo}}),Object.defineProperty(n,"CryptoCoinInfoType",{enumerable:!0,get:function(){return o.Type}}),Object.defineProperty(n,"CryptoCoinInfoNetwork",{enumerable:!0,get:function(){return o.Network}});const c=e("./CryptoECKey");Object.defineProperty(n,"CryptoECKey",{enumerable:!0,get:function(){return c.CryptoECKey}});const u=e("./Bytes");Object.defineProperty(n,"Bytes",{enumerable:!0,get:function(){return u.Bytes}});const l=e("./CryptoOutput");Object.defineProperty(n,"CryptoOutput",{enumerable:!0,get:function(){return l.CryptoOutput}});const d=e("./CryptoPSBT");Object.defineProperty(n,"CryptoPSBT",{enumerable:!0,get:function(){return d.CryptoPSBT}});const p=e("./CryptoAccount");Object.defineProperty(n,"CryptoAccount",{enumerable:!0,get:function(){return p.CryptoAccount}});const f=e("./Decoder");Object.defineProperty(n,"URRegistryDecoder",{enumerable:!0,get:function(){return f.URRegistryDecoder}});const h=e("./MultiKey");Object.defineProperty(n,"MultiKey",{enumerable:!0,get:function(){return h.MultiKey}});const g=e("./ScriptExpression");Object.defineProperty(n,"ScriptExpressions",{enumerable:!0,get:function(){return g.ScriptExpressions}});const m=e("./PathComponent");Object.defineProperty(n,"PathComponent",{enumerable:!0,get:function(){return m.PathComponent}});const y=e("./RegistryItem"),v=e("./RegistryType"),b=e("./lib");var T=e("./lib");Object.defineProperty(n,"DataItem",{enumerable:!0,get:function(){return T.DataItem}});const w=e("./utils"),I=e("./extended/CryptoMultiAccounts");Object.defineProperty(n,"CryptoMultiAccounts",{enumerable:!0,get:function(){return I.CryptoMultiAccounts}});const _={URRegistryDecoder:f.URRegistryDecoder,Bytes:u.Bytes,CryptoAccount:p.CryptoAccount,CryptoHDKey:a.CryptoHDKey,CryptoMultiAccounts:I.CryptoMultiAccounts,CryptoKeypath:s.CryptoKeypath,CryptoCoinInfo:o.CryptoCoinInfo,CryptoCoinInfoType:o.Type,CryptoCoinInfoNetwork:o.Network,CryptoECKey:c.CryptoECKey,CryptoOutput:l.CryptoOutput,CryptoPSBT:d.CryptoPSBT,MultiKey:h.MultiKey,ScriptExpressions:g.ScriptExpressions,PathComponent:m.PathComponent},E={addReader:b.addReader,addSemanticDecode:b.addSemanticDecode,addSemanticEncode:b.addSemanticEncode,addWriter:b.addWriter,patchTags:w.patchTags},C={RegistryTypes:v.RegistryTypes,RegistryItem:y.RegistryItem,RegistryType:v.RegistryType,decodeToDataItem:b.decodeToDataItem,encodeDataItem:b.encodeDataItem,cbor:E};n.extend=C,(0,r.__exportStar)(e("./errors"),n),(0,r.__exportStar)(e("./Decoder"),n),(0,r.__exportStar)(e("./lib"),n),(0,r.__exportStar)(e("./CryptoAccount"),n),(0,r.__exportStar)(e("./CryptoPSBT"),n),(0,r.__exportStar)(e("./CryptoHDKey"),n),(0,r.__exportStar)(e("./extended/CryptoMultiAccounts"),n),(0,r.__exportStar)(e("./extended/QRHardwareCall"),n),(0,r.__exportStar)(e("./extended/KeyDerivation"),n),(0,r.__exportStar)(e("./extended/DerivationSchema"),n),(0,r.__exportStar)(e("./CryptoOutput"),n),(0,r.__exportStar)(e("./CryptoCoinInfo"),n),(0,r.__exportStar)(e("./CryptoECKey"),n),(0,r.__exportStar)(e("./MultiKey"),n),(0,r.__exportStar)(e("./CryptoKeypath"),n),(0,r.__exportStar)(e("./patchCBOR"),n),(0,r.__exportStar)(e("./PathComponent"),n),(0,r.__exportStar)(e("./RegistryItem"),n),(0,r.__exportStar)(e("./RegistryType"),n),(0,r.__exportStar)(e("./types"),n),(0,r.__exportStar)(e("./utils"),n),n.default=_}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/index.js"}],[653,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.DataItem=void 0;n.DataItem=class{constructor(e,t){this.setTag=e=>{this.tag=e},this.clearTag=()=>{this.tag=undefined},this.getTag=()=>this.tag,this.getData=()=>this.data,this.data=e,this.tag=t}}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/lib/DataItem.js"}],[654,{"./DataItem":653,buffer:3657},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(n){(function(){!function(e,n){"function"==typeof define&&define.amd?define([],n):void 0!==t&&t.exports?t.exports=n():e.CBOR=n()}(this,(function(){const{DataItem:t}=e("./DataItem");var r=function(){function e(e){this.$hex=e}e.prototype={length:function(){return this.$hex.length/2},toString:function(e){if(!e||"hex"===e||16===e)return this.$hex;if("utf-8"===e){for(var t="",n=0;n<this.$hex.length;n+=2)t+="%"+this.$hex.substring(n,n+2);return decodeURIComponent(t)}if("latin"===e){for(t=[],n=0;n<this.$hex.length;n+=2)t.push(parseInt(this.$hex.substring(n,n+2),16));return String.fromCharCode.apply(String,t)}throw new Error("Unrecognised format: "+e)}},e.fromLatinString=function(t){for(var n="",r=0;r<t.length;r++){var i=t.charCodeAt(r).toString(16);1===i.length&&(i="0"+i),n+=i}return new e(n)},e.fromUtf8String=function(t){for(var n=encodeURIComponent(t),r="",i=0;i<n.length;i++)if("%"===n.charAt(i))r+=n.substring(i+1,i+3),i+=2;else{var a=n.charCodeAt(i).toString(16);a.length<2&&(a="0"+a),r+=a}return new e(r)};var r=[],i={},a=function(e){return function(){throw new Error(e+" not implemented")}};function s(){}function o(){}function c(e,t){var n=e.value;return n<24?n:24==n?t.readByte():25==n?t.readUint16():26==n?t.readUint32():27==n?t.readUint64():31==n?null:void a("Additional info: "+n)()}function u(e,t,n){var r=e<<5;t<24?n.writeByte(r|t):t<256?(n.writeByte(24|r),n.writeByte(t)):t<65536?(n.writeByte(25|r),n.writeUint16(t)):t<4294967296?(n.writeByte(26|r),n.writeUint32(t)):(n.writeByte(27|r),n.writeUint64(t))}s.prototype={peekByte:a("peekByte"),readByte:a("readByte"),readChunk:a("readChunk"),readFloat16:function(){var e=this.readUint16(),t=(32767&e)>>10,n=1023&e,r=32768&e;if(31===t)return 0===n?r?-Infinity:Infinity:NaN;var i=t?Math.pow(2,t-25)*(1024+n):Math.pow(2,-24)*n;return r?-i:i},readFloat32:function(){var e=this.readUint32(),t=(2147483647&e)>>23,n=8388607&e,r=2147483648&e;if(255===t)return 0===n?r?-Infinity:Infinity:NaN;var i=t?Math.pow(2,t-23-127)*(8388608+n):Math.pow(2,-149)*n;return r?-i:i},readFloat64:function(){var e=this.readUint32(),t=e>>20&2047,n=4294967296*(1048575&e)+this.readUint32(),r=2147483648&e;if(2047===t)return 0===n?r?-Infinity:Infinity:NaN;var i=t?Math.pow(2,t-52-1023)*(4503599627370496+n):Math.pow(2,-1074)*n;return r?-i:i},readUint16:function(){return 256*this.readByte()+this.readByte()},readUint32:function(){return 65536*this.readUint16()+this.readUint16()},readUint64:function(){return 4294967296*this.readUint32()+this.readUint32()}},o.prototype={writeByte:a("writeByte"),result:a("result"),writeFloat16:a("writeFloat16"),writeFloat32:a("writeFloat32"),writeFloat64:a("writeFloat64"),writeUint16:function(e){this.writeByte(e>>8&255),this.writeByte(255&e)},writeUint32:function(e){this.writeUint16(e>>16&65535),this.writeUint16(65535&e)},writeUint64:function(e){if(e>=9007199254740992||e<=-9007199254740992)throw new Error("Cannot encode Uint64 of: "+e+" magnitude to big (floating point errors)");this.writeUint32(Math.floor(e/4294967296)),this.writeUint32(e%4294967296)},writeString:a("writeString"),canWriteBinary:function(e){return!1},writeBinary:a("writeChunk")};var l=new Error;function d(e){var t=function(e){var t=e.readByte();return{type:t>>5,value:31&t}}(e);switch(t.type){case 0:return c(t,e);case 1:return-1-c(t,e);case 2:return e.readChunk(c(t,e));case 3:return e.readChunk(c(t,e)).toString("utf-8");case 4:case 5:var n=c(t,e),r=[];if(null!==n){5===t.type&&(n*=2);for(var a=0;a<n;a++)r[a]=d(e)}else for(var s;(s=d(e))!==l;)r.push(s);if(5===t.type){var o={};for(a=0;a<r.length;a+=2)o[r[a]]=r[a+1];return o}return r;case 6:var u=c(t,e),p=i[u];r=d(e);return p?p(r):r;case 7:if(25===t.value)return e.readFloat16();if(26===t.value)return e.readFloat32();if(27===t.value)return e.readFloat64();switch(c(t,e)){case 20:return!1;case 21:return!0;case 22:return null;case 23:return undefined;case null:return l;default:throw new Error("Unknown fixed value: "+t.value)}default:throw new Error("Unsupported header: "+JSON.stringify(t))}throw new Error("not implemented yet")}function p(e,t){for(var n=0;n<r.length;n++){var i=r[n].fn(e);if(i!==undefined)return u(6,r[n].tag,t),p(i,t)}if(e&&"function"==typeof e.toCBOR&&(e=e.toCBOR()),!1===e)u(7,20,t);else if(!0===e)u(7,21,t);else if(null===e)u(7,22,t);else if(e===undefined)u(7,23,t);else if("number"==typeof e)Math.floor(e)===e&&e<9007199254740992&&e>-9007199254740992?e<0?u(1,-1-e,t):u(0,e,t):(!function(e,t,n){n.writeByte(e<<5|t)}(7,27,t),t.writeFloat64(e));else if("string"==typeof e)t.writeString(e,(function(e){u(3,e,t)}));else if(t.canWriteBinary(e))t.writeBinary(e,(function(e){u(2,e,t)}));else{if("object"!=typeof e)throw new Error("CBOR encoding not supported: "+e);if(g.config.useToJSON&&"function"==typeof e.toJSON&&(e=e.toJSON()),Array.isArray(e)){u(4,e.length,t);for(n=0;n<e.length;n++)p(e[n],t)}else{var a=Object.keys(e);u(5,a.length,t);for(n=0;n<a.length;n++){const r=parseInt(a[n]);isNaN(r)?(p(a[n],t),p(e[a[n]],t)):(p(r,t),p(e[a[n]],t))}}}}var f=[],h=[],g={config:{useToJSON:!0},addWriter:function(e,t){"string"==typeof e?h.push((function(n){if(e===n)return t(n)})):h.push(e)},addReader:function(e,t){"string"==typeof e?f.push((function(n,r){if(e===r)return t(n,r)})):f.push(e)},encode:function(e,t){for(var n=0;n<h.length;n++){var r=(0,h[n])(t);if(r)return p(e,r),r.result()}throw new Error("Unsupported output format: "+t)},encodeDataItem:function(e,t){for(var n=0;n<h.length;n++){var r=(0,h[n])(t);if(r)return e.getTag()!==undefined?(p(e,r),r.result()):(p(e.getData(),r),r.result())}throw new Error("Unsupported output format: "+t)},decode:function(e,t){for(var n=0;n<f.length;n++){var r=(0,f[n])(e,t);if(r)return d(r)}throw new Error("Unsupported input format: "+t)},decodeToDataItem:function(e,n){for(var r=0;r<f.length;r++){var i=(0,f[r])(e,n);if(i){const e=d(i);return e instanceof t?e:new t(e)}}throw new Error("Unsupported input format: "+n)},addSemanticEncode:function(e,t){if("number"!=typeof e||e%1!=0||e<0)throw new Error("Tag must be a positive integer");return r.push({tag:e,fn:t}),this},addSemanticDecode:function(e,t){if("number"!=typeof e||e%1!=0||e<0)throw new Error("Tag must be a positive integer");return i[e]=t,this}};function m(e){this.buffer=e,this.pos=0}function y(e){this.byteLength=0,this.defaultBufferLength=16384,this.latestBuffer=n.alloc(this.defaultBufferLength),this.latestBufferOffset=0,this.completeBuffers=[],this.stringFormat=e}function v(e){this.hex=e,this.pos=0}function b(e){this.$hex="",this.finalFormat=e||"hex"}return m.prototype=Object.create(s.prototype),m.prototype.peekByte=function(){return this.buffer[this.pos]},m.prototype.readByte=function(){return this.buffer[this.pos++]},m.prototype.readUint16=function(){var e=this.buffer.readUInt16BE(this.pos);return this.pos+=2,e},m.prototype.readUint32=function(){var e=this.buffer.readUInt32BE(this.pos);return this.pos+=4,e},m.prototype.readFloat32=function(){var e=this.buffer.readFloatBE(this.pos);return this.pos+=4,e},m.prototype.readFloat64=function(){var e=this.buffer.readDoubleBE(this.pos);return this.pos+=8,e},m.prototype.readChunk=function(e){var t=n.alloc(e);return this.buffer.copy(t,0,this.pos,this.pos+=e),t},y.prototype=Object.create(o.prototype),y.prototype.writeByte=function(e){this.latestBuffer[this.latestBufferOffset++]=e,this.latestBufferOffset>=this.latestBuffer.length&&(this.completeBuffers.push(this.latestBuffer),this.latestBuffer=n.alloc(this.defaultBufferLength),this.latestBufferOffset=0),this.byteLength++},y.prototype.writeFloat32=function(e){var t=n.alloc(4);t.writeFloatBE(e,0),this.writeBuffer(t)},y.prototype.writeFloat64=function(e){var t=n.alloc(8);t.writeDoubleBE(e,0),this.writeBuffer(t)},y.prototype.writeString=function(e,t){var r=n.from(e,"utf-8");t(r.length),this.writeBuffer(r)},y.prototype.canWriteBinary=function(e){return e instanceof n},y.prototype.writeBinary=function(e,t){t(e.length),this.writeBuffer(e)},y.prototype.writeBuffer=function(e){if(!(e instanceof n))throw new TypeError("BufferWriter only accepts Buffers");this.latestBufferOffset?this.latestBuffer.length-this.latestBufferOffset>=e.length?(e.copy(this.latestBuffer,this.latestBufferOffset),this.latestBufferOffset+=e.length,this.latestBufferOffset>=this.latestBuffer.length&&(this.completeBuffers.push(this.latestBuffer),this.latestBuffer=n.alloc(this.defaultBufferLength),this.latestBufferOffset=0)):(this.completeBuffers.push(this.latestBuffer.slice(0,this.latestBufferOffset)),this.completeBuffers.push(e),this.latestBuffer=n.alloc(this.defaultBufferLength),this.latestBufferOffset=0):this.completeBuffers.push(e),this.byteLength+=e.length},y.prototype.result=function(){for(var e=n.alloc(this.byteLength),t=0,r=0;r<this.completeBuffers.length;r++){var i=this.completeBuffers[r];i.copy(e,t,0,i.length),t+=i.length}return this.latestBufferOffset&&this.latestBuffer.copy(e,t,0,this.latestBufferOffset),this.stringFormat?e.toString(this.stringFormat):e},"function"==typeof n&&(g.addReader((function(e,t){return n.isBuffer(e)?new m(e):"hex"===t||"base64"===t?new m(n.from(e,t)):void 0})),g.addWriter((function(e){return e&&"buffer"!==e?"hex"===e||"base64"===e?new y(e):void 0:new y}))),v.prototype=Object.create(s.prototype),v.prototype.peekByte=function(){var e=this.hex.substring(this.pos,2);return parseInt(e,16)},v.prototype.readByte=function(){var e=this.hex.substring(this.pos,this.pos+2);return this.pos+=2,parseInt(e,16)},v.prototype.readChunk=function(t){var r=this.hex.substring(this.pos,this.pos+2*t);return this.pos+=2*t,"function"==typeof n?n.from(r,"hex"):new e(r)},b.prototype=Object.create(o.prototype),b.prototype.writeByte=function(e){if(e<0||e>255)throw new Error("Byte value out of range: "+e);var t=e.toString(16);1==t.length&&(t="0"+t),this.$hex+=t},b.prototype.canWriteBinary=function(t){return t instanceof e||"function"==typeof n&&t instanceof n},b.prototype.writeBinary=function(t,r){if(t instanceof e)r(t.length()),this.$hex+=t.$hex;else{if(!("function"==typeof n&&t instanceof n))throw new TypeError("HexWriter only accepts BinaryHex or Buffers");r(t.length),this.$hex+=t.toString("hex")}},b.prototype.result=function(){return"buffer"===this.finalFormat&&"function"==typeof n?n.from(this.$hex,"hex"):new e(this.$hex).toString(this.finalFormat)},b.prototype.writeString=function(t,n){var r=e.fromUtf8String(t);n(r.length()),this.$hex+=r.$hex},g.addReader((function(t,n){return t instanceof e||t.$hex?new v(t.$hex):"hex"===n?new v(t):void 0})),g.addWriter((function(e){if("hex"===e)return new b})),g}();return r.addSemanticEncode(0,(function(e){if(e instanceof Date)return e.toISOString()})).addSemanticDecode(0,(function(e){return new Date(e)})).addSemanticDecode(1,(function(e){return new Date(e)})),r}))}).call(this)}).call(this,e("buffer").Buffer)}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/lib/cbor-sync.js"}],[655,{"./DataItem":653,"./cbor-sync":654},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.DataItem=n.addWriter=n.addReader=n.addSemanticEncode=n.addSemanticDecode=n.decodeToDataItem=n.encodeDataItem=void 0;var r=e("./cbor-sync");Object.defineProperty(n,"encodeDataItem",{enumerable:!0,get:function(){return r.encodeDataItem}}),Object.defineProperty(n,"decodeToDataItem",{enumerable:!0,get:function(){return r.decodeToDataItem}}),Object.defineProperty(n,"addSemanticDecode",{enumerable:!0,get:function(){return r.addSemanticDecode}}),Object.defineProperty(n,"addSemanticEncode",{enumerable:!0,get:function(){return r.addSemanticEncode}}),Object.defineProperty(n,"addReader",{enumerable:!0,get:function(){return r.addReader}}),Object.defineProperty(n,"addWriter",{enumerable:!0,get:function(){return r.addWriter}});var i=e("./DataItem");Object.defineProperty(n,"DataItem",{enumerable:!0,get:function(){return i.DataItem}})}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/lib/index.js"}],[656,{"./RegistryType":645,"./ScriptExpression":646,"./utils":658},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});const r=e("./utils"),i=e("./RegistryType"),a=e("./ScriptExpression"),s=Object.values(i.RegistryTypes).filter((e=>!!e.getTag())).map((e=>e.getTag())),o=Object.values(a.ScriptExpressions).map((e=>e.getTag()));(0,r.patchTags)(s.concat(o))}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/patchCBOR.js"}],[657,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0})}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/types.js"}],[6571,{"../../../selectors/approvals":6807,"../../../selectors/selectors":6819,"../../../selectors/util":6822,"@metamask/controller-utils":1218,reselect:4905},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.getIsRedesignedConfirmationsDeveloperEnabled=function(e){return(0,s.getPreferences)(e).isRedesignedConfirmationsDeveloperEnabled},n.oldestPendingConfirmationSelector=void 0,n.pendingConfirmationsSelector=function(e){return(0,a.getPendingApprovals)(e).filter((({type:e})=>c.includes(e)))},n.pendingConfirmationsSortedSelector=u;var r=e("@metamask/controller-utils"),i=e("reselect"),a=e("../../../selectors/approvals"),s=e("../../../selectors/selectors"),o=e("../../../selectors/util");const c=[r.ApprovalType.PersonalSign,r.ApprovalType.EthSignTypedData,r.ApprovalType.Transaction];function u(e){return(0,a.getPendingApprovals)(e).filter((({type:e})=>c.includes(e))).sort(((e,t)=>e.time-t.time))}const l=(0,i.createSelector)(u,(e=>e[0]));n.oldestPendingConfirmationSelector=(0,o.createDeepEqualSelector)(l,(e=>e))}}},{package:"$root$",file:"ui/pages/confirmations/selectors/confirm.ts"}],[6576,{"../../../../shared/constants/common":5131,"../../../../shared/constants/gas":5136,"../../../../shared/modules/Numeric":5174},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.TOKEN_TRANSFER_FUNCTION_SIGNATURE=n.SWAPS_QUOTES_ERROR=n.SWAPS_NO_QUOTES=n.REQUIRED_ERROR=n.RECIPIENT_TYPES=n.NO_RESOLUTION_FOR_DOMAIN=n.NFT_TRANSFER_FROM_FUNCTION_SIGNATURE=n.NFT_SAFE_TRANSFER_FROM_FUNCTION_SIGNATURE=n.NEGATIVE_OR_ZERO_AMOUNT_TOKENS_ERROR=n.NEGATIVE_ETH_ERROR=n.MIN_GAS_TOTAL=n.MIN_GAS_PRICE_HEX=n.MIN_GAS_PRICE_GWEI=n.MIN_GAS_PRICE_DEC=n.MIN_GAS_LIMIT_DEC=n.MAX_GAS_LIMIT_DEC=n.KNOWN_RECIPIENT_ADDRESS_WARNING=n.INVALID_RECIPIENT_ADDRESS_ERROR=n.INSUFFICIENT_TOKENS_ERROR=n.INSUFFICIENT_FUNDS_FOR_GAS_ERROR=n.INSUFFICIENT_FUNDS_ERROR=n.HIGH_FEE_WARNING_MULTIPLIER=n.FLOAT_TOKENS_ERROR=n.ENS_UNKNOWN_ERROR=n.CONTRACT_ADDRESS_ERROR=n.CONFUSING_ENS_ERROR=void 0;var r=e("../../../../shared/constants/gas"),i=e("../../../../shared/modules/Numeric"),a=e("../../../../shared/constants/common");const s=n.MIN_GAS_PRICE_DEC="0",o=n.MIN_GAS_PRICE_HEX=parseInt(s,10).toString(16);n.MIN_GAS_LIMIT_DEC=new i.Numeric("21000",10),n.MAX_GAS_LIMIT_DEC="7920027",n.HIGH_FEE_WARNING_MULTIPLIER=1.5,n.MIN_GAS_PRICE_GWEI=new i.Numeric(o,16,a.EtherDenomination.WEI).toDenomination(a.EtherDenomination.GWEI).round(1).toPrefixedHexString(),n.MIN_GAS_TOTAL=new i.Numeric(r.MIN_GAS_LIMIT_HEX,16).times(new i.Numeric(o,16,a.EtherDenomination.WEI)).toPrefixedHexString(),n.TOKEN_TRANSFER_FUNCTION_SIGNATURE="0xa9059cbb",n.NFT_TRANSFER_FROM_FUNCTION_SIGNATURE="0x23b872dd",n.NFT_SAFE_TRANSFER_FROM_FUNCTION_SIGNATURE="0xf242432a",n.INSUFFICIENT_FUNDS_ERROR="insufficientFunds",n.INSUFFICIENT_FUNDS_FOR_GAS_ERROR="insufficientFundsForGas",n.INSUFFICIENT_TOKENS_ERROR="insufficientTokens",n.NEGATIVE_ETH_ERROR="negativeETH",n.NEGATIVE_OR_ZERO_AMOUNT_TOKENS_ERROR="negativeOrZeroAmountToken",n.FLOAT_TOKENS_ERROR="floatAmountToken",n.INVALID_RECIPIENT_ADDRESS_ERROR="invalidAddressRecipient",n.REQUIRED_ERROR="required",n.KNOWN_RECIPIENT_ADDRESS_WARNING="knownAddressRecipient",n.CONTRACT_ADDRESS_ERROR="contractAddressError",n.CONFUSING_ENS_ERROR="confusingEnsDomain",n.ENS_UNKNOWN_ERROR="ensUnknownError",n.NO_RESOLUTION_FOR_DOMAIN="noDomainResolution",n.SWAPS_NO_QUOTES="swapQuotesNotAvailableErrorTitle",n.SWAPS_QUOTES_ERROR="swapFetchingQuotesErrorTitle",n.RECIPIENT_TYPES={SMART_CONTRACT:"SMART_CONTRACT",NON_CONTRACT:"NON_CONTRACT"}}}},{package:"$root$",file:"ui/pages/confirmations/send/send.constants.js"}],[6577,{"../../../../app/scripts/lib/util":130,"../../../../shared/constants/transaction":5159,"../../../../shared/modules/Numeric":5174,"./send.constants":6576,"@metamask/abi-utils":1109},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.addGasBuffer=function(e,t,n=1.5){const r=new s.Numeric(e,16),i=new s.Numeric(t,16).times(new s.Numeric(.9,10)).round(0),a=r.times(new s.Numeric(n,10)).round(0);if(r.greaterThanOrEqualTo(i))return e;if(a.lessThan(i))return a.toString();return i.toString()},n.ellipsify=function(e,t=6,n=4){if(!e)return"";return`${e.slice(0,t)}...${e.slice(-n)}`},n.generateERC1155TransferData=l,n.generateERC20TransferData=c,n.generateERC721TransferData=u,n.getAssetTransferData=function({sendToken:e,fromAddress:t,toAddress:n,amount:r}){switch(e.standard){case a.TokenStandard.ERC721:return u({toAddress:n,fromAddress:t,tokenId:e.tokenId});case a.TokenStandard.ERC1155:return l({toAddress:n,fromAddress:t,tokenId:e.tokenId});case a.TokenStandard.ERC20:default:return c({toAddress:n,amount:r,sendToken:e})}},n.isBalanceSufficient=function({amount:e="0x0",balance:t="0x0",conversionRate:n=1,gasTotal:r="0x0",primaryCurrency:i=undefined}){let a=new s.Numeric(e,16).add(new s.Numeric(r,16)),o=new s.Numeric(t,16);null!=i&&(a=a.applyConversionRate(n),o=o.applyConversionRate(n));return o.greaterThanOrEqualTo(a)},n.isERC1155BalanceSufficient=function({amount:e="0",tokenBalance:t}){const n=new s.Numeric(e,16);return new s.Numeric(t,10).greaterThanOrEqualTo(n)},n.isTokenBalanceSufficient=function({amount:e="0x0",tokenBalance:t,decimals:n}){const r=new s.Numeric(e,16).shiftedBy(n);return new s.Numeric(t,16).greaterThanOrEqualTo(r)};var r=e("@metamask/abi-utils"),i=e("../../../../app/scripts/lib/util"),a=e("../../../../shared/constants/transaction"),s=e("../../../../shared/modules/Numeric"),o=e("./send.constants");function c({toAddress:e="0x0",amount:t="0x0",sendToken:n}){return n?o.TOKEN_TRANSFER_FUNCTION_SIGNATURE+Array.prototype.map.call((0,r.encode)(["address","uint256"],[(0,i.addHexPrefix)(e),(0,i.addHexPrefix)(t)]),(e=>`00${e.toString(16)}`.slice(-2))).join(""):undefined}function u({toAddress:e="0x0",fromAddress:t="0x0",tokenId:n}){return n?o.NFT_TRANSFER_FROM_FUNCTION_SIGNATURE+Array.prototype.map.call((0,r.encode)(["address","address","uint256"],[(0,i.addHexPrefix)(t),(0,i.addHexPrefix)(e),BigInt(n)]),(e=>`00${e.toString(16)}`.slice(-2))).join(""):undefined}function l({toAddress:e="0x0",fromAddress:t="0x0",tokenId:n,amount:a="1",data:s="0"}){return n?o.NFT_SAFE_TRANSFER_FROM_FUNCTION_SIGNATURE+Array.prototype.map.call((0,r.encode)(["address","address","uint256","uint256","bytes"],[(0,i.addHexPrefix)(t),(0,i.addHexPrefix)(e),BigInt(n),(0,i.addHexPrefix)(a),(0,i.addHexPrefix)(s)]),(e=>`00${e.toString(16)}`.slice(-2))).join(""):undefined}}}},{package:"$root$",file:"ui/pages/confirmations/send/send.utils.js"}],[6579,{"../../../../shared/constants/signatures":5152,"../../../../shared/modules/transaction.utils":5201,"../../../helpers/utils/util":6162,"../constants":6519,"@metamask/controller-utils":1218,"@metamask/transaction-controller":2737},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.toPunycodeURL=n.parseSanitizeTypedDataMessage=n.isValidASCIIURL=n.isSignatureTransactionType=n.isSignatureApprovalRequest=n.isSIWESignatureRequest=n.isPermitSignatureRequest=n.isOrderSignatureRequest=n.SIGNATURE_TRANSACTION_TYPES=n.REDESIGN_USER_TRANSACTION_TYPES=n.REDESIGN_DEV_TRANSACTION_TYPES=n.REDESIGN_APPROVAL_TYPES=void 0;var r=e("@metamask/controller-utils"),i=e("@metamask/transaction-controller"),a=e("../../../../shared/constants/signatures"),s=e("../../../../shared/modules/transaction.utils"),o=e("../../../helpers/utils/util"),c=e("../constants");n.REDESIGN_APPROVAL_TYPES=[r.ApprovalType.EthSignTypedData,r.ApprovalType.PersonalSign];const u=n.REDESIGN_USER_TRANSACTION_TYPES=[i.TransactionType.contractInteraction,i.TransactionType.deployContract,i.TransactionType.tokenMethodApprove,i.TransactionType.tokenMethodIncreaseAllowance,i.TransactionType.tokenMethodSetApprovalForAll,i.TransactionType.tokenMethodTransfer],l=(n.REDESIGN_DEV_TRANSACTION_TYPES=[...u],[r.ApprovalType.PersonalSign,r.ApprovalType.EthSignTypedData]);n.isSignatureApprovalRequest=e=>l.includes(e.type);const d=n.SIGNATURE_TRANSACTION_TYPES=[i.TransactionType.personalSign,i.TransactionType.signTypedData],p=e=>e&&d.includes(e.type);n.isSignatureTransactionType=p;n.parseSanitizeTypedDataMessage=e=>{const{message:t,primaryType:n,types:r}=(0,s.parseTypedDataMessage)(e);return{sanitizedMessage:(0,o.sanitizeMessage)(t,n,r),primaryType:n}};n.isSIWESignatureRequest=e=>{var t;return Boolean(null==e||null===(t=e.msgParams)||void 0===t||null===(t=t.siwe)||void 0===t?void 0:t.isSIWEMessage)};n.isOrderSignatureRequest=e=>{var t,n;if(!e||!p(e)||"eth_signTypedData"!==e.type||(null===(t=e.msgParams)||void 0===t||null===(t=t.version)||void 0===t?void 0:t.toUpperCase())===c.TYPED_SIGNATURE_VERSIONS.V1)return!1;const{primaryType:r}=(0,s.parseTypedDataMessage)(null===(n=e.msgParams)||void 0===n?void 0:n.data);return a.PRIMARY_TYPES_ORDER.includes(r)};n.isPermitSignatureRequest=e=>{var t,n;if(!e||!p(e)||"eth_signTypedData"!==e.type||(null===(t=e.msgParams)||void 0===t||null===(t=t.version)||void 0===t?void 0:t.toUpperCase())===c.TYPED_SIGNATURE_VERSIONS.V1)return!1;const{primaryType:r}=(0,s.parseTypedDataMessage)(null===(n=e.msgParams)||void 0===n?void 0:n.data);return a.PRIMARY_TYPES_PERMIT.includes(r)};n.isValidASCIIURL=e=>{try{return null==e?void 0:e.includes(new URL(e).host)}catch(e){return console.error(e),!1}};n.toPunycodeURL=e=>{try{return new URL(e).href}catch(e){return console.error(`Failed to convert URL to Punycode: ${e}`),undefined}}}}},{package:"$root$",file:"ui/pages/confirmations/utils/confirm.ts"}],[658,{"./lib":655},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.patchTags=void 0;const r=e("./lib"),i=[];n.patchTags=e=>{e.forEach((e=>{i.find((t=>t===e))||((0,r.addSemanticEncode)(e,(t=>{if(t instanceof r.DataItem&&t.getTag()===e)return t.getData()})),(0,r.addSemanticDecode)(e,(t=>new r.DataItem(t,e))),i.push(e))}))}}}},{package:"@keystonehq/bc-ur-registry-eth>@keystonehq/bc-ur-registry",file:"node_modules/@keystonehq/bc-ur-registry/dist/utils.js"}],[6580,{"./confirm":6579},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var r=e("./confirm");Object.keys(r).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===r[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return r[e]}}))}))}}},{package:"$root$",file:"ui/pages/confirmations/utils/index.ts"}],[6796,{"../../../shared/constants/common":5131,"../../../shared/constants/network":5145,"../../../shared/constants/swaps":5155,"../../../shared/lib/fetch-with-cache":5163,"../../../shared/lib/swaps-utils":5168,"../../../shared/lib/transactions-controller-utils":5172,"../../../shared/modules/conversion.utils":5179,"../../../shared/modules/hexstring-utils":5185,"../../../shared/modules/swaps.utils":5200,"../../helpers/utils/confirm-tx.util":6141,"../../store/actions":6824,"bignumber.js":3561},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.countDecimals=n.TOKEN_VALIDATORS=n.StxErrorTypes=void 0,n.fetchAggregatorMetadata=async function(e){const t=(0,p.getBaseApi)("aggregatorMetadata",e),n=await(0,u.default)({url:t,fetchOptions:{method:"GET",headers:v},cacheOptions:{cacheRefreshTime:m},functionName:"fetchAggregatorMetadata"}),r={};for(const e in n)(0,p.validateData)(w,n[e],t)&&(r[e]=n[e]);return r},n.fetchBlockedTokens=async function(e){const t=(0,p.getBaseApi)("blockedTokens",e);return await(0,u.default)({url:`${t}`,fetchOptions:{method:"GET",headers:v},cacheOptions:{cacheRefreshTime:m},functionName:"fetchBlockedTokens"})},n.fetchSwapsFeatureFlags=async function(){const e=a.SWAPS_API_V2_BASE_URL;return await(0,u.default)({url:`${e}/featureFlags`,fetchOptions:{method:"GET",headers:v},cacheOptions:{cacheRefreshTime:6e5},functionName:"fetchSwapsFeatureFlags"})},n.fetchSwapsGasPrices=async function(e){const t=(0,p.getBaseApi)("gasPrices",e),n=await(0,u.default)({url:t,fetchOptions:{method:"GET",headers:v},cacheOptions:{cacheRefreshTime:3e4},functionName:"fetchSwapsGasPrices"});if(!(0,p.validateData)(_,n,t))throw new Error(`${t} response is invalid`);const{SafeGasPrice:r,ProposeGasPrice:i,FastGasPrice:a}=n;return{safeLow:r,average:i,fast:a}},n.fetchToken=async function(e,t){const n=(0,p.getBaseApi)("token",t);return await(0,u.default)({url:`${n}?address=${e}`,fetchOptions:{method:"GET",headers:v},cacheOptions:{cacheRefreshTime:m},functionName:"fetchToken"})},n.fetchTokenPrice=async function(e){var t;const n=`spot-prices?tokenAddresses=${e}&vsCurrency=eth&includeMarketData=false`,r=await(0,u.default)({url:`https://price.api.cx.metamask.io/v2/chains/1/${n}`,fetchOptions:{method:"GET"},cacheOptions:{cacheRefreshTime:6e4},functionName:"fetchTokenPrice"});return null==r||null===(t=r[e])||void 0===t?void 0:t.eth},n.fetchTokens=async function(e){const t=(0,p.getBaseApi)("tokens",e),n=await(0,u.default)({url:t,fetchOptions:{method:"GET",headers:v},cacheOptions:{cacheRefreshTime:m},functionName:"fetchTokens"});return[a.SWAPS_CHAINID_DEFAULT_TOKEN_MAP[e]||null,...n.filter((n=>(0,p.validateData)(b,n,t,false)&&!((0,s.isSwapsDefaultTokenSymbol)(n.symbol,e)||(0,s.isSwapsDefaultTokenAddress)(n.address,e))))]},n.fetchTopAssets=async function(e){const t=await E(e);return t.reduce(((e,t,n)=>({...e,[t.address]:{index:String(n)}})),{})},n.fetchTopAssetsList=E,n.formatSwapsValueForDisplay=k,n.getNetworkNameByChainId=n.getFeeForSmartTransaction=n.getClassNameForCharLength=void 0,n.getRenderableNetworkFeesForQuote=S,n.parseSmartTransactionsError=n.isContractAddressValid=n.getTranslatedStxErrorMessage=n.getSwapsLivenessForNetwork=n.getSwap1559GasFeeEstimates=void 0,n.quotesToRenderableData=function({quotes:e,gasPriceTrade:t,gasPriceApprove:n,conversionRate:r,currentCurrency:a,approveGas:o,tokenConversionRates:c,chainId:u,smartTransactionEstimatedGas:l,nativeCurrencySymbol:p,multiLayerL1ApprovalFeeTotal:h}){return Object.values(e).map((e=>{const{destinationAmount:g=0,sourceAmount:m=0,sourceTokenInfo:y,destinationTokenInfo:v,slippage:b,aggType:T,aggregator:w,gasEstimateWithRefund:I,averageGas:_,fee:E,trade:A,multiLayerL1TradeFeeTotal:D}=e;let R=null;null!==D&&null!==h?R=(0,f.sumHexes)(D||"0x0",h||"0x0"):null!==D&&(R=D);const O=(0,d.calcTokenAmount)(m,y.decimals).toString(10),N=(0,d.calcTokenAmount)(g,v.decimals).toPrecision(8);let P=null,M=null,x=null,F=null;({feeInFiat:P,feeInEth:M,rawNetworkFees:x,rawEthFee:F}=S({tradeGas:I||(0,f.decimalToHex)(_||8e5),approveGas:o,gasPriceTrade:t,gasPriceApprove:n,currentCurrency:a,conversionRate:r,tradeValue:A.value,sourceSymbol:y.symbol,sourceAmount:m,chainId:u,multiLayerL1FeeTotal:R})),l&&({feeInFiat:P,feeInEth:M}=C({chainId:u,currentCurrency:a,conversionRate:r,nativeCurrencySymbol:p,feeInWeiDec:l.feeEstimate}));const j=new i.BigNumber(100-b).div(100),B=new i.BigNumber(N).times(j).toFixed(6),L=c[v.address],U=(0,s.isSwapsDefaultTokenSymbol)(v.symbol,u)?(0,d.calcTokenAmount)(g,v.decimals).minus(F,10):new i.BigNumber(L||0,10).times((0,d.calcTokenAmount)(g,v.decimals),10).minus(F,10);let H,K=b;return"AGG"===T?H="swapAggregator":"RFQ"===T?(H="swapRequestForQuotation",K=0):H="DEX"===T?"swapDecentralizedExchange":"CONTRACT"===T?"swapDirectContract":"swapUnknown",{aggId:w,amountReceiving:`${N} ${v.symbol}`,destinationTokenDecimals:v.decimals,destinationTokenSymbol:v.symbol,destinationTokenValue:k(N),destinationIconUrl:v.iconUrl,isBestQuote:e.isBestQuote,liquiditySourceKey:H,feeInEth:M,detailedNetworkFees:`${M} (${P})`,networkFees:P,quoteSource:T,rawNetworkFees:x,slippage:K,sourceTokenDecimals:y.decimals,sourceTokenSymbol:y.symbol,sourceTokenValue:O,sourceTokenIconUrl:y.iconUrl,ethValueOfTrade:U,minimumAmountReceived:B,metaMaskFee:E}}))},n.showRemainingTimeInMinAndSec=void 0;var r,i=e("bignumber.js"),a=e("../../../shared/constants/swaps"),s=e("../../../shared/modules/swaps.utils"),o=e("../../../shared/constants/network"),c=e("../../helpers/utils/confirm-tx.util"),u=(r=e("../../../shared/lib/fetch-with-cache"))&&r.__esModule?r:{default:r},l=e("../../../shared/modules/hexstring-utils"),d=e("../../../shared/lib/transactions-controller-utils"),p=e("../../../shared/lib/swaps-utils"),f=e("../../../shared/modules/conversion.utils"),h=e("../../../shared/constants/common"),g=e("../../store/actions");const m=3e5,y="usd",v={"X-Client-Id":a.SWAPS_CLIENT_ID},b=n.TOKEN_VALIDATORS=[{property:"address",type:"string",validator:e=>(0,l.isValidHexAddress)(e,{allowNonPrefixed:!1})},{property:"symbol",type:"string",validator:e=>(0,p.truthyString)(e)&&e.length<=12},{property:"decimals",type:"string|number",validator:e=>Number(e)>=0&&Number(e)<=36}],T=b.slice(0,2),w=[{property:"color",type:"string",validator:e=>Boolean(e.match(/^#[A-Fa-f0-9]+$/u))},{property:"title",type:"string",validator:p.truthyString},{property:"icon",type:"string",validator:e=>Boolean(e.match(/^data:image/u))}],I=e=>!isNaN(e)&&e.match(/^[.0-9]+$/u)&&!isNaN(parseFloat(e)),_=[{property:"SafeGasPrice",type:"string",validator:I},{property:"ProposeGasPrice",type:"string",validator:I},{property:"FastGasPrice",type:"string",validator:I}];async function E(e){const t=(0,p.getBaseApi)("topAssets",e);return(await(0,u.default)({url:t,functionName:"fetchTopAssets",fetchOptions:{method:"GET",headers:v},cacheOptions:{cacheRefreshTime:m}})||[]).filter((e=>(0,p.validateData)(T,e,t)))}const C=({chainId:e,currentCurrency:t,conversionRate:n,USDConversionRate:r,nativeCurrencySymbol:i,feeInWeiDec:s})=>{var o;const u=(0,f.decimalToHex)(s),l=(0,f.getValueFromWeiHex)({value:u,toDenomination:h.EtherDenomination.ETH,numberOfDecimals:5}),d=(0,f.getValueFromWeiHex)({value:u,toCurrency:t,conversionRate:n,numberOfDecimals:2});let p;p=t===y?d:(0,f.getValueFromWeiHex)({value:u,toCurrency:y,conversionRate:r,numberOfDecimals:2});return{feeInUsd:p,feeInFiat:(0,c.formatCurrency)(d,t),feeInEth:`${l} ${i||(null===(o=a.SWAPS_CHAINID_DEFAULT_TOKEN_MAP[e])||void 0===o?void 0:o.symbol)}`,rawEthFee:l}};function S({tradeGas:e,approveGas:t,gasPriceTrade:n,gasPriceApprove:r,currentCurrency:o,conversionRate:u,USDConversionRate:l,tradeValue:p,sourceSymbol:g,sourceAmount:m,chainId:v,nativeCurrencySymbol:b,multiLayerL1FeeTotal:T}){const w=(0,d.calcGasTotal)(e,n),I=t?(0,d.calcGasTotal)(t,r):"0x0",_=(0,f.sumHexes)(w,I,T||"0x0"),E=new i.BigNumber(p,16).minus((0,s.isSwapsDefaultTokenSymbol)(g,v)?m:0,10).toString(16),C=new i.BigNumber(_,16).plus(E,16).toString(16),S=(0,f.getValueFromWeiHex)({value:C,toDenomination:h.EtherDenomination.ETH,numberOfDecimals:5}),k=(0,f.getValueFromWeiHex)({value:C,toCurrency:o,conversionRate:u,numberOfDecimals:2}),A=(0,c.formatCurrency)(k,o);let D;D=o===y?k:(0,f.getValueFromWeiHex)({value:C,toCurrency:y,conversionRate:l,numberOfDecimals:2});return{rawNetworkFees:k,feeInUsd:D,rawEthFee:S,feeInFiat:A,feeInEth:`${S} ${b||a.SWAPS_CHAINID_DEFAULT_TOKEN_MAP[v].symbol}`,nonGasFee:E}}function k(e){let t;return t="string"==typeof e&&e.includes("...")?e:(0,d.toPrecisionWithoutTrailingZeros)(e,12),t.match(/e[+-]/u)&&(t=new i.BigNumber(t).toFixed()),t}n.getFeeForSmartTransaction=C;n.getClassNameForCharLength=(e,t)=>{let n;return n=!e||e.length<=10?"lg":e.length>10&&e.length<=13?"md":"sm",`${t}--${n}`};n.isContractAddressValid=(e,t)=>!(!e||!a.ALLOWED_CONTRACT_ADDRESSES[t])&&a.ALLOWED_CONTRACT_ADDRESSES[t].some((t=>e.toLowerCase()===t.toLowerCase()));const A=e=>{switch(e){case o.CHAIN_IDS.MAINNET:return a.ETHEREUM;case o.CHAIN_IDS.BSC:return a.BSC;case o.CHAIN_IDS.POLYGON:return a.POLYGON;case o.CHAIN_IDS.GOERLI:return a.GOERLI;case o.CHAIN_IDS.AVALANCHE:return a.AVALANCHE;case o.CHAIN_IDS.OPTIMISM:return a.OPTIMISM;case o.CHAIN_IDS.ARBITRUM:return a.ARBITRUM;case o.CHAIN_IDS.ZKSYNC_ERA:return a.ZKSYNC_ERA;case o.CHAIN_IDS.LINEA_MAINNET:return a.LINEA;case o.CHAIN_IDS.BASE:return a.BASE;default:return""}};n.getNetworkNameByChainId=A;n.getSwapsLivenessForNetwork=(e,t={})=>{const n=A(e);if([o.CHAIN_IDS.LOCALHOST,o.CHAIN_IDS.GOERLI].includes(e))return{swapsFeatureIsLive:!0};if(!t[n])return{swapsFeatureIsLive:!1};return t[n].extensionActive?{swapsFeatureIsLive:!0}:{swapsFeatureIsLive:t[n].fallbackToV1}};n.countDecimals=e=>{var t;return e&&Math.floor(e)!==e&&(null===(t=e.toString().split(".")[1])||void 0===t?void 0:t.length)||0};n.showRemainingTimeInMinAndSec=e=>{if(!Number.isInteger(e))return"0:00";return`${Math.floor(e/60)}:${(e%60).toString().padStart(2,"0")}`};let D=n.StxErrorTypes=function(e){return e.unavailable="unavailable",e.notEnoughFunds="not_enough_funds",e.regularTxPending="regular_tx_pending",e}({});n.getTranslatedStxErrorMessage=(e,t)=>{switch(e){case D.unavailable:case D.regularTxPending:return t("smartSwapsErrorUnavailable");case D.notEnoughFunds:return t("smartSwapsErrorNotEnoughFunds");default:return t("smartSwapsErrorUnavailable")}};n.parseSmartTransactionsError=e=>{const t=e.slice(12);return JSON.parse(t.trim())};async function R(e,t,n){const r=await(0,g.estimateGasFee)({transactionParams:e,chainId:n}),i=null==r?void 0:r.estimates,{maxFeePerGas:a}=(null==i?void 0:i.high)??{},{maxPriorityFeePerGas:s}=(null==i?void 0:i.high)??{};return{baseAndPriorityFeePerGas:s?(0,f.addHexes)(t,s):undefined,maxFeePerGas:a,maxPriorityFeePerGas:s}}n.getSwap1559GasFeeEstimates=async(e,t,n,r)=>{const i=(0,f.decGWEIToHexWEI)(n);return{tradeGasFeeEstimates:await R(e,i,r),approveGasFeeEstimates:t?await R(t,i,r):undefined,estimatedBaseFee:i}}}}},{package:"$root$",file:"ui/pages/swaps/swaps.util.ts"}],[6807,{"./util":6822,reselect:4905},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.getApprovalFlows=function(e){return e.metamask.approvalFlows},n.getApprovalRequestsByType=void 0,n.getPendingApprovals=a,n.hasPendingApprovals=function(e,t,n){const r=Object.values(e.metamask.pendingApprovals).filter((({type:e})=>t.includes(e)));if(n)return r.some(n);return r.length>0},n.pendingApprovalsSortedSelector=function(e){return a(e).sort(((e,t)=>e.time-t.time))},n.selectPendingApproval=void 0;var r=e("reselect"),i=e("./util");function a(e){return Object.values(e.metamask.pendingApprovals??[])}n.getApprovalRequestsByType=(e,t,n)=>{const r=Object.values(e.metamask.pendingApprovals).filter((({type:e})=>e===t));return n?r.filter(n):r};const s=(0,r.createSelector)(a,((e,t)=>t),((e,t)=>e.find((({id:e})=>e===t))));n.selectPendingApproval=(0,i.createDeepEqualSelector)(s,(e=>e))}}},{package:"$root$",file:"ui/selectors/approvals.ts"}],[6808,{"../../shared/constants/gas":5136,"../../shared/lib/transactions-controller-utils":5172,"../../shared/modules/conversion.utils":5179,"../../shared/modules/gas.utils":5184,"../../shared/modules/string-utils":5199,"../ducks/metamask/metamask":6102,"../helpers/utils/confirm-tx.util":6141,"../helpers/utils/tx-helper":6161,"./custom-gas":6809,"./selectors":6819,"./transactions":6821,"@metamask/transaction-controller":2737,reselect:4905},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.currentCurrencySelector=n.conversionRateSelector=n.contractExchangeRateSelector=void 0,n.selectIsMaxValueEnabled=N,n.selectMaxValue=void 0,n.selectTransactionAvailableBalance=O,n.selectTransactionFeeById=R,n.use4ByteResolutionSelector=n.unconfirmedTransactionsListSelector=n.unconfirmedTransactionsHashSelector=n.unconfirmedMessagesHashSelector=n.txDataSelector=n.transactionFeeSelector=n.tokenAddressSelector=n.sendTokenTokenAmountAndToAddressSelector=n.selectTransactionValue=void 0;var r,i=e("reselect"),a=e("@metamask/transaction-controller"),s=(r=e("../helpers/utils/tx-helper"))&&r.__esModule?r:{default:r},o=e("../helpers/utils/confirm-tx.util"),c=e("../ducks/metamask/metamask"),u=e("../../shared/constants/gas"),l=e("../../shared/modules/gas.utils"),d=e("../../shared/modules/string-utils"),p=e("../../shared/lib/transactions-controller-utils"),f=e("../../shared/modules/conversion.utils"),h=e("./custom-gas"),g=e("./selectors"),m=e("./transactions");const y=e=>(0,m.getUnapprovedTransactions)(e),v=e=>e.metamask.unapprovedPersonalMsgs,b=e=>e.metamask.unapprovedDecryptMsgs,T=e=>e.metamask.unapprovedEncryptionPublicKeyMsgs,w=e=>e.metamask.unapprovedTypedMessages;n.unconfirmedTransactionsListSelector=(0,i.createSelector)(y,v,b,T,w,g.getCurrentChainId,((e={},t={},n={},r={},i={},a)=>(0,s.default)(e,t,n,r,i,a)||[])),n.unconfirmedTransactionsHashSelector=(0,i.createSelector)(y,v,b,T,w,g.getCurrentChainId,((e={},t={},n={},r={},i={},a)=>({...Object.keys(e).reduce(((t,n)=>{const r={...t};return e[n].chainId===a&&(r[n]=e[n]),r}),{}),...t,...n,...r,...i}))),n.unconfirmedMessagesHashSelector=(0,i.createSelector)(v,b,T,w,((e={},t={},n={},r={})=>({...e,...t,...n,...r})));n.use4ByteResolutionSelector=e=>e.metamask.use4ByteResolution;const I=e=>e.metamask.currentCurrency;n.currentCurrencySelector=I;const _=e=>{var t;return null===(t=e.metamask.currencyRates[(0,c.getProviderConfig)(e).ticker])||void 0===t?void 0:t.conversionRate};n.conversionRateSelector=_;const E=e=>e.confirmTransaction.txData;n.txDataSelector=E;const C=(0,i.createSelector)((e=>e.confirmTransaction.tokenProps),(e=>e&&e.decimals)),S=(0,i.createSelector)((e=>e.confirmTransaction.tokenData),(e=>e&&e.args||[])),k=(0,i.createSelector)(E,(e=>e&&e.txParams||{})),A=n.tokenAddressSelector=(0,i.createSelector)(k,(e=>e&&e.to)),D=(n.sendTokenTokenAmountAndToAddressSelector=(0,i.createSelector)(S,C,((e,t)=>{let n="",r="0";if(e&&e.length){n=e._to;let i=e._value.toString();t&&(i=(0,p.calcTokenAmount)(i,t).toFixed()),r=(0,o.roundExponential)(i)}return{toAddress:n,tokenAmount:r}})),n.contractExchangeRateSelector=(0,i.createSelector)((e=>(0,g.getTokenExchangeRates)(e)),A,((e,t)=>e[Object.keys(e).find((e=>(0,d.isEqualCaseInsensitive)(e,t)))])),function(e,t){var n,r,i,s;const d=I(e),p=_(e),m=(0,c.getNativeCurrency)(e),y=(0,c.getGasFeeEstimates)(e)||{},v=(0,c.getGasEstimateType)(e),b=(0,g.checkNetworkAndAccountSupports1559)(e),T={gasLimit:(null===(n=t.txParams)||void 0===n?void 0:n.gas)??"0x0"};if(b){var w;const{gasPrice:e="0"}=y,n=y[t.userFeeLevel]||{};if((null===(w=t.txParams)||void 0===w?void 0:w.type)===a.TransactionEnvelopeType.legacy){var E;T.gasPrice=(null===(E=t.txParams)||void 0===E?void 0:E.gasPrice)??(0,f.decGWEIToHexWEI)(e)}else{var C,S,k,A;const{suggestedMaxPriorityFeePerGas:r,suggestedMaxFeePerGas:i}=n;T.maxFeePerGas=null===(C=t.txParams)||void 0===C||!C.maxFeePerGas||t.userFeeLevel!==u.CUSTOM_GAS_ESTIMATE&&i?(0,f.decGWEIToHexWEI)(i||e):null===(S=t.txParams)||void 0===S?void 0:S.maxFeePerGas,T.maxPriorityFeePerGas=null===(k=t.txParams)||void 0===k||!k.maxPriorityFeePerGas||t.userFeeLevel!==u.CUSTOM_GAS_ESTIMATE&&r?r&&(0,f.decGWEIToHexWEI)(r)||T.maxFeePerGas:null===(A=t.txParams)||void 0===A?void 0:A.maxPriorityFeePerGas,T.baseFeePerGas=(0,f.decGWEIToHexWEI)(y.estimatedBaseFee)}}else switch(v){case u.GasEstimateTypes.feeMarket:case u.GasEstimateTypes.none:T.gasPrice=(null===(r=t.txParams)||void 0===r?void 0:r.gasPrice)??"0x0";break;case u.GasEstimateTypes.ethGasPrice:T.gasPrice=(null===(i=t.txParams)||void 0===i?void 0:i.gasPrice)??(0,f.decGWEIToHexWEI)(y.gasPrice);break;case u.GasEstimateTypes.legacy:T.gasPrice=(null===(s=t.txParams)||void 0===s?void 0:s.gasPrice)??(0,h.getAveragePriceEstimateInHexWEI)(e)}const{txParams:{value:D="0x0"}={}}=t,R=(0,f.getValueFromWeiHex)({value:D,fromCurrency:m,toCurrency:d,conversionRate:p,numberOfDecimals:2}),O=(0,f.getValueFromWeiHex)({value:D,fromCurrency:m,toCurrency:m,conversionRate:p,numberOfDecimals:6}),N=(0,l.getMinimumGasTotalInHexWei)(T),P=(0,l.getMaximumGasTotalInHexWei)(T),M=(0,o.getTransactionFee)({value:N,fromCurrency:m,toCurrency:d,numberOfDecimals:2,conversionRate:p}),x=(0,o.getTransactionFee)({value:P,fromCurrency:m,toCurrency:d,numberOfDecimals:2,conversionRate:p}),F=(0,o.getTransactionFee)({value:N,fromCurrency:m,toCurrency:m,numberOfDecimals:6,conversionRate:p});return{hexTransactionAmount:D,fiatTransactionAmount:R,ethTransactionAmount:O,hexMinimumTransactionFee:N,fiatMinimumTransactionFee:M,hexMaximumTransactionFee:P,fiatMaximumTransactionFee:x,ethTransactionFee:F,fiatTransactionTotal:(0,o.addFiat)(M,R),ethTransactionTotal:(0,o.addEth)(F,O),hexTransactionTotal:(0,f.sumHexes)(D,N),gasEstimationObject:T}});function R(e,t){const n=(0,m.selectTransactionMetadata)(e,t);return D(e,n??{})}function O(e,t){var n;return null===(n=(0,g.getMetaMaskAccounts)(e)[(0,m.selectTransactionSender)(e,t)])||void 0===n?void 0:n.balance}function N(e,t){var n;return(null===(n=e.confirmTransaction.maxValueMode)||void 0===n?void 0:n[t])??!1}n.transactionFeeSelector=D;const P=n.selectMaxValue=(0,i.createSelector)(R,O,((e,t)=>t&&e.hexMaximumTransactionFee?(0,f.subtractHexes)(t,e.hexMaximumTransactionFee):undefined));n.selectTransactionValue=(0,i.createSelector)(N,P,m.selectTransactionMetadata,((e,t,n)=>{var r;return e?t:null==n||null===(r=n.txParams)||void 0===r?void 0:r.value}))}}},{package:"$root$",file:"ui/selectors/confirm-transaction.js"}],[6809,{".":6811,"../../app/scripts/lib/util":130,"../../shared/constants/common":5131,"../../shared/constants/gas":5136,"../../shared/lib/transactions-controller-utils":5172,"../../shared/modules/Numeric":5174,"../../shared/modules/conversion.utils":5179,"../ducks/metamask/metamask":6102,"../ducks/send":6107,"../helpers/utils/confirm-tx.util":6141,"../helpers/utils/formatters":6143},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.basicPriceEstimateToETHTotal=v,n.getAverageEstimate=m,n.getAveragePriceEstimateInHexWEI=function(e){return T(m(e))},n.getBasicGasEstimateLoadingStatus=function(e){return!1===w(e)},n.getCustomGasLimit=function(e){return e.gas.customData.limit},n.getCustomGasPrice=h,n.getDefaultActiveButtonIndex=function(e,t,n){return e.map((({priceInHexWei:e})=>e)).lastIndexOf((0,r.addHexPrefix)(t||n))},n.getFastPriceEstimate=y,n.getFastPriceEstimateInHexWEI=function(e){return T(y(e)||"0x0")},n.getGasPriceInHexWei=T,n.getIsCustomNetworkGasPriceFetched=function(e){return(0,u.getGasEstimateType)(e)===c.GasEstimateTypes.ethGasPrice&&!(0,f.getIsMainnet)(e)},n.getIsEthGasPriceFetched=function(e){return(0,u.getGasEstimateType)(e)===c.GasEstimateTypes.ethGasPrice&&(0,f.getIsMainnet)(e)},n.getIsGasEstimatesFetched=w,n.getNoGasPriceFetched=function(e){return(0,u.getGasEstimateType)(e)===c.GasEstimateTypes.none},n.getRenderableConvertedCurrencyFee=function(e,t,n,r){const s=v(new d.Numeric(e,10).toBase(16).toString(),t),o=(0,i.decEthToConvertedCurrency)(s,n,r);return(0,a.formatCurrency)(o,n)},n.getRenderableEthFee=function(e,t,n=9,r="ETH"){const i=v(new d.Numeric(e,10).toBase(16).toString(),t,n);return(0,s.formatETHFee)(i,r)},n.getSafeLowEstimate=g,n.isCustomPriceExcessive=function(e,t=!1){const n=t?(0,o.getGasPrice)(e):h(e),r=y(e);if(!n||!r)return!1;return new d.Numeric(n,16,p.EtherDenomination.WEI).toDenomination(p.EtherDenomination.GWEI).greaterThan(Math.floor(1.5*r),10)},n.isCustomPriceSafe=function(e){const t=g(e),n=h(e);if(!n)return!0;if(!t)return!1;return new d.Numeric(n,16,p.EtherDenomination.WEI).toDenomination(p.EtherDenomination.GWEI).greaterThan(t,10)},n.isCustomPriceSafeForCustomNetwork=function(e){const t=m(e),n=h(e);if(!n)return!0;if(!t)return!1;return new d.Numeric(n,16,p.EtherDenomination.WEI).toDenomination(p.EtherDenomination.GWEI).greaterThan(t,10)},n.priceEstimateToWei=b;var r=e("../../app/scripts/lib/util"),i=e("../../shared/modules/conversion.utils"),a=e("../helpers/utils/confirm-tx.util"),s=e("../helpers/utils/formatters"),o=e("../ducks/send"),c=e("../../shared/constants/gas"),u=e("../ducks/metamask/metamask"),l=e("../../shared/lib/transactions-controller-utils"),d=e("../../shared/modules/Numeric"),p=e("../../shared/constants/common"),f=e(".");function h(e){return e.gas.customData.price}function g(e){const t=(0,u.getGasFeeEstimates)(e);return(0,u.getGasEstimateType)(e)===c.GasEstimateTypes.legacy?null==t?void 0:t.low:null}function m(e){const t=(0,u.getGasFeeEstimates)(e);return(0,u.getGasEstimateType)(e)===c.GasEstimateTypes.legacy?null==t?void 0:t.medium:null}function y(e){const t=(0,u.getGasFeeEstimates)(e);return(0,u.getGasEstimateType)(e)===c.GasEstimateTypes.legacy?null==t?void 0:t.high:null}function v(e,t,n=9){return new d.Numeric((0,l.calcGasTotal)(t,e),16,p.EtherDenomination.GWEI).round(n).toBase(10).toString()}function b(e){return new d.Numeric(e,16,p.EtherDenomination.GWEI).toDenomination(p.EtherDenomination.WEI).round(9).toString()}function T(e){const t=new d.Numeric(e,10).toBase(16).toString();return(0,r.addHexPrefix)(b(t))}function w(e){const t=(0,u.getGasEstimateType)(e);return!(0,u.isEIP1559Network)(e)&&t!==c.GasEstimateTypes.none}}}},{package:"$root$",file:"ui/selectors/custom-gas.js"}],[6810,{"../../shared/constants/onboarding":5148,"../helpers/constants/routes":6120},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.getFirstTimeFlowType=void 0,n.getFirstTimeFlowTypeRouteAfterMetaMetricsOptIn=function(e){const{firstTimeFlowType:t}=e.metamask;if(t===r.FirstTimeFlowType.create)return i.ONBOARDING_CREATE_PASSWORD_ROUTE;if(t===r.FirstTimeFlowType.import)return i.ONBOARDING_IMPORT_WITH_SRP_ROUTE;if(t===r.FirstTimeFlowType.restore)return i.ONBOARDING_SECURE_YOUR_WALLET_ROUTE;return i.DEFAULT_ROUTE},n.getFirstTimeFlowTypeRouteAfterUnlock=function(e){const{firstTimeFlowType:t}=e.metamask;if(t===r.FirstTimeFlowType.create)return i.ONBOARDING_CREATE_PASSWORD_ROUTE;if(t===r.FirstTimeFlowType.import)return i.ONBOARDING_IMPORT_WITH_SRP_ROUTE;if(t===r.FirstTimeFlowType.restore)return i.ONBOARDING_METAMETRICS;return i.DEFAULT_ROUTE},n.getOnboardingInitiator=void 0;var r=e("../../shared/constants/onboarding"),i=e("../helpers/constants/routes");n.getFirstTimeFlowType=e=>e.metamask.firstTimeFlowType;n.getOnboardingInitiator=e=>{const{onboardingTabs:t}=e.metamask;if(!t||1!==Object.keys(t).length)return null;const n=Object.keys(t)[0];return{location:n,tabId:t[n]}}}}},{package:"$root$",file:"ui/selectors/first-time-flow.js"}],[6811,{"../pages/confirmations/selectors/confirm":6571,"./approvals":6807,"./confirm-transaction":6808,"./custom-gas":6809,"./first-time-flow":6810,"./metametrics":6815,"./permissions":6818,"./selectors":6819,"./transactions":6821},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var r=e("../pages/confirmations/selectors/confirm");Object.keys(r).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===r[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return r[e]}}))}));var i=e("./confirm-transaction");Object.keys(i).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===i[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return i[e]}}))}));var a=e("./custom-gas");Object.keys(a).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===a[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return a[e]}}))}));var s=e("./first-time-flow");Object.keys(s).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===s[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return s[e]}}))}));var o=e("./metametrics");Object.keys(o).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===o[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return o[e]}}))}));var c=e("./permissions");Object.keys(c).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===c[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return c[e]}}))}));var u=e("./selectors");Object.keys(u).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===u[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return u[e]}}))}));var l=e("./transactions");Object.keys(l).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===l[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return l[e]}}))}));var d=e("./approvals");Object.keys(d).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===d[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return d[e]}}))}))}}},{package:"$root$",file:"ui/selectors/index.js"}],[6815,{reselect:4905},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.selectMatchingFragment=n.selectFragments=n.selectFragmentBySuccessEvent=n.selectFragmentById=n.getParticipateInMetaMetrics=n.getLatestMetricsEventTimestamp=n.getDataCollectionForMarketing=void 0;var r=e("reselect");const i=e=>e.metamask.fragments;n.selectFragments=i;n.getDataCollectionForMarketing=e=>e.metamask.dataCollectionForMarketing;n.getParticipateInMetaMetrics=e=>Boolean(e.metamask.participateInMetaMetrics);n.getLatestMetricsEventTimestamp=e=>e.metamask.latestNonAnonymousEventTimestamp;const a=n.selectFragmentBySuccessEvent=(0,r.createSelector)(i,((e,t)=>t),((e,t)=>t.persist?Object.values(e).find((e=>e.successEvent===t.successEvent)):undefined)),s=n.selectFragmentById=(0,r.createSelector)(i,((e,t)=>t),((e,t)=>t&&null!=e&&e[t]?e[t]:undefined));n.selectMatchingFragment=(0,r.createSelector)(((e,t)=>a(e,t.fragmentOptions)),((e,t)=>s(e,t.existingId)),((e,t)=>t??e))}}},{package:"$root$",file:"ui/selectors/metametrics.js"}],[6816,{".":6811,"../../shared/constants/multichain/assets":5143,"../../shared/constants/multichain/networks":5144,"../../shared/constants/network":5145,"../../shared/modules/Numeric":5174,"../ducks/metamask/metamask":6102,"@metamask/keyring-api":1642,"@metamask/utils":2862,"@reduxjs/toolkit":2926,"prop-types":4627},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.MultichainNetworkPropType=n.InternalAccountPropType=void 0,n.getMultichainBalances=I,n.getMultichainCoinRates=void 0,n.getMultichainConversionRate=function(e,t){var n;const{ticker:r}=y(e,t);return m(e,t)?(0,l.getConversionRate)(e):null===(n=_(e))||void 0===n||null===(n=n[r.toLowerCase()])||void 0===n?void 0:n.conversionRate},n.getMultichainCurrencyImage=v,n.getMultichainCurrentChainId=function(e){const{chainId:t}=y(e);return t},n.getMultichainCurrentCurrency=function(e,t){const n=(0,f.getCurrentCurrency)(e);if(m(e,t))return n;return n&&"usd"===n.toLowerCase()?"usd":y(e,t).ticker},n.getMultichainCurrentNetwork=function(e,t){return y(e,t)},n.getMultichainDefaultToken=b,n.getMultichainIsBitcoin=function(e,t){const n=m(e,t),{symbol:r}=b(e,t);return!n&&"BTC"===r},n.getMultichainIsEvm=m,n.getMultichainIsMainnet=T,n.getMultichainIsTestnet=w,n.getMultichainNativeCurrency=function(e,t){return m(e,t)?(0,l.getNativeCurrency)(e):y(e,t).ticker},n.getMultichainNativeCurrencyImage=function(e,t){return v(e,t)},n.getMultichainNetwork=g,n.getMultichainNetworkProviders=h,n.getMultichainProviderConfig=y,n.getMultichainSelectedAccountCachedBalance=E,n.getMultichainSelectedAccountCachedBalanceIsZero=void 0,n.getMultichainShouldShowFiat=function(e,t){const n=t??(0,f.getSelectedInternalAccount)(e),r=w(e,n),i=!r;return m(e,n)?(0,f.getShouldShowFiat)(e):i||r&&(0,f.getShowFiatInTestnets)(e)};var r,i=(r=e("prop-types"))&&r.__esModule?r:{default:r},a=e("@metamask/keyring-api"),s=e("@metamask/utils"),o=e("@reduxjs/toolkit"),c=e("../../shared/modules/Numeric"),u=e("../../shared/constants/multichain/networks"),l=e("../ducks/metamask/metamask"),d=e("../../shared/constants/multichain/assets"),p=e("../../shared/constants/network"),f=e(".");n.MultichainNetworkPropType=i.default.shape({nickname:i.default.string.isRequired,isEvmNetwork:i.default.bool.isRequired,chainId:i.default.string,network:i.default.oneOfType([i.default.shape({rpcUrl:i.default.string,type:i.default.string.isRequired,chainId:i.default.string.isRequired,ticker:i.default.string.isRequired,rpcPrefs:i.default.shape({blockExplorerUrl:i.default.string,imageUrl:i.default.string}),nickname:i.default.string,id:i.default.string}),i.default.shape({chainId:i.default.string.isRequired,ticker:i.default.string.isRequired,rpcPrefs:i.default.shape({blockExplorerUrl:i.default.string,imageUrl:i.default.string})})]).isRequired}),n.InternalAccountPropType=i.default.shape({id:i.default.string.isRequired,address:i.default.string.isRequired,metadata:i.default.shape({name:i.default.string.isRequired,snap:i.default.shape({id:i.default.string.isRequired,name:i.default.string,enabled:i.default.bool}),keyring:i.default.shape({type:i.default.string.isRequired}).isRequired}).isRequired,type:i.default.string.isRequired});function h(e){return Object.values(u.MULTICHAIN_PROVIDER_CONFIGS)}function g(e,t){if(m(e,t)){var n;const t=(0,f.getCurrentChainId)(e),r=(0,l.getProviderConfig)(e),i=t;r.rpcPrefs={...r.rpcPrefs,imageUrl:p.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[i]};return{nickname:(null===(n=(0,f.getNetworkConfigurationsByChainId)(e)[t])||void 0===n?void 0:n.name)??r.rpcUrl,isEvmNetwork:!0,chainId:`${s.KnownCaipNamespace.Eip155}:${Number(t)}`,network:r}}const r=t??(0,f.getSelectedInternalAccount)(e),i=h().find((e=>e.isAddressCompatible(r.address)));if(!i)throw new Error("Could not find non-EVM provider for the current configuration. This should never happen.");return{nickname:i.nickname,isEvmNetwork:!1,chainId:null==i?void 0:i.chainId,network:i}}function m(e,t){const n=(0,l.getCompletedOnboarding)(e),r=t??(0,f.getMaybeSelectedInternalAccount)(e);return!n||!r||(0,a.isEvmAccountType)(r.type)}function y(e,t){return g(e,t).network}function v(e,t){var n;if(m(e,t))return(0,f.getNativeCurrencyImage)(e);return null===(n=y(e,t).rpcPrefs)||void 0===n?void 0:n.imageUrl}function b(e,t){var n;return{symbol:m(e,t)?(null===(n=(0,l.getProviderConfig)(e))||void 0===n?void 0:n.ticker)??"ETH":y(e,t).ticker}}function T(e,t){const n=y(e,t??(0,f.getSelectedInternalAccount)(e));return m(e,t)?(0,f.getIsMainnet)(e):n.chainId===u.MultichainNetworks.BITCOIN}function w(e,t){const n=y(e,t??(0,f.getSelectedInternalAccount)(e));return m(e,t)?p.TEST_NETWORK_IDS.includes(n.chainId):n.chainId===u.MultichainNetworks.BITCOIN_TESTNET}function I(e){return e.metamask.balances}const _=e=>e.metamask.rates;function E(e){return m(e)?(0,f.getSelectedAccountCachedBalance)(e):function(e){var t;const n=I(e),r=(0,f.getSelectedInternalAccount)(e),i=T(e)?d.MultichainNativeAssets.BITCOIN:d.MultichainNativeAssets.BITCOIN_TESTNET;return null==n||null===(t=n[r.id])||void 0===t||null===(t=t[i])||void 0===t?void 0:t.amount}(e)}n.getMultichainCoinRates=_;n.getMultichainSelectedAccountCachedBalanceIsZero=(0,o.createSelector)([m,E],((e,t)=>{const n=e?16:10;return new c.Numeric(t,n).isZero()}))}}},{package:"$root$",file:"ui/selectors/multichain.ts"}],[6818,{".":6811,"../../app/scripts/controllers/permissions":26,"../../shared/constants/permissions":5149,"./approvals":6807,"./util":6822,"@metamask/controller-utils":1218,"@metamask/keyring-api":1642,"@metamask/snaps-rpc-methods":2452},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.activeTabHasPermissions=function(e){var t;const{activeTab:n,metamask:r}=e,{subjects:i={}}=r;return Boolean(Object.keys((null===(t=i[n.origin])||void 0===t?void 0:t.permissions)||{}).length>0)},n.getAccountToConnectToActiveTab=function(e){const t=(0,l.getSelectedInternalAccount)(e),n=h(e),{metamask:{internalAccounts:{accounts:r}}}=e,i=Object.keys(r).length;if(n.length&&n.length!==i&&-1===n.findIndex((e=>e===t.address)))return(0,l.getInternalAccount)(e,t.id);return undefined},n.getAddressConnectedSubjectMap=function(e){const t=y(e),n=m(e),r={};return Object.keys(n).forEach((e=>{const{iconUrl:i,name:a}=t[e]||{};n[e].forEach((t=>{const n=a||e;r[t]=r[t]?{...r[t],[e]:{iconUrl:i,name:n}}:{[e]:{iconUrl:i,name:n}}}))})),r},n.getConnectedSubjectsForAllAddresses=void 0,n.getConnectedSubjectsForSelectedAddress=function(e){const t=(0,l.getSelectedInternalAccount)(e),n=d(e),r=y(e),i=[];return Object.entries(n).forEach((([e,n])=>{if(!v(n).includes(t.address))return;const{extensionId:a,name:s,iconUrl:o}=r[e]||{};i.push({extensionId:a,origin:e,name:s,iconUrl:o})})),i},n.getFirstPermissionRequest=function(e){const t=C(e);return t&&t[0]?t[0]:null},n.getFirstSnapInstallOrUpdateRequest=function(e){var t;return(null===(t=E(e))||void 0===t?void 0:t[0])??null},n.getLastConnectedInfo=function(e){const{permissionHistory:t={}}=e.metamask;return Object.keys(t).reduce(((e,n)=>(t[n].eth_accounts&&(e[n]=JSON.parse(JSON.stringify(t[n].eth_accounts))),e)),{})},n.getOrderedConnectedAccountsForActiveTab=function(e){var t;const{activeTab:n,metamask:{permissionHistory:r}}=e,i=null===(t=r[n.origin])||void 0===t||null===(t=t.eth_accounts)||void 0===t?void 0:t.accounts,s=(0,l.getMetaMaskAccountsOrdered)(e),o=h(e);return s.filter((e=>o.includes(e.address))).filter((e=>(0,a.isEvmAccountType)(e.type))).map((e=>({...e,metadata:{...e.metadata,lastActive:null==i?void 0:i[e.address]}}))).sort((({lastSelected:e},{lastSelected:t})=>e===t?0:e===undefined?1:t===undefined?-1:t-e))},n.getOrderedConnectedAccountsForConnectedDapp=function(e,t){var n;const{metamask:{permissionHistory:r}}=e,i=null===(n=r[t.origin])||void 0===n||null===(n=n.eth_accounts)||void 0===n?void 0:n.accounts,s=(0,l.getMetaMaskAccountsOrdered)(e),o=g(e,t);return s.filter((e=>o.includes(e.address))).filter((e=>(0,a.isEvmAccountType)(e.type))).map((e=>({...e,metadata:{...e.metadata,lastActive:null==i?void 0:i[e.address]}}))).sort((({lastSelected:e},{lastSelected:t})=>e===t?0:e===undefined?1:t===undefined?-1:t-e))},n.getPermissionSubjects=d,n.getPermissionSubjectsDeepEqual=void 0,n.getPermissions=function(e,t){var n;return null===(n=d(e)[t])||void 0===n?void 0:n.permissions},n.getPermissionsForActiveTab=function(e){var t;const{activeTab:n,metamask:r}=e,{subjects:i={}}=r,a=(null===(t=i[n.origin])||void 0===t?void 0:t.permissions)??{};return Object.keys(a).map((e=>({key:e,value:a[e]})))},n.getPermissionsRequests=C,n.getPermittedAccounts=p,n.getPermittedAccountsByOrigin=m,n.getPermittedAccountsForCurrentTab=h,n.getPermittedAccountsForSelectedTab=g,n.getPermittedChains=f,n.getPermittedChainsByOrigin=function(e){const t=d(e);return Object.keys(t).reduce(((e,n)=>{const r=I(T(t[n]));return r.length>0&&(e[n]=r),e}),{})},n.getPermittedChainsForCurrentTab=function(e){return p(e,(0,l.getOriginOfCurrentTab)(e))},n.getPermittedChainsForSelectedTab=function(e,t){return f(e,t)},n.getRequestState=function(e,t){var n;return null===(n=e.metamask.pendingApprovals[t])||void 0===n?void 0:n.requestState},n.getRequestType=function(e,t){var n;return null===(n=e.metamask.pendingApprovals[t])||void 0===n?void 0:n.type},n.getSnapInstallOrUpdateRequests=E,n.getSubjectMetadata=y,n.getSubjectMetadataDeepEqual=void 0,n.getSubjectsWithPermission=function(e,t){const n=d(e),r=[];return Object.entries(n).forEach((([n,{permissions:i}])=>{if(i[t]){const{extensionId:t,name:i,iconUrl:a}=(0,l.getTargetSubjectMetadata)(e,n)||{};r.push({extensionId:t,origin:n,name:i,iconUrl:a})}})),r},n.getSubjectsWithSnapPermission=function(e,t){const n=d(e);return Object.entries(n).filter((([e,{permissions:n}])=>{var r;return null===(r=n[i.WALLET_SNAP_PERMISSION_KEY])||void 0===r?void 0:r.caveats[0].value[t]})).map((([t,n])=>{const{extensionId:r,name:i,iconUrl:a}=(0,l.getTargetSubjectMetadata)(e,t)||{};return{extensionId:r,origin:t,name:i,iconUrl:a}}))},n.isAccountConnectedToCurrentTab=void 0;var r=e("@metamask/controller-utils"),i=e("@metamask/snaps-rpc-methods"),a=e("@metamask/keyring-api"),s=e("../../shared/constants/permissions"),o=e("../../app/scripts/controllers/permissions"),c=e("./approvals"),u=e("./util"),l=e(".");n.getPermissionSubjectsDeepEqual=(0,u.createDeepEqualSelector)((e=>e.metamask.subjects||{}),(e=>e)),n.getSubjectMetadataDeepEqual=(0,u.createDeepEqualSelector)((e=>e.metamask.subjectMetadata),(e=>e));function d(e){return e.metamask.subjects||{}}function p(e,t){return w(b(_(e,t)))}function f(e,t){return I(T(_(e,t)))}function h(e){return p(e,(0,l.getOriginOfCurrentTab)(e))}function g(e,t){return p(e,t)}function m(e){const t=d(e);return Object.keys(t).reduce(((e,n)=>{const r=v(t[n]);return r.length>0&&(e[n]=r),e}),{})}function y(e){return e.metamask.subjectMetadata}n.getConnectedSubjectsForAllAddresses=(0,u.createDeepEqualSelector)(d,y,((e,t)=>{const n={};return Object.entries(e).forEach((([e,r])=>{v(r).forEach((r=>{n[r]||(n[r]=[]);const i=t[e];n[r].push({origin:e,...i})}))})),n}));n.isAccountConnectedToCurrentTab=(0,u.createDeepEqualSelector)(h,((e,t)=>t),((e,t)=>e.some((e=>e===t))));function v(e){return w(b(e))}function b(e={}){var t;return(null===(t=e.permissions)||void 0===t?void 0:t.eth_accounts)||{}}function T(e={}){var t;return(null===(t=e.permissions)||void 0===t?void 0:t[o.PermissionNames.permittedChains])||{}}function w(e){const t=function(e={}){return Array.isArray(e.caveats)&&e.caveats.find((e=>e.type===s.CaveatTypes.restrictReturnedAccounts))}(e);return t&&Array.isArray(t.value)?t.value:[]}function I(e){const t=function(e={}){return Array.isArray(e.caveats)&&e.caveats.find((e=>e.type===s.CaveatTypes.restrictNetworkSwitching))}(e);return t&&Array.isArray(t.value)?t.value:[]}function _(e,t){var n;return t&&(null===(n=e.metamask.subjects)||void 0===n?void 0:n[t])}function E(e){return Object.values(e.metamask.pendingApprovals).filter((({type:e})=>"wallet_installSnap"===e||"wallet_updateSnap"===e||"wallet_installSnapResult"===e)).map((({requestData:e})=>e))}function C(e){var t;return null===(t=(0,c.getApprovalRequestsByType)(e,r.ApprovalType.WalletRequestPermissions))||void 0===t?void 0:t.map((({requestData:e})=>e))}}}},{package:"$root$",file:"ui/selectors/permissions.js"}]],[],{});