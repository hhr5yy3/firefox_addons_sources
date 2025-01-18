

function doOK()
{
	localStorage["bc_check_words"] = document.getElementById("bc_check_words").value;
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
/*	var text = ""; 
	if (localStorage["bc_check_words"] !== undefined)
		text = localStorage["bc_check_words"];
	document.getElementById("bc_check_words").value = text;*/
};
