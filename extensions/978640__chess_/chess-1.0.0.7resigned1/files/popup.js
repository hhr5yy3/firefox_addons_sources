
let canvas = document.querySelector(".screen");
let ctx = canvas.getContext("2d");

let Storage = {
    setValue : (key, value) => { localStorage[key] = JSON.stringify(value); },
    getValue : (key) => {
        let result = undefined;
        try {
            if (localStorage[key]) result = JSON.parse(localStorage[key]);
        } catch (e) {
            throw new StorageError(`Error in localStorage[${key}] value. ${localStorage[key]}`);
        }
        return result; 
    }
};

let port = chrome.runtime.connect();

port.onMessage.addListener((msg) => {
	if (msg === 'save') {
		Storage.setValue('save', nes.toJSON());
	}
});
/**
 * StorageError
 * @param   string      _msg    Error message    
 */
class StorageError extends Error {
    constructor(_msg){
        super();
        this.name = 'StorageError';
        this.message = _msg || 'Storage Error';
        this.stack = (new Error()).stack;
    }
}

class AudioPlayerNes {
	constructor() {
		this.audioContext = new window.AudioContext;
		this.channels = 2;
		this.frameCount = 1468;
		this.muted = false;
		this.arrayBuffer = []; 	// Stored left channel on even and right channel on odd indexes
	}
	prepareSample(left, right) {
		this.arrayBuffer.push(left);
		this.arrayBuffer.push(right);
	}
	isSamplePrepared() {
		return (this.arrayBuffer.length >= this.frameCount);
	}
	playSample() {
		let audioBuffer = this.audioContext.createBuffer(this.channels, this.frameCount, this.audioContext.sampleRate);

		let leftChannel = audioBuffer.getChannelData(0);
		let rightChannel = audioBuffer.getChannelData(1);
		for (var i = 0, len = Math.min(this.frameCount, this.arrayBuffer.length); i < len; i++) {
			(i%2 === 0) ? leftChannel[i/2] = this.arrayBuffer[i] : rightChannel[(i - 1)/2] = this.arrayBuffer[i];
	    }
		this.arrayBuffer = [];

		let source = this.audioContext.createBufferSource();

		source.buffer = audioBuffer;
		source.connect(this.audioContext.destination);
		!this.muted && source.start();
	}
}

let audioPlayer = new AudioPlayerNes();

const SAVE_TIME_INTERVAL = 2 * 60;
let stiCounter = 0;

let nes = new jsnes.NES({
	onFrame: function(frameBuffer) {
		stiCounter++;
		(stiCounter > SAVE_TIME_INTERVAL) && (port.postMessage('tick'), stiCounter = 0);
		let imgData = ctx.getImageData(0, 0, 256, 240);
		let buf = new ArrayBuffer(imgData.data.length);
	    let buf8 = new Uint8ClampedArray(buf);
	    let buf32 = new Uint32Array(buf);

	    frameBuffer.map((val, idx) => {
	    	buf32[idx] = 0xff000000 | val;
	    })
		imgData.data.set(buf8);
		ctx.putImageData(imgData, 0, 0);
		requestAnimationFrame(nes.frame);
	},
	onAudioSample: function(left, right) {
		if (audioPlayer.isSamplePrepared()) {
			audioPlayer.playSample();
		}
		audioPlayer.prepareSample(left, right);
	}
});

let controller = new jsnes.Controller();

let controlsKey = [new Map(), new Map()];
controlsKey[0].set('Space', jsnes.Controller.BUTTON_A);
controlsKey[0].set('KeyN', jsnes.Controller.BUTTON_B);
controlsKey[0].set('ArrowLeft', jsnes.Controller.BUTTON_LEFT);
controlsKey[0].set('ArrowRight', jsnes.Controller.BUTTON_RIGHT);
controlsKey[0].set('ArrowUp', jsnes.Controller.BUTTON_UP);
controlsKey[0].set('ArrowDown', jsnes.Controller.BUTTON_DOWN);

controlsKey[0].set('Enter', jsnes.Controller.BUTTON_START);
controlsKey[0].set('Tab', jsnes.Controller.BUTTON_SELECT);

controlsKey[1].set('ShiftLeft', jsnes.Controller.BUTTON_A);
controlsKey[1].set('ControlLeft', jsnes.Controller.BUTTON_B);
controlsKey[1].set('KeyA', jsnes.Controller.BUTTON_LEFT);
controlsKey[1].set('KeyD', jsnes.Controller.BUTTON_RIGHT);
controlsKey[1].set('KeyW', jsnes.Controller.BUTTON_UP);
controlsKey[1].set('KeyS', jsnes.Controller.BUTTON_DOWN);

const physicControl = Object.freeze({
	'buttonA': jsnes.Controller.BUTTON_A,
	'buttonB': jsnes.Controller.BUTTON_B,
	'buttonStart': jsnes.Controller.BUTTON_START,
	'buttonSelect': jsnes.Controller.BUTTON_SELECT,
	'buttonLeft': jsnes.Controller.BUTTON_LEFT,
	'buttonRight': jsnes.Controller.BUTTON_RIGHT,
	'buttonDown': jsnes.Controller.BUTTON_DOWN,
	'buttonUp': jsnes.Controller.BUTTON_UP,
});

chrome.storage.sync.get({
    controls: {
	  'player1': {
	    'buttonA': 'Space', 
	    'buttonB': 'KeyN', 
	    'buttonStart': 'Enter', 
	    'buttonSelect': 'Tab', 
	    'buttonLeft': 'ArrowLeft', 
	    'buttonRight': 'ArrowRight', 
	    'buttonDown': 'ArrowDown', 
	    'buttonUp': 'ArrowUp'
	  },
	  'player2': {
	    'buttonA': 'ShiftLeft', 
	    'buttonB': 'ControlLeft', 
	    'buttonStart': 'Enter', 
	    'buttonSelect': 'Tab', 
	    'buttonLeft': 'KeyA', 
	    'buttonRight': 'KeyD', 
	    'buttonDown': 'KeyS', 
	    'buttonUp': 'KeyW'
	  }
	}
  }, 
  (items) => {
  	controlsKey[0].clear();
  	controlsKey[1].clear();
    for (let playerId in items.controls) {
      let pid = playerId === "player1" ? 0 : 1;
      for (let buttonId in items.controls[playerId]) {
      	controlsKey[pid].set(items.controls[playerId][buttonId], physicControl[buttonId]);
      }	
  	}
  }
);

document.addEventListener('DOMContentLoaded', () => {
	try {
		nes.fromJSON(Storage.getValue('save'))
	} catch (e) {
		nes.loadROM(convertedNesRomChess);
	}
	nes.frame();

	document.onkeydown = function(event) {
		var key = event.code;
		controlsKey[0].has(key) && nes.buttonDown(1, controlsKey[0].get(key));
		controlsKey[1].has(key) && nes.buttonDown(2, controlsKey[1].get(key));
	};

	document.onkeyup = function(event) {
		var key = event.code;
		controlsKey[0].has(key) && nes.buttonUp(1, controlsKey[0].get(key));
		controlsKey[1].has(key) && nes.buttonUp(2, controlsKey[1].get(key));
	};
});