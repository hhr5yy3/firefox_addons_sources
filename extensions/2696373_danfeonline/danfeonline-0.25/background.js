var tabIdOpen = null;
var windowIdOpen = null;
var globalIterator = 0;
var u= null;
var ux = null;
var h=null;
var hx=null;
var hr=null;
var key=null;
var elkey=null;
var bs=null;
var bd=null;
var bnc=null;
var ua=null;
var xmlfile = null;
var rcheck=null;
var responseStatus = null;
var contentType = null;
var responseFetch = null;
const storageCache = {};
var checkQueryErr = null;

chrome.webRequest.onBeforeRequest.addListener(
  function(data) {
    if (data.tabId == tabIdOpen) {
	 if (
        data.url.indexOf("://barra.brasil.gov.br/") > -1
      ) {
        return { cancel: true };
      }	  
      if (data.url == u || data.url == ux || data.url.indexOf(u) > -1) {
        return { cancel: false };
      }
	  else if (hx) {
		if (data.url.indexOf(atob(ua[5])) > -1  && key[20]=="5" && key[21]=="7") {
			return { cancel: false };
		}  
		else if (data.url.indexOf(atob(ua[2])) > -1 || data.url.indexOf(atob(ua[3])) > -1 || data.url.indexOf(atob(ua[4])) > -1) {
			return { cancel: false };
		} 
	  }
      return { cancel: true };
    }
  },
  { urls: ["*://*/*"] },
  ["blocking"]
);

chrome.webRequest.onCompleted.addListener(
  function(data) {
    if (tabIdOpen !== data.tabId) 
		return;	
	if (data.url == u || data.url.indexOf(u) > -1) {
	  if (hx) {
		  setValue(elkey,0); 
	  }	
      replaceHtml();
    } 
	else if (data.url.indexOf(atob(ua[3])) > -1) {
		setTimeout(function() {submitForms(data,false); }, 500);
	} 
	else if (data.url.indexOf(atob(ua[4])) > -1) {
		gethtml(data,2);
	}
	else if (data.url.indexOf(atob(ua[5])) > -1) {
		getXml(1);
	} 	
  },
  { urls: ["*://*/*"] },
  ["responseHeaders"]
);


function rewriteLocationHeader(e) {
  if (e.tabId == tabIdOpen && ua != null) {	
	  var headerReceived = new Array();
	  for (var header of e.responseHeaders) {
		if (header.name.toLowerCase() === "location" && header.value.indexOf(atob(ua[1])) > -1) { 
			if (key[20]=="5" && key[21]=="7") {
				ux=header.value;
				headerReceived.push({name: header.name,value: atob(ua[5])});
			} else {
				ux=header.value;
				headerReceived.push({name: header.name,value: "history.go(-1)"});
			}
		} 	
		else if (e.url.indexOf(atob(ua[2])) && globalIterator >= 1) {
			if (header.name.toLowerCase() === "location") {
				headerReceived.push({name: header.name,value: header.value});
				checkQueryErr = true;
			}
		} else {
			headerReceived.push({name: header.name,value: header.value});
		}
	  };
	  if (e.url.indexOf(atob(ua[2])) && globalIterator >= 1 && !checkQueryErr) {
			gethtml(e.tabId,4);
	  }
	  return {responseHeaders: headerReceived};
  }
}

chrome.webRequest.onHeadersReceived.addListener(
  rewriteLocationHeader,
  { urls: ["*://*/*"] },
  ["blocking", "responseHeaders"]
);

function clean() {
	tabIdOpen = null;
	windowIdOpen = null;
	globalIterator = 0;
	u= null;
	ux = null;
	h=null;
	hx=null;
	hr=null;
	key=null;
	elkey=null;
	bs=null;
	bd=null;
	bnc=null;
	ua=null;
	xmlfile = null;
	rcheck=null;
	responseStatus = null;
	contentType = null;
	responseFetch = null;
	checkQueryErr = null;
	chrome.storage.local.get(["a", "b"], function(data) { 
		if (data.a) {
			chrome.storage.local.remove(['a','b']);
		}	
     })
	if (storageCache.a) {		
		delete storageCache.a;
		delete storageCache.b;
	}
}

function getData(url) {
	if (!responseStatus) {
		responseStatus=800;
		fetch(url)
		.then(function(response) {
			responseStatus = response.status;
			response.headers.forEach(function(val, key) { 
				if (key.indexOf('content-type') > -1) {
					contentType=val;
				} 
			});
			response.text().then(function(text) {
				responseFetch = text;
			});
		});	
		setTimeout(function() {
			getData(url);
		}, 500);
	} else if (!responseStatus || responseStatus==800) {
		setTimeout(function() {
			getData(url);
		}, 500);
	} else {
		if (responseStatus==200 && contentType.indexOf('xml') > -1) {
			if (hx) {
				xmlfile=btoa(responseFetch);
			} else {
				chrome.storage.local.set({a: 200, b: btoa(responseFetch)});
			}
		} else {
			if (hx) {
				xmlfile=0;
			} else {
				chrome.storage.local.set({a: 501, b: "false"});
			}	
		}
	}
}

function setValue(value,i) {
  if (windowIdOpen != null) {
    chrome.tabs.executeScript(
      tabIdOpen,
      {
        code:
           'document.querySelector("'+value+'") === null ? 1 : document.querySelector("'+value+'").value="'+key+'"'
      },
      function(result) {
		if (result===undefined) {
			chrome.storage.local.set({a: 507, b: "false"});
			exit(false);
		} else if (result[0]==1) {
			if (i==5) {
				chrome.storage.local.set({a: 507, b: "false"});
				exit(false);
			} else {
				setTimeout(function() {setValue(value,i+1);}, 200);
			}
		}
      }
    );
  }
}

function clickButton(bottom,i) {
  if (windowIdOpen != null) {
    chrome.tabs.executeScript(
      tabIdOpen,
      {
        code:
          "document.querySelector('"+bottom+"') === null ? 1 : document.querySelector('"+bottom+"').click()"
      },
      function(result) {
		if (result===undefined) {
			chrome.storage.local.set({a: 507, b: "false"});
			exit(false);
		} else if (result[0]==1) {
			if (i==5) {
				chrome.storage.local.set({a: 507, b: "false"});
				exit(false);
			} else {
				setTimeout(function() {clickButton(bottom,i+1);}, 200);
			}
		}
      }
    );
  }
}

function clickButtonConf(bottom,i) {
  if (windowIdOpen != null) {
    chrome.tabs.executeScript(
      tabIdOpen,
      {
        code:
          "document.querySelector('"+bottom+"') === null ? 1 : ( document.querySelector('"+bottom+"').setAttribute(\"onclick\", \"return true\"),document.querySelector('"+bottom+"').click() )"  
      },
      function(result) {
		if (result===undefined) {
			chrome.storage.local.set({a: 507, b: "false"});
			exit(false);
		} else if (result[0]==1) {
			if (i==5) {
				gethtml(tabIdOpen,5);
			} else {
				setTimeout(function() {clickButtonConf(bottom,i+1);}, 200);
			}
		}
      }
    );
  }
}

function checkElement(elem,i) {
  if (windowIdOpen != null) {
    chrome.tabs.executeScript(
      tabIdOpen,
      {
        code:
		    'document.querySelector("'+elem+'") === null ? 1 : 2'
	  },
	  function(result) {
		if (result===undefined) {
			chrome.storage.local.set({a: 507, b: "false"});
			exit(false);
		} else {
			rcheck=result[0];
		} 
      }
    );
  }
}

function replaceHtml() {		  
  setTimeout(function() {
    chrome.tabs.executeScript(
      tabIdOpen,
      {code: 'var divs = 1'},
      function() {
        chrome.tabs.executeScript(tabIdOpen, {
          runAt: "document_end",
          file: "replace.js"
        });
      }
    );
	setTimeout(function() {
		if (globalIterator == 0) {
			checkCaptcha();
         }
    }, 3000);
  }, 1000);
}

function checkCaptcha() {
  if (windowIdOpen != null) {
    chrome.tabs.executeScript(
      tabIdOpen,
      {
        code:
          'document.getElementsByTagName("textarea")[0] === undefined ? \'\' : document.getElementsByTagName("textarea")[0].value'
      },
      function(result) {
		if (globalIterator == 0) {
			globalIterator=1;
		}  
		if (result===undefined) {
			chrome.storage.local.set({a: 507, b: "false"});
			exit(false);
		} else if (
          Array.isArray(result) &&
		  result[0].length > 10
          /*&&result.length > 0 /*&&
		  (result[0].includes("03") || result[0].includes("P0") || result[0].includes("P1") || result[0].includes("W1"))*/
        ) {
			if (!hx) {
			  chrome.storage.local.set({a: 200, b: btoa(result[0])});
			  exit(false);
			} else {
				clickButton(bs,0);
			} 
        } else if (globalIterator > 56) {
		  chrome.storage.local.set({a: 504, b: "false"});
		  exit(false);
        } else {
          globalIterator++;
          setTimeout(function() {
            checkCaptcha();
          }, 1000);
        }
      }
    );
  }
}

function gethtml(tabId,status) {
  if (windowIdOpen != null) {
    chrome.tabs.executeScript(
      tabIdOpen,
      {
        code:
         'document.body === undefined ? \'\' : document.body.outerHTML' 
      },
      function(result) {
		if (result===undefined) {
			chrome.storage.local.set({a: 507, b: "false"});
			exit(false);
		} else if (status==1 || status==4 || status==5) {
			if (
			  Array.isArray(result) &&
			  result.length > 0 
			) {
				if (status==4) {
					h=result[0]+'<urlXmlDanfeOnline>404505</urlXmlDanfeOnline>';
				} else if (status==5) {
					h=result[0]+'<urlXmlDanfeOnline>404606</urlXmlDanfeOnline>';
				} else {
					h=result[0]+'<urlXmlDanfeOnline>'+ux+'</urlXmlDanfeOnline>';
				}
				setTimeout(function() {
  				    chrome.storage.local.set({a: 200, b: btoa(h)});
					exit(false);
				}, 500);
			} else {
				setTimeout(function() {
					gethtml(tabId,status);
				}, 500);
			}
        } else if (status==2) {
			if (
			  Array.isArray(result) &&
			  result.length > 0 
			) {
				if (tabId.statusCode==403 || tabId.statusCode==404) {
					h='<queryResumida>1</queryResumida><urlXmlDanfeOnline>'+ux+'</urlXmlDanfeOnline>';
					setTimeout(function() {
						chrome.storage.local.set({a: 200, b: btoa(h)});
						exit(false);
					}, 500);
				} else {
					h=result[0];
					getXml(1);
				}
			} else {
				setTimeout(function() {
					gethtml(tabId,2);
				}, 500);
			}				
		} else if (status==3) {
			if (
			  Array.isArray(result) &&
			  result.length > 0 
			) {
			    hr=btoa(result[0]);
			} else {
				setTimeout(function() {
					gethtml(tabId,3);
				}, 500);
			}
		}	
      }
    );
  }
}

function getXml(s) {
	if (xmlfile===null && s==1) {
		getData(ux);
		setTimeout(function() {
			getXml(2);
		}, 500);
	} else {
		if (xmlfile===null) {
			setTimeout(function() {
				getXml(2);
			}, 500);
		} else {
			if (xmlfile!=null) {
				if (xmlfile==0) {
					h='<queryResumida>1</queryResumida><urlXmlDanfeOnline>'+ux+'</urlXmlDanfeOnline><hrDanfeOnline>'+hr+'</hrDanfeOnline>';
					setTimeout(function() {
						chrome.storage.local.set({a: 200, b: btoa(h)});
						exit(false);
					}, 500);
				} else {
					if (key[20]=="5" && key[21]=="7") {
						h='<queryResumida>1</queryResumida><urlXmlDanfeOnline>'+ux+'</urlXmlDanfeOnline><XmlDanfeOnline>'+xmlfile+'</XmlDanfeOnline>';
						setTimeout(function() {
							chrome.storage.local.set({a: 200, b: btoa(h)});
							exit(false);
						}, 500);
					} else {
						h=h+'<urlXmlDanfeOnline>'+ux+'</urlXmlDanfeOnline><XmlDanfeOnline>'+xmlfile+'</XmlDanfeOnline><hrDanfeOnline>'+hr+'</hrDanfeOnline>';
						setTimeout(function() {
							chrome.storage.local.set({a: 200, b: btoa(h)});
							exit(false);
						}, 500);
					}
				}
			} else { 
				setTimeout(function() {
					getNfeFull(2);
				}, 500);
			} 	
		} 		
	}
}	

function getNfeFull(s) {
	if (rcheck===null) {  
		rcheck=3;
		checkElement(bnc,0);
		setTimeout(function() {getNfeFull(2);}, 200);
	} else {
		if (rcheck==1) {
			rcheck=null;
			h='<queryResumida>1</queryResumida><urlXmlDanfeOnline>'+ux+'</urlXmlDanfeOnline><hrDanfeOnline>'+hr+'</hrDanfeOnline>';
			setTimeout(function() {
	  			chrome.storage.local.set({a: 200, b: btoa(h)});
				exit(false);
			}, 500);
		} else if (rcheck==2) {
			rcheck=null;
			clickButtonConf(bnc,0);
		} else {			   		   
			setTimeout(function() {getNfeFull(2);}, 200);
		}
	}
}


function submitForms(tabId,s) {
  if (!ux,!s) {
	clickButtonConf(bd,0);
	if (key[20]=="5" && key[21]=="5") {
		setTimeout(function() {submitForms(tabId,true);}, 500);
	}
  } else {
	  if (!ux) {
		 setTimeout(function() {submitForms(tabId,true);}, 500);
	  } else if(ux) {
		  
			if (rcheck===null) {  
			   rcheck=3;
			   checkElement(bnc,0);
			   setTimeout(function() {submitForms(tabId,true);}, 200);
			} else {
			   if (rcheck==1) {
					rcheck=null;
					gethtml(tabId,1);
			   } else if (rcheck==2) {
					gethtml(3);
					rcheck=null;
					getNfeFull(1);
			   } else {			   		   
					setTimeout(function() {submitForms(tabId,true);}, 200);
			   }
			}	
	 }
  }
}

function exit(on_removed) {
  if (windowIdOpen != null) {
    if (!on_removed) {
	  if (tabIdOpen)
		chrome.tabs.remove(tabIdOpen);  	  
	}
    windowIdOpen = null;
    globalIterator = 0;
  }
}

function createWindow(url) {
  chrome.windows.create({ url: url, focused: true, type: "popup", width: 600, height: 620}, function(window) {
	tabIdOpen = window.tabs[0].id;
    windowIdOpen = window.id;
  });
}

chrome.windows.onRemoved.addListener(function(windowsId, removeInfo) {
  if (windowsId == windowIdOpen) {
	chrome.storage.local.set({a: 505, b: "false"});
	exit(true);
  }
});

function getResponse() {
	chrome.storage.local.get(["a", "b"], function(data) { 
		if (data.a) {
			Object.assign(storageCache, data);
		}	
     })
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({ url: "https://www.danfeonline.com.br" });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		if (request.a==1)
			sendResponse(true);
		else if (request.a==2)
			sendResponse(browser.runtime.getManifest().version);
		else if (request.a==3)
			sendResponse(chrome.runtime.id);
		else if (request.a==4) {
			getResponse();
			if (typeof storageCache === 'object' && storageCache !== null) {
				if (storageCache.a) {
					var a = storageCache.a;
					var b = storageCache.b;
					sendResponse(JSON.parse('{ "result" : [{ "a":'+a+' , "b":"'+b+'" }] }'));
				}
			}
		} else if (request.a==11) {
			clean();
			u = atob(request.b);
			var d = ["#barra-brasil", "#cabecalho","#barraDireita","#localizacao","#zoomAcessibilidade",".divTituloPrincipal","#ctl00_ContentPlaceHolder1_pnlConsultas","#ctl00_ContentPlaceHolder1_btnConsultarHCaptcha","#ctl00_ContentPlaceHolder1_btnLimparHCaptcha",".indentacaoConteudo",".enabled","#rodape"];
  		    chrome.storage.local.set({d: d});
			createWindow(u);			
		}
		else if (request.a==21) {			
			clean();
			ua = request.b;
			key=request.c[0];
			var d = ["#ctl00_ContentPlaceHolder1_btnConsultarHCaptcha","#ctl00_ContentPlaceHolder1_btnDownload","#ctl00_ContentPlaceHolder1_btnConsultaCompleta",".txtChaveAcesso","#barra-brasil", "#cabecalho","#barraDireita","#localizacao","#zoomAcessibilidade",".divTituloPrincipal","#ctl00_ContentPlaceHolder1_pnlConsultas","#ctl00_ContentPlaceHolder1_btnConsultarHCaptcha","#ctl00_ContentPlaceHolder1_btnLimparHCaptcha",".indentacaoConteudo",".enabled","#rodape"];			
			bs=d[0];
			bd=d[1];
			bnc=d[2];
			elkey=d[3];
			d.shift();
			d.shift();
			d.shift();
			d.shift();
  		    chrome.storage.local.set({d: d});
			hx=true;
			createWindow(u=atob(ua[0]));
		}
		else if (request.a==22) {
			clean();
			ua = request.b;
			key=request.c[0];
			var d = ["#ctl00_ContentPlaceHolder1_btnConsultarHCaptcha","#ctl00_ContentPlaceHolder1_btnDownload","#ctl00_ContentPlaceHolder1_btnConsultaCompleta",".txtChaveAcesso","#barra-brasil", "#cabecalho","#barraDireita","#localizacao","#zoomAcessibilidade",".divTituloPrincipal","#ctl00_ContentPlaceHolder1_pnlConsultas","#ctl00_ContentPlaceHolder1_btnConsultarHCaptcha","#ctl00_ContentPlaceHolder1_btnLimparHCaptcha",".indentacaoConteudo",".enabled","#rodape"];			
			bs=d[0];
			bd=d[1];
			bnc=d[2];
			elkey=d[3];
			d.shift();
			d.shift();
			d.shift();
			d.shift();
  		    chrome.storage.local.set({d: d});
			hx=true;
			createWindow(u=atob(ua[0]));
		}
		sendResponse(false);
  }
);