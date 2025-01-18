/**
* Erstellt einen pseudozufälligen PBKDF2-Schlüssel
* @param password: Das passwort für den Schlüssel
* @param salt: Der Salt auf dessen Basis der Schlüssel erzeugt wird
* @param iterations: Anzahl der Iterationen für die Schlüsselerzeugung
* @param keySize: Bytegröße des Schlüssels
* returns: Base64 String mit dem Key oder null wenn kein Passwort übergeben wurde
*/
function MtoPbkdf2(password, salt, iterations, keySize) {
	if (window.forge == null) throw "forge.js library required";	
	if (salt == null) throw "salt required";		
	if (password == null) return null;

	var key = window.forge.pkcs5.pbkdf2(password, salt, iterations, keySize);
	return window.forge.util.encode64(key);
}

/**
* Erstellt einen pseudozufälligen PBKDF2-Schlüssel und generiert anhand der
* übergebenen saltBytes einen zufälligen Salt
* @param password: Das passwort für den Schlüssel
* @param saltBytes: Bytegröße des Salts, wird zufällig generiert
* @param iterations: Anzahl der Iterationen für die Schlüsselerzeugung
* @param keySize: Bytegröße des Schlüssels
* returns: Objekt mit Base64 Key und Base64 Salt {key, salt}
*/
function MtoPbkdf2_GenerateSalt(password, saltBytes, iterations, keySize) {
	if (window.forge == null) throw "forge.js library required";		

	var salt = window.forge.random.getBytesSync(saltBytes);
	var saltBase64 = window.forge.util.encode64(salt);

	var keyBase64 = MtoPbkdf2(password, salt, iterations, keySize);
	return {key: keyBase64, salt: saltBase64};	
}