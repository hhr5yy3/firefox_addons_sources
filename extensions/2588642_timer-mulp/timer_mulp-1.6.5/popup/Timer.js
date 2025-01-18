var myPort = browser.runtime.connect({name:"port-from-cs"});
var timer;  var ehe=[]; var gokp = Number(localStorage.setItem("save25B",0));
var milf = 0;
var tipr =  Number(localStorage.getItem('help1'));
if (tipr == 0){document.querySelector('.help1').style.display = 'flex';
		document.querySelector('.fon').style.display = 'flex';}
    
if(Math.random()*2>1){
  document.querySelector('.t1').style.display='flex';
  document.querySelector('.t2').style.display='none';
}else{
  document.querySelector('.t1').style.display='none';
  document.querySelector('.t2').style.display='flex';
}
   


var lans = Number(localStorage.getItem("lan"));
if (lans == 0){lans = 1}
var dsd = [];
 dsd[1] = document.querySelector('.tuxst1');
 dsd[2] = document.querySelector('.tuxst2');
 dsd[3] = document.querySelector('.tuxst3');
 dsd[4] = document.querySelector('.tuxst4');
 dsd[5] = document.querySelector('.tuxst5');
function CopyToClipboard(containerid) {
  if (document.selection) {
    var range = document.body.createTextRange();
	
    range.moveToElementText(containerid);
    range.select().createTextRange();
    document.execCommand("copy");
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(containerid);
    window.getSelection().addRange(range);
    document.execCommand("copy");
  }
}

 var uved = Number(localStorage.getItem("uved"));

 if (uved == 0){document.querySelector('.uved').style.display = 'block';}



var android = 0;var bodycs = "margin: 0;position: relative;width: 100%;height: auto;"
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   android = 1;
   document.querySelector('body').style.cssText = bodycs;
}


ondss = []; ondmimi = [];
ondhh = [];

var milf1 = 0;
var set = document.querySelector('.set');
var save = document.querySelector('.save');

var onds = [];  var ondmi = []; var ondh = [];
var ehu = [];  var tab = []; var tabs =[];
for (var i = 1; i < 6; i++) {
  ondss[i] = document.querySelector('.sec'+i);
  ondmimi[i] = document.querySelector('.min'+i);
  ondhh[i] = document.querySelector('.hor'+i);
  ehe[i] = Number(localStorage.getItem("ehe"+i)) ;
  onds[i] = document.querySelector('#countdowns'+i);
  ondmi[i] = document.querySelector('#countdownmi'+i);
  ondh[i] = document.querySelector('#countdownh'+i);
  ehu[i] = document.querySelector('.ehe'+i);
  tab[i] = document.querySelector('.eh'+i);
   if(tab[i].textContent == null){
  tab[i].textContent = "00:00:00";}
  tabs[i] = document.querySelector('#tabs-'+i);
}
for(var i=2; i<6;i++){tabs[i].style.display = 'none';}
var start = document.querySelector('#start');
var pause = document.querySelector('#pause');


var s =[];var mi=[];var h=[];var k = []; var dis = 5;
var pess =[]; var pesmi=[]; var pesh=[];
for (var i = 1; i < 6; i++) {

     s[i] = Number(localStorage.getItem("second"+i));
     mi[i] = Number(localStorage.getItem("minuts"+i));
     k[i] = Number(localStorage.getItem("interes"+i));
     if (k[i]==0) {k[i]+=5;  }
     h[i] = Number(localStorage.getItem("hours"+i));}
var save2 = Number(localStorage.getItem("save25"));
  if (save2 == 0) { save2 = 1;  }
  if (android == 0 ) {if (s[i]==0&&mi[i]==0&&h[i]==0||s[i]==0&&mi[i]==0&&h[i]== undefined||
  s[i]== undefined&&mi[i]== undefined&&h[i]== undefined) {}else{}
			}


  if (k[save2] == 0) { k[save2] +=4;   }
  if(k[save2]%2 != 0){pause.style.display = 'none';start.style.display = 'flex';}
      else{start.style.display = 'none';pause.style.display = 'flex';}


      function tick(){
            for (var i = 1; i < 6; i++) {

                     s[i] = Number(localStorage.getItem("second"+i));
                      gokp = Number(localStorage.getItem("save25B"));

                   if (s[i]==0||s[i]==59.9||s[i]==59.8||dis==5) { dis =1;
                     mi[i] = Number(localStorage.getItem("minuts"+i));
                     h[i] = Number(localStorage.getItem("hours"+i));}

                     if (i== gokp) {        }else {
                 if(save2==i){
                   mi[i] = Number(localStorage.getItem("minuts"+i));
                   h[i] = Number(localStorage.getItem("hours"+i));}
                if(s[i]<=9){onds[i].textContent = "0"+Math.floor(s[i]);}
                   else{onds[i].textContent = Math.floor(s[i]);}
                if(mi[i]<=9){ondmi[i].textContent = "0"+mi[i];}
                   else{ondmi[i].textContent = mi[i];}
                if(h[i]<=9){ondh[i].textContent ="0"+h[i];}
                   else{ondh[i].textContent =h[i];}}

                     if(h[save2]==0&&mi[save2]==0&&s[save2]==0){pause.style.display = 'none';
                     start.style.display = 'flex';}


                    tab[i].textContent = ondh[i].textContent+":" + ondmi[i].textContent+":" + onds[i].textContent;
                 }       timer = setTimeout(tick,100);     };

      timer = setTimeout(tick,100);

document.addEventListener('mousedown', (e) => {


	if (e.target.classList.contains("dsd")){lans = localStorage.getItem("lan"); CopyToClipboard(dsd[lans])}
	if (e.target.classList.contains("copy")){lans = localStorage.getItem("lan"); CopyToClipboard(dsd[lans])}

	if (e.target.classList.contains("cluser")){
		document.querySelector('.help1').style.display = 'none';
		document.querySelector('.fon').style.display = 'none';	
		
	
		localStorage.setItem("help1",1);
		
	}
  if (e.target.classList.contains("audd")){ document.querySelector('#main1').style.display = 'block';
  document.querySelector('#main').style.display = 'none'; document.querySelector('#main2').style.display = 'none';}
  if (e.target.classList.contains("audd1")){ document.querySelector('#main1').style.display = 'none';
  document.querySelector('#main').style.display = 'block';document.querySelector('#main2').style.display = 'none';}

	if (e.target.classList.contains("holkj2")){ document.querySelector('#main2').style.display = 'block';
  document.querySelector('#main').style.display = 'none';document.querySelector('#main1').style.display = 'none';
		document.querySelector('.uved').style.display = 'none';
		localStorage.setItem("uved", 1);
		uved = 1;}

  if (e.target.classList.contains("eh1")||e.target.classList.contains("ehe1")){ehe[1] = 0; save2 =1; back(save2);
    localStorage.setItem("save25",save2);}
  if (e.target.classList.contains("eh2")||e.target.classList.contains("ehe2")){save2 =2}
  if (e.target.classList.contains("eh3")||e.target.classList.contains("ehe3")){save2 =3}
  if (e.target.classList.contains("eh4")||e.target.classList.contains("ehe4")){save2 =4}
  if (e.target.classList.contains("eh5")||e.target.classList.contains("ehe5")){save2 =5}



  if (e.target.classList.contains("clos2")){ehu[2].style.display = 'none'; ehe[2] = 0;localStorage.setItem("ehe2",0);
             save2 = 1;back(save2);}
  if (e.target.classList.contains("clos3")){ehu[3].style.display = 'none'; ehe[3] = 0;localStorage.setItem("ehe3",0);
             save2 = 1;back(save2);}
  if (e.target.classList.contains("clos4")){ehu[4].style.display = 'none'; ehe[4] = 0;localStorage.setItem("ehe4",0);
             save2 = 1;back(save2);}
  if (e.target.classList.contains("clos5")){ehu[5].style.display = 'none'; ehe[5] = 0;localStorage.setItem("ehe5",0);
             save2 = 1;back(save2);}

  if (e.target.classList.contains("hu")){document.querySelector('.pluss').style.display = 'block';
  if(ehe[2]==0&&ehe[3]==0&&ehe[4]==0&&ehe[5]==0){  save2 =1;back(save2);localStorage.setItem("save25",save2);}}

  if (e.target.classList.contains("pluss")){
if(ehe[2] ==0){ehu[2].style.display = 'flex';ehe[2] = 1;localStorage.setItem("ehe2",1);
save2 =2;back(save2);localStorage.setItem("save25",save2);}
else{if(ehe[3] ==0){ehu[3].style.display = 'flex';ehe[3] = 1;localStorage.setItem("ehe3",1);
save2 =3;back(save2);localStorage.setItem("save25",save2);}
else{if(ehe[4] ==0){ehu[4].style.display = 'flex';ehe[4] = 1;localStorage.setItem("ehe4",1);
save2 =4;back(save2);localStorage.setItem("save25",save2);}
else{if(ehe[5] ==0){ehu[5].style.display = 'flex';ehe[5] = 1;localStorage.setItem("ehe5",1);
save2 =5;back(save2);localStorage.setItem("save25",save2);}
}}}
if(ehe[2]==1&&ehe[3]==1&&ehe[4]==1&&ehe[5]==1){document.querySelector('.pluss').style.display = 'none';}
  }

  if (e.target.classList.contains("button1") ) {
    if(e.button == 2){mi[save2]-=1;
    if(mi[save2]<0){if(h[save2]>0){h[save2]--;mi[save2]+=60;}else{mi[save2] = 0;}}}
    else{
    mi[save2]+=1;
    if(mi[save2]>=60){h[save2]++;mi[save2]-=60;}}

      }
  if (e.target.classList.contains("button2") ) {
    if(e.button == 2){mi[save2]-=5;
    if(mi[save2]<0){if(h[save2]>0){h[save2]--;mi[save2]+=60;}else{mi[save2] = 0;}}}
    else{
    mi[save2]+=5;
    if(mi[save2]>=60){h[save2]++;mi[save2]-=60;}}
      }
  if (e.target.classList.contains("button3") ) {
    if(e.button == 2){mi[save2]-=10;
    if(mi[save2]<0){if(h[save2]>0){h[save2]--;mi[save2]+=60;}else{mi[save2] = 0;}}}
    else{
    mi[save2]+=10;
    if(mi[save2]>=60){h[save2]++;mi[save2]-=60;}}
      }
  if (e.target.classList.contains("button4") ) {
    if(e.button == 2){mi[save2]-=20;
    if(mi[save2]<0){if(h[save2]>0){h[save2]--;mi[save2]+=60;}else{mi[save2] = 0;}}}
    else{
    mi[save2]+=20;
    if(mi[save2]>=60){h[save2]++;mi[save2]-=60;}}

      }
  if (e.target.classList.contains("button5") ) {
            if(e.button == 2){mi[save2]-=30;
            if(mi[save2]<0){if(h[save2]>0){h[save2]--;mi[save2]+=60;}else{mi[save2] = 0;}}}
            else{
            mi[save2]+=30;
            if(mi[save2]>=60){h[save2]++;mi[save2]-=60;}}
       }
  if (e.target.classList.contains("button6") ) {
            if(e.button == 2){h[save2]--;
            if(h[save2]<0){h[save2] = 0;}}
            else{
            h[save2]++;}
     }
  if (e.target.classList.contains("start")||e.target.classList.contains("start1")
  ||e.target.classList.contains("start2") ) {
              k[save2]++; localStorage.setItem("interes"+save2, k[save2]);
              localStorage.setItem("pusk",0); var starts = Date.now();

             if(gokp!=0){localStorage.setItem("save25B",0);}

    if(h[save2]==0&&mi[save2]==0&&s[save2]==0){k[save2]--;localStorage.setItem("interes"+save2,k[save2]);}
       else{
             myPort.postMessage({secon: s[save2], minut: mi[save2], hour: h[save2], savejk2: save2});


         if(k[save2]%2 != 0){pause.style.display = 'none';start.style.display = 'flex';}
           else{start.style.display = 'none';pause.style.display = 'flex';}

    }}
  if (e.target.classList.contains("stop")||e.target.classList.contains("stop1") ) {
                 k[save2]++;localStorage.setItem("interes"+save2,k[save2]);
                 if(h[save2]==0&&mi[save2]==0&&s[save2]==0){k[save2]--;localStorage.setItem("interes"+save2,k[save2]);}
                else{
                if(k[save2]%2 != 0){}else{k[save2]++;localStorage.setItem("interes"+save2,k[save2]);}
                myPort.postMessage({savest2: save2});
                mi[save2]=0;h[save2]=0;s[save2]=0;
                localStorage.setItem("second"+save2,0);
                localStorage.setItem("minuts"+save2,0);
                localStorage.setItem("hours"+save2,0);
                browser.browserAction.setBadgeText({text: ""});
                pause.style.display = 'none';start.style.display = 'flex';}}

    if (e.target.classList.contains("reset")||e.target.classList.contains("reset1") ) {
                 k[save2]++;localStorage.setItem("interes"+save2,k[save2]);
              if(h===0&&mi===0&&s===0){k[save2]--;localStorage.setItem("interes"+save2,k[save2]);}
                else{
                if(k[save2]%2 != 0){}else{k[save2]++;localStorage.setItem("interes"+save2,k[save2]);}
                myPort.postMessage({savest2: save2});
                s[save2]=0;localStorage.setItem("second"+save2,0);
                mi[save2] = Number(localStorage.getItem("saveminuts"+save2) );
                h[save2] = Number(localStorage.getItem("savehours"+save2) );
                pause.style.display = 'none';start.style.display = 'flex'; }}

  if (e.target.classList.contains("set")){
    localStorage.setItem("savesecond"+save2,s[save2]);
    localStorage.setItem("saveminuts"+save2,mi[save2]);
    localStorage.setItem("savehours"+save2,h[save2]);
  }

  if (e.target.classList.contains("set")||e.target.classList.contains("pluss")
  ||e.target.classList.contains("stop")||e.target.classList.contains("stop1")
  ||e.target.classList.contains("reset")||e.target.classList.contains("reset1")
  ||e.target.classList.contains("pokaz")||e.target.classList.contains("crea") ) {

    if (android == 0) {if (s[i]==0&&mi[i]==0&&h[i]==0||s[i]==0&&mi[i]==0&&h[i]== undefined||
    s[i]== undefined&&mi[i]== undefined&&h[i]== undefined) {}else{
     // if(mi[1]<=9&&s[1]<=9){browser.browserAction.setBadgeText({text: (mi[1]+ ":"+"0"+ Math.floor(s[1])).toString()})}
   // else {browser.browserAction.setBadgeText({text: (mi[1]+ ":"  + Math.floor(s[1])).toString()})}
  }
  }



            if(s[save2]<=9){onds[save2].textContent = "0"+Math.floor(s[save2]);}
                   else{onds[save2].textContent = Math.floor(s[save2]);}
                if(mi[save2]<=9){ondmi[save2].textContent = "0"+mi[save2];}
                   else{ondmi[save2].textContent = mi[save2];}
                if(h[save2]<=9){ondh[save2].textContent ="0"+h[save2];}
                   else{ondh[save2].textContent =h[save2];}
tab[save2].textContent = ondh[save2].textContent+":" + ondmi[save2].textContent+":" + onds[save2].textContent;
            localStorage.setItem("second"+save2,s[save2]);
            localStorage.setItem("minuts"+save2,mi[save2]);
            localStorage.setItem("hours"+save2,h[save2]);

            for (var i = 1; i < 6; i++) {
              if (save2==i) {
                if(e.button == 1){
                      ehu[i].style.display = 'none'; ehe[i] = 0;localStorage.setItem("ehe"+i,0);
                      save2 = 1;back(save2);document.querySelector('.pluss').style.display = 'block';}
                  else{  save2 =i;back(save2);localStorage.setItem("save25",save2);}
              }  }



      }
        });


 document.addEventListener('keydown', (e) => {
 var sel = document.getSelection().toString();
        pess[save2] = ondss[save2].textContent.length;
        pesmi[save2] = ondmimi[save2].textContent.length;
        pesh[save2] = ondhh[save2].textContent.length;
         if(sel !== ""){}
    if(e.key >= 0&&e.key <=9&&pess[save2]<2||
       e.key >= 0&&e.key <=9&&pesmi[save2]<2||
       e.key >= 0&&e.key <=9&&pesh[save2]<2||
       e.key >= 0&&e.key <=9&&sel !== ""||e.key == 8
       ||e.key == "ArrowDown"||e.key == "ArrowLeft"||e.key == "ArrowRight"
         ){}
      else{e.preventDefault();}});

  document.addEventListener('keyup', (e) => {
	if(e.key >= 0&&e.key <=9||e.keyCode == 8){
        if(Number(ondss[save2].textContent)>60){onds[save2].textContent = 60;}
        if(Number(ondmimi[save2].textContent)>60){ondmi[save2].textContent = 60;}
        if(Number(ondhh[save2].textContent)>24){ondh[save2].textContent = 24;}
           s[save2] = Number(ondss[save2].textContent);
           mi[save2] = Number(ondmimi[save2].textContent);
           h[save2] = Number(ondhh[save2].textContent);

           localStorage.setItem("second"+save2,s[save2]);
           localStorage.setItem("minuts"+save2,mi[save2]);
           localStorage.setItem("hours"+save2,h[save2]);
           localStorage.setItem("saveminuts"+save2,mi[save2]);
           localStorage.setItem("savehours"+save2,h[save2]);
     }});
        document.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("min"+save2)||e.target.classList.contains("sec"+save2)
    ||e.target.classList.contains("hor"+save2)||e.target.classList.contains("count"+save2) ) {
         localStorage.setItem("save25",save2);localStorage.setItem("save25B",save2);
          k[save2]++;localStorage.setItem("interes"+save2,k[save2]);
         if(h===0&&mi===0&&s===0){k[save2]--;localStorage.setItem("interes"+save2,k[save2]);}
           else{
           if(k[save2]%2 != 0){}else{k[save2]++;localStorage.setItem("interes"+save2,k[save2]);}
           myPort.postMessage({savest2: save2});
           pause.style.display = 'none';start.style.display = 'flex'; }

    }});
  document.addEventListener("wheel", (e)=>{
	if(e.target.classList.contains("min"+save2)){
	   if (event.deltaY < 0) {if(mi[save2]<60){mi[save2]++;}}
  	   else{ if(mi[save2]>0){mi[save2]--;}}
	if(mi[save2]<=9){ondmi[save2].textContent = "0"+mi[save2];}
                   else{ondmi[save2].textContent = mi[save2];}
        localStorage.setItem("minuts"+save2,mi[save2]);
        localStorage.setItem("saveminuts"+save2,mi[save2]);
        localStorage.setItem("savehours"+save2,h[save2]);
	}
	if(e.target.classList.contains("sec"+save2)){
		if (event.deltaY < 0) {if(s[save2]<60){s[save2]++;}}
  		else {if(s[save2]>0){s[save2]--;}}
		if(s[save2]<=9){onds[save2].textContent = "0"+Math.floor(s[save2]);}
                   else{onds[save2].textContent = Math.floor(s[save2]);}
		localStorage.setItem("second"+save2,s[save2]);
	}
	if(e.target.classList.contains("hor"+save2)) {
	   if (event.deltaY < 0) {if(h[save2]<60){h[save2]++;}}
  	   else{ if(h[save2]>0){h[save2]--;}}
	   if(h[save2]<=9){ondh[save2].textContent ="0"+h[save2];}
                   else{ondh[save2].textContent =h[save2];}
           localStorage.setItem("hours"+save2,h[save2]);
           localStorage.setItem("saveminuts"+save2,mi[save2]);
           localStorage.setItem("savehours"+save2,h[save2]);
	}
	});
	

for (var i = 2; i < 6; i++) {
  if(ehu[i] ==0){ehu[i].style.display = 'none';}}


  var css = "background-color: #433f3f;  color: #e1e1e1;";
  var cssaktic =
  "background-color:#b5b4b5;color:#433F3F;border-top-width:1.5px;border-top-style:solid;border-top-color:#2b83fe;";


  function back(){
    for(var i=1; i<6;i++){tabs[i].style.display = 'none';}
    for (var i = 1; i < 6; i++) {
      ehu[i].style.cssText = css;}

 if(save2==1||save2==0){ehu[1].style.cssText = cssaktic;
 tabs[1].style.display = 'flex';}
 if(save2==2){ehu[2].style.cssText = cssaktic;
 tabs[2].style.display = 'flex';}
 if(save2==3){ehu[3].style.cssText = cssaktic;
 tabs[3].style.display = 'flex';}
 if(save2==4){ehu[4].style.cssText = cssaktic;
 tabs[4].style.display = 'flex';}
 if(save2==5){ehu[5].style.cssText = cssaktic;
 tabs[5].style.display = 'flex';}
 for (var i = 2; i < 6; i++) {
   if(ehe[i] ==0){ehu[i].style.display = 'none';}}
   if(k[save2]%2 != 0){pause.style.display = 'none';start.style.display = 'flex';}
     else{start.style.display = 'none';pause.style.display = 'flex';}
 }
 back(save2);
 document.addEventListener('contextmenu', (e) => {
 e.preventDefault();

 });
