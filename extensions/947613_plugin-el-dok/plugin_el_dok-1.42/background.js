// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//setInterval("PolaczenieChrome();", 1000);

//var Wersja = "1.15";

//setInterval(function ()
//{
//    if (localStorage["isConn"] == "OK") {
//        localStorage["isConn"] = "";
//        nConn = 0;
//    }
//    else {
//        nConn = nConn + 1;
//    }
//    if (nConn > 4) {
//        //  nConn = 0;
//        if (localStorage["wylaczony"] != "OK")
//        {
//            chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "WylaczRozszerzenie" }, function (response) {
              
//                localStorage["wylaczony"] = "OK";
//                return;
//            });
//        }
//        else
//        {
//           // chrome.runtime.reload();
//        }
//    }
//}, 1000);

//var nConn = 0;
//var nReload = 0;

//function getVersion(callback) {
//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.open('GET', 'manifest.json');
//    xmlhttp.onload = function (e) {
//        var manifest = JSON.parse(xmlhttp.responseText);
//        callback(manifest.externally_connectable.matches);
//    }
//    xmlhttp.send(null);
//}



//setInterval(function () {
//    if (localStorage["Reload"] == "") {
//        localStorage["Reload"] = "OK";
//        nReload = 0;
//    }
//    else {
//        nReload = nReload + 1;
//    }
//    if (nReload > 4)
//    {
//        nReload = 0;
//        getVersion(function (math)
//        {
//            var matches = math;
//            var localhostcontain = false;
//            var other;
//            for (var i = 0 ; i < math.length ; i++)
//            {
//                other = math[i];
//                if (math[i].indexOf("localhost") != -1)
//                    localhostcontain = true;
//            }
//            if (other != localStorage["match"])
//                localStorage["isReload"] = "";

//            if (localhostcontain == false && localStorage["isReload"] != "OK" && other != localStorage["match"])
//            {
//                localStorage["isReload"] = "OK";
//                localStorage["match"] = other;
//                chrome.management.setEnabled("njhpnifepffalcmkfcfmecdjfkmjilek", false, function () {
//                    chrome.management.setEnabled("njhpnifepffalcmkfcfmecdjfkmjilek", true);
//                });

//            }
//        }

//            );
//    }
//}, 1000);
function SendResponsToElDok(response , callBackFunk)
 {
    localStorage["Return"] = response.Return;
    var quTabs = browser.tabs.query({ active: true });
	quTabs.then(onResponseTabs , onErrorTabs);

}
function onResponseTabs(response) {
  console.log("Received " + response);
  var tabs = response;
  for (var t = 0 ; t < tabs.length ; t++) 
  {
	if (tabs[t].windowId.toString() == localStorage["src"]) 
	{
		var sending  =  browser.tabs.sendMessage(tabs[t].id ,{ CallBackFunk: localStorage["CallBackFunk"], Return: localStorage["Return"]});
		sending.then(onResponseToContent , onErrorToContent);
	}
  }
			
 //  SendResponsToElDok(response, localStorage["tmp"], localStorage["src"]);
}

function onErrorTabs(error) {
  console.log(`Error: ${error}`);
}

function onResponseToContent(response) {
  console.log("Received " + response);
 //  SendResponsToElDok(response, localStorage["tmp"], localStorage["src"]);
}

function onErrorToContent(error) {
  console.log(`Error: ${error}`);
}

browser.runtime.onMessage.addListener(
 function (request, sender, sendResponse) {

        localStorage["isConn"] = "OK";
        localStorage["wylaczony"] = "";

        if (request.Funkcja != 'SendChrome')
        {
            localStorage["sch"] = '';
            localStorage["tmp"] = request.CallBackFunk;
        }
        else
            localStorage["sch"] = 'NULL';

         localStorage["src"] = sender.tab.windowId;
		 localStorage["CallBackFunk"] = request.CallBackFunk;
		 
        var sending  = browser.runtime.sendNativeMessage('com.zeto.eldok', request);
		sending.then(onResponse,onError);
             
 });
 
function onResponse(response) {
  console.log("Received " + response);
   SendResponsToElDok(response, localStorage["tmp"]);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

//chrome.runtime.onMessageExternal.addListener(
//  function(request, sender, sendResponse) {
//    // don't allow this web page access
      
//localStorage["isConn"] = "OK";
//localStorage["Reload"] = "";
//if (request.Funkcja == "SendChrome")
//{
//    localStorage["wylaczony"] = "";
//    localStorage["isConn"] = "OK";
//}
//      //WylaczRozszerzenie
//if (request.Funkcja == "WylaczRozszerzenie") {
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "WylaczRozszerzenie" });
//}

//      //CzyscFolderTMP
//if (request.Funkcja == "CzyscFolderTMP") {
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "CzyscFolderTMP" });
//}
//if(request.Funkcja == "TestChrome")
//{
// sendResponse({Success:'OK'});
//}

//if (request.Funkcja == "GetWersja") {

//    sendResponse({ Wersja: Wersja });
//}

//if(request.Funkcja == "TestPlugin")
//   {
	  
//	     localStorage["test"] = "";
//		 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "TestPlugin" } , 
//			 function(response)
//			 {
//				  var tmp = response.Return;
//				  localStorage["test"] = tmp;
//				return;
//			 }); 	
//   }
//if(request.Funkcja == "TestPluginRez")
//   {
//		var tmp =  localStorage["test"];
//		if (tmp != "")
//		{
//		    sendResponse({ Return: tmp });
//		    chrome.runtime.reload();
//		}
//}
//      //   chrome.runtime.sendMessage(idChrome, { Funkcja: "SzafirExist", ExtId: idExt });
//if (request.Funkcja == "SzafirExist") {
//    localStorage["sza"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "SzafirExist" , ExtId:request.ExtId},
//      function (response) {
//          var tmp = response.Return;
//          localStorage["sza"] = tmp;
//          //  sendResponse({Return:tmp});
//          return;
//      });
//}
//if(request.Funkcja == "Skanuj")
//{
//	   localStorage["sca"] = ""; 
//	   chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "Skanuj" } , 
//		 function(response)
//		 {
//			  var tmp = response.Return;
//			  localStorage["sca"] = tmp;
//			//  sendResponse({Return:tmp});
//			return;
//		 }); 	
//}
//if (request.Funkcja == "UprawnieniaGrup") {
//    localStorage["upr"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "UprawnieniaGrup" , Gid : request.Gid },
//      function (response) {
//          var tmp = response.Return;
//          localStorage["upr"] = tmp;
//          //  sendResponse({Return:tmp});
//          return;
//      });
//}
//if (request.Funkcja == "UprawnieniaUzytkownika") {
//    localStorage["upr"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "UprawnieniaUzytkownika", Uid: request.Uid },
//      function (response) {
//          var tmp = response.Return;
//          localStorage["upr"] = tmp;
//          //  sendResponse({Return:tmp});
//          return;
//      });
//}
//if (request.Funkcja == "SzafirExistRez") {
//    var tmp = localStorage["sza"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
      

//if(request.Funkcja == "SkanujRez")
//   {
//		var tmp =  localStorage["sca"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
//}
//      //(folder, nazwaSerwerowa ,nazwaSystemowa, typ,podpis,nazwaOryg)
//if (request.Funkcja == "ZapiszPlik")
//{
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "ZapiszPlik", Folder: request.Folder, NazwaSerw: request.NazwaSerw, NazwaSys: request.NazwaSys, Typ: request.Typ, Podpis: request.Podpis, NazwaPlk: request.NazwaPlk });      
//}
//if (request.Funkcja == "ZapiszPlikAll")
//{
//    localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "ZapiszPlikAll", Dane: request.Dane , Folder:request.Folder },
//        function (response)
//        {
//            var tmp = response.Return;
//            localStorage["tmp"] = tmp;
//            //  sendResponse({Return:tmp});
//            return;
//    });
//}
//if (request.Funkcja == "SciagnijPlik") {
//    localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "SciagnijPlik", Plik: request.Plik},
//        function (response) {
//            var tmp = response.Return;
//            localStorage["tmp"] = tmp;
//            //  sendResponse({Return:tmp});
//            return;
//        });
//}
//if(request.Funkcja == "GenerowanieDokumentu")
//{
  
//	 localStorage["tmp"] = "";
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "GenerowanieDokumentu" , DegzId:request.DegzId , SzabId:request.SzabId , AdrdId:request.AdrdId} , 
//		 function(response)
//		 {
//			  var tmp = response.Return;
//			  localStorage["tmp"] = tmp;
//			//  sendResponse({Return:tmp});
//			return;
//		 }); 	
//}
//if (request.Funkcja == "RejestrujMaileSluzbowe") {

//    localStorage["Email"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "RejestrujMaileSluzbowe"},
//        function (response) {
//            var tmp = response.Return;
//            localStorage["Email"] = tmp;
//            //  sendResponse({Return:tmp});
//            return;
//        });
//}
//      //RejestrujMaileOficjalneDzialRez
//if (request.Funkcja == "RejestrujMaileOficjalneDzial") {

//    localStorage["Email"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "RejestrujMaileOficjalneDzial" },
//        function (response) {
//            var tmp = response.Return;
//            localStorage["Email"] = tmp;
//            //  sendResponse({Return:tmp});
//            return;
//        });
//}
//      //RejestrujMaileSluzboweWychodzace()
//if (request.Funkcja == "RejestrujMaileSluzboweWychodzace") {

//    localStorage["Email"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "RejestrujMaileSluzboweWychodzace" },
//        function (response) {
//            var tmp = response.Return;
//            localStorage["Email"] = tmp;
//            //  sendResponse({Return:tmp});
//            return;
//        });
//}
//if (request.Funkcja == "RejestrujMaileOficjalne") {

//    localStorage["Email"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "RejestrujMaileOficjalne" },
//        function (response) {
//            var tmp = response.Return;
//            localStorage["Email"] = tmp;
//            //  sendResponse({Return:tmp});
//            return;
//        });
//}
//if (request.Funkcja == "IloscNowychMailiDoRejestracji") {

//    localStorage["ilosc"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "IloscNowychMailiDoRejestracji", Folder: request.Folder },
//        function (response) {
//            var tmp = response.Return;
//            localStorage["ilosc"] = tmp;
//            //  sendResponse({Return:tmp});
//            return;
//        });
//}
//if (request.Funkcja == "GenerujDokumentMet") {

//    localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "GenerujDokumentMet", DegzId: request.DegzId, Sciezka: request.Sciezka, AdrdId: request.AdrdId },
//        function (response) {
//            var tmp = response.Return;
//            localStorage["tmp"] = tmp;
//            //  sendResponse({Return:tmp});
//            return;
//        });
//}
//if(request.Funkcja == "UstawUzytkownika")
//{
//     chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "UstawUzytkownika" , Login:request.Login , Haslo:request.Haslo}); 
//	 localStorage["Login"] = request.Login;
//	 localStorage["Haslo"] = request.Haslo;
//	// chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "UstawUzytkownika" , Login:request.Login ); 
		
//}
//if (request.Funkcja == "KonfiguracjaDrukarkiEtykiet") {
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "KonfiguracjaDrukarkiEtykiet"});
//}

//if (request.Funkcja == "DrukujEtykieteAdrPoczta") {
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "DrukujEtykieteAdrPoczta", Nazwa: request.Nazwa, Instytucja: request.Instytucja, Adres: request.Adres, KodMiasto: request.KodMiasto, KodPocztowy: request.KodPocztowy });
//}
//if (request.Funkcja == "PlikiArchiwum")
//{
//    //chrome.runtime.sendMessage(idChrome, { Funkcja: "PlikiArchiwum",Spis:spis , NazwaPlk:plik , Folder: folder });
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "PlikiArchiwum", Spis: request.Spis, NazwaPlk: request.NazwaPlk , Folder:request.Folder  });
//}
//if(request.Funkcja == "DrukujEtykiete")
//{
//     chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "DrukujEtykiete" , Symbol: request.Symbol , Dane:request.Dane , Pracownik: request.Pracownik , Kod:request.Kod}); 		
//}
//if (request.Funkcja == "DrukujEtykieteMultiBarcodeTitle")
//{
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "DrukujEtykieteMultiBarcodeTitle", Nazwa: request.Nazwa, Instytucja: request.Instytucja, Adres: request.Adres, KodMiasto: request.KodMiasto ,KodPocztowy: request.KodPocztowy ,  Dane: request.Dane, Tytul: request.Tytul});
//}
//if (request.Funkcja == "DrukujEtykieteAdresowa") {
//    //(BSTR ImieNazwisko, BSTR Instytucja, BSTR Adres, BSTR KodMiasto)
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "DrukujEtykieteAdresowa", ImieNazwisko: request.ImieNazwisko, Instytucja: request.Instytucja, Adres: request.Adres, KodMiasto: request.KodMiasto });
//}
//if (request.Funkcja == "WypelnijDokument") {

//    localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "WypelnijDokument", DegzId: request.DegzId, SzabId:request.SzabId, AdrdId:request.AdrdId, Sciezka: request.Sciezka } ,
//    function(response)
//    {
//        var tmp = response.Return;
//        localStorage["tmp"] = tmp;
//        //  sendResponse({Return:tmp});
//        return;
//    }); 	
   
//}//PrzeniesPlikNaKlientaAll

//      //SzafirDoTaskList
////string xmlPath = data["SetXML"].Value<string>();
////string makeTaskList = data["MTask"].Value<string>();
////string taskList = data["Task"].Value<string>();
//if (request.Funkcja == "SzafirDoTaskList") {

//    localStorage["doTaskList"] = "";
//   // localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "SzafirDoTaskList", SetXML: request.SetXML, MTask: request.MTask, Task: request.Task , NoWind:request.NoWind},
//    function (response) {
//        var tmp = response.Return;
//        localStorage["doTaskList"] = tmp;
//        //  sendResponse({Return:tmp});
//        return;
//    });

//}
//      //SzafirGetSignatureInfo
//if (request.Funkcja == "SzafirGetSignatureInfo") {

//    localStorage["GetSignatureInfo"] = "";
//    // localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "SzafirGetSignatureInfo", SetXML: request.SetXML, Plik:request.Plik },
//    function (response) {
//        var tmp = response.Return;
//        localStorage["GetSignatureInfo"] = tmp;
//        //  sendResponse({Return:tmp});
//        return;
//    });

//}
//if (request.Funkcja == "PrzeniesPlikNaKlientaAll") {

//    localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "PrzeniesPlikNaKlientaAll", Pliki:request.Pliki },
//    function (response) {
//        var tmp = response.Return;
//        localStorage["tmp"] = tmp;
//        //  sendResponse({Return:tmp});
//        return;
//    });

//}
//      //WyslijPodpisanyPlik
//if (request.Funkcja == "WyslijPodpisanyPlik") {

//    localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "WyslijPodpisanyPlik", Nazwa_1: request.Nazwa_1, Nazwa_2: request.Nazwa_2 },
//    function (response) {
//        var tmp = response.Return;
//        localStorage["tmp"] = tmp;
//        //  sendResponse({Return:tmp});
//        return;
//    });

//}
//if (request.Funkcja == "PrzeniesPlikNaKlienta") {

//    localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "PrzeniesPlikNaKlienta", NazwaSerw: request.NazwaSerw , NazwaPlk:request.NazwaPlk , Typ:request.Typ },
//    function (response) {
//        var tmp = response.Return;
//        localStorage["tmp"] = tmp;
//        //  sendResponse({Return:tmp});
//        return;
//    });

//}
//      //SciagnijPlik
//if (request.Funkcja == "SciagnijPlikRez") {
//    var tmp = localStorage["tmp"];
//    if (tmp != "" && tmp != undefined)
//        sendResponse({ Return: tmp });
//}
//if (request.Funkcja == "WyslijPodpisanyPlikRez") {
//    var tmp = localStorage["tmp"];
//    if (tmp != "" && tmp != undefined)
//        sendResponse({ Return: tmp });
//}
//      //UprawnieniaGrup
//if (request.Funkcja == "UprawnieniaGrupRez") {
//    var tmp = localStorage["upr"];
//    if (tmp != "" && tmp != undefined)
//        sendResponse({ Return: tmp });
//}
//if (request.Funkcja == "UprawnieniaUzytkownikaRez") {
//    var tmp = localStorage["upr"];
//    if (tmp != "" && tmp != undefined)
//        sendResponse({ Return: tmp });
//}
//      //UprawnieniaUzytkownika
//if (request.Funkcja == "SzafirDoTaskListRez") {
//    var tmp = localStorage["doTaskList"];
//    if (tmp != "" && tmp != undefined)
//        sendResponse({ Return: tmp });
//}
//if (request.Funkcja == "SzafirGetSignatureInfoRez") {
//    var tmp = localStorage["GetSignatureInfo"];
//    if (tmp != "" && tmp != undefined)
//        sendResponse({ Return: tmp });
//}
//      //GetSignatureInfo
//if (request.Funkcja == "PrzeniesPlikNaKlientaAllRez") {
//    var tmp = localStorage["tmp"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
//      //PrzeniesPlikNaKlientaRez  NazwaSerw:nazwaSerw , NazwaOrg : nazwaOrg , Typ:typPlk 
//if (request.Funkcja == "PrzeniesPlikNaKlientaRez") {
//    var tmp = localStorage["tmp"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
//      //ZapiszPlikAll
//if (request.Funkcja == "ZapiszPlikAllRez") {
//    var tmp = localStorage["tmp"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
//if (request.Funkcja == "WypelnijDokumentRez") {
//    var tmp = localStorage["tmp"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
//      //RejestrujMaileSluzboweWychodzace
//if (request.Funkcja == "RejestrujMaileSluzboweWychodzaceRez") {
//    var tmp = localStorage["Email"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
//      //IloscNowychMailiDoRejestracji
//if (request.Funkcja == "IloscNowychMailiDoRejestracjiRez") {
//    var tmp = localStorage["ilosc"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
//      //RejestrujMaileOficjalne
//if (request.Funkcja == "RejestrujMaileOficjalneRez") {
//    var tmp = localStorage["Email"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}


//if (request.Funkcja == "RejestrujMaileOficjalneDzialRez") {
//    var tmp = localStorage["Email"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
//      //RejestrujMaileOficjalneDzial
//if (request.Funkcja == "RejestrujMaileSluzboweRez") {
//    var tmp = localStorage["Email"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
     
//if (request.Funkcja == "GenerujDokumentMetRez") {
//    var tmp = localStorage["tmp"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
//if(request.Funkcja == "GenerowanieDokumentuRez")
//   {
//		var tmp =  localStorage["tmp"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
//}
//if (request.Funkcja == "GenerowanieDokumentuMetRez") {
//    var tmp = localStorage["tmp"];
//    if (tmp != "")
//        sendResponse({ Return: tmp });
//}
// if(request.Funkcja == "WybierzPlikRez")
//   {
//		var tmp =  localStorage["tmp"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
// }
// if (request.Funkcja == "WybierzKatalogRez") {
//     var tmp = localStorage["tmp"];
//     if (tmp != "")
//         sendResponse({ Return: tmp });
// }
//      //WybierzKatalogUtworzFolder
// if (request.Funkcja == "WybierzKatalogUtworzFolderRez") {
//     var tmp = localStorage["tmp"];
//     if (tmp != "")
//         sendResponse({ Return: tmp });
// }

// if(request.Funkcja == "EdytujSzablonModul")
//{
  
//	 localStorage["tmp"] = "";
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "EdytujSzablonModul" , TypModul:request.TypModul ,SzabId:request.SzabId, Sciezka:request.Sciezka , TypSzab:request.TypSzab } , 
//		 function(response)
//		 {
//			  var tmp = response.Return;
//			  localStorage["tmp"] = tmp;
//			//  sendResponse({Return:tmp});
//			return;
//		 }); 	
//}
//if(request.Funkcja == "EdytujSzablonModulRez")
//   {
//		var tmp =  localStorage["tmp"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
//   } 
// if(request.Funkcja == "NowySzablonTypModul")
//{
  
//	 localStorage["tmp"] = "";
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "NowySzablonTypModul" , TypModul:request.TypModul , SzabId:request.SzabId , TypSzab:request.TypSzab } , 
//		 function(response)
//		 {
//			  var tmp = response.Return;
//			  localStorage["tmp"] = tmp;
//			//  sendResponse({Return:tmp});
//			return;
//		 }); 	
//}
//if(request.Funkcja == "NowySzablonTypModulRez")
//   {
//		var tmp =  localStorage["tmp"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
//   }   
//if(request.Funkcja == "ImportujSzablonTypModul")
//{
  
//	 localStorage["tmp"] = "";
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "ImportujSzablonTypModul" , TypModul:request.TypModul , Sciezka:request.Sciezka , TypSzab:request.TypSzab } , 
//		 function(response)
//		 {
//			  var tmp = response.Return;
//			  localStorage["tmp"] = tmp;
//			//  sendResponse({Return:tmp});
//			return;
//		 }); 	
//}
//if(request.Funkcja == "ImportujSzablonTypModulRez")
//   {
//		var tmp =  localStorage["tmp"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
//   } 
//   if(request.Funkcja == "OtworzDokumentSzablon")
//{
  
//	 localStorage["tmp"] = "";
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "OtworzDokumentSzablon" ,  NazwaSerw: request.NazwaSerw , NazwaPlk: request.NazwaPlk } , 
//		 function(response)
//		 {
//			  var tmp = response.Return;
//			  localStorage["tmp"] = tmp;
//			//  sendResponse({Return:tmp});
//			return;
//		 }); 	
//}
//if(request.Funkcja == "OtworzDokumentSzablonRez")
//   {
//		var tmp =  localStorage["tmp"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
//   } 
//if(request.Funkcja == "ZapiszSzablon")
//{
  
//	 localStorage["tmp"] = "";
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "ZapiszSzablon" , Sciezka:request.Sciezka } , 
//		 function(response)
//		 {
//			  var tmp = response.Return;
//			  localStorage["tmp"] = tmp;
//			//  sendResponse({Return:tmp});
//			return;
//		 }); 	
//}
//if(request.Funkcja == "ZapiszSzablonRez")
//   {
//		var tmp =  localStorage["tmp"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
//   }  
//if(request.Funkcja == "WybierzPlikSzablonu")
//{
  
//	 localStorage["tmp"] = "";
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "WybierzPlikSzablonu" } , 
//		 function(response)
//		 {
//			  var tmp = response.Return;
//			  localStorage["tmp"] = tmp;
//			//  sendResponse({Return:tmp});
//			return;
//		 }); 	
//}
//if(request.Funkcja == "WybierzPlikSzablonuRez")
//   {
//		var tmp =  localStorage["tmp"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
//}
//      ////WybierzKatalog
//      //ZapiszDaneDoAnalizDoFolderu

//if (request.Funkcja == "WybierzKatalog") {

//    localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "WybierzKatalog" },
//        function (response) {
//            var tmp = response.Return;
//            localStorage["tmp"] = tmp;
//            //  sendResponse({Return:tmp});
//            return;
//        });
//}

//      //WybierzKatalogUtworzFolder
//if (request.Funkcja == "WybierzKatalogUtworzFolder") {

//    localStorage["tmp"] = "";
//    chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "WybierzKatalogUtworzFolder" , DegzId: request.DegzId },
//        function (response) {
//            var tmp = response.Return;
//            localStorage["tmp"] = tmp;
//            //  sendResponse({Return:tmp});
//            return;
//        });
//}
//if(request.Funkcja == "WybierzPlik")
//{
    
  
//	 localStorage["tmp"] = "";
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "WybierzPlik" } , 
//		 function(response)
//		 {

//		     chrome.tabs.query({ active : true }, function (tabs) 
//		     {
//		         for (var t = 0 ; t < tabs.length ; t++)
//		         {
//                     if(tabs[t].title.indexOf("el-Dok") != -1)
//		                    chrome.tabs.sendMessage(tabs[t].id, { greeting: "hello" }, function (response) {


//		                        alert('send');

//		             });
//		         }
//		     });

//			  //var tmp = response.Return;
//			  //localStorage["tmp"] = tmp;
//			  //sendResponse({Return:tmp});
//			return;
//		 }); 	
//}
//   if(request.Funkcja == "WybierzPlikRez")
//   {
//		var tmp =  localStorage["tmp"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
//   }
//   if (request.Funkcja == "OtworzDokumentTmp")
//   {
//       localStorage["plk"] = "";
//       chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "OtworzDokumentTmp", NazwaSerw: request.NazwaSerw, NazwaPlk: request.NazwaPlk },
//               function (response) {
//                   var tmp = response.Return;
//                   localStorage["plk"] = tmp;
//                   //  sendResponse({Return:tmp});
//                   return;
//               });
//   }
//   if (request.Funkcja == "OtworzDokumentTmpMet")
//   {
//       localStorage["plk"] = "";
//       chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "OtworzDokumentTmpMet", NazwaSerw: request.NazwaSerw, NazwaPlk: request.NazwaPlk },
//               function (response) {
//                   var tmp = response.Return;
//                   localStorage["plk"] = tmp;
//                   //  sendResponse({Return:tmp});
//                   return;
//               });
//   }
//   if (request.Funkcja == "OtworzDokumentTmpBip")
//   {
//       localStorage["plk"] = "";
//       chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "OtworzDokumentTmpBip", NazwaSerw: request.NazwaSerw, NazwaPlk: request.NazwaPlk },
//               function (response) {
//                   var tmp = response.Return;
//                   localStorage["plk"] = tmp;
//                   //  sendResponse({Return:tmp});
//                   return;
//               });
//   }
//      //
//      //ZapiszDaneDoAnalizDoFolderu
//   if (request.Funkcja == "ZapiszDaneDoAnalizDoFolderu") {
//       //   localStorage["plk"] = "";
//       chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "ZapiszDaneDoAnalizDoFolderu", Plik: request.Plik, Folder: request.Folder });
//   }
//   if (request.Funkcja == "ZapiszDokument")
//   {
//    //   localStorage["plk"] = "";
//       chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "ZapiszDokument", NazwaPlk: request.NazwaPlk, NazwaSerw: request.NazwaSerw });
//   }
//   if (request.Funkcja == "ZapiszSkan") {
//       //   localStorage["plk"] = "";
//       chrome.runtime.sendNativeMessage('com.zeto.eldok', { Funkcja: "ZapiszSkan", NazwaPlk: request.NazwaPlk, NazwaSerw: request.NazwaSerw });
//   }
//   if(request.Funkcja == "OtworzDokument")
//   {
//       localStorage["plk"] = "";
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "OtworzDokument" , NazwaSerw: request.NazwaSerw , NazwaPlk: request.NazwaPlk } ,
//             function(response)
//			 {
//				  var tmp = response.Return;
//				  localStorage["plk"] = tmp;
//				//  sendResponse({Return:tmp});
//				return;
//			 }); 
//   }
//   if (request.Funkcja == "OtworzDokumentTmpRez") {
//       var plk = localStorage["plk"];
//       if (plk != "")
//           sendResponse({ Return: plk });
//   }
//   if (request.Funkcja == "OtworzDokumentTmpMetRez") {
//       var plk = localStorage["plk"];
//       if (plk != "")
//           sendResponse({ Return: plk });
//   }
//   if (request.Funkcja == "OtworzDokumentTmpBipRez") {
//       var plk = localStorage["plk"];
//       if (plk != "")
//           sendResponse({ Return: plk });
//   }
//   if(request.Funkcja == "OtworzDokumentRez")
//   {
//	   var plk =  localStorage["plk"];
//		if(plk != "")
//				sendResponse({Return:plk});
//   }
//  //EdytujSkanTMPRez
  
//if(request.Funkcja == "EdytujSkan")
//{
//	 localStorage["tmp"] = "";
//     chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "EdytujSkan" , Sciezka: request.Sciezka , Sciezka_1: request.Sciezka_1 }, 
//		 function(response)
//		 {
//			  var tmp = response.Return;
//			  localStorage["tmp"] = tmp;
//			//  sendResponse({Return:tmp});
//			return;
//		 }); 	
//}
//if(request.Funkcja == "EdytujSkanLokalny")
//{
// chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "EdytujSkanLokalny" , Sciezka: request.Sciezka }); 
//}

//if(request.Funkcja == "OtworzSkanLokalny")
//{
// chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "OtworzSkanLokalny" , Sciezka: request.Sciezka }); 
//}
//if(request.Funkcja == "OtworzSkan")
//{
// chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "OtworzSkan" , Sciezka: request.Sciezka }); 
//}
//if(request.Funkcja == "OtworzSkan_2")
//{
// chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "OtworzSkan_2" , Sciezka: request.Sciezka , Sciezka_1: request.Sciezka_1}); 
//}
//if(request.Funkcja == "OtworzDokumentLokalny")
//   {
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "OtworzDokumentLokalny" , Sciezka: request.Sciezka }); 
//   }
   
// if(request.Funkcja == "SetUrl")
//   {
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "SetUrl" , Sciezka: request.Sciezka }); 
//   }
   
//if(request.Funkcja == "ZapiszPlikTMP")
//   {
//	 localStorage["pl"] = "";
	 
//	 chrome.runtime.sendNativeMessage('com.zeto.eldok',{ Funkcja: "ZapiszPlikTMP" , Sciezka: request.Sciezka , Kompresja: request.Kompresja },
//	 function(response)
//			 {
//				  var tmp = response.Return;
//				  localStorage["pl"] = tmp;
//				//  sendResponse({Return:tmp});
//				return;
//			 });
//   }
   
//   if(request.Funkcja == "ZapiszPlikTMPRez")
//   {
//		var tmp =  localStorage["pl"];
//		if(tmp != "")
//				sendResponse({Return:tmp});
//   }
   
///*port.onMessage.addListener(function(msg) {
//  console.log(msg.text);
//});

//port.onDisconnect.addListener(function() {
//  console.log("Disconnected");
//});

//port.postMessage({text:"This is message from Chrome extension"});
//	*/   
	   
	   
	   
//	//   var host = "com.zeto.eldok";
//	//   var message = {"text": "test"};
//    //   chrome.extensions.sendNativeMessage(host , message);
	   
//	//  var ws = new XMLHttpRequest();
//	  //(string sid, ST.FolderPlikow folder, string nazwa, ref int paczka, ref int ilosc, ref DateTime data)
//   //   ws.open('GET', 'http://localhost/elDok2015_new/ws/plik.asmx/CzytajPlk?nazwa="1bcd"');
//	//  ws.open('GET', 'http://localhost:49493/Service1.svc/web/Skanuj');
	 
//   //   ws.onload = function() {
//		// var root = ws.responseXML;
//		// var parser = new DOMParser();
//      //   var xmlDoc = parser.parseFromString(ws.responseText,"text/xml");
//      //  alert(xmlDoc.childNodes[0].textContent);
//  //  };
//   //  ws.send();
//	// sendResponse({Rez: "Odczyt"});
   
	
 
   
//  });
  
  function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
 

