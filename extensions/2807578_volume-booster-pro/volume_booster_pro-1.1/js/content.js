let gain_node;

const createGainNodeFromAudioContext = (mediaStream) => {
  const audioContext = new AudioContext();
  const mediaElementAudioSourceNode =
    audioContext.createMediaElementSource(mediaStream);
  const node = audioContext.createGain();

  node.gain.value = 1;
  mediaElementAudioSourceNode.connect(node);
  node.connect(audioContext.destination);

  return node;
};

const setup = () => {
  const mediaStream = document.querySelector('video');
  const mediaAudioStream = document.querySelector('audio');

  if (!mediaStream && !mediaAudioStream) {
    return null;
  }

  if (mediaStream) return createGainNodeFromAudioContext(mediaStream);
  else return createGainNodeFromAudioContext(mediaAudioStream);
};

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.id == 1) {
    gain_node = gain_node || setup();

    if (gain_node == null) {
      sendResponse('No MediaStream');
      return;
    }

    gain_node.gain.value = Number(request.message);
    sendResponse('ok');
  } else if (request.id == 2) {
    sendResponse(gain_node.gain.value);
  }
});
