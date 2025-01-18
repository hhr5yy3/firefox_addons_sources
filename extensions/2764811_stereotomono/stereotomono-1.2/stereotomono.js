"use strict";

chrome.runtime.onMessage.addListener(function (request, sender, response) {
  if (request.command === "extensionButtonClicked") {
    monoToStereo.setIsMonoFlag(!monoToStereo.getIsMonoFlag());
    monoToStereo.main();
    response({
      "isMono": monoToStereo.getIsMonoFlag(),
      "isNoSourceFound": monoToStereo.returnIsNoSourceFoundFlag(),
    });
  } else if (request.command === "onUpdatedComplete") {
    if (request.isPermanentMono === true) {
      installListenersToAllAudioVideoElements();
      monoToStereo.setIsMonoFlag(true);
      monoToStereo.main();
    }
    if (request.isPermanentMono === false) {
      monoToStereo.setIsMonoFlag(false);
      monoToStereo.main();
    }
    response({
      "isMono": monoToStereo.getIsMonoFlag(),
      "isNoSourceFound": monoToStereo.returnIsNoSourceFoundFlag()
    });
  }
});

var monoToStereo = (function () {
  var audioCtx,
    currentSource,
    currentlyPlayingElement,
    htmlElement,

    inNode,
    outNode,
    mixInNode,
    mixOutNode,
    routeMerge,
    routeSplit,
    routeGain,

    IsMonoFlag = false,
    IsNoSourceFound = true,
    lastActiveElement,
    initDone = false,
    htmlElementsMap = new Map();

  var main = function () {
    initialization();

    currentlyPlayingElement = returnCurrentlyPlayingElement();

    IsNoSourceFound = typeof htmlElement === "undefined" ? true : false;

    if (initDone && htmlElement !== currentlyPlayingElement) {
      if (!currentlyPlayingElement) {
        return;
      }
      htmlElement = returnCurrentlyPlayingElement();
      currentSource = returnCorrespondingAudioSource(htmlElement);
    }

    if (IsMonoFlag && !IsNoSourceFound) {
      inNode.disconnect(outNode);
      inNode.connect(mixInNode);
    }
    else if (!IsMonoFlag && !IsNoSourceFound) {
      inNode.disconnect(mixInNode);
      inNode.connect(outNode);
    }
  }

  var initialization = function () {
    if (!initDone) {

      htmlElement = returnCurrentlyPlayingElement();
      if (typeof htmlElement === "undefined") {
        monoToStereo.IsNoSourceFound = true;
        initDone = false;
        return;
      } else {
        monoToStereo.IsNoSourceFound = false;
        if (typeof audioCtx === "undefined") {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        //CREATE NODES
        currentSource = returnCorrespondingAudioSource(htmlElement);

        inNode = audioCtx.createGain();
        outNode = audioCtx.createGain();
        mixInNode = audioCtx.createGain();
        mixOutNode = audioCtx.createGain();
        routeSplit = audioCtx.createChannelSplitter(2);
        routeMerge = audioCtx.createChannelMerger(2);
        routeGain = audioCtx.createGain();

        routeGain.gain.value = 0.5;

        //SIGNAL CHAIN
        currentSource.connect(inNode);
        outNode.connect(audioCtx.destination);

        inNode.connect(outNode); // only because later switch needs to disconnect it
        mixOutNode.connect(outNode);

        //LPF ROUTE      
        mixInNode
          .connect(routeGain)
          .connect(routeSplit);

        routeSplit.connect(routeMerge, 0, 0);
        routeSplit.connect(routeMerge, 0, 1);
        routeSplit.connect(routeMerge, 1, 0);
        routeSplit.connect(routeMerge, 1, 1);
        routeMerge.connect(mixOutNode);

        initDone = true;
      }
    }
  }

  var returnCorrespondingAudioSource = function (htmlElement) {
    if (!htmlElementsMap.has(htmlElement) && typeof htmlElement !== 'undefined') {
      htmlElementsMap.set(htmlElement, audioCtx.createMediaElementSource(htmlElement));
      return htmlElementsMap.get(htmlElement);
    }
    else if (htmlElementsMap.has(htmlElement) && typeof htmlElement !== 'undefined') {
      return htmlElementsMap.get(htmlElement);
    }
  }

  var returnCurrentlyPlayingElement = function () {
    var element;
    var elements = document.querySelectorAll("video,audio");
    if (typeof lastActiveElement === 'undefined') {
      element = elements[0];
    } else {
      element = lastActiveElement;
    }
    for (var e in Object.getOwnPropertyNames(elements)) {
      if (!elements[e].paused) {
        element = elements[e];
        return element;
      }
    }
    return element;
  };

  var isInitDone = function () {
    return initDone;
  };

  var getIsMonoFlag = function () {
    return IsMonoFlag;
  };

  var setIsMonoFlag = function (flag) {
    IsMonoFlag = flag;
  };

  var returnIsNoSourceFoundFlag = function () {
    return IsNoSourceFound;
  };

  return {
    main: main,
    initialization: initialization,
    isInitDone: isInitDone,
    getIsMonoFlag: getIsMonoFlag,
    setIsMonoFlag: setIsMonoFlag,
    returnIsNoSourceFoundFlag: returnIsNoSourceFoundFlag
  }
})()

function installListenersToAllAudioVideoElements() {
  var elements = Array.from(document.querySelectorAll("video,audio"));
  for (var e of elements) {
    e.addEventListener("loadedmetadata", function (el) {
    });
  }
}