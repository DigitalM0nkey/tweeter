$(document).ready(function() {


  // document.addEventListener("input", function(event) {
  //   console.log(event.type));

  $("textarea").on('input', function() {

    const counter = $(this).next().find(".counter");

    $(counter).html(140 - $(this).val().length);

    if (140 - $(this).val().length < 0) {
      $(counter).addClass("makeCounterRed");
    } else {
      $(counter).removeClass("makeCounterRed");
    }

  });





  // --- our code goes here ---
});



