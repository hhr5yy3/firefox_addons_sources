(function(){
	var ToolTip = function(){
		
	};
	
	ToolTip.prototype = {
		_container: null,
		_arrowLeftOffset: 14,
		_currentElement: null,
		
		displayImage: function( elem, imageSrc, event ){
			var html = "<img src=\""+imageSrc+"\"/>";
			this.display( elem, html, event );
		},
		
		//display: function( elem, html, event ){
        display: function( elem, html, event, mode ){// Task #845
			event.stopPropagation();
                        
			if( this._currentElement == elem ){
                this.close(); // Task #856
				return;				
			}
			
			this._currentElement = elem;
			
			var that = this;
            
            if(typeof mode != "object") mode = {mode: mode || false}; // Task #845
            //console.info(mode);
			
			var setFunction = function(){
				//var toolTipContainer = chrome.extension.getBackgroundPage().document.getElementById( "tiptip_holder" ).cloneNode(true);
                var toolTipContainer = browser.extension.getBackgroundPage().document.getElementById( 
                    mode.pos == "top" ? "tiptip_holder_top" : "tiptip_holder" 
                ).cloneNode(true);// Task #845
				
                that._container = toolTipContainer;	
				
				// position
				var offset = fvdSynchronizer.Utils.getOffset( elem );
                
                // position
                if(mode.pos != "top"){
                    toolTipContainer.style.left = offset.left + (elem.offsetWidth/2) - that._arrowLeftOffset - 1 + "px";
                    toolTipContainer.style.top = offset.top + elem.offsetHeight + 1 + "px";			
                }else{// Task #845
                    var rect = false;
                    try{
                        rect = document.getElementById('buttonWhyUseUi').getBoundingClientRect();
                    }catch(ex){
                        console.info(ex);
                    }
                    
                    toolTipContainer.style.left = offset.left - that._arrowLeftOffset - 1 + "px";
                    //toolTipContainer.style.bottom = "290px";//(typeof rect == "object" ? rect.bottom : 4 * elem.offsetHeight + 10) + "px";	
                    toolTipContainer.style.top = "540px"; 	// Task #2044
                    
                    toolTipContainer.style.position = "absolute";
                    //toolTipContainer.style.zIndex = 100;
                    
                }
                
				document.body.appendChild( that._container );	
				var contentContainer = document.getElementById("tiptip_content");
				contentContainer.innerHTML = html;
				setTimeout( function(){
					toolTipContainer.setAttribute( "active", 1 );				
					
                    that._assignClickListener();	
                    
					that._assignBlurListener(); // Task #856	
				}, 0 );	
			};
			
			if( this._container ){
				this.close( setFunction );
			}		
			else{
				setFunction();
			}	
		},
		
		close: function( callback ){
			if(fvdSynchronizer.ToolTip._container){
                fvdSynchronizer.ToolTip._container.setAttribute( "active", 0 );

                fvdSynchronizer.ToolTip._container.addEventListener( "webkitTransitionEnd", function(){
                    try{
                        fvdSynchronizer.ToolTip._container.parentNode.removeChild( fvdSynchronizer.ToolTip._container );
                        fvdSynchronizer.ToolTip._container = null;
                        fvdSynchronizer.ToolTip._currentElement = null;
                        fvdSynchronizer.ToolTip._removeClickListener();

                        if( callback ){
                            callback();
                        }
                    }
                    catch( ex ){

                    }
                }, false );		
            }			
		},
		
		_clickListener: function( event ){
            //console.info("need close");
            
			if( fvdSynchronizer.ToolTip._container ){
				var el = event.target;
				do{
					if( el == fvdSynchronizer.ToolTip._container ){
						return;
					}
					el = el.parentNode;
				}
				while( el );
			}	
			
			fvdSynchronizer.ToolTip.close();
		},
				
		_assignClickListener: function(){
            //console.info("_assignClickListener");
			document.addEventListener( "click", fvdSynchronizer.ToolTip._clickListener, false );
		},
		
		_removeClickListener: function(){
			document.removeEventListener( "click", fvdSynchronizer.ToolTip._clickListener );
		},
        
        _assignBlurListener: function(){ // Task #856
            window.addEventListener('blur', function(e){ 
                fvdSynchronizer.ToolTip.close();
            });
        }
	};
	
	this.ToolTip = new ToolTip();
}).apply( fvdSynchronizer );
