var clonadoActivado = false;
var pasaAlumno = false;
var ocultaRubricasActivado = false;
var ocultaCriteriosActivado = false;
var ocultaRubricasEnStorage = chrome.storage.local.get("OcultaRubricas", data => {
  if(data.OcultaRubricas!=undefined){
    if (data.OcultaRubricas==true){
      document.getElementsByTagName("body")[0].classList.add("OcultaRubricasActivado")
      ocultaRubricasActivado = true;
    }
    else{
      document.getElementsByTagName("body")[0].classList.remove("OcultaRubricasActivado")
      ocultaRubricasActivado = false;
    }
  }
  else{
    document.getElementsByTagName("body")[0].classList.add("OcultaRubricasActivado");
    ocultaRubricasActivado = true;
  }
});
if (ocultaRubricasEnStorage==undefined){
  document.getElementsByTagName("body")[0].classList.add("OcultaRubricasActivado")
  ocultaRubricasActivado = true;
};
//debugger;
var ocultaCriteriosEnStorage = chrome.storage.local.get("OcultaCriterios", data => {
  if(data.OcultaCriterios!=undefined){
    if (data.OcultaCriterios==true){
      document.getElementsByTagName("body")[0].classList.add("OcultaCriteriosActivado")
      ocultaCriteriosActivado = true;
      abreviaCriterios();;
    }
    else{
      document.getElementsByTagName("body")[0].classList.remove("OcultaCriteriosActivado")
      ocultaCriteriosActivado = false;
    }
  }
  else{
    document.getElementsByTagName("body")[0].classList.add("OcultaCriteriosActivado")
    ocultaCriteriosActivado = true;
    abreviaCriterios();;
  }
});
if (ocultaCriteriosEnStorage==undefined){
  document.getElementsByTagName("body")[0].classList.add("OcultaCriteriosActivado")
  ocultaCriteriosActivado = true;
};
var clonadoActivadoEnStorage = chrome.storage.local.get("Clonar", data => {
  if(data.Clonar==undefined){
    clonadoActivado = true;
  }else{
    clonadoActivado = data.Clonar;
  }
});
if (clonadoActivadoEnStorage==undefined){
  clonadoActivado = true;
};
var pasaAlumnoEnStorage = chrome.storage.local.get("Pasar", data => {
  if(data.Pasar==undefined){
    pasaAlumno = true;
  }else{
    pasaAlumno = data.Pasar;
  }
});
if (pasaAlumnoEnStorage==undefined){
  pasaAlumno = true;
};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.OcultaRubricas===true){
      document.getElementsByTagName("body")[0].classList.add("OcultaRubricasActivado")
      ocultaRubricasActivado = true;
  }else if(request.OcultaRubricas===false){
      document.getElementsByTagName("body")[0].classList.remove("OcultaRubricasActivado")
      ocultaRubricasActivado = false;
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.OcultaCriterios===true){
      document.getElementsByTagName("body")[0].classList.add("OcultaCriteriosActivado")
      ocultaCriteriosActivado = true;
      abreviaCriterios();;
  }else if(request.OcultaCriterios===false){
      document.getElementsByTagName("body")[0].classList.remove("OcultaCriteriosActivado")
      ocultaCriteriosActivado = false;
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.Clonar===true){
    clonadoActivado = true;
  }else if(request.Clonar===false){
    clonadoActivado = false;
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.Pasar===true){
    pasaAlumno = true;
  }else if(request.Pasar===false){
    pasaAlumno = false;
  }
});
chrome.runtime.onMessage.addListener(function(message) {
    if (message.tipo === "print") {
      var listaBotones = document.getElementsByClassName("btn btn-primary");
      listaBotones[3].addEventListener('click', function() {
        console.log('¡Botón clicado!');
        setTimeout(function(){
          escribeSegundaNota();
        }, 1000);
      });
    }
  });
function escribeSegundaNota(primeraNota){
  const checkInput = setInterval(function() {
    const input = document.querySelector("input[id='X_CRIEVACOMBAS_15098']");
    if (input) {
      console.log('¡Input detectado!');
      clearInterval(checkInput);
      debugger;
      input.value = primeraNota;      }
  }, 1000);
};
function clonaPrimeraNota(arrayInputs){
  for (let i = 1; i < arrayInputs.length; i++) {
    const input = arrayInputs[i];
    if (input) {
      input.value = arrayInputs[0].value;
    }
  }  
}
var cuentaCuadernoNoDetectado = 0;
console.log('¡buscando cuadro nota!');
var cuadroNotaEncontrado = false;
const intervaloNTR = setInterval(function() {
  let bodyText = document.body.innerHTML;
  let searchText = '<input id="X_CRIEVACOMBAS_';
  if (bodyText.includes(searchText)){
    if(!cuadroNotaEncontrado) {
      vigilaPrimeraNota();
      abreviaCriterios(!ocultaCriteriosActivado);
    }
    
    //debugger;
    cuadroNotaEncontrado = true;
  }
  else{
  }
},1000);
function vigilaPrimeraNota(){
  var nombreAlumnoAnterior="";
  const intervaloPrimeraNota = setInterval(function() {
    const input = document.querySelectorAll("input[id^='X_CRIEVACOMBAS_']");
    const tituloNombreAlumno = document.querySelector("#select2-selecbuscadoralumnado-container");
    const textoNombreAlumnoActual = tituloNombreAlumno.textContent;
    if ((input.length>0) && (nombreAlumnoAnterior != textoNombreAlumnoActual)) {
      console.log('¡Input detectado con alumno nuevo!');
      var valorPrimeraNota = input[0].value;
      input[0].focus();
      input[0].type="text";
      let lengthOfInputValue = input[0].value.length;
      console.log(lengthOfInputValue);
      input[0].setSelectionRange(lengthOfInputValue, lengthOfInputValue);
      input[0].type="number";
      input[0].addEventListener('change', function() {
        console.log('¡Input cambiado! '+input[0].value);
        if(clonadoActivado){
          console.log("clonado activando");
          clonaPrimeraNota(input);
          if((Math.abs(input[0].value-valorPrimeraNota)>1)||(valorPrimeraNota=="")){
            pasaSiguienteAlumno();
          };
          valorPrimeraNota = input[0].value;
        };
      });
    }     
    nombreAlumnoAnterior = textoNombreAlumnoActual; 
  }, 1000);
};
function pasaSiguienteAlumno(){
  if(pasaAlumno){
    const botonSiguienteAlumno = document.querySelector("button[class='btn btn-sm btn-primary m-0 ml-1 btnAlumnoSiguiente']");
    console.log(botonSiguienteAlumno);
    if (botonSiguienteAlumno) {
      console.log('¡boton siguiente alumno detectado!');
      botonSiguienteAlumno.click();
    }
  }
};
function abreviaCriterios(){

  var etiquetaAbreviada = document.querySelector('label.abreviada');
  if (etiquetaAbreviada==undefined){
    var etiquetasOriginales = document.querySelectorAll('label[for="MODALTAREA01"]');
    //console.log(etiquetasOriginales);
    //debugger;
    var abreviatura = 0;
    for (let i = 0; i < etiquetasOriginales.length; i++) {
      var etiquetaAbreviada = document.createElement('label');
      if (i==0){
      abreviatura = encontrarCuartoPunto(etiquetasOriginales[i].textContent)+1;
      }
      etiquetaAbreviada.textContent = etiquetasOriginales[i].textContent.substring(0, abreviatura)+" ";
      etiquetaAbreviada.classList.add("abreviada");
      etiquetasOriginales[i].parentNode.insertBefore(etiquetaAbreviada, etiquetasOriginales[i]);
    }
  }
  
};
function encontrarCuartoPunto(cadena) {
  var contador = 0;
  for (var i = 0; i < cadena.length; i++) {
    if (cadena.charAt(i) === ".") {
      contador++;
      if (contador === 4) {
        return i;
      }
    }
  }
  return -1;
}