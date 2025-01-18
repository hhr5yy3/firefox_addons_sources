/***********************************************************
  @require lib-update.js
***********************************************************/
var name="RSS";
var supportMulti=true;
var noCookie=true;
var needLink=true;

function init(){
  initUpdateHandler(this);
  this.dataURL=this.user;
  this.viewURL=this.link?this.link:this.user;
}
function findString(aData){
  aData=aData.replace(/<lastBuildDate>[\S\s]+?<\/lastBuildDate>/,"")
          .replace(/<pubDate>[\S\s]+?<\/pubDate>/g,"")
          .replace(/<updated>[\S\s]+?<\/updated>/g,"")
          .replace(/<!--[\S\s]+?-->/g,"")          
          .replace(/<slash:comments>[\S\s]+?<\/slash:comments>/g,"")
          .replace(/<content:encoded>[\S\s]+?<\/content:encoded>/g,"");
  return aData;
}
