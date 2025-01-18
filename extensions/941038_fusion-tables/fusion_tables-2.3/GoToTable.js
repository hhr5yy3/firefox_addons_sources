function goTable(){
var text = document.getElementById("tableFound");
var tablesSelected = text.value.substr(text.selectionStart,text.selectionEnd-text.selectionStart);
console.log(tablesSelected)	
var text = document.getElementById('tableSelected').value + "|";
var finalTab = text + tablesSelected;	
var formatText  = finalTab.replace("||", "|");


document.getElementById('tableSelected').value = formatText

}

document.getElementById('tableFound').addEventListener('click', goTable);

function clear(){
document.getElementById('tableSelected').value = "";	
	
}


document.getElementById('tableDetailsClear').addEventListener('click',clear);