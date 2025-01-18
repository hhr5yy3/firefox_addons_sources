var XMLDSig = new function () {
  
  function signedInfoContent(digest) {
    return '' +
      '<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"></CanonicalizationMethod>' +
      '<SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"></SignatureMethod>' +
      '<Reference URI="">' +
        '<Transforms>' +
          '<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"></Transform>' +
        '</Transforms>' +
        '<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"></DigestMethod>' +
        '<DigestValue>' + digest + '</DigestValue>' +
      '</Reference>'
  }
  
  function signedInfo(digest) {
    return '' +
      '<SignedInfo>' +
        signedInfoContent(digest) +
      '</SignedInfo>'
  }
  
  function signedInfoWithPropagatedNamespace(digest) {
    return '' +
      '<SignedInfo xmlns="http://www.w3.org/2000/09/xmldsig#">' +
        signedInfoContent(digest) +
      '</SignedInfo>'
  }
  
  function signatureBlock(document, signature, certificate, modulus, exponent) {
    return new DOMParser().parseFromString(
      '<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">' +
        signedInfo(digest(document)) +
        '<SignatureValue>' + signature + '</SignatureValue>' +
        '<KeyInfo>' +
          '<KeyValue>' +
            '<RSAKeyValue>' +
              '<Modulus>' + modulus + '</Modulus>' +
              '<Exponent>' + exponent + '</Exponent>' +
            '</RSAKeyValue>' +
          '</KeyValue>' +
          '<X509Data>' +
            '<X509Certificate>' + certificate + '</X509Certificate>' +
          '</X509Data>' +
        '</KeyInfo>' +
      '</Signature>'
      , 'application/xml').documentElement
  }
  
  function hex2bin(hex) {
    var bytes = [];
    for (var i = 0; i < hex.length - 1; i += 2)
      bytes.push(parseInt(hex.substr(i, 2), 16));
    return String.fromCharCode.apply(String, bytes);
  }

  function base64hash(document) {
    return btoa(hex2bin(Sha256.hash(document)))
  }

  function canonicalize(document) {
    return document
      .replace(/\<\?xml.+\?\>(\s*)/g, '')
      .replace(/<(.*?)\s*\/>/g, '<$1></$1>')
      .replace(/\s*$/, '')
  }

  function digest(document) {
    return base64hash(canonicalize(document))
  }
  
  this.sign = function (document, signature, certificate, modulus, exponent) {
    var dom = new DOMParser().parseFromString(document, "application/xml");
    dom.documentElement.appendChild(signatureBlock(document, signature, certificate, modulus, exponent));
    return new XMLSerializer().serializeToString(dom);
  };
  
  this.hash = function (document) {
    return base64hash(signedInfoWithPropagatedNamespace(digest(document)))
  };

}();