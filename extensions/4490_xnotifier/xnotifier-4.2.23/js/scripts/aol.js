/***********************************************************
AOL
***********************************************************/
var supportInboxOnly=true;
var supportShowFolders=true;
var supportIncludeSpam=true;
var needLocale=true;

function init(){
  this.initStage=ST_PRE;
  this.loginData=["https://login.aol.com/account/challenge/password?done=https%3A%2F%2Fmail.aol.com%2F","username","password"];
  this.dataURL="https://mail.aol.com/";
  this.viewURL="https://mail.aol.com/";
  this.viewDomain="mail.aol.com";
  if(this.server){
    var ar=this.server.toLowerCase().split("-");
    if(ar.length==2){
      this.lang=ar[0]+"-"+ar[1];
      this.locale=ar[1];
    }else{
      this.lang=this.server+"-"+this.server;
      this.locale=this.server;
    }
  }else{
    this.lang="en-us";
    this.locale="us";
  }
  this.logoutURL="https://login.aol.com/account/logout";
  this.cookieDomain="aol.com";
}

function getIconURL(){
  return "https://mail.aol.com/favicon.ico";
}

function checkLogin(aData){
  switch(this.stage){
  case ST_CHECK:
    if(this.cookies){
      this.stage=ST_DATA;
      this.setCookies();
      return true;
    }
    this.getHtml(this.viewURL);
    return false;
  case ST_CHECK+1:
    var fnd=aData.match(/userId\s*=\s*"(\S+?)"/);
    if(!fnd)fnd=aData.match(/"UserUID"\s*:\s*"(\S+?)"/);
    var fnd2=aData.match(/"ViewNewOld"\s*:\s*true/);
    if(fnd){//logged in already
        this.dataURL=["https://mail.aol.com/webmail/rpc/v1/en-us?transport=xmlhttp&user="+fnd[1]+"&a=GetMessageList",
                "requests="+encodeURIComponent('[{"action":"GetMailInfo"},{"folder":"'+(fnd2?'NewMail':'Inbox')+'","start":0,"count":100,"indexStart":0,"indexMax":100,"index":true,"info":true,"rows":true,"sort":"received","tcs":false,"sortDir":"descending","search":"false","searchIn":"seen","subSearch":"","seen":[],"returnfoldername":true,"import":false,"action":"GetMessageList"}]"')+"&automatic=false"];
        this.getHtml(this.dataURL);
        return false;
    }else{
      this.stage=ST_PRE;
      return this.process(aData);        
    }
  case ST_CHECK+2:
     var fnd=aData.match(/"identities":\[\[".+?","(\S+?)"/);
     if(fnd){
        var user=this.user.split("|")[0];
        var reg;
        if(user.indexOf("@")==-1){
            reg=new RegExp("^"+user+"@\\S+?$","i");
        }else{
            reg=new RegExp("^"+user+"$","i");
        }
        if(fnd[1].match(reg)){//user matched
            this.stage=ST_DATA_RES;
            return this.process(aData);
        }else{
            this.stage=ST_LOGOUT;
            this.getHtml(this.logoutURL);
            return true;
        }
    }else{
      this.stage=ST_PRE;
      return this.process(aData);
    }
  }
  this.onError();
  return true;
}

function getData(aData){
  var obj={};

  var num=0;
  var found=false;
  var l;
  try{
    l=JSON.parse(aData)[1];
  }catch(e){
    this.count=-1;
    return obj;
  }
  if(!l.folders){
    this.count=-1;
    return obj;
  }

  var ar=[];

  for(var i=0;i<l.folders.length;i++){
    var o=l.folders[i];
    var fid=o[0];
    if(fid=="Drafts")continue;
    if(fid=="Sent")continue;
    if(fid=="Deleted")continue;
    if(fid=="Saved")continue;
    if(fid=="SavedIMs")continue;
    var n=o[6];
    if(fid=="Spam"){
      if(n>0&&this.includeSpam){
        ar.push({id:fid,title:o[1],count:n});
        if(this.includeSpam==2)num+=n;
      }
      continue;
    }else if(fid=="Inbox"||fid=="NewMail"||!this.inboxOnly)num+=n;
    if(n>0&&fid!="Inbox"&&fid!="NewMail"){
      var t={id:fid,title:o[1],count:n};
      ar.push(t);
    }
    found=true;
  }
  if(found){
    this.count=num;
    if(this.showFolders){
      if(ar)obj.folders=ar;
    }
    return obj;
  }
  this.count=-1;
  return obj;
}
function process(aData,aHttp) {
if(this.debug)dlog(this.id+"\t"+this.user+"\t"+this.stage,aData); 
  switch(this.stage){
  case ST_PRE:
    /*if(this.lang=="fr")this.getHtml("https://mail.aol.fr");
    else if(this.lang=="de")this.getHtml("https://mail.aol.de");
    else if(this.lang=="jp")this.getHtml("https://mail.aol.jp");
    else this.getHtml("https://mail.aol.com");*/
    this.getHtml("https://login.aol.com/?"+"&intl="+this.locale+"&lang="+this.lang);
    return false;
  case ST_PRE_RES:
    var form=this.getForm(aData,"login-username-form");
    if(form){
      this.stage=ST_LOGIN;
      var user=this.user.split("|")[0];
      this.getHtml("https://login.aol.com","username="+encodeURIComponent(user)+"&persistent=y&"+form);
      return true;
    }
    break;
  case ST_LOGIN:
   /* var user=this.user.split("|")[0];
    var ar=user.split("@");
    if(ar[1]=="aol.com" || ar[1] =="aim.com" || ar[1]=="netscape.net" || ar[1] =="aol.fr" || ar[1] =="aol.de" || ar[1] =="cs.com" || ar[1]=="aol.co.uk") {
      user=ar[0];
    }*/
    var form=this.getForm(aData);
    if(form){
      this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&"+form+"&verifyPassword=Next");
      return false;
    }
    break;
  case ST_LOGIN_RES:
    if(aData==null){//Firefox's tracking protection
      this.getHtml("https://mail.aol.com/");
      return false;
    }      
  case ST_LOGIN_RES+1:
    var fnd=aData.match(/userId\s*=\s*"(\S+?)"/);
    if(!fnd)fnd=aData.match(/"UserUID"\s*:\s*"(\S+?)"/);
    var fnd2=aData.match(/"ViewNewOld"\s*:\s*true/);
    if(fnd){
      this.dataURL=["https://mail.aol.com/webmail/rpc/v1/en-us?transport=xmlhttp&user="+fnd[1]+"&a=GetMessageList",
          "requests="+encodeURIComponent('[{"action":"GetMailInfo"},{"folder":"'+(fnd2?'NewMail':'Inbox')+'","start":0,"count":100,"indexStart":0,"indexMax":100,"index":true,"info":true,"rows":true,"sort":"received","tcs":false,"sortDir":"descending","search":"false","searchIn":"seen","subSearch":"","seen":[],"returnfoldername":true,"import":false,"action":"GetMessageList"}]"')+"&automatic=false"];
      this.stage=ST_DATA;
    }else{
      this.onError();
      return true;
    }
  case ST_DATA:
    this.getHtml(this.dataURL[0],this.dataURL[1]);
    return false;
  case ST_LOGOUT:
    var fnd=aData.match(/<input.+?value="(\S+?)" name="crumb"/);
    if(fnd){
      this.getHtml("https://login.aol.com/account/logout?crumb="+fnd[1]);
      return false;
    }
    break;
  case ST_LOGOUT+1:
    this.stage=ST_PRE
    this.getHtml("https://mail.aol.com/_cqr/authClear");
    return true;
  }
  return this.baseProcess(aData,aHttp);
}
