// Copyright (c) Zanger LLC. All rights reserved.

class ProxyMap{constructor(){this.map=new Map();this.proxyCount=0;this.nextProxy=0;}
setProxyCount(count){if(count!=this.proxyCount){this.proxyCount=count;this.nextProxy=0;for(const x of this.map.entries()){if(x[1]>=this.proxyCount){this.assignNewTab(x[0]);}}}}
assignNewTab(tab){this.map.set(tab,this.nextProxy);log.log("Assigning Tab ID "+tab+" to Proxy "+this.nextProxy);this.nextProxy++;this.nextProxy=this.nextProxy%this.proxyCount;if(this.proxyCount==0){this.nextProxy=0;}}
getProxyForTab(tab){if(this.proxyCount==0){return undefined;}
return this.map.get(tab);}
assignProxyToTab(tab,proxy){this.map.set(tab,proxy);}
deleteTab(tab){this.map.delete(tab);}}
const proxyMap=new ProxyMap();