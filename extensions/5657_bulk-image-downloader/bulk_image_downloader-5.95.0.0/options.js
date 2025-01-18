
// Saves options to localStorage.
function save_options() {
/*
  var select = document.getElementById("color");
  var color = select.children[select.selectedIndex].value;
  localStorage["favorite_color"] = color;
*/
  var select = document.getElementById("bid");
  localStorage["bid"] = select.checked;
  
  select = document.getElementById("bidqueue");
  localStorage["bidqueue"] = select.checked;
  
  select = document.getElementById("bidle");
  localStorage["bidle"] = select.checked;  
  
  select = document.getElementById("cmbid");
  localStorage["cmbid"] = select.checked;
  
  select = document.getElementById("cmbidqueue");
  localStorage["cmbidqueue"] = select.checked;
  
  select = document.getElementById("cmbidle");
  localStorage["cmbidle"] = select.checked;  

  select = document.getElementById("cmbidlink");
  localStorage["cmbidlink"] = select.checked;
  
  select = document.getElementById("cmbidlinkqueue");
  localStorage["cmbidlinkqueue"] = select.checked;
  
  select = document.getElementById("cmbidkeys");
  localStorage["cmbidkeys"] = select.checked;
   
  alert( "Options saved. If you changed the context menu options then please close and restart FireFox to apply the changes." );
    
}

function toBool(str)
{
   if ("false" === str)
      return false;
   else 
      return str;
}

// Restores select box state to saved value from localStorage.
function restore_options() {

  // note that localStorage saves booleans as strings "true" or "false"
  
  var bid = localStorage["bid"];
  if (!bid) { bid="true" };
  var bidqueue = localStorage["bidqueue"];
  if (!bidqueue) { bidqueue="true" };
  var bidle = localStorage["bidle"];
  if (!bidle) { bidle="true" };

  var cmbid = localStorage["cmbid"];
  if (!cmbid) { cmbid="true" };
  var cmbidqueue = localStorage["cmbidqueue"];
  if (!cmbidqueue) { cmbidqueue="true" };
  var cmbidle = localStorage["cmbidle"];
  if (!cmbidle) { cmbidle="true" };
  var cmbidlink = localStorage["cmbidlink"];
  if (!cmbidlink) { cmbidlink="true" };
  var cmbidlinkqueue = localStorage["cmbidlinkqueue"];
  if (!cmbidlinkqueue) { cmbidlinkqueue="true" };
  
  var cmbidkeys = localStorage["cmbidkeys"];
  if (!cmbidkeys) { cmbidkeys="true" };
  

  var select = document.getElementById("bid");
  select.checked = toBool(bid);
  
  select = document.getElementById("bidqueue");
  select.checked = toBool(bidqueue);
  
  select = document.getElementById("bidle");
  select.checked = toBool(bidle);

  select = document.getElementById("cmbid");
  select.checked = toBool(cmbid);
  
  select = document.getElementById("cmbidqueue");
  select.checked = toBool(cmbidqueue);
  
  select = document.getElementById("cmbidle");
  select.checked = toBool(cmbidle);

  select = document.getElementById("cmbidlink");
  select.checked = toBool(cmbidlink);
  
  select = document.getElementById("cmbidlinkqueue");
  select.checked = toBool(cmbidlinkqueue);
  
  select = document.getElementById("cmbidkeys");
  select.checked = toBool(cmbidkeys);
  
  
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
