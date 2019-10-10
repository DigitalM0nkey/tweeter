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
      $('<style>.errorMessage { display: none; }</style>').appendTo('.errorMessage');
    }
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
      ${tweet.created_at} miliseconds since 01-Jan-1970
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
  const errorMessages = function(type) {
    if (type === 'empty') {
      $('<style>.errorMessage { display: block; }</style>').appendTo('.errorMessage');
      $('.errorTitle').text('ERROR - INPUT EMPTY').slideDown('slow');
      setTimeout(function() {
        $('.errorBodyText').text("Sorry Buddy. That's empty.. What do you want me to do with that?").slideDown('slow');
      }, 2 * 1000);
      setTimeout(() => {
        $('<style>.errorMessage { display: none; }</style>').appendTo('.errorMessage');
        $('.errorMessage').slideUp();
      }, 10000);
    } else if (type === 'full') {
      $('<style>.errorMessage { display: block; }</style>').appendTo('.errorMessage');
      $('.errorTitle').text('ERROR - INPUT FULL').slideDown('slow');
      setTimeout(function() {
        $('.errorBodyText').text("You must be color blind!! Didn't you see that you typed more than 140 characters. You gotta slim that done before you submit it.").slideDown('slow');
      }, 2 * 1000);
      setTimeout(() => {
        $('<style>.errorMessage { display: none; }</style>').appendTo('.errorMessage');
        $('.errorMessage').slideUp();
      }, 10000);
    }
  };

  // This hides the error message when X is clicked.
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
      // alert("Sorry Buddy. That's empty.. What do you want me to do with that?");
      return false;
    } else if ($(this[form = "text"]).val().length > 140) {
      errorMessages('full');
      // alert("You must be color blind!! Didn't you see that you typed more than 140 characters. You gotta slim that done before i'll submit it.");
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

