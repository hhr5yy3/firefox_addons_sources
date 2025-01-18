$("#addProxy").click(() => {
  handler.addProxy(Proxy("http", "127.0.0.1", "8080", "", ""));
  refeshProxyList();
  window.scrollTo(0,document.body.scrollHeight);
});


$("#export").click((e) => {
  handler.export();
});

$("#import").click((e) => {
  $("#importFile").click();
});

document.getElementById("importFile").addEventListener("change", (e) => {
  let file = e.target.files[0];
  handler.import(file);
});


$("#proxyList").on("change", ".input-el", (e) => {
  let index = $(e.target).attr("data");
  proxyChange(e.target, index);
});

$("#proxyList").on("click", ".delete-btn", (e) => {
  let index = $(e.target).attr("data");
  deleteProxy(index);
});

$("#proxyList").on("click", ".show-pass", (e) => {
  let index = $(e.target).attr("data");
  showpass(e.target, index);
});


$("toggleSwitch").click(function(e){
  // Write the functionality for toggle button



  
})