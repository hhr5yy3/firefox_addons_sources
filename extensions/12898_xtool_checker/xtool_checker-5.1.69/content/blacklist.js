
function UpdateList()
{
	var theList = document.getElementById('domains_list');
	chrome.extension.sendMessage({action : "GetBlackList"},
	 function(response) { 
		
		if (response)
		{
			theList.options.length = 0;
			for (var i = 0; i < response.length; i++)
			{
				var domain = response[i];
				var optNew = document.createElement('option');
				optNew.text = domain;
				optNew.value = domain;
				theList.add( optNew, null );
				//theVal.value = domain;
			}
		}
	});
	/*var db = openDatabase("xtool_checker", "0.1", "Xtool checker db", 200000);
	var theList = document.getElementById('domains_list');
	if (db)
	{
		db.transaction(function(tx) {
		tx.executeSql("SELECT domain FROM gbl_list ORDER BY domain", [], function(tx, result) {
			
			if (result.rows.length >= 1)
			{
				for (var i = 0; i < result.rows.length; i++)
				{
					var domain = result.rows.item(i).domain;
					theList.add( domain, null );
				}
				
			}
			
		}, null)}); 
	}*/
	/*var statement = _mDBConn.createStatement("SELECT domain FROM gbl_list ORDER BY domain;");
	var theList = document.getElementById('domains_list');
	for(var i = theList.getRowCount() - 1; i >= 0; --i) {
		theList.removeItemAt(i);
	}

	
	while (statement.executeStep())
	{
		var tmpStr = statement.getString(0);

		theList.appendItem( tmpStr, tmpStr )

	
	}
	
	statement.reset();
	statement.finalize();*/
}

function addToList()
{
	var domain = document.getElementById('domainValue').value;
	domain = domain.trim();
	if (domain == "")
	{
		alert("Введите название домена.");
		return;
	}
	var domains = [];
	domains.push(domain);
	chrome.extension.sendMessage({action : "AddToBlackList", values: domains});
	var theList = document.getElementById('domains_list');
	var optNew = document.createElement('option');
	optNew.text = domain;
	optNew.value = domain;
	theList.add( optNew, null );
	
}

function getSelectValues(select) 
{
	var result = [];
	var options = select && select.options;

	var opt;
	for (var i=0; i < options.length; i++) 
	{ 
		opt = options[i];

		if (opt.selected) 
		{
			result.push(opt.value);
		}
	}
	return result;
}

function removeSelected()
{
	var list = document.getElementById('domains_list');
	var toRemove = getSelectValues(list);
	if (toRemove.length > 0)
		chrome.extension.sendMessage({action : "RemoveFromBlackList", values: toRemove});
	UpdateList();
}



function addList()
{
	console.log(document.getElementById("add_list").value);
	
	UpdateList();
}

function doOK()
{
	close();	
}
/*
function doCancel()
{
	close();
	return true;
}
*/
function selectionChanged(event)
{
	var theList = document.getElementById('domains_list');
	document.getElementById('delete_sel').disabled = (theList.selectedCount == 0);
}

window.onload = function() 
{ 
	document.getElementById("applyButton").addEventListener("click", doOK);
//	document.getElementById("cancelButton").addEventListener("click", doCancel);
	document.getElementById("delete_sel").addEventListener("click", removeSelected);
	//document.getElementById("add_list_button").addEventListener("click", addList);
	
	document.getElementById("addToList").addEventListener("click", addToList);
	document.getElementById("domains_list").addEventListener("change", selectionChanged);
	
	UpdateList();
};
