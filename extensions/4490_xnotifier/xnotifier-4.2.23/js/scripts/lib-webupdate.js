/***********************************************************
Library - Web Update
  
  Notify web site update.

  @ver 0.2
***********************************************************/

Handler.prototype.loadDB=function(id,user){
  var str=this.main.localStorage["db."+id];
  if(!str)return [];
  var db=str;
  if(db&&db[user])return db[user];
  else return [];
}

Handler.prototype.saveDB=function(id,user,data){  
  var db=this.main.localStorage["db."+id];
  if(!db)db={};
  db[user]=data;
  this.main.setLocalStorage("db."+id,db);
}
