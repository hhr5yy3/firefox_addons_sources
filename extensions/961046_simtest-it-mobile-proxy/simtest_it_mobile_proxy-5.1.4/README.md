## RUN

web-ext run --pref network.proxy.autoconfig_url.include_path=true --bc


## Build

https://addons.mozilla.org/en-US/developers/addon/api/key/

JWT issuer: user:12056031:301



JWT secret: e7044fe557228e8149a39ddab55afc9901a4cc979683400dcd0fc5c8fcd19e2f

user:13716917:159
bb181d54b564b25adb313284fed705fc7baa5146bba0f9fd23dd9d15239ff505


web-ext build  --config-discovery=false


&& web-ext sign --api-key=user:13716917:159 --api-secret=bb181d54b564b25adb313284fed705fc7baa5146bba0f9fd23dd9d15239ff505




pluginfixer 
addon123#

web-ext run --config-discovery=false --bc --url=https://www.whatismyip.com/

web-ext run --config-discovery=false --bc --url=http://localtest.local/test/simtest/browsing.php
