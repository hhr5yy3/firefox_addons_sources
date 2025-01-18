
function tableDoneKeept(){
	if(document.getElementById('tableInput').value != "" || document.getElementById('tableInput').value != null){
	var linkCheck  = [];
	linkCheck.push("Previous Searched Item : "+ document.getElementById('tableInput').value);
   console.log(linkCheck)

	localStorage.setItem('tableInput', linkCheck);	
}
}

document.getElementById('tableInput').addEventListener('input',tableDoneKeept);



function tableDoneKeept(){
var text = document.getElementById("tableFound");
var tablesSelected = text.value.substr(text.selectionStart,text.selectionEnd-text.selectionStart);
console.log(tablesSelected)	
var text = document.getElementById('tableSelected').value + "|";
var finalTab = text + tablesSelected;	
var formatText  = finalTab.replace("||", "|");

console.log("SAVE " + formatText)
localStorage.setItem('tableSelected', formatText);	

}
document.getElementById('tableFound').addEventListener('click',tableDoneKeept);

function clearTableSelect(){
	
localStorage.setItem('tableSelected', "");		
}

document.getElementById('tableDetailsClear').addEventListener('click',clearTableSelect);
