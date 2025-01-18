jQuery.fn.gsSimpleScrollbar = function(options) {
  var CalculateMove = function (event, options) {
    if (options.type == 'horizontal') {
      var sliderPosition = event.pageX - options.element.offset().left - options.offset;
    } else {
      var sliderPosition = event.pageY - options.element.offset().top - options.offset;
    }
    SetPositionOption(options, sliderPosition);
  }

  var MouseIsMoving = function (options) {
    return function(event) {
      if (options.offset === null)
        options.offset = (options.type == 'horizontal') ?
          event.pageX - options.slider.offset().left : event.pageY - options.slider.offset().top;

      CalculateMove(event, options);
      MoveSlider(options, false);

      if ('onChange' in options)
        options.onChange(options.progress, false);
    }
  }

  var MouseIsStopping = function (options) {
    return function(event) {
      if (options['isOver']) {
        if (options.offset === null)
          options.offset = (options.type == 'horizontal') ?
            Math.round(options.slider.outerWidth()/2) : Math.round(options.slider.outerHeight()/2);

        CalculateMove(event, options);
        MoveSlider(options, true);

        options.offset = null;
      }

      jQuery(document).unbind('mousemove');
      if (options['isOver'])
        if ('onFinish' in options)
          options.onFinish(options.progress, false);
    }
  }

  var MoveSlider = function(options, withAnimation) {
    var propertyName = (options.type == 'horizontal') ? 'left' : 'top';
    if (withAnimation) {
      var animation = {}; animation[propertyName] = options.position + 'px';
      options.slider.not(':animated').animate(animation, 'medium');
    } else {
      options.slider.css(propertyName, options.position + 'px');
    }
  }

  var GetSliderMaxPosition = function(options) {
    if (options.type == 'horizontal') {
      var sliderMaxPosition = options.element.innerWidth() - options.slider.outerWidth();
    } else {
      var sliderMaxPosition = options.element.innerHeight() - options.slider.outerHeight();
    }
    return sliderMaxPosition;
  }

  var SetPositionOption = function(options, position) {
    var sliderMaxPosition = GetSliderMaxPosition(options);
    var positionStep = options.step * sliderMaxPosition / (options.max - options.min);

    position = Math.max(position, 0);
    position = Math.min(position, sliderMaxPosition);
    position = Math.floor(position / positionStep) * positionStep + Math.round((position % options.step) / positionStep) * positionStep;
    options.position = position;

    var progress = options.min + (((options.max - options.min) * options.position) / sliderMaxPosition);
    options.progress = progress;
  }

  var SetProgressOption = function(options, progress) {
    var sliderMaxPosition = GetSliderMaxPosition(options);

    progress = Math.max(progress, 0);
    progress = Math.min(progress, options.max);
    progress = Math.floor(progress / options.step) * options.step + Math.round((progress % options.step) / options.step) * options.step;
    options.progress = progress;

    var position = ((options.progress - options.min) * sliderMaxPosition) / (options.max - options.min);
    options.position = position;
  }

  var result = this.each(function() {
    var sliderElement = $(this);
    options.min = ('min' in options) ? options.min : 0;
    options.max = ('max' in options) ? options.max : 100;
    options.step = ('step' in options) ? options.step : 1;
    options.type = ('type' in options) ? options.type : 'horizontal';

    options.progress = options.min;
    options.offset = null; // mouse position when drag started
    options.element = $(this);
    options.slider = options.element.find('.slider');
    options.isOver = false;

    options.element.mouseenter(function(event) {
      options.isOver = true;
    });
    options.element.mouseleave(function(event) {
      options.isOver = false;
    });
    options.slider.mousedown(function(event) {
      jQuery(document).mousemove(MouseIsMoving(options));
    });
    jQuery(document).mouseup(MouseIsStopping(options));
  })

  result.SetProgress = function(progress, withAnimation) {
    SetProgressOption(options, progress);
    MoveSlider(options, withAnimation);
  }

  result.GetProgress = function() {
    return options.progress;
  }

  return result;
}