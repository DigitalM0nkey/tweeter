/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // place all tweets from db onto main page
  const renderTweets = function(tweets) {
    tweets.forEach(element => {
      return $('#tweets-container').prepend(createTweetElement(element));
    });
  };

  // Make text safe
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Make text field slide down
  $(".fa-angle-double-down").click(function() {
    if (!$(".fa-angle-double-down").first().is(":hidden")) {
      $(".new-tweet").slideToggle("slow");
      $('form textarea').focus();
    }
  });

  // Return you to the top of the page
  $('.fa-hand-point-up').click(function() {
    $(window.opera ? 'html' : 'html, body').animate({
      scrollTop: 0
    }, 'slow');
  });

  // Create indervidule tweet
  const createTweetElement = function(tweet) {
    const $tweet = $("<article>").addClass("all-tweets");
    const markup = ` 
    <header>
    <div>
      <img src=${tweet.user.avatars}>
        ${tweet.user.name}
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <article>
      <p>${escape(tweet.content.text)}</p>
    </article>
    <footer>
    ${moment(tweet.created_at).format("DD MMM YYYY hh:mm a")}
      <div>
        <i class="fad fa-flag"></i>
        <i class="fad fa-retweet-alt"></i>
        <i class="fad fa-heart"></i>
      </div>
    </footer>
  `;
    $($tweet).append(markup);
    return $tweet;
  };

  // AJAX GET /tweets
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: '/tweets',
      dataType: 'json'
    })
      .then(function(results) {
        renderTweets(results);
      });
  };

  const loadTweet = function() {
    $.ajax({
      method: "GET",
      url: '/tweets',
      dataType: 'json'
    })
      .then(function(results) {
        renderTweets([results[results.length - 1]]);
      });
  };

  // Error Messages

  // - Progress bar
  const errorMessages = function(type) {
    let timeleft = 10;
    let exitTimer = setInterval(function() {
      document.getElementById("progressBar").value = 10 - timeleft;
      timeleft -= 1;
      if (timeleft <= 0) {
        clearInterval(exitTimer);
        document.getElementById("progressBar").value = 10;
      }
    }, 1000);

    // - Logic
    if (type === 'empty') {
      $('<style>.errorBody { display: none; }</style>').appendTo('.errorBody');
      $('<style>#progressBar { display: none; }</style>').appendTo('#progressBar');
      $('<style>.errorMessage { display: block; }</style>').appendTo('.errorMessage');
      $('.errorTitle').text('INPUT EMPTY').slideDown('slow');
      setTimeout(function() {
        $('<style>#progressBar { display: inline-flex; }</style>').appendTo('#progressBar');
        $('<style>.errorBody { display: inline-flex; }</style>').appendTo('.errorBody');
        $('.errorBodyText').text("Sorry Buddy. That's empty...").slideDown('slow');
      }, 2 * 1000);
      setTimeout(() => {
        timeleft = 10;
        $('<style>.errorMessage { display: none; }</style>').appendTo('.errorMessage');
        $('.errorMessage').slideUp();
      }, 10000);
    } else if (type === 'full') {
      $('<style>.errorBody { display: none; }</style>').appendTo('.errorBody');
      $('<style>#progressBar { display: none; }</style>').appendTo('#progressBar');
      $('<style>.errorMessage { display: block; }</style>').appendTo('.errorMessage');
      $('.errorTitle').text('INPUT FULL').slideDown('slow');
      setTimeout(function() {
        $('<style>#progressBar { display: inline-flex; }</style>').appendTo('#progressBar');
        $('<style>.errorBody { display: inline-flex; }</style>').appendTo('.errorBody');
        $('.errorBodyText').text("No more than 140 characters. Stop your rambling.").slideDown('slow');
      }, 2 * 1000);
      setTimeout(() => {
        $('<style>.errorMessage { display: none; }</style>').appendTo('.errorMessage');
        $('.errorMessage').slideUp();
      }, 10000);
    }
  };

  // - This hides the error message when X is clicked.
  $(".errorExit").click(function() {
    $('<style>.errorMessage { display: none; }</style>').appendTo('.errorMessage');
    $('.errorMessage').slideUp();
  });

  // AJAX POST /tweets
  $('.new-tweet-form').submit(function(event) {
    const data = $(this).serialize();
    event.preventDefault();
    if (data === "text=") {
      errorMessages('empty');
      return false;
    } else if ($(this[form = "text"]).val().length > 140) {
      errorMessages('full');
      return false;
    } else {
      $.ajax({
        method: "POST",
        url: '/tweets',
        data: data,
      })
        .then(() => {
          loadTweet();
          $(this)[0].reset();
          const counter = $(this).find(".counter");
          $(counter).html(140);
        })
        .fail(() => {
          console.log("NOOOOOOOO!");
        });
    }
  });

  loadTweets();

});

