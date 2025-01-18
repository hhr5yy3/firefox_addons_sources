/***********************************************************
Gmail
***********************************************************/
var supportInboxOnly=false;
var supportShowFolders=false;
var supportIncludeSpam=false;
var supportMulti=true;

function init(){
    this.initStage=ST_PRE;
    this.loginData=["https://accounts.google.com/ServiceLoginAuth?service=mail",
                    "Email","Passwd","PersistentCookie=yes"];
    this.baseURL="https://mail.google.com/mail/";
    this.viewDomain="(mail|accounts).google.com";
    this.dataURL=this.baseURL;
    this.viewURL=this.baseURL;

    this.logoutURL="https://accounts.google.com/Logout";
}
function getIconURL(){
    return "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon2.ico";
}
function getURL(url,n){
    if(n==null)return url;
    else return url.replace(/(\?\S+)?$/,"u/"+n+"/$1");
}
function checkLogin(aData){
    switch(this.stage){
    case ST_CHECK:
        if(this.multiId==0)this.viewURL=this.baseURL;
        else this.viewURL=this.getURL(this.baseURL,this.multiId);
        this.getHtml(this.viewURL+"?rt=c");
        return false;
    case ST_CHECK+1:
        var fnd=aData.match(/\"https:\/\/accounts.google.com\/Logout/);
        if(fnd){//logged in
            var rs=this.isLoggedIn(aData);
            if(rs==1){
                this.stage=ST_LOGIN_RES+1;
                return this.process(aData);
            }else if(rs==0){//switch account;
                this.stage=ST_LOGIN_RES+1;
                this.getHtml(this.viewURL);
                return true;
            }else if(this.multiId==0){
                this.stage=ST_PRE;
                this.getHtml(this.logoutURL);
                return true;
            }
        }
        this.stage=ST_PRE;
        return this.process("");
    }
}
function isLoggedIn(aData,brief){
    var user=this.user.indexOf("@")==-1?this.user+"@\\S+?":this.user;
    user=user.replace(/@googlemail.com/,"@(?:g|google)mail.com");
    var isCurrent=true;
    var reg=new RegExp("\"\\/mail(?:\\/u\\/(\\d+))?\",\\S+?,\"(\\S+?)\",\""+user+"\"","i");
    var fnd=aData.match(reg);
    var fnd2=aData.match(/GM_ACTION_TOKEN\s*=\s*['"](\S+?)['"]/);
    if(!fnd){
        if(brief&&this.UI==2)return 0;//mla is off
        isCurrent=false;
        reg=new RegExp("\""+user+"\",\\d+,\\d+,(\\d+)","i");
        fnd=aData.match(reg);
    }
    if(fnd&&fnd2){
        if(fnd[1]){
            this.mid=fnd[1];
            if(this.multiId==0&&this.mid!=0)return -2;
        }
        this.viewURL=this.getURL(this.baseURL,this.mid);
        if(isCurrent){
            this.dataURL=this.viewURL+"feed/atom";
            this.UI=2;
            return 1;
        }else return 0;
    }
    //basic HTML
    fnd=aData.match(/<base\s+href="(https:\/\/mail.google.com\/mail(?:\/u\/(\d+))?\/h\S+?)"/);
    reg=new RegExp("id=(?:gbf|gbgs4dn).+?>"+user+"<","i");
    var fnd2=aData.match(reg);
    if(fnd&&fnd2){
        if(fnd[2]){
            this.mid=fnd[2];
            if(this.multiId==0&&this.mid!=0)return -2;
        }
        this.viewURL=fnd[1];
        this.dataURL=fnd[1]+"?s=q&q=is%3Aunread"+(this.inboxOnly?"+in%3Ainbox":"");
        this.UI=0;
        return 1;
    }
    return -1;
}
function process(aData,aHttp) {
//dout(this.ind+" "+this.user+" "+this.stage);
if(this.debug)dlog(this.id+"\t"+this.user+"\t"+this.stage,aData);
    switch(this.stage){
    case ST_PRE:
        this.getHtml("https://accounts.google.com/"+(this.multiId==0?"ServiceLogin":"AddSession")+"?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&rip=1&nojavascript=1");
        return false;
    case ST_PRE_RES:
        var form=this.getForm(aData,"gaia_loginform",true);
        if(form){
            this.stage=ST_LOGIN;
            this.getHtml("https://accounts.google.com/"+(this.multiId==0?"signin/challenge/sl/password":"multilogin/challenge/sl/password"),this.loginData[LOGIN_POST]+"&"+form[1]);
            return false;
        }
        break;
    case ST_LOGIN_RES:
        var form=this.getForm(aData,"challenge",true);
        if(form){//2-step verification
            this.form=form;
            this.stage=ST_LOGIN_RES+3;
            this.openAuthDialog(this.id,this.user,null);
            return true;
        }
        ++this.stage;
    case ST_LOGIN_RES+1:
        var fnd=aData.match(/action="ChromeLoginPrompt"/);
        if(fnd){
            this.getHtml(this.viewURL);
            return false;
        }
        ++this.stage;
    case ST_LOGIN_RES+2:
        if(this.isLoggedIn(aData)==1){
            this.stage=ST_DATA;
        }
        break;
    case (ST_LOGIN_RES+3)://2-step verification
        if(aData){
            this.getHtml("https://accounts.google.com/"+this.form[0],this.form[1]+"&Pin="+encodeURIComponent(aData)+"&TrustDevice=on");
            delete this.form;
            return false;
        }
        break;
    case (ST_LOGIN_RES+4)://2-step verification
        this.stage=ST_LOGIN_RES;
        return this.process(aData,aHttp);
    }
    return this.baseProcess(aData,aHttp);
}
function getCount(aData){
    if(this.multiId==0&&this.isLoggedIn(aData,true)<0)return -1;
    var fnd;
    if(this.UI==2){
        fnd=aData.match(/<fullcount>(\d+)<\/fullcount>/);
        return fnd?fnd[1]:-1;
    }else{
        var spam=0;
        if(this.includeSpam){
            fnd=aData.match(/<a href="\?s=m"\s*\S+?\((\d+)\)/);
            if(fnd){
                spam=parseInt(fnd[1]);
                if(spam>0){
                    this.spam=spam;
                    if(this.includeSpam!=2)spam=0;
                }
            }
        }
        if(this.inboxOnly){
            fnd=aData.match(/<\/h2>\s*<tr>\s*<td[\s\S]+?<a[\s\S]+?>.+?(?:&nbsp;\s*\(\s*(\d+)\s*\))?\s*</);
            return fnd?((fnd[1]?parseInt(fnd[1]):0)+spam):-1;
        }else{
            fnd=aData.match(/nvp_bbu_go[\s\S]+?<\/td>([\s\S]+?)<\/table>/);
            if(fnd){
                var n=0;
                var fnd2=fnd[1].match(/<b>(\S+)<\/b>(.+?)<b>(\d+)<\/b>(.+?)<b>(\S+)<\/b>/);
                if(fnd2){
                    if(fnd2[2].indexOf("-")!=-1)n=isNaN(parseInt(fnd2[5]))?200:fnd2[5];
                    else if(fnd2[4].indexOf("-")!=-1)n=isNaN(parseInt(fnd2[1]))?200:fnd2[1];
                }
                return parseInt(n)+spam;
            }else return -1;
        }
    }
}
function getViewURL(aFolder){
    if(aFolder){
        if(aFolder=="Spam"){
            if(this.UI==2)return this.viewURL+"#spam";
            else return this.viewURL+"?s=m";
        }
        if(this.UI==2){
            if(aFolder.indexOf("#category/")==0)return this.viewURL+aFolder;
            else return this.viewURL+"#label/"+encodeURIComponent(aFolder);
        }else return this.viewURL+"?s=l&l="+encodeURIComponent(aFolder);
    }
    return this.viewURL;
}

