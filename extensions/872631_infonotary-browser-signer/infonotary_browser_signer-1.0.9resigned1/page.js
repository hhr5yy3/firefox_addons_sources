var InfoNotarySigner = (function() {
  const TEXT_PLAIN = 'text/plain';
  const SCHEME_DETACHED = 'detached';
  const MESSAGE_TYPE_SIG_V2 = 'inotary-sign-request';
  const MESSAGE_CHECK_HOST = 'inotary-check-host';
  const IO_FORMAT_TEXT = 'text';
  const IO_FORMAT_BLOB = 'blob';
  
  var id_base = (Math.random() + 1).toString(36).substring(2);
  var counter = 0;
  var map = {};
  
  function getId() {
    return id_base + (counter++);
  }
  
  function b64ToBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
  
  window.addEventListener('message', function(event) {
    // We only accept messages from ourselves
    if (event.source !== window)
      return;
    if (event.data.resp) {
      if (event.data.resp.substring(0, 8) === 'inotary-') { //MESSAGE_TYPE_SIG_V2) {
        var res = event.data.result;
        var p = map[res.id];
        if(res.errors && res.errors.length > 0) {
          p.reject(res.errors);
        } else {
          if(event.data.resp === MESSAGE_TYPE_SIG_V2) {
            if(p.outFormat === IO_FORMAT_BLOB)
              res.result = b64ToBlob(res.result, 'application/pkcs7-signature');
            p.resolve(res.result);
          } else if(event.data.resp === MESSAGE_CHECK_HOST) {
            p.resolve(true);
          }
        }
        delete map[res.id];
      }
    }
  }, false);
  
  // Public API
  var signer_object = function(key) {
    var m_contentType = TEXT_PLAIN;
    var m_scheme = SCHEME_DETACHED;
    var m_outputFormat = IO_FORMAT_TEXT;
    var m_inputFormat = IO_FORMAT_TEXT;
    var m_binary = false;
    var m_licenseKey = key;
    
    if (typeof m_licenseKey === 'undefined')
      m_licenseKey = '';
    
    this.scheme = function(newVal) {
      if (typeof newVal === 'undefined') {
        return m_scheme;
      }
      m_scheme = newVal;
      return this;
    }
    
    this.contentType = function(newVal) {
      if (typeof newVal === 'undefined')
        return m_contentType;
      m_contentType = newVal;
      return this;
    }
    
    this.binary = function(newVal) {
      if (typeof newVal === 'undefined')
        return this.m_inputFormat === IO_FORMAT_BLOB;
      if(newVal)
        this.m_inputFormat = IO_FORMAT_BLOB;
      else
        this.m_inputFormat = IO_FORMAT_TEXT;
      return this;
    }
    
    this.inputFormat = function(newVal) {
      if (typeof newVal === 'undefined')
        return m_inputFormat;
      if(newVal == IO_FORMAT_BLOB)
        m_inputFormat = IO_FORMAT_BLOB;
      else if(newVal == IO_FORMAT_TEXT)
        m_inputFormat = IO_FORMAT_TEXT;
      return this;
    }
    
    this.outputFormat = function(newVal) {
      if (typeof newVal === 'undefined')
        return m_outputFormat;
      if(newVal == IO_FORMAT_BLOB)
        m_outputFormat = IO_FORMAT_BLOB;
      else if(newVal == IO_FORMAT_TEXT)
        m_outputFormat = IO_FORMAT_TEXT;
      return this;
    }
    
    this.licenseKey = function() {
      return m_licenseKey;
    }
  };

  signer_object.prototype = {
    signText: function(text) {
      var key = this.licenseKey();
      var res = new Promise(
        function(resolve, reject){
          var id = getId();
          map[id] = ({'resolve': resolve, 'reject': reject,
                      'outFormat': IO_FORMAT_TEXT});
          window.postMessage({'type': MESSAGE_TYPE_SIG_V2, 'id': id,
                              'text': text, 'contentType': TEXT_PLAIN,
                              'scheme': SCHEME_DETACHED, 'binary': false,
                              'encoding': document.characterSet,
                              'origin': '', 'license': key}, '*');
        }
      );
      return res;
    },
    sign: function(data) {
      var id = getId();
      var msg = {'type': MESSAGE_TYPE_SIG_V2, 'id': id,
                 'text': data, 'contentType': this.contentType(),
                 'scheme': this.scheme(), 'binary': this.binary(),
                 'encoding': document.characterSet,
                 'origin': '', 'license': this.licenseKey()};
      var outFormat = this.outputFormat();
      var res = new Promise(
        function(resolve, reject){
          map[id] = ({'resolve': resolve, 'reject': reject,
                      'outFormat': outFormat});
          window.postMessage(msg, '*');
        }
      );
      return res;
    },
    isNativeHostAvaiable: function() {
      var key = this.licenseKey();
      var res = new Promise(
        function(resolve, reject){
          var id = getId();
          map[id] = ({'resolve': resolve, 'reject': reject});
          window.postMessage({'type': MESSAGE_CHECK_HOST, 'id': id,
                              'origin': '', 'license': key}, '*');
        }
      );
      return res;
    }
  };

  return signer_object;
})();
