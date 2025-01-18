
function doOK()
{
	localStorage["stop_words"] = document.getElementById("stop_words").value;
	close();	
}

function doCancel()
{
	close();
	return true;
}


window.onload = function() 
{ 
	document.getElementById("applyButton").addEventListener("click", doOK);
	document.getElementById("cancelButton").addEventListener("click", doCancel);
	var text = ""; 
	if (localStorage["stop_words"] !== undefined)
		text = localStorage["stop_words"];
	document.getElementById("stop_words").value = text;
};
