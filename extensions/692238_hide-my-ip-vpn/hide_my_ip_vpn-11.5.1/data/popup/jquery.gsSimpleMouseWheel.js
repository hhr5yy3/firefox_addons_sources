jQuery.fn.gsSimpleMouseWheel = function(options) {
  var CalculateDelta = function(event) {
    var delta = 0;
    if (!event) /* For IE. */
      event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
      delta = event.wheelDelta/120;
    } else if (event.detail) { /** Mozilla case. */
      delta = -event.detail/3;
    }
    return delta;
  }

  var MouseWheelHandler = function(event, options) {
    if (!options['isOver']) return false;
    if (options['element'].children(':first').is(':animated')) return false;

    position = CalculateDelta(event) > 0 ? (options.position - options.step) : (options.position + options.step);
    SetPositionOption(options, position);
    MoveContent(options, true);

    if ('onFinish' in options)
      options.onFinish(options.progress, true);
  }

  var SetPositionOption = function(options, position) {
    position = Math.max(position, 0);
    position = Math.min(position, options.maxPosition);
    options.position = position;

    var progress = options.min + ((options.max - options.min) * (options.position * 100 / options.maxPosition) / 100)
    options.progress = progress;
  }

  var SetProgressOption = function(options, progress) {
    progress = Math.max(progress, 0);
    progress = Math.min(progress, options.max);
    options.progress = progress;

    var position = ((options.progress - options.min) * 100 / (options.max - options.min)) * options.maxPosition / 100;
    options.position = position;
  }

  var MoveContent = function(options, withAnimation) {
    if (withAnimation) {
      options.element.children(':first').not(':animated').animate({'margin-top': -1*options.position+'px'}, 'medium');
    } else {
      options.element.children(':first').css('margin-top', -1*options.position+'px');
    }
  }

  var result = this.each(function() {
    options.min = ('min' in options) ? options.min : 0;
    options.max = ('max' in options) ? options.max : 100;
    options.step = ('step' in options) ? options.step : 1;
    options.type = ('type' in options) ? options.type : 'horizontal';

    options.progress = 0;
    options.position = 0;
    options.maxPosition = 0;

    options.element = $(this);
    options.isOver = false;

    options.element.mouseenter(function(event) {
      options.isOver = true;
    });
    options.element.mouseleave(function(event) {
      options.isOver = false;
    })

    window.addEventListener('DOMMouseScroll', function(event) {
      MouseWheelHandler(event, options);
    }, false);
    window.addEventListener('mousewheel', function(event) {
      MouseWheelHandler(event, options);
    }, false);
  })

  result.DomChanged = function() {
    var totalHeight = 0;
    options.element.children().each(function() {
      totalHeight = totalHeight + $(this).outerHeight();
    });
    options.maxPosition = totalHeight - options.element.outerHeight();
  }

  result.SetProgress = function(progress, withAnimation) {
    SetProgressOption(options, progress);
    MoveContent(options, withAnimation);

    if ('onFinish' in options)
      options.onFinish(options.progress, withAnimation);
  }

  result.GetProgress = function() {
    return options.progress;
  }

  return result;
}