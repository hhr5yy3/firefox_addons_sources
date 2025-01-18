'use strict';

 Ext.Bd.optionsHandler = {
	 
  setCurrentOptions(){
	  
     Ext.Bd.GetSetting(function(S) {
	  for(let name in S) {		
		  if(Ext.optionsList.indexOf(name) != -1 && S[name] == 'yes'){
			  document.getElementById(name).setAttribute('checked', 'checked');
		               }			
			      }	
         Ext.Bd.optionsHandler.checkBrowserSupport(S);				  
		    });
			
	 Ext.Bfn.localizeHtmlPage();
      },
	 
  setCurrentYear(){
      let currentTime = new Date();
      let year = currentTime.getFullYear(); 
          document.getElementById('thisYear').innerHTML = year;
      },
	  
  checkBrowserSupport(S){
	  
	var enableBlock = function(item){
		   document.getElementById(item+'Box').classList.add('block');
		   document.getElementById(item).removeAttribute('disabled');
			         };
					 
	var disableBlock = function(item){
		   document.getElementById(item+'Box').classList.remove('block');
		   document.getElementById(item).setAttribute('disabled', 'disabled');
			         };
	 
	 if(S.isAllowedDataExchange == 'no') {
		   Ext.optionsList.forEach(function(item, i){
			 if(item != 'isAllowedDataExchange'){
			      disableBlock(item);
			         }
			   });
			 return false;
		  }
		  
	  Ext.optionsList.forEach(function(item, i){
		  
		   if(item != 'isAllowedDataExchange'){
				
			  switch(Ext.browser.name){
				  
				case 'Firefox':
				
				  if(['isOpenLocalLink'].indexOf(item) != -1){
		                 disableBlock(item);		  
	                         } else {
						 enableBlock(item);
						  }
							 
				  break;
				  
				case 'YaBrowser':
				
				  if(['isOpenInNewTab'].indexOf(item) != -1){
		                 disableBlock(item);		  
	                         } else {
						 enableBlock(item);
						  }
							 
				  break;
				  
				 default:
					
				   enableBlock(item);
				   
				  break;
				   
			           }
				 }
           });
      },
	  
  addListener(){
      let checkBoxList = document.querySelectorAll('input');
       for (let elem of checkBoxList) {
               elem.addEventListener("change", Ext.Bd.optionsHandler.checkChanges);
                   }
      },
	  
  checkChanges(e){
	  
   var name = this.id, value = (!this.checked) ? 'no' : 'yes';
			 
	 Ext.Bd.GetSetting(function(S) {
		  S[name] = value; 
	       Ext.Bd.SetData({'ExtSetting': S}, function(callback) {
			  Ext.Bd.optionsHandler.checkBrowserSupport(S);
			   if(chrome.runtime.lastError) {
					console.log('Ext.Bd.SetData => ERROR! KEY: ['+name+'] >> '+chrome.runtime.lastError.message);
					    } 											 
			      });
		    });
        }
 };
 
  Ext.Bd.optionsHandler.setCurrentOptions();
  Ext.Bd.optionsHandler.setCurrentYear();
  Ext.Bd.optionsHandler.addListener();  