import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://esm.sh/uuid";

const tweetInput = document.getElementById("tweet-input");

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClicked(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClicked(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClicked(e.target.dataset.reply);
  }

  if (e.target.id === "tweet-btn") {
    handleClickInput();
  }
});

function handleLikeClicked(tweetId) {
  const targetObject = tweetsData.find(function (tweet) {
    return tweet.uuid === tweetId;
  });
  if (targetObject.isLiked) {
    targetObject.likes--;
  } else {
    targetObject.likes++;
  }
  targetObject.isLiked = !targetObject.isLiked;

  render();
}

function handleRetweetClicked(tweetId) {
  const targetObj = tweetsData.find(function (tweet) {
    return tweetId === tweet.uuid;
  });

  if (targetObj.isRetweeted) {
    targetObj.retweets--;
  } else {
    targetObj.retweets++;
  }

  targetObj.isRetweeted = !targetObj.isRetweeted;
  render();
}

function handleReplyClicked(tweetId) {
  let replyHtml = "";

  const targetObj = tweetsData.find(function (tweet) {
    return tweetId === tweet.uuid;
  });

  if (targetObj.replies.length) {
    document.getElementById(`reply-${tweetId}`).classList.toggle("hidden");
  }
}

function handleClickInput() {
  console.log(tweetInput.value);
  if (tweetInput.value) {
    const newTweet = {
      handle: `@shivani😂`,
      profilePic: `images/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    };

    tweetsData.unshift(newTweet);
    render();
  }
}

function getFeedHtml() {
  let feedHTML = "";
  tweetsData.forEach(function (tweet) {
    let heartClass = tweet.isLiked ? "liked" : "";
    let retweetClass = tweet.isRetweeted ? "retweeted" : "";
    let repliesHtml = "";
    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function (reply) {
        repliesHtml += ` <div class="tweet-reply">
                            <div class="tweet-inner">
                                <img src="${reply.profilePic}" class="profile-pic"/>
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                            </div>
                        </div> `;
      });
    }

    feedHTML += `<div class="tweet">
		<div class="tweet-inner">
			<img src="${tweet.profilePic}" class="profile-pic">
			<div>
				<p class="handle">${tweet.handle}</p>
				<p class="tweet-text">${tweet.tweetText}</p>
				<div class="tweet-details">
                
					<span class="tweet-detail">
                     <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
						${tweet.replies.length}
					</span>
					<span class="tweet-detail">
                     <i class="fa-solid fa-heart ${heartClass}" data-like="${tweet.uuid}" ></></i>
						${tweet.likes}
					</span>
					<span class="tweet-detail">
                     <i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${tweet.uuid}"></></i>
						${tweet.retweets}
					</span>
				</div>
                <div id="reply-${tweet.uuid}" class="hidden">${repliesHtml}</div>
			</div>
	</div>
</div>`;
  });
  return feedHTML;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();

// adding the boilerplate
