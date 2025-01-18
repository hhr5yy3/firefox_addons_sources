var config = {
	ajaxtimeout : 15000,
	baseurl: "https://addon.dnslytics.uk",
	debugmode: false
};

window.addEventListener('load', function() {
	if (localStorage.defaulttab == undefined) {
		localStorage.defaulttab = "0"
	}
	if (localStorage.pluginkey == undefined) {
		localStorage.pluginkey = ""
	}
	document.querySelector('#saveoptions').addEventListener('click', SaveOptions);
	document.getElementById('tab1').addEventListener('change', loadtabIPv4);
	document.getElementById('tab2').addEventListener('change', loadtabIPv6);
	document.getElementById('tab3').addEventListener('change', loadtabISP);
	document.getElementById('tab4').addEventListener('change', loadtabDomain);
	document.getElementById('tab5').addEventListener('change', loadtabMyIP);
	if (typeof chrome.tabs !== 'undefined') browserinterface=chrome; else browserinterface=browser;
	document.getElementById('defaulttab').value = localStorage.defaulttab;
	document.getElementById('pluginkey').value = localStorage.pluginkey;
	let id = parseInt(localStorage.defaulttab, 10);
	document.getElementById('tab' + ++id).checked = "checked"
	loadtab(localStorage.defaulttab);
})

function apicall(elip, eloutput, elmsg, apipath, renderfunc, myip) {
	if (document.getElementById(elip).value=='') {
		document.getElementById(eloutput).style.display = 'none';
		document.getElementById(elmsg).innerHTML = '<p>Getting IP information....<img src="images/loading.gif" /></p>';
		browserinterface.tabs.query( {'active': true, currentWindow: true}, function(tabArray) {
			try {
				hostname = getHostname(tabArray[0].url)
				if ((hostname != null && !ispvt(hostname)) || myip === true) {
					var url = myip ? config.baseurl + apipath : config.baseurl + apipath + hostname
					fetch(url, { signal: AbortSignal.timeout(config.ajaxtimeout) })
						.then((response) => {
							if (response.ok) {
								return response.json()
							} else {
								throw new Error(response.status)
							}
						})
						.then((data) => renderfunc(data))
						.catch(err => {
							onApiResultError(elmsg,err.message)
					})
				} else {
					onApiResultError(elmsg, -2)	
				}
			} catch(e) {
				onApiResultError(elmsg, -1)
			}
		});
	}
}

function onApiResultError(el,code) {
	switch(code) {
		case -1:
			msg = '<p>Could not get current URL. Perhaps you are on a blank or option page? Please visit a website and try again.</p>';
			break;
		case -2:
			msg = '<p>Could not get current URL. Perhaps you are on a local site or intranet? Please visit a website and try again.</p>';
			break;
		case '404':
			msg = '<p>No IP address found for the current URL. Perhaps you are on a local site or intranet?</p>';
			break;
		case '429':
			msg = '<p>You have reached your daily limit of addon/extension use. Please try again after 24 hours.</p>';
			break;
		default:
			msg = "<p>Could not connect to the addon server to retrieve the data. Please check your internet connection and try again.</p>";
	}
	document.getElementById(el).innerHTML = msg;
}

function loadtab(tab) {
	switch(tab) {
	case "0":
		apicall('ipv4_ip','ipv4_output', 'ipv4_message', '/ipv4info/v1/', renderipv4info);
		break;
	case "1":
		apicall('ipv6_ip','ipv6_output', 'ipv6_message', '/ipv6info/v1/', renderipv6info);
		break;
	case "2":
		apicall('isp_name','isp_output', 'isp_message', '/asninfo/v1/', renderispinfo);
		break;
	case "3":
		apicall('domain_dom','domain_output', 'domain_message', '/domaininfo/v1/', renderdomaininfo);
		break;
	case "4":
		apicall('myip_ip','myip_output', 'myip_message', '/myipinfo/v1', rendermyip, true);
		break;
	}
};

function loadtabIPv4() {
	loadtab('0')
}

function loadtabIPv6() {
	loadtab('1')
}

function loadtabISP() {
	loadtab('2')
}

function loadtabDomain() {
	loadtab('3')
}

function loadtabMyIP() {
	loadtab('4')
}

function SaveOptions() {
	localStorage.defaulttab = document.querySelector('#defaulttab').options[document.querySelector('#defaulttab').selectedIndex].value;
	localStorage.pluginkey = document.querySelector('#pluginkey').value;
	saveoptions.value='Saved';
};

function getHostname(str) {
	try {
		var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/|:]+)', 'im');
		return str.match(re)[1].toString();
	} catch (e) {
		return null;
	}
};

function ispvt(hostname) {
	var re = /^((^[a-z0-9-_]+$)|((10|127)\.\d+|(172\.(1[6-9]|2[0-9]|3[01])|192\.168))\.\d+\.\d+)$/i;
	return re.test(hostname);
}

// render functions

function renderipv4info(json) {
	document.getElementById('ipv4_ip').value = json.ip;
	setNetwork('ipv4_ptr', 'ipv4_asn', 'ipv4_asnname', 'ipv4_asnflag', 'ipv4_cidr', json)
	setGeo('ipv4_location', 'ipv4_locflag', 'ipv4_map', 'ipv4_map2', json)
	setHosting("ipv4_ndomains", "ipv4_domains", "ipv4_reverseip",json)
	setDNSBL('ipv4_dnsblmessage', 'ipv4_dnsbllist', json.isipv4, json.dnsbl)
	setWhois('ipv4_whois',json.whois);
	document.getElementById('ipv4_output').style.display = 'block';
	document.getElementById('ipv4_message').innerText = ''
}

function renderipv6info(json) {
	document.getElementById('ipv6_ip').value = json.ip;
	setNetwork('ipv6_ptr', 'ipv6_asn', 'ipv6_asnname', 'ipv6_asnflag', 'ipv6_cidr', json)
	setGeo('ipv6_location', 'ipv6_locflag', 'ipv6_map', 'ipv6_map2', json)
	setHosting("ipv6_ndomains", "ipv6_domains", "ipv6_reverseip",json)
	setWhois('ipv6_whois',json.whois);
	document.getElementById('ipv6_output').style.display = 'block';
	document.getElementById('ipv6_message').innerText = ''
}

function renderispinfo(json) {
	document.getElementById('isp_name').value = json.shortname;
	setISP('isp_asn', 'isp_registry', 'isp_date', 'isp_rank', json);
	setGeo('isp_location', 'isp_locflag', 'isp_map', 'isp_map2', json)
	setWhois('isp_whois',json.whois);
	document.getElementById('isp_output').style.display = 'block';
	document.getElementById('isp_message').innerText = ''
}

function renderdomaininfo(json) {
	document.getElementById('domain_dom').value = json.domain;
	setDomain("domain_tld", "domain_suffix", "domain_alexa", "domain_ranking", "domain_dns", json)
	setWhois('domain_whois',json.whois);
	document.getElementById('domain_output').style.display = 'block';
	document.getElementById('domain_message').innerText = ''
}

function rendermyip(json) {
	document.getElementById('myip_ip').value = json.ip;
	setNetwork('myip_ptr', 'myip_asn', 'myip_asnname', 'myip_asnflag', 'myip_cidr', json)
	setGeo('myip_location', 'myip_locflag', 'myip_map', 'myip_map2', json)
	setDNSBL('myip_dnsblmessage', 'myip_dnsbllist', json.isipv4, json.dnsbl)
	setWhois('myip_whois',json.whois)
	document.getElementById('myip_output').style.display = 'block';
	document.getElementById('myip_message').innerText = ''
}

function setISP(elasn, elreg, eldate, elrank, json) {
	document.getElementById(elasn).innerText = "AS" + json.asn.toString();
	document.getElementById(elasn).href = "https://search.dnslytics.com/bgp/as" + json.asn.toString() + "?utm_source=addon&utm_medium=asn&utm_campaign=ipdomaininfo";
	document.getElementById(elreg).innerText = json.rir;
	document.getElementById(eldate).innerText = json.rirdate;
	document.getElementById(elrank).innerText = json.rank.toLocaleString();
}

function setDomain(eltld, elsuf, elalex, elranking, eldns, json) {
	document.getElementById(eltld).innerText = json.tld;
	document.getElementById(eltld).href ="https://search.dnslytics.com/tld/" + json.tld + "?utm_source=addon&utm_medium=tld&utm_campaign=ipdomaininfo";
	document.getElementById(elsuf).innerText = json.suffix;
	if (json.alexarank > 0) {
		document.getElementById(elalex).innerText = json.alexarank.toLocaleString();
	} else {
		document.getElementById(elalex).innerText = 'not in top million'
	}
	if (json.domainrank>0) { 
		document.getElementById(elranking).innerText = json.domainrank + '/100';
	} else {
		document.getElementById(elranking).innerText = 'not ranked';
	}
	if (json.ip !== undefined && json.ip.length > 0) {
		for(var i = 0; i < json.ip.length; i++) {
			ip = cleanIPHostname(json.ip[i])
			tool = '<a class="form-link text-white btn btn-primary btn-xs" href="https://search.dnslytics.com/search?d=domains&amp;q=ip:&quot;' + ip + '&quot;&amp;utm_source=addon&amp;utm_medium=reverseip&amp;utm_campaign=ipdomaininfo">Reverse IP</a>'
			if (ip.includes(":")) {
				href = '<a href="https://search.dnslytics.com/ip/' + ip + '?utm_source=addon&amp;utm_medium=ipv6&amp;utm_campaign=ipdomaininfo">' + ip + '</a>'
				addRowToTable(eldns, '<td>AAAA</td><td><p class="dnsrecord">' + href + '</p></td><td>' + tool + '</td>');
			} else {
				href = '<a href="https://search.dnslytics.com/ip/' + ip + '?utm_source=addon&amp;utm_medium=ip&amp;utm_campaign=ipdomaininfo">' + ip + '</a>'
				addRowToTable(eldns, '<td>A</td><td><p class="dnsrecord">' + href + '</p></td><td>' + tool + '</td>');
			}
		}
	}
	if (json.ns !== undefined && json.ns.length > 0) {
		for(var i = 0; i < json.ns.length; i++) {
			ns = cleanIPHostname(json.ns[i])
			tool = '<a class="form-link text-white btn btn-primary btn-xs" href="https://search.dnslytics.com/search?d=domains&amp;q=ns:&quot;' + ns + '&quot;&amp;utm_source=addon&amp;utm_medium=reversens&amp;utm_campaign=ipdomaininfo">Reverse NS</a>'
			addRowToTable(eldns, '<td>NS</td><td><p class="dnsrecord">' + ns + '</p></td><td>' + tool + '</td>');
		}
	}
	if (json.mx !== undefined && json.mx.length > 0) {
		for(var i = 0; i < json.mx.length; i++) {
			mx = cleanIPHostname(json.mx[i].split(",", 2)[1]);
			tool = '<a class="form-link text-white btn btn-primary btn-xs" href="https://search.dnslytics.com/search?d=domains&amp;q=mx:&quot;' + mx + '&quot;&amp;utm_source=addon&amp;utm_medium=reversemx&amp;utm_campaign=ipdomaininfo">Reverse MX</a>'
			addRowToTable(eldns, '<td>MX</td><td><p class="dnsrecord">' + mx + '</p></td><td>' + tool + '</td>');
		}
	}
	if (json.txt !== undefined && json.txt.length > 0) {
		for(var i = 0; i < json.txt.length; i++) {
			if (json.txt[i].startsWith("v=spf1")) {
				addRowToTable(eldns, '<td>SPF</td><td colspan="2"><p class="dnsrecord" id="domain_spf"></p></td>');
				document.getElementById('domain_spf').innerText = json.txt[i];
				break;
			}
		}
	}
}

function setGeo(elloc, elflag, elmap, elmap2, json) {
	if (json.locbanner != "") {
		document.getElementById(elloc).innerText = json.locbanner;
		document.getElementById(elflag).src = "images/flags/" + json.countrycode.toLowerCase() + ".png";
		document.getElementById(elmap).src = json.mapsurl;
		document.getElementById(elmap2).src = json.mapsurlsmall;
	} else {
		document.getElementById(elloc).innerText = "<no location found>";
	}
}

function setNetwork(elptr, elasn, elasnname, elasnflag, elcidr, json) {
	if (json.ptr != "") {
		document.getElementById(elptr).innerText = json.ptr
	} else {
		document.getElementById(elptr).innerText = '<no PTR record>';
	}
	if (json.asn > 0) {
		document.getElementById(elasn).innerText = "AS" + json.asn.toString();
		document.getElementById(elasn).href = "https://search.dnslytics.com/bgp/as" + json.asn.toString() + "?utm_source=addon&utm_medium=asn&utm_campaign=ipdomaininfo";
		document.getElementById(elasnname).innerText = json.asnshortname;
		document.getElementById(elasnflag).src = "images/flags/" + json.asncountrycode.toLowerCase() + ".png";
		document.getElementById(elcidr).innerText = json.cidr;
	} else {
		document.getElementById(elasnname).innerText = "<no ISP found>";
	}
}

function setHosting(elndomains, eldomains, elreverseip, json) {
	document.getElementById(elndomains).innerText = json.ndomains.toLocaleString();
	document.getElementById(elreverseip).href = 'https://search.dnslytics.com/search?d=domains&q=ip:"' + json.ip + '"&utm_source=addon&utm_medium=reverseip&utm_campaign=ipdomaininfo';
	if (json.ndomains>0) {
		for(var i = 0; i < json.domains.length; i++) {
			domain = cleanIPHostname(json.domains[i].name)
			rank = parseInt(json.domains[i].domainrank)
			tool = '<a class="form-link text-white btn btn-primary btn-xs" href="https://search.dnslytics.com/domain/' + domain + '?utm_source=addon&amp;utm_medium=domain&amp;utm_campaign=ipdomaininfo">Whois+</a>'
			addRowToTable(eldomains, '<td>' + domain + '</td><td>' + rank + '</td><td>' + tool + '</td>')
		}
	} else {
		document.getElementById(eldomains).style.display = 'none'
	}
}

function setDNSBL(elmsg, ellist, isipv4, dnsbl) {
	if (isipv4) {
		dnsbl.sort(function(x, y) {
			return y.listed - x.listed;
		});
		if (dnsbl[0].listed) {
			document.getElementById(elmsg).innerHTML = '<div class="alert alert-danger" role="alert">IP address is listed.</div>';
		} else {
			document.getElementById(elmsg).innerHTML = '<div class="alert alert-info" role="alert">IP address is not listed.</div>';
		}
		for(var i = 0; i < dnsbl.length; i=i+2) {
			c1 = setDNSBLCell(dnsbl[i])
			if (dnsbl[i+1] != undefined) {
				c2 = setDNSBLCell(dnsbl[i+1])
			} else {
				c2  = '<td></td><td></td>'
			}
			addRowToTable(ellist, c1 + c2)
		}
	} else {
		document.getElementById(elmsg).innerHTML = '<div class="alert alert-warning" role="alert">DNSBL lookup is not supported for IPv6 addresses.</div>';
	}
}

function setDNSBLCell(bl) {
	status = 'OK <img src="images/greenlight.gif">';
	if (bl.listed){
		status = 'Listed <img src="images/redlight.gif">';
	}
	if (bl.error){
		status = 'Timeout <img src="images/greylight.gif">';
	}
	return '<td>'+ cleanIPHostname(bl.name) + '</td><td>' + status + '</td>'
}

function setWhois(el,whois) {
	if (whois != "") {
		document.getElementById(el).innerText = whois;
		document.getElementById(el).innerHTML = document.getElementById(el).innerHTML.replace(/\n/g,'<br/>');
	} else {
		document.getElementById(el).innerText = "<no Whois records found>";
	}
}

function addRowToTable(tableid, value) {
	var table = document.getElementById(tableid);
	var lastRow = table.querySelector('tr:last-of-type');
	var newRow = document.createElement('tr');
	newRow.innerHTML = value
	lastRow.parentNode.insertBefore(newRow, lastRow.nextSibling);
}

function cleanIPHostname(s) {
	return s.replace(/[^A-Za-z0-9-.:_]/g, '')
}