This add-on uses 3th-party libs:
 jquery 3.4.1 from https://code.jquery.com/jquery-3.4.1.min.js
 sweetalert.js 1.0.1 from https://cdnjs.cloudflare.com/ajax/libs/bootstrap-sweetalert/1.0.1/sweetalert.min.js

  
Fixes and updates:
 1.0.7 
- remove common-push.js (our notification wrapper)
- remove localization of ui, with custom data-i18n attribute
- remove CSP from manifest, using local version for lit-element, source singleton project https://github.com/PolymerLabs/lit-element-build-rollup.git
-- should be nodeJs with npm installed on your host, for build sources run:
npm install
npm run build 
--
output add-on will in ./build