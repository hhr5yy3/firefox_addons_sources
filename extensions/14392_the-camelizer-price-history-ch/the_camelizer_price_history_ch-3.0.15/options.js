function read_storage(keys)
{
  
  try {
    var getting = browser.storage.sync.get(keys);
    return(getting);
  } catch (e) {
  }
  

  return(browser.storage.local.get(keys));
}

function write_storage(key, val)
{
  obj = {};
  obj[key] = val;
  browser.storage.local.set(obj);

  try {
    browser.storage.sync.set(obj);
  } catch (e) {  }
}

document.addEventListener('DOMContentLoaded', function() {
  const privlink = document.getElementById("privlink");
  if (privlink) {
    privlink.href = first_run_url() + "&reason=privacy";
  }

  read_storage(["browser_zoom", "window_size"]).then(function(data) {
    data["browser_zoom"] = data["browser_zoom"] || "1.0";

    

    data["window_size"] = data["window_size"] || "default";

    $("#windowsize_" + data["window_size"]).prop("checked", true);

    $("input[name='windowsize']").change(function (e) {
      var elm = $(e.currentTarget);
      if (elm.prop("checked")) {
        write_storage("window_size", elm.val());
      }
    });
  });
});