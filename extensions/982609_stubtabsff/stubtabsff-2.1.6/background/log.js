// Copyright (c) Zanger LLC. All rights reserved.

class Log{constructor(){this.epoch=Date.now()/1000;}
log(message){console.log(Math.round((Date.now()/1000)-this.epoch)+" "+CONTEXT_NAME+" - "+message);}}
const log=new Log();