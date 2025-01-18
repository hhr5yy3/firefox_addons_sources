(function youtube() {
  let prefs = {};
  let lastUrl;
  let playbackAuthorized = true;

  const videos = new Set();
  const userInputEvents = ['keyup', 'mouseup', 'touchend'];

  function stopVideo(video) {
    if (prefs.disableAutoplay) {
      if (prefs.disablePreload) {
        try {
          video.parentElement.parentElement.stopVideo();
        } catch (e) {
          //
        }
      } else {
        try {
          video.parentElement.parentElement.pauseVideo();
        } catch (e) {
          //
        }
      }
    }
  }

  function userInputCallback(e) {
    if (e.type === 'keyup' && e.keyCode !== 13 && e.keyCode !== 32) {
      return;
    }
    playbackAuthorized = true;
    lastUrl = window.location.href;
    for (const event of userInputEvents) {
      window.removeEventListener(event, userInputCallback, true);
    }
  }

  function addUserInputListeners() {
    for (const event of userInputEvents) {
      window.addEventListener(event, userInputCallback, true);
    }
  }

  function onVideoLoadStart(event) {
    if (!(event.target instanceof HTMLMediaElement)) {
      return;
    }
    if (!videos.has(event.target)) {
      videos.add(event.target);
      const ytapi = event.target.parentElement.parentElement;
      const originalPlayVideo = ytapi.playVideo;
      ytapi.playVideo = () => {
        originalPlayVideo();
        if (!playbackAuthorized) {
          stopVideo(event.target);
        }
      };
    }
    if (prefs.disableAutoplay && !playbackAuthorized) {
      stopVideo(event.target);
    } else if (prefs.disableAutoplay && playbackAuthorized && window.location.href !== lastUrl) {
      playbackAuthorized = false;
      stopVideo(event.target);
      lastUrl = window.location.href;
      addUserInputListeners();
    }
  }

  function init(data) {
    prefs = data.prefs;
    if (!window.location.pathname.startsWith('/embed/')
    || new URLSearchParams(window.location.search).get('mute') === '1') {
      window.addEventListener('loadstart', onVideoLoadStart, true);
    }
  }

  window.addEventListener('message', (event) => {
    if (event.source !== window) {
      return;
    }

    switch (event.data.msg) {
      case 'dh5a:init': init(event.data); break;
      case 'dh5a:domain-prefs-changed': prefs[event.data.prefName] = event.data.value; break;
      default:
    }
  });

  postMessage({ msg: 'dh5a:script-injected' }, '*');
}());
