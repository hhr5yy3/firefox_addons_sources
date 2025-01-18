document.querySelector(".yes").addEventListener("click",function(e){
 browser.storage.local.set({playSound : ""})
 document.querySelector(".yes").blur();
});

document.querySelector(".no").addEventListener("click",function(e){
 browser.storage.local.set({playSound : "no"})
 document.querySelector(".no").blur();
});

document.querySelector(".backgroundInput").addEventListener("input",function(e){
 browser.storage.local.set({bColor : document.querySelector(".backgroundInput").value})
});

document.querySelector(".deleteAll").addEventListener("click", (e) => {
 browser.storage.local.clear();
 document.querySelector(".deleteAll").blur();
});
