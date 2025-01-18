$(document).ready(function(){
  console.log( $('.propertyView').length )
  $('.propertyView')[6].remove()

  $('[name="fPP:searchProcessos"]').on('click', function(){
    // $('.propertyView').load(function(){
    //   console.log("oi")
    // })
    removeCaptcha();
  });

 
});

function removeCaptcha ( ) {
  try {
    $('.propertyView')[6].remove()
  }
  catch (ex) {
    setTimeout(removeCaptcha, 300);
  }
}