var grid_config = {};
var $w=document.getElementById("width");
var $c=document.getElementById("columns");
var $g=document.getElementById("gutter");
var $s=document.getElementById("skin");
var $v=document.getElementById("vtype");
var submit = document.getElementById("create_grid");

function onGot(item) {

    $w.value = (item['grid_config'].width);
    $c.value = (item['grid_config'].columns);
    $g.value = (item['grid_config'].gutter);
    $s.value = (item['grid_config'].skin);
    $v.value = (item['grid_config'].vtype);


}
function isHex(h) {

    h = h.toLowerCase();
    var a = parseInt(h,16);

    console.log(a.toString(16));
    console.log(h);
    return (a.toString(16) === h)
}
function onError(error) {
    console.log('Error: ${error}');
}

var get_settings = browser.storage.local.get("grid_config");
get_settings.then(onGot, onError);


function calc(){





  var width =  $w.value;
  var columns = $c.value;
  var gutter = $g.value;
  var skin = $s.value;
  var vtype = $v.value;

    grid_config.width = ($w.validity.valid) ? width : 1024;
    grid_config.columns = ($c.validity.valid) ? columns : 12;
    grid_config.gutter = ($g.validity.valid) ? gutter : 20;
    grid_config.vtype = ($g.validity.valid) ? vtype : 'px';
    grid_config.skin = (isHex(skin)) ? skin : "000000";

    var setting = browser.storage.local.set({grid_config});
    setting.then(null, onError);

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});

  gettingActiveTab.then(function(tabs){



      browser.tabs.executeScript(tabs[0].id, {file: "/content_scripts/grid.js"});
      browser.tabs.insertCSS(tabs[0].id, {file: "/content_scripts/grid.css"});

     browser.tabs.sendMessage(tabs[0].id, grid_config);



  });

}

submit.addEventListener('click',calc);
$w.addEventListener('keyup',calc);
$c.addEventListener('keyup',calc);
$g.addEventListener('keyup',calc);


