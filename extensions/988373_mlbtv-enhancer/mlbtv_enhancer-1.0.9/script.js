(function() {
  var insertControls = function() {
    var video = document.querySelector('video');
    var controlsContainer = document.querySelector('.top-controls-container__left, .mlbtv-media-controls .left');
    var button;

    if (controlsContainer.innerHTML) {
      return;
    }

    // << (-2 min)
    button = document.createElement('button');
    button.classList.add('mlbtv-enhancer__button');
    button.innerHTML = '<img src="' + browser.extension.getURL('images/left-2.svg') + '" />';
    button.addEventListener('click', function() {
      video.currentTime -= 120;
    });
    controlsContainer.appendChild(button);

    // < (-30 sec)
    button = document.createElement('button');
    button.classList.add('mlbtv-enhancer__button');
    button.innerHTML = '<img src="' + browser.extension.getURL('images/left-1.svg') + '" />';
    button.addEventListener('click', function() {
      video.currentTime -= 30;
    });
    controlsContainer.appendChild(button);

    // Copy current timestamp
    var timeInput = document.createElement('input');
    timeInput.value = video.currentTime;
    timeInput.classList.add('mlbtv-enhancer__input');
    video.ontimeupdate = function() {
      if (document.activeElement !== timeInput) {
        timeInput.value = video.currentTime;
      }
    };
    var timeForm = document.createElement('form');
    timeForm.appendChild(timeInput);
    timeForm.addEventListener('submit', function(event) {
      event.preventDefault();
      video.currentTime = timeInput.value
    });
    controlsContainer.appendChild(timeForm);

    // > +30 sec
    button = document.createElement('button');
    button.classList.add('mlbtv-enhancer__button');
    button.innerHTML = '<img src="' + browser.extension.getURL('images/right-1.svg') + '" />';
    button.addEventListener('click', function() {
      video.currentTime += 30;
    });
    controlsContainer.appendChild(button);

    // >> (+2 min)
    button = document.createElement('button');
    button.classList.add('mlbtv-enhancer__button');
    button.innerHTML = '<img src="' + browser.extension.getURL('images/right-2.svg') + '" />';
    button.addEventListener('click', function() {
      video.currentTime += 120;
    });
    controlsContainer.appendChild(button);

    // Adjust playback rate
    var sliderInput = document.createElement('input');
    sliderInput.setAttribute('type', 'range');
    sliderInput.min = 1;
    sliderInput.max = 2;
    sliderInput.step = 0.1;
    sliderInput.classList.add('mlbtv-enhancer__slider');
    var sliderDisplay = document.createElement('span');
    var currentPlaybackRate = Math.round(video.playbackRate * 10) / 10;
    sliderInput.defaultValue = currentPlaybackRate;
    sliderDisplay.innerHTML = Number(currentPlaybackRate).toFixed(1) + 'x';
    sliderInput.addEventListener('change', function() {
      video.playbackRate = sliderInput.value;
      sliderDisplay.innerHTML = Number(sliderInput.value).toFixed(1) + 'x';
    });
    var sliderForm = document.createElement('form');
    sliderForm.classList.add('mlbtv-enhancer__slider-form');
    sliderForm.appendChild(sliderInput);
    sliderForm.appendChild(sliderDisplay);
    controlsContainer.appendChild(sliderForm);
  };

  var playingHandlerOnce = function(event) {
    if (event.target.src && event.target.src.startsWith('blob')) {
      document.removeEventListener('playing', playingHandlerOnce, true);
      insertControls();
      new MutationObserver(insertControls).observe(document.querySelector('.mlbtv-media-controls'), { childList: true });
    }
  };
  document.addEventListener('playing', playingHandlerOnce, true);

  // Keyboard navigation
  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler('previoustrack', function() {
      document.querySelector('video').currentTime -= 30;
    });
    navigator.mediaSession.setActionHandler('nexttrack', function() {
      document.querySelector('video').currentTime += 30;
    });
  }
})();