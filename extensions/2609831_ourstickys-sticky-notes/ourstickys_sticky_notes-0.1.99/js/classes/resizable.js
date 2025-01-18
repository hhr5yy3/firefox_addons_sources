'use strict';
var __resizable={
	captured: null,
	_options: {},
	start: function (options){
		options['object']['resize']=options['resize'];
		options['object']['resizing']=options['resizing'];
		options['object']['resized']=options['resized'];
		options['handle']['__resizable']={
			object: options['object']
		};
		options['handle'].addEventListener('mousedown', __resizable._start, false);
		options['handle'].addEventListener('touchstart', __resizable._start, false);
		return options['object'];
	},
	_start: function (e){
		if(e.button===0){
			stopEvent(e);
			var container=this['__resizable'].object;
			container.attr({
				startX: parseInt(e.clientX-container.offsetLeft, 10),
				startY: parseInt(e.clientY-container.offsetTop, 10),
				startWidth: parseInt(container.clientWidth, 10),
				startHeight: parseInt(container.clientHeight, 10),
				style: {
					zIndex: defaultZIndexFocus
				}
			});
			__resizable.captured=container;

			document.addEventListener('mousemove', __resizable._resizing, false);
			document.addEventListener('touchmove', __resizable._resizing, false);
			document.addEventListener('mouseup', __resizable._end, false);
			document.addEventListener('touchend', __resizable._end, false);
			if(typeof container.resize==='function'){
				container.resize();
			}
		}
	},
	_resizing: function (e){
		if(__resizable.captured!==null){
			var container=__resizable.captured;
			stopEvent(e);
			var newWidth=(container.startWidth+e.clientX-container.startX-container.offsetLeft);
			var newHeight=(container.startHeight+e.clientY-container.startY-container.offsetTop);
			if(newWidth<minDimensions['width']){
				newWidth=minDimensions['width'];
			}
			if(newHeight<minDimensions['height']){
				newHeight=minDimensions['height'];
			}
			container.style.width=newWidth+'px';
			container.style.height=newHeight+'px';
			container.classList.add('__myNoteWrapperResizing');
			if(typeof container.resizing==='function'){
				container.resizing();
			}
		}
	},
	_end: function (e){
		if(__resizable.captured!==null){
			var container=__resizable.captured;
			stopEvent(e);
			container.classList.remove('__myNoteWrapperResizing');
			container.style.zIndex=defaultZIndex;
			document.removeEventListener('mousemove', __resizable._resizing, false);
			document.removeEventListener('touchmove', __resizable._resizing, false);
			document.removeEventListener('mouseup', __resizable._end, false);
			document.removeEventListener('touchend', __resizable._end, false);
			if(typeof container.resized==='function'){
				container.resized();
			}
			__resizable.captured=null;
		}
	}
};