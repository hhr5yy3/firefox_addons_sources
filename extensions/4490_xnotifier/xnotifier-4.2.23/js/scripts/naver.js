/***********************************************************
naver
***********************************************************/
var hostString="";
var supportInboxOnly=true;
var supportShowFolders=true;

function init(){
  this.initStage=ST_PRE;
  this.dataURL="https://mail.naver.com/";
  this.loginData=["https://nid.naver.com/nidlogin.login",
                      "id","pw",
                      "enctp=1"];
  this.viewURL="https://mail.naver.com/";
  this.viewDomain="mail.naver.com";  

  this.cookieDomain="naver.com";

  this.logoutURL="https://nid.naver.com/nidlogin.logout";
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
    var reg=new RegExp("\"mailid\"\\s*:\\s*\""+this.user+"\"","i");
    var fnd=aData.match(reg);
    if(fnd){//logged in already
      this.stage=ST_DATA;
      return this.process(aData);
    }else{
      this.stage=ST_PRE;
      this.getHtml(this.logoutURL);
      return true;
    }
  }
  this.onError();
  return true;
}
function process(aData,aHttp) {
  switch(this.stage){
  case ST_PRE:  
    this.getHtml("https://static.nid.naver.com/enclogin/keys.nhn");
    return false;
  case ST_PRE_RES:
    var keys=aData.split(",");
    var sessionkey = keys[0];
    var keyname = keys[1];
    var evalue = keys[2];
    var nvalue = keys[3];
    var rsa = new RSAKey();
    rsa.setPublic(evalue, nvalue);
    var encpw=rsa.encrypt(this.getLenChar(sessionkey) + sessionkey
					+ this.getLenChar(this.user)+this.user
					+ this.getLenChar(this.password)+this.password);   
    this.stage=ST_LOGIN_RES;
    this.post="enctp=1&encpw="+encpw+"&encnm="+keyname+"&nvlong=on";
    this.getHtml(this.loginData[LOGIN_URL],this.post);
    return true;
  case ST_LOGIN_RES:
    var fnd=aData.match(/replace\("(\S+?)"/);
    if(fnd){
      delete this.post;
      this.stage=ST_DATA;
      this.getHtml(decodeURIComponent(fnd[1]));
      return true;
    }    
    var fnd2=aData.match(/id="chptchakey"\s+value="(\S+?)"/);
    var fnd3=aData.match(/id="captchaimg"\s+src="(\S+?)"/);
    if(fnd2&&fnd3){
      this.ckey=fnd2[1];
      this.openAuthDialog(this.id,this.user,fnd3[1]);
      return false;
    }
    break;
  case ST_LOGIN_RES+1://captcha
    this.stage=ST_LOGIN_RES;
    this.getHtml(this.loginData[LOGIN_URL],this.post+"&chptchakey="+this.ckey+"&chptcha="+encodeURIComponent(aData));    
    delete this.post;
    delete this.ckey;
    return true;
  }
  return this.baseProcess(aData,aHttp);
}

function getData(aData){
  var obj={};
  this.folders={};//used for direct link
  var re=/{.*?\"folderSN\":(\d+?),.*?\"folderType\".+?}/g;
  var o;
  var ar=[];
  this.count=0;
  var found=false;
  while ((o = re.exec(aData)) != null){
    if(o[1]<10&&o[1]>0)continue;    
    var o2=o[0].match(/"folderName":"(.+?)"/);
    if(o2)o2=o2[1];else continue;
    var o3=o[0].match(/"unreadMailCount":(\d+)/);
    if(o3)o3=o3[1];else continue;    
    var found=true;
    var n=parseInt(o3);    
    if(this.inboxOnly){
      if(o[1]=="0")this.count=n;
    }else this.count+=n;
    if(n>0&&o[1]!="0"){
      var name=unescape(o2.replace(/\\/g,"%"));
      this.folders[name]=o[1];    
      ar.push(name);
      ar.push(n);
    }
  }
  if(this.showFolders){
    if(ar)obj.folders=ar;  
  }
  if(!found)this.count=-1;
  return obj;
}
function getViewURL(aFolder){
  if(aFolder){
    return "http://mail.naver.com/list/"+this.folders[aFolder];
  }
  return this.viewURL;  
}

function getLenChar(texts) {
	texts = texts + '';
	return String.fromCharCode(texts.length);
}