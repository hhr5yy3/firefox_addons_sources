// Copyright (c) Zanger LLC. All rights reserved.

(function(){var confirmRegEx=new RegExp(/(?:Confirmation|Order)\s#\s?([0-9]{1,2}-[0-9]{5}\/[A-Z0-9]{3})/g);var emailRegEx=new RegExp(/Order\sdetails\s(?:also\s)?emailed\sto\s([\w-\.]+@[\w]+?\.[a-zA-Z]{2,3})/g);stringCheck();function stringCheck(){if(result=confirmRegEx.exec(document.body.innerText)){var number=result[1];console.log("Found confirmation "+number);if(result=emailRegEx.exec(document.body.innerText)){var email=result[1];console.log("Found email "+email);browser.runtime.sendMessage({'type':"1Ticket",'number':number,'email':email});}
else setTimeout(stringCheck,1000);}
else setTimeout(stringCheck,1000);}})();