
/**
* Entschlüsselt den übergebenen Base64 kodierten Cipher mit dem übergebenen Passwort
* @param password: Das Passwort für das Entschlüsseln des Ciphers
* @param cipherBase64: Base64 kodierter Cipher
* return: Entschlüsselter Wert
*/
function DecryptWithPassword(password, cipherBase64) {
  if (password == null) {
    return null
  }

  if (forge == null) {
    throw new Error('forge.js library required')
  }

  if (cipherBase64 == null) {
    throw new Error('Cipher required')
  }

  const separator = forge.util.decode64('AQUABQ==')
  const cipher = forge.util.decode64(cipherBase64)

  try {
    const decryptParts = cipher.split(separator)

    const salt = decryptParts[1]

    const pbkdf2Base64 = MtoPbkdf2(password, salt, 1000, 32)

    const ivBase64 = forge.util.encode64(decryptParts[2])

    const aes = new MtoAes(pbkdf2Base64, ivBase64, true)

    const decrypted = aes.decrypt(decryptParts[3], false)
    return forge.util.encode64(decrypted)
  } catch (ex) {
    console.error(ex)
  }
}


/**
* Entschlüsselt einen Cipher mit einem PrivateKey
* @param privateKey: RSA Objekt mit initialisiertem PrivateKey
* @param cipherBase64: Base64 kodierter cipher
*/
function DecryptWithPrivateKey(rsa, cipherBase64) {
  if (cipherBase64 == null) {
    return null
  }

  if (rsa == null) {
    throw new Error('rsa required')
  }

  if (forge == null) {
    throw new Error('forge.js library required')
  }

  const separator = forge.util.decode64('AQUABQ==')
  const cipher = forge.util.decode64(cipherBase64)

  try {
    const decryptParts = cipher.split(separator)

    // Die zerlegten Teile müssen mindestens fünf sein
    if (decryptParts.length < 5) {
      return null
    }

    const cipherRandom = rsa.decrypt(decryptParts[2], false)

    const salt = decryptParts[1]
    const pbkdf2 = forge.util.decode64(MtoPbkdf2(cipherRandom, salt, 1000, 32))

    const iv = decryptParts[3]
    const aes = new MtoAes(pbkdf2, iv, false)
    return aes.decrypt(decryptParts[4], false)
  } catch (ex) {
    console.error(ex)
  }
}

/**
 * Verschlüsselt einen String mit dem übergebenen RSA Objekt
 * @param rsa: RSA Objekt mit gesetztem PublicKey
 * @param clear: Klartext
 * @returns Verschlüsselter Cipher
 */
function EncryptWithPublicKey(rsa, clear) {
  try {
    const separator = forge.util.decode64('AQUABQ==')
    const type = forge.util.decode64('AA==')
    const random = (forge).random.getBytesSync(32)

    const pbkdf2 = MtoPbkdf2_GenerateSalt(random, 32, 1000, 32)
    const key = pbkdf2.key
    const salt = pbkdf2.salt

    const cipherRandom = rsa.encrypt(random)

    const aes = new MtoAes()
    aes.setKey(forge.util.decode64(key), false)
    aes.setIv((forge).random.getBytesSync(16), false)

    const cipherText = aes.encrypt(clear, false)
    return forge.util.encode64(
      type + separator +
      forge.util.decode64(salt) + separator +
      cipherRandom + separator +
      aes.iv + separator +
      cipherText)
  } catch (ex) {
    console.error(ex)
  }

  return null
}

function EncryptWithPassword(password, clear) {
  try {
    const separator = forge.util.decode64('AQUABQ==')
    const type = forge.util.decode64('AQ==')

    const pbkdf2 = MtoPbkdf2_GenerateSalt(password, 16, 1000, 32)
    const key = pbkdf2.key
    const salt = pbkdf2.salt

    const aes = new MtoAes()
    aes.setKey(forge.util.decode64(key), false)
    aes.setIv((forge).random.getBytesSync(16), false)
    const cipherText = aes.encrypt(clear, false)

    return forge.util.encode64(type + separator + forge.util.decode64(salt) + separator + aes.iv + separator + cipherText)
  } catch (ex) {
    console.error(ex)
  }

  return null
}


/**
* Dekodiert eine Nachricht für die Verschlüsselungsmethoden
* @param str: Nachricht die dekodiert werden soll
*/
function Decode(str) {
  return forge.util.decode64(str)
}
