"use strict";

const customStyle = document.createElement("custom-style");

const customStyleInnerStyle = document.createElement("style");
customStyleInnerStyle.setAttribute("include", "iron-flex iron-flex-alignment iron-positioning");
customStyleInnerStyle.append(`
    paper-icon-item {
        --paper-item-icon-width: 40px; /* dupicated value in css below also because --paper-item-icon-width should normally sufice, but when using <template> to import polyer menu the --p... was not working */
    }

    app-toolbar {
        color:#FAFAFA;
        background:#555;
        --app-toolbar-font-size: 16px;
    }

    paper-dialog {
        --paper-dialog-scrollable: {
            max-height:70vh; /* patch for scroll bar issue when trying to drag it */
        }
    }		

    paper-drawer-panel {
        --paper-drawer-panel-left-drawer-container: { background-color: rgb(238, 238, 238) };
    }

    paper-radio-group {
        --paper-radio-group-item-padding: 0;
    }

    paper-tooltip {
        --paper-tooltip: {
            font-size:13px;
        };
    }

    paper-toast paper-spinner {
        --paper-spinner-layer-1-color: white;
        --paper-spinner-layer-2-color: white;
        --paper-spinner-layer-3-color: white;
        --paper-spinner-layer-4-color: white;
    }
`);

customStyle.append(customStyleInnerStyle);

const style = document.createElement("style");
style.append(`
    [unresolved] {opacity:0}
	
	html, paper-header-panel, neon-animated-pages {height:100%}
    
    @-moz-document url-prefix() {
        body {font-family: "Segoe UI", Tahoma, sans-serif}
    }
	body {background-color:white;overflow:hidden; /* used to hide bars when zoom level is 150+ */}
	body[resolved] {transition: opacity 0.15s ease-in-out} /* move transition to [resolved] because attaching it to body alone would take effect when initially hiding fouc so it would fade out then fade in, test it with a longer transitionduration */
	body.page-loading-animation {background-image:url("images/ajax-loader.svg");background-repeat: no-repeat;background-position:50% 50%} /* issue: when using camel case and the import css */
	.widget body {height:100%;width:100%}
	
	paper-radio-group {outline:none}

	paper-icon-button {opacity:0.7}
	paper-icon-item iron-icon {opacity:0.5}
	paper-icon-button:hover {opacity:1}

	paper-item:hover, paper-icon-item:hover {cursor:pointer;background-color:#eee}

	paper-icon-item .content-icon {width:40px !important} /* --paper-item-icon-width above should normally sufice, but when using <template> to import polyer menu the --p... was not working */
	
	paper-button[raised].colored {background-color:#4285f4 !important;color:#fff}
	
	/* .placeholder is used to prevent flickering of paper-icon-button when inside paper-menu-button, I place one paper-icon-button outside and inside and then swap their visibility when polymer2 is loaded */
	[resolved2] .placeholder {display:none !important}
	[unresolved2] paper-menu-button {display:none}
	
	[unresolved2] paper-dialog {display:none}
	xxpaper-tooltip:unresolved, xxpaper-toast:unresolved {display:none}

	paper-toast {min-width:auto !important}
	.rtl paper-toast {left:auto;right:12px}
	paper-toast #label {padding-right:20px}
	paper-toast#error #label {font-weight:bold;color:#FF5050}
	.toastLink {color:#a1c2fa}
	.toastLink:hover {color:#bbdefb}
	
	.toolbar-tools.paper-toolbar .title {line-height:normal}
	
	paper-toast:not(#processing) {padding:8px 9px 4px 16px}
	
	#processing {transition:none}
	/* All this to put spinner on the left of the text */
	#processing .paper-toast {-webkit-margin-end:0;-webkit-margin-start:32px}
	#processing paper-spinner {position:absolute;top:11px;left:13px}
	.rtl #processing paper-spinner {left:auto;right:13px}
	#processing paper-spinner .circle {border-color: white}
	.closeToast {cursor:pointer}
	
	paper-dialog .buttons paper-icon-button {color:#555}
	
	paper-dialog-scrollable paper-radio-button {display:block}
	paper-dialog-scrollable paper-radio-button, paper-dialog-scrollable paper-checkbox {margin:2px 0} /* patch to remove scrollbar in paper-dialog-scrollable */

	.paper-input {overflow-x: hidden;text-overflow: ellipsis}
	
	.separator {height:1px;background:#ddd;margin:8px 0;min-height:0 !important}
	
	#options-menu paper-item, #options-menu paper-icon-item {min-height: 40px}
	#options-menu span {white-space:nowrap}
	
	.shareButton {display:none;margin-bottom:1px}
	.shareButton iron-icon {width:20px;height:20px} /* changing width is good enough to shrink image, height is default 24 - all the other non social icons beside this one in the top right are height 24px so changing that will mis align vertically */
	#share-menu svg {padding:5px 15px;width:19px;height:19px}
	
	.close {position:absolute;margin:0;padding:3px;top:-1px;right:1px;width:24px;height:24px}
	.rtl .close {right:auto;left:1px}
	.inherit, a.inherit {color:inherit}
	.inherit {background-color:inherit;text-decoration:inherit}
`);

document.head.append(customStyle, style);