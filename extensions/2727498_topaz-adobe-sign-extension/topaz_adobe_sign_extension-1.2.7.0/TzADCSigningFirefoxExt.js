/* Last cursor X value */
var lCurX = 0.0;
/* Last cursor Y value */
var lCurY = 0.0;
/* To identify canvas */
var canvasObj;
/* To hold xPixels to calculate width ratio */
var xPixels;
/* To hold xPixels to calculate height ratio */
var yPixels;
/* To hold X offset value */
var xOffset = 0.0;
/* To hold Y offset value */
var yOffset = 0.0;
/* To hold PC maximum XY */
var PCMaxXY = 0.0;
/* To hold Maximum X value */
var maximumX = 0;
/* To hold Maximum Y value */
var maximumY = 0;
/* To get canvas rectangle */
var canvasRect;
/* To check graphic first touch */
var g_fFirstTouch = true;
/* To identify key press event */
var isKeyPress = false;
/* To get GUID */
var guid = GenerateUUID();
/* For signature filed device connected text */
var signatureDeviceConnectedText = "";
/* For initial field device connected text */
var initialDeviceConnectedText = "";
/* For signature field device disconnected text */
var signatureDeviceDisconnectedText = "";
/* For initial field device disconnected text */
var initialDeviceDisconnetedText = "";
/* To hold device connected or disconnected message */
var statusMsg; 
/* To store close button class name */
var evntClose="";
/* To store apply button class name */
var evntApply="";
/* For hidden signature div Id */
var signatureHidenDivId;
/* For hidden initial div Id */
var initialHidenDivId;
/* For hidden URL */
var hidenURL = 0;
/* To clear option draw empty time interval */
var clearOptDrawEmpty;
/* To check open connection status */
var connectionSuccess = false;

/* Attach control events */
var events = [
   "click",
   "keypress",
   "keyup"
];

for (var i = 0; i < events.length; i++) {
	if(document.getElementsByClassName("faf-switch-toolbar-sign")!=null && document.getElementsByClassName("faf-switch-toolbar-sign").length>0)
	{   
		document.getElementsByClassName("faf-switch-toolbar-sign").addEventListener("click", HtmlEventHandler(), false);
	}
    document.addEventListener(events[i], HtmlEventHandler);
}
/* Close connection when before unload event */
window.addEventListener("beforeunload", function(e) {
    CloseConnection();
});
/* Calculates the Scaling Factor Values */
function CalculateScalingFactors(maxX, maxY) {
	console.log("Tz Adobe Sign Firefox Extension - CalculateScalingFactors() called");   
	console.log("Tz Adobe Sign Firefox Extension - CalculateScalingFactors() canvas width: " + canvasObj.clientWidth);
	console.log("Tz Adobe Sign Firefox Extension - CalculateScalingFactors() canvas height: " + canvasObj.clientHeight);
	xPixels = canvasObj.clientWidth;
	yPixels = canvasObj.clientHeight;
	
    if (maxX != 0 && maxY != 0) {
        maximumX = maxX;
        maximumY = maxY;
    }

    var WidthRatio = 0, HeightRatio = 0;
    WidthRatio = xPixels / maximumX;
    HeightRatio = yPixels / maximumY;

    if (HeightRatio > WidthRatio) {
        PCMaxXY = WidthRatio;
    }
    else {
        PCMaxXY = HeightRatio;
    }
    xOffset = ((xPixels - maximumX * PCMaxXY) / 2.0);
    yOffset = ((yPixels - maximumY * PCMaxXY) / 2.0);

}

/* Scale the points and draw */
function ScaleAndDrawSignatureTZ(xAxis, yAxis, pressure) {
	console.log("Tz Adobe Sign Firefox Extension - ScaleAndDrawSignatureTZ() - Scale the points and draw.");
	CalculateScalingFactors(maximumX, maximumY);
	
	var Px1;
	var Py1;
	
	if(maximumY>1500 && canvasObj.clientWidth==748)
	{
	  Px1 = xAxis * PCMaxXY * 2.5;
      Py1 = yAxis * PCMaxXY;
	}
	else
	{
      Px1 = xAxis * PCMaxXY;
      Py1 = yAxis * PCMaxXY;
	}

    if (Px1 >= 0.0)
        x = Px1 + 0.5;
    else
        x = Px1 - 0.5;

    if (Py1 >= 0.0)
        y = Py1 + 0.5;
    else
        y = Py1 - 0.5;

    x = xOffset + x;
    y = yOffset + y;	
    	
	canvasRect = canvasObj.getBoundingClientRect();
    //Adding canvas offset from the screen origin
	if(maximumY >1500 && canvasObj.clientWidth==748)
	{
      lCurX = x + canvasRect.left-200;
      lCurY = y + canvasRect.top;	
	}
	else
	{
	   lCurX = x + canvasRect.left;
       lCurY = y + canvasRect.top;	
	}
	console.log("Tz Adobe Sign Firefox Extension - ScaleAndDrawSignatureTZ() - Scale the points: " + lCurX + "," + lCurY);
    //Raising Mouse Events using the points
    if (pressure != 0) {
        //check if it is the first touch in the stroke
        if (g_fFirstTouch) {
            var event = mouseEvent("mousedown", 0, 0, lCurX, lCurY);
            DispatchEvent(canvasObj, event);
			console.log("Tz Adobe Sign Firefox Extension - ScaleAndDrawSignatureTZ() - Mouse down.");
            g_fFirstTouch = false;
        }
        else {
            var event = mouseEvent("mousemove", 0, 0, lCurX, lCurY);		
            DispatchEvent(canvasObj, event);
			console.log("Tz Adobe Sign Firefox Extension - ScaleAndDrawSignatureTZ() - Mouse move.");
        }
    }
    else {
        var event = mouseEvent("mouseup", 0, 0, lCurX, lCurY);
        DispatchEvent(canvasObj, event);
		console.log("Tz Adobe Sign Firefox Extension - ScaleAndDrawSignatureTZ() - Mouse up.");
        //set the first touch 
        g_fFirstTouch = true;
    }
}
/* HTML Elements Event Handler. */
function HtmlEventHandler(evt) {
	console.log("Tz Adobe Sign Firefox Extension - HtmlEventHandler() called.");
    try {
		evntClose = "";
		evntApply = "";
        if (evt.type == "keyup") {
            if (evt.keyCode == "27") {
                CloseConnection();
            }
        }
		console.log("Tz Adobe Sign Firefox Extension - HtmlEventHandler() - Event tag name: " + evt.target.tagName);
        if (evt.target.tagName == "BUTTON") {
			var signMandatoryFileds =document.getElementsByClassName('alert alert-danger fade in alert-dismissable');
			console.log("Tz Adobe Sign Firefox Extension - HtmlEventHandler() - Event text content: " + evt.target.textContent);
			
			// Identify close button with event class name.
			if(evt.target.className == "btn btn-default cancel" || evt.target.className == "btn btn-secondary cancel")
			{
				evntClose = evt.target.className;
			}
			// Identify apply button with event class name.
			if(evt.target.className == "btn btn-primary apply")
			{
				evntApply = evt.target.className;
			}
			// Click on close or apply button it calls CloseConnection method.
            if ((evt.target.className == "btn btn-default cancel" || evt.target.className == "btn btn-secondary cancel") || (evt.target.className == "btn btn-primary apply" && signMandatoryFileds.length==0)) {
			
                if (evt.type == "click") {
                    CloseConnection();
					
                }				
                else if (evt.type == "keyup" && evt.keyCode == "13") {
                    CloseConnection();
                }
			
            }
        }
		if(evt.target.tagName == "TEXTAREA" || evt.target.className == "page pdf-page-1 ui-droppable tool-text" || evt.target.className == "page pdf-page-1 ui-droppable tool-undefined tool-text" || evt.target.className == "faf-field-chrome" || (evt.target.className == "btn btn-default cancel" || evt.target.className == "btn btn-secondary cancel") || evt.target.className == "btn btn-primary apply" || evt.target.className == "faf-switch-toolbar-sign" || evt.target.className == "faf-switch-toolbar-initials" || evt.target.className == "placeholder-text")
		{
			DispatchOptionImageIconSelected();
			DispatchOptionTypeIcon();
		}
         if (evt.target.tagName == "DIV" || evt.target.tagName == "A" || evt.target.tagName == "P" || evt.target.tagName == "LI" || evt. target.tagName == "SPAN")  {
           			
			console.log("Tz Adobe Sign Firefox Extension - HtmlEventHandler() - Event class name: " + evt.target.className);
            if (evt.target.className == "faux_field" || evt.target.className == "page pdf-page-1" || evt.target.className == "image-label" || evt.target.className == "title" || evt.target.className == "faf-signature-menu-item no-select faf-signature-menu-signature" || evt.target.className == "faf-signature-menu-item no-select faf-signature-menu-initials" || evt.target.className == "signature-info" || evt.target.className == "signature-name" || evt.target.className == "signature-date") {
                if (evt.type == "keypress") {
                    isKeyPress = true;
                }	
		   
                var optionDrawSelected = document.getElementsByClassName('option draw selected');
                var optionDraw = document.getElementsByClassName('option draw');
                var optionTypeSelected = document.getElementsByClassName('option type selected');

				//If option type icon selected class found.
                if (optionTypeSelected.length > 0) {
					console.log("Tz Adobe Sign Firefox Extension - HtmlEventHandler() - Option type icon selected class found");
                    for (var i = 0; i <= optionDraw.length - 1; i++) {
                        if (optionDraw[i].className == "option draw") {
                            var event = mouseEvent("click", 0, 0, 0, 0);
                            DispatchEvent(optionDraw[i], event);
                        }
                    }
                }				
				else{					
					DispatchOptionImageIconSelected();
					DispatchOptionTypeIcon();
				}
            }
            else if (evt.target.className == "option draw selected" || evt.target.className == "icons draw-signature selected") {
				console.log("Tz Adobe Sign Firefox Extension - HtmlEventHandler() - Option draw icon selected");			
                OpenConnection();
            }
            else if (evt.target.className == "pull-right clear disabled") {
				var canvas;
				// Get placeholders from document.
				var nodeList = document.querySelectorAll('#placeholder-text','#placeholder-text');			
				for (var h = 0; h < nodeList.length; h++) 
				{
					//Get canvas object from document using placeholder.
					canvas = document.querySelectorAll('#placeholder-text','#placeholder-text')[h].parentElement.childNodes[2];
					//If canvas client width find
					if(canvas.clientWidth != 0)
					{
						if(window.parent.document.getElementById("fillsign") == null)
                          canvasObj = canvas;						
						//Clears the dispatch option draw icon timeout after canvas client width find.
						clearTimeout(clearOptDrawEmpty);								
						break;
					}					  							
				}
				//If canvas client width not find then calls DispatchOptionDrawIcon() until get canvas client width.
				if(canvas.clientWidth == 0)
					DispatchOptionDrawIcon();
				
                CalculateScalingFactors(0, 0);
            }
			//If option image icon selected.
			else if(evt.target.className == "option image selected"){
				   console.log("Tz Adobe Sign Firefox Extension - HtmlEventHandler() - Option image icon selected found");
					var optionImageSelected = document.getElementsByClassName('option image selected');
					var optionMobile = document.getElementsByClassName('option mobile');
					for (var i = 0; i < optionImageSelected.length; i++) {
						optionImageSelected[i].style.visibility = "hidden";
					}
					for (var i = 0; i < optionMobile.length; i++) {
						optionMobile[i].style.visibility = "hidden";
					}
              }
        }
    }
    catch (e) {
        console.log("Tz Adobe Sign Firefox Extension - HtmlEventHandler() failed: " + e.message);
    }
}


/*Show Status (success or error ) message on canvas*/
function ShowStatusMsg(status, msg) {
	
	console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() called");
	console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Status: " + status);
	
     var sigDivId;
	 var initDivId;
	 var signatureHidenDiv;
	 var initiaHidenDiv;

	try
	{ 
	statusMsg = status;
	if(window.parent.document.getElementById("fillsign") != null)
	{	  
	  hidenURL = 1;
	  var sigDiv = window.parent.document.createElement('div');
	  sigDiv.setAttribute("id", "sigDiv");
	  var initDiv = window.parent.document.createElement('div');
	  initDiv.setAttribute("id", "initDiv");
	   
	  sigDivId = window.parent.document.getElementById("fillsign").contentDocument.getElementById('sigDiv');
	  initDivId= window.parent.document.getElementById("fillsign").contentDocument.getElementById('initDiv');
	  
	   signatureHidenDiv = window.parent.document.getElementById("fillsign").contentDocument.getElementsByClassName('modal-dialog sign-panel signature nameEditable empty draw');
	  if(signatureHidenDiv.length > 0)
	  {
		  var i;
		  for(i = 0; i < signatureHidenDiv.length; i++)
		  {
			  if(evntClose == "btn btn-default cancel" || evntClose == "btn btn-secondary cancel")
			  {
				  signatureHidenDivId = null;
			  }
			  else
			  {
				  signatureHidenDivId = signatureHidenDiv[i].children[1].children[2].children[2].children[0].innerHTML;
			  }
		  }
	  }	 
	  initiaHidenDiv = window.parent.document.getElementById("fillsign").contentDocument.getElementsByClassName('modal-dialog sign-panel initials nameEditable empty draw');
	  if(initiaHidenDiv.length > 0)
	  {
		  var j;
		  for(j = 0; j < initiaHidenDiv.length; j++)
		  if(evntClose == "btn btn-default cancel" || evntClose == "btn btn-secondary cancel")
		  {
			  initialHidenDivId = null;
		  }
		  else
		  {
			  initialHidenDivId = initiaHidenDiv[j].children[1].children[2].children[2].children[0].innerHTML;
		  }
	  }	
	  var signatureDiv = window.parent.document.getElementById("fillsign").contentDocument.getElementsByClassName('modal-dialog sign-panel signature nameEditable draw');
	  var initialDiv = window.parent.document.getElementById("fillsign").contentDocument.getElementsByClassName('modal-dialog sign-panel initials nameEditable empty draw');
	  var msgDiv = window.parent.document.getElementById("fillsign").contentDocument.getElementsByClassName('modal-footer sign-panel-footer');	
	  var newDivId = window.parent.document.getElementById("fillsign").contentDocument.getElementById('msgDiv');
	}
	else
	{
    hidenURL = 2;
	var sigDiv = document.createElement('div');
	sigDiv.setAttribute("id", "sigDiv");
    var initDiv = document.createElement('div');
    initDiv.setAttribute("id", "initDiv");
	var sigDivId = document.getElementById('sigDiv');
	var initDivId = document.getElementById('initDiv');

    var signatureDiv = document.getElementsByClassName('modal-dialog sign-panel signature nameEditable draw');
	var initialDiv = document.getElementsByClassName('modal-dialog sign-panel initials nameEditable empty draw');
	var msgDiv = document.getElementsByClassName('modal-footer sign-panel-footer');
	var newDivId = document.getElementById('msgDiv');
	}
	if(sigDivId != null)
	 sigDivId.innerHTML = "";
	if(initDivId != null)
	 initDivId.innerHTML = "";
 
    var insertSigDiv;
	var insertInitDiv;
	if(msgDiv.length == 2)
	{
      insertInitDiv= msgDiv[1];
	  insertSigDiv= msgDiv[1];	  
	}
	else if(msgDiv.length == 3)
	{
		
	  if(initiaHidenDiv != null)
	  {
	  if(initiaHidenDiv.length == 1 && initialHidenDivId == null)	
	  {
		 insertInitDiv= msgDiv[1];
	     insertSigDiv= msgDiv[1];  
	  } 
	  else if (initiaHidenDiv.length == 2 && initialHidenDivId == null)
	  {
		 insertInitDiv= msgDiv[2];
		 insertSigDiv= msgDiv[2]; 
	  }
	   else if(signatureHidenDiv != null)
	  {
	   if(signatureHidenDiv.length == 1 && signatureHidenDivId == null)
	   {
		insertInitDiv= msgDiv[0];
	    insertSigDiv= msgDiv[0];	    
	   }
	   else if(signatureHidenDiv.length == 2 && signatureHidenDivId == null)
	   {
		 insertInitDiv= msgDiv[2];
	    insertSigDiv= msgDiv[2];  
	   }
	  }  
	} 
	 else
	  {
		insertInitDiv= msgDiv[2];
		insertSigDiv= msgDiv[2];	  
	  }	  
	}
	else if(msgDiv.length == 4)
	{
	  insertInitDiv= msgDiv[2];
	  insertSigDiv= msgDiv[2];	
	}
	else
	{
	  insertInitDiv= msgDiv[0];
	  insertSigDiv= msgDiv[0];	  
	}
	//If signature pad detected
	if(status == true)
	{	
		  console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Pad initialized, start signing.");
		  signatureDeviceConnectedText = document.createTextNode("Pad initialized, start signing.");
		  sigDiv.appendChild(signatureDeviceConnectedText);
		  sigDiv.style.color = "black";
		  sigDiv.style.fontWeight = "bold";
		  sigDiv.style.paddingLeft = "250px";
		  sigDiv.style.paddingBottom = "20px";
		  
		  initialDeviceConnectedText = document.createTextNode("Pad initialized, start signing.");
		  initDiv.appendChild(initialDeviceConnectedText);
		  initDiv.style.color = "black";
		  initDiv.style.fontWeight = "bold";
		  initDiv.style.paddingLeft = "250px";
		  initDiv.style.paddingBottom = "20px";										 
	}
	//If signature pad not detected
	else	
	{
		if(signatureHidenDiv != null || initiaHidenDiv != null)
		{
			if((evntClose != "btn btn-default cancel" && evntClose != "btn btn-secondary cancel") && evntApply != "btn btn-primary apply")
			{
			  console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Signature pad could not be initialized.");
			}
			signatureDeviceDisconnectedText = document.createTextNode("Signature pad could not be initialized.");
			sigDiv.appendChild(signatureDeviceDisconnectedText);
			sigDiv.style.color = "red";
			sigDiv.style.fontWeight = "bold";
			sigDiv.style.paddingLeft = "250px";
			sigDiv.style.paddingBottom = "20px";
			
			initialDeviceDisconnetedText = document.createTextNode("Signature pad could not be initialized.");
			initDiv.appendChild(initialDeviceDisconnetedText);
			initDiv.style.color = "red";
			initDiv.style.fontWeight = "bold";
			initDiv.style.paddingLeft = "250px";
			initDiv.style.paddingBottom = "20px";
	    }
	   else
	    {
		   if((evntClose != "btn btn-default cancel" && evntClose != "btn btn-secondary cancel") && evntApply != "btn btn-primary apply")
		   {
			  console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Signature pad could not be initialized.");
		   }
		   signatureDeviceDisconnectedText = document.createTextNode("Signature pad could not be initialized.");
		   sigDiv.appendChild(signatureDeviceDisconnectedText);
		   sigDiv.style.color = "red";
		   sigDiv.style.fontWeight = "bold";
		   sigDiv.style.paddingLeft = "250px";
		   sigDiv.style.paddingBottom = "20px";
		
		   initialDeviceDisconnetedText = document.createTextNode("Signature pad could not be initialized.");
		   initDiv.appendChild(initialDeviceDisconnetedText);
		   initDiv.style.color = "red";
		   initDiv.style.fontWeight = "bold";
		   initDiv.style.paddingLeft = "250px";
		   initDiv.style.paddingBottom = "20px";
	    }		
	}	  
	console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Canvas object width: " + canvasObj.clientWidth);
	
	//canvas clientWidth is 225 means initial field
	if(canvasObj.clientWidth == 225)
	{		  
		if(initDivId == null && hidenURL == 2 && (evntClose != "btn btn-default cancel" && evntClose != "btn btn-secondary cancel") && evntApply != "btn btn-primary apply")
		{	  
		  initDiv.classList.add("pull-left");
		   if(msgDiv.length == 2)
			  msgDiv[1].parentNode.insertBefore(initDiv, insertInitDiv.nextSibling);
			 else if(msgDiv.length == 3)
			  msgDiv[2].parentNode.insertBefore(initDiv, insertInitDiv.nextSibling);
			 else
			  msgDiv[0].parentNode.insertBefore(initDiv, insertInitDiv.nextSibling);
		
		  console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + msgDiv[0].innerText);
		
		  if((status == "false" && msg == " ") || msg == "Topaz Adobe Sign Extension SigCapture failed to start, may be another instance already running.")
		  {
			console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + msg);
			initDivId = document.getElementById('initDiv');
			if(initDivId != null)
			{
				initDivId.innerHTML = "Another instance of the application is already running.";
				initDivId.style.color = "black";
				initDivId.style.fontWeight = "bold";
				initDivId.style.paddingLeft = "200px";
			    initDivId.style.paddingBottom = "20px";						
				initDivId.style.fontSize = "15px";
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + initDivId.innerHTML);
			}
		  }	
	    }
		else if(initialHidenDivId == null && hidenURL == 1 && (evntClose != "btn btn-default cancel" && evntClose != "btn btn-secondary cancel") && evntApply != "btn btn-primary apply")
		{
		  if(initiaHidenDiv != null)
			{
			   if(initiaHidenDiv.length != 0)
			    {
				initDiv.classList.add("pull-left");
				if(msgDiv.length == 2)
				msgDiv[1].parentNode.insertBefore(initDiv, insertInitDiv.nextSibling);
				else if(msgDiv.length == 3)
				{
					if(initiaHidenDiv.length == 1 && initialHidenDivId == null)					
					 msgDiv[1].parentNode.insertBefore(initDiv, insertInitDiv.nextSibling);                                                                   
					else                                                      					
						msgDiv[2].parentNode.insertBefore(initDiv, insertInitDiv.nextSibling);                             			
				}
			    else if(msgDiv.length == 4)
					msgDiv[2].parentNode.insertBefore(initDiv, insertInitDiv.nextSibling);	
			    else
					msgDiv[0].parentNode.insertBefore(initDiv, insertInitDiv.nextSibling);
			   //
			    if((status == "false" && msg == " ") || msg == "Topaz Adobe Sign Extension SigCapture failed to start, may be another instance already running.")
				{
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + msg);
				initDivId = document.getElementById('initDiv');
				if(window.parent.document.getElementById("fillsign") != null)
				{
				    initDivId = window.parent.document.getElementById("fillsign").contentDocument.getElementById('initDiv');
				}
				if(initDivId != null)
				{
				initDivId.innerHTML = "Another instance of the application is already running.";
				initDivId.style.color = "black";
				initDivId.style.fontWeight = "bold";
				initDivId.style.paddingLeft = "200px";
				initDivId.style.paddingBottom = "20px";	
				initDivId.style.fontSize = "15px";
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + initDivId.innerHTML);
				}
			    }
				//				
			   }	
			}
		}			  
		else if(initDivId != null && status == true)
		{
			initDivId.innerHTML = "";
			initDivId.innerHTML = "Pad initialized, start signing.";
			initDivId.style.color = "black";
			initDivId.style.fontWeight = "bold";
			initDivId.style.paddingRight = "30px";	
			console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + initDivId.innerHTML);			
		}
			
		else
		{				
			if(((evntClose != "btn btn-default cancel" && evntClose != "btn btn-secondary cancel") && msg == " " && status == "false" && evntClose.length != 0) || msg == "Topaz Adobe Sign Extension SigCapture failed to start, may be another instance already running.")
			{
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + msg);
				initDivId = document.getElementById('initDiv');
				if(window.parent.document.getElementById("fillsign") != null)
				{
				    initDivId = window.parent.document.getElementById("fillsign").contentDocument.getElementById('initDiv');
				}
				if(initDivId != null)
				{
				initDivId.innerHTML = "Another instance of the application is already running.";
				initDivId.style.color = "black";
				initDivId.style.fontWeight = "bold";
				initDivId.style.paddingLeft = "200px";
				initDivId.style.paddingBottom = "20px";	
                initDivId.style.fontSize = "15px";
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + initDivId.innerHTML);
				}
			}
			
			else if(evntApply != "btn btn-primary apply" && msg == " " && status == "false" && evntApply.length != 0)
			{
				initDivId = document.getElementById('initDiv');
				if(window.parent.document.getElementById("fillsign") != null)
				 {
				    initDivId = window.parent.document.getElementById("fillsign").contentDocument.getElementById('initDiv');
				 }
				if(initDivId != null)
				{
				initDivId.innerHTML = "Another instance of the application is already running.";
				initDivId.style.color = "black";
				initDivId.style.fontWeight = "bold";
				initDivId.style.paddingLeft = "200px";
				initDivId.style.paddingBottom = "20px";		
                initDivId.style.fontSize = "15px";	
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + initDivId.innerHTML);
				}
			}
			else if(status == false || msg != " ")
			{
				initDivId = document.getElementById('initDiv');
				if(window.parent.document.getElementById("fillsign") != null)
				{
				  initDivId = window.parent.document.getElementById("fillsign").contentDocument.getElementById('initDiv');
				}
			    if(initDivId != null)
			    {
			    initDivId.innerHTML = ""; 
				initDivId.innerHTML = "Signature pad could not be initialized.";
				initDivId.style.color = "red";
		        initDivId.style.fontWeight = "bold";
		        initDivId.style.paddingLeft = "250px";
				initDivId.style.paddingBottom = "20px";
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + initDivId.innerHTML);
				}
			}
	    }		
	}
	//canvas clientWidth is 700 means signature field
	else
	{		  
		if(sigDivId == null && hidenURL == 2 && (evntClose != "btn btn-default cancel" && evntClose != "btn btn-secondary cancel") && evntApply != "btn btn-primary apply")
		{  
			sigDiv.classList.add("pull-left");
			if(msgDiv.length == 2)
			  msgDiv[1].parentNode.insertBefore(sigDiv, insertSigDiv.nextSibling); 

            else if(msgDiv.length == 3)                                                          
              msgDiv[2].parentNode.insertBefore(sigDiv, insertSigDiv.nextSibling);

            else
			  msgDiv[0].parentNode.insertBefore(sigDiv, insertSigDiv.nextSibling);
		
		   console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + msgDiv[0].innerText);
		
		    if((status == "false" && msg == " ") || msg == "Topaz Adobe Sign Extension SigCapture failed to start, may be another instance already running.")
				{
				sigDivId = document.getElementById('sigDiv');
				if(sigDivId != null)
				{
				sigDivId.innerHTML = "Another instance of the application is already running.";
                sigDivId.style.color = "black";
				sigDivId.style.fontWeight = "bold";
				sigDivId.style.paddingRight = "30px"; 	
				sigDivId.style.paddingLeft = "200px";
				sigDivId.style.paddingBottom = "20px";	
				sigDivId.style.fontSize = "15px";
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + sigDivId.innerHTML);
				}
			}
		}
		else if(signatureHidenDivId == null && hidenURL == 1 && (evntClose != "btn btn-default cancel" && evntClose != "btn btn-secondary cancel") && evntApply != "btn btn-primary apply")
		{
		    if(signatureHidenDiv != null)
			{
			   if(signatureHidenDiv.length != 0)
			   {
			    sigDiv.classList.add("pull-left");
				if(msgDiv.length == 2)
				{
				 if(signatureHidenDiv.length == 1)	
				 {
					msgDiv[1].parentNode.insertBefore(sigDiv, insertSigDiv.nextSibling);
				 }
				 else
				 {
				    msgDiv[0].parentNode.insertBefore(sigDiv, insertSigDiv.nextSibling);
				 }
				}
				else if(msgDiv.length == 3)
				{
				 if(signatureHidenDiv.length == 1)	
				 {
				  msgDiv[0].parentNode.insertBefore(sigDiv, insertSigDiv.nextSibling);
				 }
				 else
				 {
				  msgDiv[2].parentNode.insertBefore(sigDiv, insertSigDiv.nextSibling);
				 }
			    }
			   else if(msgDiv.length == 4)
					msgDiv[2].parentNode.insertBefore(sigDiv, insertSigDiv.nextSibling);
				else
					msgDiv[0].parentNode.insertBefore(sigDiv, insertSigDiv.nextSibling);
			    if((status == "false" && msg == " ") || msg == "Topaz Adobe Sign Extension SigCapture failed to start, may be another instance already running.")
				{
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + msg);
				sigDivId = document.getElementById('sigDiv');
				if(window.parent.document.getElementById("fillsign") != null)
				{
				sigDivId = window.parent.document.getElementById("fillsign").contentDocument.getElementById('sigDiv');
				}
				if(sigDivId != null)
				{
				sigDivId.innerHTML = "Another instance of the application is already running.";
                sigDivId.style.color = "black";
				sigDivId.style.fontWeight = "bold";
				sigDivId.style.paddingLeft = "200px";
				sigDivId.style.paddingBottom = "20px";	
				sigDivId.style.fontSize = "15px";
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + sigDivId.innerHTML);
				}
			    }
			   }
			}
		}
		else if(sigDivId != null && status == true)
		{
			sigDivId.innerHTML ="";
			sigDivId.innerHTML = "Pad initialized, start signing.";
            sigDivId.style.color = "black";
		    sigDivId.style.fontWeight = "bold";
			sigDivId.style.paddingLeft = "250px";
			sigDivId.style.paddingBottom = "20px"; 
			console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + sigDivId.innerHTML);
		}			  
		else
		{				
			if(((evntClose != "btn btn-default cancel" && evntClose != "btn btn-secondary cancel") && msg == " " && status == "false" && evntClose.length != 0) || msg == "Topaz Adobe Sign Extension SigCapture failed to start, may be another instance already running.")
			{
				sigDivId = document.getElementById('sigDiv');
				if(window.parent.document.getElementById("fillsign") != null)
				{
				sigDivId = window.parent.document.getElementById("fillsign").contentDocument.getElementById('sigDiv');
				}
				if(sigDivId != null)
				{
				sigDivId.innerHTML = "Another instance of the application is already running.";
                sigDivId.style.color = "black";
				sigDivId.style.fontWeight = "bold";
				sigDivId.style.paddingLeft = "200px";
				sigDivId.style.paddingBottom = "20px"; 
				sigDivId.style.fontSize = "15px";
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + sigDivId.innerHTML);
				}
			}
			else if(evntApply != "btn btn-primary apply" && msg == " " && status == "false" && evntApply.length != 0)
			{
				sigDivId = document.getElementById('sigDiv');
				if(window.parent.document.getElementById("fillsign") != null)
				{
				sigDivId = window.parent.document.getElementById("fillsign").contentDocument.getElementById('sigDiv');
				}
				if(sigDivId != null)
				{
				sigDivId.innerHTML = "Another instance of the application is already running.";
                sigDivId.style.color = "black";
				sigDivId.style.fontWeight = "bold";
				sigDivId.style.paddingLeft = "200px";
				sigDivId.style.paddingBottom = "20px"; 
				sigDivId.style.fontSize = "15px";
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + sigDivId.innerHTML);
				}
			}
			else if(status == false || msg != " ")
			{
				sigDivId = window.parent.document.getElementById('sigDiv')
				if(window.parent.document.getElementById("fillsign") != null)
				{
				sigDivId = window.parent.document.getElementById("fillsign").contentDocument.getElementById('sigDiv');
				}
				if(sigDivId != null)
				{
			    sigDivId.innerHTML = "";
				sigDivId.innerHTML = "Signature pad could not be initialized.";
				sigDivId.style.color = "red";
		        sigDivId.style.fontWeight = "bold";
		       sigDivId.style.paddingLeft = "250px";
				sigDivId.style.paddingBottom = "20px";																							 
				console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() - Message: " + sigDivId.innerHTML);
				}
			 } 
		  }			
	   }	 
	}
	catch (e) {
        console.log("Tz Adobe Sign Firefox Extension - ShowStatusMsg() failed: " + e.message);
    }
}
/* Generates GUID */
function GenerateUUID() {
	console.log("Tz Adobe Sign Firefox Extension - Generates GUID");
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

/* Opens the Connection with NMH */
function OpenConnection() {
 
    console.log("Tz Adobe Sign Firefox Extension - OpenConnection() called."); 
	DispatchOptionDraw();
    DisableHideSaveSignature();

    var optionType = document.getElementsByClassName('option type');
    var optionImage = document.getElementsByClassName('option image');
	var optionMobile = document.getElementsByClassName('option mobile');
	
	// Hides option type icon.
    for (var i = 0; i < optionType.length; i++) {
		console.log("Tz Adobe Sign Firefox Extension - OpenConnection() - Option type icon hidden."); 
        optionType[i].style.visibility = "hidden";
    }
	//Hides option image icon.
    for (var i = 0; i < optionImage.length; i++) {
		console.log("Tz Adobe Sign Firefox Extension - OpenConnection() - Option image icon hidden."); 
        optionImage[i].style.visibility = "hidden";
    }
	//Hides option mobile icon.
	for (var i = 0; i < optionMobile.length; i++) {
		//To remove tooltip of mobile icon if tooltip displays.
		if(optionMobile[i].nextSibling != null)
		{
		   optionMobile[i].nextSibling.remove();
		}
		console.log("Tz Adobe Sign Firefox Extension - OpenConnection() - Option mobile icon hidden."); 
        optionMobile[i].style.visibility = "hidden";
    }
	
    var siteURL = (document.URL);
    var bodyClass = document.getElementsByClassName('modal-open');
    if (bodyClass.length > 0 || isKeyPress == true) {       
        isKeyPress = false;
		
		var canvas;        
		// Get placeholders from document.
		var nodeList = document.querySelectorAll('#placeholder-text','#placeholder-text');			
		for (var h = 0; h < nodeList.length; h++) 
		{
			//Get canvas object from document using placeholder.
			canvas = document.querySelectorAll('#placeholder-text','#placeholder-text')[h].parentElement.childNodes[2];
			//If canvas client width find			
			if(canvas.clientWidth != 0)
			{
				console.log("Tz Adobe Sign Firefox Extension - OpenConnection() - canvas client width: " + canvas.clientWidth);
				if(window.parent.document.getElementById("fillsign") == null)
				{
					canvasObj = canvas;
				}
				//Clears the dispatch option draw icon timeout after canvas client width find.
				clearTimeout(clearOptDrawEmpty);								
				break;
			}			  							
		}
		//If canvas client width not find then calls DispatchOptionDrawIcon() until get canvas client width.
		if(canvas.clientWidth == 0)
			DispatchOptionDrawIcon();
		
		//If canvas width find then send request to background extension.
		if(canvas.clientWidth >0)
		{
        var siteURL = (document.URL);
        chrome.runtime.sendMessage({ type: 'request_open', siteUrl: siteURL, GUID: guid },
						function(response) {
						   // alert(response);
						   console.log("Tz Adobe Sign Firefox Extension - OpenConnection() - Send message to background extension." );
						});
		}
    }
}
/* Disable and Hide SaveSiganture feature */
function DisableHideSaveSignature() {
    var checkBox = document.getElementsByClassName('save-signature pull-left');
    var msgLabel = document.getElementsByClassName('save-signature-label pull-left');
    for (var i = 0; i < msgLabel.length; i++) {
        msgLabel[i].style.visibility = "hidden";
    }
    for (var i = 0; i < checkBox.length; i++) {
        checkBox[i].Checked = false;
        checkBox[i].style.visibility = "hidden";
        checkBox[i].disabled = true;
		console.log("Tz Adobe Sign Firefox Extension - DisableHideSaveSignature() - Save check box hidden."); 
    }
}
/*Clears the Status Message*/
function ClearStatusMsg() {	
    var msgDiv = document.getElementsByClassName('save-signature-wrapper clearfix');
    for (var i = 0; i < msgDiv.length; i++) {
        msgDiv[i].textContent = "";
		console.log("Tz Adobe Sign Firefox Extension - ClearStatusMsg() - Clears status message."); 
    }
}

/* Closes the Connection*/
function CloseConnection() {
    var siteURL = (document.URL);
	console.log("Tz Adobe Sign Firefox Extension - CloseConnection() - Send close request to background extension.");
	chrome.runtime.sendMessage({ type: 'request_close', siteUrl: siteURL, GUID: guid },
                    function(response) {						
                       // alert(response);
                    });    
}

/* Raising Custom Mouse Events */
function mouseEvent(type, sx, sy, cx, cy) {
    var evt;
    if (typeof (document.createEvent) == "function") {
		  evt = new MouseEvent(type, { bubbles: true, 
		 cancelable: (type != "mousemove"), view: window, detail:0,  screenX: sx, screenY: sy,
         clientX: cx,
         clientY: cy,
         ctrlKey: false,
         altKey: false,
         shiftKey: false,
         metaKey: false,
         button: 0, buttons:1, relatedTarget: document.body.parentNode }); 		           				  
    }
    return evt;
}
/* Method to dispatch an event */
function DispatchEvent(el, evt) {
    if (el.dispatchEvent) {
        el.dispatchEvent(evt);
    }
    else if (el.fireEvent) {
        el.fireEvent('on' + type, evt);
    }
    return evt;
}
/* Method to get option image selected */
function DispatchOptionImageIconSelected()
{
	console.log("Tz Adobe Sign Firefox Extension - DispatchOptionImageIconSelected() called."); 
	var optionImageSelected = document.getElementsByClassName('option image selected');
	console.log("Tz Adobe Sign Firefox Extension - DispatchOptionImageIconSelected() - Option image icon class length: " + optionImageSelected.length);
	setTimeout(function waitImageSelected() {	
					if (optionImageSelected.length>0) {				
							 for (var i = 0; i <= optionImageSelected.length - 1; i++) {
                          if (optionImageSelected[i].className == "option image selected") {
							console.log("Tz Adobe Sign Firefox Extension - DispatchOptionImageIconSelected() - Option image icon class name: " + optionImageSelected[i].className); 
                            var event = mouseEvent("click", 0, 0, 0, 0);
                            DispatchEvent(optionImageSelected[i], event);
                         }
                       }
					} 
					else {
						setTimeout(waitImageSelected, 5);
					}
			}, 5);
}
/* Method to get option type icon using mouse click event.*/
function DispatchOptionTypeIcon()
{
	console.log("Tz Adobe Sign Firefox Extension - DispatchOptionTypeIcon() called."); 
	var optionType = document.getElementsByClassName('option type selected');
	console.log("Tz Adobe Sign Firefox Extension - Option type icon selected class length: " + optionType.length); 
	var optionDraw = document.getElementsByClassName('option draw');	
	
	setTimeout(function waitOptType() {
		 if (optionType.length > 0 || (optionDraw.length > 0 && (evntClose != "btn btn-default cancel" && evntClose != "btn btn-secondary cancel") && evntApply != "btn btn-primary apply")) {	
						for (var i = 0; i <= optionDraw.length - 1; i++) {
                          if (optionDraw[i].className == "option draw" || optionDraw[i].className == "option draw selected") {
							console.log("Tz Adobe Sign Firefox Extension - DispatchOptionTypeIcon() - Option draw icon class name: " + optionDraw[i].className);   
                            var event = mouseEvent("click", 0, 0, 0, 0);
                            DispatchEvent(optionDraw[i], event);
                        }
                      }
					}
			else {
				  setTimeout(waitOptType, 5);
				}
		}, 5);
}
/* Method to identify option draw class*/
function DispatchOptionDraw()
{
	    console.log("Tz Adobe Sign Firefox Extension - DispatchOptionDraw() called."); 			
        var optionDraw = document.getElementsByClassName('option draw');	
        setTimeout(function waitOptionDraw() {		
			   if(optionDraw != null)  {				
					for (var i = 0; i <= optionDraw.length - 1; i++) {
                        if (optionDraw[i].className == "option draw") {
							console.log("Tz Adobe Sign Firefox Extension - DispatchOptionDraw() - Option draw icon class name: "+  optionDraw[i].className); 
                            var event = mouseEvent("click", 0, 0, 0, 0);
                            DispatchEvent(optionDraw[i], event);
                        }
                    }
                   if(statusMsg==false)
					{
					  ShowStatusMsg(statusMsg, null);
					}
				  }
			  else {
				     setTimeout(waitOptionDraw, 5);
				   }
			}, 5);
}
/* Method to dispatch option draw icon using mouse click event */
function DispatchOptionDrawIcon()
{	
	console.log("Tz Adobe Sign Firefox Extension - DispatchOptionDrawIcon() called."); 
	var optionDraw = document.getElementsByClassName('option draw');
	console.log("Tz Adobe Sign Firefox Extension - DispatchOptionDrawIcon() - Option draw icon class length: " + optionDraw.length); 
	
	clearOptDrawEmpty = setTimeout(function waitOptDrawEmpty() {	
		if (optionDraw != null) {			
			for (var i = 0; i <= optionDraw.length - 1; i++) {
                if (optionDraw[i].className == "option draw" || optionDraw[i].className == "option draw selected") {
					console.log("Tz Adobe Sign Firefox Extension - DispatchOptionDrawIcon() - Option draw icon class name:" + optionDraw[i].className); 
                    var event = mouseEvent("click", 0, 0, 0, 0);
                    DispatchEvent(optionDraw[i], event);
					connectionSuccess = true;
					break;
                  }
                }
				if(connectionSuccess == false)
				{
					console.log("Tz Adobe Sign Firefox Extension - DispatchOptionDrawIcon() - Open connection called"); 
					OpenConnection();
				}
			}								
	}, 5);
}

	