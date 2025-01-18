'use strict';
var __mainWrapper={
	get: function (){
		var mainWrapper=$('__myNoteMainWrapper');
		if(!mainWrapper){
			mainWrapper=document.createElement('div');
			mainWrapper.id='__myNoteMainWrapper';
			mainWrapper.className='__myNoteMainWrapper';
			var body;
			if(typeof document.body!=='undefined'){
				body=document.body;
			}else{
				body=document.childNodes[0];
			}
			//if body is a frameset, I need to create it AFTER the frameset
			if(body.nodeName.toLowerCase()==='frameset'){
				body.parentNode.appendChild(mainWrapper);
			}else{
				body.appendChild(mainWrapper);
			}
			observeDOM(body, function (){
				//let's not check A LOT of changes in a row but just 1 second after the last one
				//TO-DO .. what if the dom changes all the time ???
				if(initTimeout!==false){
					clearTimeout(initTimeout);
				}
				initTimeout=setTimeout(function (){
					var mainWrapper=$('__myNoteMainWrapper');
					if(!mainWrapper){
						__stickys.clearPage();
						if(loadTimeout!==false){
							clearTimeout(loadTimeout);
						}
						loadTimeout=setTimeout(function (){
							loadNotes();
						}, 250);
						observeDOM(body, undefined, true);
						console.log('where did the stickys go?');
					}
				}, 250);
			});
		}
		return mainWrapper;
	}
};