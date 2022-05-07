import { backendBaseUrl } from '../lib/constants.js';
import { toStringByFormatting } from '../lib/util.js';
/*
<div class="review-box">
  // top
  <div class="box-top">
    // profile
    <div class="profile">
      <div class="profile-img">
        <img src="../images/1.jpg" alt="user profile" />
      </div>
      // name-and-username
      <div class="user-name">
        <strong>Touseeq Ijaz</strong>
      </div>
    </div>
    // reviews
    <div class="user-average-ratings">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="far fa-star"></i> <!-- Empty star -->
    </div>
  </div>
  // Comments
  <div class="user-comment">
    <p class="comment-txt">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Adipisci, nisi? Non, aliquam aperiam quo officia impedit,
      laboriosam autem culpa, eveniet eius repellat obcaecati eaque id.
      Nostrum architecto reiciendis at debitis?
    </p>
    <p class="create_date">
      24분 전
    </p>
  </div>
</div>
*/
const createReviewBox = reviewInfo => {
  const { name, profileImagePath, ratings, comment, createdAt } = reviewInfo;
  const reviewBox = document.createElement('div');
  const boxTop = document.createElement('div');
  const userProfileBox = document.createElement('div');
  const profileImageBox = document.createElement('div');
  const profileImage = document.createElement('img');
  const usernameBox = document.createElement('div');
  const username = document.createElement('strong');
  const ratingsBox = document.createElement('div');
  const userCommentBox = document.createElement('div');
  const commentText = document.createElement('p');
  const createDate = document.createElement('p');
  for (let i = 0; i < 5; i++) {
    const starIcon = document.createElement('i');
    starIcon.classList.add(...['fas', 'fa-star']);
    ratingsBox.appendChild(starIcon);
  }

  profileImage.src = `${backendBaseUrl}${profileImagePath.replace(
    '/uploads',
    '',
  )}`;
  username.innerText = name;
  commentText.innerText = comment;
  createDate.innerText = toStringByFormatting(new Date(createdAt));

  reviewBox.classList.add('review-box');
  boxTop.classList.add('box-top');
  userProfileBox.classList.add('profile');
  profileImageBox.classList.add('profile-img');
  ratingsBox.classList.add('user-average-ratings');
  userCommentBox.classList.add('user-comment');
  commentText.classList.add('comment-txt');
  createDate.classList.add('create-date');

  profileImageBox.appendChild(profileImage);
  usernameBox.appendChild(username);
  userProfileBox.appendChild(profileImageBox);
  userProfileBox.appendChild(usernameBox);
  boxTop.appendChild(userProfileBox);
  boxTop.appendChild(ratingsBox);
  userCommentBox.appendChild(commentText);
  userCommentBox.appendChild(createDate);
  reviewBox.appendChild(boxTop);
  reviewBox.appendChild(userCommentBox);

  return reviewBox;
};

export default createReviewBox;
