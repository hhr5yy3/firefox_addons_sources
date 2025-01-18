
/**
* Klasse für die RSA Verschlüsselung
* Ein PrivateKey kann direkt im Konstruktor übergeben werden, oder später mit einer
* der Hilfsmethoden generiert (@generateKeyPair) oder initialisiert (@privateKeyFromXml) 
* werden um anschließend Daten zu signieren (@signData) oder zu entschlüsseln (@decrypt)
*
* @param privateKey: forge.js privateKey Instanz oder null
*/
function MtoRsa(privateKey) {	
	if (forge == null) throw 'forge.js library required';

	// Variable für Namespace definieren für bessere Lesbarkeit
	var BigInteger = forge.jsbn.BigInteger;

	/**
	* Klasseninterne Methode zur Erzeugung von BigInteger Objekten
	*/
	function parseBigInteger(b64) {
	    return new BigInteger(new forge.util.createBuffer(forge.util.decode64(b64)).toHex(), 16);
	}

	var _self = this;	
	_self.privateKey = privateKey;
	_self.publicKey;

	/**
	* Generiert ein Private-/Public Keypair mit der übergebenen Anzahl an Bits
	*/
	_self.generateKeyPair = function() {
		var keypair = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001});
		_self.privateKey = keypair.privateKey;
		_self.publicKey = keypair.publicKey;
	}

	/**
	* Signiert die Daten mit dem PrivateKey
	* @param message: Nachricht die signiert werden soll
	* @param encode64: Gibt an ob das Ergebnis Base64 kodiert werden soll, default true
	* @param encoding: Gibt das String Encoding an (utf8, utf16)
	* @return: Signierte Nachricht
	*/
	_self.signData = function(message, encodeBase64, encoding) {
		if (_self.privateKey == null) {
			throw 'PrivateKey is not set, use generateKeyPair or privateKeyFromXml to initialize it';
		}

		var md = forge.md.sha512.create();
		md.update(message, encoding);

		var result = _self.privateKey.sign(md);
		return encodeBase64 ? forge.util.encode64(result) : result;
	}

	/**
	* Entschlüsselt die übergebenen Daten mit dem privaten Schlüssel
	* @param encrypted: Eine verschlüsselte Base64 kodierte Nachricht	
	* @param decodeBase64: Gibt an ob der verschlüsselte Wert Base64 decoded werden soll
	*/
	_self.decrypt = function(encrypted, decodeBase64) {    	
		if (_self.privateKey == null) {
			throw 'PrivateKey is not set, use generateKeyPair or privateKeyFromXml to initialize it'
		}		

		if (encrypted == null) return null;

    	var decoded = decodeBase64 ? forge.util.decode64(encrypted) : encrypted;    
    	return _self.privateKey.decrypt(decoded);          
  	}

    /**
  	* Verschlüsselt die übergebenen Daten mit dem öffentlichen Schlüssel
  	* @param clear: Text der verschlüsselt werden soll
  	* @param decodeBase64: Gibt an ob Base64 decoded werden soll
  	*/
  	_self.encrypt = function(clear, decodeBase64) {
  		if (_self.publicKey == null) {
  			throw 'PublicKey is not set, use generateKeyPair or publicKeyFromXml to initialize it';
  		}

  		if (clear == null) return null;
  		if (decodeBase64) clear = forge.util.decode64(clear);
  		return _self.publicKey.encrypt(clear);
  	}

  	/**
  	* Exportiert den öffentlichen Schlüssel als XML
  	* @param window: Window Objekt um ein XML Dokument erzeugen zu können
  	* @result: PublicKey als XML-String
  	*/
	_self.publicKeyToXml = function(window) {    
	    var doc = window.document.implementation.createDocument("", "", null);
	    var rsaXml = doc.createElement("RSAKeyValue");

	    var modulus = doc.createElement("Modulus");    
	    modulus.textContent = forge.util.encode64(forge.util.hexToBytes(_self.publicKey.n.toString(16)));
	    rsaXml.appendChild(modulus);

	    var exponent = doc.createElement("Exponent");
	    exponent.textContent = forge.util.encode64(forge.util.hexToBytes(_self.publicKey.e.toString(16)))
	    rsaXml.appendChild(exponent);

	    doc.appendChild(rsaXml);      
	    var xmlSerializer = new window.XMLSerializer();    
	    return xmlSerializer.serializeToString(doc);
	}

	/**
	* Erzeugt den öffentlichen Schlüssel anhand des übergbenen XML und setzt diesen
	* in der aktuellen Instanz (@this.publicKey)
	* @param xml: PublicKey als XML String
	*/
	_self.publicKeyFromXml = function(xml) {	    
	    var oParser = new DOMParser();
	    var oDOM = oParser.parseFromString(xml, "text/xml");

	    // print the name of the root element or error message
	    if (oDOM.documentElement.nodeName == "parsererror") {
	        throw new Error('Could not parse public key XML.');
	    }

	    var rsaKeyValue = {
	        Modulus: oDOM.getElementsByTagName("Modulus")[0].childNodes[0].nodeValue,
	        Exponent: oDOM.getElementsByTagName("Exponent")[0].childNodes[0].nodeValue
	    };

	    var publicKey = forge.pki.setRsaPublicKey(
	        parseBigInteger(rsaKeyValue.Modulus), // n
	        parseBigInteger(rsaKeyValue.Exponent)); // e	    
	    _self.publicKey = publicKey;
	};

    /**
* Exportiert den privaten Schlüssel als XML
* @param window: Window Objekt um ein XML Dokument erzeugen zu können
* @result: PrivateKey als XML-String
*/
	_self.privateKeyToXml = function(window) {
	    var doc = window.document.implementation.createDocument("", "", null);
	    var rsaXml = doc.createElement("RSAKeyValue");
	    var modulus = doc.createElement("Modulus");    
	    modulus.textContent = forge.util.encode64(forge.util.hexToBytes(_self.privateKey.n.toString(16)));
	    rsaXml.appendChild(modulus);
        
	    var exponent = doc.createElement("Exponent");
	    exponent.textContent = forge.util.encode64(forge.util.hexToBytes(_self.privateKey.e.toString(16)));
	    rsaXml.appendChild(exponent);
        
	    var p = doc.createElement("P");
	    p.textContent = forge.util.encode64(forge.util.hexToBytes(_self.privateKey.p.toString(16)));
	    rsaXml.appendChild(p);

	    var q = doc.createElement("Q");
	    q.textContent = forge.util.encode64(forge.util.hexToBytes(_self.privateKey.q.toString(16)));
	    rsaXml.appendChild(q);
        
	    var dp = doc.createElement("DP");
	    dp.textContent = forge.util.encode64(forge.util.hexToBytes(_self.privateKey.dP.toString(16)));
	    rsaXml.appendChild(dp);
        
	    var dq = doc.createElement("DQ");
	    dq.textContent = forge.util.encode64(forge.util.hexToBytes(_self.privateKey.dQ.toString(16)));
	    rsaXml.appendChild(dq);
        
	    var invQ = doc.createElement("InverseQ");
	    invQ.textContent = forge.util.encode64(forge.util.hexToBytes(_self.privateKey.qInv.toString(16)));
	    rsaXml.appendChild(invQ);
        
	    var d = doc.createElement("D");
	    d.textContent = forge.util.encode64(forge.util.hexToBytes(_self.privateKey.d.toString(16)));
	    rsaXml.appendChild(d);
        
	    doc.appendChild(rsaXml);      
	    var xmlSerializer = new window.XMLSerializer();    
	    return xmlSerializer.serializeToString(doc);
	}

	/**
	* Erzeugt den privaten Schlüssel anhand des übergbenen XML und setzt diesen
	* in der aktuellen Instanz (@this.privateKey)
	* @param xml: PrivateKey als XML String
	*/
	_self.privateKeyFromXml = function(xml) {	     
		var decodeTries = 0
		while (xml.indexOf('<') !== 0 && decodeTries < 4) {
			xml = forge.util.decode64(xml)
			decodeTries++
        }

	    var oParser = new DOMParser();	    
	    var oDOM = oParser.parseFromString(xml, "text/xml");        

	    // print the name of the root element or error message
	    if (oDOM.documentElement.nodeName == "parsererror") {
	        throw new Error('Could not parse public key XML.');
	    }

	    var rsaKeyValue = {
	        Modulus: oDOM.getElementsByTagName('Modulus')[0].childNodes[0].nodeValue,
	        Exponent: oDOM.getElementsByTagName('Exponent')[0].childNodes[0].nodeValue,
	        D: oDOM.getElementsByTagName('D')[0].childNodes[0].nodeValue,
	        P: oDOM.getElementsByTagName('P')[0].childNodes[0].nodeValue,
	        Q: oDOM.getElementsByTagName('Q')[0].childNodes[0].nodeValue,
	        DP: oDOM.getElementsByTagName('DP')[0].childNodes[0].nodeValue,
	        DQ: oDOM.getElementsByTagName('DQ')[0].childNodes[0].nodeValue,
	        InverseQ: oDOM.getElementsByTagName('InverseQ')[0].childNodes[0].nodeValue
	    };
       	    

	    var privateKey = forge.pki.setRsaPrivateKey(
	      parseBigInteger(rsaKeyValue.Modulus), // n
	      parseBigInteger(rsaKeyValue.Exponent), // e
	      parseBigInteger(rsaKeyValue.D),
	      parseBigInteger(rsaKeyValue.P),
	      parseBigInteger(rsaKeyValue.Q),
	      parseBigInteger(rsaKeyValue.DP),
	      parseBigInteger(rsaKeyValue.DQ),
	      parseBigInteger(rsaKeyValue.InverseQ)); // qInv

	    _self.privateKey = privateKey;	    
	};
}