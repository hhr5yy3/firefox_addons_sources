function dout(s) {
	console.info(s);
}

var tmp=new Handler();
for(var i in tmp)this[i]=tmp[i];
delete tmp;

var sandbox={
  init:function(){
    sandbox.ind=window.location.search.match(/id=(\d+)/)[1];
  },
  onMessage:function (event){
    var cmd = event.data.cmd;
    switch(cmd){
    case "init":
      sandbox.main=event.source;
      sandbox.origin=event.origin;
      var acc=event.data.acc;
      for(var i in acc){
        this[i]=acc[i];
      }
      var d=event.data.id;
      
      var script=document.createElement("script");
      script.src="../scripts/"+d+".js";

      var obj=this;
      script.addEventListener("load", function(){
        if(obj.needLocale)obj.needServer=true;
        if(obj.needServer)obj.server=obj.user.split("|")[1];
        if(obj.init)obj.init();
        obj.setLoginData();
        obj.stage=(obj.checkLogin?ST_CHECK:obj.initStage);

        sandbox.postMessage(
          {cmd:"inited",data:{
            icon:obj.getIconURL(),
            iconPage:obj.getIconPage(),
            viewDomain:obj.viewDomain,
            cookieDomain:obj.cookieDomain,
            logoutURL:obj.logoutURL,
            noCounterReset:obj.noCounterReset,
            supportMulti:obj.supportMulti}});
      });
      document.body.appendChild(script);          
      break;
    case "setLoginData":
      setLoginData();
      break;
    case "check":
      check();
      break;
    case "doNext":
      doNext(event.data.data);
      break;
    case "multiId":
      this.multiId=event.data.data;
      break;
    case "openView":
      sandbox.postMessage({cmd:"openView",data:this.getViewURL()});
      break;
    case "updateTab":
      sandbox.postMessage({cmd:"updateTab",data:event.data.data,url:this.getViewURL()});
      break;
    case "reset":
      reset();
      break;
    case "silentReset":
      this.silentReset=true;
      break;
    case "updateCount":
      this.savedCount=event.data.scount;
      sandbox.postMessage({cmd:cmd,data:this.getDesc()});
      break;
    case "setPwd":
      this.password=event.data.data;
      break;
    case "setNoPwd":
      this.noPwd=event.data.data;
      break;
    case "loadDB":
      this.localDB=event.data.data;
      break;
////////////debug////////////////
    case "debug":
      this.debug=event.data.val;
      break;
////////////////////////////////
    }
  },
  postMessage:function(msg){
    msg.ind=sandbox.ind;
    sandbox.main.postMessage(msg,sandbox.origin);
  }
}
window.addEventListener("load",sandbox.init);
window.addEventListener('message',sandbox.onMessage);