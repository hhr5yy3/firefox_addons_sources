(function(XMLDocReader) {
   XMLDocReader.log = console.log.bind(console||window.console, '%c[XMLDocReader]', 'color: #2E8B57;');
   XMLDocReader.url = window.location.href;

   window.addEventListener('message', function receiveMessage(event) {
     if (event.origin !== 'https://e.land.gov.ua' || event.source !== window) return;
     if(event.data.message === 'XDR_RECAPTCHA_GET') {
        grecaptcha.ready(function() {
           grecaptcha.execute(recaptcha3_publicKey, {
             action: event.data.action // parcel_registration_modify | parcel_info
           }).then(function(token) {
              window.dispatchEvent(new CustomEvent('XDR_RECAPTCHA_TOKEN', { 'detail': { 'token' : token } } ));
           });
        });
     }
   }, false);

   XMLDocReader.log('Library messaging content is loaded successfully');
})({});
