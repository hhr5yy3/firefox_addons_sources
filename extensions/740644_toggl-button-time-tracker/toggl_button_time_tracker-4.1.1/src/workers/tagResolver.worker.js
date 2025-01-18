function r(o){const{tags:e,tagNames:s}=o.data;return Object.values(e).filter(t=>s.includes(t.name)).map(t=>t.id)}self.onmessage=function(o){try{console.time("toggl:tagResolverWorker");const e=r(o);self.postMessage(e),console.timeEnd("toggl:tagResolverWorker")}catch(e){console.error(e,"toggl:tagResolverWorker")}};
//# sourceMappingURL=tagResolver.worker.js.map
