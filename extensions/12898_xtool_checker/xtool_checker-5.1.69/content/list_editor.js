

function doOK()
{
	var list = [];
	try{
	
	var text = document.getElementById("textLines").value;
	var tmp = text.split("\n");
	for (var i = 0; i < tmp.length; i++)
	{
		tmp[i] = tmp[i].replace(/^\s+|\s+$/g, '');
		if (tmp[i] != "")
			list.push(tmp[i]);
	}
	}
	catch(e)
	{
		console.log(e);
	}
	if (list.length > 0)
		browser.runtime.sendMessage({action : "CustomPageLinks", values: list});
	close();
}

function doCancel()
{
	close();
}

window.onload = function() 
{ 
	document.getElementById("applyButton").addEventListener("click", doOK);
	document.getElementById("cancelButton").addEventListener("click", doCancel);

};
