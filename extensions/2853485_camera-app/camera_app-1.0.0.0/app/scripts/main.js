var m_nMousePointY = 0
var m_fHideMenu = false
var m_nIdle = 0
var g_Video
var g_Canvas
var g_CanvasPhoto
var g_Ctx
var g_CtxPhoto
var m_VideoInterval = 16 // 60 FPS
var m_VideoIntervalID = 0
var m_AudioVisualization = 0
var m_AudioProcessor = 0
var m_fAudioProcessorInitialized = false
var m_ImageSize = ""
var g_fFramingGrid = false
var g_fWatermarkTimestamp = false
var g_PhotoDelay = 0
var g_PhotoCounter = 0
var m_CurrentCameraId = 0
var g_fCameraOn = false
var m_Output = ""
var m_GIFWidth = 0
var m_GIFHeight = 0
var m_GIFKeepProportions = true
var m_GIFInterval = 0.1
var m_GIFFrames = 10
var m_GIFText = ""
var m_MediaRecorder = 0
var m_MediaRecorderChunks = []
var m_idIntervalVideoRecording = 0
var m_Camera = true
var m_Mute = false
var m_fChrome = false
var m_fSafari = false
var m_fiOS = false
var g_videoTrackCurrent = 0
var g_fTrackCapabilitiesSupport = false
var g_fKeepTrackConstrains = false
var g_oConstraintsCurrent = {}
var g_oConstraintsDefault = {}
var g_oConstraintsBasicCurrent = {} // *1
var g_oConstraintsBasicDefault = {} // 
var g_divSettings = 0
var g_divStreamSettingsTorch = 0
var g_divStreamSettingsBrightness = 0
var g_divStreamSettingsColorTemperature = 0
var g_divStreamSettingsContrast = 0
var g_divStreamSettingsEchoCancellation = 0
var g_divStreamSettingsNoiseSuppression = 0
var g_divStreamSettingsExposureCompensation = 0
var g_divStreamSettingsFocusDistance = 0
var g_divStreamSettingsFrameRate = 0
var g_divStreamSettingsISO = 0
var g_divStreamSettingsLatency = 0
var g_divStreamSettingsSampleRate = 0
var g_divStreamSettingsSampleSize = 0
var g_divStreamSettingsSaturation = 0
var g_divStreamSettingsSharpness = 0
var g_divStreamSettingsAspectRatio = 0
var g_divStreamSettingsWidth = 0
var g_divStreamSettingsHeight = 0
var g_divStreamSettingsExposureMode = 0
var g_divStreamSettingsExposureTime = 0
var g_divStreamSettingsWhiteBalanceMode = 0
var g_divStreamSettingsFacingMode = 0
var g_divStreamSettingsFocusMode = 0
var g_divStreamSettingsQuality = 0
var g_divStreamSettingsResizeMode = 0
var g_divZoom = 0
var g_divButtonImageSettings = 0
var g_divImageSettings = 0
var g_inputFramingGrid = 0
var g_inputWatermarkTimestamp = 0
var g_inputBrightness = 0
var g_inputColorTemperature = 0
var g_inputContrast = 0
var g_inputEchoCancellation = 0
var g_inputNoiseSuppression = 0
var g_inputExposureCompensation = 0
var g_inputFocusDistance = 0
var g_inputFrameRate = 0
var g_inputISO = 0
var g_inputLatency = 0
var g_inputSampleRate = 0
var g_inputSampleSize = 0
var g_inputSaturation = 0
var g_inputSharpness = 0
var g_inputZoom = 0
var g_inputAspectRatio = 0
var g_inputWidth = 0
var g_inputHeight = 0
var g_selectQuality = 0
var g_selectResizeMode = 0
var g_selectExposureMode = 0
var g_inputExposureTime = 0
var g_selectWhiteBalanceMode = 0
var g_selectFacingMode = 0
var g_selectFocusMode = 0
var g_spanAspectRatio = 0
var g_spanBrightness = 0
var g_spanColorTemperature = 0
var g_spanContrast = 0
var g_spanExposureCompensation = 0
var g_spanExposureTime = 0
var g_spanFocusDistance = 0
var g_spanFrameRate = 0
var g_spanISO = 0
var g_spanHeight = 0
var g_spanLatency = 0
var g_spanSampleRate = 0
var g_spanSampleSize = 0
var g_spanSaturation = 0
var g_spanSharpness = 0
var g_spanWidth = 0
var g_spanZoom = 0
var g_buttonStreamSettingsDefault = 0

window.onload = function()
{
	localizeHtmlPage()
	
	IdleCounter()
	
	onMouseMove()
	onMouseClick()
	onKey()
	onResize()
	window.addEventListener("touchstart", onTouchStart, false)
	
	m_fChrome = navigator.userAgent.indexOf("Chrome") != -1 || navigator.userAgent.indexOf("CriOS") != -1 || navigator.userAgent.indexOf("CrOS") != -1
	m_fSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
	m_fiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
	
	g_Video = document.querySelector("video")
	g_Canvas = document.querySelector("canvas")
	g_Ctx = g_Canvas.getContext("2d")
	g_CanvasPhoto = document.getElementById("canvas_photo")
	g_CtxPhoto = g_CanvasPhoto.getContext("2d")
	
	if ( (m_fSafari && m_fiOS) || m_fChrome ) {
		g_Video.style.opacity = "0"
		g_Video.style.position = "absolute"
		g_Video.style.display = "block"
	}
	
	g_divSettings = document.getElementById("options")
	
	g_divStreamSettingsTorch = document.getElementById("torch_block")
	
	g_inputFramingGrid = document.getElementById("framing_grid_checkbox")
	
	g_inputWatermarkTimestamp = document.getElementById("watermark_timestamp_checkbox")
	
	g_divZoom = document.getElementById("zoom_block")
	g_inputZoom = document.getElementById("zoom_input")
	g_spanZoom = document.getElementById("zoom_value")
	
	g_divButtonImageSettings = document.getElementById("block_button_advanced_settings")
	g_buttonImageSettings = document.getElementById("button_advanced_settings")
	g_divImageSettings = document.getElementById("advanced_settings_block")
	
	g_divStreamSettingsBrightness = document.getElementById("advanced_settings_brightness")
	g_divStreamSettingsColorTemperature = document.getElementById("advanced_settings_colorTemperature")
	g_divStreamSettingsContrast = document.getElementById("advanced_settings_contrast")
	g_divStreamSettingsEchoCancellation = document.getElementById("advanced_settings_echoCancellation")
	g_divStreamSettingsNoiseSuppression = document.getElementById("advanced_settings_noiseSuppression")
	g_divStreamSettingsExposureCompensation = document.getElementById("advanced_settings_exposureCompensation")
	g_divStreamSettingsFocusDistance = document.getElementById("advanced_settings_focusDistance")
	g_divStreamSettingsFrameRate = document.getElementById("advanced_settings_frameRate")
	g_divStreamSettingsISO = document.getElementById("advanced_settings_iso")
	g_divStreamSettingsLatency = document.getElementById("advanced_settings_latency")
	g_divStreamSettingsSampleRate = document.getElementById("advanced_settings_sampleRate")
	g_divStreamSettingsSampleSize = document.getElementById("advanced_settings_sampleSize")
	g_divStreamSettingsSaturation = document.getElementById("advanced_settings_saturation")
	g_divStreamSettingsSharpness = document.getElementById("advanced_settings_sharpness")
	g_divStreamSettingsAspectRatio = document.getElementById("advanced_settings_aspectRatio")
	g_divStreamSettingsWidth = document.getElementById("advanced_settings_width")
	g_divStreamSettingsHeight = document.getElementById("advanced_settings_height")
	g_divStreamSettingsExposureMode = document.getElementById("advanced_settings_exposureMode")
	g_divStreamSettingsExposureTime = document.getElementById("advanced_settings_exposureTime")
	g_divStreamSettingsWhiteBalanceMode = document.getElementById("advanced_settings_whiteBalanceMode")
	g_divStreamSettingsFacingMode = document.getElementById("advanced_settings_facingMode")
	g_divStreamSettingsFocusMode = document.getElementById("advanced_settings_focusMode")
	g_divStreamSettingsQuality = document.getElementById("advanced_settings_quality")
	g_divStreamSettingsResizeMode = document.getElementById("advanced_settings_resizeMode")
	
	g_inputBrightness = document.getElementById("advanced_settings_brightness_input")
	g_inputColorTemperature = document.getElementById("advanced_settings_colorTemperature_input")
	g_inputContrast = document.getElementById("advanced_settings_contrast_input")
	g_inputEchoCancellation = document.getElementById("advanced_settings_echoCancellation_checkbox")
	g_inputNoiseSuppression = document.getElementById("advanced_settings_noiseSuppression_checkbox")
	g_inputExposureCompensation = document.getElementById("advanced_settings_exposureCompensation_input")
	g_inputFocusDistance = document.getElementById("advanced_settings_focusDistance_input")
	g_inputFrameRate = document.getElementById("advanced_settings_frameRate_input")
	g_inputISO = document.getElementById("advanced_settings_iso_input")
	g_inputLatency = document.getElementById("advanced_settings_latency_input")
	g_inputSampleRate = document.getElementById("advanced_settings_sampleRate_input")
	g_inputSampleSize = document.getElementById("advanced_settings_sampleSize_input")
	g_inputSaturation = document.getElementById("advanced_settings_saturation_input")
	g_inputSharpness = document.getElementById("advanced_settings_sharpness_input")
	g_inputAspectRatio = document.getElementById("advanced_settings_aspectRatio_input")
	g_inputWidth = document.getElementById("advanced_settings_width_input")
	g_inputHeight = document.getElementById("advanced_settings_height_input")
	g_selectQuality = document.getElementById("advanced_settings_quality_select")
	g_selectResizeMode = document.getElementById("advanced_settings_resizeMode_select")
	g_selectExposureMode = document.getElementById("advanced_settings_exposureMode_select")
	g_inputExposureTime = document.getElementById("advanced_settings_exposureTime_input")
	g_selectWhiteBalanceMode = document.getElementById("advanced_settings_whiteBalanceMode_select")
	g_selectFacingMode = document.getElementById("advanced_settings_facingMode_select")
	g_selectFocusMode = document.getElementById("advanced_settings_focusMode_select")
	
	g_spanAspectRatio = document.getElementById("advanced_settings_aspectRatio_value")
	g_spanBrightness = document.getElementById("advanced_settings_brightness_value")
	g_spanColorTemperature = document.getElementById("advanced_settings_colorTemperature_value")
	g_spanContrast = document.getElementById("advanced_settings_contrast_value")
	g_spanExposureCompensation = document.getElementById("advanced_settings_exposureCompensation_value")
	g_spanExposureTime = document.getElementById("advanced_settings_exposureTime_value")
	g_spanFocusDistance = document.getElementById("advanced_settings_focusDistance_value")
	g_spanFrameRate = document.getElementById("advanced_settings_frameRate_value")
	g_spanISO = document.getElementById("advanced_settings_iso_value")
	g_spanHeight = document.getElementById("advanced_settings_height_value")
	g_spanLatency = document.getElementById("advanced_settings_latency_value")
	g_spanSampleRate = document.getElementById("advanced_settings_sampleRate_value")
	g_spanSampleSize = document.getElementById("advanced_settings_sampleSize_value")
	g_spanSaturation = document.getElementById("advanced_settings_saturation_value")
	g_spanSharpness = document.getElementById("advanced_settings_sharpness_value")
	g_spanWidth = document.getElementById("advanced_settings_width_value")
	
	g_buttonStreamSettingsDefault = document.getElementById("advanced_settings_default_button")
	
	g_buttonImageSettings.onclick = onImageSettings
	g_buttonStreamSettingsDefault.onclick = onStreamSettingsDefault
	
	navigator.mediaDevices.getUserMedia({video: m_Camera}).then(CameraCallbackSuccess).catch(CameraCallbackError)
	
	document.getElementById("intro_text").innerHTML = chrome.i18n.getMessage("lngCameraPermission")
	
	if ( typeof MediaRecorder === "undefined" )
	{
		document.getElementById("mute").disabled = true
	}
	
	g_Canvas.width = 0
	g_Canvas.height = 0
	
	m_VideoIntervalID = setInterval(transferVideoToCanvas, m_VideoInterval)
	
	m_AudioVisualization = new AudioVisualization(document.getElementById("display_audio_frequency"), document.getElementById("display_audio_signal"))
	m_AudioVisualization.connect()
	
	document.getElementById("icon_snap").onclick = onSnap
	document.getElementById("back").onclick = onBack
	document.getElementById("icon_settings").onclick = onOptionsShow
	document.getElementById("close_options").onclick = onOptionsClose
	document.getElementById("image_size").onchange = onPreviewSize
	document.getElementById("camera").onchange = onCamera
	g_inputFramingGrid.onchange = onFramingGrid
	g_inputWatermarkTimestamp.onchange = onWatermarkTimestamp
	document.getElementById("photo_delay").onchange = VerifyPhotoDelay
	document.getElementById("photo_delay").onkeydown = onDelayKeyDown
	document.getElementById("output").onchange = onOutput
	document.getElementById("gif_width").oninput = onGIFWidth
	document.getElementById("gif_width").onchange = onGIFWidth
	document.getElementById("gif_height").oninput = onGIFHeight
	document.getElementById("gif_height").onchange = onGIFHeight
	document.getElementById("gif_keep_proportions").onchange = onGIFKeepProportions
	document.getElementById("gif_interval").oninput = onGIFInterval
	document.getElementById("gif_interval").onchange = onGIFInterval
	document.getElementById("gif_frames").oninput = onGIFFrames
	document.getElementById("gif_frames").onchange = onGIFFrames
	document.getElementById("gif_text").oninput = onGIFText
	document.getElementById("gif_text").onchange = onGIFText
	document.getElementById("fullscreen").onclick = onFullScreen
	document.getElementById("mute").onchange = onMute
	document.getElementById("photo_mirror").onclick = onPhotoMirror
}

function onMouseMove() {
	window.onmousemove = function(e) {
		m_nMousePointY = e.clientY
		m_nIdle = 0
	}
}

function onMouseClick() {
	window.onclick = function(e) {		
		m_nIdle = 0
	}
}

function onKey() {
	document.onkeyup = function(e) {
		m_nIdle = 0
	}
}

function onResize(e) {
	window.onresize = function(e) {
		onPreviewSize({target: {value: m_ImageSize}})
	}
}

function onTouchStart() {
	m_nIdle = 0
}

function CameraCallbackSuccess(stream)
{
	showCameras()

	g_videoTrackCurrent = stream.getVideoTracks()[0]
	
	m_CurrentCameraId = g_videoTrackCurrent.label
	
	if ( !window.URL ) window.URL = {}                                                           // temporary for
	if ( !window.URL.createObjectURL ) window.URL.createObjectURL = function(obj) { return obj } // Opera support
	
	try {
		g_Video.src = window.URL.createObjectURL(stream)
	} catch (e) {
		g_Video.srcObject = stream
	}
	
	if ( typeof MediaRecorder !== "undefined" )
	{
		var canvasStream = g_CanvasPhoto.captureStream(25)
		
		if ( typeof MediaStream === "undefined" ) {
			var finalStream = new webkitMediaStream()
		} else {
			var finalStream = new MediaStream()
		}
		finalStream.addTrack(canvasStream.getVideoTracks()[0])
		
		if ( m_Output == "video" && !m_Mute && stream.getAudioTracks().length )
		{
			m_AudioProcessor.connectMediaStreamSource(stream)
			finalStream.addTrack(m_AudioProcessor.getStream())//stream.getAudioTracks()[0]
		}
		
		m_MediaRecorder = new MediaRecorder(finalStream)
		m_MediaRecorder.ondataavailable = onMediaRecorderDataAvailable
		m_MediaRecorder.onstop = onVideoOutput
	}
	
	document.getElementById("intro").style.display = "none"
	
	document.getElementById("image_size").disabled = false
	document.getElementById("image_size").className = ""
	document.getElementById("camera").disabled = false
	document.getElementById("camera").className = ""
	g_inputFramingGrid.disabled = false
	g_inputWatermarkTimestamp.disabled = false
	document.getElementById("photo_delay").disabled = false
	document.getElementById("photo_delay").className = ""
	document.getElementById("output").disabled = false
	document.getElementById("output").className = ""
	
	g_fCameraOn = true
	
	g_Canvas.width = 0
	g_Canvas.height = 0
	
	//
	
	if ( g_fKeepTrackConstrains )
	{
		g_fKeepTrackConstrains = false
		g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	}
	else
	{
		getCapabilitiesAndSettings(g_videoTrackCurrent)
	}
}

function CameraCallbackError(error)
{
	error = error.name || error.message || error.code || error
	document.getElementById("intro_text").innerHTML = chrome.i18n.getMessage("lngError") + ": " + error
	
	var cameras = navigator.mediaDevices.enumerateDevices()
	if ( cameras ) {
		cameras.then(CameraDetect)
	}
	
	console.log(error)
}

function CameraDetect(sources)
{
	var cameras = 0
	
	for ( var i = 0; i != sources.length; ++i )
	{
		var source = sources[i]
		if ( source.kind === 'video' )
		{
			cameras++
		}
    }
	
	if ( !cameras )
	{
		document.getElementById("intro_text").innerHTML = chrome.i18n.getMessage("lngNoCamera")
	}
}

function getCapabilitiesAndSettings(track)
{
	// delay required
	// https://issues.chromium.org/issues/41313018
	// https://developer.chrome.com/blog/imagecapture
	// https://www.oberhofer.co/mediastreamtrack-and-its-capabilities/
	
	let timerId = setInterval(
	function()
	{
		g_fTrackCapabilitiesSupport = track.getCapabilities
		
		if ( g_fTrackCapabilitiesSupport )
		{
			const capabilities = track.getCapabilities()
			const settings = track.getSettings()
			
			clearInterval(timerId)
			
			showCapabilitiesAndSettings(capabilities, settings)
		}
	},
	500)
}

function showCapabilitiesAndSettings(capabilities, settings)
{
	//console.log(capabilities)
	//console.log(settings)
	
	//

	g_oConstraintsCurrent = {}
	g_oConstraintsCurrent.advanced = []
	g_oConstraintsDefault = {}
	g_oConstraintsDefault.advanced = []
	
	g_oConstraintsBasicCurrent = {}
	g_oConstraintsBasicDefault = {}
	
	g_divStreamSettingsTorch.style.display = "none"
	g_divZoom.style.display = "none"
	g_divImageSettings.style.display = "none"
	g_divStreamSettingsBrightness.style.display = "none"
	g_divStreamSettingsColorTemperature.style.display = "none"
	g_divStreamSettingsContrast.style.display = "none"
	g_divStreamSettingsEchoCancellation.style.display = "none"
	g_divStreamSettingsNoiseSuppression.style.display = "none"
	g_divStreamSettingsExposureCompensation.style.display = "none"
	g_divStreamSettingsFocusDistance.style.display = "none"
	g_divStreamSettingsFrameRate.style.display = "none"
	g_divStreamSettingsISO.style.display = "none"
	g_divStreamSettingsLatency.style.display = "none"
	g_divStreamSettingsSampleRate.style.display = "none"
	g_divStreamSettingsSampleSize.style.display = "none"
	g_divStreamSettingsSaturation.style.display = "none"
	g_divStreamSettingsSharpness.style.display = "none"
	g_divStreamSettingsAspectRatio.style.display = "none"
	g_divStreamSettingsWidth.style.display = "none"
	g_divStreamSettingsHeight.style.display = "none"
	g_divStreamSettingsExposureMode.style.display = "none"
	g_divStreamSettingsExposureTime.style.display = "none"
	g_divStreamSettingsWhiteBalanceMode.style.display = "none"
	g_divStreamSettingsFacingMode.style.display = "none"
	g_divStreamSettingsFocusMode.style.display = "none"
	g_divStreamSettingsQuality.style.display = "none"
	g_divStreamSettingsResizeMode.style.display = "none"
	
	//
	
	if ( (capabilities.torch !== undefined) && (settings.torch !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({torch: settings.torch})
		
		let inputTorch = document.getElementById("torch_button")
		inputTorch.onclick = onStreamSettingTorch
		
		g_divStreamSettingsTorch.style.display = "block"
	}
	
	//
	
	if ( (capabilities.zoom !== undefined) && (settings.zoom !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({zoom: settings.zoom})
		
		g_inputZoom.min = capabilities.zoom.min
		g_inputZoom.max = capabilities.zoom.max
		g_inputZoom.step = capabilities.zoom.step
		g_inputZoom.value = settings.zoom
		g_inputZoom.oninput = onStreamSettingZoom
		g_inputZoom.onchange = onStreamSettingZoom
		
		g_spanZoom.innerText = settings.zoom
		
		g_divZoom.style.display = "block"
	}
	
	//
	
	if ( (capabilities.width !== undefined) && (settings.width !== undefined) )
	{
		g_oConstraintsCurrent.width = settings.width
		g_oConstraintsBasicCurrent.width = settings.width
		
		g_inputWidth.min = capabilities.width.min
		g_inputWidth.max = capabilities.width.max
		g_inputWidth.step = capabilities.width.step
		g_inputWidth.value = settings.width
		g_inputWidth.oninput = onStreamSettingWidthInput
		g_inputWidth.onchange = onStreamSettingWidth
		
		g_spanWidth.innerText = settings.width
		
		g_divStreamSettingsWidth.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}
	
	if ( (capabilities.height !== undefined) && (settings.height !== undefined) )
	{
		g_oConstraintsCurrent.height = settings.height
		g_oConstraintsBasicCurrent.height = settings.height
		
		g_inputHeight.min = capabilities.height.min
		g_inputHeight.max = capabilities.height.max
		g_inputHeight.step = capabilities.height.step
		g_inputHeight.value = settings.height
		g_inputHeight.oninput = onStreamSettingHeightInput
		g_inputHeight.onchange = onStreamSettingHeight
		
		g_spanHeight.innerText = settings.height
		
		g_divStreamSettingsHeight.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}
	
	if ( (capabilities.width !== undefined) && (settings.width !== undefined) &&
		 (capabilities.height !== undefined) && (settings.height !== undefined) )
	{
		g_selectQuality.innerHTML = ""
		
		g_selectQuality.options[0] = new Option(chrome.i18n.getMessage("lngCustom"), "")
		g_selectQuality.options[0].disabled = true
		g_selectQuality.options[0].selected = true
		
		if ( g_Video.videoWidth >= g_Video.videoHeight )
		{
			var uMaxWidth = capabilities.width.max
			var uMaxHeight = capabilities.height.max
			var uCurrentWidth = settings.width
			var uCurrentHeight = settings.height
		}
		else
		{
			var uMaxWidth = capabilities.height.max
			var uMaxHeight = capabilities.width.max
			var uCurrentWidth = settings.height
			var uCurrentHeight = settings.width
		}
		
		if ( uMaxWidth >= 320 && uMaxHeight >= 240 ) {
			g_selectQuality.options[g_selectQuality.options.length] = new Option("QVGA (320 x 240 - 4:3)", "320x240")
		}
		if ( uMaxWidth >= 640 && uMaxHeight >= 480 ) {
			g_selectQuality.options[g_selectQuality.options.length] = new Option("VGA (640 x 480 - 4:3)", "640x480")
		}
		if ( uMaxWidth >= 1280 && uMaxHeight >= 720 ) {
			g_selectQuality.options[g_selectQuality.options.length] = new Option("HD (1280 x 720 - 16:9)", "1280x720")
		}
		if ( uMaxWidth >= 1920 && uMaxHeight >= 1080 ) {
			g_selectQuality.options[g_selectQuality.options.length] = new Option("Full HD (1920 x 1080 - 16:9)", "1920x1080")
		}
		if ( uMaxWidth >= 3840 && uMaxHeight >= 2160 ) {
			g_selectQuality.options[g_selectQuality.options.length] = new Option("4K UHD (3840 x 2160 - 16:9)", "3840x2160")
		}
		if ( uMaxWidth >= 4096 && uMaxHeight >= 2160 ) {
			g_selectQuality.options[g_selectQuality.options.length] = new Option("4K DCI (4096 x 2160 - 256:135)", "4096x2160")
		}
		if ( uMaxWidth >= 7680 && uMaxHeight >= 4320 ) {
			g_selectQuality.options[g_selectQuality.options.length] = new Option("8K UHD (7680 x 4320 - 16:9)", "7680x4320")
		}
		
		var valueCurrent = uCurrentWidth + "x" + uCurrentHeight
		for ( var i = 0; i < g_selectQuality.options.length; i++ )
		{
			if ( g_selectQuality.options[i].value == valueCurrent )
			{
				g_selectQuality.selectedIndex = i
				break
			}
		}
		
		g_selectQuality.onchange = onStreamSettingQuality
		
		g_divStreamSettingsQuality.style.display = "block"
	}
	
	//
	
	/*
	if ( (capabilities.aspectRatio !== undefined) && (settings.aspectRatio !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({aspectRatio: settings.aspectRatio})
		g_oConstraintsBasicCurrent.aspectRatio = settings.aspectRatio
		
		g_inputAspectRatio.min = capabilities.aspectRatio.min
		g_inputAspectRatio.max = capabilities.aspectRatio.max
		g_inputAspectRatio.step = capabilities.aspectRatio.step
		g_inputAspectRatio.value = settings.aspectRatio
		g_inputAspectRatio.oninput = onStreamSettingAspectRatio
		g_inputAspectRatio.onchange = onStreamSettingAspectRatio
		
		g_spanAspectRatio.innerText = settings.aspectRatio.toFixed(2)
		
		g_divStreamSettingsAspectRatio.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}
	*/
	
	if ( (capabilities.brightness !== undefined) && (settings.brightness !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({brightness: settings.brightness})
		
		g_inputBrightness.min = capabilities.brightness.min
		g_inputBrightness.max = capabilities.brightness.max
		g_inputBrightness.step = capabilities.brightness.step
		g_inputBrightness.value = settings.brightness
		g_inputBrightness.oninput = onStreamSettingBrightness
		g_inputBrightness.onchange = onStreamSettingBrightness
		
		g_spanBrightness.innerText = settings.brightness
		
		g_divStreamSettingsBrightness.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}

	if ( (capabilities.colorTemperature !== undefined) && (settings.colorTemperature !== undefined) )
	{
		let colorTemperatureSetting = settings.colorTemperature >= capabilities.colorTemperature.min ? settings.colorTemperature : 5600
		
		g_oConstraintsCurrent.advanced.push({colorTemperature: colorTemperatureSetting})
		
		g_inputColorTemperature.min = capabilities.colorTemperature.min
		g_inputColorTemperature.max = capabilities.colorTemperature.max
		g_inputColorTemperature.step = capabilities.colorTemperature.step
		g_inputColorTemperature.value = colorTemperatureSetting
		g_inputColorTemperature.oninput = onStreamSettingColorTemperature
		g_inputColorTemperature.onchange = onStreamSettingColorTemperature
		
		g_spanColorTemperature.innerText = colorTemperatureSetting
		
		g_divStreamSettingsColorTemperature.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}
	
	if ( (capabilities.contrast !== undefined) && (settings.contrast !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({contrast: settings.contrast})
		
		g_inputContrast.min = capabilities.contrast.min
		g_inputContrast.max = capabilities.contrast.max
		g_inputContrast.step = capabilities.contrast.step
		g_inputContrast.value = settings.contrast
		g_inputContrast.oninput = onStreamSettingContrast
		g_inputContrast.onchange = onStreamSettingContrast
		
		g_spanContrast.innerText = settings.contrast
		
		g_divStreamSettingsContrast.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}
	
	if ( (capabilities.echoCancellation !== undefined) && (settings.echoCancellation !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({echoCancellation: settings.echoCancellation})
		
		g_inputEchoCancellation.checked = settings.echoCancellation
		g_inputEchoCancellation.onchange = onStreamSettingEchoCancellation
		
		g_divStreamSettingsEchoCancellation.style.display = "block"
	}
	
	if ( (capabilities.noiseSuppression !== undefined) && (settings.noiseSuppression !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({noiseSuppression: settings.noiseSuppression})
		
		g_inputNoiseSuppression.checked = settings.noiseSuppression
		g_inputNoiseSuppression.onchange = onStreamSettingNoiseSuppression
		
		g_divStreamSettingsNoiseSuppression.style.display = "block"
	}
	
	if ( (capabilities.exposureCompensation !== undefined) && (settings.exposureCompensation !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({exposureCompensation: settings.exposureCompensation})
		
		g_inputExposureCompensation.min = capabilities.exposureCompensation.min
		g_inputExposureCompensation.max = capabilities.exposureCompensation.max
		g_inputExposureCompensation.step = capabilities.exposureCompensation.step
		g_inputExposureCompensation.value = settings.exposureCompensation
		g_inputExposureCompensation.oninput = onStreamSettingExposureCompensation
		g_inputExposureCompensation.onchange = onStreamSettingExposureCompensation
		
		g_spanExposureCompensation.innerText = settings.exposureCompensation
		
		g_divStreamSettingsExposureCompensation.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}
	
	if ( (capabilities.exposureMode !== undefined) && (settings.exposureMode !== undefined) )
	{
		if ( capabilities.exposureMode.length > 1 )
		{
			g_oConstraintsCurrent.advanced.push({exposureMode: settings.exposureMode})
			
			g_selectExposureMode.innerHTML = ""
			
			capabilities.exposureMode.forEach(function(mode)
			{
				g_selectExposureMode.options[g_selectExposureMode.options.length] = new Option(mode, mode)
				
				if ( mode == settings.exposureMode )
				{
					g_selectExposureMode.options[g_selectExposureMode.options.length - 1].selected = true
				}
			})
			
			g_selectExposureMode.onchange = onStreamSettingExposureMode
			
			g_divStreamSettingsExposureMode.style.display = "block"
		}
	}
	
	if ( (capabilities.exposureTime !== undefined) && (settings.exposureTime !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({exposureTime: settings.exposureTime})
		
		g_inputExposureTime.min = capabilities.exposureTime.min
		g_inputExposureTime.max = capabilities.exposureTime.max
		g_inputExposureTime.step = capabilities.exposureTime.step
		g_inputExposureTime.value = settings.exposureTime
		g_inputExposureTime.oninput = onStreamSettingExposureTime
		g_inputExposureTime.onchange = onStreamSettingExposureTime
		
		g_spanExposureTime.innerText = settings.exposureTime
		
		g_divStreamSettingsExposureTime.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}
	
	if ( (capabilities.facingMode !== undefined) && (settings.facingMode !== undefined) )
	{
		if ( capabilities.facingMode.length > 1 )
		{
			g_oConstraintsCurrent.advanced.push({facingMode: settings.facingMode})
			
			g_oConstraintsBasicCurrent.facingMode = settings.facingMode
			
			g_selectFacingMode.innerHTML = ""
			
			capabilities.facingMode.forEach(function(mode)
			{
				g_selectFacingMode.options[g_selectFacingMode.options.length] = new Option(mode, mode)
				
				if ( mode == settings.facingMode )
				{
					g_selectFacingMode.options[g_selectFacingMode.options.length - 1].selected = true
				}
			})
			
			g_selectFacingMode.onchange = onStreamSettingFacingMode
			
			g_divStreamSettingsFacingMode.style.display = "block"
		}
	}
	
	if ( (capabilities.focusDistance !== undefined) && (settings.focusDistance !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({focusDistance: settings.focusDistance})
		
		g_inputFocusDistance.min = capabilities.focusDistance.min
		g_inputFocusDistance.max = capabilities.focusDistance.max
		g_inputFocusDistance.step = capabilities.focusDistance.step
		g_inputFocusDistance.value = settings.focusDistance
		g_inputFocusDistance.oninput = onStreamSettingFocusDistance
		g_inputFocusDistance.onchange = onStreamSettingFocusDistance
		
		g_spanFocusDistance.innerText = settings.focusDistance
		
		g_divStreamSettingsFocusDistance.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}
	
	if ( (capabilities.focusMode !== undefined) && (settings.focusMode !== undefined) )
	{
		if ( capabilities.focusMode.length > 1 )
		{
			g_oConstraintsCurrent.advanced.push({focusMode: settings.focusMode})
			
			g_selectFocusMode.innerHTML = ""
			
			capabilities.focusMode.forEach(function(mode)
			{
				g_selectFocusMode.options[g_selectFocusMode.options.length] = new Option(mode, mode)
				
				if ( mode == settings.focusMode )
				{
					g_selectFocusMode.options[g_selectFocusMode.options.length - 1].selected = true
				}
			})
			
			g_selectFocusMode.onchange = onStreamSettingFocusMode
			
			g_divStreamSettingsFocusMode.style.display = "block"
		}
	}
	
	if ( (capabilities.frameRate !== undefined) && (settings.frameRate !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({frameRate: settings.frameRate})
		g_oConstraintsBasicCurrent.frameRate = settings.frameRate
		
		g_inputFrameRate.min = capabilities.frameRate.min
		g_inputFrameRate.max = capabilities.frameRate.max
		g_inputFrameRate.step = capabilities.frameRate.step
		g_inputFrameRate.value = settings.frameRate
		g_inputFrameRate.oninput = onStreamSettingFrameRateInput
		g_inputFrameRate.onchange = onStreamSettingFrameRate
		
		g_spanFrameRate.innerText = Math.round(settings.frameRate)
		
		g_divStreamSettingsFrameRate.style.display = "block"
	}

	if ( (capabilities.iso !== undefined) && (settings.iso !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({iso: settings.iso})
		
		g_inputISO.min = capabilities.iso.min
		g_inputISO.max = capabilities.iso.max
		g_inputISO.step = capabilities.iso.step
		g_inputISO.value = settings.iso
		g_inputISO.oninput = onStreamSettingISO
		g_inputISO.onchange = onStreamSettingISO
		
		g_spanISO.innerText = settings.iso
		
		g_divStreamSettingsISO.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}
	
	if ( (capabilities.latency !== undefined) && (settings.latency !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({latency: settings.latency})
		
		g_inputLatency.min = capabilities.latency.min
		g_inputLatency.max = capabilities.latency.max
		g_inputLatency.step = capabilities.latency.step
		g_inputLatency.value = settings.latency
		g_inputLatency.oninput = onStreamSettingLatency
		g_inputLatency.onchange = onStreamSettingLatency
		
		g_spanLatency.innerText = settings.latency
		
		g_divStreamSettingsLatency.style.display = "block"
	}
	
	if ( (capabilities.resizeMode !== undefined) && (settings.resizeMode !== undefined) )
	{
		if ( capabilities.resizeMode.length > 1 )
		{
			g_oConstraintsCurrent.advanced.push({resizeMode: settings.resizeMode})
			
			g_oConstraintsBasicCurrent.resizeMode = settings.resizeMode
			
			g_selectResizeMode.innerHTML = ""
			
			capabilities.resizeMode.forEach(function(mode)
			{
				g_selectResizeMode.options[g_selectResizeMode.options.length] = new Option(mode, mode)
				
				if ( mode == settings.resizeMode )
				{
					g_selectResizeMode.options[g_selectResizeMode.options.length - 1].selected = true
				}
			})
			
			g_selectResizeMode.onchange = onStreamSettingResizeMode
			
			g_divStreamSettingsResizeMode.style.display = "block"
		}
	}
	
	if ( (capabilities.sampleRate !== undefined) && (settings.sampleRate !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({sampleRate: settings.sampleRate})
		
		g_inputSampleRate.min = capabilities.sampleRate.min
		g_inputSampleRate.max = capabilities.sampleRate.max
		g_inputSampleRate.step = capabilities.sampleRate.step
		g_inputSampleRate.value = settings.sampleRate
		g_inputSampleRate.oninput = onStreamSettingSampleRate
		g_inputSampleRate.onchange = onStreamSettingSampleRate
		
		g_spanSampleRate.innerText = settings.sampleRate
		
		g_divStreamSettingsSampleRate.style.display = "block"
	}
	
	if ( (capabilities.sampleSize !== undefined) && (settings.sampleSize !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({sampleSize: settings.sampleSize})
		
		g_inputSampleSize.min = capabilities.sampleSize.min
		g_inputSampleSize.max = capabilities.sampleSize.max
		g_inputSampleSize.step = capabilities.sampleSize.step
		g_inputSampleSize.value = settings.sampleSize
		g_inputSampleSize.oninput = onStreamSettingSampleSize
		g_inputSampleSize.onchange = onStreamSettingSampleSize
		
		g_spanSampleSize.innerText = settings.sampleSize
		
		g_divStreamSettingsSampleSize.style.display = "block"
	}	
	
	if ( (capabilities.saturation !== undefined) && (settings.saturation !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({saturation: settings.saturation})
		
		g_inputSaturation.min = capabilities.saturation.min
		g_inputSaturation.max = capabilities.saturation.max
		g_inputSaturation.step = capabilities.saturation.step
		g_inputSaturation.value = settings.saturation
		g_inputSaturation.oninput = onStreamSettingSaturation
		g_inputSaturation.onchange = onStreamSettingSaturation
		
		g_spanSaturation.innerText = settings.saturation
		
		g_divStreamSettingsSaturation.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}

	if ( (capabilities.sharpness !== undefined) && (settings.sharpness !== undefined) )
	{
		g_oConstraintsCurrent.advanced.push({sharpness: settings.sharpness})
		
		g_inputSharpness.min = capabilities.sharpness.min
		g_inputSharpness.max = capabilities.sharpness.max
		g_inputSharpness.step = capabilities.sharpness.step
		g_inputSharpness.value = settings.sharpness
		g_inputSharpness.oninput = onStreamSettingSharpness
		g_inputSharpness.onchange = onStreamSettingSharpness
		
		g_spanSharpness.innerText = settings.sharpness
		
		g_divStreamSettingsSharpness.style.display = "block"
		g_divButtonImageSettings.style.display = "block"
	}
	
	if ( (capabilities.whiteBalanceMode !== undefined) && (settings.whiteBalanceMode !== undefined) )
	{
		if ( capabilities.whiteBalanceMode.length > 1 )
		{
			g_oConstraintsCurrent.advanced.push({whiteBalanceMode: settings.whiteBalanceMode})
			
			g_selectWhiteBalanceMode.innerHTML = ""
			
			capabilities.whiteBalanceMode.forEach(function(mode)
			{
				g_selectWhiteBalanceMode.options[g_selectWhiteBalanceMode.options.length] = new Option(mode, mode)
				
				if ( mode == settings.whiteBalanceMode )
				{
					g_selectWhiteBalanceMode.options[g_selectWhiteBalanceMode.options.length - 1].selected = true
				}
			})
			
			g_selectWhiteBalanceMode.onchange = onStreamSettingWhiteBalanceMode
			
			g_divStreamSettingsWhiteBalanceMode.style.display = "block"
		}
	}
	
	g_oConstraintsDefault = JSON.parse(JSON.stringify(g_oConstraintsCurrent))
	g_oConstraintsBasicDefault = JSON.parse(JSON.stringify(g_oConstraintsBasicCurrent))
}

function showCameras()
{
	var selectCameras = document.getElementById("camera")
	if ( selectCameras.length == 0 )
	{
		navigator.mediaDevices.enumerateDevices().then(function(devices)
		{
			var i = 0
				
			devices.forEach(function(device)
			{
				//console.log(device.kind, device.label)
				
				if ( device.kind == 'videoinput' )
				{
					var label = device.label ? " (" + device.label + ")" : ""
					var n = i + 1
					selectCameras.options[i] = new Option(n + label, device.deviceId)
					
					if ( device.label == m_CurrentCameraId && m_CurrentCameraId )
					{
						selectCameras.options[i].selected = true
					}
					
					i++
				}
			})
		})
	}
}

function transferVideoToCanvas()
{
	try
	{
		if ( !g_Canvas.width || !g_Canvas.height )
		{
			onPreviewSize({target: {value: m_ImageSize}})
			var gif_width = document.getElementById("gif_width")
			gif_width.value = g_Video.videoWidth
			onGIFWidth({target: gif_width})
			var gif_height = document.getElementById("gif_height")
			gif_height.value = g_Video.videoHeight
			onGIFHeight({target: gif_height})
		}
		
		g_Ctx.drawImage(g_Video, 0, 0, g_Video.videoWidth, g_Video.videoHeight)
		
		//
		
		if ( g_fFramingGrid )
		{
			drawFramingGrid()
		}
	}
	catch (e)
	{
		;
	}
}

function drawFramingGrid()
{
	g_Ctx.lineWidth = 1
	g_Ctx.strokeStyle = "rgba(255, 255, 255, 0.9)"
	
	g_Ctx.beginPath()
	
	//
	
	var uSegmentX = g_Video.videoWidth / 3
	
	for ( var uX = uSegmentX; uX < g_Video.videoWidth; uX += uSegmentX )
	{
		g_Ctx.moveTo(Math.floor(uX) + 0.5, 0)
		g_Ctx.lineTo(Math.floor(uX) + 0.5, g_Video.videoHeight)
	}
	
	//
	
	var uSegmentY = g_Video.videoHeight / 3
	
	for ( var uY = uSegmentY; uY < g_Video.videoHeight; uY += uSegmentY )
	{
		g_Ctx.moveTo(0, Math.floor(uY) + 0.5)
		g_Ctx.lineTo(g_Video.videoWidth, Math.floor(uY) + 0.5)
	}
	
	//
	
	g_Ctx.stroke()
}

function transferVideoToOutput()
{
	try
	{
		g_CtxPhoto.drawImage(g_Video, 0, 0)
		
		if ( g_fWatermarkTimestamp )
		{
			drawWatermarkTimestamp()
		}
	}
	catch (e)
	{
		;
	}
}

function drawWatermarkTimestamp()
{
	var dateCurrent = new Date()
	var strDateTime = dateCurrent.getFullYear() + "-"
					  + (dateCurrent.getMonth() + 1) + "-"
					  + dateCurrent.getDate() + " "
					  + dateCurrent.getHours() + ":"
					  + dateCurrent.getMinutes() + ":"
					  + dateCurrent.getSeconds()
	
	g_CtxPhoto.font = "12px Verdana"
	g_CtxPhoto.fillStyle = "#FFFFFF"
	g_CtxPhoto.textAlign = "right"
	g_CtxPhoto.fillText(strDateTime, g_CanvasPhoto.width - 12, g_CanvasPhoto.height - 12)
}

function onSnap()
{
	if ( g_fCameraOn )
	{
		document.getElementById("menu").style.display = "none"
		
		if ( Number(g_PhotoDelay) && m_MediaRecorder.state != "recording" ) {
			document.getElementById("photo_counter").style.display = "block"
			g_PhotoCounter = g_PhotoDelay
			RunPhotoCounter()
		} else {
			if ( m_Output == "gif" ) {
				onGIF()
			} else if ( m_Output == "video" ) {
				onVideo()
			} else {
				Photo()
			}
		}
	}
}

function RunPhotoCounter() {
	if ( g_PhotoCounter ) {
		document.getElementById("photo_counter").innerHTML = g_PhotoCounter
		g_PhotoCounter--
		setTimeout("RunPhotoCounter()", 1000)
	} else {
		document.getElementById("photo_counter").style.display = "none"
		if ( m_Output == "gif" ) {
			onGIF()
		} else if ( m_Output == "video" ) {
			onVideo()
		} else {
			Photo()
		}
	}
}

function Photo()
{
	g_CanvasPhoto.width = g_Video.videoWidth
	g_CanvasPhoto.height = g_Video.videoHeight
	
	transferVideoToOutput()
	
	document.getElementById("snap_sound").play()

	g_Canvas.style.display = "none"
	document.getElementById("options").style.display = "none"
	document.getElementById("save_msg").style.display = "block"
	document.getElementById("photo").style.display = "block"
	document.getElementById("output_controls").style.display = "block"
	document.getElementById("output_controls_edit").style.display = "block"
	document.body.style.overflow = "visible"
	
	var photo = document.getElementById("photo")
	photo.src = g_CanvasPhoto.toDataURL("image/jpeg")
	saveToDisk(photo.src, "myphoto.jpg")
	
	var dataImage = g_CanvasPhoto.toDataURL("image/jpeg")
	
	var aTransferImage = document.getElementsByClassName("transfer_image")
	for ( var i = 0; i < aTransferImage.length; i++ )
	{
		aTransferImage[i].value = dataImage
	}
	
	// for Edge
	
	if ( (m_fSafari && m_fiOS) || m_fChrome )
	{
		g_Video.style.display = "none"
	}
}

function onGIF()
{
	var recording_icon = document.getElementById("photo_counter")
	recording_icon.style.display = "block"
	recording_icon.style.fontSize = "300%"
	recording_icon.innerHTML = "<IMG src='images/icon_recording.png'>"
	
	g_CanvasPhoto.width = g_Video.videoWidth
	g_CanvasPhoto.height = g_Video.videoHeight
	
	var recordedFrames = 0
	var framesArray = []
	
	onDraw()
	var intervalID = setInterval(onDraw, m_GIFInterval * 1000)
	
	function onDraw()
	{
		transferVideoToOutput()
		
		framesArray.push(g_CanvasPhoto.toDataURL())
		
		recordedFrames++
		
		if ( recordedFrames == m_GIFFrames )
		{
			clearInterval(intervalID)
			
			document.getElementById("snap_sound").play()

			var recording_icon = document.getElementById("photo_counter")
			recording_icon.style.fontSize = "300%"
			recording_icon.innerHTML = chrome.i18n.getMessage("lngRendering") + "..."
			
			var gif_options = {images: framesArray,
							   gifWidth: m_GIFWidth,
							   gifHeight: m_GIFHeight,
							   numFrames: m_GIFFrames,
							   interval: m_GIFInterval,
							   text: m_GIFText,
							   fontSize: '24px'}
			gifshot.createGIF(gif_options, onFinished)
		}
	}
	
	function onFinished(obj)
	{
		if ( !obj.error )
		{
			g_Canvas.style.display = "none"
			document.getElementById("options").style.display = "none"
			document.getElementById("save_msg").style.display = "block"
			document.getElementById("photo").style.display = "block"
			document.getElementById("output_controls").style.display = "block"
			document.body.style.overflow = "visible"
			
			var recording_icon = document.getElementById("photo_counter")
			recording_icon.style.display = "none"
			recording_icon.style.fontSize = "500%"
			recording_icon.innerHTML = ""
			
			var blob = dataURItoBlob(obj.image)
			var blob1 = blob
			
			var photo = document.getElementById("photo")
			photo.src = window.URL.createObjectURL(blob)
			saveToDisk(window.URL.createObjectURL(blob1), "myphoto.gif")
			
			// for Edge
			
			if ( (m_fSafari && m_fiOS) || m_fChrome )
			{
				g_Video.style.display = "none"
			}
		}
	}
}

function onVideo()
{
	g_CanvasPhoto.width = g_Video.videoWidth
	g_CanvasPhoto.height = g_Video.videoHeight
	
	document.getElementById("menu").style.display = "block"

	var recording_icon = document.getElementById("photo_counter")
	recording_icon.style.display = "block"
	recording_icon.style.fontSize = "300%"
	recording_icon.innerHTML = "<IMG src='images/icon_recording.png'>"
	
	if ( m_MediaRecorder )
	{
		if ( m_MediaRecorder.state == "recording" )
		{
			m_MediaRecorder.stop()
			
			clearInterval(m_idIntervalVideoRecording)
		}
		else
		{
			m_idIntervalVideoRecording = setInterval(function(){transferVideoToOutput()}, m_VideoInterval)
			
			m_MediaRecorderChunks = []
			m_MediaRecorder.start()
		}
	}
}

function onMediaRecorderDataAvailable(e)
{
	m_MediaRecorderChunks.push(e.data)
}

function onVideoOutput()
{
	var recording_icon = document.getElementById("photo_counter")
	recording_icon.style.display = "none"
	recording_icon.style.fontSize = "500%"
	recording_icon.innerHTML = ""
	
	document.getElementById("snap_sound").play()
	
	g_Canvas.style.display = "none"
	document.getElementById("menu").style.display = "none"
	document.getElementById("options").style.display = "none"
	document.getElementById("save_msg").style.display = "block"
	document.getElementById("output_controls").style.display = "block"
	document.body.style.overflow = "visible"
	var video = document.getElementById("output_video")
	video.style.display = "block"
	video.src = window.URL.createObjectURL(new Blob(m_MediaRecorderChunks, {type: 'video/webm'}))
	saveToDisk(window.URL.createObjectURL(new Blob(m_MediaRecorderChunks, {type: 'video/webm'})), "PhotoMirrorVideo.webm")
	
	// for Edge
	
	if ( (m_fSafari && m_fiOS) || m_fChrome )
	{
		g_Video.style.display = "none"
	}
}

function onBack()
{
	document.body.scrollTop = 0
	document.documentElement.scrollTop = 0
	
	g_Canvas.style.display = "block"
	document.getElementById("menu").style.display = "block"
	document.getElementById("photo").style.display = "none"
	document.getElementById("output_video").style.display = "none"
	document.getElementById("output_controls").style.display = "none"
	document.getElementById("output_controls_edit").style.display = "none"
	document.body.style.overflow = "hidden"
	document.getElementById("save_msg").style.display = "none"
	
	//
	
	if ( (m_fSafari && m_fiOS) || m_fChrome )
	{
		g_Video.style.display = "block"
	}
}

function onOptionsShow()
{
	if  ( window.getComputedStyle(g_divSettings, null).getPropertyValue("display") == "none" )
	{
		g_divSettings.style.display = "block"
		
		let offsetX = parseInt(window.getComputedStyle(g_divSettings, null).getPropertyValue("right"))
		
		let idInterval = setInterval(frame, 10)
		
		function frame()
		{
			if ( offsetX >= 0 )
			{
				clearInterval(idInterval)
				
				g_divSettings.style.right = "0"
			}
			else
			{
				offsetX += 10
				
				g_divSettings.style.right = offsetX + "px"
			}
		}
	}
	else
	{
		onOptionsClose()
	}
}

function onOptionsClose()
{
	let offsetX = 0
	
	let idInterval = setInterval(frame, 10)
	
	function frame()
	{
		if ( offsetX >= g_divSettings.offsetWidth )
		{
			clearInterval(idInterval)
			
			g_divSettings.style.display = "none"
		}
		else
		{
			offsetX += 10
			
			g_divSettings.style.right = -offsetX + "px"
		}
	}
}

function VerifyPhotoDelay(e)
{
	let delay = e.target.value
	
	if ( ( delay < 0 || delay > 99 ) || isNaN(parseInt(delay)) )
	{
		document.getElementById("photo_delay").value = g_PhotoDelay
	}
	else
	{
		g_PhotoDelay = delay
	}
}

function onDelayKeyDown(e)
{
	return false
}

function onPreviewSize(e)
{
	m_ImageSize = e.target.value

	if ( g_Video.videoWidth && g_Video.videoHeight )
	{
		g_Canvas.width = g_Video.videoWidth
		g_Canvas.height = g_Video.videoHeight

		if ( m_ImageSize == "actualpixels" )
		{
			var displayWidth = document.documentElement.clientWidth
			var displayHeight = document.documentElement.clientHeight
			
			g_Canvas.style.width = g_Video.videoWidth + "px"
			g_Canvas.style.height = g_Video.videoHeight + "px"
			
			//
			
			if ( g_Video.videoWidth <= displayWidth )
			{
				g_Canvas.style.left = Math.floor(document.documentElement.clientWidth/2) - Math.floor(g_Video.videoWidth/2) + "px"
			}
			else
			{
				g_Canvas.style.left = (0 - (g_Video.videoWidth - displayWidth) / 2) + "px"
			}
			
			//
			
			if ( g_Video.videoHeight <= displayHeight )
			{
				g_Canvas.style.top = Math.floor(document.documentElement.clientHeight/2) - Math.floor(g_Video.videoHeight/2) + "px"
			}
			else
			{
				g_Canvas.style.top = (0 - (g_Video.videoHeight - displayHeight) / 2) + "px"
			}
		}
		else if ( m_ImageSize == "fitonscreen" )
		{
			var DisplayWidth = document.documentElement.clientWidth
			var DisplayHeight = document.documentElement.clientHeight
			
			var DisplayRatio = DisplayWidth / DisplayHeight
			var VideoRatio = g_Video.videoWidth / g_Video.videoHeight
			
			var uCanvasStyleWidth = 0
			var uCanvasStyleHeight = 0
			
			if ( DisplayRatio > VideoRatio )
			{
				uCanvasStyleWidth = g_Video.videoWidth * ( DisplayHeight / g_Video.videoHeight )
				uCanvasStyleHeight = DisplayHeight
				g_Canvas.style.left = Math.floor(document.documentElement.clientWidth/2) - Math.floor(uCanvasStyleWidth/2) + "px"
				g_Canvas.style.top = 0
			}
			else
			{
				uCanvasStyleHeight = g_Video.videoHeight * ( DisplayWidth / g_Video.videoWidth )
				uCanvasStyleWidth = DisplayWidth
				g_Canvas.style.left = 0
				g_Canvas.style.top = Math.floor(document.documentElement.clientHeight/2) - Math.floor(uCanvasStyleHeight/2) + "px"
			}
			
			g_Canvas.style.width = uCanvasStyleWidth + "px"
			g_Canvas.style.height = uCanvasStyleHeight + "px"
		}
		else
		{		
			var DisplayWidth = document.documentElement.clientWidth
			var DisplayHeight = document.documentElement.clientHeight
			
			var DisplayRatio = DisplayWidth / DisplayHeight
			var VideoRatio = g_Video.videoWidth / g_Video.videoHeight
			
			var uCanvasStyleWidth = 0
			var uCanvasStyleHeight = 0
			
			if ( DisplayRatio > VideoRatio )
			{
				var uCanvasStyleHeight = g_Video.videoHeight * ( DisplayWidth / g_Video.videoWidth )
				g_Canvas.style.width = DisplayWidth + "px"
				g_Canvas.style.height = uCanvasStyleHeight + "px"
				g_Canvas.style.left = 0
				g_Canvas.style.top = Math.floor(0 - ( uCanvasStyleHeight - DisplayHeight ) / 2) + "px"
			}
			else
			{
				var uCanvasStyleWidth = g_Video.videoWidth * ( DisplayHeight / g_Video.videoHeight )
				g_Canvas.style.width = uCanvasStyleWidth + "px"
				g_Canvas.style.height = DisplayHeight + "px"
				g_Canvas.style.left = Math.floor(0 - ( uCanvasStyleWidth - DisplayWidth ) / 2) + "px"
				g_Canvas.style.top = 0
			}
		}
	}
}

function onCamera(e)
{
	// to avoid losing default settings
	
	if ( g_fTrackCapabilitiesSupport )
	{
		onStreamSettingsDefault()
	}
	
	//
	
	m_Camera = e.target.value
	
	if ( m_Output == "video" ) {
		var constrains = {video: {deviceId: m_Camera}, audio: !m_Mute}
	} else {
		var constrains = {video: {deviceId: m_Camera}}
	}
	
	navigator.mediaDevices.getUserMedia(constrains).then(CameraCallbackSuccess).catch(CameraCallbackError)
}

function onFramingGrid(e)
{
	g_fFramingGrid = e.target.checked
}

function onWatermarkTimestamp(e)
{
	g_fWatermarkTimestamp = e.target.checked
}

function onOutput(e)
{
	m_Output = e.target.value
	
	if ( m_Output == "gif" )
	{
		document.getElementById("video_settings").style.display = "none"
		document.getElementById("image_size").disabled = false
		document.getElementById("gif_settings").style.display = "block"
	}
	else if ( m_Output == "video" )
	{
		if ( !m_fAudioProcessorInitialized ) {
			m_AudioProcessor = new AudioProcessor(0, m_AudioVisualization.showFrequencyBars, m_AudioVisualization.showSinewave)
			m_AudioProcessor.toggleMuteSpeaker()
			m_fAudioProcessorInitialized = true
		}
		
		document.getElementById("gif_settings").style.display = "none"
		document.getElementById("video_settings").style.display = "block"
		
		g_fKeepTrackConstrains = true
		navigator.mediaDevices.getUserMedia({video: {deviceId: m_Camera}, audio: !m_Mute}).then(CameraCallbackSuccess).catch(CameraCallbackError)
		
		m_AudioVisualization.setSize()
	}
	else
	{
		document.getElementById("gif_settings").style.display = "none"
		document.getElementById("video_settings").style.display = "none"
		document.getElementById("image_size").disabled = false
	}
}

function onGIFWidth(e) {
	if ( m_GIFWidth != 0 && m_GIFKeepProportions ) {
		e.target.value = Number(e.target.value) || 1
		m_GIFHeight *= e.target.value / m_GIFWidth
		document.getElementById("gif_height").value = Math.round(m_GIFHeight)
	}
	m_GIFWidth = e.target.value
}

function onGIFHeight(e) {
	if ( m_GIFHeight != 0 && m_GIFKeepProportions ) {
		e.target.value = Number(e.target.value) || 1
		m_GIFWidth *= e.target.value / m_GIFHeight
		document.getElementById("gif_width").value = Math.round(m_GIFWidth)
	}
	m_GIFHeight = e.target.value
}

function onGIFKeepProportions(e) {
	m_GIFKeepProportions = e.target.checked
}

function onGIFInterval(e) {
	m_GIFInterval = e.target.value
}

function onGIFFrames(e) {
	m_GIFFrames = e.target.value
}

function onGIFText(e) {
	m_GIFText = e.target.value
}

function onMute(e)
{
	m_Mute = e.target.checked
	
	g_fKeepTrackConstrains = true
	navigator.mediaDevices.getUserMedia({video: {deviceId: m_Camera}, audio: !m_Mute}).then(CameraCallbackSuccess).catch(CameraCallbackError)
	
	m_AudioProcessor.toggleMuteMic()
}

function onFullScreen() {
	if ( document.fullScreen != undefined ) {
		if ( document.fullScreen ) {
			document.cancelFullScreen()
		} else {
			document.documentElement.requestFullScreen()
		}
	} else if ( document.webkitIsFullScreen != undefined ) {
		if ( document.webkitIsFullScreen ) {
			document.webkitCancelFullScreen()
		} else {
			document.documentElement.webkitRequestFullScreen()
		}
	} else if ( document.mozFullScreen != undefined ) {
		if ( document.mozFullScreen ) {
			document.mozCancelFullScreen()
		} else {
			document.documentElement.mozRequestFullScreen()
		}
	}
}

function onPhotoMirror()
{
	window.open("https://photo-mirror.net" + chrome.i18n.getMessage("lngURLParameterLng"), '_blank').focus()
}

function onStreamSettingTorch()
{
	var fTorch = false
	
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].torch !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].torch = !g_oConstraintsCurrent.advanced[i].torch
			
			fTorch = g_oConstraintsCurrent.advanced[i].torch
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	// *2
	
	if ( !fTorch )
	{
		g_videoTrackCurrent.stop()
		
		if ( m_Output == "video" ) {
			var constrains = {video: {deviceId: m_Camera}, audio: !m_Mute}
		} else {
			var constrains = {video: {deviceId: m_Camera}}
		}
		
		g_fKeepTrackConstrains = true
		navigator.mediaDevices.getUserMedia(constrains).then(CameraCallbackSuccess).catch(CameraCallbackError)
	}
}

function onStreamSettingAspectRatio(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].aspectRatio !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].aspectRatio = Number(e.target.value)
		}
	}
	
	g_oConstraintsBasicCurrent.aspectRatio = Number(e.target.value)
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	g_videoTrackCurrent.applyConstraints(g_oConstraintsBasicCurrent).then(function()
	{
		setTimeout(function()
		{
			onPreviewSize({target: {value: m_ImageSize}})
			
			setTimeout(function()
			{
				onPreviewSize({target: {value: m_ImageSize}})
			},
			1000)
		},
		1000)
	})
	
	g_spanAspectRatio.innerText = Number(e.target.value).toFixed(2)
}

function onStreamSettingWidth(e)
{
	function updatePreviewSize()
	{
		setTimeout(function()
		{
			onPreviewSize({target: {value: m_ImageSize}})
			
			setTimeout(function()
			{
				onPreviewSize({target: {value: m_ImageSize}})
			},
			3000)
		},
		1000)
	}
	
	g_oConstraintsCurrent.width = Number(e.target.value)
	g_oConstraintsBasicCurrent.width = Number(e.target.value)
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	g_videoTrackCurrent.applyConstraints(g_oConstraintsBasicCurrent).then(function()
	{
		updatePreviewSize()
	})
	/*.catch(function(e)
	{
		updatePreviewSize()
		console.log(e)
    })*/
	
	//
	
	if ( g_Video.videoWidth >= g_Video.videoHeight ) {
		var uWidth = g_oConstraintsCurrent.width
		var uHeight = g_oConstraintsCurrent.height
	} else {
		var uWidth = g_oConstraintsCurrent.height
		var uHeight = g_oConstraintsCurrent.width
	}
	
	g_selectQuality.selectedIndex = 0
	var valueCurrent = uWidth + "x" + uHeight
	for ( var i = 0; i < g_selectQuality.options.length; i++ )
	{
		if ( g_selectQuality.options[i].value == valueCurrent )
		{
			g_selectQuality.selectedIndex = i
			break
		}
	}
}

function onStreamSettingWidthInput(e)
{
	g_spanWidth.innerText = e.target.value
}

function onStreamSettingHeight(e)
{
	function updatePreviewSize()
	{
		setTimeout(function()
		{
			onPreviewSize({target: {value: m_ImageSize}})
			
			setTimeout(function()
			{
				onPreviewSize({target: {value: m_ImageSize}})
			},
			3000)
		},
		1000)
	}
	
	g_oConstraintsCurrent.height = Number(e.target.value)
	g_oConstraintsBasicCurrent.height = Number(e.target.value)
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	g_videoTrackCurrent.applyConstraints(g_oConstraintsBasicCurrent).then(function()
	{
		updatePreviewSize()
	})
	/*.catch(function(e)
	{
		updatePreviewSize()
		console.log(e)
    })*/
	
	//
	
	if ( g_Video.videoWidth >= g_Video.videoHeight ) {
		var uWidth = g_oConstraintsCurrent.width
		var uHeight = g_oConstraintsCurrent.height
	} else {
		var uWidth = g_oConstraintsCurrent.height
		var uHeight = g_oConstraintsCurrent.width
	}
	
	g_selectQuality.selectedIndex = 0
	var valueCurrent = uWidth + "x" + uHeight
	for ( var i = 0; i < g_selectQuality.options.length; i++ )
	{
		if ( g_selectQuality.options[i].value == valueCurrent )
		{
			g_selectQuality.selectedIndex = i
			break
		}
	}
}

function onStreamSettingHeightInput(e)
{
	g_spanHeight.innerText = e.target.value
}

function onStreamSettingQuality(e)
{
	var aSize = e.target.value.split('x')
	
	if ( g_Video.videoWidth >= g_Video.videoHeight )
	{
		var uMaxWidth = aSize[0]
		var uMaxHeight = aSize[1]
	}
	else
	{
		var uMaxWidth = aSize[1]
		var uMaxHeight = aSize[0]
	}
	
	g_inputWidth.value = uMaxWidth
	g_spanWidth.innerText = uMaxWidth
	
	g_inputHeight.value = uMaxHeight
	g_spanHeight.innerText = uMaxHeight
	
	onStreamSettingWidth({target: {value: uMaxWidth}})
	onStreamSettingHeight({target: {value: uMaxHeight}})
}

function onStreamSettingBrightness(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].brightness !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].brightness = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)

	g_spanBrightness.innerText = e.target.value
}

function onStreamSettingColorTemperature(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].colorTemperature !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].colorTemperature = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanColorTemperature.innerText = e.target.value
}

function onStreamSettingContrast(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].contrast !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].contrast = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanContrast.innerText = e.target.value
}

function onStreamSettingEchoCancellation(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].echoCancellation !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].echoCancellation = e.target.checked
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
}

function onStreamSettingExposureTime(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].exposureTime !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].exposureTime = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanExposureTime.innerText = e.target.value
}

function onStreamSettingNoiseSuppression(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].noiseSuppression !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].noiseSuppression = e.target.checked
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
}

function onStreamSettingExposureCompensation(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].exposureCompensation !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].exposureCompensation = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanExposureCompensation.innerText = e.target.value
}

function onStreamSettingExposureMode(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].exposureMode !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].exposureMode = e.target.value
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
}

function onStreamSettingFacingMode(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].facingMode !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].facingMode = e.target.value
		}
	}
	
	g_oConstraintsBasicCurrent.facingMode = e.target.value
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	g_videoTrackCurrent.applyConstraints(g_oConstraintsBasicCurrent)
}

function onStreamSettingFocusDistance(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].focusDistance !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].focusDistance = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanFocusDistance.innerText = e.target.value
}

function onStreamSettingFocusMode(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].focusMode !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].focusMode = e.target.value
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
}

function onStreamSettingFrameRate(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].frameRate !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].frameRate = Number(e.target.value)
		}
	}
	
	g_oConstraintsBasicCurrent.frameRate = Number(e.target.value)
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsBasicCurrent)
}

function onStreamSettingFrameRateInput(e)
{
	g_spanFrameRate.innerText = Math.round(e.target.value)
}

function onStreamSettingISO(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].iso !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].iso = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanISO.innerText = e.target.value
}

function onStreamSettingLatency(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].latency !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].latency = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanLatency.innerText = e.target.value
}

function onStreamSettingResizeMode(e)
{
	function updatePreviewSize()
	{
		setTimeout(function()
		{
			onPreviewSize({target: {value: m_ImageSize}})
			
			setTimeout(function()
			{
				onPreviewSize({target: {value: m_ImageSize}})
			},
			3000)
		},
		1000)
	}
	
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].resizeMode !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].resizeMode = e.target.value
		}
	}
	
	g_oConstraintsBasicCurrent.resizeMode = e.target.value
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	g_videoTrackCurrent.applyConstraints(g_oConstraintsBasicCurrent).then(function()
	{
		updatePreviewSize()
	})
	/*.catch(function(e)
	{
		updatePreviewSize()
		console.log(e)
    })*/
}

function onStreamSettingSampleRate(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].sampleRate !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].sampleRate = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanSampleRate.innerText = e.target.value
}

function onStreamSettingSampleSize(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].sampleSize !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].sampleSize = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanSampleSize.innerText = e.target.value
}

function onStreamSettingSaturation(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].saturation !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].saturation = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanSaturation.innerText = e.target.value
}

function onStreamSettingSharpness(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].sharpness !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].sharpness = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanSharpness.innerText = e.target.value
}

function onStreamSettingZoom(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].zoom !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].zoom = Number(e.target.value)
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
	
	g_spanZoom.innerText = e.target.value
}

function onStreamSettingWhiteBalanceMode(e)
{
	for ( let i = 0; i < g_oConstraintsCurrent.advanced.length; i++ )
	{
		if ( g_oConstraintsCurrent.advanced[i].whiteBalanceMode !== undefined )
		{
			g_oConstraintsCurrent.advanced[i].whiteBalanceMode = e.target.value
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsCurrent)
}

function onImageSettings()
{
	g_divButtonImageSettings.style.display = "none"
	g_divImageSettings.style.display = "block"
}

function onStreamSettingsDefault()
{
	function updatePreviewSize()
	{
		setTimeout(function()
		{
			onPreviewSize({target: {value: m_ImageSize}})
			
			setTimeout(function()
			{
				onPreviewSize({target: {value: m_ImageSize}})
			},
			3000)
		},
		1000)
	}
	
	if ( g_oConstraintsDefault.width !== undefined )
	{
		g_inputWidth.value = g_oConstraintsDefault.width
		g_spanWidth.innerText = g_oConstraintsDefault.width
	}
	
	if ( g_oConstraintsDefault.height !== undefined )
	{
		g_inputHeight.value = g_oConstraintsDefault.height
		g_spanHeight.innerText = g_oConstraintsDefault.height
	}

	if ( g_oConstraintsDefault.width !== undefined && g_oConstraintsDefault.height !== undefined )
	{
		if ( g_Video.videoWidth >= g_Video.videoHeight ) {
			var uWidth = g_oConstraintsDefault.width
			var uHeight = g_oConstraintsDefault.height
		} else {
			var uWidth = g_oConstraintsDefault.height
			var uHeight = g_oConstraintsDefault.width
		}
		
		g_selectQuality.selectedIndex = 0
		var valueCurrent = uWidth + "x" + uHeight
		for ( var i = 0; i < g_selectQuality.options.length; i++ )
		{
			if ( g_selectQuality.options[i].value == valueCurrent )
			{
				g_selectQuality.selectedIndex = i
				break
			}
		}
	}
	
	//
	
	for ( let i = 0; i < g_oConstraintsDefault.advanced.length; i++ )
	{
		// zoom - don't touch, leave it as is
		
		if ( g_oConstraintsDefault.advanced[i].zoom !== undefined )
		{
			g_oConstraintsDefault.advanced[i].zoom = g_inputZoom.value
		}
		
		//

		if ( g_oConstraintsDefault.advanced[i].aspectRatio !== undefined )
		{
			g_inputAspectRatio.value = g_oConstraintsDefault.advanced[i].aspectRatio
			g_spanAspectRatio.innerText = g_oConstraintsDefault.advanced[i].aspectRatio.toFixed(2)
		}
		
		if ( g_oConstraintsDefault.advanced[i].brightness !== undefined )
		{
			g_inputBrightness.value = g_oConstraintsDefault.advanced[i].brightness
			g_spanBrightness.innerText = g_oConstraintsDefault.advanced[i].brightness
		}
		
		if ( g_oConstraintsDefault.advanced[i].colorTemperature !== undefined )
		{
			g_inputColorTemperature.value = g_oConstraintsDefault.advanced[i].colorTemperature
			g_spanColorTemperature.innerText = g_oConstraintsDefault.advanced[i].colorTemperature
		}
		
		if ( g_oConstraintsDefault.advanced[i].contrast !== undefined )
		{
			g_inputContrast.value = g_oConstraintsDefault.advanced[i].contrast
			g_spanContrast.innerText = g_oConstraintsDefault.advanced[i].contrast
		}
		
		if ( g_oConstraintsDefault.advanced[i].echoCancellation !== undefined )
		{
			g_inputEchoCancellation.checked = g_oConstraintsDefault.advanced[i].echoCancellation
		}
		
		if ( g_oConstraintsDefault.advanced[i].exposureTime !== undefined )
		{
			g_inputExposureTime.value = g_oConstraintsDefault.advanced[i].exposureTime
			g_spanExposureTime.innerText = g_oConstraintsDefault.advanced[i].exposureTime
		}
		
		if ( g_oConstraintsDefault.advanced[i].noiseSuppression !== undefined )
		{
			g_inputNoiseSuppression.checked = g_oConstraintsDefault.advanced[i].noiseSuppression
		}
		
		if ( g_oConstraintsDefault.advanced[i].exposureCompensation !== undefined )
		{
			g_inputExposureCompensation.value = g_oConstraintsDefault.advanced[i].exposureCompensation
			g_spanExposureCompensation.innerText = g_oConstraintsDefault.advanced[i].exposureCompensation
		}
		
		if ( g_oConstraintsDefault.advanced[i].exposureMode !== undefined )
		{
			g_selectExposureMode.value = g_oConstraintsDefault.advanced[i].exposureMode
		}

		if ( g_oConstraintsDefault.advanced[i].facingMode !== undefined )
		{
			g_selectFacingMode.value = g_oConstraintsDefault.advanced[i].facingMode
		}
		
		if ( g_oConstraintsDefault.advanced[i].focusDistance !== undefined )
		{
			g_inputFocusDistance.value = g_oConstraintsDefault.advanced[i].focusDistance
			g_spanFocusDistance.innerText = g_oConstraintsDefault.advanced[i].focusDistance
		}
		
		if ( g_oConstraintsDefault.advanced[i].focusMode !== undefined )
		{
			g_selectFocusMode.value = g_oConstraintsDefault.advanced[i].focusMode
		}
		
		if ( g_oConstraintsDefault.advanced[i].frameRate !== undefined )
		{
			g_inputFrameRate.value = g_oConstraintsDefault.advanced[i].frameRate
			g_spanFrameRate.innerText = Math.round(g_oConstraintsDefault.advanced[i].frameRate)
		}
		
		if ( g_oConstraintsDefault.advanced[i].iso !== undefined )
		{
			g_inputISO.value = g_oConstraintsDefault.advanced[i].iso
			g_spanISO.innerText = g_oConstraintsDefault.advanced[i].iso
		}
		
		if ( g_oConstraintsDefault.advanced[i].latency !== undefined )
		{
			g_inputLatency.value = g_oConstraintsDefault.advanced[i].latency
			g_spanLatency.innerText = g_oConstraintsDefault.advanced[i].latency
		}
		
		if ( g_oConstraintsDefault.advanced[i].sampleRate !== undefined )
		{
			g_inputSampleRate.value = g_oConstraintsDefault.advanced[i].sampleRate
			g_spanSampleRate.innerText = g_oConstraintsDefault.advanced[i].sampleRate
		}
		
		if ( g_oConstraintsDefault.advanced[i].resizeMode !== undefined )
		{
			g_selectResizeMode.value = g_oConstraintsDefault.advanced[i].resizeMode
		}
		
		if ( g_oConstraintsDefault.advanced[i].sampleSize !== undefined )
		{
			g_inputSampleSize.value = g_oConstraintsDefault.advanced[i].sampleRate
			g_spanSampleSize.innerText = g_oConstraintsDefault.advanced[i].sampleRate
		}
		
		if ( g_oConstraintsDefault.advanced[i].saturation !== undefined )
		{
			g_inputSaturation.value = g_oConstraintsDefault.advanced[i].saturation
			g_spanSaturation.innerText = g_oConstraintsDefault.advanced[i].saturation
		}
		
		if ( g_oConstraintsDefault.advanced[i].sharpness !== undefined )
		{
			g_inputSharpness.value = g_oConstraintsDefault.advanced[i].sharpness
			g_spanSharpness.innerText = g_oConstraintsDefault.advanced[i].sharpness
		}
		
		if ( g_oConstraintsDefault.advanced[i].whiteBalanceMode !== undefined )
		{
			g_selectWhiteBalanceMode.value = g_oConstraintsDefault.advanced[i].whiteBalanceMode
		}
	}
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsDefault)
	
	g_videoTrackCurrent.applyConstraints(g_oConstraintsBasicDefault).then(function()
	{
		updatePreviewSize()
	})
	/*.catch(function(e)
	{
		updatePreviewSize()
		console.log(e)
    })*/
	
	g_oConstraintsCurrent = JSON.parse(JSON.stringify(g_oConstraintsDefault))
	g_oConstraintsBasicCurrent = JSON.parse(JSON.stringify(g_oConstraintsBasicDefault))
	
	g_divImageSettings.style.display = "none"
	g_divButtonImageSettings.style.display = "block"
}

function IdleCounter()
{
	if ( !m_nIdle) {
		if ( m_fHideMenu ) {
			ShowMenu()
		}
	}
	
	m_nIdle++
	
	if ( m_nIdle == 15 &&
		 !m_fHideMenu &&
		 m_nMousePointY < document.getElementById("menu").offsetTop )
	{
		m_fHideMenu = true
		HideMenu()
	}
	
	setTimeout(IdleCounter, 100)
}

function ShowMenu()
{
	if ( m_fHideMenu ) m_fHideMenu = false
	
	var menu = document.getElementById("menu")
	
	if ( menu.style.opacity < 0.9 ) {
		menu.style.opacity = Number(menu.style.opacity) + 0.1
		setTimeout(ShowMenu, 30)
	} else {
		menu.style.opacity = 1
	}
}

function HideMenu()
{
	if ( m_fHideMenu )
	{
		var menu = document.getElementById("menu")
		
		if ( menu.style.opacity === "" ) {
			menu.style.opacity = 0.9
			setTimeout(HideMenu, 100)
		} else if ( Number(menu.style.opacity).toFixed(1) > 0.1 ) {
			menu.style.opacity = menu.style.opacity - 0.1
			setTimeout(HideMenu, 100)
		} else {
			menu.style.opacity = 0
		}
	}
}

function dataURItoBlob(dataURI)
{
	if ( dataURI.split(',')[0].indexOf('base64') >= 0 ) {
		var byteString = atob(dataURI.split(',')[1])
	} else {
		var byteString = unescape(dataURI.split(',')[1])
	}
	
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	
    var ia = new Uint8Array(byteString.length)
    for ( var i = 0; i < byteString.length; i++ ) {
        ia[i] = byteString.charCodeAt(i)
    }
	
    return new Blob([ia], {type:mimeString})
}

function saveToDisk(fileURL, fileName)
{
	var save = document.createElement("A")
	save.href = fileURL
	save.target = '_blank'
	save.download = fileName || ""
	
	var event = document.createEvent('MouseEvent')
	event.initEvent('click', true, true)
	save.dispatchEvent(event)
}

function localizeHtmlPage()
{
    // Localize by replacing __MSG_***__ meta tags
	// https://stackoverflow.com/questions/25467009/internationalization-of-html-pages-for-my-google-chrome-extension
	
    var objects = document.getElementsByTagName('html')
    for ( var j = 0; j < objects.length; j++ )
    {
        var obj = objects[j]

        var valStrH = obj.innerHTML.toString()
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
        {
            return v1 ? chrome.i18n.getMessage(v1) : ""
        })

        if ( valNewH != valStrH )
        {
            obj.innerHTML = valNewH
        }
    }
}
