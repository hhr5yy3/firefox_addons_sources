// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[887],{208:function(a,b,c){"use strict"
;var d=c(36758),e=c.n(d),f=c(40935),g=c.n(f),h=c(20062),i=c.n(h),j=new URL(c(99831),c.b),k=new URL(c(59212),c.b),l=new URL(c(81869),c.b),m=new URL(c(99110),c.b),n=new URL(c(26310),c.b),o=new URL(c(21727),c.b),p=new URL(c(18417),c.b),q=new URL(c(73688),c.b),r=new URL(c(31072),c.b),s=new URL(c(23261),c.b),t=new URL(c(91742),c.b),u=new URL(c(9255),c.b),v=new URL(c(48005),c.b),w=new URL(c(35214),c.b),x=new URL(c(19566),c.b),y=new URL(c(75223),c.b),z=new URL(c(16296),c.b),A=new URL(c(97410),c.b),B=new URL(c(10627),c.b),C=new URL(c(7963),c.b),D=new URL(c(24659),c.b),E=new URL(c(6456),c.b),F=new URL(c(18871),c.b),G=new URL(c(6343),c.b),H=new URL(c(57541),c.b),I=new URL(c(77537),c.b),J=new URL(c(80515),c.b),K=new URL(c(3083),c.b),L=new URL(c(91219),c.b),M=new URL(c(23643),c.b),N=new URL(c(43446),c.b),O=new URL(c(32983),c.b),P=new URL(c(70447),c.b),Q=new URL(c(30221),c.b),R=new URL(c(50535),c.b),S=new URL(c(31996),c.b),T=new URL(c(33437),c.b),U=new URL(c(40214),c.b),V=new URL(c(78244),c.b),W=new URL(c(84249),c.b),X=new URL(c(84817),c.b),Y=new URL(c(25224),c.b),Z=new URL(c(70162),c.b),aa=new URL(c(44112),c.b),ab=new URL(c(25116),c.b),ac=new URL(c(58863),c.b),ad=g()(e()),ae=i()(j),af=i()(k),ag=i()(l),ah=i()(m),ai=i()(n),aj=i()(o),ak=i()(p),al=i()(q),am=i()(r),an=i()(s),ao=i()(t),ap=i()(u),aq=i()(v),ar=i()(w),as=i()(x),at=i()(y),au=i()(z),av=i()(A),aw=i()(B),ax=i()(C),ay=i()(D),az=i()(E),aA=i()(F),aB=i()(G),aC=i()(H),aD=i()(I),aE=i()(J),aF=i()(K),aG=i()(L),aH=i()(M),aI=i()(N),aJ=i()(O),aK=i()(P),aL=i()(Q),aM=i()(R),aN=i()(S),aO=i()(T),aP=i()(U),aQ=i()(V),aR=i()(W),aS=i()(X),aT=i()(Y),aU=i()(Z),aV=i()(aa),aW=i()(ab),aX=i()(ac)
;ad.push([a.id,`/* Highlighting founded search parts */\n.found-text {\n    font-weight: bold;\n}\n/* The same width of the pages */\n.page-common-width {\n    width: 381px;    \n}\n\n/* Back button at the top of the page. Arrow icon */\n.back-button {\n    width: 36px;\n    height: 36px;\n }\n\n.back-button-icon {\n    background: url(${ae}) no-repeat center;\n}\n\n.back-button:hover {\n    background-color: #eeeeee;\n    background-color: var(--button-hover-color);\n}\n\n/* Show new progress svg on action after delay */\n.action-progress-overlay-circle {\n    display: flex;\n\n    /* show at the center of the parent */\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n\n    /* 48px by default*/\n    width: 100%;\n    height: 100%;\n    background: url(${af}) no-repeat center;\n}\n\n.progress-position-relative {\n    position: relative;\n    top: auto;\n    left: auto;\n    transform: none; \n}\n\ninput[type="button"].blue {\n    min-width: 85px;\n    min-height: 20px;\n    cursor: pointer;\n    border: 1px solid #2962ff;\n    background: #2979ff;\n}\n\ninput[type="button"].blue:focus {\n    outline: none;\n}\n\ninput[type="button"].blue::-moz-focus-inner {\n    border: 0;\n}\n\ninput[type="button"].white {\n    min-width: 85px;\n    min-height: 20px;\n\n    cursor: pointer;\n\n    color: #000000;\n    color: var(--white-button-text-color);\n\n    border: 1px solid #d8dce0;\n    border: 1px solid var(--white-button-border-color);\n\n    background: #ffffff;\n    background: var(--white-button-background-color);\n}\n\ninput[type="button"].white:focus {\n    outline: none;\n    border: 1px solid;\n    border-color: #82b1ff;\n    border-color: var(--white-button-focus-border-color);\n}\n\n\ninput[type="button"].white::-moz-focus-inner {\n    border: 0;\n}\n\ninput[type="button"].white:hover {\n    background-color: #e5f1fb;\n    background-color: var(--white-button-hover-background-color);\n}\n\ninput[type="button"].white:active {\n    border: 1px solid #d8dce0;\n    border: 1px solid var(--white-button-active-border-color);\n\n    background: #d8dce0;\n    background: var(--white-button-active-background-color);\n}\n\ninput[type="button"].white:disabled {\n    color: #838383;\n    color: var(--white-button-disabled-text-color);\n\n    border: 1px solid #cccccc;\n    border: 1px solid var(--white-button-disabled-border-color);\n}\n\n/* Horizontal progress bar */\n.progress {\n    height: 32px;\n\n    position: relative;\n    overflow: hidden;\n\n    border: 1px solid #bcbcbc;\n    border: 1px solid var(--progress-border-color);\n\n    background: #e1e1e1;\n    background: var(--progress-background-color);\n}\n\n.progress div {\n    height: 100%;\n\n    background: #06b025;\n    background: var(--progress-indicator-color);\n}\n\n@keyframes progress-indicator-marquee-animation {\n    from {\n        left: -125px;\n    }\n    to {\n        left: 100%;\n    }\n}\n\n.progress.marquee div {\n    margin: 1px;\n    height: calc(100% - 2px);\n\n    position: absolute;\n\n    width: 125px;\n\n    background: #06b025;\n    background: var(--progress-indicator-color);\n\n    animation: progress-indicator-marquee-animation 3s linear infinite;\n}\n\n/* data item types icons */\n.login-icon {\n    background-image: url(${ag});\n}\n\n.dark-theme .login-icon {\n    background-image: url(${ah});\n}\n\n.bookmark-icon {\n    background-image: url(${ai});\n}\n\n.dark-theme .bookmark-icon {\n    background-image: url(${aj});\n}\n\n.searchcard-icon {\n    background-image: url(${ak});\n}\n\n.blocking-passcard-icon {\n    background-image: url(${al});\n}\n\n.identity-icon {\n    background-image: url(${am});\n}\n\n.dark-theme .identity-icon {\n    background-image: url(${an});\n}\n\n.contact-icon {\n    background-image: url(${ao});\n}\n\n.dark-theme .contact-icon {\n    background-image: url(${ap});\n}\n\n.safenote-icon {\n    background-image: url(${aq});\n}\n\n.dark-theme .safenote-icon {\n    background-image: url(${ar});\n}\n\n.folder-icon {\n    background-image: url(${as});\n}\n\n.dark-theme .folder-icon {\n    background-image: url(${at});\n}\n\n\n.icon-overlay-limited {\n    background-image: url(${au});\n}\n\n.icon-overlay-regular {\n    background-image: url(${av});\n}\n\n.icon-overlay-manager {\n    background-image: url(${aw});\n}\n\n.icon-overlay-granted {\n    background-image: url(${ax});\n}\n\n.icon-overlay-received {\n    background-image: url(${ay});\n}\n\n.icon-overlay-login-only {\n    background-image: url(${az});\n}\n\n/* YES/NO toggle button for Consent Firefox page */\n.switcher {\n    display: flex;\n    flex-direction: row;\n    border: 1px solid var(--toggle-on-button-background-color);\n    border-radius: 10px;\n    cursor: pointer;\n}\n\n.switcher .left-button,\n.switcher .right-button {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    padding: 10px;\n    background-color: #e1e1e1;\n    background-color: var(--toggle-off-button-background-color);\n    color: var(--toggle-off-button-text-color);\n    border-radius: 8px;\n    border-width: 1px;\n    min-width: 40px;\n}\n\n.switcher .left-button {\n    border-right-style: solid;\n    border-color: #2979ff;\n    border-color: var(--toggle-on-button-background-color);\n}\n\n.switcher .right-button {\n    margin-left: -30px;\n    border-left-style: solid;\n    border-color:#adadad;\n    border-color: var(--toggle-off-button-border-color);\n}\n\n.switcher .left-button.highlighted,\n.switcher .right-button.highlighted {\n    background-color: #2979ff;\n    background-color: var(--toggle-on-button-background-color);\n    color: #ffffff;\n    color: var(--toggle-on-button-text-color);\n}\n\n.switcher.left-button-selected .right-button,\n.switcher.right-button-selected .left-button\n{\n    visibility: hidden;\n}\n\n.switcher-disabled {\n    border: 1px solid var(--toggle-disabled-border-color);\n    background-color: var(--toggle-disabled-background-color);\n}\n\n.switcher-disabled.highlighted {\n    border-color: var(--toggle-disabled-border-color);\n}\n\n.switcher-disabled .left-button,\n.switcher-disabled .left-button.highlighted,\n.switcher-disabled .right-button.highlighted,\n.switcher-disabled .right-button {\n    background-color: var(--toggle-on-button-disabled-background-color ,rgba(214, 214, 214, 1));\n    color: var(--toggle-on-button-disabled-text-color, rgba(159, 159, 159, 1));\n    border-color: var(--toggle-disabled-border-color);\n}\n\n.switcher-disabled .right-button {\n    border-color: var(--toggle-off-button-disabled-border-color);\n}\n\n\n/** Common styles for items lists:\n * - Recent/Popular/Pinned Logins\n * - Fill section (matches, identities)\n * - Search results\n * - Show all Matches(Identities)\n */\n.list {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    overflow-y: auto;\n    overflow-x: hidden;\n}\n\n.list-padding {\n    padding-top: 4px;\n    padding-bottom: 4px;\n}\n\n.list .list-item {\n    display: flex;\n    flex-direction: row;\n    flex-shrink: 0;\n    cursor: default;\n}\n\n.list .list-item > *:hover {\n    background-color: var(--list-item-hover-background-color);\n}\n\n.list .list-item.selected .icon-text,\n.list .list-item.highlighted .icon-text {\n    background-color: var(--list-item-accented-background-color);\n}\n\n.list .list-item.selected .icon-text .text,\n.list .list-item.highlighted .icon-text .text {\n    color: var(--list-item-accented-text-color);\n}\n\n.list .list-item.selected .icon-text .text b,\n.list .list-item.highlighted .icon-text .text b {\n    color: var(--list-item-accented-bold-text-color);\n}\n\n.list .list-item.selected  .text .folder-text,\n.list .list-item.highlighted  .text .folder-text {\n    color: var(--list-item-accented-folder-text-color);\n}\n\n.list .list-item.selected  .text .folder-text .found-text,\n.list .list-item.highlighted  .text .folder-text .found-text,\n.list .list-item.selected  .text .name-text .found-text,\n.list .list-item.highlighted  .text .name-text .found-text {\n    color: var(--list-item-accented-bold-text-color);\n}\n\n.list .list-item.selected  .text .name-text,\n.list .list-item.highlighted  .text .name-text {\n    color: var(--list-item-accented-text-color);\n}\n\n.list .list-item.selected  .text .name-text b,\n.list .list-item.highlighted  .text .name-text b {\n    color: var(--list-item-accented-bold-text-color);\n}\n\n.list .list-item .icon-text {\n    padding-left: 14px;\n    width: 100%;\n    min-height: 34px;\n    box-sizing: border-box;\n    cursor: default;\n\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    border-top-right-radius: 15px;\n    border-bottom-right-radius: 15px;\n}\n\n.list .list-item .icon-text .icon-section {\n    width: 26px;\n    height: 26px;\n    flex-shrink: 0;\n    align-items: center;\n    justify-content: center;\n    border: 1px solid transparent;\n    border-radius: 6px;\n    box-sizing: border-box;\n}\n\n.list .list-item .icon-text .with-border {\n    border: 1px solid var(--list-item-round-border-color);\n}\n\n.list .list-item .icon-text .icon {\n    width: 24px;\n    height: 24px;\n    background-size: 24px 24px;\n    align-items: center;\n    justify-content: center;\n    border-radius: 3px;\n}\n\n/* Enterprise/Consumer sharing overlay icon */\n.list .list-item .icon .icon-overlay,\n.list .icon-section .icon-overlay {\n    margin-top: -9px;\n    margin-left: 18px;\n    width: 12px;\n    height: 12px;\n    background-size: 12px 12px;\n}\n\n.list .list-item .icon-text .text {\n    /* font-weight: 500; */\n    flex: 1;\n    padding: 1px 0px 3px 14px;\n    color: var(--list-item-text-color);\n\n    /* display: -webkit-box;\n    -webkit-box-orient: vertical; */\n    overflow: hidden;\n    overflow-wrap: break-word;\n    word-wrap: break-word;\n    word-break: break-word;\n}\n\n/* for long item name-path, show max 2 lines*/\n.list .list-item .icon-text .short-path {\n    -webkit-line-clamp: 2;\n}\n\n/* for search we can show max 4 lines*/\n.list .list-item .icon-text .long-path {\n    -webkit-line-clamp: 4;\n}\n\n/* Login action (>) icon */\n\n.list .list-item .action-icon {\n    visibility: hidden;\n    padding-right: 0.7em;\n    background-size: 20px;\n    width: 24px;\n    height: 24px;\n    opacity: 0.5;\n}\n\n.list .list-item .icon-text:hover .action-icon {\n    visibility: visible;\n    display: block;\n}\n\n.list .list-item .login-action-icon {\n    background-image: url(${aA});\n}\n.platform-mac:not(.dark-theme) .list .list-item:hover .login-action-icon {\n    background-image: url(${aB});\n}\n/* .dark-theme .list .list-item .login-action-icon {\n    background-image: url("../res/menu-login-dark.svg");\n} */\n\n.list .list-item .goto-action-icon {\n    background-image: url(${aC});\n}\n.platform-mac:not(.dark-theme) .list .list-item:hover .goto-action-icon {\n    background-image: url(${aD});\n}\n/* .dark-theme .list .list-item .goto-action-icon {\n    background-image: url("../res/menu-goto-dark.svg");\n} */\n\n.list .list-item .view-action-icon {\n    background-image: url(${aE});\n}\n.platform-mac:not(.dark-theme) .list .list-item:hover .view-action-icon {\n    background-image: url(${aF});\n}\n/* .dark-theme .list .list-item .view-action-icon {\n    background-image: url("../res/menu-view-dark.svg");\n} */\n\n.list .list-item .fill-action-icon {\n    background-image: url(${aG});\n}\n.platform-mac:not(.dark-theme) .list .list-item:hover .fill-action-icon {\n    background-image: url(${aH});\n}\n/* .dark-theme .list .list-item .fill-action-icon {\n    background-image: url("../res/menu-fill-dark.svg");\n} */\n\n\n/* More actions(3dots) button for list item */\n\n.list .list-item .more-actions-button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 30px;\n    min-height: 30px;\n}\n\n.list .list-item .more-actions-button:hover > *:first-child {\n    border-radius: 50%;\n    background-color: var(--list-item-hover-background-color);\n}\n\n.list .list-item .more-actions-button .icon {\n    display: flex;\n    min-height: 28px;\n    min-width: 28px;\n    align-items: center;\n    justify-content: center;\n}\n\n.list .list-item:hover .more-actions-button .more-actions-icon,\n.list .list-item .more-actions-button.highlighted .more-actions-icon {\n    background-image: url(${aI});\n}\n\n.list .list-item .more-actions-button:hover .more-actions-icon {\n    background-image: url(${aJ});\n}\n\n.dark-theme .list .list-item:hover .more-actions-button .more-actions-icon,\n.dark-theme .list .list-item .more-actions-button.highlighted .more-actions-icon {\n    background-image: url(${aK});\n}\n\n.list .list-item .compromised-mark-icon {\n    background-image: url(${aL});\n}\n\n\n/* show All identities */\n.list-item .show-all {\n    display: flex;\n    width: 100%;\n    text-indent: 14px;\n    align-items: center;\n    color: var(--list-item-show-all-text-color);\n}\n\n/* counter of items */\n.list .list-item .counter-section {\n    display: flex;\n    width: 26px;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\n.list .list-item .counter-section .counter {\n    display: flex;\n    min-height: 24px;\n    min-width: 24px;\n    border-radius: 24px;\n    justify-content: center;\n    align-items: center;\n    font-size: 0.9em;\n    opacity: 0.9;\n    box-sizing: border-box;\n\n    color: var(--items-counter-text-color);\n    background: var(--items-counter-background-color);\n    border: 1px solid var(--items-counter-border-color);\n}\n\n/* 'Add New..' list item: PLUS sign with text  */\n.list .list-item .add-circle {\n    border-radius: 50%;\n    width: 24px;\n    height: 24px;\n    background-color: var(--list-item-addnew-circle-background-color);\n    border: 1px solid var(--list-item-addnew-circle-border-color);\n}\n\n.list .list-item .add-circle::before {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    height: 24px;\n    width: 24px;\n    font-size: 2em;\n    /* font-weight: bold; */\n    font-family: courier;\n    content: "+";\n    color: var(--list-item-addnew-circle-plus-color);\n}\n\n.list .list-item .icon-text .add-text {\n    padding-left: 10px;\n}\n\n.list .list-item .text .folder-text {\n    color: var(--list-item-folder-text-color);\n}\n\n.list .list-item .text .folder-text .found-text,\n.list .list-item .text .name-text .found-text {\n    color: var(--list-item-bold-text-color);\n}\n\n.list .list-item .text .name-text {\n    padding-left: 0.3em\n}\n\n.list .list-item .text .name-text b {\n    color: var(--list-item-bold-text-color);\n}\n\n\n/*\n *  Back button at the top of the pages with Arrow icon:\n *  - Setup pages \n *  - Show all matches, identities\n *  - Password Generator\n * Add padding left for back icon or text: some dialogs \n * does not have back icon\n */\n\n.header-section {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    box-sizing: border-box;\n    width: 100%;\n    border-bottom: 1px solid var(--back-section-border-bottom-color);\n    background-color: var(--back-section-background-color);\n    min-height: 40px;\n    padding: 0 5px;\n}\n\n.header-text-section {\n    display: flex;\n    flex-direction: row;\n}\n\n.header-back-button {\n    min-width: 36px;\n    min-height: 36px;\n    position: absolute;\n}\n\n.back-icon {\n    background: url(${aM}) no-repeat center;\n}\n\n.dark-theme .back-icon {\n    background: url(${aN}) no-repeat center;\n}\n\n.header-back-button:hover {\n    border-radius: 20px;\n    cursor: pointer;\n    background-color: var(--back-button-hover-color);\n}\n\n/** \n    Main text with average weight, size....\n*/\n.normal-text {\n    display: flex;\n    text-align: justify;\n    font-weight: normal;\n    font-size: 1.1em;\n    color: var(--main-text-color);\n}\n\n/** \n    Hint text, with smaller font than \n    normal or title text. Also not so\n    bright in color.\n*/\n.hint-text {\n    display: flex;\n    flex-direction: row;\n    text-align: center;\n    justify-content: center;\n    font-size: 0.9em;\n    color: var(--hint-text-color);\n}\n\n/** \n    Error text\n*/\n.error-text {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    width: 95%;\n    font-size: 1em;\n    letter-spacing: 0.01em;\n    padding: 2px 0;\n    min-height: 25px;\n    color: var(--error-text-color);\n    overflow-y: auto;\n}\n\n/** \n  Big bold text style for titles\n*/\n.title-text {\n    display: flex;\n    width: 100%;\n    justify-content: center;\n    font-size: 1.6em;\n    /* font-weight: 600; */\n    /* letter-spacing: 0.15px; */\n    color: var(--main-text-color);\n}\n\n/** \n    Copyright text at the bottom of the most setup pages.\n    Should be combined with hint-text in styles\n*/\n.copyright-text {\n    flex-basis: 30px;\n    width: 100%;\n}\n\n.text-ellipsis {\n    display: block;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.text-break-word {\n    /* -webkit-line-clamp: 4;\n    -webkit-box-orient: vertical;\n    display: -webkit-box; */\n    overflow: hidden;\n    overflow-wrap: break-word;\n    word-wrap: break-word;\n}\n\n/** \n  wide input for editing\n*/\n.extension-normal-input {\n    min-height: 52px;\n    min-width: 315px;\n    border-radius: 3px;\n    text-indent: 10px;\n    box-sizing: content-box;\n\n    outline: none;\n    -webkit-appearance: none;\n\n    background-color: var(--edit-background-color);\n    border: 1px solid var(--edit-border-color);\n    color: var(--edit-text-color);    \n    caret-color: var(--edit-caret-color);\n}\n\n.input-with-hint {\n    min-height: 40px;\n    padding-top: 12px;\n}\n\n.extension-normal-input:hover:not(:focus):not(:disabled) {\n    border: 1px solid var(--edit-hover-border-color);\n}\n\n.extension-normal-input:focus {\n    border: 1px solid var(--edit-focused-border-color);\n}\n\n.extension-normal-input:disabled {\n    border: 1px solid var(--edit-disabled-border-color);\n    background-color: var(--edit-disabled-background-color);\n    color: var(--edit-disabled-text-color);    \n}\n\n.extension-normal-input:disabled::placeholder {\n    color: var(--edit-disabled-placeholder-color);\n}\n\n.extension-normal-input[type="password"]::-ms-reveal {\n    display: none;\n}\n\n.extension-normal-input::placeholder {\n    font-size: 15px;\n    /* letter-spacing: 0.15px; */\n    color: var(--edit-placeholder-color);\n    /* font-weight: 500; */\n}\n\n.input-hint {\n    position: relative;\n    opacity: 0.8;\n    text-indent: 14px;\n    /* letter-spacing: 0.07em; */\n    /* font-weight: 450; */\n    justify-content: left;\n    top: 12px;\n    line-height: 0px;\n}\n\n.select-hint {\n    position: relative;\n    opacity: 0.8;\n    text-indent: 14px;\n    /* letter-spacing: 0.07em; */\n    /* font-weight: 450; */\n    justify-content: left;\n    top: 14px;\n    line-height: 0px;\n}\n\n\n/** \n    Input with placeholder which will move up\n    and became less in height on input focus\n*/\n\n.input-with-placeholder {\n    display: flex;\n    flex-flow: column;\n    min-height: 58px;\n    padding-bottom: 20px;\n    position: relative;\n}\n\n.input-with-placeholder .input-placeholder {\n    position: absolute;\n    text-indent: 14px;\n    /* font-weight: 450; */\n    justify-content: left;\n    top: 28px;\n    line-height: 0px;\n    font-size: 1.2em;\n    order: -1;\n    pointer-events: none;\n    transition: all 0.3s ease-in;\n    opacity: 1;\n}\n\n.input-with-placeholder input:disabled:not([value=""]),\n.input-with-placeholder input:valid,\n.input-with-placeholder input:focus {\n    min-height: 40px;\n    line-height: 40px;\n    padding-top: 13px;\n}\n\n.input-with-placeholder input:disabled:not([value=""]) + .input-placeholder,\n.input-with-placeholder input:valid + .input-placeholder,\n.input-with-placeholder input:focus + .input-placeholder {\n    top: 12px;\n    font-size: 0.9em;\n    opacity: 0.9;\n}\n\n/** \n  Buttons styles concerning width size, for now: \n  - normal (min-width:90px)\t (for Password Generator Page, min-wdith:110px)\n  - wide   (min-width:272px)\t\t\n*/\n.normal-button {\n    min-width: 90px;\n    min-height: 36px;\n    border-radius: 3px;\n\n    padding-left: 4px;\n    padding-right: 4px;\n\n    font-size: 1.1em;  \n    font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;\n    /* letter-spacing: 0.5px; */\n}\n\n.wide-button {\n    min-width: 272px;\n    min-height: 50px;\n    border-radius: 8px;\n\n    padding-left: 8px;\n    padding-right: 8px;\n\n    font-size: 1.3em; \n    font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;\n    /* letter-spacing: 0.4px;  */\n}\n\n/** \n  Buttons styles concerning color, for now:\n  - Important button(blue background)\n  - Regular   button\n  - Low emphasis button\n    white background for light-theme\n    balck background for dark-theme\n*/\n\n/** Regular button */\n.regular-button {\n    justify-content: center;\n    font-style: normal;\n    font-weight: 600;\n    cursor: pointer;\n\n    color: var(--regular-button-text-color);\n    background: var(--regular-button-background-color);\n    border: 1px solid var(--regular-button-border-color);\n}\n\n.regular-button:hover {\n    background: var(--regular-button-hover-color);\n    border: 1px solid var(--regular-button-hover-border-color);\n}\n\n.regular-button:active {\n    background: var(--regular-button-active-color);\n    border: 1px solid var(--regular-button-active-border-color);\n}\n\n.regular-button:disabled {\n    background: var(--regular-button-disabled-color);\n    border: 1px solid var(--regular-button-disabled-border-color);\n    color: var(--regular-button-disabled-text-color);\n    cursor: default;\n}\n\n.regular-button:focus {\n    outline: none;\n    background: var(--regular-button-active-color);\n}\n\n.regular-button::-moz-focus-inner {\n    border: 0;\n}\n\n/** Important button, for now with blue background */\n.important-button {\n    justify-content: center;\n    font-style: normal;\n    font-weight: 600;\n    cursor: pointer;\n\n    color: var(--important-button-text-color);\n    background: var(--important-button-background-color);\n    border: 1px solid var(--important-button-border-color);\n}\n\n.important-button:hover {\n    background: var(--important-button-hover-color);\n    border-color: var(--important-button-hover-color);\n}\n\n.important-button:active {\n    background: var(--important-button-active-color);\n    border-color: var(--important-button-active-color);\n}\n\n.important-button:disabled {\n    border: 1px solid var(--important-button-disabled-border-color);\n    background: var(--important-button-disabled-color);\n    color: var(--important-button-disabled-text-color);\n    cursor: default;\n}\n\n.important-button:focus {\n    outline: none;\n    background: var(--important-button-active-color);\n    border-color: var(--important-button-active-color);\n}\n\n.important-button::-moz-focus-inner {\n    border: 0;\n}\n\n/** Low emphasis button */\n.low-emphasis-button {\n    justify-content: center;\n    font-style: normal;\n    font-weight: 600;\n    cursor: pointer;\n\n    color: var(--low-emphasis-button-text-color);\n    background-color: transparent;\n    border: 0;\n}\n\n.low-emphasis-button:hover {\n    background: var(--low-emphasis-button-hover-color);\n}\n\n.low-emphasis-button:active {\n    background: var(--low-emphasis-button-active-color);\n}\n\n.low-emphasis-button:disabled {\n    color: var(--low-emphasis-button-disabled-text-color);\n    cursor: default;\n}\n\n.low-emphasis-button:focus {\n    outline: none;\n    background: var(--low-emphasis-button-focused-color);\n}\n\n.low-emphasis-button::-moz-focus-inner {\n    border: 0;\n}\n\n\n/** \n  A(anchor) element action as a button\n*/\n.flat-link {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    text-decoration: none;\n    min-height: 25px;\n\n    /*font-weight: 600;\n    font-size: 1.3em;*/\n\n    /* font-weight: 400; */\n    font-size: 1.2em;\n\n    color: var(--flat-link-text-color);\n}\n\n.flat-link:hover {\n    color: var(--flat-link-hover-text-color);\n}\n\n.flat-link:focus {\n    outline: none;\n    color: var(--flat-link-hover-text-color);\n}\n\n.flat-link.disabled { \n    pointer-events: none; \n    cursor: default; \n    color: var(--flat-link-disabled-text-color);\n}\n\n/** \n RoboForm Robot logo with RoboForm text logo, \n common for most setup pages and in About page\n*/\n.logo-section {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 100%;\n    padding-top: 40px;\n}\n\n.logo-section .logo {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n}\n\n.logo-section .robot-logo {\n    min-height: 80px;\n    background: url(${aO}) no-repeat center;\n}\n\n.dark-theme .logo-section .robot-logo {\n    background: url(${aP}) no-repeat center;\n}\n\n.logo-section .name-logo {\n    min-height: 40px;\n    background: url(${aQ}) no-repeat center;\n}\n\n.dark-theme .logo-section .name-logo {\n    background: url(${aR}) no-repeat center;\n}\n\n\n/** \n    Password score control: shield with text below\n*/\n.password-score {\n    text-align: center;\n}\n\n.password-score-meter {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    column-gap: 8px;\n}\n\n.password-score-img {\n    display: flex;\n    min-width: 24px;\n    height: 24px;\n}\n\n.password-score-meter .password-score-img {\n    min-width: 19px;\n    height: 19px;\n}\n\n.password-score-weak .password-score-img {\n    background: url(${aS}) no-repeat center;\n}\n\n.password-score-weak .password-score-text {\n    color: var(--password-weak-strength-color);\n}\n\n.password-score-medium .password-score-img {\n    background: url(${aT}) no-repeat center;\n}\n\n.password-score-medium .password-score-text {\n    color: var(--password-medium-strength-color);\n}\n\n.password-score-good .password-score-img {\n    background: url(${aU}) no-repeat center;\n}\n\n.password-score-good .password-score-text {\n    color: var(--password-good-strength-color);\n}\n\n.password-score-strong .password-score-img {\n    background: url(${aV}) no-repeat center;\n}\n\n.password-score-strong .password-score-text {\n    color: var(--password-strong-strength-color);\n}\n\n/* Notification area */\n.notification {\n    display: flex;\n    flex-direction: row;\n    min-height: 30px;\n    min-width: 150px;\n    border-radius: 5px;\n    max-width: 90%;\n    align-items: center;\n    padding: 5px 7px;\n    opacity: 0.7;\n\n    visibility: hidden;\n    opacity: 0;    \n\n    transition: visibility 0.7s linear, opacity 0.7s linear;   \n}\n\n.notification.visible {\n    visibility: visible;\n    opacity: 0.95;\n}\n\n.notification .text {\n    flex-grow: 1;\n    display: block;\n    font-size: 1em;\n    max-width: 100%;\n    padding-right: 15px;\n\n    overflow: hidden;\n    overflow-wrap: break-word;\n    word-wrap: break-word;\n    word-break: break-word;\n    text-overflow: ellipsis;    \n}\n\n.notification.information {\n    background-color: var(--notification-info-background-color);\n    color: var(--notification-info-text-color);\n}\n\n.notification.warning {\n    background-color: var(--notification-warning-background-color);\n    color: var(--notification-warning-text-color);\n}\n\n.notification.error {\n    background-color: var(--notification-error-background-color);\n    color: var(--notification-error-text-color);\n}\n\n.notification .icon {\n    flex-shrink: 0;\n    width: 16px;\n    height: 16px;\n    background-size: 16px 16px;\n    cursor: pointer;\n}\n\n.notification.information .close-icon,\n.dark-theme .notification.information .close-icon,\n.notification.error .close-icon,\n.dark-theme .notification.error .close-icon {\n    background: url(${aW}) no-repeat center;\n}\n\n.notification.warning .close-icon,\n.dark-theme .notification.warning .close-icon {\n    background: url(${aX}) no-repeat center;\n}\n\n.page-flexy-space {\n    flex-grow: 1;\n}\n\n/** \n    (dis)allow select text\n*/\n.unselectable {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.selectable {\n    -webkit-user-select: text;\n    -webkit-user-drag: auto;\n    -moz-user-select: text;\n    -ms-user-select: text;\n    user-select: text;\n}\n\n\n.hidden {\n    display: none !important;\n}\n\n.image {\n    background-position: center;\n    background-repeat: no-repeat;\n}\n\n/** \n    common styles for images\n*/\n.size16 {\n    width: 16px;\n    height: 16px;\n    background-size: 16px;\n}\n\n.size18 {\n    width: 18px;\n    height: 18px;\n    background-size: 18px;\n}\n\n.size20 {\n    width: 20px;\n    height: 20px;\n    background-size: 20px;\n}\n\n.size24 {\n    width: 24px;\n    height: 24px;\n    background-size: 24px;\n}\n\n.size28 {\n    width: 28px;\n    height: 28px;\n    background-size: 28px;\n}\n\n.size32 {\n    width: 32px;\n    height: 32px;\n    background-size: 32px;\n}\n\n.size48 {\n    width: 48px;\n    height: 48px;\n    background-size: 48px;\n}\n\n.size64 {\n    width: 64px;\n    height: 64px;\n    background-size: 64px;\n}\n\n.flex-row {\n    display: flex;\n    flex-flow: row nowrap;\n}\n\n.flex-row-wrap {\n    display: flex;\n    flex-flow: row wrap;\n}\n\n.flex-column {\n    display: flex;\n    flex-flow: column nowrap;\n}\n\n.flex-column-wrap {\n    display: flex;\n    flex-flow: column wrap;\n}\n\n.flex-cell {\n    flex-shrink: 1;\n    flex-grow: 1;\n}\n\n.flex-cell-grow {\n    flex-shrink: 0;\n    flex-grow: 1;\n}\n\n.monospace {\n\tfont-family: Consolas, "Lucida Console", Monaco, monospace;\n}\n\n.icon-by-data-item-path {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-content: center;\n    text-align: center;\n    color: white;\n    border-radius: 100%;\n    height: 100%;\n}\n\n.icon-by-data-item-path.bg-color-1 {\n    background-color: #5bb254;\n}\n\n.icon-by-data-item-path.bg-color-2 {\n    background-color: #ff8888;\n}\n\n.icon-by-data-item-path.bg-color-3 {\n    background-color: #c781ff;\n}\n\n.icon-by-data-item-path.bg-color-4 {\n    background-color: #fab900;\n}\n\n.icon-by-data-item-path.fav-identity {\n    background-color: #448aff;\n}\n\n.report-an-issue-row-for-dialog {\n    display: flex; \n    justify-content: flex-end;\n    padding: 0em;\n    margin-left: 0px;\n    margin-right: 12px;\n}\n\n.report-an-issue-link {\n    color: #999;\n    text-decoration: underline;\n}\n\n.report-an-issue-link:hover {\n    text-decoration: none;\n}\n\n.report-an-issue-link:active {\n    color: #149ab5;\n    text-decoration: none;\n}\n\n.report-an-issue-row-for-popup {\n    display: flex; \n    flex-direction: row;\n    justify-content: left;\n    width: 100%;\n    padding-left: 17px;\n    margin: 0px;\n    min-height: 34px;\n    line-height: 34px;\n    align-self: start; /* override .main-page { align-items: center; } */\n    background-color: var(--main-page-header-background-color);\n}\n\n.report-an-issue-row-for-popup .report-an-issue-link {\n    color: var(--main-page-tab-selector-text-color);\n}\n\n.report-an-issue-row-for-popup .report-an-issue-link:active {\n    color: #149ab5;\n}\n`,""])
},74350:function(a,b,c){"use strict";var d=c(36758),e=c.n(d),f=c(40935),g=c.n(f)()(e())
;g.push([a.id,"body.light-theme,\nbody .light-theme {\n    \n    /* remove later */\n    --white-button-text-color: #000000;\n    --white-button-border-color: #d8dce0;\n    --white-button-background-color: #ffffff;\n    --white-button-hover-background-color: #e5f1fb;\n    --white-button-focus-border-color: #82b1ff;\n    --white-button-active-border-color: #d8dce0;\n    --white-button-active-background-color: #d8dce0;\n    --white-button-disabled-text-color: #838383;\n    --white-button-disabled-border-color: #cccccc;\n\n    --main-background-color: #ffffff;\n\n    /* text */\n    --main-text-color: #000000;\n    --title-text-color: #4f5254;\n    --main-text-disabled-color: #838383;\n    --hint-text-color: hsl(0, 0%, 55%);\n    --error-text-color: #ff0000;\n    --regular-link-color: #31a629;\n\n    --login-page-text-color: rgba(0, 0, 0, 0.87);\n    --login-page-link-color: #2979ff;\n    --login-page-input-border-color: #afb3b6;\n    --login-page-input-focused-border-color: #5d5fef;\n    --login-page-hint-color: rgba(0, 0, 0, 0.4);\n\n    --separator-color: rgba(224, 224, 224, 1);\n    --button-hover-color: rgba(0, 0, 0, 0.12);\n    --overlay-mask-color: rgba(0, 0, 0, 0.1);\n\n    /* Page Header: Start button, search, settings button */\n    --main-page-header-background-color: rgba(236, 237, 237, 1);\n\n    /* Main page tabs */\n    --main-page-tab-selector-text-color: rgba(0, 0, 0, 0.9);\n    --main-page-tab-selector-hover-color: rgba(247, 247, 247, 1);\n    --main-page-tab-selector-selected-color: rgba(255, 255, 255, 1);\n    --main-page-tab-selector-separator-color: rgba(0, 0, 0, 0.4);\n\n    /* Main page list mode selectors */\n    --list-mode-selectors-background-color: rgba(255, 255, 255, 1);\n    --list-mode-selector-text-color: rgba(0, 0, 0, 0.54);\n    --list-mode-selector-selected-text-color: #2962FF;\n    --list-mode-selector-selected-border-color: #2962FF;\n    --list-mode-selector-hover-color: rgba(0, 0, 0, 0.05);\n\n    /* Main page upgrade messages */\n    --main-page-upgrade-background-color: #EEF4FF;\n    --main-page-upgrade-color: rgb(0, 0, 0, 87%);\n    --main-page-upgrade-links-separator-color: rgb(0, 0, 0, 16%);\n    --main-page-upgrade-link-color: #2979FF;\n    --main-page-upgrade-close-button-color: rgb(0, 0, 0, 87%);\n    --main-page-upgrade-close-button-hover-color: #2979FF;\n    --main-page-upgrade-close-button-active-color: #2979FF;\n    \n    /* Main page scroll bars */\n    --vscroll-bar-width: 1em;\n    --hscroll-bar-height: 1em;\n    --scroll-bar-color: transparent;\n    --scroll-bar-active-color: rgb(0, 0, 0, 0.05);\n    --scroll-bar-hover-color: rgb(0, 0, 0, 0.05);\n    --scroll-bar-thumb-border-radius: 0.5em;\n    --scroll-bar-thumb-color: rgb(0, 0, 0, 0.05);\n    --scroll-bar-thumb-active-color: rgb(0, 0, 0, 0.1);\n    --scroll-bar-thumb-hover-color: rgb(0, 0, 0, 0.3);\n\n    /* Identity View */\n    --identity-view-background-color: rgba(0, 0, 0, 0.01);\n    --identity-view-field-captions-color: rgba(0, 0, 0, 0.50);\n    --identity-view-separator-color:  rgba(0, 0, 0, 0.2);\n    --identity-view-instance-radio-hover-color: rgba(0, 0, 0, 0.1);\n\n    /* anchor as a button */\n    --flat-link-text-color: rgba(32, 32, 32, 1);\n    --flat-link-hover-text-color: rgba(96, 96, 96, 1);\n    --flat-link-disabled-text-color: rgba(153, 153, 153, 1);\n\n    /* On/Off Yes/No toogle button for Firefox consent pages*/\n    --toggle-border-color: rgba(173, 173, 173, 1);\n    --toggle-off-button-border-color: rgba(173, 173, 173, 1);\n    --toggle-off-button-text-color: rgba(0, 0, 0, 1);\n    --toggle-off-button-background-color: rgba(225, 225, 225, 1);\n    --toggle-on-button-background-color: rgba(41, 121, 255, 1);\n    --toggle-on-button-text-color: rgba(255, 255, 255, 1);\n\n    --toggle-disabled-border-color: rgba(217, 217, 217, 1);\n    --toggle-disabled-background-color: rgba(241, 241, 241, 1);\n    --toggle-on-button-disabled-background-color: rgba(214, 214, 214, 1);\n    --toggle-on-button-disabled-text-color: rgba(159, 159, 159, 1);\n    --toggle-off-button-disabled-border-color: rgba(225, 225, 225, 1);\n\n    /* Important(blue) button */\n    --important-button-text-color: rgba(255, 255, 255, 1);\n    --important-button-background-color: #31a629;\n    --important-button-border-color: #31a629;\n\n    --important-button-hover-color: #207b1a;\n    --important-button-active-color: #207b1a;\n\n    --important-button-disabled-color:rgba(0, 0, 0, 0.08);\n    --important-button-disabled-text-color:rgba(0, 0, 0, 0.38);\n    --important-button-disabled-border-color:rgba(0, 0, 0, 0.08);\n\n    /* Regular(white) button */\n    --regular-button-text-color: rgba(0, 0, 0, 0.87);\n    --regular-button-background-color: rgba(255, 255, 255, 1);\n    --regular-button-border-color: rgba(0, 0, 0, 0.16);\n\n    --regular-button-hover-color: rgba(41, 121, 255, 0.04);\n    --regular-button-hover-border-color: rgba(0, 0, 0, 0.16);\n    \n    --regular-button-active-color: rgba(41, 121, 255, 0.24);\n    --regular-button-active-border-color: rgba(0, 0, 0, 0.16);\n\n    --regular-button-disabled-color: rgba(255, 255, 255, 1);\n    --regular-button-disabled-border-color: rgba(0, 0, 0, 0.15);\n    --regular-button-disabled-text-color: rgba(0, 0, 0, 0.38);\n\n    /* Low emphasis button */\n    --low-emphasis-button-text-color: rgba(0, 0, 0, 0.60);\n    --low-emphasis-button-hover-color: rgba(41, 121, 255, 0.04);\n    --low-emphasis-button-focused-color: rgba(41, 121, 255, 0.12);\n    --low-emphasis-button-active-color: rgba(41, 121, 255, 0.24);\n    --low-emphasis-button-disabled-text-color: rgba(0, 0, 0, 0.38);\n\n    /* Input for editing text */\n    --edit-background-color: rgba(255, 255, 255, 1);\n    --edit-placeholder-color: rgba(0, 0, 0, 0.54);\n    --edit-border-color: rgba(0, 0, 0, 0.54);\n    --edit-caret-color: rgba(0, 0, 0, 0.87);\n    --edit-text-color: rgba(0, 0, 0, 0.87);\n\n    --edit-disabled-border-color: hsl(0, 0%, 80%);\n    --edit-disabled-text-color: hsl(0, 0%, 77%);\n    --edit-disabled-background-color: hsl(0, 0%, 85%);\n    --edit-disabled-placeholder-color: hsl(0, 0%, 60%);\n\n    --edit-focused-border-color: rgba(49, 166, 41, 1);\n    --edit-focused-placeholder-color: rgba(49, 166, 41, 1);\n    --edit-hover-border-color: rgba(49, 166, 41, 0.87);\n\n    /* Password generator input and select */\n    --passgen-edit-border-color: hsl(0, 0%, 50%);\n    --passgen-edit-hover-border-color: hsl(0, 0%, 60%);\n    --passgen-edit-background-color: white;\n    --passgen-blue-active-elements-color: rgba(41, 121, 255, 1);\n    --passgen-toggle-color: rgba(51, 51, 51, 1);\n    --passgen-fill-btn-color-focus: rgba(229, 239, 255, 1);\n    --passgen-fill-btn-color-hover: rgba(247, 250, 255, 1);\n    --passgen-fill-btn-color-active: rgba(204, 223, 255, 1);\n    --passgen-dropdown-arrow-color: rgba(0, 0, 0, 0.87);\n    --passgen-history-color: rgba(0, 0, 0, 0.36);\n    --passgen-password-hover-color: rgba(0, 0, 0, 0.08);\n    --passgen-restore-and-bitstrength-color: rgba(0, 0, 0, 0.36);\n    --passgen-button-disabled-text-color: rgba(0, 0, 0, 0.38);\n    --main-page-passgen-background-color: rgba(242, 243, 247, 1);\n    --main-page-passgen-separator-color: rgba(0, 0, 0, 0.2);\n\n    /* switch button - SaveForms dialog */\n    --switch-button-inactive-background-color: hsl(0, 0%, 93%);\n    --switch-button-inactive-text-color: hsl(0, 0%, 60%);\n    --switch-button-active-text-color: hsl(0, 0%, 0%);\n    --switch-button-active-border-color: hsl(0, 0%, 89%);\n    --switch-button-active-background-color: hsl(0, 0%, 100%);\n    --switch-button-active-hover-color: hsl(0, 0%, 98%);\n\n    /* treeview - SaveForms dialog */\n    --tree-background-color: hsl(0, 0%, 100%);\n    --tree-item-selected-color: hsl(0, 0%, 87%);\n    --tree-item-hover-color: hsl(0, 0%, 94%);\n\n    /* drop-down list:editable - SaveForms dialog */\n    --select-editable-border-color: rgba(0, 0, 0, 0.54);\n    --select-editable-background-color: rgba(255, 255, 255, 1);\n\n    /* drop-down list:readonly - Password Generator dialog */\n    --select-readonly-border-color: hsl(0, 0%, 93%);\n    --select-readonly-background-color: hsl(0, 0%, 93%);\n    --select-dropdown-button-border-color: hsl(0, 0%, 55%);\n    --select-list-background-color: hsl(0, 0%, 100%);\n    --select-list-border-color: hsl(0, 0%, 65%);\n    --select-list-item-hover-color: hsl(0, 0%, 92%);\n\n    /* Header back section */\n    --back-section-background-color: rgba(242, 243, 247, 1);\n    --back-section-box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);\n    --back-section-border-bottom-color: #E0E0E0;\n    --back-button-hover-color: rgba(0, 0, 0, 0.12);\n\n    /* Progress bar section */\n\t--progress-border-color: #bcbcbc;\n    --progress-background-color: #e1e1e1;\n    --progress-indicator-color: #06b025;\n\n    /* Search input and search results text color(bold, folder) */\n    --search-input-background-color:  rgba(255, 255, 255, 1);\n    --search-input-text-color: rgba(0, 0, 0, 0.87);\n    --search-input-placeholder-color: rgba(0, 0, 0, 0.42);\n    --search-input-focused-border-color: #c3c3c3;\n    --search-input-border-color: rgba(0, 0, 0, 0.16);\n    --search-input-hover-border-color: rgba(0, 0, 0, 0.32);\n\n    /* list item (search, matches, popular logins...) */\n    --list-background--color: rgba(255, 255, 255, 1);\n    --list-item-hover-background-color: rgba(41, 121, 255, 0.08);\n    --list-item-accented-background-color: rgba(41, 121, 255, 0.16);\n    --list-item-text-color: rgba(0, 0, 0, 0.87);\n    --list-item-show-all-text-color: rgba(65, 61, 61, 1);\n    --list-item-more-actions-hover-background-color: rgba(0, 0, 0, 0.12);\n    --list-item-addnew-circle-plus-color: rgba(0, 0, 0, 0.60);\n    --list-item-addnew-circle-border-color: rgba(0, 0, 0, 0.60);\n    --list-item-addnew-circle-background-color: rgba(255, 255, 255, 1);\n    --list-item-round-border-color: rgba(234, 234, 234, 1);\n    --list-item-folder-text-color: rgba(0, 0, 0, 0.50);\n    --list-item-bold-text-color: rgba(0, 0, 0, 1);\n    --list-item-accented-text-color: var(--list-item-text-color);\n    --list-item-accented-folder-text-color: var(--list-item-folder-text-color);\n    --list-item-accented-bold-text-color: var(--list-item-bold-text-color);\n\n    /* list item matches/identites counter */\n    --items-counter-text-color: rgba(0, 0, 0, 0.54);\n    --items-counter-background-color: rgba(250, 250, 250, 1);\n    --items-counter-border-color: rgba(0, 0, 0, 0.32);\n\n    /* Options page, refactor later */\n    --options-section-background-color: #f1f1f1;\n    --options-section-selected-color: #3399ee;\n    --options-section-border-color: #000000;\n    --options-caption-text-color: #808080;\n\n    --settings-view-notification-background-color: rgb(45, 48, 55);\n    --settings-view-notification-text-color: white;\n\n    /* Fill button matches counter and matching logins section */\n    --fill-indicator-text-color: #fafbfc;\n    --fill-indicator-active-text-color: white;\n    --fill-indicator-background-color: #ee8585;\n    --fill-indicator-active-background-color: rgba(242, 67, 56, 1);\n    --fill-indicator-active-border-color: white;\n\n    --matches-logins-bottom-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.20);\n    --items-dropdown-button-border-color: hsl(0, 0%, 85%);\n    --items-dropdown-active-button-border-color: hsl(0, 0%, 70%);\n\n    /* Main page, navigation section: Folder selector */\n    --folder-selector-separator-color: rgba(0, 0, 0, 0.2);\n    --folder-selector-text-color:rgba(0, 0, 0, 0.54);\n    --folder-selector-text-hover-color: rgba(0, 0, 0, 0.87);\n\n    /* Popup menu */\n    --popup-menu-background-color: #fafafa;\n    --popup-menu-item-hover-color: rgba(0, 0, 0, 0.08);\n    --popup-menu-item-text-hover-color: #2979FF;\n    --popup-menu-item-highlighted-color: #31a629;\n\n    --message-box-modal-mask-color: #0000007f;\n    --message-box-border-color: #000000;\n    --message-box-background-color: #ffffff;\n\n    /* Password strength weak/medium/good/strong */\n    --password-weak-strength-color: rgb(244, 67, 54);\n    --password-medium-strength-color: rgb(253, 152, 60);\n    --password-good-strength-color: rgb(154, 199, 58);\n    --password-strong-strength-color: rgb(91, 178, 84);\n\n    /* Main page notification area */\n    --notification-info-background-color: #008200;\n    --notification-warning-background-color: rgb(240, 218, 141);\n    --notification-error-background-color: rgb(244, 70, 68);\n    --notification-info-text-color: white;\n    --notification-warning-text-color: rgb(37, 37, 37);\n    --notification-error-text-color: white;\n\n    /* Inside webpage RoboForm dialogs */\n    --inpage-dialog-border-color: rgba(216, 220, 224, 1);\n    --inpage-dialog-background-color: rgba(255, 255, 255, 1);\n    --inpage-dialog-header-background: rgba(91, 178, 84, 1);\n    --inpage-dialog-header-text-color: rgba(255, 255, 255, 1);\n    --inpage-dialog-content-text-color: rgba(0, 0, 0, 1);\n\n    --inpage-dialog-background-color2: #f7f7f7;\n    --inpage-dialog-header-text-color2: rgba(0, 0, 0, 0.6);\n\n    /* bottom section with shortcuts */\n    --shortcuts-section-background-color: rgba(245, 245, 245, 1);\n    --shortcuts-section-border-color: rgba(224, 224, 224, 1);\n    --shortcuts-section-text-color: rgba(0, 0, 0, 0.87);\n    --shortcuts-section-hover-background-color: rgba(0, 0, 0, 0.05);\n\n    /* How to create first RoboForm item*/\n    --create-first-instructions-link-color: #2979FF;\n    --create-first-instructions-circle-background-color: #2979FF;\n    --create-first-instructions-circle-plus-color: white;\n\n    /* Settings View */\n    --settings-view-background-color: #fafafa;\n    --settings-view-text-color: rgba(0, 0, 0, 0.87);\n    --settings-view-sheet-header-color: #fafafa;\n    --settings-view-settings-header-title-text-color: rgba(0, 0, 0, 0.54);\n    --settings-view-sheet-selector-button-hover-color: rgba(41, 121, 255, 0.08);\n    --settings-view-sheet-selector-button-selected-color: rgba(41, 121, 255, 0.16);\n    --settings-view-sheet-selector-button-text-color: rgba(0, 0, 0, 0.87);\n    --settings-view-settings-header-color: #fafafa;\n    --settings-view-settings-header-sheet-title-text-color: rgba(0, 0, 0, 0.54);\n    --settings-view-settings-header-action-button-color: #448aff;\n    --settings-view-settings-header-action-button-text-color: #ffffff;\n    --settings-view-settings-separator-color: rgba(0, 0, 0, 0.16);\n    --settings-view-setting-title-text: rgba(0, 0, 0, 0.87);\n    --settings-view-hint-text-color: rgba(0, 0, 0, 0.4);\n    --settings-view-action-button-color: #fafafa;\n    --settings-view-dialog-button-color: #ffffff;\n    --settings-view-action-button-text-color: rgba(0, 0, 0, 0.7);\n    --settings-view-action-button-border-color: rgba(0, 0, 0, 0.16);\n    --settings-view-action-button-hover-color: rgba(41, 121, 255, 0.08);\n    --settings-view-action-button-active-color: rgba(41, 121, 255, 0.16);\n    --settings-view-action-button-disabled-color: rgba(0, 0, 0, 0.08);\n    --settings-view-action-button-disabled-text-color: rgba(0, 0, 0, 0.4);\n    --settings-view-info-button-text-color: #2979ff;\n    --settings-view-info-button-hover-text-color: #448aff;\n    --settings-view-info-button-active-text-color: #2962ff;\n    --settings-view-info-button-disabled-text-color: rgba(0, 0, 0, 0.4);\n    --settings-view-tooltip-color: rgb(238, 244, 255);\n    --settings-view-tooltip-text-color: rgba(0, 0, 0, 0.87);\n    --settings-view-modal-dialog-background-color: #ffffff;\n    --settings-view-modal-dialog-colored-title-color: rgba(41, 121, 255, 0.04);\n    --settings-view-accented-button-text-color: rgba(0, 0, 0, 0.87);\n    --settings-view-accented-button-color: rgba(235, 87, 87, 0.2);\n    --settings-view-accented-button-hover-color: rgba(235, 87, 87, 0.32);\n    --settings-view-accented-button-pressed-color: rgba(235, 87, 87, 0.44);\n    --settings-view-accented-button-border-color: rgba(0, 0, 0, 0.16);\n    --settings-view-special-button-text-color: rgba(41, 121, 255, 1);\n    --settings-view-special-button-color: rgba(41, 121, 255, 0.08);\n    --settings-view-special-button-hover-color: rgba(68, 138, 255, 1);\n    --settings-view-special-button-hover-text-color: #ffffff;\n    --settings-view-special-button-pressed-color: rgba(41, 98, 255, 1);\n    --settings-view-special-button-pressed-text-color: #ffffff;\n    --settings-view-special-button-border-color: rgba(41, 121, 255, 0.16);\n    --settings-view-disabled-button-text-color: rgba(0, 0, 0, 0.4);\n    --settings-view-disabled-button-color: rgba(0, 0, 0, 0.08);\n    --settings-view-important-text-color: #2979ff;\n    --settings-view-star-button-color: rgba(41, 121, 255, 0.08);\n    --settings-view-star-button-text-color: #2979ff;\n    --settings-view-star-button-border-color: rgba(41, 121, 255, 0.16);\n    --settings-view-star-button-hover-color: #448aff;\n    --settings-view-star-button-text-hover-color: #ffffff;\n    --settings-view-star-button-active-color: #2962ff;\n    --settings-view-star-button-text-active-color: #ffffff;\n    --settings-view-important-button-text-color: #2979ff;\n    --settings-view-important-button-hover-text-color: #448aff;\n    --settings-view-important-button-active-text-color: #2962ff;\n\n    --settings-view-control-color: #fafafa;\n    --settings-view-control-text-color: #000000;\n    --settings-view-control-border-color: rgba(0, 0, 0, 0.32);\n    --settings-view-keyboard-shortcuts-odd-background-color: rgba(0, 0, 0, 0.04);\n    --settings-view-edit-selected-color: #2962ff;\n    --settings-view-editable-line-hover-color: rgba(41, 121, 255, 0.08);\n    --settings-view-editable-line-placeholder-text-color: rgba(0, 0, 0, 0.4);\n    --settings-view-select-text-color: rgba(0, 0, 0, 0.87);\n    --settings-view-select-border-color: rgba(0, 0, 0, 0.32);\n    --settings-view-select-active-border-color: #2962ff;\n    --settings-view-select-option-text-color: rgba(0, 0, 0, 0.87);\n    --settings-view-select-option-active-text-color: #2979ff;\n    --settings-view-select-scrollbar-color: #2979ff;\n    --settings-view-overlay-mask-color: rgba(255,255,255,0.5);\n    --settings-view-unchecked-setting-text-color: rgba(0, 0, 0, 0.54);\n    --settings-view-important-text-border-color: rgba(41, 121, 255, 0.54);\n    --settings-view-business-trial-button-text-color: #5075b2;\n    --settings-view-business-trial-button-hover-text-color: #7092cc;\n    --settings-view-business-trial-button-active-text-color: #3d5f99;\n    --settings-view-notimportant-title-text-color: #999999;\n    --settings-view-error-text-color: #eb5757;\n    --settings-view-data-input-placeholder-text-color: rgba(0, 0, 0, 0.4);\n    --settings-view-data-input-border-color: rgba(0, 0, 0, 0.32);\n    --settings-view-confirmation-highlighted-button-color: #2979ff;\n    --settings-view-confirmation-highlighted-button-text-color: #ffffff;\n    --settings-view-confirmation-highlighted-button-hover-color: #448aff;\n    --settings-view-confirmation-highlighted-button-active-color: #2962ff;\n    --settings-view-confirmation-highlighted-disabled-button-color: rgba(0, 0, 0, 0.08);\n    --settings-view-confirmation-highlighted-disabledbutton-text-color: rgba(0, 0, 0, 0.4);\n    --settings-view-agreement-text-color: rgba(0, 0, 0, 0.4);\n    --settings-view-this-devices-text-color: #31A629;\n    --settings-view-free-devices-text-color: rgba(0, 0, 0, 0.54);\n    --settings-view-free-devices-background-color: rgba(91, 178, 84, 0.32);\n    --settings-view-readonly-devices-text-color: rgba(0, 0, 0, 0.54);\n    --settings-view-readonly-devices-background-color: rgba(0, 0, 0, 0.08);\n    --settings-view-devices-info-title: rgba(0, 0, 0, 0.4);\n    --settings-view-remove-device-warning-action-color: #2979ff;\n    --settings-view-remove-device-warning-action-hover-color: #448aff;\n    --settings-view-remove-device-warning-action-active-color: #2962ff;\n    --settings-view-enrollment-status-title-color: rgba(0, 0, 0, 0.7);\n    --settings-view-header-controls-text-color: rgba(0, 0, 0, 0.87);\n    --settings-view-header-controls-border-color: rgba(0, 0, 0, 0.16);\n    --settings-view-header-controls-hover-color: #e9f0fa;\n    --settings-view-header-controls-active-color: #d9e5fb;\n    --settings-view-backup-accounts-list-item-background-color: rgba(0, 0, 0, 0.04);\n    --settings-view-backup-accounts-list-item-shadow-color: rgba(0, 0, 0, 0.08);\n    --settings-view-backup-accounts-selected-list-item-shadow-color: rgba(41, 121, 255, 0.4);\n    --settings-view-backup-backups-list-item-background-color: #ffffff;\n    --settings-view-backup-backups-list-item-background-selected-color: rgba(204, 223, 255);\n    --settings-view-backup-backups-expanded-list-item-background-color: #eef4ff;\n    --settings-view-item-hover-color: #ddeaff;\n    --settings-view-search-underline-color: rgba(0, 0, 0, 0.32);\n    --settings-view-search-text-color: rgba(0, 0, 0, 0.87);\n    --settings-view-search-placeholder-color: rgba(0, 0, 0, 0.4);\n    --settings-view-search-highlight-color: #2979ff;\n\n    --save-forms-edit-border-color: #d6d6d6;\n    --save-forms-separator-color: rgba(0, 0, 0, 0.1);\n    --save-forms-caption-color: rgba(0, 0, 0, 0.60);\n    --save-forms-active-switch-background-color: #2979FF;\n    --save-forms-active-switch-text-color: #FFF;\n    --save-forms-inactive-switch-hover-color: rgba(41, 121, 255, 0.08);\n    --save-forms-inactive-switch-text-color: rgba(0, 0, 0, 0.54);\n    --save-forms-switch-border-color: rgba(0, 0, 0, 0.16);\n    --save-forms-switch-text-color: rgba(0, 0, 0, 0.7);\n    --post-save-notification-success-mark-color: #5bb254;\n    --post-save-notification-success-title-text-color: #31a629;\n    --post-save-notification-success-text-color: #444444;\n    --login-required-content-border-color: #d6d6d6;\n\n    --duplicates-item-hover-color: #d8dce0;\n\n    --totp-timer-normal-color: darkgray;\n    --totp-timer-warning-color: #EB5757;\n\n    --create-new-button-color: #2979FF;\n    --create-new-button-plus-color: #ffffff;\n}\n\nbody.dark-theme,\nbody .dark-theme {\n    --white-button-text-color: #000000;\n    --white-button-border-color: #d8dce0;\n    --white-button-background-color: #ffffff;\n    --white-button-hover-background-color: #e5f1fb;\n    --white-button-focus-border-color: #82b1ff;\n    --white-button-active-border-color: #d8dce0;\n    --white-button-active-background-color: #d8dce0;\n    --white-button-disabled-text-color: #838383;\n    --white-button-disabled-border-color: #cccccc;\n    \n    --main-background-color: rgba(33, 33, 33, 1);\n\n    /* text */\n    --title-text-color: #dcdcdc;\n    --main-text-color: #F1F1F1;\n    --main-text-disabled-color: #838383;\n    --hint-text-color: hsl(0, 0%, 50%);\n    --error-text-color: hsl(0, 81%, 73%);\n    --regular-link-color: #31a629;\n\n    --login-page-text-color: rgba(255, 255, 255, 0.87);\n    --login-page-link-color: #2979ff;\n    --login-page-input-border-color: #afb3b6;\n    --login-page-input-focused-border-color: #5d5fef;\n    --login-page-hint-color: rgba(255, 255, 255, 0.4);\n\n    --separator-color: rgba(255, 255, 255, 0.08);\n    --button-hover-color: rgba(255, 255, 255, 0.18);\n    --overlay-mask-color: rgba(0, 0, 0, 0.1);\n\n    /* Page Header: Start button, search, settings button */\n    --main-page-header-background-color: rgba(18, 18, 18, 1);\n\n    /* Main page tabs */\n    --main-page-tab-selector-text-color: rgba(255, 255, 255, 95%);\n    --main-page-tab-selector-hover-color: rgba(255, 255, 255, 11%);\n    --main-page-tab-selector-selected-color: rgba(33, 33, 33, 1);\n    --main-page-tab-selector-separator-color: rgba(255, 255, 255, 25%);\n\n    /* List mode selectors */\n    --list-mode-selectors-background-color: rgba(0, 0, 0, 0.06);\n    --list-mode-selector-text-color: rgba(255, 255, 255, 0.54);\n    --list-mode-selector-selected-text-color: rgba(255, 255, 255, 1);\n    --list-mode-selector-selected-border-color: rgba(68, 138, 255, 1);\n    --list-mode-selector-hover-color: rgba(255, 255, 255, 0.11);\n\n    /* Main page upgrade messages */\n    --main-page-upgrade-background-color: rgba(18, 18, 18, 1);\n    --main-page-upgrade-color: rgb(255, 255, 255, 75%);\n    --main-page-upgrade-links-separator-color: rgb(255, 255, 255, 16%);\n    --main-page-upgrade-link-color: #2979FF;\n    --main-page-upgrade-close-button-color: rgb(255, 255, 255, 75%);\n    --main-page-upgrade-close-button-hover-color: #2979FF;\n    --main-page-upgrade-close-button-active-color: #2979FF;\n\n    /* Main page scroll bars */\n    --vscroll-bar-width: 1em;\n    --hscroll-bar-height: 1em;\n    --scroll-bar-color: transparent;\n    --scroll-bar-active-color: rgb(255, 255, 255, 0.05);\n    --scroll-bar-hover-color: rgb(255, 255, 255, 0.05);\n    --scroll-bar-thumb-border-radius: 0.5em;\n    --scroll-bar-thumb-color: rgb(255, 255, 255, 0.05);\n    --scroll-bar-thumb-active-color: rgb(255, 255, 255, 0.1);\n    --scroll-bar-thumb-hover-color: rgb(255, 255, 255, 0.3);\n\n    --identity-view-background-color: rgba(255, 255, 255, 3%);\n    --identity-view-separator-color:  rgba(255, 255, 255, 0.1%);\n    --identity-view-instance-radio-hover-color:  rgba(255, 255, 255, 0.11);\n\n\n    /* anchor as a button */\n    --flat-link-text-color: #e1e1e1;\n    --flat-link-hover-text-color: #d1d1d1;\n    --flat-link-disabled-text-color: #838383;\n\n    /* Yes/No toogle button for Firefox consent pages*/\n    --toggle-border-color: #adadad;\n    --toggle-off-button-border-color: #adadad;\n    --toggle-off-button-text-color: #000000;\n    --toggle-off-button-background-color: #e1e1e1;\n    --toggle-on-button-background-color: #2979ff;\n    --toggle-on-button-text-color: #ffffff;\n\n    --toggle-disabled-border-color: rgba(217, 217, 217, 1);\n    --toggle-disabled-background-color: rgba(241, 241, 241, 1);\n    --toggle-on-button-disabled-background-color: rgba(214, 214, 214, 1);\n    --toggle-on-button-disabled-text-color: rgba(159, 159, 159, 1);\n    --toggle-off-button-disabled-border-color: rgba(225, 225, 225, 1);\n\n    /* Important(blue) button */\n    --important-button-text-color: #ffffff;\n    --important-button-background-color:  rgba(49, 166, 41, 1);\n    --important-button-border-color: rgba(49, 166, 41, 1);\n    --important-button-hover-color: rgba(32, 123, 26, 1);\n    --important-button-active-color: rgba(32, 123, 26, 1);\n    --important-button-disabled-color:rgba(255, 255, 255, 5%);\n    --important-button-disabled-text-color:rgba(255, 255, 255, 20%);\n    --important-button-disabled-border-color:rgba(255, 255, 255, 4%);\n\n    /* Regular(black) button */\n    --regular-button-text-color: rgba(255, 255, 255, 100%);\n    --regular-button-background-color: rgba(34, 34, 34, 100%);\n    --regular-button-border-color: rgba(56, 56, 56, 100%);\n\n    --regular-button-hover-color: rgba(41, 121, 255, 12%);\n    --regular-button-hover-border-color: rgba(56, 56, 56, 100%);\n\n    --regular-button-active-color: rgba(41, 121, 255, 24%);\n    --regular-button-active-border-color: rgba(56, 56, 56, 100%);\n\n    --regular-button-disabled-color: rgba(50, 50, 50, 1);\n    --regular-button-disabled-border-color: rgba(161, 161, 161, 1);\n    --regular-button-disabled-text-color: rgba(161, 161, 161, 1);\n\n    /* Low emphasis button */\n    --low-emphasis-button-text-color: rgba(255, 255, 255, 0.60);\n    --low-emphasis-button-hover-color: rgba(68, 138, 255, 0.04);\n    --low-emphasis-button-focused-color: rgba(68, 138, 255, 0.12);\n    --low-emphasis-button-active-color: rgba(68, 138, 255, 0.24);\n    --low-emphasis-button-disabled-text-color: rgba(255, 255, 255, 0.38);\n\n    /* Input for editing text, mostly for Setup pages */\n    --edit-background-color: rgba(255, 255, 255, 14%);\n    --edit-border-color: rgba(255, 255, 255, 4%);\n    --edit-caret-color: rgba(223, 223, 223, 100%);\n    --edit-text-color: rgba(223, 223, 223, 100%);\n    --edit-placeholder-color: rgba(255, 255, 255, 54%);\n\n    --edit-disabled-border-color: rgba(255, 255, 255, 18%);\n    --edit-disabled-text-color: rgba(197, 197, 197, 100%);\n    --edit-disabled-background-color: rgba(255, 255, 255, 28%);\n    --edit-disabled-placeholder-color: rgba(255, 255, 255, 44%);\n\n    --edit-hover-border-color: rgba(255, 255, 255, 20%);\n    --edit-focused-border-color: rgba(49, 166, 41, 1);\n    --edit-focused-placeholder-color: rgba(49, 166, 41, 1);\n\n    /* Password generator input and select */\n    --passgen-edit-border-color: rgba(255, 255, 255, 14%);\n    --passgen-edit-hover-border-color: rgba(255, 255, 255, 14%);\n    --passgen-edit-background-color: rgba(56, 56, 56, 1);\n    --passgen-blue-active-elements-color: rgba(41, 121, 255, 1);\n    --passgen-toggle-color: rgba(238, 238, 238, 1);\n    --passgen-fill-btn-color-focus: rgba(37, 46, 60, 1);\n    --passgen-fill-btn-color-hover: rgba(34, 37, 42, 1);\n    --passgen-fill-btn-color-active: rgba(41, 58, 86, 1);\n    --passgen-dropdown-arrow-color: rgba(255, 255, 255, 0.87);\n    --passgen-history-color: rgba(255, 255, 255, 0.65);\n    --passgen-restore-and-bitstrength-color: rgba(255, 255, 255, 0.36);\n    --passgen-password-hover-color: rgba(255, 255, 255, 0.08);\n    --passgen-button-disabled-text-color: rgba(255, 255, 255, 0.38);\n    --main-page-passgen-background-color: rgba(255, 255, 255, 0.04);\n    --main-page-passgen-separator-color: rgba(255, 255, 255, 25%);\n\n    /* switch button - SaveForms dialog */\n    --switch-button-inactive-background-color: rgba(255, 255, 255, 14%);\n    --switch-button-inactive-text-color: rgba(255, 255, 255, 54%);\n    --switch-button-active-text-color: rgba(223, 223, 223, 100%);\n    --switch-button-active-border-color: rgba(255, 255, 255, 4%);\n    --switch-button-active-background-color: rgba(255, 255, 255, 20%);\n    --switch-button-active-hover-color: rgba(255, 255, 255, 17%);\n\n    /* treeview - SaveForms dialog */\n    --tree-background-color: hsl(0, 0%, 10%);\n    --tree-item-selected-color: hsl(0, 0%, 25%);\n    --tree-item-hover-color: hsl(0, 0%, 17%);\n\n    /* drop-down list:editable - SaveForms dialog */\n    --select-editable-border-color: rgba(0, 0, 0, 0.34);\n    --select-editable-background-color: rgba(33, 33, 33, 1);\n\n    /* drop-down list - SaveForms/Password Generator dialogs */\n    --select-readonly-border-color: hsl(0, 0%, 34%);\n    --select-readonly-background-color: hsl(200, 3%, 19%);\n    --select-dropdown-button-border-color: hsl(0, 0%, 65%);\n    --select-list-background-color: hsl(0, 0%, 10%);\n    --select-list-border-color: hsl(0, 0%, 45%);\n    --select-list-item-hover-color: rgba(255, 255, 255, 0.08);\n\n    /* Header back section */\n    --back-section-background-color: rgba(255, 255, 255, 0.04);\n    --back-section-box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24), 0px 2px 2px rgba(0, 0, 0, 0.22), 0px 1px 3px rgba(0, 0, 0, 0.3);\n    --back-section-border-bottom-color: rgba(255, 255, 255, 0.08);\n    --back-button-hover-color: #448AFF;\n\n    /* Progress bar section */\n    --progress-border-color: #dddddd;\n    --progress-background-color: #e1e1e1;\n    --progress-indicator-color: #06b025;\n\n    /* Search input and search results text color(bold, folder) */\n    --search-input-background-color: #505050; \n    --search-input-placeholder-color: rgba(255, 255, 255, 0.44);\n    --search-input-text-color: #E1E1E1;\n    --search-input-border-color: #303030;\n    --search-input-focused-border-color: #6c78fb;\n    --search-input-hover-border-color: rgba(0, 0, 0, 0.32);\n\n    /* list item (search, matches, popular logins...) */\n    --list-background--color: rgba(255, 255, 255, 0.06);\n    --list-item-hover-background-color: rgba(255, 255, 255, 0.11);\n    --list-item-accented-background-color: rgba(255, 255, 255, 0.16);\n    --list-item-text-color: hsl(0, 0%, 87%);\n    --list-item-show-all-text-color: hsl(0, 0%, 70%);\n    --list-item-more-actions-hover-background-color: rgba(255, 255, 255, 0.18);\n    --list-item-addnew-circle-plus-color: rgba(255,255,255, 0.75);\n    --list-item-addnew-circle-border-color: rgba(255,255,255, 0.75);\n    --list-item-addnew-circle-background-color: #212121;\n    --list-item-round-border-color: rgba(255, 255, 255, 0.13);\n    --list-item-folder-text-color: rgba(255, 255, 255, 0.42);\n    --list-item-bold-text-color: rgba(255, 255, 255, 0.98);\n    --list-item-accented-text-color: var(--list-item-text-color);\n    --list-item-accented-folder-text-color: var(--list-item-folder-text-color);\n    --list-item-accented-bold-text-color: var(--list-item-bold-text-color);\n\n    --items-counter-text-color: hsl(0, 0%, 60%);\n    --items-counter-background-color: rgba(255, 255, 255, 0.08);\n    --items-counter-border-color: hsl(0, 0%, 60%);\n\n    --options-section-background-color: #f1f1f1;\n    --options-section-selected-color: #3399ee;\n    --options-section-border-color: #6b6b6b;\n    --options-caption-text-color: #808080;\n\n    --settings-view-notification-background-color:  rgba(255, 255, 255, 100%);\n    --settings-view-notification-text-color:rgba(34, 34, 34, 100%);\n\n    /* Fill button matches counter and matching logins section */\n    --fill-indicator-text-color: rgba(250, 251, 252, 1);\n    --fill-indicator-active-text-color: rgba(255, 255, 255, 1);\n    --fill-indicator-background-color: rgba(238, 133, 133, 1);\n    --fill-indicator-active-background-color: rgba(235, 87, 87, 1);\n    --fill-indicator-active-border-color: white;\n\n    --matches-logins-bottom-shadow: 0 4px 2px -2px rgba(255, 255, 255, 0.20);\n    --items-dropdown-button-border-color: hsl(0, 0%, 50%);\n    --items-dropdown-active-button-border-color: hsl(0, 0%, 70%);\n\n    /* Main page, navigation section: Folder selector */\n    --folder-selector-separator-color: rgba(255, 255, 255, 25%);\n    --folder-selector-text-color:rgba(255, 255, 255, 0.54);\n    --folder-selector-text-hover-color: rgba(255, 255, 255, 1);\n\n    /* Popup menu */\n    --popup-menu-background-color: #2E3031;\n    --popup-menu-item-hover-color: rgba(255, 255, 255, 0.08);\n    --popup-menu-item-text-hover-color: #ffffff;\n    --popup-menu-item-highlighted-color: #31a629;\n\n    --message-box-modal-mask-color: #0000007f;\n    --message-box-border-color: #000000;\n    --message-box-background-color: #ffffff;\n\n    /* Password strength weak/medium/good/strong */\n    --password-weak-strength-color: rgb(244, 67, 54);\n    --password-medium-strength-color: rgb(253, 152, 60);\n    --password-good-strength-color: rgb(154, 199, 58);\n    --password-strong-strength-color: rgb(91, 178, 84);\n\n    /* Main page notification area */\n    --notification-info-background-color: #00a700;\n    --notification-warning-background-color: rgb(240, 218, 141);\n    --notification-error-background-color: rgb(244, 70, 68);\n    --notification-info-text-color: white;\n    --notification-warning-text-color:  rgb(25, 25, 25);\n    --notification-error-text-color: white;\n\n    /* Inside webpage RoboForm dialogs */\n    --inpage-dialog-border-color: rgba(216, 220, 224, 1);\n    --inpage-dialog-background-color: rgba(255, 255, 255, 1);\n    --inpage-dialog-header-background: rgba(91, 178, 84, 1);\n    --inpage-dialog-header-text-color: rgba(255, 255, 255, 1);\n    --inpage-dialog-content-text-color: rgba(255, 255, 255, 1);\n\n    --inpage-dialog-background-color2:rgba(33, 33, 33, 1);\n    --inpage-dialog-header-text-color2: rgba(255, 255, 255, 0.6);\n\n    /* bottom section with shortcuts */\n    --shortcuts-section-background-color: rgba(33, 33, 33, 1);\n    --shortcuts-section-border-color: rgba(64, 64, 64, 1);\n    --shortcuts-section-text-color: rgba(241, 241, 241, 1);\n    --shortcuts-section-hover-background-color: rgba(255, 255, 255, 0.11);\n\n    /* How to create first RoboForm item*/\n    --create-first-instructions-link-color: #2979FF;\n    --create-first-instructions-circle-background-color: #2979FF;\n    --create-first-instructions-circle-plus-color: white;\n\n    /* Settings View */\n    --settings-view-background-color: #212121;\n    --settings-view-text-color: rgba(255, 255, 255, 0.87);\n    --settings-view-sheet-header-color: #2c2c2c;\n    --settings-view-settings-header-title-text-color: rgba(255, 255, 255, 0.54);\n    --settings-view-sheet-selector-button-hover-color: rgba(255, 255, 255, 0.08);\n    --settings-view-sheet-selector-button-selected-color: rgba(255, 255, 255, 0.16);\n    --settings-view-sheet-selector-button-text-color: rgba(255, 255, 255, 0.87);\n    --settings-view-settings-header-color: #212121;\n    --settings-view-settings-header-sheet-title-text-color: rgba(255, 255, 255, 0.54);\n    --settings-view-settings-header-action-button-color: #448aff;\n    --settings-view-settings-header-action-button-text-color: #ffffff;\n    --settings-view-settings-separator-color: rgba(255, 255, 255, 0.16);\n    --settings-view-setting-title-text: rgba(255, 255, 255, 0.87);\n    --settings-view-hint-text-color: rgba(255, 255, 255, 0.4);\n    --settings-view-action-button-color: #212121;\n    --settings-view-dialog-button-color: #212121;\n    --settings-view-action-button-text-color: rgba(255, 255, 255, 0.7);\n    --settings-view-action-button-border-color: rgba(255, 255, 255, 0.16);\n    --settings-view-action-button-hover-color: rgba(255, 255, 255, 0.08);\n    --settings-view-action-button-active-color: rgba(255, 255, 255, 0.16);\n    --settings-view-action-button-disabled-color: rgba(255, 255, 255, 0.08);\n    --settings-view-action-button-disabled-text-color: rgba(255, 255, 255, 0.4);\n    --settings-view-info-button-text-color: #2979ff;\n    --settings-view-info-button-hover-text-color: #448aff;\n    --settings-view-info-button-active-text-color: #2962ff;\n    --settings-view-info-button-disabled-text-color: rgba(0, 0, 0, 0.4);\n    --settings-view-tooltip-color: rgb(69, 69, 69);\n    --settings-view-tooltip-text-color: rgb(255, 255, 255);\n    --settings-view-modal-dialog-background-color: #383838;\n    --settings-view-modal-dialog-colored-title-color: rgba(255, 255, 255, 0.04);\n    --settings-view-accented-button-text-color: rgba(255, 255, 255, 0.87);\n    --settings-view-accented-button-color: rgba(235, 87, 87, 0.2);\n    --settings-view-accented-button-hover-color: rgba(235, 87, 87, 0.32);\n    --settings-view-accented-button-pressed-color: rgba(235, 87, 87, 0.44);\n    --settings-view-accented-button-border-color: rgba(255, 255, 255, 0.16);\n    --settings-view-special-button-text-color: rgba(68, 138, 255, 1);\n    --settings-view-special-button-color: rgba(41, 121, 255, 0.16);\n    --settings-view-special-button-hover-color: rgba(68, 138, 255, 1);\n    --settings-view-special-button-hover-text-color: #ffffff;\n    --settings-view-special-button-pressed-color: rgba(41, 98, 255, 1);\n    --settings-view-special-button-pressed-text-color: #ffffff;\n    --settings-view-special-button-border-color: rgba(41, 121, 255, 0.16);\n    --settings-view-disabled-button-text-color: rgba(255, 255, 255, 0.4);\n    --settings-view-disabled-button-color: rgba(255, 255, 255, 0.08);\n    --settings-view-important-text-color: #2979ff;\n    --settings-view-star-button-color: rgba(41, 121, 255, 0.2);\n    --settings-view-star-button-text-color: #448aff;\n    --settings-view-star-button-border-color: rgba(41, 121, 255, 0.16);\n    --settings-view-star-button-hover-color: #448aff;\n    --settings-view-star-button-text-hover-color: #ffffff;\n    --settings-view-star-button-active-color: #2962ff;\n    --settings-view-star-button-text-active-color: #ffffff;\n    --settings-view-important-button-text-color: #448aff;\n    --settings-view-important-button-hover-text-color: #609cff;\n    --settings-view-important-button-active-text-color: #2962ff;\n\n    --settings-view-control-color: #121212;\n    --settings-view-control-text-color: rgb(197, 203, 206);\n    --settings-view-control-border-color: rgba(255, 255, 255, 0.32);\n    --settings-view-keyboard-shortcuts-odd-background-color: rgba(255, 255, 255, 0.04);\n    --settings-view-edit-selected-color: rgba(255, 255, 255, 0.7);\n    --settings-view-select-text-color: rgba(255, 255, 255, 0.87);\n    --settings-view-select-border-color: rgba(255, 255, 255, 0.32);\n    --settings-view-select-active-border-color: rgba(255, 255, 255, 0.7);\n    --settings-view-select-option-text-color: rgba(255, 255, 255, 0.54);\n    --settings-view-select-option-active-text-color: rgba(255, 255, 255, 0.87);\n    --settings-view-select-scrollbar-color: rgba(255, 255, 255, 0.87);\n    --settings-view-editable-line-hover-color: rgba(255, 255, 255, 0.08);\n    --settings-view-editable-line-placeholder-text-color: rgba(255, 255, 255, 0.4);\n    --settings-view-overlay-mask-color: rgba(255,255,255,0.5);\n    --settings-view-unchecked-setting-text-color: rgba(255, 255, 255, 0.54);\n    --settings-view-important-text-border-color: rgba(41, 121, 255, 0.54);\n    --settings-view-business-trial-button-text-color: #5075b2;\n    --settings-view-business-trial-button-hover-text-color: #7092cc;\n    --settings-view-business-trial-button-active-text-color: #3d5f99;\n    --settings-view-notimportant-title-text-color: #999999;\n    --settings-view-error-text-color: #eb5757;\n    --settings-view-data-input-placeholder-text-color: rgba(255, 255, 255, 0.4);\n    --settings-view-data-input-border-color: rgba(255, 255, 255, 0.32);\n    --settings-view-confirmation-highlighted-button-color: #2979ff;\n    --settings-view-confirmation-highlighted-button-text-color: #ffffff;\n    --settings-view-confirmation-highlighted-button-hover-color: #448aff;\n    --settings-view-confirmation-highlighted-button-active-color: #2962ff;\n    --settings-view-confirmation-highlighted-disabled-button-color: rgba(255, 255, 255, 0.08);\n    --settings-view-confirmation-highlighted-disabledbutton-text-color: rgba(255, 255, 255, 0.4);\n    --settings-view-agreement-text-color: rgba(255, 255, 255, 0.4);\n    --settings-view-this-devices-text-color: #31A629;\n    --settings-view-free-devices-text-color: rgba(255, 255, 255, 0.54);\n    --settings-view-free-devices-background-color: rgba(91, 178, 84, 0.32);\n    --settings-view-readonly-devices-text-color: rgba(0, 0, 0, 0.08);\n    --settings-view-readonly-devices-background-color: rgba(0, 0, 0, 0.87);\n    --settings-view-devices-info-title: rgba(255, 255, 255, 0.4);\n    --settings-view-remove-device-warning-action-color: #639dff;\n    --settings-view-remove-device-warning-action-hover-color: #82b1ff;\n    --settings-view-remove-device-warning-action-active-color: #448aff;\n    --settings-view-enrollment-status-title-color: rgba(255, 255, 255, 0.7);\n    --settings-view-header-controls-text-color: rgba(255, 255, 255, 0.87);\n    --settings-view-header-controls-border-color: rgba(255, 255, 255, 0.16);\n    --settings-view-header-controls-hover-color: #484848;\n    --settings-view-header-controls-active-color: #585858;\n    --settings-view-backup-accounts-list-item-background-color: rgba(255, 255, 255, 0.04);\n    --settings-view-backup-accounts-list-item-shadow-color: rgba(255, 255, 255, 0.08);\n    --settings-view-backup-accounts-selected-list-item-shadow-color: rgba(41, 121, 255, 0.4);\n    --settings-view-backup-backups-list-item-background-color: #343434;\n    --settings-view-backup-backups-list-item-background-selected-color: #545454;\n    --settings-view-backup-backups-expanded-list-item-background-color: #343434;\n    --settings-view-item-hover-color: #444444;\n    --settings-view-search-underline-color: rgba(255, 255, 255, 0.32);\n    --settings-view-search-text-color: rgba(255, 255, 255, 0.87);\n    --settings-view-search-placeholder-color: rgba(255, 255, 255, 0.4);\n    --settings-view-search-highlight-color: #2979ff;\n\n    --save-forms-edit-border-color: rgba(255, 255, 255, 0.24);\n    --save-forms-separator-color: rgba(255, 255, 255, 0.1);\n    --save-forms-caption-color: rgba(255, 255, 255, 0.60);\n    --save-forms-active-switch-background-color: #448aff;\n    --save-forms-active-switch-text-color: #000;\n    --save-forms-inactive-switch-hover-color: rgba(255, 255, 255, 0.08);\n    --save-forms-inactive-switch-text-color:  rgba(255, 255, 255, 0.54);\n    --save-forms-switch-border-color: rgba(255, 255, 255, 0.16);\n    --save-forms-switch-text-color: rgba(255, 255, 255, 0.7);\n    --post-save-notification-success-mark-color: #31a629;\n    --post-save-notification-success-title-text-color: #e1e1e1;\n    --post-save-notification-success-text-color: #e1e1e1;\n    --login-required-content-border-color: rgba(0, 0, 0, 0.1);\n\n    --duplicates-item-hover-color: hsl(0, 0%, 22%);\n\n    --totp-timer-normal-color: darkgray;\n    --totp-timer-warning-color: #EB5757;\n\n    --create-new-button-color: #2979FF;\n    --create-new-button-plus-color: #ffffff;\n}",""])
},21566:function(a,b,c){"use strict";var d=c(36758),e=c.n(d),f=c(40935),g=c.n(f)()(e())
;g.push([a.id,"/*\n   AskConsentToCollectDataPage\n */\n.ask-consent-page {\n    display: flex;\n}\n\n.ask-consent-page .content {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 20px;\n    box-sizing: border-box;\n    width: 500px;\n}\n\n.ask-consent-page .title {\n    font-size: 24px;\n    /* font-weight: bold; */\n    cursor: default;\n    color: #4f5254;\n    color: var(--title-text-color);\n}\n\n.ask-consent-page .data-section {\n    display: flex;\n    flex-direction: column;\n}\n\n.ask-consent-page .data-section > div:not(:first-child),\n.ask-consent-page .data-section > ul:not(:first-child) {\n    margin-top: 10px;\n}\n\n.ask-consent-page .data-section-title,\n.ask-consent-page .personal-section-title,\n.ask-consent-page .technical-section-title {\n    align-self: flex-start;\n}\n\n.ask-consent-page .personal-data-section-title,\n.ask-consent-page .technical-data-section-title {\n    display: inline;\n    /* font-weight: bold; */\n}\n\n.ask-consent-page .personal-data-description,\n.ask-consent-page .technical-data-description {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n}\n\n.ask-consent-page .important-button {\n    margin-top: 25px;\n    padding: 0 30px;\n}\n\n.ask-consent-page ul {\n    margin: 0;\n}\n\n.ask-consent-page .content > div:not(:first-child):not(:last-child) {\n    margin-top: 20px;\n}\n\n.ask-consent-page .footer {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    width: 100%;\n}\n\n.ask-consent-page .flexy-space {\n    flex-grow: 1;\n    min-width: 10px;\n}\n\n.ask-consent-page .disabled-state {\n    opacity: 0.5;\n}\n\n/* \n    PermissionsRejectedPage\n */\n.need-user-consent-page {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 20px;\n    box-sizing: border-box;\n    width: 500px;\n}\n\n.need-user-consent-page > div:not(:first-child):not(:last-child) {\n    margin-top: 20px;\n}\n\n.consent-required-message {\n    text-align: justify;\n}\n\n.need-user-consent-page .title {\n    font-size: 24px;\n    /* font-weight: bold; */\n    cursor: default;\n    color: #4f5254;\n    color: var(--title-text-color);\n}\n\n.need-user-consent-page .footer {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n}\n\n.need-user-consent-page .flexy-space {\n    flex-grow: 1;\n    min-width: 10px;\n}\n\n.need-user-consent-page .normal-button {\n    padding: 0px 15px;\n    max-width: 300px;\n    white-space: normal;\n}",""])
},92292:function(){},10364:function(a,b,c){"use strict";c.d(b,{j:function(){return l}})
;var d=c(47333),e=c(67793),f=c(13113),g=c(78440),h=c(69893),i=c(4153),j=(c(13117),c(97514)),k=c(91764)._;function l(a){
const{service:b,viewApi:c,app:l}=a;let m=null;return{Create:async function(a,g){
const h=await c.LocalizeString("AboutPage_Title"),i=await c.LocalizeString("About_Version2"),r=await c.LocalizeString("About_Sync2"),s=await c.LocalizeString("Dialog_Label_Back"),t=await b.GetRFOnlineUserId(),u=t.userId,v=await l.GetLicenseInfoPresentation()
;let w=t.serverUrl||e.s8;(0,f.GG)(w)||(w="https://"+w);const x=(0,j.KZ)(),y=k("div",{className:"about-page unselectable"
},k("div",{className:"header-section"},k("div",{className:"header-back-button back-icon",role:"button",ariaLabel:s,onclick:n
}),k("div",{className:"header-text-section"},k("div",{className:"title-text"},h))),k("div",{className:"logo-section"},k("div",{
className:"logo robot-logo"}),k("div",{className:"logo name-logo"})),k("div",{className:"content"},k("div",{className:"text"
},i),k("div",{className:"text hint selectable"},"9.6.12.0"),k("div",{className:"text hint selectable"},x),k("div",{
className:"account-section"},k("div",{className:"hint user-section"},k("div",{className:"user-caption"},r),k("div",{
className:"text hint padding"},u)),(0,e.l5)(w)?null:k("div",{className:"hint"},k("div",{className:"text hint padding"},(0,
d.oC)(w))),k("div",{className:"hint license"},v)),k("div",{className:"flexy-space"}),k("div",{className:"social-section"
},k("div",{className:"icons-section"},k("div",{className:"icon twitter-icon",onclick:p}),k("div",{
className:"icon facebook-icon",onclick:o}))),k("div",{className:"roboform-link",onclick:q},"www.roboform.com"),k("div",{
className:"hint-text copyright-text"},"Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.")));return m=g,y},
OnAfterShow:function(){},OnBeforeHide:function(){},Focus:function(){},Dispose:function(){}};function n(){(0,i.TT)(m)((0,h.JS)())
}function o(){return(0,g.fI)(c.OpenUrl({url:d.w2,newTab:!0,reuseExisting:!0},null)),l.ClosePopup()}function p(){return(0,
g.fI)(c.OpenUrl({url:d.po,newTab:!0,reuseExisting:!0},null)),l.ClosePopup()}function q(){return(0,g.fI)(c.OpenUrl({url:d.l$,
newTab:!0,reuseExisting:!1},null)),l.ClosePopup()}}},65760:function(a,b,c){"use strict";c.d(b,{d:function(){return J}});c(92292)
;var d=c(48798),e=c(61625),f=c(62172),g=c(37694),h=c(41699),i=c(9958),j=c(16007),k=c(56218),l=c(40364),m=c(62806),n=c(10637),o=c(10364),p=c(47836),q=c(78448),r=c(80022),s=c(12072),t=c(23097),u=c(18939),v=c(3566),w=c(47333),x=c(95697),y=c(12131),z=c(67793),A=c(60954),B=c(95239),C=c(54811),D=c(70346),E=c(31173),F=c(69893),G=c(78440),H=c(4153),I=c(12190)
;c(13117);async function J(a,b,c,J,K,L,M,N,O){const P=await async function(b){for(let d=0;d<10;d++){try{
return await a.CallBackgroundScript("GetApplicationData",null,b)}catch(c){}await(0,G.xy)(1e3)}throw(0,F.XB)()}(null),Q=await(0,
A.y)(a);let R=null;const S=Object.assign(Object.assign({},Q.commands),{ShowLoginUI:P.standalone?a=>(0,
H.TT)(R).ShowSALoginPage(a):a=>(0,H.TT)(R).ShowNMLoginPage(Q.commands.ShowLoginUI,a)})
;return R=function(a,b,c,A,J,K,L,M,N,O,P,Q){const R=b,S=c,T=A;let U;const V=J,W=L,X=M,Y=(0,w.au)(R.data,T),Z=(0,
C.I9)(R.data,R.service,R.rfo,K,T),aa=(0,B.BO)(A),ab=N,ac=O,ad=P,ae=Q,af=(0,u.n)(),ag=(0,u.n)()
;let ah=!1,ai=!1,aj=!1,ak=!1,al=!1,am=!0,an=!1,ao=!0,ap=!1,aq=!1,ar=null,as=null,at=null,au=null,av=!0;const aw={Init:ax,
UnInit:ay,ShowUI:az,IsAccountCreationAllowed:aA,IsAccountCompanyAdmin:aB,GetLicenseInfoPresentation:aC,
GetUpgradeMessagesUIInfo:aD,HaveActivePaidConsumerLicense:aE,GetUsageInfoListItems:aJ,ShouldActivateFillUI:aK,
GetFillOptionsListForCurrentTab:aL,GetAutoFunctionsModesForCurrentTab:aM,BlockAutoFunctionsForCurrentTabDomain:aN,
ShowBlockedAutoFillForCurrentPage:aO,GetCurrentTabUrl:aI,GetFoldersList:aQ,GetAllIdentities:aP,SearchItemsInFolder:aR,
GetSearchEngines:aS,GetKeyboardShortcuts:aT,CopyTextToClipboardWithAutoClear:aU,ShowInitialPage:a0,ShowMainPage:aZ,
ClosePopup:aV,CloseNativeMenu:aW,SetPersistentPage:a7,GetPersistentPage:a8,ClearPersistentPage:a9,RestorePersistentPage:ba,
ShowNativeItemsList:bb,LoginItemAction:bg,SafenoteItemAction:bh,BookmarkItemAction:bi,ShowSaveFormsPage:bc,
ShowAskForUpgradePage:a4,GetCommandsForMainDotsMenu:bd,IsNativeUIAvailable:aF,IsNativeApp:aG,GetPopupRect:bp,
GetPopupScreenRect:bq,GetPopupMonitorRect:br,IsReportAnIssueSupported:aH,ShowSALoginPage:a1,ShowNMLoginPage:a2};return aw
;async function ax(){var b,c,d,e,f,g,h,i,j;ay(),U=await V.GetPlatformOS(),(0,H.TT)(R.data).onDataChanged.Add(bl),
R.options.AddOnChangeListener(bm),T.storage.AddOnChangeListener(bn),T.onNotificationFromBackgroundScript.Add(bk),
ai=null!==(b=a.standalone)&&void 0!==b&&b,aj=null!==(c=a.needNativeRfUpgrade)&&void 0!==c&&c,
ak=null!==(d=a.desktopAppIsUpdating)&&void 0!==d&&d,al=null!==(e=a.desktopAppIsClosed)&&void 0!==e&&e,
am=null!==(f=a.useNativeMenus)&&void 0!==f&&f,an=null!==(g=a.isNativeApp)&&void 0!==g&&g,
ao=null!==(h=a.isReportAnIssueSupported)&&void 0!==h&&h,ap=null!==(i=a.isBreachMonSupported)&&void 0!==i&&i,
aq=null!==(j=a.setupAccountOnStartPage)&&void 0!==j&&j,ag.Init(document.body,null,[]),af.Init((0,
H.TT)(document.getElementById("main")),(0,v.Eg)(),[()=>{document.body.classList.remove("body-initial-size")}]),
window.matchMedia("(prefers-color-scheme: dark)").matches?(ag.SetTheme("dark-theme"),
af.SetTheme("dark-theme")):(ag.SetTheme("light-theme"),af.SetTheme("light-theme")),ag.SetPlatformSpecificStyles(U),
af.SetPlatformSpecificStyles(U),Y.Init(),Z.Init(),document.body.addEventListener("mousemove",bo,!1),
window.oncontextmenu=function(){return!1},ak||al||(ap&&(at=(0,D.v)(T),await at.Init(),au=at),await(0,w.sJ)(R.options,T,ai)),
ah=!0}function ay(){ah&&(at&&(at.UnInit(),at=null,au=null),Z.UnInit(),Y.Init(),T.onNotificationFromBackgroundScript.Remove(bk),
(0,H.TT)(R.data).onDataChanged.Remove(bl),R.options.RemoveOnChangeListener(bm),T.storage.RemoveOnChangeListener(bn),
document.body.removeEventListener("mousemove",bo),window.oncontextmenu=null,ah=!1)}async function az(a){const b=await a8()
;return b?ba(b,a):a0(a)}async function aA(){if(ai)return!0;const a=await(0,H.TT)(R.policies).Get({SelfHostedServer:!1,
CustomEverywhereServiceLocation:""}),b=a.SelfHostedServer,c=a.CustomEverywhereServiceLocation;return!b&&!c}async function aB(){
return(await(0,H.TT)(R.options).Get({AccountCompanyAdmin:!1})).AccountCompanyAdmin}async function aC(){
return T.CallBackgroundScript("GetLicenseInfoPresentation",null,null)}async function aD(a){
return T.CallBackgroundScript("GetUpgradeMessagesUIInfo",null,a)}async function aE(){
return T.CallBackgroundScript("HaveActivePaidConsumerLicense",null,null)}function aF(){return am}function aG(){return an}
function aH(){return ao}async function aI(a){return T.CallBackgroundScript("GetCurrentTabUrl",null,a)}async function aJ(a,b,c){
return T.CallBackgroundScript("GetUsageInfoListItems",null,c,a,b)}async function aK(a){
return T.CallBackgroundScript("ShouldActivateFillUI",null,a)}async function aL(a){
return T.CallBackgroundScript("GetFillOptionsListForCurrentTab",null,a)}async function aM(a){
return T.CallBackgroundScript("GetAutoFunctionsModesForCurrentTab",null,a)}async function aN(a,b,c){
return T.CallBackgroundScript("BlockAutoFunctionsForCurrentTabDomain",null,c,a,b)}async function aO(a){
return T.CallBackgroundScript("ShowBlockedAutoFillForCurrentPage",null,a)}async function aP(a){
return T.CallBackgroundScript("GetAllIdentities",null,a)}async function aQ(a){
return T.CallBackgroundScript("GetFoldersList",null,a)}async function aR(a,b,c,d){
return T.CallBackgroundScript("SearchItemsInFolder",null,d,a,b,c)}async function aS(){
return T.CallBackgroundScript("GetSearchEngines",null,null)}async function aT(){
return T.CallBackgroundScript("GetKeyboardShortcuts",null,null)}async function aU(a,b){return await ab.WriteText(a),
T.CallBackgroundScript("ClearTextInClipboardAfterDelay",null,null,a,b)}function aV(){window.close()}async function aW(){
if(aF())return T.CallBackgroundScript("CloseNativeMenu",null,null)}async function aX(a,b){
const c=await T.storage.GetValue("ServerUrl",z.s8)
;if((null==a?void 0:a.companyInvitations)&&a.companyInvitations.length>0&&await d(a.companyInvitations,c,b),
null==a?void 0:a.emergencyAccess){const d=a.emergencyAccess,g=d.filter((a=>1===a.status&&1===a.accessStatus))
;g.length>0&&await e(g,c,b);const h=d.filter((a=>void 0===a.status||0===a.status));h.length>0&&await f(h,c,b)}
if(null==a?void 0:a.accounts){const d=a.accounts.filter((a=>!a.accepted&&!a.company));d.length>0&&await g(d,c,b)}
if(null==a?void 0:a.files){const d=a.files.filter((a=>!a.accepted));d.length>0&&await l(d,c,b)}async function d(a,b,c){
const d=(0,k.Y)({viewApi:T,rfCompany:(0,H.TT)(R.enterprise),serverUrl:b,invitations:a});await af.ShowViewAndWaitResult(d,!1,c)}
async function e(a,b,c){const d=(0,j.N)({requests:a,ea:(0,H.TT)(R.emergencyAccess),viewApi:T,serverUrl:b})
;await af.ShowViewAndWaitResult(d,!1,c)}async function f(a,b,c){const d=(0,j.N)({invitations:a,ea:(0,H.TT)(R.emergencyAccess),
viewApi:T,serverUrl:b});await af.ShowViewAndWaitResult(d,!1,c)}async function g(a,b,c){const d=(0,h.j)({folders:a,sharing:(0,
H.TT)(R.sharing),viewApi:T,serverUrl:b});await af.ShowViewAndWaitResult(d,!1,c)}async function l(a,b,c){const d=(0,i.c)({
files:a,sharing:(0,H.TT)(R.sharing),viewApi:T,serverUrl:b});await af.ShowViewAndWaitResult(d,!1,c)}}async function aY(a,b){
const c=(0,l.U)(a,T);return af.ShowViewAndWaitResult(c,!1,b)}async function aZ(){const a=(0,d.H)({app:aw,viewNavigator:af,
service:R.service,data:R.data,dataItemDisplayNameProvider:Y,initialIdentityProvider:Z,usageInfo:R.usageInfo,commands:S,
securityWarningsManager:R.securityWarningsManager,sharing:R.sharing,passwordsHistory:R.passwordsHistory,breachMon:au,
options:R.options,settings:R.settings,policies:R.policies,view:T,extensionInfo:W,os:await V.GetPlatformOS(),clipboard:ab,
screenshot:ac,http:ad,rng:ae,canUseWin32LoginsAndBookmarks:!ai&&"win"===U});return af.ShowView(a,!1)}async function a0(a){
if(aj)return af.ShowView((0,n.cB)(T,(()=>{(0,G.fI)(T.OpenUrl({newTab:!0,reuseExisting:!0,url:w.Ui},null)),aw.ClosePopup()})),!1)
;if(ak||al){const b=(0,e.A)();await af.ShowView(b,!1)
;if(!await T.CallBackgroundScript("StartDesktopAppIfInstallationOrUpdateCompleted",null,a))return ak?af.ShowView((0,t.J)({
localization:T}),!1):void aV();ap&&(at=(0,D.v)(T),await at.Init(),au=at),await(0,w.sJ)(R.options,T,ai)}{
const a=await T.storage.Get({GotUserConsentToCollectPersonalData:null,GotUserConsentToCollectTechnicalData:null
}),b=!1!==a.GotUserConsentToCollectPersonalData,e=!1!==a.GotUserConsentToCollectTechnicalData;if((!b||!e)&&(await c(b,e),aq)){
if(R.service.GetGlobalStatus().m_connected_to_server){let a=!1;try{(await R.service.GetRFOnlineUserId()).userId||(a=!0)
}catch(d){a=!0}if(a)return await S.OpenStartPage(null),void aV()}}}try{if(ai){const c=await by(a),g=await bx(a)
;if(c)return await S.OpenStartPage(null),void aV();g&&await bz(null,a);let h=!1;const i=R.service.GetGlobalStatus()
;if(!i.m_connected_to_server||!i.m_logged_in||!i.m_storage_connected){let c=null
;if(R.service.GetGlobalStatus().m_connected_to_server)try{await(0,G.mC)((async()=>R.service.Login({},a)),1e3,(()=>((0,
G.fI)(af.ShowView((0,e.A)(),!0)),()=>{})))}catch(d){if((0,F.NR)(d))try{
await(0,r.V)(b,d.authInfo,null,bB(d.authInfo),T).Execute((0,G.f4)(null,null,null)),await a9(),await R.service.Login({},a),h=!0
}catch(f){await a9(),c=await a3(a),h=!0}else if((0,y.tM)(d,15)){if(2===await a5())return a4(!1,a)}else(0,
y.u7)(d)?await bj():(c=await a3(a),h=!0)}else c=await a3(a),h=!0;const g=await a5();if(2===g)return a4(!1,a);if(0===g){
const b=await bx(a);if(await by(a))return await S.OpenStartPage(null),void aV();b&&await bz(c,a)}}const j=await a5()
;if(2===j)return a4(!1,a);if(0===j){const b=await R.service.GetSyncPendingItems(a);await aX(b,a)}const k=await bv(a)
;if(k.length>0){const b=await aY(k,a);if(0===b)await bw(k,a);else if(1===b){const b=(0,e.A)();await af.ShowView(b,!1),
await bs(a)}}if(h&&await bj(),0===j){const b=await bt();b&&await bA(b,a)}}else{const b=R.service.GetGlobalStatus()
;b.m_connected_to_server&&b.m_logged_in&&b.m_storage_connected||await S.ShowLoginUI(a);if(2===await a5())return a4(!1,a)}
}catch(d){if(!(0,y.tM)(15))throw d;if(2===await a5())return a4(!1,a)}return void await aZ();async function c(b,c){const e=(0,
p.m)(T,b,c,(async()=>{(0,G.fI)(T.OpenUrl({newTab:!0,newWindow:!1,reuseExisting:!0,url:w.Cq},null)),aV()}));for(;!b||!c;){
const f=await af.ShowViewAndWaitResult(e,!1,a);if(await T.CallBackgroundScript("AcceptUserConsentToCollectData",null,null,f),
b=f.m_have_consent_for_personal_data,c=f.m_have_consent_for_technical_data,!b||!c){const b=(0,p.o)(T,X);try{
await af.ShowViewAndWaitResult(b,!1,a)}catch(d){}}}}}async function a1(a){await a3(null!=a?a:(0,G.f4)(null,null,null))}
async function a2(a,b){const c=(0,e.A)();return await af.ShowView(c,!1),(0,G.W0)((async(b,c,d)=>{R.data.onDataChanged.Add(e)
;try{await a(d)}catch(f){R.data.onDataChanged.Remove(e)}function e(a){let c=!1;for(const b of a){switch(b.event){case 2:case 3:
case 1:c=!0}if(c)break}if(c){const a=R.service.GetGlobalStatus()
;a.m_connected_to_server&&a.m_storage_connected&&a.m_logged_in&&((0,H.TT)(R.data).onDataChanged.Remove(e),b())}}}),null!=b?b:(0,
G.f4)(null,null,null))}async function a3(a){var c;if(R.service.GetGlobalStatus().m_connected_to_server){
const d=await R.service.GetRFOnlineUserId();av=!1;const e=await R.rfo.GetLoginMethod(d.userId,a);if("sso"===e.type){const h=(0,
g.C8)("login-page",T,d.userId,null!==(c=(0,w.sU)(d.serverUrl))&&void 0!==c?c:"",(0,
w.ju)("Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved."),{async SSOLogin(c){for(;;)try{
await aa.LoginToAccountViaSSO(c,(0,H.TT)(e.sso),!1,null,a)}catch(d){if((0,F.NR)(d)){try{await(0,
r.V)(b,d.authInfo,null,bB(d.authInfo),T).Execute(a);continue}catch(d){await a9(),await af.ShowViewAndWaitResult(f,!0,a)}
return null}if((0,y.tM)(d,15))return null;if(!(0,y.u7)(d))throw d;await bj()}},ChangeAccount:async()=>{
await S.ShowAccountSetupDialog({rfoServerUrl:d.serverUrl}),aV()}});return await af.ShowViewAndWaitResult(h,!0,a),null}
const f=(0,g.cx)("login-page",!0,(0,w.ju)("Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved."),!1,{
GetAccountDisplayInfo:async()=>{var a;return{userId:d.userId,serverTitle:null!==(a=(0,w.sU)(d.serverUrl))&&void 0!==a?a:""}},
OnLogin:async(a,c)=>{try{await R.service.Login({email:d.userId,password:a},c)}catch(e){if((0,F.NR)(e)){try{await(0,
r.V)(b,e.authInfo,null,bB(e.authInfo),T).Execute((0,G.f4)(null,null,null)),await a9(),await R.service.Login({email:d.userId,
password:a},c)}catch(e){await a9(),await af.ShowViewAndWaitResult(f,!0,c)}return a}if((0,y.tM)(e,15))return a;if(!(0,
y.u7)(e))throw e;await bj()}return a},onForgotPassword:async()=>{await T.OpenUrl({newTab:!1,url:w.i0},null),aV()},
onChangeAccount:async()=>(await S.ShowAccountSetupDialog({rfoServerUrl:d.serverUrl}),aV(),null)
},T,ab),h=await af.ShowViewAndWaitResult(f,!0,a);return av=!0,h}return await S.OpenStartPage(null),aV(),null}
async function a4(a,b){const c=await(0,H.TT)(R.options).Get({AccountEnterprise:!1,AccountCompanyAdmin:!1,AccountLicenseTrial:!1,
AccountClientReadOnly:!1,AccountClientBlocked:!1,AccountOneFreeDevice:!1,AccountCanSwitchToFreeMode:!1,
AccountCanSetFreeDevice:!1,AccountFreeDeviceSwitchesLeft:0,AccountInitialFreeDeviceSwitch:!1,AccountOneFreeDeviceId:"",
AccountOneFreeDeviceName:"",AccountCanSetReadonlyDevice:!1,AccountReadOnlyDevicesLimitReached:!1})
;return!c.AccountEnterprise||c.AccountCompanyAdmin||c.AccountCanSwitchToFreeMode||c.AccountCanSetFreeDevice||c.AccountCanSetReadonlyDevice?af.ShowViewAndWaitResult((0,
n.J_)(!0,a,c,T,{async Upgrade(a){await S.OpenPaymentPage({action:"buy"},a),aw.ClosePopup()},async Renew(a){
await S.OpenPaymentPage({action:"renew"},a),aw.ClosePopup()},async InstallDesktop(a){await S.OpenSwitchToDesktopPage(a),
aw.ClosePopup()},async MakeThisDeviceFree(a){await(0,H.TT)(R.rfo).UpdateUserDevices({devices:[{thisDevice:!0,freeDevice:!0}]
},a),(0,G.fI)(S.SyncInBackground(null))},async MakeThisDeviceReadOnly(a){await(0,H.TT)(R.rfo).UpdateUserDevices({devices:[{
thisDevice:!0,readOnly:!0}]},a),(0,G.fI)(S.SyncInBackground(null))},showError:null}),!1,b):af.ShowViewAndWaitResult((0,n.sG)({
showBackButton:a,viewApi:T}),!1,b)}async function a5(){return(0,x.z)(await a6())}async function a6(){return(0,
H.TT)(R.options).Get({AccountClientReadOnly:!1,AccountClientBlocked:!1})}async function a7(a){return T.sessionStorage.Set({
"persistent-popup-page":a})}async function a8(){return(await T.sessionStorage.Get({"persistent-popup-page":null
}))["persistent-popup-page"]}async function a9(){return T.sessionStorage.Remove("persistent-popup-page")}async function ba(a,c){
if("otp"===a.m_type){if(av=!1,!a.m_otp_data)return void await a0(c)
;const e=a.m_otp_data.m_otp_info,f=a.m_otp_data.m_otp_dialog_params;try{await(0,r.V)(b,e,f,bB(e),T).Execute((0,
G.f4)(null,null,null)),await a9(),await R.service.Login({},c)}catch(d){await a9(),await a3(c)}return av=!0,a0(c)}throw(0,
y.rb)(9,"Unknown page type: "+a.m_type)}async function bb(a,b){if(aF()){const c=bp(),d=bq(),e=br()
;2===b?await T.CallBackgroundScript("ShowNativeBookmarksList",null,null,(0,
I.gv)(a),c,d,e):7===b?await T.CallBackgroundScript("ShowNativeSafenotesList",null,null,(0,
I.gv)(a),c,d,e):5===b?await T.CallBackgroundScript("ShowNativeIdentitiesList",null,null,(0,
I.gv)(a),c,d,e):await T.CallBackgroundScript("ShowNativeLoginsList",null,null,(0,I.gv)(a),c,d,e)}else;}async function bc(a){
const b=await T.CallBackgroundScript("CollectSaveFormsData",null,a),c=(0,f.wn)({view:T,service:R.service,dataStorage:R.data,
usageInfo:R.usageInfo,settings:R.settings,policies:R.policies,commands:S,passwordHistory:R.passwordsHistory,data:b})
;return af.ShowViewAndWaitResult(c,!0,a)}async function bd(){const a=await R.policies.Get({NoSecurityCenter:!1,
DisableEmergencyAccess:!1,DisableSync:!1,NoPasscards:!1,NoBookmarks:!1,DisableCreateLogins:!1,DisableCreateBookmarks:!1,
SelfHostedServer:!1,DisableLogoff:!1}),b=await(0,H.TT)(R.options).Get({AccountEnterprise:!1,AccountEnterpriseLicenseActive:!1,
AccountCompanyAdmin:!1,AccountGroupManager:!1,AccountLicenseActive:!1,AccountLicenseTrial:!1,AccountClientBlocked:!1,
AccountClientReadOnly:!1}),c=0!==(0,x.z)(b)?await T.LocalizeString("Menu_BlockedItem_Upgrade"):void 0,d=[];d.push({
title:await T.LocalizeString("Cmd_Password_Generator_Flat"),imageClass:"command-generate-icon",blockedText:c,
onCommand:be((async(a,b)=>{const c=(0,m.Ms)({view:T,options:R.options,settings:R.settings,passwordsHistory:R.passwordsHistory,
commands:S,clipboard:ab,http:ad,rng:ae,isNativeApp:an});await af.ShowViewAndWaitResult(c,!0,b)}))}),d.push({
title:await T.LocalizeString("Cmd_Authenticator"),imageClass:"command-authenticator-icon",blockedText:c,
onCommand:be((async(a,b)=>{await S.OpenAuthenticator(null),aV()}))}),d.push({
title:await T.LocalizeString("Cmd_SharingCenter_Flat"),imageClass:"command-sharing-center-icon",blockedText:c,
onCommand:be((async(a,b)=>{await S.OpenSharingCenter({direction:"shared-with-me"}),aV()}))}),a.NoSecurityCenter||d.push({
title:await T.LocalizeString("Cmd_PasswordAuditRun_Key"),imageClass:"command-security-center-icon",blockedText:c,
onCommand:be((async(a,b)=>{await S.OpenSecurityCenter({view:"all"}),aV()}))}),a.DisableEmergencyAccess||d.push({
title:await T.LocalizeString("Cmd_EmergencyAccess_Key"),imageClass:"command-emergency-access-icon",blockedText:c,
onCommand:be((async(a,b)=>{await S.OpenEmergencyAccess({direction:"my-contacts"}),aV()}))}),an&&d.push({
title:await T.LocalizeString("Cmd_OpenDesktopEditor"),imageClass:"command-desktop-editor-icon",onCommand:async(a,b)=>{
await S.OpenDesktopEditor(b),aV()}}),d.push("separator"),!ai&&a.DisableSync||d.push({
title:await T.LocalizeString("Cmd_ToolBarSync"),imageClass:"command-sync-icon",hideMenuAfterExecution:!!ai,
onCommand:async(a,b)=>{if(!ai)return await S.StartSyncWithUI({viewRect:bp(),screenRect:bq(),monitorRect:br()},b),aV()
;a.UpdateIcon(null,"command-sync-icon sync-progress-action",null),a.UpdateText(await T.LocalizeString("RfSyncProgress_Syncing"))
;try{await bs(b)}catch(c){if((0,F.r5)(c,F.rS)||(0,F.r5)(c,F.JI))(0,G.fI)(async function(){av=!1,await a3(b),av=!0
;const a=await a5();if(0!==a){const a=await bx(b);if(await by(b))return await S.OpenStartPage(null),void aV()
;a&&await bz(null,b)}if(await bj(),0!==a){const a=await R.service.GetSyncPendingItems(b);await aX(a,b)}const c=await bv(b)
;if(c.length>0){const a=await aY(c,b);if(0===a)await bw(c,b);else if(1===a){const a=(0,e.A)();await af.ShowView(a,!1),
await bs(b)}}await aZ()}());else{if(!(0,y.tM)(c,15))throw c;(0,G.fI)(a4(!1,b))}}finally{
a.UpdateIcon(null,"command-sync-icon",null),a.UpdateText(await T.LocalizeString("Cmd_ToolBarSync"))}}}),d.push({
title:await T.LocalizeString("Cmd_Settings_Flat"),imageClass:"command-settings-icon",onCommand:async(a,b)=>{
await S.OpenExtensionSettings({newTab:!0,reuseExisting:!0},b),aV()}
}),b.AccountEnterprise&&(b.AccountCompanyAdmin||b.AccountGroupManager)&&d.push({
title:await T.LocalizeString("Cmd_Sync_OpenAdminCenter"),imageClass:"command-admin-center-icon",blockedText:c,
onCommand:be((async(a,b)=>{const c=await R.service.GetRoboFormAccountInfo(b);return await S.OpenAdminCenter({view:"dashboard",
companyCreatedTime:null==c?void 0:c.createdTime},b),aV()}))}),d.push({title:await T.LocalizeString("Cmd_RunImport_Flat"),
imageClass:"command-import-icon",blockedText:c,onCommand:be((async(a,b)=>{await S.ShowImportDialog(!1),aV()}))}),an||d.push({
title:await T.LocalizeString("Cmd_ScanQRCode_Key"),imageClass:"command-qr-scan-icon",blockedText:c,onCommand:async(a,b)=>{
const c=await ac.CaptureScreenshotForActiveTabAsDataUrl()
;if(!c)throw(0,F.ZU)(F.V2,await T.LocalizeString("Cmd_ScanQRCode_CouldNotCaptureScreenShot",null,"Could not capture screenshot"))
;const d=await(0,E.zC)(c,null,b)
;if(!d)throw(0,F.ZU)(F.V2,await T.LocalizeString("Cmd_ScanQRCode_CouldNotCaptureScreenShot",null,"Could not capture screenshot"))
;await S.ScanQRCode(d,null,b),aV()}});const f=U;ai?"win"!==f&&"mac"!==f||d.push({
title:await T.LocalizeString("SA_LimitedMode_LinkRF_Text"),imageClass:"command-install-icon",onCommand:async(a,b)=>{
await S.OpenSwitchToDesktopPage(b),aV()}}):"win"===f&&d.push({title:await T.LocalizeString("Cmd_OpenDesktopEditor"),
imageClass:"command-desktop-editor-icon",onCommand:async(a,b)=>{await S.OpenDesktopEditor(b),aV()}}),d.push("separator")
;const g=await bf();return d.push({title:await T.LocalizeString("Cmd_Help_Flat"),imageClass:"command-help-icon",type:"submenu",
submenu:g}),b.AccountEnterprise&&b.AccountEnterpriseLicenseActive||b.AccountLicenseActive&&!b.AccountLicenseTrial||d.push({
title:await T.LocalizeString("Cmd_License_BuyNow"),imageClass:"command-upgrade-icon",onCommand:async(a,b)=>{
await S.OpenPaymentPage({action:"buy"},b),aV()}}),b.AccountEnterprise||a.SelfHostedServer||an||d.push({
title:await T.LocalizeString("Cmd_RenewalRewards_Flat"),imageClass:"command-renewal-rewards-icon",onCommand:async(a,b)=>{
await S.OpenRFOPage(null,w.Uq,{newTab:!0},b),aV()}}),a.DisableLogoff||d.push({title:await T.LocalizeString("Cmd_Logoff_Flat"),
imageClass:"command-logoff-icon",onCommand:async(a,b)=>{await R.service.Logoff(b),aV()}}),an&&(d.push("separator"),d.push({
title:await T.LocalizeString("Mac_Menu_App_QuitRoboForm"),imageClass:"command-quit-icon",onCommand:async(a,b)=>{
await S.QuitRoboForm(b),aV()}})),d}function be(a){return async(b,c)=>{const d=await a5();return 0!==d?a4(1===d,c):a(b,c)}}
async function bf(){const a=await R.policies.Get({SelfHostedServer:!1}),b=!1,c=[];c.push({
title:await T.LocalizeString("Cmd_Help_Manual_Key"),onCommand:async(a,b)=>{await T.OpenUrl({newTab:!0,reuseExisting:!1,url:(0,
w.nF)("manual",await J.GetPlatformOS())},b),aV()}}),c.push({title:await T.LocalizeString("Cmd_Help_FaqAll_Key"),
onCommand:async(a,b)=>{await T.OpenUrl({newTab:!0,reuseExisting:!1,url:w.qP},b),aV()}}),b||c.push({
title:await T.LocalizeString("Cmd_Help_HomePage_Key"),onCommand:async(a,b)=>{await T.OpenUrl({newTab:!0,reuseExisting:!1,
url:w.l$},b)}}),c.push("separator"),c.push({title:await T.LocalizeString("Cmd_Help_ForgotPassword_Key"),onCommand:async(a,b)=>{
await T.OpenUrl({newTab:!1,url:w.i0},b),aV()}}),c.push("separator");let d=!1;return a.SelfHostedServer||(c.push({
title:await T.LocalizeString("Cmd_Help_ContactSupport_Key"),onCommand:async(a,b)=>(await S.ContactSupport({
reportType:"ContactSupport"},b),aV())}),ao&&c.push({title:await T.LocalizeString("Popup_ReportAnIssue_Command_Text"),
onCommand:async(a,b)=>(await S.ContactSupport({reportType:"WebPage"},b),aV())}),d=!0),ai||"win"!==U||(c.push({
title:await T.LocalizeString("Cmd_Help_ProblemStepsRecorder_Key"),onCommand:async(a,b)=>(await S.RunProblemStepsRecorder(),aV())
}),d=!0),d&&c.push("separator"),an&&(c.push({title:await T.LocalizeString("Cmd_Help_UpdateCheck_Key"),onCommand:async(a,b)=>{
await S.CheckForUpdate(b),aV()}}),c.push("separator")),c.push({title:await T.LocalizeString("Cmd_About_Key"),
onCommand:async(a,b)=>{const c=(0,o.j)({viewApi:T,service:R.service,app:aw});await af.ShowViewAndWaitResult(c,!0,b)}}),c}
async function bg(a,b,c){if(b){const b=await R.data.GetInfo(a,0,null),d=await(0,H.TT)(R.policies).Get({
DisableFillWithoutSubmit:!1}),e=await(0,H.TT)(R.options).Get({MatchingPasscardsCausesSubmit:!0,FillEmptyFieldsOnlyPasscard:!1
}),f=c||e.MatchingPasscardsCausesSubmit||d.DisableFillWithoutSubmit||b.hidePasswords||!1;(0,G.fI)(S.FillForms({path:a,
identity:!1,submit:f,fillEmptyFieldsOnly:e.FillEmptyFieldsOnlyPasscard},null))}else{const b=await(0,H.TT)(R.options).Get({
ToolbarOpensNewWindow:!0});(0,G.fI)(S.GoFillSubmit({navigate:!0,path:a,submit:!0,newTab:b.ToolbarOpensNewWindow},null))}
return aV()}async function bh(a){return(0,G.fI)(S.OpenFile(a,{mode:"edit"})),aV()}async function bi(a){const b=await(0,
H.TT)(R.options).Get({ToolbarOpensNewWindow:!0});return(0,G.fI)(S.GoTo(a,{newTab:b.ToolbarOpensNewWindow})),aV()}
async function bj(){
await R.options.GetValue("OpenStartPageOnLoginFromExtension",!0)&&await T.CallBackgroundScript("OpenStartPageOnLoginFromPopup",null,null)
}function bk(a,...b){if("ClosePopupToolbar"===a)aV()}function bl(a){for(const b of a)switch(b.event){case 10:case 11:
if(av)return void aV()}}async function bm(a){var b,c;let d=!1;for(const e in a)switch(e){case"AccountClientReadOnly":
case"AccountClientBlocked":{const f=null!==(b=a[e].oldValue)&&void 0!==b&&b
;(null!==(c=a[e].newValue)&&void 0!==c&&c)!==f&&(d=!0)}}d&&(0,G.fI)(async function(){2===await a5()?await a4(!1,(0,
G.f4)(null,null,null)):await a0((0,G.f4)(null,null,null))}())}async function bn(a){
for(const b in a)if("UseNativeMenus"===b)ai||(am=void 0===a[b].newValue||a[b].newValue)}function bo(a){
void 0!==a.screenX&&void 0!==a.screenY&&void 0!==a.clientX&&void 0!==a.clientY&&0!==a.screenX&&0!==a.screenY&&(ar=a.screenX-a.clientX,
as=a.screenY-a.clientY)}function bp(){return(0,I.gv)(document.body.getBoundingClientRect())}function bq(){
if((null===ar||null===as)&&!ai&&"mac"===U&&top){
const a=void 0!==top.screenLeft?top.screenLeft:top.screenX,b=void 0!==top.screenTop?top.screenTop:top.screenY
;let c=(top.outerWidth-top.innerWidth)/2,d=c;c=top.outerWidth-top.innerWidth-35,d=70;const e=a+c,f=b+d,g=(0,
I.gv)(document.body.getBoundingClientRect());return(0,I.DS)(g,e,f)}if(null!==ar&&null!==as){const a=(0,
I.gv)(document.body.getBoundingClientRect());return(0,I.DS)(a,ar,as)}}function br(){0}async function bs(a){av=!1
;const b=await S.SyncInBackground(a);if(!b)return;b.forceMasterPasswordChange&&await bz(null,a),await aX(b.pendingItems,a)
;const c=b.syncParts.filter((a=>!a.main&&3===a.syncStatus&&a.syncError));if(c.length>0){const b=await aY(c,a)
;if(0===b)await bw(c,a);else if(1===b){const b=(0,e.A)();await af.ShowView(b,!1),await bs(a)}}}function bt(){
return T.CallBackgroundScript("GetPendingItemDuplicates",null,null)}function bu(){
return T.CallBackgroundScript("ClearPendingItemDuplicates",null,null)}function bv(a){
return T.CallBackgroundScript("GetPendingSyncErrors",null,a)}function bw(a,b){
return T.CallBackgroundScript("ClearPendingSyncErrors",null,b,a)}function bx(a){
return T.CallBackgroundScript("ShouldForceMasterPasswordChange",null,a)}async function by(a){try{
if((await R.service.GetRoboFormAccountInfo(a)).loginMethodToSwitch)return!0}catch(b){}return!1}async function bz(a,b){
const c=await(0,C.dt)(R.policies),d=await R.service.GetRFOnlineUserId(),e={IsPasswordCompromised:async(a,b)=>{if(!at)return!1
;const c=await at.GetCachedUserDataBreaches({password:a},null,b);return!(!c||0===c.length)&&c.some((a=>1===a.m_type))},
WasNewMasterPasswordAlreadyUsed:async(a,b,c)=>{if(!await R.options.GetValue("AccountEnterprise",!1))return!1
;const d=await R.policies.GetValue("EnforceMPHistory",0);return 0!==d&&R.service.WasNewMasterPasswordAlreadyUsed(a,b,d,c)},
ChangeMasterPassword:async(a,b,c)=>{await R.rfo.ChangeAccountPassword(a,b,c),await R.service.Login({email:d.userId,password:a
},c)},Login:async(a,b)=>{await R.service.Login({email:d.userId,password:a},b)}};await af.ShowViewAndWaitResult((0,
s.qz)(a,c,"login-page",e,T,b),!0,b)}async function bA(a,b){
const c=(0,q.e)(T,R.data,a.m_change_event,a.m_duplicates,a.m_item_icon_url);await af.ShowViewAndWaitResult(c,!1,b),await bu()}
function bB(a){return{ShowConnectingScreen:b,ShowOtpScreen:c,ShowError:d};function b(a,b,c){return(0,G.Mj)({
action:async(d,e,f)=>{f.onTaskCancel.Add((a=>{e(a)}));const h=(0,g.iM)("login-page",c,a,b,T);await af.ShowView(h,!0)}})}
async function c(b,c){await a7({m_type:"otp",m_otp_data:{m_otp_info:a,m_otp_dialog_params:b}});const d=(0,
g.sf)(b,"login-page",T,{onContextMenu:null});return af.ShowViewAndWaitResult(d,!0,c)}async function d(a,b,c){const d=(0,
g.QK)("login-page",a,b,T);return af.ShowViewAndWaitResult(d,!0,c)}}}(P,Q,S,a,b,c,J,K,L,M,N,O),await R.Init(),R}},
56218:function(a,b,c){"use strict";c.d(b,{Y:function(){return h}});var d=c(47333),e=c(63956),f=c(4153),g=(c(13117),c(91764)._)
;function h(a){const{invitations:b,rfCompany:c,viewApi:h,serverUrl:i}=a;let j="",k=null,l=null,m=null,n=null,o=null,p=null
;const q=[],r=500;return{Create:async function(a,c){
const e=(0,d.sU)(i)||"",f=1===b.length?await h.LocalizeString("CompanyInvitationConfirmation_Title"):await h.LocalizeString("CompanyInvitationConfirmationMultiple_Title"),r=await h.LocalizeString("Cmd_Accept_Key"),v=1===b.length?await h.LocalizeString("SharedFolderSettings_RejectSharedFolder"):await h.LocalizeString("Cmd_RejectAll_Flat"),w=await h.LocalizeString("Cmd_Skip_Flat"),x=[]
;for(const[d,i]of b.entries()){
const a=i.name||i.companyId,b=await h.LocalizeString("CompanyInvitationToConfirm_WithSender_Info",[a]);let c;const e=g("div",{
className:"item-row"},c=g("input",{type:"radio",name:"radio",className:"item-radio",value:i.companyId,id:i.companyId,
checked:0===d,onchange:()=>{j=i.companyId}}),g("label",{className:"normal-text item-name-text",htmlFor:i.companyId},b))
;x.push(e),q.push(c)}b.length>0&&(j=b[0].companyId);const y=g("div",{
className:"company-invite-page setup-page receive-invite-page"},g("div",{className:"header-section"},g("div",{
className:"header-text-section"},g("div",{className:"title-text"},"RoboForm"))),p=g("div",{
className:"action-progress-overlay-circle size64 hidden"}),g("div",{className:"hint-text rfo-server-title-text"
},e||""),g("div",{className:"normal-text invite-text"},f),g("div",{className:"items-container"},x),o=g("div",{
className:"error-text"}),g("div",{className:"page-flexy-space"}),g("div",{className:"buttons-section"},g("div",{
className:"padding-div"}),l=g("input",{type:"button",className:"important-button normal-button",value:r,onclick:s
}),m=g("input",{type:"button",className:"regular-button normal-button",value:v,onclick:t}),n=g("input",{type:"button",
className:"regular-button normal-button",value:w,onclick:u})));return k=a,y},OnAfterShow:function(){},OnBeforeHide:function(){},
Focus:function(){(0,f.TT)(l).focus()},Dispose:function(){}};function s(){y(),(0,e.D$)((()=>async function(){try{
await c.JoinCompany(j,null)}catch(a){return void x((0,d.Qo)(a))}(0,f.TT)(k)()}()),z,r,v)}function t(){y(),(0,
e.D$)((()=>async function(){try{for(let a=0;a<b.length;a++){const d=b[a];await c.LeaveCompany(d.companyId,null)}}catch(a){
return void x((0,d.Qo)(a))}(0,f.TT)(k)()}()),z,r,v)}function u(){(0,f.TT)(k)()}function v(){return(0,
f.TT)(p).classList.remove("hidden"),w}function w(){(0,f.TT)(p).classList.add("hidden")}function x(a){(0,f.TT)(o).textContent=a}
function y(){(0,f.TT)(o).textContent=""}function z(){return B(l),B(m),B(n),q.forEach(B),A}function A(){C(l),C(m),C(n),
q.forEach(C)}function B(a){(0,f.TT)(a).setAttribute("disabled","disabled")}function C(a){(0,f.TT)(a).removeAttribute("disabled")
}}},19390:function(a,b,c){"use strict";c.d(b,{I:function(){return l}})
;var d=c(47333),e=c(4234),f=c(73863),g=c(4153),h=c(63956),i=c(69893),j=(c(13117),c(91764)._);const k=255;function l(a){
const{basePath:b,data:c,viewApi:l}=a;let m=null,n=null,o=null,p=null,q=null,r=null,s=null,t=null,u=null;const v=1e3
;let w="",x="",y="",z="";return{Create:async function(b,c){
const d=await l.LocalizeString("Cmd_NewFolder_Title"),e=await l.LocalizeString("NewSharedFolder_Title"),f=await l.LocalizeString("Cmd_Ok_Flat"),h=await l.LocalizeString("Cmd_Cancel_Flat"),i=await a.viewApi.LocalizeString("Dialog_Label_Back")
;w=await l.LocalizeString("NameInvalidCharacter_Error2"),x=await l.LocalizeString("WrongNameLenght_Error",[(0,g.bf)(k)]),
y=await l.LocalizeString("Cmd_NewFolder_Exist_Error"),z=await l.LocalizeString("AlreadyExists_Error2");const v=j("div",{
className:"create-folder-page unselectable"},u=j("div",{className:"action-progress-overlay-circle size48 hidden"}),j("div",{
className:"header-section"},j("div",{className:"header-back-button back-icon",onclick:E,role:"button",ariaLabel:i}),j("div",{
className:"header-text-section"},j("div",{className:"title-text"},d))),o=j("div",{className:"content"},j("div",{
className:"normal-text"},e),p=j("input",{className:"extension-normal-input",type:"text",value:"",onkeypress:A,oninput:B
}),q=j("div",{className:"error-text"})),j("div",{className:"page-flexy-space"}),r=j("div",{className:"bottom-section"},j("div",{
className:"button-padding"},t=j("input",{type:"button",className:"normal-button regular-button",value:h,onclick:D
})),s=j("input",{type:"button",className:"normal-button important-button",value:f,onclick:C})));return m=b,n=c,v},
OnAfterShow:function(){},OnBeforeHide:function(){},Focus:function(){(0,g.TT)(p).focus()},Dispose:function(){}};function A(a){
"Enter"===a.key&&C()}function B(){P()}function C(){P();const a=(0,g.TT)(p).value,j=(0,e.KF)(a,null);return j?j.length>k?(O(x),
void(0,g.TT)(p).focus()):void(0,h.D$)((()=>async function(a){const e=b+"/"+a;let h=null;try{h=await c.GetInfo(e,1,null)
}catch(j){if(!(0,i.r5)(j,i.Y$))return void O((0,d.Qo)(j))}if(h)return 8===h.type?O((0,f.FJ)(y,a)):O((0,f.FJ)(z,"Item",a)),
void(0,g.TT)(p).focus();try{await c.CreateFolder(e,null)}catch(j){return void O((0,d.Qo)(j))}(0,g.TT)(m)(a)}(j)),H,v,F):(O(w),
void(0,g.TT)(p).focus())}function D(){(0,g.TT)(n)((0,i.JS)())}function E(){(0,g.TT)(n)((0,i.JS)())}function F(){return(0,
g.TT)(u).classList.remove("hidden"),G}function G(){(0,g.TT)(u).classList.add("hidden")}function H(){return M(t),M(s),M(p),K(r),
K(o),window.addEventListener("mousedown",J,!0),I}function I(){N(t),N(s),N(p),L(r),L(o),
window.removeEventListener("mousedown",J,!0)}function J(a){a.preventDefault(),a.stopPropagation()}function K(a){(0,
g.TT)(a).classList.add("disabled-state")}function L(a){(0,g.TT)(a).classList.remove("disabled-state")}function M(a){(0,
g.TT)(a).setAttribute("disabled","disabled")}function N(a){(0,g.TT)(a).removeAttribute("disabled")}function O(a){(0,
g.TT)(q).innerText=a}function P(){(0,g.TT)(q).innerText=""}}},47287:function(a,b,c){"use strict";c.d(b,{f:function(){return l}})
;var d=c(47333),e=c(4234),f=c(97490),g=c(13113),h=c(63956),i=c(78440),j=c(69893),k=c(91764)._;function l(a,b,c,l,m){
const n=a,o=l.LocalizeString,p=(0,f.i2)(),q=(0,i.f4)(null,null,null);p.OnCleanup((()=>q.Cancel()));const[r,s]=(0,
f.Uw)(null),[t,u]=(0,f.Uw)(0);return{Create:async function(a,h){return k("div",{className:"delete-folder-page"},k("div",{
className:"header"},k("div",{className:"back-button",onclick:()=>h((0,j.JS)()),role:"button",
ariaLabel:await o("Dialog_Label_Back")}),k("div",{className:"title"},(0,g.XE)(n.path,!0,void 0))),n.sharedFolder&&!(0,
g.fA)(n.path)?n.sharedGroup?function(){return async a=>{const c=r(a);return[k("div",{className:"content"},k("div",{
className:"warning"},o("DeleteGroup_Confirmation",[(0,g.XE)(n.path,!0,void 0)])),null!==c?k("div",{className:"error-text"},(0,
d.Qo)(c)):null,k("div",{className:"flexy"}),k("div",{className:"footer"},k("input",{type:"button",
className:"normal-button regular-button",value:await o("Btn_No"),onclick:()=>h((0,j.JS)())}),k("input",{type:"button",
className:"normal-button important-button",value:await o("Btn_Yes"),onclick:()=>v(b)})))]};async function b(b){s(null),
await m.DeleteSharedFolder(n.path,b),a(!1)}}():function(){const b=(0,f.Q_)(p,{},e)[0];return async c=>{const e=b(c),f=r(c)
;return[k("div",{className:"content"},k("div",{className:"warning"
},void 0===e.m_revoke?e.m_error?"":o("Loading_Status_Text"):e.m_revoke?o("RejectSharedFolder_Consumer_WarningMessage",[(0,
g.XE)(n.path,!0,void 0)]):o("StartPage_Sharing_DeleteFolder_Confirmation2",[(0,
g.XE)(n.path,!0,void 0)])),null!==f||e.m_error?k("div",{className:"error-text"},(0,d.Qo)(null!=f?f:e.m_error)):null,k("div",{
className:"flexy"}),void 0!==e.m_revoke?k("div",{className:"footer"},k("input",{type:"button",
className:"normal-button regular-button",value:await o("Btn_No"),onclick:()=>h((0,j.JS)())}),k("input",{type:"button",
className:"normal-button important-button",value:e.m_revoke?await o("SharedFolderSettings_Remove_Me"):await o("Btn_Yes"),
onclick:()=>v(i)})):null)];async function i(b){var c
;s(null),e.m_revoke?await m.RejectSharedFolder(n.path,b):await m.DeleteSharedFolder(n.path,b),
a(null!==(c=e.m_revoke)&&void 0!==c&&c)}};async function e(a){try{
const b=await m.GetSharedFolderInfoAndRecipients(n.path,!0,a),d=await c.GetRFOnlineUserId();return{
m_revoke:b.info.sender!==d.userId&&b.info.senderEmail!==d.userId}}catch(b){return{m_error:b}}}}():function(){const c=(0,
f.Q_)(p,{},m)[0];return async a=>{const b=c(a),e=r(a);let f
;if(void 0===b.m_item_counts)f=b.m_error?await o("Cmd_Delete_Confirm",[await o("RoboformType_Folder"),(0,
g._p)(n.path)]):await o("Loading_Status_Text");else{const a=await i(b.m_item_counts)
;f=a?await o("Cmd_DeleteFolder_Confirm",[`'${(0,
g._p)(n.path)}'`,"\n"+a]):await o("Cmd_Delete_Confirm",[await o("RoboformType_Folder"),(0,g._p)(n.path)])}return[k("div",{
className:"content"},k("div",{className:"warning"},f),null!==e||b.m_error?k("div",{className:"error-text"},(0,
d.Qo)(null!=e?e:b.m_error)):null,k("div",{className:"flexy"}),k("div",{className:"footer"},k("input",{type:"button",
className:"normal-button regular-button",value:await o("Btn_No"),onclick:()=>h((0,j.JS)())}),k("input",{type:"button",
className:"normal-button important-button",value:await o("Btn_Yes"),onclick:()=>v(l)})))]};async function i(a){
const b=a.filter((a=>a.count>0)),c=[];for(const d of b){const a=`-${d.count.toString()} ${await o((0,e.Y5)(d.type,d.count>1))}`
;c.push(a)}return c.join("\n")}async function l(c){s(null),await b.DeleteFolder(n.path,c),a(!1)}async function m(a){try{return{
m_item_counts:await b.GetCounts(n.path,a)}}catch(c){return{m_error:c}}}}(),(i=t,async a=>{switch(i(a)){case 0:return[];case 1:
return[k("div",{className:"disable-ui-overlay"})];case 2:return[k("div",{className:"progress-overlay"}),k("div",{
className:"action-progress-overlay-circle"})]}}));var i},OnAfterShow:()=>{},OnBeforeHide:()=>{},Focus:()=>{},Dispose:function(){
p.Remove()}};function v(a){return(0,h.PQ)((()=>a((0,i.f4)(null,q,null))),(function(){return u(1),()=>u(0)}),500,(function(){
return u(2),()=>u(0)}),(a=>s(a)))}}},21132:function(a,b,c){"use strict";c.d(b,{C:function(){return j}})
;var d=c(47333),e=c(4234),f=c(63956),g=c(4153),h=c(69893),i=(c(13117),c(91764)._);function j(a){
const{itemInfo:b,viewApi:c,rfDataStorage:j,rfCommands:k}=a;let l=null,m=null,n=null,o=null,p=null,q=null,r=null;const s=1e3
;return{Create:async function(d,f){
const g=(0,e.em)(b.path),h=(0,e.XE)(b.path,!1),j=await a.viewApi.LocalizeString("Dialog_Label_Back"),k=await c.LocalizeString("DeleteItemPage_Confirmation_Text",[h]),s=await c.LocalizeString("Btn_No"),w=await c.LocalizeString("Btn_Yes"),x=i("div",{
className:"delete-item-page unselectable"},r=i("div",{className:"action-progress-overlay-circle size48 hidden"}),i("div",{
className:"header-section"},i("div",{className:"header-back-button back-icon",onclick:v,role:"button",ariaLabel:j}),i("div",{
className:"header-text-section"},i("div",{className:"title-text"},i("div",{className:"text-ellipsis"},g)))),n=i("div",{
className:"content"},i("div",{className:"warning-section"},i("div",{className:"normal-text text-break-word"},k)),o=i("div",{
className:"error-text"}),i("div",{className:"page-flexy-space"}),i("div",{className:"bottom-section"},i("div",{
className:"button-padding"},q=i("input",{type:"button",className:"normal-button regular-button",value:s,onclick:u
})),p=i("input",{type:"button",className:"normal-button important-button",value:w,onclick:t}))));return l=d,m=f,x},
OnAfterShow:function(){},OnBeforeHide:function(){},Focus:function(){},Dispose:function(){}};function t(){(0,
f.D$)((()=>async function(){(0,g.TT)(o).innerText="";try{
k?await(0,d.e2)(j,k.CheckItemDuplicates,b.path,null):await j.DeleteFile(b.path,null)}catch(a){return void((0,
g.TT)(o).innerText=(0,d.Qo)(a))}(0,g.TT)(l)()}()),y,s,w)}function u(){(0,g.TT)(m)((0,h.JS)())}function v(){(0,g.TT)(m)((0,
h.JS)())}function w(){return(0,g.TT)(r).classList.remove("hidden"),x}function x(){(0,g.TT)(r).classList.add("hidden")}
function y(){return B(p),B(q),(0,g.TT)(n).classList.add("disabled-state"),window.addEventListener("mousedown",A,!0),z}
function z(){C(p),C(q),(0,g.TT)(n).classList.remove("disabled-state"),window.removeEventListener("mousedown",A,!0)}
function A(a){a.preventDefault(),a.stopPropagation()}function B(a){(0,g.TT)(a).setAttribute("disabled","disabled")}
function C(a){(0,g.TT)(a).removeAttribute("disabled")}}},78448:function(a,b,c){"use strict";c.d(b,{e:function(){return n}})
;var d=c(47333),e=c(3566),f=c(4234),g=c(63956),h=c(13113),i=c(4153),j=c(69893),k=c(78440),l=(c(13117),c(91764)._)
;function m(a,b,c,m,n,o){const p=a.LocalizeString,q=b,r=c,s=m,t=n,u=o;let v=null,w=null,x=null,y=null,z=null,A=null,B=null
;const C=new Map;let D=new Set,E=!1;return{Create:async function(a,b){const c=await F();let d,f;switch(r.event){case 6:
d=await p("DuplicatesDialog_ApplyChanges_Button"),f=await p("DuplicatesDialog_Cancel_Button");break;case 8:
d=await p("DuplicatesDialog_Rename_Button"),f=await p("DuplicatesDialog_CancelRename_Button");break;case 7:
d=await p("DuplicatesDialog_Delete_Button"),f=await p("DuplicatesDialog_CancelDelete_Button");break;default:throw(0,
j.ZU)(j.V2,`Unknown change event ${r.event}`)}
const g=await p("DuplicatesDialog_Delete_Text"),h=await p("DuplicatesDialog_Undo_Text"),k=[];for(const i of s){let a,b,c=null
;if(7!==r.event){const a=l("div",{className:"delete-button",onclick:()=>{E||(a.classList.add("hidden"),
e.classList.remove("hidden"),d.classList.add("removed"),b.checked=!1,b.disabled=!0,H(i))}},g),e=l("div",{
className:"keep-button hidden",onclick:()=>{E||(e.classList.add("hidden"),a.classList.remove("hidden"),
d.classList.remove("removed"),b.disabled=!1,I(i))}},h);c=[a,e]}const d=l("div",{className:"duplicate"},l("div",{
className:"checkbox"},l("label",null,b=l("input",{type:"checkbox",onchange:()=>{Q(),L()}}),l("div",{className:"checkbox-check"
}),a=t?l("div",{className:"icon"}):null,l("div",{className:"checkbox-text"},(0,e.v$)(i,200,100,!0)),l("div",{className:"flexy"
}))),c);t&&a&&(a.style.backgroundImage=`url(${t})`),k.push(d);const f={m_el:d,m_checkbox_el:b};C.set(i,f)}return w=l("div",{
className:"duplicates-view"},x=l("div",{className:"title"},c),l("div",{className:"duplicates-list"},k),A=l("div",{
className:"error-message hidden"}),l("div",{className:"flexy"}),l("div",{className:"footer"},y=l("input",{type:"button",
className:"button normal-button important-button",disabled:!0,value:d,onclick:J}),l("div",{className:"footer-space"
}),z=l("input",{type:"button",className:"button normal-button regular-button",value:f,onclick:K}))),v=a,(0,i.TT)(w)},
OnAfterShow:function(){q.onDataChanged.Add(G)},OnBeforeHide:function(){q.onDataChanged.Remove(G)},Focus:function(){},
Dispose:function(){}};function F(){const a=(0,h.XE)((0,i.TT)(r.path),!1,200);switch(r.event){case 6:
return p("DuplicatesDialog_MessageText",[a]);case 8:{const b=(0,h.XE)((0,i.TT)((0,i.TT)(r.to).path),!1,200)
;return p("DuplicatesDialog_RenameMessageText",[a,b])}case 7:return p("DuplicatesDialog_DeleteMessageText",[a]);default:throw(0,
j.ZU)(j.V2,`Unknown change event ${r.event}`)}}function G(a){let b=!1;for(const c of a){switch(c.event){case 2:return void(0,
i.TT)(v)();case 7:if(6===r.event){if(c.path===(0,i.TT)(r.to).path)return void(0,i.TT)(v)()
}else if(c.path===r.path)return void(0,i.TT)(v)();break;case 8:if(8===r.event&&c.path===(0,i.TT)(r.to).path){if((0,
i.TT)(c.to).path===r.path)return void(0,i.TT)(v)();(0,i.TT)(r.to).path=(0,i.TT)(c.to).path,b=!0}}switch(c.event){case 7:case 8:
case 6:{const a=C.get((0,i.TT)(c.path));if(a){if(a.m_el.remove(),C.delete((0,i.TT)(c.path)),0===C.size)return void(0,i.TT)(v)()
;L()}}}}b&&(0,k.fI)(async function(){const a=await F();(0,i.TT)(x).innerText=a}())}function H(a){D.add(a),L()}function I(a){
D.delete(a),L()}function J(){const a=[];for(const[b,c]of C)c.m_checkbox_el.checked&&a.push(b);Q(),(0,
g.D$)((()=>async function(a){const b=new Set,c=[];for(const k of a)switch(r.event){case 6:try{await q.CopyFile((0,
i.TT)(r.path),k,null),b.add(k)}catch(g){const a=(0,j.EB)(g);c.push(a)}break;case 8:{const a=(0,h.fA)(k)+"/"+(0,h._p)((0,
i.TT)((0,i.TT)(r.to).path));if(!(0,i.RA)(k,a))try{await q.GetInfo(a,0,null);const b=await p("AlreadyExists_Error2",[(0,d.Y5)((0,
f.hF)(k),!1),(0,h.XE)(a,!1,void 0)]);c.push(b);break}catch(g){(0,j.r5)(g,j.Y$)}try{await q.MoveFile(k,a,null),b.add(k)}catch(g){
const a=(0,j.EB)(g);c.push(a)}}break;case 7:try{await q.DeleteFile(k,null),b.add(k)}catch(g){const a=(0,j.EB)(g);c.push(a)}break
;default:throw(0,j.ZU)(j.V2,`Unknown change event ${r.event}`)}const e=new Set;for(const d of D)if(!b.has(d))try{
await q.DeleteFile(d,null),b.add(d)}catch(g){const a=(0,j.EB)(g);c.push(a),e.add(d)}D=e;for(const d of b){(0,
i.TT)(C.get(d)).m_el.remove(),C.delete(d)}if(L(),c.length>0){!function(a){const b=l("div",{className:"error-message"},a);(0,
i.TT)(A).replaceWith(b),A=b,R()}(c.join("\n")),R()}else(0,i.TT)(v)()}(a)),M,500,O)}function K(){(0,i.TT)(v)()}function L(){
let a=!1;if(0!==D.size)a=!0;else for(const b of C.values())if(b.m_checkbox_el.checked){a=!0;break}(0,i.TT)(y).disabled=!a}
function M(){E=!0,(0,i.TT)(y).disabled=!0,(0,i.TT)(z).disabled=!0;for(const a of C.values())a.m_checkbox_el.disabled=!0;return N
}function N(){E=!1;for(const a of C.values())a.m_checkbox_el.disabled=!1;(0,i.TT)(z).disabled=!1,L()}function O(){if(B)return P
;const a=l("div",{className:"action-progress-overlay-circle size48"});return(0,i.TT)(w).appendChild(a),B=a,P}function P(){
null==B||B.remove(),B=null}function Q(){(0,i.TT)(A).innerText="",(0,i.TT)(A).classList.add("hidden"),R()}function R(){
if(!u)return;const a=(0,i.TT)(w).getBoundingClientRect();u(a.width,a.height)}}function n(a,b,c,d,e){
const f=a.LocalizeString,g=m(a,b,c,d,e);return{Create:async function(a,b){const c=await g.Create(a,b);return l("div",{
className:"duplicates-page setup-page"},l("div",{className:"header-section"},l("div",{className:"header-text-section"},l("div",{
className:"title-text"},await f("DuplicatesDialog_WindowTitle")))),c)},OnAfterShow:function(){g.OnAfterShow()},
OnBeforeHide:function(){g.OnBeforeHide()},Focus:function(){g.Focus()},Dispose:function(){}}}},16007:function(a,b,c){"use strict"
;c.d(b,{N:function(){return i}});var d=c(47333),e=c(32105),f=c(63956),g=c(4153),h=(c(13117),c(91764)._);function i(a){var b
;const{invitations:c,requests:i,ea:j,viewApi:k,serverUrl:l}=a;let m=null
;const n=!!i,o=null!==(b=n?i:c)&&void 0!==b?b:[],p=new Set;let q=null,r=null,s=null,t=null,u=null;const v=[],w=500;return{
Create:async function(a,b){
const c=(0,d.sU)(l),f=await k.LocalizeString("EmergencyAccess_Title"),g=await k.LocalizeString("EmergencyAccessContactConfirmationDescription_Text"),i=await k.LocalizeString("EmergencyAccessDataAccessConfirmationDescription_Text"),j=n?await k.LocalizeString("EmergencyAccess_GrantAccess_Title"):await k.LocalizeString("Cmd_Accept_Key"),w=n?await k.LocalizeString("EmergencyAccess_DenyAccess_Text"):await k.LocalizeString("Cmd_Reject_Key"),B=await k.LocalizeString("Cmd_Later_Flat"),C=[]
;for(const d of o){const a=d.name,b=d.email,c=a?a===b?a:a+" ("+b+")":b;let f;const g=h("div",{className:"item-row"},f=h(e.b_,{
text:c,checked:!0,onchange:()=>{f.GetChecked()?p.add(d):p.delete(d),A()}}));C.push(g),v.push(f),p.add(d)}const D=h("div",{
className:"ea-invites-page setup-page receive-invite-page"},h("div",{className:"header-section"},h("div",{
className:"header-text-section"},h("div",{className:"title-text"},f))),u=h("div",{
className:"action-progress-overlay-circle size64 hidden"}),h("div",{className:"hint-text rfo-server-title-text"
},c||""),h("div",{className:"normal-text invite-text"},n?i:g),h("div",{className:"items-container"},C),t=h("div",{
className:"error-text"}),h("div",{className:"page-flexy-space"}),h("div",{className:"buttons-section"},h("div",{
className:"padding-div"}),q=h("input",{type:"button",className:"important-button normal-button",value:j,onclick:x
}),r=h("input",{type:"button",className:"regular-button normal-button",value:w,onclick:y}),s=h("input",{type:"button",
className:"regular-button normal-button",value:B,onclick:z})));return m=a,D},OnAfterShow:function(){},OnBeforeHide:function(){},
Focus:function(){(0,g.TT)(q).focus()},Dispose:function(){}};function x(){E(),(0,f.D$)((()=>async function(){try{
for(const a of p)if(n){const b=a.accountId;await j.GrantEmergencyAccess(b,null)}else{const b=a.accountId
;await j.AcceptEmergencyContactInvitation(b,null)}}catch(a){return void D((0,d.Qo)(a))}(0,g.TT)(m)()}()),F,w,B)}function y(){
E(),(0,f.D$)((()=>async function(){try{for(const a of p)if(n){const b=a.accountId;await j.RevokeEmergencyAccess(b,null)}else{
const b=a.accountId;await j.RejectEmergencyContactInvitation(b,null)}}catch(a){return void D((0,d.Qo)(a))}(0,g.TT)(m)()
}()),F,w,B)}function z(){(0,f.D$)((()=>async function(){(0,g.TT)(m)()}()),F,w,B)}function A(){const a=0===p.size;(0,
g.TT)(q).disabled=a,(0,g.TT)(r).disabled=a}function B(){return(0,g.TT)(u).classList.remove("hidden"),C}function C(){(0,
g.TT)(u).classList.add("hidden")}function D(a){(0,g.TT)(t).textContent=a}function E(){(0,g.TT)(t).textContent=""}function F(){
return(0,g.TT)(q).disabled=!0,(0,g.TT)(r).disabled=!0,(0,g.TT)(s).disabled=!0,v.forEach((a=>a.Enable(!1))),G}function G(){(0,
g.TT)(q).disabled=!1,(0,g.TT)(r).disabled=!1,(0,g.TT)(s).disabled=!1,v.forEach((a=>a.Enable(!0)))}}},61625:function(a,b,c){
"use strict";c.d(b,{A:function(){return e}});var d=c(91764)._;function e(){return{Create:async function(){return d("div",{
id:"loading-page",className:"loading-page-fixed-size"},d("div",{className:"action-progress-overlay-circle size64"}))},
OnAfterShow:function(){},OnBeforeHide:function(){},Focus:function(){},Dispose:function(){}}}},48798:function(a,b,c){"use strict"
;c.d(b,{H:function(){return Q}})
;var d=c(62806),e=c(50790),f=c(19390),g=c(79607),h=c(21132),i=c(47287),j=c(83131),k=c(87965),l=c(3566),m=c(47333),n=c(95697),o=c(4234),p=c(62376),q=c(78949),r=c(67793),s=c(88579),t=c(71644),u=c(54811),v=c(12131),w=c(62851),x=c(84479),y=c(59283),z=c(31173),A=c(63956),B=c(32105),C=c(58605),D=c(74363),E=c(21176),F=c(88262),G=c(13113),H=c(12190),I=c(69893),J=c(78440),K=c(37495),L=c(73863),M=c(4153),N=c(95399),O=(c(13117),
c(84224)),P=c(91764)._;function Q(a){
const{app:b,viewNavigator:c,service:Q,data:R,dataItemDisplayNameProvider:S,initialIdentityProvider:T,usageInfo:U,commands:V,securityWarningsManager:W,sharing:X,passwordsHistory:Y,breachMon:Z,options:aa,settings:ab,policies:ac,view:ad,os:ae,extensionInfo:af,clipboard:ag,screenshot:ah,http:ai,rng:aj,canUseWin32LoginsAndBookmarks:ak}=a
;let al,am=!1,an=!1,ao=!0,ap=0,aq=null,ar=!1,as=!0,at=null,au=null,av="",aw=null,ax=!1,ay=1,az=null,aA=null,aB=null,aC=null,aD=!1,aE=null,aF=null,aG=null,aH="",aI="",aJ="",aK="",aL="",aM="",aN="",aO="",aP=null,aQ=null,aR=null,aS=null,aT=null,aU=null,aV=null,aW=null,aX=!1,aY=!1,aZ=null,a0=""
;const a1=(0,J.tG)(),a2=(0,J.tG)();let a3=!1,a4=null,a5=0,a6=null,a7=2,a8=null;const a9=new Map,ba=new Map;let bb=1,bc=null
;const bd=new Map,be=new Map,bf=5
;let bg,bh=null,bi=null,bj=null,bk="",bl="",bm="",bn="",bo="",bp=null,bq=!1,br=!1,bs=null,bt=2,bu=null,bv="",bw=null,bx=null
;const by=(0,J.tG)(),bz=new Map;let bA="",bB="",bC="",bD="",bE="",bF="",bG="",bH="",bI="",bJ="",bK="",bL="",bM=""
;const bN=100,bO=100,bP=400;let bQ=null;const bR="undefined"!=typeof IntersectionObserver;let bS=null;const bT=(0,J.E5)()
;let bU=null;const bV=21;let bW=!1,bX=null,bY="",bZ=null,b0=null,b1=null,b2=null,b3=null,b4=null;const b5=(0,
J.tG)(),b6=100,b7=100
;let b8="",b9="",ca="",cb="",cc="",cd="",ce="",cf="",cg=!1,ch=null,ci=0,cj="",ck=null,cl=null,cm=null,cn=null,co=null,cp=null,cq=null,cr=!1,cs=!1,ct=!1,cu=null
;const cv=(0,J.tG)();let cw=null,cx=null,cy=null;const cz=5,cA=25,cB=(0,J.tG)();let cC=[],cD="",cE="",cF="",cG="",cH="",cI=""
;const cJ=(0,J.tG)();let cK=null,cL=0,cM=null,cN=null,cO=null,cP=null,cQ=null,cR=null,cS=null,cT=null
;const cU=new Map,cV=300,cW=20,cX="popup-search-"+(0,L.Be)(),cY=(0,J.tG)();let cZ=null,c0=null,c1=null,c2=null;const c3=(0,
J.tG)(),c4=(0,M.kA)()
;let c5=null,c6=null,c7=null,c8=!0,c9="",da="",db="",dc="",dd="",de="",df="",dg="",dh="",di="",dj=[],dk="",dl="";const dm=(0,
J.tG)(),dn=new Map,dp=new WeakSet;let dq=null;const dr=1e3,ds=1e3
;let dt=null,du=!1,dv="",dw="",dx="",dy="",dz="",dA=null,dB="",dC="";const dD=(0,J.tG)()
;let dE=null,dF=null,dG=!1,dH=null,dI=null,dJ=!1,dK=null,dL=null;const dM=(0,l.Eg)();let dN="",dO="",dP=null,dQ=!1
;const dR=["mousedown","wheel","keydown"];function dS(a){dQ=!0,dR.forEach((a=>window.removeEventListener(a,dS,!0)))}
dR.forEach((a=>window.addEventListener(a,dS,!0)));const dT={Create:async function(){var a;am=await gg(),an=b.IsNativeApp(),
as&&await async function(){let a=await aa.GetValue("RoboFormOpensWith",1);const b=await ad.storage.Get({MainPageState:null,
LastPopupCloseTime:null}),c=b.LastPopupCloseTime,d=b.MainPageState;if(null!==c&&d){(0,N.t2)()-c<120&&(a=0)}switch(a){case 1:
bt=2,a5=0;break;case 2:bt=2,a5=1;break;case 3:bt=1,a5=0;break;case 4:bt=1,a5=1;break;case 5:bt=0;break;default:bt=function(a){
switch(null==a?void 0:a.itemsListType){case 0:return 0;case 1:return 1;case 2:default:return 2;case 3:return 3;case 4:return 4
;case 5:return 5}}(d),a5=function(a){switch(null==a?void 0:a.itemsListMode){case 0:default:return 0;case 1:return 1;case 2:
return 2}}(d)}ci=function(a){switch(null==a?void 0:a.fillIdViewType){case 0:default:return 0;case 2:return 2;case 1:return 1
;case 3:return 3}}(d),cj=function(a){var b;return null!==(b=null==a?void 0:a.fillIdPath)&&void 0!==b?b:""}(d)}()
;const c=await aa.Get({ShowBookmarksAndLoginsTogether:!1,FillEmptyFieldsOnlyIdentity:!1,DontShowCompromisedDataIcons:!1,
AccountClientReadOnly:!1,AccountClientBlocked:!1});ap=(0,n.z)(c),cr=c.FillEmptyFieldsOnlyIdentity,cs=cr,
bq=c.ShowBookmarksAndLoginsTogether,3===bt&&bq&&(bt=2);const e=null!==(a=c.DontShowCompromisedDataIcons)&&void 0!==a&&a;ao=!e
;const f=await ad.LocalizeString("Cmd_StartPage_Tip"),g=await ad.LocalizeString("MainPage_Settings_Button_Tip")
;av=await ad.LocalizeString("MainPage_LoginsTab_Search_Placeholder"),aH=await ad.LocalizeString("MainPage_ShowAll_Logins_Text"),
aI=await ad.LocalizeString("MainPage_ShowAll_Identities_Text"),aJ=await ad.LocalizeString("MainPage_ShowAll_Bookmarks_Text"),
aK=await ad.LocalizeString("MainPage_ShowAll_Safenotes_Text"),
aL=await ad.LocalizeString("MainPage_ShowAll_NativeMenu_Tip",[await ad.LocalizeString((0,m.Y5)(1,!0))]),
aM=await ad.LocalizeString("MainPage_ShowAll_NativeMenu_Tip",[await ad.LocalizeString((0,m.Y5)(5,!0))]),
aN=await ad.LocalizeString("MainPage_ShowAll_NativeMenu_Tip",[await ad.LocalizeString((0,m.Y5)(2,!0))]),
aO=await ad.LocalizeString("MainPage_ShowAll_NativeMenu_Tip",[await ad.LocalizeString((0,m.Y5)(7,!0))]),
dd=await ad.LocalizeString("Page_ListItem_MoreActions_Tip"),de=await ad.LocalizeString("Item_ClickToFill_Tip"),
df=await ad.LocalizeString("Item_ClickToLogin_Tip"),dg=await ad.LocalizeString("Identity_ClickToView_Tip"),
dh=await ad.LocalizeString("Safenote_ClickToView_Tip"),di=await ad.LocalizeString("Item_ClickToOpen_Tip"),
bB=await ad.LocalizeString("Cmd_Logins_Flat"),bA=await ad.LocalizeString("MainPage_Pinned_Header_Text"),
bC=await ad.LocalizeString("RoboformType_Identities"),bD=await ad.LocalizeString("RoboformType_Bookmarks"),
bE=await ad.LocalizeString("RoboformType_Safenotes"),bF=await ad.LocalizeString("Editor_Cmd_Selector_All_Flat"),
bG=await ad.LocalizeString("MainPage_Items_Button_Pinned_Tip"),bH=await ad.LocalizeString("MainPage_Items_Button_Logins_Tip"),
bI=await ad.LocalizeString("MainPage_Items_Button_Identities_Tip"),
bJ=await ad.LocalizeString("MainPage_Items_Button_Bookmarks_Tip"),
bK=await ad.LocalizeString("MainPage_Items_Button_Safenotes_Tip"),bL=await ad.LocalizeString("MainPage_Items_Button_All_Tip"),
bM=await ad.LocalizeString("CompromisedItemButton_Tooltip"),dk=await ad.LocalizeString("Login_OneTimeCode_Text"),
dl=await ad.LocalizeString("Login_OneTimeCode_Copy_Tip")
;const h=await ad.LocalizeString("MainPage_Recent_Header_Text"),i=await ad.LocalizeString("MainPage_Popular_Header_Text"),j=await ad.LocalizeString("MainPage_AllItems_Header_Text"),k="tab-all",o="all-tabpanel",p=await ad.LocalizeString("MainPage_FillLogins_Button_Text"),q=await ad.LocalizeString("MainPage_FillLogins_Button_Tip")
;b8=await ad.LocalizeString("MainPage_FillLoginsTab_NoLoginsForPage_Text"),
b9=await ad.LocalizeString("MainPage_FillLoginsTab_NoLoginsForDomain_Text"),
ca=await ad.LocalizeString("MainPage_CreateLoginInstruction_Top_Text"),
cb=await ad.LocalizeString("MainPage_CreateLoginInstruction_Option1_Text"),
cc=await ad.LocalizeString("MainPage_CreateLoginInstruction_Option2_Text"),
cd=await ad.LocalizeString("MainPage_CreateLoginInstruction_Option3_Text"),
ce=await ad.LocalizeString("MainPage_CreateLoginInstruction_Option3_Import_Text"),
cf=await ad.LocalizeString("MainPage_CreateLoginInstruction_LearnMore_Link")
;const r=await ad.LocalizeString("Dropdown_Items_Label"),s="tab-fill-logins",t="fill-logins-tabpanel"
;a0=await ad.LocalizeString("MainPage_FillIdentities_Button_Text"),cF=await ad.LocalizeString("MainPage_Create_Identity_Tip"),
cG=await ad.LocalizeString("MainPage_ViewAllIdentities_Tip"),
an?(cH=await ad.LocalizeString("MainPage_FillIdentitiesTab_IdentityView_Native_Top_Text"),
cI=await ad.LocalizeString("MainPage_FillIdentitiesTab_IdentityView_Limited_Native_Top_Text")):(cH=await ad.LocalizeString("MainPage_FillIdentitiesTab_IdentityView_Top_Text"),
cI=await ad.LocalizeString("MainPage_FillIdentitiesTab_IdentityView_Limited_Top_Text"))
;const u=await ad.LocalizeString("Cmd_FillForms_Flat"),v=await ad.LocalizeString("Cmd_Edit_Flat"),w=await ad.LocalizeString("Cmd_FillEmptyOnly_Key")
;cD=await ad.LocalizeString("MainPage_FillIdentitiesTab_EmptyMatch_Text"),
cE=await ad.LocalizeString("MainPage_FillIdentitiesTab_CreateFirst_Text")
;const x=await ad.LocalizeString("MainPage_FillIdentitiesTab_Identity_Dropdown_Label"),y=await ad.LocalizeString("MainPage_FillIdentitiesTab_Identity_Options_Label"),z=await ad.LocalizeString("MainPage_FillIdentitiesTab_Identity_Region_Label"),A="tab-fill-identity",C="fill-id-tabpanel"
;bk=await ad.LocalizeString("MainPage_FillLoginsTab_Search_Placeholder"),
bl=await ad.LocalizeString("MainPage_FillLoginsTabDomain_Search_Placeholder"),
bm=await ad.LocalizeString("MainPage_FillLoginsTabAll_Search_Placeholder"),
bo=await ad.LocalizeString("MainPage_FillIdentitiesTabAll_Search_Placeholder"),
bn=await ad.LocalizeString("MainPage_FillIdentitiesTabMatch_Search_Placeholder"),
dv=await ad.LocalizeString("MainPage_CreateNewButton_File_Tip"),
dw=await ad.LocalizeString("MainPage_CreateNewButton_Login_Tip"),
dx=await ad.LocalizeString("MainPage_CreateNewButton_Bookmark_Tip"),
dy=await ad.LocalizeString("MainPage_CreateNewButton_Safenote_Tip"),
dz=await ad.LocalizeString("MainPage_CreateNewButton_Identity_Tip"),
dB=await ad.LocalizeString("MainPage_SaveButton_SaveForms_Tip"),
dC=await ad.LocalizeString("MainPage_SaveButton_SaveBookmark_Tip")
;const D=await ad.LocalizeString("Search_Dialog_ResultList_Text"),E=await ad.LocalizeString("PassGen_Generated_Tip")
;c9=await ad.LocalizeString("PassAud_PwdStrengthStrong"),da=await ad.LocalizeString("PassAud_PwdStrengthGood"),
db=await ad.LocalizeString("PassAud_PwdStrengthMedium"),dc=await ad.LocalizeString("PassAud_PwdStrengthWeak")
;const F=await ad.LocalizeString("PassGen_Copy_Tip"),G=await ad.LocalizeString("PassGen_Generate"),H=await ad.LocalizeString("PassGen_ShowAdvanced")
;dN=await ad.LocalizeString("Notification_Password_Copied_Text"),
dO=await ad.LocalizeString("Notification_Password_Filled_Text"),dj=[...await Y.GetHistory(null)],
dj.length>0?(c8=0===dj[0].m_generator_type,await ab.SetValue("PassGenIsWord",c8)):c8=await ab.GetValue("PassGenIsWord",!0)
;let I,J,K,L,O,Q,S,T,U,V,W;c2=(0,d.hE)(ad,c8,gm,gn,null),aq=P("div",{className:"main-page unselectable",onkeypress:e7,
onkeydown:e5},dq=P("div",{className:"action-progress-overlay-circle size48 hidden"}),P("div",{className:"page-header"},P("div",{
className:"button-section"},P("div",{className:"start-button",title:f,role:"button",ariaLabel:f,onclick:fq},P("div",{
className:"icon icon-start"}))),at=P("div",{className:"search-query"},au=P("input",{className:"search-input",type:"search",
placeholder:av,autocomplete:"off",autocorrect:"off",autocapitalize:"off",spellcheck:!1,oninput:eP,onfocus:eK,onblur:eL,
onkeydown:e4,onkeypress:e6,onmouseout:eM,onmouseover:eN,oncontextmenu:eO})),P("div",{className:"button-section"},P("div",{
className:"password-generator-button",title:await ad.LocalizeString("Cmd_Password_Generator_Flat"),onclick:fr,role:"button",
ariaLabel:await ad.LocalizeString("Cmd_Password_Generator_Flat")},P("div",{className:"icon icon-password-generator"
})),aw=P("div",{className:"settings-button",title:g,role:"button",ariaHasPopup:"true",ariaLabel:g,onclick:fs},P("div",{
className:"icon icon-3dots"})))),P("div",{className:"navigation"},aE=P("div",{className:"items-native-menu-button",onclick:ft
},aF=P("div",{className:"icon icon-logins"}),aG=P("div",{className:"text"},aH),P("div",{className:"menu-icon"})),az=P("div",{
className:"tab-selector",role:"tablist"},aA=P("div",{className:"tab-button items-lists",id:k,role:"tab","aria-controls":o,
title:bH},P("div",{className:"button button-with-dropdown",onclick:dU},aC=P("div",{className:"icon icon-logins"}),aB=P("div",{
className:"text"},bB),P("div",{className:"dropdown-button dropdown-icon",role:"button",ariaHasPopup:"true",ariaLabel:r
}))),P("div",{className:"tab-button-separator"}),aQ=P("div",{className:"tab-button fill-logins",id:s,role:"tab",
"aria-controls":t,title:q,onclick:e9},P("div",{className:"button"},P("div",{className:"icon icon-fill"},aR=P("div",{
className:"fill-indicator hidden"})),P("div",{className:"text"},p))),U=P("div",{className:"tab-button-separator"}),aS=P("div",{
className:"tab-button fill-id",id:A,role:"tab","aria-controls":C,onclick:ei},P("div",{className:"button button-with-dropdown"
},aT=P("div",{className:"icon fill-identity-icon"},aZ=P("div",{className:"fill-indicator hidden"})),P("div",{
className:"identity-name-placeholder-container"},aV=P("div",{className:"text identity-name-placeholder"},a0),P("div",{
className:"identity-name-container"},aU=P("div",{className:"text identity-name"},a0),aW=P("div",{
className:"dropdown-button dropdown-icon",role:"button",ariaHasPopup:"true",ariaLabel:x})))))),a4=P("div",{
className:"list-mode-selectors"},a6=P("div",{className:"items-lists list-mode-selector hidden",role:"tablist"},I=P("div",{
className:"list-mode-selector-button",role:"tab",onclick:()=>d2(0)},P("div",{className:"list-mode-selector-text"
},i)),J=P("div",{className:"list-mode-selector-button",role:"tab",onclick:()=>d2(1)},P("div",{
className:"list-mode-selector-text"},h)),K=P("div",{className:"list-mode-selector-button",role:"tab",onclick:()=>d2(2)
},P("div",{className:"list-mode-selector-text"},j))),a8=P("div",{className:"fill-logins list-mode-selector hidden",
role:"tablist"},L=P("div",{className:"list-mode-selector-button",role:"tab",onclick:()=>fb(0)},P("div",{
className:"list-mode-selector-text"},await ad.LocalizeString("MainPage_FillLoginsTab_MatchingLogins_Button_Text"))),O=P("div",{
className:"list-mode-selector-button",role:"tab",onclick:()=>fb(1)},P("div",{className:"list-mode-selector-text"
},await ad.LocalizeString("MainPage_FillLoginsTab_SameDomain_Button_Text"))),Q=P("div",{className:"list-mode-selector-button",
role:"tab",onclick:()=>fb(2)},P("div",{className:"list-mode-selector-text"
},await ad.LocalizeString("MainPage_FillLoginsTab_AllLogins_Button_Text")))),bc=P("div",{
className:"fill-id list-mode-selector hidden",role:"tablist"},S=P("div",{className:"list-mode-selector-button",role:"tab",
onclick:()=>em(0)},P("div",{className:"list-mode-selector-text"
},await ad.LocalizeString("MainPage_FillIdentitiesTab_MatchingIdentities_Button_Text"))),T=P("div",{
className:"list-mode-selector-button",role:"tab",onclick:()=>em(1)},P("div",{className:"list-mode-selector-text"
},await ad.LocalizeString("MainPage_FillIdentitiesTab_AllIdentities_Button_Text")))))),bh=P("div",{
className:"fill-search-query-section hidden"},bi=P("div",{className:"fill-search-query"},bj=P("input",{
className:"fill-search-input",type:"search",placeholder:"",autocomplete:"off",autocorrect:"off",autocapitalize:"off",
spellcheck:!1,oninput:eV,onfocus:eQ,onblur:eR,onkeydown:e4,onkeypress:e6,onmouseout:eS,onmouseover:eT,oncontextmenu:eU
}))),bp=P("div",{className:"tab-views"},bs=P("div",{id:o,role:"tabpanel","aria-labelledby":k,
className:"items-lists tab-view hidden"},bu=P("div",{className:"loading-view"},P("div",{
className:"action-progress-overlay-circle size48"})),bw=P("div",{className:"list"})),bX=P("div",{id:t,role:"tabpanel",
"aria-labelledby":s,className:"fill-logins tab-view hidden"},bZ=P("div",{className:"loading-view"},P("div",{
className:"action-progress-overlay-circle size48"})),b0=P("div",{className:"list hidden"}),b1=P("div",{className:"list hidden"
}),b3=P("div",{className:"folder-selector hidden"}),b2=P("div",{className:"list hidden"})),ch=P("div",{id:C,role:"tabpanel",
"aria-labelledby":A,className:"fill-id tab-view hidden"},ck=P("div",{className:"loading-view"},P("div",{
className:"action-progress-overlay-circle size48"})),cl=P("div",{className:"identity-view hidden"},P("div",{
className:"identity-view-actions"},P("div",{className:"header flex-row"},cq=P("div",{
className:"identity-view-top-text flex-cell"},cH),cm=P("div",{className:"more-actions-button",role:"button",ariaHasPopup:"true",
ariaLabel:y},P("div",{className:"more-actions-icon image size20"}))),V=P("div",{className:"buttons"},P("div",{
className:"button-section"},co=P("button",{className:"normal-button regular-button",onclick:eE},u)),P("div",{
className:"button-section"},cp=P("button",{className:"normal-button regular-button",onclick:eF},v))),W=P("div",{
className:"fill-empty-section"},P("div",{className:"check-label"},cn=P(B.b_,{checked:cs,text:w,disabled:0!==ap,onchange:eG
})))),cu=P("div",{className:"identity-data-view",role:"region",ariaLabel:z})),cx=P("div",{className:"list hidden"}),cw=P("div",{
className:"list hidden"})),dA=P("div",{className:"save-button hidden",title:dB,role:"button",ariaLabel:dB,onclick:fJ
}),dt=P("div",{className:"create-new-button hidden",title:dv,role:"button",ariaLabel:dv,onclick:fD})),cM=P("div",{
className:"search-results-section hidden",role:"region",ariaLabel:D},cN=P("div",{className:"loading-view hidden"},P("div",{
className:"action-progress-overlay-circle size48"})),cO=P("div",{className:"search-results-view hidden"},cP=P("div",{
className:"list"}))),cZ=P("div",{className:"passgen-section hidden"},P("div",{className:"passgen-filling-option",onclick:gj
},P("div",{className:"passgen-icon",title:de}),P("div",{className:"generated-password-container",title:de},P("div",{
className:"generated-password-title"},E),c0=P("div",{className:"generated-password"},"")),P("div",{className:"passgen-buttons"
},P("div",{className:"button passgen-copy-button",title:F,role:"button",onclick:gk}),c6=P("div",{
className:"button passgen-new-button",title:G,role:"button",onclick:gl}),P("div",{className:"button passgen-settings-button",
title:H,role:"button",onclick:fr})),c1=P(l.Xi,{className:"passgen-score-meter hidden",state:"weak",text:""})),P("div",{
className:"passgen-settings"},await c2.Create())),dE=P("div",{className:"manage-auto-fill-on-domain flex-row hidden"
}),dH=P("div",{className:"manage-auto-save-on-domain flex-row hidden"}),dK=P("div",{className:"rate-extension flex-row hidden"
}),dL=P("div",{className:"upgrade-messages flex-row hidden"}),dM),an&&(gz(dA),gz(aQ),gz(U),(0,M.TT)(aS).style.maxWidth="60%",
gz(V),gz(W));if(bz.clear(),bz.set(0,I),bz.set(1,J),bz.set(2,K),a9.clear(),a9.set(0,L),a9.set(1,O),a9.set(2,Q),bd.clear(),
bd.set(0,S),bd.set(1,T),as){const a=await b.ShouldActivateFillUI(null);a.m_activate_logins?(a7=0,fa(),
bb=0):a.m_activate_identities?(bb=0,ek(),a7=2):a.m_password_generator?(ek(),bb=0,a7=2):dV()}else fZ();return fu(),fT(),fU(),
fX(),fY(),d0(),d3(),dW(),fc(),fd(),eq(),en(),eo(),fp(),fI(),fG(),fS(),fn(),fo(),ep(),gr(),
ad.onNotificationFromBackgroundScript.Add(f8),R.onDataChanged.Add(f9),aa.AddOnChangeListener(ga),ar=!0,(0,M.TT)(aq)},
OnAfterShow:function(){b.IsNativeUIAvailable()&&"mac"===ae&&window.addEventListener("mousedown",fv,!0)},OnBeforeHide:function(){
window.removeEventListener("mousedown",fv),dM.Hide(),dP&&(dP.Hide(0),dP=null);dm.Cancel()},Focus:function(){(0,M.TT)(au).focus()
},Dispose:function(){cU.clear(),cy=null,b4=null,bQ=null,bx=null,ad.onNotificationFromBackgroundScript.Remove(f8),
R.onDataChanged.Remove(f9),aa.RemoveOnChangeListener(ga),cY.Cancel(),by.Cancel(),cJ.Cancel(),b5.Cancel(),cv.Cancel(),
cB.Cancel(),dD.Cancel(),c3.Cancel(),ar=!1}};return dT;function dU(a){1===ay?function(a){aD||function(){aD=!0;const a=(0,
M.TT)(aA).getBoundingClientRect(),b=a.bottom+1,c=a.left+7,d={height:0,width:0,top:b,bottom:b,y:b,x:c,right:c,left:c}
;function e(){const a=(0,k.NI)((0,M.TT)(aA));return a.onHide=g,a.onShow=f,a}function f(a){}function g(a){setTimeout((function(){
aD=!1,(0,M.TT)(aA).classList.remove("highlighted")}),300)}dP=(0,k.Lj)(d,(()=>async function(){const a=[]
;(await U.GetUsageInfoList(0,1,null)).length>0&&(a.push(eh(0)),a.push("separator"));a.push(eh(1)),a.push(eh(2)),
bq||a.push(eh(3));return a.push(eh(4)),a.push("separator"),a.push(eh(5)),a}()),e(),(function(a,b){return(0,
M.TT)(aq).style.width=(0,z.Md)(a),(0,M.TT)(aq).style.height=(0,z.Md)(b),(0,M.TT)(aA).getBoundingClientRect()}),gs)}(),
a.stopPropagation()}(a):dV()}function dV(){ay=1,gh(),e3(),d0(),fu(),dW(),fI(),fG(),fS(),d4(bt,a5)}function dW(){
1===ay&&br&&gz(bu)}function dX(){const a=br;br=!0,a||dW()}function dY(a){bg=a,1===ay&&(bg?gA(a4):gz(a4))}async function dZ(a){
let b;try{b=0!==(await R.List("",0,a)).length}catch(c){if((0,I.r5)(c,I.kd))throw c;b=!1}dY(b)}function d0(){const a=eg(bt)
;gw(aB,a.m_button_text),gv(aA,a.m_button_tooltip||""),gx(aA,a.m_button_tooltip||""),d1((0,M.TT)(aC),"icon-",a.m_button_style),
er()}function d1(a,b,c){const d=a.classList;for(let e=0;e<d.length;e++){const a=d[e];if(a.startsWith(b)){d.remove(a),d.add(c)
;break}}}function d2(a){a5!==a&&(a5=a,gh(),d3(),d4(bt,a5))}function d3(){
for(const[a,b]of bz)a===a5?(b.classList.add("selected"),gy(b,"true")):(b.classList.remove("selected"),gy(b,"false"))}
function d4(a,b){by.Start((async c=>{await async function(a,b,c){if(0===a)return d5(a,1,c);switch(b){case 0:return d5(a,3,c)
;case 1:return d5(a,0,c);case 2:return async function(a,b){var c;let d,e=!1,f=!1
;bQ&&bQ.m_list_mode===a5&&bQ.m_items_type===bt?(e=!0,d=Object.assign({},bQ)):f=!0;const g=await R.List(bv,0,b);let h
;const i=d6(a);switch(i){case 1:h=bq?new Set([8,1,2]):new Set([8,1]);break;case 0:case 9:h=new Set([8,1,2,3,4,5,6,7]);break
;default:h=new Set([8,i])}const j=g.filter((a=>h.has(a.type)));if(b.ThrowIfShouldStop(),0===j.length&&!bv)return ea(),
await ee(),bQ=null,dX(),void await dZ(b);dY(!0),f&&ea();const k=new Map,m=[];for(let n=0;n<j.length;n++){const a=j[n]
;if(e&&d&&n<d.m_items.length){const b=d.m_items[n];if(b.m_path===a.path&&b.m_mod_time===a.mod&&b.m_received===a.received){
m.push(b);const a=d.m_views.get(b.m_element);a&&k.set(b.m_element,a);continue}}const b=fw(a),f=gB(a.type,a.path)
;let g,h,i,o,p,q,r;const s=1===a.type||2===a.type?"icon-section with-border":"icon-section",t=P("div",{
className:"list-item multiple-rows"},P("div",{className:"list-item-main-row"},g=8===a.type?P("div",{className:"icon-text",
role:8===a.type?"button":"link",onclick:()=>{8===a.type&&(bv=a.path,d4(bt,2))},oncontextmenu:b=>f0(a.path,t,b,!1)},P("div",{
className:s,ariaHidden:"true"},h=(0,l.AG)(a.path,a.type),null!==b?P("div",{className:b}):null),P("div",{className:"path-view"
},P("div",{className:"text"},P("span",null,(0,G.tM)((0,G._p)(a.path),bO))))):P("div",{className:"icon-text",role:"link",
onclick:()=>{f1(a,!1,!1)},oncontextmenu:b=>f0(a.path,t,b,!1)},P("div",{className:s,ariaHidden:"true"},h=f?(0,
l.qc)(a.path,a.type,gC):(0,l.AG)(a.path,a.type),null!==b?P("div",{className:b}):null),P("div",{className:"path-view"},f?(0,
l.Xl)(a.path,bO,bN,!1,gC):(0,l.v$)(a.path,bO,bN,!1)),1===a.type&&P("div",{className:"action-icon image login-action-icon"
})||2===a.type&&P("div",{className:"action-icon image goto-action-icon"})||P("div",{
className:"action-icon image view-action-icon"})),p=gt(P("div",{className:"more-actions-button hidden",title:dk,role:"button"
},P("div",{className:"icon"},q=P("div",{className:"totp-timer"}))),!1,(()=>t)),r=ao?(0,l.oG)(a,bM,f7):null,i=P("div",{
className:"more-actions-button",title:dd,role:"button",ariaHasPopup:"true",ariaLabel:dd,onclick:b=>f6(b,t,i,a.path,!1)
},P("div",{className:"icon more-actions-icon image"}))),o=1===a.type?P("div",{className:"list-item-data-row hidden"}):null)
;if(m.push({m_path:a.path,m_mod_time:a.mod,m_received:a.received,m_element:t}),f)(0,J.fI)((async()=>{
const b=await gC(a.path),c=b.length>bO+bN;fx(g,a.type,!1,c,(0,G.tM)(b,bP))})());else{const b=8===a.type?(0,G._p)(a.path):(0,
G.HE)((0,G._p)(a.path)),c=b.length>bO+bN;fx(g,a.type,!1,c,(0,G.tM)(b,bP))}if(k.set(t,{m_item_el:t,m_item_icon_text_el:g,
m_item_icon_el:h,m_item_data_view_el:o,m_item_data_view_expand_button_el:p,m_totp_timer:q,m_compromised_button_el:r,
m_item_info:a}),!e||!d||n>=d.m_items.length)fz((0,M.TT)(bw),t);else{const a=d.m_items[n].m_element
;null===(c=a.parentElement)||void 0===c||c.replaceChild(t,a)}}if(e&&d&&d.m_items.length>j.length){
for(let a=j.length;a<d.m_items.length;a++){d.m_items[a].m_element.remove()}fB((0,M.TT)(bw))}if(bv){
if(!d||d.m_all_items_selected_folder!==bv){d9();const a=[],b=bv.split("/");for(let c=0;c<b.length;c++){
const d=b[c],e=0===c?await ad.LocalizeString("HomeFolder"):d,f=P("div",{className:"folder-part"},P("div",{
className:"folder-name",onclick:function(){const a=b.slice(0,c+1).join("/");a!==bv&&(bv=a,d4(bt,2))}
},e),c!==b.length-1?P("div",{className:"folder-separator"},">"):null);a.push(f)}bx=P("div",{className:"folder-selector"},a),(0,
M.TT)(bs).insertBefore((0,M.TT)(bx),(0,M.TT)(bw))}}else d9();dX(),bQ={m_list_mode:a5,m_items_type:bt,
m_all_items_selected_folder:bv,m_items:m,m_views:k},bs&&bw&&0!==k.size&&(0,J.fI)(fC(bw,k,[dA,dt],b));er()}(a,c)}}(a,b,c)}))}
async function d5(a,c,d){var e;let f,g=!1,h=!1;bQ&&bQ.m_list_mode===a5&&bQ.m_items_type===bt?(g=!0,f=Object.assign({},bQ)):h=!0
;const i=d6(a),j=await b.GetUsageInfoListItems(1===i&&bq?[1,2]:[i],c,d);if(d.ThrowIfShouldStop(),d9(),
0===j.length)return 0===a?(bt=2,gh(),d0(),fu(),fI(),fG(),fS(),void d4(bt,a5)):(ea(),await ee(),bQ=null,dX(),void await dZ(d))
;dY(!0),h&&ea();const k=(0,m.Z7)(j),n=new Map,o=[];for(let b=0;b<j.length;b++){const a=j[b],c=a.path
;if(g&&f&&b<f.m_items.length){const d=f.m_items[b];if(d.m_path===c&&d.m_mod_time===a.mod&&d.m_received===a.received){o.push(d)
;const a=f.m_views.get(d.m_element);a&&n.set(d.m_element,a);continue}}const d=(0,G.HE)((0,G._p)(c)),h=fw(a),i=gB(a.type,c)
;let m,p,q,r,s,t,u;const v=1===a.type||2===a.type?"icon-section with-border":"icon-section",w=P("div",{
className:"list-item multiple-rows"},P("div",{className:"list-item-main-row"},m=P("div",{className:"icon-text",role:"link",
onclick:()=>f1(a,!1,!1),oncontextmenu:a=>f0(c,w,a,!1)},P("div",{className:v,ariaHidden:"true"},p=i?(0,l.qc)(c,a.type,gC):(0,
l.AG)(c,a.type),null!==h?P("div",{className:h}):null),P("div",{className:"path-view"},i?(0,l.Xl)(c,bO,bN,0!==k.size,gC):(0,
l.v$)(c,bO,bN,0!==k.size)),1===a.type&&P("div",{className:"action-icon image login-action-icon"})||2===a.type&&P("div",{
className:"action-icon image goto-action-icon"})||P("div",{className:"action-icon image view-action-icon"})),r=gt(P("div",{
className:"more-actions-button hidden",title:dk,role:"button"},P("div",{className:"icon"},s=P("div",{className:"totp-timer"
}))),!1,(()=>w)),t=ao?(0,l.oG)(a,bM,f7):null,u=P("div",{className:"more-actions-button",title:dd,role:"button",
ariaHasPopup:"true",ariaLabel:dd,onclick:a=>f6(a,w,u,c,!1)},P("div",{className:"icon more-actions-icon image"
}))),q=1===a.type?P("div",{className:"list-item-data-row hidden"}):null);o.push({m_path:a.path,m_mod_time:a.mod,
m_received:a.received,m_element:w});const x=0!==k.size,y=(0,G.HE)((0,G._p)(c)).length>bO||x&&(0,G.fA)(c).length>bN
;if(fx(m,a.type,!1,y,(0,G.tM)(d,bP)),n.set(w,{m_item_el:w,m_item_icon_text_el:m,m_item_icon_el:p,m_item_data_view_el:q,
m_item_data_view_expand_button_el:r,m_totp_timer:s,m_compromised_button_el:t,m_item_info:a}),!g||!f||b>=f.m_items.length)fz((0,
M.TT)(bw),w);else{const a=f.m_items[b].m_element;null===(e=a.parentElement)||void 0===e||e.replaceChild(w,a)}}
if(g&&f&&f.m_items.length>j.length){for(let a=j.length;a<f.m_items.length;a++){f.m_items[a].m_element.remove()}fB((0,M.TT)(bw))}
dX(),bQ={m_list_mode:a5,m_items_type:bt,m_all_items_selected_folder:null,m_items:o,m_views:n},bw&&0!==n.size&&(0,
J.fI)(fC(bw,n,[dA,dt],d)),er()}function d6(a){switch(a){case 2:return 1;case 3:return 2;case 4:return 7;case 5:return 5;case 1:
case 0:return 9}}function d7(a,b,c){if(a&&c&&function(a,b){const c=a.getBoundingClientRect(),d=b.getBoundingClientRect()
;return function(a,b){return(0,H.tZ)(b.top,b.bottom,a.top-7,a.bottom+7)}(c,d)}(c,b)){
const a=b.getBoundingClientRect(),d=c.getBoundingClientRect();(0,H.X4)(a)||(0,H.X4)(d)||function(a,b,c){
if(""===b.style.marginRight&&!(0,H.X4)(a)&&a.right>c.left){const d=(0,z.Md)(a.right-c.left+7);return b.style.marginRight=d,!0}
}(a,b,d)}}function d8(a){a.style.marginRight&&(a.style.marginRight="")}function d9(){bx&&((0,M.TT)(bs).removeChild(bx),bx=null)}
function ea(){(0,A.h9)((0,M.TT)(bw))}function eb(a){return P("div",{className:"instruction-section"},P("div",{className:"text"
},ca),P("ul",{className:"instruction-options"},P("li",{className:"instruction-option"},P("span",{className:"text"},cb)),P("li",{
className:"instruction-option"},P("span",{className:"text"},ec(cc,ef))),P("li",{className:"instruction-option"},P("span",{
className:"text"},(0,L.SI)(cd,"%1").before),P("span",{className:"link",onclick:()=>f4((async()=>{await V.ShowImportDialog(!1),
b.ClosePopup()}))},ce),P("span",{className:"text"},(0,L.SI)(cd,"%1").after))),a?P("div",{className:"link",onclick:ed},cf):null)}
function ec(a,b){const c=(0,L.SI)(a,"%1");let d;return d=c.found?P("span",null,P("span",{className:"text"},c.before),P("span",{
className:"circle plus",onclick:a=>null==b?void 0:b(a)}),P("span",{className:"text"},c.after)):P("span",null,P("span",{
className:"text"},a)),d}function ed(){return(0,J.fI)(ad.OpenUrl({newTab:!0,reuseExisting:!0,url:m.em},null)),b.ClosePopup()}
async function ee(){let a="";const b=d();switch(b){case 2:case 5:case 7:a=(0,L.bt)("big-icon"," ",(0,l.mQ)(b));break;case 1:
case 9:a=(0,L.bt)("big-icon"," ",(0,l.mQ)(1))}const c=P("div",{className:"create-first-item-section"},P("div",{
className:"big-icon-section"},P("div",{className:a})),await async function(){const a=d();switch(a){case 7:case 5:gz(dA)
;return P("div",{className:"instruction-section"
},ec(7===a?await ad.LocalizeString("MainPage_CreateFirstSafenoteInstructions_Text"):await ad.LocalizeString("MainPage_FillIdentitiesTab_CreateFirst_Text"),ef))
;case 2:an||gA(dA);return P("div",{className:"instruction-section"
},ec(await ad.LocalizeString("MainPage_CreateFirstBookmarkInstructions_Text"),ef));default:return an||gA(dA),eb(!0)}}())
;return void(0,M.TT)(bw).appendChild(c);function d(){switch(bt){case 1:return 9;case 4:return 7;case 3:return 2;case 5:return 5
;default:return 1}}}function ef(a){fE(!1)}function eg(a){switch(a){case 0:return{m_button_tooltip:bG,m_button_text:bA,
m_button_style:"icon-pinned",m_menu_css:"command-show-pinned"};case 1:return{m_button_tooltip:bL,m_button_text:bF,
m_button_style:"icon-all",m_menu_css:"command-show-all"};case 2:return{m_button_tooltip:bH,m_button_text:bB,
m_button_style:"icon-logins",m_menu_css:"command-show-logins"};case 3:return{m_button_tooltip:bJ,m_button_text:bD,
m_button_style:"icon-bookmarks",m_menu_css:"command-show-bookmarks"};case 4:return{m_button_tooltip:bK,m_button_text:bE,
m_button_style:"icon-safenotes",m_menu_css:"command-show-safenotes"};case 5:return{m_button_tooltip:bI,m_button_text:bC,
m_button_style:"icon-identities",m_menu_css:"command-show-identities"}}}function eh(a){const b=eg(a);return{
title:b.m_button_text,imageClass:b.m_menu_css,onCommand:async(b,c)=>{bt!==a&&(bt=a,gh(),fY(),d0(),fu(),dW(),fI(),fG(),fS(),
d4(bt,a5))}}}function ei(a){return 3===ay&&aY?function(a){aX||function(){aX=!0;const a=(0,
M.TT)(aS).getBoundingClientRect(),b=a.bottom+1,c=a.right,d={height:0,width:0,top:b,bottom:b,y:b,x:c,right:c,left:c}
;function e(){const a=(0,k.NI)((0,M.TT)(aS));return a.onHide=g,a.onShow=f,a}function f(a){}function g(a){setTimeout((function(){
aX=!1,(0,M.TT)(aS).classList.remove("highlighted")}),300)}dP=(0,k.Lj)(d,(()=>async function(){const a=[],b=cC.slice(0,cz)
;for(const d of b){const b=(0,M.TT)(cK).m_matching_identities.find((a=>a.path===d.path));await eJ(a,d,void 0!==b)}
const c=cC.length;return a.push("separator"),a.push({
title:await ad.LocalizeString("Editor_Indicator_Show_AllIdentities",[c.toString()]),onCommand:async(a,b)=>{
2===ci&&1===bb||(ci=2,bb=1,gh(),fY(),en(),eq(),eo(),fI(),fG(),fS(),el(0))}}),a}()),e(),(function(a,b){return(0,
M.TT)(aq).style.width=(0,z.Md)(a),(0,M.TT)(aq).style.height=(0,z.Md)(b),(0,M.TT)(aS).getBoundingClientRect()}),gs)}(),
a.stopPropagation()}(a):ek()}function ej(a){cj=a,ci=1,ek()}function ek(){ay=3,gh(),fY(),fp(),eq(),en(),eo(),fI(),fG(),fS(),el(0)
}function el(a){switch(ci){case 0:e3(),eu(a);break;case 2:{const b=(0,M.TT)(bj).value;if(b)gA(bh),fW(bb,!0),
eW(b,2,0);else switch(e3(),bb){case 1:eu(a);break;case 0:!function(a){cB.Start((async b=>{0!==a&&await(0,J.Gu)(a,b),es()}))}(a)}
}break;case 1:case 3:e3(),c=a,cv.Start((async a=>{0!==c&&await(0,J.Gu)(c,a),await async function(a){var c,d,e,f,g,h,i,j,k,l,n,p
;const q=null!==(c=await ad.GetLanguageTag(a))&&void 0!==c?c:"en";let r,s,t,u;if(3===ci){r=!1,s=!1
;const a=await T.GetInitialIdentity(null);u=(0,m.eQ)(a,{}),t=await(0,m.D5)(a,{},ad),cm&&(cm.title=dd,cm.onclick=a=>{
eB(a,null,(0,M.TT)(cm),!0,"")})}else{const b=await R.GetInfo(cj,1,a);r=b.readOnly||!1,s=b.hidePasswords||!1,
t=await S.GetDisplayNameByPath(b.path,null),u=await R.GetDataItem(cj,3,null,null),cm&&(cm.title=dd,cm.onclick=a=>{eB(a,null,(0,
M.TT)(cm),!1,cj)})}
s?(gw(cq,cI),gz(cp)):(gw(cq,cH),gw(cp,r?await ad.LocalizeString("Cmd_View_Flat"):await ad.LocalizeString("Cmd_Edit_Flat")),
gA(cp)),gv(co,await ad.LocalizeString("MainPage_FillIdentitiesTab_IdentityView_FillBtn_Tip",[t]))
;const v=await ad.LocalizeString("Notification_Copied_ToClipboard_Text"),w=await ad.LocalizeString("MainPage_FillIdentitiesTab_IdentityView_CopyDrag_Tip"),x=await ad.LocalizeString("MainPage_FillIdentitiesTab_IdentityView_Copy_Tip"),B=(null===(d=u.m_options)||void 0===d?void 0:d["World Regions"])||"United States",C=[],D=new Map(u.m_groups.map((a=>[a.m_name,a]))),E=["Person","Location","Credit Card","Bank Account","Business","Passport","Car"]
;for(const m of E){const a=D.get(m);if(!a)continue;if(0===a.m_instances.length)continue;const c=a.m_instances
;if(s&&1===c.length)continue;let d;if(1===c.length)switch(m){case"Credit Card":
d=null===(e=c[0].m_fields.find((a=>"Card Type"===a.m_name)))||void 0===e?void 0:e.m_value;break;case"Bank Account":
d=null===(f=c[0].m_fields.find((a=>"Bank Name"===a.m_name)))||void 0===f?void 0:f.m_value}const r=await(0,
y.hq)(m,ad),t="identity-group-"+m.toLowerCase().replace(" ","-")+"-icon",u=new Map,A=new Map;for(const b of c){
const a=new Map(b.m_fields.filter((a=>a.m_name)).map((a=>{var b;return[(0,M.TT)(a.m_name),null!==(b=a.m_value)&&void 0!==b?b:""]
})));u.set(b,a);const c=(await(0,o.hX)(b.m_name,m,a,B,ad)).m_name;A.set(b,{m_display_name:c,m_expired:(0,y.y5)(m,a,B,q)})}
const E=[...c];let F;E.sort(((a,b)=>{const c=(0,M.TT)(A.get(a)),d=(0,M.TT)(A.get(b))
;return c.m_expired!==d.m_expired?c.m_expired?1:-1:c.m_display_name.localeCompare(d.m_display_name)}));const G=P("div",{
className:"identity-fields-group"},P("div",{className:"header"},P("div",{className:"instance-icon "+t}),P("div",{
className:"name"},r),d?P("div",{className:"aux-instance-name"},d):null,1===c.length?P("div",{className:"icon-copy",title:x,
role:"button",ariaLabel:x,onclick:()=>{s||(0,J.fI)((async()=>{const a=await eC(m,E[0],B)
;await b.CopyTextToClipboardWithAutoClear(a,120),fQ(v,3,null)})())}}):null),F=P("div",{className:"instances"}));let H=!1
;const I=a.m_current_instance&&(null===(g=a.m_instances.find((b=>b.m_name===a.m_current_instance)))||void 0===g?void 0:g.m_name)||""
;for(const e of E){const a=e.m_name,d=(0,M.TT)(u.get(e));let f=0!==d.size?await(0,y.yG)(B,m,d,ad,!1):[]
;if(1===c.length&&0===f.length)continue;H||(C.push(G),H=!0);const g=I?a===I:null!==(h=e.m_is_default)&&void 0!==h&&h;let o,q,r,t
;switch(m){case"Credit Card":r=d.get("Card Type"),t="Card Type";break;case"Bank Account":r=d.get("Bank Name"),t="Bank Name"}
if(c.length>1){const c=(0,M.TT)(A.get(e)).m_display_name;if(r){const a=(0,L.v$)(r.toLowerCase());(0,
L.v$)(c.toLowerCase()).includes(a)&&(r=void 0)}let h="";if("Credit Card"===m){const a=d.get("Card Type"),b=a?(0,K.G3)(a):null
;null!==b&&(h=`logo-${b}`)}o=P("div",{className:"instance"},P("div",{className:"header"},P("label",{className:"radio"
},P("input",{type:"radio",className:"radio-button",name:m,value:a,checked:g}),P("div",{className:"instance-name"
},"Credit Card"===m&&P("div",{className:`card-logo ${h}`}),c),r?P("div",{className:"aux-instance-name"
},r):null,0===f.length||s?null:P("div",{className:"icon-copy",title:x,role:"button",ariaLabel:x,onclick:a=>{a.preventDefault(),
a.stopPropagation(),(0,J.fI)((async()=>{const a=await eC(m,e,B);await b.CopyTextToClipboardWithAutoClear(a,120),fQ(v,3,null)
})())}}))),q=P("div",{className:"fields"}))}else o=P("div",{className:"instance"},q=P("div",{className:"fields"}));if(!s){
t&&(d.delete(t),f=await(0,y.yG)(B,m,d,ad,!1));const a=[[]];for(let b=0;b<f.length;b++){const c=f[b]
;3===c.m_type?b<f.length-1&&a.push([]):a[a.length-1].push(c)}const c=[]
;for(const b of a)if(0!==b.length)if(0===b[0].m_type)if(0===c.length)c.push([b]);else{const a=c[c.length-1],d=a[a.length-1]
;0===d[0].m_type&&d.length===b.length?a.push(b):c.push([b])}else c.push([b]);for(const d of c){if(0===d.length)continue
;const a=P("div",{className:d.length>1?"grid":"line"});for(const c of d){let e=""
;const f=1!==d.length&&!a.style.gridTemplateColumns;let g,h=!1;for(const d of c)switch(d.m_type){case 0:{const b=P("div",{
className:"caption"},null!==(i=d.m_display_value)&&void 0!==i?i:"",":");a.appendChild(b),f&&(e=(0,L.bt)(e," ","auto")),g=b,h=!0}
break;case 2:if(g)if(h)d.m_display_value&&(g.textContent+=d.m_display_value);else{const a=P("div",{className:"separator"
},null!==(k=null===(j=d.m_display_value)||void 0===j?void 0:j.trim())&&void 0!==k?k:"");g.appendChild(a)}break;case 1:{
const c=null!==(n=null!==(l=d.m_actual_value)&&void 0!==l?l:d.m_display_value)&&void 0!==n?n:"",i=c===(null!==(p=d.m_display_value)&&void 0!==p?p:"")
;let j,k,m,o=!1,q=s||!i?"text":"text selectable";d.m_can_copy&&(q=(0,L.bt)(q," ","monospace")),d.m_expired&&(q=(0,
L.bt)(q," ","expired-warning"));const r=P("div",{className:"cell"},j=P("div",{className:"value"
},!s&&d.m_actual_value&&d.m_display_value&&d.m_actual_value!==d.m_display_value?m=P("div",{className:"icon-eye open",
onclick:()=>{o?(o=!1,eA(k,d.m_display_value,d.m_display_chunk_length,!0),m.classList.remove("closed"),m.classList.add("open"),
k.classList.remove("selectable")):(o=!0,eA(k,d.m_actual_value,d.m_display_chunk_length,!1),m.classList.remove("open"),
m.classList.add("closed"),k.classList.add("selectable"))}}):null,k=P("div",{className:q,ondblclick:a=>{i&&((0,z.rv)(k),
a.preventDefault())}},ez(d.m_display_value,d.m_display_chunk_length,!i)),d.m_can_copy?P("div",{className:"icon-copy",title:w,
role:"button",ariaLabel:w,onclick:()=>{s||(0,J.fI)(async function(){await b.CopyTextToClipboardWithAutoClear(c,120),fQ(v,3,null)
}())},draggable:!s,ondragstart:a=>{var b;null===(b=a.dataTransfer)||void 0===b||b.setData("text/plain",c)}}):null))
;a.appendChild(r),f&&(e=(0,L.bt)(e," ","auto")),g=j,h=!1}}f&&e&&(a.style.gridTemplateColumns=e)}q.appendChild(a)}}
F.appendChild(o)}}(0,A.h9)((0,M.TT)(cu)),C.forEach((a=>(0,M.TT)(cu).appendChild(a))),eD()}(a)}))}var c}function em(a){
bb!==a&&(bb=a,en(),fY(),fX(),el(0),eo())}function en(){for(const[a,b]of bd)a===bb?(b.classList.add("selected"),
gy(b,"true")):(b.classList.remove("selected"),gy(b,"false"))}function eo(){if(3===ay&&cg)switch(gz(ck),ci){case 0:gz(bc),gz(cw),
gz(cl),gA(cx);break;case 1:case 3:gz(bc),gz(cx),gz(cw),gA(cl);break;default:gA(bc),gz(cl),1===bb?(gz(cw),gA(cx)):(gz(cx),gA(cw))
}}function ep(){a1.Start((async a=>{await async function(a){const c=await U.GetUsageInfoList(5,3,a)
;const d=await b.GetAllIdentities(a);if(function(a,b){const c=new Map(a.map((a=>[a.path,a])));b.forEach((a=>{const b=a.path
;c.has(b)||c.set(b,a)})),cC=[...c.values()]}(c,d),0===cC.length){if(!await(0,u.h$)(ac)){const a=ci;return ci=0,eD(),eq(),
fW(1,!1),fW(0,!1),fX(),void(3===ay&&ci!==a&&(ev(),ew(),cy=null))}ci=3,cj=""}else{if(""!==cj){const a=cC.filter((a=>a.path===cj))
;a&&0!==a.length||(ci=0,cj="")}if(0===ci||3===ci){const a=cC[0].path;cj=a,ci=1}}eq(),eo(),3===ay&&el(0)}(a)}))}function eq(){
if(a2.Cancel(),
0===ci||2===ci)aT&&(aT.className="icon fill-identity-icon",aT.firstChild&&aT.firstChild!==aZ&&aT.removeChild(aT.firstChild)),
0===ci?(gw(aU,a0),gw(aV,a0),gv(aS,cF),gx(aS,cF),gz(aW),aY=!1,cj="",bb=1):(gw(aU,a0),gw(aV,a0),gv(aS,cG),gx(aS,cG),aY=!0,
gA(aW));else if(3===ci)a("","",""),a2.Start((async b=>{const c=await T.GetInitialIdentity(b),d=await(0,m.D5)(c,{},ad)
;b.ThrowIfShouldStop(),a("",d,d)}));else{if(gB(5,cj))a(cj,"",""),a2.Start((async b=>{const c=await gC(cj);b.ThrowIfShouldStop(),
a(cj,c,c)}));else{const b=(0,G.HE)((0,G._p)(cj));a(cj,cj,b)}}return;function a(a,b,c){if(aT){aT.className="icon",
aT.firstChild&&aT.firstChild!==aZ&&aT.removeChild(aT.firstChild);const c=(0,l.kH)(b,(0,l.Q0)(a)).Element()
;aT.insertBefore(c,aT.firstChild)}const d=(0,G.tM)(c,bO);gw(aU,d),gw(aV,d),fx((0,M.TT)(aS),5,!1,!0,(0,G.tM)(c,bP)),
cC.length<2?(aY=!1,gz(aW)):(aY=!0,gA(aW)),er()}}function er(){if(aq){const a=window.getComputedStyle(aq),b=(0,
z.i7)(a.minWidth),c=(0,z.i7)(a.maxWidth),d=aq.getBoundingClientRect();d&&d.width>b&&d.width<=c&&(aq.style.minWidth=(0,
z.Md)(Math.ceil(d.width)))}}function es(){var a;if(!cK)return;const b=cK.m_matching_identities;if(0===b.length)return fW(0,!1),
fX(),et(),ex(),cy=null,void eD();b.length>bf?fW(0,!0):fW(0,!1),fX();let c=[];cy&&0===cy.m_list_type?c=cy.m_items:et()
;const d=[],e=(0,m.Z7)(b);for(let f=0;f<b.length;f++){const g=b[f],h=g.path;if(f<c.length){const a=c[f]
;if(a.m_path===h&&a.m_mod_time===g.mod&&a.m_received===g.received){d.push(a);continue}}const i=(0,G.HE)((0,
G._p)(h)),j=fw(g),k=gB(g.type,h);let m,n;const o=P("div",{className:"list-item",onmouseenter:()=>{
m.offsetWidth<m.scrollWidth&&gv(m,i),d7(cw,o,dt),d7(cw,o,dA)},onmouseleave:()=>{d8(o)}},P("div",{className:"icon-text",title:de,
role:"button",onclick:a=>ey(a,g.path),oncontextmenu:a=>f0(g.path,o,a,!1)},P("div",{className:"icon-section"},k?(0,
l.qc)(g.path,g.type,gC):(0,l.AG)(g.path,g.type),j?P("div",{className:j}):null),m=k?(0,l.Xl)(h,b7,b6,0!==e.size,gC):(0,
l.v$)(h,b7,b6,0!==e.size),P("div",{className:"action-icon image fill-action-icon"})),n=P("div",{className:"more-actions-button",
title:dd,role:"button",ariaHasPopup:"true",ariaLabel:dd,onclick:a=>f6(a,o,n,g.path,!0)},P("div",{
className:"icon more-actions-icon image"})));if(d.push({m_path:g.path,m_mod_time:g.mod,m_received:g.received,m_element:o}),
f>=c.length)(0,M.TT)(cw).appendChild(o);else{const b=c[f].m_element;null===(a=b.parentElement)||void 0===a||a.replaceChild(o,b)}
}if(c.length>b.length)for(let f=b.length;f<c.length;f++){c[f].m_element.remove()}eD(),cy={m_items:d,m_list_type:0}}
function et(){(0,A.h9)((0,M.TT)(cw))}function eu(a){cB.Start((async c=>{0!==a&&await(0,J.Gu)(a,c),await async function(a){var c
;let d=[],e=!1;cy&&1===cy.m_list_type?d=cy.m_items:e=!0;const f=await b.GetAllIdentities(a);if(a.ThrowIfShouldStop(),
0===f.length)return fW(1,!1),fX(),ev(),ew(),eD(),void(cy=null);f.length>bf?fW(1,!0):fW(1,!1);fX(),e&&ev();const g=[],h=(0,
m.Z7)(f);for(let b=0;b<f.length;b++){const a=f[b],e=a.path;if(b<d.length){const c=d[b]
;if(c.m_path===e&&c.m_mod_time===a.mod&&c.m_received===a.received){g.push(c);continue}}const i=(0,G.HE)((0,
G._p)(e)),j=fw(a),k=gB(a.type,e);let m,n;const o=P("div",{className:"list-item",onmouseenter:()=>{
m.offsetWidth<m.scrollWidth&&gv(m,i),d7(cx,o,dt),d7(cx,o,dA)},onmouseleave:()=>{d8(o)}},P("div",{className:"icon-text",title:de,
role:"button",onclick:b=>ey(b,a.path),oncontextmenu:b=>f0(a.path,o,b,!1)},P("div",{className:"icon-section"},k?(0,
l.qc)(a.path,a.type,gC):(0,l.AG)(a.path,a.type),j?P("div",{className:j}):null),m=k?(0,l.Xl)(e,b7,b6,0!==h.size,gC):(0,
l.v$)(e,b7,b6,0!==h.size),P("div",{className:"action-icon image fill-action-icon"})),n=P("div",{className:"more-actions-button",
title:dd,role:"button",ariaHasPopup:"true",ariaLabel:dd,onclick:b=>f6(b,o,n,a.path,!0)},P("div",{
className:"icon more-actions-icon image"})));if(g.push({m_path:a.path,m_mod_time:a.mod,m_received:a.received,m_element:o}),
b>=d.length)(0,M.TT)(cx).appendChild(o);else{const a=d[b].m_element;null===(c=a.parentElement)||void 0===c||c.replaceChild(o,a)}
}if(d.length>f.length)for(let b=f.length;b<d.length;b++){d[b].m_element.remove()}eD(),cy={m_items:g,m_list_type:1}}(c)}))}
function ev(){(0,A.h9)((0,M.TT)(cx))}function ew(){const a=P("div",{className:"empty-list"},P("div",{
className:"big-icon-section"},P("div",{className:"big-icon identity-icon"})),P("div",{className:"instruction-section"
},ec(cE,ef)));(0,M.TT)(cx).appendChild(a)}function ex(){const a=P("div",{className:"empty-list"},P("div",{className:"text"},cD))
;(0,M.TT)(cw).appendChild(a)}function ey(a,b){f2((async()=>ej(b)))}function ez(a,b,c){
return a?b&&!a.match(c?/[^0-9\u25cf]/:/[^0-9]/)?(0,L.GI)(a,b).map((a=>P("span",{className:"chunk"},a))):a:""}
function eA(a,b,c,d){if(b)if(c&&!b.match(d?/[^0-9\u25cf]/:/[^0-9]/)){const d=(0,L.GI)(b,c);let e=0
;for(;e<a.children.length;e++)a.children[e].textContent=d[e];for(;e<d.length;e++)a.appendChild(P("span",{className:"chunk"
},d[e]))}else a.textContent=b;else a.textContent=""}function eB(a,d,e,f,h){a3?a.stopPropagation():function(a,d,e,f){
const h=d.getBoundingClientRect();function i(){let b=null;return{onShow:e=>{(0,k.dB)(d,!0),a&&(0,k.dB)(a,!0)
;let f=d.parentElement;for(;null!==f;)f.addEventListener("scroll",c),f=f.parentElement;b=e,a3=!0},onHide:()=>{(0,k.dB)(d,!1),
a&&(0,k.dB)(a,!1);let e=d.parentElement;for(;null!==e;)e.removeEventListener("scroll",c),e=e.parentElement;b=null,
setTimeout((function(){a3=!1}),300)}};function c(){null==b||b.Hide(4)}}dP=(0,k.Lj)(h,(async()=>{if(e)return async function(a){
const d=[],e=0!==await fF()?await ad.LocalizeString("Menu_BlockedItem_Upgrade"):void 0;an||d.push({
title:await ad.LocalizeString("Cmd_FillForms_Flat"),imageClass:"command-fill-icon",blockedText:e,onCommand:async(b,c)=>{
a?f4((()=>eI())):(cj="",ci=3,ek())}});return d.push("separator"),d.push({title:await ad.LocalizeString("Cmd_Edit_Flat"),
imageClass:"command-edit-icon",blockedText:e,onCommand:fN((async(a,c)=>((0,J.fI)(V.OpenInitialIdentity({mode:"edit"})),
b.ClosePopup())))}),d.push({title:await ad.LocalizeString("Cmd_Rename_Flat"),imageClass:"command-rename-icon",blockedText:e,
onCommand:fN((async(a,b)=>{const d=await T.GetInitialIdentity(null),e=(0,g.z)({data:{itemPath:d.m_path,itemType:5,
groupName:null,instanceName:null,instanceDisplayName:null,initialIdentity:d},dataStorage:R,dataItemDisplayNameProvider:S,
sharing:X,commands:V,viewApi:ad}),f=(0,J.f4)(null,null,null),h=await c.ShowViewAndWaitResult(e,!0,f);cj="/"+h+(0,o.kd)(5),ci=1,
eq();const i=await(0,m.D5)(d,{},ad);fQ(await ad.LocalizeString("Notification_Item_Renamed_Text",[i,h]),null,null)}))}),d}(!0)
;return fM(await R.GetInfo(f,36,null),!0)}),i(),(function(a,b){return(0,M.TT)(aq).style.width=(0,z.Md)(a),(0,
M.TT)(aq).style.height=(0,z.Md)(b),d.getBoundingClientRect()}),gs)}(d,e,f,h)}async function eC(a,b,c){var d,e
;const f=b.m_fields,g=new Map;for(const k of f)k.m_name&&g.set(k.m_name,k.m_value||"");const h=await(0,y.yG)(c,a,g,ad,!0)
;let i="",j=!1;for(const k of h){const a=null!==(e=null!==(d=k.m_actual_value)&&void 0!==d?d:k.m_display_value)&&void 0!==e?e:""
;switch(k.m_type){case 0:i+=a,j=!0;break;case 3:i+="\n",j=!1;break;default:j?i=(0,L.bt)(i,": ",a):i+=a,j=!1}}return i}
function eD(){const a=cg;cg=!0,a||eo()}function eE(){f4(3===ci?()=>eI():()=>eH()),(0,M.TT)(co).blur()}function eF(){
return 3===ci?(0,J.fI)(V.OpenInitialIdentity({mode:"view"})):(0,J.fI)(V.OpenFile(cj,{mode:"view"})),b.ClosePopup()}
function eG(){cs=(0,M.TT)(cn).GetChecked(),ct=!0}async function eH(){const a=cj,c=await R.GetDataItem(a,3,null,null);let d=(0,
M.HP)(c);const e=await R.GetInfo(a,1,null);let f=!1;for(const b of d.m_groups){const a=b.m_name
;if("Custom"===a||"Default Password"===a)continue;if(b.m_instances.length<=1)continue;const c=b.m_current_instance||"",d=(0,
M.TT)(cu).getElementsByClassName("radio-button");for(let e=0;e<d.length;e++){const g=d[e]
;if(g.getAttribute("name")===a&&g.checked){const a=g.getAttribute("value");a&&a!==c&&(b.m_current_instance=a,f=!0);break}}}
cr!==cs&&(await ab.SetValue("FillEmptyFieldsOnlyIdentity",cs),cr=cs),f&&(await R.PutDataItem(a,d,null),d=(0,M.HP)(d))
;for(const b of d.m_groups){const a=b.m_name;if("Custom"===a||"Default Password"===a)continue
;if(b.m_instances.length<=1)continue;const c=b.m_current_instance||"";b.m_instances=b.m_instances.filter((a=>a.m_name===c))}
const g=await(0,m.EN)(a,d,e.lastUsedTime,e.mod,e.cre,void 0,void 0,void 0);(0,J.fI)(V.FillForms({userDataItem:g.m_data,
identity:!0,submit:!1,fillEmptyFieldsOnly:cs,verifyCustomFieldsConflicts:!0},null)),b.ClosePopup()}async function eI(){
const a=await T.GetInitialIdentity(null);cr!==cs&&(await ab.SetValue("FillEmptyFieldsOnlyIdentity",cs),cr=cs),(0,
J.fI)(V.FillForms({userDataItem:a,identity:!0,submit:!1,fillEmptyFieldsOnly:cs,verifyCustomFieldsConflicts:!0,
dontAddToRecentlyUsedAndLogs:!0},null)),b.ClosePopup()}async function eJ(a,b,c){const d=b.path,e=gB(5,d),f=e?await gC(d):(0,
G.HE)((0,G._p)(d)),g=e?(0,l.kH)(f,(0,l.Q0)(d)):(0,l.kH)(d,(0,l.Q0)(d));a.push({title:(0,G.tM)(f,cA),type:c?"fillable":"normal",
imageEl:g.Element(),onCommand:async(a,c)=>{1===ci&&cj===b.path||ej(b.path)}})}function eK(){eZ(at),fv()}function eL(){eX(at)}
function eM(){document.activeElement!==(0,M.TT)(au)&&eX(at)}function eN(){document.activeElement!==(0,M.TT)(au)&&eY(at)}
function eO(a){a.stopPropagation()}function eP(){const a=(0,M.TT)(au).value;if(!a)return e3(),void fZ();eW(a,1,cV)}
function eQ(){eZ(bi),fv()}function eR(){eX(bi)}function eS(){document.activeElement!==(0,M.TT)(bj)&&eX(bi)}function eT(){
document.activeElement!==(0,M.TT)(au)&&eY(bi)}function eU(a){a.stopPropagation()}function eV(){const a=(0,M.TT)(bj).value
;if(!a)return e3(),void fZ();eW(a,2,cV)}function eW(a,b,c){cL!==b&&(cL=b,function(){switch(cL){default:case 1:gz(aE),gz(az),
gz(a4),gz(bh);case 2:}gz(bp),gz(cZ),fH(),gz(cO),gA(cN),gA(cM)}()),e0(a,c)}function eX(a){
const b=document.querySelector(".main-page");(0,M.TT)(a).style.borderColor=window.getComputedStyle((0,
M.TT)(b)).getPropertyValue("--search-input-border-color")||"initial"}function eY(a){const b=document.querySelector(".main-page")
;(0,
M.TT)(a).style.borderColor=window.getComputedStyle((0,M.TT)(b)).getPropertyValue("--search-input-hover-border-color")||"initial"
}function eZ(a){const b=document.querySelector(".main-page");(0,M.TT)(a).style.borderColor=window.getComputedStyle((0,
M.TT)(b)).getPropertyValue("--search-input-focused-border-color")||"initial"}function e0(a,b){cY.Start((async c=>{
0!==b&&await(0,J.Gu)(b,c),await async function(a,b){try{if(!a)return;(0,A.h9)((0,M.TT)(cP)),cQ=[],cT=null,cR=[],cS=new Map,a=(0,
L.I6)(a),await async function(a,b){let c;let d,f,g=!1;switch(cL){case 0:c=[];break;case 1:{const e=await e1(a,b)
;b&&await b.YieldToUI(30),c=e.items,d=e.searchParts,f=e.matchesPerItem}break;case 2:switch(ay){case 1:c=[];break;case 2:
switch(a7){case 0:if(c=await e2((0,M.TT)(cK).m_matching_logins,a),0===c.length){const e=await e1(a,b);b&&await b.YieldToUI(30),
d=e.searchParts,f=e.matchesPerItem,c=e.items.filter((a=>1===a.type)),0!==c.length&&(g=!0)}break;case 1:if(c=await e2([...(0,
M.TT)(cK).m_matching_logins,...(0,M.TT)(cK).m_domain_logins],a),0===c.length){const e=await e1(a,b);b&&await b.YieldToUI(30),
d=e.searchParts,f=e.matchesPerItem,c=e.items.filter((a=>1===a.type)),0!==c.length&&(g=!0)}break;case 2:{const e=await e1(a,b)
;b&&await b.YieldToUI(30),d=e.searchParts,f=e.matchesPerItem,c=e.items.filter((a=>1===a.type))}}break;case 3:
if(2===ci&&0===bb)c=await e2((0,M.TT)(cK).m_matching_identities,a);else{const e=await e1(a,b);b&&await b.YieldToUI(30),
d=e.searchParts,f=e.matchesPerItem,c=e.items.filter((a=>5===a.type))}}}if(!d){d=(0,t.HE)(a,{wholePhrase:!1,wholeWords:!1,
caseSensitive:!1,allWords:!1}).searchParts}if(g){
const a=0===a7?await ad.LocalizeString("MainPage_FillLoginsTab_Search_NoMatchingLogins"):await ad.LocalizeString("MainPage_FillLoginsTab_Search_NoSameDomainLogins"),b=P("div",{
className:"empty-search-match-results"},P("div",{className:"empty-matches"},a),P("div",{className:"general-results"
},await ad.LocalizeString("MainPage_FillLoginsTab_Search_GeneralResults")));(0,M.TT)(cR).push(b)}
const h=new Map(0!==c.length?function(a,b,c,d){var f;if(!cQ||!cR||!cS)return[];const g=[];for(let h=0;h<a.length;h++){
const b=a[h],i=b.path,j=fw(b),k=(0,G.HE)((0,G._p)(i));let m,n,o,p,q,r,s;const t=P("div",{className:"list-item multiple-rows"
},P("div",{className:"list-item-main-row"},m=P("div",{className:"icon-text",onclick:a=>f1(b,d,a.ctrlKey),
oncontextmenu:a=>f0(b.path,t,a,d)},P("div",{className:"icon-section"},n=(0,l.AG)(b.path,b.type),j?P("div",{className:j
}):null),P("div",{className:"path-view"},(0,e._)(b.path,null!==(f=c[h])&&void 0!==f?f:[],!1,!1)),d&&P("div",{
className:"action-icon image fill-action-icon"})||1===b.type&&P("div",{className:"action-icon image login-action-icon"
})||2===b.type&&P("div",{className:"action-icon image goto-action-icon"})||P("div",{
className:"action-icon image view-action-icon"})),p=gt(P("div",{className:"more-actions-button hidden",title:dk,role:"button"
},P("div",{className:"icon"},q=P("div",{className:"totp-timer"}))),!1,(()=>t)),r=ao?(0,l.oG)(b,bM,f7):null,s=P("div",{
className:"more-actions-button",title:dd,role:"button",ariaHasPopup:"true",ariaLabel:dd,onclick:a=>f6(a,t,s,i,2===ay)},P("div",{
className:"icon more-actions-icon image"}))),o=1===b.type?P("div",{className:"list-item-data-row hidden"}):null);cR.push(t),
fx(m,b.type,d,!1,(0,G.tM)(k,bP)),g.push({m_item_el:t,m_item_icon_text_el:m,m_item_icon_el:n,m_item_data_view_el:o,
m_item_data_view_expand_button_el:p,m_totp_timer:q,m_compromised_button_el:r,m_item_info:b});const u=cQ.length;cQ.push(b),
cS.set(u,t)}return g}(c,0,null!=f?f:[],2===cL).map((a=>[a.m_item_el,a])):[]);if(function(){switch(cL){default:case 1:gz(aE),
gz(az),gz(a4),gz(bh);case 2:}gz(bp),gz(cZ),gz(cN),gA(cO),gA(cM)}(),0===c.length){const b=P("div",{
className:"empty-search-results"},P("div",{className:"first-string"},P("div",{className:"search-empty-text-before"
},"No results found for "),P("div",{className:"search-query"},P("b",null,a),".")),P("div",{className:"search-empty-text-after"
},"Please change the search term."));return void(0,M.TT)(cP).appendChild(b)}for(const e of(0,M.TT)(cR))(0,
M.TT)(cP).appendChild(e);0!==c.length&&null===cT&&e8(0);cP&&0!==h.size&&(0,J.fI)(fC(cP,h,[dA,dt],b));return}(a,b),
null==b||b.ThrowIfShouldStop(),er()}finally{}}(a,c)}))}async function e1(a,b){for(let d=1;d<=10;d++)try{
const c=await Q.FindInPathNames(cX,a,{caseSensitive:!1,wholePhrase:!1,wholeWords:!1,allWords:!1},0,cW,b)
;return 0===c.firstItemIndex&&c.totalFoundItemsNum===c.items.length&&cU.set(a.toLowerCase(),c.items),c}catch(c){if((0,
I.r5)(c,I.m))continue;break}return{items:[],firstItemIndex:0,totalFoundItemsNum:0,searchParts:[]}}async function e2(a,b){
const c=(0,t.HE)(b,{caseSensitive:!1,wholePhrase:!1,wholeWords:!1,allWords:!1});return a.reduce(((a,b)=>{const d=(0,t.zM)(c,b)
;return d&&a.push(d),a}),[]).sort(t.x3).map((a=>a.itemInfo))}function e3(){cY.Cancel(),cL=0,gz(cM),gz(cO),gz(cN),am&&gA(aE),
gA(az),gA(bp),fY(),fI(),fG(),fS()}function e4(a){switch(a.key){case O.U.ArrowDown:!function(){if(!cQ||0===cQ.length)return
;null===cT?e8(0):cT<cQ.length-1&&e8(cT+1)}(),a.preventDefault(),a.stopPropagation();break;case O.U.ArrowUp:!function(){
if(!cQ||0===cQ.length)return;null===cT?e8(0):cT>0&&e8(cT-1)}(),a.preventDefault(),a.stopPropagation();break;case O.U.PageUp:
a.ctrlKey?e8(0):e8((null!=cT?cT:0)-8),a.preventDefault(),a.stopPropagation();break;case O.U.PageDown:a.ctrlKey?function(){
if(!cQ||0===cQ.length)return;e8(cQ.length-1)}():e8((null!=cT?cT:0)+8),a.preventDefault(),a.stopPropagation();break
;case O.U.Escape:a.target.value||b.ClosePopup()}}function e5(a){e4(a)}function e6(a){switch(a.key){case O.U.Enter:!function(){
if(!cQ||0===cQ.length||null===cT)return;const a=cQ[cT];if(!a)return;f1(a,2===cL,!1)}(),a.preventDefault(),a.stopPropagation()
;break;case O.U.Escape:a.target.value&&(a.target.value=""),e3(),a.preventDefault(),a.stopPropagation()}}function e7(a){e6(a)}
function e8(a){if(!cQ||0===cQ.length||!cS)return;if(a<0&&(a=0),a>cQ.length-1&&(a=cQ.length-1),a===cT)return
;const b=null!==cT&&cS.get(cT);b&&b.classList.remove("selected");const c=cS.get(a);c&&(c.classList.add("selected"),cT=a,
c.scrollIntoView({block:"nearest"}))}function e9(){2!==ay&&fa()}function fa(){ay=2,gh(),fY(),fp(),fc(),fd(),fI(),fG(),fS(),fe(0)
}function fb(a){a7!==a&&(a7=a,fc(),fY(),fX(),fd(),fe(0))}function fc(){for(const[a,b]of a9)a===a7?(b.classList.add("selected"),
gy(b,"true")):(b.classList.remove("selected"),gy(b,"false"))}function fd(){if(2===ay&&bW)switch(gz(bZ),gA(a8),a7){case 0:gA(b0),
gz(b1),gz(b2),gz(b3);break;case 1:gz(b0),gA(b1),gz(b2),gz(b3);break;default:gz(b0),gz(b1),gA(b2)}}function fe(a){const b=(0,
M.TT)(bj).value;if(b)gA(bh),fV(a7,!0),eW(b,2,0);else switch(e3(),a7){case 0:!function(a){b5.Start((async b=>{0!==a&&await(0,
J.Gu)(a,b),function(a){var b;if(!cK)return;const c=cK.m_matching_logins;if(0===c.length)return fV(0,!1),fX(),fi(),
0!==cK.m_domain_logins.length?fj():fk(),b4=null,void ff();c.length>bf?(fY(),fV(0,!0)):fV(0,!1);fX();let d=[]
;b4&&0===b4.m_list_mode?d=b4.m_items:fi();const e=(0,m.Z7)(c),f=new Map,g=[];for(let h=0;h<c.length;h++){const a=c[h],i=a.path
;if(h<d.length){const b=d[h];if(b.m_path===i&&b.m_mod_time===a.mod&&b.m_received===a.received){g.push(b);continue}}const j=(0,
G.HE)((0,G._p)(i)),k=fw(a);let m,n,o,p,q,r,s,t;const u=P("div",{className:"list-item multiple-rows",onmouseenter:()=>{
o.offsetWidth<o.scrollWidth&&gv(o,j)}},P("div",{className:"list-item-main-row"},m=P("div",{className:"icon-text",title:de,
role:"button",onclick:b=>f1(a,!0,b.ctrlKey),oncontextmenu:b=>f0(a.path,u,b,!0)},P("div",{className:"icon-section"},n=(0,
l.AG)(a.path,a.type),k?P("div",{className:k}):null),P("div",{className:"path-view"},o=(0,l.v$)(i,b7,b6,0!==e.size)),P("div",{
className:"action-icon image fill-action-icon"})),q=gt(P("div",{className:"more-actions-button hidden",title:dk,role:"button"
},P("div",{className:"icon"},r=P("div",{className:"totp-timer"}))),!1,(()=>u)),s=ao?(0,l.oG)(a,bM,f7):null,t=P("div",{
className:"more-actions-button",title:dd,role:"button",ariaHasPopup:"true",ariaLabel:dd,onclick:b=>f6(b,u,t,a.path,!0)
},P("div",{className:"icon more-actions-icon image"}))),p=1===a.type?P("div",{className:"list-item-data-row hidden"}):null)
;if(g.push({m_path:a.path,m_mod_time:a.mod,m_received:a.received,m_element:u}),f.set(u,{m_item_el:u,m_item_icon_text_el:m,
m_item_icon_el:n,m_item_data_view_el:p,m_item_data_view_expand_button_el:q,m_totp_timer:r,m_compromised_button_el:s,
m_item_info:a}),h>=d.length)fz((0,M.TT)(b0),u);else{const a=d[h].m_element
;null===(b=a.parentElement)||void 0===b||b.replaceChild(u,a)}}if(d.length>c.length){for(let a=c.length;a<d.length;a++){
d[a].m_element.remove()}fB((0,M.TT)(b0))}ff(),b4={m_list_mode:0,m_all_logins_selected_folder:bY,m_items:g,m_views:f},
b0&&0!==f.size&&(0,J.fI)(fC(b0,f,[dA,dt],a))}(b)}))}(a);break;case 1:!function(a){b5.Start((async b=>{0!==a&&await(0,J.Gu)(a,b),
function(a){var b;if(!cK)return;const c=cK.m_domain_logins;const d=[...cK.m_matching_logins,...c]
;if(0===d.length)return fV(1,!1),fX(),fl(),fm(),b4=null,void ff();d.length>bf?(fY(),fV(1,!0)):fV(1,!1);fX();let e=[]
;b4&&1===b4.m_list_mode?e=b4.m_items:fl();const f=(0,m.Z7)(d),g=new Map,h=[];for(let i=0;i<d.length;i++){const a=d[i],c=a.path
;if(i<e.length){const b=e[i];if(b.m_path===c&&b.m_mod_time===a.mod&&b.m_received===a.received){h.push(b);continue}}const j=(0,
G.HE)((0,G._p)(c)),k=fw(a);let m,n,o,p,q,r,s,t;const u=P("div",{className:"list-item multiple-rows",onmouseenter:()=>{
o.offsetWidth<o.scrollWidth&&gv(o,j)}},P("div",{className:"list-item-main-row"},m=P("div",{className:"icon-text",title:de,
role:"button",onclick:b=>f1(a,!0,b.ctrlKey),oncontextmenu:b=>f0(a.path,u,b,!0)},P("div",{className:"icon-section"},n=(0,
l.AG)(a.path,a.type),k?P("div",{className:k}):null),P("div",{className:"path-view"},o=(0,l.v$)(c,b7,b6,0!==f.size)),P("div",{
className:"action-icon image fill-action-icon"})),q=gt(P("div",{className:"more-actions-button hidden",title:dk,role:"button"
},P("div",{className:"icon"},r=P("div",{className:"totp-timer"}))),!1,(()=>u)),s=ao?(0,l.oG)(a,bM,f7):null,t=P("div",{
className:"more-actions-button",title:dd,role:"button",ariaHasPopup:"true",ariaLabel:dd,onclick:b=>f6(b,u,t,a.path,!0)
},P("div",{className:"icon more-actions-icon image"}))),p=1===a.type?P("div",{className:"list-item-data-row hidden"}):null)
;if(h.push({m_path:a.path,m_mod_time:a.mod,m_received:a.received,m_element:u}),g.set(u,{m_item_el:u,m_item_icon_text_el:m,
m_item_icon_el:n,m_item_data_view_el:p,m_item_data_view_expand_button_el:q,m_totp_timer:r,m_compromised_button_el:s,
m_item_info:a}),i>=e.length)fz((0,M.TT)(b1),u);else{const a=e[i].m_element
;null===(b=a.parentElement)||void 0===b||b.replaceChild(u,a)}}if(e.length>d.length){for(let a=d.length;a<e.length;a++){
e[a].m_element.remove()}fB((0,M.TT)(b1))}ff(),b4={m_list_mode:1,m_all_logins_selected_folder:bY,m_items:h,m_views:g},
b1&&0!==g.size&&(0,J.fI)(fC(b1,g,[dA,dt],a))}(b)}))}(a);break;case 2:fg(a)}}function ff(){const a=bW;bW=!0,a||fd()}
function fg(a){b5.Start((async b=>{0!==a&&await(0,J.Gu)(a,b),await async function(a){var b;let c=[],d=null,e=!1
;b4&&2===b4.m_list_mode?(c=b4.m_items,d=b4.m_all_logins_selected_folder):e=!0
;const f=await R.List(bY,0,a),g=new Set([8,1]),h=f.filter((a=>g.has(a.type)));if(a.ThrowIfShouldStop(),
0===h.length&&!bY)return fV(2,!1),fX(),fh(),function(){const a=P("div",{className:"empty-list"},P("div",{
className:"big-icon-section"},P("div",{className:"big-icon login-icon"})),eb(!1));(0,M.TT)(b2).appendChild(a)}(),gz(b3),b4=null,
void ff();bY||h.length>bf?(fY(),fV(2,!0)):fV(2,!1);fX(),e&&fh();const i=new Map,j=[];for(let k=0;k<h.length;k++){
const a=h[k],d=a.path;if(k<c.length){const b=c[k];if(b.m_path===d&&b.m_mod_time===a.mod&&b.m_received===a.received){j.push(b)
;continue}}const e=8===a.type?(0,G._p)(d):(0,G.HE)((0,G._p)(d)),f=(0,G.tM)(e,bO),g=fw(a);let m,n,o,p,q,r,s,t;const u=P("div",{
className:"list-item multiple-rows",onmouseenter:()=>{o.offsetWidth<o.scrollWidth&&gv(o,e)}},P("div",{
className:"list-item-main-row"},m=P("div",{className:"icon-text",title:8===a.type?"":de,role:"button",onclick:b=>{
8===a.type?(bY=a.path,fg(0)):f1(a,!0,b.ctrlKey)},oncontextmenu:b=>f0(a.path,u,b,!0)},P("div",{className:"icon-section"},n=(0,
l.AG)(a.path,a.type),g?P("div",{className:g}):null),P("div",{className:"path-view"},o=P("div",{className:"text"
},f)),1===a.type?P("div",{className:"action-icon image fill-action-icon"}):null),q=gt(P("div",{
className:"more-actions-button hidden",title:dk,role:"button"},P("div",{className:"icon"},r=P("div",{className:"totp-timer"
}))),!1,(()=>u)),s=ao?(0,l.oG)(a,bM,f7):null,t=P("div",{className:"more-actions-button",title:dd,role:"button",
ariaHasPopup:"true",ariaLabel:dd,onclick:b=>f6(b,u,t,a.path,!0)},P("div",{className:"icon more-actions-icon image"
}))),p=1===a.type?P("div",{className:"list-item-data-row hidden"}):null);if(j.push({m_path:a.path,m_mod_time:a.mod,
m_received:a.received,m_element:u}),i.set(u,{m_item_el:u,m_item_icon_text_el:m,m_item_icon_el:n,m_item_data_view_el:p,
m_item_data_view_expand_button_el:q,m_totp_timer:r,m_compromised_button_el:s,m_item_info:a}),k>=c.length)fz((0,
M.TT)(b2),u);else{const a=c[k].m_element;null===(b=a.parentElement)||void 0===b||b.replaceChild(u,a)}}if(c.length>h.length){
for(let a=h.length;a<c.length;a++){c[a].m_element.remove()}fB((0,M.TT)(b2))}if(bY){if(d!==bY){(0,A.h9)((0,M.TT)(b3))
;const a=[],b=bY.split("/");for(let c=0;c<b.length;c++){const d=b[c],e=0===c?await ad.LocalizeString("HomeFolder"):d,f=P("div",{
className:"folder-part"},P("div",{className:"folder-name",onclick:function(){const a=b.slice(0,c+1).join("/");a!==bY&&(bY=a,
fg(0))}},e),c!==b.length-1?P("div",{className:"folder-separator"},">"):null);a.push(f)}for(const c of a)(0,
M.TT)(b3).appendChild(c);gA(b3)}}else gz(b3);ff(),b4={m_list_mode:2,m_all_logins_selected_folder:bY,m_items:j,m_views:i},
b2&&0!==i.size&&(0,J.fI)(fC(b2,i,[dA,dt],a))}(b)}))}function fh(){(0,A.h9)((0,M.TT)(b2))}function fi(){(0,A.h9)((0,M.TT)(b0))}
function fj(){const a=P("div",{className:"empty-list"},P("div",{className:"text"},b8));(0,M.TT)(b0).appendChild(a)}
function fk(){const a=P("div",{className:"empty-list"},P("div",{className:"big-icon-section"},P("div",{
className:"big-icon login-icon"})),P("div",{className:"caption"},b9),eb(!1));(0,M.TT)(b0).appendChild(a)}function fl(){(0,
A.h9)((0,M.TT)(b1))}function fm(){const a=P("div",{className:"empty-list"},P("div",{className:"big-icon-section"},P("div",{
className:"big-icon login-icon"})),P("div",{className:"caption"},b9),eb(!1));(0,M.TT)(b1).appendChild(a)}function fn(){
cJ.Start((async a=>{await async function(a){if(await async function(a){const c=await b.GetFillOptionsListForCurrentTab(a)
;if(a.ThrowIfShouldStop(),c){
const a=c.m_matching_logins.filter((a=>a.m_client_data)).map((a=>a.m_client_data)),b=c.m_matching_identities.filter((a=>a.m_client_data)).map((a=>a.m_client_data)),d=c.m_domain_logins.filter((a=>a.m_client_data)).map((a=>a.m_client_data))
;cK={m_matching_logins:a,m_domain_logins:d,m_matching_identities:b,m_activate_fill_logins_tab:c.m_activate_fill_logins_ui,
m_activate_fill_id_tab:c.m_activate_fill_identities_ui,m_show_password_generator:c.m_password_generator}}else cK={
m_matching_logins:[],m_domain_logins:[],m_matching_identities:[],m_activate_fill_logins_tab:!1,m_activate_fill_id_tab:!1,
m_show_password_generator:!1}}(a),!cK)return;fp(),await async function(){c5||c8||(c5=await(0,F.$)("pwd-gen-words.json",null,ai))
;if(c8){const a=(0,d.H5)(),b=await aa.Get({PassGenCharNumber:a.m_length,PassGenExcludeSimilar:a.m_exclude_similar_chars,
PassGenUseHexChars:a.m_hex_digits_only,PassGenCheckUpper:a.m_include_upper_case_chars,
PassGenCheckLower:a.m_include_lower_case_chars,PassGenCheckNumber:a.m_include_digits,
PassGenCheckSpecial:a.m_include_specific_chars,PassGenCharSet:a.m_specific_chars}),c={m_length:b.PassGenCharNumber,
m_include_digits:b.PassGenCheckNumber,m_include_upper_case_chars:b.PassGenCheckUpper,
m_include_lower_case_chars:b.PassGenCheckLower,m_include_specific_chars:b.PassGenCheckSpecial,m_specific_chars:b.PassGenCharSet,
m_min_digits:-1,m_hex_digits_only:b.PassGenUseHexChars,m_exclude_similar_chars:b.PassGenExcludeSimilar};(0,
M.TT)(c2).SetValues(c)}else{const a=(0,d.CZ)(),b=await aa.Get({PassphraseGenCharNumber:a.m_length,
PassphraseGenExcludeSimilar:a.m_exclude_similar_chars,PassphraseGenUseHexChars:a.m_hex_digits_only,
PassphraseGenCheckUpper:a.m_include_upper_case_chars,PassphraseGenCheckLower:a.m_include_lower_case_chars,
PassphraseGenCheckNumber:a.m_include_digits,PassphraseGenCheckSpecial:a.m_include_specific_chars,
PassphraseGenCharSet:a.m_specific_chars}),c={m_length:b.PassphraseGenCharNumber,m_include_digits:b.PassphraseGenCheckNumber,
m_include_upper_case_chars:b.PassphraseGenCheckUpper,m_include_lower_case_chars:b.PassphraseGenCheckLower,
m_include_specific_chars:b.PassphraseGenCheckSpecial,m_specific_chars:b.PassphraseGenCharSet,m_min_digits:-1,
m_hex_digits_only:b.PassphraseGenUseHexChars,m_exclude_similar_chars:b.PassphraseGenExcludeSimilar};(0,M.TT)(c2).SetValues(c)}
let a="";dj=[...await Y.GetHistory(null)],dj.length>0&&(a=dj[0].m_password);a?c7&&c7===a||(c7=a):c7="";if(c7)(0,
M.TT)(c0).textContent=c7,await gq();else try{await gp()}catch(b){await go(),await gp()}}(),gi(),
0===cK.m_matching_identities.length&&(et(),ex());0===cK.m_matching_logins.length&&(fi(),0!==cK.m_domain_logins.length?fj():fk())
;0===cK.m_domain_logins.length&&0===cK.m_matching_logins.length&&(fl(),fm());if(as||!dQ)cK.m_activate_fill_logins_tab?(a7=0,
fa()):cK.m_activate_fill_id_tab?3===ay&&2===ci&&0===bb?es():(bb=0,ek()):cK.m_show_password_generator&&ek(),
cK.m_activate_fill_logins_tab||0===cK.m_domain_logins.length||(a7=1);else switch(ay){case 2:switch(a7){case 0:case 1:fe(0)}break
;case 3:if(2===ci)if(0===bb)el(0)}return void(as=!1)}(a)}))}function fo(){dD.Start((async a=>{await async function(a){
const c=await b.GetAutoFunctionsModesForCurrentTab(a);0===(null==c?void 0:c.m_auto_fill_mode)&&dG&&(await f(!1),dG=!1)
;0===(null==c?void 0:c.m_auto_save_mode)&&dJ&&(await g(!1),dJ=!1);if(!c)return;const d=c.m_auto_fill_blocked_on_domain
;if(0===c.m_auto_fill_mode);else if(dG){
!(0,M.TT)(dF).GetChecked()!==d&&(0,M.TT)(dF).SetChecked(!c.m_auto_fill_blocked_on_domain)}else d&&(await f(!0),dG=!0,
await b.ShowBlockedAutoFillForCurrentPage(a));const e=c.m_auto_save_blocked_on_domain;if(0===c.m_auto_save_mode);else if(dJ){
!(0,M.TT)(dI).GetChecked()!==e&&(0,M.TT)(dI).SetChecked(!c.m_auto_save_blocked_on_domain)}else e&&(await g(!0),dJ=!0)
;async function f(a){let b;if(a){const a=await ad.LocalizeString("MainPage_EnableInpageIconsOnDomain_Text");b=P("div",{
className:"manage-auto-fill-on-domain flex-row"},dF=P(B.b_,{checked:!1,text:a,onchange:h}))}else b=P("div",{
className:"manage-auto-fill-on-domain flex-row hidden"});(0,M.TT)(dE).replaceWith(b),dE=b}async function g(a){let b;if(a){
const a=await ad.LocalizeString("MainPage_EnableAutoSaveOnDomain_Text");b=P("div",{
className:"manage-auto-save-on-domain flex-row"},dI=P(B.b_,{checked:!1,text:a,onchange:i}))}else b=P("div",{
className:"manage-auto-save-on-domain flex-row hidden"});(0,M.TT)(dH).replaceWith(b),dH=b}function h(){const a=(0,
M.TT)(dF).GetChecked();(0,A.PQ)((()=>b.BlockAutoFunctionsForCurrentTabDomain(!a,void 0,null)),gd,dr,gb,(a=>fQ((0,m.Qo)(a),5,2)))
}function i(){const a=(0,M.TT)(dI).GetChecked()
;(0,A.PQ)((()=>b.BlockAutoFunctionsForCurrentTabDomain(void 0,!a,null)),gd,dr,gb,(a=>fQ((0,m.Qo)(a),5,2)))}}(a)}))}
function fp(){if(!cK)return;let a=!1,b=!1;0!==cK.m_matching_logins.length&&(a=!0),0!==cK.m_matching_identities.length&&(b=!0),
cK.m_show_password_generator&&(a||b||(b=!0)),a?gA(aR):gz(aR),b?gA(aZ):gz(aZ)}function fq(){(0,J.fI)(V.OpenStartPage(null)),
b.ClosePopup()}function fr(){const a=(0,d.Ms)({view:ad,options:aa,settings:ab,passwordsHistory:Y,commands:(0,M.TT)(V),
clipboard:ag,http:ai,rng:aj,isNativeApp:an});f3((async()=>c.ShowViewAndWaitResult(a,!0,(0,J.f4)(null,null,null))))}
function fs(a){ax||function(){ax=!0;const a=(0,M.TT)(aw).getBoundingClientRect();function c(){const a=(0,k.NI)((0,M.TT)(aw))
;return a.onHide=e,a.onShow=d,a}function d(a){(0,k.dB)((0,M.TT)(aw),!0)}function e(a){(0,k.dB)((0,M.TT)(aw),!1),
setTimeout((function(){ax=!1}),300)}dP=(0,k.Lj)(a,(()=>b.GetCommandsForMainDotsMenu()),c(),(function(a,b){return(0,
M.TT)(aq).style.width=(0,z.Md)(a),(0,M.TT)(aq).style.height=(0,z.Md)(b),(0,M.TT)(aw).getBoundingClientRect()}),gs)}(),
a.stopPropagation()}function ft(){const a=(0,M.TT)(aE).getBoundingClientRect();let c;switch(bt){case 0:case 1:case 2:c=1;break
;case 4:c=7;break;case 3:c=2;break;case 5:c=5}f4((()=>b.ShowNativeItemsList(a,c)))}function fu(){switch(bt){default:case 2:
case 1:case 0:gw(aG,aH),d1((0,M.TT)(aF),"icon-","icon-logins"),gv(aE,aL);break;case 3:gw(aG,aJ),d1((0,
M.TT)(aF),"icon-","icon-bookmarks"),gv(aE,aN);break;case 4:gw(aG,aK),d1((0,M.TT)(aF),"icon-","icon-safenotes"),gv(aE,aO);break
;case 5:gw(aG,aI),d1((0,M.TT)(aF),"icon-","icon-identities"),gv(aE,aM)}am?gA(aE):gz(aE)}function fv(){
b.IsNativeUIAvailable()&&"mac"===ae&&(0,J.fI)(b.CloseNativeMenu())}function fw(a){if(a.sharedGroup){
if(a.granted)return"icon-overlay icon-overlay-manager";if(a.readOnly)return"icon-overlay icon-overlay-limited"
;if(a.received)return"icon-overlay icon-overlay-regular"}else if(a.sharedFolder){
if(a.granted)return"icon-overlay icon-overlay-granted";if(a.readOnly)return"icon-overlay icon-overlay-login-only"
;if(a.received)return"icon-overlay icon-overlay-received"}else{if(a.granted)return"icon-overlay icon-overlay-granted"
;if(a.readOnly)return"icon-overlay icon-overlay-login-only";if(a.received)return"icon-overlay icon-overlay-received"}return null
}function fx(a,b,c,d,e){if(5===b){gv(a,dg+" '"+e+"'")}else if(2===b){gv(a,d?di+" '"+e+"'":di)}else if(7===b){
gv(a,d?dh+" '"+e+"'":dh)}else if(1===b){const b=c?de:df;gv(a,d?b+" '"+e+"'":b)}}async function fy(a,b){switch(a.type){case 1:
case 2:break;default:return null}let c=a.gotoUrl,d=a.matchUrl;if(void 0===c){const e=await R.GetInfo(a.path,4,b);c=e.gotoUrl,
d=e.matchUrl}if(!c)return null;const e=await async function(a){if(void 0===al)try{const b=await(0,m.AT)(Q);al=await(0,
m.UJ)(b,ai,a)}catch(b){if((0,I.bf)(b))throw b;al=r.s8+"/icons"}return al}(b);return e?(0,m.m9)((0,w.g4)(c,d),a.type,e):null}
function fz(a,b){let c=a.lastElementChild;if(!c||c.childElementCount>=bV){const b=P("div",{className:"list-items-group"})
;b.style.display="flex",b.style.flexDirection="column",b.style.width="100%",a.append(b),c=b}c.appendChild(b)}function fA(a,b){
var c,d;const e=b.nextElementSibling;if(e)return e;const f=b.parentElement
;return f!==a&&f&&null!==(d=null===(c=f.nextElementSibling)||void 0===c?void 0:c.firstElementChild)&&void 0!==d?d:null}
function fB(a){for(let b=a.lastElementChild;b&&0===b.childElementCount;b=b.previousElementSibling)b.remove()}
async function fC(a,c,d,e){if(bR){bS&&(bS.disconnect(),bS=null),bU&&(bU(),bU=null),await bT.Stop()
;const i=new IntersectionObserver(s,{root:a,rootMargin:"0px 0px 80px 0px"});a.addEventListener("scroll",u,{capture:!1,passive:!0
}),bU=()=>a.removeEventListener("scroll",u,{capture:!1});let k=!1;for(const[x,y]of c.entries())switch(y.m_item_info.type){
case 1:case 2:case 4:case 3:i.observe(x),k=!0}if(e&&await e.YieldToUI(50),!ar)return;k&&(bS=i,s(i.takeRecords()))
;let l,m,n,p,q=new WeakMap,r=new WeakMap;function s(a){(0,J.fI)(t(a))}async function t(a){for(const b of a)if(b.isIntersecting){
const a=b.target,d=c.get(a);if(d){i.unobserve(a),await f(d);const b=d.m_item_info;1===b.type&&d.m_item_data_view_el&&(0,
J.fI)(g(d)),Z&&d.m_compromised_button_el&&(1!==b.type||b.readOnly||b.hidePasswords||(0,J.fI)(h(d)))}}}function u(a){v()}
function v(){(0,J.fI)(bT.Execute({action:w},null))}async function w(b){await(0,J.Gu)(c.size>300?1e3:300,b,!1),await(0,
z.KK)(null,b);const e=a.getBoundingClientRect(),f=null!=n?n:n=a.clientWidth;e.width!==l?(q=new Map,r=new Map,l=e.width,
m=e.height,p=void 0):e.height!==m&&(p=void 0,m=e.height);const g=null!=p?p:(p=d.filter((a=>null!==a)).map((a=>(0,
M.TT)(a).getBoundingClientRect())).filter((a=>!(0,H.X4)(a)))).filter((a=>a.top<e.bottom));if(0===g.length)return
;const h=g.reduce(((a,b)=>b.top<a?b.top:a),e.bottom)-7,i=(0,z.Md)(f-g[0].left+7);let j,k=null;for(let c=function(a){
const b=a.firstElementChild;return(null==b?void 0:b.classList.contains("list-items-group"))?b.firstElementChild:b
}(a);c;c=fA(a,c)){let a=c.getBoundingClientRect();if(!(0,H.X4)(a)&&(0,H.kF)(a,e)){k=c,c.style.marginRight&&(r.set(c,a.height),
await(0,z.Xb)(b),c.style.marginRight="",await(0,z.KK)(null,b),a=c.getBoundingClientRect()),q.set(c,a.height),j=a.top;break}}
let o=!1;for(let c=k,d=j;c&&void 0!==d&&d<e.bottom;){let f;if(f=c.style.marginRight?r.get(c):q.get(c),void 0===f){o&&(await(0,
z.KK)(null,b),o=!1);const a=c.getBoundingClientRect();if((0,H.X4)(a)||!(0,H.kF)(a,e))break
;c.style.marginRight?r.set(c,a.height):q.set(c,a.height),f=a.height}if(d+f>=h){if(c.style.marginRight!==i&&(await(0,z.Xb)(b),
c.style.marginRight=i,o=!0),f=r.get(c),void 0===f){o&&(await(0,z.KK)(null,b),o=!1);const a=c.getBoundingClientRect();if((0,
H.X4)(a)||!(0,H.kF)(a,e))break;r.set(c,a.height),f=a.height}}else if(""!==c.style.marginRight&&(await(0,z.Xb)(b),
c.style.marginRight="",o=!0),f=q.get(c),void 0===f){o&&(await(0,z.KK)(null,b),o=!1);const a=c.getBoundingClientRect();if((0,
H.X4)(a)||!(0,H.kF)(a,e))break;q.set(c,a.height),f=a.height}c=fA(a,c),d+=f}}v()}return;async function f(a){
const b=await fy(a.m_item_info,null);b&&(a.m_item_icon_el.style.backgroundImage="url("+b+")")}async function g(a){var c
;if(!a.m_item_data_view_el)return;const d=await R.GetDataItem(a.m_item_info.path,3,null,null),e=(0,o.JG)(d),f=e?(0,
D.A8)(e):null,g=f?(0,C.sr)(f):void 0;if(e&&f&&g){let c,d;const h=P("div",{className:"totp-section",title:dl,onclick:a=>{
a.preventDefault(),a.stopPropagation(),(0,J.fI)((async()=>{const a=(0,C.sr)(f)
;a&&(await b.CopyTextToClipboardWithAutoClear(a,120),fQ(await ad.LocalizeString("Login_OneTimeCode_Copied_Text"),3,null))})())}
},P("div",{className:"totp-title"},dk),P("div",{className:"totp-code monospace"
},c=P("span",null,g.substring(0,3)),d=P("span",null,g.substring(3))),P("div",{className:"icon-copy",title:dl,role:"button",
ariaLabel:dl}))
;gA(a.m_item_data_view_expand_button_el),a.m_item_data_view_el.firstChild?a.m_item_data_view_el.firstChild.replaceWith(h):a.m_item_data_view_el.appendChild(h),
gA(a.m_item_data_view_el),dn.set(a.m_item_el,{m_totp_timer:a.m_totp_timer,m_totp_code_el1:c,m_totp_code_el2:d,
m_totp_key_or_uri:e,m_otp_auth_info:f,m_last_interval_start_utc_msec:null}),dp.add(a.m_item_el),dm.IsExecuting()||dm.Start((0,
j.s)((async(a,b)=>{var c,d;let e=0;for(const[f,g]of dn){if(dp.has(f)){const h=(0,
j._)(a,g.m_otp_auth_info.period,g.m_last_interval_start_utc_msec);if(await(0,z.Xb)(b),h.generate){const a=(0,
C.sr)(g.m_otp_auth_info);g.m_totp_code_el1.textContent=null!==(c=null==a?void 0:a.substring(0,3))&&void 0!==c?c:"",
g.m_totp_code_el2.textContent=null!==(d=null==a?void 0:a.substring(3))&&void 0!==d?d:"",
g.m_last_interval_start_utc_msec=h.startTimeUTCmsec
}else h.progressPercents<70?(g.m_totp_timer.style.background=`conic-gradient(transparent ${h.progressPercents}%, var(--totp-timer-normal-color) 0 100%)`,
g.m_totp_timer.style.borderColor="var(--totp-timer-normal-color)"):(g.m_totp_timer.style.background=`conic-gradient(transparent ${h.progressPercents}%, var(--totp-timer-warning-color) 0 100%)`,
g.m_totp_timer.style.borderColor="var(--totp-timer-warning-color)");await(0,z.KK)(30,b);const i=f.getBoundingClientRect();(0,
H.X4)(i)||e++}else dn.delete(f);b.ThrowIfShouldStop()}return 0!==e}),300))
}else null===(c=a.m_item_data_view_el.firstChild)||void 0===c||c.remove(),gz(a.m_item_data_view_el)}async function h(a){
if(!Z)return;const b=await Z.GetUpdateUserDataItemBreaches(a.m_item_info.path,null);if(b&&0!==b.m_breaches.length){
await W.GetSecurityWarningEnabledForDataItem(a.m_item_info.path,[0],null)&&gA(a.m_compromised_button_el)}}}function fD(a){
du||fE(!0),a.stopPropagation()}function fE(a){f4((()=>async function(a){const d=await ac.Get({DisableCreateLogins:!1,
DisableCreateBookmarks:!1,NoPasscards:!1,DisableCreateIdentities:!1,DisableCreateSafenotes:!1,DisableNonGroupData:!1
}),e=await aa.Get({AccountEnterprise:!1,AccountCompanyAdmin:!1,AccountClientReadOnly:!1,AccountClientBlocked:!1
}),g=e.AccountCompanyAdmin,h=d.DisableNonGroupData,i=e.AccountEnterprise,j=d.NoPasscards||d.DisableCreateLogins,l=d.DisableCreateIdentities,n=d.DisableCreateBookmarks,o=d.DisableCreateSafenotes,p=function(){
if(1===ay&&0!==bt&&2===a5&&bv)return bv;if(2===ay&&2===a7&&bY)return bY;return""}();switch(ay){case 3:return A(l,5,"identity")
;case 2:return A(j,1,"login");case 1:switch(bt){case 2:return A(j,1,"login");case 3:return A(n,2,"bookmark");case 4:
return A(o,7,"safenote");case 5:return A(l,5,"identity");case 1:case 0:if(!a)return A(j,1,"login")}}
if(1!==ay||1!==bt&&0!==bt)throw(0,I.ZU)(I.V2,"Unexpected");const q=[];j||q.push({
title:await ad.LocalizeString("RoboformType_Login"),imageClass:"command-create-login",onCommand:fN((async(a,b)=>{
await A(j,1,"login")}))});l||q.push({title:await ad.LocalizeString("RoboformType_Identity"),
imageClass:"command-create-identity",onCommand:fN((async(a,b)=>{await A(l,5,"identity")}))});o||q.push({
title:await ad.LocalizeString("RoboformType_Safenote"),imageClass:"command-create-safenote",onCommand:fN((async(a,b)=>{
await A(o,7,"safenote")}))});q.push({title:await ad.LocalizeString("RoboformType_Folder"),imageClass:"command-create-folder",
onCommand:fN((async(a,b)=>{if(!await y())return void fQ(await ad.LocalizeString("Policy_DisableNonGroupData_Message"),5,2)
;const d=(0,f.I)({basePath:p,data:R,viewApi:ad});await c.ShowViewAndWaitResult(d,!0,b),ay=1,bt=1,a5=2,bv=p,gh(),d3(),d0(),fS(),
d4(bt,a5),await c.ShowView(dT,!1);const e=(0,m.Y5)(8,!1),g=await ad.LocalizeString(e)
;fQ(await ad.LocalizeString("Notification_Item_Created_Text",[g]),null,null)}))}),i&&g&&q.push({
title:await ad.LocalizeString("SharedFolderSettings_Group"),imageClass:"command-create-group",onCommand:fN((async(a,c)=>{(0,
J.fI)(V.OpenFolder(p,{mode:"share"})),b.ClosePopup()}))});du=!0
;const r=(0,M.TT)(dt).getBoundingClientRect(),s=r.top+r.height/2,t=r.left+5,u={height:0,width:0,top:s,bottom:s,y:s,x:t,
right:r.right,left:t};function v(){const a=(0,k.NI)((0,M.TT)(dt));return a.onHide=x,a.onShow=w,a}function w(a){}function x(a){
setTimeout((function(){du=!1}),300)}async function y(){if(h&&!g){if(!(await R.GetInfo(p,1,null)).sharedGroup)return!1}return!0}
async function A(a,c,d){if(a)fQ(await ad.LocalizeString("Policy_FileCreationProhibited_Text",[await ad.LocalizeString((0,
m.Y5)(c,!1))]),5,2);else{if(await y())return f4((()=>async function(a,c){const d={startPage:!0};c&&(d.folderPath=c)
;if("bookmark"===a){const a=await b.GetCurrentTabUrl(null);a&&(d.url=a)}(0,J.fI)(V.CreateNew(a,d)),b.ClosePopup()}(d,p)))
;fQ(await ad.LocalizeString("Policy_DisableNonGroupData_Message"),5,2)}}dP=(0,k.Lj)(u,(async()=>q),v(),(function(a,b){return(0,
M.TT)(aq).style.width=(0,z.Md)(a),(0,M.TT)(aq).style.height=(0,z.Md)(b),(0,M.TT)(dt).getBoundingClientRect()}),gs)}(a)))}
async function fF(){return(0,n.z)(await async function(){return aa.Get({AccountClientReadOnly:!1,AccountClientBlocked:!1})}())}
function fG(){if(dt)switch(ay){case 3:gv(dt,dz);break;case 2:gv(dt,dw);break;case 1:switch(bt){case 3:gv(dt,dx);break;case 4:
gv(dt,dy);break;case 2:gv(dt,dw);break;case 5:gv(dt,dz);break;default:gv(dt,dv)}}}function fH(){
0!==cL||3===ay&&(1===ci||3===ci)?(gz(dA),gz(dt)):(gA(dt),an?gz(dA):1!==ay||5!==bt&&4!==bt?gA(dA):gz(dA))}function fI(){
dA&&gv(dA,1===ay&&3===bt?dC:dB)}function fJ(){f3((()=>async function(a){const c=await b.ShowSaveFormsPage(a),d=(0,m.Y5)(c,!1)
;fQ(await ad.LocalizeString("Notification_Item_Created_Text",[await ad.LocalizeString(d)]),null,null)}((0,
J.f4)(null,null,null))))}async function fK(a,d){let e;try{e=await R.GetInfo(a,36,null)}catch(f){if(!(0,v.tM)(f,4))throw f;e={
path:a,type:(0,o.hF)(a),error:f}}switch(e.type){case 8:return async function(a){const d=[],e=await aa.Get({SyncIsOn:!1,
AccountCompanyAdmin:!1,AccountClientReadOnly:!1,AccountClientBlocked:!1}),f=e.AccountCompanyAdmin,h=e.SyncIsOn,j=0!==(0,
n.z)(e)?await ad.LocalizeString("Menu_BlockedItem_Upgrade"):void 0,k=await ac.Get({SelfHostedServer:!1,DisableSharing:!1
}),l=k.SelfHostedServer,m=k.DisableSharing,p=a.readOnly&&a.sharedFolder,q=a.sharedGroup||!1,r=a.sharedFolder||!1,s=(0,
G.Y0)(a.path),t=""===s;if(q){if(p)return t&&await v(),d;return a.granted||!1?(t?(await w(),f&&await x(),await v()):(await w(),
await x()),d):(t?await v():(await w(),await x()),d)}if(r)return p?t?(await w(),await x(),await u(),d):d:(await w(),await x(),
t&&await u(),d);if(await w(),await x(),t&&h&&!l&&!m){d.push("separator")
;const c=f?await ad.LocalizeString("Cmd_ConvertFolderToGroup_Key"):await ad.LocalizeString("Cmd_ShareExistingFolder_Key")
;d.push({title:c,imageClass:"command-share-icon",blockedText:j,onCommand:fN((async(c,d)=>((0,J.fI)(V.OpenFolder(a.path,{
mode:"share"})),b.ClosePopup())))})}return d;async function u(){d.push({
title:await ad.LocalizeString("Cmd_SharedFolderSettings_Key"),imageClass:"command-share-icon",blockedText:j,
onCommand:fN((async(c,d)=>(await V.ShowSharedFolderDialog(a.path),b.ClosePopup())))})}async function v(){d.push({
title:await ad.LocalizeString("Cmd_GroupSettingsFlat"),imageClass:"command-share-icon",blockedText:j,
onCommand:fN((async(c,d)=>(await V.ShowSharedFolderDialog(a.path),b.ClosePopup())))})}async function w(){d.push({
title:await ad.LocalizeString("Cmd_Rename_Flat"),imageClass:"command-rename-icon",blockedText:j,onCommand:fN((async(b,d)=>{
const e=(0,g.z)({data:{itemPath:a.path,itemType:a.type,groupName:null,instanceName:null,instanceDisplayName:null,
initialIdentity:null},dataStorage:R,dataItemDisplayNameProvider:S,sharing:X,commands:V,viewApi:ad
}),f=await c.ShowViewAndWaitResult(e,!0,d);if((0,o.QC)(a.path,cj)){const b=(0,G.fA)(a.path)+"/"+f;cj=cj.replace(a.path,b)}
const h=(0,o.em)(a.path);fQ(await ad.LocalizeString("Notification_Item_Renamed_Text",[h,f]),null,null)}))})}async function x(){
d.push({title:await ad.LocalizeString("Cmd_Delete_Flat"),imageClass:"command-delete-icon",blockedText:j,
onCommand:fN((async(b,d)=>{const e=(0,i.f)(a,R,Q,ad,X),f=await c.ShowViewAndWaitResult(e,!0,d),g=(0,
G.XE)(a.path,8===a.type,void 0)
;fQ(r&&t?a.sharedGroup?await ad.LocalizeString("StartPage_DeleteGroup_Notification"):f?await ad.LocalizeString("StartPage_RemoveSharedFolder_Notification"):await ad.LocalizeString("StartPage_DeleteSharedFolder_Notification"):await ad.LocalizeString("Notification_File_Deleted_Text",[g]),null,null)
}))})}}(e);case 2:return async function(a){
const d=a.error&&(0,v.tM)(a.error,4),e=a.readOnly&&a.sharedFolder,f=fL(a.gotoUrl,a.matchUrl),i=0!==await fF()?await ad.LocalizeString("Menu_BlockedItem_Upgrade"):void 0,j=[]
;(null==f?void 0:f.canGoTo)&&(j.push({title:await ad.LocalizeString("Cmd_Goto_Flat"),imageClass:"command-goto-icon",
highlighted:!0,blockedText:i,onCommand:fN((async(c,e)=>{if(d)fQ((0,m.Qo)(a.error),5,2);else{if(!f.unsafeToOpenInBrowser){
const c=await aa.GetValue("ToolbarOpensNewWindow",!0);return(0,J.fI)(V.GoTo(a.path,{newTab:c})),b.ClosePopup()}
fQ(await ad.LocalizeString("CannotOpenUrlForSecurityReasons"),5,2)}}))}),j.push("separator"));if((null==f?void 0:f.url)&&!e){
const a=f.url;j.push({title:await ad.LocalizeString("Cmd_Copy_URL_Flat"),imageClass:"command-copy-icon",onCommand:async(c,d)=>{
await b.CopyTextToClipboardWithAutoClear(a,120);fQ(await ad.LocalizeString("Notification_URL_Copied_Text"),null,null)}}),
j.push("separator")}e||(j.push({title:await ad.LocalizeString("Cmd_View_Flat"),imageClass:"command-view-icon",
onCommand:async(c,d)=>((0,J.fI)(V.OpenFile(a.path,{mode:"view"})),b.ClosePopup())}),a.readOnly||j.push({
title:await ad.LocalizeString("Cmd_Edit_Flat"),imageClass:"command-edit-icon",blockedText:i,onCommand:fN((async(c,d)=>((0,
J.fI)(V.OpenFile(a.path,{mode:"edit"})),b.ClosePopup())))}),j.push({title:await ad.LocalizeString("Cmd_Rename_Flat"),
imageClass:"command-rename-icon",blockedText:i,onCommand:fN((async(b,d)=>{const e=(0,g.z)({data:{itemPath:a.path,
itemType:a.type,groupName:null,instanceName:null,instanceDisplayName:null,initialIdentity:null},dataStorage:R,
dataItemDisplayNameProvider:S,sharing:X,commands:V,viewApi:ad
}),f=(0,J.f4)(null,null,null),h=await c.ShowViewAndWaitResult(e,!0,f),i=(0,o.em)(a.path)
;fQ(await ad.LocalizeString("Notification_Item_Renamed_Text",[i,h]),null,null)}))}),j.push({
title:await ad.LocalizeString("Cmd_Delete_Flat"),imageClass:"command-delete-icon",blockedText:i,onCommand:fN((async(b,d)=>{
const e=(0,h.C)({itemInfo:a,rfCommands:V,rfDataStorage:R,viewApi:ad});await c.ShowViewAndWaitResult(e,!0,d);const f=(0,
G.XE)(a.path,!1,void 0);fQ(await ad.LocalizeString("Notification_File_Deleted_Text",[f]),null,null)}))}),j.push("separator"))
;return await fO(a,j),await fP(a,j),j}(e);case 1:case 3:case 4:return async function(a,d){const e=a.error&&(0,
v.tM)(a.error,4),f=a.readOnly&&a.sharedFolder,i=await aa.Get({ToolbarOpensNewWindow:!0,AccountClientReadOnly:!1,
AccountClientBlocked:!1
}),j=i.ToolbarOpensNewWindow,k=0!==(0,n.z)(i)?await ad.LocalizeString("Menu_BlockedItem_Upgrade"):void 0,l=fL(a.gotoUrl,a.matchUrl),p=[]
;let q=!1;4!==a.type?d?(an||(p.push(await s()),q=!0,f||p.push(await r())),(null==l?void 0:l.canGoTo)&&(p.push(await t()),
f||p.push(await w()))):((null==l?void 0:l.canGoTo)&&(p.push(await t()),q=!0,f||(p.push(await u()),p.push(await w()))),
an||f||p.push(await r())):!f&&(null==l?void 0:l.canGoTo)&&p.push(await w());if(0!==p.length){if(q){const a=p[0]
;a&&"separator"!==a&&(a.highlighted=!0)}p.push("separator")}if(e||4===a.type);else{let c=!1
;const d=await R.GetDataItem(a.path,3,null,null);if(!f){const a=fR(d,x.Df);a&&(p.push({
title:await ad.LocalizeString("Cmd_Copy_Username_Flat"),imageClass:"command-copy-icon",onCommand:async(c,d)=>{
await b.CopyTextToClipboardWithAutoClear(a,120),fQ(await ad.LocalizeString("Notification_Username_Copied_Text"),null,null)}}),
c=!0);const e=fR(d,x.Aq);e&&(p.push({title:await ad.LocalizeString("Cmd_Copy_Password_Flat"),imageClass:"command-copy-icon",
onCommand:async(a,c)=>{
await b.CopyTextToClipboardWithAutoClear(e,120),fQ(await ad.LocalizeString("Notification_Password_Copied_Text"),null,null)}}),
c=!0)}const e=(0,o.JG)(d);e&&(p.push({title:await ad.LocalizeString("Login_OneTimeCode_Copy"),imageClass:"command-copy-icon",
onCommand:async(a,c)=>{const d=(0,C._b)(e);d&&(await b.CopyTextToClipboardWithAutoClear(d,120),
fQ(await ad.LocalizeString("Login_OneTimeCode_Copied_Text"),3,null))}}),c=!0),c&&p.push("separator")}f||(p.push({
title:await ad.LocalizeString("Cmd_View_Flat"),imageClass:"command-view-icon",onCommand:async(c,d)=>((0,
J.fI)(V.OpenFile(a.path,{mode:"view"})),b.ClosePopup())}),a.readOnly||p.push({title:await ad.LocalizeString("Cmd_Edit_Flat"),
imageClass:"command-edit-icon",blockedText:k,onCommand:fN((async(c,d)=>((0,J.fI)(V.OpenFile(a.path,{mode:"edit"})),
b.ClosePopup())))}),p.push({title:await ad.LocalizeString("Cmd_Rename_Flat"),imageClass:"command-rename-icon",blockedText:k,
onCommand:fN((async(b,d)=>{const e=(0,g.z)({data:{itemPath:a.path,itemType:a.type,groupName:null,instanceName:null,
instanceDisplayName:null,initialIdentity:null},dataStorage:R,dataItemDisplayNameProvider:S,sharing:X,commands:V,viewApi:ad
}),f=await c.ShowViewAndWaitResult(e,!0,d),h=(0,o.em)(a.path)
;fQ(await ad.LocalizeString("Notification_Item_Renamed_Text",[h,f]),null,null)}))}),p.push({
title:await ad.LocalizeString("Cmd_Delete_Flat"),imageClass:"command-delete-icon",blockedText:k,onCommand:fN((async(b,d)=>{
const e=(0,h.C)({itemInfo:a,rfCommands:V,rfDataStorage:R,viewApi:ad});await c.ShowViewAndWaitResult(e,!0,d);const f=(0,
G.XE)(a.path,!1,void 0);fQ(await ad.LocalizeString("Notification_File_Deleted_Text",[f]),null,null)}))}),p.push("separator"),
e||4===a.type||an||(p.push({title:await ad.LocalizeString("Cmd_ScanQRCode_Key"),imageClass:"command-qr-scan-icon",
onCommand:async(c,d)=>{const e=await ah.CaptureScreenshotForActiveTabAsDataUrl();if(!e)throw(0,
I.ZU)(I.V2,await ad.LocalizeString("Cmd_ScanQRCode_CouldNotCaptureScreenShot",null,"Could not capture screenshot"))
;const f=await(0,z.zC)(e,null,d)
;if(!f)throw(0,I.ZU)(I.V2,await ad.LocalizeString("Cmd_ScanQRCode_CouldNotCaptureScreenShot",null,"Could not capture screenshot"))
;await V.ScanQRCode(f,a.path,d),b.ClosePopup()}}),p.push("separator")));return await fO(a,p),await fP(a,p),p;async function r(){
return{title:await ad.LocalizeString("Cmd_FillForms_Flat"),imageClass:"command-fill-icon",blockedText:k,
onCommand:fN((async function(c,d){if(!e)return(0,J.fI)(V.FillForms({identity:!1,path:a.path,submit:!1},d)),b.ClosePopup();fQ((0,
m.Qo)(a.error),5,2)}))}}async function s(){return{title:await ad.LocalizeString("AutoFill_FillSubmit"),
imageClass:"command-fillsubmit-icon",blockedText:k,onCommand:fN((async function(c,d){if(!e)return(0,J.fI)(V.FillForms({
identity:!1,path:a.path,submit:!0},d)),b.ClosePopup();fQ((0,m.Qo)(a.error),5,2)}))}}async function t(){return{
title:await ad.LocalizeString("Cmd_Login_Flat"),imageClass:"command-login-icon",blockedText:k,onCommand:fN((async function(c,d){
if(e)fQ((0,m.Qo)(a.error),5,2);else{if(!(null==l?void 0:l.unsafeToOpenInBrowser))return(0,J.fI)(V.GoFillSubmit({navigate:!0,
path:a.path,newTab:j,submit:!0},d)),b.ClosePopup();fQ(await ad.LocalizeString("CannotOpenUrlForSecurityReasons"),5,2)}}))}}
async function u(){return{title:await ad.LocalizeString("Cmd_GoFill_Flat"),imageClass:"command-gofill-icon",blockedText:k,
onCommand:fN((async function(c,d){if(e)fQ((0,m.Qo)(a.error),5,2);else{if(!(null==l?void 0:l.unsafeToOpenInBrowser))return(0,
J.fI)(V.GoFillSubmit({navigate:!0,path:a.path,newTab:j,submit:!1},d)),b.ClosePopup()
;fQ(await ad.LocalizeString("CannotOpenUrlForSecurityReasons"),5,2)}}))}}async function w(){return{
title:await ad.LocalizeString("Cmd_Goto_Flat"),imageClass:"command-goto-icon",blockedText:k,onCommand:fN((async(c,d)=>{
if(e)fQ((0,m.Qo)(a.error),5,2);else{if(!(null==l?void 0:l.unsafeToOpenInBrowser))return(0,J.fI)(V.GoTo(a.path,{newTab:j})),
b.ClosePopup();fQ(await ad.LocalizeString("CannotOpenUrlForSecurityReasons"),5,2)}}))}}}(e,d);case 5:case 6:return fM(e,!1)
;case 7:return async function(a){const d=a.readOnly&&a.sharedFolder,e=[];e.push({title:await ad.LocalizeString("Cmd_View_Flat"),
imageClass:"command-view-icon",highlighted:!0,onCommand:async(c,d)=>((0,J.fI)(V.OpenFile(a.path,{mode:"view"})),b.ClosePopup())
});try{const c=(await R.GetDataItem(a.path,3,null,null)).m_note;c&&e.push({
title:await ad.LocalizeString("Cmd_Safenote_CopyClipboard_Flat"),imageClass:"command-copy-icon",onCommand:async(a,d)=>{(0,
J.fI)(b.CopyTextToClipboardWithAutoClear(c,120)),fQ(await ad.LocalizeString("Notification_Copied_ToClipboard_Text"),3,null)}})
}catch(f){}if(e.push("separator"),!d){const b=0!==await fF()?await ad.LocalizeString("Menu_BlockedItem_Upgrade"):void 0;e.push({
title:await ad.LocalizeString("Cmd_Rename_Flat"),imageClass:"command-rename-icon",blockedText:b,onCommand:fN((async(b,d)=>{
const e=(0,g.z)({data:{itemPath:a.path,itemType:a.type,groupName:null,instanceName:null,instanceDisplayName:null,
initialIdentity:null},dataStorage:R,dataItemDisplayNameProvider:S,sharing:X,commands:V,viewApi:ad
}),f=await c.ShowViewAndWaitResult(e,!0,d),h=(0,o.em)(a.path)
;fQ(await ad.LocalizeString("Notification_Item_Renamed_Text",[h,f]),null,null)}))}),e.push({
title:await ad.LocalizeString("Cmd_Delete_Flat"),imageClass:"command-delete-icon",blockedText:b,onCommand:fN((async(b,d)=>{
const e=(0,h.C)({itemInfo:a,rfCommands:V,rfDataStorage:R,viewApi:ad});await c.ShowViewAndWaitResult(e,!0,d);const f=(0,
G.XE)(a.path,!1,void 0);fQ(await ad.LocalizeString("Notification_File_Deleted_Text",[f]),null,null)}))}),e.push("separator")}
return await fO(a,e),await fP(a,e),e}(e);default:throw(0,I.Lh)()}}function fL(a,b){return{url:a=(0,w.PH)(a,b),canGoTo:!!a&&(!(0,
s.HB)(a)||ak),unsafeToOpenInBrowser:!!a&&(0,z.oK)(a)}}async function fM(a,d){const e=[],f=a.error&&(0,
v.tM)(a.error,4),i=a.readOnly&&a.sharedFolder,j=0!==await fF()?await ad.LocalizeString("Menu_BlockedItem_Upgrade"):void 0
;if(an||e.push({title:await ad.LocalizeString("Cmd_FillForms_Flat"),imageClass:"command-fill-icon",blockedText:j,
onCommand:async(b,c)=>{f?fQ((0,m.Qo)(a.error),5,2):d?f4((()=>eH())):ej(a.path)}}),e.push("separator"),!i){a.readOnly?e.push({
title:await ad.LocalizeString("Cmd_View_Flat"),imageClass:"command-view-icon",onCommand:async(c,d)=>((0,
J.fI)(V.OpenFile(a.path,{mode:"view"})),b.ClosePopup())}):e.push({title:await ad.LocalizeString("Cmd_Edit_Flat"),
imageClass:"command-edit-icon",blockedText:j,onCommand:fN((async(c,d)=>((0,J.fI)(V.OpenFile(a.path,{mode:"edit"})),
b.ClosePopup())))}),e.push({title:await ad.LocalizeString("Cmd_Rename_Flat"),imageClass:"command-rename-icon",blockedText:j,
onCommand:fN((async(b,d)=>{const e=(0,g.z)({data:{itemPath:a.path,itemType:a.type,groupName:null,instanceName:null,
instanceDisplayName:null,initialIdentity:null},dataStorage:R,dataItemDisplayNameProvider:S,sharing:X,commands:V,viewApi:ad
}),f=(0,J.f4)(null,null,null),h=await c.ShowViewAndWaitResult(e,!0,f);a.path===cj&&(cj=(0,G.fA)(a.path)+"/"+h+(0,o.kd)(a.type))
;const i=(0,o.em)(a.path);fQ(await ad.LocalizeString("Notification_Item_Renamed_Text",[i,h]),null,null)}))});await(0,
u.B9)(R,null)&&e.push({title:await ad.LocalizeString("Cmd_Delete_Flat"),imageClass:"command-delete-icon",blockedText:j,
onCommand:fN((async(b,d)=>{const e=(0,h.C)({itemInfo:a,rfCommands:V,rfDataStorage:R,viewApi:ad})
;await c.ShowViewAndWaitResult(e,!0,d);const f=(0,G.XE)(a.path,!1,void 0)
;fQ(await ad.LocalizeString("Notification_File_Deleted_Text",[f]),null,null)}))}),e.push("separator")}return await fO(a,e),
await fP(a,e),e}function fN(a){return async(c,d)=>{const e=await fF();return 0!==e?b.ShowAskForUpgradePage(1===e,d):a(c,d)}}
async function fO(a,c){const d=a.error&&(0,v.tM)(a.error,4),e=await aa.Get({SyncIsOn:!1,AccountClientBlocked:!1,
AccountClientReadOnly:!1}),f=await ac.Get({SelfHostedServer:!1,DisableSharing:!1,NoEmailingDataFiles:!1
}),g=f.SelfHostedServer,h=f.DisableSharing,i=e.SyncIsOn,j=f.NoEmailingDataFiles,k=0!==(0,
n.z)(e)?await ad.LocalizeString("Menu_BlockedItem_Upgrade"):void 0,l=(0,G.Y0)(a.path),o=await R.GetInfo(l,0,null)
;j||g||a.received||h||o.received||c.push({title:await ad.LocalizeString("Cmd_SendFile_Key"),imageClass:"command-send-icon",
blockedText:k,onCommand:fN((async(c,e)=>{if(!d)return await V.ShowSendFileDialog([a.path]),b.ClosePopup();fQ((0,
m.Qo)(a.error),5,2)}))}),h||g||o.received||!i||c.push({title:await ad.LocalizeString("Cmd_SharedFileSettings_Key"),
imageClass:"command-share-icon",blockedText:k,onCommand:fN((async(c,e)=>{if(!d)return await V.ShowSharedFileSettings(a.path),
b.ClosePopup();fQ((0,m.Qo)(a.error),5,2)}))})}async function fP(a,b){
const c=0!==await fF()?await ad.LocalizeString("Menu_BlockedItem_Upgrade"):void 0;a.favorite?b.push({
title:await ad.LocalizeString("Cmd_Unpin_Flat"),imageClass:"command-unpin-icon",blockedText:c,onCommand:fN((async function(b,c){
await U.SetUsageInfo(a.path,1,!1,c);const d=(0,m.Y5)(a.type,!1)
;fQ(await ad.LocalizeString("Notification_ItemType_UnPinned_Text",[await ad.LocalizeString(d)]),null,null)}))}):b.push({
title:await ad.LocalizeString("Cmd_AddToPinned_Flat"),imageClass:"command-add-to-pinned-icon",blockedText:c,
onCommand:fN((async function(b,c){await U.SetUsageInfo(a.path,1,!0,c);const d=(0,m.Y5)(a.type,!1)
;fQ(await ad.LocalizeString("Notification_ItemType_Pinned_Text",[await ad.LocalizeString(d)]),null,null)}))})}
function fQ(a,b,c){dM.Show(a,b,c)}function fR(a,b){let c,d,e,f=-1;const g=a.m_fields||[];for(let h=0;h<g.length;h++){
const a=g[h];b===a.m_name&&(c=(0,M.TT)(a.m_value)),a.m_name===x.Df?d=(0,M.TT)(a.m_value):a.m_name!==x.Aq&&2!==a.m_type||(e=(0,
M.TT)(a.m_value),f=h)}return void 0===d&&f>0&&g[f-1]&&(d=(0,M.TT)(g[f-1].m_value)),b===x.Df?d:b===x.Aq?e:c}function fS(){fT(),
fU(),fX(),function(){switch(ay){case 1:gz(bX),gz(ch),gA(bs);break;case 2:gz(bs),gz(ch),gA(bX);break;case 3:gz(bs),gz(bX),gA(ch)}
}(),fH(),gi()}function fT(){switch(ay){case 1:a(aQ),a(aS),b(aA);break;case 2:a(aA),a(aS),b(aQ);break;case 3:a(aA),a(aQ),b(aS)}
function a(a){(0,M.TT)(a).classList.remove("selected"),(0,M.TT)(a).ariaSelected="false"}function b(a){(0,
M.TT)(a).classList.add("selected"),(0,M.TT)(a).ariaSelected="true"}}function fU(){switch(ay){case 1:if(0===bt)gz(a6);else gA(a6)
;gz(a8),gz(bc),bg?gA(a4):gz(a4);break;case 2:gA(a8),gz(a6),gz(bc),gA(a4);break;case 3:switch(ci){case 0:case 1:case 3:gz(a4)
;break;case 2:gz(a6),gz(a8),gA(bc),gA(a4)}}}function fV(a,b){ba.set(a,b)}function fW(a,b){be.set(a,b)}function fX(){switch(ay){
case 1:gz(bh);break;case 2:{const a=ba.get(a7);void 0===a||(a?gA(bh):gz(bh))}break;case 3:switch(ci){case 0:case 1:case 3:gz(bh)
;break;case 2:{const a=be.get(bb);void 0===a||(a?gA(bh):gz(bh))}}}}function fY(){switch(ay){case 1:break;case 2:switch(a7){
case 0:gu(bj,bk);break;case 1:gu(bj,bl);break;default:gu(bj,bm)}break;case 3:gu(bj,2===ci&&0===bb?bn:bo)}}function fZ(){
switch(ay){case 2:fa();break;case 3:ek();break;default:dV()}}function f0(a,b,c,d){if(2!==c.button)return
;const e=b.getBoundingClientRect(),f={height:e.height,top:e.top,bottom:e.bottom,y:e.top,width:0,x:c.clientX,right:c.clientX,
left:c.clientX};dP=(0,k.Lj)(f,(()=>fK(a,d)),(0,k.NI)(b),(function(a,c){return(0,M.TT)(aq).style.width=(0,z.Md)(a),(0,
M.TT)(aq).style.height=(0,z.Md)(c),b.getBoundingClientRect()}),gs)}function f1(a,c,d){if((0,v.tM)(a.error,4))fQ((0,
m.Qo)(a.error),5,2);else if(1===a.type||3===a.type)(0,J.fI)((async()=>{if(1===await fF())f2((async()=>{await V.OpenFile(a.path,{
mode:"view"}),b.ClosePopup()}));else{const e=fL(a.gotoUrl,a.matchUrl);if(null==e?void 0:e.unsafeToOpenInBrowser)return void(0,
J.fI)((async()=>fQ(await ad.LocalizeString("CannotOpenUrlForSecurityReasons"),5,2))());f4((()=>b.LoginItemAction(a.path,c,d)))}
})());else if(7===a.type||6===a.type)f2((()=>b.SafenoteItemAction(a.path)));else if(2===a.type||4===a.type){
const c=fL(a.gotoUrl,a.matchUrl);if(null==c?void 0:c.unsafeToOpenInBrowser)return void(0,
J.fI)((async()=>fQ(await ad.LocalizeString("CannotOpenUrlForSecurityReasons"),5,2))());f4((()=>b.BookmarkItemAction(a.path)))
}else 5===a.type&&(c?ej(a.path):f2((async()=>{await async function(a){return(0,J.fI)(V.OpenFile(a,{mode:"view"})),b.ClosePopup()
}(a.path),b.ClosePopup()})))}function f2(a){(0,A.D$)(a,gd,dr,gb)}function f3(a){(0,A.D$)((async()=>{try{await f5(a)}finally{
await c.ShowView(dT,!1)}}),gd,dr,gb)}function f4(a){(0,A.D$)((()=>f5(a)),gd,dr,gb)}async function f5(a){const d=await fF()
;if(0===d)try{await a()}catch(e){if((0,I.r5)(e,I.kd))throw e;fQ((0,m.Qo)(e),5,2)}else try{
await b.ShowAskForUpgradePage(1===d,(0,J.f4)(null,null,null))}catch(e){(0,I.r5)(e,I.kd)||fQ((0,m.Qo)(e),5,2)}finally{
await c.ShowView(dT,!1)}}function f6(a,b,c,d,e){d!==aP?function(a,b,c,d){const e=b.getBoundingClientRect();function f(){
let d=null;return{onShow:f=>{(0,k.dB)(b,!0),a&&(0,k.dB)(a,!0);let g=b.parentElement
;for(;null!==g;)g.addEventListener("scroll",e),g=g.parentElement;d=f,aP=c},onHide:()=>{(0,k.dB)(b,!1),a&&(0,k.dB)(a,!1)
;let f=b.parentElement;for(;null!==f;)f.removeEventListener("scroll",e),f=f.parentElement;d=null,setTimeout((function(){
c===aP&&(aP=null)}),300)}};function e(){null==d||d.Hide(4)}}dP=(0,k.Lj)(e,(()=>fK(c,d)),f(),(function(a,c){return(0,
M.TT)(aq).style.width=(0,z.Md)(a),(0,M.TT)(aq).style.height=(0,z.Md)(c),b.getBoundingClientRect()}),gs)
}(b,c,d,e):a.stopPropagation()}function f7(a){f2((async()=>{await V.OpenFile(a.path,{mode:"view",startPage:!0}),b.ClosePopup()
}))}function f8(a,...b){switch(a){case"UpdateFillOptions":fn();break;case"AutoFillModesChanged":fo()}}function f9(a){var b
;let c=!1,d=!1,e=!1,f=!1,g=!1,h=!1;for(const i of a)switch(i.event){case 1:case 2:case 3:c=!0,d=!0,e=!0,f=!0;break;case 5:
case 11:c=!0,d=!0,e=!0;break;case 7:case 8:c=!0,d=!0,e=!0,8===i.type&&i.path&&(0,o.QC)(i.path,bv)&&(bv=""),
8===i.type&&i.path&&(0,
o.QC)(i.path,bY)&&(bY=""),5===i.type&&i.path&&8===i.event&&cj===i.path&&(cj=(null===(b=i.to)||void 0===b?void 0:b.path)||"",
g=!0);break;case 10:h=!0;break;case 12:d=!0}if(!h){if(c&&cU.clear(),d||e)if(0!==cL){if(e){let a;switch(cL){default:case 1:a=(0,
M.TT)(au).value;break;case 2:a=(0,M.TT)(bj).value}e0(a,ds)}}else switch(ay){case 1:d4(bt,a5);break;case 2:fe(ds);break;case 3:
el(ds)}g&&eq(),f&&gr()}}function ga(a){let b=!1;for(const c in a)switch(c){case"FillEmptyFieldsOnlyIdentity":
cr=void 0!==a[c].newValue&&a[c].newValue,ct||(cs=cr,cn&&cn.SetChecked(cs));break;case"AccountCreatedTime":b=!0}b&&(0,
J.fI)(async function(){am=await gg(),am?gA(aE):gz(aE)}())}function gb(){return gA(dq),gc}function gc(){gz(dq)}function gd(){
return(0,M.TT)(bp).classList.add("disabled-state"),(0,M.TT)(aq).addEventListener("mousedown",gf,!0),ge}function ge(){(0,
M.TT)(bp).classList.remove("disabled-state"),(0,M.TT)(aq).removeEventListener("mousedown",gf,!0)}function gf(a){
a.preventDefault(),a.stopPropagation()}async function gg(){return!!b.IsNativeUIAvailable()&&(0,p.uO)(aa)}function gh(){(0,
J.uT)(async function(a,b){await a.Set({MainPageState:b})}(ad.storage,{itemsListType:bt,itemsListMode:a5,fillIdViewType:ci,
fillIdPath:cj}),"MainPage:_PersistState")}function gi(){switch(ay){case 1:gz(cZ);break;case 2:case 3:
(null==cK?void 0:cK.m_show_password_generator)?gA(cZ):gz(cZ)}}function gj(){if(!c7)return;const a=c7;f4((async()=>{var b
;const c=await V.FillFieldsWithGeneratedPassword(a,null);if(c&&0!==c.filledFieldsCount){
const c=await ad.CallBackgroundScript("GetCurrentTabUrl",null,null),d=(0,G.vN)(c),e=null!==(b=(null==d?void 0:d.m_host)&&(0,
G.an)(d.m_host))&&void 0!==b?b:"";for(let b=0;b<dj.length;b++)if(dj[b].m_password===a){const a=dj[b],c={m_domain:e,
m_time_utc_secs:(0,N.t2)()};a.m_fill_history?a.m_fill_history.unshift(c):a.m_fill_history=[c],(0,
J.fI)(Y.UpdatePasswordData(a,null));break}fQ(dO,3,null)}}))}function gk(a){c7&&((0,J.fI)(async function(){
await b.CopyTextToClipboardWithAutoClear(c7,120);for(let a=0;a<dj.length;a++)if(dj[a].m_password===c7){const b=dj[a]
;b.m_time_last_copied_utc_secs=(0,N.t2)(),(0,J.fI)(Y.UpdatePasswordData(b,null));break}fQ(dN,3,null)}()),a.stopPropagation())}
function gl(a){(0,J.fI)(gp()),a.stopPropagation()}function gm(a){c3.Start((async b=>{await ab.Set({PassGenCharNumber:a.m_length,
PassGenExcludeSimilar:a.m_exclude_similar_chars,PassGenUseHexChars:a.m_hex_digits_only,
PassGenCheckUpper:a.m_include_upper_case_chars,PassGenCheckLower:a.m_include_lower_case_chars,
PassGenCheckNumber:a.m_include_digits,PassGenCheckSpecial:!!a.m_specific_chars,PassGenCharSet:a.m_specific_chars}),
b.ThrowIfShouldStop(),function(){const a=(0,M.TT)(c2).GetValues()
;a.m_hex_digits_only||a.m_include_upper_case_chars||a.m_include_lower_case_chars||a.m_include_digits||a.m_specific_chars?(0,
M.TT)(c6).classList.remove("disabled"):(0,M.TT)(c6).classList.add("disabled")}()}))}function gn(){f2((()=>go()))}
async function go(){
c8?(await ab.Remove(["PassGenCharNumber","PassGenExcludeSimilar","PassGenUseHexChars","PassGenCheckUpper","PassGenCheckLower","PassGenCheckNumber","PassGenCheckSpecial","PassGenCharSet"]),
(0,
M.TT)(c2).SetValues((0,d.H5)())):(await ab.Remove(["PassphraseGenCharNumber","PassphraseGenExcludeSimilar","PassphraseGenUseHexChars","PassphraseGenCheckUpper","PassphraseGenCheckLower","PassphraseGenCheckNumber","PassphraseGenCheckSpecial","PassphraseGenCharSet"]),
(0,M.TT)(c2).SetValues((0,d.CZ)()))}async function gp(){(0,M.TT)(c2).CorrectInputValues();const a=(0,M.TT)(c2).GetValues();let b
;if(c8)b={m_password:(0,E.Zf)(a.m_length,a,aj),m_generator_type:0,m_time_generated_utc_secs:(0,N.t2)()};else{const c=(0,
M.TT)(c5).words;b={m_password:(0,E.e3)(a.m_length,a,c),m_generator_type:1,m_time_generated_utc_secs:(0,N.t2)()}}
await Y.AddPassword(b,null),dj=[...await Y.GetHistory(null)],(0,M.TT)(c0).textContent=b.m_password,c7=b.m_password,await gq()}
async function gq(){if(!c7)return void gz(c1);const a=(0,q.im)(c7,[],null,await async function(a){
return c4.GetOnce((async()=>(0,q.v5)(await(0,F.$)("pwd-dict.json",a,ai))))}(null));let b,c;a>75?(b=c9,c="strong"):a>50?(b=da,
c="good"):a>25?(b=db,c="medium"):(b=dc,c="weak"),(0,M.TT)(c1).SetState(c,b),gA(c1)}function gr(){(0,J.fI)((async()=>{
await async function(a){var c;const d=await b.GetUpgradeMessagesUIInfo(a);if(!d.showUpgradeUI)return gz(dL),!1
;if(d.readOnlyMode);else{const a=(0,N.t2)(),b=await(0,m.TI)(ad.storage),c=86400,e=28*c
;if(b.closedTime)if(d.licenseExpirationTime){const f=d.licenseExpirationTime-a;if(f>e)return gz(dL),!1
;const g=d.licenseExpirationTime-b.closedTime;if(g<=c)return gz(dL),!1;if(d.licenseTrial){const d=c
;if(a-b.closedTime<d)return gz(dL),!1}else if(2*f>g)return gz(dL),!1}else{const d=3*c;if(a-b.closedTime<d)return gz(dL),!1}
if(d.licenseExpirationTime&&d.licenseExpirationTime-a>e)return gz(dL),!1}
const e=d.enterprise?d.licenseTrial?await ad.LocalizeString("UpgradeMessage_RoboFormEnterpriseTrialExpires"):await ad.LocalizeString("UpgradeMessage_RoboFormEnterpriseExpires"):await ad.LocalizeString("UpgradeMessage_RoboFormWillSwitchToFreeMode"),f=null!==(c=await ad.GetLanguageTag(null))&&void 0!==c?c:"",g=P("div",{
className:"upgrade-messages flex-row"},P("div",{className:"content flex-cell"},d.readOnlyMode?P("div",{className:"message"
},await ad.LocalizeString("UpgradeMessage_RoboFormIsInReadOnlyMode")):d.licenseExpirationTime?P("div",{className:"message"
},P("span",null,(0,L.SI)(e,"%1").before),P("span",{className:"date"},(0,N.Io)(d.licenseExpirationTime,f)),P("span",null,(0,
L.SI)(e,"%1").after)):P("div",{className:"message"},await ad.LocalizeString("UpgradeMessage_RoboFormIsInFreeMode")),P("div",{
className:"links-row flex-row"},P("a",{className:"learn-more link",href:"#",onclick:()=>f2((async()=>{try{await ad.OpenUrl({
newTab:!0,reuseExisting:!0,url:d.enterprise?m.Nd:m.EJ},null)}catch(a){if(!(0,I.r5)(a,I.kd))return void fQ((0,m.Qo)(a),5,2)}
b.ClosePopup()}))},await ad.LocalizeString("UpgradeMessage_LearnMore")),P("div",{className:"links-separator"}),P("a",{
className:"upgrade link",href:"#",onclick:()=>f2((async()=>{try{await V.OpenPaymentPage({action:"buy"},null)}catch(a){if(!(0,
I.r5)(a,I.kd))return void fQ((0,m.Qo)(a),5,2)}b.ClosePopup()}))
},await ad.LocalizeString("Cmd_License_BuyNow")))),d.readOnlyMode?null:P("div",{className:"close-button",onclick:()=>{gz(dL),(0,
J.fI)((async()=>{const a=(0,N.t2)();await(0,m.CG)({updatedTime:a,closedTime:a},ad.storage)})())}},"✖"))
;return null==dL||dL.replaceWith(g),dL=g,!0}(null)?gz(dK):af&&await async function(){var a,c,d;const e=86400,f=30*e,g=60*e
;if(!await b.HaveActivePaidConsumerLicense())return
;const h=await(0,m.iK)(ad.storage),i=null!==(a=h.state)&&void 0!==a?a:0,j=null!==(c=h.sessionsCount)&&void 0!==c?c:1,k=(0,
N.t2)(),l=null!==(d=h.sessionsStartTimes)&&void 0!==d?d:[k],n=(0,M.TT)(af).GetExtensionWebStoreInfo().id,o=await(0,
m.D8)(aa,n),q=l.reduce(((a,b)=>k-b<7*e?a+1:a),0);switch(i){case 0:switch(o){case p.VR.Enjoyed:return await v(2),s()
;case p.VR.NotEnjoyed:return y();case p.VR.Rated:return x()}return void 0!==h.delayUntil?k>h.delayUntil?(await v(1),
r()):void 0:q<3?void 0===h.state?v(0):void 0:(await v(1),r());case 1:switch(o){case p.VR.Enjoyed:return await v(2),s()
;case p.VR.NotEnjoyed:return y();case p.VR.Rated:return x()}return void 0!==h.delayUntil?k>h.delayUntil?(await v(1),
r()):void 0:j<=3?r():w(1,f);case 2:switch(o){case p.VR.NotEnjoyed:return y();case p.VR.Rated:return x()}
return void 0!==h.delayUntil?k>h.delayUntil?(await v(2),s()):void 0:j<=1?s():w(2,g);case 3:
return o===p.VR.Rated?x():j<=1?t():y();case 4:case 5:return}return;async function r(){const a=P("div",{
className:"rate-extension flex-row"},P("div",{className:"text text-break-word flex-cell"
},await ad.LocalizeString("MainPage_EnjoyUsing",["RoboForm"])),P("div",{className:"important-button button",onclick:()=>(0,
J.fI)((async()=>{const a=(0,M.TT)(af).GetExtensionWebStoreInfo().id;await(0,m.sp)(p.VR.Enjoyed,ab,a),await s(),await v(2)})())
},await ad.LocalizeString("Yes")),P("div",{className:"regular-button button",onclick:()=>(0,J.fI)((async()=>{const a=(0,
M.TT)(af).GetExtensionWebStoreInfo().id;await(0,m.sp)(p.VR.NotEnjoyed,ab,a),await t(),await v(3)})())
},await ad.LocalizeString("No")),P("div",{className:"close-button",onclick:()=>(0,J.fI)((async()=>{await u(),await w(1,g)})())
},"✖"));null==dK||dK.replaceWith(a),dK=a}async function s(){const a=P("div",{className:"rate-extension flex-row"},P("div",{
className:"text text-break-word flex-cell"},await ad.LocalizeString("MainPage_PleaseRateUs")),P("div",{
className:"important-button button",onclick:()=>(0,J.fI)((async()=>{await u(),await x();const a=(0,
M.TT)(af).GetExtensionWebStoreInfo().id;await(0,m.sp)(p.VR.Rated,ab,a),await z()})())
},await ad.LocalizeString("MainPage_RateUs_Btn_Text",["RoboForm"])),P("div",{className:"regular-button button",onclick:()=>(0,
J.fI)((async()=>{await u(),await w(2,f)})())},await ad.LocalizeString("MainPage_RemindMeLater_Btn_Text")),P("div",{
className:"close-button",onclick:()=>(0,J.fI)((async()=>{await u(),await w(2,g)})())},"✖"));null==dK||dK.replaceWith(a),dK=a}
async function t(){const a=P("div",{className:"rate-extension flex-row"},P("div",{className:"text text-break-word flex-cell"
},await ad.LocalizeString("MainPage_WouldYouLikeReportAnIssue")),P("div",{className:"regular-button button",onclick:()=>(0,
J.fI)((async()=>{await u(),await y()})())},await ad.LocalizeString("No")),P("div",{className:"regular-button button",
onclick:()=>(0,J.fI)((async()=>{await u(),await y(),await async function(){await V.ContactSupport({reportType:"WebPage"},null),
b.ClosePopup()}()})())},await ad.LocalizeString("Yes")));null==dK||dK.replaceWith(a),dK=a}async function u(){gz(dK)}
async function v(a){const b=(0,N.t2)();return(0,m.bY)({state:a,stateSetTime:b,sessionsCount:1,sessionsStartTimes:[b],
updatedTime:b},ad.storage)}async function w(a,b){const c=(0,N.t2)();return(0,m.bY)({state:a,stateSetTime:c,delayUntil:c+b,
updatedTime:c},ad.storage)}async function x(){return(0,m.bY)({state:4,stateSetTime:(0,N.t2)()},ad.storage)}async function y(){
return(0,m.bY)({state:5,stateSetTime:(0,N.t2)()},ad.storage)}async function z(){return(0,J.fI)(ad.OpenUrl({url:(0,
M.TT)(af).GetExtensionWebStoreInfo().url,newTab:!0,reuseExisting:!0},null)),b.ClosePopup()}}()})())}function gs(a,b){const d=(0,
J.f4)(null,null,null);f2((async()=>{try{await a(b,d)}catch(e){(0,I.r5)(e,I.kd)||fQ((0,m.Qo)(e),5,2)}finally{
await c.ShowView(dT,!1)}}))}function gt(a,b,c){let d=b;return a.onclick=()=>{d?(d=!1,function(a){
null==a||a.classList.remove("expanded")}(c())):(d=!0,function(a){null==a||a.classList.add("expanded")}(c()))},a}
function gu(a,b){null==a||a.setAttribute("placeholder",b)}function gv(a,b){(0,M.TT)(a).title=b}function gw(a,b){(0,
M.TT)(a).innerText=b}function gx(a,b){(0,M.TT)(a).setAttribute("aria-label",b)}function gy(a,b){(0,
M.TT)(a).setAttribute("aria-selected",b)}function gz(a){null==a||a.classList.add("hidden")}function gA(a){
null==a||a.classList.remove("hidden")}function gB(a,b){if(5===a||6===a){return 0!==(0,o.Wi)(b).type}return!1}
async function gC(a){return S.GetDisplayNameByPath(a,null)}}},41699:function(a,b,c){"use strict";c.d(b,{j:function(){return h}})
;var d=c(47333),e=c(63956),f=c(4153),g=(c(13117),c(91764)._);function h(a){const{folders:b,sharing:c,viewApi:h,serverUrl:i}=a
;let j=null;const k=new Set;let l=null,m=null,n=null,o=null;const p=[];let q=null;const r=500;return{Create:async function(a,c){
const e=(0,
d.sU)(i),f=await h.LocalizeString("SharedFoldersConfirmation_Title"),r=await h.LocalizeString("Cmd_Accept_Key"),w=await h.LocalizeString("Cmd_Reject_Key"),x=await h.LocalizeString("Cmd_Skip_Flat"),y=[]
;for(const d of b){const a=d.name||"folder";let b,c=""
;c=d.senderName&&d.senderName!==d.senderEmail?`${d.senderName} <${d.senderEmail}>`:d.senderName?d.senderName:d.senderEmail
;const e=g("div",{className:"checkbox item-row"},g("label",{className:"flex-cell"},g("div",{className:"icon-section item-icon"
}),g("div",{className:"text-section"},g("div",{className:"normal-text item-name-text"},a),g("div",{
className:"hint-text sender-name-text"},c)),g("div",{className:"flex-cell"}),g("div",{className:"item-check"},b=g("input",{
type:"checkbox",checked:!0,onchange:()=>{b.checked?k.add(d):k.delete(d),v()}}),g("div",{className:"checkbox-check"}))))
;y.push(e),p.push(b),k.add(d)}const z=g("div",{className:"received-accounts-page setup-page receive-invite-page"},g("div",{
className:"header-section"},g("div",{className:"header-text-section"},g("div",{className:"title-text"},"RoboForm"))),q=g("div",{
className:"action-progress-overlay-circle size64 hidden"}),g("div",{className:"hint-text rfo-server-title-text"
}," ",e||""," "),g("div",{className:"normal-text invite-text"},f),g("div",{className:"items-container"},y),o=g("div",{
className:"error-text"}),g("div",{className:"page-flexy-space"}),g("div",{className:"buttons-section"},g("div",{
className:"padding-div"}),l=g("input",{type:"button",className:"important-button normal-button",value:r,onclick:s
}),m=g("input",{type:"button",className:"regular-button normal-button",value:w,onclick:t}),n=g("input",{type:"button",
className:"regular-button normal-button",value:x,onclick:u})));return j=a,z},OnAfterShow:function(){},OnBeforeHide:function(){},
Focus:function(){(0,f.TT)(l).focus()},Dispose:function(){}};function s(){z(),(0,e.D$)((()=>async function(){try{
for(const a of k){const b=a.accountId;await c.AcceptSharedAccount(b,null)}}catch(a){return void y((0,d.Qo)(a))}(0,f.TT)(j)()
}()),A,r,w)}function t(){z(),(0,e.D$)((()=>async function(){try{for(const a of k){const b=a.accountId
;await c.RejectSharedAccount(b,null)}}catch(a){return void y((0,d.Qo)(a))}(0,f.TT)(j)()}()),A,r,w)}function u(){A(),(0,
f.TT)(j)()}function v(){const a=0===k.size;(0,f.TT)(l).disabled=a,(0,f.TT)(m).disabled=a}function w(){return(0,
f.TT)(q).classList.remove("hidden"),x}function x(){(0,f.TT)(q).classList.add("hidden")}function y(a){(0,f.TT)(o).textContent=a}
function z(){(0,f.TT)(o).textContent=""}function A(){return C(l),C(m),C(n),p.forEach(C),B}function B(){D(l),D(m),D(n),
p.forEach(D)}function C(a){(0,f.TT)(a).setAttribute("disabled","disabled")}function D(a){(0,f.TT)(a).removeAttribute("disabled")
}}},9958:function(a,b,c){"use strict";c.d(b,{c:function(){return k}})
;var d=c(47333),e=c(4234),f=c(54811),g=c(63956),h=c(4153),i=c(73863),j=(c(13117),c(91764)._);function k(a){
const{files:b,sharing:c,viewApi:k,serverUrl:l}=a;let m=null;const n=new Set,o=[];let p=null,q=null,r=null,s=null,t=null
;const u=500;return{Create:async function(a,c){
const g=(0,d.sU)(l)||"",h=await k.LocalizeString("SharedFilesConfirmation_Title"),u=await k.LocalizeString("Cmd_Accept_Key"),z=await k.LocalizeString("Cmd_Reject_Key"),A=await k.LocalizeString("Cmd_Skip_Flat"),B=[]
;for(const d of b){const a=d.name||"";if(!a)continue;const b=(0,e.em)(a),c=(0,e.hF)(a);let g,h=""
;d.grantorName&&d.grantorEmail&&d.grantorName!==d.grantorEmail?h=`${d.grantorName} <${d.grantorEmail}>`:d.grantorName?h=d.grantorName:d.grantorEmail&&(h=d.grantorEmail)
;const k=j("div",{className:"checkbox item-row"},j("label",{className:"flex-cell"},j("div",{className:(0,
i.bt)("icon-section"," ",(0,f._m)(c))}),j("div",{className:"text-section"},j("div",{className:"normal-text item-name-text"
},b),j("div",{className:"hint-text sender-name-text"},h)),j("div",{className:"flex-cell"}),j("div",{className:"item-check"
},g=j("input",{type:"checkbox",checked:!0,onchange:()=>{g.checked?n.add(d):n.delete(d),y()}}),j("div",{
className:"checkbox-check"}))));B.push(k),o.push(g),n.add(d)}const C=j("div",{
className:"received-files-page setup-page receive-invite-page"},j("div",{className:"header-section"},j("div",{
className:"header-text-section"},j("div",{className:"title-text"},"RoboForm"))),t=j("div",{
className:"action-progress-overlay-circle size64 hidden"}),j("div",{className:"hint-text rfo-server-title-text"
}," ",g||""," "),j("div",{className:"normal-text invite-text"}," ",h," "),j("div",{className:"items-container"},B),s=j("div",{
className:"error-text"}),j("div",{className:"page-flexy-space"}),j("div",{className:"buttons-section"},j("div",{
className:"padding-div"}),p=j("input",{type:"button",className:"important-button normal-button",value:u,onclick:v
}),q=j("input",{type:"button",className:"regular-button normal-button",value:z,onclick:w}),r=j("input",{type:"button",
className:"regular-button normal-button",value:A,onclick:x})));return m=a,C},OnAfterShow:function(){},OnBeforeHide:function(){},
Focus:function(){(0,h.TT)(p).focus()},Dispose:function(){}};function v(){C(),(0,g.D$)((()=>async function(){try{
for(const a of n)await c.AcceptSharedFile(a,null)}catch(a){return void B((0,d.Qo)(a))}(0,h.TT)(m)()}()),D,u,z)}function w(){C(),
(0,g.D$)((()=>async function(){try{for(const a of n)await c.RejectSharedFile(a,null)}catch(a){return void B((0,d.Qo)(a))}(0,
h.TT)(m)()}()),D,u,z)}function x(){D(),(0,h.TT)(m)()}function y(){const a=0===n.size;(0,h.TT)(p).disabled=a,(0,
h.TT)(q).disabled=a}function z(){return(0,h.TT)(t).classList.remove("hidden"),A}function A(){(0,h.TT)(t).classList.add("hidden")
}function B(a){(0,h.TT)(s).textContent=a}function C(){(0,h.TT)(s).textContent=""}function D(){F(p),F(q),F(r)
;for(const a of o)F(a);return E}function E(){G(p),G(q),G(r);for(const a of o)G(a)}function F(a){(0,
h.TT)(a).setAttribute("disabled","disabled")}function G(a){(0,h.TT)(a).removeAttribute("disabled")}}},40364:function(a,b,c){
"use strict";c.d(b,{U:function(){return f}});var d=c(47333),e=(c(13117),c(91764)._);function f(a,b){const c=a,f=b.LocalizeString
;return{Create:async function(a,b){var h,i;const j=[];for(const f of c){const a=e("div",{className:"sync-error"},e("div",{
className:"account"},e("div",null,e("div",{className:"icon folder-icon"}),e("div",{className:g(f)})),e("div",{
className:"account-name"},null!==(h=f.accountName)&&void 0!==h?h:"")),e("div",{className:"error"},e("div",{
className:"error-icon"}),e("div",{className:"text"},(0,d.Qo)(null!==(i=f.syncError)&&void 0!==i?i:""))));j.push(a)}
return e("div",{className:"sync-errors-page setup-page"},e("div",{className:"header"},f("RFOSync_ErrorSheet_Title")),e("div",{
className:"content"},e("div",{className:"sync-result"},e("div",{className:"sync-result-icon"}),e("div",{
className:"sync-result-text"},f("RFOSync_CompletedWithErrors"))),e("div",{className:"errors"},j),e("div",{className:"flexy"
}),e("div",{className:"footer"},e("input",{type:"button",className:"normal-button regular-button",
value:await f("Cmd_Retry_Flat"),onclick:()=>a(1)}),e("input",{type:"button",className:"normal-button regular-button",
value:await f("Cmd_Ok_Flat"),onclick:()=>a(0)}))))},OnAfterShow:()=>{},OnBeforeHide:()=>{},Focus:()=>{},Dispose:()=>{}}
;function g(a){
return void 0!==a.company?a.readOnly?"icon-overlay icon-overlay-limited":"icon-overlay icon-overlay-manager":a.readOnly?"icon-overlay icon-overlay-login-only":"icon-overlay icon-overlay-granted"
}}},23097:function(a,b,c){"use strict";c.d(b,{J:function(){return e}});var d=c(91764)._;function e(a){
const b=a.localization.LocalizeString;return{Create:async function(){return d("div",{className:"desktop-app-is-updating-page"
},d("div",{className:"logo"},d("div",{className:"icon icon-robot"}),d("div",{className:"icon icon-name"})),d("div",{
className:"updating-text unselectable"},await b("DesktopAppIsUpdating_Text")))},OnAfterShow:function(){},
OnBeforeHide:function(){},Focus:function(){},Dispose:function(){}}}},47836:function(a,b,c){"use strict";c.d(b,{m:function(){
return i},o:function(){return j}});var d=c(3566),e=c(63956),f=c(69893),g=c(4153),h=(c(13117),c(21566),c(208),c(74350),
c(91764)._);function i(a,b,c,f){let i=null,j=null,k=null,l=null,m=null,n=null;const o=1e3;let p=b,q=c;return{
Create:async function(b,c){
const e=await a.LocalizeString("AskConsentToCollectData_Title"),f=await a.LocalizeString("AskConsentToCollectData_SectionTitleStart_Text"),g=await a.LocalizeString("AskConsentToCollectData_PersonalDataSection_Text"),o=await a.LocalizeString("AskConsentToCollectData_TechnicalDataSection_Text"),w=await a.LocalizeString("AskConsentToCollectData_UrlsAndSearchTerms_Text"),x=await a.LocalizeString("AskConsentToCollectData_ActionsAndFilledInformation_Text"),y=await a.LocalizeString("AskConsentToCollectData_PersonalRejectionImpact_Text"),z=await a.LocalizeString("AskConsentToCollectData_TechnicalRejectionImpact_Text"),A=await a.LocalizeString("AskConsentToCollectData_Details_Text"),B=await a.LocalizeString("AskConsentToCollectData_PrivacyPolicy_Link_Text"),C=await a.LocalizeString("AskConsentToCollectData_ContinueButton_Text"),D=await a.LocalizeString("AskConsentToCollectData_YesSwitcher_Text"),E=await a.LocalizeString("AskConsentToCollectData_NoSwitcher_Text"),F=h("div",{
className:"ask-consent-page unselectable"},j=h("div",{className:"content"},h("div",{className:"title"},e),h("div",{
className:"data-section"},h("div",{className:"data-section-title"},f,h("div",{className:"personal-data-section-title"
},g)),h("div",{className:"personal-data-description"},h("ul",null,h("li",{className:"urls-and-search-terms"},w)),h("div",{
className:"flexy-space"}),k=h(d.ij,{leftValue:E,rightValue:D,default:p?"right":"left",highlighted:"right",onSwitch:t
})),h("div",{className:"personal-data-reject-impact"},y)),h("div",{className:"data-section"},h("div",{
className:"technical-section-title"},f,h("div",{className:"technical-data-section-title"},o)),h("div",{
className:"technical-data-description"},h("ul",null,h("li",{className:"technical-data"},x)),h("div",{className:"flexy-space"
}),l=h(d.ij,{leftValue:E,rightValue:D,default:q?"right":"left",highlighted:"right",onSwitch:u})),h("div",{
className:"technical-data-reject-impact"},z)),h("div",{className:"permissions-text"},A,h("a",{href:"#",onclick:r
},B),"."),m=h("input",{type:"button",value:C,className:"important-button normal-button",onclick:s})),n=h("div",{
className:"action-progress-overlay-circle size64 hidden"}));return v(),i=b,F},OnAfterShow:function(){},
OnBeforeHide:function(){},Focus:function(){},Dispose:function(){}};function r(){(0,e.D$)((()=>f()),y,o,w)}function s(){const a={
m_have_consent_for_personal_data:p,m_have_consent_for_technical_data:q};y(),(0,g.TT)(i)(a)}function t(a){p="right"===a,v()}
function u(a){q="right"===a,v()}function v(){p&&q?(0,g.TT)(m).removeAttribute("disabled"):(0,
g.TT)(m).setAttribute("disabled","disabled")}function w(){return(0,g.TT)(n).classList.remove("hidden"),x}function x(){(0,
g.TT)(n).classList.add("hidden")}function y(){return(0,g.TT)(m).setAttribute("disabled","disabled"),(0,
g.TT)(l).classList.add("switcher-disabled"),(0,g.TT)(k).classList.add("switcher-disabled"),(0,
g.TT)(j).classList.add("disabled-state"),window.addEventListener("mousedown",A,!0),z}function z(){v(),(0,
g.TT)(l).classList.remove("switcher-disabled"),(0,g.TT)(k).classList.remove("switcher-disabled"),(0,
g.TT)(j).classList.remove("disabled-state"),window.removeEventListener("mousedown",A,!0)}function A(a){a.preventDefault(),
a.stopPropagation()}}function j(a,b){const c=b;let d=null,i=null,j=null,k=null;const l=1e3;return{Create:async function(b,c){
const e=await a.LocalizeString("AskConsentToCollectData_RoboFormCannotWorkWithoutPermissions_Text"),f=await a.LocalizeString("AskConsentToCollectData_RemoveExtensionButton_Text"),g=await a.LocalizeString("AskConsentToCollectData_RevisitConsentsButton_Text"),l=h("div",{
className:"need-user-consent-page unselectable"},h("div",{className:"title"},"Privacy"),h("div",{
className:"consent-required-message"},e),h("div",{className:"footer"},i=h("input",{type:"button",value:f,
className:"normal-button regular-button",onclick:m}),h("div",{className:"flexy-space"}),j=h("input",{type:"button",value:g,
className:"important-button normal-button",onclick:n})),k=h("div",{className:"action-progress-overlay-circle size48 hidden"}))
;return d=c,l},OnAfterShow:function(){},OnBeforeHide:function(){},Focus:function(){},Dispose:function(){}};function m(){(0,
e.D$)((()=>c.UninstallExtension()),q,l,o)}function n(){q(),(0,g.TT)(d)((0,f.JS)())}function o(){return(0,
g.TT)(k).classList.remove("hidden"),p}function p(){(0,g.TT)(k).classList.add("hidden")}function q(){return(0,
g.TT)(i).setAttribute("disabled","disabled"),(0,g.TT)(j).setAttribute("disabled","disabled"),
window.addEventListener("mousedown",s,!0),r}function r(){(0,g.TT)(i).removeAttribute("disabled"),(0,
g.TT)(j).removeAttribute("disabled"),window.removeEventListener("mousedown",s,!0)}function s(a){a.preventDefault(),
a.stopPropagation()}}},80137:function(a,b,c){"use strict"
;var d=c(65760),e=c(53895),f=c(5971),g=c(95250),h=c(66423),i=c(9578),j=c(5197),k=c(52965),l=c(78440);c(13117);const m=(0,
f.pW)(),n=(0,e.w)(m),o=(0,g.EI)(m),p=(0,g.Lz)(m),q=(0,g.Bq)(m),r=(0,g.d7)(m);(0,l.uT)((async()=>{await n.Init(null),p.Init()
;const a=await(0,d.d)(n,q,r,o,p,(0,h.S)(),(0,i.V)(),(0,j.T)(),(0,k.c)()),b=(0,l.f4)(null,null,null);await a.ShowUI(b)
})(),"Popup:Init")},40935:function(a){"use strict";a.exports=function(a){var b=[];return b.toString=function(){
return this.map((function(b){var c="",d=void 0!==b[5];return b[4]&&(c+="@supports (".concat(b[4],") {")),
b[2]&&(c+="@media ".concat(b[2]," {")),d&&(c+="@layer".concat(b[5].length>0?" ".concat(b[5]):""," {")),c+=a(b),d&&(c+="}"),
b[2]&&(c+="}"),b[4]&&(c+="}"),c})).join("")},b.i=function(a,c,d,e,f){"string"==typeof a&&(a=[[null,a,void 0]]);var g={}
;if(d)for(var h=0;h<this.length;h++){var i=this[h][0];null!=i&&(g[i]=!0)}for(var j=0;j<a.length;j++){var k=[].concat(a[j])
;d&&g[k[0]]||(void 0!==f&&(void 0===k[5]||(k[1]="@layer".concat(k[5].length>0?" ".concat(k[5]):""," {").concat(k[1],"}")),
k[5]=f),c&&(k[2]?(k[1]="@media ".concat(k[2]," {").concat(k[1],"}"),k[2]=c):k[2]=c),
e&&(k[4]?(k[1]="@supports (".concat(k[4],") {").concat(k[1],"}"),k[4]=e):k[4]="".concat(e)),b.push(k))}},b}},20062:function(a){
"use strict";a.exports=function(a,b){return b||(b={}),a?(a=String(a.__esModule?a.default:a),
/^['"].*['"]$/.test(a)&&(a=a.slice(1,-1)),
b.hash&&(a+=b.hash),/["'() \t\n]|(%20)/.test(a)||b.needQuotes?'"'.concat(a.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):a):a}},
36758:function(a){"use strict";a.exports=function(a){return a[1]}},31996:function(a,b,c){"use strict"
;a.exports=c.p+"back-action-button-dark.svg"},50535:function(a,b,c){"use strict";a.exports=c.p+"back-action-button.svg"},
99831:function(a,b,c){"use strict";a.exports=c.p+"back-button.png"},73688:function(a,b,c){"use strict"
;a.exports=c.p+"blocking-passcard.ico"},21727:function(a,b,c){"use strict";a.exports=c.p+"bookmark-dark.svg"},
26310:function(a,b,c){"use strict";a.exports=c.p+"bookmark.svg"},30221:function(a,b,c){"use strict"
;a.exports=c.p+"compromised-item-mark-24.svg"},9255:function(a,b,c){"use strict";a.exports=c.p+"contact-dark.svg"},
91742:function(a,b,c){"use strict";a.exports=c.p+"contact.svg"},75223:function(a,b,c){"use strict"
;a.exports=c.p+"folder-dark.svg"},19566:function(a,b,c){"use strict";a.exports=c.p+"folder.svg"},23261:function(a,b,c){
"use strict";a.exports=c.p+"identity-dark.svg"},31072:function(a,b,c){"use strict";a.exports=c.p+"identity.svg"},
70447:function(a,b,c){"use strict";a.exports=c.p+"list-item-more-actions-dark.svg"},32983:function(a,b,c){"use strict"
;a.exports=c.p+"list-item-more-actions-hover.svg"},43446:function(a,b,c){"use strict";a.exports=c.p+"list-item-more-actions.svg"
},99110:function(a,b,c){"use strict";a.exports=c.p+"login-dark.svg"},81869:function(a,b,c){"use strict"
;a.exports=c.p+"login.svg"},91219:function(a,b,c){"use strict";a.exports=c.p+"menu-fill-default.svg"},23643:function(a,b,c){
"use strict";a.exports=c.p+"menu-fill.svg"},57541:function(a,b,c){"use strict";a.exports=c.p+"menu-goto-default.svg"},
77537:function(a,b,c){"use strict";a.exports=c.p+"menu-goto.svg"},18871:function(a,b,c){"use strict"
;a.exports=c.p+"menu-login-default.svg"},6343:function(a,b,c){"use strict";a.exports=c.p+"menu-login.svg"},
80515:function(a,b,c){"use strict";a.exports=c.p+"menu-view-default.svg"},3083:function(a,b,c){"use strict"
;a.exports=c.p+"menu-view.svg"},59212:function(a,b,c){"use strict";a.exports=c.p+"progress-circle.svg"},84249:function(a,b,c){
"use strict";a.exports=c.p+"roboform-name-logo-dark.svg"},78244:function(a,b,c){"use strict"
;a.exports=c.p+"roboform-name-logo.svg"},40214:function(a,b,c){"use strict";a.exports=c.p+"roboform-robot-logo-dark.svg"},
33437:function(a,b,c){"use strict";a.exports=c.p+"roboform-robot-logo.svg"},35214:function(a,b,c){"use strict"
;a.exports=c.p+"safenote-dark.svg"},48005:function(a,b,c){"use strict";a.exports=c.p+"safenote.svg"},18417:function(a,b,c){
"use strict";a.exports=c.p+"searchcard.ico"},7963:function(a,b,c){"use strict";a.exports=c.p+"sharing-overlay-granted.svg"},
16296:function(a,b,c){"use strict";a.exports=c.p+"sharing-overlay-limited.svg"},6456:function(a,b,c){"use strict"
;a.exports=c.p+"sharing-overlay-login-only.svg"},10627:function(a,b,c){"use strict";a.exports=c.p+"sharing-overlay-manager.svg"
},24659:function(a,b,c){"use strict";a.exports=c.p+"sharing-overlay-received.svg"},97410:function(a,b,c){"use strict"
;a.exports=c.p+"sharing-overlay-regular.svg"},25116:function(a,b,c){"use strict";a.exports=c.p+"editor-close-light.svg"},
58863:function(a,b,c){"use strict";a.exports=c.p+"editor-close.svg"},70162:function(a,b,c){"use strict"
;a.exports=c.p+"shield-good.svg"},25224:function(a,b,c){"use strict";a.exports=c.p+"shield-medium.svg"},44112:function(a,b,c){
"use strict";a.exports=c.p+"shield-strong.svg"},84817:function(a,b,c){"use strict";a.exports=c.p+"shield-weak.svg"},
44974:function(){},49701:function(){},29165:function(){}},function(a){a.O(0,[612],(function(){return b=80137,a(a.s=b);var b}))
;a.O()}]);