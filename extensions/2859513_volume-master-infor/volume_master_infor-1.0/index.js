$(() => {
  var rangePercent = $('[type="range"]').val();
  $('[type="range"]').on("change input", function () {
    rangePercent = $('[type="range"]').val();
    $("h4").html(rangePercent + "<span></span>");
    $('[type="range"], h4>span').css(
      "filter",
      "hue-rotate(-" + rangePercent + "deg)"
    );
    // $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(rangePercent/100)) + ')', 'left': rangePercent+'%'});
    $("h4").css({
      transform: "translateX(-50%) scale(" + (1 + rangePercent / 100) + ")",
      left: rangePercent + "%",
    });
  });
});
let slider = $(`
<div id="slider">
<input type="range" min="0" max="100" value="20" step="1" class="slider" id="vol">
<div id="h4-container"><div id="h4-subcontainer"><h4>0<span></span></h4></div></div>
</div>
`).appendTo("body");

$("#vol").on("input", (e) => {
  $("video").prop("volume", $("#vol").val() / 100);
});

window.setInterval(() => {
  $("video").prop("volume", $("#vol").val() / 100);
}, 5000);
