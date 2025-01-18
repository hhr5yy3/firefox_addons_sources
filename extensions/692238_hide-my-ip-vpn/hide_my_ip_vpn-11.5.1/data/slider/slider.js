var frame_width = jQuery('.frame-wrap:first-child').outerWidth();

jQuery('.slider .left').unbind('click').bind('click', function(e) {
  jQuery('.frame-wrap img:last-child')
    .css('margin-left', '-'+frame_width+'px')
    .prependTo('.frame-wrap')
    .animate({marginLeft: '0px'}, 'medium', function() {
      jQuery('.pagination-wrap li:first-child').appendTo('.pagination-wrap');
    });
})

jQuery('.slider .right, .frame-wrap').unbind('click').bind('click', function(e) {
  var first_frame = jQuery('.frame-wrap img:first-child').animate({marginLeft: '-'+frame_width+'px'}, 'medium', function() {
    first_frame.css('margin-left', '').appendTo('.frame-wrap');
    jQuery('.pagination-wrap li:last-child').prependTo('.pagination-wrap');
  });
})