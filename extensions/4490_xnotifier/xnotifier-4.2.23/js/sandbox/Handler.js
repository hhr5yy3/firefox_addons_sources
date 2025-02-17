const ST_CHECK       = 0;
const ST_PRE         = 100;
const ST_PRE_RES     = 101;
const ST_LOGIN       = 200;
const ST_LOGIN_RES   = 201;
const ST_DATA        = 300;
const ST_DATA_RES    = 301;
const ST_LOGOUT      = 400;

const LOGIN_URL      = 0;
const LOGIN_ID       = 1;
const LOGIN_PW       = 2;
const LOGIN_DATA     = 3;
const LOGIN_POST     = 4;

function Handler(){
}
Handler.prototype={
  stage: 0,
  initStage: ST_LOGIN,
  count:-1,
  data:{},
  user: "",
  password: null,
  loginData:[],
  retry:1,
  silentReset:false,

  reset : function(silent){
    this.count=-1;
    this.data={};
    this.data.desc=this.getDesc();
    this.stage=(this.checkLogin?ST_CHECK:this.initStage);
    if(!silent)sandbox.postMessage({cmd:"reset",count:count,data:data});
  },
  setLoginData:function(){
    if(this.loginData){
      var post=(this.loginData[LOGIN_DATA]?this.loginData[LOGIN_DATA]:"");
      if(this.loginData[LOGIN_ID]){
        if(post)post+="&";
        var user;
        if(this.needServer)user=this.user.split("|")[0];
        else user=this.user;
        post+=this.loginData[LOGIN_ID]+"="+encodeURIComponent(user);
      }
      if(this.loginData[LOGIN_PW]){
        if(post)post+="&";
        post+=this.loginData[LOGIN_PW]+"="+encodeURIComponent(this.password);
      }
      //this.loginData.splice(1,this.loginData.length-1);
      this.loginData[LOGIN_POST]=post;
    }
  },
  check : function(){
    if(!this.enabled)return;
    sandbox.postMessage({cmd:"stop"});
    if(this.silentReset){
      this.silentReset=false;
      this.reset(true);      
    }else if(this.count<0){
      this.reset();
    }
    else this.stage=ST_DATA;
    this.doNext("");
  },
  doNext:function(aData,aHttp){
    try{
      if(!this.process(aData,aHttp))++this.stage;
    }catch(e){
      this.onError();
console.log(e);
    }
  },
  process:function(aData,aHttp){
//dout(this.stage);
//dout(this.stage+" "+aData);
    switch(this.stage){
    case ST_LOGIN:
      this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]);
      return false;
    case ST_LOGIN_RES:
      this.stage=ST_DATA;
      return this.process(aData,aHttp);
    case ST_DATA:
      this.getHtml(this.dataURL);
      return false;
    case ST_DATA_RES:
      var n=parseInt(this.getCount(aData));
      this.count=isNaN(n)?-1:n;
      this.data=this.getData(aData);
      this.data.desc=this.getDesc();
      ////////delete later///////////////////
      if(this.data.folders){
        if(typeof this.data.folders[0]=="string"){
          var ar=this.data.folders;
          var ar2=[];
          for(var i=0;i<ar.length;i+=2){
            ar2.push({id:ar[i],count:ar[i+1]});
          }
          this.data.folders=ar2;
        }
      }
      ///////////////////////////////////////
      if(this.count<0){
        if(this.noPwd){
          this.password="";
          sandbox.postMessage({cmd:"setPwd",data:""});
        }
        if(this.retry<1){
          ++this.retry;
          resetCookies();
          this.check();
          return true;
        }else{
          this.reset();
          resetCookies();
        }
      }else{
        if(this.cookieDomain){
          sandbox.postMessage({cmd:"getCookies",data:this.cookieDomain});
          this.cookies=true;
        }
        this.retry=0;
        this.stage=ST_DATA;
      }
      sandbox.postMessage({cmd:"setResult",count:this.count,data:this.data});
      return true;
    }
    if(this.stage<ST_PRE&&this.checkLogin){
      return this.checkLogin(aData);
    }
dout("[onError] "+this.id+" "+this.user+" "+this.stage);
    this.onError();
    return true;
  },
  onError : function(e){
console.log(this.id+" "+this.stage);
    if(this.noPwd){
      this.password="";
      sandbox.postMessage({cmd:"setPwd",data:""});
    }
    this.reset();
    resetCookies();
    sandbox.postMessage({cmd:"setResult",count:count,data:data});
  },

  resetCookies:function(){
    delete this.cookies;
    sandbox.postMessage({cmd:"resetCookies"});
  },
  getHtml:function(aURL,aPostData,aHeaders,aMethod) {
    var ar=[];
    for(var i=0;i<arguments.length;i++)ar.push(arguments[i]);
    sandbox.postMessage({cmd:"getHtml",data:ar});
  },

  getViewURL : function(aFolder){
    return this.viewURL;
  },
  getIconURL : function(){
    try{
      var url=this.viewURL.match(/(((\S+):\/\/([^/]+))(\S*\/)?)([^/]*)/);
      if(url)return url[2]+"/favicon.ico";
    }catch(e){}
    return null;
  },
  getIconPage : function(){
    return null;
  },
  getCount : function(aData){
    return -1;
  },
  getData : function(aData){
    return {};
  },
  getDesc : function(){
    var n=this.calcCount();
    return n>0?n:"";
  },
  calcCount : function() {
    var n=this.count;
    if(this.resetCounter){
      if(n>=0){
        var count=this.savedCount;
        if(n>=count)n-=count;
        else{
          this.saveCount(n>0?n:0)
          n=0;
        }
      }
    }
    return n;
  },
  loadCount:function(){
    return this.savedCount;
  },
  saveCount:function(n){
    this.savedCount=n;
    sandbox.postMessage({cmd:"saveCount",data:n});
  },
  getForm:function(data,name,action){
    var url=null;
    if(name){
      var reg=new RegExp("<form([^>]+?id\\s*=\\s*[\"\']"+name+"[\"\'][\\S\\s]+?)<\/form>","i");
      var s=data.match(reg);
      if(!s)return "";
      data=s[1];
    }
    if(action){
      var fnd=data.match(/action\s*=\s*[\"\'](\S+?)[\"\']/);
      if(fnd)url=fnd[1];
    }
    var re=/<input[^>]+?name\s*=\s*[\"\'](\S+?)[\"\'][^>]+?value\s*=s*[\"\']([\s\S]*?)[\"\'][\s\S]*?>/ig;
    var o;
    var post="";
    while ((o = re.exec(data)) != null){
      if(o[0].match(/type\s*=\s*[\"\']?hidden[\"\']?/i)){
        if(post)post+="&";
        post+=o[1]+"="+encodeURIComponent(o[2]);
      }
    }
    if(action)return url?[url,post]:null;
    return post;
  },
  checkLogin:function(aData){
    switch(this.stage){
    case ST_CHECK:
      this.stage=this.initStage;
      if(this.cookies){
        this.stage=ST_DATA;
        this.setCookies();
        return true;
      }else if(this.cookieDomain){
        this.removeCookies();
        return true;
      }else if(this.logoutURL){//for Old script
        this.getHtml(this.logoutURL);
        return true;
      }else return this.process(aData);
    }
    this.onError();
    return true;
  },
  delay:function(sec){
    var self=this;
    window.setTimeout(function(){self.doNext("");},sec);
  },
  setResult:function(){
    sandbox.postMessage({cmd:"setResult",count:this.count,data:this.data});
  },
  openAuthDialog:function(id,user,url){
    sandbox.postMessage({cmd:"openAuthDialog",id:id,user:user,url:url});
  },
  getScriptList:function(){
    sandbox.postMessage({cmd:"getScriptList"});
  },
  setCookies:function(){//Chrome only
    sandbox.postMessage({cmd:"setCookies"});
  },
  removeCookies:function(){//Chrome only
    sandbox.postMessage({cmd:"removeCookies"});
  },
////////////debug////////////////
  dlog:function(s1,s2){
    sandbox.postMessage({cmd:"dlog",s1:s1,s2:s2});
  }
////////////////////////////////
}
Handler.prototype.baseProcess=Handler.prototype.process;
///// delete later 2013-05-07 //////////
Handler.prototype.openCaptchaDialog=Handler.prototype.openAuthDialog;