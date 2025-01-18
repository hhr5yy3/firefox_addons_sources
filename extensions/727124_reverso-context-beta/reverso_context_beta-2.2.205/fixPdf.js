/*---------------------------------------------------------------------------
 * @Developer: Aleksey Romanov
 * @Project URI: www.domprog.com, www.sites4web.ru
 * @Copyright: DomProg
 *----------------------------------------------------------------------------
 */
"use strict";

// added button
// function addedButtonOneClick() {
//     if (document.querySelector("#toolbarViewerRight")) {
//         var toolbarViewerRight = document.querySelector("#toolbarViewerRight");
//         toolbarViewerRight.setAttribute("data-oneclick", "false");
//
//         var button = document.createElement("button");
//         button.id = "buttonOneClickMode";
//         button.className = "toolbarButton oneClickMode hiddenLargeView";
//         button.setAttribute("tabindex", "31");
//         button.style.backgroundImage = "url(../../dist/assets/images/mouse.png)";
//         button.style.backgroundRepeat = "no-repeat";
//         button.style.backgroundSize = "contain";
//         button.style.backgroundSize = "14px";
//         button.style.backgroundPosition = "7px 3px";
//         button.onclick = function () {
//             if (ReversoReaderExtension) {
//                 if (ReversoReaderExtension.oneClick.check()) {
//                     ReversoReaderExtension.oneClick.off();
//                     top.window.postMessage('exitOneClick: true', '*');
//                 } else {
//                     ReversoReaderExtension.oneClick.on();
//                     top.window.postMessage('setOneClick: true', '*');
//                 }
//             }
//         };
//         toolbarViewerRight.insertBefore(button, toolbarViewerRight.firstChild);
//     }
// }

//sidebarToggle
function setAttributeOneClick() {
    if (document.querySelector("#sidebarToggle")) {
        document.querySelector("#sidebarToggle").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#toolbarViewer")) {
        document.querySelector("#toolbarViewer").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#toolbarViewerLeft")) {
        document.querySelector("#toolbarViewerLeft").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#toolbarViewerMiddle")) {
        document.querySelector("#toolbarViewerMiddle").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#loadingBar")) {
        document.querySelector("#loadingBar").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#viewerContextMenu")) {
        document.querySelector("#viewerContextMenu").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#thumbnailView")) {
        document.querySelector("#thumbnailView").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#sidebarContainer")) {
        document.querySelector("#sidebarContainer").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#toolbarSidebar")) {
        document.querySelector("#toolbarSidebar").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#sidebarContent")) {
        document.querySelector("#sidebarContent").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#outlineView")) {
        document.querySelector("#outlineView").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#attachmentsView")) {
        document.querySelector("#attachmentsView").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#secondaryToolbar")) {
        document.querySelector("#secondaryToolbar").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#secondaryToolbarButtonContainer")) {
        document.querySelector("#secondaryToolbarButtonContainer").setAttribute("data-oneclick", "false");
    }
    if (document.querySelector("#errorWrapper")) {
        document.querySelector("#errorWrapper").setAttribute("data-oneclick", "false");
    }
}

function regOnMouse(event) {

    const className = 'ReversoReader__added_line_break';
    if (event.path && event.path[0] && event.path[0].classList && !event.path[0].classList.contains(className)) {
        let element = event.path[0];
        if (element.previousSibling && element.offsetTop && element.previousSibling.offsetTop && element.offsetTop > element.previousSibling.offsetTop) {
            element.textContent = `\uFEFF${element.textContent}`;
        }
        element.classList.add(className);
    }

    // TODO Думать!
    // const className = 'ReversoReader__added_line_break';
    // const wrapWords = (node) => {
    //     const regular = /([^%{}=<>\s]+)/g; // /([^ %,!?.{}”“"„«»\:\;\-\[\](\)=<>\s]+)/g;
    //     if (node.hasChildNodes) {
    //         [].forEach.call(node.childNodes, (el) => {
    //             if (!el.classList || (el.classList && !el.classList.contains('ReversoReader__added_line_break'))) {
    //                 wrapWords(el);
    //             }
    //         });
    //     }
    //
    //     if (node.nodeType === 3) {
    //         let el = node.nodeValue;
    //         if (el.trim && el.trim().length > 1) {
    //             const wrapper = document.createElement('span');
    //             if (node.parentNode && wrapper.appendChild) {
    //                 node.parentNode.insertBefore(wrapper, node);
    //                 wrapper.appendChild(node);
    //                 wrapper.innerHTML = el.replace(regular, '\uFEFF$1');
    //                 // el = el.replace(regular, '\uFEFF$1');
    //             }
    //         }
    //     }
    // };
    //
    // if (event.path && event.path[1] && event.path[1].classList && !event.path[1].classList.contains(className)) {
    //     const element = event.path[1];
    //     wrapWords(element);
    //     element.classList.add(className);
    // }
}


// Document ready
window.onload = function () {
    //addedButtonOneClick();
    setAttributeOneClick();
    document.onmousedown = function (event) {
        regOnMouse(event);
    };
    document.ondblclick = function (event) {
        regOnMouse(event);
    };

    if (document.querySelector('#ReversoReaderBack')) {
        document.querySelector('#ReversoReaderBack')
            .onclick = () => chrome && chrome.runtime && chrome.runtime.sendMessage ? chrome.runtime.sendMessage({closeTab: true}) : false;

        if (window['LOCALIZATION_REVERSO_R']) {
            document.querySelector('#ReversoReaderBack').setAttribute('title', window['LOCALIZATION_REVERSO_R'].get['backToOriginalDocument'])
        } else {
            document.querySelector('#ReversoReaderBack').setAttribute('title', 'Back to original document');
        }
    }

    if (document.querySelector('#viewerContainer') && window.parent) {
        document.querySelector('#viewerContainer').addEventListener('scroll', function (e) {
            // if (document.querySelector("#reverso-context-button-for-translate"))
            //     ReversoReaderExtension.buttonSelection.remove();

            // Удаляем iframe, если выделенное слово не видно на экране
            var hWin = Math.min(document.documentElement.clientHeight, window.innerHeight) || Math.max(document.documentElement.clientHeight, window.innerHeight),
                highlight = document.querySelector("hghlght");
            if (highlight && ((highlight.getBoundingClientRect().top || 0) <= 0 || (highlight.getBoundingClientRect().top || 9999) >= hWin)) {
                window.getSelection().removeAllRanges();
                try {
                    window.parent['postMessage']('closeIframe:true', '*');
                } catch (error) {
                }
            }
        });
    }

    if (document.querySelector('#deactivateReversoInPdf')) {
        document.querySelector('#deactivateReversoInPdf')
            .onclick = () => {
            if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
                chrome.runtime.sendMessage({
                    setSettings: {
                        name: 'settings_openPdf',
                        value: false,
                    },
                });
                chrome.runtime.sendMessage({closeTab: true})
            }
            return;
        }
    }
};

