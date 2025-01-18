
default: sign

package:
	zip -r -FS ../freeRep.zip freeRep.js purify.min.js icons/logo-*.png LICENSE Makefile manifest.json README

sign: package
	@echo 'https://addons.mozilla.org/en-US/developers/addon/freerep'
	@echo 'https://chrome.google.com/webstore/developer/dashboard'
	web-ext build --overwrite-dest
	web-ext sign --timeout=300000 --api-key=${APIKEY} --api-secret=${APISECRET}  

update: 
	npm install --global web-ext
	npm update -g
	npm update --global web-ext

