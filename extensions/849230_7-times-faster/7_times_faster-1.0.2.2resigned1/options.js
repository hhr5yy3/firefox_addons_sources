

function showWhiteListedPages()
{
    document.getElementById('tablePrint').innerHTML="";
      var oWhiteListPages = {};
      var oWlp=localStorage["whiteListPages"];  

      if ("undefined" === typeof oWlp) 
      {
          //console.log("variable is undefined. oWlp");
  ////////////////////////////empty or error
      }
      else
      {
        oWhiteListPages=JSON.parse(oWlp); 
      }

      /*var myTable= "<table><tr><td style='width: 300px; color: red;'>Whitelisted pages</td>";
      myTable+= "<td style='width: 100px; color: red;'>Option</td>";
      myTable+="</tr>";   

      var btnDelete1="<button class='classBtnDelete' ";
      var btnDelete3=" >Delete</button>";


      for (var key in oWhiteListPages) 
      {
          if(key=="" || key=="1") continue;
 
        myTable+="<tr><td style='width: 300px;'>" + key + "</td>";       
        myTable+="<td style='width: 100px;'>" +btnDelete1+" data-link='"+key+"'"+btnDelete3 + "</td>";
        myTable+="</tr>"; 
      }
      myTable+="</table>";

      document.getElementById('tablePrint').innerHTML = myTable;*/

       var tablePrint = document.getElementById('tablePrint');
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");

      //head row
          var rowHead = document.createElement("tr");
     
          var cellHead = document.createElement("td");
          
          cellHead.style.width="300px";
          cellHead.style.color="red";

          var cellTextHead = document.createTextNode("Whitelisted pages");
          cellHead.appendChild(cellTextHead);
          rowHead.appendChild(cellHead);


          var cellHeadOption = document.createElement("td");
          cellHeadOption.style.color="red";
          var cellTextHeadOption = document.createTextNode("Option");
          cellHeadOption.appendChild(cellTextHeadOption);
          rowHead.appendChild(cellHeadOption);


          tblBody.appendChild(rowHead);

       // creating all cells
      for (var key in oWhiteListPages) 
      {
        if(key=="" || key=="1") continue;
        // creates a table row
         var row = document.createElement("tr");
     
          var cell = document.createElement("td");
          var cellText = document.createTextNode(key);
          cell.appendChild(cellText);
          row.appendChild(cell);


          var cellBtn = document.createElement("button");          
          cellBtn.setAttribute("class", "classBtnDelete");
          cellBtn.setAttribute("data-link", key);          
          var cellBtnText = document.createTextNode("Delete");
          cellBtn.appendChild(cellBtnText);


          var cellContainer = document.createElement("td");
          
          cellContainer.appendChild(cellBtn);
          row.appendChild(cellContainer);
     
        tblBody.appendChild(row);
      }

        // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      // appends <table> into <body>
      tablePrint.appendChild(tbl);

      var classname = document.getElementsByClassName("classBtnDelete");

      var myFunction = function() 
      {
          var attribute = this.getAttribute("data-link");
          if(attribute==null || attribute=="")
          {
              alert("data-link attribute is empty");
             return;
          }

          var dWhiteListPages = {};
          var dWlp=localStorage["whiteListPages"];  

          if ("undefined" === typeof dWlp) 
          {
              //console.log("variable is undefined. dWlp");
      ////////////////////////////empty or error
          }
          else
          {
            dWhiteListPages=JSON.parse(dWlp); 

            delete dWhiteListPages[attribute];

            localStorage["whiteListPages"]=JSON.stringify(dWhiteListPages);  
            showWhiteListedPages();
            document.getElementById('divMessages').innerHTML = "After made changes, please, refresh the page (not options page!) where you want to use this extension, or better open the new tab.";
            chrome.runtime.sendMessage({greeting: "reloadwhitelistedpages"});
            //console.log("options send reloadwhitelistedpages to background");
          }
      };

      for (var i = 0; i < classname.length; i++) 
      {
          classname[i].addEventListener('click', myFunction, false);
      }
}

function showWhiteListedDomains()
{
    document.getElementById('tablePrint').innerHTML="";
      var oWhiteListDomains = {};
      var oWld=localStorage["whiteListDomains"];  

      if ("undefined" === typeof oWld) 
      {
          //console.log("variable is undefined. oWld");
  ////////////////////////////empty or error
      }
      else
      {
        oWhiteListDomains=JSON.parse(oWld); 
      }

      /*var myTable= "<table><tr><td style='width: 300px; color: red;'>Whitelisted domains</td>";
      myTable+= "<td style='width: 100px; color: red;'>Option</td>";
      myTable+="</tr>";    

      var btnDelete1="<button class='classBtnDeleteDomain' ";
      var btnDelete3=" >Delete</button>";


      for (var key in oWhiteListDomains) 
      {
          if(key=="" || key=="1") continue;
        
        myTable+="<tr><td style='width: 300px;'>" + key + "</td>";       
        myTable+="<td style='width: 100px;'>" +btnDelete1+" data-link='"+key+"'"+btnDelete3 + "</td>";
        myTable+="</tr>"; 
      }
      myTable+="</table>";

      document.getElementById('tablePrint').innerHTML = myTable;*/

      var tablePrint = document.getElementById('tablePrint');
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");

      //head row
          var rowHead = document.createElement("tr");
     
          var cellHead = document.createElement("td");
          
          cellHead.style.width="300px";
          cellHead.style.color="red";

          var cellTextHead = document.createTextNode("Whitelisted domains");
          cellHead.appendChild(cellTextHead);
          rowHead.appendChild(cellHead);


          var cellHeadOption = document.createElement("td");
          cellHeadOption.style.color="red";
          var cellTextHeadOption = document.createTextNode("Option");
          cellHeadOption.appendChild(cellTextHeadOption);
          rowHead.appendChild(cellHeadOption);


          tblBody.appendChild(rowHead);

       // creating all cells
      for (var key in oWhiteListDomains) 
      {
        if(key=="" || key=="1") continue;
        // creates a table row
         var row = document.createElement("tr");
     
          var cell = document.createElement("td");
          var cellText = document.createTextNode(key);
          cell.appendChild(cellText);
          row.appendChild(cell);


          var cellBtn = document.createElement("button");          
          cellBtn.setAttribute("class", "classBtnDeleteDomain");
          cellBtn.setAttribute("data-link", key);          
          var cellBtnText = document.createTextNode("Delete");
          cellBtn.appendChild(cellBtnText);


          var cellContainer = document.createElement("td");
          
          cellContainer.appendChild(cellBtn);
          row.appendChild(cellContainer);
     
        tblBody.appendChild(row);
      }

        // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      // appends <table> into <body>
      tablePrint.appendChild(tbl);





      var classname = document.getElementsByClassName("classBtnDeleteDomain");

      var myFunction = function() 
      {
          var attribute = this.getAttribute("data-link");
          if(attribute==null || attribute=="")
          {
              alert("data-link attribute is empty");
             return;
          }
         
          var dWhiteListDomains = {};
          var dWld=localStorage["whiteListDomains"];  

          if ("undefined" === typeof dWld) 
          {
              //console.log("variable is undefined. dWld");
          }
          else
          {
            dWhiteListDomains=JSON.parse(dWld); 

            delete dWhiteListDomains[attribute];

            localStorage["whiteListDomains"]=JSON.stringify(dWhiteListDomains);  
            showWhiteListedDomains();
            document.getElementById('divMessages').innerHTML = "After made changes, please, refresh the page (not options page!) where you want to use this extension, or better open the new tab.";
            chrome.runtime.sendMessage({greeting: "reloadwhitelisteddomains"});
            //console.log("options send reloadwhitelisteddomains to background");
          }
      };

      for (var i = 0; i < classname.length; i++) 
      {
          classname[i].addEventListener('click', myFunction, false);
      }
}

//document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('btnShowWhitelistedPages').addEventListener('click', showWhiteListedPages);
document.getElementById('btnShowWhitelistedDomains').addEventListener('click', showWhiteListedDomains);
