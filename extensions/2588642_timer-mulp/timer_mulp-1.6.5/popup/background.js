   var cont = 0; var prokk =0; 
   var s = [];
   var mi = [];
   var h = [];
   var min=[5];var minmin=0;
   var k; var i; var milf = []; var icar = Number(localStorage.getItem("icar"));
	if (icar==0) {icar = icar +1;}
   var zapusk =[]; var save2;
   for ( i = 1; i < 6; i++) {zapusk[i]=0;s[i]=0;mi[i]=0;h[i]=0;milf[i]=Number(localStorage.getItem("milf"+i));
	}
   var volu = Number(localStorage.getItem("valume"));
   var sound = Number(localStorage.getItem("sound"));
   if(sound== 0){sound =2};

   var stope = 0;
   var timer;
   var portFromCS;
   var audioTrack = [5];
    audioTrack[1] = document.querySelector('#au1');
    audioTrack[2] = document.querySelector('#au2');
    audioTrack[3] = document.querySelector('#au3');
    audioTrack[4] = document.querySelector('#au4');
    audioTrack[5] = document.querySelector('#au5');
   var audio = audioTrack[sound];
   var minusraz = Number(localStorage.getItem("minusraz"));
   var android = 0;
   if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      android = 1;
   }
for (var i = 1; i < 6; i++) {
  h[i] = Number(localStorage.getItem("hours"+i));
  s[i] = Number(localStorage.getItem("second"+i));
  mi[i] = Number(localStorage.getItem("minuts"+i));
	
}
   if (android == 0 ) {if (s[i]==0&&mi[i]==0&&h[i]==0||s[i]==0&&mi[i]==0&&h[i]== undefined||
   s[i]== undefined&&mi[i]== undefined&&h[i]== undefined) {}else{

	

     if(h[icar]==0){
    		if(mi[icar]<=9&&s[icar]<=9){browser.browserAction.setBadgeText({text: (mi[icar]+ ":"+"0"+ Math.floor(s[icar])).toString()})}
  		else {browser.browserAction.setBadgeText({text: (mi[icar]+ ":"  + Math.floor(s[icar])).toString() })}}
	else { browser.browserAction.setBadgeText({text: (h[icar]+ ":"+ Math.floor(mi[icar])+"!").toString()})}}}

function connected(p) {
  portFromCS = p;
  portFromCS.onMessage.addListener(function(m) {

            if(m.savest2!=null){zapusk[m.savest2]= 0; }

           if(m.savejk2!=null){save2= m.savejk2;
             if(save2 == 1&&zapusk[1]==0){zapusk[1]= 1;}else {
             if(save2 == 1&&zapusk[1]==1){zapusk[1]= 0;}}
             if(save2 == 2&&zapusk[2]==0){zapusk[2]= 2;}else {
             if(save2 == 2&&zapusk[2]==2){zapusk[2]= 0;}}
             if(save2 == 3&&zapusk[3]==0){zapusk[3]= 3;}else {
             if(save2 == 3&&zapusk[3]==3){zapusk[3]= 0;}}
             if(save2 == 4&&zapusk[4]==0){zapusk[4]= 4;}else {
             if(save2 == 4&&zapusk[4]==4){zapusk[4]= 0;}}
             if(save2 == 5&&zapusk[5]==0){zapusk[5]= 5;}else {
             if(save2 == 5&&zapusk[5]==5){zapusk[5]= 0;}}
         }
         if(m.secon!=null){s[save2] = m.secon;}
         if(m.minut!=null){mi[save2] = m.minut;}
         if(m.hour!=null){h[save2] = m.hour;}
         
         minmin=0;

         min[1]=(h[1]*60+mi[1])*60+s[1];
         min[2]=(h[2]*60+mi[2])*60+s[2];
         min[3]=(h[3]*60+mi[3])*60+s[3];
         min[4]=(h[4]*60+mi[4])*60+s[4];
         min[5]=(h[5]*60+mi[5])*60+s[5];
       
         for(var vi=1;vi<6;vi++){
            
         if(min[vi]!=0&&zapusk[vi]!=0){
            if(minmin==0){minmin=min[vi];icar= vi; localStorage.setItem("icar",vi);}else{
          if(minmin>min[vi]){minmin=min[vi];icar= vi; localStorage.setItem("icar",vi);}}}}
       
          if(icar==1){browser.browserAction.setBadgeBackgroundColor({color: "yellow"});}
          if(icar==2){browser.browserAction.setBadgeBackgroundColor({color: "green"});}
          if(icar==3){browser.browserAction.setBadgeBackgroundColor({color: "red"});}
          if(icar==4){browser.browserAction.setBadgeBackgroundColor({color: "black"});}
          if(icar==5){browser.browserAction.setBadgeBackgroundColor({color: "blue"});}
       
            if(h[icar]==0){
                 if(mi[icar]<=9&&s[icar]<=9){browser.browserAction.setBadgeText({text: (mi[icar]+ ":"+"0"+ Math.floor(s[1])).toString()})}
               else {browser.browserAction.setBadgeText({text: (mi[icar]+ ":"  + Math.floor(s[icar])).toString() })}}
          else { browser.browserAction.setBadgeText({text: (h[icar]+ ":"+ Math.floor(mi[icar])+"!").toString()})}
         

         
         
         if(m.cont!=null){cont = Number(m.cont);} if(m.paus!=null){k = m.paus;}
        if(m.volu != null){volu = m.volu;}else{volu = 1;}
	milf[1] = 0;milf[2] = 0;milf[3] = 0;milf[4] = 0;milf[5] = 0;
        if(m.aud != null){sound = Number(m.aud);localStorage.setItem("sound",sound);
        audio.pause();audio.currentTime = 0;audio = audioTrack[sound];audio.volume = volu;audio.play();
       } if(cont==0){
        

                timer = setTimeout(function tickb(){
                              for (var i = 1; i < 6; i++) {

                  if (zapusk[i]==i) {

              if(mi[i]===0&&h[i]!=0&&s[i]===0){
               h[i] = Number(localStorage.getItem("hours"+i));
               h[i]--;mi[i]+=60;
		
				var startss = Date.now();
				if(milf == 1){
				var millis45 = Date.now() - startss;
				var prov = Math.trunc(3600 - millis45 / 1000);
				var prov2 = prov / 60;
				var prov3 = Math.trunc(prov2);
				var prov4 = prov - 60*prov3;
				mi[i] = mi[i] + prov3
				s[i] = s[i] + prov4;
				
				 }milf[i] = 1; localStorage.setItem("milf"+i,1);
               localStorage.setItem("interes"+i,8);
               localStorage.setItem("hours"+i,h[i]);
               localStorage.setItem("minuts"+i,mi[i]);}
              if(s[i]===0&&mi[i]!=0||prokk==1){prokk=0;
               mi[i] = Number(localStorage.getItem("minuts"+i));
               mi[i]--;s[i]+=60;
               localStorage.setItem("minuts"+i,mi[i]);}

              if(s[i]>0||minusraz==1){s[i]--; localStorage.setItem("second"+i,s[i]); }
              if (android == 0) {
                  if(h[icar]==0){
                     if(mi[icar]<=9&&s[icar]<=9){browser.browserAction.setBadgeText({text: (mi[icar]+ ":"+"0"+ Math.floor(s[icar])).toString()})}
  		               else {browser.browserAction.setBadgeText({text: (mi[icar]+ ":"  + Math.floor(s[icar])).toString() })}}
	               else { browser.browserAction.setBadgeText({text: (h[icar]+ ":"+ Math.floor(mi[icar])+"!").toString()})}}



              if(s[i]==0&&mi[i]==0&&h[i]==0){if(minusraz==1){prokk=1;}zapusk[i]=0;minmin=0;
	
              min[1]=(h[1]*60+mi[1])*60+s[1];
              min[2]=(h[2]*60+mi[2])*60+s[2];
              min[3]=(h[3]*60+mi[3])*60+s[3];
              min[4]=(h[4]*60+mi[4])*60+s[4];
              min[5]=(h[5]*60+mi[5])*60+s[5];
            
              for(var vi=1;vi<6;vi++){
                 
              if(min[vi]!=0){
                 if(minmin==0){minmin=min[vi];icar= vi; localStorage.setItem("icar",vi);}else{
               if(minmin>min[vi]){minmin=min[vi];icar= vi; localStorage.setItem("icar",vi);}}}}

               if(icar==1){browser.browserAction.setBadgeBackgroundColor({color: "yellow"});}
               if(icar==2){browser.browserAction.setBadgeBackgroundColor({color: "green"});}
               if(icar==3){browser.browserAction.setBadgeBackgroundColor({color: "red"});}
               if(icar==4){browser.browserAction.setBadgeBackgroundColor({color: "black"});}
               if(icar==5){browser.browserAction.setBadgeBackgroundColor({color: "blue"});}

               if(h[icar]==0){
                  if(mi[icar]<=9&&s[icar]<=9){browser.browserAction.setBadgeText({text: (mi[icar]+ ":"+"0"+ Math.floor(s[1])).toString()})}
                else {browser.browserAction.setBadgeText({text: (mi[icar]+ ":"  + Math.floor(s[icar])).toString() })}}
           else { browser.browserAction.setBadgeText({text: (h[icar]+ ":"+ Math.floor(mi[icar])+"!").toString()})}

		
		
              localStorage.setItem("interes"+i,7);audio.volume = volu;audio.play();
              browser.browserAction.setBadgeText({text: ""});
              var pusk = Number(localStorage.getItem("pusk"));

		browser.windows.onRemoved.addListener((windowId) => {

		pusk = 400;audio.pause();
               audio.currentTime = 0;
});
		milf[i] = 0; localStorage.setItem("milf"+i,0);
		var popupURL = browser.runtime.getURL("popup/pop.html");

  var creating = browser.windows.create({
    url: popupURL,
    type: "popup",
    height: 405,
    width: 480
  });
	
		
              }}}
                 if (zapusk[1]==0&&zapusk[2]==0&&zapusk[3]==0&&zapusk[4]==0&&zapusk[5]==0) {
                  cont =0;}else{timer = setTimeout(tickb, 1000);}
                },1000);


               cont=1;}
            //  if(k%2 != 0){clearTimeout(timer);cont=0; }
                       });



}

browser.runtime.onConnect.addListener(connected);
