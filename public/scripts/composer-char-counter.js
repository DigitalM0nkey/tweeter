// Count down as you type
$(document).ready(function() {
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
});



