import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input");

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClicked(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClicked(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClicked(e.target.dataset.reply);
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
    console.log(targetObj.replies);
    targetObj.replies.forEach(function (reply) {
        replyHtml += ` 
                            <div class="tweet-inner tweet-reply">
                                <img src="${reply.profilePic}" class="profile-pic"/>
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                            </div>
                        `  
    });
    console.log(replyHtml)
  document.getElementById(`reply-${tweetId}`).innerHTML = replyHtml
 
  }

}

function getFeedHtml() {
  let feedHTML = "";
  let heartClass = "";
  tweetsData.forEach(function (tweet) {
    if (tweet.isLiked) {
      heartClass = "liked";
    } else {
      heartClass = "";
    }

    let retweetClass = tweet.isRetweeted ? "retweeted" : "";
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
                <div id="reply-${tweet.uuid}"></div>
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

   