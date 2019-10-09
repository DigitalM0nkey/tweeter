/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

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

const $tweet = createTweetElement(tweetData);
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet);
console.log($tweet); // to see what it looks like
