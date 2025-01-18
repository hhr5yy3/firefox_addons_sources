function eventOK() 
{


  if(document.getElementById("enable_blocking").checked == 1)
     localStorage["enable_blocking"] = 1;
  else  localStorage["enable_blocking"] = 0;
  
  window.close();
  
}


function eventLoad()
{
  var enable_blocking = localStorage["enable_blocking"];

 if(enable_blocking == 1)  document.getElementById("enable_blocking").checked = 1;
 else document.getElementById("disable_blocking").checked = 1;
 
 
 

  
}



document.getElementById('buttonOK0').onclick = eventOK;

window.onload = eventLoad; 



