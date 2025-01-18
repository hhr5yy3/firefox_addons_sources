var dataBase="";
var exportBtn = document.getElementById("exportButton");
exportBtn.addEventListener('click', exportCSV);

function showCookiesForTab(tabs) {
	//get the first tab object in the array
	let tab = tabs.pop();
	
	//RESETTO IL DATABASE PER L'EXPORT
	dataBase="Cookies and HTTP Headers Analyser -- Firefox Addon\nTarget site: 	"+tab.url+"\nTimestamp 	"+Date.now()+"\nReference 	https://www.owasp.org/index.php/OWASP_Secure_Headers_Project"
	dataBase=dataBase+"\n\n\nHEADER NAME	VALUE	CONCLUSION";
 
	//set the header of the panel
    var activeTabUrl = document.getElementById('testata');
    var text = document.createTextNode("SITE: "+tab.title);
	activeTabUrl.appendChild(text);
	
	//SELEZIONO LE SEZIONI DEL POPUP
	var cookieList = document.getElementById('cookie-list');
	var sectionHeader = document.getElementById('header-list');
	var sectionHeaderMissing = document.getElementById('header-missing-list');
	  
	//CREO LA PRIMA RIGA DI HEADER
	insertElement("Name",sectionHeader,"th");
	insertElement("Value",sectionHeader,"th");
	
	//CREO LE RIGHE DEGLI HEADER E LE VALUTO
	var listaHeaders=getHeader(tab.url);
	for (let header of listaHeaders){
		var nomeValore = header.trim().split(/[:]+/);
		var sectionHeader = document.getElementById('header-list');
		let line = document.createElement("tr");

		let nome = document.createElement("td");
		nome.appendChild(document.createTextNode(nomeValore[0]));
		line.appendChild(nome);

		let valore = document.createElement("td");
		valore.appendChild(document.createTextNode(nomeValore[1]));
		checkHeaderGreen(nomeValore[0].toLowerCase(),nomeValore[1].toLowerCase(),valore);	//RICHIAMO LA FUNZIONE CHE IMPOSTA GREEN L'HEADER SE è OWASP
		line.appendChild(valore);
		checkHeaderDanegrous(nomeValore[0],valore);
		sectionHeader.appendChild(line);
	}

	//CREO LA PRIMA RIGA DI HEADER MANCANTI
	insertElement("Name",sectionHeaderMissing,"th");
	insertElement("Value",sectionHeaderMissing,"th");
	
	//CREO LA LISTA HEADER OWASP MANCANTI
	checkAllOWASPHeader(listaHeaders);
	
	//CREO LA PRIMA RIGA DI COOKIE
	let linea = document.createElement("tr");
	insertElement("Name",linea,"th");
	insertElement("Value",linea,"th");
	insertElement("Expire",linea,"th");
	insertElement("Domain",linea,"th");
	insertElement("Path",linea,"th");
	insertElement("Secure",linea,"th");
	insertElement("HttpOnly",linea,"th");
	cookieList.appendChild(linea);
 
	//CREO LISTA COOKIE
	var gettingAllCookies = browser.cookies.getAll({url: tab.url});
	gettingAllCookies.then((cookies) => {
		
		//---
		//---SET EXPORT DATA COOKIE FIRS LINE
		dataBase=dataBase+"\n\nCOOKIE NAME	VALUE	EXPIRATION	DOMAIN	PATH	SECURE	HTTPONLY	CONCLUSION";
		//---
		//---
		
		if (cookies.length > 0) {
			for (let cookie of cookies) {
				let linea = document.createElement("tr");
				//---name
				let name = document.createElement("td");
				let content = document.createTextNode(cookie.name);
				name.appendChild(content);
				linea.appendChild(name);
				//---value
				let val = document.createElement("td");
				let contentval = document.createTextNode(cookie.value);
				val.appendChild(contentval);
				linea.appendChild(val);
				//---exp
				let exp = document.createElement("td");
				let contentexp = document.createTextNode(timeConverter(cookie.expirationDate));
				exp.appendChild(contentexp);
				linea.appendChild(exp);		
				//---domain
				let domain = document.createElement("td");
				let contentdomain = document.createTextNode(cookie.domain);
				domain.appendChild(contentdomain);
				linea.appendChild(domain);	
				//---path
				let path = document.createElement("td");
				let contentpath = document.createTextNode(cookie.path);
				path.appendChild(contentpath);
				linea.appendChild(path);	
				//---secure
				let secure = document.createElement("td");
				let contentsecure = document.createTextNode(cookie.secure);
				secure.appendChild(contentsecure);
				if (cookie.secure == false) {
					secure.setAttribute("id","vulns");
					secure.setAttribute("title","If TRUE tells the browser to only send the cookie if the request is being sent over a secure channel such as HTTPS.");
					}
					else
					{
					secure.setAttribute("id","vulns_not");
					}
				linea.appendChild(secure);	
				//---HttpOnly
				let http = document.createElement("td");
				let contenthttp = document.createTextNode(cookie.httpOnly);
				http.appendChild(contenthttp);
					if (cookie.httpOnly == false) {
					http.setAttribute("id","vulns");
					http.setAttribute("title","If TRUE the cookie cannot be accessed through client side script.");
					}
					else
					{
					http.setAttribute("id","vulns_not");
					}
				linea.appendChild(http);
				
				cookieList.appendChild(linea);
				
				//----
				//----GIUDIZIO PER IL DATABASE	
				var giudizio="TO CHECK";
				if (cookie.secure == true && cookie.httpOnly == true) 
				{
					giudizio="OK";
				}
				//INSERISCO IN DATABASE PER EXPORT
				dataBase=dataBase+"\n"+cookie.name+"	"+cookie.value+"	"+cookie.expirationDate+"	"+cookie.domain+"	"+cookie.path+"	"+cookie.secure+"	"+cookie.httpOnly+"	"+giudizio;
				//----
				//----
			}	 
		} 
		else {
			let parent = cookieList.parentNode;
			insertElement("No cookies in this tab.",parent,"p");
		}
    });
}


//INSERISCI ELEMENTO
function insertElement(text,sezione,tipo){
	let h = document.createElement(tipo);
	h.appendChild(document.createTextNode(text));
	sezione.appendChild(h);
}

//CONTROLLO HEADER SUPERFLUI
function checkHeaderDanegrous(header,td){
	var arrayHeaderDangerous=["server","x-powered-by"];
	if(arrayHeaderDangerous.indexOf(header.toLowerCase())>-1){
		td.setAttribute("id","vulns_low");
		td.setAttribute("title","Information disclosure");
	}
}

//VALUTO GLI HEADER DI SICUREZZA PRESENTI
function checkHeaderGreen(nome,valore,td){
	var arrayHeaderOWASP=["strict-transport-security","x-frame-options","x-xss-protection","x-content-type-options","content-security-policy","cache-control"];
	if(nome=="strict-transport-security"){
		if(valore.includes("includesubdomains")&&valore.includes("max-age")){
			td.setAttribute("id","vulns_not");
			
			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"OK"; 			
		}
		else{
			td.setAttribute("id","vulns_maybe");
			td.setAttribute("title","Should be: \"max-age=31536000 ; includeSubDomains\"");
			
			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"TO CHECK"; 	
		}
	}
	if(nome=="x-frame-options"){
		if(valore==" deny" || valore==" sameorigin"){	
			td.setAttribute("id","vulns_not");
						
			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"OK"; 	
		}
		else{
			td.setAttribute("id","vulns_maybe");	
			td.setAttribute("title","Should be: \"deny\" or \"sameorigin\"");

			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"TO CHECK"; 				
		}
	}
	if(nome=="x-xss-protection"){
		if(valore==" 1; mode=block"){	
			td.setAttribute("id","vulns_not");
			
			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"OK"; 
		}
		else{
			td.setAttribute("id","vulns_maybe");	
			td.setAttribute("title","Should be: \"1; mode=block \"");	

			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"TO CHECK"; 			
		}
	}
	if(nome=="x-content-type-options"){
		if(valore==" nosniff"){	
			td.setAttribute("id","vulns_not");
			
			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"OK"; 
		}
		else{
			td.setAttribute("id","vulns_maybe");
			td.setAttribute("title","Should be: \"nosniff\"");	

			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"TO CHECK"; 			
		}
	}
	if(nome=="content-security-policy"){
		if(valore==" script-src 'self'"){	
			td.setAttribute("id","vulns_not");
			
			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"OK"; 
		}
		else{
			td.setAttribute("id","vulns_maybe");	
			td.setAttribute("title","Should be: \"script-src 'self' \"");

			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"TO CHECK"; 			
		}
	}
	if(nome=="cache-control"){
		if(valore.includes("no-cache")&&valore.includes("no-store")&&valore.includes("must-revalidate")&&valore.includes("max-age=0")){	
			td.setAttribute("id","vulns_not");
			
			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"OK"; 
		}
		else{
			td.setAttribute("id","vulns_maybe");	
			td.setAttribute("title","If authenticated should be: \"no-cache, no-store, must-revalidate, max-age=0\"");	

			//---AGGINUGO AL DATABASE CON GIUDIZIO
			dataBase=dataBase+"\n"+nome+"	"+valore+"	"+"TO CHECK"; 			
		}
	}
}

//CONTROLLO CHE CI SIANO TUTTI GLI OWASP
function checkAllOWASPHeader(listaHeaders){
	var arrayHeaderOWASP=["strict-transport-security","x-frame-options","x-xss-protection","x-content-type-options","content-security-policy","cache-control"];
	var arrayNomiLow=[];
	for(let h of listaHeaders)
	{
		var nomeValore = h.trim().split(/[:]+/);
		arrayNomiLow.push(nomeValore[0].toLowerCase());
	}

	for (let n_owasp of arrayHeaderOWASP)
	{
		if(arrayNomiLow.indexOf(n_owasp)==-1){
		var section = document.getElementById('header-missing-list');
		let line = document.createElement("tr");
		let element = document.createElement("td");
		element.appendChild(document.createTextNode(n_owasp));
		line.appendChild(element);
		let comment = document.createElement("td");
		comment.setAttribute("id","vulns");
		comment.appendChild(document.createTextNode("missing"));
		line.appendChild(comment);
		section.appendChild(line);
		
		//---
		//INSERISCO I MISSING NEL DATABSE
		dataBase=dataBase+"\n"+n_owasp+"	"+"missing	"+"NOK";
		//---
		}
	}	
	return 0;
}


//FROM UNIX TO TEMPO RIMANENTE FUNCTION
function timeConverter(UNIX_timestamp){
  if (isNaN(UNIX_timestamp)) 
  {
	  return 'no-expire';
  }
  else
  {
  var reminingTime=UNIX_timestamp-Math.round(Date.now()/1000); 
  var reminingMinutes=(reminingTime / 60).toFixed(0);
  var oreRimaste = ((reminingMinutes % 1440) / 60).toFixed(0);
  var giorniRimasti = (reminingMinutes / 1440).toFixed(0);
  var tempoRimasto = giorniRimasti.toString() + ' days ' + oreRimaste.toString() + ' hours';
  return tempoRimasto;
  }
}


//FUNZIONE GET HEADER CHE RITORNA ARRAY DI HEADER
function getHeader(indirizzo){
		var _request = undefined;
		var _request = new XMLHttpRequest();	//creo una xmlhttp request
		_request.open("HEAD", indirizzo,false); //imposto il tipo di richiesta::FALSE perchè asincrona
		_request.send(null);					//invio la richietsa
		
		var headers = _request.getAllResponseHeaders();//restituisce gli header separati da \r\n
		var arr = headers.trim().split(/[\r\n]+/);		//costruisco il vettor degli header {header1,header2...}
		return arr;
}



//FUNZIONE DI EXPORT
function exportCSV()
{
    var tab_text=dataBase;

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    sa = window.open('data:text/csv,' + encodeURIComponent(tab_text));  
    return (sa);
}


//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}

//EXECUTE!!!
getActiveTab().then(showCookiesForTab);
