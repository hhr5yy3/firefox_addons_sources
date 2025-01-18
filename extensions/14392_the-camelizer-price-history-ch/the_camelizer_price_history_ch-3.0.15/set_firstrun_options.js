(function() {
  var out = {
    "error": null,
  };
  
  try {
    document.getElementById("camelizer_version").innerHTML = c3_version;
  } catch(e) {
    out["error"] = e.message + "\n" + e.stack;
  }
  
  return(out);
})();
