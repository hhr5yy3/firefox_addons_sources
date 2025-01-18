function Pitchshift(fftFrameSize, sampleRate)
{
    function newFilledArray(length, val) {
        var intLength = Math.floor(length)
        var array = []
        for ( var i = 0; i < intLength; i++ ) {
            array[i] = val
        }
        return array
    }
	
    var MAX_FRAME_LENGTH = 8192
	
	var m_FFT = new FFT_(fftFrameSize, sampleRate)
    var m_FFTinv = new FFT_(fftFrameSize, sampleRate)
	var m_HannWindow = []
    var m_Rover = false
    var m_aReal = []
    var m_aImag = []
	
	var m_InFIFO = newFilledArray(MAX_FRAME_LENGTH, 0)
	var m_OutFIFO = newFilledArray(MAX_FRAME_LENGTH, 0)
	var m_FFTworksp = newFilledArray(fftFrameSize, 0)
	var m_LastPhase = newFilledArray(MAX_FRAME_LENGTH / 2 + 1, 0)
	var m_SumPhase = newFilledArray(MAX_FRAME_LENGTH / 2 + 1, 0)
	var m_OutputAccum = newFilledArray(2 * MAX_FRAME_LENGTH, 0)
	var m_AnaFreq = newFilledArray(MAX_FRAME_LENGTH, 0)
	var m_AnaMagn = newFilledArray(MAX_FRAME_LENGTH, 0)
	var m_SynFreq = newFilledArray(MAX_FRAME_LENGTH, 0)
	var m_SynMagn = newFilledArray(MAX_FRAME_LENGTH, 0)

    for ( i = 0; i < fftFrameSize; i++ ) {
        m_HannWindow[i] = WindowFunction.Hann(fftFrameSize, i)
    }

	this.process = function(pitchShift, osamp, indata)
	{
		function setArray(array, length, val) {
			var intLength = Math.floor(length)
			for ( var i = 0; i < intLength; i++ ) {
				array[i] = val
			}
		}

		var aOutput = []
		var fftFrameSize2 = fftFrameSize / 2
		var stepSize = fftFrameSize/osamp
		var freqPerBin = sampleRate / fftFrameSize
		var expct = 2.* Math.PI * stepSize / fftFrameSize
		var inFifoLatency = fftFrameSize - stepSize
		var k = 0
		var magn
		var phase
		var tmp
		var qpd
		var index
		var signal

		if ( m_Rover === false ) {
			m_Rover = inFifoLatency
		}

		for ( i = 0; i < fftFrameSize; i++ )
		{
			m_InFIFO[m_Rover] = indata[i]
			aOutput[i] = m_OutFIFO[m_Rover - inFifoLatency]
			m_Rover++
			
			if ( m_Rover >= fftFrameSize )
			{
				m_Rover = inFifoLatency

				for ( k = 0; k < fftFrameSize; k++ ) {
					m_FFTworksp[k] = m_InFIFO[k] * m_HannWindow[k]
				}
				
				m_FFT.forward(m_FFTworksp)

				for ( k = 0; k <= fftFrameSize2; k++ )
				{
					magn = 2 * Math.sqrt (m_FFT.real[k] * m_FFT.real[k] + m_FFT.imag[k] * m_FFT.imag[k])
					phase = Math.atan2 (m_FFT.imag[k], m_FFT.real[k])

					tmp = phase - m_LastPhase[k]
					m_LastPhase[k] = phase

					tmp -= k * expct

					qpd = tmp / Math.PI
					if ( qpd >= 0 ) {
						qpd = Math.floor(qpd)
						qpd += qpd & 1
					} else {
						qpd = Math.ceil(qpd)
						qpd -= qpd & 1
					}
					tmp -= Math.PI * qpd

					tmp = osamp * tmp /(2 * Math.PI)

					tmp =  k * freqPerBin + tmp * freqPerBin

					m_AnaMagn[k] = magn
					m_AnaFreq[k] = tmp
				}
				
				setArray(m_SynMagn, fftFrameSize, 0)
				setArray(m_SynFreq, fftFrameSize, 0)
				
				for ( k = 0; k <= fftFrameSize2; k++ ) {
					index = Math.floor(k * pitchShift)
					if ( index <= fftFrameSize2 ) {
						m_SynMagn[index] += m_AnaMagn[k]
						m_SynFreq[index] = m_AnaFreq[k] * pitchShift
					}
				}

				for ( k = 0; k <= fftFrameSize2; k++ )
				{
					magn = m_SynMagn[k]
					tmp = m_SynFreq[k]

					tmp -= k * freqPerBin

					tmp /= freqPerBin

					tmp = 2.* Math.PI * tmp / osamp

					tmp += k * expct

					m_SumPhase[k] += tmp
					phase = m_SumPhase[k]

					m_aReal[k] = magn* Math.cos(phase)
					m_aImag[k] = magn* Math.sin(phase)
				}

				for ( k = ((fftFrameSize2)+1); (k < fftFrameSize); k++ ) {
					m_aReal[k] = 0
					m_aImag[k] = 0
				}
				
				signal = m_FFTinv.inverse(m_aReal, m_aImag)

				for ( k = 0; k < fftFrameSize; k++ ) {
					m_OutputAccum[k] += m_HannWindow[k] * signal[k]
				}

				for ( k = 0; k < stepSize; k++ ) {
					m_OutFIFO[k] = m_OutputAccum[k]
				}

				var tempArray = m_OutputAccum.slice (stepSize, stepSize + fftFrameSize)
				for ( k = 0; k < fftFrameSize; k++ ) {
					m_OutputAccum[k] = tempArray[k]
				}

				for ( k = 0; k < inFifoLatency; k++ ) {
					m_InFIFO[k] = m_InFIFO[k + stepSize]
				}				
			}
		}
		
		return aOutput
	}
}