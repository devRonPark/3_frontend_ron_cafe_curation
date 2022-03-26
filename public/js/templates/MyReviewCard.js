import createIcon from '../components/icon/Icon.js';

class MyReviewCard extends HTMLElement {
  constructor() {
    super();
  }
  /* 주입할 데이터 정보
  - 카페 정보 : 카페 이름(cafe-name), 
  - 사용자 정보 : 사용자 이름(user-name), 사용자 프로필 이미지(user-profile) 
  - 리뷰 정보 : 평점(star-rating), 한줄평(comment), 작성일(created-at)
  */
  /* DOM 구조 
    <div class="review-box">
      <!-- top -->
      <div class="box-top">
        <!-- profile -->
        <div class="user-profile">
          <div class="profile-image">
            <img src={user-profile} alt="user profile" />
          </div>
          <!-- name-and-username -->
          <div class="user-name">
            <strong>{user-name}</strong>
          </div>
        </div>
        <!-- reviews -->
        <!-- {star-rating} 정보 토대로 표시함. -->
        <div class="user-average-ratings">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i> <!-- Empty star -->
        </div>
      </div>
      <!-- Comments -->
      <div class="user-comment">
        <p class="cafe-name">
          <i class="fas fa-coffee"></i>
          {cafe-name}
        </p>
        <p class="comment-txt">{comment}</p>
        <p class="create-at">{created-at}</p>
      </div>
    </div>
  */
 // 해당 요소가 DOM에 추가될 때 브라우저가 호출함.
  connectedCallback() {
    const cardTop = document.createElement('div');
    const cardContent = document.createElement('div');

    const userProfile = document.createElement('div');
    const userAverageRatings = document.createElement('div');
    const userComment = document.createElement('div');

    const profileImageBox = document.createElement('div');
    const profileImage = document.createElement('img');
    const userNameBox = document.createElement('div');
    const userName = document.createElement('strong');

    const cafeName = document.createElement('p');
    const commentTxt = document.createElement('p'); 
    const createdAt = document.createElement('p'); 
    const cafeIcon = createIcon(['fas', 'fa-coffee']);
    const cafeNameTxtNode = document.createTextNode(this.getAttribute('cafe-name'));

    cardTop.classList.add('card-top');
    cardContent.classList.add('card-content');
    userProfile.classList.add('user-profile');
    userAverageRatings.classList.add('user-average-ratings');
    userComment.classList.add('user-comment');
    userProfile.classList.add('user-comment');
    profileImageBox.classList.add('profile-image');
    userNameBox.classList.add('user-name');
    cafeName.classList.add('cafe-name');
    commentTxt.classList.add('comment-txt');
    createdAt.classList.add('created-at');

    profileImage.src = this.getAttribute('user-profile');
    userName.textContent = this.getAttribute('user-name');
    commentTxt.textContent = this.getAttribute('comment');
    createdAt.textContent = this.getAttribute('created-at');
    /* 
      TODO 전달받은 데이터에 따라서 평점을 어떻게 보여줄 것인지 CSS로 제어 필요
      Hint: gradient 이용 => 0.8인 경우 gradient: yellow(80%), white(20%)
    */ 
    for (let i = 0; i < 5; i++) {
      // <i class="fas fa-star"></i>
      const starIcon = createIcon(["fas", "fa-star"]);
      userAverageRatings.appendChild(starIcon);
    }
    
    cafeName.appendChild(cafeIcon);
    cafeName.appendChild(cafeNameTxtNode);
    profileImageBox.appendChild(profileImage);
    userNameBox.appendChild(userName);
    userProfile.appendChild(profileImageBox);
    userProfile.appendChild(userNameBox);
    userComment.appendChild(cafeName);
    userComment.appendChild(commentTxt);
    userComment.appendChild(createdAt);
    cardTop.appendChild(userProfile);
    cardTop.appendChild(userAverageRatings);
    cardContent.appendChild(userComment);
    this.appendChild(cardTop);
    this.appendChild(cardContent);
  }
}

customElements.define('my-review-card', MyReviewCard);