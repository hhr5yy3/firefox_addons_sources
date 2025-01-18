

var lang = document.querySelector('.langvi');
var lan = localStorage.getItem("lan");
if(lan == null){lan = 1;}else{
lang.value = lan;}
	if(lan == 1){document.querySelector('.tuxst1').style.display = 'block';document.querySelector('.tuxst2').style.display = 'none';document.querySelector('.tuxst3').style.display = 'none';document.querySelector('.tuxst4').style.display = 'none';document.querySelector('.tuxst5').style.display = 'none';}
	if(lan == 2){document.querySelector('.tuxst1').style.display = 'none';document.querySelector('.tuxst2').style.display = 'block';document.querySelector('.tuxst3').style.display = 'none';document.querySelector('.tuxst4').style.display = 'none';document.querySelector('.tuxst5').style.display = 'none';}
	if(lan == 3){document.querySelector('.tuxst1').style.display = 'none';document.querySelector('.tuxst2').style.display = 'none';document.querySelector('.tuxst3').style.display = 'block';document.querySelector('.tuxst4').style.display = 'none';document.querySelector('.tuxst5').style.display = 'none';}
	if(lan == 4){document.querySelector('.tuxst1').style.display = 'none';document.querySelector('.tuxst2').style.display = 'none';document.querySelector('.tuxst3').style.display = 'none';document.querySelector('.tuxst4').style.display = 'block';document.querySelector('.tuxst5').style.display = 'none';}
	if(lan == 5){document.querySelector('.tuxst1').style.display = 'none';document.querySelector('.tuxst2').style.display = 'none';document.querySelector('.tuxst3').style.display = 'none';document.querySelector('.tuxst4').style.display = 'none';document.querySelector('.tuxst5').style.display = 'block';}

lang.addEventListener('change', (event) => {

 lan = event.target.value;
localStorage.setItem("lan", lan);
	if(lan == 1){document.querySelector('.tuxst1').style.display = 'block';document.querySelector('.tuxst2').style.display = 'none';document.querySelector('.tuxst3').style.display = 'none';document.querySelector('.tuxst4').style.display = 'none';document.querySelector('.tuxst5').style.display = 'none';}
	if(lan == 2){document.querySelector('.tuxst1').style.display = 'none';document.querySelector('.tuxst2').style.display = 'block';document.querySelector('.tuxst3').style.display = 'none';document.querySelector('.tuxst4').style.display = 'none';document.querySelector('.tuxst5').style.display = 'none';}
	if(lan == 3){document.querySelector('.tuxst1').style.display = 'none';document.querySelector('.tuxst2').style.display = 'none';document.querySelector('.tuxst3').style.display = 'block';document.querySelector('.tuxst4').style.display = 'none';document.querySelector('.tuxst5').style.display = 'none';}
	if(lan == 4){document.querySelector('.tuxst1').style.display = 'none';document.querySelector('.tuxst2').style.display = 'none';document.querySelector('.tuxst3').style.display = 'none';document.querySelector('.tuxst4').style.display = 'block';document.querySelector('.tuxst5').style.display = 'none';}
	if(lan == 5){document.querySelector('.tuxst1').style.display = 'none';document.querySelector('.tuxst2').style.display = 'none';document.querySelector('.tuxst3').style.display = 'none';document.querySelector('.tuxst4').style.display = 'none';document.querySelector('.tuxst5').style.display = 'block';}
});



var myPor = browser.runtime.connect({name:"port-from"});
var sou = document.querySelector('.sou');
var volu = document.querySelector('input');
var goll = document.querySelector('.volu');
var value1 = localStorage.getItem("value");
if(value1==null){sou.value = 2;}else{sou.value= value1;}
var hik = localStorage.getItem("valume");
volu.value = hik*100;goll.textContent = hik*100+"%";
if(hik==null){volu.value=100;goll.textContent = "100%";}

      sou.addEventListener('change', (event) => {
         hik = localStorage.getItem("valume");
         var soue = event.target.value;
         localStorage.setItem("value", soue);
         myPor.postMessage({aud: soue,volu: hik});
            });
      volu.addEventListener('change', (event) => {
      var volume = event.target.value / 100;
      var value1 = localStorage.getItem("value");
      myPor.postMessage({aud: value1,volu: volume});
      goll.textContent = event.target.value+"%";
      localStorage.setItem("valume", volume);
      });
