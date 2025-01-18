function AudioProcessor(getSource, getByteFrequencyData, getByteTimeDomainData)
{
	var m_isSupported = false
	var m_Source = 0
	var m_ScriptProcessor = 0
	var m_FFTSize = 512
	var m_DataArray = 0
	var m_DataArrayLength = 0
	var m_Filter = ""
	var m_ConvolverEffect = ""
	var m_isCompressorEnabled = false
	var m_isRingModulationEnabled = false
	var m_RingModulation = 0
	var m_PitchShifterGrainSize = 512
	var m_PitchShifterShiftRatio = 0.77
	var m_PitchShifterOverLap = 0.50
	var m_isPitchShifterEnabled = false
	var m_isPitchShifterSMBEnabled = false
	
//async function addWorklet(callback)
//{
//	await m_AudioContext.audioWorklet.addModule("scripts/audioprocessor.worklet.js").then(() => {
//		callback()
//	})
//}
	
	var audioAvailable = function() {
		if ( getByteFrequencyData ) {
			m_Analyser.getByteFrequencyData(m_DataArray)
			getByteFrequencyData(m_DataArray, m_DataArrayLength)
		}
		if ( getByteTimeDomainData ) {
			m_Analyser.getByteTimeDomainData(m_DataArray)
			getByteTimeDomainData(m_DataArray, m_DataArrayLength)
		}
	}
	
	this.isSuported = function() {
		return m_isSupported
	}
	
	var connect = function()
	{
		if ( m_ScriptProcessor != 0 ) {
			m_ScriptProcessor.disconnect()
		}
		
/*m_ScriptProcessor = new AudioWorkletNode(m_AudioContext, "onaudioprocess")
m_ScriptProcessor.port.onmessage = (event) => {
	if ( event.data == "onaudioprocess" )
	{
		audioAvailable()
	}
}*/
		m_ScriptProcessor = m_AudioContext.createScriptProcessor(2048)
		m_ScriptProcessor.onaudioprocess = audioAvailable
		m_ScriptProcessor.connect(m_AudioContext.destination)
		
		m_Analyser.fftSize = m_FFTSize
		m_DataArrayLength = m_Analyser.frequencyBinCount
		m_DataArray = new Uint8Array(m_DataArrayLength)
		
		m_Source.connect(m_MicGain)
		if ( m_MediaStreamDestination ) {
			m_MicGain.connect(m_MediaStreamDestination)
		}
		m_MicGain.connect(m_Analyser)
		m_Analyser.connect(m_SpeakerGain)
		m_SpeakerGain.connect(m_AudioContext.destination)
		
		if ( getSource ) {
			getSource(m_MicGain)
		}
	}
	
	var ringModulation = function () {
        var carrier = m_AudioContext.createOscillator()
        carrier.type = "sine"
        carrier.frequency.value = 40
        carrier.detune.value = 600
        var ngHigpass = m_AudioContext.createBiquadFilter()
        ngHigpass.type = "highpass"
        ngHigpass.frequency.value = 10
        var gain = m_AudioContext.createGain()
        gain.gain.value = 1
        carrier.connect(ngHigpass)
        ngHigpass.connect(gain.gain)
		carrier.start()
        return gain
    }
	
	var hannWindow = function (length) {
		var window = new Float32Array(length)
		for ( var i = 0; i < length; i++ ) {
			window[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)))
		}
		return window
	}
	
	var linearInterpolation = function (a, b, t) {
		return a + (b - a) * t
	}
	
	var onPitchShifter = function(event)
	{
		var input = event.inputBuffer.getChannelData(0)
		output = event.outputBuffer.getChannelData(0), ln = input.length

		for ( i = 0; i < ln; i++ ) {
			input[i] *= this.grainWindow[i]
			this.buffer[i] = this.buffer[i + m_PitchShifterGrainSize]
			this.buffer[i + m_PitchShifterGrainSize] = 0.0
		}

		var grainData = new Float32Array(m_PitchShifterGrainSize * 2)
		for ( var i = 0, j = 0.0; i < m_PitchShifterGrainSize; i++, j += m_PitchShifterShiftRatio ) {
			var index = Math.floor(j) % m_PitchShifterGrainSize
			var a = input[index]
			var b = input[(index + 1) % m_PitchShifterGrainSize]
			grainData[i] += linearInterpolation(a, b, j % 1.0) * this.grainWindow[i]
		}

		for ( i = 0; i < m_PitchShifterGrainSize; i += Math.round(m_PitchShifterGrainSize * (1 - m_PitchShifterOverLap)) ) {
			for (j = 0; j <= m_PitchShifterGrainSize; j++) {
				this.buffer[i + j] += grainData[j]
			}
		}

		for ( i = 0; i < m_PitchShifterGrainSize; i++ ) {
			output[i] = this.buffer[i]
		}
	}
	
	var onPitchShifterSMB = function(event)
	{
		var input = event.inputBuffer.getChannelData(0)
		var output = event.outputBuffer.getChannelData(0)
		
		var aShiftedData = m_PitchShiftSMB.process(m_PitchShifterShiftRatio, 4, input)
		
		for ( i = 0; i < input.length; i++ ) {
			output[i] = aShiftedData[i]
		}
	}
	
	var updateConnections = function()
	{
		m_Source.disconnect()
		m_Convolver.disconnect()
		m_Compressor.disconnect()
		m_BiquadFilter.disconnect()
		if ( m_RingModulation ) {
			m_RingModulation.disconnect()
			m_RingModulation = 0
		}
		m_PitchShifter.disconnect()
		m_PitchShifterSMB.disconnect()

		var output = m_Source

		if ( m_ConvolverEffect ) {
			output.connect(m_Convolver)
			output = m_Convolver
		}
		if ( m_isCompressorEnabled ) {
			output.connect(m_Compressor)
			output = m_Compressor
		}
		if ( m_isRingModulationEnabled ) {
			m_RingModulation = ringModulation()
			output.connect(m_RingModulation)
			output = m_RingModulation
		}
		if ( m_isPitchShifterEnabled ) {
			output.connect(m_PitchShifter)
			output = m_PitchShifter
		}
		if ( m_isPitchShifterSMBEnabled ) {
			output.connect(m_PitchShifterSMB)
			output = m_PitchShifterSMB
		}
		if ( m_Filter ) {
			output.connect(m_BiquadFilter)
			output = m_BiquadFilter
		}
		
		output.connect(m_MicGain)
	}
	
	this.connectMediaElementSource = function(source) {
		if ( m_isSupported ) {
			if ( !m_Source ) {
				m_Source = m_AudioContext.createMediaElementSource(source)
				connect()
			}
		}
	}
	
	this.connectMediaStreamSource = function(source) {
		if ( m_isSupported ) {
			if ( !m_Source ) {
				m_Source = m_AudioContext.createMediaStreamSource(source)
				connect()
			}
		}
	}
	
	this.setFFTSize = function(size) {
		if ( m_isSupported ) {
			m_FFTSize = size
		}
	}
	
	this.toggleMuteMic = function() {
		if ( m_isSupported ) {
			if ( m_MicGain.gain.value ) {
				m_MicGain.gain.value = 0
			} else {
				m_MicGain.gain.value = 1
			}
		}
	}
	
	this.toggleMuteSpeaker = function() {
		if ( m_isSupported ) {
			if ( m_SpeakerGain.gain.value ) {
				m_SpeakerGain.gain.value = 0
			} else {
				m_SpeakerGain.gain.value = 1
			}
		}
	}
	
	this.applyFilter = function(type)
	{
		if ( m_isSupported )
		{
			var filters = {lowpass: {frequency: 400, Q: 1},
						   highpass: {frequency: 3000, Q: 1},
						   bandpass: {frequency: 1500, Q: 5},
						   lowshelf: {frequency: 20, gain: 0},
						   highshelf: {frequency: 20, gain: 0},
						   peaking: {frequency: 20, Q: 1, gain: 0},
						   notch: {frequency: 20, Q: 1},
						   allpass: {frequency: 20000, Q: 1}}
			
			if ( type ) {
				m_BiquadFilter.type = type
				m_BiquadFilter.frequency.value = filters[type].frequency
				if ( type != "lowshelf" && type != "highshelf" ) {
					m_BiquadFilter.Q.value = filters[type].Q
				}
				if ( type == "lowshelf" || type == "highshelf" || type == "peaking" ) {
					m_BiquadFilter.gain.value = filters[type].gain
				}
			}
			
			m_Filter = type
			
			updateConnections()
		}
	}
	
	this.setFilterFrequency = function(value) {
		if ( m_isSupported ) {
			m_BiquadFilter.frequency.value = value
		}
	}
	
	this.setFilterQ = function(value) {
		if ( m_isSupported ) {
			m_BiquadFilter.Q.value = value
		}
	}
	
	this.setFilterGain = function(value) {
		if ( m_isSupported ) {
			m_BiquadFilter.gain.value = value
		}
	}
	
	this.applyConvolver = function(effect)
	{
		if ( m_isSupported )
		{
			var aAffects = {car_radio: {file: '../../audio/impulse_response/car_radio.wav'},
							factory_hall: {file: '../../audio/impulse_response/factory_hall.wav'},
							pa_horn_in_hall: {file: '../../audio/impulse_response/pa_horn_in_hall.wav'},
							koli_summer_site1_4way_bformat: {file: '../../audio/impulse_response/koli_summer_site1_4way_bformat.wav'},
							purnode_tunnel_balloon: {file: '../../audio/impulse_response/ir_purnode_tunnel_balloon_48k.wav'},
							multi_swey_delay: {file: '../../audio/impulse_response/multi_swey_delay.wav'},
							beatbox_explosion: {file: '../../audio/impulse_response/beatbox_explosion.wav'},
							rollo_longer_smoother: {file: '../../audio/impulse_response/rollo_longer_smoother.wav'},
							large_long_echo_hall: {file: '../../audio/impulse_response/large_long_echo_hall.wav'}}
			
			if ( effect ) {
				var request = new XMLHttpRequest()
				request.open('GET', aAffects[effect].file, true)
				request.responseType = 'arraybuffer'
				request.onload = function() {
					m_AudioContext.decodeAudioData(request.response, function(buffer) {
						if ( !buffer ){
							return
						}
						m_Convolver.buffer = buffer
					}, function(error){return})
				}
				request.send()
			}
			
			m_ConvolverEffect = effect
			
			updateConnections()
		}
	}
	
	this.applyCompressor = function(f) {
		if ( m_isSupported ) {
			m_isCompressorEnabled = f
			updateConnections()
		}
	}
	
	this.setCompressorRatio = function(value) {
		if ( m_isSupported ) {
			m_Compressor.ratio.value = value
		}
	}
	
	this.setCompressorThreshold = function(value) {
		if ( m_isSupported ) {
			m_Compressor.threshold.value = value
		}
	}
	
	this.applyRingModulation = function(f) {
		if ( m_isSupported ) {
			m_isRingModulationEnabled = f
			updateConnections()
		}
	}
	
	this.applyPitchShifter = function(f) {
		if ( m_isSupported ) {
			m_isPitchShifterEnabled = f
			updateConnections()
		}
	}
	
	this.setPitchShifterRatio = function(value) {
		if ( m_isSupported ) {
			m_PitchShifterShiftRatio = value
		}
	}
	
	this.setPitchShifterOverlap = function(value) {
		if ( m_isSupported ) {
			m_PitchShifterOverLap = value
		}
	}
	
	this.applyPitchShifterSMB = function(f) {
		if ( m_isSupported ) {
			m_isPitchShifterSMBEnabled = f
			updateConnections()
		}
	}
	
	this.getStream = function() {
		if ( m_isSupported && m_MediaStreamDestination ) {
			return m_MediaStreamDestination.stream.getAudioTracks()[0]
		}
	}
	
	m_isSupported = 'AudioContext' in window
	
	if ( m_isSupported )
	{
		var m_AudioContext = new AudioContext
		var m_MicGain = m_AudioContext.createGain()
		var m_Analyser = m_AudioContext.createAnalyser()
		var m_SpeakerGain = m_AudioContext.createGain()
		var m_BiquadFilter = m_AudioContext.createBiquadFilter()
		var m_Convolver = m_AudioContext.createConvolver()
		var m_Compressor = m_AudioContext.createDynamicsCompressor()
		if ( m_AudioContext.createMediaStreamDestination ) {
			var m_MediaStreamDestination = m_AudioContext.createMediaStreamDestination()
		}
		
//addWorklet(function()
//{
//	;
//})

		var m_PitchShifter = m_AudioContext.createScriptProcessor(m_PitchShifterGrainSize, 1, 1)
		m_PitchShifter.grainWindow = hannWindow(m_PitchShifterGrainSize)
		m_PitchShifter.buffer = new Float32Array(m_PitchShifterGrainSize * 2)
		m_PitchShifter.onaudioprocess = onPitchShifter
		
		var m_PitchShifterSMB = m_AudioContext.createScriptProcessor(2048, 1, 1)
		var m_PitchShiftSMB = new Pitchshift(2048, m_AudioContext.sampleRate)
		m_PitchShifterSMB.onaudioprocess = onPitchShifterSMB
	}
}
