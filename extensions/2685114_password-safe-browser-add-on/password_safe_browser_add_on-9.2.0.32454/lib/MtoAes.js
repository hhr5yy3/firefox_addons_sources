/**
* Erstellt eine Instanz für die AES-Verschlüsselung
* @param key: Geheimer Schlüssel für den symmetrischen Algorithmus 
* @param iv: Initialisierungsvektor
* @param base64Encoded: Gibt an ob der übergebene key und init vector Base64 kodiert sind
*/
function MtoAes(key, iv, base64Encoded) {
	if (window.forge == null) throw "forge.js library required";		
	var _self = this;

	/**
	* Setzt den Key des AES Objekts
	* @param iv: Der AES Schlüssel
	* @param base64Encoded: Gibt an ob der übergebene InitVektor Base64 Encoded ist
	*/
	_self.setKey = function(key, base64Encoded) {		
		if (key == null) throw 'key is null or undefined';

		_self.key = base64Encoded ? forge.util.decode64(key) : key;
	}

	/**
	* Setzt den Init Vektor des AES Objekts
	* @param iv: Der AES InitVektor
	* @param base64Encoded: Gibt an ob der übergebene InitVektor Base64 Encoded ist
	*/
	_self.setIv = function(iv, base64Encoded) {
		if (iv == null) throw 'init vektor is null or undefined';

		_self.iv = base64Encoded ? forge.util.decode64(iv) : iv;
	}
	
	/**
	* Generiert einen zufälligen Schlüssel mit der übergebenen Byte Länge
	* @param: Länge des Byte Schlüssels, 16 => AES-128, 24 => AES-192, 32 => AES-256
	* return: Zufälliger Schlüssel der als Key und/oder InitVektor verwendet werden kann
	*/
	_self.generateRandomBytes = function(count) {
		return forge.random.getBytesSync(count);
	}

	/**
	* Verschlüsselt den übergebenen String
	* @param clear: Der zu verschlüsselnde String
	* @param encodeBase64: Gibt an ob der Verschlüsselte String Base64 encoded zurückgeben wird
	* return: Der Verschlüsselte String oder Null wenn Parameter nicht gesetzt
	*/
	_self.encrypt = function(clear, encodeBase64) {
		if (_self.key == null || _self.key == '') throw "AES key is required";
		if (_self.iv == null || _self.iv == '') throw "AES init vector is required";

		if (clear == null) return null;

		var cipher = forge.cipher.createCipher('AES-CBC', _self.key);
		cipher.start({iv: _self.iv});
		cipher.update(forge.util.createBuffer(clear));
		cipher.finish();

		var encrypted = cipher.output.data;
		return encodeBase64 ? forge.util.encode64(encrypted) : encrypted;
	}

	/**
	* Entschlüsselt den übergebenen String
	* @param encrypted: Der verschlüsselte String 
	* @param encodeBase64: Gibt an ob der Verschlüsselte String Base64 encoded ist
	* return: Der entschlüsselte Wert oder Null wenn encrypted Parameter nicht gesetzt
	*/
	_self.decrypt = function(encrypted, decodeBase64) {
		if (_self.key == null) throw "AES key is required";
		if (_self.iv == null) throw "AES init vector is required";

	    if (encrypted == null) return null;

	    var decoded = decodeBase64 ? forge.util.decode64(encrypted) : encrypted;
	    var decrypter = forge.aes.startDecrypting(_self.key, _self.iv);

	    var newBuffer = forge.util.createBuffer(decoded);
	    decrypter.update(newBuffer);

	    var status = decrypter.finish();
	    return decrypter.output.data;
	}

	if (key != null) {
		_self.key = base64Encoded ? forge.util.decode64(key) : key;	
	} 

	if (iv != null) {
		_self.iv = base64Encoded ? forge.util.decode64(iv) : iv;
	}
}