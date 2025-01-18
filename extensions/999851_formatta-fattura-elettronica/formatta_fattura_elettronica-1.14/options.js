
document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById("setMinisterialeFPA10").addEventListener("click", setMinisterialeFPA10);
document.getElementById("setAssoSoftwareFPA10").addEventListener("click", setAssoSoftwareFPA10);
document.getElementById("fileFPA10").addEventListener("change", fileFPA10);

document.getElementById("setMinisterialeFPA11").addEventListener("click", setMinisterialeFPA11);
document.getElementById("setAssoSoftwareFPA11").addEventListener("click", setAssoSoftwareFPA11);
document.getElementById("fileFPA11").addEventListener("change", fileFPA11);

document.getElementById("setMinisterialeFPA12").addEventListener("click", setMinisterialeFPA12);
document.getElementById("setAssoSoftwareFPA12").addEventListener("click", setAssoSoftwareFPA12);
document.getElementById("fileFPA12").addEventListener("change", fileFPA12);

document.getElementById("setMinisterialeFPR12").addEventListener("click", setMinisterialeFPR12);
document.getElementById("setAssoSoftwareFPR12").addEventListener("click", setAssoSoftwareFPR12);
document.getElementById("fileFPR12").addEventListener("change", fileFPR12);


  function setMinisterialeFPA10() {
    document.getElementById("txtFPA10").innerHTML = "Ministeriale";
    browser.storage.local.set({Fattura10: {fileName: "Ministeriale", xslString: null}});
  }

  function setAssoSoftwareFPA10() {
    document.getElementById("txtFPA10").innerHTML = "AssoSoftware";
    browser.storage.local.set({Fattura10: {fileName: "AssoSoftware", xslString: null}});
  }

  function fileFPA10() {
    if (document.getElementById("fileFPA10").files[0].type != "text/xml") {
      alert("Il file non è di tipo text/xml");
      return;
    }
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      var xslString = reader.result;
      var fileName = document.getElementById("fileFPA10").files[0].name;
      document.getElementById("txtFPA10").innerHTML = fileName;
      browser.storage.local.set({Fattura10: {fileName: fileName, xslString: xslString}});
    }, false);
    reader.readAsText(document.getElementById("fileFPA10").files[0]);
  }



  function setMinisterialeFPA11() {
    document.getElementById("txtFPA11").innerHTML = "Ministeriale";
    browser.storage.local.set({Fattura11: {fileName: "Ministeriale", xslString: null}});
  }

  function setAssoSoftwareFPA11() {
    document.getElementById("txtFPA11").innerHTML = "AssoSoftware";
    browser.storage.local.set({Fattura11: {fileName: "AssoSoftware", xslString: null}});
  }

  function fileFPA11() {
    if (document.getElementById("fileFPA11").files[0].type != "text/xml") {
      alert("Il file non è di tipo text/xml");
      return;
    }
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      var xslString = reader.result;
      var fileName = document.getElementById("fileFPA11").files[0].name;
      document.getElementById("txtFPA11").innerHTML = fileName;
      browser.storage.local.set({Fattura11: {fileName: fileName, xslString: xslString}});
    }, false);
    reader.readAsText(document.getElementById("fileFPA11").files[0]);
  }


  function setMinisterialeFPA12() {
    document.getElementById("txtFPA12").innerHTML = "Ministeriale";
    browser.storage.local.set({FatturaFPA12: {fileName: "Ministeriale", xslString: null}});
  }

  function setAssoSoftwareFPA12() {
    document.getElementById("txtFPA12").innerHTML = "AssoSoftware";
    browser.storage.local.set({FatturaFPA12: {fileName: "AssoSoftware", xslString: null}});
  }

  function fileFPA12() {
    if (document.getElementById("fileFPA12").files[0].type != "text/xml") {
      alert("Il file non è di tipo text/xml");
      return;
    }
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      var xslString = reader.result;
      var fileName = document.getElementById("fileFPA12").files[0].name;
      document.getElementById("txtFPA12").innerHTML = fileName;
      browser.storage.local.set({FatturaFPA12: {fileName: fileName, xslString: xslString}});
    }, false);
    reader.readAsText(document.getElementById("fileFPA12").files[0]);
  }


  function setMinisterialeFPR12() {
    document.getElementById("txtFPR12").innerHTML = "Ministeriale";
    browser.storage.local.set({FatturaFPR12: {fileName: "Ministeriale", xslString: null}});
  }

  function setAssoSoftwareFPR12() {
    document.getElementById("txtFPR12").innerHTML = "AssoSoftware";
    browser.storage.local.set({FatturaFPR12: {fileName: "AssoSoftware", xslString: null}});
  }

  function fileFPR12() {
    if (document.getElementById("fileFPR12").files[0].type != "text/xml") {
      alert("Il file non è di tipo text/xml");
      return;
    }
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      var xslString = reader.result;
      var fileName = document.getElementById("fileFPR12").files[0].name;
      document.getElementById("txtFPR12").innerHTML = fileName;
      browser.storage.local.set({FatturaFPR12: {fileName: fileName, xslString: xslString}});
    }, false);
    reader.readAsText(document.getElementById("fileFPR12").files[0]);
  }


  function restoreOptions() {
    var storageItem = browser.storage.local.get("Fattura10");
    storageItem.then((res) => {
      document.getElementById("txtFPA10").innerHTML = res.Fattura10.fileName;
    })
    var storageItem = browser.storage.local.get("Fattura11");
    storageItem.then((res) => {
      document.getElementById("txtFPA11").innerHTML = res.Fattura11.fileName;
    });
    var storageItem = browser.storage.local.get("FatturaFPA12");
    storageItem.then((res) => {
      document.getElementById("txtFPA12").innerHTML = res.FatturaFPA12.fileName;
    });
    var storageItem = browser.storage.local.get("FatturaFPR12");
    storageItem.then((res) => {
      document.getElementById("txtFPR12").innerHTML = res.FatturaFPR12.fileName;
    });

  }