
var ListView = function(sel,margin){

  var _ = this;

  _.sel = sel;
  _.WH;
  _.WW;
  _.headerH;
  _.footerH;
  _.subnavH;
  _.extendedViewW;
  _.extendedViewVisible = false;
  _.marginTop;
  _.marginBottom;
  _.marginLeft;
  _.marginRight;
  _.paddingTop;
  _.paddingBottom;
  _.paddingLeft;
  _.paddingRight;
  _.header_orig_width;
  _.subnav_orig_width;
  _.body_orig_width;
  _.footer_orig_width;
  _.IS_ACTIVE = false;
  _.$touchScrolls;
  _.scrolls;
  _.scroll_timeout;
  _.elW;
  _.display;
  _.col_a_width_default = 300;
  // _.col_a_width_small = 300;
  _.col_small_percent = 0.2;
  _.col_panel_percent = 0.30;
  // _.app_nav_collapsed_width = 0;
  //_.col_a_percent = 0.32;
  // _.col_a_width_small = 220;

  // ---

  _.$el = $(_.sel);
  _.$window;
  _.$header;
  _.$body;
  _.$footer;
  _.$subnav;
  _.$content;
  _.$extended;
  _.$listSticky;
  _.$listStickyHide;

  // ---

  this.init = function(){
    
    _.$window = $(window);
    _.$header = $(_.sel+' [data-comp="listHeader"]');
    _.$body = $(_.sel+' [data-comp="listBody"]');
    _.$footer = $(_.sel+' [data-comp="listFooter"]');
    _.$subnav = $(_.sel+' [data-comp="listSubNav"]');
    _.$content = $(_.sel+' [data-comp="listContent"]');
    _.$extended = $(_.sel+' [data-comp="listExtendedView"]');
    _.$listSticky = $(_.sel+' [data-comp="listSticky"]');
    _.$listStickyHide = $(_.sel+' [data-comp="listStickyHide"]');
    _.$header.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ _.resize(); });

    // ---

    _.display = _.$el.attr("data-display");
    _.free_width = _.$el.attr("data-width");
    _.free_left = _.$el.attr("data-left");
    _.header_orig_width = _.$header.css("width");
    _.subnav_orig_width = _.$subnav.css("width");
    _.body_orig_width = _.$body.css("width");
    _.footer_orig_width = _.$footer.css("width");
    _.$touchScrolls = $(_.sel+" [data-scroll=true]");
    _.touchScrollsArray = [];

    // ---

    document.addEventListener("DO_RESIZE", function(e){
      _.doResize()
    });

    // ---

    _.resize();
    _.$window.on('resize',_.resize);

    // ---

    _.$body.scroll(function() {
      _.checkScroll();
    });
    
    // ---
    
    if (_.display === 'POP') {
      
      _.$el.on('click',function() {
        _.hide();
      });
      
      _.$header.on('click',function(e) {
        e.stopPropagation();
      });
      _.$body.on('click',function(e) {
        e.stopPropagation();
      });
      _.$footer.on('click',function(e) {
        e.stopPropagation();
      });
      
    }

  }

  this.checkScroll = function() {

    if(!_.IS_ACTIVE ){
     return false;
    }

    if (_.initalSCroll && _.$body.scrollTop() != 0) {
      if (_.initalSCroll > _.$body.scrollTop()) {
        _.$el.addClass('scroll-up').removeClass('scroll-down');
      } else {
        _.$el.addClass('scroll-down').removeClass('scroll-up');
      }
    } else {
      _.$el.removeClass('scroll-down scroll-up');
    }

    _.initalSCroll = _.$body.scrollTop();

  }

  this.resize = function(){

	   //_.doResize()
	   //requestAnimFrame(_.doResize);

     if(!_.IS_ACTIVE ){
      return false;
     }

	   var resizeEvt = new CustomEvent('RESIZE',{ 'detail': '' });
	   document.dispatchEvent(resizeEvt);

   }

  this.doResize = function(){

	   if(!_.IS_ACTIVE ){
		  return false;
	   }
     
     // ---

     var leftPos = 0;
     var appNavWidth = 0;
     var extra_width = 0;
     var taskListIsCollapsed = typeof view != 'undefined' && typeof view.taskListNavigator != 'undefined' ? view.taskListNavigator.is_collapsed : false;
     
     var $sideView = $("[data-display=side_view].active");
     
     // ---

     _.WH = _.$window.height();
	   _.WW = _.$window.width();
	   _.elW = _.WW;

     if (taskListIsCollapsed) {
       _.col_a_width = 20;
     } else {
       _.col_a_width = typeof view != 'undefined' && typeof view.taskListNavigator != 'undefined' && view.taskListNavigator.listView.IS_ACTIVE ? _.col_a_width_default : 0;
     }

     if( $sideView.length > 0 ){
       if (!$sideView.hasClass('lighbox_')) {
         side_view_width = $sideView.outerWidth(true);
         extra_width+=side_view_width;
       }
	   } else if(_.$el.attr("data-insights_open") == "true"){
       extra_width += view.insights.$el.width();
     }

	   if( typeof(_.display) !== "undefined" ){

       if(_.display == "column_a"){
         _.elW = _.col_a_width;
			   leftPos = appNavWidth;
		   }

		   if(_.display == "column_b"){
        
          var space = _.col_a_width + extra_width;
          
           if(_.returnViewFormat() == "medium_window"){
             if (view.taskListNavigator.listView.IS_ACTIVE && !taskListIsCollapsed) {
               space = _.col_a_width;
             }
           }
          
          if( _.returnViewFormat() == "small_window"){
           space =  20;
          }

          _.elW =  _.WW - space;

          leftPos = appNavWidth  + _.col_a_width;

		   }

		   if(_.display == "column_panel"){
			   _.elW =  _.WW * _.col_panel_percent;
			   leftPos = (_.WW - _.elW) ;
		   }

		   if(_.display == "column_panel_small"){
			   _.elW =  320;
         leftPos = (_.WW - _.elW );
		   }

		   if( _.display == "column_full"){ 
         if( _.returnViewFormat() == "small_window" ) {
           _.elW = _.WW;
         } else {
           _.elW = _.WW - extra_width;
  			   leftPos = appNavWidth;
         }
		   }

		  if(_.display == "side_view"){
			   leftPos = (_.WW - $sideView.outerWidth(true) );
		  }

		  if(_.display == "free"){
				_.elW = ((_.WW-appNavWidth)*Number(_.free_width/100));
				leftPos =  (_.WW*Number(_.free_left/100))+appNavWidth;
		  }

		  if(typeof(_.scroll_timeout)!="undefined"){
			  clearTimeout(_.scroll_timeout)
		  }
      
		  _.scroll_timeout = setTimeout(_.setScrolls, 300)
      
		  _.$el.trigger("ListViewResized");
      
	   }

	   _.marginTop = parseInt(_.$el.css("margin-top").replace("px",""));
	   _.marginBottom = parseInt(_.$el.css("margin-bottom").replace("px",""));
	   _.marginLeft = parseInt(_.$el.css("margin-left").replace("px",""));
	   _.marginRight = parseInt(_.$el.css("margin-right").replace("px",""));

	   _.paddingTop = parseInt(_.$el.css("padding-top").replace("px",""));
	   _.paddingBottom = parseInt(_.$el.css("padding-bottom").replace("px",""));
	   _.paddingLeft = parseInt(_.$el.css("padding-left").replace("px",""));
	   _.paddingRight = parseInt(_.$el.css("padding-right").replace("px",""));

	   _.headerH = _.$header.length ? _.$header.outerHeight(true) : 0;
     
     if (_.$header.is(":hidden")) {
       _.headerH = 0;
     }

	   if(_.$footer.length > 0){
		 _.footerH = _.$footer.height();
	   }else{
		 _.footerH = 0;
	   }
	   if(_.$subnav.length > 0 ){
		 _.subnavH = _.$subnav.height();
	   }else{
		 _.subnavH = 0;
	   }


	   _.extendedViewW = _.$extended.width();

	   var nuWidth = _.elW - _.extendedViewW - _.marginLeft - _.marginRight - _.paddingLeft - _.paddingRight ;


	   // _.$body.height( _.WH - ( _.headerH + _.footerH+ _.marginTop + _.marginBottom + _.paddingTop + _.paddingBottom + _.subnavH ) ).css('top',(_.headerH+_.marginTop +_.paddingTop) + "px");
     _.$body.height( _.WH - ( _.headerH + _.footerH+ _.marginTop + _.marginBottom + _.paddingTop + _.paddingBottom + _.subnavH ) );



	   if(_.header_orig_width == "100%"){
	   		_.$header.width( nuWidth );
	   }

	   if(_.body_orig_width == "100%"){
		   _.$body.width( nuWidth );
	   }

	   if(_.footer_orig_width == "100%"){
	   		_.$footer.width( nuWidth );
	   }

	   if(_.subnav_orig_width == "100%"){
	   		_.$subnav.width( nuWidth );
	   }
	   if(_.display != "side_view" ){
	   		_.$el.css("left",leftPos).width(nuWidth);//OJO
	   }

     if (_.$listStickyHide.length) {
      _.hideH = _.$listStickyHide.outerHeight(true) - 10;
      if (_.$listSticky.length) {
        _.$listSticky.css({
          '-webkit-transform' : 'translate3d(0,-'+_.hideH+'px,0)',
          '-moz-transform'    : 'translate3d(0,-'+_.hideH+'px,0)',
          '-ms-transform'     : 'translate3d(0,-'+_.hideH+'px,0)',
          'transform'         : 'translate3d(0,-'+_.hideH+'px,0)'
        });
      }
     }

	   // scroll
	   // quizas hay poner un data-scroll para poder setear varios?
	   _.$el.trigger("resized");

   }

  this.showExtendedView = function(){
		_.extendedViewVisible = true;
		_.$el.addClass("listViewDisplayingExtended");
		_.resize();
	}

  this.hideExtendedView = function(){
		_.extendedViewVisible = false;
		_.$el.removeClass("listViewDisplayingExtended");
		_.resize();
	}

  this.hide = function(){
		if(_.IS_ACTIVE){
			_.$el.removeClass("active");
			_.IS_ACTIVE = false;
		}
		_.destroyScrolls();
	}

  this.show = function(){
		if(!_.IS_ACTIVE){
			_.IS_ACTIVE = true;
			_.$el.addClass("active");
      _.doResize();
      _.checkScroll();
		}
	}

	this.setScrolls = function(){

		if(typeof(_.scrolls)!="undefined"){
			setTimeout(function () {
			        _.scrolls.refresh();
			},0);
			console.log("SCROLL");
			return false;
		}

		if(_.$touchScrolls.length > 0 && IS_TOUCH){


			_.touchScrollsArray = [];

			var i = 0;
			_.$touchScrolls.each(function(){
				var $this = $(this);
				if(!$this.hasClass("scroll_container")){
					$this.addClass("scroll_container");
					$this.find(">:first-child").addClass("scroller");
				}
			})
			//

			try{
				console.log("SCROLL")
				_.scrolls = new IScroll(_.sel+" .scroll_container",{
																	 mouseWheel: true,
																	 click: false,
																	 preventDefaultException: { tagName:/.*/ }
										});

			}catch(err){
				console.log("ERROR ON SCROLL")
			}

		}

	}

	this.destroyScrolls = function(){
		if(_.$touchScrolls.length > 0 && typeof(_.scrolls) != "undefined"){
			if(DEBUG_MODE){
				_.scrolls.destroy()
			}else{
				try{
					_.scrolls.destroy()
				}catch(err){
					console.log("ERROR ON DESTROY SCROLL")
				}
			}
		}
	}

	this.showLoading = function(type){

		if(typeof(type)!== "undefined" && type =="soft"){

			if(_.$content.is(":empty")){
				_.$content.html(
				   "<div class='no-content loading'>"+
		       			"<div>"+
		       				_t("Loading")+
		       			"</div>"+
		       		"</div>"
			   );
			}

		}else{

		   _.$content.html(
			   "<div class='no-content loading'>"+
	       			"<div>"+
	       				_t("Loading")+
	       			"</div>"+
	       		"</div>"
		   );
	   }
   }

  this.removeLoading = function(){
   _.$content.html("");
  }

  this.showNewLoading = function(){
    _.$body.append('<div class="fullLoading"><div class="dot"></div></div>');
  };

  this.hideNewLoading = function(){
    _.$body.find('.fullLoading').remove();
  };

  this.returnViewFormat = function(){

   if(_.WW < 900){
     return "small_window";
   }
   
   if(_.WW >= 900 && _.WW <= 1100){
     return "medium_window";
   }

   return "desktop";

  }

  // ---

  this.init();

};
