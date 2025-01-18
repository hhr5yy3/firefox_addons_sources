/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.
 * Modified by CromS
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// const sanitaize = {
    // encode: (str) => {
        // str = str || '';
        // return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    // },
    // decode: (str) => {
        // str = str || '';
        // return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
    // }
// };

let parameter = returnReplaceParameter(location.href);
console.log(parameter);
let newUrl = parameter.url;
if(parameter.url.includes("moz-extension"))
{
	console.log(parameter.url);
	let start = parameter.url.lastIndexOf("http%3A//");
	newUrl = "http://" + parameter.url.slice(start+9);
	console.log(newUrl);
}

document.title = parameter.title;
document.getElementsByClassName("title")[0].innerText = parameter.title;
document.getElementsByClassName("replacedUrl")[0].innerText = newUrl;
document.head.insertAdjacentHTML('beforeend', Sanitizer.escapeHTML`<link rel="shortcut icon" href="${parameter.favIconUrl}">`);

if (parameter.state == "open_faild") {
    document.getElementsByClassName("replacedPageMessage")[0].innerText = browser.i18n.getMessage("replacedPageMessage");
}

window.addEventListener("focus", e => {
    window.location.replace(parameter.url);
});

function returnReplaceParameter(url) {
    let parameter = {};
    let paras = url.split('?')[1].split('&');
    for (let p of paras) {
        parameter[p.split('=')[0]] = decodeURIComponent(p.split('=')[1]);
    }
    return parameter;
}
