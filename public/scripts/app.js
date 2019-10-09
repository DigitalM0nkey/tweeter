/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // place all tweets from db onto main page
  const renderTweets = function(tweets) {
    tweets.forEach(element => {
      return $('#tweets-container').append(createTweetElement(element));
    });
  };

  // create indervidule tweet
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
      <p>${tweet.content.text}</p>
    </article>
    <footer>
      ${tweet.created_at}
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

  // AJAX POST /tweets
  $('.new-tweet-form').submit(function(event) {
    const data = $(this).serialize();
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: data,
      success: console.log("Here")
    });

  });

  // AJAX GET /tweets
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      dataType: 'json',
      success: function(results) {
        renderTweets(results);
        console.log(results);

      }
    });
  };

  loadTweets();

});

