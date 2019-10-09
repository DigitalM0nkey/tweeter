$(document).ready(function() {


  // document.addEventListener("input", function(event) {
  //   console.log(event.type));

  $("textarea").on('input', function() {

    const maxTweetLength = 140;
    const counter = $(this).next().find(".counter");

    $(counter).html(maxTweetLength - $(this).val().length);

    if (maxTweetLength - $(this).val().length < 0) {
      $(counter).addClass("make-counter-red");
    } else {
      $(counter).removeClass("make-counter-red");
    }

  });





  // --- our code goes here ---
});



