'use strict';
var __draggable={
	captured: null,
	_options: {},
	start: function (options){
		options['object']['drag']=options['drag'];
		options['object']['dragging']=options['dragging'];
		options['object']['dragged']=options['dragged'];
		options['handle']['__draggable']={
			object: options['object']
		};
		options['handle'].addEventListener('mousedown', __draggable._start, false);
		options['handle'].addEventListener('touchstart', __draggable._start, false);
		return this;
	},
	_start(e){
		if(e.button===0){
			stopEvent(e);
			var container=this['__draggable'].object;
			container.attr({
				isDragged: false,
				startX: e.clientX-container.offsetLeft,
				startY: e.clientY-container.offsetTop,
				style: {
					zIndex: defaultZIndexFocus,
					cursor: "move"
				}
			});
			__draggable.captured=container;

			document.addEventListener('mousemove', __draggable._dragging, false);
			document.addEventListener('touchmove', __draggable._dragging, false);
			document.addEventListener('mouseup', __draggable._end, false);
			document.addEventListener('touchend', __draggable._end, false);
			if(typeof container.dragging==='function'){
				container.dragging();
			}
		}
	},
	_dragging: function (e){
		if(__draggable.captured!==null){
			var container=__draggable.captured;
			stopEvent(e);
			var newLeft=e.clientX-container.startX;
			var newTop=e.clientY-container.startY;
			var minLeft=0, minTop=0;
			if(newLeft<minLeft){
				newLeft=minLeft;
			}
			if(newTop<minTop){
				newTop=minTop;
			}
			//have we started dragging yet ?
			if(!container.isDragged){
				container.classList.add('__myNoteWrapperDragging');
				container.isDragged=true;
			}else{
				//let's snap it to close by stickys if 5px away from their corner X-Y
				var elem=document.getElementsByClassName('__myNoteWrapper');
				var elength=elem.length;
				var snapped=false;
				for(var i=0; i<elength; i++){
					var snapDistance=5;
					var el=elem[i];
					if(el.id!==__draggable.captured.id){
						//find the corners:, topLeft, topRight, bottomLeft, bottomRight
						var top=parseInt(el.style.top, 10);
						var left=parseInt(el.style.left, 10);
						var right=left+parseInt(el.style.width, 10);
						var bottom=top+parseInt(el.style.height, 10);

						if(top-snapDistance<=newTop&&top+snapDistance>=newTop){	//top snapping
							newTop=top;
							snapped=true;
						}else if(bottom-snapDistance<=newTop&&bottom+snapDistance>=newTop){ //bottom snapping
							newTop=bottom;
							snapped=true;
						}else if(top-snapDistance<=(newTop+parseInt(__draggable.captured.style.height, 10))&&top+snapDistance>=(newTop+parseInt(__draggable.captured.style.height, 10))){ //bottom to top snapping
							newTop=top-parseInt(__draggable.captured.style.height, 10);
							snapped=true;
						}else if(bottom-snapDistance<=(newTop+parseInt(__draggable.captured.style.height, 10))&&bottom+snapDistance>=(newTop+parseInt(__draggable.captured.style.height, 10))){ //bottom to bottom snapping
							newTop=bottom-parseInt(__draggable.captured.style.height, 10);
							snapped=true;
						}
						if(right-snapDistance<=newLeft&&right+snapDistance>=newLeft){	//right snapping
							newLeft=right;
							snapped=true;
						}else if(left-snapDistance<=newLeft&&left+snapDistance>=newLeft){	//left to left snapping
							newLeft=left;
							snapped=true;
						}else if(left-snapDistance<=(newLeft+parseInt(container.style.width, 10))&&left+snapDistance>=(newLeft+parseInt(container.style.width, 10))){	//left snapping
							newLeft=left-parseInt(container.style.width, 10);
							snapped=true;
						}else if(right-snapDistance<=(newLeft+parseInt(container.style.width, 10))&&right+snapDistance>=(newLeft+parseInt(container.style.width, 10))){	//right to right snapping
							newLeft=right-parseInt(container.style.width, 10);
							snapped=true;
						}
//						if(snapped){
//							break;
//						}
					}
				}
			}
			container.style.left=newLeft+'px';
			container.style.top=newTop+'px';
			if(typeof container.dragging==='function'){
				container.dragging();
			}
		}
	},
	_end: function (e){
		if(__draggable.captured!==null){
			var container=__draggable.captured;
			stopEvent(e);
			if(container.isDragged){
				container.classList.remove('__myNoteWrapperDragging');
				let key_note=container.dataset.keyNote;
				let text=$('__myNoteText_'+key_note);
				container.style.zIndex=defaultZIndex;
				let delta_x=text.dataset.coord_p_x-parseInt(container.style.left, 10);
				let delta_y=text.dataset.coord_p_y-parseInt(container.style.top, 10);
				//min movement to save data is at least `min_delta` in any direction
				var min_delta=5;
				if(Math.abs(delta_x)>min_delta||Math.abs(delta_y)>min_delta){
					text.dataset.coord_o_x=text.dataset.coord_o_x-delta_x;
					text.dataset.coord_o_y=text.dataset.coord_o_y-delta_y;
					text.dataset.coord_p_x=parseInt(container.style.left, 10);
					text.dataset.coord_p_y=parseInt(container.style.top, 10);
				}
				adjustNotePointer(key_note);
				if(typeof container.dragged==='function'){
					container.dragged();
				}
			}
			container.style.cursor="";
			container.isDragged=false;

			document.removeEventListener('mousemove', __draggable._dragging, false);
			document.removeEventListener('touchmove', __draggable._dragging, false);
			document.removeEventListener('mouseup', __draggable._end, false);
			document.removeEventListener('touchend', __draggable._end, false);
			__draggable.captured=null;
		}
	}
};