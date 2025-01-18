// Saves options to localStorage.
function save_options() {
	localStorage["removeTab"] = document.getElementById("removeTab").checked;
//	console.log("localStorage_removeTab saved as "+ localStorage["removeTab"]);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	doRemoveTab = localStorage["removeTab"];
 	//console.log("Restoring removeTab to "+ doRemoveTab);
	if(doRemoveTab=="true"){ // setting checked = doRemoveTab does not work!
		document.getElementById("removeTab").checked = true;
		//console.log("removeTab restored to true");
	}
	else{
		document.getElementById("removeTab").checked = false;
		//console.log("removeTab restored to false");
	}
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#removeTab').addEventListener('click', save_options);