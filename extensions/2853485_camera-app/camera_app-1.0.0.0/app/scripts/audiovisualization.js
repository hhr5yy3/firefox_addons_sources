function AudioVisualization(display1, display2)
{
	var nVisualizationsNumber = 2
	var nVisualization = 0
	var m_Gradient
	
	var m_Canvas = document.createElement("CANVAS")	
	var m_CanvasCtx = m_Canvas.getContext("2d")
	//m_Canvas.style.position = "absolute"
	m_Canvas.style.background = "#000000"
	
	var m_Canvas2 = document.createElement("CANVAS")	
	var m_CanvasCtx2 = m_Canvas2.getContext("2d")
	//m_Canvas2.style.position = "absolute"
	m_Canvas2.style.background = "#000000"
	
	this.connect = function() {
		if ( display1 ) {
			display1.innerHTML = ""
			display1.appendChild(m_Canvas)
		}
		if ( display2 ) {
			display2.innerHTML = ""
			display2.appendChild(m_Canvas2)
		}
		this.setSize()
	}
	
	this.setSize = function() {
		if ( display1 ) {
			m_Canvas.width = display1.offsetWidth
			m_Canvas.height = display1.offsetHeight
		}
		if ( display2 ) {
			m_Canvas2.width = display2.offsetWidth
			m_Canvas2.height = display2.offsetHeight
		}
		m_Gradient = m_CanvasCtx.createLinearGradient(0, 0, 0, display1.offsetHeight)
		m_Gradient.addColorStop(1,'#000000')
		m_Gradient.addColorStop(0.65,'#00FF00')
		m_Gradient.addColorStop(0.35,'#FFFF00')
		m_Gradient.addColorStop(0,'#FF0000')
	}
	
	this.setView = function(n) {
		nVisualization = n
	}
	
	this.nextView = function() {
		if ( nVisualization < (nVisualizationsNumber-1) ) {
			nVisualization++
		} else {
			nVisualization = 0
		}
	}
	
	this.showFrequencyBars = function(data, bufferLength)
	{
		m_CanvasCtx.clearRect(0, 0, m_Canvas.width, m_Canvas.height)
		m_CanvasCtx.fillStyle = m_Gradient
		
		var barWidth = (m_Canvas.width / bufferLength) * 2.5
		var barHeight
		var x = 0
		
		for ( var i = 0; i < bufferLength; i++ ) {
			barHeight = data[i]
			m_CanvasCtx.fillRect(x, m_Canvas.height-barHeight/2, barWidth, barHeight/2)
			x += barWidth + 1
		}
	}
	
	this.showSinewave = function(data, bufferLength)
	{
		var canvas = 0
		
		if ( display2 ) {
			canvas = m_Canvas2
			canvasCtx = m_CanvasCtx2
		} else if ( display1 && nVisualization == 1 ) {
			canvas = m_Canvas
			canvasCtx = m_CanvasCtx
		}
		
		if ( canvas )
		{
			canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
			
			canvasCtx.fillStyle = 'rgb(0, 0, 0)'
			canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
			
			canvasCtx.lineWidth = 2
			canvasCtx.strokeStyle = "#00FF00"

			canvasCtx.beginPath()
			
			var sliceWidth = canvas.width * 1.0 / bufferLength
			var x = 0
		  
			for ( var i = 0; i < bufferLength; i++ )
			{
				var v = data[i] / 128.0
				var y = v * canvas.height/2

				if (i === 0) {
				  canvasCtx.moveTo(x, y)
				} else {
				  canvasCtx.lineTo(x, y)
				}

				x += sliceWidth
			}
			
			canvasCtx.lineTo(canvas.width, canvas.height/2)
			canvasCtx.stroke()
		}
	}
}