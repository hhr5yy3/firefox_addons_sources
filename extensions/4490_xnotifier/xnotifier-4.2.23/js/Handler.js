
function Handler(main){
  this.main=main;
}
Handler.prototype={
  count:-1,
  data:{desc:""},
  user: "",
  password: null,
  loginData:[],
  started:false,

  reset : function(){
    this.postMessage({cmd:"reset"});
  },
  silentReset : function(){
    this.postMessage({cmd:"silentReset"});
  },  
  setLoginData:function(){
    this.postMessage({cmd:"setLoginData"});
  },
  check : function(){
    this.started=true;
    this.postMessage({cmd:"check"});
  },
  stop : function(){
    if(this.xhr){
      this.xhr.onreadystatechange=null;
      this.xhr.abort();
      delete this.xhr;
    }
  },

  getHtml:function(aURL,aPostData,aHeaders,aMethod){
    if(aURL instanceof Array){
      aPostData=aURL[1];
      aHeaders=aURL[2];
      aMethod=aURL[3];
      aURL=aURL[0];
    }    
    this.xhr = new XMLHttpRequest();
    var tmp=this;
    this.xhr.onreadystatechange=function(){
      tmp.onStateChange();
    };
    var setContentType=false;
    if(aPostData||aPostData==""){
      this.xhr.open(aMethod?aMethod:"POST", aURL, true);
      setContentType=true;
    }else this.xhr.open(aMethod?aMethod:"GET", aURL, true);
    if(aHeaders){
      for(var t in aHeaders){
        if(t=="Content-Type")setContentType=false;
        this.xhr.setRequestHeader(t,aHeaders[t]);
      }
    }
    if(setContentType)this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    try{
      this.xhr.send(aPostData);
    }catch(e){
      this.doNext("");
    }
  },
  onStateChange:function(){
    if(this.xhr.readyState==4){
      //this.xhr.status==0 when supended
      this.doNext(this.xhr.status==0?null:this.xhr.responseText,this.xhr);
    }
  },
  doNext:function(aData,aHttp){
    if(this.iframe.contentWindow)this.iframe.contentWindow.postMessage({cmd:"doNext",data:aData},"*");
  },
  getIconURL : function(){
    return this.icon;
  },
  getIconPage : function(){
    return this.iconPage;
  },
  getDesc : function(){
    return this.data.desc;
  },
  calcCount : function() {
    var aCount=this.count;
    if(this.main.prefs["resetCounter"]){
      if(aCount>=0){
        var count=this.loadCount();
        if(aCount>=count)aCount-=count;
        else{
          this.saveCount(aCount>0?aCount:0)
          aCount=0;
        }
      }
    }
    return aCount;
  },
  loadCount:function(){
    var count=0;
    if(!this.main.counts)this.main.counts=exlib.loadPrefs("counts",{});
    var o1=this.main.counts;
    if(!o1[this.id])o1[this.id]={};
    var o=o1[this.id];
    if(typeof o[this.user]!="undefined")count=o[this.user];
    else{
      o[this.user]=0;
      exlib.savePrefs("counts",o1);
    }
    return count;
  },
  saveCount:function(n){
    if(!this.main.counts)this.main.counts=exlib.loadPrefs("counts",{});
    var o=this.main.counts;
    if(!o[this.id])o[this.id]={};
    o[this.id][this.user]=n;
    exlib.savePrefs("counts",o);
  },

  //for chrome
  getCookies:function(domain){
    var self=this;
    chrome.cookies.getAll({domain:domain},
      function(cookies){
        self.cookies=cookies;
      });
  },
  _setCookies:function(isOpenView){
    if(isOpenView)this.main._openView(this);
    else this.doNext("");
  },
  setCookies:function(isOpenView){
    if(!this.cookies||this.cookies.length==0){
      this._setCookies(isOpenView);
      return;
    }
    for(var i=0;i<this.cookies.length;i++){
      var ck=this.cookies[i];
      var domain=ck.domain;
      if(!ck.domain){
        if(i==this.cookies.length-1){
          this._setCookies(isOpenView);          
          return;
        }else continue;
      }
      ck.url=(ck.secure?"https":"http")+"://";
      if(ck.domain.indexOf(".")==0)ck.url+=ck.domain.substring(1);
      else ck.url+=ck.domain;
      if(ck.hostOnly)delete ck.domain;
      delete ck["hostOnly"];
      delete ck["session"];
      var self=this;
      chrome.cookies.set(ck,i==this.cookies.length-1?function(){
        self._setCookies(isOpenView); 
      }:null);
    }
  },
  removeCookies:function(){
    var self=this;
    chrome.cookies.getAll({domain:this.cookieDomain},
      function(cookies){
        self._removeCookies(cookies);
      });
  },
  _removeCookies:function(cookies){
    if(cookies.length==0){
      this.doNext("");
      return;
    }
    for(var i=0;i<cookies.length;i++){
      var ck=cookies[i];
      var domain=ck.domain;
      if(domain.charAt(0)=='.')domain="www"+domain;
      var obj={};
      obj.url=(ck.secure?"https":"http")+"://"+domain+ck.path;
      obj.name=ck.name;
      var self=this;
      chrome.cookies.remove(obj,i==cookies.length-1?function(){
        self.doNext("");
      }:null);
    }
  },

  postMessage:function(data){
    this.iframe.contentWindow.postMessage(data,"*");
  }
}
Handler.prototype.baseProcess=Handler.prototype.process;